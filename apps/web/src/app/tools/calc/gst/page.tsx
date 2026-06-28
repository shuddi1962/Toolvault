"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft } from "lucide-react";

const GST_RATES = [5, 12, 18, 28];

interface GSTResult {
  gstAmount: number;
  netAmount: number;
  grossAmount: number;
}

function calculateGST(amount: number, rate: number, isInclusive: boolean): GSTResult {
  if (isInclusive) {
    const netAmount = amount / (1 + rate / 100);
    return {
      netAmount,
      gstAmount: amount - netAmount,
      grossAmount: amount,
    };
  }
  const gstAmount = amount * (rate / 100);
  return {
    gstAmount,
    netAmount: amount,
    grossAmount: amount + gstAmount,
  };
}

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function GSTCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);
  const [customRate, setCustomRate] = useState("");
  const [isInclusive, setIsInclusive] = useState(false);
  const [result, setResult] = useState<GSTResult | null>(null);

  const calculate = () => {
    const A = parseFloat(amount);
    const R = customRate ? parseFloat(customRate) : rate;
    if (!A || !R || A <= 0 || R <= 0) return;
    setResult(calculateGST(A, R, isInclusive));
  };

  const reset = () => {
    setAmount("");
    setRate(18);
    setCustomRate("");
    setIsInclusive(false);
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
            <CardTitle>GST Calculator</CardTitle>
            <CardDescription>Calculate GST inclusive or exclusive amounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="e.g. 1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>GST Rate (%)</Label>
              <div className="flex gap-2 flex-wrap">
                {GST_RATES.map((r) => (
                  <Button
                    key={r}
                    variant={rate === r && !customRate ? "default" : "outline"}
                    onClick={() => { setRate(r); setCustomRate(""); }}
                  >
                    {r}%
                  </Button>
                ))}
                <Input
                  type="number"
                  placeholder="Custom"
                  className="w-24"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mode</Label>
              <div className="flex gap-2">
                <Button variant={!isInclusive ? "default" : "outline"} onClick={() => setIsInclusive(false)}>Exclusive (Add GST)</Button>
                <Button variant={isInclusive ? "default" : "outline"} onClick={() => setIsInclusive(true)}>Inclusive (Remove GST)</Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Calculate GST</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">GST Amount</p>
                  <p className="text-xl font-bold text-blue-600">{fmt(result.gstAmount)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Net Amount</p>
                  <p className="text-xl font-bold text-gray-900">{fmt(result.netAmount)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Gross Amount</p>
                  <p className="text-xl font-bold text-green-600">{fmt(result.grossAmount)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
