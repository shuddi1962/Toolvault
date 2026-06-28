"use client";

import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@toolvault/ui";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic tools",
    features: [
      "5 operations per day",
      "10MB max file size",
      "Basic AI credits (50/mo)",
      "Ad-supported",
      "1 legal policy",
      "3 eSign requests/mo",
    ],
    cta: "Start Free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For freelancers and creators",
    features: [
      "Unlimited operations",
      "500MB max file size",
      "1,500 AI credits/mo",
      "No ads",
      "5GB cloud storage",
      "4K video downloads",
      "Unlimited eSign",
      "Full music library",
    ],
    cta: "Get Pro",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "2GB max file size",
      "Unlimited AI credits",
      "25GB cloud storage",
      "Up to 10 team seats",
      "API access (10k calls/mo)",
      "Custom branding",
      "White-label documents",
      "Priority support",
    ],
    cta: "Get Business",
    href: "/signup?plan=business",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ToolVault Pro
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">
                Sign in
              </Link>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to all 15 modules.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">All Plans Include</h2>
          <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto text-sm text-gray-600">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">15 Modules</h3>
              <p>PDF, Conversion, AI, Images, SEO, Dev Tools, and more</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Free APIs</h3>
              <p>YouTube, Deezer, TMDB, and more included at no extra cost</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">7-Day Trial</h3>
              <p>Try Pro or Business free for 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
