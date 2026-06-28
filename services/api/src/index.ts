import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { pdfRoutes } from "./routes/pdf.js";
import { convertRoutes } from "./routes/convert.js";
import { imageRoutes } from "./routes/image.js";
import { aiRoutes } from "./routes/ai.js";
import { stripeRoutes } from "./routes/stripe.js";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check
app.get("/", (c) => {
  return c.json({ status: "ok", service: "ToolVault Pro API" });
});

// Routes
app.route("/api/pdf", pdfRoutes);
app.route("/api/convert", convertRoutes);
app.route("/api/image", imageRoutes);
app.route("/api/ai", aiRoutes);
app.route("/api/stripe", stripeRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("API Error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = parseInt(process.env.PORT || "3001");

console.log(`ToolVault API running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
