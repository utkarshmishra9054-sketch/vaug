"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, Check, Clock, Copy, Flame, Snowflake, Thermometer, UserRound } from "lucide-react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import type { StoryBeat } from "@/content/types";

/*
 * Scroll story in four scenes, driven by plain native scrolling (no scroll
 * hijacking, so trackpad momentum and phone flings never skip or shake).
 *   0  The problem  the same four questions, answered by hand again and again
 *   1  The cost     new leads sit unanswered and cool from hot to cold
 *   2  The agent    the agent works the inbox item by item, then syncs the CRM
 *   3  The outcome  before/after numbers and where the team's day goes
 * Desktop: the beats scroll past on the left while one sticky window on the right
 * swaps scenes. Below lg: each beat is a stacked card with its own window.
 * Each scene plays its intro once, the first time it is reached; scenes already
 * seen (or skipped past) show their finished state, so scrolling back never replays.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, from: number, to: number) => clamp((t - from) / (to - from));
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

/** Fade + lift in, as a pure function of the scene clock. */
function rise(t: number, at: number, span = 0.14, dy = 10): CSSProperties {
  const e = easeOut(seg(t, at, at + span));
  return { opacity: e, transform: `translateY(${(1 - e) * dy}px)` };
}

/* ---------- story data ---------- */

// Repeat counts add up to the "hundred times a day" in scene 1.
const questions = [
  { who: "EM", text: "Where's my order #4471?", repeats: 38, reply: "Tracking link sent" },
  { who: "JB", text: "Can I change my address?", repeats: 14, reply: "Address updated" },
  { who: "LK", text: "Is the blue one in stock?", repeats: 21, reply: "Back Friday · alert set" },
  { who: "TR", text: "How do I get a refund?", repeats: 27, reply: "Return label sent" },
];
const leads = [
  { who: "Maya R.", initials: "MR", text: "Demo request · 40 seats", wait: [2, 116], result: "Qualified · demo booked Thu", crm: ["Maya R.", "Demo · 40 seats"] },
  { who: "Oliver P.", initials: "OP", text: "Pricing for the Pro plan", wait: [1, 802], result: "Pricing sent · follow-up set", crm: ["Oliver P.", "Pro pricing"] },
  { who: "Hana K.", initials: "HK", text: "Partnership enquiry", wait: [1, 185], result: "Summarised · handed to you", crm: ["Hana K.", "Partnership"], handoff: true },
];

const heat = (min: number) => (min < 30 ? "hot" : min < 120 ? "warm" : "cold");
const heatColor = { hot: tone.hot, warm: tone.amber, cold: tone.cold };
const heatIcon = { hot: Flame, warm: Thermometer, cold: Snowflake };

function fmtWait(min: number) {
  if (min < 1) return "just now";
  if (min < 60) return `${min}m`;
  return `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m`;
}

function ordinal(n: number) {
  const tens = n % 100;
  const suffix = tens >= 11 && tens <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th";
  return `${n}${suffix}`;
}

/* ---------- scene clocks ---------- */

/** How long each scene's intro plays, in ms. */
const DURATIONS = [3200, 3200, 3400, 2600];

const repeatsAt = (t: number, i: number) => Math.round(questions[i].repeats * easeOut(seg(t, 0.12 + i * 0.08, 0.8)));
const leadAppear = (i: number) => 0.06 + i * 0.1;
const leadWaitAt = (t: number, i: number) => Math.round(lerp(leads[i].wait[0], leads[i].wait[1], easeInOut(seg(t, leadAppear(i) + 0.05, 0.85))));

// Scene 3: the agent works every item in order.
const agentItems = [
  ...questions.map((q) => ({ who: q.who, text: q.text, doing: "Replying", result: q.reply, handoff: false })),
  ...leads.map((l) => ({ who: l.initials, text: `${l.who} · ${l.text}`, doing: l.handoff ? "Summarising" : "Qualifying", result: l.result, handoff: !!l.handoff })),
];
const itemStart = (i: number) => 0.08 + i * 0.1;
const ITEM_SPAN = 0.08;
const CRM_AT = itemStart(agentItems.length) + 0.02;
const handledAt = (t: number) => agentItems.filter((_, i) => t >= itemStart(i) + ITEM_SPAN).length;

/** The line under each beat's caption: the same number the stage is showing. */
function beatMeter(i: number, t: number): { text: string; color: string } {
  if (i === 0) {
    const n = questions.reduce((s, _, k) => s + repeatsAt(t, k), 0);
    return { text: `${n} repeat questions answered by hand today`, color: tone.red };
  }
  if (i === 1) {
    const oldest = Math.max(...leads.map((_, k) => leadWaitAt(t, k)));
    return { text: `Oldest lead waiting · ${fmtWait(oldest)}`, color: tone.cold };
  }
  if (i === 2) {
    const n = handledAt(t);
    return {
      text: n < agentItems.length ? `${n} of ${agentItems.length} handled by the agent` : `${agentItems.length - 1} answered · 1 passed to a person`,
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
 * One clock (0 → 1) per scene. The scene at `reached` plays its intro once;
 * every scene before it is pinned at 1, so going back shows it finished.
 */
function useScenePlayback(reached: number, reduced: boolean) {
  const [ts, setTs] = useState(() => DURATIONS.map(() => 0));
  useEffect(() => {
    if (reached < 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = reduced ? 1 : clamp((now - start) / DURATIONS[reached]);
      setTs((prev) => prev.map((v, k) => (k < reached ? 1 : k === reached ? Math.max(v, t) : v)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reached, reduced]);
  return ts;
}

/** A single clock (0 → 1) that plays once, the first time its element is on screen. */
function usePlayWhenSeen<T extends HTMLElement>(duration: number, reduced: boolean) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const next = reduced ? 1 : clamp((now - start) / duration);
      setT(next);
      if (next < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, duration, reduced]);
  return [ref, t] as const;
}

/** Scales a fixed design canvas to fit its container. */
function useFitScale<T extends HTMLElement>(w: number, h: number) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(width / w, height / h, 1.2));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return [ref, scale] as const;
}

/**
 * Fills its container's width, never narrower than `minW` design pixels: below
 * that the canvas is scaled down instead of squashed.
 */
function useFluidCanvas<T extends HTMLElement>(minW: number) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scale = width ? Math.min(1, width / minW) : 1;
  return { ref, scale, canvasW: width ? width / scale : minW };
}

/**
 * The beat crossing the middle of the viewport. Plain native scrolling: nothing
 * here intercepts wheel, touch or keys, so momentum and the scrollbar behave.
 */
function useActiveBeat(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.beat));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.slice(0, count).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return { refs, active };
}


/* ---------- stage pieces ---------- */

/** The agent's mark: the VAUG "V" with its dot, on a purple tile. */
function AgentMark({ className = "size-4" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-[30%] bg-purple ${className}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" className="size-[70%]">
        <path d="M6 9 L17 33 H23 L34 9 H27.5 L20 26 L12.5 9 Z" fill="#fff" />
        <circle cx="34" cy="31" r="3.4" fill="#ffd23f" />
      </svg>
    </span>
  );
}

function Pill({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-1 font-mono text-[11px] font-semibold tabular-nums"
      style={{ color, background: `color-mix(in srgb, ${color} 13%, transparent)` }}
    >
      {children}
    </span>
  );
}

function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-subtle" style={style}>
      {children}
    </p>
  );
}

/** One scene: a title + pill in the window header, and a body below it. */
function Scene({ title, pill, children }: { title: ReactNode; pill: ReactNode; children: ReactNode }) {
  return (
    <>
      <div className="absolute left-[92px] right-5 top-0 flex h-[49px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-sm font-semibold text-fg">{title}</div>
        {pill}
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[49px] flex flex-col p-4">{children}</div>
    </>
  );
}

const cannedReply = "Hi! Your order #4471 is on its way. Here's your tracking link, and sorry for the wait…";

/** Scene 1: the same questions pile up and one person types the same reply again. */
function RepeatScene({ t }: { t: number }) {
  const total = questions.reduce((s, _, i) => s + repeatsAt(t, i), 0);
  const typed = cannedReply.slice(0, Math.round(cannedReply.length * seg(t, 0.4, 0.92)));
  return (
    <Scene title="Support inbox" pill={<Pill color={tone.red}>{total} asked today</Pill>}>
      <Label style={rise(t, 0)}>The same four questions, all day long</Label>
      <div className="mt-3 flex flex-col gap-[14px]">
        {questions.map((q, i) => {
          const n = repeatsAt(t, i);
          return (
            <div key={q.text} className="relative" style={rise(t, 0.04 + i * 0.07, 0.14, -12)}>
              {/* the pile of identical messages behind this one */}
              <span className="absolute inset-x-3 -bottom-[9px] h-full rounded-lg border border-border bg-bg transition-opacity duration-500" style={{ opacity: n > 15 ? 0.55 : 0 }} />
              <span className="absolute inset-x-1.5 -bottom-[5px] h-full rounded-lg border border-border bg-bg transition-opacity duration-500" style={{ opacity: n > 4 ? 0.85 : 0 }} />
              <div className="relative flex h-[50px] items-center gap-2.5 rounded-lg border border-border bg-bg px-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[10px] font-bold text-fg">{q.who}</span>
                <p className="min-w-0 flex-1 truncate text-[13px] text-fg">{q.text}</p>
                <span className="shrink-0 font-mono text-[10px] text-subtle">asked</span>
                <span className="w-10 shrink-0 rounded bg-[rgb(220_38_38/0.1)] py-0.5 text-center font-mono text-[12px] font-bold tabular-nums" style={{ color: tone.red }}>
                  ×{n}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto rounded-lg border border-border-strong bg-bg px-3 py-2.5" style={rise(t, 0.34)}>
        <Label>
          <UserRound className="size-3" /> You · replying to EM
        </Label>
        <p className="mt-1.5 h-9 text-[12.5px] leading-snug text-fg">
          {typed}
          <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-fg motion-safe:animate-pulse" />
        </p>
        <p className="mt-1 font-mono text-[10px]" style={{ color: tone.red }}>
          Same reply, typed for the {ordinal(Math.max(1, repeatsAt(t, 0)))} time today
        </p>
      </div>
    </Scene>
  );
}

/** Scene 2: leads wait and cool down while the team copies rows into a spreadsheet. */
function ColdScene({ t }: { t: number }) {
  const shown = leads.filter((_, i) => t > leadAppear(i)).length;
  return (
    <Scene title="New leads" pill={<Pill color={tone.red}>{shown} unanswered</Pill>}>
      <Label style={rise(t, 0)}>Waiting for someone to reply</Label>
      <div className="mt-3 flex flex-col gap-2">
        {leads.map((l, i) => {
          const wait = leadWaitAt(t, i);
          const temp = heat(wait);
          const color = heatColor[temp];
          const Icon = heatIcon[temp];
          // the lead's interest drains as the wait grows
          const warmth = clamp(1 - wait / 260, 0.06, 1);
          return (
            <div
              key={l.who}
              className="relative overflow-hidden rounded-lg border px-3 pb-3 pt-2.5 transition-[background-color,border-color] duration-700"
              style={{
                ...rise(t, leadAppear(i), 0.14, 12),
                borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                background: temp === "cold" ? "color-mix(in srgb, #3b82f6 7%, var(--bg))" : "var(--bg)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-fg">{l.who}</p>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold capitalize transition-colors duration-500"
                  style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                >
                  <Icon className="size-3" /> {temp}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <p className="truncate text-[12px] text-muted">{l.text}</p>
                <p className="flex shrink-0 items-center gap-1 font-mono text-[11px] tabular-nums transition-colors duration-500" style={{ color }}>
                  <Clock className="size-3" /> No reply · {fmtWait(wait)}
                </p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-surface-2">
                <span className="block h-full origin-left transition-colors duration-500" style={{ transform: `scaleX(${warmth})`, background: color }} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto rounded-lg border border-dashed border-border-strong bg-bg px-3 py-2.5" style={rise(t, 0.34)}>
        <Label>
          <Copy className="size-3" /> Meanwhile · you, in CRM.xlsx
        </Label>
        <p className="mt-1 text-[12px] text-muted">Copying each lead into the spreadsheet by hand.</p>
        <div className="mt-2 flex flex-col gap-1">
          {leads.slice(0, 2).map((l, i) => {
            const cells = l.crm;
            const total = cells.join("").length;
            // the second row is still being typed when the scene ends
            let budget = Math.round(total * (i === 0 ? seg(t, 0.42, 0.66) : seg(t, 0.66, 0.95) * 0.6));
            return (
              <div key={l.who} className="grid h-4 grid-cols-[5rem_1fr] gap-2 text-[11px] text-muted">
                {cells.map((c, k) => {
                  const text = c.slice(0, Math.max(0, budget));
                  budget -= c.length;
                  return text ? (
                    <span key={k} className="truncate">
                      {text}
                    </span>
                  ) : (
                    <span key={k} className="my-0.5 rounded-sm bg-surface-2" />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
}

/** Scene 3: the agent clears the inbox one item at a time. */
function AgentScene({ t, reduced }: { t: number; reduced: boolean }) {
  const handled = handledAt(t);
  const synced = t >= CRM_AT;
  return (
    <Scene
      title={
        <>
          <span className="truncate">Shared inbox</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft py-0.5 pl-0.5 pr-2 font-mono text-[10px] font-semibold text-accent-text">
            <AgentMark className="size-4" /> VAUG agent
          </span>
        </>
      }
      pill={
        <Pill color={tone.green}>
          {handled} of {agentItems.length} handled
        </Pill>
      }
    >
      <Label style={rise(t, 0)}>
        <AgentMark className="size-3" /> The agent works the whole queue
      </Label>
      <div className="mt-3 flex flex-col gap-1.5">
        {agentItems.map((item, i) => {
          const e = seg(t, itemStart(i), itemStart(i) + ITEM_SPAN);
          const working = e > 0 && e < 1;
          const done = e >= 1;
          const doneColor = item.handoff ? tone.amber : tone.green;
          return (
            <div
              key={item.text}
              className="relative flex h-9 items-center gap-2.5 overflow-hidden rounded-lg border bg-bg px-2.5 transition-[border-color] duration-300"
              style={{
                ...rise(t, 0.02 + i * 0.015, 0.12, 6),
                borderColor: working ? "#7c3aed" : done ? `color-mix(in srgb, ${doneColor} 40%, transparent)` : "var(--border)",
              }}
            >
              {/* light sweeps across while the agent works this item */}
              {working && !reduced && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                  style={{
                    transform: `translateX(${lerp(-100, 200, e)}%)`,
                    background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent-text) 16%, transparent), transparent)",
                  }}
                />
              )}
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[9px] font-bold text-fg">{item.who}</span>
              <p className={`min-w-0 flex-1 truncate text-[12.5px] transition-colors duration-300 ${done ? "text-muted" : "text-fg"}`}>{item.text}</p>
              <p
                className="flex w-[13.5rem] max-w-[52%] shrink-0 items-center justify-end gap-1.5 text-[11.5px] transition-colors duration-300"
                style={{ color: done ? doneColor : working ? "#7c3aed" : tone.red }}
              >
                {done ? (
                  <>
                    {item.handoff ? <UserRound className="size-3.5 shrink-0" /> : <Check className="size-3.5 shrink-0" />}
                    <span className="truncate font-medium">{item.result}</span>
                    {!item.handoff && <span className="shrink-0 font-mono text-[10px] text-subtle">0.8s</span>}
                  </>
                ) : working ? (
                  <>
                    <AgentMark className="size-3.5" />
                    <span className="font-mono text-[10.5px]">Agent {item.doing.toLowerCase()}…</span>
                  </>
                ) : (
                  <>
                    <Clock className="size-3 shrink-0" />
                    <span className="font-mono text-[10.5px]">Waiting</span>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className="mt-auto flex items-center justify-between rounded-lg border px-3 py-2 transition-[border-color] duration-500"
        style={{ ...rise(t, CRM_AT - 0.04, 0.12), borderColor: synced ? "rgb(22 163 74 / 0.4)" : "var(--border)" }}
      >
        <p className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12px] font-medium" style={{ color: tone.green }}>
          <Check className="size-3.5" /> CRM updated automatically
        </p>
        <p className="truncate pl-3 font-mono text-[10px] text-subtle">3 leads synced · 0 typed by hand</p>
      </div>
    </Scene>
  );
}

/** Scene 4: the same inbox, before and after. */
function OutcomeScene({ t }: { t: number }) {
  return (
    <Scene
      title={<span className="truncate">The same inbox, with an agent on it</span>}
      pill={
        <Pill color={tone.green}>
          <span className="size-1.5 rounded-full bg-current" /> Agent online
        </Pill>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "First reply", from: "2h+", to: "0.8s" },
          { l: "Leads gone cold", from: "3", to: "0" },
          { l: "Typed into CRM", from: "by hand", to: "0" },
        ].map((s, i) => {
          const e = easeBack(seg(t, 0.04 + i * 0.08, 0.32 + i * 0.08));
          return (
            <div key={s.l} className="rounded-lg bg-bg p-3" style={{ opacity: clamp(e * 1.5), transform: `translateY(${(1 - e) * 20}px)` }}>
              <p className="text-[11px] text-muted">{s.l}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-fg">{s.to}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted">
                was <span className="line-through" style={{ textDecorationColor: tone.red }}>{s.from}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-1 flex-col justify-center gap-4 rounded-lg bg-bg p-4" style={rise(t, 0.3)}>
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
              { t: "Real work", w: 80, bg: "var(--accent)", fg: "var(--accent-fg)" },
              { t: "Edge cases", w: 20, bg: "rgb(217 119 6 / 0.2)", fg: "var(--fg)" },
            ],
          },
        ].map((row, r) => {
          const e = easeOut(seg(t, 0.4 + r * 0.14, 0.66 + r * 0.14));
          return (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-12 shrink-0 font-mono text-[11px] text-muted">{row.label}</span>
              <div className="flex h-9 flex-1 gap-1 overflow-hidden rounded-md" style={{ clipPath: `inset(0 ${(1 - e) * 100}% 0 0 round 6px)` }}>
                {row.parts.map((part) => (
                  <span key={part.t} className="flex items-center truncate rounded-[4px] px-2 text-[11px] font-medium" style={{ width: `${part.w}%`, background: part.bg, color: part.fg }}>
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
          const e = easeBack(seg(t, 0.72 + i * 0.07, 0.94 + i * 0.02));
          return (
            <div key={p.t} className="flex flex-1 items-center gap-2 rounded-lg bg-bg px-3 py-2" style={{ opacity: clamp(e * 1.5), transform: `translateY(${(1 - e) * 20}px)` }}>
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">{p.n}</span>
              <span className="text-[12px] text-fg">{p.t}</span>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

function sceneFor(i: number, t: number, reduced: boolean) {
  if (i === 0) return <RepeatScene t={t} />;
  if (i === 1) return <ColdScene t={t} />;
  if (i === 2) return <AgentScene t={t} reduced={reduced} />;
  return <OutcomeScene t={t} />;
}

/** The app window every scene plays in. */
function Window({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-xl ${className}`}>
      <div className="flex h-[49px] items-center gap-2 border-b border-border px-5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      {children}
    </div>
  );
}

/** Desktop: one window, scenes cross-fading inside it as the beats scroll past. */
function Stage({ step, ts, reduced }: { step: number; ts: number[]; reduced: boolean }) {
  const [box, scale] = useFitScale<HTMLDivElement>(540, 460);
  return (
    <div ref={box} className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[540px]" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <Window className="glass">
          {ts.map((t, i) => (
            <div
              key={i}
              aria-hidden={i !== step}
              className="absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
              style={{
                opacity: i === step ? 1 : 0,
                transform: i === step ? "none" : `translateY(${i < step ? -14 : 14}px) scale(0.985)`,
                pointerEvents: i === step ? "auto" : "none",
                transitionDelay: i === step ? "80ms" : "0ms",
              }}
            >
              {sceneFor(i, t, reduced)}
            </div>
          ))}
        </Window>
      </div>
    </div>
  );
}

/** Mobile: each beat is its own card, and its scene plays when the card is on screen. */
function Chapter({ beat, index, count, reduced }: { beat: StoryBeat; index: number; count: number; reduced: boolean }) {
  const [ref, t] = usePlayWhenSeen<HTMLElement>(DURATIONS[index], reduced);
  const { ref: canvasBox, scale, canvasW } = useFluidCanvas<HTMLDivElement>(420);
  const meter = beatMeter(index, t);
  return (
    <article ref={ref} className="overflow-hidden rounded-xl border border-border bg-bg">
      <div className="px-5 pb-5 pt-6 sm:px-8 sm:pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-text">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {labels[index]}
        </p>
        <p className="mt-3 text-base text-muted sm:text-lg">{beat.lead}</p>
        <p className="mt-0.5 text-[2rem] font-bold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl">{beat.punch}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{beat.caption}</p>
      </div>
      <div className="relative border-t border-border bg-surface-2/40 px-3 pb-3 pt-3 sm:px-6 sm:pb-6 sm:pt-6">
        <div ref={canvasBox} className="relative" style={{ height: 460 * scale }}>
          <div className="absolute left-0 top-0 h-[460px] origin-top-left" style={{ width: canvasW, transform: `scale(${scale})` }}>
            <Window className="border border-border bg-surface shadow-[0_18px_40px_-28px_rgb(0_0_0/0.45)]">{sceneFor(index, t, reduced)}</Window>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 font-mono text-[11px] tabular-nums text-fg" aria-hidden="true">
            <span className="size-1.5 shrink-0 rounded-full" style={{ background: meter.color }} />
            {meter.text}
          </p>
          <IllustrativeTag />
        </div>
      </div>
    </article>
  );
}

const labels = ["The problem", "The cost", "The agent", "The outcome"];

/** Hand-off from the story to the services section right below it. */
function NextUp({ className = "" }: { className?: string }) {
  return (
    <a
      href="#models"
      className={`group inline-flex items-center gap-3 rounded-full border border-border bg-surface py-2 pl-4 pr-2 text-sm font-medium text-fg transition-colors hover:border-border-strong ${className}`}
    >
      See the six ways we build it
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform duration-300 group-hover:translate-y-0.5">
        <ArrowDown className="size-3.5" />
      </span>
    </a>
  );
}

export function AgentStory({ beats }: { beats: StoryBeat[] }) {
  const reduced = useReducedMotion();
  const count = Math.min(beats.length, labels.length);
  const story = beats.slice(0, count);
  const { refs, active } = useActiveBeat(count);
  const step = Math.max(0, active);

  // Furthest scene reached: it plays its intro once; everything before it stays finished.
  const [reached, setReached] = useState(-1);
  if (active > reached) setReached(active);
  const ts = useScenePlayback(reached, reduced);
  const meter = beatMeter(step, ts[step]);

  const jumpTo = (i: number) => refs.current[i]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });

  return (
    <div className="px-2 sm:px-4">
      {/* phones and tablets: a stack of self-contained chapters, no pinning */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:hidden">
        {story.map((beat, i) => (
          <Chapter key={beat.punch} beat={beat} index={i} count={count} reduced={reduced} />
        ))}
        <NextUp className="mx-auto mt-4" />
      </div>

      {/* desktop: the beats scroll natively on the left, the stage stays put on the right */}
      <div className="relative isolate hidden overflow-clip rounded-lg border border-border bg-bg lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div aria-hidden="true" className="absolute bottom-10 left-10 -z-10 grid grid-cols-6 gap-3">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="size-1 rounded-full bg-subtle/50" />
          ))}
        </div>

        {/* beats, on a rail */}
        <ol className="relative py-[14vh] pl-14 pr-6 xl:pl-20">
          <span aria-hidden="true" className="absolute bottom-[14vh] left-[2.35rem] top-[14vh] w-px bg-border xl:left-[3.6rem]" />
          {story.map((beat, i) => {
            const on = i === step;
            return (
              <li
                key={beat.punch}
                data-beat={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-current={on ? "step" : undefined}
                className="relative flex min-h-[68vh] flex-col justify-center transition-opacity duration-500 motion-reduce:transition-none"
                style={{ opacity: on ? 1 : 0.28 }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[1.3rem] top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500 ${
                    on ? "border-accent-text bg-accent-text shadow-[0_0_0_6px_var(--accent-soft)]" : i < step ? "border-accent-text bg-bg" : "border-border-strong bg-bg"
                  }`}
                />
                <p className="font-mono text-xs uppercase tracking-widest text-accent-text">
                  {String(i + 1).padStart(2, "0")} · {labels[i]}
                </p>
                <p className="mt-4 text-xl text-muted">{beat.lead}</p>
                <p className="mt-1 text-5xl font-bold leading-[1.02] tracking-[-0.035em] text-fg xl:text-6xl">{beat.punch}</p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{beat.caption}</p>
                {i === count - 1 && <NextUp className="mt-8 w-fit" />}
              </li>
            );
          })}
        </ol>

        {/* sticky stage: the viewport minus room for the navbar, so it never slides under it */}
        <div className="relative">
          <div className="sticky top-0 flex h-svh flex-col justify-center px-8 pb-6 pt-24 xl:px-12">
            <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
              <div data-parallax="0.02" className="absolute -right-24 -top-32 size-[30rem] rounded-full bg-surface-2/60" />
              <div className="hero-aurora absolute right-[22%] top-[26%] size-72 rounded-full bg-purple/25 blur-3xl" />
              <div className="hero-aurora absolute bottom-[12%] right-[6%] size-56 rounded-full bg-yellow/35 blur-3xl [animation-delay:-5s]" />
            </div>

            {/* chapter tabs: fill with each scene's intro, click to jump */}
            <nav className="grid grid-cols-4 gap-2" aria-label="Story chapters">
              {labels.slice(0, count).map((label, i) => (
                <button key={label} type="button" onClick={() => jumpTo(i)} aria-current={i === step ? "step" : undefined} className="group text-left">
                  <span className="block h-1 overflow-hidden rounded-full bg-border-strong transition-colors group-hover:bg-subtle">
                    <span
                      className="block h-full origin-left bg-accent-text transition-transform duration-300"
                      style={{ transform: `scaleX(${i < step ? 1 : i === step ? Math.max(0.04, ts[i]) : 0})` }}
                    />
                  </span>
                  <span className={`mt-2 block font-mono text-[11px] uppercase tracking-wider transition-colors ${i === step ? "text-fg" : "text-subtle group-hover:text-muted"}`}>
                    {label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="my-5 h-[min(552px,calc(100svh-15rem))]">
              <Stage step={step} ts={ts} reduced={reduced} />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs tabular-nums text-fg" aria-hidden="true">
                <span className="size-1.5 rounded-full" style={{ background: meter.color }} />
                {meter.text}
              </p>
              <IllustrativeTag />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
