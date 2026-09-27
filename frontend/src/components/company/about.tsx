import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import type { CountStat, InfoCard, Pillar, Value } from "@/content/company";
import type { Office } from "@/content/types";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "./CountUp";

/* ------------------------------------------------------------------ */
/* Hero visual: three orbits (Automate, Build, Scale) around the core   */
/* ------------------------------------------------------------------ */

const orbits = [
  { inset: "0%", dur: "46s", label: "Scale", icon: "trending-up" as const, dots: 3, angle: -20 },
  { inset: "15%", dur: "34s", label: "Build", icon: "code" as const, dots: 2, angle: 250 },
  { inset: "30%", dur: "24s", label: "Automate", icon: "bot" as const, dots: 1, angle: 150 },
];

// Label chips sit at fixed, well-separated spots on their rings (the rings and
// their dots keep spinning) so they can never drift into each other or the core.
const pct = (n: number) => `${n.toFixed(3)}%`;

export function AboutOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full bg-purple/20 blur-3xl" />
      {orbits.map((o, i) => (
        <div
          key={o.label}
          className="company-spin absolute rounded-full border border-dashed border-border-strong"
          style={{ inset: o.inset, "--dur": o.dur, animationDirection: i % 2 ? "reverse" : "normal", animationDelay: `-${i * 9}s` } as React.CSSProperties}
        >
          {Array.from({ length: o.dots }).map((_, d) => {
            const a = ((120 + d * 70) * Math.PI) / 180;
            return <span key={d} className="absolute size-1.5 rounded-full bg-accent-text" style={{ left: pct(50 + 50 * Math.sin(a)), top: pct(50 - 50 * Math.cos(a)), transform: "translate(-50%, -50%)" }} />;
          })}
        </div>
      ))}
      <div className="absolute inset-0">
        {orbits.map((o, i) => {
          const r = 50 - parseFloat(o.inset);
          const a = (o.angle * Math.PI) / 180;
          return (
            <span key={o.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(50 + r * Math.sin(a)), top: pct(50 - r * Math.cos(a)) }}>
              <span
                className="company-float glass inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold text-fg"
                style={{ animationDelay: `${i * -2}s` }}
              >
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                  <Icon name={o.icon} className="size-3.5" />
                </span>
                {o.label}
              </span>
            </span>
          );
        })}
      </div>
      {/* core */}
      <div className="absolute inset-[40%] flex flex-col items-center justify-center rounded-full bg-purple text-white shadow-[0_0_80px_rgb(124_58_237/0.6)]">
        <span className="absolute inset-0 animate-ping rounded-full bg-purple/40 [animation-duration:3s]" />
        <span className="relative text-lg font-black tracking-[-0.06em] sm:text-2xl">VAUG</span>
        <span className="relative font-mono text-[9px] uppercase tracking-[0.2em] text-white/75 sm:text-[10px]">est. 2019</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Who / what / why                                                     */
/* ------------------------------------------------------------------ */

export function IntroCards({ items }: { items: InfoCard[] }) {
  return (
    <ul className="grid border-t border-border md:grid-cols-3">
      {items.map((c, i) => (
        <li key={c.label} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="border-b border-border md:border-r">
          <Link href={c.href} data-glow className="group relative flex h-full flex-col overflow-hidden p-8 transition-colors hover:bg-surface lg:p-10">
            <span aria-hidden="true" className="absolute -right-6 -top-10 font-mono text-[9rem] font-black leading-none text-fg/[0.04] transition-transform duration-700 group-hover:-translate-y-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="inline-flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <Icon name={c.icon} className="size-6" />
            </span>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-subtle">{c.label}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug tracking-[-0.02em] text-fg">{c.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{c.description}</p>
            <span className="mt-auto flex items-center gap-1 pt-8 text-sm font-semibold text-accent-text">
              <span className="link-underline">{c.cta}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Vision & mission                                                     */
/* ------------------------------------------------------------------ */

export function VisionMission({ vision, mission }: { vision: { label: string; text: string }; mission: { label: string; text: string } }) {
  return (
    <div className="grid gap-3 p-3 sm:gap-4 sm:p-4 md:grid-cols-2">
      <div data-reveal data-tilt className="group relative isolate overflow-hidden rounded-lg bg-purple p-8 text-white sm:p-12">
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-64 rounded-full border-[28px] border-white/10 transition-transform duration-1000 group-hover:scale-110" />
        <div aria-hidden="true" className="absolute -bottom-10 left-1/3 -z-10 size-24 rotate-12 rounded-md border-2 border-yellow/50" />
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">{vision.label}</p>
        <p className="mt-6 text-2xl font-light leading-snug sm:text-3xl">{vision.text}</p>
      </div>
      <div data-reveal data-tilt style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="group relative isolate overflow-hidden rounded-lg bg-yellow p-8 text-ink sm:p-12">
        <div aria-hidden="true" className="absolute -bottom-20 -right-10 -z-10 size-72 rounded-full bg-ink/5 transition-transform duration-1000 group-hover:-translate-y-4" />
        <svg aria-hidden="true" viewBox="0 0 100 100" className="company-spin absolute right-8 top-8 -z-10 size-16 text-ink/20" style={{ "--dur": "18s" } as React.CSSProperties}>
          <path d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z" fill="currentColor" />
        </svg>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60">{mission.label}</p>
        <p className="mt-6 text-2xl font-light leading-snug sm:text-3xl">{mission.text}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Values                                                               */
/* ------------------------------------------------------------------ */

export function ValuesList({ values }: { values: Value[] }) {
  return (
    <ol className="grid border-t border-border sm:grid-cols-2">
      {values.map((v, i) => (
        <li key={v.title} data-reveal style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
          <div data-glow className="group relative flex h-full gap-6 overflow-hidden p-8 lg:gap-10 lg:p-10">
            <span className="company-num shrink-0 text-5xl font-black leading-none tracking-[-0.05em] transition-colors duration-500 lg:text-6xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{v.description}</p>
              <p className="mt-4 flex items-start gap-2 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-accent-text">
                <span aria-hidden="true" className="mt-1.5 h-px w-5 shrink-0 bg-current transition-[width] duration-500 group-hover:w-9" />
                {v.inPractice}
              </p>
            </div>
            <span aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-[width] duration-700 group-hover:w-full" />
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Pillars                                                              */
/* ------------------------------------------------------------------ */

export function Pillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <ul className="grid border-t border-border lg:grid-cols-3">
      {pillars.map((p, i) => (
        <li key={p.word} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties} className="group relative overflow-hidden border-b border-border p-8 lg:border-r lg:p-10">
          <span aria-hidden="true" className="company-outline block text-6xl font-black leading-none tracking-[-0.06em] sm:text-7xl lg:text-[clamp(3rem,5.2vw,4.5rem)]">
            {p.word}
          </span>
          <span className="mt-8 inline-flex size-11 items-center justify-center rounded-md border border-border text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
            <Icon name={p.icon} className="size-5" />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-fg">
            <span className="sr-only">{p.word}: </span>
            {p.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
          <ul className="mt-6 flex flex-col border-t border-border">
            {p.links.map((l) => (
              <li key={l.href} className="border-b border-border">
                <Link href={l.href} className="group/link flex items-center justify-between py-3 text-sm font-medium text-fg transition-colors hover:text-accent-text">
                  {l.label}
                  <ArrowUpRight className="size-4 text-subtle transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent-text" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                                */
/* ------------------------------------------------------------------ */

export function CountStats({ stats }: { stats: CountStat[] }) {
  return (
    <dl className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="group relative overflow-hidden border-b border-r border-border p-6 sm:p-10">
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0 bg-accent-soft transition-[height] duration-700 group-hover:h-full" />
          {/* Label reserves two lines and the demo badge sits by the number, so the numbers line up across cells. */}
          <dt className="relative min-h-[2.5rem] text-sm text-muted sm:min-h-[3rem] sm:text-base">{s.label}</dt>
          <dd className="relative mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-5xl font-semibold tracking-[-0.04em] text-fg sm:text-6xl">
            <CountUp value={s.value} suffix={s.suffix} />
            <DemoBadge show={s.placeholder} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Offices map                                                          */
/* ------------------------------------------------------------------ */

// Rough continents as ellipses (lon, lat, rx, ry) for a stylised dotted map.
const land: [number, number, number, number][] = [
  [-102, 47, 30, 18], [-112, 62, 38, 10], [-85, 30, 14, 10], [-95, 18, 10, 6],
  [-60, -12, 17, 22], [-68, -38, 8, 14],
  [12, 50, 18, 10], [25, 58, 14, 8], [-3, 40, 7, 5], [-3, 54, 3, 4],
  [18, 8, 20, 22], [25, -20, 12, 14],
  [45, 26, 12, 9], [90, 50, 45, 14], [100, 30, 24, 12], [78, 20, 8, 10], [106, 12, 10, 8], [118, 0, 12, 6],
  [134, -25, 17, 10],
];
const isLand = (lon: number, lat: number) => land.some(([x, y, rx, ry]) => ((lon - x) / rx) ** 2 + ((lat - y) / ry) ** 2 <= 1);
const project = (lon: number, lat: number): [number, number] => [lon + 180, 90 - lat];

const dots: [number, number][] = [];
for (let lat = 80; lat >= -56; lat -= 4) {
  for (let lon = -170; lon <= 180; lon += 4) {
    if (isLand(lon, lat)) dots.push(project(lon, lat));
  }
}

export function OfficesMap({ pins }: { pins: { label: string; lon: number; lat: number; kind: "office" | "client"; hub?: boolean }[] }) {
  const hub = pins.find((p) => p.hub) ?? pins[0];
  const [hx, hy] = project(hub.lon, hub.lat);
  return (
    <div className="relative">
      <svg viewBox="0 20 360 120" className="draw h-auto w-full" data-reveal role="img" aria-label={`Map showing ${pins.map((p) => p.label).join(", ")}`}>
        <g className="text-subtle">
          {dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.7} fill="currentColor" opacity={0.5} stroke="none" />
          ))}
        </g>
        {pins
          .filter((p) => p !== hub)
          .map((p) => {
            const [x, y] = project(p.lon, p.lat);
            const mx = (x + hx) / 2;
            const my = Math.min(y, hy) - Math.abs(x - hx) * 0.25;
            return (
              <path
                key={p.label}
                d={`M${hx},${hy} Q${mx},${my} ${x},${y}`}
                pathLength={1}
                fill="none"
                stroke={p.kind === "office" ? "var(--accent-text)" : "#ffd23f"}
                strokeWidth={0.6}
                strokeLinecap="round"
              />
            );
          })}
        {pins.map((p, i) => {
          const [x, y] = project(p.lon, p.lat);
          const color = p.kind === "office" ? "var(--accent-text)" : "#ffd23f";
          return (
            <g key={p.label}>
              <circle cx={x} cy={y} r={3} fill={color} stroke="none" className="company-ping" style={{ animationDelay: `${i * 0.35}s` }} />
              <circle cx={x} cy={y} r={p.kind === "office" ? 1.8 : 1.3} fill={color} stroke="none" />
            </g>
          );
        })}
      </svg>
      <ul className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent-text" aria-hidden="true" /> Offices
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-yellow" aria-hidden="true" /> Client hubs
        </li>
      </ul>
    </div>
  );
}

export function OfficeCards({ offices }: { offices: Office[] }) {
  return (
    <ul className="grid border-t border-border md:grid-cols-3">
      {offices.map((o, i) => (
        <li key={o.entity} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="border-b border-border md:border-r">
          <div data-glow className="flex h-full flex-col p-8 lg:p-10">
            <div className="flex items-center justify-between">
              <span className="text-4xl" aria-hidden="true">
                {o.flag}
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-text" aria-hidden="true" />
                Open
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-fg">{o.entity}</h3>
            <p className="mt-2 leading-relaxed text-muted">{o.address}</p>
            <div className="mt-auto flex flex-col gap-2 pt-6 font-mono text-[13px] text-muted">
              <a href={`mailto:${o.email}`} className="flex items-center gap-2 transition-colors hover:text-fg">
                <Mail className="size-4" aria-hidden="true" /> {o.email}
              </a>
              {o.phone && (
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-fg">
                  <Phone className="size-4" aria-hidden="true" /> {o.phone}
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
