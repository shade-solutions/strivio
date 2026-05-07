import DodoPayments from "dodopayments";
import { env, requireEnv } from "@/lib/env";

export function getDodoClient() {
	return new DodoPayments({
		bearerToken: requireEnv("DODO_API_KEY"),
		environment: env.DODO_ENVIRONMENT,
		webhookKey: env.DODO_WEBHOOK_SECRET,
	});
}

export function assertDodoConfigured() {
	requireEnv("DODO_API_KEY");
	return true;
}
