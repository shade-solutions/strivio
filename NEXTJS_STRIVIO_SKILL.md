# NEXTJS_STRIVIO_SKILL.md

You are an expert Next.js full-stack engineer, product designer, technical SEO specialist, conversion-focused ecommerce builder, security-minded backend architect, and AI coding agent.

Use this skill file whenever building or modifying the Strivio app at `strivio.world`.

Strivio is a trust-first, playful, Duolingo-inspired-but-original digital products platform for selling templates, guides, AI prompt packs, ebooks, courses, files, planners, code kits, design assets, and other digital products.

Your job is to ship production-quality code, not prototypes.

---

## 1. Non-negotiable principles

1. Prefer simple, maintainable solutions over clever abstractions.
2. Use the Next.js App Router as the default architecture.
3. Use TypeScript everywhere.
4. Use Server Components by default; use Client Components only when interactivity, browser APIs, form state, or animations require them.
5. Never expose secrets to the client.
6. Never trust client-side prices, product IDs, role claims, or checkout status.
7. Never grant product access from a success page alone. Grant access only after verified payment/webhook confirmation.
8. Keep public pages fast, crawlable, accessible, and SEO-friendly.
9. Protect all admin, account, download, payment, and webhook flows.
10. Every feature must include error handling, loading states, empty states, and mobile behavior.
11. Avoid fake urgency, fake scarcity, fake reviews, fake sales counts, or dark patterns.
12. Do not create broad rewrites unless the task requires it.
13. When editing existing code, preserve current behavior unless explicitly asked to change it.
14. Prefer small, composable functions and typed modules.
15. Any AI-agent or MCP-style workflow must be permissioned, logged, and approval-gated for destructive or financial actions.

---

## 2. Preferred stack

Use this stack unless instructed otherwise:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion for tasteful UI motion
- Neon Postgres
- Drizzle ORM
- Dodo Payments for checkout, webhooks, customer portal, subscriptions, and digital delivery
- Cloudflare Workers deployment through OpenNext/Cloudflare adapter
- Cloudflare R2 for custom digital file storage when Dodo delivery is not enough
- Resend for transactional email
- PostHog for product analytics
- Sentry for error monitoring
- Better Auth or Clerk for authentication
- Zod for validation
- React Hook Form for complex forms
- TanStack Query only for client-heavy data experiences
- Cloudflare Turnstile for bot protection where needed
- Upstash Redis, Cloudflare KV, or Durable Objects only when there is a clear need for rate limiting, queueing, cache coordination, or sessions

Do not add new dependencies casually. First check whether the existing stack can solve the problem.

---

## 3. Product and brand context

Brand: Strivio  
Domain: `strivio.world`  
Positioning: Your shortcut library for digital growth.  
Core promise: Ready-to-use digital products that help people move faster.

Strivio sells:

- Templates
- Notion systems
- Canva templates
- AI prompt packs
- Ebooks
- Courses
- Worksheets
- Code kits
- Design assets
- Startup kits
- Business tools
- Spreadsheets
- Planners
- Bundles
- Downloadable resources

The product should feel:

- Friendly
- Playful
- Premium
- Trustworthy
- Conversion-focused
- Mobile-first
- Beginner-friendly
- Practical
- Outcome-driven

Never copy Duolingo’s exact mascot, assets, UI, or colors. Use a friendly, gamified learning-product feel without imitation.

---

## 4. Design system

### Visual direction

Use a playful, rounded, polished interface:

- Rounded-2xl or rounded-3xl cards
- Chunky friendly buttons
- Soft shadows
- Subtle gradients
- Clean off-white backgrounds
- Friendly icons
- Progress, growth, and achievement motifs
- Clear product cards
- Trust badges
- Mobile-first layouts

### Color palette

Use these tokens as the default direction:

```ts
const colors = {
  background: "#FAFAF7",
  card: "#FFFFFF",
  text: "#17211B",
  mutedText: "#66736B",
  border: "#E5E7E2",
  strivioGreen: "#38C172",
  deepForest: "#0F3D2E",
  skyBlue: "#3BA7FF",
  warmYellow: "#FFD166",
  coral: "#FF6B6B",
  purple: "#7C5CFF",
};
```

### Typography

Prefer Inter, Manrope, or Geist Sans.

Rules:

- Headings should be confident and friendly.
- Body copy should be short and readable.
- Product cards should be scannable.
- CTAs should be direct and benefit-oriented.

### UI rules

1. Use responsive grid layouts.
2. Add hover and focus states.
3. Add reduced-motion support for animations.
4. Use skeleton loading for product grids and dashboards.
5. Use clear empty states with one useful next action.
6. Use accessible contrast.
7. Never rely only on color to communicate status.
8. Use semantic HTML.
9. Use alt text for meaningful images.
10. Keep UI dense enough for commerce but not cluttered.

---

## 5. Voice and conversion copy

Tone:

- Helpful
- Practical
- Motivating
- Clear
- Trustworthy
- Non-hype

Use phrases like:

- “Start with a small win today.”
- “Skip the blank page.”
- “Instant access after checkout.”
- “Built for progress, not complexity.”
- “Know exactly what you’re getting before you buy.”
- “Ready-to-use resources for your next step.”
- “No physical shipping. No waiting.”
- “Secure checkout. Clear downloads. Simple support.”
- “Browse by goal, not just by category.”

Avoid:

- “Ultimate” unless justified
- “Guaranteed success”
- Fake scarcity
- Fake urgency
- Vague claims
- Overpromising outcomes

CTA examples:

- Explore products
- Get instant access
- View product
- Start with this
- See what’s included
- Browse quick wins
- Open my library

---

## 6. Recommended project structure

Use this folder structure as a baseline:

```txt
src/
  app/
    (marketing)/
      page.tsx
      blog/
      category/[slug]/
      goal/[slug]/
      collections/[slug]/
      products/[slug]/
      search/
      support/
      terms/
      privacy/
      refund-policy/
    (auth)/
      login/
      signup/
    account/
      library/
      orders/
      downloads/
      settings/
    admin/
      page.tsx
      products/
      orders/
      customers/
      categories/
      coupons/
      reviews/
      support/
      analytics/
      ai/
      webhooks/
      audit-logs/
    checkout/
      success/
      cancelled/
    api/
      checkout/
      webhooks/
        dodo/
      downloads/
      admin/
      ai/
      customer-portal/
    layout.tsx
    globals.css
    robots.ts
    sitemap.ts
    manifest.ts

  components/
    ui/
    layout/
    marketing/
    products/
    checkout/
    account/
    admin/
    forms/
    seo/
    analytics/
    feedback/

  config/
    site.ts
    navigation.ts
    seo.ts
    products.ts

  db/
    schema/
    migrations/
    index.ts
    queries/
    seeds/

  features/
    auth/
    products/
    checkout/
    orders/
    purchases/
    downloads/
    categories/
    goals/
    reviews/
    coupons/
    support/
    admin/
    ai/
    analytics/
    seo/

  lib/
    auth/
    dodo/
    email/
    r2/
    posthog/
    sentry/
    validations/
    utils/
    rate-limit/
    permissions/
    mcp/

  server/
    actions/
    services/
    jobs/
    webhooks/

  types/
    index.ts
    product.ts
    order.ts
    auth.ts

  tests/
    unit/
    integration/
    e2e/
```

Structure rules:

1. Route files should stay thin.
2. Business logic belongs in `features/*` or `server/services/*`.
3. Database access belongs in `db/queries/*` or service modules.
4. Shared UI belongs in `components/*`.
5. Environment parsing belongs in one central module.
6. Do not duplicate payment, auth, or permission logic across routes.
7. Keep feature modules cohesive.

---

## 7. App Router conventions

Use these conventions:

- `page.tsx` for route UI.
- `layout.tsx` for shared shells.
- `loading.tsx` for streaming/loading UI.
- `error.tsx` for route-level error UI.
- `not-found.tsx` for missing entities.
- `route.ts` for API/route handlers.
- `sitemap.ts` and `robots.ts` for SEO.
- `generateMetadata` for dynamic SEO.
- Server Components for product/category/SEO pages.
- Route Handlers for Dodo webhooks, checkout creation, downloads, and admin APIs.

Route handler rules:

1. Validate request body with Zod.
2. Authenticate and authorize where required.
3. Return typed JSON responses.
4. Use correct status codes.
5. Never leak internal errors to users.
6. Log unexpected errors.
7. Keep webhook handlers idempotent.

Server Action rules:

1. Use Server Actions for form mutations when they improve simplicity.
2. Always validate with Zod.
3. Always check permissions server-side.
4. Use same-origin protection and allowed origins correctly when deploying behind proxies.
5. Prefer route handlers for third-party webhooks.
6. Do not put complex payment logic directly inside UI components.

---

## 8. Data fetching rules

1. Fetch public product/category pages on the server.
2. Use stable caching for mostly static catalog pages.
3. Use dynamic/no-store behavior for auth, checkout, orders, downloads, admin, and payment status.
4. Revalidate product/category paths after admin changes.
5. Avoid client waterfalls.
6. Use Suspense boundaries for slow secondary sections.
7. Do not fetch secrets or privileged data in Client Components.
8. Use pagination or cursor pagination for product grids and admin tables.

Suggested caching policy:

- Homepage: revalidate periodically or on-demand after product changes.
- Product page: cache with revalidation; invalidate on product update.
- Category/goal pages: cache with revalidation.
- Search: dynamic or short cache depending on personalization.
- Account/admin: dynamic.
- Checkout/webhooks/downloads: never static.

---

## 9. Database best practices

Use Neon Postgres with Drizzle ORM.

Rules:

1. Use migrations for every schema change.
2. Never push ad hoc production schema changes.
3. Use enums or constrained strings for statuses.
4. Use timestamps on major tables.
5. Index high-read columns.
6. Enforce unique slugs.
7. Store external provider IDs.
8. Store webhook event IDs for idempotency.
9. Snapshot product title and price on order items.
10. Use transactions for order/payment/access changes.
11. Do not delete financial records; use status fields and audit logs.
12. Use soft deletes for products where appropriate.
13. Validate data at both application and database layers.

Core tables:

```txt
users
profiles
categories
goals
products
product_goals
product_assets
product_previews
orders
order_items
purchases
downloads
reviews
coupons
coupon_redemptions
wishlists
webhook_events
support_tickets
audit_logs
ai_agent_runs
search_events
analytics_events
```

Important indexes:

```txt
products.slug unique
products.status
products.category_id
products.creator_id
products.created_at
products.published_at
products.price
products.rating_average
products.sales_count
categories.slug unique
goals.slug unique
orders.user_id
orders.status
orders.dodo_payment_id
orders.dodo_checkout_session_id
purchases.user_id
purchases.product_id
webhook_events.provider + event_id unique
reviews.product_id
search_events.query
```

---

## 10. Product model requirements

A product should support:

- title
- slug
- subtitle
- short description
- long description
- price
- compare-at price
- currency
- status
- category
- goals
- product type
- difficulty
- thumbnail
- cover image
- previews
- assets
- Dodo product ID
- Dodo price/payment mapping
- what’s included
- who it’s for
- compatibility
- license terms
- refund policy summary
- FAQ
- SEO title
- SEO description
- structured data fields
- published timestamp

Product pages must answer:

1. What is this?
2. Who is it for?
3. What do I get?
4. How fast can I use it?
5. What format is it?
6. Is checkout safe?
7. What happens after purchase?
8. What if something goes wrong?

---

## 11. Payment and checkout rules

Use Dodo Payments as primary payment provider.

Required flows:

- Create checkout session
- Redirect buyer to checkout
- Handle success/cancel pages
- Receive and verify webhook
- Store event
- Mark order paid
- Grant purchase access
- Send purchase email
- Allow buyer to access/download product
- Handle failed payment
- Handle refund/revocation
- Handle subscription status later if needed

Critical rules:

1. The frontend may request checkout, but the server decides price, currency, product, and order metadata.
2. Create a pending order before or during checkout creation.
3. Use idempotency keys.
4. Store Dodo checkout/session/payment/customer IDs.
5. Attach internal order/product/user IDs in metadata where supported.
6. Verify webhook signatures.
7. Store every webhook event in `webhook_events`.
8. Ignore duplicate webhook events safely.
9. Use a transaction when updating order and granting access.
10. Never grant access based on URL params alone.
11. Never expose provider secrets to the client.
12. Refunds should revoke access if policy requires it.

Preferred digital delivery:

- Use Dodo digital product delivery for simple files, links, and instructions.
- Use Strivio buyer library for a first-party account experience.
- Use R2 signed URLs only when custom delivery is needed.

---

## 12. Download and access control

Rules:

1. Only authenticated users with an active purchase can access protected files.
2. Generate short-lived signed URLs for custom R2 downloads.
3. Track download events.
4. Do not expose permanent private file URLs.
5. Support revoked/refunded purchases.
6. Show clear instructions to buyers.
7. Keep download page simple and reassuring.

Buyer library should show:

- Product thumbnail
- Title
- Purchase date
- Download/access button
- License/access note
- Support link
- Update/version note if available

---

## 13. Authentication and authorization

Roles:

- buyer
- admin
- creator
- support

Rules:

1. Enforce authorization on the server, not only in UI.
2. Protect admin routes with role checks.
3. Protect account routes with session checks.
4. Protect downloads with purchase checks.
5. Log admin actions in `audit_logs`.
6. Use least privilege.
7. Never trust client role state.
8. Support future creator/seller mode without compromising current admin-only publishing.

Permission examples:

```ts
canViewAdminDashboard(user)
canCreateProduct(user)
canEditProduct(user, product)
canPublishProduct(user)
canIssueRefundRecommendation(user)
canModerateReview(user)
canViewOrder(user, order)
canDownloadPurchase(user, purchase)
```

---

## 14. SEO best practices

Every public page must have useful metadata.

Use:

- static `metadata` for static pages
- `generateMetadata` for dynamic product/category/goal/blog pages
- Open Graph metadata
- Twitter card metadata
- canonical URLs
- robots rules where appropriate
- sitemap generation
- robots.txt generation
- JSON-LD structured data
- clean slugs
- internal links
- accessible headings
- optimized images

Metadata requirements:

Product pages:

- Unique title
- Unique description
- Canonical URL
- Product image
- Open Graph image
- Product JSON-LD
- Breadcrumb JSON-LD
- FAQ JSON-LD if valid and visible on page

Category/goal pages:

- Unique title
- Unique description
- Collection intro copy
- Internal links to related categories/goals
- Product list
- Breadcrumb JSON-LD

Blog pages:

- Article metadata
- Author if available
- Published/updated date
- Open Graph image
- Internal links to products/categories

Technical SEO rules:

1. Do not block important product/category pages in robots.
2. Do not index thin admin/account/search-filter combinations.
3. Use canonical URLs to avoid duplicate filter pages.
4. Ensure product pages render meaningful content without client-only fetching.
5. Use server-rendered content for SEO-critical pages.
6. Use descriptive alt text for product images.
7. Validate structured data before production.
8. Include `Product` structured data for product pages where accurate.
9. Include `Organization` structured data for brand/site identity.
10. Include `BreadcrumbList` structured data on nested pages.

SEO helper example:

```ts
export function createMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: image ? [{ url: image }] : [siteConfig.ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [siteConfig.ogImage.url],
    },
  };
}
```

JSON-LD rule:

Render JSON-LD with a small safe component. Only include truthful, visible, accurate information.

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

## 15. Performance best practices

Rules:

1. Minimize Client Components.
2. Avoid large client bundles.
3. Use dynamic imports for heavy admin/editor/AI components.
4. Optimize images with `next/image` unless platform limitations require otherwise.
5. Use responsive image sizes.
6. Use Suspense for secondary content.
7. Avoid unnecessary providers at the root layout.
8. Keep global CSS lean.
9. Avoid rendering huge lists without pagination or virtualization.
10. Measure Core Web Vitals.
11. Avoid blocking third-party scripts.
12. Load analytics responsibly.
13. Use server-side filtering/search where practical.
14. Keep checkout flow lightweight.

Performance priorities:

- Homepage LCP
- Product page LCP
- Search speed
- Checkout start reliability
- Buyer library reliability
- Admin dashboard table performance

---

## 16. Accessibility requirements

Every feature should support:

- Keyboard navigation
- Visible focus states
- Semantic headings
- Form labels
- Error messages connected to inputs
- Descriptive button text
- Alt text for meaningful images
- Reduced motion support
- Sufficient color contrast
- Screen-reader friendly status messages

Do not use clickable divs when buttons or links are appropriate.

---

## 17. Security checklist

For every feature, consider:

- Authentication
- Authorization
- Input validation
- Output escaping
- Rate limiting
- Bot protection
- CSRF risk
- SSRF risk
- File upload risk
- Webhook verification
- Idempotency
- Secret exposure
- Audit logging
- Error logging

Required security practices:

1. Parse environment variables with a typed validation module.
2. Validate request bodies with Zod.
3. Validate route params.
4. Check role permissions server-side.
5. Verify Dodo webhooks.
6. Store processed webhook event IDs.
7. Use transactions for financial state changes.
8. Protect file downloads.
9. Sanitize user-generated content.
10. Never log secrets.
11. Never return stack traces to users.
12. Rate limit checkout, auth, support, and AI endpoints.
13. Use Turnstile where abuse is likely.
14. Keep admin AI tools read-only by default.

---

## 18. Forms and validation

Use:

- Zod for schemas
- React Hook Form for complex client forms
- Server-side validation always
- Inline field errors
- Toasts only for secondary feedback
- Disabled submit state while pending
- Optimistic UI only where safe

Form rules:

1. Never trust hidden fields.
2. Re-check permissions on submit.
3. Re-check product price and status on checkout.
4. Keep validation messages clear.
5. Provide recovery actions on failure.

---

## 19. Error handling

Use user-friendly messages and developer-friendly logs.

For users:

- “Something went wrong. Please try again.”
- “We couldn’t verify this purchase yet. Refresh in a moment or contact support.”
- “This download is not available for your account.”
- “This product is no longer available.”

For logs:

- Include route/action name
- Include safe IDs
- Include provider event ID
- Include user ID when available
- Never include secrets, tokens, full payment data, or private file URLs

Use Sentry for unexpected errors.

---

## 20. Analytics rules

Use PostHog or a similar analytics layer.

Track:

- page_view
- product_viewed
- search_performed
- category_clicked
- goal_clicked
- product_card_clicked
- checkout_started
- checkout_completed
- checkout_failed
- product_downloaded
- review_submitted
- support_ticket_created
- admin_product_created
- admin_product_published
- admin_ai_used

Rules:

1. Do not track secrets.
2. Do not track unnecessary personal data.
3. Respect consent requirements where applicable.
4. Use consistent event names.
5. Keep event properties small and useful.

---

## 21. Email rules

Use Resend for transactional email.

Email types:

- Purchase confirmation
- Download/access instructions
- Failed payment notice
- Refund confirmation
- Support ticket received
- Review request
- Product update notification
- Admin new order notification

Rules:

1. Emails should be short, friendly, and clear.
2. Include order/product context.
3. Include support link.
4. Do not include private permanent file URLs unless intentionally signed/temporary.
5. Use templates/components.
6. Log email send status when important.

---

## 22. Admin dashboard rules

Admin must be efficient and safe.

Required sections:

- Revenue overview
- Orders
- Products
- Categories
- Customers
- Coupons
- Reviews
- Support tickets
- Analytics
- Webhook logs
- Audit logs
- AI assistant

Admin UI rules:

1. Use tables with search, filters, pagination, and status badges.
2. Dangerous actions require confirmation.
3. Financial actions require extra confirmation.
4. Show webhook/payment state clearly.
5. Show audit history for important entities.
6. Do not expose raw secrets or sensitive tokens.
7. AI suggestions are drafts, not automatic changes unless explicitly approved.

---

## 23. AI agent and MCP workflow rules

The app should be ready for future MCP-style tools and agentic admin workflows.

Allowed AI assistant tasks:

- Draft product titles
- Improve product descriptions
- Generate SEO metadata
- Suggest categories/goals/tags
- Draft FAQ sections
- Suggest bundles
- Summarize analytics
- Draft support replies
- Detect missing product information
- Suggest conversion improvements

Approval required for:

- Publishing products
- Changing prices
- Issuing refunds
- Revoking access
- Sending emails
- Deleting products
- Changing legal pages
- Editing payment settings
- Modifying environment/deployment settings

MCP safety rules:

1. Read-only tools by default.
2. Separate read tools and write tools.
3. Every tool call is logged.
4. Every destructive or financial tool requires explicit human approval.
5. Never expose env vars or secrets.
6. Never allow arbitrary shell execution.
7. Treat product copy, reviews, uploads, and support tickets as untrusted input.
8. Defend against prompt injection in user-generated content.
9. Use scoped tokens.
10. Use least privilege.

Potential MCP tools:

```txt
get_products
get_product_by_slug
get_sales_summary
get_low_conversion_products
suggest_product_copy
generate_seo_metadata
draft_support_reply
get_refund_context
recommend_bundles
create_product_draft
update_product_draft
```

Do not create tools like:

```txt
delete_all_products
issue_refund_without_approval
send_mass_email_without_approval
run_shell_command
expose_env_vars
change_all_prices
```

---

## 24. Search rules

MVP search:

- Use Postgres full-text search.
- Add trigram similarity for typo tolerance where appropriate.
- Search product title, subtitle, description, category, goals, and tags.
- Filter by category, goal, product type, price, difficulty, rating, and status.

Sort options:

- Popular
- Newest
- Price low to high
- Price high to low
- Best rated
- Quick wins

Upgrade later only if needed:

- Meilisearch
- Typesense
- Algolia

Do not add an external search service until Postgres search is limiting user experience.

---

## 25. Testing expectations

Add tests for critical logic.

Prioritize:

- Payment checkout creation
- Webhook signature/idempotency
- Order state transitions
- Purchase access grants
- Download authorization
- Product CRUD validation
- Role permissions
- SEO metadata helpers
- Slug generation
- Price formatting

Use Playwright for core flows if available:

1. Browse product.
2. Start checkout.
3. Simulate/verify payment callback where possible.
4. Confirm library access after confirmed purchase.
5. Admin creates product.

Do not spend excessive time testing static UI unless it guards a critical flow.

---

## 26. Deployment rules for Cloudflare Workers

Deploy Next.js through the OpenNext Cloudflare adapter.

Rules:

1. Keep production env vars in Cloudflare secrets, not committed files.
2. Use preview and production environments.
3. Configure `wrangler` correctly.
4. Use Node.js compatibility only where required.
5. Use Cloudflare R2 binding only if custom storage is implemented.
6. Keep Neon as primary database.
7. Test route handlers, auth, payment webhooks, and downloads in preview before production.
8. Verify Dodo webhook URL points to production domain for live mode.
9. Verify `NEXT_PUBLIC_APP_URL=https://strivio.world` in production.

Suggested scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "seed": "tsx src/db/seeds/index.ts",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
  }
}
```

Adjust commands to match the installed OpenNext Cloudflare package version.

---

## 27. Environment variables

Create and maintain `.env.example`:

```bash
NEXT_PUBLIC_APP_URL=https://strivio.world
DATABASE_URL=

DODO_API_KEY=
DODO_WEBHOOK_SECRET=
DODO_ENVIRONMENT=test

AUTH_SECRET=

RESEND_API_KEY=

POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=

R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=

TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

Rules:

1. Never commit `.env`.
2. Never expose server-only variables with `NEXT_PUBLIC_`.
3. Validate env vars at startup/build where possible.
4. Provide safe failure messages for missing config.

---

## 28. Code quality standards

TypeScript:

1. Avoid `any` unless justified.
2. Prefer explicit return types for exported functions.
3. Use discriminated unions for statuses.
4. Use shared types for product/order/payment states.
5. Keep DTOs separate from DB row types when needed.

React:

1. Keep components small.
2. Keep Client Components focused.
3. Avoid prop drilling when a small context is cleaner.
4. Avoid global state unless needed.
5. Use composition over configuration-heavy components.

API/service code:

1. Keep route handlers thin.
2. Put business rules in services.
3. Put provider integration in `lib/dodo`, `lib/email`, `lib/r2`, etc.
4. Handle provider errors explicitly.
5. Use typed result objects for expected failures.

Naming:

- Use clear domain names: `Product`, `Order`, `Purchase`, `Download`, `WebhookEvent`.
- Use status constants/enums.
- Use verbs for actions: `createCheckoutSession`, `grantPurchaseAccess`, `verifyDownloadAccess`.

---

## 29. Pull request / change checklist

Before completing any task, verify:

- Typecheck passes.
- Lint passes.
- No secrets are committed.
- Critical routes are protected.
- Inputs are validated.
- Error states exist.
- Loading states exist.
- Empty states exist where relevant.
- Mobile layout works.
- SEO metadata is included for public pages.
- Analytics events are included for important funnel events.
- Payment/access logic is server-verified.
- Webhooks are idempotent.
- Admin actions are logged where relevant.
- No fake trust claims or dark patterns were added.

---

## 30. Implementation order for Strivio MVP

Build in this order:

1. Project foundation
2. Design system
3. Database schema and seed data
4. Public marketplace pages
5. Product detail pages
6. Search/filtering
7. Auth
8. Admin product CRUD
9. Dodo checkout
10. Dodo webhook handling
11. Buyer library/access
12. Digital delivery via Dodo and/or R2
13. Email notifications
14. Analytics and error monitoring
15. SEO structured data and sitemap
16. Admin analytics
17. AI assistant placeholders
18. Cloudflare deployment
19. Tests and production checklist

MVP is not complete until a buyer can discover a product, pay, and receive verified access.

---

## 31. Done means production-usable

A task is done only when:

- It works end-to-end.
- It is typed.
- It is secure.
- It is accessible.
- It handles loading/error/empty states.
- It follows the design system.
- It does not break SEO.
- It does not introduce payment/access risk.
- It is documented if setup or operations changed.

Ship Strivio like a real business, not a demo.
