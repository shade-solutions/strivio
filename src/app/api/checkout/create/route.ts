import { NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/db/client";
import { orderItems, orders, products } from "@/db/schema";
import { getDodoClient } from "@/lib/payments/dodo";
import { absoluteUrl } from "@/lib/utils";
import { stackServerApp } from "@/stack/server";
import { syncStackUser } from "@/lib/auth";
import { trackServerEvent } from "@/lib/analytics/events";

export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
	productSlug: z.string().min(1),
});

export async function POST(request: Request) {
	try {
		const body = await parseBody(request);
		const parsed = checkoutSchema.safeParse(body);
		if (!parsed.success) return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });

		const stackUser = await stackServerApp.getUser();
		if (!stackUser?.primaryEmail) {
			return redirectOrJson(request, "/login", { error: "Please log in before checkout." }, 401);
		}
		const localUser = await syncStackUser(stackUser);

		const [product] = await db
			.select()
			.from(products)
			.where(inArray(products.slug, [parsed.data.productSlug]))
			.limit(1);

		if (!product || product.status !== "published") {
			return NextResponse.json({ error: "Product is not available." }, { status: 404 });
		}
		if (!product.dodoProductId || product.dodoProductId.startsWith("demo_")) {
			return NextResponse.json({ error: "Dodo product ID is not configured for this product." }, { status: 503 });
		}

		const orderId = `ord_${nanoid(14)}`;
		const orderItemId = `item_${nanoid(14)}`;
		const idempotencyKey = `checkout_${orderId}`;

		await db.insert(orders).values({
			id: orderId,
			userId: localUser?.id ?? null,
			email: stackUser.primaryEmail,
			status: "pending",
			subtotal: product.price,
			discountTotal: 0,
			taxTotal: 0,
			total: product.price,
			currency: product.currency,
			idempotencyKey,
		});

		await db.insert(orderItems).values({
			id: orderItemId,
			orderId,
			productId: product.id,
			productTitleSnapshot: product.title,
			priceSnapshot: product.price,
			quantity: 1,
			currency: product.currency,
		});

		const dodo = getDodoClient();
		const session = await dodo.checkoutSessions.create(
			{
				product_cart: [{ product_id: product.dodoProductId, quantity: 1 }],
				customer: {
					email: stackUser.primaryEmail,
					name: stackUser.displayName ?? stackUser.primaryEmail,
				},
				return_url: absoluteUrl(`/checkout/success?order=${orderId}`),
				cancel_url: absoluteUrl(`/checkout/cancelled?order=${orderId}`),
				metadata: {
					order_id: orderId,
					user_id: localUser?.id ?? "",
					product_id: product.id,
				},
				customization: {
					theme: "light",
					show_order_details: true,
				},
			},
			{ idempotencyKey },
		);

		await db
			.update(orders)
			.set({ dodoCheckoutSessionId: session.session_id, updatedAt: new Date() })
			.where(eq(orders.id, orderId));

		await trackServerEvent("checkout_started", { orderId, productId: product.id }, localUser?.id);

		if (!session.checkout_url) {
			return NextResponse.json({ error: "Checkout URL was not returned by Dodo." }, { status: 502 });
		}

		return redirectOrJson(request, session.checkout_url, { checkoutUrl: session.checkout_url, orderId }, 200);
	} catch (error) {
		console.error("checkout_create_failed", error);
		return NextResponse.json({ error: "Checkout could not be started." }, { status: 500 });
	}
}

async function parseBody(request: Request) {
	const contentType = request.headers.get("content-type") ?? "";
	if (contentType.includes("application/json")) return request.json();
	const formData = await request.formData();
	return Object.fromEntries(formData.entries());
}

function redirectOrJson(request: Request, url: string, json: Record<string, unknown>, status: number) {
	const accept = request.headers.get("accept") ?? "";
	if (accept.includes("text/html")) return NextResponse.redirect(url);
	return NextResponse.json(json, { status });
}
