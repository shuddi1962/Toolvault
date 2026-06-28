"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@toolvault/ui";
import { BarChart3, DollarSign, Activity, TrendingUp, AlertTriangle } from "lucide-react";

interface Operation {
  id: string;
  module: string;
  tool: string;
  status: string;
  created_at: string;
}

interface CostRecord {
  id: string;
  api_name: string;
  cost_usd: number;
  created_at: string;
}

export default function AdminApiUsagePage() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [costs, setCosts] = useState<CostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [opsRes, costsRes] = await Promise.all([
      supabase.from("operations").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("costs").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setOperations((opsRes.data ?? []) as Operation[]);
    setCosts((costsRes.data ?? []) as CostRecord[]);
    setLoading(false);
  };

  // Aggregate by module
  const moduleStats = operations.reduce((acc, op) => {
    acc[op.module] = (acc[op.module] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCost = costs.reduce((sum, c) => sum + (c.cost_usd ?? 0), 0);

  const apiStats = costs.reduce((acc, c) => {
    acc[c.api_name] = (acc[c.api_name] ?? 0) + (c.cost_usd ?? 0);
    return acc;
  }, {} as Record<string, number>);

  const statusStats = operations.reduce((acc, op) => {
    acc[op.status] = (acc[op.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">API Usage & Costs</h1>
        <p className="text-gray-400 text-sm">Track operations and API spending</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Operations</p>
                <p className="text-2xl font-bold text-white">{operations.length}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total API Cost</p>
                <p className="text-2xl font-bold text-white">${totalCost.toFixed(4)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">
                  {operations.length > 0
                    ? `${(((statusStats["completed"] ?? 0) / operations.length) * 100).toFixed(1)}%`
                    : "N/A"}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Failed Ops</p>
                <p className="text-2xl font-bold text-white">{statusStats["failed"] ?? 0}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Operations by Module */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Operations by Module</h3>
            {Object.keys(moduleStats).length === 0 ? (
              <p className="text-sm text-gray-500">No operations yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(moduleStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([mod, count]) => {
                    const max = Math.max(...Object.values(moduleStats));
                    const colors: Record<string, string> = {
                      pdf: "bg-red-500",
                      convert: "bg-blue-500",
                      image: "bg-green-500",
                      ai: "bg-purple-500",
                      seo: "bg-yellow-500",
                      dev: "bg-gray-500",
                      music: "bg-pink-500",
                      video: "bg-orange-500",
                    };
                    return (
                      <div key={mod}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300 capitalize">{mod}</span>
                          <span className="text-sm text-gray-500">{count}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${colors[mod] ?? "bg-gray-600"}`}
                            style={{ width: `${(count / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cost by API */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Cost by API</h3>
            {Object.keys(apiStats).length === 0 ? (
              <p className="text-sm text-gray-500">No API costs recorded yet. Costs will appear when real API keys are configured.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(apiStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([api, cost]) => (
                    <div key={api} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-gray-300">{api}</span>
                      <span className="text-sm text-green-400 font-medium">${cost.toFixed(4)}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Operations */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Operations</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
            </div>
          ) : operations.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No operations yet. They will appear as users use the tools.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left px-3 py-2 text-gray-400 font-medium">Module</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-medium">Tool</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-medium">Status</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {operations.slice(0, 20).map((op) => (
                    <tr key={op.id} className="hover:bg-gray-800/50">
                      <td className="px-3 py-2 text-gray-300 capitalize">{op.module}</td>
                      <td className="px-3 py-2 text-gray-400">{op.tool}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            op.status === "completed"
                              ? "bg-green-600/20 text-green-400"
                              : op.status === "failed"
                              ? "bg-red-600/20 text-red-400"
                              : "bg-yellow-600/20 text-yellow-400"
                          }`}
                        >
                          {op.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-500 text-xs">
                        {new Date(op.created_at).toLocaleString()}
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
