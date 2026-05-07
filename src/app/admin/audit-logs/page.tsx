import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Audit logs" };

export default async function AdminAuditLogsPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Audit logs" description="Admin and agent actions are logged with actor, action, entity, metadata, and timestamp." items={["Product published", "Price updated", "Access revoked", "AI draft generated"]} />;
}
