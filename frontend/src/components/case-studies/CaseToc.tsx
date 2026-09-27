"use client";

import { useEffect, useState } from "react";

/** Sticky "on this page" list that highlights the section in view. */
export function CaseToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    // Scroll-driven rather than an IntersectionObserver band: a thin band misses short
    // sections on fast scrolls and never reaches the last one at the bottom of the page.
    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const last = sections[sections.length - 1];
      if (atBottom && last.getBoundingClientRect().top < window.innerHeight) current = last.id;
      setActive(current);
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
    <nav aria-label="On this page" className="sticky top-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">On this page</p>
      <ol className="relative mt-5 flex flex-col border-l border-border">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={`-ml-px flex gap-3 border-l-2 py-2 pl-4 text-sm transition-all duration-300 ${
                active === item.id ? "border-accent-text text-fg" : "border-transparent text-muted hover:text-fg"
              }`}
            >
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
