import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
	return (
		<footer className="border-t border-[#E5E7E2] bg-white">
			<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_2fr] lg:px-8">
				<div>
					<p className="text-2xl font-black text-[#17211B]">Strivio</p>
					<p className="mt-3 max-w-md text-sm leading-6 text-[#66736B]">
						{siteConfig.tagline} Practical digital products for people who want progress, not complexity.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
					<div>
						<p className="font-black text-[#17211B]">Shop</p>
						<div className="mt-3 grid gap-2 text-[#66736B]">
							<Link href="/explore">Explore</Link>
							<Link href="/search">Search</Link>
							<Link href="/collections/quick-wins">Quick wins</Link>
						</div>
					</div>
					<div>
						<p className="font-black text-[#17211B]">Account</p>
						<div className="mt-3 grid gap-2 text-[#66736B]">
							<Link href="/account/library">Library</Link>
							<Link href="/account/orders">Orders</Link>
							<Link href="/support">Support</Link>
						</div>
					</div>
					<div>
						<p className="font-black text-[#17211B]">Company</p>
						<div className="mt-3 grid gap-2 text-[#66736B]">
							<Link href="/creators">Creators</Link>
							<Link href="/blog">Resources</Link>
							<Link href="/submit-product">Submit</Link>
						</div>
					</div>
					<div>
						<p className="font-black text-[#17211B]">Legal</p>
						<div className="mt-3 grid gap-2 text-[#66736B]">
							<Link href="/refund-policy">Refunds</Link>
							<Link href="/terms">Terms</Link>
							<Link href="/privacy">Privacy</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
