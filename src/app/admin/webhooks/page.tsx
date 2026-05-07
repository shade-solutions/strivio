import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Webhook events" };

export default async function AdminWebhooksPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Webhook events" description="Every Dodo webhook is stored for idempotency, auditing, replay investigation, and operational safety." items={["payment.succeeded", "payment.failed", "refund.succeeded", "subscription.active"]} />;
}
