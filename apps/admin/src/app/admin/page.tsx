"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import {
  Users,
  DollarSign,
  Activity,
  Database,
  Settings,
  BarChart3,
  Shield,
  Loader2,
  ArrowLeft,
  Search,
  Crown,
  UserX,
  UserCheck,
} from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: string;
  ai_credits_used: number;
  ai_credits_limit: number;
  created_at: string;
}

interface Stats {
  totalUsers: number;
  proUsers: number;
  businessUsers: number;
  freeUsers: number;
  mrr: number;
  totalOperations: number;
  totalStorage: number;
  totalFiles: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "users">("overview");

  const supabase = createClient();
  const SUPER_ADMIN_EMAILS = ["admin@toolvault.com"];

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !SUPER_ADMIN_EMAILS.includes(user.email ?? "")) {
      router.push("/dashboard");
      return;
    }
    setIsAdmin(true);
    await loadData();
  };

  const loadData = async () => {
    setLoading(true);

    const [profilesRes, operationsRes, filesRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("operations").select("id", { count: "exact" }),
      supabase.from("files").select("id, size_bytes", { count: "exact" }),
    ]);

    const profiles = (profilesRes.data ?? []) as Profile[];
    const proUsers = profiles.filter((p) => p.plan === "pro").length;
    const businessUsers = profiles.filter((p) => p.plan === "business").length;
    const totalStorage = (filesRes.data ?? []).reduce(
      (acc: number, f: any) => acc + (f.size_bytes ?? 0),
      0
    );

    setStats({
      totalUsers: profiles.length,
      proUsers,
      businessUsers,
      freeUsers: profiles.length - proUsers - businessUsers,
      mrr: proUsers * 9.99 + businessUsers * 29.99,
      totalOperations: operationsRes.count ?? 0,
      totalStorage,
      totalFiles: filesRes.count ?? 0,
    });

    setUsers(profiles);
    setLoading(false);
  };

  const handleUpdatePlan = async (userId: string, newPlan: string) => {
    const limits: Record<string, number> = { free: 50, pro: 200, business: 1000 };
    await supabase
      .from("profiles")
      .update({ plan: newPlan, ai_credits_limit: limits[newPlan] ?? 50 })
      .eq("id", userId);
    await loadData();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold text-red-600">Super Admin</span>
              </div>
            </div>
            <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">
              Back to App
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant={activeTab === "overview" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("users")}
            >
              Users ({users.length})
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : activeTab === "overview" ? (
          <>
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold">{stats?.totalUsers ?? 0}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">MRR</p>
                      <p className="text-2xl font-bold">${(stats?.mrr ?? 0).toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Operations</p>
                      <p className="text-2xl font-bold">{stats?.totalOperations ?? 0}</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Storage</p>
                      <p className="text-2xl font-bold">{formatBytes(stats?.totalStorage ?? 0)}</p>
                    </div>
                    <Database className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500">Pro Users</p>
                  <p className="text-xl font-bold text-blue-600">{stats?.proUsers ?? 0}</p>
                  <p className="text-xs text-gray-400">$9.99/mo each</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500">Business Users</p>
                  <p className="text-xl font-bold text-purple-600">{stats?.businessUsers ?? 0}</p>
                  <p className="text-xs text-gray-400">$29.99/mo each</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500">Free Users</p>
                  <p className="text-xl font-bold text-gray-600">{stats?.freeUsers ?? 0}</p>
                  <p className="text-xs text-gray-400">No revenue</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/admin/users">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">User Management</h3>
                      <p className="text-sm text-gray-500">View and manage all users</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin/features">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Settings className="h-8 w-8 text-gray-600" />
                    <div>
                      <h3 className="font-semibold">Feature Flags</h3>
                      <p className="text-sm text-gray-500">Toggle tool availability</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin/api-usage">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex items-center gap-4">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">API Usage</h3>
                      <p className="text-sm text-gray-500">Track costs and usage</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by email or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">User</th>
                        <th className="text-left px-4 py-3 font-medium">Plan</th>
                        <th className="text-left px-4 py-3 font-medium">Credits</th>
                        <th className="text-left px-4 py-3 font-medium">Joined</th>
                        <th className="text-left px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{user.full_name ?? "Unnamed"}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.plan === "business"
                                  ? "bg-purple-100 text-purple-800"
                                  : user.plan === "pro"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.plan === "business" && <Crown className="h-3 w-3 mr-1" />}
                              {user.plan.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {user.ai_credits_used}/{user.ai_credits_limit}
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {user.plan !== "pro" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdatePlan(user.id, "pro")}
                                >
                                  <UserCheck className="h-3 w-3 mr-1" /> Pro
                                </Button>
                              )}
                              {user.plan !== "business" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdatePlan(user.id, "business")}
                                >
                                  <Crown className="h-3 w-3 mr-1" /> Business
                                </Button>
                              )}
                              {user.plan !== "free" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdatePlan(user.id, "free")}
                                >
                                  <UserX className="h-3 w-3 mr-1" /> Free
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
