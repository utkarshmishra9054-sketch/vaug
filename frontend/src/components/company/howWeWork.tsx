import { Check } from "lucide-react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/* ------------------------------------------------------------------ */
/* Hero: a Friday update being written, ticking itself off              */
/* ------------------------------------------------------------------ */

export function FridayUpdateMock({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div className="mx-auto w-full max-w-[27rem]">
      <div className="relative mx-auto w-full max-w-[27rem]" aria-hidden="true">
        <div className="absolute inset-[6%] rounded-full bg-purple/25 blur-3xl" />
        {/* demo card peeking behind */}
        <div className="absolute -right-2 -top-6 w-44 rotate-6 rounded-lg border border-border bg-surface-2 p-3 shadow-xl sm:-right-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Demo · Thu 16:00</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <span className="col-span-3 h-5 rounded-sm bg-purple/60" />
            <span className="h-6 rounded-sm bg-fg/10" />
            <span className="h-6 rounded-sm bg-fg/10" />
            <span className="h-6 rounded-sm bg-yellow/80" />
          </div>
        </div>
        <div data-tilt className="glass relative mt-10 rounded-xl p-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">Friday update · Week 6</p>
              <p className="mt-1 font-semibold text-fg">From your delivery lead</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-purple to-yellow text-xs font-bold text-white">DL</span>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((it, i) => (
              <li key={it.label} className="company-pop flex items-start gap-3" style={{ animationDelay: `${400 + i * 450}ms` }}>
                <span className="company-check mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" style={{ animationDelay: `${700 + i * 450}ms` }}>
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-sm leading-snug">
                  <span className="font-semibold text-fg">{it.label}: </span>
                  <span className="text-muted">{it.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="flex items-center gap-2 font-mono text-[11px] text-subtle">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-400" /> On track
            </span>
            <span className="company-pop rounded-sm bg-yellow px-2 py-1 font-mono text-[11px] font-bold text-ink" style={{ animationDelay: `${600 + items.length * 450}ms` }}>
              Sent 17:30
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 flex justify-center">
        <IllustrativeTag />
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Philosophy                                                           */
/* ------------------------------------------------------------------ */

export function Philosophy({ eyebrow, title, body, highlight }: { eyebrow: string; title: string; body: string[]; highlight: string }) {
  return (
    <div className="grid gap-10 frame-pad py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28">
      <div data-reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl lg:text-5xl">{title}</h2>
      </div>
      <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="flex flex-col gap-6 text-lg leading-relaxed text-muted sm:text-xl">
        {body.map((p) => {
          const at = p.indexOf(highlight);
          if (at === -1) return <p key={p}>{p}</p>;
          return (
            <p key={p}>
              {p.slice(0, at)}
              <span className="mark text-fg">{highlight}</span>
              {p.slice(at + highlight.length)}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quality checklist: items tick themselves off as they scroll in       */
/* ------------------------------------------------------------------ */

export function QualityChecklist({ items }: { items: string[] }) {
  return (
    <ol className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties} className="company-tick group flex items-start gap-4 border-b border-border p-7 sm:border-r lg:p-8">
          <span className="relative mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border">
            <span className="company-tick__fill absolute inset-0 rounded-md bg-accent" />
            <Check className="company-tick__mark relative size-4 text-accent-fg" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-1 block font-medium leading-snug text-fg">{item}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
