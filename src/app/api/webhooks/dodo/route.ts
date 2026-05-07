import { NextResponse } from "next/server";
import { verifyWebhookPayload } from "@dodopayments/core/webhook";
import type { WebhookPayload } from "@dodopayments/core";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db/client";
import { orderItems, orders, purchases, products, webhookEvents } from "@/db/schema";
import { requireEnv } from "@/lib/env";
import { sendPurchaseEmail } from "@/lib/email/resend";
import { trackServerEvent } from "@/lib/analytics/events";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const body = await request.text();
	const headers = Object.fromEntries(request.headers.entries());

	let payload: WebhookPayload;
	try {
		payload = await verifyWebhookPayload({
			webhookKey: requireEnv("DODO_WEBHOOK_SECRET"),
			headers,
			body,
		});
	} catch (error) {
		console.error("dodo_webhook_signature_failed", error);
		return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
	}

	const eventId = headers["webhook-id"] ?? `${payload.type}_${Date.now()}_${nanoid(8)}`;
	const [inserted] = await db
		.insert(webhookEvents)
		.values({
			id: `wh_${nanoid(14)}`,
			provider: "dodo",
			eventId,
			eventType: payload.type,
			rawPayload: payload as unknown as Record<string, unknown>,
		})
		.onConflictDoNothing({ target: [webhookEvents.provider, webhookEvents.eventId] })
		.returning({ id: webhookEvents.id });

	if (!inserted) return NextResponse.json({ ok: true, duplicate: true });

	try {
		await handleDodoPayload(payload);
		await db
			.update(webhookEvents)
			.set({ processed: true, processedAt: new Date() })
			.where(eq(webhookEvents.id, inserted.id));
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("dodo_webhook_processing_failed", error);
		return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
	}
}

async function handleDodoPayload(payload: WebhookPayload) {
	if (payload.type === "payment.succeeded") {
		await markOrderPaid(payload.data.payment_id, payload.data.checkout_session_id, payload.data.customer.customer_id, payload.data.metadata);
		return;
	}

	if (payload.type === "payment.failed") {
		await markOrderStatus(payload.data.payment_id, payload.data.checkout_session_id, "failed");
		return;
	}

	if (payload.type === "payment.cancelled") {
		await markOrderStatus(payload.data.payment_id, payload.data.checkout_session_id, "cancelled");
		return;
	}

	if (payload.type === "refund.succeeded") {
		await revokeRefundedAccess(payload.data.payment_id);
	}
}

async function markOrderPaid(paymentId: string, checkoutSessionId: string | null, customerId: string, metadata: Record<string, unknown>) {
	const orderId = typeof metadata.order_id === "string" ? metadata.order_id : undefined;
	const [order] = orderId
		? await db.select().from(orders).where(eq(orders.id, orderId)).limit(1)
		: checkoutSessionId
			? await db.select().from(orders).where(eq(orders.dodoCheckoutSessionId, checkoutSessionId)).limit(1)
			: [];

	if (!order) throw new Error("Order not found for payment.succeeded");

	await db
		.update(orders)
		.set({
			status: "paid",
			dodoPaymentId: paymentId,
			dodoCheckoutSessionId: checkoutSessionId ?? order.dodoCheckoutSessionId,
			dodoCustomerId: customerId,
			updatedAt: new Date(),
		})
		.where(eq(orders.id, order.id));

	const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
	for (const item of items) {
		await db
			.insert(purchases)
			.values({
				id: `pur_${order.id}_${item.productId}`.slice(0, 120),
				userId: order.userId,
				orderId: order.id,
				productId: item.productId,
				accessStatus: "active",
				accessGrantedAt: new Date(),
			})
			.onConflictDoUpdate({
				target: [purchases.orderId, purchases.productId],
				set: { accessStatus: "active", accessGrantedAt: new Date() },
			});

		await db
			.update(products)
			.set({ salesCount: sql`${products.salesCount} + 1`, updatedAt: new Date() })
			.where(eq(products.id, item.productId));

		await sendPurchaseEmail({ email: order.email, productTitle: item.productTitleSnapshot });
	}

	await trackServerEvent("checkout_completed", { orderId: order.id, paymentId }, order.userId);
}

async function markOrderStatus(paymentId: string, checkoutSessionId: string | null, status: "failed" | "cancelled") {
	const matched = paymentId
		? await db.select().from(orders).where(eq(orders.dodoPaymentId, paymentId)).limit(1)
		: checkoutSessionId
			? await db.select().from(orders).where(eq(orders.dodoCheckoutSessionId, checkoutSessionId)).limit(1)
			: [];
	if (!matched[0]) return;
	await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, matched[0].id));
	await trackServerEvent(status === "failed" ? "checkout_failed" : "checkout_cancelled", { orderId: matched[0].id, paymentId }, matched[0].userId);
}

async function revokeRefundedAccess(paymentId: string) {
	const [order] = await db.select().from(orders).where(eq(orders.dodoPaymentId, paymentId)).limit(1);
	if (!order) return;
	await db.update(orders).set({ status: "refunded", updatedAt: new Date() }).where(eq(orders.id, order.id));
	await db.update(purchases).set({ accessStatus: "refunded" }).where(eq(purchases.orderId, order.id));
	await trackServerEvent("refund_completed", { orderId: order.id, paymentId }, order.userId);
}
