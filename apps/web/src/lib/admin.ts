import { createClient } from "@/lib/supabase/client";

const SUPER_ADMIN_EMAILS = ["admin@toolvault.com"];

export async function isSuperAdmin(): Promise<boolean> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  return SUPER_ADMIN_EMAILS.includes(user.email ?? "");
}

export async function getProfile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

export async function getAllProfiles() {
  const supabase = createClient();
  const admin = await isSuperAdmin();
  if (!admin) return [];

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getAdminStats() {
  const supabase = createClient();
  const admin = await isSuperAdmin();
  if (!admin) return null;

  const [profilesRes, operationsRes, filesRes] = await Promise.all([
    supabase.from("profiles").select("id, plan", { count: "exact" }),
    supabase.from("operations").select("id, status", { count: "exact" }),
    supabase.from("files").select("id, size_bytes", { count: "exact" }),
  ]);

  const profiles = profilesRes.data ?? [];
  const totalUsers = profiles.length;
  const proUsers = profiles.filter((p) => p.plan === "pro").length;
  const businessUsers = profiles.filter((p) => p.plan === "business").length;
  const totalStorage = (filesRes.data ?? []).reduce(
    (acc, f) => acc + (f.size_bytes ?? 0),
    0
  );
  const totalOperations = operationsRes.count ?? 0;
  const mrr = proUsers * 9.99 + businessUsers * 29.99;

  return {
    totalUsers,
    proUsers,
    businessUsers,
    freeUsers: totalUsers - proUsers - businessUsers,
    mrr,
    totalOperations,
    totalStorage,
    totalFiles: filesRes.count ?? 0,
  };
}
