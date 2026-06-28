"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Loader2, SpellCheck, Copy, Check } from "lucide-react";

export default function GrammarCheckerPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) { setError("Please enter text to check"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.content);
      else setError(data.error || "Failed to check grammar");
    } catch { setError("An error occurred"); }
    finally { setLoading(false); }
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

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
            <SpellCheck className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Grammar Checker</h1>
          </div>
          <p className="text-gray-600">Check and fix grammar, spelling, and punctuation errors.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Text to check</Label>
              <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here..." rows={8} />
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between"><Label>Corrected Text</Label><Button variant="ghost" size="sm" onClick={copyToClipboard}>{copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}{copied ? "Copied!" : "Copy"}</Button></div>
                <div className="p-4 bg-white border rounded-lg whitespace-pre-wrap">{result}</div>
              </div>
            )}
            <Button onClick={handleCheck} disabled={!text.trim() || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Checking...</> : <><SpellCheck className="h-4 w-4 mr-2" /> Check Grammar</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
