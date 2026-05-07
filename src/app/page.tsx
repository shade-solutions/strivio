import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Trophy, Zap } from "lucide-react";
import { categories, goals } from "@/data/catalog";
import { bestSellers, newDrops, quickWins, staffPicks } from "@/lib/catalog";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Card, Section, SectionHeading } from "@/components/ui/card";
import { ProductGrid } from "@/components/products/product-grid";
import { SearchBar } from "@/components/marketing/search-bar";
import { GoalCard } from "@/components/marketing/goal-card";
import { CategoryPill } from "@/components/marketing/category-pill";
import { TrustBadge } from "@/components/marketing/trust-badge";
import { ProgressCard } from "@/components/gamification/progress-card";

export default function Home() {
	return (
		<main className="bg-[#FAFAF7]">
			<section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
				<div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#38C172]/15 blur-3xl" />
				<div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="relative">
						<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DDE4DC] bg-white px-4 py-2 text-sm font-black text-[#0F3D2E] shadow-sm">
							<Sparkles className="h-4 w-4 text-[#38C172]" aria-hidden />
							{siteConfig.tagline}
						</div>
						<h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-[#17211B] sm:text-6xl lg:text-7xl">
							Digital products that help you move faster.
						</h1>
						<p className="mt-6 max-w-2xl text-lg leading-8 text-[#66736B]">
							Discover ready-to-use templates, guides, tools, prompts, planners, and creative resources built to save time and help you grow.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<ButtonLink href="/explore" size="lg">
								Explore products
								<ArrowRight className="h-5 w-5" aria-hidden />
							</ButtonLink>
							<ButtonLink href="#best-sellers" variant="outline" size="lg">
								See best sellers
							</ButtonLink>
						</div>
						<div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{siteConfig.trustLines.slice(0, 6).map((line) => (
								<TrustBadge key={line}>{line}</TrustBadge>
							))}
						</div>
					</div>
					<div className="relative">
						<Card className="p-4 sm:p-5">
							<div className="rounded-[1.4rem] bg-gradient-to-br from-[#38C172] via-[#F7FFF9] to-[#3BA7FF] p-5">
								<div className="rounded-3xl bg-white/90 p-5 shadow-xl">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Today&apos;s pick</p>
											<h2 className="mt-1 text-2xl font-black text-[#17211B]">Startup Launch Sprint Kit</h2>
										</div>
										<span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFD166] text-[#17211B]">
											<Trophy className="h-6 w-6" aria-hidden />
										</span>
									</div>
									<p className="mt-4 text-sm leading-6 text-[#66736B]">
										Skip the blank page with a launch checklist, page copy prompts, Canva assets, and a Notion sprint board.
									</p>
									<div className="mt-5 grid gap-3">
										{["Clear previews before you buy", "Instant delivery after checkout", "Built for practical results"].map((item) => (
											<div key={item} className="flex items-center gap-2 rounded-2xl bg-[#FAFAF7] p-3 text-sm font-extrabold text-[#17211B]">
												<CheckCircle2 className="h-5 w-5 text-[#38C172]" aria-hidden />
												{item}
											</div>
										))}
									</div>
								</div>
							</div>
						</Card>
						<div className="mt-5">
							<ProgressCard />
						</div>
					</div>
				</div>
			</section>

			<Section className="pt-0">
				<SearchBar />
			</Section>

			<Section>
				<SectionHeading
					kicker="Browse by goal"
					title="Find tools for your next step."
					description="Browse by goal, not just by category. A smarter way to start."
				/>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{goals.map((goal, index) => (
						<GoalCard key={goal.slug} goal={goal} index={index} />
					))}
				</div>
			</Section>

			<Section className="bg-white/55">
				<SectionHeading kicker="Featured categories" title="Templates, tools, and guides for action takers." />
				<div className="flex flex-wrap gap-3">
					{categories.map((category) => (
						<CategoryPill key={category.slug} category={category} />
					))}
				</div>
			</Section>

			<Section id="best-sellers">
				<SectionHeading
					kicker="Best sellers"
					title="Popular shortcuts buyers come back for."
					description="No fluff. Just practical digital resources with clear outcomes."
					action={
						<ButtonLink href="/explore?sort=popular" variant="outline">
							View all
						</ButtonLink>
					}
				/>
				<ProductGrid products={bestSellers(4)} />
			</Section>

			<Section className="bg-white/55">
				<SectionHeading kicker="Quick wins" title="Small prices. Useful progress." description="Start with a small win today." />
				<ProductGrid products={quickWins(4)} />
			</Section>

			<Section>
				<SectionHeading kicker="Staff picks" title="Carefully reviewed resources worth opening first." />
				<ProductGrid products={staffPicks(4)} />
			</Section>

			<Section className="bg-white/55">
				<SectionHeading kicker="New drops" title="Fresh tools for work, life, and growth." />
				<ProductGrid products={newDrops(4)} />
			</Section>

			<Section>
				<div className="grid gap-5 lg:grid-cols-3">
					{[
						["1", "Preview clearly", "Know exactly what you are getting before you buy."],
						["2", "Checkout securely", "Trusted checkout. Clear downloads. Simple support."],
						["3", "Use it today", "Instant delivery. Lifetime access where applicable."],
					].map(([step, title, copy]) => (
						<Card key={step} className="p-6">
							<div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#38C172] text-xl font-black text-[#0F3D2E] shadow-[0_5px_0_#0F3D2E]">
								{step}
							</div>
							<h3 className="text-2xl font-black text-[#17211B]">{title}</h3>
							<p className="mt-3 text-sm leading-6 text-[#66736B]">{copy}</p>
						</Card>
					))}
				</div>
			</Section>

			<Section className="bg-[#0F3D2E] text-white">
				<div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<div>
						<p className="text-sm font-black uppercase tracking-[0.08em] text-[#FFD166]">Trust-first marketplace</p>
						<h2 className="mt-3 text-4xl font-black leading-tight">Secure checkout. Clear downloads. Simple support.</h2>
						<p className="mt-4 text-base leading-7 text-white/75">
							Everything here is designed to save you time. Product previews, file formats, license terms, delivery notes, and refund expectations are shown before purchase.
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						{siteConfig.trustLines.slice(3).map((line) => (
							<div key={line} className="flex items-center gap-2 rounded-2xl bg-white/10 p-4 text-sm font-extrabold">
								<ShieldCheck className="h-5 w-5 text-[#38C172]" aria-hidden />
								{line}
							</div>
						))}
					</div>
				</div>
			</Section>

			<Section>
				<SectionHeading kicker="What buyers say" title="Built for people who want progress, not complexity." />
				<div className="grid gap-5 lg:grid-cols-3">
					{[
						["I bought a planner and had it customized before lunch. The preview matched what I received.", "Maya", "Student founder"],
						["The prompt pack paid for itself in one client email. Practical and refreshingly clear.", "Jon", "Freelance marketer"],
						["Strivio feels like a library of tiny head starts. No physical shipping, no waiting.", "Ari", "Creator"],
					].map(([quote, name, role]) => (
						<Card key={name} className="p-6">
							<p className="text-base leading-7 text-[#17211B]">&ldquo;{quote}&rdquo;</p>
							<p className="mt-5 font-black text-[#17211B]">{name}</p>
							<p className="text-sm font-semibold text-[#66736B]">{role}</p>
						</Card>
					))}
				</div>
			</Section>

			<Section className="bg-white/55">
				<SectionHeading kicker="FAQ" title="Before you buy." />
				<div className="grid gap-4">
					{[
						["When do I get access?", "Access is granted after Dodo confirms payment through a verified webhook. You will see purchases in your Strivio library."],
						["Are these physical products?", "No. Strivio sells digital products only. No physical shipping. No waiting."],
						["Can I get a refund?", "Because digital products are delivered instantly, refunds are reviewed case by case when a file is broken, misleading, inaccessible, or not as described."],
					].map(([question, answer]) => (
						<Card key={question} className="p-6">
							<h3 className="font-black text-[#17211B]">{question}</h3>
							<p className="mt-2 text-sm leading-6 text-[#66736B]">{answer}</p>
						</Card>
					))}
				</div>
			</Section>

			<Section>
				<div className="rounded-[2rem] bg-gradient-to-br from-[#38C172] to-[#3BA7FF] p-8 text-[#0F3D2E] sm:p-10">
					<div className="max-w-3xl">
						<Zap className="h-10 w-10" aria-hidden />
						<h2 className="mt-4 text-4xl font-black leading-tight">Ready-to-use resources for your next step.</h2>
						<p className="mt-3 text-lg font-semibold">Buy smarter. Download instantly. Grow faster.</p>
						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<ButtonLink href="/explore" size="lg">
								Explore products
							</ButtonLink>
							<Link href="/collections/beginner-friendly" className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-6 font-black text-[#17211B]">
								Start here
							</Link>
						</div>
					</div>
				</div>
			</Section>
		</main>
	);
}
