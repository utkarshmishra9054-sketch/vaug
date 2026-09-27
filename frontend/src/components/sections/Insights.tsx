"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import type { Insight } from "@/content/types";
import { CarouselPosition, useCarouselPosition } from "@/components/ui/CarouselPosition";

/** Card colours follow the content type, so colour means something. */
const typeCover: Record<Insight["type"], { bg: string; fg: string }> = {
  Guide: { bg: "#6d28d9", fg: "#ffd23f" },
  Playbook: { bg: "#ffd23f", fg: "#131116" },
  Article: { bg: "#131116", fg: "#ffd23f" },
  Event: { bg: "#b69cff", fg: "#131116" },
};

/** Typographic cover art until real images are provided. */
function Cover({ insight }: { insight: Insight }) {
  const { motif } = insight.cover;
  const { bg, fg } = typeCover[insight.type];
  return (
    <div className="relative h-44 overflow-hidden" style={{ background: bg, color: fg }}>
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" aria-hidden="true">
        {motif === "rings" && (
          <div className="absolute -right-12 -top-12 size-52">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="absolute rounded-full border-2 border-current opacity-60" style={{ inset: i * 22 }} />
            ))}
          </div>
        )}
        {motif === "grid" && <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:24px_24px]" />}
        {motif === "bars" && (
          <div className="absolute bottom-0 right-5 flex h-3/4 w-2/5 items-end justify-end gap-1.5">
            {[30, 55, 40, 80, 65, 100].map((h, i) => (
              <span key={i} className="w-3.5 bg-current opacity-70" style={{ height: `${h}%` }} />
            ))}
          </div>
        )}
        {motif === "dots" && <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(currentColor_2px,transparent_2px)] [background-size:20px_20px]" />}
      </div>
      <p className="glass absolute bottom-4 left-4 rounded-md px-3 py-1.5 text-lg font-bold tracking-[-0.02em]">{insight.type}</p>
    </div>
  );
}

export function Insights({ insights }: { insights: Insight[] }) {
  const track = useRef<HTMLUListElement>(null);
  const pos = useCarouselPosition(track);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <div>
      <div className="frame-pad flex items-center justify-end gap-2 pb-8">
        <CarouselPosition {...pos} />
        {pos.scrollable && (
          <>
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous articles" className="inline-flex size-12 items-center justify-center rounded-md border border-border bg-surface text-muted transition hover:text-fg">
              <ArrowLeft className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next articles" className="inline-flex size-12 items-center justify-center rounded-md border border-border bg-surface text-fg transition hover:bg-surface-2">
              <ArrowRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <ul ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth">
        {insights.map((post) => (
          <li key={post.slug} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/4)]">
            <Link href={post.href ?? "/case-studies"} data-tilt data-cursor="Explore" className="group flex h-full flex-col border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.35)]">
              <span className="self-start rounded-sm bg-surface-2 px-3 py-1.5 text-sm text-fg">{post.type}</span>
              <div className="mt-5 overflow-hidden">
                <Cover insight={post} />
              </div>
              <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                <span className="size-2 rounded-full" style={{ background: typeCover[post.type].bg }} aria-hidden="true" />
                {post.type} · Explore
              </p>
              <h3 className="mt-3 line-clamp-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">{post.title}</h3>
              <p className="mt-3 line-clamp-2 text-muted">{post.excerpt}</p>
              <ArrowUpRight className="mt-auto self-end pt-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={44} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
