import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
	return (
		<LegalPage title="Terms of service">
			<p>Strivio provides a platform for buying and accessing digital products. Products are delivered digitally and may include files, templates, links, instructions, or access pages.</p>
			<p>Buyers are responsible for checking previews, compatibility, and license terms before purchase. You may not resell, redistribute, or publish purchased files unless a product license explicitly allows it.</p>
			<p>Admin actions involving refunds, deletion, price changes, mass emails, or access revocation require human approval. Financial and access records are retained for security, compliance, and support.</p>
		</LegalPage>
	);
}
