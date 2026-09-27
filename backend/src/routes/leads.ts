import { Hono } from "hono";

import { leadSchema } from "../lib/validation.js";
import { clientIp, isAdmin, readJson } from "../lib/http.js";
import { createLead, listLeads } from "../lib/leads.js";
import { rateLimit } from "../lib/rate-limit.js";

export const leads = new Hono();

/** POST /api/leads — contact form submissions. */
leads.post("/", async (c) => {
  const limited = rateLimit(`leads:${clientIp(c)}`);
  if (!limited.ok) {
    c.header("Retry-After", String(limited.retryAfter));
    return c.json({ ok: false, error: "Too many requests. Please try again shortly." }, 429);
  }

  const body = await readJson(c);
  if (body === undefined) return c.json({ ok: false, error: "Invalid JSON body." }, 400);

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] ??= issue.message;
    // A filled honeypot means a bot: pretend success, store nothing.
    if (fieldErrors.website) return c.json({ ok: true }, 201);
    return c.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 422);
  }

  try {
    const lead = await createLead(parsed.data, c.req.header("referer") ?? "website");
    return c.json({ ok: true, id: lead.id }, 201);
  } catch (error) {
    console.error("Failed to save lead", error);
    return c.json({ ok: false, error: "Something went wrong. Please email us instead." }, 500);
  }
});

/** GET /api/leads — admin only. */
leads.get("/", async (c) => {
  if (!isAdmin(c)) return c.json({ ok: false, error: "Unauthorized" }, 401);
  const all = await listLeads();
  return c.json({ ok: true, count: all.length, leads: all });
});
