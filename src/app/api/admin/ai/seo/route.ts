import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/db/client";
import { aiAgentRuns, auditLogs } from "@/db/schema";
import { draftSeo } from "@/lib/ai/admin-agents";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
	title: z.string().min(2).max(160).optional(),
	pageType: z.string().max(80).optional(),
});

async function readPayload(request: Request) {
	const contentType = request.headers.get("content-type") || "";
	if (contentType.includes("application/json")) return request.json();
	const formData = await request.formData();
	return Object.fromEntries(formData.entries());
}

export async function POST(request: Request) {
	const user = await requireAdmin();
	const parsed = requestSchema.safeParse(await readPayload(request));
	if (!parsed.success) return NextResponse.json({ error: "Invalid SEO request." }, { status: 400 });

	const output = draftSeo(parsed.data);
	const runId = `agent_${nanoid(14)}`;

	await db.insert(aiAgentRuns).values({
		id: runId,
		agentName: "SEO Agent",
		triggeredByUserId: user.id,
		status: "completed",
		input: parsed.data,
		output,
		completedAt: new Date(),
	});

	await db.insert(auditLogs).values({
		id: `audit_${nanoid(12)}`,
		actorUserId: user.id,
		action: "ai_seo_metadata_drafted",
		entityType: "ai_agent_run",
		entityId: runId,
		metadata: { approvalRequiredFor: ["publishing", "bulk page edits"] },
	});

	return NextResponse.json({ runId, output, approvalRequired: true });
}
