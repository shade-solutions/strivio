import { Resend } from "resend";
import { env } from "@/lib/env";

export function getResendClient() {
	if (!env.RESEND_API_KEY) return null;
	return new Resend(env.RESEND_API_KEY);
}

export async function sendPurchaseEmail({ email, productTitle }: { email: string; productTitle: string }) {
	const resend = getResendClient();
	if (!resend) return { skipped: true as const };
	await resend.emails.send({
		from: "Strivio <support@strivio.world>",
		to: email,
		subject: `Your Strivio access is ready: ${productTitle}`,
		html: `<p>Thanks for your purchase. Your access is ready in your Strivio library.</p><p>Secure checkout. Clear downloads. Simple support.</p>`,
	});
	return { skipped: false as const };
}
