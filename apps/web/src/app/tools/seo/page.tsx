"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Loader2, Globe, ExternalLink } from "lucide-react";

const seoTools = [
  { name: "Page Speed", href: "/tools/seo/pagespeed", icon: "⚡", description: "Test website performance" },
  { name: "Domain Authority", href: "/tools/seo/domain-authority", icon: "📊", description: "Check DA/PA score" },
  { name: "Backlink Checker", href: "/tools/seo/backlinks", icon: "🔗", description: "Analyze backlinks" },
  { name: "Meta Tag Analyzer", href: "/tools/seo/meta-analyzer", icon: "🏷️", description: "Analyze meta tags" },
  { name: "Keyword Density", href: "/tools/seo/keyword-density", icon: "📝", description: "Count keyword frequency" },
  { name: "XML Sitemap Generator", href: "/tools/seo/sitemap", icon: "🗺️", description: "Generate XML sitemap" },
];

export default function SEOToolsPage() {
  const [url, setUrl] = useState("");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
            <div className="flex items-center gap-4"><Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link></div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">SEO Tools</h1>
          </div>
          <p className="text-gray-600">Analyze and optimize your website for search engines.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {seoTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-gray-500">{tool.description}</p>
                    </div>
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
