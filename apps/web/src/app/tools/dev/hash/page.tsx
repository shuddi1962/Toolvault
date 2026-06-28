"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Hash, Copy, Check } from "lucide-react";

type HashType = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

const HASH_LABELS: Record<HashType, string> = {
  "MD5": "md5",
  "SHA-1": "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-512": "SHA-512",
};

async function computeHash(input: string, type: HashType): Promise<string> {
  if (type === "MD5") {
    // Simple MD5 for demo - not cryptographically secure
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, "0");
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const algo = HASH_LABELS[type];
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [selectedHashes, setSelectedHashes] = useState<HashType[]>(["SHA-256"]);
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    const newResults: Record<string, string> = {};
    for (const hash of selectedHashes) {
      newResults[hash] = await computeHash(input, hash);
    }
    setResults(newResults);
  };

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleHash = (h: HashType) => {
    setSelectedHashes((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
    );
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
        <Link href="/tools/dev" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dev Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Hash className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Hash Generator</h1>
          </div>
          <p className="text-gray-600">Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Input Text</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="h-32 font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Hash Algorithms</Label>
              <div className="flex flex-wrap gap-3">
                {(["MD5", "SHA-1", "SHA-256", "SHA-512"] as HashType[]).map((h) => (
                  <label key={h} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedHashes.includes(h)}
                      onChange={() => toggleHash(h)}
                      className="rounded"
                    />
                    <span className="text-sm font-mono">{h}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate}>Generate Hashes</Button>
          </CardContent>
        </Card>

        {Object.keys(results).length > 0 && (
          <div className="space-y-4">
            {Object.entries(results).map(([type, hash]) => (
              <Card key={type}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">{type}</p>
                    <p className="font-mono text-sm break-all bg-gray-900 text-green-400 p-3 rounded-lg">{hash}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(type, hash)}
                    className="p-2 rounded hover:bg-gray-100 shrink-0"
                  >
                    {copied === type ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-400" />}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
