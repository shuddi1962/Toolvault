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

interface MetaTagResult {
  url: string;
  title: { content: string; length: number; status: "good" | "warning" | "error" };
  description: { content: string; length: number; status: "good" | "warning" | "error" };
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  canonical: string;
  robots: string;
  viewport: string;
  charset: string;
  issues: string[];
}

export default function MetaAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetaTagResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: "good" | "warning" | "error") => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
    }
  };

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/seo/meta-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to analyze meta tags");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Meta Tag Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze your page's meta tags for SEO optimization including title,
            description, Open Graph, and Twitter Card tags.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analyze Meta Tags</CardTitle>
            <CardDescription>
              Enter a URL to analyze its meta tags and get recommendations for
              improvement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleAnalyze} disabled={loading || !url}>
              {loading ? "Analyzing..." : "Analyze Meta Tags"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags for {result.url}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Title Tag</h3>
                    <Badge className={getStatusColor(result.title.status)}>
                      {result.title.length} chars
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                    {result.title.content || "No title found"}
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Meta Description</h3>
                    <Badge className={getStatusColor(result.description.status)}>
                      {result.description.length} chars
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                    {result.description.content || "No description found"}
                  </p>
                </div>
              </div>

              {result.keywords.length > 0 && (
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-semibold">Open Graph Tags</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">og:title: </span>
                      {result.ogTitle || "Not set"}
                    </div>
                    <div>
                      <span className="text-gray-500">og:description: </span>
                      {result.ogDescription || "Not set"}
                    </div>
                    <div>
                      <span className="text-gray-500">og:image: </span>
                      {result.ogImage ? (
                        <span className="text-blue-600">{result.ogImage}</span>
                      ) : (
                        "Not set"
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-semibold">Technical Meta</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">canonical: </span>
                      {result.canonical || "Not set"}
                    </div>
                    <div>
                      <span className="text-gray-500">robots: </span>
                      {result.robots || "Not set"}
                    </div>
                    <div>
                      <span className="text-gray-500">viewport: </span>
                      {result.viewport || "Not set"}
                    </div>
                    <div>
                      <span className="text-gray-500">charset: </span>
                      {result.charset || "Not set"}
                    </div>
                    <div>
                      <span className="text-gray-500">twitter:card: </span>
                      {result.twitterCard || "Not set"}
                    </div>
                  </div>
                </div>
              </div>

              {result.issues.length > 0 && (
                <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
                    Issues Found
                  </h3>
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    {result.issues.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
