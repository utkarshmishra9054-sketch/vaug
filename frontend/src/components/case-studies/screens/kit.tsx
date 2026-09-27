import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Bell, ChevronDown, Search, type LucideIcon } from "lucide-react";

import { Avatar, LogoMark, TONES, type Tone } from "@/components/sections/mocks/kit";

export { At, Avatar, Bar, Browser, Card, LogoMark, Phone, Pill, Ring, TONES, ToolChip, type Tone } from "@/components/sections/mocks/kit";

/**
 * Building blocks for the "Inside the product" screenshots on case study
 * pages (see `ScreenFrame`). Every screen is drawn on a fixed 640 x 400
 * design canvas that `.shot-stage` in globals.css scales to its box, so
 * px values here are design pixels and text never reflows. Data is
 * hard-coded per screen, so server and client renders match.
 */

export const SHOT_W = 640;
export const SHOT_H = 400;

export type ScreenProps = { tint: string };
export type Screen = ComponentType<ScreenProps>;

/** Scales a 640 x 400 design canvas to the width of its box. */
export function ShotCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="shot">
      <div className="shot-stage">{children}</div>
    </div>
  );
}

/** Centres content on the canvas, for phone screens and floating cards. */
export function Stage({ children }: { children: ReactNode }) {
  return <div className="relative h-full w-full">{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Desktop app shell                                                   */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; Icon: LucideIcon; badge?: string | number };

/** Left sidebar with logo, nav and a user at the foot. */
export function Sidebar({
  tint,
  brand,
  mark,
  items,
  active,
  user,
  dark = false,
  w = 128,
}: {
  tint: string;
  brand: string;
  mark: string;
  items: NavItem[];
  active: number;
  user?: { name: string; role: string; initials: string };
  dark?: boolean;
  w?: number;
}) {
  return (
    <aside className={`flex h-full shrink-0 flex-col border-r px-[8px] py-[10px] ${dark ? "border-white/10 bg-[#111318] text-white" : "border-black/[0.07] bg-[#fbfbfa]"}`} style={{ width: w }}>
      <div className="flex items-center gap-[6px] px-[4px]">
        <LogoMark tint={tint} text={mark} size={18} />
        <span className="truncate text-[11px] font-bold tracking-[-0.01em]">{brand}</span>
      </div>
      <nav className="mt-[14px] flex flex-col gap-[2px]">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <span
              key={it.label}
              className={`flex h-[24px] items-center gap-[7px] rounded-[6px] px-[6px] text-[9.5px] ${on ? "font-semibold" : dark ? "text-white/60" : "text-black/60"}`}
              style={on ? { background: dark ? "rgb(255 255 255 / 0.08)" : `color-mix(in oklab, ${tint} 11%, white)`, color: dark ? "#fff" : tint } : undefined}
            >
              <it.Icon className="size-[11px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <span className="truncate">{it.label}</span>
              {it.badge !== undefined && (
                <span
                  className="ml-auto rounded-full px-[5px] py-[1.5px] text-[7.5px] font-bold leading-none"
                  style={on ? { background: tint, color: "#fff" } : { background: dark ? "rgb(255 255 255 / 0.1)" : "rgb(0 0 0 / 0.06)" }}
                >
                  {it.badge}
                </span>
              )}
            </span>
          );
        })}
      </nav>
      {user && (
        <div className={`mt-auto flex items-center gap-[6px] rounded-[7px] p-[5px] ${dark ? "bg-white/5" : "bg-black/[0.03]"}`}>
          <Avatar text={user.initials} i={2} size={20} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[9px] font-semibold">{user.name}</span>
            <span className={`block truncate text-[7.5px] ${dark ? "text-white/50" : "text-black/45"}`}>{user.role}</span>
          </span>
        </div>
      )}
    </aside>
  );
}

/** Top bar with page title, optional search and actions. */
export function TopBar({ title, sub, search, children, dark = false }: { title: string; sub?: string; search?: string; children?: ReactNode; dark?: boolean }) {
  return (
    <header className={`flex h-[40px] shrink-0 items-center gap-[10px] border-b px-[14px] ${dark ? "border-white/10" : "border-black/[0.07] bg-white"}`}>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[12px] font-bold tracking-[-0.01em]">{title}</p>
        {sub && <p className={`truncate text-[8px] ${dark ? "text-white/50" : "text-black/45"}`}>{sub}</p>}
      </div>
      <div className="ml-auto flex items-center gap-[7px]">
        {search && (
          <span className={`flex h-[22px] w-[130px] items-center gap-[5px] overflow-hidden whitespace-nowrap rounded-[6px] px-[7px] text-[8.5px] ${dark ? "bg-white/10 text-white/50" : "bg-black/[0.045] text-black/40"}`}>
            <Search className="size-[9px]" aria-hidden="true" />
            {search}
          </span>
        )}
        {children}
        <span className={`relative flex size-[22px] items-center justify-center rounded-[6px] ${dark ? "text-white/60" : "text-black/50"}`}>
          <Bell className="size-[11px]" aria-hidden="true" />
          <span className="absolute right-[5px] top-[4px] size-[4px] rounded-full bg-[#ef4444]" />
        </span>
      </div>
    </header>
  );
}

/** Solid or outline button. */
export function Btn({ tint, children, outline = false, Icon, size = "md", style }: { tint?: string; children: ReactNode; outline?: boolean; Icon?: LucideIcon; size?: "sm" | "md"; style?: CSSProperties }) {
  const sm = size === "sm";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center gap-[4px] whitespace-nowrap rounded-[6px] font-semibold leading-none ${sm ? "h-[18px] px-[6px] text-[8px]" : "h-[22px] px-[9px] text-[9px]"} ${outline ? "bg-white text-black/70 ring-1 ring-black/12" : "text-white"}`}
      style={{ ...(outline ? {} : { background: tint ?? "#18181b" }), ...style }}
    >
      {Icon && <Icon className={sm ? "size-[8px]" : "size-[10px]"} strokeWidth={2.5} aria-hidden="true" />}
      {children}
    </span>
  );
}

/** Select-style dropdown chip. */
export function Select({ children, w }: { children: ReactNode; w?: number }) {
  return (
    <span className="inline-flex h-[22px] shrink-0 items-center justify-between gap-[6px] whitespace-nowrap rounded-[6px] bg-white px-[8px] text-[8.5px] font-medium text-black/70 ring-1 ring-black/10" style={{ width: w }}>
      {children}
      <ChevronDown className="size-[9px] text-black/40" aria-hidden="true" />
    </span>
  );
}

/** Rounded white panel with an optional header row. */
export function Panel({ title, action, children, className = "", style, pad = true }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; style?: CSSProperties; pad?: boolean }) {
  return (
    <section className={`flex min-h-0 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07] ${className}`} style={style}>
      {title && (
        <div className="flex h-[26px] shrink-0 items-center justify-between gap-[6px] border-b border-black/[0.06] px-[10px]">
          <span className="truncate text-[9.5px] font-semibold">{title}</span>
          {action && <span className="flex shrink-0 items-center gap-[5px] text-[8px] text-black/45">{action}</span>}
        </div>
      )}
      <div className={`min-h-0 flex-1 ${pad ? "p-[10px]" : ""}`}>{children}</div>
    </section>
  );
}

/** KPI tile with a delta chip. `good` colours the delta green, otherwise red. */
export function Kpi({ label, value, delta, good = true, tint, accent = false, sub }: { label: string; value: string; delta?: string; good?: boolean; tint: string; accent?: boolean; sub?: string }) {
  return (
    <div className={`flex min-w-0 flex-col justify-between rounded-[8px] px-[10px] py-[8px] ${accent ? "text-white" : "bg-white ring-1 ring-black/[0.07]"}`} style={accent ? { background: tint } : undefined}>
      <p className={`truncate text-[8.5px] font-medium ${accent ? "text-white/75" : "text-black/50"}`}>{label}</p>
      <p className="mt-[4px] truncate text-[17px] font-bold leading-none tracking-[-0.03em]">{value}</p>
      <div className="mt-[5px] flex items-center gap-[4px]">
        {delta && (
          <span
            className="rounded-full px-[4px] py-[1.5px] text-[7.5px] font-bold leading-none"
            style={accent ? { background: "rgb(255 255 255 / 0.2)", color: "#fff" } : { background: good ? TONES.green.bg : TONES.red.bg, color: good ? TONES.green.fg : TONES.red.fg }}
          >
            {delta}
          </span>
        )}
        {sub && <span className={`truncate text-[7.5px] ${accent ? "text-white/65" : "text-black/40"}`}>{sub}</span>}
      </div>
    </div>
  );
}

/** Table header row. `cols` are CSS grid track sizes, shared with `Tr`. */
export function Th({ cols, children }: { cols: string; children: ReactNode }) {
  return (
    <div className="grid h-[22px] items-center gap-[6px] whitespace-nowrap border-b border-black/[0.06] bg-black/[0.025] px-[10px] text-[7.5px] font-semibold uppercase tracking-[0.06em] text-black/40" style={{ gridTemplateColumns: cols }}>
      {children}
    </div>
  );
}

export function Tr({ cols, children, h = 30, highlight, style }: { cols: string; children: ReactNode; h?: number; highlight?: string; style?: CSSProperties }) {
  return (
    <div className="grid items-center gap-[6px] whitespace-nowrap border-b border-black/[0.05] px-[10px] text-[9px] last:border-b-0" style={{ gridTemplateColumns: cols, height: h, background: highlight, ...style }}>
      {children}
    </div>
  );
}

/** Tick box, checked or empty. */
export function Check({ on = false, tint }: { on?: boolean; tint: string }) {
  return (
    <span className="inline-flex size-[10px] shrink-0 items-center justify-center rounded-[3px]" style={on ? { background: tint } : { boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.22)" }}>
      {on && (
        <svg viewBox="0 0 10 10" className="size-[8px]" aria-hidden="true">
          <path d="M2 5.2 4.1 7.2 8 3" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/** On/off switch. */
export function Toggle({ on = false, tint }: { on?: boolean; tint: string }) {
  return (
    <span className="relative inline-block h-[12px] w-[21px] shrink-0 rounded-full" style={{ background: on ? tint : "rgb(0 0 0 / 0.15)" }}>
      <span className="absolute top-[2px] size-[8px] rounded-full bg-white shadow-sm" style={{ left: on ? 11 : 2 }} />
    </span>
  );
}

/** Segmented control. */
export function Segments({ items, active, tint }: { items: string[]; active: number; tint?: string }) {
  return (
    <span className="inline-flex shrink-0 rounded-[7px] bg-black/[0.05] p-[2px]">
      {items.map((it, i) => (
        <span
          key={it}
          className={`rounded-[5px] px-[8px] py-[4px] text-[8.5px] font-semibold leading-none ${i === active ? "bg-white shadow-sm" : "text-black/50"}`}
          style={i === active && tint ? { color: tint } : undefined}
        >
          {it}
        </span>
      ))}
    </span>
  );
}

/** Coloured tag for categories or reasons (tinted background from any hex). */
export function Tag({ color, children, size = 8 }: { color: string; children: ReactNode; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-[3px] whitespace-nowrap rounded-[4px] px-[5px] py-[2.5px] font-semibold leading-none"
      style={{ background: `color-mix(in oklab, ${color} 13%, white)`, color: `color-mix(in oklab, ${color} 80%, black)`, fontSize: size }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Charts (inline SVG, design pixels)                                  */
/* ------------------------------------------------------------------ */

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Line (and optional area) chart. All series share the y-scale min..max. */
export function LineChart({
  w,
  h,
  series,
  max,
  min = 0,
  labels,
  grid = 4,
  yFormat,
}: {
  w: number;
  h: number;
  series: { values: number[]; color: string; area?: boolean; dashed?: boolean }[];
  max: number;
  /** Bottom of the y-scale (default 0). */
  min?: number;
  labels?: string[];
  grid?: number;
  yFormat?: (n: number) => string;
}) {
  const L = yFormat ? 26 : 2;
  const B = labels ? 12 : 2;
  const pw = w - L - 2;
  const ph = h - B - 4;
  const n = series[0]?.values.length ?? 2;
  const x = (i: number) => r1(L + (i / (n - 1)) * pw);
  const y = (v: number) => r1(4 + ph - ((v - min) / (max - min)) * ph);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block overflow-visible" aria-hidden="true">
      {Array.from({ length: grid + 1 }).map((_, g) => {
        const v = min + ((max - min) / grid) * g;
        return (
          <g key={g}>
            <line x1={L} x2={w - 2} y1={y(v)} y2={y(v)} stroke="rgb(0 0 0 / 0.06)" strokeDasharray={g === 0 ? undefined : "2 3"} />
            {yFormat && (
              <text x={L - 5} y={y(v) + 2.5} textAnchor="end" fontSize="7" fill="rgb(0 0 0 / 0.4)">
                {yFormat(v)}
              </text>
            )}
          </g>
        );
      })}
      {series.map((s, si) => {
        const d = s.values.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
        return (
          <g key={si}>
            {s.area && <path d={`${d} L${x(n - 1)} ${y(min)} L${x(0)} ${y(min)} Z`} fill={s.color} opacity={0.12} />}
            <path d={d} fill="none" stroke={s.color} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? "3 3" : undefined} />
          </g>
        );
      })}
      {series[0] && <circle cx={x(n - 1)} cy={y(series[0].values[n - 1])} r={2.6} fill="#fff" stroke={series[0].color} strokeWidth={1.6} />}
      {labels?.map((l, i) => (
        <text key={i} x={L + (i / (labels.length - 1)) * pw} y={h - 2} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"} fontSize="7" fill="rgb(0 0 0 / 0.4)">
          {l}
        </text>
      ))}
    </svg>
  );
}

/** Vertical bars, optionally stacked (each bar is a list of segment values). */
export function BarChart({
  w,
  h,
  bars,
  colors,
  max,
  labels,
  gap = 0.35,
  yFormat,
  highlight,
}: {
  w: number;
  h: number;
  bars: number[][];
  colors: string[];
  max: number;
  labels?: string[];
  gap?: number;
  yFormat?: (n: number) => string;
  highlight?: number;
}) {
  const L = yFormat ? 26 : 0;
  const B = labels ? 12 : 0;
  const ph = h - B - 2;
  const slot = (w - L) / bars.length;
  const bw = slot * (1 - gap);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block overflow-visible" aria-hidden="true">
      {yFormat &&
        [0, 0.5, 1].map((g) => (
          <g key={g}>
            <line x1={L} x2={w} y1={r1(2 + ph - g * ph)} y2={r1(2 + ph - g * ph)} stroke="rgb(0 0 0 / 0.06)" strokeDasharray={g ? "2 3" : undefined} />
            <text x={L - 5} y={r1(2 + ph - g * ph) + 2.5} textAnchor="end" fontSize="7" fill="rgb(0 0 0 / 0.4)">
              {yFormat(max * g)}
            </text>
          </g>
        ))}
      {bars.map((segs, i) => {
        let acc = 0;
        const bx = r1(L + i * slot + (slot - bw) / 2);
        const dim = highlight !== undefined && highlight !== i;
        return (
          <g key={i} opacity={dim ? 0.55 : 1}>
            {segs.map((v, si) => {
              const bh = (v / max) * ph;
              const by = 2 + ph - acc - bh;
              acc += bh;
              return <rect key={si} x={bx} y={r1(by)} width={r1(bw)} height={r1(Math.max(bh, 0))} rx={si === segs.length - 1 ? Math.min(2.5, bw / 3) : 0} fill={colors[si % colors.length]} />;
            })}
            {labels && (
              <text x={r1(bx + bw / 2)} y={h - 2} textAnchor="middle" fontSize="7" fill="rgb(0 0 0 / 0.45)">
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Donut with segments (values are shares that sum to ~100). */
export function Donut({ size, stroke = 10, segments, children }: { size: number; stroke?: number; segments: { value: number; color: string }[]; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(0 0 0 / 0.06)" strokeWidth={stroke} />
        {segments.map((s, i) => {
          const len = (s.value / 100) * c;
          const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={`${r1(Math.max(len - 1.2, 0))} ${r1(c)}`} strokeDashoffset={r1(-off)} />;
          off += len;
          return el;
        })}
      </svg>
      <span className="relative flex flex-col items-center leading-none">{children}</span>
    </span>
  );
}

/** Tiny sparkline. */
export function Spark({ values, w = 60, h = 18, color }: { values: number[]; w?: number; h?: number; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const d = values.map((v, i) => `${i ? "L" : "M"}${r1((i / (values.length - 1)) * w)} ${r1(h - 1 - ((v - min) / (max - min || 1)) * (h - 2))}`).join(" ");
  return (
    <svg width={w} height={h} className="block" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/** Legend dot + label. */
export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <span className="flex items-center gap-[9px] text-[8px] text-black/55">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-[3px]">
          <span className="size-[6px] rounded-[2px]" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Phone screens                                                       */
/* ------------------------------------------------------------------ */

/** WhatsApp-style chat bubble. */
export function Bubble({ me = false, children, time, tick = true }: { me?: boolean; children: ReactNode; time: string; tick?: boolean }) {
  return (
    <div className={`max-w-[82%] rounded-[8px] px-[7px] pb-[4px] pt-[5px] text-[8.5px] leading-[1.35] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)] ${me ? "self-end rounded-tr-[2px] bg-[#d9fdd3]" : "self-start rounded-tl-[2px] bg-white"}`}>
      {children}
      <span className="mt-[2px] flex items-center justify-end gap-[2px] text-[6.5px] text-black/40">
        {time}
        {me && tick && <span className="text-[#53bdeb]">✓✓</span>}
      </span>
    </div>
  );
}

/** Soft tone helper for rows or blocks. */
export const tone = (t: Tone) => TONES[t];
