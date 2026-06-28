"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Sparkles, Mail, Tag, SpellCheck, RefreshCw, FileText, Languages } from "lucide-react";

const aiTools = [
  { name: "Article Generator", href: "/tools/ai/article", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50", description: "Generate SEO articles" },
  { name: "Email Writer", href: "/tools/ai/email", icon: Mail, color: "text-blue-600", bg: "bg-blue-50", description: "Write professional emails" },
  { name: "Meta Tag Generator", href: "/tools/ai/meta", icon: Tag, color: "text-orange-600", bg: "bg-orange-50", description: "SEO meta titles & descriptions" },
  { name: "Grammar Checker", href: "/tools/ai/grammar", icon: SpellCheck, color: "text-green-600", bg: "bg-green-50", description: "Fix grammar & spelling" },
  { name: "AI Rewriter", href: "/tools/ai/rewriter", icon: RefreshCw, color: "text-cyan-600", bg: "bg-cyan-50", description: "Rewrite text naturally" },
  { name: "Summarizer", href: "/tools/ai/summarize", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50", description: "Summarize long text" },
  { name: "Translator", href: "/tools/ai/translate", icon: Languages, color: "text-pink-600", bg: "bg-pink-50", description: "Translate to any language" },
];

export default function AIToolsPage() {
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
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tools
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Content Tools</h1>
          <p className="text-gray-600">Generate, rewrite, and improve content with AI.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${tool.bg}`}><tool.icon className={`h-6 w-6 ${tool.color}`} /></div>
                    <div><h3 className="font-semibold">{tool.name}</h3><p className="text-sm text-gray-500">{tool.description}</p></div>
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
