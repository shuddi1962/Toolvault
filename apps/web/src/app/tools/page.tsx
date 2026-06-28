"use client";

import Link from "next/link";
import {
  FileText,
  Image,
  Video,
  Music,
  Code,
  Calculator,
  Search,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Input } from "@toolvault/ui";

const modules = [
  {
    name: "PDF Suite",
    href: "/tools/pdf",
    icon: FileText,
    color: "text-red-600",
    bg: "bg-red-50",
    tools: ["Merge", "Split", "Compress", "OCR", "Protect", "Watermark"],
  },
  {
    name: "File Conversion",
    href: "/tools/convert",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
    tools: ["Word→PDF", "PDF→Word", "Excel→PDF", "Image Convert"],
  },
  {
    name: "AI Document Editor",
    href: "/tools/edit",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
    tools: ["Receipt", "Invoice", "Document", "Email"],
  },
  {
    name: "Image Tools",
    href: "/tools/image",
    icon: Image,
    color: "text-green-600",
    bg: "bg-green-50",
    tools: ["Upscale", "BG Remove", "Compress", "QR Code", "Watermark"],
  },
  {
    name: "AI Content Tools",
    href: "/tools/ai",
    icon: FileText,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    tools: ["Article", "Email", "Meta", "Grammar", "Rewriter"],
  },
  {
    name: "SEO Tools",
    href: "/tools/seo",
    icon: Search,
    color: "text-orange-600",
    bg: "bg-orange-50",
    tools: ["PageSpeed", "Backlinks", "Domain Age", "Meta Tags"],
  },
  {
    name: "Developer Tools",
    href: "/tools/dev",
    icon: Code,
    color: "text-gray-600",
    bg: "bg-gray-50",
    tools: ["JSON", "Base64", "Regex", "Hash", "Diff"],
  },
  {
    name: "Utility Calculators",
    href: "/tools/calc",
    icon: Calculator,
    color: "text-teal-600",
    bg: "bg-teal-50",
    tools: ["BMI", "EMI", "GST", "Currency", "Age"],
  },
  {
    name: "Music Hub",
    href: "/music",
    icon: Music,
    color: "text-pink-600",
    bg: "bg-pink-50",
    tools: ["Trending", "Search", "Lyrics", "Vocal Remover"],
  },
  {
    name: "Video Hub",
    href: "/videos",
    icon: Video,
    color: "text-red-500",
    bg: "bg-red-50",
    tools: ["Trending", "Movies", "Download", "Player"],
  },
  {
    name: "Audio Editor",
    href: "/tools/audio",
    icon: Music,
    color: "text-violet-600",
    bg: "bg-violet-50",
    tools: ["Trim", "Merge", "Convert", "Speed", "Volume"],
  },
  {
    name: "Video Editor",
    href: "/tools/video",
    icon: Video,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    tools: ["Trim", "Merge", "Subtitles", "GIF Maker"],
  },
  {
    name: "eSign",
    href: "/tools/sign",
    icon: FileText,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    tools: ["Draw", "Type", "Upload", "Send"],
  },
  {
    name: "Legal Documents",
    href: "/legal-generator",
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
    tools: ["Privacy Policy", "Terms", "Cookie Policy", "EULA"],
  },
  {
    name: "Video Downloader",
    href: "/tools/video/downloader",
    icon: Video,
    color: "text-rose-600",
    bg: "bg-rose-50",
    tools: ["YouTube", "TikTok", "Instagram", "Twitter"],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ToolVault Pro
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Tools
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            15 powerful modules with 100+ tools. Everything you need in one place.
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search tools..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link key={module.name} href={module.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.bg}`}>
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    Explore tools
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
