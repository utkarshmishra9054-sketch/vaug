import { Bot, Check, Code2, Globe, Lock, Mail, MessageCircle, Phone, ShoppingBag, Sparkles, Terminal, TrendingUp, Users, X } from "lucide-react";

import type { ServiceSlug } from "@/content/types";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/*
 * One bespoke animated visual per service, used in the service hero.
 * Pure CSS/SVG (classes prefixed `svc-` in globals.css), so it renders on the
 * server. The un-animated state is always the "finished" picture, so reduced
 * motion users see a complete, calm frame.
 */

function Frame({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`relative mx-auto w-full max-w-[30rem] rounded-lg border border-border bg-surface/80 p-4 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)] backdrop-blur sm:p-6 ${className}`}>
      {children}
      <figcaption className="mt-4 flex justify-center">
        <IllustrativeTag />
        <span className="sr-only">: {label}</span>
      </figcaption>
    </figure>
  );
}

/* ---------------------------- AI as a Service ---------------------------- */

const channels = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
  { icon: Users, label: "CRM" },
  { icon: Phone, label: "Voice" },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Globe, label: "Web chat" },
];

function AgentsVisual() {
  return (
    <Frame label="One agent, six channels">
      <div className="relative mx-auto aspect-square w-full max-w-[20rem] [container-type:inline-size]">
        {[0.92, 0.66, 0.4].map((s) => (
          <span key={s} aria-hidden="true" className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-border" style={{ width: `${s * 100}%`, height: `${s * 100}%`, transform: "translate(-50%,-50%)" }} />
        ))}
        <span aria-hidden="true" className="svc-ping absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft" />
        <div className="absolute left-1/2 top-1/2 flex size-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_0_60px_-10px_var(--accent)]">
          <Bot className="size-[40%]" aria-hidden="true" />
          <span className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-widest">Agent</span>
        </div>
        <ul className="svc-orbit absolute inset-0">
          {channels.map((c, i) => (
            <li key={c.label} className="absolute left-1/2 top-1/2 size-0" style={{ transform: `rotate(${i * 60}deg) translateX(33cqw) rotate(${-i * 60}deg)` }}>
              <span className="svc-orbit-counter -ml-[1.375rem] -mt-[1.375rem] flex size-11 flex-col items-center justify-center rounded-full border border-border bg-surface-2 text-accent-text">
                <c.icon className="size-4" aria-hidden="true" />
                <span className="sr-only">{c.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-4 grid gap-2 font-mono text-[11px] sm:text-xs">
        {["Answered 27 WhatsApp queries", "Qualified 9 leads · CRM updated", "Refund sent for approval"].map((t, i) => (
          <li key={t} className="svc-toast flex items-center gap-2 rounded-md bg-surface-2 px-3 py-2 text-muted" style={{ animationDelay: `${i * 1.2}s` }}>
            <Check className="size-3.5 shrink-0 text-accent-text" aria-hidden="true" />
            <span className="truncate">{t}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------------------------- Dedicated Developers ---------------------------- */

const devs = [
  { initials: "AK", role: "Full-stack · Next.js", status: "Shipping PR #214" },
  { initials: "MR", role: "Mobile · Flutter", status: "In your stand-up" },
  { initials: "SJ", role: "AI engineer · RAG", status: "Pairing with your lead" },
];

function DevelopersVisual() {
  const cells = Array.from({ length: 7 * 14 }, (_, i) => i);
  return (
    <Frame label="A dedicated pod in your workspace">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <p className="text-sm font-semibold text-fg">#your-team</p>
        <span className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-2 py-1 font-mono text-[11px] text-accent-text">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-text" aria-hidden="true" /> 3 online
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {devs.map((d, i) => (
          <li key={d.initials} className="svc-slide-in flex items-center gap-3 rounded-md bg-surface-2/70 px-3 py-2.5" style={{ animationDelay: `${i * 0.25}s` }}>
            <span className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-accent-fg">
              {d.initials}
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-yellow" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">{d.role}</p>
              <p className="truncate font-mono text-[11px] text-muted">{d.status}</p>
            </div>
            <span className="svc-typing flex gap-0.5" aria-hidden="true">
              <span className="size-1 rounded-full bg-muted" />
              <span className="size-1 rounded-full bg-muted" />
              <span className="size-1 rounded-full bg-muted" />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-subtle">Commits · last 14 weeks</p>
      <div className="mt-2 grid auto-cols-fr grid-flow-col grid-rows-7 gap-[3px]" aria-hidden="true">
        {cells.map((i) => {
          const level = (i * 37 + (i % 7) * 11) % 5;
          return (
            <span
              key={i}
              className="svc-cell aspect-square rounded-[2px] bg-accent"
              style={{ opacity: 0.12 + level * 0.2, animationDelay: `${(Math.floor(i / 7) * 0.12 + (i % 7) * 0.03).toFixed(2)}s` }}
            />
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------- Custom Development ---------------------------- */

function CustomVisual() {
  return (
    <Frame label="Web and mobile from one team" className="pb-4">
      <div className="relative">
        {/* browser */}
        <div className="overflow-hidden rounded-md border border-border bg-bg">
          <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="ml-3 h-4 flex-1 rounded-sm bg-surface-2 px-2 font-mono text-[9px] leading-4 text-subtle">app.yourproduct.com</span>
          </div>
          <div className="grid grid-cols-[3.5rem_1fr] gap-2 p-3 sm:grid-cols-[4.5rem_1fr]">
            <div className="svc-build flex flex-col gap-1.5 rounded-sm bg-surface-2 p-2" style={{ animationDelay: "0s" }}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-border-strong"}`} />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <div className="svc-build h-6 rounded-sm bg-accent-soft" style={{ animationDelay: "0.3s" }} />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="svc-build rounded-sm border border-border bg-surface p-2" style={{ animationDelay: `${0.6 + i * 0.2}s` }}>
                    <span className="block h-1.5 w-2/3 rounded-full bg-border-strong" />
                    <span className="mt-2 block font-mono text-xs font-bold text-fg">{["2.4k", "86%", "+18"][i]}</span>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 200 60" className="svc-build h-16 w-full rounded-sm border border-border bg-surface" style={{ animationDelay: "1.2s" }} aria-hidden="true">
                <path d="M0 50 C30 45 40 30 70 32 S120 12 150 18 S190 6 200 4" fill="none" stroke="var(--accent-text)" strokeWidth="2" className="svc-dash" />
              </svg>
            </div>
          </div>
        </div>
        {/* phone */}
        <div className="svc-float absolute -bottom-14 -right-1 w-[26%] min-w-[5.5rem] rounded-[14px] border border-border-strong bg-bg p-1.5 shadow-2xl sm:-right-4">
          <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-border-strong" />
          <div className="flex flex-col gap-1.5 rounded-[9px] bg-surface p-2">
            <span className="svc-build h-8 rounded-sm bg-accent" style={{ animationDelay: "1.5s" }} />
            {[0, 1, 2].map((i) => (
              <span key={i} className="svc-build flex items-center gap-1" style={{ animationDelay: `${1.7 + i * 0.15}s` }}>
                <span className="size-3 rounded-full bg-surface-2" />
                <span className="h-1.5 flex-1 rounded-full bg-border-strong" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex max-w-[65%] items-center gap-2 rounded-md bg-surface-2 px-3 py-2 font-mono text-[11px] text-muted">
        <Code2 className="size-3.5 shrink-0 text-accent-text" aria-hidden="true" />
        <span className="svc-type truncate">deployed ✓ 214 tests passing</span>
      </div>
    </Frame>
  );
}

/* ---------------------------- Build With Us ---------------------------- */

const ventureSteps = ["Brand", "Website", "Product", "Google profile", "SEO", "Ads", "Agents"];

function VentureVisual() {
  return (
    <Frame label="From idea to income, end to end">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">Monthly enquiries</p>
          <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-fg">
            1,204
            <span className="ml-2 inline-flex items-center gap-1 align-middle font-mono text-xs text-accent-text">
              <TrendingUp className="size-3.5" aria-hidden="true" /> growing
            </span>
          </p>
        </div>
        <Sparkles className="svc-float size-6 text-yellow" aria-hidden="true" />
      </div>
      <svg viewBox="0 0 300 120" className="mt-3 w-full overflow-visible" aria-hidden="true">
        {[30, 60, 90].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--border)" strokeDasharray="3 5" />
        ))}
        <path d="M0 112 C40 110 60 104 90 96 S140 70 170 62 S230 26 300 8 L300 120 L0 120 Z" fill="var(--accent-soft)" className="svc-fade" />
        <path d="M0 112 C40 110 60 104 90 96 S140 70 170 62 S230 26 300 8" fill="none" stroke="var(--accent-text)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} className="svc-draw-loop" />
        {[
          [90, 96],
          [170, 62],
          [300, 8],
        ].map(([x, y], i) => (
          <circle key={x} cx={x} cy={y} r="4.5" fill="var(--bg)" stroke="var(--accent-text)" strokeWidth="2" className={`svc-pin svc-pin-${i}`} />
        ))}
      </svg>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {ventureSteps.map((s, i) => (
          <li key={s} className="svc-chip inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-muted" style={{ animationDelay: `${i * 0.45}s` }}>
            <Check className="size-3 text-accent-text" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------------------------- Monthly Retainer ---------------------------- */

const milestones = ["Monitor", "Fix", "Improve", "Report"];

function RetainerVisual() {
  return (
    <Frame label="One month on a retainer">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">This month</p>
          <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-fg">1 fee</p>
        </div>
        <span className="svc-lock inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 font-mono text-xs font-bold text-accent-fg">
          <Lock className="size-4" aria-hidden="true" /> Same fee
        </span>
      </div>
      <div className="relative mt-8">
        <div className="absolute left-[12.5%] right-[12.5%] top-4 h-1 rounded-full bg-surface-2">
          <div className="svc-progress h-full rounded-full bg-accent" />
        </div>
        <ol className="relative grid grid-cols-4">
          {milestones.map((m, i) => (
            <li key={m} className="flex flex-col items-center text-center">
              <span className={`svc-stone svc-stone-${i} inline-flex size-9 items-center justify-center rounded-full border-2 border-accent bg-accent text-accent-fg`}>
                <Check className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-2 text-xs font-semibold text-fg">{m}</span>
              <span className="font-mono text-[10px] text-subtle">W{i + 1}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-6 rounded-md bg-surface-2/70 p-3">
        <p className="flex items-center justify-between font-mono text-[11px] text-muted">
          <span>Monthly cost</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-accent-text" /> Retainer</span>
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 border-t border-dashed border-muted" /> Ad-hoc fixes</span>
          </span>
        </p>
        <svg viewBox="0 0 300 70" className="mt-2 w-full" aria-hidden="true">
          <path d="M0 50 C80 48 140 30 200 18 S280 4 300 2" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M0 40 L300 40" fill="none" stroke="var(--accent-text)" strokeWidth="2.5" pathLength={1} className="svc-draw-loop" />
        </svg>
      </div>
    </Frame>
  );
}

/* ---------------------------- Launch & Rescue ---------------------------- */

const rescueLines = [
  { bad: "RLS disabled on 4 tables", good: "Row-level security enabled" },
  { bad: "Stripe webhook returns 400", good: "Payments & webhooks passing" },
  { bad: "API key exposed in client", good: "Secrets moved server-side" },
  { bad: "Build failed: 23 type errors", good: "Build passing · 0 errors" },
];

function RescueVisual() {
  return (
    <Frame label="A typical rescue, compressed">
      <div className="overflow-hidden rounded-md border border-border bg-ink font-mono text-[11px] text-paper/85 sm:text-xs">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-paper/60">
          <Terminal className="size-3.5" aria-hidden="true" /> vaug-rescue · your-lovable-app
        </div>
        <ul className="flex flex-col gap-2 p-3 sm:p-4">
          {rescueLines.map((l, i) => (
            <li key={l.good} className="relative h-5">
              <span className={`svc-bad svc-bad-${i} absolute inset-0 flex items-center gap-2 text-yellow`}>
                <X className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{l.bad}</span>
              </span>
              <span className={`svc-good svc-good-${i} absolute inset-0 flex items-center gap-2 text-purple-light`}>
                <Check className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{l.good}</span>
              </span>
            </li>
          ))}
          <li className="svc-deploy mt-1 flex items-center gap-2 border-t border-white/10 pt-3 font-bold text-paper">
            <span className="text-yellow">▲</span> Deployed to production
            <span className="ml-auto rounded-sm bg-purple px-1.5 py-0.5 text-[10px] text-white">LIVE</span>
          </li>
        </ul>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["Review", "48h"],
          ["Fix", "Days"],
          ["Fee", "Fixed"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-surface-2 px-2 py-3">
            <p className="text-lg font-semibold text-fg">{v}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">{k}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const visuals: Record<ServiceSlug, () => React.ReactElement> = {
  "ai-as-a-service": AgentsVisual,
  "dedicated-developers": DevelopersVisual,
  "custom-development": CustomVisual,
  "build-with-us": VentureVisual,
  "monthly-retainer": RetainerVisual,
  "launch-and-rescue": RescueVisual,
};

export function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  const Visual = visuals[slug];
  return <Visual />;
}
