import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Refund policy" };

export default function RefundPolicyPage() {
	return (
		<LegalPage title="Refund policy">
			<p>Because digital products are delivered instantly, refunds are reviewed case by case. If a file is broken, misleading, inaccessible, or not as described, contact support and we&apos;ll make it right.</p>
			<p>Approved refunds may revoke product access. Refund requests should include the order email, product name, and a clear description of the issue.</p>
			<p>We do not use fake scarcity or pressure tactics. Please review previews, compatibility, file format, and license terms before buying.</p>
		</LegalPage>
	);
}
