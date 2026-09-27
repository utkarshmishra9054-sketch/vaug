import Link from "next/link";
import { ArrowUpRight, Check, Lock } from "lucide-react";

import type { LifecycleStage, Standard } from "@/content/security";
import type { IconName } from "@/content/types";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/* Hero: layered shield with a scan line and orbiting checks            */
/* ------------------------------------------------------------------ */

export function ShieldVisual({ chips }: { chips: string[] }) {
  const shield = "M100 12 L170 38 V96 C170 140 140 170 100 188 C60 170 30 140 30 96 V38 Z";
  return (
    <div className="mx-auto w-full max-w-[26rem]" aria-hidden="true">
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div className="absolute inset-[14%] rounded-full bg-purple/30 blur-3xl" />
      {/* On phones the orbiting chips would hang off the screen edges, so they're listed below instead. */}
      <div className="company-spin absolute inset-0 rounded-full border border-dashed border-border-strong" style={{ "--dur": "50s" } as React.CSSProperties}>
        {chips.map((c, i) => {
          const a = (i / chips.length) * Math.PI * 2;
          return (
            <span key={c} className="absolute -translate-x-1/2 -translate-y-1/2 max-sm:hidden" style={{ left: `${(50 + 50 * Math.sin(a)).toFixed(3)}%`, top: `${(50 - 50 * Math.cos(a)).toFixed(3)}%` }}>
              <span className="company-spin glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold text-fg" style={{ "--dur": "50s", animationDirection: "reverse" } as React.CSSProperties}>
                <Check className="size-3 text-emerald-400" strokeWidth={3} />
                {c}
              </span>
            </span>
          );
        })}
      </div>
      <svg viewBox="0 0 200 200" className="absolute inset-[16%] size-[68%] overflow-visible">
        <defs>
          <linearGradient id="sec-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7c3aed" stopOpacity="0.55" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.08" />
          </linearGradient>
          <clipPath id="sec-clip">
            <path d={shield} />
          </clipPath>
        </defs>
        <path d={shield} fill="url(#sec-fill)" stroke="var(--accent-text)" strokeWidth="2" />
        <path d={shield} fill="none" stroke="var(--accent-text)" strokeWidth="1" opacity="0.4" transform="translate(100 100) scale(0.82) translate(-100 -100)" />
        <g clipPath="url(#sec-clip)">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="20" x2="180" y1={30 + i * 18} y2={30 + i * 18} stroke="var(--accent-text)" strokeOpacity="0.12" />
          ))}
          <rect className="company-scan" x="20" y="0" width="160" height="26" fill="url(#sec-scan)" />
          <defs>
            <linearGradient id="sec-scan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd23f" stopOpacity="0" />
              <stop offset="1" stopColor="#ffd23f" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        </g>
      </svg>
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-yellow text-ink shadow-[0_0_50px_rgb(255_210_63/0.5)] sm:size-20">
        <Lock className="company-shackle size-8 sm:size-9" strokeWidth={2.2} />
      </div>
    </div>
      <ul className="-mt-2 flex flex-wrap justify-center gap-2 sm:hidden">
        {chips.map((c) => (
          <li key={c} className="glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold text-fg">
            <Check className="size-3 text-emerald-400" strokeWidth={3} />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intro points                                                         */
/* ------------------------------------------------------------------ */

export function DecisionPoints({ points }: { points: { title: string; description: string }[] }) {
  return (
    <ol className="flex flex-col">
      {points.map((p, i) => (
        <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties} className="group flex gap-5 border-t border-border py-6 last:border-b">
          <span className="font-mono text-sm text-accent-text">{String(i + 1).padStart(2, "0")}</span>
          <span>
            <span className="block text-lg font-semibold text-fg transition-transform duration-300 group-hover:translate-x-1">{p.title}</span>
            <span className="mt-1 block text-muted">{p.description}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Standards                                                            */
/* ------------------------------------------------------------------ */

const statusStyle: Record<Standard["status"], string> = {
  "Built to": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "Aligned with": "bg-accent-soft text-accent-text",
  "Via providers": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  "On our roadmap": "border border-dashed border-border-strong text-muted",
};

export function StandardsGrid({ standards }: { standards: Standard[] }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {standards.map((s, i) => (
        <li key={s.name} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
          <div data-glow className="group relative flex h-full flex-col overflow-hidden p-8 lg:p-10">
            <span aria-hidden="true" className="absolute -right-4 -top-6 select-none text-[6rem] font-black leading-none tracking-[-0.06em] text-fg/[0.04] transition-transform duration-700 group-hover:-translate-x-2">
              {s.name.split(" ")[0]}
            </span>
            <span className={`inline-flex self-start rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${statusStyle[s.status]}`}>{s.status}</span>
            <h3 className="mt-6 flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-fg">
              {s.name}
              <DemoBadge show={s.placeholder} />
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-subtle">{s.short}</p>
            <p className="mt-4 leading-relaxed text-muted">{s.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Lifecycle pipeline: a pulse travels through five gates               */
/* ------------------------------------------------------------------ */

export function LifecyclePipeline({ stages }: { stages: LifecycleStage[] }) {
  return (
    <div className="border-t border-border">
      <div className="relative hidden h-16 frame-pad lg:block" aria-hidden="true">
        <div className="relative h-full">
          <span className="absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2 bg-border" />
          <span className="company-pulse2 absolute top-1/2 h-1 w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-accent-text to-yellow" />
          {stages.map((s, i) => (
            <span
              key={s.title}
              className="company-gate2 absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-text bg-bg"
              style={{ left: `${10 + (i * 80) / (stages.length - 1)}%`, animationDelay: `${(i * 3) / (stages.length - 1) - 0.1}s` }}
            />
          ))}
        </div>
      </div>
      <ol className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-5 lg:border-t-0">
        {stages.map((s, i) => (
          <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="group border-b border-border p-7 sm:border-r lg:p-8">
            <span className="font-mono text-4xl font-light text-accent-text">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {s.checks.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-fg">
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-accent-soft text-accent-text transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    <Check className="size-2.5" strokeWidth={3.5} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sector standards                                                     */
/* ------------------------------------------------------------------ */

export function SectorStandards({ items }: { items: { label: string; href: string; icon: IconName; standards: string[] }[] }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.href} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
          <Link href={s.href} data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
            <div className="flex items-start justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-md border border-border text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
                <Icon name={s.icon} className="size-5" />
              </span>
              <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-fg">{s.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.standards.map((t) => (
                <li key={t} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-fg">
                  {t}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Data residency strip                                                 */
/* ------------------------------------------------------------------ */

export function ResidencyStrip({ regions }: { regions: { region: string; note: string }[] }) {
  return (
    <div className="frame-pad flex flex-col gap-4 border-t border-border py-10 lg:flex-row lg:items-center lg:gap-10">
      <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Host your data in</p>
      <ul className="grid flex-1 gap-3 sm:grid-cols-3">
        {regions.map((r, i) => (
          <li key={r.region} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties} className="group relative overflow-hidden rounded-md border border-border bg-surface px-5 py-4">
            <span aria-hidden="true" className="company-ping-dot absolute right-4 top-4 size-2 rounded-full bg-emerald-400" />
            <span className="block text-2xl font-black tracking-[-0.04em] text-fg">{r.region}</span>
            <span className="mt-1 block font-mono text-xs text-muted">{r.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
