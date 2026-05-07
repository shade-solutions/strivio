export default function Loading() {
	return (
		<div className="min-h-[60vh] bg-[#FAFAF7] px-4 py-16">
			<div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, index) => (
					<div key={index} className="h-80 animate-pulse rounded-3xl border border-[#E5E7E2] bg-white" />
				))}
			</div>
		</div>
	);
}
