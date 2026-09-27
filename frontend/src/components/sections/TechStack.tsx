"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { TechCategory } from "@/content/types";
import { CarouselPosition, useCarouselPosition } from "@/components/ui/CarouselPosition";
import { Icon } from "@/components/ui/Icon";

export function TechStack({ categories }: { categories: TechCategory[] }) {
  const track = useRef<HTMLUListElement>(null);
  const pos = useCarouselPosition(track);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };
  const allItems = categories.flatMap((c) => c.items);

  return (
    <div>
      <div className="frame-pad flex items-center justify-end gap-2 pb-6">
        <CarouselPosition {...pos} />
        {pos.scrollable && (
          <>
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous" className="inline-flex size-12 items-center justify-center rounded-md border border-border bg-surface text-muted transition hover:text-fg">
              <ArrowLeft className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next" className="inline-flex size-12 items-center justify-center rounded-md border border-border bg-surface text-fg transition hover:bg-surface-2">
              <ArrowRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth">
        {categories.map((c) => (
          <li key={c.category} data-tilt data-cursor="Explore" className="group relative w-[85%] shrink-0 snap-start border border-border bg-surface p-8 transition-colors hover:border-border-strong sm:w-[46%] lg:w-[calc((100%-2rem)/3)]">
            {c.href && <Link href={c.href} aria-label={`Explore ${c.category}`} className="absolute inset-0 z-10" />}
            <span className="inline-flex size-11 items-center justify-center text-fg transition-transform duration-300 group-hover:-translate-y-1">
              <Icon name={c.icon} className="size-8" strokeWidth={1.4} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-fg">{c.category}</h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-subtle">{c.label}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{c.description}</p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[13px] text-fg/80">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Stack marquee */}
      <div className="mask-fade-x group mt-10 overflow-hidden border-t border-border py-8" aria-hidden="true">
        <ul className="animate-marquee flex w-max items-center gap-12 group-hover:[animation-play-state:paused]" style={{ "--marquee-duration": "60s" } as React.CSSProperties}>
          {[...allItems, ...allItems].map((item, i) => (
            <li key={`${item}-${i}`} className="flex items-center gap-12 whitespace-nowrap text-2xl font-semibold tracking-[-0.02em] text-subtle transition-colors hover:text-fg">
              {item}
              <span className="size-1.5 rounded-full bg-border-strong" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
