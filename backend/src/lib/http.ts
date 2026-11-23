import { createHash, timingSafeEqual } from "node:crypto";
import type { Context } from "hono";

/** Best-effort client IP (the web app's proxy forwards x-forwarded-for). */
export function clientIp(c: Context) {
  return c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ?? c.req.header("x-real-ip") ?? "local";
}

/** Checks `Authorization: Bearer $ADMIN_API_TOKEN` in constant time. */
export function isAdmin(c: Context) {
  const token = process.env.ADMIN_API_TOKEN;
  const provided = c.req.header("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token || !provided) return false;
  // Compare fixed-length digests, so neither the token nor its length leaks through timing.
  return timingSafeEqual(createHash("sha256").update(provided).digest(), createHash("sha256").update(token).digest());
}

export async function readJson(c: Context): Promise<unknown | undefined> {
  try {
    return await c.req.json();
  } catch {
    return undefined;
  }
}
