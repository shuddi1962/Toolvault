"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";

const TIMEZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)" },
  { value: "America/Denver", label: "Denver (MST/MDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Seoul", label: "Seoul (KST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
];

function formatInTimezone(date: Date, tz: string): string {
  return date.toLocaleString("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getTimezoneAbbr(tz: string): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(new Date());
  return parts.find((p) => p.type === "timeZoneName")?.value || tz;
}

export default function TimezoneConverterPage() {
  const [fromTz, setFromTz] = useState("America/New_York");
  const [toTz, setToTz] = useState("Asia/Kolkata");
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });
  const [result, setResult] = useState<{ converted: string; fromAbbr: string; toAbbr: string } | null>(null);

  const swap = () => {
    setFromTz(toTz);
    setToTz(fromTz);
    setResult(null);
  };

  const calculate = () => {
    if (!dateTime) return;
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return;
    setResult({
      converted: formatInTimezone(date, toTz),
      fromAbbr: getTimezoneAbbr(fromTz),
      toAbbr: getTimezoneAbbr(toTz),
    });
  };

  const reset = () => {
    setFromTz("America/New_York");
    setToTz("Asia/Kolkata");
    setDateTime(new Date().toISOString().slice(0, 16));
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/tools/calc" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Calculators
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Timezone Converter</CardTitle>
            <CardDescription>Convert date and time between world timezones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4">
              <div className="space-y-2">
                <Label htmlFor="from-tz">From</Label>
                <select
                  id="from-tz"
                  value={fromTz}
                  onChange={(e) => setFromTz(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
              <Button variant="outline" size="icon" onClick={swap} className="mb-0.5">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor="to-tz">To</Label>
                <select
                  id="to-tz"
                  value={toTz}
                  onChange={(e) => setToTz(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="datetime">Date & Time</Label>
              <Input id="datetime" type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Convert Time</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Original Time ({result.fromAbbr})</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatInTimezone(new Date(dateTime), fromTz)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Converted Time ({result.toAbbr})</p>
                  <p className="text-2xl font-bold text-blue-600">{result.converted}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
