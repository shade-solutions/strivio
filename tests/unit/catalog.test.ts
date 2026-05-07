import { describe, expect, it } from "vitest";
import { products } from "@/data/catalog";
import { filterProducts, getProductBySlug } from "@/lib/catalog";

describe("catalog", () => {
	it("ships with 30 seeded marketplace products", () => {
		expect(products).toHaveLength(30);
	});

	it("finds products by slug", () => {
		const product = getProductBySlug("startup-launch-sprint-kit");
		expect(product?.title).toBe("Startup Launch Sprint Kit");
	});

	it("filters by goal and category", () => {
		const result = filterProducts({ goal: "start-a-business", category: "startup-kits" });
		expect(result.some((product) => product.slug === "startup-launch-sprint-kit")).toBe(true);
	});
});
