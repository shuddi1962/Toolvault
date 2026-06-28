"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@toolvault/ui";
import { 
  ArrowLeft, 
  Merge, 
  Scissors, 
  FileDown, 
  RotateCw, 
  Lock, 
  Droplets, 
  ScanText,
  FileText,
  Plus
} from "lucide-react";

const pdfTools = [
  {
    name: "Merge PDF",
    href: "/tools/pdf/merge",
    icon: Merge,
    color: "text-red-600",
    bg: "bg-red-50",
    description: "Combine multiple PDF files into one",
  },
  {
    name: "Split PDF",
    href: "/tools/pdf/split",
    icon: Scissors,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description: "Extract pages from a PDF file",
  },
  {
    name: "Compress PDF",
    href: "/tools/pdf/compress",
    icon: FileDown,
    color: "text-green-600",
    bg: "bg-green-50",
    description: "Reduce PDF file size",
  },
  {
    name: "Rotate PDF",
    href: "/tools/pdf/rotate",
    icon: RotateCw,
    color: "text-purple-600",
    bg: "bg-purple-50",
    description: "Rotate all pages in a PDF",
  },
  {
    name: "Protect PDF",
    href: "/tools/pdf/protect",
    icon: Lock,
    color: "text-orange-600",
    bg: "bg-orange-50",
    description: "Add password protection to PDF",
  },
  {
    name: "Add Watermark",
    href: "/tools/pdf/watermark",
    icon: Droplets,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    description: "Add text watermark to PDF pages",
  },
  {
    name: "OCR PDF",
    href: "/tools/pdf/ocr",
    icon: ScanText,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    description: "Extract text from scanned PDFs",
  },
  {
    name: "Add Page Numbers",
    href: "/tools/pdf/page-numbers",
    icon: Plus,
    color: "text-pink-600",
    bg: "bg-pink-50",
    description: "Add page numbers to PDF",
  },
  {
    name: "Flatten PDF",
    href: "/tools/pdf/flatten",
    icon: FileText,
    color: "text-gray-600",
    bg: "bg-gray-50",
    description: "Flatten form fields in PDF",
  },
];

export default function PDFToolsPage() {
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
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">PDF Tools</h1>
          </div>
          <p className="text-gray-600">
            All the PDF tools you need. Merge, split, compress, and more.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pdfTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${tool.bg}`}>
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
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
