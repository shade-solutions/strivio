import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/db/client";
import { supportTickets } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { trackServerEvent } from "@/lib/analytics/events";

export const dynamic = "force-dynamic";

const supportSchema = z.object({
	email: z.string().email(),
	subject: z.string().min(3).max(160),
	message: z.string().min(10).max(4000),
});

export async function POST(request: Request) {
	const formData = await request.formData();
	const parsed = supportSchema.safeParse(Object.fromEntries(formData.entries()));
	if (!parsed.success) return NextResponse.json({ error: "Please include a valid email, subject, and message." }, { status: 400 });

	const user = await stackServerApp.getUser();
	const ticketId = `ticket_${nanoid(12)}`;
	await db.insert(supportTickets).values({
		id: ticketId,
		userId: user?.id ?? null,
		subject: parsed.data.subject,
		message: `From ${parsed.data.email}\n\n${parsed.data.message}`,
		status: "open",
		priority: "normal",
	});
	await trackServerEvent("support_ticket_created", { ticketId, subject: parsed.data.subject }, user?.id);

	const accept = request.headers.get("accept") ?? "";
	if (accept.includes("text/html")) return NextResponse.redirect(new URL("/support?sent=1", request.url));
	return NextResponse.json({ ok: true, ticketId });
}
