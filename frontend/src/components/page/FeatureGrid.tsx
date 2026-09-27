import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Feature } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

const cols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Bordered grid of titled cells. Cells with `href` become links.
 * `numbered` prints 01, 02 … when an item has no icon or meta.
 */
export function FeatureGrid({ items, columns = 3, numbered = false }: { items: Feature[]; columns?: 2 | 3 | 4; numbered?: boolean }) {
  return (
    <ul className={`grid border-t border-border ${cols[columns]}`}>
      {items.map((item, i) => {
        const body = (
          <>
            <div className="flex items-start justify-between gap-4">
              {item.icon ? (
                <span className="inline-flex size-11 items-center justify-center rounded-md border border-border text-accent-text">
                  <Icon name={item.icon} className="size-5" />
                </span>
              ) : (
                <span className="font-mono text-sm text-accent-text">{item.meta ?? (numbered ? String(i + 1).padStart(2, "0") : "")}</span>
              )}
              {item.href && <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />}
            </div>
            {item.icon && item.meta && <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-subtle">{item.meta}</p>}
            <h3 className={`${item.icon && item.meta ? "mt-2" : "mt-6"} text-xl font-semibold leading-snug tracking-[-0.02em] text-fg`}>{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
          </>
        );
        return (
          <li key={item.title} data-reveal style={{ "--reveal-delay": `${(i % columns) * 60}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
            {item.href ? (
              <Link href={item.href} data-glow className="group block h-full p-8 transition-colors hover:bg-surface lg:p-10">
                {body}
              </Link>
            ) : (
              <div data-glow className="h-full p-8 lg:p-10">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Horizontal numbered process: phase label, timing and description. */
export function Steps({ steps }: { steps: Feature[] }) {
  return (
    <ol className="grid border-t border-border sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {steps.map((step, i) => (
        <li key={step.title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties} className="relative border-b border-border p-8 sm:border-r lg:p-8">
          <span className="font-mono text-4xl font-light text-accent-text">{String(i + 1).padStart(2, "0")}</span>
          {step.meta && <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-subtle">{step.meta}</p>}
          <h3 className={`${step.meta ? "mt-2" : "mt-5"} text-lg font-semibold text-fg`}>{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Big numbers in a bordered row. */
export function MetricRow({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <dl className={`grid grid-cols-2 border-y border-border ${metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {metrics.map((m, i) => (
        <div
          key={m.label}
          data-reveal
          style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
          className="border-b border-border p-5 odd:border-r sm:p-8 lg:border-b-0 lg:border-r lg:p-10 lg:last:border-r-0"
        >
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span className="block text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">{m.value}</span>
            <span className="mt-2 block text-muted">{m.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Link tiles, e.g. "Industries we serve" or "Explore other services". */
export function LinkTiles({ items, columns = 3 }: { items: { label: string; short?: string; href: string; icon?: Feature["icon"] }[]; columns?: 2 | 3 | 4 }) {
  return <FeatureGrid columns={columns} items={items.map((i) => ({ title: i.label, description: i.short ?? "", href: i.href, icon: i.icon }))} />;
}

/** Grouped technology tags. */
export function TechGroups({ groups }: { groups: { label: string; items: string[] }[] }) {
  return (
    <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => (
        <div key={g.label} data-reveal className="border-b border-border p-8 sm:border-r lg:p-10">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{g.label}</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {g.items.map((t) => (
              <li key={t} className="rounded-sm bg-surface-2 px-3 py-1.5 text-sm text-fg">
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Two-column "left: X / right: Y" comparison, e.g. what AI does vs what humans review. */
export function Compare({ left, right }: { left: { title: string; items: string[] }; right: { title: string; items: string[] } }) {
  return (
    <div className="grid border-t border-border md:grid-cols-2">
      {[left, right].map((col, c) => (
        <div key={col.title} className="border-b border-border p-8 md:border-r lg:p-10">
          <h3 className={`text-xl font-semibold ${c === 0 ? "text-accent-text" : "text-fg"}`}>{col.title}</h3>
          <ul className="mt-6 flex flex-col gap-3">
            {col.items.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className={`mt-2 size-1.5 shrink-0 rounded-full ${c === 0 ? "bg-accent-text" : "bg-fg"}`} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
