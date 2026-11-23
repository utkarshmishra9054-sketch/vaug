/** Client-side date helpers for the booking page. All times are shown in the visitor's chosen time zone. */

export type Day = { date: string; slots: string[] };

export const browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

export function allTimeZones(current: string): string[] {
  let zones: string[] = [];
  try {
    zones = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
  } catch {
    zones = [];
  }
  if (!zones.includes("UTC")) zones = ["UTC", ...zones];
  if (!zones.includes(current)) zones = [current, ...zones];
  return zones;
}

/** "GMT+05:30" style offset of a zone right now. */
export function offsetLabel(tz: string, at = new Date()) {
  try {
    const part = new Intl.DateTimeFormat("en-GB", { timeZone: tz, timeZoneName: "longOffset" }).formatToParts(at).find((p) => p.type === "timeZoneName");
    return part?.value === "GMT" ? "GMT+00:00" : (part?.value ?? "");
  } catch {
    return "";
  }
}

export const zoneName = (tz: string) => tz.replace(/_/g, " ");

/** YYYY-MM-DD of an instant in a zone. */
export function dateKeyIn(at: Date, tz: string) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
  return p; // en-CA formats as YYYY-MM-DD
}

export const formatTime = (iso: string, tz: string) => new Intl.DateTimeFormat(undefined, { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date(iso));

export const formatLongDate = (iso: string, tz: string) =>
  new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

/** A calendar date key formatted for headings (no time zone shift: the key is already local). */
export function formatDateKey(key: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) {
  const [y, m, d] = key.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, { ...opts, timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

export const monthLabel = (year: number, month: number) => new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, 1)));

export const weekdayLabels = () => {
  const short = new Intl.DateTimeFormat(undefined, { weekday: "short", timeZone: "UTC" });
  const long = new Intl.DateTimeFormat(undefined, { weekday: "long", timeZone: "UTC" });
  // 2024-01-01 was a Monday.
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.UTC(2024, 0, 1 + i));
    return { short: short.format(d), long: long.format(d) };
  });
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Weeks (Monday first) of a month, as date keys or null for padding cells. */
export function monthGrid(year: number, month: number): (string | null)[][] {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => `${year}-${pad(month)}-${pad(i + 1)}`)];
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}

export const ym = (key: string) => {
  const [y, m] = key.split("-").map(Number);
  return { year: y, month: m };
};

const stamp = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Google Calendar "add event" link. */
export function googleCalendarLink({ title, start, end, details, location }: { title: string; start: string; end: string; details: string; location?: string }) {
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${stamp(start)}/${stamp(end)}`, details, ...(location ? { location } : {}) });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** An .ics file for Apple Calendar, Outlook and others. */
export function icsFile({ uid, title, start, end, details, location }: { uid: string; title: string; start: string; end: string; details: string; location?: string }) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VAUG//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}@vaug.in`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${icsText(title)}`,
    `DESCRIPTION:${icsText(details)}`,
    ...(location ? [`LOCATION:${icsText(location)}`, `URL:${location}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

/** Path + query + hash of an absolute link, so manage links work on any host (local, preview, live). */
export const localPath = (url: string) => {
  try {
    const u = new URL(url);
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return url;
  }
};
