"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Image } from "lucide-react";

const formats = [
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" },
  { value: "gif", label: "GIF" },
  { value: "tiff", label: "TIFF" },
  { value: "bmp", label: "BMP" },
];

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [toFormat, setToFormat] = useState("webp");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!file) { setError("Please select a file"); return; }
    setLoading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop();
      const response = await fetch("/api/convert/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: `uploads/${file.name}`, from: ext, to: toFormat }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.url);
      else setError(data.error || "Failed to convert");
    } catch { setError("An error occurred"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Image Converter</h1>
          </div>
          <p className="text-gray-600">Convert images between formats: JPG, PNG, WebP, AVIF, GIF, TIFF, BMP.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone
              onFilesSelect={(f) => setFile(f[0] || null)}
              accept={[".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tiff", ".bmp"]}
              multiple={false}
              loading={loading}
            />
            <div className="space-y-2">
              <Label>Convert to</Label>
              <div className="grid grid-cols-4 gap-2">
                {formats.map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setToFormat(fmt.value)}
                    className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                      toFormat === fmt.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">Conversion complete!</p>
                <Button asChild><a href={result} download><Download className="h-4 w-4 mr-2" /> Download Image</a></Button>
              </div>
            )}
            <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Converting...</> : <><Image className="h-4 w-4 mr-2" /> Convert Image</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
