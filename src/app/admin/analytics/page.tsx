import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin analytics" };

export default async function AdminAnalyticsPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Analytics" description="PostHog-ready metrics for views, searches, checkout starts, completions, downloads, refunds, and low-conversion products." items={["Revenue overview", "Conversion rate", "Search terms", "Low conversion products"]} />;
}
