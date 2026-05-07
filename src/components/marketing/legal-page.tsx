import { legalStarterNotice } from "@/config/site";
import { Card } from "@/components/ui/card";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-3xl">
				<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Legal</p>
				<h1 className="mt-2 text-4xl font-black text-[#17211B]">{title}</h1>
				<Card className="mt-6 border-[#FFD166] bg-[#FFF9E8] p-4 text-sm font-bold leading-6 text-[#6B4A00]">
					{legalStarterNotice}
				</Card>
				<Card className="mt-6 p-7">
					<div className="space-y-5 text-sm leading-7 text-[#66736B]">{children}</div>
				</Card>
			</div>
		</main>
	);
}
