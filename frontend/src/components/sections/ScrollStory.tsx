"use client";

import { useEffect, useRef, useState } from "react";

/** Progress (0–1) of an element travelling through the viewport. */
export function useScrollProgress<T extends HTMLElement>(mode: "through" | "pinned") {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "pinned"
          ? -rect.top / Math.max(1, rect.height - vh)
          : (vh - rect.top) / (vh * 0.75 + rect.height * 0.25);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode]);

  return [ref, progress] as const;
}

/** Wordmark whose letters darken one by one as it scrolls into view. */
export function RevealWordmark({ text, badge }: { text: string; badge: string }) {
  const [ref, progress] = useScrollProgress<HTMLHeadingElement>("through");
  const letters = [...text];

  return (
    <h2 ref={ref} data-cursor="VAUG" className="flex flex-wrap items-center justify-center gap-x-3 text-5xl font-bold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
      <span aria-label={text}>
        {letters.map((ch, i) => {
          const t = Math.min(1, Math.max(0, progress * 1.6 - (i / letters.length) * 0.9));
          return (
            <span key={i} aria-hidden="true" style={{ opacity: 0.12 + t * 0.88 }} className="transition-opacity duration-150">
              {ch}
            </span>
          );
        })}
      </span>
      <span
        style={{ transform: `scale(${0.6 + Math.min(1, progress * 1.4) * 0.4})`, opacity: Math.min(1, progress * 1.6) }}
        className="inline-flex rounded-md bg-accent px-3 py-1 text-accent-fg"
      >
        {badge}
      </span>
    </h2>
  );
}
