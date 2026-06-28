"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft } from "lucide-react";

interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

function calculateEMI(principal: number, annualRate: number, months: number): EMIResult {
  const monthlyRate = annualRate / 12 / 100;
  const emi = monthlyRate === 0
    ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  let balance = principal;
  const schedule: AmortizationRow[] = [];
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const principalPart = emi - interest;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interest;
    schedule.push({
      month: m,
      emi,
      interest,
      principal: principalPart,
      balance,
    });
  }

  return {
    emi,
    totalPayment: emi * months,
    totalInterest,
    schedule,
  };
}

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<EMIResult | null>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate);
    const N = parseFloat(tenure);
    if (!P || !R || !N || P <= 0 || R <= 0 || N <= 0) return;
    setResult(calculateEMI(P, R, N));
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
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
            <CardTitle>EMI Calculator</CardTitle>
            <CardDescription>Calculate your loan EMI and amortization schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <Input id="loan-amount" type="number" placeholder="e.g. 500000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (% per annum)</Label>
              <Input id="interest-rate" type="number" placeholder="e.g. 8.5" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Loan Tenure (months)</Label>
              <Input id="tenure" type="number" placeholder="e.g. 60" value={tenure} onChange={(e) => setTenure(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Calculate EMI</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                    <p className="text-xl font-bold text-blue-600">{fmt(result.emi)}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-amber-600">{fmt(result.totalInterest)}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Payment</p>
                    <p className="text-xl font-bold text-green-600">{fmt(result.totalPayment)}</p>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left">Month</th>
                        <th className="px-3 py-2 text-right">EMI</th>
                        <th className="px-3 py-2 text-right">Principal</th>
                        <th className="px-3 py-2 text-right">Interest</th>
                        <th className="px-3 py-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.month} className="border-t">
                          <td className="px-3 py-2">{row.month}</td>
                          <td className="px-3 py-2 text-right">{fmt(row.emi)}</td>
                          <td className="px-3 py-2 text-right">{fmt(row.principal)}</td>
                          <td className="px-3 py-2 text-right">{fmt(row.interest)}</td>
                          <td className="px-3 py-2 text-right">{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
