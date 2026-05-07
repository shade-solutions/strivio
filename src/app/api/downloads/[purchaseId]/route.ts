import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { productAssets, purchases } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { trackServerEvent } from "@/lib/analytics/events";

export const dynamic = "force-dynamic";

type RouteProps = { params: Promise<{ purchaseId: string }> };

export async function GET(_: Request, { params }: RouteProps) {
	const user = await requireUser();
	const { purchaseId } = await params;
	const [purchase] = await db
		.select()
		.from(purchases)
		.where(and(eq(purchases.id, purchaseId), eq(purchases.userId, user.id), eq(purchases.accessStatus, "active")))
		.limit(1);

	if (!purchase) return NextResponse.json({ error: "No active purchase found for this user." }, { status: 403 });

	const assets = await db.select().from(productAssets).where(eq(productAssets.productId, purchase.productId));
	await trackServerEvent("product_downloaded", { purchaseId, productId: purchase.productId }, user.id);

	return NextResponse.json({
		purchaseId,
		assets: assets.map((asset) => ({
			id: asset.id,
			title: asset.title,
			assetType: asset.assetType,
			url: asset.fileUrl,
			note: asset.r2Key ? "R2 signed URL generation is configured in the delivery service placeholder." : "Dodo delivery or public instruction link.",
		})),
	});
}
