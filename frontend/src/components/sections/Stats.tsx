"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Stat } from "@/content/types";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";
import { HeroConsole } from "./HeroConsole";

/** Counts up when scrolled into view, and again on each hover. */
function Counter({ value, suffix, replay }: { value: number; suffix: string; replay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, replay, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function StatTile({ stat, index, featured }: { stat: Stat; index: number; featured: boolean }) {
  const [replay, setReplay] = useState(0);

  return (
    <li
      data-reveal
      onMouseEnter={() => setReplay((r) => r + 1)}
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
      className={`group relative isolate flex h-56 cursor-default flex-col overflow-hidden p-6 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 sm:h-64 sm:p-8 ${
        featured ? "bg-purple text-white" : "bg-surface text-fg"
      }`}
    >
      {/* colour fill rising from the bottom on hover */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-y-100 ${
          featured ? "bg-yellow" : "bg-purple"
        }`}
      />
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex size-10 items-center justify-center rounded-md transition-all duration-500 group-hover:rotate-[-8deg] ${
            featured ? "bg-white/15 group-hover:bg-ink/10" : "bg-surface-2 group-hover:bg-white/15"
          }`}
        >
          <Icon name={stat.icon} className={`size-5 transition-colors duration-500 ${featured ? "group-hover:text-ink" : "group-hover:text-white"}`} />
        </span>
        <ArrowUpRight
          className={`size-5 -translate-x-2 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 ${
            featured ? "text-ink" : "text-white"
          }`}
          aria-hidden="true"
        />
      </div>

      <span
        className={`mt-auto text-5xl font-semibold tracking-[-0.04em] transition-[color,transform] duration-500 group-hover:-translate-y-5 sm:text-6xl ${
          featured ? "group-hover:text-ink" : "group-hover:text-white"
        }`}
      >
        <Counter value={stat.value} suffix={stat.suffix} replay={replay} />
      </span>
      <span
        className={`mt-2 flex items-center gap-2 text-base font-medium transition-[color,transform] duration-500 group-hover:-translate-y-5 ${
          featured ? "text-white group-hover:text-ink" : "text-fg group-hover:text-white"
        }`}
      >
        {stat.label}
        <DemoBadge show={stat.placeholder} />
      </span>
      {/* detail slides up on hover (absolutely placed, so the tile never changes size) */}
      <span
        className={`absolute inset-x-6 bottom-5 translate-y-3 text-sm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:inset-x-8 ${
          featured ? "text-ink/75" : "text-white/85"
        }`}
      >
        {stat.detail}
      </span>
      {/* progress tick along the bottom */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-1 w-0 transition-[width] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:w-full ${featured ? "bg-ink" : "bg-yellow"}`}
      />
    </li>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-20">
      <ul className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <StatTile key={stat.label} stat={stat} index={i} featured={i === 0} />
        ))}
      </ul>
      <div
        data-reveal
        style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        data-tone="dark"
        className="flex items-center bg-bg p-4 sm:p-8"
      >
        <HeroConsole />
      </div>
    </div>
  );
}
