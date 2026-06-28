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

interface Backlink {
  sourceUrl: string;
  sourceDomain: string;
  anchorText: string;
  linkType: "dofollow" | "nofollow";
  domainAuthority: number;
  firstSeen: string;
}

interface BacklinksResult {
  url: string;
  totalBacklinks: number;
  referringDomains: number;
  dofollowCount: number;
  nofollowCount: number;
  topBacklinks: Backlink[];
}

export default function BacklinksPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BacklinksResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/seo/backlinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to fetch backlinks");
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
          <h1 className="text-3xl font-bold">Backlink Checker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze your backlink profile to understand your link building efforts
            and identify opportunities for improvement.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Check Backlinks</CardTitle>
            <CardDescription>
              Enter a URL to analyze its backlink profile including referring
              domains, anchor text, and link quality.
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
            <Button onClick={handleCheck} disabled={loading || !url}>
              {loading ? "Analyzing..." : "Check Backlinks"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Backlink Profile for {result.url}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.totalBacklinks.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total Backlinks</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.referringDomains.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Referring Domains</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{result.dofollowCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Dofollow Links</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-gray-500">{result.nofollowCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Nofollow Links</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Link Distribution</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-l-full"
                    style={{
                      width: `${(result.dofollowCount / result.totalBacklinks) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full" />
                    Dofollow ({((result.dofollowCount / result.totalBacklinks) * 100).toFixed(1)}%)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-400 rounded-full" />
                    Nofollow ({((result.nofollowCount / result.totalBacklinks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              {result.topBacklinks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Top Backlinks</h3>
                  <div className="space-y-3">
                    {result.topBacklinks.map((backlink, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <a
                            href={backlink.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline truncate"
                          >
                            {backlink.sourceUrl}
                          </a>
                          <Badge
                            variant={backlink.linkType === "dofollow" ? "default" : "secondary"}
                          >
                            {backlink.linkType}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Domain: {backlink.sourceDomain}</span>
                          <span>DA: {backlink.domainAuthority}</span>
                          <span>Anchor: "{backlink.anchorText}"</span>
                          <span>First seen: {backlink.firstSeen}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
