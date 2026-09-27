"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import type { EngagementModel } from "@/content/types";
import { Illustration } from "@/components/ui/Illustration";

/*
 * Desktop (lg+, motion allowed): a scroll-driven stepper. A tall track holds a
 * `position: sticky` stage; scroll progress through the track picks the active
 * model, one per step. Native scrolling only, nothing is hijacked.
 *
 * Mobile and prefers-reduced-motion: a plain stacked list. The two layouts are
 * switched purely in CSS (`models-stepper` / `models-stack`), so the hidden
 * one is `display: none` and out of the accessibility tree.
 */

/** Header height at lg; the stage pins right below it. */
const PIN_TOP = 80;
/** Scroll distance per step, as a fraction of the viewport height. */
const STEP_VH = 0.6;

export function EngagementModels({ models }: { models: EngagementModel[] }) {
  return (
    <>
      <Stepper models={models} />
      <Stack models={models} />
    </>
  );
}

function Stepper({ models }: { models: EngagementModel[] }) {
  const n = models.length;
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const stepPx = () => window.innerHeight * STEP_VH;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (el.offsetParent === null) return; // hidden (mobile / reduced motion)
      const step = stepPx();
      const scrolled = PIN_TOP - el.getBoundingClientRect().top;
      const p = Math.min(Math.max(scrolled / (step * n), 0), 1);
      const idx = Math.min(n - 1, Math.max(0, Math.floor(scrolled / step)));
      const within = Math.min(Math.max(scrolled / step - idx, 0), 1);
      el.style.setProperty("--models-p", p.toFixed(4));
      el.style.setProperty("--models-sp", within.toFixed(4));
      setActive(idx);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  /** Scroll so step `i` becomes active (a little into the step, so it's stable). */
  const goTo = useCallback((i: number, smooth = true) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - PIN_TOP + i * stepPx() + 2;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
  }, []);

  const pad = (x: number) => String(x).padStart(2, "0");

  return (
    <div
      ref={track}
      className="models-stepper relative border-t border-border"
      data-keep-header
      style={{ height: `calc(${n * STEP_VH * 100}vh + 100vh - ${PIN_TOP}px)` }}
    >
      <div className="models-stage sticky grid grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] overflow-hidden" style={{ top: PIN_TOP }}>
        {/* Service list */}
        <nav aria-label="Engagement models" className="flex min-h-0 flex-col border-r border-border">
          <ol className="flex-1">
            {models.map((m, i) => {
              const isActive = i === active;
              return (
                <li key={m.slug} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    aria-controls={`models-panel-${m.slug}`}
                    className={`models-tab relative flex w-full items-center gap-4 px-10 py-[clamp(0.85rem,2.2vh,1.5rem)] text-left transition-colors duration-300 ${
                      isActive ? "is-active bg-surface-2 text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span aria-hidden="true" className="models-tab-bar" />
                    <span className="font-mono text-[11px] tracking-widest text-subtle">{pad(i + 1)}</span>
                    <span className="flex-1 text-xl font-medium xl:text-2xl">{m.title}</span>
                    <ArrowUpRight
                      className={`size-5 shrink-0 text-accent-text transition-all duration-300 ${isActive ? "opacity-100" : "-translate-x-2 opacity-0"}`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="flex items-center gap-4 px-10 py-5 font-mono text-[11px] tracking-widest text-subtle">
            <span aria-live="polite" aria-atomic="true">
              <span className="text-fg">{pad(active + 1)}</span> / {pad(n)}
            </span>
            <span aria-hidden="true" className="relative h-px flex-1 bg-border">
              <span className="models-progress absolute inset-0 origin-left bg-accent-text" />
            </span>
          </div>
        </nav>

        {/* Panels: all rendered in one grid cell; only the active one is visible. */}
        <div className="grid min-h-0 min-w-0">
          {models.map((m, i) => (
            <article
              key={m.slug}
              id={`models-panel-${m.slug}`}
              data-glow
              onFocusCapture={() => i !== active && goTo(i, false)}
              className={`models-panel col-start-1 row-start-1 flex min-w-0 flex-col justify-center px-14 py-10 ${
                i === active ? "is-active" : i < active ? "is-before" : "is-after"
              }`}
            >
              <PanelBody m={m} compact />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stack({ models }: { models: EngagementModel[] }) {
  return (
    <div className="models-stack border-t border-border">
      {models.map((m) => (
        <article key={m.slug} id={m.slug} data-glow className="scroll-mt-20 border-b border-border px-5 py-14 last:border-b-0 sm:px-10 lg:px-14 lg:py-16">
          <PanelBody m={m} />
        </article>
      ))}
    </div>
  );
}

function PanelBody({ m, compact = false }: { m: EngagementModel; compact?: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">{m.title}</h3>
        <Link
          href={`/services/${m.slug}`}
          aria-label={`Explore ${m.title}`}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted transition hover:bg-surface-2 hover:text-accent-text"
        >
          <ArrowUpRight className="size-6" aria-hidden="true" />
        </Link>
      </div>
      <p className={`max-w-2xl text-lg leading-relaxed text-muted ${compact ? "mt-4" : "mt-5"}`}>{m.description}</p>

      <div className={`grid items-end gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${compact ? "mt-[clamp(1.25rem,4vh,2.5rem)]" : "mt-10"}`}>
        <div>
          <ul className={`flex flex-col font-mono text-[13px] text-muted ${compact ? "gap-[clamp(0.5rem,1.3vh,0.75rem)]" : "gap-3"}`}>
            {m.services.map((s, j) => (
              <li key={s} className="models-bullet flex items-center gap-3 transition-colors hover:text-fg" style={{ "--i": j } as React.CSSProperties}>
                <span className="h-px w-4 bg-border-strong" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <Link
            href={`/services/${m.slug}`}
            className={`link-underline inline-flex items-center gap-2 text-sm font-semibold text-accent-text ${compact ? "mt-6" : "mt-8"}`}
          >
            Explore {m.title} <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">Best for</dt>
              <dd className="mt-1 text-fg">{m.bestFor}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">How it runs</dt>
              <dd className="mt-1 text-fg">{m.pricing}</dd>
            </div>
          </dl>
        </div>
        <Illustration
          name={m.illustration}
          className={`models-ill mx-auto w-full text-fg/75 ${compact ? "max-w-[min(28rem,52vh)]" : "max-w-md"}`}
        />
      </div>
    </>
  );
}
