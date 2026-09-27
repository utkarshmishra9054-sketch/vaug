"use client";

import { useEffect, useRef } from "react";

/**
 * Big moving ticker. Drifts on its own, speeds up and skews with scroll
 * velocity, and reverses direction when the visitor scrolls up.
 */
export function TickerBand({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const tick = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(dy), 80) - boost) * 0.12;
      x -= dir * (0.6 + boost * 0.35);
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translateX(${x}px) skewX(${-dir * Math.min(boost, 40) * 0.25}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = [...items, ...items];

  return (
    <section aria-label="What we do" className="overflow-hidden border-b border-ink/10 bg-yellow py-5 text-ink sm:py-7">
      <p className="sr-only">{items.join(", ")}</p>
      <div ref={track} aria-hidden="true" className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className={`px-6 text-4xl font-black tracking-[-0.05em] sm:px-10 sm:text-6xl ${i % 2 ? "text-purple" : ""}`}>
                  {item}
                </span>
                {/* VAUG dot-arrow as the separator */}
                <svg viewBox="0 0 40 16" className="h-4 w-10 shrink-0 text-purple sm:h-5 sm:w-12" fill="none" aria-hidden="true">
                  <path d="M3 8 H33" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  <path d="M28 2.5 L35 8 L28 13.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
