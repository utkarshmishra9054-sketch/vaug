"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarX, Loader2, Video } from "lucide-react";

import { MonthCalendar, SlotList, SlotSummary, TimeZoneSelect, bookingApi, type BookingConfig } from "./parts";
import { formatLongDate, formatTime } from "./time";
import { fromIndex, monthIndex, useAvailability, useCalendarState, useHydrated } from "./useAvailability";

type View = { id: string; status: "confirmed" | "cancelled"; start: string; end: string; timeZone: string; meetLink?: string; firstName: string };
type Mode = "view" | "reschedule" | "confirm-move" | "confirm-cancel";

/**
 * /book/manage?id=…#token=…: see, reschedule or cancel a booking. The token lives in the URL fragment,
 * so it is never sent to a server log or a Referer header; it goes to the API in a POST body.
 */
export function ManageBooking() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const hydrated = useHydrated();
  const token = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.hash.slice(1)).get("token") ?? "",
    () => "",
  );
  const [booking, setBooking] = useState<View | null>(null);
  const [loadProblem, setLoadProblem] = useState<string | null>(null);
  const problem = hydrated && (!id || !token) ? "This link is incomplete. Please use the reschedule or cancel link from your invite." : loadProblem;
  const [mode, setMode] = useState<Mode>("view");
  const [chosenTz, setChosenTz] = useState<string | null>(null);
  const tz = chosenTz ?? booking?.timeZone ?? "";
  const [config, setConfig] = useState<BookingConfig | null>(null);
  const [pick, setPick] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!id || !token) return;
    bookingApi<BookingConfig>("/config").then(({ json }) => json.ok && setConfig(json));
    bookingApi<{ booking?: View }>(`/manage/${encodeURIComponent(id)}`, { method: "POST", body: JSON.stringify({ token }) })
      .then(({ json }) => {
        if (!json.ok || !json.booking) return setLoadProblem(json.error ?? "This link isn't valid.");
        setBooking(json.booking);
        const action = params.get("action");
        if (json.booking.status === "confirmed") setMode(action === "cancel" ? "confirm-cancel" : action === "reschedule" ? "reschedule" : "view");
      })
      .catch(() => setLoadProblem("Couldn't load your booking. Please check your connection."));
  }, [id, token, params]);

  useEffect(() => heading.current?.focus(), [mode, done]);

  const windowDays = config?.windowDays ?? 30;
  const { days, counts, error: availError, refresh, bounds } = useAvailability(mode === "reschedule" && tz ? tz : null, windowDays);
  const { selected, setSelected, view, setView, reset } = useCalendarState(days, bounds);

  async function act(kind: "cancel" | "reschedule") {
    if (!booking) return;
    setBusy(true);
    setError(null);
    const body = kind === "cancel" ? { token } : { token, start: pick, timeZone: tz };
    try {
      const { json, status } = await bookingApi<{ booking?: View }>(`/manage/${encodeURIComponent(booking.id)}/${kind}`, { method: "POST", body: JSON.stringify(body) });
      if (json.ok && json.booking) {
        setBooking(json.booking);
        setDone(kind === "cancel" ? "Your call is cancelled. Everyone on the invite has been told." : "Your call has moved. Everyone on the invite has the new time.");
        setMode("view");
        setPick(null);
        return;
      }
      if (status === 409 && json.code === "slot") {
        setMode("reschedule");
        setPick(null);
        refresh();
      }
      setError(json.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (problem)
    return (
      <div>
        <h1 className="text-2xl font-semibold text-fg">Manage your booking</h1>
        <p role="alert" className="mt-3 text-sm text-red-300">
          {problem}
        </p>
        <Link href="/book" className="mt-5 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg">
          Book a new call
        </Link>
      </div>
    );

  if (!booking)
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-muted">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading your booking…
      </p>
    );

  const visible = view !== null ? fromIndex(view) : null;
  const selectedDay = days?.find((d) => d.date === selected) ?? null;
  const cancelled = booking.status === "cancelled";

  return (
    <div>
      <h1 ref={heading} tabIndex={-1} className="text-2xl font-semibold text-fg outline-none">
        {done ? (cancelled ? "Call cancelled" : "Call moved") : cancelled ? "This call was cancelled" : mode === "reschedule" ? "Pick a new time" : mode === "confirm-cancel" ? "Cancel this call?" : mode === "confirm-move" ? "Move your call?" : "Your call with VAUG"}
      </h1>
      {done && (
        <p role="status" className="mt-2 text-sm text-muted">
          {done}
        </p>
      )}

      <div className="mt-5 max-w-lg space-y-3">
        <SlotSummary start={booking.start} end={booking.end} tz={tz || booking.timeZone} />
        {booking.meetLink && !cancelled && (
          <p className="flex items-center gap-2.5 rounded-md border border-border bg-bg px-4 py-3 text-sm">
            <Video className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
            <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-accent-text underline-offset-2 hover:underline">
              {booking.meetLink.replace(/^https:\/\//, "")}
              <span className="sr-only"> (Google Meet, opens in a new tab)</span>
            </a>
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 max-w-lg rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {cancelled ? (
        <Link href="/book" className="mt-6 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg">
          Book a new call
        </Link>
      ) : mode === "view" ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMode("reschedule")} className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover">
            Reschedule
          </button>
          <button type="button" onClick={() => setMode("confirm-cancel")} className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-fg transition hover:bg-surface-2">
            Cancel call
          </button>
        </div>
      ) : mode === "confirm-cancel" ? (
        <div className="mt-6">
          <p className="text-sm text-muted">Everyone on the invite will be told it&apos;s cancelled.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" disabled={busy} onClick={() => act("cancel")} className="inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60">
              {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <CalendarX className="size-4" aria-hidden="true" />}
              Yes, cancel it
            </button>
            <button type="button" onClick={() => setMode("view")} className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-fg hover:bg-surface-2">
              Keep my call
            </button>
          </div>
        </div>
      ) : mode === "confirm-move" && pick ? (
        <div className="mt-6">
          <p className="text-sm text-muted">New time:</p>
          <div className="mt-2 max-w-lg">
            <SlotSummary start={pick} end={new Date(Date.parse(pick) + (config?.durationMinutes ?? 30) * 60_000).toISOString()} tz={tz} />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" disabled={busy} onClick={() => act("reschedule")} className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover disabled:opacity-60">
              {busy && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              Move my call
            </button>
            <button type="button" onClick={() => setMode("reschedule")} className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-fg hover:bg-surface-2">
              Pick another time
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-bg">
          <div className="grid lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,14rem)]">
            <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
              <TimeZoneSelect
                tz={tz}
                onTz={(z) => {
                  setChosenTz(z);
                  reset();
                }}
              />
              <button type="button" onClick={() => setMode("view")} className="mt-4 text-sm font-semibold text-accent-text hover:underline">
                Keep the current time
              </button>
            </div>
            {availError ? (
              <p role="alert" className="p-5 text-sm text-red-300 lg:col-span-2">
                {availError}
              </p>
            ) : !days || !visible || !bounds ? (
              <p role="status" className="flex items-center gap-2 p-5 text-sm text-muted lg:col-span-2">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading available times…
              </p>
            ) : (
              <>
                <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                  <MonthCalendar
                    year={visible.year}
                    month={visible.month}
                    available={counts}
                    selected={selected}
                    today={bounds.today}
                    canPrev={view! > monthIndex(bounds.first)}
                    canNext={view! < monthIndex(bounds.last)}
                    onMonth={(d) => setView(view! + d)}
                    onSelect={setSelected}
                  />
                </div>
                <div className="p-5">
                  <SlotList
                    day={selectedDay}
                    tz={tz}
                    onPick={(s) => {
                      setPick(s);
                      setMode("confirm-move");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {pick ? `Selected ${formatLongDate(pick, tz)} at ${formatTime(pick, tz)}` : ""}
      </p>
    </div>
  );
}
