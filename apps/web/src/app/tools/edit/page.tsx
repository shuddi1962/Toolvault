"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, FileText, Receipt, Building2, Mail, Edit3 } from "lucide-react";

const editTools = [
  { name: "Receipt Editor", href: "/tools/edit/receipt", icon: Receipt, color: "text-green-600", bg: "bg-green-50", description: "Edit receipt details" },
  { name: "Invoice Editor", href: "/tools/edit/invoice", icon: Building2, color: "text-blue-600", bg: "bg-blue-50", description: "Edit invoices" },
  { name: "Document Editor", href: "/tools/edit/document", icon: FileText, color: "text-purple-600", bg: "bg-purple-50", description: "Edit any document" },
  { name: "Email Editor", href: "/tools/edit/email", icon: Mail, color: "text-orange-600", bg: "bg-orange-50", description: "Edit email templates" },
];

export default function DocEditorPage() {
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
            <Edit3 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Document Editor</h1>
          </div>
          <p className="text-gray-600">Upload documents and edit them with AI assistance.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {editTools.map((tool) => (
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
