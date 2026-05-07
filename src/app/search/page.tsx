import type { Metadata } from "next";
import { filterProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/products/product-grid";
import { SearchBar } from "@/components/marketing/search-bar";

export const metadata: Metadata = {
	title: "Search",
	description: "Search Strivio digital products by outcome, category, product type, or tool.",
};

type PageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: PageProps) {
	const params = (await searchParams) ?? {};
	const query = Array.isArray(params.q) ? params.q[0] : params.q;
	const products = filterProducts({ query, sort: "popular" });

	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<h1 className="text-4xl font-black text-[#17211B]">Search Strivio</h1>
				<p className="mt-3 max-w-2xl text-[#66736B]">Find ready-to-use tools by goal, category, file type, or problem.</p>
				<div className="my-8">
					<SearchBar defaultValue={query} />
				</div>
				<ProductGrid products={products} emptyLabel={query ? `No results for "${query}" yet.` : "Search for a resource to begin."} />
			</div>
		</main>
	);
}
