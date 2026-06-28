import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToolVault Pro - Your Complete Digital Toolkit",
  description:
    "All-in-one SaaS platform with 15 modules: PDF tools, file conversion, AI editing, eSign, image tools, SEO tools, developer utilities, and more.",
  keywords: [
    "PDF tools",
    "file conversion",
    "AI tools",
    "image editor",
    "SEO tools",
    "developer utilities",
    "SaaS platform",
  ],
  openGraph: {
    title: "ToolVault Pro - Your Complete Digital Toolkit",
    description:
      "All-in-one SaaS platform with 15 modules. Replace 5-10 separate tools with one subscription.",
    url: "https://toolvaultpro.com",
    siteName: "ToolVault Pro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolVault Pro - Your Complete Digital Toolkit",
    description:
      "All-in-one SaaS platform with 15 modules. Replace 5-10 separate tools with one subscription.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
