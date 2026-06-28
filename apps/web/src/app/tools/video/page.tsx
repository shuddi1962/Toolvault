"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Film, Scissors, Merge, Type, Image, ArrowRightLeft, Gauge, Captions, Trash2 } from "lucide-react";

const videoTools = [
  { name: "Trim Video", href: "/tools/video/trim", icon: Scissors, color: "text-blue-600", description: "Cut video segments" },
  { name: "Merge Videos", href: "/tools/video/merge", icon: Merge, color: "text-green-600", description: "Combine video clips" },
  { name: "Add Subtitles", href: "/tools/video/subtitles", icon: Captions, color: "text-purple-600", description: "Add captions to video" },
  { name: "Video to GIF", href: "/tools/video/to-gif", icon: Image, color: "text-pink-600", description: "Convert video to GIF" },
  { name: "Convert Format", href: "/tools/video/convert", icon: ArrowRightLeft, color: "text-orange-600", description: "MP4, AVI, MOV, WebM" },
  { name: "Change Speed", href: "/tools/video/speed", icon: Gauge, color: "text-cyan-600", description: "Speed up or slow down" },
  { name: "Add Text Overlay", href: "/tools/video/text", icon: Type, color: "text-indigo-600", description: "Add text to video" },
  { name: "Extract Audio", href: "/tools/video/extract-audio", icon: Trash2, color: "text-gray-600", description: "Get audio from video" },
  { name: "Mute Video", href: "/tools/video/mute", icon: Trash2, color: "text-red-600", description: "Remove audio track" },
];

export default function VideoEditorPage() {
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
            <Film className="h-8 w-8 text-cyan-600" />
            <h1 className="text-3xl font-bold text-gray-900">Video Editor</h1>
          </div>
          <p className="text-gray-600">Edit videos in your browser. Trim, merge, add subtitles, and more.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videoTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
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
