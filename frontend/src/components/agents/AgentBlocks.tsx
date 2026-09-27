import { Bot, Check, Clock, ShieldCheck } from "lucide-react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/*
 * Server-rendered visuals for /agents. Motion is pure CSS (classes prefixed
 * `agents-` in globals.css); the resting state is always a complete picture.
 */

/** A human-approval inbox where queued agent actions get approved in turn. */
export function ApprovalQueue({ items }: { items: { action: string; reason: string; agent: string }[] }) {
  return (
    <figure className="mx-auto w-full max-w-md">
      <div className="rounded-lg border border-border bg-surface p-4 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] sm:p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-fg">
            <ShieldCheck className="size-4 text-accent-text" aria-hidden="true" /> Approvals
          </p>
          <span className="rounded-sm bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted">{items.length} waiting</span>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {items.map((it, i) => (
            <li key={it.action} className="agents-q-card relative rounded-md border border-border bg-bg p-3" style={{ "--q-delay": `${i * 3}s` } as React.CSSProperties}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-subtle">
                    <Bot className="size-3" aria-hidden="true" /> {it.agent}
                  </p>
                  <p className="mt-1 font-semibold text-fg">{it.action}</p>
                  <p className="mt-0.5 text-xs text-muted">{it.reason}</p>
                </div>
                <span className="relative inline-flex h-7 w-[5.5rem] shrink-0">
                  <span className="agents-q-pending absolute inset-0 inline-flex items-center justify-center gap-1 rounded-sm border border-border font-mono text-[10px] text-muted">
                    <Clock className="size-3" aria-hidden="true" /> Waiting
                  </span>
                  <span className="agents-q-done absolute inset-0 inline-flex items-center justify-center gap-1 rounded-sm bg-accent font-mono text-[10px] font-bold text-accent-fg">
                    <Check className="size-3" aria-hidden="true" /> Approved
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center justify-between font-mono text-[10px] text-subtle">
          <span>Approve · Edit · Reject</span>
          <span>Every decision logged</span>
        </p>
      </div>
      <figcaption className="mt-3 flex justify-center">
        <IllustrativeTag label="Illustrative approval inbox" />
      </figcaption>
    </figure>
  );
}

/**
 * Integration names on two counter-rotating rings around the agent core.
 * Narrow containers get a lighter set of short names so chips never collide.
 */
export function IntegrationOrbit({ inner, outer }: { inner: string[]; outer: string[] }) {
  const ring = (items: string[], radius: number, cls: string, chip = "px-2.5 text-[10px] sm:text-[11px]") => (
    <ul className={`${cls} absolute inset-0`}>
      {items.map((name, i) => {
        const a = (360 / items.length) * i;
        return (
          <li key={name} className="absolute left-1/2 top-1/2 size-0" style={{ transform: `rotate(${a}deg) translateX(${radius}cqw) rotate(${-a}deg)` }}>
            <span className={`${cls}-counter block size-0`}>
              <span className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-surface py-1 font-mono text-fg shadow-sm ${chip}`}>{name}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
  const short = (items: string[]) => items.filter((n) => n.length <= 10);
  const compactInner = short(inner).slice(0, 3);
  const compactOuter = short(outer.concat(inner.filter((n) => !compactInner.includes(n)))).slice(0, 6);

  return (
    <div className="@container mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <div className="relative aspect-square w-full [container-type:inline-size]">
        {[0.84, 0.48].map((s) => (
          <span key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border-strong" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
        ))}
        <span className="agents-pulse absolute left-1/2 top-1/2 size-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft" />
        <span className="absolute left-1/2 top-1/2 flex size-[20%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_0_80px_-10px_var(--accent)]">
          <Bot className="size-[35%]" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest">VAUG</span>
        </span>
        <div className="hidden @min-[30rem]:block">
          {ring(inner, 24, "agents-ring-a")}
          {ring(outer, 42, "agents-ring-b")}
        </div>
        <div className="@min-[30rem]:hidden">
          {ring(compactInner, 22, "agents-ring-a", "px-2 text-[9px]")}
          {ring(compactOuter, 45, "agents-ring-b", "px-2 text-[9px]")}
        </div>
      </div>
    </div>
  );
}
