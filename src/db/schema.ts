import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

const timestamps = {
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const userRoleEnum = pgEnum("user_role", ["buyer", "admin", "creator", "support"]);
export const productStatusEnum = pgEnum("product_status", ["draft", "published", "archived"]);
export const difficultyLevelEnum = pgEnum("difficulty_level", ["beginner", "intermediate", "advanced", "all"]);
export const assetTypeEnum = pgEnum("asset_type", ["file", "link", "instructions", "video", "zip", "template"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "failed", "refunded", "partially_refunded", "cancelled"]);
export const accessStatusEnum = pgEnum("access_status", ["active", "revoked", "refunded"]);
export const reviewStatusEnum = pgEnum("review_status", ["pending", "approved", "rejected"]);
export const couponDiscountTypeEnum = pgEnum("coupon_discount_type", ["percent", "fixed"]);

export const users = pgTable(
	"users",
	{
		id: text("id").primaryKey(),
		stackUserId: text("stack_user_id").unique(),
		email: text("email").notNull().unique(),
		name: text("name"),
		image: text("image"),
		role: userRoleEnum("role").default("buyer").notNull(),
		authProvider: text("auth_provider").default("stack").notNull(),
		...timestamps,
	},
	(table) => ({
		emailIdx: uniqueIndex("users_email_idx").on(table.email),
		stackUserIdx: uniqueIndex("users_stack_user_id_idx").on(table.stackUserId),
		roleIdx: index("users_role_idx").on(table.role),
	}),
);

export const profiles = pgTable(
	"profiles",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
		displayName: text("display_name"),
		bio: text("bio"),
		country: text("country"),
		website: text("website"),
		socialLinks: jsonb("social_links").$type<Record<string, string>>().default({}).notNull(),
		avatarUrl: text("avatar_url"),
	},
	(table) => ({
		userIdx: uniqueIndex("profiles_user_id_idx").on(table.userId),
	}),
);

export const categories = pgTable(
	"categories",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		slug: text("slug").notNull().unique(),
		description: text("description"),
		icon: text("icon"),
		parentId: text("parent_id"),
		sortOrder: integer("sort_order").default(0).notNull(),
		isActive: boolean("is_active").default(true).notNull(),
	},
	(table) => ({
		slugIdx: uniqueIndex("categories_slug_idx").on(table.slug),
		activeIdx: index("categories_active_idx").on(table.isActive),
	}),
);

export const goals = pgTable(
	"goals",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		slug: text("slug").notNull().unique(),
		description: text("description"),
		icon: text("icon"),
		sortOrder: integer("sort_order").default(0).notNull(),
	},
	(table) => ({
		slugIdx: uniqueIndex("goals_slug_idx").on(table.slug),
	}),
);

export const products = pgTable(
	"products",
	{
		id: text("id").primaryKey(),
		title: text("title").notNull(),
		slug: text("slug").notNull().unique(),
		subtitle: text("subtitle"),
		description: text("description"),
		shortDescription: text("short_description"),
		price: integer("price").notNull(),
		compareAtPrice: integer("compare_at_price"),
		currency: text("currency").default("USD").notNull(),
		status: productStatusEnum("status").default("draft").notNull(),
		categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
		creatorId: text("creator_id").references(() => users.id, { onDelete: "set null" }),
		thumbnailUrl: text("thumbnail_url"),
		coverUrl: text("cover_url"),
		previewImages: jsonb("preview_images").$type<string[]>().default([]).notNull(),
		demoUrl: text("demo_url"),
		dodoProductId: text("dodo_product_id"),
		dodoPriceId: text("dodo_price_id"),
		productType: text("product_type").notNull(),
		difficultyLevel: difficultyLevelEnum("difficulty_level").default("all").notNull(),
		estimatedTimeToValue: text("estimated_time_to_value"),
		licenseType: text("license_type"),
		refundPolicyType: text("refund_policy_type"),
		isFeatured: boolean("is_featured").default(false).notNull(),
		isBestseller: boolean("is_bestseller").default(false).notNull(),
		isStaffPick: boolean("is_staff_pick").default(false).notNull(),
		salesCount: integer("sales_count").default(0).notNull(),
		ratingAverage: integer("rating_average").default(0).notNull(),
		ratingCount: integer("rating_count").default(0).notNull(),
		metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
		publishedAt: timestamp("published_at", { withTimezone: true }),
	},
	(table) => ({
		slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
		categoryIdx: index("products_category_id_idx").on(table.categoryId),
		creatorIdx: index("products_creator_id_idx").on(table.creatorId),
		statusIdx: index("products_status_idx").on(table.status),
		createdAtIdx: index("products_created_at_idx").on(table.createdAt),
		publishedAtIdx: index("products_published_at_idx").on(table.publishedAt),
		priceIdx: index("products_price_idx").on(table.price),
		ratingIdx: index("products_rating_average_idx").on(table.ratingAverage),
		salesIdx: index("products_sales_count_idx").on(table.salesCount),
	}),
);

export const productGoals = pgTable(
	"product_goals",
	{
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
		goalId: text("goal_id").notNull().references(() => goals.id, { onDelete: "cascade" }),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.productId, table.goalId] }),
		goalIdx: index("product_goals_goal_id_idx").on(table.goalId),
	}),
);

export const productAssets = pgTable(
	"product_assets",
	{
		id: text("id").primaryKey(),
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
		assetType: assetTypeEnum("asset_type").notNull(),
		title: text("title").notNull(),
		description: text("description"),
		fileUrl: text("file_url"),
		r2Key: text("r2_key"),
		dodoAssetId: text("dodo_asset_id"),
		fileSize: integer("file_size"),
		mimeType: text("mime_type"),
		sortOrder: integer("sort_order").default(0).notNull(),
		isPreview: boolean("is_preview").default(false).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		productIdx: index("product_assets_product_id_idx").on(table.productId),
	}),
);

export const productPreviews = pgTable(
	"product_previews",
	{
		id: text("id").primaryKey(),
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
		type: text("type").notNull(),
		url: text("url").notNull(),
		alt: text("alt"),
		sortOrder: integer("sort_order").default(0).notNull(),
	},
	(table) => ({
		productIdx: index("product_previews_product_id_idx").on(table.productId),
	}),
);

export const orders = pgTable(
	"orders",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		email: text("email").notNull(),
		status: orderStatusEnum("status").default("pending").notNull(),
		subtotal: integer("subtotal").notNull(),
		discountTotal: integer("discount_total").default(0).notNull(),
		taxTotal: integer("tax_total").default(0).notNull(),
		total: integer("total").notNull(),
		currency: text("currency").default("USD").notNull(),
		dodoCheckoutSessionId: text("dodo_checkout_session_id"),
		dodoPaymentId: text("dodo_payment_id"),
		dodoCustomerId: text("dodo_customer_id"),
		idempotencyKey: text("idempotency_key").notNull().unique(),
		...timestamps,
	},
	(table) => ({
		userIdx: index("orders_user_id_idx").on(table.userId),
		statusIdx: index("orders_status_idx").on(table.status),
		emailIdx: index("orders_email_idx").on(table.email),
		checkoutIdx: index("orders_dodo_checkout_session_id_idx").on(table.dodoCheckoutSessionId),
		paymentIdx: index("orders_dodo_payment_id_idx").on(table.dodoPaymentId),
		idempotencyIdx: uniqueIndex("orders_idempotency_key_idx").on(table.idempotencyKey),
	}),
);

export const orderItems = pgTable(
	"order_items",
	{
		id: text("id").primaryKey(),
		orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
		productTitleSnapshot: text("product_title_snapshot").notNull(),
		priceSnapshot: integer("price_snapshot").notNull(),
		quantity: integer("quantity").default(1).notNull(),
		currency: text("currency").default("USD").notNull(),
	},
	(table) => ({
		orderIdx: index("order_items_order_id_idx").on(table.orderId),
		productIdx: index("order_items_product_id_idx").on(table.productId),
	}),
);

export const purchases = pgTable(
	"purchases",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
		accessStatus: accessStatusEnum("access_status").default("active").notNull(),
		accessGrantedAt: timestamp("access_granted_at", { withTimezone: true }),
		expiresAt: timestamp("expires_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		userIdx: index("purchases_user_id_idx").on(table.userId),
		productIdx: index("purchases_product_id_idx").on(table.productId),
		orderProductIdx: uniqueIndex("purchases_order_product_idx").on(table.orderId, table.productId),
	}),
);

export const downloads = pgTable(
	"downloads",
	{
		id: text("id").primaryKey(),
		purchaseId: text("purchase_id").notNull().references(() => purchases.id, { onDelete: "cascade" }),
		productAssetId: text("product_asset_id").notNull().references(() => productAssets.id, { onDelete: "cascade" }),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		downloadUrl: text("download_url"),
		downloadCount: integer("download_count").default(0).notNull(),
		lastDownloadedAt: timestamp("last_downloaded_at", { withTimezone: true }),
		expiresAt: timestamp("expires_at", { withTimezone: true }),
	},
	(table) => ({
		purchaseIdx: index("downloads_purchase_id_idx").on(table.purchaseId),
		userIdx: index("downloads_user_id_idx").on(table.userId),
	}),
);

export const reviews = pgTable(
	"reviews",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
		orderId: text("order_id").references(() => orders.id, { onDelete: "set null" }),
		rating: integer("rating").notNull(),
		title: text("title"),
		body: text("body"),
		status: reviewStatusEnum("status").default("pending").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		productIdx: index("reviews_product_id_idx").on(table.productId),
		statusIdx: index("reviews_status_idx").on(table.status),
	}),
);

export const coupons = pgTable(
	"coupons",
	{
		id: text("id").primaryKey(),
		code: text("code").notNull().unique(),
		discountType: couponDiscountTypeEnum("discount_type").notNull(),
		discountValue: integer("discount_value").notNull(),
		currency: text("currency").default("USD"),
		maxRedemptions: integer("max_redemptions"),
		redeemedCount: integer("redeemed_count").default(0).notNull(),
		startsAt: timestamp("starts_at", { withTimezone: true }),
		endsAt: timestamp("ends_at", { withTimezone: true }),
		isActive: boolean("is_active").default(true).notNull(),
	},
	(table) => ({
		codeIdx: uniqueIndex("coupons_code_idx").on(table.code),
		activeIdx: index("coupons_active_idx").on(table.isActive),
	}),
);

export const couponRedemptions = pgTable(
	"coupon_redemptions",
	{
		id: text("id").primaryKey(),
		couponId: text("coupon_id").notNull().references(() => coupons.id, { onDelete: "cascade" }),
		orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		redeemedAt: timestamp("redeemed_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		couponIdx: index("coupon_redemptions_coupon_id_idx").on(table.couponId),
		orderIdx: uniqueIndex("coupon_redemptions_order_id_idx").on(table.orderId),
	}),
);

export const wishlists = pgTable(
	"wishlists",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
		productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		userProductIdx: uniqueIndex("wishlists_user_product_idx").on(table.userId, table.productId),
	}),
);

export const webhookEvents = pgTable(
	"webhook_events",
	{
		id: text("id").primaryKey(),
		provider: text("provider").notNull(),
		eventId: text("event_id").notNull(),
		eventType: text("event_type").notNull(),
		processed: boolean("processed").default(false).notNull(),
		processedAt: timestamp("processed_at", { withTimezone: true }),
		rawPayload: jsonb("raw_payload").$type<Record<string, unknown>>().notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		providerEventIdx: uniqueIndex("webhook_events_provider_event_id_idx").on(table.provider, table.eventId),
		typeIdx: index("webhook_events_event_type_idx").on(table.eventType),
		processedIdx: index("webhook_events_processed_idx").on(table.processed),
	}),
);

export const supportTickets = pgTable(
	"support_tickets",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		orderId: text("order_id").references(() => orders.id, { onDelete: "set null" }),
		subject: text("subject").notNull(),
		message: text("message").notNull(),
		status: text("status").default("open").notNull(),
		priority: text("priority").default("normal").notNull(),
		assignedTo: text("assigned_to").references(() => users.id, { onDelete: "set null" }),
		...timestamps,
	},
	(table) => ({
		statusIdx: index("support_tickets_status_idx").on(table.status),
		userIdx: index("support_tickets_user_id_idx").on(table.userId),
	}),
);

export const auditLogs = pgTable(
	"audit_logs",
	{
		id: text("id").primaryKey(),
		actorUserId: text("actor_user_id").references(() => users.id, { onDelete: "set null" }),
		action: text("action").notNull(),
		entityType: text("entity_type").notNull(),
		entityId: text("entity_id"),
		metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		actorIdx: index("audit_logs_actor_user_id_idx").on(table.actorUserId),
		entityIdx: index("audit_logs_entity_idx").on(table.entityType, table.entityId),
	}),
);

export const aiAgentRuns = pgTable(
	"ai_agent_runs",
	{
		id: text("id").primaryKey(),
		agentName: text("agent_name").notNull(),
		triggeredByUserId: text("triggered_by_user_id").references(() => users.id, { onDelete: "set null" }),
		status: text("status").default("drafted").notNull(),
		input: jsonb("input").$type<Record<string, unknown>>().default({}).notNull(),
		output: jsonb("output").$type<Record<string, unknown>>().default({}).notNull(),
		costEstimate: integer("cost_estimate"),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		completedAt: timestamp("completed_at", { withTimezone: true }),
	},
	(table) => ({
		agentIdx: index("ai_agent_runs_agent_name_idx").on(table.agentName),
		userIdx: index("ai_agent_runs_user_id_idx").on(table.triggeredByUserId),
	}),
);

export const searchEvents = pgTable(
	"search_events",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		query: text("query").notNull(),
		filters: jsonb("filters").$type<Record<string, unknown>>().default({}).notNull(),
		resultsCount: integer("results_count").default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		queryIdx: index("search_events_query_idx").on(table.query),
		createdAtIdx: index("search_events_created_at_idx").on(table.createdAt),
	}),
);

export const analyticsEvents = pgTable(
	"analytics_events",
	{
		id: text("id").primaryKey(),
		userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
		anonymousId: text("anonymous_id"),
		eventName: text("event_name").notNull(),
		properties: jsonb("properties").$type<Record<string, unknown>>().default({}).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		userIdx: index("analytics_events_user_id_idx").on(table.userId),
		eventNameIdx: index("analytics_events_event_name_idx").on(table.eventName),
		createdAtIdx: index("analytics_events_created_at_idx").on(table.createdAt),
	}),
);

export const usersRelations = relations(users, ({ one, many }) => ({
	profile: one(profiles),
	products: many(products),
	orders: many(orders),
	purchases: many(purchases),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
	category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
	creator: one(users, { fields: [products.creatorId], references: [users.id] }),
	goals: many(productGoals),
	assets: many(productAssets),
	previews: many(productPreviews),
	reviews: many(reviews),
}));

export const productGoalsRelations = relations(productGoals, ({ one }) => ({
	product: one(products, { fields: [productGoals.productId], references: [products.id] }),
	goal: one(goals, { fields: [productGoals.goalId], references: [goals.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
	user: one(users, { fields: [orders.userId], references: [users.id] }),
	items: many(orderItems),
	purchases: many(purchases),
}));
