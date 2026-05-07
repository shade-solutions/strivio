import { describe, expect, it } from "vitest";
import { formatMoney, slugify, toSearchText } from "@/lib/utils";

describe("utils", () => {
	it("formats cent-based prices", () => {
		expect(formatMoney(1900)).toBe("$19");
	});

	it("creates stable slugs", () => {
		expect(slugify("AI Prompt Pack: Creator Edition!")).toBe("ai-prompt-pack-creator-edition");
	});

	it("normalizes search text", () => {
		expect(toSearchText("  Quick   Win\nTemplate  ")).toBe("quick win template");
	});
});
