"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, Input } from "@toolvault/ui";
import { ArrowLeft, TrendingUp, Play, Heart, ExternalLink } from "lucide-react";

const trendingVideos = [
  { id: 1, title: "Building a SaaS in 24 Hours", channel: "Fireship", views: "1.2M", time: "2 days ago", thumbnail: "https://picsum.photos/seed/saas/400/225", duration: "12:34" },
  { id: 2, title: "Why Rust is the Future", channel: "Primeagen", views: "890K", time: "5 days ago", thumbnail: "https://picsum.photos/seed/rust/400/225", duration: "18:22" },
  { id: 3, title: "AI Will Change Everything", channel: "Two Minute Papers", views: "2.1M", time: "1 day ago", thumbnail: "https://picsum.photos/seed/ai/400/225", duration: "8:45" },
  { id: 4, title: "The Art of Code", channel: "Dave Xiang", views: "450K", time: "1 week ago", thumbnail: "https://picsum.photos/seed/code/400/225", duration: "22:10" },
  { id: 5, title: "Web Dev in 2026", channel: "Traversy Media", views: "1.5M", time: "3 days ago", thumbnail: "https://picsum.photos/seed/webdev/400/225", duration: "15:30" },
  { id: 6, title: "Linux for Beginners", channel: "NetworkChuck", views: "3.2M", time: "4 days ago", thumbnail: "https://picsum.photos/seed/linux/400/225", duration: "25:18" },
];

export default function TrendingVideosPage() {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

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
        <Link href="/videos" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Videos
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Trending Videos</h1>
          </div>
          <p className="text-gray-600">Discover what&apos;s trending across YouTube and other platforms.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingVideos.map((video) => (
            <Card key={video.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">{video.duration}</span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{video.channel}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{video.views} views &middot; {video.time}</span>
                  <div className="flex gap-1">
                    <button onClick={() => toggleLike(video.id)} className="p-1.5 rounded hover:bg-gray-100">
                      <Heart className={`h-4 w-4 ${liked.includes(video.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                    </button>
                    <Link href="/videos/downloader" className="p-1.5 rounded hover:bg-gray-100">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
