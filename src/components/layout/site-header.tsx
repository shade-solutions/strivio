import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/user-menu";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-[#E5E7E2]/80 bg-[#FAFAF7]/90 backdrop-blur-xl">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-3" aria-label="Strivio home">
					<span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#38C172] text-[#0F3D2E] shadow-[0_5px_0_#0F3D2E]">
						<Sparkles className="h-5 w-5" aria-hidden />
					</span>
					<span>
						<span className="block text-xl font-black leading-none text-[#17211B]">Strivio</span>
						<span className="hidden text-xs font-bold text-[#66736B] sm:block">Shortcut library</span>
					</span>
				</Link>
				<nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
					{siteConfig.nav.map((item) => (
						<Link key={item.href} href={item.href} className="rounded-2xl px-4 py-2 text-sm font-extrabold text-[#17211B] transition hover:bg-white hover:text-[#0F3D2E]">
							{item.label}
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-3">
					<ButtonLink href="/explore" variant="outline" size="sm" className="hidden sm:inline-flex">
						Explore products
					</ButtonLink>
					<UserMenu />
				</div>
			</div>
		</header>
	);
}
