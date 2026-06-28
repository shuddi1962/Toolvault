"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@toolvault/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Shield,
  ToggleLeft,
  Database,
  CreditCard,
  Activity,
  FileText,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Globe,
  Mail,
  Key,
  Bell,
} from "lucide-react";

const SUPER_ADMIN_EMAILS = ["admin@toolvault.com"];

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Feature Flags", href: "/admin/features", icon: ToggleLeft },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "API Usage", href: "/admin/api-usage", icon: BarChart3 },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Integrations", href: "/admin/integrations", icon: Key },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || !SUPER_ADMIN_EMAILS.includes(user.email ?? "")) {
        router.push("/dashboard");
        return;
      }
      setAuthorized(true);
    });
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            <span className="text-lg font-bold text-white">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-red-600/20 text-red-400"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-red-400" : "text-gray-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-800 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to App
          </Link>
          <a
            href="/auth/logout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">SUPER ADMIN</span>
            <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
