import Link from "next/link";
import { ArrowRight, Download, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/marketplace";
import { getCategoryBySlug } from "@/lib/catalog";
import { formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProductArtwork } from "@/components/products/product-artwork";
import { RatingStars } from "@/components/products/rating-stars";

const badgeVariant = {
	Bestseller: "yellow",
	New: "blue",
	"Staff Pick": "purple",
	"Beginner Friendly": "green",
	"Quick Win": "coral",
	"Creator Verified": "green",
} as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
	const category = getCategoryBySlug(product.categorySlug);

	return (
		<article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E7E2] bg-white shadow-[0_15px_35px_rgba(15,61,46,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,61,46,0.14)]">
			<Link href={`/products/${product.slug}`} className="block p-3 pb-0" aria-label={`View ${product.title}`}>
				<ProductArtwork title={product.title} category={category?.name ?? product.productType} variant={index} className="aspect-[1.24/1]" />
			</Link>
			<div className="flex flex-1 flex-col p-5">
				<div className="mb-3 flex flex-wrap items-center gap-2">
					<Badge variant={badgeVariant[product.badge]}>{product.badge}</Badge>
					<span className="inline-flex items-center gap-1 rounded-full bg-[#F4F7F4] px-3 py-1 text-xs font-extrabold text-[#66736B]">
						<Download className="h-3.5 w-3.5" aria-hidden />
						Instant download
					</span>
				</div>
				<Link href={`/products/${product.slug}`} className="group/title">
					<h3 className="text-lg font-black leading-snug text-[#17211B] group-hover/title:text-[#0F3D2E]">{product.title}</h3>
				</Link>
				<p className="mt-2 line-clamp-2 text-sm leading-6 text-[#66736B]">{product.subtitle}</p>
				<div className="mt-4 flex items-center justify-between gap-3">
					<RatingStars rating={product.ratingAverage} />
					<span className="text-xs font-bold text-[#66736B]">{product.salesCount.toLocaleString()} sold</span>
				</div>
				<div className="mt-5 flex items-end justify-between gap-3">
					<div>
						<p className="text-xs font-bold text-[#66736B]">{category?.name}</p>
						<div className="flex items-baseline gap-2">
							<p className="text-2xl font-black text-[#17211B]">{formatMoney(product.price, product.currency)}</p>
							{product.compareAtPrice ? <p className="text-sm font-bold text-[#9AA59E] line-through">{formatMoney(product.compareAtPrice, product.currency)}</p> : null}
						</div>
					</div>
					<ButtonLink href={`/products/${product.slug}`} variant="outline" size="sm" className="rounded-xl">
						<span className="hidden sm:inline">View</span>
						<ArrowRight className="h-4 w-4" aria-hidden />
					</ButtonLink>
				</div>
				<form action="/api/checkout/create" method="post" className="mt-4">
					<input type="hidden" name="productSlug" value={product.slug} />
					<button className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#0F3D2E] px-4 text-sm font-black text-white transition hover:bg-[#14543F]" type="submit">
						<ShoppingCart className="h-4 w-4" aria-hidden />
						Get instant access
					</button>
				</form>
			</div>
		</article>
	);
}
