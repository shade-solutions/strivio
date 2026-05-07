import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";

export const metadata: Metadata = {
	title: "Submit a product",
	description: "Submit a digital product for Strivio review.",
};

export default function SubmitProductPage() {
	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Product submission</p>
					<h1 className="mt-3 text-4xl font-black text-[#17211B]">Share a useful digital resource.</h1>
					<p className="mt-4 leading-7 text-[#66736B]">Initial submissions are reviewed by admins. Future creator mode will add seller accounts and payouts.</p>
				</div>
				<Card className="p-6">
					<form action="/api/admin/ai/product-copy" method="post" className="grid gap-4">
						<div>
							<label className="text-sm font-black text-[#17211B]" htmlFor="title">Product title</label>
							<Input id="title" name="title" required />
						</div>
						<div>
							<label className="text-sm font-black text-[#17211B]" htmlFor="email">Contact email</label>
							<Input id="email" name="email" type="email" required />
						</div>
						<div>
							<label className="text-sm font-black text-[#17211B]" htmlFor="description">What does it help buyers do?</label>
							<Textarea id="description" name="description" required />
						</div>
						<Button type="submit">Draft product copy</Button>
					</form>
				</Card>
			</div>
		</main>
	);
}
