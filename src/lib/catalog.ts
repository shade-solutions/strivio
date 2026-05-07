import { categories, collections, goals, products } from "@/data/catalog";
import type { Product } from "@/types/marketplace";
import { toSearchText } from "@/lib/utils";

export type ProductFilters = {
	query?: string;
	category?: string;
	goal?: string;
	collection?: string;
	productType?: string;
	difficulty?: string;
	maxPrice?: number;
	sort?: string;
};

export function getPublishedProducts() {
	return products.filter((product) => product.status === "published");
}

export function getProductBySlug(slug: string) {
	return getPublishedProducts().find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
	return categories.find((category) => category.slug === slug);
}

export function getGoalBySlug(slug: string) {
	return goals.find((goal) => goal.slug === slug);
}

export function getCollectionBySlug(slug: string) {
	return collections.find((collection) => collection.slug === slug);
}

export function getCategoryProducts(slug: string) {
	return getPublishedProducts().filter((product) => product.categorySlug === slug);
}

export function getGoalProducts(slug: string) {
	return getPublishedProducts().filter((product) => product.goalSlugs.includes(slug));
}

export function getCollectionProducts(slug: string) {
	const collection = getCollectionBySlug(slug);
	if (!collection) return [];
	return getPublishedProducts().filter((product) => collection.productSlugs.includes(product.slug));
}

export function getRelatedProducts(product: Product, limit = 4) {
	return getPublishedProducts()
		.filter((item) => item.slug !== product.slug)
		.filter((item) => item.categorySlug === product.categorySlug || item.goalSlugs.some((goal) => product.goalSlugs.includes(goal)))
		.sort((a, b) => b.ratingAverage - a.ratingAverage)
		.slice(0, limit);
}

export function filterProducts(filters: ProductFilters) {
	let result = getPublishedProducts();
	const query = toSearchText(filters.query ?? "");

	if (query) {
		result = result.filter((product) => {
			const category = getCategoryBySlug(product.categorySlug)?.name ?? "";
			const goalNames = product.goalSlugs.map((slug) => getGoalBySlug(slug)?.name ?? "").join(" ");
			const haystack = toSearchText(
				[
					product.title,
					product.subtitle,
					product.description,
					product.productType,
					product.difficultyLevel,
					category,
					goalNames,
				].join(" "),
			);
			return query.split(" ").every((part) => haystack.includes(part));
		});
	}

	if (filters.category) result = result.filter((product) => product.categorySlug === filters.category);
	if (filters.goal) result = result.filter((product) => product.goalSlugs.includes(filters.goal!));
	if (filters.collection) {
		const collection = getCollectionBySlug(filters.collection);
		if (collection) result = result.filter((product) => collection.productSlugs.includes(product.slug));
	}
	if (filters.productType) result = result.filter((product) => product.productType === filters.productType);
	if (filters.difficulty) result = result.filter((product) => product.difficultyLevel === filters.difficulty);
	if (filters.maxPrice) result = result.filter((product) => product.price <= filters.maxPrice!);

	return sortProducts(result, filters.sort);
}

export function sortProducts(items: Product[], sort = "popular") {
	const result = [...items];
	switch (sort) {
		case "newest":
			return result.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
		case "price-low":
			return result.sort((a, b) => a.price - b.price);
		case "price-high":
			return result.sort((a, b) => b.price - a.price);
		case "rated":
			return result.sort((a, b) => b.ratingAverage - a.ratingAverage);
		case "quick-wins":
			return result.sort((a, b) => a.price - b.price || a.estimatedTimeToValue.localeCompare(b.estimatedTimeToValue));
		case "popular":
		default:
			return result.sort((a, b) => b.salesCount - a.salesCount);
	}
}

export function featuredProducts(limit = 8) {
	return getPublishedProducts()
		.filter((product) => product.isFeatured)
		.sort((a, b) => b.salesCount - a.salesCount)
		.slice(0, limit);
}

export function bestSellers(limit = 8) {
	return getPublishedProducts()
		.filter((product) => product.isBestseller)
		.sort((a, b) => b.salesCount - a.salesCount)
		.slice(0, limit);
}

export function staffPicks(limit = 8) {
	return getPublishedProducts()
		.filter((product) => product.isStaffPick)
		.sort((a, b) => b.ratingAverage - a.ratingAverage)
		.slice(0, limit);
}

export function newDrops(limit = 8) {
	return sortProducts(getPublishedProducts(), "newest").slice(0, limit);
}

export function quickWins(limit = 8) {
	return getPublishedProducts()
		.filter((product) => product.price <= 2000)
		.sort((a, b) => a.price - b.price)
		.slice(0, limit);
}

export function productTypes() {
	return Array.from(new Set(getPublishedProducts().map((product) => product.productType))).sort();
}
