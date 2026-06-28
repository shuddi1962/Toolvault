"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, FileCode, Copy, Check } from "lucide-react";

type Language = "html" | "css" | "js";

function minifyCode(code: string, lang: Language): string {
  if (lang === "html") {
    return code
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  if (lang === "css") {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  return code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,=+\-<>!&|?])\s*/g, "$1")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function calcSavings(original: string, minified: string) {
  if (!original.length) return 0;
  return Math.round((1 - minified.length / original.length) * 100);
}

export default function MinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState<Language>("html");
  const [copied, setCopied] = useState(false);
  const [savings, setSavings] = useState(0);

  const handleMinify = () => {
    const result = minifyCode(input, lang);
    setOutput(result);
    setSavings(calcSavings(input, result));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/tools/dev" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dev Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileCode className="h-8 w-8 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">Code Minifier</h1>
          </div>
          <p className="text-gray-600">Minify HTML, CSS, and JavaScript to reduce file size.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Label>Input Code</Label>
                <div className="flex rounded-lg border overflow-hidden ml-auto">
                  {(["html", "css", "js"] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-3 py-1 text-sm uppercase ${lang === l ? "bg-gray-800 text-white" : "bg-white text-gray-600"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Paste your ${lang.toUpperCase()} code here...`}
                className="h-64 font-mono text-sm"
              />
              <Button onClick={handleMinify}>Minify</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Minified Output</Label>
                <div className="flex items-center gap-3">
                  {savings > 0 && (
                    <span className="text-sm text-green-600 font-medium">{savings}% smaller</span>
                  )}
                  {output && (
                    <button onClick={handleCopy} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap break-all">
                  {output || "Minified output will appear here..."}
                </pre>
              </div>
              {output && (
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Original: {input.length} chars</span>
                  <span>Minified: {output.length} chars</span>
                  <span>Saved: {input.length - output.length} chars</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
