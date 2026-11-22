"use client";

import { Pause, Play } from "lucide-react";

import { setMotionPaused } from "@/lib/motion";
import { useMotionPaused } from "@/lib/motionHooks";

/**
 * "Pause animations": stops every looping animation, ticker and carousel on
 * the site and remembers the choice (WCAG 2.2.2 Pause, Stop, Hide). Visitors
 * whose OS asks for reduced motion get the same result without pressing it.
 */
export function MotionToggle({ className = "", withLabel = false }: { className?: string; withLabel?: boolean }) {
  const paused = useMotionPaused();
  const label = paused ? "Play animations" : "Pause animations";
  return (
    <button
      type="button"
      onClick={() => setMotionPaused(!paused)}
      aria-label={withLabel ? undefined : label}
      title={label}
      className={`group relative inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-md border border-border px-2.5 text-muted transition-colors hover:bg-surface-2 hover:text-fg ${className}`}
    >
      {paused ? <Play className="size-[16px]" aria-hidden="true" /> : <Pause className="size-[16px]" aria-hidden="true" />}
      {withLabel && <span className="text-sm">{label}</span>}
    </button>
  );
}
