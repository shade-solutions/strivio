import Link from "next/link";
import type { Goal } from "@/types/marketplace";
import { Icon } from "@/components/ui/icon";

export function GoalCard({ goal, index = 0 }: { goal: Goal; index?: number }) {
	const accents = ["#38C172", "#3BA7FF", "#FFD166", "#FF6B6B", "#7C5CFF"];
	const accent = accents[index % accents.length];

	return (
		<Link
			href={`/goal/${goal.slug}`}
			className="group rounded-3xl border border-[#E5E7E2] bg-white p-5 shadow-[0_14px_30px_rgba(15,61,46,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(15,61,46,0.12)]"
		>
			<div className="mb-5 flex items-center justify-between">
				<span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ backgroundColor: `${accent}24`, color: accent }}>
					<Icon name={goal.icon} className="h-6 w-6" />
				</span>
				<span className="rounded-full bg-[#FAFAF7] px-3 py-1 text-xs font-black text-[#66736B]">Goal</span>
			</div>
			<h3 className="text-lg font-black text-[#17211B] group-hover:text-[#0F3D2E]">{goal.name}</h3>
			<p className="mt-2 text-sm leading-6 text-[#66736B]">{goal.description}</p>
		</Link>
	);
}
