import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={cn(
				"h-12 w-full rounded-2xl border-2 border-[#E5E7E2] bg-white px-4 text-sm font-semibold text-[#17211B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#38C172] focus:ring-4 focus:ring-[#38C172]/20",
				className,
			)}
			{...props}
		/>
	);
});

Input.displayName = "Input";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<textarea
			className={cn(
				"min-h-32 w-full rounded-2xl border-2 border-[#E5E7E2] bg-white px-4 py-3 text-sm font-semibold text-[#17211B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#38C172] focus:ring-4 focus:ring-[#38C172]/20",
				className,
			)}
			{...props}
		/>
	);
}
