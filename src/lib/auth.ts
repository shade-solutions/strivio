import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import type { CurrentServerUser } from "@stackframe/stack";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { stackServerApp } from "@/stack/server";

export async function getCurrentUser() {
	return stackServerApp.getUser();
}

export async function requireUser() {
	return stackServerApp.getUser({ or: "redirect" });
}

export async function requireAdmin() {
	const user = await stackServerApp.getUser({ or: "redirect" });
	const localUser = await syncStackUser(user);
	const adminEmails = (process.env.ADMIN_EMAILS ?? "")
		.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
	const emailAllowed = user.primaryEmail ? adminEmails.includes(user.primaryEmail.toLowerCase()) : false;
	const stackPermission = await getStackProjectPermission(user, "access_admin_dashboard");

	if (!emailAllowed && !stackPermission && localUser?.role !== "admin") {
		redirect("/account/library");
	}

	return user;
}

export async function syncStackUser(user: CurrentServerUser | null) {
	if (!user?.primaryEmail) return null;
	const existing = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
	const values = {
		id: user.id,
		stackUserId: user.id,
		email: user.primaryEmail,
		name: user.displayName,
		image: user.profileImageUrl,
		authProvider: "stack",
	};

	if (existing[0]) {
		const [updated] = await db
			.update(users)
			.set({ ...values, updatedAt: new Date() })
			.where(eq(users.id, user.id))
			.returning();
		return updated;
	}

	const [created] = await db.insert(users).values(values).returning();
	return created;
}

async function getStackProjectPermission(user: unknown, permission: string) {
	try {
		const maybeUser = user as { getPermission?: (permission: string) => Promise<unknown> };
		const result = await maybeUser.getPermission?.(permission);
		return Boolean(result);
	} catch {
		return false;
	}
}
