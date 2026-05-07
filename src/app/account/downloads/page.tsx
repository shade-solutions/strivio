import type { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Downloads",
	description: "Securely access purchased Strivio downloads.",
};

export default async function DownloadsPage() {
	await stackServerApp.getUser({ or: "redirect" });

	return (
		<main className="min-h-[70vh] bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<h1 className="text-4xl font-black text-[#17211B]">Downloads</h1>
				<Card className="mt-6 p-6">
					<p className="font-black text-[#17211B]">Secure download access</p>
					<p className="mt-2 text-sm leading-6 text-[#66736B]">
						Downloads require an active purchase. Private files are delivered through Dodo where possible or short-lived R2 URLs when custom delivery is enabled.
					</p>
				</Card>
			</div>
		</main>
	);
}
