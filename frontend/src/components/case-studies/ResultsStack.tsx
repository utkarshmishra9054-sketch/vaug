import type { CaseStudy } from "@/content/types";

/** Hero visual for the listing: floating glass cards with headline results. */
export function ResultsStack({ studies }: { studies: CaseStudy[] }) {
  // One study per industry, so the four cards show four different kinds of result.
  const picks = studies.filter((s, i) => studies.findIndex((o) => o.industry === s.industry) === i).slice(0, 4);
  // Staggered 2×2 that never overlaps: cards used to pile on each other and hide their labels.
  const spots = ["left-0 top-0 rotate-[-3deg]", "right-0 top-12 rotate-[2.5deg]", "left-0 top-[12.5rem] rotate-[2deg]", "right-0 top-[15.5rem] rotate-[-2.5deg]"];
  return (
    <div aria-hidden="true" className="relative mx-auto h-[26rem] w-full max-w-md">
      <div className="absolute inset-10 rounded-full bg-purple/30 blur-3xl" />
      {picks.map((s, i) => (
        <div
          key={s.slug}
          data-parallax={String(0.02 + i * 0.012)}
          className={`cs-float absolute w-[48%] ${spots[i]}`}
          style={{ animationDelay: `${i * -1.6}s` }}
        >
          <div className="glass rounded-lg p-4 text-fg">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: s.tint }} />
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:tracking-[0.15em]">{s.industry}</span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{s.metrics[0].value}</p>
            <p className="mt-1 line-clamp-2 min-h-[2.5em] text-xs leading-snug text-muted">{s.metrics[0].label}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
              <span className="cs-bar block h-full rounded-full" style={{ background: s.tint, animationDelay: `${i * 0.4}s` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
