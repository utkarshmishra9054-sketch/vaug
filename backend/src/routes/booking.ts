import { Hono, type Context } from "hono";
import { z } from "zod";

import { bookingConfig as cfg, bookingEnabled } from "../lib/booking/config.js";
import { deleteEvent, GoogleError, insertEvent, meetLinkOf, patchEvent } from "../lib/booking/google.js";
import { availability, busyBetween, clashes, invalidateAvailability, isOfferedSlot, subtract } from "../lib/booking/slots.js";
import { hashToken, newId, newToken, readBookings, serialized, tokenMatches, writeBookings, type Booking } from "../lib/booking/store.js";
import { isValidTimeZone } from "../lib/booking/time.js";
import { clientIp, isAdmin, readJson } from "../lib/http.js";
import { rateLimit } from "../lib/rate-limit.js";

/**
 * /api/booking: the vaug.in/book flow. Slots come from the host's Google Calendar free/busy; a booking
 * creates a Google Calendar event with a Meet link and emails the invite to everyone (sendUpdates=all).
 * Manage tokens arrive in POST bodies only, never in URLs, so they stay out of access logs.
 */

export const booking = new Hono();
const MIN = 60_000;

const timeZone = z.string({ error: "Please choose a time zone" }).refine(isValidTimeZone, "Please choose a time zone");
const start = z.iso.datetime({ error: "Please choose a time" });

const bookingSchema = z.object({
  start,
  timeZone,
  firstName: z.string({ error: "Please enter your first name" }).trim().min(1, "Please enter your first name").max(80),
  lastName: z.string({ error: "Please enter your last name" }).trim().min(1, "Please enter your last name").max(80),
  email: z.email("Please enter a valid email").max(200),
  company: z.string({ error: "Please enter your company" }).trim().min(1, "Please enter your company").max(150),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+()\d\s.-]*$/, "Please use digits, spaces and + ( ) - only")
    .optional()
    .default(""),
  message: z.string({ error: "Tell us what you'd like to discuss" }).trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  guests: z.array(z.email("Please check the guest emails").max(200)).max(cfg.maxGuests, `Up to ${cfg.maxGuests} guests`).optional().default([]),
  // Honeypot: real people never see or fill this field.
  website: z.string().max(0).optional().default(""),
  // Admin-only: title for the one-off verification booking.
  testTitle: z.string().max(80).optional(),
});

const manageSchema = z.object({ token: z.string().min(20).max(100) });
const rescheduleSchema = manageSchema.extend({ start, timeZone });

function limited(c: Context, bucket: string, limit: number, windowMs: number) {
  const r = rateLimit(`booking:${bucket}:${clientIp(c)}`, limit, windowMs);
  if (r.ok) return null;
  c.header("Retry-After", String(r.retryAfter));
  return c.json({ ok: false, error: "Too many requests. Please try again shortly." }, 429);
}

const fieldErrors = (issues: z.core.$ZodIssue[]) => {
  const out: Record<string, string> = {};
  for (const issue of issues) out[String(issue.path[0] ?? "form")] ??= issue.message;
  return out;
};

const closed = (c: Context) => c.json({ ok: false, disabled: true, error: "Online booking isn't open yet. Please write to us instead." }, 503);

function googleFailed(c: Context, error: unknown) {
  console.error("Booking: calendar error:", error instanceof GoogleError ? error.message : error);
  return c.json({ ok: false, error: "Booking is temporarily unavailable. Please try again in a few minutes, or write to us." }, 502);
}

function manageLinks(id: string, token: string) {
  const base = `${cfg.siteUrl}/book/manage?id=${encodeURIComponent(id)}`;
  return {
    manage: `${base}#token=${token}`,
    reschedule: `${base}&action=reschedule#token=${token}`,
    cancel: `${base}&action=cancel#token=${token}`,
  };
}

const publicView = (b: Booking) => ({
  id: b.id,
  status: b.status,
  start: b.start,
  end: b.end,
  timeZone: b.timeZone,
  meetLink: b.meetLink,
  firstName: b.firstName,
  company: b.company,
});

/** GET /api/booking/config: what the page needs before showing the calendar. */
booking.get("/config", (c) =>
  c.json({
    ok: true,
    enabled: bookingEnabled(),
    durationMinutes: cfg.durationMinutes,
    windowDays: cfg.windowDays,
    minNoticeHours: cfg.minNoticeHours,
    dayStart: cfg.dayStart,
    dayEnd: cfg.dayEnd,
    workdays: cfg.workdays,
    maxGuests: cfg.maxGuests,
    host: cfg.host,
  }),
);

/** GET /api/booking/availability?tz=Europe/London: open slots for the next window, grouped by the client's local date. */
booking.get("/availability", async (c) => {
  const blocked = limited(c, "availability", 60, MIN);
  if (blocked) return blocked;
  if (!bookingEnabled()) return closed(c);
  const tz = c.req.query("tz") ?? "";
  if (!isValidTimeZone(tz)) return c.json({ ok: false, error: "Unknown time zone." }, 400);
  try {
    return c.json({ ok: true, timeZone: tz, days: await availability(tz) });
  } catch (error) {
    return googleFailed(c, error);
  }
});

/** POST /api/booking: book a slot. */
booking.post("/", async (c) => {
  const blocked = limited(c, "create", 5, 10 * MIN);
  if (blocked) return blocked;
  if (!bookingEnabled()) return closed(c);

  const body = await readJson(c);
  if (body === undefined) return c.json({ ok: false, error: "Invalid JSON body." }, 400);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error.issues);
    if (errors.website) return c.json({ ok: true }, 201); // bot: pretend it worked, do nothing
    return c.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors: errors }, 422);
  }
  const input = parsed.data;
  const startMs = Date.parse(input.start);
  if (!isOfferedSlot(startMs, input.timeZone)) {
    return c.json({ ok: false, error: "That time isn't available. Please pick another slot.", code: "slot" }, 409);
  }

  const email = input.email.toLowerCase();
  const others = new Set(cfg.alwaysInvite.map((e) => e.toLowerCase()));
  const guests = [...new Set(input.guests.map((g) => g.toLowerCase()))].filter((g) => g !== email && !others.has(g));
  const endMs = startMs + cfg.durationMinutes * MIN;

  try {
    return await serialized(async () => {
      // Re-check at submit time, against Google and our own bookings, inside the queue.
      const busy = await busyBetween(startMs - cfg.bufferMinutes * MIN, endMs + cfg.bufferMinutes * MIN);
      if (clashes(startMs, busy)) {
        invalidateAvailability();
        return c.json({ ok: false, error: "Someone just took that time. Please pick another slot.", code: "slot" }, 409);
      }

      const id = newId();
      const token = newToken();
      const links = manageLinks(id, token);
      const name = `${input.firstName} ${input.lastName}`;
      const summary = input.testTitle && isAdmin(c) ? input.testTitle : `${name} (${input.company}) × VAUG: ${cfg.durationMinutes}-min call`;
      const description = [
        `Booked on vaug.in/book.`,
        "",
        `Name: ${name}`,
        `Company: ${input.company}`,
        `Email: ${email}`,
        ...(input.phone ? [`Phone: ${input.phone}`] : []),
        "",
        "What they'd like to discuss:",
        input.message,
        "",
        "Need to change it?",
        `Reschedule: ${links.reschedule}`,
        `Cancel: ${links.cancel}`,
      ].join("\n");

      const event = await insertEvent({
        summary,
        description,
        start: { dateTime: new Date(startMs).toISOString(), timeZone: "UTC" },
        end: { dateTime: new Date(endMs).toISOString(), timeZone: "UTC" },
        attendees: [{ email, displayName: name }, ...cfg.alwaysInvite.map((e) => ({ email: e })), ...guests.map((g) => ({ email: g }))],
        conferenceData: { createRequest: { requestId: id, conferenceSolutionKey: { type: "hangoutsMeet" } } },
        reminders: { useDefault: true },
        guestsCanInviteOthers: false,
        extendedProperties: { private: { vaugBookingId: id } },
      });

      const now = new Date().toISOString();
      const record: Booking = {
        id,
        eventId: event.id,
        status: "confirmed",
        start: new Date(startMs).toISOString(),
        end: new Date(endMs).toISOString(),
        timeZone: input.timeZone,
        firstName: input.firstName,
        lastName: input.lastName,
        email,
        company: input.company,
        phone: input.phone,
        message: input.message,
        guests,
        meetLink: meetLinkOf(event),
        tokenHash: hashToken(token),
        createdAt: now,
        updatedAt: now,
        history: [{ at: now, action: "booked", start: new Date(startMs).toISOString() }],
      };
      const all = await readBookings();
      all.push(record);
      await writeBookings(all);
      invalidateAvailability();
      console.log(`Booking ${id} confirmed`);

      return c.json({ ok: true, booking: { ...publicView(record), links } }, 201);
    });
  } catch (error) {
    return googleFailed(c, error);
  }
});

/** Loads a booking for a manage request, checking the token. */
async function authorised(c: Context, id: string, token: string) {
  const all = await readBookings();
  const b = all.find((x) => x.id === id);
  if (!b || !tokenMatches(b, token)) return { all, b: undefined, error: c.json({ ok: false, error: "This link isn't valid. Please use the link from your invite." }, 404) };
  return { all, b, error: null };
}

/** POST /api/booking/manage/:id { token }: the booking behind a manage link. */
booking.post("/manage/:id", async (c) => {
  const blocked = limited(c, "manage", 30, MIN);
  if (blocked) return blocked;
  const parsed = manageSchema.safeParse(await readJson(c));
  if (!parsed.success) return c.json({ ok: false, error: "This link isn't valid." }, 400);
  const { b, error } = await authorised(c, c.req.param("id"), parsed.data.token);
  if (error || !b) return error;
  return c.json({ ok: true, booking: publicView(b), enabled: bookingEnabled() });
});

/** POST /api/booking/manage/:id/cancel { token } */
booking.post("/manage/:id/cancel", async (c) => {
  const blocked = limited(c, "change", 10, 10 * MIN);
  if (blocked) return blocked;
  if (!bookingEnabled()) return closed(c);
  const parsed = manageSchema.safeParse(await readJson(c));
  if (!parsed.success) return c.json({ ok: false, error: "This link isn't valid." }, 400);
  try {
    return await serialized(async () => {
      const { all, b, error } = await authorised(c, c.req.param("id"), parsed.data.token);
      if (error || !b) return error;
      if (b.status === "cancelled") return c.json({ ok: true, booking: publicView(b) });
      await deleteEvent(b.eventId);
      const now = new Date().toISOString();
      b.status = "cancelled";
      b.updatedAt = now;
      b.history.push({ at: now, action: "cancelled" });
      await writeBookings(all);
      invalidateAvailability();
      console.log(`Booking ${b.id} cancelled`);
      return c.json({ ok: true, booking: publicView(b) });
    });
  } catch (error) {
    return googleFailed(c, error);
  }
});

/** POST /api/booking/manage/:id/reschedule { token, start, timeZone } */
booking.post("/manage/:id/reschedule", async (c) => {
  const blocked = limited(c, "change", 10, 10 * MIN);
  if (blocked) return blocked;
  if (!bookingEnabled()) return closed(c);
  const parsed = rescheduleSchema.safeParse(await readJson(c));
  if (!parsed.success) return c.json({ ok: false, error: "Please pick a new time.", fieldErrors: fieldErrors(parsed.error.issues) }, 422);
  const startMs = Date.parse(parsed.data.start);
  if (!isOfferedSlot(startMs, parsed.data.timeZone)) return c.json({ ok: false, error: "That time isn't available. Please pick another slot.", code: "slot" }, 409);
  const endMs = startMs + cfg.durationMinutes * MIN;

  try {
    return await serialized(async () => {
      const { all, b, error } = await authorised(c, c.req.param("id"), parsed.data.token);
      if (error || !b) return error;
      if (b.status !== "confirmed") return c.json({ ok: false, error: "This booking was cancelled. Please book a new time." }, 409);
      const own = { start: Date.parse(b.start), end: Date.parse(b.end) };
      const busy = subtract(await busyBetween(startMs - cfg.bufferMinutes * MIN, endMs + cfg.bufferMinutes * MIN, b.id), own);
      if (clashes(startMs, busy)) {
        invalidateAvailability();
        return c.json({ ok: false, error: "Someone just took that time. Please pick another slot.", code: "slot" }, 409);
      }
      const event = await patchEvent(b.eventId, {
        start: { dateTime: new Date(startMs).toISOString(), timeZone: "UTC" },
        end: { dateTime: new Date(endMs).toISOString(), timeZone: "UTC" },
      });
      const now = new Date().toISOString();
      b.start = new Date(startMs).toISOString();
      b.end = new Date(endMs).toISOString();
      b.timeZone = parsed.data.timeZone;
      b.meetLink = meetLinkOf(event) ?? b.meetLink;
      b.updatedAt = now;
      b.history.push({ at: now, action: "rescheduled", start: b.start });
      await writeBookings(all);
      invalidateAvailability();
      console.log(`Booking ${b.id} rescheduled`);
      return c.json({ ok: true, booking: publicView(b) });
    });
  } catch (error) {
    return googleFailed(c, error);
  }
});
