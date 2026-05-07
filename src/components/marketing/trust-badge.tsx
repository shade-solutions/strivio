import { CheckCircle2 } from "lucide-react";

export function TrustBadge({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center gap-2 rounded-2xl border border-[#E5E7E2] bg-white px-4 py-3 text-sm font-extrabold text-[#17211B] shadow-sm">
			<CheckCircle2 className="h-5 w-5 text-[#38C172]" aria-hidden />
			<span>{children}</span>
		</div>
	);
}
