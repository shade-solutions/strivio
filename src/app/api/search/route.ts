import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/db/client";
import { searchEvents } from "@/db/schema";
import { filterProducts } from "@/lib/catalog";
import { stackServerApp } from "@/stack/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const query = url.searchParams.get("q") ?? "";
	const filters = {
		category: url.searchParams.get("category"),
		goal: url.searchParams.get("goal"),
		sort: url.searchParams.get("sort"),
	};
	const products = filterProducts({ query, ...Object.fromEntries(Object.entries(filters).filter(([, value]) => Boolean(value))) });
	const user = await stackServerApp.getUser();

	if (query) {
		await db.insert(searchEvents).values({
			id: `search_${nanoid(12)}`,
			userId: user?.id ?? null,
			query,
			filters,
			resultsCount: products.length,
		});
	}

	return NextResponse.json({ query, filters, resultsCount: products.length, products });
}
