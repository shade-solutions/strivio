import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { categories, goals } from "@/data/catalog";
import { SimpleAdminPage } from "@/components/admin/simple-admin-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin categories" };

export default async function AdminCategoriesPage() {
	await requireAdmin();
	return <SimpleAdminPage title="Categories and goals" description="Manage category and goal landing pages for SEO and discovery." items={[`${categories.length} categories`, `${goals.length} goals`, "Goal-based browsing", "Category SEO metadata"]} />;
}
