import { Card } from "@/components/ui/card";

export function AdminMetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
	return (
		<Card className="p-5">
			<p className="text-sm font-bold text-[#66736B]">{label}</p>
			<p className="mt-2 text-3xl font-black text-[#17211B]">{value}</p>
			<p className="mt-2 text-xs font-bold text-[#38C172]">{detail}</p>
		</Card>
	);
}
