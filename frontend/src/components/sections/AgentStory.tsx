"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { Check, Clock, Copy, Flame, Snowflake, Thermometer, UserRound } from "lucide-react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import type { StoryBeat } from "@/content/types";

/*
 * Pinned, scroll-scrubbed story. Overall progress P runs 0 → 4 across four beats,
 * and every beat makes its headline visible on the stage:
 *   0–1  the same four questions keep arriving; repeat counters climb to 100 and
 *        one person types the same reply again
 *   1–2  leads arrive while that person copies rows into a spreadsheet by hand;
 *        wait clocks tick and each lead cools from hot to warm to cold
 *   2–3  the agent works the queue card by card: answers, qualifies, syncs the
 *        CRM, and hands the one unusual lead to a person
 *   3–4  the inbox clears and a before/after view shows where the team's day goes
 * Every element's position is a pure function of P, so scrolling back rewinds it.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (P: number, from: number, to: number) => clamp((P - from) / (to - from));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const tone = {
  green: "#16a34a",
  red: "#dc2626",
  amber: "#d97706",
  hot: "#ea580c",
  cold: "#3b82f6",
};

/* ---------- story data ---------- */

// Repeat counts add up to the "hundred times a day" in beat 1.
const questions = [
  { who: "EM", text: "Where is my order #4471?", repeats: 38, reply: "Out for delivery, arrives today" },
  { who: "JB", text: "Can I change my delivery address?", repeats: 14, reply: "Address updated, confirmation sent" },
  { who: "LK", text: "Is the blue one back in stock?", repeats: 21, reply: "Back Friday · restock alert set" },
  { who: "TR", text: "How do I get a refund?", repeats: 27, reply: "Return label sent · refund in 3–5 days" },
];
const leads = [
  { who: "Maya R.", text: "Demo request · 40 seats", wait: [2, 190], result: "Qualified · demo booked Thu 10:00", crm: ["Maya R.", "Demo · 40 seats", "Demo booked"] },
  { who: "Oliver P.", text: "Pricing for the Pro plan", wait: [1, 1500], result: "Pricing sent · follow-up set", crm: ["Oliver P.", "Pro pricing", "Pricing sent"] },
  { who: "Hana K.", text: "Partnership enquiry", wait: [1, 300], result: "Summarised · handed to you", crm: ["Hana K.", "Partnership", "With you"], handoff: true },
];

/* ---------- stage layout (fixed 540×460 canvas) ---------- */

const COL_Q = { x: 16, w: 246 };
const COL_L = { x: 278, w: 246 };
const Q_H = 62;
const L_H = 72;
const qY = (i: number) => 89 + i * (Q_H + 6);
const lY = (i: number) => 89 + i * (L_H + 6);
const COMPOSER = { y: qY(4), h: 444 - qY(4) };
const CRM = { y: lY(3), h: 444 - lY(3) };
const crmRowY = (i: number) => CRM.y + 52 + i * 22;

/* ---------- timeline ---------- */

const qAppear = (i: number) => 0.08 + i * 0.14;
const lAppear = (i: number) => 1.05 + i * 0.15;
/** When the typist copies lead i into the spreadsheet (only the first two make it). */
const copyAt = (i: number) => 1.3 + i * 0.3;

// The agent visits every card, then the CRM. `t` is the moment it resolves that stop.
const stops = [
  ...questions.map((_, i) => ({ kind: "q" as const, i, x: COL_Q.x + COL_Q.w, y: qY(i) + Q_H / 2, t: 2.15 + i * 0.1 })),
  ...leads.map((_, i) => ({ kind: "l" as const, i, x: COL_L.x + COL_L.w - 2, y: lY(i) + L_H / 2, t: 2.55 + i * 0.1 })),
  { kind: "crm" as const, i: 0, x: COL_L.x + COL_L.w - 2, y: CRM.y + 20, t: 2.85 },
];
const stopFor = (kind: "q" | "l", i: number) => stops.find((s) => s.kind === kind && s.i === i)!;
const handledBy = (P: number) => stops.filter((s) => s.kind !== "crm" && P >= s.t).length;
const HANDLED_TOTAL = questions.length + leads.length;

const repeatsAt = (P: number, i: number) => Math.round(questions[i].repeats * easeOut(seg(P, qAppear(i) + 0.02, 1.0)));
const questionWaitAt = (P: number, i: number) => Math.round(1 + seg(P, qAppear(i) + 0.1, 2.0) * (135 - i * 12));
const leadWaitAt = (P: number, i: number) => {
  const [a, b] = leads[i].wait;
  return Math.round(lerp(a, b, seg(P, lAppear(i), 2.0)));
};
const heat = (min: number) => (min < 30 ? "hot" : min < 120 ? "warm" : "cold");

function fmtWait(min: number) {
  if (min < 1) return "just now";
  if (min < 60) return `${min}m`;
  if (min < 1440) return `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m`;
  return `${Math.floor(min / 1440)}d ${Math.floor((min % 1440) / 60)}h`;
}

/** The live line under each beat's caption: the same number the stage is showing. */
function beatMeter(i: number, P: number): { text: string; color: string } {
  if (i === 0) {
    const n = questions.reduce((s, _, k) => s + repeatsAt(P, k), 0);
    return { text: `${n} repeat questions answered by hand today`, color: tone.red };
  }
  if (i === 1) {
    const oldest = Math.max(0, ...leads.map((_, k) => (P > lAppear(k) ? leadWaitAt(P, k) : 0)));
    return { text: `Oldest lead waiting · ${fmtWait(oldest)}`, color: heat(oldest) === "cold" ? tone.cold : tone.hot };
  }
  if (i === 2) {
    const n = handledBy(P);
    return {
      text: n < HANDLED_TOTAL ? `${n} of ${HANDLED_TOTAL} handled by the agent` : `${HANDLED_TOTAL - 1} answered · 1 passed to a person`,
      color: tone.green,
    };
  }
  return { text: "First reply · 2h+ → 0.8s", color: tone.green };
}

/* ---------- motion helpers ---------- */

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
/** True when the visitor asked for reduced motion (false during SSR). */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

/**
 * Chases a scroll-driven value with a short exponential ease, so a big wheel
 * jump glides instead of cutting. Still a pure function of scroll once settled.
 */
function useSmoothed(target: number, reduced: boolean, tau = 110) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (reduced) {
      current.current = target;
      return;
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const k = 1 - Math.exp(-(now - last) / tau);
      last = now;
      current.current += (target - current.current) * k;
      if (Math.abs(target - current.current) < 0.0015) current.current = target;
      setValue(current.current);
      if (current.current !== target) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, tau]);
  return reduced ? target : value;
}

/** Counts from the currently displayed number to `target` over ~500ms, eased. */
function useCountTo(target: number, reduced: boolean, ms = 500) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);
  useEffect(() => {
    if (reduced) {
      shown.current = target;
      return;
    }
    const from = shown.current;
    if (from === target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = clamp((now - start) / ms);
      shown.current = from + (target - from) * easeOut(t);
      setValue(shown.current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, ms]);
  return Math.round(reduced ? target : value);
}

/** Soft ring that blooms and fades on an element whenever `signal` changes (not on mount). */
function useFlash<T extends HTMLElement>(signal: unknown, reduced: boolean, color = "var(--accent-text)", delay = 0) {
  const ref = useRef<T>(null);
  const first = useRef(true);
  const anim = useRef<Animation | null>(null);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || reduced || typeof el.animate !== "function") return;
    anim.current?.cancel();
    anim.current = el.animate(
      [
        { boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 38%, transparent)` },
        { boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 0%, transparent)` },
      ],
      { duration: 900, delay, easing: "ease-out" },
    );
  }, [signal, reduced, color, delay]);
  return ref;
}

/** Header pill whose number counts between states and flashes when it changes. */
function CountPill({
  value,
  render,
  reduced,
  className,
  style,
  flashColor,
  flashOn,
}: {
  value: number;
  render: (n: number) => string;
  reduced: boolean;
  className: string;
  style?: CSSProperties;
  flashColor?: string;
  /** Discrete signal that should trigger the highlight (defaults to the value). */
  flashOn?: unknown;
}) {
  const n = useCountTo(value, reduced);
  const ref = useFlash<HTMLSpanElement>(flashOn ?? value, reduced, flashColor);
  return (
    <span ref={ref} className={`tabular-nums ${className}`} style={style}>
      {render(n)}
    </span>
  );
}

type CardStatus = "new" | "late" | "hot" | "warm" | "cold" | "working" | "done" | "handoff";

const statusColor: Record<CardStatus, string> = {
  new: "var(--accent-text)",
  late: tone.red,
  hot: tone.hot,
  warm: tone.amber,
  cold: tone.cold,
  working: "var(--accent-text)",
  done: tone.green,
  handoff: tone.amber,
};
const statusBorder: Partial<Record<CardStatus, string>> = {
  hot: "rgb(234 88 12 / 0.45)",
  warm: "rgb(217 119 6 / 0.45)",
  cold: "rgb(59 130 246 / 0.45)",
  working: "var(--accent-text)",
  done: "rgb(22 163 74 / 0.45)",
  handoff: "rgb(217 119 6 / 0.55)",
};

/**
 * An inbox card at a fixed spot on the canvas. It fades + slides in when `shown`
 * flips on (staggered by `delay`), fades out when it flips off, and flashes in
 * its status colour whenever the status changes.
 */
function StoryCard({
  shown,
  delay,
  from,
  status,
  box,
  reduced,
  children,
}: {
  shown: boolean;
  delay: number;
  from: string;
  status: CardStatus;
  box: CSSProperties;
  reduced: boolean;
  children: ReactNode;
}) {
  const ref = useFlash<HTMLDivElement>(`${shown}:${status}`, reduced || !shown, statusColor[status], shown ? delay : 0);
  return (
    <div
      ref={ref}
      className="absolute overflow-hidden rounded-lg border px-3 py-2.5 motion-reduce:transition-none"
      style={{
        ...box,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : from,
        borderColor: statusBorder[status] ?? "var(--border)",
        // Cold leads frost over; everything else sits on the page colour.
        background: status === "cold" ? "color-mix(in srgb, #3b82f6 7%, var(--bg))" : "var(--bg)",
        transitionProperty: "opacity, transform, border-color, background-color",
        transitionDuration: shown ? "380ms, 380ms, 500ms, 700ms" : "220ms, 220ms, 500ms, 700ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        transitionDelay: reduced ? "0ms" : `${delay}ms, ${delay}ms, 0ms, 0ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger delays for a list that reveals in order: cards that appear together
 * enter one after another; cards that leave together exit newest-first.
 */
function useStagger(count: number, step = 70) {
  const [prev, setPrev] = useState(count);
  const [base, setBase] = useState(count);
  if (count !== prev) {
    setPrev(count);
    setBase(prev);
  }
  return (i: number) => (i >= base ? (i - base) * step : Math.max(0, base - 1 - i) * (step * 0.7));
}

/** Scales a fixed 540×460 design to fit its container. */
function useFitScale<T extends HTMLElement>(w: number, h: number) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / w, height / h, 1.25));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return [ref, scale] as const;
}

/** Crossfading layer for the composer's three states. */
function Layer({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      aria-hidden={!on}
      className="absolute inset-0 flex flex-col px-3 py-2.5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(6px)" }}
    >
      {children}
    </div>
  );
}

const cannedReply = "Hi! Your order #4471 is on its way. Here's your tracking link, and sorry for the wait…";

function Stage({ P, rawP, reduced }: { P: number; rawP: number; reduced: boolean }) {
  const [box, scale] = useFitScale<HTMLDivElement>(540, 460);

  // Cards are triggered, not scrubbed: they enter/leave with a timed, staggered transition.
  const qShown = questions.filter((_, i) => rawP > qAppear(i)).length;
  const lShown = leads.filter((_, i) => rawP > lAppear(i)).length;
  const qDelay = useStagger(qShown);
  const lDelay = useStagger(lShown);
  const beat = Math.min(3, Math.floor(rawP));

  const inboxOut = easeOut(seg(P, 3.0, 3.35));
  const dashIn = seg(P, 3.15, 3.5);
  const crmIn = seg(P, 1.15, 1.3);
  const synced = rawP >= stops[stops.length - 1].t;
  const handled = handledBy(rawP);
  const resolving = rawP > 2.1;
  const waiting = qShown + lShown - handled;
  const todayCount = Math.round(18 + easeOut(seg(rawP, 0, 2)) * 110);

  // Composer: one person, three jobs. Replying (beat 1), copy-pasting (beat 2), then only the handoff.
  const composer = rawP >= stopFor("l", 2).t ? "handoff" : rawP > 1.2 ? "paused" : "replying";
  const typed = cannedReply.slice(0, Math.round(cannedReply.length * seg(P, 0.5, 0.95)));

  // The agent flies stop to stop; each hop eases in over the 0.07 before that stop resolves.
  const agentIn = seg(P, 2.0, 2.1);
  let ax = 270;
  let ay = 24;
  for (const s of stops) {
    const e = easeInOut(seg(P, s.t - 0.075, s.t - 0.01));
    ax = lerp(ax, s.x, e);
    ay = lerp(ay, s.y, e);
  }
  const workingOn = (s: (typeof stops)[number]) => rawP > s.t - 0.06 && rawP < s.t;

  return (
    <div ref={box} className="relative h-full w-full">
      <div
        className="absolute left-1/2 top-1/2 h-[460px] w-[540px]"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {/* ---------- Inbox window (beats 1–3) ---------- */}
        <div
          className="glass absolute inset-0 overflow-hidden rounded-xl"
          style={{ opacity: 1 - inboxOut, transform: `scale(${1 - inboxOut * 0.12}) translateY(${inboxOut * -30}px)` }}
        >
          <div className="flex h-[49px] items-center justify-between border-b border-border px-5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-sm font-semibold text-fg">Shared inbox</span>
              <span
                className="ml-1 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-text transition-[opacity,transform] duration-300"
                style={{ opacity: resolving ? 1 : 0, transform: resolving ? "none" : "scale(0.8)" }}
              >
                <span className="size-1.5 rounded-full bg-current" /> Agent on
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <CountPill
                value={todayCount}
                render={(n) => `Today ${n}`}
                flashOn={Math.min(2, beat)}
                reduced={reduced}
                className="rounded bg-surface-2 px-2 py-1 text-muted"
              />
              <CountPill
                key={resolving ? "handled" : "waiting"}
                value={resolving ? handled : waiting}
                render={(n) => (resolving ? `${n} of ${HANDLED_TOTAL} handled` : `${n} waiting`)}
                reduced={reduced}
                flashColor={resolving ? tone.green : tone.red}
                className="rounded px-2 py-1 font-semibold transition-colors duration-300"
                style={{
                  background: resolving ? "rgb(22 163 74 / 0.14)" : "rgb(220 38 38 / 0.12)",
                  color: resolving ? tone.green : tone.red,
                }}
              />
            </div>
          </div>

          {/* column labels */}
          <p className="absolute top-[65px] font-mono text-[10px] uppercase tracking-widest text-subtle" style={{ left: COL_Q.x }}>
            Customer questions
          </p>
          <p className="absolute top-[65px] font-mono text-[10px] uppercase tracking-widest text-subtle" style={{ left: COL_L.x }}>
            New leads
          </p>

          {/* ---- customer questions ---- */}
          {questions.map((q, i) => {
            const stop = stopFor("q", i);
            const done = rawP >= stop.t;
            const working = workingOn(stop);
            const wait = questionWaitAt(P, i);
            const status: CardStatus = done ? "done" : working ? "working" : wait >= 60 ? "late" : "new";
            const waitColor = wait >= 60 ? tone.red : wait >= 15 ? tone.amber : "var(--subtle)";
            return (
              <StoryCard
                key={q.text}
                shown={i < qShown}
                delay={qDelay(i)}
                from="translateY(-14px)"
                status={status}
                box={{ left: COL_Q.x, top: qY(i), width: COL_Q.w, height: Q_H }}
                reduced={reduced}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[10px] font-bold text-fg">{q.who}</span>
                  <p className="min-w-0 flex-1 truncate text-[13px] text-fg">{q.text}</p>
                  <span
                    className="shrink-0 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums transition-opacity duration-300"
                    style={{ color: tone.red, opacity: done ? 0 : 1 }}
                    title="Times asked today"
                  >
                    ×{repeatsAt(P, i)}
                  </span>
                </div>
                <p className="mt-0.5 flex h-3.5 items-center gap-1 pl-8 font-mono text-[10px] transition-colors duration-500" style={{ color: done ? tone.green : working ? "var(--accent-text)" : waitColor }}>
                  {done ? <Check className="size-3 shrink-0" /> : <Clock className="size-3 shrink-0" />}
                  <span className="truncate">{done ? q.reply : working ? "Agent is replying…" : wait < 3 ? "New" : `Waiting ${fmtWait(wait)}`}</span>
                  {done && <span className="ml-auto shrink-0 text-subtle">0.8s</span>}
                </p>
              </StoryCard>
            );
          })}

          {/* ---- composer: what the one human is doing ---- */}
          <div
            className="absolute overflow-hidden rounded-lg border bg-bg transition-[opacity,transform,border-color] duration-500 motion-reduce:transition-none"
            style={{
              left: COL_Q.x,
              top: COMPOSER.y,
              width: COL_Q.w,
              height: COMPOSER.h,
              opacity: rawP > 0.5 ? 1 : 0,
              transform: rawP > 0.5 ? "none" : "translateY(10px)",
              borderColor: composer === "handoff" ? "rgb(217 119 6 / 0.55)" : composer === "paused" ? "var(--border)" : "var(--border-strong)",
            }}
          >
            <Layer on={composer === "replying"}>
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-subtle">
                <UserRound className="size-3" /> You · replying to EM
              </p>
              <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-fg">
                {typed}
                <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-fg motion-safe:animate-pulse" />
              </p>
              <p className="mt-auto font-mono text-[10px]" style={{ color: tone.red }}>
                Same reply, typed for the {repeatsAt(P, 0)}th time today
              </p>
            </Layer>
            <Layer on={composer === "paused"}>
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-subtle">
                <Copy className="size-3" /> You · in CRM.xlsx
              </p>
              <p className="mt-1 text-[12px] leading-snug text-muted">Replies paused while you copy new leads into the spreadsheet.</p>
              <p className="mt-auto font-mono text-[10px]" style={{ color: tone.red }}>
                {qShown} customers still waiting
              </p>
            </Layer>
            <Layer on={composer === "handoff"}>
              <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest" style={{ color: tone.amber }}>
                <UserRound className="size-3" /> Needs you · 1
              </p>
              <p className="mt-1 text-[12px] leading-snug text-fg">Hana K. wants to talk partnerships. The agent summarised the thread for you.</p>
              <p className="mt-auto flex items-center gap-1 font-mono text-[10px]" style={{ color: tone.green }}>
                <Check className="size-3" /> Everything else is handled
              </p>
            </Layer>
          </div>

          {/* ---- new leads ---- */}
          {leads.map((l, i) => {
            const stop = stopFor("l", i);
            const done = rawP >= stop.t;
            const working = workingOn(stop);
            const wait = leadWaitAt(P, i);
            const temp = heat(wait);
            const status: CardStatus = done ? (l.handoff ? "handoff" : "done") : working ? "working" : temp;
            const TempIcon = temp === "hot" ? Flame : temp === "warm" ? Thermometer : Snowflake;
            const tempColor = statusColor[temp];
            return (
              <StoryCard
                key={l.who}
                shown={i < lShown}
                delay={lDelay(i)}
                from="translateX(18px)"
                status={status}
                box={{ left: COL_L.x, top: lY(i), width: COL_L.w, height: L_H }}
                reduced={reduced}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-fg">{l.who}</p>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold capitalize transition-[color,background-color,opacity] duration-500"
                    style={{ color: tempColor, background: `color-mix(in srgb, ${tempColor} 12%, transparent)`, opacity: done || working ? 0 : 1 }}
                  >
                    <TempIcon className="size-3" /> {temp}
                  </span>
                </div>
                <p className="truncate text-[12px] text-muted">{l.text}</p>
                <p
                  className="mt-1 flex items-center gap-1 font-mono text-[10px] transition-colors duration-500"
                  style={{ color: done ? (l.handoff ? tone.amber : tone.green) : working ? "var(--accent-text)" : tempColor }}
                >
                  {done ? l.handoff ? <UserRound className="size-3 shrink-0" /> : <Check className="size-3 shrink-0" /> : <Clock className="size-3 shrink-0" />}
                  <span className="truncate">{done ? l.result : working ? "Agent is qualifying…" : `Waiting ${fmtWait(wait)}`}</span>
                </p>
              </StoryCard>
            );
          })}

          {/* ---- CRM sheet: typed by hand in beat 2, synced by the agent in beat 3 ---- */}
          <div
            className="absolute rounded-lg border bg-bg px-2.5 py-2 transition-[border-color,border-style] duration-500"
            style={{
              left: COL_L.x,
              top: CRM.y,
              width: COL_L.w,
              height: CRM.h,
              opacity: crmIn,
              transform: `translateY(${(1 - crmIn) * 20}px)`,
              borderStyle: synced ? "solid" : "dashed",
              borderColor: synced ? "rgb(22 163 74 / 0.45)" : "var(--border-strong)",
            }}
          >
            <p className="mb-1 flex h-3.5 items-center gap-1.5 font-mono text-[10px] transition-colors duration-500" style={{ color: synced ? tone.green : "var(--subtle)" }}>
              {synced ? <Check className="size-3" /> : <Copy className="size-3" />}
              {synced ? "CRM · synced by agent" : "CRM.xlsx · typed by hand"}
            </p>
            <div className="grid h-3.5 grid-cols-[4.5rem_1fr_4.75rem] gap-1.5 font-mono text-[9px] uppercase tracking-wider text-subtle">
              <span>Name</span>
              <span>Request</span>
              <span>Status</span>
            </div>
            {leads.map((l, i) => {
              const agentRow = rawP >= stopFor("l", i).t;
              // Hand-typed cells fill character by character; only the first two leads get typed.
              const handTyped = i < 2 ? seg(P, copyAt(i) + 0.12, copyAt(i) + 0.3) : 0;
              const cells = [l.crm[0], l.crm[1], ""];
              const total = cells.join("").length;
              let budget = Math.round(total * handTyped);
              return (
                <div
                  key={l.who}
                  className="mt-1 grid h-[18px] grid-cols-[4.5rem_1fr_4.75rem] items-center gap-1.5 rounded-sm border-l-2 pl-1 text-[10px] transition-colors duration-500"
                  style={{ borderLeftColor: agentRow ? (l.handoff ? tone.amber : tone.green) : "transparent" }}
                >
                  {cells.map((c, k) => {
                    const text = agentRow ? l.crm[k] : c.slice(0, Math.max(0, budget));
                    if (!agentRow) budget -= c.length;
                    const filled = text.length > 0;
                    const typing = !agentRow && handTyped > 0 && handTyped < 1 && filled && text.length < c.length;
                    return filled ? (
                      <span
                        key={k}
                        className="truncate"
                        style={{ color: k === 2 ? (l.handoff ? tone.amber : tone.green) : agentRow ? "var(--fg)" : "var(--muted)" }}
                      >
                        {text}
                        {typing && <span className="ml-px inline-block h-2.5 w-px translate-y-0.5 bg-fg" />}
                      </span>
                    ) : (
                      <span key={k} className="h-2.5 rounded-sm bg-surface-2" />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* ---- copy-paste: a clipboard chip hops from lead card to spreadsheet row ---- */}
          {!reduced &&
            [0, 1].map((i) => {
              const f = seg(P, copyAt(i), copyAt(i) + 0.12);
              if (f <= 0 || f >= 1) return null;
              const e = easeInOut(f);
              const x = lerp(COL_L.x + 40, COL_L.x + 36, e);
              const y = lerp(lY(i) + 16, crmRowY(i), e) - Math.sin(e * Math.PI) * 26;
              return (
                <span
                  key={i}
                  className="pointer-events-none absolute inline-flex items-center gap-1 rounded-md border border-border-strong bg-surface px-1.5 py-0.5 font-mono text-[10px] text-fg shadow-lg"
                  style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${Math.sin(e * Math.PI) * -6}deg)`, opacity: clamp(Math.min(f, 1 - f) * 8) }}
                >
                  <Copy className="size-3" /> {leads[i].who}
                </span>
              );
            })}

          {/* ---- the agent: visits every card in order ---- */}
          <div
            className="pointer-events-none absolute left-0 top-0"
            style={{
              transform: `translate(${ax}px, ${ay}px) translate(-50%, -50%) scale(${0.4 + easeBack(agentIn) * 0.6})`,
              opacity: clamp(agentIn * 3),
            }}
            aria-hidden="true"
          >
            <span className="absolute inset-0 rounded-full bg-purple/30 motion-safe:animate-ping [animation-duration:1.6s]" />
            <div className="relative flex size-8 items-center justify-center rounded-full bg-purple text-white shadow-[0_10px_24px_-8px_rgb(124_58_237/0.8)] ring-2 ring-bg">
              <svg viewBox="0 0 40 40" className="size-4" aria-hidden="true">
                <path d="M6 9 L17 33 H23 L34 9 H27.5 L20 26 L12.5 9 Z" fill="#fff" />
                <circle cx="34" cy="31" r="3.4" fill="#ffd23f" />
              </svg>
            </div>
          </div>
        </div>

        {/* ---------- Results (beat 4): the same inbox, before and after ---------- */}
        <div className="absolute inset-0" style={{ opacity: dashIn, pointerEvents: dashIn > 0.5 ? "auto" : "none" }}>
          <div className="glass flex h-full flex-col rounded-xl p-5" style={{ transform: `translateY(${(1 - easeOut(dashIn)) * 60}px)` }}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-fg">The same inbox, with an agent on it</p>
              <span className="inline-flex items-center gap-1.5 rounded bg-[rgb(22_163_74/0.14)] px-2 py-1 font-mono text-[11px] font-semibold" style={{ color: tone.green }}>
                <span className="size-1.5 rounded-full bg-current" /> Agent online
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { l: "First reply", from: "2h+", to: "0.8s" },
                { l: "Leads left waiting", from: "3", to: "0" },
                { l: "Rows typed by hand", from: "2", to: "0" },
              ].map((t, i) => {
                const e = easeBack(seg(P, 3.3 + i * 0.08, 3.55 + i * 0.08));
                return (
                  <div key={t.l} className="rounded-lg bg-bg p-3" style={{ opacity: clamp(e * 1.5), transform: `translateY(${(1 - e) * 24}px)` }}>
                    <p className="text-[11px] text-muted">{t.l}</p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-semibold tracking-tight text-fg">{t.to}</span>
                      <span className="font-mono text-[11px] text-subtle line-through decoration-[1.5px]" style={{ textDecorationColor: tone.red }}>
                        {t.from}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* where the team's day goes */}
            <div className="mt-4 flex flex-1 flex-col justify-center gap-4 rounded-lg bg-bg p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Where your team&apos;s day goes</p>
              {[
                {
                  label: "Before",
                  parts: [
                    { t: "Same replies", w: 40, bg: "rgb(220 38 38 / 0.16)", fg: "var(--fg)" },
                    { t: "Copy-paste", w: 25, bg: "rgb(217 119 6 / 0.2)", fg: "var(--fg)" },
                    { t: "Real work", w: 35, bg: "var(--accent)", fg: "var(--accent-fg)" },
                  ],
                },
                {
                  label: "After",
                  parts: [
                    { t: "Real work", w: 84, bg: "var(--accent)", fg: "var(--accent-fg)" },
                    { t: "Edge cases", w: 16, bg: "rgb(217 119 6 / 0.2)", fg: "var(--fg)" },
                  ],
                },
              ].map((row, r) => {
                const e = easeOut(seg(P, 3.5 + r * 0.14, 3.75 + r * 0.14));
                return (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 font-mono text-[11px] text-muted">{row.label}</span>
                    <div className="flex h-9 flex-1 gap-1 overflow-hidden rounded-md" style={{ clipPath: `inset(0 ${(1 - e) * 100}% 0 0 round 6px)` }}>
                      {row.parts.map((part) => (
                        <span
                          key={part.t}
                          className="flex items-center truncate rounded-[4px] px-2 text-[11px] font-medium"
                          style={{ width: `${part.w}%`, background: part.bg, color: part.fg }}
                        >
                          {part.t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* people back on real work */}
            <div className="mt-3 flex gap-2">
              {[
                { n: "SA", t: "Strategy" },
                { n: "AV", t: "Client calls" },
                { n: "LE", t: "Product" },
              ].map((p, i) => {
                const e = easeBack(seg(P, 3.75 + i * 0.06, 3.95 + i * 0.03));
                return (
                  <div
                    key={p.t}
                    className="flex flex-1 items-center gap-2 rounded-lg bg-bg px-3 py-2"
                    style={{ opacity: clamp(e * 1.5), transform: `translateY(${(1 - e) * 30}px)` }}
                  >
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">{p.n}</span>
                    <span className="text-[12px] text-fg">{p.t}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labels = ["The problem", "The cost", "The agent", "The outcome"];

/** Progress (0–1) of a sticky panel across its tall scroll track. */
function usePinProgress() {
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const t = track.current?.getBoundingClientRect();
      const p = pin.current?.getBoundingClientRect();
      if (!t || !p) return;
      const travel = t.height - p.height;
      setProgress(clamp(travel > 0 ? (p.top - t.top) / travel : 0));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { track, pin, progress };
}

export function AgentStory({ beats }: { beats: StoryBeat[] }) {
  const { track, pin, progress } = usePinProgress();
  const reduced = useReducedMotion();
  const P = progress * beats.length;
  // Scrubbed pieces follow a lightly smoothed P so big scroll jumps glide.
  const smoothP = useSmoothed(P, reduced);
  const active = Math.min(beats.length - 1, Math.floor(P));

  return (
    // Track = panel height + scroll distance for the four beats; no dead space above or below.
    <div ref={track} style={{ height: `calc(${beats.length * 80}vh + min(100svh - 6rem, 760px))` }} className="relative px-2 sm:px-4">
      <div ref={pin} className="sticky top-[5.5rem] h-[min(100svh-6rem,760px)]">
        <div className="relative isolate grid h-full w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-bg lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1">
          {/* decoration */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div data-parallax="0.02" className="absolute -right-24 -top-32 size-[30rem] rounded-full bg-surface-2/60" />
            {/* colour behind the glass stage */}
            <div data-parallax="-0.03" className="hero-aurora absolute right-[18%] top-[22%] size-72 rounded-full bg-purple/25 blur-3xl" />
            <div data-parallax="0.03" className="hero-aurora absolute bottom-[10%] right-[6%] size-56 rounded-full bg-yellow/35 blur-3xl [animation-delay:-5s]" />
            <div className="absolute bottom-6 left-6 grid grid-cols-6 gap-3 sm:bottom-10 sm:left-10">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="size-1 rounded-full bg-subtle/50" />
              ))}
            </div>
          </div>

          {/* text column */}
          <div className="relative flex flex-col justify-center px-5 pt-5 sm:px-10 lg:px-14 lg:pt-0">
            {/* segmented progress */}
            <div className="flex gap-2" role="progressbar" aria-label="Story progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
              {beats.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-border-strong">
                  <span className="block h-full origin-left bg-accent-text" style={{ transform: `scaleX(${clamp(P - i)})` }} />
                </span>
              ))}
            </div>
            <p key={active} className="story-label-in mt-4 font-mono text-xs uppercase tracking-widest text-accent-text">
              {String(active + 1).padStart(2, "0")} · {labels[active]}
            </p>

            <div className="relative mt-4 min-h-[9.5rem] sm:min-h-[15rem] lg:mt-8 lg:min-h-[20rem]">
              {beats.map((beat, i) => {
                const state = i === active ? "now" : i < active ? "past" : "next";
                const meter = beatMeter(i, smoothP);
                return (
                  <div
                    key={beat.punch}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
                      state === "now"
                        ? "opacity-100 delay-75 duration-[225ms]"
                        : state === "past"
                          ? "pointer-events-none -translate-y-3 opacity-0 motion-reduce:translate-y-0"
                          : "pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0"
                    }`}
                  >
                    <p className="text-base text-muted sm:text-xl">{beat.lead}</p>
                    <p className="mt-1 text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">{beat.punch}</p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">{beat.caption}</p>
                    {/* live readout of what the stage is showing right now */}
                    <p
                      className="mt-5 hidden items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs tabular-nums text-fg sm:inline-flex"
                      aria-hidden="true"
                    >
                      <span className="size-1.5 rounded-full motion-safe:animate-pulse" style={{ background: meter.color }} />
                      {meter.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className={`hidden font-mono text-xs text-subtle transition-opacity duration-500 lg:block ${progress < 0.04 ? "opacity-100" : "opacity-0"}`}>
              Scroll to see an agent at work ↓
            </p>
          </div>

          {/* stage */}
          <div className="relative flex min-h-0 flex-col p-4 sm:p-8 lg:p-10">
            <div className="min-h-0 flex-1">
              <Stage P={smoothP} rawP={P} reduced={reduced} />
            </div>
            <div className="mt-2 flex justify-end">
              <IllustrativeTag />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
