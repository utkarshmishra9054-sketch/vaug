"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { BookingFallback, BookingForm, Confirmation, HostPanel, MonthCalendar, SlotList, bookingApi, type Booked, type BookingConfig } from "./parts";
import { fromIndex, monthIndex, useAvailability, useBrowserTimeZone, useCalendarState } from "./useAvailability";

/**
 * vaug.in/book: pick a day, pick a time in your own time zone, add your details, get a Google Meet
 * invite. Laid out like a calendar booking page: host details, month, times.
 */
export function BookingApp() {
  const [config, setConfig] = useState<BookingConfig | "error" | null>(null);
  const detected = useBrowserTimeZone();
  const [chosenTz, setChosenTz] = useState<string | null>(null);
  const tz = chosenTz ?? detected;
  const cfg = config && config !== "error" ? config : null;
  const enabled = Boolean(cfg?.enabled);
  const windowDays = cfg?.windowDays ?? 30;
  const { days, counts, error, disabled, loading: loadingSlots, refresh, bounds } = useAvailability(enabled && tz ? tz : null, windowDays);
  const { selected, setSelected, view, setView, reset } = useCalendarState(days, bounds);
  const [slot, setSlot] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [booked, setBooked] = useState<{ booking: Booked; email: string; guests: string[] } | null>(null);
  const slotsHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    bookingApi<BookingConfig>("/config")
      .then(({ json }) => setConfig(json.ok ? json : "error"))
      .catch(() => setConfig("error"));
  }, []);

  const changeZone = (next: string) => {
    setChosenTz(next);
    setSlot(null);
    reset();
  };

  const pickDay = (date: string) => {
    setSelected(date);
    setNotice(null);
    // On phones the times sit below the calendar: take the reader there.
    if (window.matchMedia("(max-width: 1023px)").matches) requestAnimationFrame(() => slotsHeading.current?.focus());
  };

  const loading = config === null || !tz || (enabled && loadingSlots);
  const unavailable = config === "error" || (cfg !== null && !cfg.enabled) || disabled;
  const duration = cfg?.durationMinutes ?? 30;
  const visible = view !== null ? fromIndex(view) : null;
  const selectedDay = days?.find((d) => d.date === selected) ?? null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,15rem)]">
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
          <HostPanel duration={duration} tz={tz} onTz={changeZone} showZone={!unavailable && !booked} />
        </div>

        {booked ? (
          <div className="p-6 lg:col-span-2 lg:p-8">
            <Confirmation booking={booked.booking} email={booked.email} guests={booked.guests} tz={tz} durationMinutes={duration} />
          </div>
        ) : unavailable ? (
          <div className="p-6 lg:col-span-2 lg:p-8">
            <BookingFallback reason={config === "error" ? "error" : "soon"} />
          </div>
        ) : loading ? (
          <div className="flex min-h-80 items-center justify-center gap-2 p-6 text-sm text-muted lg:col-span-2" role="status">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading available times…
          </div>
        ) : error ? (
          <div className="p-6 lg:col-span-2 lg:p-8">
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
            <button type="button" onClick={refresh} className="mt-4 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-fg hover:bg-surface-2">
              Try again
            </button>
          </div>
        ) : slot && cfg ? (
          <div className="p-6 lg:col-span-2 lg:p-8">
            <BookingForm
              start={slot}
              durationMinutes={duration}
              tz={tz}
              maxGuests={cfg.maxGuests}
              onBack={() => setSlot(null)}
              onBooked={(booking, who) => setBooked({ booking, ...who })}
              onSlotTaken={(message) => {
                setSlot(null);
                setNotice(message);
                refresh();
              }}
            />
          </div>
        ) : (
          <>
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
              {notice && (
                <p role="alert" className="mb-4 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {notice}
                </p>
              )}
              {visible && bounds && (
                <MonthCalendar
                  year={visible.year}
                  month={visible.month}
                  available={counts}
                  selected={selected}
                  today={bounds.today}
                  canPrev={view! > monthIndex(bounds.first)}
                  canNext={view! < monthIndex(bounds.last)}
                  onMonth={(d) => setView(view! + d)}
                  onSelect={pickDay}
                />
              )}
              {days && days.length === 0 && <p className="mt-4 text-sm text-muted">No free times in the next {windowDays} days. Please write to us and we&apos;ll find one.</p>}
            </div>
            <div className="p-6">
              <SlotList day={selectedDay} tz={tz} onPick={setSlot} headingRef={slotsHeading} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
