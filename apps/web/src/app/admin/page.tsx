"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@toolvault/ui";
import {
  Users,
  DollarSign,
  Activity,
  Database,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Zap,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  proUsers: number;
  businessUsers: number;
  freeUsers: number;
  mrr: number;
  totalOperations: number;
  totalStorage: number;
  totalFiles: number;
  recentUsers: { email: string; full_name: string | null; plan: string; created_at: string }[];
  operationsByDay: { date: string; count: number }[];
  planDistribution: { plan: string; count: number }[];
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-12">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
            opacity: 0.3 + (i / data.length) * 0.7,
          }}
        />
      ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  chartData,
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: any;
  color: string;
  chartData?: number[];
}) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change && (
              <div className={`flex items-center gap-1 text-xs ${changeType === "up" ? "text-green-400" : "text-red-400"}`}>
                {changeType === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {change}
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        {chartData && (
          <div className="mt-4">
            <MiniChart data={chartData} color={color.includes("red") ? "#ef4444" : color.includes("blue") ? "#3b82f6" : color.includes("green") ? "#22c55e" : color.includes("purple") ? "#a855f7" : "#f97316"} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);

    const [profilesRes, operationsRes, filesRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("operations").select("id, created_at, module").order("created_at", { ascending: false }),
      supabase.from("files").select("id, size_bytes, created_at"),
    ]);

    const profiles = (profilesRes.data ?? []) as any[];
    const operations = (operationsRes.data ?? []) as any[];
    const files = (filesRes.data ?? []) as any[];

    const proUsers = profiles.filter((p) => p.plan === "pro").length;
    const businessUsers = profiles.filter((p) => p.plan === "business").length;
    const totalStorage = files.reduce((acc, f) => acc + (f.size_bytes ?? 0), 0);

    // Operations by day (last 14 days)
    const days: { date: string; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = operations.filter((o) => o.created_at?.startsWith(dateStr)).length;
      days.push({ date: dateStr, count });
    }

    setStats({
      totalUsers: profiles.length,
      proUsers,
      businessUsers,
      freeUsers: profiles.length - proUsers - businessUsers,
      mrr: proUsers * 9.99 + businessUsers * 29.99,
      totalOperations: operations.length,
      totalStorage,
      totalFiles: files.length,
      recentUsers: profiles.slice(0, 5),
      operationsByDay: days,
      planDistribution: [
        { plan: "Free", count: profiles.length - proUsers - businessUsers },
        { plan: "Pro", count: proUsers },
        { plan: "Business", count: businessUsers },
      ],
    });

    setLoading(false);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">Overview of your platform</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={String(stats?.totalUsers ?? 0)}
          change="+12% this month"
          changeType="up"
          icon={Users}
          color="bg-blue-600"
          chartData={stats?.operationsByDay.map((d) => d.count)}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(stats?.mrr ?? 0).toFixed(2)}`}
          change="+8% this month"
          changeType="up"
          icon={DollarSign}
          color="bg-green-600"
        />
        <StatCard
          title="Total Operations"
          value={String(stats?.totalOperations ?? 0)}
          change="+24 today"
          changeType="up"
          icon={Activity}
          color="bg-purple-600"
          chartData={stats?.operationsByDay.map((d) => d.count)}
        />
        <StatCard
          title="Storage Used"
          value={formatBytes(stats?.totalStorage ?? 0)}
          icon={Database}
          color="bg-orange-600"
        />
      </div>

      {/* Secondary cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <Crown className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Pro Users</p>
                <p className="text-xl font-bold text-white">{stats?.proUsers ?? 0}</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${((stats?.proUsers ?? 0) / Math.max(stats?.totalUsers ?? 1, 1)) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Business Users</p>
                <p className="text-xl font-bold text-white">{stats?.businessUsers ?? 0}</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${((stats?.businessUsers ?? 0) / Math.max(stats?.totalUsers ?? 1, 1)) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-600/20">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Files</p>
                <p className="text-xl font-bold text-white">{stats?.totalFiles ?? 0}</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              {formatBytes(stats?.totalStorage ?? 0)} across all users
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users + Operations Chart */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Users</h3>
            <div className="space-y-3">
              {stats?.recentUsers.map((u, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-medium">
                      {(u.full_name ?? u.email)?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p className="text-sm text-white">{u.full_name ?? "Unnamed"}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      u.plan === "business"
                        ? "bg-purple-600/20 text-purple-400"
                        : u.plan === "pro"
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {u.plan}
                  </span>
                </div>
              ))}
              {(!stats?.recentUsers || stats.recentUsers.length === 0) && (
                <p className="text-sm text-gray-500">No users yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Operations (14 days)</h3>
            <div className="flex items-end gap-1 h-40">
              {stats?.operationsByDay.map((d, i) => {
                const max = Math.max(...(stats?.operationsByDay.map((x) => x.count) ?? [1]), 1);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-red-500/80 rounded-t"
                      style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }}
                      title={`${d.date}: ${d.count} operations`}
                    />
                    {i % 3 === 0 && (
                      <span className="text-[9px] text-gray-600">{d.date.slice(5)}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Plan Distribution</h3>
          <div className="flex gap-4">
            {stats?.planDistribution.map((p) => {
              const total = stats.totalUsers || 1;
              const colors = { Free: "bg-gray-600", Pro: "bg-blue-500", Business: "bg-purple-500" };
              return (
                <div key={p.plan} className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">{p.plan}</span>
                    <span className="text-sm text-white font-medium">{p.count}</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[p.plan as keyof typeof colors]}`}
                      style={{ width: `${(p.count / total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{((p.count / total) * 100).toFixed(0)}%</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
