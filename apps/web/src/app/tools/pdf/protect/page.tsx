"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent, Input, Label } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, Lock, Eye, EyeOff } from "lucide-react";

export default function ProtectPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProtect = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pdf/protect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileKey: `uploads/${file.name}`,
          password 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data.url);
      } else {
        setError(data.error || "Failed to protect PDF");
      }
    } catch (err) {
      setError("An error occurred while protecting PDF");
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
            <Lock className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Protect PDF</h1>
          </div>
          <p className="text-gray-600">Add password protection to your PDF file.</p>
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (min 4 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">PDF protected successfully!</p>
                <Button asChild>
                  <a href={result} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Protected PDF
                  </a>
                </Button>
              </div>
            )}

            <Button
              onClick={handleProtect}
              disabled={!file || !password || password.length < 4 || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Protecting PDF...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Protect PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
