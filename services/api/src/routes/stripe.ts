import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const stripeSchema = z.object({
  priceId: z.string(),
  userId: z.string(),
});

export const stripeRoutes = new Hono();

stripeRoutes.post("/create-checkout", zValidator("json", stripeSchema), async (c) => {
  const body = c.req.valid("json");
  return c.json({ success: true, message: "Stripe checkout endpoint", data: body });
});

stripeRoutes.post("/portal", async (c) => {
  return c.json({ success: true, message: "Stripe portal endpoint" });
});
