"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X } from "lucide-react";

import type { CaseImage } from "@/content/types";

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

type At = { x: number; y: number };
type Ctx = { items: GalleryItem[]; open: (index: number, at?: At) => void };

const GalleryContext = createContext<Ctx | null>(null);

const zoomable = (it?: GalleryItem) => !!(it && (it.node || it.image));

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

function Content({ item, sizes }: { item: GalleryItem; sizes?: string }) {
  if (item.image) {
    const { src, alt, width, height } = item.image;
    return sizes ? (
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="block h-auto w-full bg-white" />
    ) : (
      // Viewer and mini-map: the original file, so zooming past the screen width stays sharp.
      <Image src={src} alt={alt} width={width} height={height} unoptimized draggable={false} className="block h-full w-full bg-white" />
    );
  }
  return <>{item.node}</>;
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

/* ------------------------------------------------------------------ */
/* Viewer                                                              */
/* ------------------------------------------------------------------ */

/** Zoom at which a drawn screen's smallest (7-9 px) text reads at ~10-12 px. */
const READABLE_CANVAS = 1.3;
/** Real screenshots are mostly 1440 px desktop captures: 0.8 puts body text at ~13 px. */
const READABLE_IMAGE = 0.8;
const PHONE = 768;

type View = { z: number; x: number; y: number; fit: number; max: number; sw: number; sh: number; w: number; h: number; readable: number };

function dims(it: GalleryItem) {
  return it.image ? { w: it.image.width, h: it.image.height, readable: READABLE_IMAGE } : { w: 640, h: 400, readable: READABLE_CANVAS };
}

/** Keeps the content inside the stage: centred on an axis where it fits, edge-locked where it doesn't. */
function clampView(v: View) {
  const cw = v.w * v.z;
  const ch = v.h * v.z;
  v.x = cw <= v.sw ? (v.sw - cw) / 2 : Math.min(0, Math.max(v.sw - cw, v.x));
  v.y = ch <= v.sh ? (v.sh - ch) / 2 : Math.min(0, Math.max(v.sh - ch, v.y));
}

let hinted = false;

function ShotViewer({ items, start, onClose }: { items: GalleryItem[]; start: { index: number; at?: At }; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const mapView = useRef<HTMLSpanElement>(null);
  const view = useRef<View>({ z: 1, x: 0, y: 0, fit: 1, max: 3, sw: 0, sh: 0, w: 640, h: 400, readable: 1 });
  const anim = useRef(0);
  const syncTimer = useRef(0);
  const first = useRef(true);
  const [index, setIndex] = useState(start.index);
  const [ui, setUi] = useState({ level: 1, zoomed: false, maxed: false });
  const [hint] = useState(() => (hinted ? null : window.matchMedia("(pointer: coarse)").matches ? "Pinch or double-tap to zoom · drag to look around" : "Double-click or Ctrl + scroll to zoom · drag to move"));
  const item = items[index];
  const shown = useMemo(() => items.flatMap((it, i) => (zoomable(it) ? [i] : [])), [items]);
  const pos = shown.indexOf(index);

  const apply = useCallback(() => {
    const v = view.current;
    const el = content.current;
    if (!el) return;
    const cw = v.w * v.z;
    const ch = v.h * v.z;
    el.style.width = `${cw}px`;
    el.style.height = `${ch}px`;
    el.style.transform = `translate3d(${Math.round(v.x)}px, ${Math.round(v.y)}px, 0)`;
    const mv = mapView.current;
    if (mv) {
      mv.style.left = `${Math.max(0, (-v.x / cw) * 100)}%`;
      mv.style.top = `${Math.max(0, (-v.y / ch) * 100)}%`;
      mv.style.width = `${Math.min(1, v.sw / cw) * 100}%`;
      mv.style.height = `${Math.min(1, v.sh / ch) * 100}%`;
    }
  }, []);

  const sync = useCallback(() => {
    const v = view.current;
    setUi({ level: v.z / v.fit, zoomed: v.z > v.fit * 1.02 && (v.w * v.z > v.sw + 1 || v.h * v.z > v.sh + 1), maxed: v.z >= v.max * 0.99 });
  }, []);

  const syncSoon = useCallback(() => {
    window.clearTimeout(syncTimer.current);
    syncTimer.current = window.setTimeout(sync, 120);
  }, [sync]);

  /** Reads the stage size and the zoom limits for the current item. */
  const measure = useCallback(() => {
    const el = stage.current;
    if (!el || !item) return;
    const v = view.current;
    const { w, h, readable } = dims(item);
    const pad = el.clientWidth < PHONE ? 12 : 8;
    v.sw = el.clientWidth;
    v.sh = el.clientHeight;
    v.w = w;
    v.h = h;
    v.readable = readable;
    v.fit = Math.max(0.05, Math.min((v.sw - pad * 2) / w, (v.sh - pad * 2) / h));
    v.max = Math.max(v.fit * 2.5, readable * 2.4);
  }, [item]);

  const clampZ = (z: number) => Math.min(view.current.max, Math.max(view.current.fit, z));

  /** Zooms to `z` keeping the stage point (px, py) still. */
  const zoomTarget = (z: number, px: number, py: number): View => {
    const v = view.current;
    const t = { ...v, z: clampZ(z) };
    t.x = px - (px - v.x) * (t.z / v.z);
    t.y = py - (py - v.y) * (t.z / v.z);
    clampView(t);
    return t;
  };

  const animateTo = useCallback(
    (t: View) => {
      cancelAnimationFrame(anim.current);
      const v = view.current;
      const from = { z: v.z, x: v.x, y: v.y };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t0 = performance.now();
      const D = reduced ? 0 : 240;
      const step = (now: number) => {
        const k = D ? Math.min(1, (now - t0) / D) : 1;
        const e = 1 - Math.pow(1 - k, 3);
        v.z = from.z + (t.z - from.z) * e;
        v.x = from.x + (t.x - from.x) * e;
        v.y = from.y + (t.y - from.y) * e;
        apply();
        if (k < 1) anim.current = requestAnimationFrame(step);
        else sync();
      };
      anim.current = requestAnimationFrame(step);
    },
    [apply, sync],
  );

  /** Fit view, or (first open on a phone) readable zoom centred on the tapped point. */
  const reset = useCallback(() => {
    cancelAnimationFrame(anim.current);
    measure();
    const v = view.current;
    const at = first.current ? start.at : undefined;
    const zoomIn = first.current && v.sw < PHONE && v.readable > v.fit * 1.15;
    v.z = zoomIn ? v.readable : v.fit;
    const fx = at?.x ?? 0.5;
    const fy = at?.y ?? 0.5;
    v.x = v.sw / 2 - fx * v.w * v.z;
    v.y = v.sh / 2 - fy * v.h * v.z;
    clampView(v);
    apply();
    sync();
  }, [apply, measure, start.at, sync]);

  // Open as a modal (before the first measure, so the stage has a size) and lock the page behind it.
  useLayoutEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (!d.open) d.showModal();
    hinted = true;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
      cancelAnimationFrame(anim.current);
      window.clearTimeout(syncTimer.current);
    };
  }, []);

  // New item: fresh view. Resizes and rotations keep the zoom inside the new limits.
  useLayoutEffect(() => {
    reset();
  }, [index, reset]);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const v = view.current;
      const rel = v.z / v.fit;
      measure();
      v.z = clampZ(v.fit * rel);
      clampView(v);
      apply();
      sync();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [apply, measure, sync]);

  const go = useCallback(
    (dir: number) => {
      if (shown.length < 2) return;
      const p = shown.indexOf(index);
      first.current = false;
      setIndex(shown[(p + dir + shown.length) % shown.length]);
    },
    [index, shown],
  );

  const zoomBy = (factor: number) => {
    const v = view.current;
    animateTo(zoomTarget(v.z * factor, v.sw / 2, v.sh / 2));
  };
  const toFit = () => animateTo(zoomTarget(view.current.fit, view.current.sw / 2, view.current.sh / 2));
  const toggleAt = (px: number, py: number) => {
    const v = view.current;
    animateTo(v.z > v.fit * 1.05 ? zoomTarget(v.fit, px, py) : zoomTarget(Math.max(v.readable, v.fit * 2), px, py));
  };

  /* Gestures: one pointer pans (or swipes between screens at fit), two pinch. */
  const pts = useRef(new Map<number, At>());
  const g = useRef({ mode: "none" as "none" | "pan" | "pinch", sx: 0, sy: 0, x0: 0, y0: 0, z0: 1, d0: 1, mx: 0, my: 0, t0: 0, moved: false, onStage: false, trail: [] as { x: number; y: number; t: number }[] });
  const lastTap = useRef({ t: 0, x: 0, y: 0 });

  const local = (e: { clientX: number; clientY: number }): At => {
    const r = stage.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const begin = () => {
    const v = view.current;
    const s = g.current;
    const p = [...pts.current.values()];
    s.x0 = v.x;
    s.y0 = v.y;
    s.z0 = v.z;
    if (p.length >= 2) {
      s.mode = "pinch";
      s.d0 = Math.max(1, Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y));
      s.mx = (p[0].x + p[1].x) / 2;
      s.my = (p[0].y + p[1].y) / 2;
      s.moved = true;
    } else if (p.length === 1) {
      s.mode = "pan";
      s.sx = p[0].x;
      s.sy = p[0].y;
      s.trail = [{ x: p[0].x, y: p[0].y, t: performance.now() }];
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    cancelAnimationFrame(anim.current);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Synthetic or already-released pointers can't be captured; the gesture still works.
    }
    pts.current.set(e.pointerId, local(e));
    if (pts.current.size === 1) {
      g.current.t0 = performance.now();
      g.current.moved = false;
      // Pointer capture retargets later events to the stage, so note now whether the press was on empty stage.
      g.current.onStage = e.target === e.currentTarget;
    }
    begin();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pts.current.has(e.pointerId)) return;
    pts.current.set(e.pointerId, local(e));
    const v = view.current;
    const s = g.current;
    const p = [...pts.current.values()];
    if (s.mode === "pinch" && p.length >= 2) {
      const d = Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y);
      const mx = (p[0].x + p[1].x) / 2;
      const my = (p[0].y + p[1].y) / 2;
      const z = clampZ((s.z0 * d) / s.d0);
      v.x = mx - (s.mx - s.x0) * (z / s.z0);
      v.y = my - (s.my - s.y0) * (z / s.z0);
      v.z = z;
      clampView(v);
      apply();
    } else if (s.mode === "pan" && p.length === 1) {
      const dx = p[0].x - s.sx;
      const dy = p[0].y - s.sy;
      if (Math.hypot(dx, dy) > 6) s.moved = true;
      const atFit = v.z <= v.fit * 1.01;
      v.x = s.x0 + dx;
      v.y = s.y0 + dy;
      clampView(v);
      // At fit there is nothing to pan: let the screen follow the finger a little, as a swipe cue.
      if (atFit) v.x += dx * 0.35;
      apply();
      const now = performance.now();
      s.trail.push({ x: p[0].x, y: p[0].y, t: now });
      while (s.trail.length > 2 && now - s.trail[0].t > 90) s.trail.shift();
    }
  };

  const fling = (vx: number, vy: number) => {
    const v = view.current;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const bx = v.x;
      const by = v.y;
      v.x += vx * dt;
      v.y += vy * dt;
      clampView(v);
      if (v.x !== bx + vx * dt) vx = 0;
      if (v.y !== by + vy * dt) vy = 0;
      const decay = Math.pow(0.94, dt / 16);
      vx *= decay;
      vy *= decay;
      apply();
      if (Math.hypot(vx, vy) > 0.02) anim.current = requestAnimationFrame(step);
      else sync();
    };
    anim.current = requestAnimationFrame(step);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pts.current.get(e.pointerId);
    if (!p) return;
    pts.current.delete(e.pointerId);
    const v = view.current;
    const s = g.current;
    if (s.mode === "pinch") {
      if (pts.current.size >= 1) begin();
      else {
        s.mode = "none";
        sync();
      }
      return;
    }
    if (s.mode !== "pan" || pts.current.size > 0) return;
    s.mode = "none";
    const now = performance.now();
    const dx = p.x - s.sx;
    const dy = p.y - s.sy;
    const atFit = v.z <= v.fit * 1.01;
    if (!s.moved && e.type === "pointerup" && now - s.t0 < 300) {
      // Desktop: a click on the empty stage closes, like clicking a lightbox backdrop.
      if (e.pointerType === "mouse" && s.onStage) {
        dialog.current?.close();
        return;
      }
      const lt = lastTap.current;
      if (now - lt.t < 320 && Math.hypot(p.x - lt.x, p.y - lt.y) < 32) {
        lastTap.current = { t: 0, x: 0, y: 0 };
        toggleAt(p.x, p.y);
      } else lastTap.current = { t: now, x: p.x, y: p.y };
      return;
    }
    if (atFit) {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && shown.length > 1) go(dx < 0 ? 1 : -1);
      else {
        const t = { ...v };
        clampView(t);
        animateTo(t);
      }
      return;
    }
    const tr = s.trail;
    const a = tr[0];
    const b = tr[tr.length - 1];
    const dt = b && a ? b.t - a.t : 0;
    if (dt > 0 && now - b.t < 60) fling((b.x - a.x) / dt, (b.y - a.y) / dt);
    else sync();
  };

  // Wheel: Ctrl/Cmd + wheel (and trackpad pinch) zooms at the cursor; plain wheel pans.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelAnimationFrame(anim.current);
      const v = view.current;
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        const t = zoomTarget(v.z * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
        Object.assign(v, { z: t.z, x: t.x, y: t.y });
      } else {
        v.x -= e.deltaX;
        v.y -= e.deltaY;
        clampView(v);
      }
      apply();
      syncSoon();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apply, syncSoon]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "+" || e.key === "=") zoomBy(1.5);
    else if (e.key === "-") zoomBy(1 / 1.5);
    else if (e.key === "0") toFit();
    else return;
    e.preventDefault();
  };

  const onMapPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    const v = view.current;
    const t = { ...v };
    t.x = v.sw / 2 - ((e.clientX - r.left) / r.width) * v.w * v.z;
    t.y = v.sh / 2 - ((e.clientY - r.top) / r.height) * v.h * v.z;
    clampView(t);
    animateTo(t);
  };

  if (!item) return null;
  const btn = "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-35";

  return (
    <dialog
      ref={dialog}
      aria-label={item.caption}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      className="shot-viewer fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none touch-none overflow-hidden overscroll-contain bg-ink p-0 text-white backdrop:bg-ink/85 backdrop:backdrop-blur-sm md:m-auto md:h-[min(94dvh,960px)] md:w-[min(96vw,1360px)] md:bg-transparent"
    >
      <div className="flex h-full flex-col">
        <header className="flex shrink-0 items-start gap-3 px-4 pb-3 pt-[max(env(safe-area-inset-top),0.875rem)] md:px-1 md:pt-1">
          <span className="mt-0.5 shrink-0 rounded-sm bg-white/10 px-1.5 py-0.5 font-mono text-xs tabular-nums text-white/80" aria-live="polite">
            {String(pos + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
          </span>
          <p className="line-clamp-2 min-w-0 flex-1 text-sm leading-snug text-white/85">{item.caption}</p>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="-mr-1 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
            <X className="size-5" />
          </button>
        </header>

        <div
          ref={stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`relative min-h-0 flex-1 touch-none select-none overflow-hidden [-webkit-touch-callout:none] ${ui.zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        >
          <div ref={content} className="absolute left-0 top-0 overflow-hidden rounded-[10px] bg-white shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
            <Content key={index} item={item} />
          </div>

          {/* Mini-map: where the zoomed view is on the whole screen. Tap to jump. */}
          <div
            onPointerDown={onMapPointer}
            aria-hidden="true"
            className={`absolute bottom-3 left-3 w-24 cursor-pointer overflow-hidden rounded-md bg-white shadow-[0_8px_24px_rgb(0_0_0/0.5)] ring-1 ring-white/40 transition-opacity duration-200 md:w-32 ${ui.zoomed ? "opacity-100" : "pointer-events-none opacity-0"}`}
            style={{ aspectRatio: `${dims(item).w} / ${dims(item).h}` }}
          >
            <div className="pointer-events-none size-full">
              <Content key={index} item={item} />
            </div>
            <span ref={mapView} className="pointer-events-none absolute rounded-[3px] border-2 border-white shadow-[0_0_0_999px_rgb(0_0_0/0.35)]" />
          </div>

          {hint && (
            <p className="shot-viewer-hint pointer-events-none absolute inset-x-0 top-3 mx-auto w-max max-w-[90%] rounded-full bg-black/70 px-3.5 py-2 text-center text-xs text-white backdrop-blur-sm">
              {hint}
            </p>
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-2 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 md:px-1 md:pb-1">
          <button type="button" onClick={() => go(-1)} disabled={shown.length < 2} aria-label="Previous screen" className={btn}>
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 p-1">
            <button type="button" onClick={() => zoomBy(1 / 1.5)} disabled={ui.level <= 1.01} aria-label="Zoom out" className="inline-flex size-8 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-35">
              <Minus className="size-4" />
            </button>
            <button type="button" onClick={toFit} aria-label="Fit the whole screen" className="min-w-14 rounded-full px-2 py-1 font-mono text-xs tabular-nums text-white/85 transition hover:bg-white/15">
              {ui.level <= 1.01 ? "Fit" : `${ui.level.toFixed(1)}×`}
            </button>
            <button type="button" onClick={() => zoomBy(1.5)} disabled={ui.maxed} aria-label="Zoom in" className="inline-flex size-8 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-35">
              <Plus className="size-4" />
            </button>
          </div>
          <button type="button" onClick={() => go(1)} disabled={shown.length < 2} aria-label="Next screen" className={btn}>
            <ChevronRight className="size-5" />
          </button>
        </footer>
      </div>
    </dialog>
  );
}
