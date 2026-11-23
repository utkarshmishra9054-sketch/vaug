"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { bookingApi } from "./parts";
import { browserTimeZone, dateKeyIn, ym, type Day } from "./time";

const noSubscribe = () => () => {};

/** The browser's time zone ("" during server rendering). */
export const useBrowserTimeZone = () => useSyncExternalStore(noSubscribe, browserTimeZone, () => "");

/** True once running in the browser. */
export const useHydrated = () => useSyncExternalStore(noSubscribe, () => true, () => false);

type Result = { key: string; days: Day[] | null; error: string | null; disabled: boolean };

/** Free slots for a time zone, plus month-navigation bounds for the booking window. */
export function useAvailability(tz: string | null, windowDays: number) {
  const [nonce, setNonce] = useState(0);
  const key = tz ? `${tz}|${nonce}` : "";
  const [result, setResult] = useState<Result>({ key: "", days: null, error: null, disabled: false });

  useEffect(() => {
    if (!tz) return;
    let live = true;
    bookingApi<{ days?: Day[] }>(`/availability?tz=${encodeURIComponent(tz)}`)
      .then(({ status, json }) => {
        if (!live) return;
        if (json.ok && json.days) return setResult({ key, days: json.days, error: null, disabled: false });
        setResult({ key, days: null, error: json.error ?? "Couldn't load the available times.", disabled: status === 503 && Boolean(json.disabled) });
      })
      .catch(() => live && setResult({ key, days: null, error: "Couldn't load the available times. Please check your connection.", disabled: false }));
    return () => {
      live = false;
    };
  }, [tz, key]);

  const current = result.key === key && key !== "";
  const days = current ? result.days : null;
  const refresh = useCallback(() => setNonce((n) => n + 1), []);
  const counts = useMemo(() => new Map((days ?? []).map((d) => [d.date, d.slots.length])), [days]);
  const bounds = useMemo(() => {
    if (!tz) return null;
    const now = new Date();
    return { today: dateKeyIn(now, tz), first: ym(dateKeyIn(now, tz)), last: ym(dateKeyIn(new Date(now.getTime() + windowDays * 86_400_000), tz)) };
  }, [tz, windowDays]);

  return { days, counts, error: current && !result.disabled ? result.error : null, disabled: current && result.disabled, loading: Boolean(tz) && !current, refresh, bounds };
}

export const monthIndex = (p: { year: number; month: number }) => p.year * 12 + (p.month - 1);
export const fromIndex = (i: number) => ({ year: Math.floor(i / 12), month: (i % 12) + 1 });

/** The selected day and visible month: the user's choice when still valid, else the first day with times. */
export function useCalendarState(days: Day[] | null, bounds: { first: { year: number; month: number } } | null) {
  const [chosenDay, setChosenDay] = useState<string | null>(null);
  const [chosenView, setChosenView] = useState<number | null>(null);
  const firstDay = days?.[0]?.date ?? null;
  const selected = chosenDay && days?.some((d) => d.date === chosenDay) ? chosenDay : firstDay;
  const view = chosenView ?? (firstDay ? monthIndex(ym(firstDay)) : bounds ? monthIndex(bounds.first) : null);
  const reset = useCallback(() => {
    setChosenDay(null);
    setChosenView(null);
  }, []);
  return { selected, setSelected: setChosenDay, view, setView: setChosenView, reset };
}
