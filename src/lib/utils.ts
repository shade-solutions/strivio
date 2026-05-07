import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatMoney(cents: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
	}).format(cents / 100);
}

export function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/['"]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function absoluteUrl(path = "/") {
	const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://strivio.world";
	return new URL(path, base).toString();
}

export function toSearchText(value: string) {
	return value.toLowerCase().replace(/\s+/g, " ").trim();
}
