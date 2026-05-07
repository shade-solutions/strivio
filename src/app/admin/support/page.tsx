import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin support" };

export default async function AdminSupportPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Support tickets" description="Handle access issues, broken files, refund questions, and product guidance." items={["Open tickets", "Refund context", "Draft replies", "Assigned support queue"]} />;
}
