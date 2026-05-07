import { Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductArtwork({
	title,
	category,
	className,
	variant = 0,
}: {
	title: string;
	category: string;
	className?: string;
	variant?: number;
}) {
	const palettes = [
		"from-[#38C172] via-[#DDF8E8] to-[#3BA7FF]",
		"from-[#FFD166] via-[#FFF4CB] to-[#FF6B6B]",
		"from-[#7C5CFF] via-[#ECE7FF] to-[#3BA7FF]",
		"from-[#0F3D2E] via-[#CFF7DF] to-[#38C172]",
		"from-[#FF6B6B] via-[#FFE1E1] to-[#FFD166]",
	];

	return (
		<div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br p-5", palettes[variant % palettes.length], className)}>
			<div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/35" />
			<div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-white/25" />
			<div className="relative flex h-full min-h-44 flex-col justify-between">
				<div className="flex items-center justify-between">
					<span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-[#0F3D2E]">{category}</span>
					<span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/85 text-[#0F3D2E] shadow-sm">
						<Sparkles className="h-5 w-5" aria-hidden />
					</span>
				</div>
				<div>
					<p className="max-w-[13rem] text-2xl font-black leading-tight text-[#0F3D2E]">{title}</p>
					<div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#17211B] px-3 py-1 text-xs font-extrabold text-white">
						<Download className="h-3.5 w-3.5" aria-hidden />
						Instant download
					</div>
				</div>
			</div>
		</div>
	);
}
