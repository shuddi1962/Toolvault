"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, FileDown } from "lucide-react";

export default function CompressPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<"low" | "normal" | "high">("normal");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pdf/compress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKey: `uploads/${file.name}`,
          quality 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.url);
      } else {
        setError(data.error || "Failed to compress PDF");
      }
    } catch (err) {
      setError("An error occurred while compressing PDF");
    } finally {
      setLoading(false);
    }
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
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link>
              <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-700">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileDown className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Compress PDF</h1>
          </div>
          <p className="text-gray-600">Reduce PDF file size while maintaining quality.</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone
              onFilesSelect={(files) => setFile(files[0] || null)}
              accept={[".pdf"]}
              multiple={false}
              loading={loading}
            />

            {file && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Original size: <span className="font-medium">{formatSize(file.size)}</span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Compression Level</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "low", label: "Low", desc: "Best quality" },
                  { value: "normal", label: "Normal", desc: "Balanced" },
                  { value: "high", label: "High", desc: "Smallest size" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setQuality(option.value as "low" | "normal" | "high")}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      quality === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">PDF compressed successfully!</p>
                <Button asChild>
                  <a href={result} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Compressed PDF
                  </a>
                </Button>
              </div>
            )}

            <Button
              onClick={handleCompress}
              disabled={!file || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Compressing PDF...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4 mr-2" />
                  Compress PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
