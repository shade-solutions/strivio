import { NextResponse } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { analyticsEvents, orders, products, searchEvents } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
	await requireAdmin();

	const [revenue] = await db
		.select({
			totalRevenue: sql<number>`coalesce(sum(${orders.total}), 0)`,
			paidOrders: sql<number>`count(*)`,
		})
		.from(orders)
		.where(eq(orders.status, "paid"));

	const bestSellers = await db
		.select({
			id: products.id,
			title: products.title,
			salesCount: products.salesCount,
			ratingAverage: products.ratingAverage,
		})
		.from(products)
		.orderBy(desc(products.salesCount))
		.limit(8);

	const topSearches = await db
		.select({
			query: searchEvents.query,
			count: sql<number>`count(*)`,
		})
		.from(searchEvents)
		.groupBy(searchEvents.query)
		.orderBy(sql`count(*) desc`)
		.limit(10);

	const recentEvents = await db
		.select({
			eventName: analyticsEvents.eventName,
			createdAt: analyticsEvents.createdAt,
			properties: analyticsEvents.properties,
		})
		.from(analyticsEvents)
		.orderBy(desc(analyticsEvents.createdAt))
		.limit(25);

	return NextResponse.json({
		revenue: {
			totalRevenue: Number(revenue?.totalRevenue || 0),
			paidOrders: Number(revenue?.paidOrders || 0),
		},
		bestSellers,
		topSearches,
		recentEvents,
		insights: [
			"Look for products with strong views and weak checkout starts.",
			"Bundle best sellers with beginner-friendly quick wins.",
			"Use search terms with no matching product as new product ideas.",
		],
	});
}
