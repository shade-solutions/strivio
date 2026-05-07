import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Checkout success" };

export default function CheckoutSuccessPage() {
	return (
		<main className="min-h-[70vh] bg-[#FAFAF7] px-4 py-16 sm:px-6 lg:px-8">
			<Card className="mx-auto max-w-2xl p-8 text-center">
				<div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#DFF8E9] text-[#0F3D2E]">
					<CheckCircle2 className="h-8 w-8" aria-hidden />
				</div>
				<h1 className="mt-5 text-3xl font-black text-[#17211B]">Checkout received.</h1>
				<p className="mt-3 text-sm leading-6 text-[#66736B]">
					Access is not granted from this page alone. Your purchase appears in your library after Dodo confirms payment through a verified webhook.
				</p>
				<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
					<ButtonLink href="/account/library">Open my library</ButtonLink>
					<ButtonLink href="/support" variant="outline">Need help?</ButtonLink>
				</div>
			</Card>
		</main>
	);
}
