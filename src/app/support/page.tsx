import type { Metadata } from "next";
import { LifeBuoy, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export const metadata: Metadata = {
	title: "Support",
	description: "Get help with purchases, downloads, refunds, and product access.",
};

export default function SupportPage() {
	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<div className="grid h-14 w-14 place-items-center rounded-3xl bg-[#DFF8E9] text-[#0F3D2E]">
						<LifeBuoy className="h-7 w-7" aria-hidden />
					</div>
					<h1 className="mt-5 text-4xl font-black text-[#17211B]">Helpful support if you get stuck.</h1>
					<p className="mt-4 leading-7 text-[#66736B]">
						Use this for broken files, access issues, refund questions, or product clarification. We review digital refunds case by case.
					</p>
				</div>
				<Card className="p-6">
					<form action="/api/support" method="post" className="grid gap-4">
						<div>
							<label className="text-sm font-black text-[#17211B]" htmlFor="email">Email</label>
							<Input id="email" name="email" type="email" placeholder="you@example.com" required />
						</div>
						<div>
							<label className="text-sm font-black text-[#17211B]" htmlFor="subject">Subject</label>
							<Input id="subject" name="subject" placeholder="I need help with..." required />
						</div>
						<div>
							<label className="text-sm font-black text-[#17211B]" htmlFor="message">Message</label>
							<Textarea id="message" name="message" placeholder="Tell us what happened." required />
						</div>
						<Button type="submit">
							<Mail className="h-4 w-4" aria-hidden />
							Send support request
						</Button>
					</form>
				</Card>
			</div>
		</main>
	);
}
