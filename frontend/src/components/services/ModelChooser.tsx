"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";

import type { ModelProfile, QuizQuestion } from "@/content/services";
import type { IconName, ServiceSlug } from "@/content/types";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface ServiceInfo {
  slug: ServiceSlug;
  label: string;
  short: string;
  icon: IconName;
  href: string;
}

const rows: { key: "speed" | "certainty" | "control" | "involvement"; label: string; hint: string }[] = [
  { key: "speed", label: "Speed to start", hint: "How quickly work begins" },
  { key: "certainty", label: "Budget certainty", hint: "How fixed the cost is" },
  { key: "control", label: "Your control", hint: "How much you steer day to day" },
  { key: "involvement", label: "Time you give", hint: "How much of your week it needs" },
];

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${label}: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-2 w-3 rounded-[2px] transition-colors duration-500 ${n <= value ? "bg-accent-text" : "bg-surface-2"}`} />
      ))}
    </span>
  );
}

/**
 * "Which model fits you?": a four-question quiz with a scored recommendation,
 * and a side-by-side comparison table that highlights the recommended model.
 */
export function ModelChooser({
  questions,
  reasons,
  profiles,
  services,
}: {
  questions: QuizQuestion[];
  reasons: Record<ServiceSlug, string>;
  profiles: ModelProfile[];
  services: ServiceInfo[];
}) {
  const [view, setView] = useState<"quiz" | "compare">("quiz");
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step >= questions.length;

  const ranking = useMemo(() => {
    const totals = new Map<ServiceSlug, number>(services.map((s) => [s.slug, 0]));
    answers.forEach((a, q) => {
      const scores = questions[q].options[a].scores;
      for (const [slug, pts] of Object.entries(scores)) totals.set(slug as ServiceSlug, (totals.get(slug as ServiceSlug) ?? 0) + (pts ?? 0));
    });
    return [...totals.entries()].sort((a, b) => b[1] - a[1]).map(([slug]) => slug);
  }, [answers, questions, services]);

  const ordered = services.map((s) => profiles.find((p) => p.slug === s.slug)).filter((p): p is ModelProfile => Boolean(p));
  const info = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;
  const best = done ? info(ranking[0]) : null;
  const runnerUp = done ? info(ranking[1]) : null;

  return (
    <div className="border-t border-border">
      {/* view switch */}
      <div className="frame-pad flex flex-wrap items-center justify-between gap-4 border-b border-border py-5">
        <div role="group" aria-label="Choose a view" className="inline-flex rounded-md border border-border p-1">
          {(["quiz", "compare"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-[5px] px-4 py-2 text-sm font-semibold transition-colors ${view === v ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"}`}
            >
              {v === "quiz" ? "Quick quiz" : "Compare all six"}
            </button>
          ))}
        </div>
        {view === "quiz" && (
          <p className="font-mono text-xs text-subtle" aria-live="polite">
            {done ? "Your match is ready" : `Question ${step + 1} of ${questions.length}`}
          </p>
        )}
      </div>

      {view === "quiz" ? (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div className="frame-pad border-border py-10 max-lg:border-b lg:border-r lg:py-14">
            {/* progress */}
            <div className="flex gap-1.5" aria-hidden="true">
              {questions.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <span className={`block h-full bg-accent-text transition-transform duration-500 ease-out ${i < step ? "translate-x-0" : "-translate-x-full"}`} />
                </span>
              ))}
            </div>

            {!done ? (
              <div key={step} className="svc-quiz-in mt-10">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{questions[step].question}</h3>
                <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {questions[step].options.map((o, i) => (
                    <li key={o.label}>
                      <button
                        type="button"
                        onClick={() => setAnswers((a) => [...a, i])}
                        className="group flex w-full items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-4 text-left text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-[0_12px_30px_-18px_var(--accent-text)]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm bg-surface-2 font-mono text-[11px] text-muted group-hover:bg-accent group-hover:text-accent-fg">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {o.label}
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-subtle transition-colors group-hover:text-accent-text" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
                {step > 0 && (
                  <button type="button" onClick={() => setAnswers((a) => a.slice(0, -1))} className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg">
                    <ArrowLeft className="size-3.5" aria-hidden="true" /> Back
                  </button>
                )}
              </div>
            ) : (
              best && (
                <div className="svc-quiz-in mt-10" aria-live="polite">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Your best fit</p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="svc-pop-in inline-flex size-14 items-center justify-center rounded-md bg-accent text-accent-fg">
                      <Icon name={best.icon} className="size-7" />
                    </span>
                    <h3 className="text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">{best.label}</h3>
                  </div>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{reasons[best.slug]}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <ArrowLink href={best.href}>Explore {best.label}</ArrowLink>
                    <ArrowLink href="#contact" variant="outline">
                      Talk it through
                    </ArrowLink>
                  </div>
                  {runnerUp && (
                    <p className="mt-8 text-sm text-muted">
                      Also worth a look:{" "}
                      <Link href={runnerUp.href} className="link-underline font-semibold text-fg">
                        {runnerUp.label}
                      </Link>
                    </p>
                  )}
                  <button type="button" onClick={() => setAnswers([])} className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg">
                    <RotateCcw className="size-3.5" aria-hidden="true" /> Start again
                  </button>
                </div>
              )
            )}
          </div>

          {/* live leaderboard */}
          <div className="frame-pad py-10 lg:py-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">Live match</p>
            <ol className="mt-6 flex flex-col gap-2">
              {services.map((s) => {
                const rank = step === 0 ? services.indexOf(s) : ranking.indexOf(s.slug);
                const top = step > 0 && rank === 0;
                return (
                  <li
                    key={s.slug}
                    className={`flex items-center gap-3 rounded-md border px-3 py-2.5 transition-all duration-500 ${top ? "border-accent-text bg-accent-soft" : "border-border bg-surface"}`}
                    style={{ order: rank }}
                  >
                    <span className={`inline-flex size-8 items-center justify-center rounded-sm ${top ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted"}`}>
                      <Icon name={s.icon} className="size-4" />
                    </span>
                    <Link href={s.href} className="min-w-0 flex-1 truncate text-sm font-medium text-fg hover:underline">
                      {s.label}
                    </Link>
                    {top && <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text">Leading</span>}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : (
        <div className="no-scrollbar overflow-x-auto">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <caption className="sr-only">Comparison of VAUG engagement models</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 w-44 border-b border-r border-border bg-bg p-5 font-mono text-[11px] font-normal uppercase tracking-widest text-subtle">
                  Model
                </th>
                {services.map((s) => (
                  <th key={s.slug} scope="col" className={`border-b border-r border-border p-5 align-top font-normal ${best?.slug === s.slug ? "bg-accent-soft" : ""}`}>
                    <Link href={s.href} className="group flex flex-col gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-md bg-surface-2 text-accent-text transition-transform group-hover:-rotate-6">
                        <Icon name={s.icon} className="size-4" />
                      </span>
                      <span className="flex items-center gap-1 text-base font-semibold text-fg">
                        {s.label}
                        <ArrowUpRight className="size-3.5 text-subtle transition-colors group-hover:text-accent-text" aria-hidden="true" />
                      </span>
                      {best?.slug === s.slug && <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text">Your match</span>}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <th scope="row" className="sticky left-0 z-10 border-b border-r border-border bg-bg p-5 font-normal">
                    <span className="block font-semibold text-fg">{r.label}</span>
                    <span className="mt-0.5 block text-xs text-subtle">{r.hint}</span>
                  </th>
                  {ordered.map((p) => (
                    <td key={p.slug} className={`border-b border-r border-border p-5 ${best?.slug === p.slug ? "bg-accent-soft" : ""}`}>
                      <Meter value={p[r.key]} label={r.label} />
                    </td>
                  ))}
                </tr>
              ))}
              {(
                [
                  ["Starts in", "startsIn"],
                  ["Billing", "billing"],
                  ["Best for", "bestFor"],
                ] as const
              ).map(([label, key]) => (
                <tr key={key}>
                  <th scope="row" className="sticky left-0 z-10 border-b border-r border-border bg-bg p-5 font-semibold text-fg">
                    {label}
                  </th>
                  {ordered.map((p) => (
                    <td key={p.slug} className={`border-b border-r border-border p-5 text-muted ${best?.slug === p.slug ? "bg-accent-soft" : ""}`}>
                      {p[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="frame-pad py-4 font-mono text-[11px] text-subtle sm:hidden">Swipe the table sideways to see every model.</p>
        </div>
      )}
    </div>
  );
}
