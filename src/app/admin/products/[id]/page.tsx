import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/catalog";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductEditor } from "@/components/forms/product-editor";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit product" };

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {
	await requireAdmin();
	const { id } = await params;
	const product = products.find((item) => item.id === id);
	if (!product) notFound();
	return (
		<AdminShell>
			<h1 className="mb-6 text-4xl font-black text-[#17211B]">Edit product</h1>
			<ProductEditor product={product} />
		</AdminShell>
	);
}
