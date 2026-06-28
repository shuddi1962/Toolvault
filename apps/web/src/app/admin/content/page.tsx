"use client";

import { useState } from "react";
import { Card, CardContent } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { FileText, Plus, Edit, Trash2, Eye, Save } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  type: "landing" | "legal" | "help" | "custom";
  status: "published" | "draft";
  lastUpdated: string;
}

const defaultPages: Page[] = [
  { id: "1", title: "Homepage", slug: "/", type: "landing", status: "published", lastUpdated: "2026-06-28" },
  { id: "2", title: "Pricing", slug: "/pricing", type: "landing", status: "published", lastUpdated: "2026-06-28" },
  { id: "3", title: "Tools Index", slug: "/tools", type: "landing", status: "published", lastUpdated: "2026-06-28" },
  { id: "4", title: "Privacy Policy", slug: "/legal/privacy", type: "legal", status: "draft", lastUpdated: "2026-06-28" },
  { id: "5", title: "Terms of Service", slug: "/legal/terms", type: "legal", status: "draft", lastUpdated: "2026-06-28" },
  { id: "6", title: "Cookie Policy", slug: "/legal/cookies", type: "legal", status: "draft", lastUpdated: "2026-06-28" },
  { id: "7", title: "Help Center", slug: "/help", type: "help", status: "draft", lastUpdated: "2026-06-28" },
];

export default function AdminContentPage() {
  const [pages] = useState<Page[]>(defaultPages);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? pages : pages.filter((p) => p.type === filter);

  const typeColors: Record<string, string> = {
    landing: "bg-blue-600/20 text-blue-400",
    legal: "bg-yellow-600/20 text-yellow-400",
    help: "bg-green-600/20 text-green-400",
    custom: "bg-purple-600/20 text-purple-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="text-gray-400 text-sm">{pages.length} pages</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> New Page
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "landing", "legal", "help", "custom"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === t
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {t === "all" ? "All Pages" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Pages Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Page</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Last Updated</th>
                  <th className="text-right px-4 py-3 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-white font-medium">{page.title}</p>
                          <p className="text-xs text-gray-500">{page.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[page.type]}`}>
                        {page.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          page.status === "published"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-gray-600/20 text-gray-400"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{page.lastUpdated}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-gray-700 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="h-3 w-3 mr-1" /> View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-gray-700 text-gray-300 hover:bg-gray-700"
                        >
                          <Edit className="h-3 w-3 mr-1" /> Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{pages.filter((p) => p.status === "published").length}</p>
            <p className="text-xs text-gray-500">Published</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{pages.filter((p) => p.status === "draft").length}</p>
            <p className="text-xs text-gray-500">Drafts</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{pages.filter((p) => p.type === "legal").length}</p>
            <p className="text-xs text-gray-500">Legal Pages</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">70+</p>
            <p className="text-xs text-gray-500">Tool Pages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
