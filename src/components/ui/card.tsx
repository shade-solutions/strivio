import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
	return <div className={cn("rounded-3xl border border-[#E5E7E2] bg-white shadow-[0_18px_45px_rgba(15,61,46,0.08)]", className)}>{children}</div>;
}

export function Section({
	children,
	className,
	id,
}: {
	children: React.ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<section id={id} className={cn("px-4 py-12 sm:px-6 lg:px-8 lg:py-16", className)}>
			<div className="mx-auto max-w-7xl">{children}</div>
		</section>
	);
}

export function SectionHeading({
	kicker,
	title,
	description,
	action,
}: {
	kicker?: string;
	title: string;
	description?: string;
	action?: React.ReactNode;
}) {
	return (
		<div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div className="max-w-2xl">
				{kicker ? <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.08em] text-[#38C172]">{kicker}</p> : null}
				<h2 className="text-3xl font-black leading-tight text-[#17211B] sm:text-4xl">{title}</h2>
				{description ? <p className="mt-3 text-base leading-7 text-[#66736B]">{description}</p> : null}
			</div>
			{action}
		</div>
	);
}
