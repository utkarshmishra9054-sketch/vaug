"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightLeft, Bot, Check, CircleCheck, Hand, Loader2, User } from "lucide-react";

import type { ConsoleEvent, ConsoleScript } from "@/content/agents";
import { Icon } from "@/components/ui/Icon";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

const STREAM_STEP = 3; // characters per tick
const STREAM_MS = 28;

const HOLD_MS = 3600; // pause on a finished script before the next agent

function delayAfter(e: ConsoleEvent) {
  if (e.kind === "customer") return 1300;
  if (e.kind === "handoff") return 2000;
  return 1100;
}

function streamMs(e: ConsoleEvent) {
  return e.kind === "agent" ? Math.ceil(e.text.length / STREAM_STEP) * STREAM_MS : 0;
}

/**
 * Where the tab's completion bar should be for the current playback phase:
 * the phase's start and end as fractions of the whole script, plus the
 * phase's length. The bar eases from start to end over that length, so it
 * reaches 100% exactly as the console moves on to the next agent.
 */
function phase(events: ConsoleEvent[], shown: number, streaming: boolean) {
  let t = 0;
  const marks: { streamEnd: number; end: number }[] = [];
  events.forEach((e, i) => {
    const streamEnd = t + streamMs(e);
    t = streamEnd + (i < events.length - 1 ? delayAfter(e) : HOLD_MS);
    marks.push({ streamEnd, end: t });
  });
  const total = t;
  const i = Math.min(Math.max(shown - 1, 0), events.length - 1);
  const start = i === 0 ? 0 : marks[i - 1].end;
  const from = streaming ? start : marks[i].streamEnd;
  const to = streaming ? marks[i].streamEnd : marks[i].end;
  return { from: from / total, to: to / total, ms: to - from };
}

function EventRow({ e, text, fresh }: { e: ConsoleEvent; text?: string; fresh: boolean }) {
  const enter = fresh ? "animate-[agents-in_0.45s_cubic-bezier(0.2,0.7,0.2,1)]" : "";
  switch (e.kind) {
    case "customer":
      return (
        <li className={`flex items-end gap-2 ${enter}`}>
          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted">
            <User className="size-3.5" aria-hidden="true" />
          </span>
          <p className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-2 px-3 py-2 text-[13px] leading-snug text-fg">{e.text}</p>
        </li>
      );
    case "agent":
      return (
        <li className={`flex flex-row-reverse items-end gap-2 ${enter}`}>
          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
            <Bot className="size-3.5" aria-hidden="true" />
          </span>
          <p className="max-w-[85%] rounded-lg rounded-br-sm bg-accent px-3 py-2 text-[13px] leading-snug text-accent-fg">
            {text ?? e.text}
            {text !== undefined && text.length < e.text.length && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-accent-fg/80 align-middle" />}
          </p>
        </li>
      );
    case "tool":
      return (
        <li className={`flex items-center gap-2 rounded-md border border-dashed border-border px-2.5 py-1.5 font-mono text-[11px] ${enter}`}>
          <span className="relative inline-flex size-3.5 shrink-0">
            <Loader2 className="agents-spin-out absolute size-3.5 animate-spin text-subtle" aria-hidden="true" />
            <Check className="agents-check-in absolute size-3.5 text-accent-text" aria-hidden="true" />
          </span>
          <span className="shrink-0 text-accent-text">{e.tool}</span>
          <span className="min-w-0 leading-snug text-muted">{e.detail}</span>
        </li>
      );
    case "update":
      return (
        <li className={`flex items-center gap-2 rounded-md bg-accent-soft px-2.5 py-1.5 text-[11px] ${enter}`}>
          <ArrowRightLeft className="size-3.5 shrink-0 text-accent-text" aria-hidden="true" />
          <span className="shrink-0 rounded-sm bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-fg">{e.system}</span>
          <span className="min-w-0 leading-snug text-fg">{e.detail}</span>
        </li>
      );
    case "handoff":
      return (
        <li className={`flex items-center gap-2 rounded-md border border-yellow/40 bg-yellow/10 px-2.5 py-1.5 text-[11px] ${enter}`}>
          <Hand className="size-3.5 shrink-0 text-yellow" aria-hidden="true" />
          <span className="min-w-0 flex-1 leading-snug text-fg">{e.detail}</span>
          <span className="relative inline-flex h-5 w-[4.6rem] shrink-0">
            <span className="agents-approve-out absolute inset-0 inline-flex items-center justify-center rounded-sm bg-yellow font-mono text-[10px] font-bold text-ink">Approve</span>
            <span className="agents-approve-in absolute inset-0 inline-flex items-center justify-center gap-1 rounded-sm bg-surface font-mono text-[10px] font-bold text-accent-text">
              <Check className="size-3" aria-hidden="true" /> Approved
            </span>
          </span>
        </li>
      );
  }
}

/**
 * Hero console for /agents: an illustrative agent works through a
 * conversation (streamed replies, tool calls, CRM updates and a human
 * approval), then the next agent takes over. Tabs switch agents by hand.
 * Reduced motion shows each script complete and still.
 */
export function AgentConsole({ scripts }: { scripts: ConsoleScript[] }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(1);
  const [chars, setChars] = useState(0);
  const [still, setStill] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  const script = scripts[idx];
  const events = script.events;
  const last = events[shown - 1];
  const streaming = !still && last?.kind === "agent" && chars < last.text.length;

  // Respect reduced motion: show every script complete, no auto-advance.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setStill(true), 0);
    return () => clearTimeout(t);
  }, []);

  // Pause while scrolled out of view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active tab in view when the tab strip scrolls sideways (phones).
  useEffect(() => {
    const el = strip.current;
    const tab = el?.children[idx] as HTMLElement | undefined;
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: Math.max(0, tab.offsetLeft - (el.clientWidth - tab.offsetWidth) / 2), behavior: "smooth" });
  }, [idx]);

  // The playback loop.
  useEffect(() => {
    if (still || !onScreen) return;
    let t: ReturnType<typeof setTimeout>;
    if (streaming) {
      t = setTimeout(() => setChars((c) => c + STREAM_STEP), STREAM_MS);
    } else if (shown < events.length) {
      t = setTimeout(() => {
        setChars(0);
        setShown((s) => s + 1);
      }, last ? delayAfter(last) : 400);
    } else {
      t = setTimeout(() => {
        setIdx((i) => (i + 1) % scripts.length);
        setShown(1);
        setChars(0);
      }, HOLD_MS);
    }
    return () => clearTimeout(t);
  }, [still, onScreen, streaming, chars, shown, events.length, last, scripts.length]);

  const visible = still ? events : events.slice(0, shown);
  const complete = still || shown >= events.length;
  const bar = phase(events, shown, streaming);
  const nextIsAgent = !still && !streaming && shown < events.length && events[shown].kind === "agent";
  const systems = Array.from(
    new Set(visible.flatMap((e) => (e.kind === "tool" ? [e.tool.split(".")[0]] : e.kind === "update" ? [e.system] : e.kind === "handoff" ? ["Human review"] : []))),
  );

  const choose = (i: number) => {
    setIdx(i);
    setShown(1);
    setChars(0);
  };

  return (
    <div ref={root} className="relative w-full">
      <div aria-hidden="true" className="agents-glow pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-purple/20 blur-3xl" />
      <div className="glass overflow-hidden rounded-lg border border-border bg-surface/90 text-left shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]">
        {/* header */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg">
              <Bot className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-fg">VAUG Agent Console</p>
              <p className="truncate font-mono text-[10px] text-subtle">
                {script.agent} · {script.channel}
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-accent-soft px-2 py-1 font-mono text-[10px] font-semibold text-accent-text">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-text" aria-hidden="true" /> Live
          </span>
        </div>

        {/* agent tabs */}
        <div ref={strip} className="no-scrollbar relative flex gap-1 overflow-x-auto border-b border-border px-2 py-2" role="group" aria-label="Choose an example agent">
          {scripts.map((s, i) => (
            <button
              key={s.agent}
              type="button"
              aria-pressed={i === idx}
              onClick={() => choose(i)}
              className={`relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${i === idx ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}
            >
              <Icon name={s.icon} className="size-3.5" />
              {s.agent}
              {i === idx && !still && (
                <span
                  key={idx}
                  aria-hidden="true"
                  className="agents-bar absolute inset-x-0 bottom-0 h-0.5 bg-accent-text"
                  style={
                    onScreen
                      ? ({ "--p": bar.to, transitionDuration: `${bar.ms}ms` } as React.CSSProperties)
                      : ({ "--p": bar.from, transitionDuration: "0ms" } as React.CSSProperties)
                  }
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-[minmax(0,1fr)_9.5rem]">
          {/* feed */}
          <ul className="agents-feed flex h-[21rem] flex-col justify-end gap-2 overflow-hidden p-3 sm:h-[22rem] sm:p-4" aria-label={`${script.agent} example conversation`}>
            {visible.map((e, i) => (
              <EventRow
                key={`${idx}-${i}`}
                e={e}
                fresh={!still && i === visible.length - 1}
                text={!still && i === visible.length - 1 && e.kind === "agent" ? e.text.slice(0, chars) : undefined}
              />
            ))}
            {nextIsAgent && (
              <li className="flex flex-row-reverse items-center gap-2" aria-hidden="true">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-fg">
                  <Bot className="size-3.5" />
                </span>
                <span className="agents-typing flex gap-1 rounded-lg bg-surface-2 px-3 py-2.5">
                  <span className="size-1.5 rounded-full bg-muted" />
                  <span className="size-1.5 rounded-full bg-muted" />
                  <span className="size-1.5 rounded-full bg-muted" />
                </span>
              </li>
            )}
          </ul>

          {/* side panel */}
          <aside className="hidden flex-col gap-4 border-l border-border bg-bg/40 p-4 sm:flex" aria-label="Agent actions">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Systems</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {systems.map((s) => (
                  <li key={s} className="flex animate-[agents-in_0.4s_ease-out] items-center gap-1.5 text-xs text-fg">
                    <CircleCheck className="size-3.5 text-accent-text" aria-hidden="true" />
                    <span className="truncate capitalize">{s}</span>
                  </li>
                ))}
                {systems.length === 0 && <li className="text-xs text-subtle">Listening…</li>}
              </ul>
            </div>
            <div className="mt-auto">
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Outcome</p>
              <dl className="mt-2 flex flex-col gap-2">
                {script.outcome.map((o) => (
                  <div key={o.label} className={`rounded-md bg-surface-2 px-2.5 py-2 transition-opacity duration-500 ${complete ? "opacity-100" : "opacity-30"}`}>
                    <dt className="font-mono text-[10px] text-subtle">{o.label}</dt>
                    <dd className="text-lg font-semibold text-fg">{complete ? o.value : "…"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
        <p className="flex justify-center border-t border-border py-2">
          <IllustrativeTag label="Illustrative · not real customer data" />
        </p>
      </div>
    </div>
  );
}
