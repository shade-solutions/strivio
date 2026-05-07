import type { MetadataRoute } from "next";
import { blogPosts, siteConfig } from "@/config/site";
import { categories, collections, goals, products } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const routes = [
		"",
		"/explore",
		"/search",
		"/blog",
		"/support",
		"/refund-policy",
		"/terms",
		"/privacy",
		"/creators",
		"/submit-product",
		...products.map((product) => `/products/${product.slug}`),
		...categories.map((category) => `/category/${category.slug}`),
		...goals.map((goal) => `/goal/${goal.slug}`),
		...collections.map((collection) => `/collections/${collection.slug}`),
		...blogPosts.map((post) => `/blog/${post.slug}`),
	];

	return routes.map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: now,
		changeFrequency: route.includes("/products/") ? "weekly" : "monthly",
		priority: route === "" ? 1 : route.includes("/products/") ? 0.8 : 0.6,
	}));
}
