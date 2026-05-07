import { z } from "zod";

const envSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.string().url().default("https://strivio.world"),
	DATABASE_URL: z.string().min(1).optional(),
	DODO_API_KEY: z.string().optional(),
	DODO_WEBHOOK_SECRET: z.string().optional(),
	DODO_ENVIRONMENT: z.enum(["test_mode", "live_mode"]).default("test_mode"),
	AUTH_SECRET: z.string().optional(),
	RESEND_API_KEY: z.string().optional(),
	POSTHOG_KEY: z.string().optional(),
	NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
	NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
	SENTRY_DSN: z.string().optional(),
	CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
	CLOUDFLARE_API_TOKEN: z.string().optional(),
	R2_ACCESS_KEY_ID: z.string().optional(),
	R2_SECRET_ACCESS_KEY: z.string().optional(),
	R2_BUCKET_NAME: z.string().optional(),
	R2_PUBLIC_URL: z.string().url().optional(),
	TURNSTILE_SECRET_KEY: z.string().optional(),
	NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
	NEXT_PUBLIC_STACK_PROJECT_ID: z.string().optional(),
	NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().optional(),
	STACK_SECRET_SERVER_KEY: z.string().optional(),
	ADMIN_EMAILS: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export function requireEnv(name: keyof typeof env) {
	const value = env[name];
	if (!value) throw new Error(`${name} is required for this operation.`);
	return String(value);
}
