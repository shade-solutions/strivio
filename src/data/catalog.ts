import type { Category, Collection, Goal, Product, ProductBadge } from "@/types/marketplace";

export const categories: Category[] = [
	{ id: "cat_templates", name: "Templates", slug: "templates", description: "Ready-made layouts for work, study, and launch projects.", icon: "PanelsTopLeft", sortOrder: 1 },
	{ id: "cat_ai_prompts", name: "AI Prompts", slug: "ai-prompts", description: "Prompt packs that help you think, write, research, and create faster.", icon: "Sparkles", sortOrder: 2 },
	{ id: "cat_notion", name: "Notion", slug: "notion", description: "Notion dashboards, life systems, and operating templates.", icon: "NotebookTabs", sortOrder: 3 },
	{ id: "cat_canva", name: "Canva", slug: "canva", description: "Editable Canva kits for content, branding, and marketing.", icon: "Paintbrush", sortOrder: 4 },
	{ id: "cat_spreadsheets", name: "Spreadsheets", slug: "spreadsheets", description: "Trackers and models for money, operations, and planning.", icon: "Table2", sortOrder: 5 },
	{ id: "cat_ebooks", name: "Ebooks", slug: "ebooks", description: "Practical guides with clear steps and examples.", icon: "BookOpen", sortOrder: 6 },
	{ id: "cat_courses", name: "Courses", slug: "courses", description: "Self-paced learning assets for focused progress.", icon: "GraduationCap", sortOrder: 7 },
	{ id: "cat_planners", name: "Planners", slug: "planners", description: "Simple planning systems for work, life, and goals.", icon: "CalendarCheck", sortOrder: 8 },
	{ id: "cat_business", name: "Business", slug: "business", description: "Tools for founders, operators, freelancers, and makers.", icon: "BriefcaseBusiness", sortOrder: 9 },
	{ id: "cat_marketing", name: "Marketing", slug: "marketing", description: "Campaign, content, launch, and growth resources.", icon: "Megaphone", sortOrder: 10 },
	{ id: "cat_design_assets", name: "Design Assets", slug: "design-assets", description: "Creative assets that make polished visuals easier.", icon: "Shapes", sortOrder: 11 },
	{ id: "cat_code_kits", name: "Code Kits", slug: "code-kits", description: "Starter kits and snippets for builders.", icon: "Code2", sortOrder: 12 },
	{ id: "cat_finance", name: "Finance", slug: "finance", description: "Budgeting, pricing, and planning resources.", icon: "BadgeDollarSign", sortOrder: 13 },
	{ id: "cat_productivity", name: "Productivity", slug: "productivity", description: "Systems that reduce busywork and create focus.", icon: "Zap", sortOrder: 14 },
	{ id: "cat_education", name: "Education", slug: "education", description: "Study guides, worksheets, and learning systems.", icon: "School", sortOrder: 15 },
	{ id: "cat_freelancing", name: "Freelancing", slug: "freelancing", description: "Client, proposal, pricing, and delivery resources.", icon: "Handshake", sortOrder: 16 },
	{ id: "cat_startup_kits", name: "Startup Kits", slug: "startup-kits", description: "Launch assets for new products and businesses.", icon: "Rocket", sortOrder: 17 },
	{ id: "cat_social_media", name: "Social Media", slug: "social-media", description: "Content calendars, captions, and creative systems.", icon: "Share2", sortOrder: 18 },
	{ id: "cat_career", name: "Career", slug: "career", description: "Resume, portfolio, and interview resources.", icon: "UserRoundCheck", sortOrder: 19 },
	{ id: "cat_personal_growth", name: "Personal Growth", slug: "personal-growth", description: "Reflection and progress systems for everyday growth.", icon: "Sprout", sortOrder: 20 },
];

export const goals: Goal[] = [
	{ id: "goal_start_business", name: "Start a business", slug: "start-a-business", description: "Find the first practical tools for a new venture.", icon: "Rocket", sortOrder: 1 },
	{ id: "goal_productivity", name: "Improve productivity", slug: "improve-productivity", description: "Organize tasks, focus, and routines with less friction.", icon: "TimerReset", sortOrder: 2 },
	{ id: "goal_learn_skill", name: "Learn a skill", slug: "learn-a-skill", description: "Study smarter with guided resources and practice kits.", icon: "GraduationCap", sortOrder: 3 },
	{ id: "goal_create_content", name: "Create content", slug: "create-content", description: "Plan, write, design, and publish without starting cold.", icon: "Clapperboard", sortOrder: 4 },
	{ id: "goal_money", name: "Manage money", slug: "manage-money", description: "Budget, price, forecast, and make clearer financial calls.", icon: "WalletCards", sortOrder: 5 },
	{ id: "goal_hired", name: "Get hired", slug: "get-hired", description: "Improve resumes, portfolios, and interview prep.", icon: "BadgeCheck", sortOrder: 6 },
	{ id: "goal_design", name: "Design faster", slug: "design-faster", description: "Use visual systems and assets for cleaner work.", icon: "Palette", sortOrder: 7 },
	{ id: "goal_ai", name: "Use AI better", slug: "use-ai-better", description: "Prompt, automate, and research with confidence.", icon: "Sparkles", sortOrder: 8 },
	{ id: "goal_life", name: "Plan life", slug: "plan-life", description: "Create gentle systems for habits, weeks, and priorities.", icon: "Map", sortOrder: 9 },
	{ id: "goal_online", name: "Build online", slug: "build-online", description: "Launch web projects, offers, funnels, and digital assets.", icon: "Globe2", sortOrder: 10 },
	{ id: "goal_study", name: "Study smarter", slug: "study-smarter", description: "Turn notes and practice into a lighter study rhythm.", icon: "Brain", sortOrder: 11 },
	{ id: "goal_launch", name: "Launch a product", slug: "launch-a-product", description: "Plan the offer, page, assets, and launch checklist.", icon: "Send", sortOrder: 12 },
];

const palettes = [
	"from-[#38C172] via-[#DDF8E8] to-[#3BA7FF]",
	"from-[#FFD166] via-[#FFF4CB] to-[#FF6B6B]",
	"from-[#7C5CFF] via-[#ECE7FF] to-[#3BA7FF]",
	"from-[#0F3D2E] via-[#CFF7DF] to-[#38C172]",
	"from-[#FF6B6B] via-[#FFE1E1] to-[#FFD166]",
];

type ProductSeed = {
	title: string;
	slug: string;
	subtitle: string;
	categorySlug: string;
	goalSlugs: string[];
	price: number;
	compareAtPrice?: number;
	badge: ProductBadge;
	productType: string;
	difficultyLevel: Product["difficultyLevel"];
	time: string;
	format: string;
	sales: number;
	rating: number;
};

const seeds: ProductSeed[] = [
	{ title: "Startup Launch Sprint Kit", slug: "startup-launch-sprint-kit", subtitle: "Plan a lean offer, landing page, and first launch in one weekend.", categorySlug: "startup-kits", goalSlugs: ["start-a-business", "launch-a-product"], price: 2900, compareAtPrice: 4900, badge: "Staff Pick", productType: "Bundle", difficultyLevel: "beginner", time: "Weekend-ready", format: "Notion, PDF, Canva", sales: 842, rating: 4.9 },
	{ title: "Notion Student Command Center", slug: "notion-student-planner", subtitle: "Track classes, assignments, notes, exams, and study sessions.", categorySlug: "notion", goalSlugs: ["study-smarter", "learn-a-skill"], price: 1700, compareAtPrice: 2500, badge: "Bestseller", productType: "Notion System", difficultyLevel: "beginner", time: "20 minutes", format: "Notion template", sales: 2140, rating: 4.8 },
	{ title: "AI Research Prompt Library", slug: "ai-research-prompt-library", subtitle: "Turn fuzzy questions into clear research briefs and summaries.", categorySlug: "ai-prompts", goalSlugs: ["use-ai-better", "learn-a-skill"], price: 1500, badge: "Quick Win", productType: "Prompt Pack", difficultyLevel: "all", time: "10 minutes", format: "PDF, Google Doc", sales: 1276, rating: 4.7 },
	{ title: "Canva Content Batch Studio", slug: "canva-content-batch-studio", subtitle: "Create a month of clean social posts without redesigning every tile.", categorySlug: "canva", goalSlugs: ["create-content", "design-faster"], price: 2200, compareAtPrice: 3900, badge: "Creator Verified", productType: "Canva Template", difficultyLevel: "beginner", time: "30 minutes", format: "Canva template link", sales: 931, rating: 4.8 },
	{ title: "Freelancer Client OS", slug: "freelancer-client-os", subtitle: "Manage leads, proposals, onboarding, delivery, invoices, and follow-ups.", categorySlug: "freelancing", goalSlugs: ["start-a-business", "improve-productivity"], price: 3400, compareAtPrice: 5900, badge: "Bestseller", productType: "Business Tool", difficultyLevel: "intermediate", time: "1 hour", format: "Notion, PDF", sales: 1667, rating: 4.9 },
	{ title: "Personal Budget Flow Sheet", slug: "personal-budget-flow-sheet", subtitle: "A gentle monthly money tracker for income, spending, and goals.", categorySlug: "finance", goalSlugs: ["manage-money", "plan-life"], price: 1200, badge: "Beginner Friendly", productType: "Spreadsheet", difficultyLevel: "beginner", time: "15 minutes", format: "Google Sheets, Excel", sales: 1834, rating: 4.8 },
	{ title: "Landing Page Copy Builder", slug: "landing-page-copy-builder", subtitle: "Write crisp product-page copy with prompts, formulas, and examples.", categorySlug: "marketing", goalSlugs: ["launch-a-product", "build-online"], price: 1900, compareAtPrice: 2900, badge: "Quick Win", productType: "Worksheet", difficultyLevel: "beginner", time: "25 minutes", format: "PDF, Notion", sales: 1094, rating: 4.7 },
	{ title: "Solo Creator Analytics Sheet", slug: "solo-creator-analytics-sheet", subtitle: "Track channels, experiments, content output, and weekly learning.", categorySlug: "spreadsheets", goalSlugs: ["create-content", "improve-productivity"], price: 1400, badge: "New", productType: "Spreadsheet", difficultyLevel: "all", time: "20 minutes", format: "Google Sheets", sales: 284, rating: 4.6 },
	{ title: "Portfolio Proof Kit", slug: "portfolio-proof-kit", subtitle: "Case study templates and prompts that make your work easier to trust.", categorySlug: "career", goalSlugs: ["get-hired", "design-faster"], price: 2100, badge: "Staff Pick", productType: "Template Pack", difficultyLevel: "beginner", time: "45 minutes", format: "Figma, PDF, Notion", sales: 711, rating: 4.9 },
	{ title: "Prompt Pack for Better Emails", slug: "prompt-pack-for-better-emails", subtitle: "Write clearer outreach, support, sales, and update emails with AI.", categorySlug: "ai-prompts", goalSlugs: ["use-ai-better", "start-a-business"], price: 900, badge: "Quick Win", productType: "Prompt Pack", difficultyLevel: "all", time: "5 minutes", format: "PDF, CSV", sales: 2490, rating: 4.7 },
	{ title: "Productivity Reset Planner", slug: "productivity-reset-planner", subtitle: "Clean up tasks, priorities, habits, and weekly focus without overwhelm.", categorySlug: "planners", goalSlugs: ["improve-productivity", "plan-life"], price: 1100, badge: "Beginner Friendly", productType: "Planner", difficultyLevel: "beginner", time: "20 minutes", format: "Printable PDF", sales: 1512, rating: 4.8 },
	{ title: "Micro Course Builder", slug: "micro-course-builder", subtitle: "Outline, script, package, and sell a small course with confidence.", categorySlug: "courses", goalSlugs: ["launch-a-product", "build-online"], price: 3900, compareAtPrice: 6900, badge: "Creator Verified", productType: "Course Kit", difficultyLevel: "intermediate", time: "2 hours", format: "Video, PDF, Notion", sales: 420, rating: 4.8 },
	{ title: "Design System Starter Cards", slug: "design-system-starter-cards", subtitle: "A polished set of component cards, tokens, and examples for new apps.", categorySlug: "design-assets", goalSlugs: ["design-faster", "build-online"], price: 2600, badge: "New", productType: "Design Asset", difficultyLevel: "intermediate", time: "1 hour", format: "Figma", sales: 319, rating: 4.7 },
	{ title: "Indie Hacker Finance Model", slug: "indie-hacker-finance-model", subtitle: "Forecast pricing, expenses, revenue goals, and runway for small products.", categorySlug: "spreadsheets", goalSlugs: ["manage-money", "start-a-business"], price: 2400, badge: "Staff Pick", productType: "Spreadsheet", difficultyLevel: "intermediate", time: "45 minutes", format: "Google Sheets, Excel", sales: 603, rating: 4.8 },
	{ title: "Resume Story Upgrade", slug: "resume-story-upgrade", subtitle: "Turn responsibilities into strong bullets, proof points, and outcomes.", categorySlug: "career", goalSlugs: ["get-hired"], price: 1300, badge: "Quick Win", productType: "Worksheet", difficultyLevel: "beginner", time: "30 minutes", format: "PDF, Google Doc", sales: 2060, rating: 4.7 },
	{ title: "Social Media Caption Vault", slug: "social-media-caption-vault", subtitle: "Caption structures for launches, lessons, stories, and product updates.", categorySlug: "social-media", goalSlugs: ["create-content", "launch-a-product"], price: 1600, badge: "Bestseller", productType: "Prompt Pack", difficultyLevel: "all", time: "10 minutes", format: "Notion, CSV", sales: 3198, rating: 4.8 },
	{ title: "No-Code SaaS Spec Kit", slug: "no-code-saas-spec-kit", subtitle: "Define users, flows, pricing, screens, and MVP scope before building.", categorySlug: "business", goalSlugs: ["build-online", "launch-a-product"], price: 2700, compareAtPrice: 4500, badge: "Staff Pick", productType: "Business Tool", difficultyLevel: "beginner", time: "1 hour", format: "Notion, PDF", sales: 538, rating: 4.9 },
	{ title: "Ebook Launch Checklist", slug: "ebook-launch-checklist", subtitle: "Write, package, price, and launch a useful ebook without guessing.", categorySlug: "ebooks", goalSlugs: ["launch-a-product", "create-content"], price: 1800, badge: "Beginner Friendly", productType: "Checklist", difficultyLevel: "beginner", time: "30 minutes", format: "PDF, Notion", sales: 876, rating: 4.7 },
	{ title: "Code Kit: Next.js Product Page", slug: "nextjs-product-page-code-kit", subtitle: "A clean, responsive product-page starter for digital offers.", categorySlug: "code-kits", goalSlugs: ["build-online", "launch-a-product"], price: 3200, badge: "Creator Verified", productType: "Code Kit", difficultyLevel: "intermediate", time: "1 hour", format: "Next.js, Tailwind", sales: 255, rating: 4.8 },
	{ title: "Study Sprint Worksheets", slug: "study-sprint-worksheets", subtitle: "Plan focused study blocks, recall practice, and exam prep sessions.", categorySlug: "education", goalSlugs: ["study-smarter", "learn-a-skill"], price: 1000, badge: "Quick Win", productType: "Worksheet", difficultyLevel: "beginner", time: "10 minutes", format: "Printable PDF", sales: 1444, rating: 4.7 },
	{ title: "Brand Voice Mini System", slug: "brand-voice-mini-system", subtitle: "Clarify tone, phrases, content angles, and examples for your brand.", categorySlug: "marketing", goalSlugs: ["create-content", "start-a-business"], price: 2000, badge: "Staff Pick", productType: "Template", difficultyLevel: "beginner", time: "40 minutes", format: "Notion, PDF", sales: 691, rating: 4.8 },
	{ title: "Life Admin Dashboard", slug: "life-admin-dashboard", subtitle: "A calm place for documents, renewals, routines, lists, and reminders.", categorySlug: "notion", goalSlugs: ["plan-life", "improve-productivity"], price: 2300, badge: "Beginner Friendly", productType: "Notion System", difficultyLevel: "beginner", time: "35 minutes", format: "Notion template", sales: 1172, rating: 4.8 },
	{ title: "Client Proposal Canva Kit", slug: "client-proposal-canva-kit", subtitle: "Editable proposal decks that look polished and explain scope clearly.", categorySlug: "canva", goalSlugs: ["start-a-business", "design-faster"], price: 2500, badge: "Creator Verified", productType: "Canva Template", difficultyLevel: "beginner", time: "30 minutes", format: "Canva template link", sales: 987, rating: 4.9 },
	{ title: "AI Automation Ideas Vault", slug: "ai-automation-ideas-vault", subtitle: "Practical AI workflows for creators, founders, students, and teams.", categorySlug: "ai-prompts", goalSlugs: ["use-ai-better", "improve-productivity"], price: 1700, badge: "New", productType: "Prompt Pack", difficultyLevel: "all", time: "20 minutes", format: "Notion, PDF", sales: 377, rating: 4.6 },
	{ title: "Freelance Pricing Calculator", slug: "freelance-pricing-calculator", subtitle: "Price projects with margin, taxes, hours, and confidence built in.", categorySlug: "finance", goalSlugs: ["manage-money", "start-a-business"], price: 1500, badge: "Quick Win", productType: "Spreadsheet", difficultyLevel: "beginner", time: "15 minutes", format: "Google Sheets", sales: 1320, rating: 4.8 },
	{ title: "First Hire Interview Kit", slug: "first-hire-interview-kit", subtitle: "Scorecards, questions, and email templates for small teams hiring well.", categorySlug: "business", goalSlugs: ["start-a-business"], price: 2800, badge: "Staff Pick", productType: "Business Tool", difficultyLevel: "intermediate", time: "1 hour", format: "PDF, Google Doc", sales: 312, rating: 4.7 },
	{ title: "Creator Weekly Review", slug: "creator-weekly-review", subtitle: "Review content, sales, energy, experiments, and next-week priorities.", categorySlug: "personal-growth", goalSlugs: ["plan-life", "create-content"], price: 800, badge: "Quick Win", productType: "Planner", difficultyLevel: "beginner", time: "15 minutes", format: "Printable PDF, Notion", sales: 2011, rating: 4.7 },
	{ title: "Startup Legal Prep Checklist", slug: "startup-legal-prep-checklist", subtitle: "A plain-language prep list for founder docs, policies, and questions.", categorySlug: "startup-kits", goalSlugs: ["start-a-business", "launch-a-product"], price: 1400, badge: "Beginner Friendly", productType: "Checklist", difficultyLevel: "beginner", time: "25 minutes", format: "PDF", sales: 488, rating: 4.6 },
	{ title: "UX Audit Swipe File", slug: "ux-audit-swipe-file", subtitle: "Heuristics, notes, and examples for reviewing landing and product pages.", categorySlug: "design-assets", goalSlugs: ["design-faster", "build-online"], price: 2100, badge: "Staff Pick", productType: "Guide", difficultyLevel: "intermediate", time: "40 minutes", format: "PDF, Figma", sales: 529, rating: 4.8 },
	{ title: "Daily Learning Path Planner", slug: "daily-learning-path-planner", subtitle: "Break any skill into tiny lessons, practice loops, and progress notes.", categorySlug: "education", goalSlugs: ["learn-a-skill", "study-smarter"], price: 1200, badge: "New", productType: "Planner", difficultyLevel: "beginner", time: "20 minutes", format: "Notion, PDF", sales: 251, rating: 4.7 },
];

function makeProduct(seed: ProductSeed, index: number): Product {
	const category = categories.find((item) => item.slug === seed.categorySlug) ?? categories[0];
	const palette = palettes[index % palettes.length];
	const titleSlug = encodeURIComponent(seed.slug);

	return {
		id: `prod_${seed.slug.replaceAll("-", "_")}`,
		title: seed.title,
		slug: seed.slug,
		subtitle: seed.subtitle,
		description:
			`${seed.subtitle} This resource is built for practical progress: clear previews, easy setup, and a fast first win. Use it to skip the blank page and move with more confidence.`,
		shortDescription: seed.subtitle,
		price: seed.price,
		compareAtPrice: seed.compareAtPrice,
		currency: "USD",
		status: "published",
		categorySlug: seed.categorySlug,
		goalSlugs: seed.goalSlugs,
		thumbnailUrl: `/api/og/product?slug=${titleSlug}`,
		coverUrl: `/api/og/product?slug=${titleSlug}&cover=1`,
		previewImages: [`gradient:${palette}`, `gradient:${palettes[(index + 1) % palettes.length]}`, `gradient:${palettes[(index + 2) % palettes.length]}`],
		demoUrl: "https://strivio.world",
		dodoProductId: process.env.NODE_ENV === "production" ? "" : `demo_dodo_${seed.slug}`,
		dodoPriceId: undefined,
		productType: seed.productType,
		difficultyLevel: seed.difficultyLevel,
		estimatedTimeToValue: seed.time,
		licenseType: "Personal and small-business use. Redistribution or resale is not included.",
		refundPolicyType: "Case-by-case digital refund review",
		badge: seed.badge,
		isFeatured: index < 8,
		isBestseller: seed.badge === "Bestseller" || seed.sales > 1500,
		isStaffPick: seed.badge === "Staff Pick",
		salesCount: seed.sales,
		ratingAverage: seed.rating,
		ratingCount: Math.max(12, Math.round(seed.sales * 0.18)),
		format: seed.format,
		deliveryMethod: "Instant access after verified checkout",
		compatibility: seed.format.includes("Notion")
			? "Works with Notion accounts. Includes setup notes."
			: seed.format.includes("Canva")
				? "Works with free and paid Canva accounts."
				: "Compatible with common desktop and mobile workflows.",
		whatIncluded: [
			`Complete ${seed.productType.toLowerCase()} files`,
			"Quick-start instructions",
			"Example use cases and setup tips",
			"License and support notes",
		],
		whoItsFor: [
			"Ambitious beginners who want a clear starting point",
			"Creators and operators who prefer practical tools",
			"People who want progress, not complexity",
		],
		problemSolved: `It helps you avoid starting from scratch when you need to ${goalPhrase(seed.goalSlugs[0])}.`,
		howToUse: [
			"Buy securely and wait for webhook-confirmed access.",
			"Open your Strivio library and download or access the files.",
			"Follow the quick-start guide and customize the resource for your context.",
		],
		useItTodayFor: [
			"Create a small win before the day is over",
			"Replace a messy blank-page workflow",
			"Launch, organize, learn, or create faster",
		],
		beforeYouBuy: [
			"This is a digital product with instant delivery after checkout confirmation.",
			"Review the previews, file type, compatibility, and license before purchase.",
			"Refunds are reviewed case by case if something is broken, misleading, inaccessible, or not as described.",
		],
		faq: [
			{ question: "How do I get access?", answer: "After Dodo confirms payment through a verified webhook, Strivio grants access in your buyer library." },
			{ question: "Can I use this for client work?", answer: "Yes for normal client delivery unless the listing says otherwise. You may not resell or redistribute the raw files." },
			{ question: "What if the file does not work?", answer: "Contact support with your order email. If the product is broken or not as described, we will make it right." },
		],
		seoTitle: `${seed.title} | Strivio`,
		seoDescription: seed.subtitle,
		createdAt: `2026-04-${String((index % 24) + 1).padStart(2, "0")}T08:00:00.000Z`,
		publishedAt: `2026-05-${String((index % 6) + 1).padStart(2, "0")}T08:00:00.000Z`,
	};
}

function goalPhrase(goalSlug: string) {
	return goals.find((goal) => goal.slug === goalSlug)?.name.toLowerCase() ?? "move faster";
}

export const products = seeds.map(makeProduct);

export const collections: Collection[] = [
	{
		slug: "beginner-friendly",
		name: "Beginner Friendly",
		description: "Low-friction resources that help you start with a small win today.",
		icon: "Sprout",
		productSlugs: products.filter((product) => product.difficultyLevel === "beginner").slice(0, 12).map((product) => product.slug),
	},
	{
		slug: "quick-wins",
		name: "Quick Wins",
		description: "Useful tools under $20 that make progress feel lighter.",
		icon: "Zap",
		productSlugs: products.filter((product) => product.price <= 2000).slice(0, 12).map((product) => product.slug),
	},
	{
		slug: "creator-stack",
		name: "Creator Stack",
		description: "Prompt packs, templates, and systems for publishing better work faster.",
		icon: "Clapperboard",
		productSlugs: products.filter((product) => product.goalSlugs.includes("create-content")).slice(0, 12).map((product) => product.slug),
	},
	{
		slug: "startup-shelf",
		name: "Startup Shelf",
		description: "Practical founder resources for ideas, offers, pricing, launch, and operations.",
		icon: "Rocket",
		productSlugs: products.filter((product) => product.goalSlugs.includes("start-a-business")).slice(0, 12).map((product) => product.slug),
	},
];
