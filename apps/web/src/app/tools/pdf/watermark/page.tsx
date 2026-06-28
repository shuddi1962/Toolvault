"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Droplets } from "lucide-react";

export default function WatermarkPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWatermark = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    if (!watermarkText.trim()) {
      setError("Please enter watermark text");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pdf/watermark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKey: `uploads/${file.name}`,
          text: watermarkText 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.url);
      } else {
        setError(data.error || "Failed to add watermark");
      }
    } catch (err) {
      setError("An error occurred while adding watermark");
    } finally {
      setLoading(false);
    }
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
            <Droplets className="h-8 w-8 text-cyan-600" />
            <h1 className="text-3xl font-bold text-gray-900">Add Watermark</h1>
          </div>
          <p className="text-gray-600">Add a text watermark to all pages of your PDF.</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone
              onFilesSelect={(files) => setFile(files[0] || null)}
              accept={[".pdf"]}
              multiple={false}
              loading={loading}
            />

            <div className="space-y-2">
              <Label htmlFor="watermark">Watermark Text</Label>
              <Input
                id="watermark"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">Watermark added successfully!</p>
                <Button asChild>
                  <a href={result} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Watermarked PDF
                  </a>
                </Button>
              </div>
            )}

            <Button
              onClick={handleWatermark}
              disabled={!file || !watermarkText.trim() || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Watermark...
                </>
              ) : (
                <>
                  <Droplets className="h-4 w-4 mr-2" />
                  Add Watermark
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
