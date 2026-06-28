"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Music, Loader2, Link2, FileAudio } from "lucide-react";

type Format = "mp3" | "wav" | "flac";

interface DownloadResult {
  title: string;
  artist: string;
  cover: string;
  formats: { format: Format; quality: string; size: string }[];
}

export default function MusicDownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please enter a music URL");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      title: "Levitating",
      artist: "Dua Lipa",
      cover: "https://picsum.photos/seed/levitating/300/300",
      formats: [
        { format: "mp3", quality: "320kbps", size: "8.2 MB" },
        { format: "wav", quality: "Lossless", size: "35.1 MB" },
        { format: "flac", quality: "Lossless", size: "18.6 MB" },
      ],
    });
    setLoading(false);
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
        <Link href="/music" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Music
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Download className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Music Downloader</h1>
          </div>
          <p className="text-gray-600">Download music from YouTube, SoundCloud, and other platforms.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Music URL</Label>
              <div className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or https://soundcloud.com/..."
                  className="flex-1"
                />
                <Button onClick={handleFetch} disabled={!url.trim() || loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              <span>Supported:</span>
              {["YouTube", "SoundCloud", "Bandcamp", "Vimeo"].map((p) => (
                <span key={p} className="px-2 py-1 bg-gray-100 rounded">{p}</span>
              ))}
            </div>

            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4 items-center">
                <img src={result.cover} alt={result.title} className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h2 className="text-xl font-bold">{result.title}</h2>
                  <p className="text-gray-600">{result.artist}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Choose Format</Label>
                {result.formats.map((fmt) => (
                  <div key={fmt.format} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileAudio className="h-8 w-8 text-pink-600" />
                      <div>
                        <p className="font-medium uppercase">{fmt.format}</p>
                        <p className="text-sm text-gray-500">{fmt.quality} &middot; {fmt.size}</p>
                      </div>
                    </div>
                    <Button>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
