"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Search, Upload, Music, Loader2, ExternalLink } from "lucide-react";

interface SongResult {
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
  cover: string;
  confidence: number;
}

export default function SongRecognitionPage() {
  const [mode, setMode] = useState<"file" | "url">("file");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SongResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRecognize = async () => {
    if (mode === "url" && !url.trim()) {
      setError("Please enter a URL");
      return;
    }
    if (mode === "file" && !file) {
      setError("Please select an audio file");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    // Simulate recognition
    await new Promise((r) => setTimeout(r, 3000));
    setResult({
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      releaseYear: 2020,
      cover: "https://picsum.photos/seed/blinding/300/300",
      confidence: 97.4,
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
            <Search className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Song Recognition</h1>
          </div>
          <p className="text-gray-600">Identify any song by uploading an audio file or pasting a URL.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            <div className="flex gap-2">
              <Button variant={mode === "file" ? "default" : "outline"} onClick={() => setMode("file")}>
                <Upload className="h-4 w-4 mr-2" /> Upload File
              </Button>
              <Button variant={mode === "url" ? "default" : "outline"} onClick={() => setMode("url")}>
                <ExternalLink className="h-4 w-4 mr-2" /> Paste URL
              </Button>
            </div>

            {mode === "file" ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const dropped = e.dataTransfer.files[0];
                  if (dropped && dropped.type.startsWith("audio/")) setFile(dropped);
                }}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-pink-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Drop an audio file or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">MP3, WAV, FLAC, OGG up to 20MB</p>
                <input ref={fileInputRef} type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Audio URL</Label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/song.mp3"
                />
              </div>
            )}

            {file && mode === "file" && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Music className="h-5 w-5 text-pink-600" />
                <span className="font-medium truncate flex-1">{file.name}</span>
                <span className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            )}

            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

            <Button onClick={handleRecognize} disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              {loading ? "Identifying Song..." : "Identify Song"}
            </Button>

            {loading && (
              <div className="text-center space-y-3">
                <div className="flex justify-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2 bg-pink-600 rounded-full animate-bounce" style={{ height: "20px", animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-sm text-gray-500">Analyzing audio fingerprint...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img src={result.cover} alt={result.title} className="w-48 h-48 rounded-xl object-cover mx-auto md:mx-0" />
                <div className="flex-1 space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold">{result.title}</h2>
                    <p className="text-lg text-gray-600">{result.artist}</p>
                  </div>
                  <p className="text-sm text-gray-500">{result.album} &middot; {result.releaseYear}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${result.confidence}%` }} />
                    </div>
                    <span className="text-sm font-medium text-green-600">{result.confidence}% match</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button>Play on Spotify</Button>
                    <Button variant="outline">View Lyrics</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
