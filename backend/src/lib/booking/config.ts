/**
 * Booking rules for vaug.in/book. Change them here (or with the env vars noted) and redeploy.
 *
 * Slots are offered in the *client's* working hours: Monday to Friday, 09:00–18:00 in whatever time zone
 * they pick, on any of those days, minus anything busy on the host's Google Calendar.
 */
const num = (value: string | undefined, fallback: number) => (value && Number.isFinite(Number(value)) ? Number(value) : fallback);

export const bookingConfig = {
  /** Length of a call. */
  durationMinutes: num(process.env.BOOKING_DURATION_MINUTES, 30),
  /** Slot starts are this far apart (09:00, 09:30, …). */
  stepMinutes: num(process.env.BOOKING_STEP_MINUTES, 30),
  /** Free time kept either side of every call and busy block. */
  bufferMinutes: num(process.env.BOOKING_BUFFER_MINUTES, 15),
  /** Earliest bookable start, from now. */
  minNoticeHours: num(process.env.BOOKING_MIN_NOTICE_HOURS, 4),
  /** How far ahead clients can book. */
  windowDays: num(process.env.BOOKING_WINDOW_DAYS, 30),
  /** Client-local working day, 24h clock. The last slot ends at `dayEnd`. */
  dayStart: "09:00",
  dayEnd: "18:00",
  /** ISO weekdays (1 = Monday … 7 = Sunday) on which slots are offered, in the client's time zone. */
  workdays: [1, 2, 3, 4, 5],
  /** Most guests a client can add. */
  maxGuests: 5,
  /** Always invited to every booking (a Hostinger mailbox, so invited only, never checked for availability). */
  alwaysInvite: (process.env.BOOKING_ALWAYS_INVITE ?? "dolsi@vaug.in").split(",").map((s) => s.trim()).filter(Boolean),
  /** Shown on the page and in the invite. */
  host: { name: "Utkarsh Mishra", company: "VAUG" },
  /** The host's calendar. With OAuth for the host's own account, "primary" is their main calendar. */
  calendarId: process.env.GOOGLE_CALENDAR_ID ?? "primary",
  /** Public site address, used in reschedule and cancel links. */
  siteUrl: (process.env.SITE_URL ?? "https://vaug.in").replace(/\/$/, ""),
};

/** Booking is on only when the Google credentials are set (and not switched off). */
export function bookingEnabled() {
  return (
    process.env.BOOKING_ENABLED !== "false" &&
    Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN)
  );
}
