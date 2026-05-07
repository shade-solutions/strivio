import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Download, FileArchive, LifeBuoy, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { products } from "@/data/catalog";
import { getCategoryBySlug, getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { absoluteUrl, formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, Section, SectionHeading } from "@/components/ui/card";
import { ProductArtwork } from "@/components/products/product-artwork";
import { ProductGrid } from "@/components/products/product-grid";
import { RatingStars } from "@/components/products/rating-stars";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const product = getProductBySlug(slug);
	if (!product) return {};
	return {
		title: product.seoTitle,
		description: product.seoDescription,
		openGraph: {
			title: product.title,
			description: product.subtitle,
			url: absoluteUrl(`/products/${product.slug}`),
			type: "website",
		},
		alternates: {
			canonical: absoluteUrl(`/products/${product.slug}`),
		},
	};
}

export default async function ProductPage({ params }: PageProps) {
	const { slug } = await params;
	const product = getProductBySlug(slug);
	if (!product) notFound();
	const category = getCategoryBySlug(product.categorySlug);
	const related = getRelatedProducts(product);
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.title,
		description: product.subtitle,
		brand: { "@type": "Brand", name: "Strivio" },
		offers: {
			"@type": "Offer",
			price: product.price / 100,
			priceCurrency: product.currency,
			availability: "https://schema.org/InStock",
			url: absoluteUrl(`/products/${product.slug}`),
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: product.ratingAverage,
			reviewCount: product.ratingCount,
		},
	};

	return (
		<main className="bg-[#FAFAF7]">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<Section>
				<div className="grid gap-8 lg:grid-cols-[1fr_26rem] lg:items-start">
					<div>
						<div className="mb-5 flex flex-wrap items-center gap-2">
							<Badge>{product.badge}</Badge>
							<Badge variant="neutral">{category?.name}</Badge>
							<Badge variant="blue">{product.difficultyLevel}</Badge>
						</div>
						<h1 className="max-w-4xl text-4xl font-black leading-tight text-[#17211B] sm:text-6xl">{product.title}</h1>
						<p className="mt-5 max-w-2xl text-lg leading-8 text-[#66736B]">{product.subtitle}</p>
						<div className="mt-6 flex flex-wrap items-center gap-4">
							<RatingStars rating={product.ratingAverage} count={product.ratingCount} />
							<span className="text-sm font-bold text-[#66736B]">{product.salesCount.toLocaleString()} demo sales</span>
							<span className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D2E]">
								<Download className="h-4 w-4" aria-hidden />
								Instant access after checkout
							</span>
						</div>
						<div className="mt-8">
							<ProductArtwork title={product.title} category={category?.name ?? product.productType} className="min-h-[24rem]" />
						</div>
					</div>
					<Card className="sticky top-28 p-6">
						<p className="text-sm font-black text-[#66736B]">Price</p>
						<div className="mt-2 flex items-baseline gap-3">
							<p className="text-4xl font-black text-[#17211B]">{formatMoney(product.price, product.currency)}</p>
							{product.compareAtPrice ? <p className="text-lg font-bold text-[#9AA59E] line-through">{formatMoney(product.compareAtPrice, product.currency)}</p> : null}
						</div>
						<form action="/api/checkout/create" method="post" className="mt-6">
							<input type="hidden" name="productSlug" value={product.slug} />
							<Button type="submit" size="lg" className="w-full">
								Get instant access
							</Button>
						</form>
						<div className="mt-5 grid gap-3 text-sm font-bold text-[#66736B]">
							<div className="flex items-center gap-2">
								<LockKeyhole className="h-4 w-4 text-[#38C172]" aria-hidden />
								Secure checkout through Dodo Payments
							</div>
							<div className="flex items-center gap-2">
								<ShieldCheck className="h-4 w-4 text-[#38C172]" aria-hidden />
								Access granted only after verified payment
							</div>
							<div className="flex items-center gap-2">
								<FileArchive className="h-4 w-4 text-[#38C172]" aria-hidden />
								{product.format}
							</div>
						</div>
						<div className="mt-5 rounded-2xl bg-[#FAFAF7] p-4 text-sm leading-6 text-[#66736B]">
							<p className="font-black text-[#17211B]">Still unsure?</p>
							<p>Know exactly what you are getting before you buy. Check the previews, compatibility, license, and refund summary below.</p>
							<Link href="/support" className="mt-2 inline-flex items-center gap-2 font-black text-[#0F3D2E]">
								<LifeBuoy className="h-4 w-4" aria-hidden />
								Ask support
							</Link>
						</div>
					</Card>
				</div>
			</Section>

			<Section className="pt-0">
				<div className="grid gap-5 lg:grid-cols-3">
					<InfoCard title="What you get" items={product.whatIncluded} />
					<InfoCard title="Perfect for" items={product.whoItsFor} />
					<InfoCard title="Use it today for" items={product.useItTodayFor} />
				</div>
			</Section>

			<Section className="bg-white/55">
				<div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
					<Card className="p-6">
						<Sparkles className="h-8 w-8 text-[#38C172]" aria-hidden />
						<h2 className="mt-4 text-3xl font-black text-[#17211B]">Why people buy this</h2>
						<p className="mt-4 leading-7 text-[#66736B]">{product.problemSolved}</p>
						<p className="mt-4 leading-7 text-[#66736B]">Built for people who want progress, not complexity. No fluff. Just practical digital resources.</p>
					</Card>
					<Card className="p-6">
						<h2 className="text-3xl font-black text-[#17211B]">How to use it</h2>
						<div className="mt-5 grid gap-4">
							{product.howToUse.map((step, index) => (
								<div key={step} className="flex gap-3">
									<span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#38C172] text-sm font-black text-[#0F3D2E]">{index + 1}</span>
									<p className="pt-1 text-sm leading-6 text-[#66736B]">{step}</p>
								</div>
							))}
						</div>
					</Card>
				</div>
			</Section>

			<Section>
				<div className="grid gap-5 lg:grid-cols-2">
					<Card className="p-6">
						<h2 className="text-2xl font-black text-[#17211B]">Before you buy</h2>
						<ul className="mt-4 grid gap-3">
							{product.beforeYouBuy.map((item) => (
								<li key={item} className="flex gap-2 text-sm leading-6 text-[#66736B]">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#38C172]" aria-hidden />
									{item}
								</li>
							))}
						</ul>
					</Card>
					<Card className="p-6">
						<h2 className="text-2xl font-black text-[#17211B]">Format, delivery, and license</h2>
						<div className="mt-4 grid gap-3 text-sm leading-6 text-[#66736B]">
							<p><strong className="text-[#17211B]">Format:</strong> {product.format}</p>
							<p><strong className="text-[#17211B]">Delivery:</strong> {product.deliveryMethod}</p>
							<p><strong className="text-[#17211B]">Compatibility:</strong> {product.compatibility}</p>
							<p><strong className="text-[#17211B]">License:</strong> {product.licenseType}</p>
							<p><strong className="text-[#17211B]">Refunds:</strong> {product.refundPolicyType}</p>
						</div>
					</Card>
				</div>
			</Section>

			<Section className="bg-white/55">
				<SectionHeading kicker="FAQ" title="Common questions." />
				<div className="grid gap-4">
					{product.faq.map((item) => (
						<Card key={item.question} className="p-6">
							<h3 className="font-black text-[#17211B]">{item.question}</h3>
							<p className="mt-2 text-sm leading-6 text-[#66736B]">{item.answer}</p>
						</Card>
					))}
				</div>
			</Section>

			<Section>
				<SectionHeading kicker="Related products" title="More tools for your next step." />
				<ProductGrid products={related} />
			</Section>
		</main>
	);
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
	return (
		<Card className="p-6">
			<h2 className="text-2xl font-black text-[#17211B]">{title}</h2>
			<ul className="mt-4 grid gap-3">
				{items.map((item) => (
					<li key={item} className="flex gap-2 text-sm leading-6 text-[#66736B]">
						<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#38C172]" aria-hidden />
						{item}
					</li>
				))}
			</ul>
		</Card>
	);
}
