import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { leads } from "./routes/leads.js";
import { subscribe, subscribers } from "./routes/subscribe.js";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use("*", secureHeaders());
app.use("*", cors({ origin: (process.env.WEB_ORIGIN ?? "http://localhost:3000").split(","), allowMethods: ["GET", "POST"] }));

app.get("/health", (c) => c.json({ ok: true, service: "vaug-api", time: new Date().toISOString() }));
app.route("/leads", leads);
app.route("/subscribe", subscribe);
app.route("/subscribers", subscribers);

app.notFound((c) => c.json({ ok: false, error: "Not found" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ ok: false, error: "Internal server error" }, 500);
});

const port = Number(process.env.PORT ?? 4000);
serve({ fetch: app.fetch, port }, () => console.log(`VAUG API listening on http://localhost:${port}/api`));
