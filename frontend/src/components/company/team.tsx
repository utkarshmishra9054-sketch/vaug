import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Discipline, Person } from "@/content/company";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { CountUp } from "./CountUp";
import { Monogram } from "./Monogram";

/* ------------------------------------------------------------------ */
/* Hero: monograms orbiting a central "team" core                       */
/* ------------------------------------------------------------------ */

export function TeamConstellation({ people, headcount }: { people: Person[]; headcount: { value: string; label: string } }) {
  const n = people.length;
  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
        <div className="absolute inset-[12%] rounded-full bg-purple/20 blur-3xl" />
        <div className="absolute inset-[6%] rounded-full border border-border" />
        <div className="absolute inset-[26%] rounded-full border border-dashed border-border-strong" />
        {/* connecting lines */}
        <svg viewBox="0 0 100 100" className="company-spin absolute inset-[6%] text-accent-text" style={{ "--dur": "60s" } as React.CSSProperties}>
          {people.map((_, i) => {
            const a = (i / n) * Math.PI * 2;
            const b = (((i + 2) % n) / n) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={50 + 50 * Math.sin(a)}
                y1={50 - 50 * Math.cos(a)}
                x2={50 + 50 * Math.sin(b)}
                y2={50 - 50 * Math.cos(b)}
                stroke="currentColor"
                strokeWidth="0.3"
                strokeDasharray="1 2"
                opacity="0.6"
              />
            );
          })}
        </svg>
        <div className="company-spin absolute inset-[6%]" style={{ "--dur": "60s" } as React.CSSProperties}>
          {people.map((p, i) => {
            const a = (i / n) * Math.PI * 2;
            return (
              <span key={p.initials} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + 50 * Math.sin(a)}%`, top: `${50 - 50 * Math.cos(a)}%` }}>
                <span className="company-spin block" style={{ "--dur": "60s", animationDirection: "reverse" } as React.CSSProperties}>
                  <Monogram initials={p.initials} gradient={p.gradient} ring className="size-14 text-base sm:size-16 sm:text-lg" />
                </span>
              </span>
            );
          })}
        </div>
        <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full bg-yellow text-ink shadow-[0_0_70px_rgb(255_210_63/0.45)]">
          <span className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">{headcount.value}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px]">{headcount.label}</span>
        </div>
      </div>
      <p className="mt-6 flex justify-center">
        <IllustrativeTag />
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Leadership                                                           */
/* ------------------------------------------------------------------ */

export function LeadershipGrid({ people }: { people: Person[] }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p, i) => (
        <li key={p.name} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
          <article data-glow className="group relative flex h-full flex-col overflow-hidden p-8 lg:p-10">
            <div className="relative self-start">
              <span
                aria-hidden="true"
                className="absolute -inset-2 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ backgroundImage: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
              />
              <Monogram initials={p.initials} gradient={p.gradient} className="size-24 text-3xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{p.role}</p>
            <h3 className="mt-2 flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-[-0.02em] text-fg">
              {p.name}
              <DemoBadge show={p.placeholder} />
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{p.bio}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              {p.focus.map((f) => (
                <li key={f} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-fg">
                  {f}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Disciplines                                                          */
/* ------------------------------------------------------------------ */

const dotColors = ["#7c3aed", "#b69cff", "#ffd23f", "#10b981", "#ec4899", "#22d3ee"];

export function DisciplineBoard({ disciplines }: { disciplines: Discipline[] }) {
  const total = disciplines.reduce((s, d) => s + d.count, 0);
  return (
    <>
      {/* composition bar */}
      <div className="frame-pad pb-10" data-reveal>
        <div className="flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={disciplines.map((d) => `${d.name}: ${d.count}`).join(", ")}>
          {disciplines.map((d, i) => (
            <span key={d.name} className="company-grow h-full origin-left" style={{ width: `${(d.count / total) * 100}%`, background: dotColors[i % dotColors.length], transitionDelay: `${300 + i * 120}ms` }} />
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          {disciplines.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: dotColors[i % dotColors.length] }} aria-hidden="true" />
              {d.name}
            </li>
          ))}
        </ul>
      </div>
      <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {disciplines.map((d, i) => (
          <li key={d.name} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
            <Link href={d.href} data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
              <div className="flex items-start justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-md border border-border text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon name={d.icon} className="size-5" />
                </span>
                <span className="flex items-center gap-2 text-5xl font-semibold tracking-[-0.04em] text-fg">
                  <CountUp value={d.count} />
                </span>
              </div>
              <h3 className="mt-6 flex flex-wrap items-center gap-2 text-xl font-semibold text-fg">
                {d.name}
                <DemoBadge show={d.placeholder} />
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{d.description}</p>
              {/* one dot per person */}
              <div aria-hidden="true" className="mt-6 flex flex-wrap gap-1.5">
                {Array.from({ length: d.count }).map((_, k) => (
                  <span
                    key={k}
                    className="size-3 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{ background: dotColors[i % dotColors.length], opacity: 0.35 + ((k * 7) % 10) / 15, transitionDelay: `${k * 20}ms` }}
                  />
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {d.roles.map((r) => (
                  <li key={r} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-fg">
                    {r}
                  </li>
                ))}
              </ul>
              <ArrowUpRight className="mt-auto self-end pt-4 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={36} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Quote                                                                */
/* ------------------------------------------------------------------ */

export function MissionQuote({ text, by }: { text: string; by: string }) {
  return (
    <figure className="frame-pad relative overflow-hidden py-24 text-center lg:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none font-serif text-[14rem] leading-none text-accent-text/15">
        &ldquo;
      </span>
      <blockquote data-reveal className="relative mx-auto max-w-4xl text-3xl font-light leading-snug text-fg sm:text-5xl">
        {text}
      </blockquote>
      <figcaption data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties} className="relative mt-8 font-mono text-xs uppercase tracking-[0.25em] text-accent-text">
        {by}
      </figcaption>
    </figure>
  );
}
