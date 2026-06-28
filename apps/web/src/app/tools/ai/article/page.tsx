"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Loader2, Sparkles, Copy, Check } from "lucide-react";

export default function ArticleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState("1000");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) { setError("Please enter a topic"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Write a ${wordCount}-word SEO article about: ${topic}. Keywords: ${keywords || "none"}` }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.content);
      else setError(data.error || "Failed to generate");
    } catch { setError("An error occurred"); }
    finally { setLoading(false); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Article Generator</h1>
          </div>
          <p className="text-gray-600">Generate SEO-optimized articles using AI.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., How to start a podcast" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g., podcast, audio, recording" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wordCount">Word Count</Label>
              <Input id="wordCount" type="number" value={wordCount} onChange={(e) => setWordCount(e.target.value)} />
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Article</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="p-4 bg-white border rounded-lg prose prose-sm max-w-none whitespace-pre-wrap">{result}</div>
              </div>
            )}
            <Button onClick={handleGenerate} disabled={!topic.trim() || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate Article</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
