import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Sign up",
	description: "Create a Strivio account to access digital products instantly after purchase confirmation.",
};

export default function SignupPage() {
	redirect("/handler/sign-up");
}
