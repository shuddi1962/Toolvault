"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, Input } from "@toolvault/ui";
import { Music, Search, Play, Heart, Download } from "lucide-react";

const trendingTracks = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", cover: "https://picsum.photos/seed/1/100/100" },
  { id: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", cover: "https://picsum.photos/seed/2/100/100" },
  { id: 3, title: "Stay", artist: "The Kid LAROI, Justin Bieber", album: "F*CK LOVE 3", cover: "https://picsum.photos/seed/3/100/100" },
  { id: 4, title: "Peaches", artist: "Justin Bieber", album: "Justice", cover: "https://picsum.photos/seed/4/100/100" },
  { id: 5, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", cover: "https://picsum.photos/seed/5/100/100" },
  { id: 6, title: "Montero", artist: "Lil Nas X", album: "Montero", cover: "https://picsum.photos/seed/6/100/100" },
];

export default function MusicPage() {
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState<number | null>(null);

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
            <Music className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Music Hub</h1>
          </div>
          <p className="text-gray-600">Discover, stream, and save music from multiple sources.</p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search artists, songs, albums..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trendingTracks.map((track) => (
              <Card key={track.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img src={track.cover} alt={track.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                      <p className="text-xs text-gray-400">{track.album}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPlaying(playing === track.id ? null : track.id)} className="p-2 rounded-full hover:bg-gray-100">
                        <Play className={`h-5 w-5 ${playing === track.id ? "text-pink-600" : "text-gray-600"}`} />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <Heart className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <span className="text-3xl mb-2 block">🎵</span>
              <h3 className="font-semibold">Vocal Remover</h3>
              <p className="text-sm text-gray-500">Remove vocals from songs</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <span className="text-3xl mb-2 block">🔍</span>
              <h3 className="font-semibold">Song Recognition</h3>
              <p className="text-sm text-gray-500">Identify any song</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <span className="text-3xl mb-2 block">📥</span>
              <h3 className="font-semibold">Music Downloader</h3>
              <p className="text-sm text-gray-500">Download from URL</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
