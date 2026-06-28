"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: { date: string; daysAway: number };
}

function calculateAge(dob: Date): AgeResult {
  const today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));

  const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysAway = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday: {
      date: nextBirthday.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      daysAway,
    },
  };
}

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculate = () => {
    if (!dob) return;
    const date = new Date(dob);
    if (isNaN(date.getTime()) || date > new Date()) return;
    setResult(calculateAge(date));
  };

  const reset = () => {
    setDob("");
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
            <CardTitle>Age Calculator</CardTitle>
            <CardDescription>Calculate your exact age from date of birth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Calculate Age</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Years</p>
                    <p className="text-3xl font-bold text-blue-600">{result.years}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Months</p>
                    <p className="text-3xl font-bold text-purple-600">{result.months}</p>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Days</p>
                    <p className="text-3xl font-bold text-teal-600">{result.days}</p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Total Days Lived</p>
                  <p className="text-xl font-bold text-gray-900">{result.totalDays.toLocaleString()}</p>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Next Birthday</p>
                  <p className="font-semibold text-gray-900">{result.nextBirthday.date}</p>
                  <p className="text-sm text-amber-600 font-medium">
                    {result.nextBirthday.daysAway === 0 ? "It's today!" : `${result.nextBirthday.daysAway} days away`}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
