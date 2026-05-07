import Link from "next/link";
import { categories, goals } from "@/data/catalog";
import { productTypes } from "@/lib/catalog";

const sortOptions = [
	["popular", "Popular"],
	["newest", "Newest"],
	["price-low", "Price low to high"],
	["price-high", "Price high to low"],
	["rated", "Best rated"],
	["quick-wins", "Quick wins"],
];

export function ProductFilters({
	activeCategory,
	activeGoal,
	activeSort = "popular",
}: {
	activeCategory?: string;
	activeGoal?: string;
	activeSort?: string;
}) {
	return (
		<aside className="rounded-3xl border border-[#E5E7E2] bg-white p-5 shadow-sm">
			<div className="grid gap-6">
				<div>
					<p className="text-sm font-black text-[#17211B]">Sort</p>
					<div className="mt-3 grid gap-2">
						{sortOptions.map(([value, label]) => (
							<Link
								key={value}
								href={`/explore?sort=${value}`}
								className={`rounded-2xl px-3 py-2 text-sm font-bold ${activeSort === value ? "bg-[#DFF8E9] text-[#0F3D2E]" : "text-[#66736B] hover:bg-[#FAFAF7]"}`}
							>
								{label}
							</Link>
						))}
					</div>
				</div>
				<div>
					<p className="text-sm font-black text-[#17211B]">Categories</p>
					<div className="mt-3 grid max-h-72 gap-2 overflow-auto pr-1">
						{categories.map((category) => (
							<Link
								key={category.slug}
								href={`/explore?category=${category.slug}`}
								className={`rounded-2xl px-3 py-2 text-sm font-bold ${activeCategory === category.slug ? "bg-[#DFF8E9] text-[#0F3D2E]" : "text-[#66736B] hover:bg-[#FAFAF7]"}`}
							>
								{category.name}
							</Link>
						))}
					</div>
				</div>
				<div>
					<p className="text-sm font-black text-[#17211B]">Goals</p>
					<div className="mt-3 grid gap-2">
						{goals.slice(0, 8).map((goal) => (
							<Link
								key={goal.slug}
								href={`/explore?goal=${goal.slug}`}
								className={`rounded-2xl px-3 py-2 text-sm font-bold ${activeGoal === goal.slug ? "bg-[#DFF8E9] text-[#0F3D2E]" : "text-[#66736B] hover:bg-[#FAFAF7]"}`}
							>
								{goal.name}
							</Link>
						))}
					</div>
				</div>
				<div>
					<p className="text-sm font-black text-[#17211B]">Product type</p>
					<div className="mt-3 flex flex-wrap gap-2">
						{productTypes().slice(0, 10).map((type) => (
							<span key={type} className="rounded-full bg-[#FAFAF7] px-3 py-1 text-xs font-bold text-[#66736B]">
								{type}
							</span>
						))}
					</div>
				</div>
			</div>
		</aside>
	);
}
