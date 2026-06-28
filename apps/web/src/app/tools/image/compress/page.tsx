"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Minimize2 } from "lucide-react";

export default function CompressImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (!file) { setError("Please select an image"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/image/compress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: `uploads/${file.name}`, options: { quality } }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.url);
      else setError(data.error || "Failed to compress");
    } catch { setError("An error occurred"); }
    finally { setLoading(false); }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
            <Minimize2 className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Compress Image</h1>
          </div>
          <p className="text-gray-600">Reduce image file size while maintaining quality.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone onFilesSelect={(f) => setFile(f[0] || null)} accept={[".jpg", ".jpeg", ".png", ".webp", ".gif"]} multiple={false} loading={loading} />
            {file && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-600">Original size: <span className="font-medium">{formatSize(file.size)}</span></p></div>}
            <div className="space-y-2">
              <Label>Quality: {quality}%</Label>
              <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500"><span>Smaller file</span><span>Better quality</span></div>
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">Compression complete!</p>
                <Button asChild><a href={result} download><Download className="h-4 w-4 mr-2" /> Download Compressed Image</a></Button>
              </div>
            )}
            <Button onClick={handleCompress} disabled={!file || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Compressing...</> : <><Minimize2 className="h-4 w-4 mr-2" /> Compress Image</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
