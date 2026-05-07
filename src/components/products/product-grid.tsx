import type { Product } from "@/types/marketplace";
import { ProductCard } from "@/components/products/product-card";

export function ProductGrid({ products, emptyLabel = "No matching resources yet." }: { products: Product[]; emptyLabel?: string }) {
	if (products.length === 0) {
		return (
			<div className="rounded-3xl border-2 border-dashed border-[#DDE4DC] bg-white p-10 text-center">
				<p className="text-lg font-black text-[#17211B]">{emptyLabel}</p>
				<p className="mt-2 text-sm text-[#66736B]">Try a broader search or browse by goal instead.</p>
			</div>
		);
	}

	return (
		<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product, index) => (
				<ProductCard key={product.id} product={product} index={index} />
			))}
		</div>
	);
}
