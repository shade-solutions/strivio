import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

export async function getCurrentUser() {
	return stackServerApp.getUser();
}

export async function requireUser() {
	return stackServerApp.getUser({ or: "redirect" });
}

export async function requireAdmin() {
	const user = await stackServerApp.getUser({ or: "redirect" });
	const adminEmails = (process.env.ADMIN_EMAILS ?? "")
		.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
	const emailAllowed = user.primaryEmail ? adminEmails.includes(user.primaryEmail.toLowerCase()) : false;
	const stackPermission = await getStackProjectPermission(user, "access_admin_dashboard");

	if (!emailAllowed && !stackPermission) {
		redirect("/account/library");
	}

	return user;
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
