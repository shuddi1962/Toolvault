"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Link2, Film } from "lucide-react";

export default function VideoDownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; formats: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!url.trim()) { setError("Please enter a video URL"); return; }
    setLoading(true);
    setError(null);
    try {
      // Placeholder - would call /api/downloader/info in production
      setResult({
        title: "Video Title (Demo)",
        formats: ["720p MP4", "1080p MP4", "Audio MP3"]
      });
    } catch { setError("Failed to fetch video info"); }
    finally { setLoading(false); }
  };

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
        <Link href="/videos" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Videos
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Download className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Video Downloader</h1>
          </div>
          <p className="text-gray-600">Download videos from YouTube, TikTok, Instagram, Twitter, and more.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">Video URL</Label>
              <div className="flex gap-2">
                <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="flex-1" />
                <Button onClick={handleFetch} disabled={!url.trim() || loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              <span>Supported:</span>
              {["YouTube", "TikTok", "Instagram", "Twitter", "Facebook", "Vimeo", "SoundCloud"].map((p) => (
                <span key={p} className="px-2 py-1 bg-gray-100 rounded">{p}</span>
              ))}
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">{result.title}</h3>
                </div>
                <div className="space-y-2">
                  <Label>Available Formats</Label>
                  {result.formats.map((fmt) => (
                    <div key={fmt} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{fmt}</span>
                      <Button size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
