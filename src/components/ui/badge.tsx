import { cn } from "@/lib/utils";

const variants = {
	green: "bg-[#DFF8E9] text-[#0F3D2E] border-[#BDEFCF]",
	blue: "bg-[#E7F4FF] text-[#0D4775] border-[#CDE8FF]",
	yellow: "bg-[#FFF4CC] text-[#6B4A00] border-[#FFE8A3]",
	coral: "bg-[#FFE8E8] text-[#8C2F2F] border-[#FFD0D0]",
	purple: "bg-[#EEE9FF] text-[#352276] border-[#DAD2FF]",
	neutral: "bg-white text-[#66736B] border-[#E5E7E2]",
};

export function Badge({
	children,
	className,
	variant = "green",
}: {
	children: React.ReactNode;
	className?: string;
	variant?: keyof typeof variants;
}) {
	return (
		<span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-extrabold", variants[variant], className)}>
			{children}
		</span>
	);
}
