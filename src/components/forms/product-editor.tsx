import { categories, goals } from "@/data/catalog";
import type { Product } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";

export function ProductEditor({ product }: { product?: Product }) {
	return (
		<Card className="p-6">
			<form action="/api/admin/products" method="post" className="grid gap-5">
				<input type="hidden" name="id" value={product?.id ?? ""} />
				<div className="grid gap-4 lg:grid-cols-2">
					<Field label="Title" name="title" defaultValue={product?.title} />
					<Field label="Slug" name="slug" defaultValue={product?.slug} />
				</div>
				<Field label="Subtitle" name="subtitle" defaultValue={product?.subtitle} />
				<div>
					<label className="text-sm font-black text-[#17211B]" htmlFor="description">Description</label>
					<Textarea id="description" name="description" defaultValue={product?.description} />
				</div>
				<div className="grid gap-4 lg:grid-cols-3">
					<Field label="Price in cents" name="price" type="number" defaultValue={String(product?.price ?? 1900)} />
					<Field label="Compare-at price" name="compareAtPrice" type="number" defaultValue={String(product?.compareAtPrice ?? "")} />
					<Field label="Product type" name="productType" defaultValue={product?.productType ?? "Template"} />
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					<div>
						<label className="text-sm font-black text-[#17211B]" htmlFor="category">Category</label>
						<select id="category" name="categorySlug" defaultValue={product?.categorySlug} className="h-12 w-full rounded-2xl border-2 border-[#E5E7E2] bg-white px-4 text-sm font-semibold">
							{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
						</select>
					</div>
					<div>
						<label className="text-sm font-black text-[#17211B]" htmlFor="goals">Goals</label>
						<select id="goals" name="goalSlugs" multiple defaultValue={product?.goalSlugs} className="min-h-28 w-full rounded-2xl border-2 border-[#E5E7E2] bg-white px-4 py-3 text-sm font-semibold">
							{goals.map((goal) => <option key={goal.slug} value={goal.slug}>{goal.name}</option>)}
						</select>
					</div>
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					<Field label="What is included" name="whatIncluded" defaultValue={product?.whatIncluded.join("\n")} />
					<Field label="FAQ" name="faq" defaultValue={product?.faq.map((item) => `${item.question}: ${item.answer}`).join("\n")} />
				</div>
				<div className="rounded-3xl border-2 border-dashed border-[#DDE4DC] bg-[#FAFAF7] p-6">
					<p className="font-black text-[#17211B]">FileUploadBox placeholder</p>
					<p className="mt-2 text-sm leading-6 text-[#66736B]">Use Dodo digital delivery where possible. Add R2 asset metadata for custom file delivery.</p>
				</div>
				<Button type="submit">Save product draft</Button>
			</form>
		</Card>
	);
}

function Field({ label, name, type = "text", defaultValue }: { label: string; name: string; type?: string; defaultValue?: string }) {
	return (
		<div>
			<label className="text-sm font-black text-[#17211B]" htmlFor={name}>{label}</label>
			<Input id={name} name={name} type={type} defaultValue={defaultValue} />
		</div>
	);
}
