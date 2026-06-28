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
import { Badge } from "@/components/ui/badge";

interface PageSpeedResult {
  url: string;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  firstContentfulPaint: string;
  largestContentfulPaint: string;
  totalBlockingTime: string;
  cumulativeLayoutShift: string;
  speedIndex: string;
  interactive: string;
  suggestions: string[];
}

export default function PageSpeedPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90)
      return <Badge className="bg-green-500">Good</Badge>;
    if (score >= 50)
      return <Badge className="bg-yellow-500">Needs Work</Badge>;
    return <Badge className="bg-red-500">Poor</Badge>;
  };

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/seo/page-speed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to analyze URL");
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
          <h1 className="text-3xl font-bold">Page Speed Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze your website's loading performance and get actionable
            insights to improve speed.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analyze Page Speed</CardTitle>
            <CardDescription>
              Enter a URL to check its performance metrics and Core Web Vitals.
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
              {loading ? "Analyzing..." : "Analyze Page Speed"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Results for {result.url}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.performanceScore}</div>
                  <div className="text-sm text-gray-500">Performance</div>
                  {getScoreBadge(result.performanceScore)}
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.accessibilityScore}</div>
                  <div className="text-sm text-gray-500">Accessibility</div>
                  {getScoreBadge(result.accessibilityScore)}
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.bestPracticesScore}</div>
                  <div className="text-sm text-gray-500">Best Practices</div>
                  {getScoreBadge(result.bestPracticesScore)}
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.seoScore}</div>
                  <div className="text-sm text-gray-500">SEO</div>
                  {getScoreBadge(result.seoScore)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Core Web Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500">First Contentful Paint</div>
                    <div className="font-semibold">{result.firstContentfulPaint}</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500">Largest Contentful Paint</div>
                    <div className="font-semibold">{result.largestContentfulPaint}</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500">Total Blocking Time</div>
                    <div className="font-semibold">{result.totalBlockingTime}</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500">Cumulative Layout Shift</div>
                    <div className="font-semibold">{result.cumulativeLayoutShift}</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500">Speed Index</div>
                    <div className="font-semibold">{result.speedIndex}</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500">Time to Interactive</div>
                    <div className="font-semibold">{result.interactive}</div>
                  </div>
                </div>
              </div>

              {result.suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Suggestions</h3>
                  <ul className="space-y-2">
                    {result.suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-yellow-500">•</span>
                        {suggestion}
                      </li>
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
