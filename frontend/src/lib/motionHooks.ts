"use client";

import { useSyncExternalStore } from "react";

import { isMotionPaused, prefersLessMotion, subscribeMotion } from "./motion";

/** React hook form of `prefersLessMotion()`; re-renders when either setting changes. Server: true (no motion). */
export function useLessMotion(serverValue = true): boolean {
  return useSyncExternalStore(subscribeMotion, prefersLessMotion, () => serverValue);
}

/** React hook for the site toggle's own state. */
export function useMotionPaused(): boolean {
  return useSyncExternalStore(subscribeMotion, isMotionPaused, () => false);
}
