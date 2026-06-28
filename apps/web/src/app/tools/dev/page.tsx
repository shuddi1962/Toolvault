"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Code, FileJson, Key, Hash, Lock, Link2, Minus, FileCode, BookOpen } from "lucide-react";

const devTools = [
  { name: "JSON Formatter", href: "/tools/dev/json-formatter", icon: FileJson, color: "text-yellow-600", bg: "bg-yellow-50", description: "Format & validate JSON" },
  { name: "Base64 Encoder", href: "/tools/dev/base64", icon: Key, color: "text-blue-600", bg: "bg-blue-50", description: "Encode/decode Base64" },
  { name: "URL Encoder", href: "/tools/dev/url-encoder", icon: Link2, color: "text-green-600", bg: "bg-green-50", description: "Encode/decode URLs" },
  { name: "Regex Tester", href: "/tools/dev/regex", icon: Code, color: "text-purple-600", bg: "bg-purple-50", description: "Test regular expressions" },
  { name: "Password Generator", href: "/tools/dev/password", icon: Lock, color: "text-red-600", bg: "bg-red-50", description: "Generate secure passwords" },
  { name: "Hash Generator", href: "/tools/dev/hash", icon: Hash, color: "text-indigo-600", bg: "bg-indigo-50", description: "SHA-256, MD5 hashes" },
  { name: "Diff Checker", href: "/tools/dev/diff", icon: Minus, color: "text-cyan-600", bg: "bg-cyan-50", description: "Compare text differences" },
  { name: "Markdown Preview", href: "/tools/dev/markdown", icon: BookOpen, color: "text-pink-600", bg: "bg-pink-50", description: "Preview markdown" },
  { name: "HTML Minifier", href: "/tools/dev/minifier", icon: FileCode, color: "text-gray-600", bg: "bg-gray-50", description: "Minify HTML/CSS/JS" },
];

export default function DevToolsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Tools</h1>
          <p className="text-gray-600">Essential utilities for developers. All run client-side.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {devTools.map((tool) => (
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
