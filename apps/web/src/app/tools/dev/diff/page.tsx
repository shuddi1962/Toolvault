"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Minus } from "lucide-react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
  lineNum: number;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const result: DiffLine[] = [];
  const maxLen = Math.max(origLines.length, modLines.length);

  for (let i = 0; i < maxLen; i++) {
    const origLine = origLines[i];
    const modLine = modLines[i];

    if (origLine === undefined) {
      result.push({ type: "added", content: modLine, lineNum: i + 1 });
    } else if (modLine === undefined) {
      result.push({ type: "removed", content: origLine, lineNum: i + 1 });
    } else if (origLine === modLine) {
      result.push({ type: "unchanged", content: origLine, lineNum: i + 1 });
    } else {
      result.push({ type: "removed", content: origLine, lineNum: i + 1 });
      result.push({ type: "added", content: modLine, lineNum: i + 1 });
    }
  }
  return result;
}

export default function DiffCheckerPage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [hasCompared, setHasCompared] = useState(false);

  const handleCompare = () => {
    setDiff(computeDiff(original, modified));
    setHasCompared(true);
  };

  const added = diff.filter((d) => d.type === "added").length;
  const removed = diff.filter((d) => d.type === "removed").length;

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
            <Minus className="h-8 w-8 text-cyan-600" />
            <h1 className="text-3xl font-bold text-gray-900">Text Diff Checker</h1>
          </div>
          <p className="text-gray-600">Compare two texts and see the differences highlighted.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 mb-6">
          <Card>
            <CardContent className="p-6">
              <Label>Original Text</Label>
              <Textarea
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder="Paste the original text here..."
                className="h-64 font-mono text-sm mt-2"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Label>Modified Text</Label>
              <Textarea
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                placeholder="Paste the modified text here..."
                className="h-64 font-mono text-sm mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <Button onClick={handleCompare}>Compare</Button>
          {hasCompared && (
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">+{added} added</span>
              <span className="text-red-600">-{removed} removed</span>
            </div>
          )}
        </div>

        {hasCompared && (
          <Card>
            <CardContent className="p-6">
              <Label>Differences</Label>
              <div className="mt-2 bg-gray-900 rounded-lg overflow-hidden">
                {diff.length === 0 ? (
                  <p className="p-4 text-gray-500 text-sm">No differences found. The texts are identical.</p>
                ) : (
                  <div className="font-mono text-sm">
                    {diff.map((line, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          line.type === "added"
                            ? "bg-green-900/30 text-green-400"
                            : line.type === "removed"
                            ? "bg-red-900/30 text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        <span className="w-12 text-right pr-3 py-1 text-gray-600 shrink-0 border-r border-gray-700">
                          {line.type === "removed" ? "-" : line.type === "added" ? "+" : " "}
                        </span>
                        <span className="flex-1 py-1 px-3 whitespace-pre">{line.content}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
