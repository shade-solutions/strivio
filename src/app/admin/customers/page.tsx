import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin customers" };

export default async function AdminCustomersPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Customers" description="View buyer profiles, purchase history, support context, and access status." items={["Customer profiles", "Purchase history", "Library access", "Support context"]} />;
}
