import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategoryProducts } from "@/lib/catalog";
import { categories } from "@/data/catalog";
import { ProductGrid } from "@/components/products/product-grid";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const category = getCategoryBySlug(slug);
	if (!category) return {};
	return {
		title: `${category.name} digital products`,
		description: category.description,
	};
}

export default async function CategoryPage({ params }: PageProps) {
	const { slug } = await params;
	const category = getCategoryBySlug(slug);
	if (!category) notFound();
	const products = getCategoryProducts(slug);

	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Category</p>
				<h1 className="mt-2 text-4xl font-black text-[#17211B] sm:text-5xl">{category.name}</h1>
				<p className="mt-4 max-w-2xl text-base leading-7 text-[#66736B]">{category.description}</p>
				<div className="mt-8">
					<ProductGrid products={products} />
				</div>
			</div>
		</main>
	);
}
