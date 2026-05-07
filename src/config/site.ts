import type { BlogPost } from "@/types/marketplace";

export const siteConfig = {
	name: "Strivio",
	domain: "strivio.world",
	url: process.env.NEXT_PUBLIC_APP_URL ?? "https://strivio.world",
	tagline: "Your shortcut library for digital growth.",
	description:
		"Discover ready-to-use templates, guides, tools, prompts, planners, and creative resources built to save time and help you grow.",
	nav: [
		{ href: "/explore", label: "Explore" },
		{ href: "/collections/beginner-friendly", label: "Collections" },
		{ href: "/blog", label: "Resources" },
		{ href: "/creators", label: "Creators" },
	],
	trustLines: [
		"Instant access after purchase",
		"Secure checkout",
		"Carefully reviewed resources",
		"Built for practical results",
		"No physical shipping. No waiting.",
		"Buy once. Use anytime.",
		"Clear previews before you buy",
		"Simple refunds when something is wrong",
		"Helpful support if you get stuck",
	],
};

export const adminNavigation = [
	{ href: "/admin", label: "Overview" },
	{ href: "/admin/products", label: "Products" },
	{ href: "/admin/orders", label: "Orders" },
	{ href: "/admin/customers", label: "Customers" },
	{ href: "/admin/analytics", label: "Analytics" },
	{ href: "/admin/coupons", label: "Coupons" },
	{ href: "/admin/categories", label: "Categories" },
	{ href: "/admin/reviews", label: "Reviews" },
	{ href: "/admin/support", label: "Support" },
	{ href: "/admin/ai", label: "AI Assistant" },
	{ href: "/admin/webhooks", label: "Webhooks" },
	{ href: "/admin/audit-logs", label: "Audit Logs" },
];

export const legalStarterNotice =
	"Starter template only. Have a qualified legal professional review this page before production launch.";

export const blogPosts: BlogPost[] = [
	{
		slug: "best-digital-products-for-students",
		title: "Best digital products for students who want to study smarter",
		description: "A practical guide to planners, prompt packs, templates, and systems that make studying easier.",
		category: "Education",
		readTime: "6 min read",
		publishedAt: "2026-05-01",
	},
	{
		slug: "how-to-skip-the-blank-page",
		title: "How to skip the blank page when starting a new project",
		description: "Use templates and checklists to move from idea to first draft without overthinking.",
		category: "Productivity",
		readTime: "5 min read",
		publishedAt: "2026-04-22",
	},
	{
		slug: "digital-product-buying-checklist",
		title: "A buyer checklist for practical digital products",
		description: "Know exactly what you are getting before you buy, from file type to license terms.",
		category: "Buying Guide",
		readTime: "4 min read",
		publishedAt: "2026-04-12",
	},
];
