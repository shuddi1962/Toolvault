"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Scissors } from "lucide-react";

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSplit = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    if (!pages.trim()) {
      setError("Please enter page numbers to split");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pdf/split", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKey: `uploads/${file.name}`,
          pages: pages 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.urls);
      } else {
        setError(data.error || "Failed to split PDF");
      }
    } catch (err) {
      setError("An error occurred while splitting PDF");
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
            <Scissors className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Split PDF</h1>
          </div>
          <p className="text-gray-600">Extract specific pages from a PDF file.</p>
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
              <Label htmlFor="pages">Page Range</Label>
              <Input
                id="pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                placeholder="e.g., 1-3, 5, 7-10"
              />
              <p className="text-xs text-gray-500">
                Enter page numbers or ranges separated by commas
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            {result.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">PDF split successfully!</p>
                <div className="space-y-2">
                  {result.map((url, index) => (
                    <Button key={index} variant="outline" size="sm" asChild>
                      <a href={url} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download Part {index + 1}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleSplit}
              disabled={!file || !pages.trim() || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Splitting PDF...
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4 mr-2" />
                  Split PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
