import { Star } from "lucide-react";

export function RatingStars({ rating, count }: { rating: number; count?: number }) {
	return (
		<div className="flex items-center gap-1 text-sm font-bold text-[#17211B]" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
			<div className="flex text-[#FFD166]">
				{Array.from({ length: 5 }).map((_, index) => (
					<Star key={index} className="h-4 w-4 fill-current" aria-hidden />
				))}
			</div>
			<span>{rating.toFixed(1)}</span>
			{count ? <span className="text-[#66736B]">({count})</span> : null}
		</div>
	);
}
