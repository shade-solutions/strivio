import type { Metadata } from "next";
import { filterProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { SearchBar } from "@/components/marketing/search-bar";

export const metadata: Metadata = {
	title: "Explore digital products",
	description: "Browse ready-to-use digital products by goal, category, price, rating, and product type.",
};

type PageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
	return Array.isArray(value) ? value[0] : value;
}

export default async function ExplorePage({ searchParams }: PageProps) {
	const params = (await searchParams) ?? {};
	const query = first(params.q);
	const category = first(params.category);
	const goal = first(params.goal);
	const sort = first(params.sort) ?? "popular";
	const products = filterProducts({ query, category, goal, sort });

	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8">
					<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Explore</p>
					<h1 className="mt-2 text-4xl font-black text-[#17211B] sm:text-5xl">Tools for your next step.</h1>
					<p className="mt-4 max-w-2xl text-base leading-7 text-[#66736B]">
						Browse by goal, not just by category. Everything here is designed to save you time.
					</p>
				</div>
				<div className="mb-8">
					<SearchBar defaultValue={query} action="/explore" />
				</div>
				<div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
					<ProductFilters activeCategory={category} activeGoal={goal} activeSort={sort} />
					<div>
						<div className="mb-4 flex items-center justify-between gap-4">
							<p className="text-sm font-black text-[#66736B]">{products.length} resources found</p>
						</div>
						<ProductGrid products={products} />
					</div>
				</div>
			</div>
		</main>
	);
}
