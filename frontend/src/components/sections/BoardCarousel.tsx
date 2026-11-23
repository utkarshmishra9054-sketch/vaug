"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { CaseImage } from "@/content/types";
import { screenCount, screenImage } from "@/components/case-studies/screens/manifest";
import { Pause, Play } from "lucide-react";

import { useLessMotion } from "@/lib/motionHooks";

const INTERVAL = 3600;


/**
 * The study's product boards (drawn screens, else real screenshots), or null when it has none.
 * Drawn screens are pre-rendered images (see screens/manifest.ts), so cards and strips carry no
 * screen markup or code; the carousel wrapper labels each board, so the images are decorative.
 * `priority` loads the first board eagerly (the study page hero, where it's the largest paint).
 */
export function boardsFor(study: { slug: string; tint: string; images?: CaseImage[]; screenshots?: string[] }, { compact = false, priority = false } = {}): ReactNode[] | null {
  const sizes = compact ? "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 90vw" : "(min-width: 1024px) 720px, 95vw";
  const drawn = screenCount(study.slug);
  if (drawn) {
    return Array.from({ length: drawn }, (_, i) => (
      <div key={i} className="relative aspect-[16/10] w-full bg-white">
        <Image src={screenImage(study.slug, i)} alt="" fill sizes={sizes} priority={priority && i === 0} loading={priority && i === 0 ? undefined : "lazy"} className="object-cover" />
      </div>
    ));
  }
  if (study.images?.length) {
    return study.images.map((img, i) => (
      <div key={img.src} className="relative aspect-[16/10] w-full bg-white">
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority && i === 0} className="object-contain" />
      </div>
    ));
  }
  return null;
}

/**
 * Cycles through a study's product boards on its tint: each board slides up
 * and fades in over the last. Pauses on hover, while off screen and under
 * reduced motion; the dots jump to a board. Boards are 16:10 canvases sized
 * to fit the box whichever side is tighter.
 */
export function BoardCarousel({ boards, labels, compact }: { boards: ReactNode[]; labels?: string[]; compact: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useLessMotion();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // Stops while hovered or focused, off screen, under reduced motion, or after the visitor presses pause (WCAG 2.2.2).
  const running = boards.length > 1 && visible && !paused && !held && !stopped && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % boards.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [running, active, boards.length]);

  return (
    <div
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setHeld(false)}
      className={`absolute inset-0 flex flex-col items-center ${compact ? "px-5 pb-4 pt-6" : "px-6 pb-5 pt-8 sm:px-10 sm:pt-10 lg:px-12"}`}
    >
      <div className="flex min-h-0 w-full flex-1 items-center justify-center [container-type:size]">
        <div className="site-shot relative" style={{ width: "min(100cqw, 160cqh)", aspectRatio: "16 / 10" }}>
          {boards.map((board, i) => (
            <div
              key={i}
              role={i === active ? "img" : undefined}
              aria-label={i === active ? (labels?.[i] ?? `Product screen ${i + 1}`) : undefined}
              aria-hidden={i !== active}
              inert={i !== active}
              className="absolute inset-0 overflow-hidden rounded-[10px] bg-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "none" : i === (active - 1 + boards.length) % boards.length ? "translateY(-4%) scale(0.97)" : "translateY(6%) scale(0.97)",
                zIndex: i === active ? 1 : 0,
              }}
            >
              {board}
            </div>
          ))}
        </div>
      </div>
      {boards.length > 1 && (
        <div className="relative z-10 mt-1.5 flex shrink-0 items-center">
          {!reduced && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setStopped((v) => !v);
              }}
              aria-label={stopped ? "Play the screens" : "Pause the screens"}
              aria-pressed={stopped}
              className="mr-1 flex size-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              {stopped ? <Play className="size-3 fill-current" aria-hidden="true" /> : <Pause className="size-3 fill-current" aria-hidden="true" />}
            </button>
          )}
          {boards.map((_, i) => (
            // A 24 x 24 target around a small bar (WCAG 2.5.8).
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={labels?.[i] ? `Show ${labels[i]}` : `Show screen ${i + 1}`}
              aria-current={i === active}
              className="group/dot flex h-6 min-w-6 items-center justify-center px-1"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/55 group-hover/dot:bg-white/80"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
