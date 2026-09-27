import { timingSafeEqual } from "node:crypto";
import type { Context } from "hono";

/** Best-effort client IP (the web app's proxy forwards x-forwarded-for). */
export function clientIp(c: Context) {
  return c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ?? c.req.header("x-real-ip") ?? "local";
}

/** Checks `Authorization: Bearer $ADMIN_API_TOKEN` in constant time. */
export function isAdmin(c: Context) {
  const token = process.env.ADMIN_API_TOKEN;
  const provided = c.req.header("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function readJson(c: Context): Promise<unknown | undefined> {
  try {
    return await c.req.json();
  } catch {
    return undefined;
  }
}
