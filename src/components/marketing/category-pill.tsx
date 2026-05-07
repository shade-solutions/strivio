import Link from "next/link";
import type { Category } from "@/types/marketplace";
import { Icon } from "@/components/ui/icon";

export function CategoryPill({ category }: { category: Category }) {
	return (
		<Link
			href={`/category/${category.slug}`}
			className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7E2] bg-white px-4 py-3 text-sm font-extrabold text-[#17211B] shadow-sm transition hover:-translate-y-0.5 hover:border-[#38C172] hover:bg-[#F4FFF8]"
		>
			<Icon name={category.icon} className="h-4 w-4 text-[#38C172]" />
			{category.name}
		</Link>
	);
}
