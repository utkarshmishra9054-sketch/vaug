"use client";

import { useEffect, useRef, useState } from "react";

import type { Milestone } from "@/content/company";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";

/**
 * Vertical company timeline. The spine fills as you scroll, and each
 * milestone lights up once the fill reaches it. Alternates sides on desktop.
 */
export function JourneyTimeline({ items }: { items: Milestone[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      if (reduce) {
        el.style.setProperty("--progress", "1");
        setActive(items.length - 1);
        return;
      }
      const anchor = window.innerHeight * 0.62;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      el.style.setProperty("--progress", p.toFixed(4));
      let a = -1;
      el.querySelectorAll<HTMLElement>("[data-marker]").forEach((m, i) => {
        if (m.getBoundingClientRect().top < anchor) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  return (
    <div className="frame-pad pb-20 pt-4 lg:pb-28">
      <ol ref={list} className="relative" style={{ "--progress": 0 } as React.CSSProperties}>
        {/* spine */}
        <span aria-hidden="true" className="absolute inset-y-0 left-[15px] w-px bg-border lg:left-1/2" />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-[14px] w-[3px] origin-top rounded-full bg-gradient-to-b from-purple via-accent-text to-yellow lg:left-[calc(50%-1px)]"
          style={{ transform: "scaleY(var(--progress))" }}
        />
        {/* travelling head */}
        <span
          aria-hidden="true"
          className="absolute left-[15px] z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow shadow-[0_0_0_6px_rgb(255_210_63/0.2),0_0_24px_rgb(255_210_63/0.8)] lg:left-1/2"
          style={{ top: "calc(var(--progress) * 100%)" }}
        />

        {items.map((m, i) => {
          const on = i <= active;
          const right = i % 2 === 1;
          return (
            <li key={m.year} data-active={on} className="group relative grid pb-16 pl-12 last:pb-0 lg:grid-cols-2 lg:gap-x-24 lg:pb-24 lg:pl-0">
              {/* marker */}
              <span
                data-marker
                aria-hidden="true"
                className="absolute left-[15px] top-1 z-10 inline-flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-bg text-subtle transition-all duration-500 group-data-[active=true]:scale-110 group-data-[active=true]:border-accent-text group-data-[active=true]:bg-accent-text group-data-[active=true]:text-bg lg:left-1/2"
              >
                <Icon name={m.icon} className="size-4" />
              </span>

              {/* big year on the opposite side (desktop) */}
              <div
                aria-hidden="true"
                className={`row-start-1 hidden lg:block ${right ? "col-start-1 text-right" : "col-start-2"}`}
              >
                <span className="company-year inline-block text-[7rem] font-black leading-none tracking-[-0.06em] transition-all duration-700 group-data-[active=true]:[-webkit-text-stroke-color:var(--accent-text)]">
                  {m.year}
                </span>
              </div>

              {/* card */}
              <div
                className={`row-start-1 translate-y-4 opacity-40 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 ${
                  right ? "lg:col-start-2" : "lg:col-start-1 lg:text-right"
                }`}
              >
                <p className={`flex flex-wrap items-center gap-2 font-mono text-sm text-accent-text ${right ? "" : "lg:justify-end"}`}>
                  {m.year}
                  <DemoBadge show={m.placeholder} />
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-snug tracking-[-0.02em] text-fg sm:text-3xl">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-muted sm:text-lg">{m.description}</p>
                <ul className={`mt-5 flex flex-wrap gap-2 ${right ? "" : "lg:justify-end"}`}>
                  {m.tags.map((t) => (
                    <li key={t} className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
