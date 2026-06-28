"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Input } from "@toolvault/ui";
import { Label } from "@toolvault/ui";
import { ArrowLeft } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "speed" | "volume";

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNITS: Record<Category, Record<string, UnitDef>> = {
  length: {
    m: { label: "Meters", toBase: (v) => v, fromBase: (v) => v },
    km: { label: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    cm: { label: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    mm: { label: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mi: { label: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    yd: { label: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    in: { label: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  },
  weight: {
    kg: { label: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
    g: { label: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mg: { label: "Milligrams", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    lb: { label: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    oz: { label: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  },
  temperature: {
    C: { label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    F: { label: "Fahrenheit", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
    K: { label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  speed: {
    ms: { label: "m/s", toBase: (v) => v, fromBase: (v) => v },
    kmh: { label: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { label: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    kn: { label: "Knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  },
  volume: {
    l: { label: "Liters", toBase: (v) => v, fromBase: (v) => v },
    ml: { label: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    gal: { label: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    qt: { label: "Quarts", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    cup: { label: "Cups", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  },
};

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  speed: "Speed",
  volume: "Volume",
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const unitKeys = useMemo(() => Object.keys(UNITS[category]), [category]);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const keys = Object.keys(UNITS[cat]);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
    setResult(null);
  };

  const calculate = () => {
    const v = parseFloat(inputValue);
    if (!v || isNaN(v)) return;
    const baseVal = UNITS[category][fromUnit].toBase(v);
    setResult(UNITS[category][toUnit].fromBase(baseVal));
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const reset = () => {
    setInputValue("");
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
            <CardTitle>Unit Converter</CardTitle>
            <CardDescription>Convert between different measurement units</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4">
              <div className="space-y-2">
                <Label htmlFor="from-unit">From</Label>
                <select
                  id="from-unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {unitKeys.map((k) => (
                    <option key={k} value={k}>{UNITS[category][k].label}</option>
                  ))}
                </select>
              </div>
              <Button variant="outline" size="icon" onClick={swap} className="mb-0.5">⇄</Button>
              <div className="space-y-2">
                <Label htmlFor="to-unit">To</Label>
                <select
                  id="to-unit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {unitKeys.map((k) => (
                    <option key={k} value={k}>{UNITS[category][k].label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="input-value">Value</Label>
              <Input id="input-value" type="number" placeholder="Enter value" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculate} className="flex-1">Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-1">Result</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.toLocaleString("en-US", { maximumFractionDigits: 6 })} {UNITS[category][toUnit].label}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {parseFloat(inputValue)} {UNITS[category][fromUnit].label} = {result.toLocaleString("en-US", { maximumFractionDigits: 6 })} {UNITS[category][toUnit].label}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
