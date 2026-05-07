import { db } from "@/db/client";
import {
	categories as categoryTable,
	goals as goalTable,
	productAssets,
	productGoals,
	productPreviews,
	products as productTable,
} from "@/db/schema";
import { categories, goals, products } from "@/data/catalog";

async function main() {
	for (const category of categories) {
		await db
			.insert(categoryTable)
			.values({
				id: category.id,
				name: category.name,
				slug: category.slug,
				description: category.description,
				icon: category.icon,
				sortOrder: category.sortOrder,
				isActive: true,
			})
			.onConflictDoUpdate({
				target: categoryTable.id,
				set: {
					name: category.name,
					slug: category.slug,
					description: category.description,
					icon: category.icon,
					sortOrder: category.sortOrder,
					isActive: true,
				},
			});
	}

	for (const goal of goals) {
		await db
			.insert(goalTable)
			.values({
				id: goal.id,
				name: goal.name,
				slug: goal.slug,
				description: goal.description,
				icon: goal.icon,
				sortOrder: goal.sortOrder,
			})
			.onConflictDoUpdate({
				target: goalTable.id,
				set: {
					name: goal.name,
					slug: goal.slug,
					description: goal.description,
					icon: goal.icon,
					sortOrder: goal.sortOrder,
				},
			});
	}

	for (const product of products) {
		const category = categories.find((item) => item.slug === product.categorySlug);
		if (!category) continue;
		await db
			.insert(productTable)
			.values({
				id: product.id,
				title: product.title,
				slug: product.slug,
				subtitle: product.subtitle,
				description: product.description,
				shortDescription: product.shortDescription,
				price: product.price,
				compareAtPrice: product.compareAtPrice,
				currency: product.currency,
				status: product.status,
				categoryId: category.id,
				thumbnailUrl: product.thumbnailUrl,
				coverUrl: product.coverUrl,
				previewImages: product.previewImages,
				demoUrl: product.demoUrl,
				dodoProductId: product.dodoProductId,
				dodoPriceId: product.dodoPriceId,
				productType: product.productType,
				difficultyLevel: product.difficultyLevel,
				estimatedTimeToValue: product.estimatedTimeToValue,
				licenseType: product.licenseType,
				refundPolicyType: product.refundPolicyType,
				isFeatured: product.isFeatured,
				isBestseller: product.isBestseller,
				isStaffPick: product.isStaffPick,
				salesCount: product.salesCount,
				ratingAverage: Math.round(product.ratingAverage * 10),
				ratingCount: product.ratingCount,
				metadata: {
					format: product.format,
					deliveryMethod: product.deliveryMethod,
					compatibility: product.compatibility,
					badge: product.badge,
					whatIncluded: product.whatIncluded,
					whoItsFor: product.whoItsFor,
					problemSolved: product.problemSolved,
					howToUse: product.howToUse,
					useItTodayFor: product.useItTodayFor,
					beforeYouBuy: product.beforeYouBuy,
					faq: product.faq,
					seoTitle: product.seoTitle,
					seoDescription: product.seoDescription,
				},
				publishedAt: new Date(product.publishedAt),
			})
			.onConflictDoUpdate({
				target: productTable.id,
				set: {
					title: product.title,
					slug: product.slug,
					subtitle: product.subtitle,
					description: product.description,
					shortDescription: product.shortDescription,
					price: product.price,
					compareAtPrice: product.compareAtPrice,
					status: product.status,
					categoryId: category.id,
					thumbnailUrl: product.thumbnailUrl,
					coverUrl: product.coverUrl,
					previewImages: product.previewImages,
					productType: product.productType,
					difficultyLevel: product.difficultyLevel,
					estimatedTimeToValue: product.estimatedTimeToValue,
					licenseType: product.licenseType,
					refundPolicyType: product.refundPolicyType,
					isFeatured: product.isFeatured,
					isBestseller: product.isBestseller,
					isStaffPick: product.isStaffPick,
					salesCount: product.salesCount,
					ratingAverage: Math.round(product.ratingAverage * 10),
					ratingCount: product.ratingCount,
				},
			});

		for (const goalSlug of product.goalSlugs) {
			const goal = goals.find((item) => item.slug === goalSlug);
			if (!goal) continue;
			await db
				.insert(productGoals)
				.values({ productId: product.id, goalId: goal.id })
				.onConflictDoNothing();
		}

		await db
			.insert(productAssets)
			.values({
				id: `asset_${product.slug}`,
				productId: product.id,
				assetType: "instructions",
				title: `${product.title} access instructions`,
				description: "Demo delivery record. Replace with Dodo asset IDs or R2 keys before production.",
				fileUrl: product.demoUrl,
				sortOrder: 1,
				isPreview: false,
			})
			.onConflictDoUpdate({
				target: productAssets.id,
				set: {
					title: `${product.title} access instructions`,
					description: "Demo delivery record. Replace with Dodo asset IDs or R2 keys before production.",
					fileUrl: product.demoUrl,
				},
			});

		for (const [index, preview] of product.previewImages.entries()) {
			await db
				.insert(productPreviews)
				.values({
					id: `preview_${product.slug}_${index + 1}`,
					productId: product.id,
					type: "image",
					url: preview,
					alt: `${product.title} preview ${index + 1}`,
					sortOrder: index + 1,
				})
				.onConflictDoUpdate({
					target: productPreviews.id,
					set: {
						url: preview,
						alt: `${product.title} preview ${index + 1}`,
						sortOrder: index + 1,
					},
				});
		}
	}

	console.log(`Seeded ${categories.length} categories, ${goals.length} goals, and ${products.length} products.`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
