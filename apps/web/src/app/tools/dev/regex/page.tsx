"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input, Label, Textarea } from "@toolvault/ui";
import { ArrowLeft, Code } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [matches, setMatches] = useState<{ value: string; index: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");

  const handleTest = () => {
    try {
      setError(null);
      setHasRun(true);
      if (!pattern) {
        setMatches([]);
        return;
      }
      const regex = new RegExp(pattern, flagStr);
      const results: { value: string; index: number }[] = [];
      let match;
      if (flags.g) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({ value: match[0], index: match.index });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) results.push({ value: match[0], index: match.index });
      }
      setMatches(results);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  const toggleFlag = (f: "g" | "i" | "m" | "s") => {
    setFlags((prev) => ({ ...prev, [f]: !prev[f] }));
  };

  const getHighlighted = () => {
    if (!pattern || matches.length === 0) return testString;
    try {
      const regex = new RegExp(pattern, flagStr);
      return testString.replace(regex, (m) => `<<MATCH>>${m}<</MATCH>>`);
    } catch {
      return testString;
    }
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
            <Code className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Regex Tester</h1>
          </div>
          <p className="text-gray-600">Test regular expressions with real-time match highlighting.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Pattern</Label>
              <div className="flex gap-2">
                <span className="flex items-center text-gray-500 text-lg">/</span>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="flex-1 font-mono"
                />
                <span className="flex items-center text-gray-500 text-lg">/</span>
                <Input
                  value={flagStr}
                  readOnly
                  className="w-20 font-mono text-center"
                />
              </div>
            </div>

            <div className="flex gap-4">
              {(["g", "i", "m", "s"] as const).map((f) => (
                <label key={f} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={flags[f]} onChange={() => toggleFlag(f)} className="rounded" />
                  <span className="text-sm font-mono">{f}</span>
                  <span className="text-xs text-gray-500">
                    {f === "g" ? "global" : f === "i" ? "case-insensitive" : f === "m" ? "multiline" : "dotAll"}
                  </span>
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Test String</Label>
              <Textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against..."
                className="h-32 font-mono text-sm"
              />
            </div>

            <Button onClick={handleTest}>Test Pattern</Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6 space-y-2">
              <Label>Highlighted Matches</Label>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[120px]">
                <pre className="text-sm font-mono whitespace-pre-wrap text-gray-300">
                  {testString ? (
                    matches.length > 0 ? (
                      testString.split("").map((char, i) => {
                        const isMatch = matches.some((m) => i >= m.index && i < m.index + m.value.length);
                        return (
                          <span key={i} className={isMatch ? "bg-yellow-400 text-gray-900 px-0.5 rounded" : ""}>
                            {char}
                          </span>
                        );
                      })
                    ) : (
                      <span>{testString}</span>
                    )
                  ) : (
                    <span className="text-gray-500">Highlighted text will appear here...</span>
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <Label>Match Results</Label>
              {error ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              ) : hasRun ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{matches.length} match{matches.length !== 1 ? "es" : ""} found</p>
                  {matches.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded text-sm">
                      <span className="font-mono text-gray-500">#{i + 1}</span>
                      <span className="font-mono bg-yellow-100 px-2 py-0.5 rounded">"{m.value}"</span>
                      <span className="text-gray-400">at index {m.index}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Click "Test Pattern" to see matches</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
