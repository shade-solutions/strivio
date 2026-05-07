import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
	return (
		<LegalPage title="Privacy policy">
			<p>Strivio collects account, order, support, analytics, and operational data needed to run the marketplace, deliver purchases, prevent abuse, and improve the product.</p>
			<p>Payments are processed through Dodo Payments. Authentication is handled through Stack Auth. Emails may be sent through Resend, analytics through PostHog, and errors through Sentry when configured.</p>
			<p>We do not intentionally expose secrets to clients. Future MCP and AI tools must use scoped permissions, read-only defaults, allowlisted actions, and audit logs.</p>
		</LegalPage>
	);
}
