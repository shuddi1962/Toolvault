"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import {
  FileText,
  Image,
  Brain,
  Pen,
  Search,
  Music,
  Video,
  Code,
  Calculator,
  Wand2,
  Save,
  RotateCcw,
} from "lucide-react";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  category: string;
}

const defaultFlags: FeatureFlag[] = [
  { id: "pdf", name: "PDF Tools", description: "Merge, split, compress, rotate, protect, watermark, OCR", icon: FileText, enabled: true, category: "Core" },
  { id: "convert", name: "File Conversion", description: "Word/PDF, Excel/PDF, Image conversion", icon: RotateCcw, enabled: true, category: "Core" },
  { id: "image", name: "Image Tools", description: "Compress, upscale, remove BG, QR code, resize", icon: Image, enabled: true, category: "Core" },
  { id: "ai", name: "AI Content", description: "Article writer, email writer, meta tags, grammar, rewriter", icon: Brain, enabled: true, category: "AI" },
  { id: "ai-editor", name: "AI Document Editor", description: "Receipt, invoice, document, email editor", icon: Wand2, enabled: true, category: "AI" },
  { id: "esign", name: "eSign & Legal", description: "E-signature, legal document generator", icon: Pen, enabled: true, category: "Business" },
  { id: "seo", name: "SEO Tools", description: "Page speed, DA, backlinks, meta analyzer, keyword density", icon: Search, enabled: true, category: "Marketing" },
  { id: "music", name: "Music Hub", description: "Trending tracks, vocal remover, song recognition", icon: Music, enabled: true, category: "Media" },
  { id: "video", name: "Video Hub", description: "Trending videos, video downloader, movies", icon: Video, enabled: true, category: "Media" },
  { id: "audio-editor", name: "Audio Editor", description: "Trim, merge, convert, speed, volume, extract", icon: Music, enabled: true, category: "Media" },
  { id: "video-editor", name: "Video Editor", description: "Trim, merge, subtitles, GIF maker, text overlay", icon: Video, enabled: true, category: "Media" },
  { id: "dev", name: "Dev Tools", description: "JSON, Base64, regex, password, hash, diff, markdown", icon: Code, enabled: true, category: "Developer" },
  { id: "calc", name: "Calculators", description: "BMI, EMI, SIP, GST, currency, age, units, timezone", icon: Calculator, enabled: true, category: "Utility" },
];

export default function AdminFeaturesPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [saved, setSaved] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const stored = localStorage.getItem("toolvault_feature_flags");
    if (stored) {
      setFlags(JSON.parse(stored));
    } else {
      setFlags(defaultFlags);
    }
  }, []);

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("toolvault_feature_flags", JSON.stringify(flags));
    setSaved(true);
  };

  const handleReset = () => {
    setFlags(defaultFlags);
    localStorage.removeItem("toolvault_feature_flags");
    setSaved(true);
  };

  const categories = ["all", ...new Set(flags.map((f) => f.category))];
  const filtered = selectedCategory === "all" ? flags : flags.filter((f) => f.category === selectedCategory);
  const enabledCount = flags.filter((f) => f.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Feature Flags</h1>
          <p className="text-gray-400 text-sm">
            {enabledCount}/{flags.length} features enabled
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <Button
            className={`bg-red-600 hover:bg-red-700 text-white ${saved ? "opacity-50" : ""}`}
            onClick={handleSave}
            disabled={saved}
          >
            <Save className="h-4 w-4 mr-2" /> {saved ? "Saved" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Category filters */}
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

      {/* Feature Grid */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((flag) => {
          const Icon = flag.icon;
          return (
            <Card
              key={flag.id}
              className={`bg-gray-900 border transition-all cursor-pointer ${
                flag.enabled ? "border-gray-700 hover:border-gray-600" : "border-gray-800 opacity-60"
              }`}
              onClick={() => toggleFlag(flag.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${flag.enabled ? "bg-red-600/20" : "bg-gray-800"}`}>
                      <Icon className={`h-5 w-5 ${flag.enabled ? "text-red-400" : "text-gray-600"}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{flag.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{flag.description}</p>
                    </div>
                  </div>
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      flag.enabled ? "bg-red-600" : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        flag.enabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-[10px] text-gray-600 bg-gray-800 px-2 py-0.5 rounded">{flag.category}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!saved && (
        <div className="fixed bottom-6 right-6 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-sm">Unsaved changes</span>
          <Button size="sm" className="bg-yellow-700 hover:bg-yellow-800 h-7" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
