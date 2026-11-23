"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Maximize2 } from "lucide-react";

import type { CaseImage } from "@/content/types";
import { Content, type At } from "./ShotContent";

// The zoom viewer loads only when someone opens a screen, so it isn't in the page's initial JavaScript.
const ShotViewer = dynamic(() => import("./ShotViewer").then((m) => m.ShotViewer), { ssr: false });

/**
 * The "Inside the product" gallery on case study pages.
 *
 * `ShotGallery` holds every screen of a study (a drawn 640 x 400 canvas or a
 * real screenshot) and one shared viewer; `ShotThumb` is a screen in the
 * grid. Tapping a screen opens the viewer:
 * - phones: full screen, opened zoomed in to a readable size at the point
 *   that was tapped, with pinch, double-tap, drag (with inertia), a mini-map,
 *   and a swipe to the next screen when zoomed out;
 * - desktop: a large dialog at fit, with double-click, Ctrl/Cmd + scroll and
 *   +/- to zoom, drag or scroll to pan, and arrow keys between screens.
 * Zoom resizes the content box instead of scaling it with a transform, so
 * drawn screens re-lay out their text and stay sharp at any zoom.
 */

export type GalleryItem = { caption: string; node?: ReactNode; image?: CaseImage };

type Ctx = { items: GalleryItem[]; open: (index: number, at?: At) => void };

const GalleryContext = createContext<Ctx | null>(null);

export function ShotGallery({ items, children }: { items: GalleryItem[]; children: ReactNode }) {
  const [start, setStart] = useState<{ index: number; at?: At } | null>(null);
  const open = useCallback((index: number, at?: At) => setStart({ index, at }), []);
  const value = useMemo(() => ({ items, open }), [items, open]);
  return (
    <GalleryContext value={value}>
      {children}
      {start && <ShotViewer items={items} start={start} onClose={() => setStart(null)} />}
    </GalleryContext>
  );
}

/** A screen in the gallery grid. Opens the viewer at the tapped point. */
export function ShotThumb({ index }: { index: number }) {
  const ctx = useContext(GalleryContext);
  const item = ctx?.items[index];
  if (!ctx || !item) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        // Keyboard clicks (detail 0) have no point: open centred.
        ctx.open(index, e.detail === 0 ? undefined : { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
      aria-label={`Enlarge screen: ${item.caption}`}
      className="group/zoom relative block w-full cursor-zoom-in rounded-[10px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="overflow-hidden rounded-[10px] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)]">
        <Content item={item} sizes="(min-width: 640px) 50vw, 100vw" />
      </div>
      <span
        className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1.5 text-xs font-medium leading-none text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 max-sm:opacity-100 pointer-coarse:opacity-100 sm:bottom-3 sm:right-3"
        aria-hidden="true"
      >
        <Maximize2 className="size-3.5" />
        <span className="sm:pointer-fine:hidden">Tap to zoom</span>
        <span className="hidden sm:pointer-fine:inline">Zoom</span>
      </span>
    </button>
  );
}
