"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Minimize2, ZoomIn, Eraser, Droplets, QrCode, Maximize, Crop, RotateCw, Sparkles } from "lucide-react";

const imageTools = [
  { name: "Compress Image", href: "/tools/image/compress", icon: Minimize2, color: "text-green-600", bg: "bg-green-50", description: "Reduce file size" },
  { name: "AI Upscaler", href: "/tools/image/upscale", icon: ZoomIn, color: "text-blue-600", bg: "bg-blue-50", description: "Upscale with AI" },
  { name: "Remove Background", href: "/tools/image/remove-bg", icon: Eraser, color: "text-pink-600", bg: "bg-pink-50", description: "AI background removal" },
  { name: "QR Code Generator", href: "/tools/image/qr-code", icon: QrCode, color: "text-indigo-600", bg: "bg-indigo-50", description: "Generate QR codes" },
  { name: "Add Watermark", href: "/tools/image/watermark", icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-50", description: "Add text/image watermark" },
  { name: "Resize Image", href: "/tools/image/resize", icon: Maximize, color: "text-orange-600", bg: "bg-orange-50", description: "Change dimensions" },
  { name: "Crop Image", href: "/tools/image/crop", icon: Crop, color: "text-purple-600", bg: "bg-purple-50", description: "Crop to selection" },
  { name: "Rotate Image", href: "/tools/image/rotate", icon: RotateCw, color: "text-teal-600", bg: "bg-teal-50", description: "Rotate freely" },
  { name: "Apply Filters", href: "/tools/image/filters", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50", description: "Grayscale, sepia, blur" },
];

export default function ImageToolsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Tools</h1>
          <p className="text-gray-600">Edit, compress, upscale, and transform images.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {imageTools.map((tool) => (
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
