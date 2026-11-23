import { bookingConfig } from "./config.js";

/**
 * Google Calendar API over plain fetch, using OAuth 2.0 with the host's refresh token
 * (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN). Tokens and response bodies are never
 * logged; errors carry only the HTTP status and Google's short reason.
 */

const API = "https://www.googleapis.com/calendar/v3";
let cached: { token: string; expiresAt: number } | null = null;

export class GoogleError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function accessToken() {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    cached = null;
    const reason = ((await res.json().catch(() => ({}))) as { error?: string }).error ?? "unknown";
    throw new GoogleError(`Google token refresh failed (${res.status} ${reason})`, res.status);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cached.token;
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  if (res.status === 204) return undefined as T;
  if (!res.ok) {
    const reason = ((await res.json().catch(() => ({}))) as { error?: { status?: string } }).error?.status ?? "unknown";
    throw new GoogleError(`Google Calendar request failed (${res.status} ${reason})`, res.status);
  }
  return (await res.json()) as T;
}

const calendarPath = () => `/calendars/${encodeURIComponent(bookingConfig.calendarId)}`;

export type Interval = { start: number; end: number };

/** Busy intervals on the host's calendar between two instants. */
export async function freeBusy(from: Date, to: Date): Promise<Interval[]> {
  const json = await call<{ calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }> }>("/freeBusy", {
    method: "POST",
    body: JSON.stringify({ timeMin: from.toISOString(), timeMax: to.toISOString(), items: [{ id: bookingConfig.calendarId }] }),
  });
  const cal = json.calendars[bookingConfig.calendarId] ?? Object.values(json.calendars)[0];
  if (!cal || cal.errors?.length) throw new GoogleError("Google free/busy returned an error for the calendar", 502);
  return (cal.busy ?? []).map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }));
}

export type CalendarEvent = {
  id: string;
  hangoutLink?: string;
  htmlLink?: string;
  conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
};

export const meetLinkOf = (e: CalendarEvent) => e.hangoutLink ?? e.conferenceData?.entryPoints?.find((p) => p.entryPointType === "video")?.uri;

export async function insertEvent(body: Record<string, unknown>) {
  return call<CalendarEvent>(`${calendarPath()}/events?conferenceDataVersion=1&sendUpdates=all`, { method: "POST", body: JSON.stringify(body) });
}

export async function patchEvent(eventId: string, body: Record<string, unknown>) {
  return call<CalendarEvent>(`${calendarPath()}/events/${encodeURIComponent(eventId)}?conferenceDataVersion=1&sendUpdates=all`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteEvent(eventId: string) {
  try {
    await call<void>(`${calendarPath()}/events/${encodeURIComponent(eventId)}?sendUpdates=all`, { method: "DELETE" });
  } catch (error) {
    // Already gone (deleted in Google Calendar by hand): treat as cancelled.
    if (error instanceof GoogleError && (error.status === 404 || error.status === 410)) return;
    throw error;
  }
}
