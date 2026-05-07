import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean;
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	size?: "sm" | "md" | "lg" | "icon";
};

export function Button({ asChild, className, variant = "primary", size = "md", ...props }: ButtonProps) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(
				"inline-flex items-center justify-center gap-2 rounded-2xl font-extrabold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38C172]/30 disabled:pointer-events-none disabled:opacity-50",
				"active:translate-y-0.5",
				variant === "primary" && "bg-[#38C172] text-[#0F3D2E] shadow-[0_8px_0_#0F3D2E] hover:-translate-y-0.5 hover:shadow-[0_10px_0_#0F3D2E]",
				variant === "secondary" && "bg-[#FFD166] text-[#17211B] shadow-[0_7px_0_#D59B1B] hover:-translate-y-0.5",
				variant === "outline" && "border-2 border-[#DDE4DC] bg-white text-[#17211B] shadow-sm hover:border-[#38C172] hover:bg-[#F4FFF8]",
				variant === "ghost" && "text-[#17211B] hover:bg-[#EEF7F0]",
				variant === "danger" && "bg-[#FF6B6B] text-white shadow-[0_7px_0_#B93D3D] hover:-translate-y-0.5",
				size === "sm" && "h-10 px-4 text-sm",
				size === "md" && "h-12 px-5 text-sm",
				size === "lg" && "h-14 px-7 text-base",
				size === "icon" && "h-11 w-11 p-0",
				className,
			)}
			{...props}
		/>
	);
}

export function ButtonLink({
	href,
	children,
	className,
	variant,
	size,
}: {
	href: string;
	children: ReactNode;
	className?: string;
	variant?: ButtonProps["variant"];
	size?: ButtonProps["size"];
}) {
	return (
		<Button asChild variant={variant} size={size} className={className}>
			<Link href={href}>{children}</Link>
		</Button>
	);
}
