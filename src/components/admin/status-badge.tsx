import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
	const variant = status.includes("paid") || status.includes("published") || status.includes("active") ? "green" : status.includes("failed") || status.includes("rejected") ? "coral" : "neutral";
	return <Badge variant={variant}>{status}</Badge>;
}
