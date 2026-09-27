"use client";

import { useEffect, useState } from "react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/** Friendlier timing copy for the short labels stored in content. */
const timing: Record<string, string> = {
  Now: "As soon as you send",
  "< 1 day": "Within 1 business day",
  "Day 2–3": "Day 2–3",
  "48 hrs": "Within 48 hours",
};

const STEP_MS = 2200;

/**
 * Hero visual for /contact: an explainer of what happens after a visitor
 * sends an enquiry. Every step is shown as upcoming (numbered, outlined);
 * a soft highlight walks through them as a preview. Nothing is ever shown as
 * completed, so it can't be mistaken for a live status tracker. Under
 * prefers-reduced-motion the list is static.
 */
export function HeroTracker({ title, events }: { title: string; events: { label: string; detail: string; time: string }[] }) {
  // Step being previewed; -1 means none (initial render and reduced motion).
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % events.length), STEP_MS);
    return () => clearInterval(id);
  }, [events.length]);

  return (
    <div data-tilt className="glass relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-border p-5 sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-purple/30 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{title}</p>
        <IllustrativeTag label="Typical timeline" />
      </div>
      <p className="relative mt-3 text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">What happens after you send</p>

      <ol className="relative mt-6">
        {events.map((e, i) => {
          const on = i === active;
          return (
            <li
              key={e.label}
              className={`relative flex items-start gap-4 rounded-lg p-3 transition-colors duration-700 ease-out ${on ? "bg-surface-2/70" : "bg-transparent"}`}
            >
              {/* dashed connector to the next step: steps ahead, not progress */}
              {i < events.length - 1 && <span aria-hidden="true" className="absolute -bottom-3 left-[27px] z-[1] top-[43px] border-l border-dashed border-border-strong" />}
              <span
                aria-hidden="true"
                className={`relative z-10 inline-flex size-[31px] shrink-0 items-center justify-center rounded-full border bg-surface font-mono text-xs font-bold transition-all duration-700 ${
                  on ? "border-purple-light text-fg shadow-[0_0_0_5px_rgb(139_92_246/0.18)]" : "border-border-strong text-subtle"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-semibold text-fg">
                    <span className="sr-only">Step {i + 1}: </span>
                    {e.label}
                  </p>
                  <span className={`shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-[10px] transition-colors duration-700 ${on ? "bg-accent-soft text-accent-text" : "bg-surface-2 text-muted"}`}>
                    {timing[e.time] ?? e.time}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{e.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
