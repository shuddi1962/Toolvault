"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { ArrowLeft, Calculator } from "lucide-react";

const calcTools = [
  { name: "BMI Calculator", href: "/tools/calc/bmi", icon: "⚖️", description: "Body Mass Index" },
  { name: "EMI Calculator", href: "/tools/calc/emi", icon: "🏦", description: "Loan EMI calculator" },
  { name: "SIP Calculator", href: "/tools/calc/sip", icon: "📈", description: "Systematic Investment" },
  { name: "GST Calculator", href: "/tools/calc/gst", icon: "💰", description: "GST/VAT calculator" },
  { name: "Currency Converter", href: "/tools/calc/currency", icon: "💵", description: "Exchange rates" },
  { name: "Age Calculator", href: "/tools/calc/age", icon: "🎂", description: "Calculate age" },
  { name: "Unit Converter", href: "/tools/calc/units", icon: "📏", description: "Length, weight, temp" },
  { name: "Time Zone Converter", href: "/tools/calc/timezone", icon: "🌍", description: "World time zones" },
];

export default function CalcToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
            <div className="flex items-center gap-4"><Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link></div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tools
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">Calculators</h1>
          </div>
          <p className="text-gray-600">Free online calculators for everyday use.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {calcTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <span className="text-3xl mb-2 block">{tool.icon}</span>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
