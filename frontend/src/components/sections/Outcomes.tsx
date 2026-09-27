"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Outcome } from "@/content/types";

/**
 * Results pulled from real case studies. A spotlight glides from card to card
 * while the section is on screen, pauses on hover, and each card links to its
 * case study.
 */
export function Outcomes({ outcomes }: { outcomes: Outcome[] }) {
  const root = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % outcomes.length), 2800);
    return () => clearInterval(id);
  }, [inView, paused, outcomes.length]);

  return (
    <ul ref={root} onMouseLeave={() => setPaused(false)} className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {outcomes.map((o, i) => {
        const on = i === active;
        return (
          <li
            key={o.href}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
            onMouseEnter={() => {
              setPaused(true);
              setActive(i);
            }}
            className="border-b border-border sm:border-r"
          >
            <Link
              href={o.href}
              onFocus={() => {
                setPaused(true);
                setActive(i);
              }}
              className={`group relative flex h-full flex-col overflow-hidden p-8 transition-colors duration-500 lg:p-10 ${on ? "bg-surface" : ""}`}
            >
              {/* accent rail that grows on the spotlighted card */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${on ? "scale-x-100" : "scale-x-0"}`}
                style={{ background: o.tint }}
              />
              <span className="flex items-baseline justify-between gap-4">
                <span className={`text-5xl font-semibold tracking-[-0.04em] transition-colors duration-500 ${on ? "text-fg" : "text-fg/80"}`}>{o.value}</span>
                <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
              </span>
              <span className="mt-2 block text-sm text-muted">{o.label}</span>
              <span className="mt-6 block leading-relaxed text-fg">{o.text}</span>
              <span className="mt-auto flex items-center gap-3 pt-8">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: o.tint }} aria-hidden="true" />
                <span className="text-sm">
                  <span className="font-semibold text-fg">{o.client}</span>
                  <span className="text-muted"> · {o.service}</span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
