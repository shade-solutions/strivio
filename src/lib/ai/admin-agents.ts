export const aiAgentCatalog = {
	productCopy: {
		agentName: "Product Listing Agent",
		humanApprovalRequiredFor: ["publishing", "price changes", "deletion"],
	},
	seo: {
		agentName: "SEO Agent",
		humanApprovalRequiredFor: ["publishing", "bulk page edits"],
	},
	supportDraft: {
		agentName: "Support Agent",
		humanApprovalRequiredFor: ["sending replies", "refunds", "access revocation"],
	},
};

export function draftProductCopy(input: { title?: string; description?: string }) {
	const title = input.title?.trim() || "Practical Digital Resource";
	return {
		title,
		subtitle: "A ready-to-use resource built to save time and create a clear first win.",
		description: `${title} helps buyers skip the blank page with practical steps, templates, and examples. Built for people who want progress, not complexity.`,
		whatIncluded: ["Main resource files", "Quick-start instructions", "Examples and setup tips", "License notes"],
		faq: [
			{ question: "How do I get access?", answer: "Access appears in your Strivio library after verified checkout." },
			{ question: "Who is it for?", answer: "Beginners and action takers who want a clear starting point." },
		],
		seoTitle: `${title} | Strivio`,
		seoDescription: "Ready-to-use digital product for faster progress.",
		categorySuggestion: "Templates",
		goalSuggestions: ["Improve productivity", "Build online"],
	};
}

export function draftSeo(input: { title?: string; pageType?: string }) {
	const title = input.title || "Strivio resource";
	return {
		seoTitle: `${title} | Ready-to-use digital product`,
		metaDescription: "Buy smarter, download instantly, and grow faster with a practical Strivio resource.",
		keywords: ["digital product", "template", "instant download", "productivity"],
		internalLinks: ["/explore", "/collections/quick-wins", "/refund-policy"],
		structuredDataSuggestions: ["Product", "BreadcrumbList"],
	};
}

export function draftSupportReply(input: { subject?: string; message?: string }) {
	return {
		subject: `Re: ${input.subject || "Your Strivio support request"}`,
		body: "Thanks for reaching out. I’m checking the order and access details now. If a file is broken, misleading, inaccessible, or not as described, we’ll make it right.",
		approvalRequired: true,
	};
}
