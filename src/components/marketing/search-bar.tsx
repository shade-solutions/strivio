import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar({
	defaultValue = "",
	action = "/search",
	placeholder = "What do you want to build today?",
}: {
	defaultValue?: string;
	action?: string;
	placeholder?: string;
}) {
	return (
		<form action={action} className="flex flex-col gap-3 rounded-3xl border border-[#E5E7E2] bg-white p-2 shadow-[0_18px_40px_rgba(15,61,46,0.10)] sm:flex-row">
			<label className="sr-only" htmlFor="marketplace-search">
				Search Strivio products
			</label>
			<div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#FAFAF7] px-4">
				<Search className="h-5 w-5 text-[#66736B]" aria-hidden />
				<input
					id="marketplace-search"
					name="q"
					defaultValue={defaultValue}
					placeholder={placeholder}
					className="h-14 w-full bg-transparent text-base font-bold text-[#17211B] outline-none placeholder:text-[#8C988F]"
				/>
			</div>
			<Button type="submit" size="lg" className="sm:min-w-40">
				Search
			</Button>
		</form>
	);
}
