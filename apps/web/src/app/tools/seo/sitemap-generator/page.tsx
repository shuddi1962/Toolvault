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

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

interface SitemapResult {
  siteUrl: string;
  totalPages: number;
  urls: SitemapUrl[];
  xmlOutput: string;
}

export default function SitemapGeneratorPage() {
  const [url, setUrl] = useState("");
  const [includeImages, setIncludeImages] = useState(false);
  const [maxPages, setMaxPages] = useState("500");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SitemapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/seo/sitemap-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          includeImages,
          maxPages: parseInt(maxPages, 10),
        }),
      });
      if (!res.ok) throw new Error("Failed to generate sitemap");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.xmlOutput);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">XML Sitemap Generator</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Generate a comprehensive XML sitemap for your website to help search
            engines discover and index your pages.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Sitemap</CardTitle>
            <CardDescription>
              Enter your website URL and configure options to generate an XML
              sitemap.
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxPages">Max Pages to Crawl</Label>
                <Input
                  id="maxPages"
                  type="number"
                  value={maxPages}
                  onChange={(e) => setMaxPages(e.target.value)}
                  min="1"
                  max="5000"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeImages}
                    onChange={(e) => setIncludeImages(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include image tags</span>
                </label>
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={loading || !url}>
              {loading ? "Generating..." : "Generate Sitemap"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sitemap for {result.siteUrl}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    Copy XML
                  </Button>
                  <Button size="sm" onClick={handleDownload}>
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.totalPages}</div>
                  <div className="text-sm text-gray-500">Pages Found</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">
                    {result.urls.filter((u) => u.priority >= 0.8).length}
                  </div>
                  <div className="text-sm text-gray-500">High Priority Pages</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Discovered URLs</h3>
                <div className="border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                      <tr>
                        <th className="text-left p-3">URL</th>
                        <th className="text-left p-3">Last Modified</th>
                        <th className="text-left p-3">Change Freq</th>
                        <th className="text-left p-3">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.urls.map((urlItem, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 max-w-xs truncate">
                            {urlItem.loc}
                          </td>
                          <td className="p-3 text-gray-500">
                            {urlItem.lastmod}
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{urlItem.changefreq}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={
                                urlItem.priority >= 0.8
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {urlItem.priority}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">XML Output Preview</h3>
                <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-xs max-h-64 overflow-y-auto">
                  {result.xmlOutput}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
