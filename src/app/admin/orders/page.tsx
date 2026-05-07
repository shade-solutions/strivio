import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin orders" };

export default async function AdminOrdersPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Orders and payments" description="Track pending, paid, failed, refunded, partially refunded, and cancelled Dodo orders." items={["Payment status", "Failed payments", "Refund review", "Webhook-confirmed access grants"]} />;
}
