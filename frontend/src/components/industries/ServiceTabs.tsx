"use client";

import { useId, useRef, useState } from "react";
import { Check } from "lucide-react";

import type { IconName } from "@/content/types";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export interface ServiceTabItem {
  label: string;
  icon: IconName;
  href: string;
  headline: string;
  description: string;
  points: string[];
}

/**
 * "How we help": VAUG services as tabs. Each panel explains the service in
 * the page's context and links to the service page.
 */
export function ServiceTabs({ items }: { items: ServiceTabItem[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | undefined;
    if (e.key in keys) next = (i + keys[e.key] + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid border-t border-border lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
      <div role="tablist" aria-orientation="vertical" aria-label="Services" className="grid grid-cols-2 border-border lg:grid-cols-1 lg:border-r">
        {items.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.href}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group relative flex items-center gap-3 border-b border-border p-5 text-left transition-colors max-lg:[&:nth-child(odd)]:border-r sm:p-6 lg:gap-4 lg:px-8 ${selected ? "bg-surface" : "hover:bg-surface"}`}
            >
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 origin-top bg-accent transition-transform duration-500 ${selected ? "scale-y-100" : "scale-y-0"}`} />
              <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-md transition-colors ${selected ? "bg-accent text-accent-fg" : "bg-surface-2 text-fg"}`}>
                <Icon name={t.icon} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className={`block text-sm font-semibold sm:text-base ${selected ? "text-fg" : "text-muted group-hover:text-fg"}`}>{t.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent-soft blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-6 text-[9rem] font-black leading-none tracking-[-0.06em] text-fg/[0.04] sm:text-[12rem]">
          {String(active + 1).padStart(2, "0")}
        </div>
        <div key={active} className="ind-panel-in relative flex h-full flex-col p-8 sm:p-10 lg:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{item.label}</p>
          <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-3xl">{item.headline}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{item.description}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {item.points.map((p, i) => (
              <li key={p} className="ind-point flex items-start gap-3 text-fg" style={{ animationDelay: `${120 + i * 90}ms` }}>
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 lg:mt-auto lg:pt-10">
            <ArrowLink href={item.href} variant="outline">
              Explore {item.label}
            </ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}
