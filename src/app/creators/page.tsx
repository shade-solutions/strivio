import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, BarChart3, UploadCloud } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Sell on Strivio",
	description: "Creator-first digital product selling, with future multi-vendor support.",
};

export default function CreatorsPage() {
	return (
		<main className="bg-[#FAFAF7] px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="max-w-3xl">
					<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">For creators</p>
					<h1 className="mt-3 text-5xl font-black leading-tight text-[#17211B]">A future home for practical digital products.</h1>
					<p className="mt-5 text-lg leading-8 text-[#66736B]">Strivio is starting admin-curated, with a clean path toward multi-vendor seller accounts, creator analytics, payouts, bundles, and affiliate tools.</p>
					<div className="mt-7">
						<ButtonLink href="/submit-product" size="lg">
							Submit a product
							<ArrowRight className="h-5 w-5" aria-hidden />
						</ButtonLink>
					</div>
				</div>
				<div className="mt-10 grid gap-5 lg:grid-cols-3">
					{[
						[UploadCloud, "Clear product pages", "Show previews, outcomes, formats, license, and support details."],
						[BadgeCheck, "Trust-first selling", "No fake urgency. No vague promises. Built for buyer confidence."],
						[BarChart3, "Future creator analytics", "Track views, sales, search terms, refunds, and opportunities."],
					].map(([Icon, title, copy]) => (
						<Card key={title as string} className="p-6">
							<Icon className="h-8 w-8 text-[#38C172]" aria-hidden />
							<h2 className="mt-4 text-2xl font-black text-[#17211B]">{title as string}</h2>
							<p className="mt-3 text-sm leading-6 text-[#66736B]">{copy as string}</p>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
}
