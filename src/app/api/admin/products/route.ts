import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/db/client";
import { aiAgentRuns, auditLogs } from "@/db/schema";

export const dynamic = "force-dynamic";

const productDraftSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(2),
	slug: z.string().min(2),
	subtitle: z.string().optional(),
	price: z.coerce.number().int().positive(),
});

export async function POST(request: Request) {
	const user = await requireAdmin();
	const formData = await request.formData();
	const parsed = productDraftSchema.safeParse(Object.fromEntries(formData.entries()));
	if (!parsed.success) return NextResponse.json({ error: "Invalid product draft." }, { status: 400 });

	await db.insert(auditLogs).values({
		id: `audit_${nanoid(12)}`,
		actorUserId: user.id,
		action: parsed.data.id ? "product_draft_updated" : "product_draft_created",
		entityType: "product",
		entityId: parsed.data.id || parsed.data.slug,
		metadata: parsed.data,
	});

	return NextResponse.json({ ok: true, draft: parsed.data });
}

export async function GET() {
	await requireAdmin();
	const runs = await db.select().from(aiAgentRuns).limit(20);
	return NextResponse.json({ recentAgentRuns: runs });
}
