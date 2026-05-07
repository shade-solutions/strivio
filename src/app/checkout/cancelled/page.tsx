import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Checkout cancelled" };

export default function CheckoutCancelledPage() {
	return (
		<main className="min-h-[70vh] bg-[#FAFAF7] px-4 py-16 sm:px-6 lg:px-8">
			<Card className="mx-auto max-w-2xl p-8 text-center">
				<h1 className="text-3xl font-black text-[#17211B]">Checkout cancelled.</h1>
				<p className="mt-3 text-sm leading-6 text-[#66736B]">No payment was completed. You can keep browsing and start again whenever you are ready.</p>
				<div className="mt-6">
					<ButtonLink href="/explore">Back to products</ButtonLink>
				</div>
			</Card>
		</main>
	);
}
