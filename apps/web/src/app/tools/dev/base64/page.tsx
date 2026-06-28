"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Key, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    try {
      setError(null);
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e: any) {
      setError("Invalid input for " + mode + " operation");
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode((m) => (m === "encode" ? "decode" : "encode"));
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
            <Key className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Base64 Encoder / Decoder</h1>
          </div>
          <p className="text-gray-600">Encode text to Base64 or decode Base64 to text.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>{mode === "encode" ? "Plain Text" : "Base64 Input"}</Label>
                <div className="flex rounded-lg border overflow-hidden">
                  <button onClick={() => setMode("encode")} className={`px-3 py-1 text-sm ${mode === "encode" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}>Encode</button>
                  <button onClick={() => setMode("decode")} className={`px-3 py-1 text-sm ${mode === "decode" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}>Decode</button>
                </div>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
                className="h-48 font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleProcess}>Convert</Button>
                <Button onClick={swap} variant="outline"><ArrowRightLeft className="h-4 w-4 mr-1" /> Swap</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>{mode === "encode" ? "Base64 Output" : "Decoded Text"}</Label>
                {output && (
                  <button onClick={handleCopy} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}
              </div>
              {error ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-auto">
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{output || "Output will appear here..."}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
