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

interface DomainAuthorityResult {
  domain: string;
  domainAuthority: number;
  pageAuthority: number;
  spamScore: number;
  linkingDomains: number;
  inboundLinks: number;
  rankingKeywords: number;
  topKeywords: { keyword: string; position: number; volume: string }[];
  competitors: { domain: string; authority: number }[];
}

export default function DomainAuthorityPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainAuthorityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAuthorityColor = (score: number) => {
    if (score >= 60) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getAuthorityBadge = (score: number) => {
    if (score >= 60)
      return <Badge className="bg-green-500">Strong</Badge>;
    if (score >= 40)
      return <Badge className="bg-yellow-500">Moderate</Badge>;
    return <Badge className="bg-red-500">Weak</Badge>;
  };

  const handleCheck = async () => {
    if (!domain) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/seo/domain-authority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (!res.ok) throw new Error("Failed to check domain authority");
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
          <h1 className="text-3xl font-bold">Domain Authority Checker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Check your domain authority score and compare with competitors to
            understand your site's ranking potential.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Check Domain Authority</CardTitle>
            <CardDescription>
              Enter a domain name to analyze its authority metrics and competitive
              landscape.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <Button onClick={handleCheck} disabled={loading || !domain}>
              {loading ? "Checking..." : "Check Domain Authority"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Results for {result.domain}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className={`text-4xl font-bold ${getAuthorityColor(result.domainAuthority)}`}>
                    {result.domainAuthority}
                  </div>
                  <div className="text-sm text-gray-500">Domain Authority</div>
                  {getAuthorityBadge(result.domainAuthority)}
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl font-bold">{result.pageAuthority}</div>
                  <div className="text-sm text-gray-500">Page Authority</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl font-bold">{result.spamScore}%</div>
                  <div className="text-sm text-gray-500">Spam Score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl font-bold">{result.rankingKeywords}</div>
                  <div className="text-sm text-gray-500">Ranking Keywords</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500">Linking Domains</div>
                  <div className="text-2xl font-semibold">{result.linkingDomains.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500">Total Inbound Links</div>
                  <div className="text-2xl font-semibold">{result.inboundLinks.toLocaleString()}</div>
                </div>
              </div>

              {result.topKeywords.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Top Ranking Keywords</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          <th className="text-left p-3">Keyword</th>
                          <th className="text-left p-3">Position</th>
                          <th className="text-left p-3">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.topKeywords.map((kw, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3">{kw.keyword}</td>
                            <td className="p-3">
                              <Badge variant="outline">#{kw.position}</Badge>
                            </td>
                            <td className="p-3">{kw.volume}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {result.competitors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Competitor Domains</h3>
                  <div className="space-y-2">
                    {result.competitors.map((comp, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span className="font-medium">{comp.domain}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${comp.authority}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{comp.authority}</span>
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
