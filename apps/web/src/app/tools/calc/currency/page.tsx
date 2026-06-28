"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
];

// Placeholder exchange rates (relative to USD)
const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  INR: 83.12,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  SGD: 1.34,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState<{ converted: number; rate: number } | null>(null);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const calculate = () => {
    const A = parseFloat(amount);
    if (!A || A <= 0) return;
    const rate = RATES[toCurrency] / RATES[fromCurrency];
    setResult({ converted: A * rate, rate });
  };

  const reset = () => {
    setAmount("");
    setFromCurrency("USD");
    setToCurrency("INR");
    setResult(null);
  };

  const fromInfo = CURRENCIES.find((c) => c.code === fromCurrency)!;
  const toInfo = CURRENCIES.find((c) => c.code === toCurrency)!;

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
            <CardTitle>Currency Converter</CardTitle>
            <CardDescription>Convert between world currencies using placeholder rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="e.g. 100" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <select
                  id="from"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
              <Button variant="outline" size="icon" onClick={swap} className="mb-0.5">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <select
                  id="to"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-1">Converted Amount</p>
                <p className="text-3xl font-bold text-blue-600">
                  {toInfo.symbol}{result.converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  1 {fromCurrency} = {result.rate.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {toCurrency}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
