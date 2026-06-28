import Link from "next/link";
import { Button } from "@toolvault/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen">
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Digital Toolkit
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            15 powerful modules in one subscription. PDF tools, file conversion, AI editing,
            image tools, SEO utilities, and more. Replace 5-10 separate tools.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "PDF Suite", description: "Merge, split, compress, OCR, and more" },
              { title: "File Conversion", description: "Convert between any format" },
              { title: "AI Content Tools", description: "Generate articles, emails, and more" },
              { title: "Image Tools", description: "Edit, compress, upscale, and remove backgrounds" },
              { title: "SEO Tools", description: "Page speed, backlinks, domain analysis" },
              { title: "Developer Utilities", description: "JSON, Base64, regex, and more" },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "$0", features: ["5 ops/day", "10MB max", "Ad-supported"] },
              { name: "Pro", price: "$9/mo", features: ["Unlimited ops", "500MB storage", "No ads"] },
              { name: "Business", price: "$29/mo", features: ["Team seats", "API access", "Custom branding"] },
            ].map((plan) => (
              <div key={plan.name} className="p-6 rounded-xl border bg-white">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-gray-600">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 ToolVault Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
