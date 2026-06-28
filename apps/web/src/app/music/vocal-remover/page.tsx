"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Music, Upload, Play, Pause, Loader2 } from "lucide-react";

export default function VocalRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<"vocals" | "instrumental" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 2500));
    setResult("instrumental");
    setProcessing(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("audio/")) {
      setFile(dropped);
      setResult(null);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
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
            <Music className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Vocal Remover</h1>
          </div>
          <p className="text-gray-600">Separate vocals from instrumentals using AI. Upload an audio file to get started.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-pink-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Drop an audio file here or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">Supports MP3, WAV, FLAC, OGG, AAC</p>
                <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
              </div>

              {file && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Music className="h-5 w-5 text-pink-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <Button onClick={handleProcess} disabled={processing}>
                    {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {processing ? "Processing..." : "Separate Audio"}
                  </Button>
                </div>
              )}

              {processing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>AI is separating vocals from instrumentals...</span>
                    <span>Processing</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-600 h-2 rounded-full animate-pulse" style={{ width: "65%" }} />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Result</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Instrumental (No Vocals)</p>
                  <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center">
                    <button onClick={togglePlay} className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                  </div>
                  <Button className="mt-3 w-full" variant="outline">
                    Download Instrumental
                  </Button>
                </div>
                <div className="p-4 border rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Vocals Only</p>
                  <div className="bg-gray-100 rounded-lg h-16 flex items-center justify-center">
                    <button className="p-3 bg-gray-400 text-white rounded-full cursor-not-allowed">
                      <Play className="h-5 w-5" />
                    </button>
                  </div>
                  <Button className="mt-3 w-full" variant="outline">
                    Download Vocals
                  </Button>
                </div>
              </div>
              <audio ref={audioRef} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
