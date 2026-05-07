import { Flame, Trophy, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ProgressCard() {
	return (
		<Card className="p-5">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-xs font-black uppercase tracking-[0.08em] text-[#38C172]">Today&apos;s path</p>
					<h3 className="mt-1 text-xl font-black text-[#17211B]">Start with a small win today.</h3>
				</div>
				<span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF4CC] text-[#8A6200]">
					<Flame className="h-6 w-6" aria-hidden />
				</span>
			</div>
			<div className="mt-5 grid gap-3">
				{[
					["Browse by goal", "Find the outcome you want", Zap],
					["Preview clearly", "Know exactly what you are getting", Trophy],
					["Download instantly", "Use it when payment is verified", Flame],
				].map(([title, copy, Icon]) => (
					<div key={title as string} className="flex items-center gap-3 rounded-2xl bg-[#FAFAF7] p-3">
						<span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#38C172]">
							<Icon className="h-4 w-4" aria-hidden />
						</span>
						<div>
							<p className="text-sm font-black text-[#17211B]">{title as string}</p>
							<p className="text-xs font-semibold text-[#66736B]">{copy as string}</p>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
