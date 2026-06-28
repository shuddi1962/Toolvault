"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, ScanText } from "lucide-react";

export default function OCRPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOCR = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pdf/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKey: `uploads/${file.name}` 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.url);
      } else {
        setError(data.error || "Failed to OCR PDF");
      }
    } catch (err) {
      setError("An error occurred while processing PDF");
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
            <ScanText className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">OCR PDF</h1>
          </div>
          <p className="text-gray-600">
            Extract text from scanned PDFs and images using optical character recognition.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone
              onFilesSelect={(files) => setFile(files[0] || null)}
              accept={[".pdf", ".jpg", ".jpeg", ".png", ".tiff"]}
              multiple={false}
              loading={loading}
            />

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">What is OCR?</h3>
              <p className="text-sm text-blue-700">
                OCR (Optical Character Recognition) extracts text from scanned documents and images,
                making them searchable and editable.
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">OCR processing complete!</p>
                <Button asChild>
                  <a href={result} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download OCR PDF
                  </a>
                </Button>
              </div>
            )}

            <Button
              onClick={handleOCR}
              disabled={!file || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing OCR...
                </>
              ) : (
                <>
                  <ScanText className="h-4 w-4 mr-2" />
                  Extract Text (OCR)
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
