import type { CSSProperties, ReactNode } from "react";
import { Lock } from "lucide-react";

import type { MockStudy } from "@/components/sections/ScreenMockParts";

/**
 * Building blocks for the per-study product mocks (see `MockScene` in
 * ScreenMockParts.tsx). Everything is laid out in design pixels on a fixed
 * canvas that `.mock2-stage` scales to fit: "wide" is 640 x 380, "narrow"
 * (compact cards and small panels) is 400 x 270, with its bottom ~30px
 * allowed to crop. All data is hard-coded or derived from the study, so
 * server and client renders match.
 */

export type Variant = "wide" | "narrow";
export type LayoutProps = { study: MockStudy; v: Variant };

/** Absolutely positioned slot on the design canvas. */
export function At({ x, y, z, children }: { x: number; y: number; z?: number; children: ReactNode }) {
  return (
    <div className="absolute" style={{ left: x, top: y, zIndex: z }}>
      {children}
    </div>
  );
}

/** Device motion: tilted in 3D (straightens on hover), or flat and lifting on hover. */
export function Tilt({ m = "left", children }: { m?: "left" | "right" | "lift" | "sink"; children: ReactNode }) {
  return <div className={`mock2-tilt mock2-${m}`}>{children}</div>;
}

const DEVICE_SHADOW = "shadow-[0_34px_64px_-26px_rgb(0_0_0/0.8),inset_0_0_0_1px_rgb(255_255_255/0.1)]";
export const CARD_SHADOW = "shadow-[0_24px_48px_-20px_rgb(0_0_0/0.6)]";

export function Tablet({ w, h, bg = "#f6f6f3", children }: { w: number; h: number; bg?: string; children: ReactNode }) {
  return (
    <div className={`rounded-[18px] bg-[#111] p-[7px] ${DEVICE_SHADOW}`} style={{ width: w, height: h }}>
      <div className="relative h-full overflow-hidden rounded-[12px] text-[#15151a]" style={{ background: bg }}>
        {children}
      </div>
    </div>
  );
}

/** Phone with a status bar; `dark` switches the status bar ink to white. */
export function Phone({ w, h, bg = "#f7f7f5", bar, dark = false, children }: { w: number; h: number; bg?: string; bar?: string; dark?: boolean; children: ReactNode }) {
  return (
    <div className={`rounded-[26px] bg-[#111] p-[5px] ${DEVICE_SHADOW}`} style={{ width: w, height: h }}>
      <div className={`relative flex h-full flex-col overflow-hidden rounded-[21px] ${dark ? "text-white" : "text-[#15151a]"}`} style={{ background: bg }}>
        <div className="flex h-[20px] shrink-0 items-center justify-between px-[13px] text-[8.5px] font-semibold" style={{ background: bar }}>
          <span>9:41</span>
          <span className="h-[10px] w-[38px] rounded-full bg-black" />
          <span className="opacity-60">5G</span>
        </div>
        {children}
        <div className={`mx-auto mb-[5px] mt-auto h-[3px] w-[40px] shrink-0 rounded-full ${dark ? "bg-white/40" : "bg-black/25"}`} />
      </div>
    </div>
  );
}

/** Browser window chrome with an address bar. */
export function Browser({ w, h, url, dark = false, bg, children }: { w: number; h: number; url: string; dark?: boolean; bg?: string; children: ReactNode }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[10px] ${DEVICE_SHADOW} ${dark ? "bg-[#101114] text-white ring-1 ring-white/10" : "bg-white text-[#15151a] ring-1 ring-black/10"}`}
      style={{ width: w, height: h, background: bg }}
    >
      <div className={`flex h-[24px] shrink-0 items-center gap-[5px] px-[9px] ${dark ? "border-b border-white/10 bg-[#1b1c20]" : "border-b border-black/[0.07] bg-[#efefec]"}`}>
        <span className="size-[7px] rounded-full bg-[#ff5f57]" />
        <span className="size-[7px] rounded-full bg-[#febc2e]" />
        <span className="size-[7px] rounded-full bg-[#28c840]" />
        <span className={`mx-auto flex h-[15px] min-w-0 max-w-[60%] items-center gap-[4px] rounded-[5px] px-[10px] text-[8.5px] ${dark ? "bg-white/10 text-white/60" : "bg-white text-black/55"}`}>
          <Lock className="size-[7px] shrink-0" strokeWidth={2.5} aria-hidden="true" />
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[31px]" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/** Laptop: a screen bezel plus a base. `h` is the screen height. */
export function Laptop({ w, h, bg = "#fff", children }: { w: number; h: number; bg?: string; children: ReactNode }) {
  return (
    <div style={{ width: w }}>
      <div className={`rounded-t-[14px] bg-[#111] p-[7px] pb-[9px] ${DEVICE_SHADOW}`} style={{ height: h }}>
        <div className="relative h-full overflow-hidden rounded-[5px] text-[#15151a]" style={{ background: bg }}>
          {children}
        </div>
      </div>
      <div className="relative -mx-[26px] h-[11px] rounded-b-[12px] bg-[linear-gradient(#d4d4d8,#8b8b93)] shadow-[0_18px_30px_-12px_rgb(0_0_0/0.7)]">
        <span className="absolute left-1/2 top-0 h-[4px] w-[60px] -translate-x-1/2 rounded-b-[5px] bg-black/20" />
      </div>
    </div>
  );
}

/** Floating white card. */
export function Card({ w, children, className = "", style }: { w: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`rounded-[12px] bg-white p-[10px] text-[#15151a] ring-1 ring-black/[0.06] ${CARD_SHADOW} ${className}`} style={{ width: w, ...style }}>
      {children}
    </div>
  );
}

export const TONES = {
  green: { bg: "#dcfce7", fg: "#166534", solid: "#16a34a" },
  amber: { bg: "#fef3c7", fg: "#92400e", solid: "#d97706" },
  red: { bg: "#ffe4e6", fg: "#9f1239", solid: "#e11d48" },
  blue: { bg: "#dbeafe", fg: "#1e40af", solid: "#2563eb" },
  grey: { bg: "#eeeeec", fg: "#52525b", solid: "#a1a1aa" },
  violet: { bg: "#ede9fe", fg: "#5b21b6", solid: "#7c3aed" },
} as const;
export type Tone = keyof typeof TONES;

export function Pill({ tone = "grey", children, dot = false, size = 8.5 }: { tone?: Tone; children: ReactNode; dot?: boolean; size?: number }) {
  const t = TONES[tone];
  return (
    <span className="inline-flex shrink-0 items-center gap-[3px] whitespace-nowrap rounded-full px-[6px] py-[2.5px] font-semibold leading-none" style={{ background: t.bg, color: t.fg, fontSize: size }}>
      {dot && <span className="size-[4px] rounded-full bg-current" />}
      {children}
    </span>
  );
}

export const PEOPLE = [
  { bg: "#e0e7ff", fg: "#3730a3" },
  { bg: "#fce7f3", fg: "#9d174d" },
  { bg: "#dcfce7", fg: "#166534" },
  { bg: "#fef3c7", fg: "#92400e" },
  { bg: "#e0f2fe", fg: "#075985" },
  { bg: "#ffe4e6", fg: "#9f1239" },
];

export function Avatar({ text, i = 0, size = 18, ring }: { text: string; i?: number; size?: number; ring?: string }) {
  const p = PEOPLE[i % PEOPLE.length];
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold leading-none"
      style={{ width: size, height: size, background: p.bg, color: p.fg, fontSize: size * 0.4, boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 3.5px ${ring}` : undefined }}
    >
      {text}
    </span>
  );
}

export function Bar({ pct, color, h = 4, track = "rgb(0 0 0 / 0.07)" }: { pct: number; color: string; h?: number; track?: string }) {
  return (
    <span className="block w-full overflow-hidden rounded-full" style={{ height: h, background: track }}>
      <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </span>
  );
}

/** Score ring (Lighthouse style). */
export function Ring({ value, size = 40, color, stroke = 3.5, track = "rgb(0 0 0 / 0.08)", fontSize }: { value: number; size?: number; color: string; stroke?: number; track?: string; fontSize?: number }) {
  const r = (size - stroke) / 2;
  const c = Math.round(2 * Math.PI * r * 100) / 100;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${Math.round(c * value) / 100} ${c}`} />
      </svg>
      <span className="relative font-bold leading-none" style={{ color, fontSize: fontSize ?? size * 0.32 }}>
        {value}
      </span>
    </span>
  );
}

/** Small "tool call" chip, as shown in agent transcripts. */
export function ToolChip({ children, dark = false, done = true }: { children: ReactNode; dark?: boolean; done?: boolean }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-[4px] rounded-[6px] px-[6px] py-[3px] font-mono text-[8px] leading-none ${
        dark ? "bg-white/10 text-white/75 ring-1 ring-white/15" : "bg-white/90 text-black/60 ring-1 ring-black/10"
      }`}
    >
      <span className={`size-[5px] shrink-0 rounded-full ${done ? "bg-[#22c55e]" : "mock-pulse bg-[#f59e0b]"}`} />
      <span className="truncate">{children}</span>
    </span>
  );
}

/** Coloured mark used as an app or brand logo. */
export function LogoMark({ tint, text, size = 16 }: { tint: string; text: string; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[5px] font-bold leading-none text-white" style={{ width: size, height: size, background: tint, fontSize: size * 0.45 }}>
      {text}
    </span>
  );
}
