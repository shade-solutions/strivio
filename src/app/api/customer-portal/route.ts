import { CustomerPortal } from "@dodopayments/nextjs";
import type { NextRequest } from "next/server";
import { env, requireEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	const handler = CustomerPortal({
		bearerToken: requireEnv("DODO_API_KEY"),
		environment: env.DODO_ENVIRONMENT,
	});
	return handler(request);
}
