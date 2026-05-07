import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { stackServerApp } from "@/stack/server";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: "Strivio | Digital products that help you move faster",
		template: "%s | Strivio",
	},
	description: siteConfig.description,
	openGraph: {
		title: "Strivio",
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: "Strivio",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<StackProvider app={stackServerApp}>
					<StackTheme>
						<SiteHeader />
						{children}
						<SiteFooter />
					</StackTheme>
				</StackProvider>
			</body>
		</html>
	);
}
