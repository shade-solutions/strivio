import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin coupons" };

export default async function AdminCouponsPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Coupons" description="Create percent or fixed discounts with redemption limits and validity windows." items={["Percent discounts", "Fixed discounts", "Redemption limits", "Audit logged changes"]} />;
}
