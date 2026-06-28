"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Keyword {
  word: string;
  count: number;
  density: number;
}

interface KeywordDensityResult {
  url?: string;
  totalWords: number;
  totalCharacters: number;
  uniqueWords: number;
  oneWordKeywords: Keyword[];
  twoWordKeywords: Keyword[];
  threeWordKeywords: Keyword[];
}

export default function KeywordDensityPage() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [inputMode, setInputMode] = useState<"url" | "text">("url");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KeywordDensityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (inputMode === "url" && !url) return;
    if (inputMode === "text" && !text) return;
    setLoading(true);
    setError(null);
    try {
      const body =
        inputMode === "url" ? { url } : { text };
      const res = await fetch("/api/seo/keyword-density", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to analyze keyword density");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const renderKeywordTable = (
    keywords: Keyword[],
    title: string
  ) => (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left p-3">Keyword</th>
              <th className="text-left p-3">Count</th>
              <th className="text-left p-3">Density</th>
              <th className="text-left p-3">Bar</th>
            </tr>
          </thead>
          <tbody>
            {keywords.slice(0, 10).map((kw, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 font-medium">{kw.word}</td>
                <td className="p-3">{kw.count}</td>
                <td className="p-3">
                  <Badge variant="outline">{kw.density.toFixed(2)}%</Badge>
                </td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(kw.density * 10, 100)}%`,
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Keyword Density Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze keyword usage in your content to optimize for SEO and avoid
            keyword stuffing.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analyze Keyword Density</CardTitle>
            <CardDescription>
              Enter a URL or paste text content to analyze keyword distribution
              and frequency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={inputMode === "url" ? "default" : "outline"}
                onClick={() => setInputMode("url")}
              >
                From URL
              </Button>
              <Button
                variant={inputMode === "text" ? "default" : "outline"}
                onClick={() => setInputMode("text")}
              >
                From Text
              </Button>
            </div>

            {inputMode === "url" ? (
              <div>
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="text">Content Text</Label>
                <Textarea
                  id="text"
                  placeholder="Paste your content here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                />
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={loading || (inputMode === "url" ? !url : !text)}
            >
              {loading ? "Analyzing..." : "Analyze Keywords"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>
                Results {result.url ? `for ${result.url}` : ""}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.totalWords.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total Words</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.totalCharacters.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Characters</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.uniqueWords.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Unique Words</div>
                </div>
              </div>

              {renderKeywordTable(result.oneWordKeywords, "Single Keywords")}

              {result.twoWordKeywords.length > 0 &&
                renderKeywordTable(result.twoWordKeywords, "Two-Word Phrases")}

              {result.threeWordKeywords.length > 0 &&
                renderKeywordTable(result.threeWordKeywords, "Three-Word Phrases")}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
