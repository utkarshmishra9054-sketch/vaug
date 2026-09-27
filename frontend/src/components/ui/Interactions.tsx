"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

/*
 * Page-wide motion layer:
 *  - top bar: fills while the page loads and on every route change, then
 *    tracks reading progress
 *  - progress ring (bottom-left): scroll progress + back-to-top
 *  - cursor companion (fine pointers, motion allowed): the native cursor stays;
 *    a trailing ring stretches with velocity, is dragged by scrolling, grows a
 *    comet tail, shows reading progress while scrolling, throws sparks on click
 *    (hold to charge), wraps [data-magnetic] elements and turns into a label
 *    over [data-cursor="View case"]
 *  - [data-magnetic] pulled toward the cursor · [data-tilt] 3D tilt + glare
 *  - [data-parallax="0.03"] drifts with the cursor · [data-glow] exposes --mx/--my
 */
const TRAIL_LENGTH = 6;

export function Interactions() {
  const bar = useRef<HTMLDivElement>(null);
  const ringProgress = useRef<SVGCircleElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const sparks = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();
  const navigating = useRef(false);

  // ---------- route-change progress ----------
  // Start the bar on any internal link click that leaves this page (capture
  // phase, because <Link> prevents the default), finish it when the path changes.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      const el = bar.current;
      if (!el) return;
      navigating.current = true;
      el.classList.remove("is-reading");
      el.parentElement?.style.setProperty("opacity", "1");
      el.style.transition = "none";
      el.style.transform = "scaleX(0.05)";
      void el.offsetWidth;
      el.style.transition = "";
      el.style.transform = "scaleX(0.75)";
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const el = bar.current;
    if (!navigating.current || !el) return;
    navigating.current = false;
    el.style.transform = "scaleX(1)";
    const fade = setTimeout(() => el.parentElement?.style.setProperty("opacity", "0"), 450);
    const reset = setTimeout(() => {
      el.classList.add("is-reading");
      window.dispatchEvent(new Event("scroll"));
      el.parentElement?.style.setProperty("opacity", "1");
    }, 800);
    return () => {
      clearTimeout(fade);
      clearTimeout(reset);
    };
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let loaded = false;
    let frame = 0;

    // ---------- progress ----------
    const setBar = (v: number) => {
      if (bar.current) bar.current.style.transform = `scaleX(${v})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (loaded) setBar(p);
        ringProgress.current?.setAttribute("stroke-dashoffset", String(1 - p));
        ring.current?.style.setProperty("--p", String(p));
        setShowTop(window.scrollY > 700);
      });
    };
    requestAnimationFrame(() => setBar(0.65));
    const finish = () => {
      setBar(1);
      setTimeout(() => {
        bar.current?.classList.add("is-reading");
        loaded = true;
        onScroll();
      }, 500);
    };
    if (document.readyState === "complete") setTimeout(finish, 350);
    else window.addEventListener("load", finish, { once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    const cleanupScroll = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    if (reduce || !fine) return cleanupScroll;

    // ---------- cursor ----------
    // The native cursor stays visible; the ring is a springy companion that
    // lags behind scrolling, grows a comet tail when it moves fast, shows
    // reading progress while scrolling, and throws sparks on click (hold to charge).
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const pos = { x: -200, y: -200 };
    const cur = { x: -200, y: -200 };
    const sparkLayer = sparks.current;
    const trailEls = Array.from(trail.current?.children ?? []) as HTMLElement[];
    const tail = trailEls.map(() => ({ x: -200, y: -200 }));
    let visible = false;
    let magnet: HTMLElement | null = null;
    let magnetRadius = 8;
    let tilt: HTMLElement | null = null;
    let downAt = 0;
    let parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const refresh = setInterval(() => (parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"))), 2000);

    const release = (el: HTMLElement | null) => {
      if (el) el.style.transform = "";
    };

    // The loop only runs while something is still settling.
    let raf = 0;
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        cur.x = pos.x;
        cur.y = pos.y;
        for (const t of tail) Object.assign(t, pos);
        root.classList.add("cursor-visible");
      }
      kick();
      const target = e.target as Element | null;
      const r = ring.current;

      const isText = !!target?.closest("input, textarea, select, [contenteditable]");
      const interactive = target?.closest<HTMLElement>("a, button, summary, label, [data-cursor]");
      const text = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      r?.classList.toggle("is-text", isText);
      r?.classList.toggle("is-hover", !!interactive && !text);
      r?.classList.toggle("has-label", !!text);
      if (label.current && label.current.textContent !== text) label.current.textContent = text;

      // magnetic + ring wrap
      const m = isText ? null : (target?.closest<HTMLElement>("[data-magnetic]") ?? null);
      if (m !== magnet) {
        release(magnet);
        magnet = m;
        if (m) magnetRadius = parseFloat(getComputedStyle(m).borderRadius) || 8;
      }
      if (m) {
        const b = m.getBoundingClientRect();
        const dx = e.clientX - (b.left + b.width / 2);
        const dy = e.clientY - (b.top + b.height / 2);
        m.style.transform = `translate(${dx * 0.18}px, ${dy * 0.25}px)`;
      }
      r?.classList.toggle("is-wrap", !!m && !text);

      // tilt
      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (t !== tilt) {
        release(tilt);
        tilt = t;
      }
      if (t) {
        const b = t.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width;
        const py = (e.clientY - b.top) / b.height;
        t.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-4px)`;
        t.style.setProperty("--gx", `${px * 100}%`);
        t.style.setProperty("--gy", `${py * 100}%`);
      }

      const g = target?.closest<HTMLElement>("[data-glow]");
      if (g) {
        const b = g.getBoundingClientRect();
        g.style.setProperty("--mx", `${e.clientX - b.left}px`);
        g.style.setProperty("--my", `${e.clientY - b.top}px`);
      }
    };

    const onLeave = () => {
      visible = false;
      root.classList.remove("cursor-visible");
      release(magnet);
      release(tilt);
      magnet = tilt = null;
    };

    // ---------- sparks ----------
    const burst = (x: number, y: number, n: number) => {
      if (!sparkLayer || sparkLayer.childElementCount > 90) return;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.6;
        const d = 22 + Math.random() * (18 + n * 3);
        s.className = i % 3 ? "cursor-spark" : "cursor-spark is-alt";
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        s.style.setProperty("--dx", `${Math.cos(a) * d}px`);
        s.style.setProperty("--dy", `${Math.sin(a) * d}px`);
        s.addEventListener("animationend", () => s.remove(), { once: true });
        sparkLayer.append(s);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      downAt = performance.now();
      ring.current?.classList.add("is-down");
    };
    const onUp = (e: PointerEvent) => {
      ring.current?.classList.remove("is-down");
      if (!downAt) return;
      const held = performance.now() - downAt;
      downAt = 0;
      if ((e.target as Element | null)?.closest("input, textarea, select, [contenteditable]")) return;
      burst(e.clientX, e.clientY, 8 + Math.min(Math.round(held / 60), 16));
    };

    const loop = () => {
      raf = 0;
      const r = ring.current;
      let settling = false;
      if (r) {
        if (magnet && r.classList.contains("is-wrap")) {
          // wrap the ring around the magnetic element
          const b = magnet.getBoundingClientRect();
          const cx = b.left + b.width / 2;
          const cy = b.top + b.height / 2;
          cur.x += (cx - cur.x) * 0.25;
          cur.y += (cy - cur.y) * 0.25;
          settling = Math.abs(cx - cur.x) + Math.abs(cy - cur.y) > 0.2;
          r.style.width = `${b.width + 12}px`;
          r.style.height = `${b.height + 12}px`;
          r.style.borderRadius = `${Math.min(magnetRadius, b.height / 2) + 6}px`;
          r.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`;
        } else {
          const vx = pos.x - cur.x;
          const vy = pos.y - cur.y;
          cur.x += vx * 0.18;
          cur.y += vy * 0.18;
          settling = Math.abs(vx) + Math.abs(vy) > 0.2;
          const speed = Math.min(Math.hypot(vx, vy), 160);
          const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
          const stretch = r.classList.contains("has-label") ? 0 : speed / 320;
          r.style.width = "";
          r.style.height = "";
          r.style.borderRadius = "";
          r.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5}) rotate(${-angle}deg)`;
        }
      }

      // comet tail: each segment chases the one ahead, fading in with spread
      let lead = cur;
      let spread = 0;
      for (const t of tail) {
        t.x += (lead.x - t.x) * 0.4;
        t.y += (lead.y - t.y) * 0.4;
        spread += Math.abs(lead.x - t.x) + Math.abs(lead.y - t.y);
        lead = t;
      }
      const fade = magnet ? 0 : Math.min(spread / 50, 1);
      tail.forEach((t, i) => {
        const el = trailEls[i];
        el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${1 - (i / tail.length) * 0.6})`;
        el.style.opacity = String(fade * (1 - i / (tail.length + 1)));
      });
      if (spread > 0.3) settling = true;

      if (visible) {
        const nx = pos.x / window.innerWidth - 0.5;
        const ny = pos.y / window.innerHeight - 0.5;
        for (const el of parallaxEls) {
          const k = Number(el.dataset.parallax) || 0.02;
          el.style.translate = `${nx * k * 400}px ${ny * k * 400}px`;
        }
      }
      if (settling) raf = requestAnimationFrame(loop);
    };

    // Scrolling moves the page under a still pointer, so re-check what's under it;
    // otherwise a label like "View case" would linger over unrelated content.
    // The ring is also dragged against the scroll and springs back.
    let scrollFrame = 0;
    let lastY = window.scrollY;
    let scrollIdle = 0;
    const onScrollCursor = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!visible) return;
      if (!magnet) cur.y = Math.max(pos.y - 90, Math.min(pos.y + 90, cur.y - dy * 0.4));
      ring.current?.classList.add("is-scrolling");
      clearTimeout(scrollIdle);
      scrollIdle = window.setTimeout(() => ring.current?.classList.remove("is-scrolling"), 700);
      kick();
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const el = document.elementFromPoint(pos.x, pos.y);
        if (el) onMove({ clientX: pos.x, clientY: pos.y, target: el } as unknown as PointerEvent);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollCursor, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cleanupScroll();
      cancelAnimationFrame(raf);
      clearInterval(refresh);
      clearTimeout(scrollIdle);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScrollCursor);
      cancelAnimationFrame(scrollFrame);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.classList.remove("has-cursor", "cursor-visible");
      sparkLayer?.replaceChildren();
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] transition-opacity duration-300">
        <div
          ref={bar}
          style={{ transform: "scaleX(0)" }}
          className="progress-bar h-full origin-left bg-gradient-to-r from-purple via-purple-light to-yellow shadow-[0_0_12px_rgb(255_210_63/0.7)]"
        />
      </div>

      <button
        type="button"
        aria-label="Back to top"
        data-magnetic
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`glass fixed bottom-5 left-5 z-40 inline-flex size-14 items-center justify-center rounded-full text-fg transition-all duration-500 [--surface:#1b1920] ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="2.5" />
          <circle ref={ringProgress} cx="24" cy="24" r="21" fill="none" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        </svg>
        <ArrowUp className="relative size-5 text-white" aria-hidden="true" />
      </button>

      <div ref={trail} aria-hidden="true">
        {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
          <span key={i} className="cursor-trail" />
        ))}
      </div>
      <div ref={sparks} aria-hidden="true" className="cursor-sparks" />
      <div ref={ring} aria-hidden="true" className="cursor-ring">
        <span ref={label} className="cursor-ring__label" />
      </div>
    </>
  );
}
