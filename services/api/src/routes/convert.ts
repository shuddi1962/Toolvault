import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const convertSchema = z.object({
  fileKey: z.string(),
  from: z.string(),
  to: z.string(),
});

export const convertRoutes = new Hono();

convertRoutes.post("/", zValidator("json", convertSchema), async (c) => {
  const body = c.req.valid("json");
  // TODO: Implement file conversion
  return c.json({ success: true, message: "File conversion endpoint", data: body });
});
