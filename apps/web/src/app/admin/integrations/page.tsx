"use client";

import { useState } from "react";
import { Card, CardContent } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Key, Check, X, ExternalLink, RefreshCw } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  configured: boolean;
  envKey: string;
  docsUrl: string;
}

const integrations: Integration[] = [
  { id: "stripe", name: "Stripe", description: "Payment processing for Pro/Business plans", icon: "💳", category: "Payments", configured: false, envKey: "STRIPE_SECRET_KEY", docsUrl: "https://stripe.com/docs" },
  { id: "supabase", name: "Supabase", description: "Database, Auth, and Storage", icon: "⚡", category: "Backend", configured: true, envKey: "SUPABASE_URL", docsUrl: "https://supabase.com/docs" },
  { id: "anthropic", name: "Anthropic (Claude)", description: "AI content generation and editing", icon: "🧠", category: "AI", configured: false, envKey: "ANTHROPIC_API_KEY", docsUrl: "https://docs.anthropic.com" },
  { id: "removebg", name: "Remove.bg", description: "AI background removal from images", icon: "🖼️", category: "Image", configured: false, envKey: "REMOVE_BG_API_KEY", docsUrl: "https://www.remove.bg/api" },
  { id: "claid", name: "Claid.ai", description: "AI image upscaling and enhancement", icon: "✨", category: "Image", configured: false, envKey: "CLAID_API_KEY", docsUrl: "https://claid.ai" },
  { id: "aws-s3", name: "AWS S3", description: "Cloud file storage", icon: "☁️", category: "Storage", configured: false, envKey: "AWS_ACCESS_KEY_ID", docsUrl: "https://aws.amazon.com/s3" },
  { id: "resend", name: "Resend", description: "Transactional email delivery", icon: "📧", category: "Email", configured: false, envKey: "RESEND_API_KEY", docsUrl: "https://resend.com" },
  { id: "hellosign", name: "HelloSign", description: "E-signature integration", icon: "✍️", category: "Legal", configured: false, envKey: "HELLOSIGN_API_KEY", docsUrl: "https://hellosign.com" },
  { id: "openai", name: "OpenAI", description: "GPT-powered features", icon: "🤖", category: "AI", configured: false, envKey: "OPENAI_API_KEY", docsUrl: "https://platform.openai.com" },
  { id: "cloudinary", name: "Cloudinary", description: "Image/video optimization CDN", icon: "🎬", category: "Media", configured: false, envKey: "CLOUDINARY_CLOUD_NAME", docsUrl: "https://cloudinary.com" },
  { id: "youtube", name: "YouTube Data API", description: "Trending videos and search", icon: "📺", category: "Media", configured: false, envKey: "YOUTUBE_DATA_API_KEY", docsUrl: "https://developers.google.com/youtube" },
  { id: "deepl", name: "DeepL", description: "Professional translation API", icon: "🌍", category: "AI", configured: false, envKey: "DEEPL_API_KEY", docsUrl: "https://deepl.com" },
];

export default function AdminIntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", ...new Set(integrations.map((i) => i.category))];
  const filtered = selectedCategory === "all" ? integrations : integrations.filter((i) => i.category === selectedCategory);
  const configuredCount = integrations.filter((i) => i.configured).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-gray-400 text-sm">
            {configuredCount}/{integrations.length} configured
          </p>
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh Status
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Integration Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((integration) => (
          <Card key={integration.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{integration.name}</h3>
                    <p className="text-xs text-gray-500">{integration.category}</p>
                  </div>
                </div>
                {integration.configured ? (
                  <span className="flex items-center gap-1 text-xs text-green-400 bg-green-600/20 px-2 py-0.5 rounded-full">
                    <Check className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                    <X className="h-3 w-3" /> Not Set
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-4">{integration.description}</p>
              <div className="flex items-center justify-between">
                <code className="text-[10px] text-gray-600 bg-gray-800 px-2 py-1 rounded">{integration.envKey}</code>
                <a
                  href={integration.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  Docs <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Summary */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Configuration Status</h3>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xl font-bold text-green-400">{configuredCount}</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xl font-bold text-gray-400">{integrations.length - configuredCount}</p>
              <p className="text-xs text-gray-500">Not Configured</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xl font-bold text-blue-400">{categories.length - 1}</p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xl font-bold text-white">{integrations.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
