import type { Metadata } from "next";
import { Bot, ShieldAlert } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin AI assistant" };

const workflows = [
	"Product Listing Agent",
	"SEO Agent",
	"Trust Copy Agent",
	"Bundle Agent",
	"Support Agent",
	"Analytics Agent",
	"Quality Control Agent",
	"Refund Review Agent",
	"Catalog Cleanup Agent",
	"Growth Agent",
];

export default async function AdminAIPage() {
	await requireAdmin();
	return (
		<AdminShell>
			<h1 className="text-4xl font-black text-[#17211B]">AI assistant</h1>
			<p className="mt-2 max-w-2xl text-[#66736B]">Draft-only AI workflows for product copy, SEO, support, analytics, quality control, bundles, refunds, catalog cleanup, and growth ideas.</p>
			<div className="mt-6 grid gap-4 lg:grid-cols-2">
				{workflows.map((workflow) => (
					<Card key={workflow} className="p-5">
						<Bot className="h-6 w-6 text-[#38C172]" aria-hidden />
						<h2 className="mt-3 font-black text-[#17211B]">{workflow}</h2>
						<p className="mt-2 text-sm leading-6 text-[#66736B]">Produces drafts or recommendations only. Destructive and financial actions require explicit human approval.</p>
					</Card>
				))}
			</div>
			<Card className="mt-6 border-[#FFD166] bg-[#FFF9E8] p-5">
				<div className="flex gap-3">
					<ShieldAlert className="h-6 w-6 shrink-0 text-[#8A6200]" aria-hidden />
					<p className="text-sm font-bold leading-6 text-[#6B4A00]">Prompt-injection warning: product descriptions, reviews, support tickets, and uploaded files are untrusted input.</p>
				</div>
			</Card>
		</AdminShell>
	);
}
