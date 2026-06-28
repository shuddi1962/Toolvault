import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const aiSchema = z.object({
  prompt: z.string(),
  tool: z.string(),
  options: z.record(z.unknown()).optional(),
});

export const aiRoutes = new Hono();

aiRoutes.post("/article", zValidator("json", aiSchema), async (c) => {
  const body = c.req.valid("json");
  return c.json({ success: true, message: "AI article generation endpoint", data: body });
});

aiRoutes.post("/email", zValidator("json", aiSchema), async (c) => {
  const body = c.req.valid("json");
  return c.json({ success: true, message: "AI email generation endpoint", data: body });
});

aiRoutes.post("/meta", zValidator("json", aiSchema), async (c) => {
  const body = c.req.valid("json");
  return c.json({ success: true, message: "AI meta generation endpoint", data: body });
});

aiRoutes.post("/grammar", zValidator("json", aiSchema), async (c) => {
  const body = c.req.valid("json");
  return c.json({ success: true, message: "AI grammar check endpoint", data: body });
});

aiRoutes.post("/rewrite", zValidator("json", aiSchema), async (c) => {
  const body = c.req.valid("json");
  return c.json({ success: true, message: "AI rewrite endpoint", data: body });
});
