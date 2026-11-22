"use client";

import { useSyncExternalStore } from "react";

import { overlapRegions, teamHours } from "@/content/workingWithUs";

/**
 * For each region, the hours (in that region's own time) when our team is online
 * with them: core hours clipped to a 08:00–18:00 local working day, or the fixed US
 * window (a meeting slot clients book into, so not clipped). Computed for today's date in
 * the browser, so daylight saving is always right; the server renders a fixed
 * winter date. The visitor's own time zone is added as a row when it isn't listed.
 */

const DAY_START = 8 * 60;
const DAY_END = 18 * 60;
/** The bar axis: 06:00–18:00 local, wide enough for the US window on the West Coast. */
const AXIS_START = 6 * 60;
const AXIS_END = 18 * 60;
const SERVER_DAY = "2026-01-15";
const noop = () => () => {};

/** Minutes east of UTC for a time zone on a given day. */
function offsetMinutes(tz: string, day: string) {
  const at = new Date(`${day}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return Math.round((Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute")) - at.getTime()) / 60000);
}

const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const hours = (m: number) => `${Number.isInteger(m / 60) ? m / 60 : (m / 60).toFixed(1)} h`;

function overlapFor(tz: string, window: "core" | "usWindow", day: string) {
  const w = teamHours[window];
  const shift = offsetMinutes(tz, day) - offsetMinutes(w.tz, day);
  let start = w.start + shift;
  let end = w.end + shift;
  // Keep the window on the local clock (it can cross midnight for far-off zones).
  const wrap = start < 0 ? 1440 : start >= 1440 ? -1440 : 0;
  start += wrap;
  end += wrap;
  if (window === "core") {
    start = Math.max(start, DAY_START);
    end = Math.min(end, DAY_END);
  }
  return end > start && end <= 1440 ? { start, end } : null;
}

export function OverlapChart() {
  const day = useSyncExternalStore(noop, () => new Date().toISOString().slice(0, 10), () => SERVER_DAY);
  const visitorTz = useSyncExternalStore(noop, () => Intl.DateTimeFormat().resolvedOptions().timeZone, () => "");

  const rows = overlapRegions.map((r) => ({ ...r, mine: r.tz === visitorTz }));
  if (visitorTz && !rows.some((r) => r.mine)) {
    rows.push({ label: "Your time zone", city: visitorTz.split("/").pop()!.replace(/_/g, " "), tz: visitorTz, window: visitorTz.startsWith("America/") ? "usWindow" : "core", mine: true });
  }

  return (
    <div className="frame-pad">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Daily overlap between the VAUG team and each region, in local time</caption>
          <thead className="border-b border-border bg-surface-2 text-xs uppercase tracking-[0.12em] text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-mono font-medium sm:px-6">
                Region
              </th>
              <th scope="col" className="hidden px-4 py-3 font-mono font-medium md:table-cell">
                <span className="flex justify-between" aria-hidden="true">
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                </span>
                <span className="sr-only">Local time, 06:00 to 18:00</span>
              </th>
              <th scope="col" className="px-4 py-3 font-mono font-medium sm:px-6">
                We&apos;re online with you
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const o = overlapFor(r.tz, r.window, day);
              const span = AXIS_END - AXIS_START;
              const bar = o && { left: Math.max(o.start, AXIS_START), right: Math.min(o.end, AXIS_END) };
              return (
                <tr key={r.tz + r.label} className={`border-b border-border last:border-b-0 ${r.mine ? "bg-accent-soft" : ""}`}>
                  <th scope="row" className="px-4 py-4 font-medium text-fg sm:px-6">
                    {r.label}
                    <span className="block text-xs font-normal text-muted">
                      {r.city}
                      {r.mine && r.label !== "Your time zone" ? " · your time zone" : ""}
                    </span>
                  </th>
                  <td className="hidden w-[45%] px-4 py-4 md:table-cell" aria-hidden="true">
                    <div className="relative h-3 rounded-full bg-surface-2">
                      <span className="absolute inset-y-0 left-1/2 w-px bg-border" />
                      {bar && bar.right > bar.left && <span className="absolute inset-y-0 rounded-full bg-accent" style={{ left: `${((bar.left - AXIS_START) / span) * 100}%`, width: `${((bar.right - bar.left) / span) * 100}%` }} />}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-[13px] text-fg sm:px-6">
                    {o ? (
                      <>
                        {fmt(o.start)}–{fmt(o.end)}
                        <span className="ml-2 text-muted">({hours(o.end - o.start)})</span>
                      </>
                    ) : (
                      <span className="text-muted">By arrangement</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Local times for today, with daylight saving applied. Core hours are 10:00–19:00 India time; the US window is 9 a.m.–1 p.m. Eastern all year.
      </p>
    </div>
  );
}
