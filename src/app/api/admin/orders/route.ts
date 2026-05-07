import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/db/client";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
	await requireAdmin();
	const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100);
	return NextResponse.json({ orders: rows });
}
