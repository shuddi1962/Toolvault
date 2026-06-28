import { z } from "zod";

// ── Profile Schema ───────────────────────────────────────
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  plan: z.enum(["free", "pro", "business"]).default("free"),
  ai_credits_used: z.number().default(0),
  ai_credits_limit: z.number().default(50),
  storage_used_bytes: z.number().default(0),
  storage_limit_bytes: z.number().default(104857600),
  stripe_customer_id: z.string().nullable(),
  stripe_subscription_id: z.string().nullable(),
  created_at: z.string().datetime(),
});

export type Profile = z.infer<typeof ProfileSchema>;

// ── File Schema ──────────────────────────────────────────
export const FileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string(),
  original_name: z.string().nullable(),
  size_bytes: z.number().nullable(),
  mime_type: z.string().nullable(),
  s3_key: z.string(),
  s3_url: z.string(),
  tool_used: z.string().nullable(),
  expires_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
});

export type File = z.infer<typeof FileSchema>;

// ── Operation Schema ─────────────────────────────────────
export const OperationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  module: z.string(),
  tool: z.string(),
  status: z.enum(["pending", "processing", "completed", "failed"]).default("pending"),
  input_file_ids: z.array(z.string().uuid()).nullable(),
  output_file_ids: z.array(z.string().uuid()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});

export type Operation = z.infer<typeof OperationSchema>;

// ── Plan Limits ──────────────────────────────────────────
export const PLAN_LIMITS = {
  free: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxOpsPerDay: 5,
    maxBatchFiles: 0,
    maxStorage: 104857600, // 100MB
    maxAiCredits: 50,
    maxVideoDownloads: 3,
    maxImageUpscale: 3,
    maxLegalPolicies: 1,
    maxEsignRequests: 3,
    maxTeamSeats: 0,
    maxApiCalls: 0,
    fileExpiry: 2 * 60 * 60, // 2 hours
    ads: true,
  },
  pro: {
    maxFileSize: 500 * 1024 * 1024, // 500MB
    maxOpsPerDay: Infinity,
    maxBatchFiles: 30,
    maxStorage: 5 * 1024 * 1024 * 1024, // 5GB
    maxAiCredits: 1500,
    maxVideoDownloads: Infinity,
    maxImageUpscale: Infinity,
    maxLegalPolicies: Infinity,
    maxEsignRequests: Infinity,
    maxTeamSeats: 0,
    maxApiCalls: 0,
    fileExpiry: 7 * 24 * 60 * 60, // 7 days
    ads: false,
  },
  business: {
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    maxOpsPerDay: Infinity,
    maxBatchFiles: 100,
    maxStorage: 25 * 1024 * 1024 * 1024, // 25GB
    maxAiCredits: Infinity,
    maxVideoDownloads: Infinity,
    maxImageUpscale: Infinity,
    maxLegalPolicies: Infinity,
    maxEsignRequests: Infinity,
    maxTeamSeats: 10,
    maxApiCalls: 10000,
    fileExpiry: 30 * 24 * 60 * 60, // 30 days
    ads: false,
  },
} as const;

export type Plan = keyof typeof PLAN_LIMITS;

// ── API Response Types ───────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
