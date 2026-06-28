"use client";

import Link from "next/link";
import { Card, CardContent, Badge, Input } from "@toolvault/ui";
import { 
  FileText, Image, Video, Music, Code, Calculator, Search, ArrowRight,
  Globe, Edit3, PenTool, Film, Headphones, Scissors
} from "lucide-react";

const modules = [
  { name: "PDF Suite", href: "/tools/pdf", icon: FileText, color: "text-red-600", bg: "bg-red-50", tools: ["Merge", "Split", "Compress", "OCR", "Protect"] },
  { name: "File Conversion", href: "/tools/convert", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", tools: ["Word↔PDF", "Excel↔PDF", "Images"] },
  { name: "AI Document Editor", href: "/tools/edit", icon: Edit3, color: "text-purple-600", bg: "bg-purple-50", tools: ["Receipt", "Invoice", "Document"] },
  { name: "Image Tools", href: "/tools/image", icon: Image, color: "text-green-600", bg: "bg-green-50", tools: ["Upscale", "BG Remove", "QR Code"] },
  { name: "AI Content Tools", href: "/tools/ai", icon: Code, color: "text-indigo-600", bg: "bg-indigo-50", tools: ["Article", "Email", "Grammar"] },
  { name: "SEO Tools", href: "/tools/seo", icon: Globe, color: "text-orange-600", bg: "bg-orange-50", tools: ["PageSpeed", "Backlinks", "Meta"] },
  { name: "Developer Tools", href: "/tools/dev", icon: Code, color: "text-gray-600", bg: "bg-gray-50", tools: ["JSON", "Base64", "Regex", "Hash"] },
  { name: "Calculators", href: "/tools/calc", icon: Calculator, color: "text-teal-600", bg: "bg-teal-50", tools: ["BMI", "EMI", "GST", "Currency"] },
  { name: "eSign Documents", href: "/tools/sign", icon: PenTool, color: "text-emerald-600", bg: "bg-emerald-50", tools: ["Draw", "Type", "Upload"] },
  { name: "Music Hub", href: "/music", icon: Music, color: "text-pink-600", bg: "bg-pink-50", tools: ["Trending", "Search", "Lyrics"] },
  { name: "Video Hub", href: "/videos", icon: Video, color: "text-red-500", bg: "bg-red-50", tools: ["Trending", "Movies", "Download"] },
  { name: "Audio Editor", href: "/tools/audio", icon: Headphones, color: "text-violet-600", bg: "bg-violet-50", tools: ["Trim", "Merge", "Convert"] },
  { name: "Video Editor", href: "/tools/video", icon: Film, color: "text-cyan-600", bg: "bg-cyan-50", tools: ["Trim", "Merge", "Subtitles"] },
  { name: "Legal Documents", href: "/legal-generator", icon: FileText, color: "text-amber-600", bg: "bg-amber-50", tools: ["Privacy Policy", "Terms"] },
  { name: "Video Downloader", href: "/videos/downloader", icon: Scissors, color: "text-rose-600", bg: "bg-rose-50", tools: ["YouTube", "TikTok", "Instagram"] },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link>
              <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-700">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Tools</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">15 powerful modules with 100+ tools. Everything you need in one place.</p>
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search tools..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Link key={module.name} href={module.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${module.bg}`}>
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold">{module.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {module.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    Explore tools <ArrowRight className="h-4 w-4 ml-1" />
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
