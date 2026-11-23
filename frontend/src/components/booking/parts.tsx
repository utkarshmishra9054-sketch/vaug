"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Check, ChevronLeft, ChevronRight, Clock, Download, Globe, Loader2, Plus, Video, X } from "lucide-react";

import { Wordmark } from "@/components/ui/Logo";
import {
  allTimeZones,
  formatDateKey,
  formatLongDate,
  formatTime,
  googleCalendarLink,
  icsFile,
  localPath,
  monthGrid,
  monthLabel,
  offsetLabel,
  weekdayLabels,
  zoneName,
  type Day,
} from "./time";

export type BookingConfig = {
  enabled: boolean;
  durationMinutes: number;
  windowDays: number;
  maxGuests: number;
  host: { name: string; company: string };
};

export type Booked = {
  id: string;
  start: string;
  end: string;
  timeZone: string;
  meetLink?: string;
  links?: { manage: string; reschedule: string; cancel: string };
};

export const inputClass =
  "w-full rounded-md border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle outline-none transition focus:border-accent-text aria-[invalid=true]:border-red-400";
const labelClass = "mb-1.5 block text-xs font-semibold text-muted";

/** Thin wrapper over the /api/booking endpoints. */
export async function bookingApi<T>(path: string, init?: RequestInit): Promise<{ status: number; json: T & { ok: boolean; error?: string; fieldErrors?: Record<string, string>; code?: string; disabled?: boolean } }> {
  const res = await fetch(`/api/booking${path}`, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  const json = await res.json().catch(() => ({ ok: false, error: "Something went wrong. Please try again." }));
  return { status: res.status, json };
}

/* Host panel ------------------------------------------------------------ */

export function HostPanel({ duration, tz, onTz, showZone = true }: { duration: number; tz: string; onTz: (tz: string) => void; showZone?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-[1.6rem] text-fg">
        <Wordmark animated={false} />
        <span className="sr-only">VAUG</span>
      </span>
      <h1 className="text-2xl font-semibold leading-tight text-fg">{duration}-min call with Utkarsh Mishra, VAUG</h1>
      <ul className="space-y-2.5 text-sm text-muted">
        <li className="flex items-center gap-2.5">
          <Clock className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
          {duration} min
        </li>
        <li className="flex items-center gap-2.5">
          <Video className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
          Google Meet
        </li>
      </ul>
      <p className="text-sm leading-relaxed text-muted">
        A free, no-obligation call about what you&apos;re building: goals, constraints and whether we&apos;re the right fit. You&apos;ll get a calendar invite with the Meet link straight away.
      </p>
      {showZone && <TimeZoneSelect tz={tz} onTz={onTz} />}
    </div>
  );
}

export function TimeZoneSelect({ tz, onTz }: { tz: string; onTz: (tz: string) => void }) {
  const zones = useMemo(() => (tz ? allTimeZones(tz).map((z) => ({ z, label: `(${offsetLabel(z)}) ${zoneName(z)}` })) : []), [tz]);
  return (
    <div>
      <label htmlFor="bk-tz" className={`${labelClass} flex items-center gap-1.5`}>
        <Globe className="size-3.5" aria-hidden="true" /> Time zone
      </label>
      <select id="bk-tz" value={tz} onChange={(e) => onTz(e.target.value)} className={`${inputClass} [&>option]:text-ink`} disabled={!tz}>
        {zones.map(({ z, label }) => (
          <option key={z} value={z}>
            {label}
          </option>
        ))}
      </select>
      <p className="mt-1.5 text-xs text-subtle">Times are shown in this time zone. We picked it from your browser.</p>
    </div>
  );
}

/* Month calendar ------------------------------------------------------- */

export function MonthCalendar({
  year,
  month,
  available,
  selected,
  today,
  canPrev,
  canNext,
  onMonth,
  onSelect,
}: {
  year: number;
  month: number;
  available: Map<string, number>;
  selected: string | null;
  today: string;
  canPrev: boolean;
  canNext: boolean;
  onMonth: (delta: number) => void;
  onSelect: (date: string) => void;
}) {
  const weeks = monthGrid(year, month);
  const days = weekdayLabels();
  const grid = useRef<HTMLTableElement>(null);

  // Arrow keys move between the enabled days.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step || !grid.current) return;
    const buttons = [...grid.current.querySelectorAll<HTMLButtonElement>("button[data-date]")];
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    for (let j = i + step; j >= 0 && j < buttons.length; j += step) {
      if (!buttons[j].disabled) return buttons[j].focus();
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-fg" aria-live="polite">
          {monthLabel(year, month)}
        </h2>
        <div className="flex gap-1">
          <button type="button" onClick={() => onMonth(-1)} disabled={!canPrev} aria-label="Previous month" className="inline-flex size-9 items-center justify-center rounded-md border border-border text-fg transition hover:bg-surface-2 disabled:opacity-35">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onMonth(1)} disabled={!canNext} aria-label="Next month" className="inline-flex size-9 items-center justify-center rounded-md border border-border text-fg transition hover:bg-surface-2 disabled:opacity-35">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <table ref={grid} onKeyDown={onKeyDown} className="w-full table-fixed border-separate border-spacing-1 text-center">
        <caption className="sr-only">Days in {monthLabel(year, month)}. Days with free times are buttons.</caption>
        <thead>
          <tr>
            {days.map((d) => (
              <th key={d.long} scope="col" abbr={d.long} className="pb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-subtle">
                {d.short.slice(0, 2)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={w}>
              {week.map((key, i) => {
                if (!key) return <td key={i} />;
                const count = available.get(key) ?? 0;
                const day = Number(key.slice(8));
                const isSel = key === selected;
                const label = `${formatDateKey(key)}${count ? `, ${count} ${count === 1 ? "time" : "times"} available` : ", no times available"}`;
                return (
                  <td key={key} className="p-0">
                    <button
                      type="button"
                      data-date={key}
                      disabled={!count}
                      aria-label={label}
                      aria-pressed={isSel}
                      aria-current={key === today ? "date" : undefined}
                      onClick={() => onSelect(key)}
                      className={`mx-auto flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-sm transition ${
                        isSel
                          ? "bg-accent font-semibold text-accent-fg"
                          : count
                            ? "bg-accent-soft font-semibold text-fg hover:bg-accent hover:text-accent-fg"
                            : "cursor-default text-subtle"
                      } ${key === today && !isSel ? "ring-1 ring-accent-text" : ""}`}
                    >
                      {day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Slots for a day -------------------------------------------------------- */

export function SlotList({ day, tz, onPick, headingRef }: { day: Day | null; tz: string; onPick: (iso: string) => void; headingRef?: React.Ref<HTMLHeadingElement> }) {
  if (!day) return <p className="text-sm text-muted">Pick a highlighted day to see the times.</p>;
  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-base font-semibold text-fg outline-none">
        {formatDateKey(day.date)}
      </h2>
      <p className="mt-0.5 text-xs text-subtle">{zoneName(tz)}</p>
      <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
        {day.slots.map((s) => (
          <li key={s}>
            <button type="button" onClick={() => onPick(s)} className="w-full rounded-md border border-accent-text/50 px-3 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent hover:text-accent-fg focus-visible:bg-accent focus-visible:text-accent-fg">
              {formatTime(s, tz)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Booking form ------------------------------------------------------------ */

export function SlotSummary({ start, end, tz }: { start: string; end: string; tz: string }) {
  return (
    <p className="flex items-start gap-2.5 rounded-md border border-border bg-bg px-4 py-3 text-sm text-fg">
      <Clock className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
      <span>
        <span className="font-semibold">{formatLongDate(start, tz)}</span>
        <br />
        {formatTime(start, tz)} to {formatTime(end, tz)} <span className="text-muted">({zoneName(tz)})</span>
      </span>
    </p>
  );
}

export function BookingForm({
  start,
  durationMinutes,
  tz,
  maxGuests,
  onBack,
  onBooked,
  onSlotTaken,
}: {
  start: string;
  durationMinutes: number;
  tz: string;
  maxGuests: number;
  onBack: () => void;
  onBooked: (b: Booked, who: { email: string; guests: string[] }) => void;
  onSlotTaken: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [guests, setGuests] = useState<string[]>([]);
  const [guestDraft, setGuestDraft] = useState("");
  const [guestError, setGuestError] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const end = new Date(Date.parse(start) + durationMinutes * 60_000).toISOString();

  useEffect(() => heading.current?.focus(), []);

  const addGuest = () => {
    const email = guestDraft.trim().toLowerCase();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setGuestError("Please enter a valid email.");
    if (guests.includes(email)) return setGuestError("That guest is already added.");
    if (guests.length >= maxGuests) return setGuestError(`Up to ${maxGuests} guests.`);
    setGuests([...guests, email]);
    setGuestDraft("");
    setGuestError(null);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = {
      start,
      timeZone: tz,
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      guests,
      website: String(form.get("website") ?? ""),
    };
    setBusy(true);
    setError(null);
    setErrors({});
    try {
      const { status, json } = await bookingApi<{ booking?: Booked }>("", { method: "POST", body: JSON.stringify(body) });
      if (json.ok && json.booking) return onBooked(json.booking, { email: body.email, guests });
      if (json.ok) return onBooked({ id: "", start, end, timeZone: tz }, { email: body.email, guests });
      if (status === 409 && json.code === "slot") return onSlotTaken(json.error ?? "That time was just taken.");
      setErrors(json.fieldErrors ?? {});
      setError(json.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const aria = (name: string) => ({ "aria-invalid": errors[name] ? true : undefined, "aria-describedby": errors[name] ? `bk-${name}-error` : undefined });
  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`bk-${name}-error`} className="mt-1.5 text-xs text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <button type="button" onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline">
        <ChevronLeft className="size-4" aria-hidden="true" /> Change time
      </button>
      <h2 ref={heading} tabIndex={-1} className="text-xl font-semibold text-fg outline-none">
        Your details
      </h2>
      <div className="mt-4">
        <SlotSummary start={start} end={end} tz={tz} />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-firstName" className={labelClass}>First name *</label>
          <input id="bk-firstName" name="firstName" required autoComplete="given-name" className={inputClass} {...aria("firstName")} />
          {fieldError("firstName")}
        </div>
        <div>
          <label htmlFor="bk-lastName" className={labelClass}>Last name *</label>
          <input id="bk-lastName" name="lastName" required autoComplete="family-name" className={inputClass} {...aria("lastName")} />
          {fieldError("lastName")}
        </div>
        <div>
          <label htmlFor="bk-email" className={labelClass}>Email *</label>
          <input id="bk-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputClass} {...aria("email")} />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor="bk-company" className={labelClass}>Company *</label>
          <input id="bk-company" name="company" required autoComplete="organization" className={inputClass} {...aria("company")} />
          {fieldError("company")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-phone" className={labelClass}>Phone <span className="font-normal">(optional)</span></label>
          <input id="bk-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} {...aria("phone")} />
          {fieldError("phone")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-message" className={labelClass}>What would you like to discuss? *</label>
          <textarea id="bk-message" name="message" required rows={4} className={`${inputClass} resize-y`} {...aria("message")} />
          {fieldError("message")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-guest" className={labelClass}>Add guests <span className="font-normal">(optional, up to {maxGuests})</span></label>
          <div className="flex gap-2">
            <input
              id="bk-guest"
              type="email"
              value={guestDraft}
              onChange={(e) => setGuestDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addGuest();
                }
              }}
              placeholder="colleague@company.com"
              aria-invalid={guestError ? true : undefined}
              aria-describedby={guestError ? "bk-guest-error" : "bk-guests-list"}
              className={inputClass}
            />
            <button type="button" onClick={addGuest} className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3.5 text-sm font-semibold text-fg transition hover:bg-surface-2">
              <Plus className="size-4" aria-hidden="true" /> Add
            </button>
          </div>
          {(guestError || errors.guests) && (
            <p id="bk-guest-error" className="mt-1.5 text-xs text-red-300">
              {guestError ?? errors.guests}
            </p>
          )}
          <ul id="bk-guests-list" aria-label="Guests" className="mt-2 flex flex-wrap gap-2">
            {guests.map((g) => (
              <li key={g} className="inline-flex items-center gap-1 rounded-full border border-border bg-bg py-1 pl-3 pr-1 text-xs text-fg">
                {g}
                <button type="button" onClick={() => setGuests(guests.filter((x) => x !== g))} aria-label={`Remove ${g}`} className="inline-flex size-6 items-center justify-center rounded-full hover:bg-surface-2">
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="bk-website">Website</label>
          <input id="bk-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover disabled:opacity-60 sm:w-auto">
        {busy && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {busy ? "Booking…" : "Confirm booking"}
      </button>
      <p className="mt-3 text-xs text-subtle">
        We use these details only to arrange this call. See our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

/* Confirmation ---------------------------------------------------------- */

export function Confirmation({ booking, email, guests, tz, durationMinutes, title = "You're booked" }: { booking: Booked; email: string; guests: string[]; tz: string; durationMinutes: number; title?: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  const event = {
    title: `${durationMinutes}-min call with Utkarsh Mishra, VAUG`,
    start: booking.start,
    end: booking.end,
    details: `Google Meet: ${booking.meetLink ?? "in your calendar invite"}${booking.links ? `\n\nReschedule or cancel: ${booking.links.manage}` : ""}`,
    location: booking.meetLink,
  };
  const ics = () => {
    const blob = new Blob([icsFile({ uid: booking.id || String(Date.parse(booking.start)), ...event })], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vaug-call.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div>
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg">
        <Check className="size-6" aria-hidden="true" />
      </span>
      <h2 ref={heading} tabIndex={-1} className="mt-4 text-2xl font-semibold text-fg outline-none">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted">
        A calendar invite with the Meet link is on its way to {email}
        {guests.length ? ` and ${guests.length} ${guests.length === 1 ? "guest" : "guests"}` : ""}.
      </p>
      <div className="mt-5 max-w-lg space-y-3">
        <SlotSummary start={booking.start} end={booking.end} tz={tz} />
        {booking.meetLink && (
          <p className="flex items-center gap-2.5 rounded-md border border-border bg-bg px-4 py-3 text-sm">
            <Video className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
            <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-accent-text underline-offset-2 hover:underline">
              {booking.meetLink.replace(/^https:\/\//, "")}
              <span className="sr-only"> (Google Meet, opens in a new tab)</span>
            </a>
          </p>
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <a href={googleCalendarLink(event)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2.5 text-sm font-semibold text-fg transition hover:bg-surface-2">
          <CalendarPlus className="size-4" aria-hidden="true" /> Add to Google Calendar
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <button type="button" onClick={ics} className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2.5 text-sm font-semibold text-fg transition hover:bg-surface-2">
          <Download className="size-4" aria-hidden="true" /> Apple or Outlook (.ics)
        </button>
      </div>
      {booking.links && (
        <p className="mt-6 text-sm text-muted">
          Need to change it?{" "}
          <Link href={localPath(booking.links.reschedule)} className="font-semibold text-accent-text underline-offset-2 hover:underline">
            Reschedule
          </Link>{" "}
          or{" "}
          <Link href={localPath(booking.links.cancel)} className="font-semibold text-accent-text underline-offset-2 hover:underline">
            cancel
          </Link>
          . These links are also in your invite.
        </p>
      )}
    </div>
  );
}

/* Fallback until Google is connected ------------------------------------- */

export function BookingFallback({ reason = "soon" }: { reason?: "soon" | "error" }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <h2 className="text-xl font-semibold text-fg">{reason === "soon" ? "Online booking opens soon" : "Booking is unavailable right now"}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        {reason === "soon"
          ? "Until it does, tell us a few times that suit you and what you'd like to discuss. We'll send a Google Meet invite within one business day."
          : "Please try again in a few minutes, or tell us a few times that suit you and we'll send a Google Meet invite."}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#contact" className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover">
          Suggest a time
        </a>
        <Link href="/contact" className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-semibold text-fg transition hover:bg-surface-2">
          Contact page
        </Link>
      </div>
    </div>
  );
}
