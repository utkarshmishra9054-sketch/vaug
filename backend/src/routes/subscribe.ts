import { Hono } from "hono";

import { subscribeSchema } from "../lib/validation.js";
import { clientIp, isAdmin, readJson } from "../lib/http.js";
import { addSubscriber, listSubscribers } from "../lib/leads.js";
import { rateLimit } from "../lib/rate-limit.js";

export const subscribe = new Hono();

/** POST /api/subscribe — newsletter sign-up (deduplicated). */
subscribe.post("/", async (c) => {
  if (!rateLimit(`subscribe:${clientIp(c)}`).ok) {
    return c.json({ ok: false, error: "Too many requests. Please try again shortly." }, 429);
  }
  const body = await readJson(c);
  if (body === undefined) return c.json({ ok: false, error: "Invalid JSON body." }, 400);

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) return c.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email." }, 422);

  try {
    const added = await addSubscriber(parsed.data.email);
    return c.json({ ok: true, alreadySubscribed: !added }, added ? 201 : 200);
  } catch (error) {
    console.error("Failed to save subscriber", error);
    return c.json({ ok: false, error: "Something went wrong. Please try again." }, 500);
  }
});

/** GET /api/subscribers — admin only. */
export const subscribers = new Hono().get("/", async (c) => {
  if (!isAdmin(c)) return c.json({ ok: false, error: "Unauthorized" }, 401);
  const all = await listSubscribers();
  return c.json({ ok: true, count: all.length, subscribers: all });
});
