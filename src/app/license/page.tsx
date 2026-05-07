import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "License terms" };

export default function LicensePage() {
	return (
		<LegalPage title="License terms">
			<p>Unless a product says otherwise, purchases include a personal and small-business use license for the buyer. You may customize resources for your own work or normal client delivery.</p>
			<p>You may not resell, redistribute, share public download links, upload purchased files to marketplaces, or claim the raw product as your own.</p>
			<p>Some products may include more specific license terms. Product-specific terms override this starter license summary.</p>
		</LegalPage>
	);
}
