"use client";

import Link from "next/link";
import {
  FileText,
  Upload,
  Clock,
  CreditCard,
  Settings,
  ArrowRight,
  HardDrive,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from "@toolvault/ui";
import { formatBytes, formatNumber } from "@toolvault/utils";

const quickTools = [
  { name: "PDF Merge", href: "/tools/pdf/merge", icon: FileText },
  { name: "Image Compress", href: "/tools/image/compress", icon: Upload },
  { name: "QR Generator", href: "/tools/image/qr-code", icon: Upload },
  { name: "JSON Formatter", href: "/tools/dev/json-formatter", icon: Settings },
];

const stats = [
  { name: "Storage Used", value: "0 MB", limit: "100 MB", icon: HardDrive, color: "text-blue-600" },
  { name: "AI Credits", value: "0 / 50", limit: "50 credits", icon: Zap, color: "text-purple-600" },
  { name: "Operations Today", value: "0 / 5", limit: "5 per day", icon: TrendingUp, color: "text-green-600" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to ToolVault Pro</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.limit}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tools</CardTitle>
          <CardDescription>Access your most used tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {quickTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <tool.icon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium">{tool.name}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Files */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>Your recently processed files</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/files">View all</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No files yet. Start by using a tool!</p>
            <Button className="mt-4" asChild>
              <Link href="/tools">Browse Tools</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Upgrade to Pro</h3>
              <p className="text-blue-100">
                Get unlimited access to all tools, 500MB storage, and no ads.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/pricing">View Plans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
