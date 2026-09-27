"use client";

import { useEffect, useState } from "react";

/** Tracks which card of a horizontal scroll track is first in view. */
export function useCarouselPosition(track: React.RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState({ index: 0, total: 0, progress: 0, scrollable: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const items = el.children;
      const total = items.length;
      const first = items[0] as HTMLElement | undefined;
      const step = first ? first.getBoundingClientRect().width + 16 : 1;
      const max = el.scrollWidth - el.clientWidth;
      const visible = Math.max(1, Math.round(el.clientWidth / step));
      const index = max <= 0 ? 0 : Math.min(total - visible, Math.round(el.scrollLeft / step));
      setPos({ index, total, progress: max <= 0 ? 1 : el.scrollLeft / max, scrollable: max > 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [track]);

  return pos;
}

/** "02 / 06" with a thin progress bar, shown beside carousel arrows. */
export function CarouselPosition({ index, total, progress, scrollable }: { index: number; total: number; progress: number; scrollable: boolean }) {
  if (total <= 1 || !scrollable) return null;
  return (
    <div className="mr-auto flex items-center gap-4" aria-live="polite">
      <span className="font-mono text-xs tracking-[0.15em] text-muted">
        <span className="text-fg">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
      </span>
      <span className="relative h-0.5 w-24 overflow-hidden rounded-full bg-border sm:w-40" aria-hidden="true">
        <span className="absolute inset-y-0 left-0 w-full origin-left bg-accent-text transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
      </span>
    </div>
  );
}
