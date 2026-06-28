"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Loader2, Tag, Copy, Check } from "lucide-react";

export default function MetaWriterPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; description: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!content.trim()) { setError("Please enter page content"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Generate SEO meta title and description for: ${content}` }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.content);
      else setError(data.error || "Failed to generate");
    } catch { setError("An error occurred"); }
    finally { setLoading(false); }
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
            <Tag className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Meta Tag Generator</h1>
          </div>
          <p className="text-gray-600">Generate SEO meta titles and descriptions.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content">Page Content</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Describe your page content..." rows={5} />
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded-lg">
                  <Label className="text-sm text-gray-500">Title Tag</Label>
                  <p className="font-medium mt-1">{result.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{result.title.length} characters</p>
                </div>
                <div className="p-4 bg-white border rounded-lg">
                  <Label className="text-sm text-gray-500">Meta Description</Label>
                  <p className="mt-1">{result.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{result.description.length} characters</p>
                </div>
              </div>
            )}
            <Button onClick={handleGenerate} disabled={!content.trim() || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Tag className="h-4 w-4 mr-2" /> Generate Meta Tags</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
