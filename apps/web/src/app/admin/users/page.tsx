"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@toolvault/ui";
import { Button } from "@toolvault/ui";
import { Search, Crown, UserCheck, UserX, Mail, Trash2, MoreVertical } from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: string;
  ai_credits_used: number;
  ai_credits_limit: number;
  created_at: string;
  stripe_customer_id: string | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers((data ?? []) as Profile[]);
    setLoading(false);
  };

  const handlePlanChange = async (userId: string, newPlan: string) => {
    const limits: Record<string, number> = { free: 50, pro: 200, business: 1000 };
    await supabase
      .from("profiles")
      .update({ plan: newPlan, ai_credits_limit: limits[newPlan] ?? 50 })
      .eq("id", userId);
    await loadUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await supabase.from("profiles").delete().eq("id", userId);
    await loadUsers();
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.full_name?.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = planFilter === "all" || u.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 text-sm">{users.length} total users</p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg">
            Free: {users.filter((u) => u.plan === "free").length}
          </span>
          <span className="text-blue-400 bg-blue-600/20 px-3 py-1.5 rounded-lg">
            Pro: {users.filter((u) => u.plan === "pro").length}
          </span>
          <span className="text-purple-400 bg-purple-600/20 px-3 py-1.5 rounded-lg">
            Business: {users.filter((u) => u.plan === "business").length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
        </div>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-lg text-white text-sm px-3 py-2.5 focus:outline-none focus:border-red-500"
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Users Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">User</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Plan</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Credits</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Stripe</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Joined</th>
                    <th className="text-right px-4 py-3 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-medium">
                            {(user.full_name ?? user.email)?.[0]?.toUpperCase() ?? "?"}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.full_name ?? "Unnamed"}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.plan === "business"
                              ? "bg-purple-600/20 text-purple-400"
                              : user.plan === "pro"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {user.plan === "business" && <Crown className="h-3 w-3 mr-1" />}
                          {user.plan.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {user.ai_credits_used}/{user.ai_credits_limit}
                      </td>
                      <td className="px-4 py-3">
                        {user.stripe_customer_id ? (
                          <span className="text-green-400 text-xs">Active</span>
                        ) : (
                          <span className="text-gray-600 text-xs">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {user.plan !== "pro" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs border-gray-700 text-gray-300 hover:bg-blue-600/20 hover:text-blue-400"
                              onClick={() => handlePlanChange(user.id, "pro")}
                            >
                              <UserCheck className="h-3 w-3 mr-1" /> Pro
                            </Button>
                          )}
                          {user.plan !== "business" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs border-gray-700 text-gray-300 hover:bg-purple-600/20 hover:text-purple-400"
                              onClick={() => handlePlanChange(user.id, "business")}
                            >
                              <Crown className="h-3 w-3 mr-1" /> Biz
                            </Button>
                          )}
                          {user.plan !== "free" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs border-gray-700 text-gray-300 hover:bg-gray-600/20"
                              onClick={() => handlePlanChange(user.id, "free")}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
