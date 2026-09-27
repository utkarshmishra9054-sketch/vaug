"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import type { DayBeat } from "@/content/company";

/*
 * "A day at VAUG": a small illustrated studio. The sun travels along an arc
 * as the day plays; the window sky, the monitor and the props change with
 * each moment. Auto-plays when visible, pauses on interaction.
 */

const skies = [
  "linear-gradient(180deg,#ffd9a8,#ffb38a)", // morning
  "linear-gradient(180deg,#8ec5ff,#cfe6ff)", // late morning
  "linear-gradient(180deg,#5aa9ff,#b8dcff)", // midday
  "linear-gradient(180deg,#7fb4ff,#ffe3a3)", // afternoon
  "linear-gradient(180deg,#ff9f7a,#ffcf70)", // late afternoon
  "linear-gradient(180deg,#5b3fa8,#ff8a6b)", // evening
];

function Screen({ scene }: { scene: DayBeat["scene"] }) {
  switch (scene) {
    case "standup":
      return (
        <div className="grid h-full grid-cols-2 gap-1.5 p-2">
          {["#7c3aed", "#ffd23f", "#10b981", "#ec4899"].map((c, i) => (
            <div key={c} className="company-pop relative flex items-center justify-center rounded-sm bg-white/5" style={{ animationDelay: `${i * 120}ms` }}>
              <span className="size-6 rounded-full sm:size-8" style={{ background: c }} />
              {i === 1 && <span className="company-talk absolute bottom-1 left-1 h-1 w-3 rounded-full bg-emerald-400" />}
            </div>
          ))}
        </div>
      );
    case "build":
      return (
        <div className="flex h-full flex-col gap-1.5 p-3 font-mono">
          {[70, 45, 85, 30, 60, 50].map((w, i) => (
            <span key={i} className="company-type block h-1.5 rounded-full" style={{ width: `${w}%`, animationDelay: `${i * 180}ms`, background: i % 3 === 0 ? "#b69cff" : i % 3 === 1 ? "#ffd23f" : "rgb(255 255 255 / 0.35)", marginLeft: i % 2 ? "12%" : 0 }} />
          ))}
          <span className="company-caret mt-1 block h-2.5 w-1 bg-white" />
        </div>
      );
    case "lunch":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-white/70">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Away · back at 2</span>
          <span className="flex gap-1">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-white/60" />
            <span className="size-1.5 animate-pulse-dot rounded-full bg-white/60 [animation-delay:0.3s]" />
            <span className="size-1.5 animate-pulse-dot rounded-full bg-white/60 [animation-delay:0.6s]" />
          </span>
        </div>
      );
    case "review":
      return (
        <div className="flex h-full flex-col gap-1 p-3">
          {["-", "-", "+", "+", "+", " ", "+"].map((k, i) => (
            <span
              key={i}
              className="company-pop flex items-center gap-1.5 rounded-[2px] px-1 py-0.5"
              style={{ animationDelay: `${i * 110}ms`, background: k === "+" ? "rgb(16 185 129 / 0.2)" : k === "-" ? "rgb(239 68 68 / 0.2)" : "transparent" }}
            >
              <span className={`font-mono text-[9px] ${k === "+" ? "text-emerald-300" : "text-red-300"}`}>{k}</span>
              <span className="h-1 rounded-full bg-white/40" style={{ width: `${35 + ((i * 17) % 45)}%` }} />
            </span>
          ))}
        </div>
      );
    case "demo":
      return (
        <div className="relative flex h-full flex-col p-2">
          <div className="flex gap-1">
            <span className="size-1.5 rounded-full bg-red-400" />
            <span className="size-1.5 rounded-full bg-yellow" />
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-2 grid flex-1 grid-cols-3 gap-1.5">
            <span className="col-span-3 rounded-sm bg-purple/70" />
            <span className="rounded-sm bg-white/15" />
            <span className="rounded-sm bg-white/15" />
            <span className="company-pop rounded-sm bg-yellow" />
          </div>
          <svg viewBox="0 0 12 16" className="company-click absolute h-4 w-3 text-white" aria-hidden="true">
            <path d="M1 1 L1 13 L4 10 L6.5 15 L8.5 14 L6 9 L10 9 Z" fill="currentColor" stroke="#131116" strokeWidth="1" />
          </svg>
        </div>
      );
    case "update":
      return (
        <div className="flex h-full flex-col gap-1.5 p-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/60">Friday update</span>
          {["Shipped", "Next", "Risks"].map((l, i) => (
            <span key={l} className="company-pop flex items-center gap-1.5" style={{ animationDelay: `${i * 160}ms` }}>
              <span className="size-2 rounded-[2px] bg-emerald-400" />
              <span className="font-mono text-[9px] text-white/80">{l}</span>
              <span className="h-1 flex-1 rounded-full bg-white/25" />
            </span>
          ))}
          <span className="company-pop mt-auto self-end rounded-sm bg-yellow px-1.5 py-0.5 font-mono text-[9px] font-bold text-ink" style={{ animationDelay: "600ms" }}>
            Sent ✓
          </span>
        </div>
      );
  }
}

export function DayAtVaug({ beats }: { beats: DayBeat[] }) {
  // `step` only ever grows so the clock hands keep turning forwards when the day loops.
  const [step, setStep] = useState(0);
  const index = step % beats.length;
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !reduce), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const t = setInterval(() => setStep((s) => s + 1), 4200);
    return () => clearInterval(t);
  }, [playing, visible]);

  const beat = beats[index];
  const t = beats.length > 1 ? index / (beats.length - 1) : 0;
  // sun position on a half-ellipse arc (percentages of the sky box)
  const sunX = 8 + t * 84;
  const sunY = Number((78 - Math.sin(t * Math.PI) * 62).toFixed(3));

  const pick = (i: number) => {
    setStep((s) => s + ((i - (s % beats.length) + beats.length) % beats.length));
    setPlaying(false);
  };

  return (
    <div ref={root} className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      {/* scene */}
      <div className="border-b border-border p-4 sm:p-8 lg:border-b-0 lg:border-r" aria-hidden="true">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface-2">
          {/* back wall + window */}
          <div className="absolute inset-x-[8%] top-[8%] h-[46%] overflow-hidden rounded-md border-4 border-surface">
            <div className="absolute inset-0 transition-[background] duration-1000" style={{ background: skies[index % skies.length] }} />
            <span
              className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow shadow-[0_0_40px_12px_rgb(255_210_63/0.55)] transition-[left,top] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] sm:size-10"
              style={{ left: `${sunX}%`, top: `${sunY}%` }}
            />
            <div className="company-drift2 absolute left-[10%] top-[18%] h-3 w-14 rounded-full bg-white/70" />
            <div className="company-drift2 absolute left-[30%] top-[34%] h-2.5 w-10 rounded-full bg-white/60 [animation-delay:-9s]" />
            {/* skyline */}
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-1 px-2">
              {[40, 65, 30, 80, 50, 70, 35, 55, 45].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-ink/25" style={{ height: `${h * 0.45}%` }} />
              ))}
            </div>
            <div className="absolute inset-y-0 left-1/2 w-1 bg-surface" />
          </div>

          {/* wall clock */}
          <div className="absolute right-[4%] top-[4%] flex size-10 items-center justify-center rounded-full border-2 border-fg/20 bg-surface sm:size-12">
            <span className="absolute bottom-1/2 left-1/2 h-3 w-0.5 origin-bottom rounded-full bg-fg transition-transform duration-1000" style={{ transform: `translateX(-50%) rotate(${step * 60}deg)` }} />
            <span className="absolute bottom-1/2 left-1/2 h-4 w-px origin-bottom bg-accent-text transition-transform duration-1000" style={{ transform: `translateX(-50%) rotate(${step * 200}deg)` }} />
          </div>

          {/* plant */}
          <div className="absolute bottom-[26%] left-[4%] flex flex-col items-center">
            <div className="company-sway flex gap-0.5">
              <span className="h-6 w-2.5 -rotate-[25deg] rounded-full bg-emerald-500 sm:h-8" />
              <span className="h-8 w-2.5 rounded-full bg-emerald-400 sm:h-10" />
              <span className="h-6 w-2.5 rotate-[25deg] rounded-full bg-emerald-500 sm:h-8" />
            </div>
            <span className="h-5 w-7 rounded-b-md bg-purple sm:h-6 sm:w-8" />
          </div>

          {/* desk */}
          <div className="absolute inset-x-[4%] bottom-[20%] h-[6%] rounded-sm bg-fg/80" />
          <div className="absolute bottom-0 left-[10%] h-[20%] w-[3%] bg-fg/60" />
          <div className="absolute bottom-0 right-[10%] h-[20%] w-[3%] bg-fg/60" />

          {/* monitor */}
          <div className="absolute bottom-[26%] left-1/2 w-[46%] -translate-x-1/2">
            <div key={beat.scene} className="aspect-[16/10] overflow-hidden rounded-md border-[5px] border-ink bg-[#1d1a24]">
              <Screen scene={beat.scene} />
            </div>
            <div className="mx-auto h-3 w-3 bg-ink" />
            <div className="mx-auto h-1 w-16 rounded-full bg-ink" />
          </div>

          {/* mug with steam */}
          <div className="absolute bottom-[26%] right-[14%] flex flex-col items-center">
            <div className={`flex gap-1 transition-opacity duration-500 ${beat.scene === "lunch" || beat.scene === "standup" ? "opacity-100" : "opacity-30"}`}>
              <span className="company-steam h-3 w-0.5 rounded-full bg-fg/40" />
              <span className="company-steam h-3 w-0.5 rounded-full bg-fg/40 [animation-delay:0.6s]" />
            </div>
            <span className="h-5 w-5 rounded-b-md bg-yellow sm:h-6 sm:w-6" />
          </div>

          {/* time chip */}
          <div className="glass absolute bottom-3 left-3 rounded-md px-2.5 py-1 font-mono text-xs font-semibold text-fg">{beat.time}</div>
        </div>
      </div>

      {/* timeline */}
      <div className="flex flex-col p-4 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">09:30 → 17:30</p>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
        <ol className="mt-6 flex flex-col">
          {beats.map((b, i) => {
            const on = i === index;
            return (
              <li key={b.time} className="border-t border-border last:border-b">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={on ? "step" : undefined}
                  className="group relative flex w-full items-start gap-4 overflow-hidden py-4 text-left"
                >
                  <span className={`w-12 shrink-0 font-mono text-sm transition-colors ${on ? "text-accent-text" : "text-subtle"}`}>{b.time}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-semibold transition-colors ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}>{b.title}</span>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <span className="overflow-hidden text-sm leading-relaxed text-muted">
                        <span className="block pt-1.5">{b.description}</span>
                      </span>
                    </span>
                  </span>
                  {on && playing && visible && <span key={step} className="company-progress absolute bottom-0 left-0 h-0.5 bg-accent-text" />}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
