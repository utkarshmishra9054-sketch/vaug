"use client";

import { useEffect, useState } from "react";

/**
 * Sticky "On this page" list. Highlights the section currently being read
 * and shows reading progress through the document.
 */
export function LegalToc({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const update = () => {
      // The active section is the last one whose top has passed 35% of the viewport.
      const line = window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
      setActive(current);

      const first = sections[0].getBoundingClientRect().top + window.scrollY;
      const last = sections[sections.length - 1];
      const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const p = end > first ? (window.scrollY - first + line) / (end - first + line) : 1;
      setProgress(Math.max(0, Math.min(1, p)));
    };

    let raf = 0;
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
  }, [items]);

  return (
    <nav aria-label="On this page">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">On this page</p>
        <span className="font-mono text-[11px] text-subtle tabular-nums">{Math.round(progress * 100)}%</span>
      </div>
      <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <div className="h-full origin-left bg-accent-text transition-transform duration-200" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <ol className="mt-5 flex flex-col border-l border-border">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-300 ${
                  on ? "border-accent-text font-semibold text-fg" : "border-transparent text-muted hover:border-border-strong hover:text-fg"
                }`}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
