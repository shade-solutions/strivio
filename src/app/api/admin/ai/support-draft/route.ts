import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/db/client";
import { aiAgentRuns, auditLogs } from "@/db/schema";
import { draftSupportReply } from "@/lib/ai/admin-agents";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
	subject: z.string().min(2).max(180).optional(),
	message: z.string().min(2).max(6000).optional(),
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
	if (!parsed.success) return NextResponse.json({ error: "Invalid support draft request." }, { status: 400 });

	const output = draftSupportReply(parsed.data);
	const runId = `agent_${nanoid(14)}`;

	await db.insert(aiAgentRuns).values({
		id: runId,
		agentName: "Support Agent",
		triggeredByUserId: user.id,
		status: "completed",
		input: parsed.data,
		output,
		completedAt: new Date(),
	});

	await db.insert(auditLogs).values({
		id: `audit_${nanoid(12)}`,
		actorUserId: user.id,
		action: "ai_support_reply_drafted",
		entityType: "ai_agent_run",
		entityId: runId,
		metadata: { approvalRequiredFor: ["sending replies", "refunds", "access revocation"] },
	});

	return NextResponse.json({ runId, output, approvalRequired: true });
}
