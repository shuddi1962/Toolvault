"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Merge } from "lucide-react";

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Upload files to S3 first, then call API
      // For now, show placeholder
      const response = await fetch("/api/pdf/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKeys: files.map(f => `uploads/${f.name}`) 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.url);
      } else {
        setError(data.error || "Failed to merge PDFs");
      }
    } catch (err) {
      setError("An error occurred while merging PDFs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ToolVault Pro
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-700">
                Get Started
              </Link>
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
            <Merge className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Merge PDF</h1>
          </div>
          <p className="text-gray-600">
            Combine multiple PDF files into a single document. Drag and drop to reorder.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <FileDropzone
              onFilesSelect={setFiles}
              accept={[".pdf"]}
              multiple={true}
              maxFiles={100}
              loading={loading}
            />

            {error && (
              <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">PDFs merged successfully!</p>
                <Button asChild>
                  <a href={result} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Merged PDF
                  </a>
                </Button>
              </div>
            )}

            <div className="mt-6">
              <Button
                onClick={handleMerge}
                disabled={files.length < 2 || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Merging PDFs...
                  </>
                ) : (
                  <>
                    <Merge className="h-4 w-4 mr-2" />
                    Merge {files.length} PDF{files.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">How it works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="font-medium mb-1">Upload Files</h3>
              <p className="text-sm text-gray-600">Select or drag multiple PDF files</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="font-medium mb-1">Merge</h3>
              <p className="text-sm text-gray-600">Click merge to combine your files</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="font-medium mb-1">Download</h3>
              <p className="text-sm text-gray-600">Download your merged PDF file</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
