"use client";

import Link from "next/link";
import { Card, CardContent } from "@toolvault/ui";
import { Users, DollarSign, Activity, Database, Settings, BarChart3 } from "lucide-react";

const stats = [
  { name: "Total Users", value: "0", icon: Users, color: "text-blue-600" },
  { name: "MRR", value: "$0", icon: DollarSign, color: "text-green-600" },
  { name: "Operations Today", value: "0", icon: Activity, color: "text-purple-600" },
  { name: "Storage Used", value: "0 GB", icon: Database, color: "text-orange-600" },
];

const adminLinks = [
  { name: "Users", href: "/admin/users", icon: Users, description: "Manage user accounts" },
  { name: "API Usage", href: "/admin/api-usage", icon: BarChart3, description: "Track API costs" },
  { name: "Feature Flags", href: "/admin/features", icon: Settings, description: "Toggle tool availability" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">ToolVault Admin</Link>
            <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">Back to App</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-500">{stat.name}</p><p className="text-2xl font-bold">{stat.value}</p></div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-4">Admin Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {adminLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <link.icon className="h-8 w-8 text-gray-600" />
                    <div><h3 className="font-semibold">{link.name}</h3><p className="text-sm text-gray-500">{link.description}</p></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
