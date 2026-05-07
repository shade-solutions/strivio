import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/catalog";
import { requireAdmin } from "@/lib/auth";
import { formatMoney } from "@/lib/utils";
import { AdminShell } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin products" };

export default async function AdminProductsPage() {
	await requireAdmin();
	return (
		<AdminShell>
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-4xl font-black text-[#17211B]">Products</h1>
					<p className="mt-2 text-[#66736B]">Manage titles, pricing, assets, previews, SEO, and publishing workflow.</p>
				</div>
				<ButtonLink href="/admin/products/new">New product</ButtonLink>
			</div>
			<Card className="overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[820px] text-left text-sm">
						<thead className="bg-[#FAFAF7] text-xs uppercase tracking-[0.08em] text-[#66736B]">
							<tr>
								<th className="px-4 py-3">Product</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Price</th>
								<th className="px-4 py-3">Sales</th>
								<th className="px-4 py-3">Rating</th>
								<th className="px-4 py-3">Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id} className="border-t border-[#E5E7E2]">
									<td className="px-4 py-3 font-black text-[#17211B]">{product.title}</td>
									<td className="px-4 py-3"><StatusBadge status={product.status} /></td>
									<td className="px-4 py-3 font-bold text-[#66736B]">{formatMoney(product.price)}</td>
									<td className="px-4 py-3 font-bold text-[#66736B]">{product.salesCount.toLocaleString()}</td>
									<td className="px-4 py-3 font-bold text-[#66736B]">{product.ratingAverage.toFixed(1)}</td>
									<td className="px-4 py-3"><Link href={`/admin/products/${product.id}`} className="font-black text-[#0F3D2E]">Edit</Link></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>
		</AdminShell>
	);
}
