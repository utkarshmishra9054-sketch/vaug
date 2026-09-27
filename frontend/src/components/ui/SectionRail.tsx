"use client";

import { useEffect, useState } from "react";

/**
 * Slim "you are here" rail for long pages (wide screens only, where the
 * margin beside the content frame is free). Highlights the section in view;
 * each dot jumps to its section and shows its name on hover or focus.
 */
export function SectionRail({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Page sections" className={`fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 2xl:block ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <ol className="glass flex flex-col gap-1 rounded-full px-2 py-3 [--surface:rgb(19_17_22/0.55)]">
        {items.map((item) => {
          const on = active === item.id;
          return (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={on ? "true" : undefined} className="group relative flex size-6 items-center justify-center">
                <span className={`rounded-full transition-all duration-300 ${on ? "h-4 w-1.5 bg-yellow" : "size-1.5 bg-white/40 group-hover:bg-white"}`} />
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-paper opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 translate-x-1 group-hover:translate-x-0">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
