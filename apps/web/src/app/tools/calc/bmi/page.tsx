"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft } from "lucide-react";

type UnitSystem = "metric" | "imperial";

interface BMIResult {
  value: number;
  category: string;
  color: string;
}

function getBMICategory(bmi: number): BMIResult {
  if (bmi < 18.5) return { value: bmi, category: "Underweight", color: "text-blue-600 bg-blue-50" };
  if (bmi < 25) return { value: bmi, category: "Normal", color: "text-green-600 bg-green-50" };
  if (bmi < 30) return { value: bmi, category: "Overweight", color: "text-yellow-600 bg-yellow-50" };
  return { value: bmi, category: "Obese", color: "text-red-600 bg-red-50" };
}

export default function BMICalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculate = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unitSystem === "metric") {
      const cm = parseFloat(heightCm);
      weightInKg = parseFloat(weightKg);
      if (!cm || !weightInKg || cm <= 0 || weightInKg <= 0) return;
      heightInMeters = cm / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inc = parseFloat(heightIn) || 0;
      weightInKg = parseFloat(weightLbs) ? parseFloat(weightLbs) * 0.453592 : 0;
      if (ft <= 0 && inc <= 0) return;
      if (!weightInKg || weightInKg <= 0) return;
      heightInMeters = (ft * 0.3048) + (inc * 0.0254);
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setResult(getBMICategory(bmi));
  };

  const reset = () => {
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeightKg("");
    setWeightLbs("");
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
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>Calculate your Body Mass Index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Button variant={unitSystem === "metric" ? "default" : "outline"} onClick={() => setUnitSystem("metric")}>Metric</Button>
              <Button variant={unitSystem === "imperial" ? "default" : "outline"} onClick={() => setUnitSystem("imperial")}>Imperial</Button>
            </div>

            {unitSystem === "metric" ? (
              <div className="space-y-2">
                <Label htmlFor="height-cm">Height (cm)</Label>
                <Input id="height-cm" type="number" placeholder="e.g. 175" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height-ft">Height (ft)</Label>
                  <Input id="height-ft" type="number" placeholder="e.g. 5" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-in">Height (in)</Label>
                  <Input id="height-in" type="number" placeholder="e.g. 9" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="weight">{unitSystem === "metric" ? "Weight (kg)" : "Weight (lbs)"}</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unitSystem === "metric" ? "e.g. 70" : "e.g. 154"}
                value={unitSystem === "metric" ? weightKg : weightLbs}
                onChange={(e) => unitSystem === "metric" ? setWeightKg(e.target.value) : setWeightLbs(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Calculate BMI</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className={`rounded-xl p-6 text-center ${result.color}`}>
                <p className="text-sm font-medium mb-1">Your BMI</p>
                <p className="text-4xl font-bold">{result.value.toFixed(1)}</p>
                <p className="text-lg font-semibold mt-1">{result.category}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
