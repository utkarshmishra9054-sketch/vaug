"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { AuditIssue, AuditStatus, Principle } from "@/content/accessibility";

/**
 * Sample accessibility report: our own audit of vaug.in, as a client would
 * receive it. Summary, before/after, issues by principle, and a filterable
 * issue log where each issue opens to show where it was, how it was fixed and
 * how the fix was verified.
 */

const STATUSES: ("All" | AuditStatus)[] = ["All", "Resolved", "Exception", "Monitoring"];
const PRINCIPLES: ("All" | Principle)[] = ["All", "Perceivable", "Operable", "Understandable", "Robust"];
const DOT: Record<AuditStatus, string> = { Resolved: "bg-emerald-500", Exception: "bg-amber-500", Monitoring: "bg-sky-500" };
const fmt = (n: number) => n.toLocaleString("en-GB");

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-9 rounded-md border px-3 py-1.5 text-sm transition-colors ${on ? "border-border-strong bg-surface-2 text-fg" : "border-border text-muted hover:bg-surface-2 hover:text-fg"}`}
    >
      {children}
    </button>
  );
}

export function AuditReport({
  site,
  date,
  standard,
  pages,
  views,
  tools,
  issues,
}: {
  site: string;
  date: string;
  standard: string;
  pages: number;
  views: string[];
  tools: string[];
  issues: AuditIssue[];
}) {
  const [status, setStatus] = useState<"All" | AuditStatus>("All");
  const [principle, setPrinciple] = useState<"All" | Principle>("All");
  const list = useMemo(() => issues.filter((i) => (status === "All" || i.status === status) && (principle === "All" || i.principle === principle)), [issues, status, principle]);

  const count = (s: AuditStatus) => issues.filter((i) => i.status === s).length;
  const before = issues.reduce((t, i) => t + i.before, 0);
  const after = issues.reduce((t, i) => t + i.after, 0);
  const byPrinciple = PRINCIPLES.slice(1).map((p) => ({ p: p as Principle, n: issues.filter((i) => i.principle === p && i.status !== "Monitoring").length }));
  const maxP = Math.max(...byPrinciple.map((x) => x.n), 1);

  return (
    <div className="frame-pad">
      <article className="overflow-hidden rounded-xl border border-border bg-surface" aria-labelledby="audit-report-title">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-border p-6 lg:flex-row lg:items-start lg:justify-between lg:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Sample report · our own website</p>
            <h3 id="audit-report-title" className="mt-2 text-2xl font-semibold text-fg sm:text-3xl">
              Accessibility audit: {site}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {date} · {standard} · {pages} pages × {views.length} views
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Issues logged", issues.length],
              ["Resolved", count("Resolved")],
              ["Exceptions", count("Exception")],
              ["Open", issues.length - count("Resolved") - count("Exception") - count("Monitoring")],
            ].map(([label, n]) => (
              <div key={label as string} className="min-w-28 rounded-lg border border-border bg-bg px-4 py-3">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums text-fg">{n}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Before / after, by principle, how tested */}
        <div className="grid gap-px border-b border-border bg-border lg:grid-cols-3">
          <div className="bg-surface p-6 lg:p-8">
            <h4 className="text-sm font-semibold text-fg">Instances flagged</h4>
            <p className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-semibold tabular-nums text-fg">{fmt(before)}</span>
              <span className="pb-1 text-sm text-muted">before</span>
            </p>
            <p className="mt-2 flex items-end gap-3">
              <span className="text-4xl font-semibold tabular-nums text-accent-text">{fmt(after)}</span>
              <span className="pb-1 text-sm text-muted">after fixes, on re-test</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">Most instances came from two shared causes: colour tokens and a carousel component. Fixing those cleared them everywhere at once.</p>
          </div>
          <div className="bg-surface p-6 lg:p-8">
            <h4 className="text-sm font-semibold text-fg">Issues by WCAG principle</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {byPrinciple.map(({ p, n }) => (
                <li key={p}>
                  <p className="flex justify-between text-sm">
                    <span className="text-muted">{p}</span>
                    <span className="font-semibold tabular-nums text-fg">{n}</span>
                  </p>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
                    <span className="block h-full rounded-full bg-accent-text" style={{ width: `${(n / maxP) * 100}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-6 lg:p-8">
            <h4 className="text-sm font-semibold text-fg">How we tested</h4>
            <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-muted">
              {[...views.map((v) => `View: ${v}`), ...tools].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-text" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <Chip key={s} on={status === s} onClick={() => setStatus(s)}>
                {s}
              </Chip>
            ))}
          </div>
          <div role="group" aria-label="Filter by WCAG principle" className="flex flex-wrap gap-2">
            {PRINCIPLES.map((p) => (
              <Chip key={p} on={principle === p} onClick={() => setPrinciple(p)}>
                {p}
              </Chip>
            ))}
          </div>
        </div>
        <p className="px-6 pt-4 text-sm text-muted lg:px-8" role="status">
          Showing {list.length} of {issues.length} issues
        </p>

        {/* Issue log */}
        <ul className="flex flex-col px-6 pb-6 pt-2 lg:px-8 lg:pb-8">
          {list.map((i) => (
            <li key={i.id} className="border-b border-border last:border-b-0">
              <details className="group">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs text-muted">{i.id}</span>
                  <span className="min-w-0 flex-1 basis-64 font-medium text-fg">{i.title}</span>
                  <span className="text-sm text-muted">
                    {i.criterion} · {i.level}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-xs text-fg">
                    <span className={`size-2 rounded-full ${DOT[i.status]}`} aria-hidden="true" />
                    {i.status}
                  </span>
                  <ChevronDown className="size-4 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <dl className="grid gap-x-8 gap-y-3 pb-5 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <dt className="text-muted">Where</dt>
                  <dd className="text-fg">{i.where}</dd>
                  <dt className="text-muted">Found by</dt>
                  <dd className="text-fg">{i.foundBy}</dd>
                  {i.status === "Resolved" && (
                    <>
                      <dt className="text-muted">Instances</dt>
                      <dd className="tabular-nums text-fg">
                        {fmt(i.before)} before → {fmt(i.after)} after
                      </dd>
                    </>
                  )}
                  <dt className="text-muted">{i.status === "Exception" ? "Rationale" : i.status === "Monitoring" ? "Process" : "Fix"}</dt>
                  <dd className="leading-relaxed text-fg">{i.fix}</dd>
                  <dt className="text-muted">Verified</dt>
                  <dd className="text-fg">{i.verified}</dd>
                </dl>
              </details>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
