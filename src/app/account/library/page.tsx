import type { Metadata } from "next";
import Link from "next/link";
import { Download, LibraryBig } from "lucide-react";
import { stackServerApp } from "@/stack/server";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "My library",
	description: "Access purchased Strivio digital products.",
};

export default async function LibraryPage() {
	const user = await stackServerApp.getUser({ or: "redirect" });

	return (
		<main className="min-h-[70vh] bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Buyer library</p>
				<h1 className="mt-2 text-4xl font-black text-[#17211B]">Welcome back{user.displayName ? `, ${user.displayName}` : ""}.</h1>
				<p className="mt-3 max-w-2xl text-[#66736B]">Purchases appear here after Dodo confirms payment through a verified webhook.</p>
				<Card className="mt-8 p-8 text-center">
					<div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#DFF8E9] text-[#0F3D2E]">
						<LibraryBig className="h-8 w-8" aria-hidden />
					</div>
					<h2 className="mt-5 text-2xl font-black text-[#17211B]">Your purchases will show here.</h2>
					<p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#66736B]">
						Instant delivery is enabled only after payment verification. This protects buyers and prevents fake success-page access.
					</p>
					<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
						<ButtonLink href="/explore">Explore products</ButtonLink>
						<Link href="/account/downloads" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#E5E7E2] bg-white px-5 text-sm font-black text-[#17211B]">
							<Download className="h-4 w-4" aria-hidden />
							Downloads
						</Link>
					</div>
				</Card>
			</div>
		</main>
	);
}
