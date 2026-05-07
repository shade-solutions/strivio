import Link from "next/link";
import { adminNavigation } from "@/config/site";

export function AdminShell({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-[80vh] bg-[#FAFAF7] px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]">
				<aside className="rounded-3xl border border-[#E5E7E2] bg-white p-4 shadow-sm">
					<p className="px-3 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">Admin</p>
					<nav className="mt-2 grid gap-1">
						{adminNavigation.map((item) => (
							<Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 text-sm font-extrabold text-[#66736B] transition hover:bg-[#FAFAF7] hover:text-[#17211B]">
								{item.label}
							</Link>
						))}
					</nav>
				</aside>
				<section>{children}</section>
			</div>
		</main>
	);
}
