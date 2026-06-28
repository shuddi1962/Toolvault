"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, FileText, FileSpreadsheet, Image, ArrowRight } from "lucide-react";

const conversions = [
  { name: "Word to PDF", href: "/tools/convert/word-to-pdf", icon: FileText, from: "DOCX", to: "PDF", color: "text-blue-600" },
  { name: "PDF to Word", href: "/tools/convert/pdf-to-word", icon: FileText, from: "PDF", to: "DOCX", color: "text-red-600" },
  { name: "Excel to PDF", href: "/tools/convert/excel-to-pdf", icon: FileSpreadsheet, from: "XLSX", to: "PDF", color: "text-green-600" },
  { name: "PDF to Excel", href: "/tools/convert/pdf-to-excel", icon: FileSpreadsheet, from: "PDF", to: "XLSX", color: "text-orange-600" },
  { name: "Image Converter", href: "/tools/convert/image-converter", icon: Image, from: "ANY", to: "ANY", color: "text-purple-600" },
];

export default function ConvertToolsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Conversion</h1>
          <p className="text-gray-600">Convert between different file formats instantly.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {conversions.map((conv) => (
            <Link key={conv.name} href={conv.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <conv.icon className={`h-8 w-8 ${conv.color}`} />
                      <div>
                        <h3 className="font-semibold">{conv.name}</h3>
                        <p className="text-sm text-gray-500">{conv.from} → {conv.to}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
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
