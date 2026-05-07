import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { goals } from "@/data/catalog";
import { getGoalBySlug, getGoalProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/products/product-grid";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return goals.map((goal) => ({ slug: goal.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const goal = getGoalBySlug(slug);
	if (!goal) return {};
	return {
		title: `${goal.name} resources`,
		description: goal.description,
	};
}

export default async function GoalPage({ params }: PageProps) {
	const { slug } = await params;
	const goal = getGoalBySlug(slug);
	if (!goal) notFound();
	const products = getGoalProducts(slug);

	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Goal</p>
				<h1 className="mt-2 text-4xl font-black text-[#17211B] sm:text-5xl">{goal.name}</h1>
				<p className="mt-4 max-w-2xl text-base leading-7 text-[#66736B]">{goal.description}</p>
				<div className="mt-8">
					<ProductGrid products={products} />
				</div>
			</div>
		</main>
	);
}
