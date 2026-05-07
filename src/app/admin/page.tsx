import type { Metadata } from "next";
import { products } from "@/data/catalog";
import { requireAdmin } from "@/lib/auth";
import { formatMoney } from "@/lib/utils";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminMetricCard } from "@/components/admin/admin-metric-card";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin dashboard" };

export default async function AdminPage() {
	await requireAdmin();
	const revenue = products.reduce((sum, product) => sum + product.price * product.salesCount, 0);

	return (
		<AdminShell>
			<div className="mb-6">
				<h1 className="text-4xl font-black text-[#17211B]">Revenue and operations</h1>
				<p className="mt-2 text-[#66736B]">A trust-first command center for catalog, payments, support, analytics, and AI workflows.</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<AdminMetricCard label="Demo revenue" value={formatMoney(revenue)} detail="Seed catalog estimate" />
				<AdminMetricCard label="Conversion rate" value="4.8%" detail="PostHog-ready metric" />
				<AdminMetricCard label="Products" value={String(products.length)} detail="Published demo catalog" />
				<AdminMetricCard label="Failed payments" value="0" detail="Dodo webhook feed pending" />
			</div>
			<div className="mt-6 grid gap-5 lg:grid-cols-2">
				<Card className="p-6">
					<h2 className="text-2xl font-black text-[#17211B]">Best sellers</h2>
					<div className="mt-4 grid gap-3">
						{products.slice(0, 6).map((product) => (
							<div key={product.slug} className="flex items-center justify-between gap-4 rounded-2xl bg-[#FAFAF7] p-3">
								<span className="text-sm font-black text-[#17211B]">{product.title}</span>
								<span className="text-sm font-bold text-[#66736B]">{product.salesCount.toLocaleString()}</span>
							</div>
						))}
					</div>
				</Card>
				<Card className="p-6">
					<h2 className="text-2xl font-black text-[#17211B]">Agent guardrails</h2>
					<ul className="mt-4 grid gap-3 text-sm leading-6 text-[#66736B]">
						<li>Read-only tools by default.</li>
						<li>Human approval required for refunds, deletion, price changes, mass emails, and access revocation.</li>
						<li>User-generated descriptions, reviews, support tickets, and uploads are treated as untrusted input.</li>
					</ul>
				</Card>
			</div>
		</AdminShell>
	);
}
