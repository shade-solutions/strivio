export type UserRole = "buyer" | "admin" | "creator" | "support";

export type ProductStatus = "draft" | "published" | "archived";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "all";

export type ProductBadge =
	| "Bestseller"
	| "New"
	| "Staff Pick"
	| "Beginner Friendly"
	| "Quick Win"
	| "Creator Verified";

export type Category = {
	id: string;
	name: string;
	slug: string;
	description: string;
	icon: string;
	sortOrder: number;
};

export type Goal = {
	id: string;
	name: string;
	slug: string;
	description: string;
	icon: string;
	sortOrder: number;
};

export type ProductFaq = {
	question: string;
	answer: string;
};

export type Product = {
	id: string;
	title: string;
	slug: string;
	subtitle: string;
	description: string;
	shortDescription: string;
	price: number;
	compareAtPrice?: number;
	currency: "USD";
	status: ProductStatus;
	categorySlug: string;
	goalSlugs: string[];
	thumbnailUrl: string;
	coverUrl: string;
	previewImages: string[];
	demoUrl?: string;
	dodoProductId: string;
	dodoPriceId?: string;
	productType: string;
	difficultyLevel: DifficultyLevel;
	estimatedTimeToValue: string;
	licenseType: string;
	refundPolicyType: string;
	badge: ProductBadge;
	isFeatured: boolean;
	isBestseller: boolean;
	isStaffPick: boolean;
	salesCount: number;
	ratingAverage: number;
	ratingCount: number;
	format: string;
	deliveryMethod: string;
	compatibility: string;
	whatIncluded: string[];
	whoItsFor: string[];
	problemSolved: string;
	howToUse: string[];
	useItTodayFor: string[];
	beforeYouBuy: string[];
	faq: ProductFaq[];
	seoTitle: string;
	seoDescription: string;
	createdAt: string;
	publishedAt: string;
};

export type Collection = {
	slug: string;
	name: string;
	description: string;
	productSlugs: string[];
	icon: string;
};

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	category: string;
	readTime: string;
	publishedAt: string;
};
