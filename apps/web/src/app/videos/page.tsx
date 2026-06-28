"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, Input } from "@toolvault/ui";
import { Video, Search, Play, Film, Download, Tv } from "lucide-react";

const trendingVideos = [
  { id: "1", title: "Building a SaaS in 2025", channel: "TechChannel", views: "1.2M", thumbnail: "https://picsum.photos/seed/v1/320/180" },
  { id: "2", title: "React 19 New Features", channel: "CodeAcademy", views: "890K", thumbnail: "https://picsum.photos/seed/v2/320/180" },
  { id: "3", title: "Next.js 15 Tutorial", channel: "DevMastery", views: "654K", thumbnail: "https://picsum.photos/seed/v3/320/180" },
  { id: "4", title: "TypeScript Tips", channel: "JSHeroes", views: "432K", thumbnail: "https://picsum.photos/seed/v4/320/180" },
  { id: "5", title: "AI in Web Development", channel: "FutureTech", views: "1.5M", thumbnail: "https://picsum.photos/seed/v5/320/180" },
  { id: "6", title: "CSS Grid Masterclass", channel: "DesignPro", views: "321K", thumbnail: "https://picsum.photos/seed/v6/320/180" },
];

export default function VideosPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Pro</Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link>
              <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-700">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Video className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Video Hub</h1>
          </div>
          <p className="text-gray-600">Watch trending videos, movies, and download content.</p>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Link href="/videos" className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium whitespace-nowrap">Trending</Link>
          <Link href="/videos/movies" className="px-4 py-2 bg-white border rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50">Movies</Link>
          <Link href="/videos/downloader" className="px-4 py-2 bg-white border rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50">Downloader</Link>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search videos..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingVideos.map((video) => (
            <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{video.channel}</p>
                <p className="text-xs text-gray-400">{video.views} views</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
