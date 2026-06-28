"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropzone } from "@/components/pdf/file-dropzone";
import { Button, Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Download, Loader2, FileSpreadsheet } from "lucide-react";

export default function ExcelToPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!file) { setError("Please select a file"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/convert/excel-to-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: `uploads/${file.name}`, from: "xlsx", to: "pdf" }),
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
            <FileSpreadsheet className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Excel to PDF</h1>
          </div>
          <p className="text-gray-600">Convert Excel spreadsheets (.xls, .xlsx) to PDF format.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <FileDropzone onFilesSelect={(f) => setFile(f[0] || null)} accept={[".xls", ".xlsx"]} multiple={false} loading={loading} />
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 mb-3">Conversion complete!</p>
                <Button asChild><a href={result} download><Download className="h-4 w-4 mr-2" /> Download PDF</a></Button>
              </div>
            )}
            <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Converting...</> : <><FileSpreadsheet className="h-4 w-4 mr-2" /> Convert to PDF</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
