"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import type { EngineeringSlug, IconName } from "@/content/types";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DisciplineVisual } from "./Visuals";

export interface ExplorerItem {
  slug: EngineeringSlug;
  label: string;
  short: string;
  icon: IconName;
  href: string;
  visualLabel: string;
  title: string;
  highlights: string[];
  tags: string[];
}

const AUTOPLAY_MS = 7000;

/**
 * Tabbed explorer for the eight disciplines: tab list on the left,
 * the active discipline's animated visual and highlights on the right.
 * Cycles on its own until the visitor picks a tab.
 */
export function DisciplineExplorer({ items }: { items: ExplorerItem[] }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, autoplay, inView, items.length]);

  // On phones the tab list scrolls sideways: keep the active tab visible as autoplay advances.
  useEffect(() => {
    const tab = tabs.current[active];
    const list = tab?.parentElement;
    if (!tab || !list || list.scrollWidth <= list.clientWidth) return;
    const offset = tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
    const left = offset - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  const select = (i: number, focus = false) => {
    setAutoplay(false);
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") select((active + 1) % n, true);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") select((active - 1 + n) % n, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(n - 1, true);
    else return;
    e.preventDefault();
  };

  const item = items[active];

  return (
    <div ref={root} className="grid border-t border-border lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <div role="tablist" aria-label="Engineering disciplines" aria-orientation="vertical" onKeyDown={onKey} className="no-scrollbar flex overflow-x-auto border-b border-border lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
        {items.map((it, i) => {
          const selected = i === active;
          return (
            <button
              key={it.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`eng-tab-${it.slug}`}
              aria-selected={selected}
              aria-controls="eng-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={`group relative flex shrink-0 items-center gap-3 border-r border-border px-5 py-4 text-left transition-colors lg:border-b lg:border-r-0 lg:px-6 lg:py-5 ${selected ? "bg-surface text-fg" : "text-muted hover:bg-surface/60 hover:text-fg"}`}
            >
              <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors ${selected ? "border-accent-text bg-accent-soft text-accent-text" : "border-border text-subtle group-hover:text-fg"}`}>
                <Icon name={it.icon} className="size-4.5" />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold lg:whitespace-normal lg:text-base">{it.label}</span>
              {/* autoplay progress / active marker */}
              <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-0.5">
                {selected && <span key={`${active}-${autoplay && inView}`} className={`block size-full bg-accent-text ${autoplay && inView ? "eng-a-fill lg:animate-none" : ""}`} style={{ "--eng-d": `${AUTOPLAY_MS}ms` } as React.CSSProperties} />}
              </span>
            </button>
          );
        })}
      </div>

      <div id="eng-panel" role="tabpanel" aria-labelledby={`eng-tab-${item.slug}`} className="grid gap-10 p-6 sm:p-8 lg:p-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:items-center">
        <div key={item.slug} className="eng-a-fade order-2 xl:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">{item.label}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{item.short}.</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-fg">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <li key={t} className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ArrowLink href={item.href}>Explore {item.label}</ArrowLink>
            <Link href="#contact" className="link-underline text-sm font-semibold text-fg">
              Talk to an engineer
            </Link>
          </div>
        </div>
        <Link key={`v-${item.slug}`} href={item.href} data-cursor="Explore" aria-label={`Explore ${item.label}`} className="eng-a-fade group relative order-1 block xl:order-2">
          <DisciplineVisual slug={item.slug} label={item.visualLabel} title={item.title} />
          <span className="absolute right-3 top-12 inline-flex size-9 items-center justify-center rounded-full bg-yellow text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}
