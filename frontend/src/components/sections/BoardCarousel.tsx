"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { CaseImage } from "@/content/types";
import { SCREENS } from "@/components/case-studies/screens";
import { ShotCanvas } from "@/components/case-studies/screens/kit";
import { Pause, Play } from "lucide-react";

import { useLessMotion } from "@/lib/motionHooks";

const INTERVAL = 3600;


/** The study's product boards (drawn screens, else real screenshots), or null when it has none. */
export function boardsFor(study: { slug: string; tint: string; images?: CaseImage[]; screenshots?: string[] }): ReactNode[] | null {
  const Screens = SCREENS[study.slug];
  if (Screens?.length) {
    return Screens.map((Screen, i) => (
      <ShotCanvas key={i}>
        <Screen tint={study.tint} />
      </ShotCanvas>
    ));
  }
  if (study.images?.length) {
    return study.images.map((img) => (
      <div key={img.src} className="relative aspect-[16/10] w-full bg-white">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 720px, 95vw" className="object-contain" />
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
