"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Loader2, Mail, Copy, Check } from "lucide-react";

export default function EmailWriterPage() {
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("professional");
  const [keyPoints, setKeyPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!subject.trim()) { setError("Please enter a subject"); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Write a ${tone} email about: ${subject}. Key points: ${keyPoints || "none"}` }),
      });
      const data = await response.json();
      if (data.success) setResult(data.data.content);
      else setError(data.error || "Failed to generate");
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
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Email Writer</h1>
          </div>
          <p className="text-gray-600">Generate professional emails with AI.</p>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject/Purpose</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Follow up on meeting" />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <div className="grid grid-cols-4 gap-2">
                {["professional", "friendly", "formal", "casual"].map((t) => (
                  <button key={t} onClick={() => setTone(t)} className={`p-2 rounded-lg border text-sm capitalize transition-colors ${tone === t ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Key Points</Label>
              <Textarea id="points" value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} placeholder="What should the email cover?" rows={3} />
            </div>
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between"><Label>Generated Email</Label><Button variant="ghost" size="sm" onClick={copyToClipboard}>{copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}{copied ? "Copied!" : "Copy"}</Button></div>
                <div className="p-4 bg-white border rounded-lg whitespace-pre-wrap">{result}</div>
              </div>
            )}
            <Button onClick={handleGenerate} disabled={!subject.trim() || loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Mail className="h-4 w-4 mr-2" /> Generate Email</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
