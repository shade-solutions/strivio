import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductEditor } from "@/components/forms/product-editor";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New product" };

export default async function NewProductPage() {
	await requireAdmin();
	return (
		<AdminShell>
			<h1 className="mb-6 text-4xl font-black text-[#17211B]">New product</h1>
			<ProductEditor />
		</AdminShell>
	);
}
