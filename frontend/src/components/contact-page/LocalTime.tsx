"use client";

import { useSyncExternalStore } from "react";

// A shared one-second clock; the server snapshot is null so markup matches on hydration.
let now = Date.now();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 15_000);
  }
  now = Date.now();
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/** Current local time in an office's time zone, plus whether it's working hours. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const t = useSyncExternalStore(subscribe, () => now, () => null);

  if (t === null) {
    return <span className="font-mono text-xs text-subtle">--:--</span>;
  }

  const date = new Date(t);
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(date);
  const parts = new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", weekday: "short", timeZone }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const open = hour >= 9 && hour < 19 && weekday !== "Sat" && weekday !== "Sun";

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
      <span className={`size-1.5 rounded-full ${open ? "bg-emerald-500" : "bg-subtle"}`} aria-hidden="true" />
      <span>
        {time} local · {open ? "Open now" : "Out of hours"}
      </span>
    </span>
  );
}
