"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { Check, Clock, Copy } from "lucide-react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import type { StoryBeat } from "@/content/types";

/*
 * Pinned, scroll-scrubbed story. Overall progress P runs 0 → 4 across four beats:
 *   0–1  questions drop into a shared inbox and pile up
 *   1–2  leads slide in and wait while someone copy-pastes into the CRM
 *   2–3  a VAUG agent drops in, connects to every card and resolves them
 *   3–4  the inbox clears and a results dashboard falls into place
 * Every element's position is a pure function of P, so scrolling back rewinds it.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (P: number, from: number, to: number) => clamp((P - from) / (to - from));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const questions = [
  { who: "EM", text: "Where is my order #4471?", tilt: -9 },
  { who: "JB", text: "Can I change my delivery address?", tilt: 7 },
  { who: "LK", text: "Is the blue one back in stock?", tilt: -5 },
  { who: "TR", text: "How do I get a refund?", tilt: 10 },
];
const leads = [
  { who: "Maya R.", text: "Demo request · 40 seats", wait: ["20m", "3h"] },
  { who: "Oliver P.", text: "Pricing for the Pro plan", wait: ["1h", "1d"] },
  { who: "Hana K.", text: "Partnership enquiry", wait: ["45m", "5h"] },
];

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

/**
 * An inbox card that fades + slides in when `shown` flips on (staggered by
 * `delay`), fades out when it flips off, and flashes when its `status` changes.
 */
function StoryCard({
  shown,
  delay,
  from,
  status,
  borderColor,
  reduced,
  children,
}: {
  shown: boolean;
  delay: number;
  from: string;
  status: string;
  borderColor: string;
  reduced: boolean;
  children: ReactNode;
}) {
  const flashColor = status === "done" ? "#16a34a" : status === "late" ? "#dc2626" : "var(--accent-text)";
  const ref = useFlash<HTMLDivElement>(`${shown}:${status}`, reduced || !shown, flashColor, shown ? delay : 0);
  return (
    <div
      ref={ref}
      className="rounded-lg border bg-bg p-3 motion-reduce:transition-none"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : from,
        borderColor,
        transitionProperty: "opacity, transform, border-color",
        transitionDuration: shown ? "380ms, 380ms, 500ms" : "220ms, 220ms, 500ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        transitionDelay: reduced ? "0ms" : `${delay}ms, ${delay}ms, 0ms`,
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

function Stage({ P: rawP, reduced }: { P: number; reduced: boolean }) {
  const [box, scale] = useFitScale<HTMLDivElement>(540, 460);
  // Scrubbed pieces (agent, wires, dashboard) follow a lightly smoothed P so big scroll jumps glide.
  const P = useSmoothed(rawP, reduced);

  // Cards are triggered, not scrubbed: they enter/leave with a timed, staggered transition.
  const qShown = questions.filter((_, i) => rawP > 0.1 + i * 0.18).length;
  const lShown = leads.filter((_, i) => rawP > 1.05 + i * 0.2).length;
  const qDelay = useStagger(qShown);
  const lDelay = useStagger(lShown);
  const beat = Math.min(3, Math.floor(rawP));

  const inboxOut = easeOut(seg(P, 3.0, 3.35));
  const agentIn = easeBack(seg(P, 2.0, 2.35));
  const wires = seg(P, 2.3, 2.6);
  const dashIn = seg(P, 3.15, 3.5);
  const copying = P > 1.25 && P < 2.05;
  const unanswered =
    questions.filter((_, i) => rawP > 0.1 + i * 0.18 + 0.1).length + leads.filter((_, i) => rawP > 1.05 + i * 0.2 + 0.1).length;
  const resolvedCount = [...questions, ...leads].filter((_, i) => rawP > 2.5 + i * 0.06).length;
  const todayCount = Math.round(18 + easeOut(seg(rawP, 0, 2)) * 110);
  const resolving = rawP > 2.5;

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
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-sm font-semibold text-fg">Shared inbox</span>
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
                key={resolving ? "resolved" : "waiting"}
                value={resolving ? Math.round((resolvedCount / 7) * 94) : unanswered}
                render={(n) => (resolving ? `${n}% auto-resolved` : `${n} waiting`)}
                reduced={reduced}
                flashColor={resolving ? "#16a34a" : "#dc2626"}
                className="rounded px-2 py-1 font-semibold transition-colors duration-300"
                style={{
                  background: resolving ? "rgb(22 163 74 / 0.14)" : "rgb(220 38 38 / 0.12)",
                  color: resolving ? "#16a34a" : "#dc2626",
                }}
              />
            </div>
          </div>

          {/* wires from the agent to every card */}
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 540 460" fill="none" aria-hidden="true">
            {[
              [270, 250, 130, 110],
              [270, 250, 130, 190],
              [270, 250, 130, 270],
              [270, 250, 130, 350],
              [270, 250, 400, 110],
              [270, 250, 400, 200],
              [270, 250, 400, 290],
            ].map(([x1, y1, x2, y2], i) => (
              <path
                key={i}
                d={`M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`}
                pathLength={1}
                stroke="var(--accent-text)"
                strokeWidth={1.5}
                strokeDasharray="1"
                strokeDashoffset={1 - clamp(wires * 1.6 - i * 0.1)}
                opacity={0.8}
              />
            ))}
          </svg>

          <div className="relative grid h-[calc(100%-49px)] grid-cols-2 gap-4 p-4">
            {/* customer questions */}
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-subtle">Customer questions</p>
              <div className="flex flex-col gap-2.5">
                {questions.map((q, i) => {
                  const done = rawP > 2.5 + i * 0.06;
                  const late = rawP > 1.2;
                  return (
                    <StoryCard
                      key={q.text}
                      shown={i < qShown}
                      delay={qDelay(i)}
                      from={`translateY(-14px) rotate(${q.tilt * 0.25}deg)`}
                      status={done ? "done" : late ? "late" : "new"}
                      borderColor={done ? "rgb(22 163 74 / 0.45)" : "var(--border)"}
                      reduced={reduced}
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex size-6 items-center justify-center rounded-full bg-surface-2 text-[10px] font-bold text-fg">{q.who}</span>
                        <p className="truncate text-[13px] text-fg">{q.text}</p>
                      </div>
                      <p className="mt-1.5 flex items-center gap-1 pl-8 font-mono text-[10px] transition-colors duration-500" style={{ color: done ? "#16a34a" : late ? "#dc2626" : "var(--subtle)" }}>
                        {done ? <Check className="size-3" /> : <Clock className="size-3" />}
                        {done ? "Answered by agent · 0.8s" : late ? "Waiting 2h+" : "New"}
                      </p>
                    </StoryCard>
                  );
                })}
              </div>
            </div>

            {/* leads + CRM */}
            <div className="relative">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-subtle">New leads</p>
              <div className="flex flex-col gap-2.5">
                {leads.map((l, i) => {
                  const late = seg(rawP, 1.3 + i * 0.1, 1.9) > 0.5;
                  const done = rawP > 2.5 + (i + 4) * 0.06;
                  return (
                    <StoryCard
                      key={l.who}
                      shown={i < lShown}
                      delay={lDelay(i)}
                      from="translateX(18px)"
                      status={done ? "done" : late ? "late" : "new"}
                      borderColor={done ? "rgb(22 163 74 / 0.45)" : late ? "rgb(220 38 38 / 0.45)" : "var(--border)"}
                      reduced={reduced}
                    >
                      <p className="text-[13px] font-semibold text-fg">{l.who}</p>
                      <p className="text-[12px] text-muted">{l.text}</p>
                      <p className="mt-1.5 flex items-center gap-1 font-mono text-[10px] transition-colors duration-500" style={{ color: done ? "#16a34a" : late ? "#dc2626" : "var(--subtle)" }}>
                        {done ? <Check className="size-3" /> : <Clock className="size-3" />}
                        {done ? "Qualified · meeting booked" : `Waiting ${late ? l.wait[1] : l.wait[0]}`}
                      </p>
                    </StoryCard>
                  );
                })}
              </div>

              {/* CRM sheet someone is copying into */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-lg border border-dashed border-border-strong bg-bg p-2.5"
                style={{ opacity: seg(P, 1.2, 1.4) * (1 - seg(P, 2.1, 2.3)), transform: `translateY(${(1 - seg(P, 1.2, 1.4)) * 20}px)` }}
              >
                <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] text-subtle">
                  <Copy className="size-3" /> CRM.xlsx · manual entry
                </p>
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className={`h-3 rounded-sm ${copying && i === Math.floor(P * 10) % 8 ? "bg-accent" : "bg-surface-2"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* the agent drops in */}
          <div
            className="absolute left-[270px] top-[250px]"
            style={{ transform: `translate(-50%, -50%) translateY(${(1 - agentIn) * -420}px) scale(${0.6 + agentIn * 0.4})`, opacity: clamp(agentIn * 2) }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-purple/30 [animation-duration:2s]" aria-hidden="true" />
            <div className="relative flex size-20 flex-col items-center justify-center rounded-full bg-purple text-white shadow-[0_20px_40px_-12px_rgb(124_58_237/0.7)]">
              <svg viewBox="0 0 40 40" className="size-8" aria-hidden="true">
                <path d="M6 9 L17 33 H23 L34 9 H27.5 L20 26 L12.5 9 Z" fill="#fff" />
                <circle cx="34" cy="31" r="3.4" fill="#ffd23f" />
              </svg>
              <span className="mt-0.5 font-mono text-[9px] tracking-wider">AGENT</span>
            </div>
          </div>
        </div>

        {/* ---------- Results dashboard (beat 4) ---------- */}
        <div className="absolute inset-0" style={{ opacity: dashIn, pointerEvents: dashIn > 0.5 ? "auto" : "none" }}>
          <div
            className="glass flex h-full flex-col rounded-xl p-5"
            style={{ transform: `translateY(${(1 - easeOut(dashIn)) * 60}px)` }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-fg">This week with VAUG agents</p>
              <span className="rounded bg-[rgb(22_163_74/0.14)] px-2 py-1 font-mono text-[11px] font-semibold text-[#16a34a]">All systems running</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { v: "42h", l: "team hours saved" },
                { v: "94%", l: "auto-resolved" },
                { v: "3x", l: "more demos booked" },
              ].map((t, i) => {
                const e = easeBack(seg(P, 3.3 + i * 0.1, 3.6 + i * 0.1));
                return (
                  <div
                    key={t.l}
                    className="rounded-lg bg-bg p-3"
                    style={{ opacity: clamp(e * 1.5), transform: `translateY(${(1 - e) * -120}px) rotate(${(1 - e) * (i - 1) * 8}deg)` }}
                  >
                    <p className="text-3xl font-semibold tracking-tight text-fg">{t.v}</p>
                    <p className="mt-1 text-[12px] text-muted">{t.l}</p>
                  </div>
                );
              })}
            </div>
            {/* chart */}
            <div className="mt-4 flex-1 rounded-lg bg-bg p-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Hours back to the team</p>
              <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="mt-2 h-[120px] w-full" fill="none" aria-hidden="true">
                <path
                  d="M0,80 C40,78 60,70 90,62 S150,40 180,34 S240,16 300,8"
                  stroke="var(--accent-text)"
                  strokeWidth={2.5}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={1 - seg(P, 3.45, 3.85)}
                />
                <path d="M0,80 C40,78 60,70 90,62 S150,40 180,34 S240,16 300,8 V90 H0 Z" fill="var(--accent-soft)" opacity={seg(P, 3.6, 3.9)} />
              </svg>
            </div>
            {/* people back on real work */}
            <div className="mt-3 flex gap-2">
              {[
                { n: "SA", t: "Strategy" },
                { n: "AV", t: "Client calls" },
                { n: "LE", t: "Product" },
              ].map((p, i) => {
                const e = easeBack(seg(P, 3.6 + i * 0.08, 3.85 + i * 0.08));
                return (
                  <div
                    key={p.t}
                    className="flex flex-1 items-center gap-2 rounded-lg bg-bg px-3 py-2"
                    style={{ opacity: clamp(e * 1.5), transform: `translateY(${(1 - e) * 50}px)` }}
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
  const active = Math.min(beats.length - 1, Math.floor(P));

  return (
    // Track = panel height + scroll distance for the four beats; no dead space above or below.
    <div ref={track} style={{ height: `calc(${beats.length * 70}vh + min(100svh - 6rem, 760px))` }} className="relative px-2 sm:px-4">
      <div ref={pin} className="sticky top-[5.5rem] h-[min(100svh-6rem,760px)]">
        <div className="relative isolate grid h-full w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-bg lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1">
          {/* decoration */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div data-parallax="0.02" className="absolute -right-24 -top-32 size-[30rem] rounded-full bg-surface-2/60" />
            {/* colour behind the glass stage */}
            <div data-parallax="-0.03" className="hero-aurora absolute right-[18%] top-[22%] size-72 rounded-full bg-purple/25 blur-3xl" />
            <div data-parallax="0.03" className="hero-aurora absolute bottom-[10%] right-[6%] size-56 rounded-full bg-yellow/35 blur-3xl [animation-delay:-5s]" />
            <div data-parallax="0.04" className="absolute bottom-[8%] left-[38%] size-24 rounded-full border border-dashed border-border-strong" />
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

            <div className="relative mt-4 min-h-[9.5rem] sm:min-h-[12rem] lg:mt-8 lg:min-h-[17rem]">
              {beats.map((beat, i) => {
                const state = i === active ? "now" : i < active ? "past" : "next";
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
              <Stage P={P} reduced={reduced} />
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
