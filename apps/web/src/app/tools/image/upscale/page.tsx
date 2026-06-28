"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Label, Badge } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, ZoomIn } from "lucide-react";

export default function UpscaleImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpscale = async () => {
    if (!file) { setError("Please select an image"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/image/upscale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: `uploads/${file.name}`, options: { scale } }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.url);
      else setError(data.error || "Failed to upscale");
    } catch { setError("An error occurred"); }
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
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ZoomIn className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Image Upscaler</h1>
          </div>
          <p className="text-gray-600">Upscale images using AI. Increase resolution up to 16x.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone onFilesSelect={(f) => setFile(f[0] || null)} accept={[".jpg", ".jpeg", ".png", ".webp"]} multiple={false} loading={loading} />
            <div className="space-y-2">
              <Label>Upscale Factor</Label>
              <div className="grid grid-cols-3 gap-3">
                {[{ value: 2, label: "2x", badge: "Free" }, { value: 4, label: "4x", badge: "Pro" }, { value: 8, label: "8x", badge: "Pro" }].map((opt) => (
                  <button key={opt.value} onClick={() => setScale(opt.value)} className={`p-4 rounded-lg border text-center transition-colors ${scale === opt.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="text-2xl font-bold">{opt.label}</div>
                    <Badge variant={opt.badge === "Free" ? "free" : "pro"} className="mt-1">{opt.badge}</Badge>
                  </button>
                ))}
              </div>
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">Upscaling complete!</p>
                <Button asChild><a href={result} download><Download className="h-4 w-4 mr-2" /> Download Upscaled Image</a></Button>
              </div>
            )}
            <Button onClick={handleUpscale} disabled={!file || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Upscaling...</> : <><ZoomIn className="h-4 w-4 mr-2" /> Upscale {scale}x</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
