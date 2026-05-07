import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/config/site";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Resources",
	description: "Guides for buying, using, and creating practical digital products.",
};

export default function BlogPage() {
	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<h1 className="text-4xl font-black text-[#17211B] sm:text-5xl">Resources for faster digital growth.</h1>
				<p className="mt-4 max-w-2xl text-[#66736B]">Short, practical reads for buyers and creators.</p>
				<div className="mt-8 grid gap-5 lg:grid-cols-3">
					{blogPosts.map((post) => (
						<Link key={post.slug} href={`/blog/${post.slug}`}>
							<Card className="h-full p-6 transition hover:-translate-y-1">
								<p className="text-sm font-black text-[#38C172]">{post.category}</p>
								<h2 className="mt-3 text-2xl font-black leading-tight text-[#17211B]">{post.title}</h2>
								<p className="mt-3 text-sm leading-6 text-[#66736B]">{post.description}</p>
								<p className="mt-5 text-xs font-black text-[#66736B]">{post.readTime}</p>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
