"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Music, Scissors, Merge, Volume2, Gauge, ArrowRightLeft, Headphones } from "lucide-react";

const audioTools = [
  { name: "Trim Audio", href: "/tools/audio/trim", icon: Scissors, color: "text-blue-600", description: "Cut audio segments" },
  { name: "Merge Audio", href: "/tools/audio/merge", icon: Merge, color: "text-green-600", description: "Combine audio files" },
  { name: "Convert Format", href: "/tools/audio/convert", icon: ArrowRightLeft, color: "text-purple-600", description: "MP3, WAV, FLAC, OGG" },
  { name: "Change Speed", href: "/tools/audio/speed", icon: Gauge, color: "text-orange-600", description: "Speed up or slow down" },
  { name: "Adjust Volume", href: "/tools/audio/volume", icon: Volume2, color: "text-cyan-600", description: "Increase/decrease volume" },
  { name: "Extract from Video", href: "/tools/audio/extract", icon: Headphones, color: "text-pink-600", description: "Get audio from video" },
];

export default function AudioEditorPage() {
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
            <Music className="h-8 w-8 text-violet-600" />
            <h1 className="text-3xl font-bold text-gray-900">Audio Editor</h1>
          </div>
          <p className="text-gray-600">Edit audio files in your browser. Trim, merge, convert, and more.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audioTools.map((tool) => (
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
