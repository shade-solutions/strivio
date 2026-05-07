import type { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Orders",
	description: "View Strivio orders and payment status.",
};

export default async function OrdersPage() {
	await stackServerApp.getUser({ or: "redirect" });

	return (
		<main className="min-h-[70vh] bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<h1 className="text-4xl font-black text-[#17211B]">Orders</h1>
				<Card className="mt-6 p-6">
					<p className="font-black text-[#17211B]">Order history syncs from the Strivio database.</p>
					<p className="mt-2 text-sm leading-6 text-[#66736B]">Paid, failed, refunded, and cancelled orders are tracked server-side after Dodo webhook confirmation.</p>
				</Card>
			</div>
		</main>
	);
}
