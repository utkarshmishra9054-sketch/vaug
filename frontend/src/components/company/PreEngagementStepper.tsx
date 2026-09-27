"use client";

import { useEffect, useRef, useState } from "react";

import type { Feature } from "@/content/types";

/**
 * Eight pre-engagement steps as an animated stepper: a rail with numbered
 * stops that auto-advances while in view. Clicking a stop pins it.
 * Without JS every step is listed with its description.
 */
export function PreEngagementStepper({ steps }: { steps: Feature[] }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !reduce), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % steps.length), 3200);
    return () => clearInterval(t);
  }, [auto, visible, steps.length]);

  // On narrow screens the rail scrolls sideways: keep the active stop in view as it advances.
  useEffect(() => {
    const sc = rail.current;
    if (!sc || sc.scrollWidth <= sc.clientWidth) return;
    const btn = sc.querySelector<HTMLElement>(`#pre-tab-${index}`);
    if (!btn) return;
    const b = btn.getBoundingClientRect();
    const r = sc.getBoundingClientRect();
    const target = sc.scrollLeft + (b.left + b.width / 2) - (r.left + r.width / 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sc.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  }, [index]);

  const step = steps[index];
  const pct = steps.length > 1 ? (index / (steps.length - 1)) * 100 : 0;

  return (
    <div ref={root} className="border-t border-border">
      {/* rail */}
      <div ref={rail} className="frame-pad overflow-x-auto py-10 no-scrollbar">
        <div className="relative min-w-[40rem]">
          <span aria-hidden="true" className="absolute left-5 right-5 top-5 h-0.5 bg-border" />
          <span aria-hidden="true" className="absolute left-5 top-5 h-0.5 bg-gradient-to-r from-purple to-accent-text transition-[width] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: `calc((100% - 2.5rem) * ${pct / 100})` }} />
          <ol className="relative flex justify-between" role="tablist" aria-label="Pre-engagement steps">
            {steps.map((s, i) => {
              const done = i < index;
              const on = i === index;
              return (
                <li key={s.title} className="flex w-20 flex-col items-center text-center" role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`pre-tab-${i}`}
                    aria-selected={on}
                    aria-controls="pre-panel"
                    onClick={() => {
                      setIndex(i);
                      setAuto(false);
                    }}
                    className={`relative inline-flex size-10 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-all duration-500 ${
                      on
                        ? "scale-110 border-accent-text bg-accent-text text-bg shadow-[0_0_0_6px_var(--accent-soft)]"
                        : done
                          ? "border-accent-text bg-bg text-accent-text"
                          : "border-border bg-bg text-subtle hover:border-border-strong hover:text-fg"
                    }`}
                  >
                    {on && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border-2 border-accent-text opacity-40 [animation-duration:2s]" />}
                    {String(i + 1).padStart(2, "0")}
                  </button>
                  <span className={`mt-3 text-xs font-medium leading-tight transition-colors sm:text-sm ${on ? "text-fg" : "text-muted"}`}>{s.title}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* panel */}
      <div id="pre-panel" role="tabpanel" aria-labelledby={`pre-tab-${index}`} className="grid border-t border-border md:grid-cols-[auto_minmax(0,1fr)]">
        <div className="frame-pad flex items-center border-border pt-8 md:border-r md:py-12">
          <span key={index} className="company-flip block text-[3.5rem] font-black leading-none tracking-[-0.06em] text-accent-text sm:text-[5rem] md:text-[7rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div key={step.title} className="company-slide frame-pad pb-10 pt-4 md:py-12">
          {step.meta && <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{step.meta}</p>}
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">{step.title}</h3>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{step.description}</p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIndex((i) => (i - 1 + steps.length) % steps.length);
                setAuto(false);
              }}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => {
                setIndex((i) => (i + 1) % steps.length);
                setAuto(false);
              }}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
            >
              Next →
            </button>
            <span className="ml-auto font-mono text-xs text-subtle">
              {index + 1} / {steps.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
