"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, RotateCw } from "lucide-react";

export default function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [degrees, setDegrees] = useState(90);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRotate = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pdf/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKey: `uploads/${file.name}`,
          degrees 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.url);
      } else {
        setError(data.error || "Failed to rotate PDF");
      }
    } catch (err) {
      setError("An error occurred while rotating PDF");
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
            <RotateCw className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Rotate PDF</h1>
          </div>
          <p className="text-gray-600">Rotate all pages in a PDF file.</p>
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
              <Label>Rotation Angle</Label>
              <div className="grid grid-cols-4 gap-3">
                {[90, 180, 270, -90].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setDegrees(angle)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      degrees === angle
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{angle}°</div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">PDF rotated successfully!</p>
                <Button asChild>
                  <a href={result} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Rotated PDF
                  </a>
                </Button>
              </div>
            )}

            <Button
              onClick={handleRotate}
              disabled={!file || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rotating PDF...
                </>
              ) : (
                <>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Rotate PDF {degrees}°
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
