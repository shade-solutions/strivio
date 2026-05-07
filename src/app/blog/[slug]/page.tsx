import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/config/site";
import { Card } from "@/components/ui/card";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = blogPosts.find((item) => item.slug === slug);
	if (!post) return {};
	return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = blogPosts.find((item) => item.slug === slug);
	if (!post) notFound();

	return (
		<main className="bg-[#FAFAF7] px-4 py-10 sm:px-6 lg:px-8">
			<article className="mx-auto max-w-3xl">
				<p className="text-sm font-black uppercase tracking-[0.08em] text-[#38C172]">{post.category}</p>
				<h1 className="mt-3 text-4xl font-black leading-tight text-[#17211B] sm:text-5xl">{post.title}</h1>
				<p className="mt-4 text-lg leading-8 text-[#66736B]">{post.description}</p>
				<Card className="mt-8 p-7">
					<div className="space-y-5 text-base leading-8 text-[#66736B]">
						<p>
							Strivio resources are designed around clear outcomes: know what you are buying, use it quickly, and avoid paying for vague promises.
						</p>
						<p>
							When choosing a digital product, check the preview, format, compatibility, license, support path, and refund summary. A good product should help you skip the blank page without hiding the details.
						</p>
						<p>
							Start small. Pick one resource that helps you launch, organize, learn, or create faster today.
						</p>
					</div>
				</Card>
			</article>
		</main>
	);
}
