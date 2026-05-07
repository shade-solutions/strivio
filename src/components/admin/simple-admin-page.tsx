import { AdminShell } from "@/components/admin/admin-shell";
import { Card } from "@/components/ui/card";

export function SimpleAdminPage({
	title,
	description,
	items,
}: {
	title: string;
	description: string;
	items: string[];
}) {
	return (
		<AdminShell>
			<h1 className="text-4xl font-black text-[#17211B]">{title}</h1>
			<p className="mt-2 max-w-2xl text-[#66736B]">{description}</p>
			<div className="mt-6 grid gap-4 lg:grid-cols-2">
				{items.map((item) => (
					<Card key={item} className="p-5">
						<p className="font-black text-[#17211B]">{item}</p>
					</Card>
				))}
			</div>
		</AdminShell>
	);
}
