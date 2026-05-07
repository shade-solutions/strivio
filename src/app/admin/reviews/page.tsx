import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin reviews" };

export default async function AdminReviewsPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Review moderation" description="Approve verified-purchase reviews without fake ratings or misleading social proof." items={["Pending reviews", "Approved reviews", "Rejected reviews", "Verified purchase checks"]} />;
}
