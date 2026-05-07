"use client";

import Link from "next/link";
import { UserButton, useUser } from "@stackframe/stack";
import { ButtonLink } from "@/components/ui/button";

export function UserMenu() {
	const user = useUser();

	if (!user) {
		return (
			<div className="flex items-center gap-2">
				<Link href="/login" className="hidden text-sm font-extrabold text-[#17211B] hover:text-[#0F3D2E] sm:inline">
					Log in
				</Link>
				<ButtonLink href="/signup" size="sm">
					Sign up
				</ButtonLink>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-3">
			<Link href="/account/library" className="hidden text-sm font-extrabold text-[#17211B] hover:text-[#0F3D2E] sm:inline">
				My library
			</Link>
			<UserButton />
		</div>
	);
}
