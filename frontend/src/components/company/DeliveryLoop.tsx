"use client";

import { useEffect, useRef, useState } from "react";

import type { CycleStage } from "@/content/howWeWork";

/**
 * The weekly delivery cycle as a loop: stages sit on a ring, a comet travels
 * round it and the active stage's details show alongside. Click a stage to pin it.
 */
export function DeliveryLoop({ stages }: { stages: CycleStage[] }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const n = stages.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !reduce), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const t = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => clearInterval(t);
  }, [auto, visible]);

  const active = ((index % n) + n) % n;
  const stage = stages[active];
  // Rotation keeps increasing so the comet always travels forwards.
  const rotation = (index / n) * 360;

  return (
    <div ref={root} className="grid border-t border-border lg:grid-cols-2">
      <div className="flex items-center justify-center border-b border-border p-6 sm:p-10 lg:border-b-0 lg:border-r">
        <div className="relative aspect-square w-full max-w-[26rem]">
          {/* ring */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden="true">
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 4" />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="var(--accent-text)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="18 82"
              className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.6,0,0.2,1)]"
              style={{ transformOrigin: "100px 100px", transform: `rotate(${rotation - 90 - 18 * 3.6}deg)` }}
            />
          </svg>
          {/* comet head */}
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.6,0,0.2,1)]" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true">
            <span className="absolute left-1/2 top-[10%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow shadow-[0_0_18px_4px_rgb(255_210_63/0.7)]" />
          </div>

          {/* centre */}
          <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full border border-border bg-surface text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Week</span>
            <span className="text-3xl font-black tracking-[-0.05em] text-fg sm:text-4xl">{Math.floor(index / n) + 1}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-text">and repeat</span>
          </div>

          {/* stage nodes */}
          <ul role="tablist" aria-label="Delivery cycle stages">
            {stages.map((s, i) => {
              const a = (i / n) * Math.PI * 2;
              const on = i === active;
              return (
                <li key={s.title} role="presentation" className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(50 + 40 * Math.sin(a)).toFixed(3)}%`, top: `${(50 - 40 * Math.cos(a)).toFixed(3)}%` }}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="loop-panel"
                    onClick={() => {
                      setIndex(Math.floor(index / n) * n + i + (i < active ? n : 0));
                      setAuto(false);
                    }}
                    className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-all duration-500 sm:px-4 sm:py-2 ${
                      on ? "scale-110 border-transparent bg-accent text-accent-fg shadow-[0_10px_30px_-10px_var(--accent)]" : "border-border bg-bg text-muted hover:text-fg"
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div id="loop-panel" role="tabpanel" className="frame-pad flex flex-col justify-center py-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
          Stage {active + 1} of {n}
        </p>
        <div key={active} className="company-slide">
          <h3 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">{stage.title}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{stage.description}</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-subtle">What you get</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stage.outputs.map((o, i) => (
              <li key={o} className="company-pop rounded-sm bg-surface-2 px-3 py-1.5 text-sm text-fg" style={{ animationDelay: `${150 + i * 90}ms` }}>
                {o}
              </li>
            ))}
          </ul>
        </div>
        {/* mini progress */}
        <div className="mt-10 flex gap-1.5" aria-hidden="true">
          {stages.map((s, i) => (
            <span key={s.title} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-accent-text" : "bg-border"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
