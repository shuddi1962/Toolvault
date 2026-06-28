"use client";

import Link from "next/link";
import { Card, CardContent, Badge } from "@toolvault/ui";
import { ArrowLeft, PenTool, FileText, Download } from "lucide-react";

export default function SignPage() {
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <PenTool className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">eSign Documents</h1>
          </div>
          <p className="text-gray-600">Sign documents digitally with draw, type, or upload signature.</p>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <PenTool className="h-16 w-16 text-gray-300 mx-auto" />
              <h2 className="text-xl font-semibold">Digital Signature</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Upload a document, add your signature, and download the signed PDF. 
                Requires HELLOSIGN_API_KEY for production use.
              </p>
              <Badge variant="pro">Coming Soon</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
