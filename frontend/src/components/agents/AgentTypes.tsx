"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, Zap } from "lucide-react";

import type { AgentType } from "@/content/agents";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const INTERVAL_MS = 6000;

/**
 * Tabbed explorer of agent families. The left list is an ARIA tablist
 * (arrow keys move between tabs); the panel shows a trigger → steps →
 * outcome flow that animates in, plus tasks, channels and typical results.
 * While on screen it auto-advances every few seconds: a completion bar fills
 * on the active tab and the next tab opens when it ends. Hover, focus or
 * scrolling away pauses it; reduced motion turns it off.
 */
export function AgentTypes({ types }: { types: AgentType[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = types[active];
  const paused = !onScreen || hovered || focused;

  // Auto-advance only when motion is welcome (set after mount, so SSR matches).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAuto(!mq.matches);
    const t0 = setTimeout(sync, 0);
    mq.addEventListener("change", sync);
    return () => {
      clearTimeout(t0);
      mq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "-15% 0px -15% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active tab visible in the horizontal tab strip (mobile) without scrolling the page.
  useEffect(() => {
    const strip = list.current;
    const tab = tabs.current[active];
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    const left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  const next = () => setActive((a) => (a + 1) % types.length);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + types.length) % types.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="grid grid-cols-[minmax(0,1fr)] border-t border-border lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)]"
    >
      <div ref={list} role="tablist" aria-label="Agent types" aria-orientation="vertical" className="no-scrollbar relative flex gap-2 overflow-x-auto border-b border-border p-3 lg:block lg:overflow-visible lg:border-b-0 lg:border-r lg:p-0">
        {types.map((type, i) => {
          const selected = i === active;
          return (
            <button
              key={type.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`agent-tab-${type.slug}`}
              aria-selected={selected}
              aria-controls={`agent-panel-${type.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group relative flex shrink-0 items-center gap-3 overflow-hidden text-left transition-colors duration-300 max-lg:rounded-md max-lg:px-3 max-lg:py-2 max-lg:text-sm lg:w-full lg:border-b lg:border-border lg:px-8 lg:py-6 ${
                selected ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface hover:text-fg"
              }`}
            >
              {selected && <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1 bg-accent lg:block" />}
              <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-md transition-colors max-lg:size-7 ${selected ? "bg-accent text-accent-fg" : "bg-surface-2 text-accent-text"}`}>
                <Icon name={type.icon} className="size-4" />
              </span>
              <span className="font-medium lg:text-lg">{type.name}</span>
              {selected && auto && (
                <span
                  key={active}
                  aria-hidden="true"
                  data-paused={paused}
                  onAnimationEnd={next}
                  className="agents-type-bar absolute inset-x-0 bottom-0 h-0.5 bg-accent-text"
                  style={{ "--dur": `${INTERVAL_MS}ms` } as React.CSSProperties}
                />
              )}
            </button>
          );
        })}
      </div>

      <div key={t.slug} role="tabpanel" id={`agent-panel-${t.slug}`} aria-labelledby={`agent-tab-${t.slug}`} className="agents-panel-in min-w-0 px-5 py-10 sm:px-10 lg:px-14 lg:py-14">
        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">{t.name}</h3>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t.summary}</p>

        {/* flow */}
        <ol className="mt-10 grid gap-2 md:grid-cols-[repeat(6,minmax(0,1fr))]" aria-label="How it runs">
          {[t.flow.trigger, ...t.flow.steps, t.flow.outcome].map((s, i, arr) => {
            const first = i === 0;
            const lastStep = i === arr.length - 1;
            return (
              <li key={s} className="agents-flow-step relative" style={{ animationDelay: `${i * 140}ms` }}>
                <div className={`flex h-full flex-col gap-2 rounded-md border p-3 text-sm ${first ? "border-yellow/50 bg-yellow/10" : lastStep ? "border-accent-text bg-accent-soft" : "border-border bg-surface"}`}>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-subtle">
                    {first ? <Zap className="size-3 text-yellow" aria-hidden="true" /> : lastStep ? <Check className="size-3 text-accent-text" aria-hidden="true" /> : null}
                    {first ? "Trigger" : lastStep ? "Outcome" : `Step ${i}`}
                  </span>
                  <span className="leading-snug text-fg">{s}</span>
                </div>
                {!lastStep && (
                  <>
                    <ArrowRight className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-bg text-accent-text md:block" aria-hidden="true" />
                    <ArrowDown className="mx-auto mt-2 size-4 text-accent-text md:hidden" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">What it handles</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.tasks.map((task) => (
                <li key={task} className="flex items-start gap-3 text-fg">
                  <span className="mt-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Where it works</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.channels.map((c) => (
                <li key={c} className="rounded-sm bg-surface-2 px-3 py-1.5 text-sm text-fg">
                  {c}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-5">
              {t.kpis.map((k) => (
                <div key={k.label}>
                  <dt className="sr-only">{k.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-[-0.02em] text-fg">{k.value}</span>
                    <span className="mt-1 block text-xs leading-snug text-muted">{k.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[10px] text-subtle">Typical targets, agreed per project.</p>
          </div>
        </div>

        <div className="mt-10">
          <ArrowLink href="#contact">Scope a {t.name.toLowerCase()} agent</ArrowLink>
        </div>
      </div>
    </div>
  );
}
