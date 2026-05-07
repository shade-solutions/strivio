import { nanoid } from "nanoid";
import { db } from "@/db/client";
import { analyticsEvents } from "@/db/schema";

export async function trackServerEvent(eventName: string, properties: Record<string, unknown> = {}, userId?: string | null) {
	try {
		await db.insert(analyticsEvents).values({
			id: `evt_${nanoid(12)}`,
			userId: userId ?? null,
			eventName,
			properties,
		});
	} catch (error) {
		console.error("analytics_event_failed", error);
	}
}
