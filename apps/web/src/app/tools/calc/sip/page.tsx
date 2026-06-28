"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft } from "lucide-react";

interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

function calculateSIP(monthly: number, annualRate: number, years: number): SIPResult {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  const futureValue = monthlyRate === 0
    ? monthly * months
    : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

  const investedAmount = monthly * months;
  return {
    investedAmount,
    estimatedReturns: futureValue - investedAmount,
    totalValue: futureValue,
  };
}

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function SIPCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [result, setResult] = useState<SIPResult | null>(null);

  const calculate = () => {
    const M = parseFloat(monthlyInvestment);
    const R = parseFloat(returnRate);
    const T = parseFloat(timePeriod);
    if (!M || !R || !T || M <= 0 || R <= 0 || T <= 0) return;
    setResult(calculateSIP(M, R, T));
  };

  const reset = () => {
    setMonthlyInvestment("");
    setReturnRate("");
    setTimePeriod("");
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
            <CardTitle>SIP Calculator</CardTitle>
            <CardDescription>Estimate returns on your Systematic Investment Plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthly-investment">Monthly Investment Amount</Label>
              <Input id="monthly-investment" type="number" placeholder="e.g. 5000" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="return-rate">Expected Annual Return Rate (%)</Label>
              <Input id="return-rate" type="number" placeholder="e.g. 12" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-period">Time Period (years)</Label>
              <Input id="time-period" type="number" placeholder="e.g. 10" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Calculate SIP</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Invested Amount</p>
                    <p className="text-lg font-bold text-gray-900">{fmt(result.investedAmount)}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Est. Returns</p>
                    <p className="text-lg font-bold text-green-600">{fmt(result.estimatedReturns)}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Value</p>
                    <p className="text-lg font-bold text-blue-600">{fmt(result.totalValue)}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="flex h-full">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${(result.investedAmount / result.totalValue) * 100}%` }}
                    />
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${(result.estimatedReturns / result.totalValue) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-600 rounded-full inline-block" /> Invested</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Returns</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
