# Strivio

Strivio is a premium, playful, trust-first marketplace for selling digital products at `https://strivio.world`. It is built for instant access, clear product outcomes, secure checkout, and admin-led operations.

## Tech Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Stack Auth for buyer/admin authentication
- Neon Postgres with Drizzle ORM
- Dodo Payments checkout, customer portal, and verified webhooks
- Cloudflare Workers via OpenNext Cloudflare
- Resend email, PostHog-style event capture, Sentry-ready error monitoring
- Zod validation and audit-logged AI/admin workflow placeholders

## Local Setup

```bash
bun install
cp .env.example .env
bun run dev
```

Open `http://localhost:3000`.

## Environment Variables

Use `.env.example` as the source of truth. Required for a useful local MVP:

- `DATABASE_URL`
- `NEXT_PUBLIC_STACK_PROJECT_ID`
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
- `STACK_SECRET_SERVER_KEY`
- `ADMIN_EMAILS` for local admin access
- `DODO_API_KEY` and `DODO_WEBHOOK_SECRET` before real checkout

Never commit `.env`, API keys, webhook secrets, or Cloudflare tokens.

## Database

```bash
bun run db:generate
bun run db:migrate
bun run seed
```

The schema includes products, goals, categories, orders, purchases, downloads, reviews, coupons, support tickets, webhook events, analytics events, audit logs, and AI agent runs. Webhook events are stored for idempotency, and purchase access is granted only after verified Dodo webhook confirmation.

## Stack Auth

Create a Stack project, add the Stack keys to `.env`, and set callback URLs for:

- `/handler/sign-in`
- `/handler/sign-up`
- `/handler/forgot-password`

Admin access is allowed by one of:

- Stack permission: `access_admin_dashboard`
- A local database user role of `admin`
- Email listed in `ADMIN_EMAILS`

## Dodo Payments

Create matching products/prices in Dodo and store the real IDs on Strivio products. Demo seed IDs intentionally start with `demo_` and are rejected by checkout so production access cannot be faked.

Set the webhook endpoint in Dodo:

```txt
https://strivio.world/api/webhooks/dodo
```

The webhook route verifies signatures, records every event, handles duplicate events safely, marks paid/failed/cancelled/refunded orders, and grants or revokes purchases server-side.

## Digital Delivery

The preferred path is Dodo digital delivery. The custom fallback stores product assets in `product_assets`; `/api/downloads/[purchaseId]` checks the logged-in user owns an active purchase before returning assets and tracking downloads. Wire R2 signed URLs when moving real files into Cloudflare R2.

## Email

Add `RESEND_API_KEY` to enable transactional emails. Current template coverage includes purchase confirmation/access instructions; the app is structured for failed payment, refund, support, admin order, and review request templates.

## Analytics And Monitoring

Server-side analytics events are stored in Postgres and surfaced through `/api/admin/analytics/summary`. Add PostHog public/server keys for product analytics and `SENTRY_DSN` before production to monitor checkout, webhook, auth, admin, and download failures.

## Cloudflare Deployment

```bash
bun run build
bun run preview
bun run deploy
```

`wrangler.jsonc` points to `.open-next/worker.js`, enables Node.js compatibility, configures OpenNext assets/images/self-reference bindings, and includes the `strivio.world` custom domain route. Set Cloudflare secrets with Wrangler rather than hardcoding them:

```bash
wrangler secret put DATABASE_URL
wrangler secret put STACK_SECRET_SERVER_KEY
wrangler secret put DODO_API_KEY
wrangler secret put DODO_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
```

Use Cloudflare R2 bindings for custom file delivery when Dodo delivery is not enough.

## Admin Operations

Admin routes live under `/admin` and include products, orders, customers, categories, coupons, reviews, support, analytics, AI assistant, webhooks, and audit logs. AI workflows are draft-only and audit logged; refunds, deletion, price changes, mass emails, and access revocation require human approval.

## Tests

```bash
bun run typecheck
bun run lint
bun run test
```

Add Playwright purchase-flow tests once a test Dodo account and webhook tunnel are configured.

## Production Checklist

- Domain connected: `strivio.world`
- HTTPS enabled
- Environment variables and Cloudflare secrets configured
- Database migrated
- Demo product IDs replaced with live Dodo product/price IDs
- Dodo live mode configured
- Dodo webhook URL configured and signature verified
- Test purchase completed
- Webhook-confirmed purchase access verified
- Download access and revocation verified
- Refund flow tested
- Resend emails tested
- Sentry tested
- Analytics tested
- Legal pages reviewed by counsel
- Admin account secured with Stack permission or `ADMIN_EMAILS`
- Rate limits and Turnstile enabled on sensitive forms
- Database backups enabled
- Monitoring and alerting enabled
