import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Feature, IconName } from "@/content/types";
import type { QualityTarget } from "@/content/engineering";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/Band";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

/** "How our engineering works": stages on a line with a light beam travelling through. */
export function EngineeringFlow({ stages }: { stages: Feature[] }) {
  return (
    <ol className="relative grid border-t border-border sm:grid-cols-2 lg:grid-cols-6">
      <span aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-[2.875rem] hidden h-px overflow-hidden bg-border-strong lg:block">
        <span className="eng-a-beam absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-accent-text to-transparent" />
      </span>
      {stages.map((s, i) => (
        <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="relative border-b border-border p-6 sm:border-r lg:p-6">
          <span className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-border-strong bg-bg text-accent-text">
            {s.icon && <Icon name={s.icon} className="size-5" />}
            <span aria-hidden="true" className="eng-a-lit absolute -inset-1 rounded-full border-2 border-accent-text" style={{ "--i": i, "--eng-d": "6s", "--eng-step": "0.55s" } as Vars} />
          </span>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-subtle">
            {String(i + 1).padStart(2, "0")} · {s.meta}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-fg">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Ring gauges that draw in on scroll, one per quality target. */
export function QualityTargets({ targets, note }: { targets: QualityTarget[]; note?: string }) {
  return (
    <div>
      <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {targets.map((t, i) => (
          <li key={t.label} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="flex flex-col items-center border-b border-border p-8 text-center sm:border-r lg:p-10">
            <div className="relative size-36">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90" fill="none" aria-hidden="true">
                <circle cx="60" cy="60" r="52" className="stroke-border" strokeWidth="6" />
                <circle cx="60" cy="60" r="52" className="stroke-border-strong" strokeWidth="1" strokeDasharray="1 5.5" />
                <circle cx="60" cy="60" r="52" pathLength={100} className="eng-gauge-arc stroke-accent-text" strokeWidth="6" strokeLinecap="round" style={{ "--eng-off": 100 - t.gauge } as Vars} />
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Target</span>
                <span className="text-3xl font-semibold tracking-[-0.03em] text-fg">{t.value}</span>
              </span>
            </div>
            <h3 className="mt-6 flex items-center gap-2 text-lg font-semibold text-fg">
              {t.label}
              <DemoBadge show={t.placeholder} />
            </h3>
            <p className="mt-1 text-sm text-muted">{t.detail}</p>
          </li>
        ))}
      </ul>
      {note && <p className="frame-pad mt-8 max-w-3xl text-sm text-subtle">{note}</p>}
    </div>
  );
}

/** Numbered approach list beside a sticky heading, with a rail that draws down. */
export function ApproachList({ title, intro, steps }: { title: string; intro: string; steps: Feature[] }) {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
      <div className="frame-pad border-border py-16 lg:border-r lg:py-24">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Our approach</p>
          <SectionTitle title={title} subtitle={intro} />
        </div>
      </div>
      <ol data-reveal className="relative border-t border-border lg:border-t-0">
        <span aria-hidden="true" className="eng-rail-line absolute bottom-10 left-[calc(1rem+1.4rem)] top-10 w-px bg-gradient-to-b from-accent-text via-border-strong to-transparent sm:left-[calc(2rem+1.4rem)] lg:left-[calc(3rem+1.4rem)]" />
        {steps.map((s, i) => (
          <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties} className="group relative flex gap-6 border-b border-border px-4 py-8 last:border-b-0 sm:px-8 lg:px-12 lg:py-10">
            <span className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg font-mono text-sm text-accent-text transition-colors duration-300 group-hover:border-accent-text group-hover:bg-accent-soft">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Big link cards for the three engagement models. */
export function EngagementCards({ items }: { items: { title: string; description: string; bestFor: string; icon: IconName; href: string; label: string }[] }) {
  return (
    <ul className="grid border-t border-border md:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.href} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="border-b border-border md:border-r">
          <Link href={item.href} data-glow data-cursor="Explore" className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
            <div className="flex items-start justify-between">
              <span className="inline-flex size-14 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={item.icon} className="size-7" />
              </span>
              <span className="rounded-sm bg-surface-2 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{item.label}</span>
            </div>
            <h3 className="mt-10 text-2xl font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
            <p className="mt-3 text-muted">{item.description}</p>
            <p className="mt-6 border-t border-border pt-4 text-sm text-subtle">
              Best for: <span className="text-fg">{item.bestFor}</span>
            </p>
            <ArrowUpRight className="mt-auto self-end pt-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={44} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Compact link tiles for the other disciplines, plus an "all" tile. */
export function DisciplineTiles({ items, all }: { items: { label: string; short: string; href: string; icon: IconName }[]; all?: { label: string; href: string } }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <li key={item.href} data-reveal style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
          <Link href={item.href} data-glow className="group flex h-full flex-col p-6 transition-colors hover:bg-surface lg:p-8">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-10 items-center justify-center rounded-md border border-border text-accent-text transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:border-accent-text">
                <Icon name={item.icon} className="size-5" />
              </span>
              <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-fg">{item.label}</h3>
            <p className="mt-1 text-sm text-muted">{item.short}</p>
          </Link>
        </li>
      ))}
      {all && (
        <li className="border-b border-border sm:border-r">
          <Link href={all.href} className="group flex h-full min-h-40 flex-col justify-between bg-accent-soft p-6 transition-colors hover:bg-surface lg:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Overview</span>
            <span className="flex items-end justify-between gap-4 text-lg font-semibold text-fg">
              {all.label}
              <ArrowUpRight className="size-7 shrink-0 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
}

/** Headline numbers with an optional DEMO badge per item. */
export function EngineeringMetrics({ metrics }: { metrics: { value: string; label: string; detail: string; placeholder?: boolean }[] }) {
  return (
    <dl className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <div key={m.label} data-reveal data-glow style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="relative overflow-hidden border-b border-border p-8 sm:border-r lg:p-10">
          <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-subtle">
            {m.label}
            <DemoBadge show={m.placeholder} />
          </dt>
          <dd className="mt-4">
            <span className="block text-5xl font-semibold tracking-[-0.04em] text-fg lg:text-6xl">{m.value}</span>
            <span className="mt-3 block text-sm text-muted">{m.detail}</span>
          </dd>
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-text/70" />
        </div>
      ))}
    </dl>
  );
}
