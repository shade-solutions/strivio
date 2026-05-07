import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Log in",
	description: "Log in to access your Strivio library, orders, and downloads.",
};

export default function LoginPage() {
	redirect("/handler/sign-in");
}
