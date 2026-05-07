import { NextResponse } from "next/server";
import { filterProducts, getProductBySlug } from "@/lib/catalog";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const slug = url.searchParams.get("slug");
	if (slug) {
		const product = getProductBySlug(slug);
		if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
		return NextResponse.json({ product });
	}

	const products = filterProducts({
		query: url.searchParams.get("q") ?? undefined,
		category: url.searchParams.get("category") ?? undefined,
		goal: url.searchParams.get("goal") ?? undefined,
		sort: url.searchParams.get("sort") ?? undefined,
	});
	return NextResponse.json({ products });
}
