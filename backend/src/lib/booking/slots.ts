import { bookingConfig as cfg } from "./config.js";
import { freeBusy, type Interval } from "./google.js";
import { readBookings } from "./store.js";
import { addDays, dateKey, localParts, minutesOf, zonedToUtc } from "./time.js";

const MIN = 60_000;

/** Every candidate slot start (UTC ms) in the client's working hours, inside the notice and window limits. */
export function candidateSlots(tz: string, now = Date.now()): number[] {
  const earliest = now + cfg.minNoticeHours * 60 * MIN;
  const latest = now + cfg.windowDays * 24 * 60 * MIN;
  const today = localParts(new Date(now), tz);
  const first = minutesOf(cfg.dayStart);
  const last = minutesOf(cfg.dayEnd) - cfg.durationMinutes;
  const out: number[] = [];
  for (let d = 0; d <= cfg.windowDays + 1; d++) {
    const day = addDays(today, d);
    const iso = new Date(Date.UTC(day.year, day.month - 1, day.day)).getUTCDay() || 7;
    if (!cfg.workdays.includes(iso)) continue;
    for (let m = first; m <= last; m += cfg.stepMinutes) {
      const start = zonedToUtc(day.year, day.month, day.day, Math.floor(m / 60), m % 60, tz);
      if (!start) continue;
      const t = start.getTime();
      if (t >= earliest && t <= latest) out.push(t);
    }
  }
  return out;
}

/** True when a slot starting at `start` clashes with a busy interval, allowing the buffer either side. */
export function clashes(start: number, busy: Interval[]) {
  const end = start + cfg.durationMinutes * MIN;
  const buffer = cfg.bufferMinutes * MIN;
  return busy.some((b) => start < b.end + buffer && end > b.start - buffer);
}

/** Removes `own` from busy intervals (so a booking being rescheduled doesn't block itself). */
export function subtract(busy: Interval[], own?: Interval) {
  if (!own) return busy;
  return busy.flatMap((b) => {
    if (b.end <= own.start || b.start >= own.end) return [b];
    const parts: Interval[] = [];
    if (b.start < own.start) parts.push({ start: b.start, end: own.start });
    if (b.end > own.end) parts.push({ start: own.end, end: b.end });
    return parts;
  });
}

/** Google busy time plus our own confirmed bookings (in case Google hasn't caught up yet). */
export async function busyBetween(from: number, to: number, exceptBookingId?: string): Promise<Interval[]> {
  const [google, bookings] = await Promise.all([freeBusy(new Date(from), new Date(to)), readBookings()]);
  const ours = bookings
    .filter((b) => b.status === "confirmed" && b.id !== exceptBookingId)
    .map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }))
    .filter((b) => b.end > from && b.start < to);
  return [...google, ...ours];
}

// Free/busy for the whole window, reused for a short time so browsing the calendar stays quick.
let cache: { at: number; busy: Interval[] } | null = null;
const CACHE_MS = 60_000;

export async function availability(tz: string) {
  const now = Date.now();
  if (!cache || now - cache.at > CACHE_MS) {
    const from = now;
    const to = now + (cfg.windowDays + 2) * 24 * 60 * MIN;
    cache = { at: now, busy: await busyBetween(from, to) };
  }
  const days = new Map<string, string[]>();
  for (const t of candidateSlots(tz, now)) {
    if (clashes(t, cache.busy)) continue;
    const key = dateKey(localParts(new Date(t), tz));
    const list = days.get(key) ?? [];
    list.push(new Date(t).toISOString());
    days.set(key, list);
  }
  return [...days.entries()].map(([date, slots]) => ({ date, slots }));
}

/** Drop the cached free/busy after a booking changes. */
export const invalidateAvailability = () => {
  cache = null;
};

/** Is `start` a slot we would offer in `tz` right now (working hours, alignment, notice, window)? */
export function isOfferedSlot(start: number, tz: string) {
  return candidateSlots(tz).includes(start);
}
