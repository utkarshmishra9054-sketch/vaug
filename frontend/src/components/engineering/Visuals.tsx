import { Check } from "lucide-react";

import type { EngineeringSlug } from "@/content/types";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/*
 * Bespoke animated visuals, one per engineering discipline.
 * Pure CSS/SVG (no hooks), so they work in server and client components.
 * Motion classes (eng-a-*) live in globals.css and switch off for reduced motion.
 */

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;
const v = (vars: Record<string, string | number>) => vars as Vars;

/** Window-style card that holds each visual. */
export function VisualFrame({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <figure role="img" aria-label={`${title} (illustrative example)`} className="relative overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-yellow/80" />
        </span>
        <span className="truncate font-mono text-[11px] text-subtle">{label}</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-text">
          <span className="size-1.5 rounded-full bg-accent-text animate-pulse-dot" />
          live
        </span>
      </div>
      <div aria-hidden="true" className="relative h-[20rem] overflow-hidden sm:h-[22rem]">
        {children}
      </div>
      <div aria-hidden="true" className="flex justify-end border-t border-border px-4 py-2">
        <IllustrativeTag />
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* AI: agent graph                                                     */
/* ------------------------------------------------------------------ */

const aiNodes = [
  { x: 70, y: 52, label: "Inbox" },
  { x: 330, y: 52, label: "CRM" },
  { x: 62, y: 178, label: "Docs · RAG" },
  { x: 338, y: 178, label: "Tools" },
  { x: 200, y: 250, label: "Human ✓" },
];

function AiVisual() {
  const cx = 200;
  const cy = 128;
  return (
    <div className="eng-grid-dots absolute inset-0">
      <svg viewBox="0 0 400 280" className="absolute inset-0 size-full" fill="none">
        {aiNodes.map((n, i) => (
          <g key={n.label}>
            <path d={`M${cx} ${cy} L${n.x} ${n.y}`} className="stroke-border-strong" strokeWidth="1.5" />
            <path d={i % 2 ? `M${n.x} ${n.y} L${cx} ${cy}` : `M${cx} ${cy} L${n.x} ${n.y}`} pathLength={100} className="eng-a-flow stroke-accent-text" strokeWidth="3" strokeLinecap="round" style={v({ "--i": i })} />
          </g>
        ))}
        <circle cx={cx} cy={cy} r="38" className="eng-a-pulse stroke-accent-text" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="38" className="eng-a-pulse stroke-accent-text" strokeWidth="1.5" style={v({ "--i": 1 })} />
        <circle cx={cx} cy={cy} r="38" className="fill-surface-2 stroke-accent-text" strokeWidth="2" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-fg font-mono text-[12px] font-semibold">
          Agent
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-subtle font-mono text-[9px]">
          planning…
        </text>
        {aiNodes.map((n) => (
          <g key={`node-${n.label}`}>
            <rect x={n.x - 42} y={n.y - 14} width="84" height="28" rx="6" className="fill-surface stroke-border-strong" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-fg font-mono text-[10.5px]">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 hidden flex-col gap-1.5 font-mono text-[10px] sm:flex">
        {["read 12 emails", "match 3 invoices", "draft 2 replies"].map((t, i) => (
          <span key={t} className={`ind-q ind-q-${i * 2} flex items-center gap-1.5 rounded-sm bg-bg/80 px-2 py-1 text-muted`}>
            <Check className="size-3 text-accent-text" /> {t}
          </span>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 rounded-md border border-border bg-bg/90 px-2.5 py-1.5 font-mono text-[10px] text-muted sm:bottom-4 sm:right-4">
        eval <span className="font-semibold text-accent-text">96.4%</span> · golden set
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full-stack: UI / API / DB layers with a request travelling through   */
/* ------------------------------------------------------------------ */

function FullStackVisual() {
  const layers = [
    {
      tag: "UI · React",
      body: (
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 rounded-full bg-border-strong" />
          <span className="ml-auto rounded-sm bg-yellow px-2 py-1 text-[10px] font-semibold text-ink">Place order</span>
        </div>
      ),
    },
    {
      tag: "API · Node",
      body: (
        <p className="font-mono text-[11px] text-muted">
          <span className="text-accent-text">POST</span> /orders <span className="text-fg">201</span> · 84ms
        </p>
      ),
    },
    {
      tag: "DB · Postgres",
      body: (
        <div className="grid grid-cols-3 gap-1 font-mono text-[10px] text-subtle">
          {["#2183", "paid", "£48", "#2184", "new", "£112"].map((c, i) => (
            <span key={i} className={i >= 3 ? "eng-a-lit text-fg" : ""} style={v({ "--eng-d": "4s" })}>
              {c}
            </span>
          ))}
        </div>
      ),
    },
  ];
  return (
    <div className="eng-grid-dots absolute inset-0 flex items-center justify-center p-5">
      <div className="relative w-full max-w-[20rem]">
        <div className="absolute bottom-6 left-3 top-6 w-px overflow-hidden bg-border-strong">
          <span className="eng-a-beam-y absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-accent-text to-transparent" />
        </div>
        <ul className="flex flex-col gap-4">
          {layers.map((l, i) => (
            <li key={l.tag} className="eng-a-float relative pl-8" style={v({ "--i": i, marginLeft: `${i * 12}px` })}>
              <span className="absolute left-[7px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-accent-text bg-surface" />
              <div className="relative overflow-hidden rounded-lg border border-border-strong bg-bg p-3.5">
                <span className="eng-a-lit pointer-events-none absolute inset-0 rounded-lg border-2 border-accent-text/70" style={v({ "--i": i, "--eng-d": "3.6s", "--eng-step": "0.5s" })} />
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-text">{l.tag}</p>
                {l.body}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end gap-2 font-mono text-[10px] text-subtle">
          <span className="rounded-sm border border-border px-2 py-1">types shared ✓</span>
          <span className="rounded-sm border border-border px-2 py-1">e2e ✓</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Web: browser loading into a finished page, Lighthouse rings           */
/* ------------------------------------------------------------------ */

function Ring({ value, label, i }: { value: number; label: string; i: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative size-11 sm:size-12">
        <svg viewBox="0 0 40 40" className="size-full -rotate-90" fill="none">
          <circle cx="20" cy="20" r="16" className="stroke-border" strokeWidth="3.5" />
          <circle cx="20" cy="20" r="16" pathLength={100} strokeDasharray="100" className="eng-a-ring stroke-emerald-500" strokeWidth="3.5" strokeLinecap="round" style={v({ "--eng-off": 100 - value, "--i": i })} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold text-fg">{value}</span>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-wider text-subtle">{label}</span>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4">
      <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-1.5 font-mono text-[11px] text-muted">
        <span className="text-emerald-500">●</span> https://
        <span className="eng-a-type ind-eng-type text-fg">yourbrand.com/launch</span>
        <span className="eng-a-caret -ml-1 h-3.5 w-px bg-fg" />
      </div>
      <div className="relative flex-1 overflow-hidden rounded-md border border-border bg-bg">
        {/* skeleton */}
        <div className="eng-a-unlit absolute inset-0 flex flex-col gap-2.5 p-4" style={v({ "--eng-d": "6s" })}>
          <div className="h-16 rounded bg-surface-2" />
          <div className="h-2.5 w-3/4 rounded bg-surface-2" />
          <div className="h-2.5 w-1/2 rounded bg-surface-2" />
          <div className="mt-auto grid grid-cols-3 gap-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="h-10 rounded bg-surface-2" />
            ))}
          </div>
        </div>
        {/* finished page */}
        <div className="eng-a-lit absolute inset-0 flex flex-col gap-2.5 p-4" style={v({ "--eng-d": "6s" })}>
          <div className="flex h-16 items-end rounded bg-gradient-to-br from-purple to-purple-light p-2.5">
            <span className="text-sm font-semibold text-paper">Ship faster.</span>
            <span className="ml-auto rounded-sm bg-yellow px-2 py-0.5 text-[10px] font-semibold text-ink">Start</span>
          </div>
          <div className="h-2.5 w-3/4 rounded bg-fg/70" />
          <div className="h-2.5 w-1/2 rounded bg-muted/60" />
          <div className="mt-auto grid grid-cols-3 gap-2">
            {["bg-yellow/70", "bg-accent-soft", "bg-surface-2"].map((c) => (
              <div key={c} className={`h-10 rounded ${c}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-1 sm:justify-around">
        <Ring value={98} label="Perf" i={0} />
        <Ring value={100} label="A11y" i={1} />
        <Ring value={100} label="Best" i={2} />
        <Ring value={100} label="SEO" i={3} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: two phone frames with live UI                               */
/* ------------------------------------------------------------------ */

function Phone({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative h-[17.5rem] w-[8.75rem] shrink-0 rounded-[1.6rem] border-[5px] border-ink bg-bg p-1.5 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.7)] ring-1 ring-border-strong sm:h-[19rem] sm:w-[9.5rem] ${className}`} style={style}>
      <span className="absolute left-1/2 top-1.5 z-20 h-3 w-12 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-surface">{children}</div>
    </div>
  );
}

function MobileVisual() {
  const orders = [
    { t: "Order #2184", s: "Out for delivery", c: "bg-yellow" },
    { t: "Order #2183", s: "Delivered", c: "bg-emerald-500" },
    { t: "Order #2182", s: "Packed", c: "bg-purple-light" },
    { t: "Order #2181", s: "Delivered", c: "bg-emerald-500" },
  ];
  return (
    <div className="eng-grid-dots absolute inset-0 flex items-center justify-center gap-0 pt-2">
      <Phone className="eng-a-float relative z-10 -mr-3">
        <div className="relative z-10 bg-surface px-3 pb-2 pt-5">
          <p className="text-[11px] font-semibold text-fg">My orders</p>
        </div>
        <div className="eng-a-toast absolute inset-x-1.5 top-5 z-20 rounded-lg bg-ink px-2 py-1.5 text-[9px] text-paper shadow-lg">
          <span className="font-semibold text-yellow">Driver nearby</span> · arriving in 4 min
        </div>
        <div className="relative flex-1 overflow-hidden px-2">
          <ul className="animate-marquee-y flex flex-col" style={v({ "--marquee-duration": "12s" })}>
            {[...orders, ...orders].map((o, i) => (
              <li key={i} className="mb-1.5 flex items-center gap-2 rounded-md border border-border bg-bg p-2">
                <span className={`size-2 shrink-0 rounded-full ${o.c}`} />
                <span className="min-w-0">
                  <span className="block truncate text-[9.5px] font-semibold text-fg">{o.t}</span>
                  <span className="block truncate text-[8.5px] text-muted">{o.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative grid grid-cols-4 border-t border-border bg-surface py-2">
          <span className="eng-a-tab absolute left-0 top-0 h-0.5 w-1/4 bg-accent-text" />
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="mx-auto size-2.5 rounded-sm bg-border-strong" />
          ))}
        </div>
      </Phone>
      <Phone className="eng-a-float mt-8 rotate-[5deg]" style={v({ "--i": 1 })}>
        <div className="px-3 pb-2 pt-5">
          <p className="text-[9px] uppercase tracking-wider text-subtle">This week</p>
          <p className="text-lg font-semibold tracking-tight text-fg">£12,480</p>
          <p className="text-[9px] text-emerald-500">▲ 18% vs last week</p>
        </div>
        <div className="mx-3 flex h-24 items-end gap-1 rounded-md bg-bg p-2">
          {[0.5, 0.7, 0.4, 0.85, 0.6, 1, 0.75].map((h, i) => (
            <span key={i} className={`eng-a-bar flex-1 rounded-t-sm ${i === 5 ? "bg-yellow" : "bg-accent-text/70"}`} style={v({ height: `${h * 100}%`, "--i": i })} />
          ))}
        </div>
        <div className="mt-auto p-3">
          <span className="block rounded-md bg-accent-text py-1.5 text-center text-[10px] font-semibold text-bg">Reorder</span>
        </div>
      </Phone>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Backend: API request flow                                           */
/* ------------------------------------------------------------------ */

function BackendVisual() {
  const nodes = [
    { id: "client", x: 44, y: 130, label: "Client" },
    { id: "gw", x: 140, y: 130, label: "Gateway" },
    { id: "svc", x: 240, y: 130, label: "Orders" },
    { id: "db", x: 348, y: 58, label: "Postgres" },
    { id: "cache", x: 348, y: 130, label: "Redis" },
    { id: "queue", x: 348, y: 202, label: "Queue" },
  ];
  const at = (id: string) => nodes.find((n) => n.id === id)!;
  const edges: [string, string][] = [
    ["client", "gw"],
    ["gw", "svc"],
    ["svc", "db"],
    ["svc", "cache"],
    ["svc", "queue"],
  ];
  return (
    <div className="eng-grid-dots absolute inset-0">
      <svg viewBox="0 0 400 280" className="absolute inset-0 size-full" fill="none">
        {edges.map(([a, b], i) => {
          const p = at(a);
          const q = at(b);
          const d = p.y === q.y ? `M${p.x} ${p.y} L${q.x} ${q.y}` : `M${p.x} ${p.y} C${p.x + 50} ${p.y} ${q.x - 60} ${q.y} ${q.x} ${q.y}`;
          return (
            <g key={`${a}-${b}`}>
              <path d={d} className="stroke-border-strong" strokeWidth="1.5" />
              <path d={d} pathLength={100} className="eng-a-flow stroke-accent-text" strokeWidth="3" strokeLinecap="round" style={v({ "--i": i, "--eng-d": "1.8s" })} />
            </g>
          );
        })}
        <circle cx={at("svc").x} cy={at("svc").y} r="30" className="eng-a-pulse stroke-accent-text" strokeWidth="1.5" />
        {nodes.map((n) => (
          <g key={n.id}>
            <rect x={n.x - 36} y={n.y - 15} width="72" height="30" rx="7" className={n.id === "svc" ? "fill-surface-2 stroke-accent-text" : "fill-surface stroke-border-strong"} strokeWidth="1.5" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-fg font-mono text-[10.5px]">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <ul className="absolute left-3 top-3 flex flex-col gap-1 font-mono text-[10px] sm:left-4 sm:top-4">
        {[
          ["GET", "/orders", "200", "38ms"],
          ["POST", "/orders", "201", "84ms"],
          ["GET", "/stock/42", "200", "12ms"],
        ].map(([m, p, s, t], i) => (
          <li key={p + m} className={`ind-q ind-q-${i * 2} flex gap-2 rounded-sm bg-bg/85 px-2 py-0.5 text-muted`} style={v({ "--q-d": "5s" })}>
            <span className="text-accent-text">{m}</span>
            {p}
            <span className="text-emerald-500">{s}</span>
            {t}
          </li>
        ))}
      </ul>
      <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 divide-x divide-border rounded-md border border-border bg-bg/90 font-mono text-[10px] sm:inset-x-4 sm:bottom-4">
        {[
          ["p95", "142ms"],
          ["throughput", "2.4k/s"],
          ["errors", "0.00%"],
        ].map(([k, val]) => (
          <div key={k} className="px-2 py-1.5 text-center">
            <span className="block text-subtle">{k}</span>
            <span className="block font-semibold text-fg">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DevOps: pipeline stages lighting up, deploy log, uptime bars          */
/* ------------------------------------------------------------------ */

function DevOpsVisual() {
  const stages = ["Commit", "Build", "Test", "Scan", "Deploy", "Monitor"];
  const log = ["$ git push origin main", "✓ build 42s", "✓ 318 tests passed", "✓ 0 vulnerabilities", "→ canary 10% healthy", "✓ rollout 100%"];
  const d = v({ "--q-d": "8s" });
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4">
      <ol className="grid grid-cols-3 gap-2">
        {stages.map((s, i) => (
          <li key={s} className="relative overflow-hidden rounded-md border border-border bg-bg px-2 py-2 text-center font-mono text-[10.5px] text-muted">
            <span className={`ind-qw ind-qw-${i} absolute inset-0 flex items-center justify-center gap-1 bg-accent-text font-semibold text-bg`} style={d}>
              <Check className="size-3" /> {s}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <div className="flex-1 overflow-hidden rounded-md border border-border bg-ink p-3 font-mono text-[10.5px] leading-relaxed text-paper/80">
        {log.map((l, i) => (
          <p key={l} className={`ind-q ind-q-${i} ${l.startsWith("$") ? "text-yellow" : l.startsWith("→") ? "text-purple-light" : ""}`} style={d}>
            {l}
          </p>
        ))}
      </div>
      <div>
        <div className="mb-1.5 flex justify-between font-mono text-[10px] text-subtle">
          <span>uptime · 30 days</span>
          <span className="text-fg">99.98%</span>
        </div>
        <div className="flex h-6 items-end gap-[3px]">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className={`eng-a-bar flex-1 rounded-[2px] ${i === 17 ? "bg-yellow" : "bg-emerald-500/80"}`} style={v({ height: i === 17 ? "70%" : "100%", "--i": i, "--lo": 0.75 })} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UI/UX: wireframe morphing into finished UI                           */
/* ------------------------------------------------------------------ */

function UiUxVisual() {
  const d = { "--eng-d": "7s" };
  return (
    <div className="eng-grid-dots absolute inset-0 p-4">
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-md border border-border bg-bg/90 p-1.5">
        {["bg-purple", "bg-yellow", "bg-ink", "bg-paper"].map((c) => (
          <span key={c} className={`size-4 rounded-full border border-border-strong ${c}`} />
        ))}
        <span className="px-1 font-mono text-[11px] font-semibold text-fg">Aa</span>
      </div>
      <div className="absolute inset-x-6 bottom-6 top-16 sm:inset-x-10">
        {/* wireframe */}
        <div className="eng-a-unlit absolute inset-0 flex flex-col gap-2.5 rounded-lg border-2 border-dashed border-border-strong p-3" style={v(d)}>
          <div className="relative h-20 rounded border border-dashed border-border-strong">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
              <path d="M0 0 L100 40 M100 0 L0 40" className="stroke-border-strong" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="h-2.5 w-2/3 rounded-sm border border-dashed border-border-strong" />
          <div className="h-2.5 w-1/2 rounded-sm border border-dashed border-border-strong" />
          <div className="h-6 rounded border border-dashed border-border-strong" />
          <div className="hidden h-6 rounded border border-dashed border-border-strong sm:block" />
          <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="h-12 rounded border border-dashed border-border-strong" />
            <div className="h-12 rounded border border-dashed border-border-strong" />
          </div>
        </div>
        {/* finished UI */}
        <div className="eng-a-lit absolute inset-0 flex flex-col gap-2.5 rounded-lg border border-border-strong bg-bg p-3 shadow-xl" style={v(d)}>
          <div className="flex h-20 items-center gap-3 rounded bg-gradient-to-br from-purple to-purple-light px-3">
            <span className="size-10 rounded-full bg-yellow" />
            <span>
              <span className="block text-sm font-semibold text-paper">Welcome back, Sam</span>
              <span className="block text-[10px] text-paper/70">3 bookings this week</span>
            </span>
          </div>
          <div className="h-2.5 w-2/3 rounded-sm bg-fg/70" />
          <div className="h-2.5 w-1/2 rounded-sm bg-muted/50" />
          {[
            ["Physio · Tue 10:30", "Confirmed"],
            ["Massage · Fri 18:00", "Waitlist"],
          ].map(([what, status], k) => (
            <div key={what} className={`h-6 items-center justify-between rounded border border-border px-2 text-[10px] text-fg ${k ? "hidden sm:flex" : "flex"}`}>
              {what}
              <span className={`rounded-sm px-1.5 py-px font-mono text-[9px] ${k ? "bg-surface-2 text-muted" : "bg-accent-soft text-accent-text"}`}>{status}</span>
            </div>
          ))}
          <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="flex h-12 items-center justify-center rounded bg-yellow text-[11px] font-semibold text-ink">Book again</div>
            <div className="flex h-12 items-center justify-center rounded border border-border-strong text-[11px] text-fg">View all</div>
          </div>
        </div>
      </div>
      <div className="eng-a-cursor absolute z-20" style={{ left: "62%", top: "30%" }}>
        <svg viewBox="0 0 16 16" className="size-4 drop-shadow" fill="none">
          <path d="M1 1 L14 7 L8 8.5 L6 14 Z" className="fill-yellow stroke-ink" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        <span className="ml-3 rounded-sm bg-yellow px-1.5 py-0.5 font-mono text-[9px] font-semibold text-ink">Designer</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* QA: test runner ticking through a suite                             */
/* ------------------------------------------------------------------ */

function QaVisual() {
  const tests = [
    ["auth › signs in with email", "24ms"],
    ["cart › applies promo code", "31ms"],
    ["checkout › pays with card", "118ms"],
    ["checkout › handles 3-D Secure", "204ms"],
    ["orders › shows history", "19ms"],
    ["a11y › keyboard navigation", "66ms"],
    ["perf › home under 2.5s", "1.9s"],
  ];
  const d = v({ "--q-d": "8s" });
  return (
    <div className="absolute inset-0 flex flex-col bg-ink p-4 font-mono text-[10.5px] text-paper/80">
      <p className="text-paper/50">
        <span className="text-yellow">$</span> npm test -- --watch
      </p>
      <ul className="mt-3 flex flex-1 flex-col gap-1.5">
        {tests.map(([name, t], i) => (
          <li key={name} className="flex items-center gap-2">
            <span className="relative size-3.5 shrink-0">
              <span className="eng-a-spin absolute inset-0 block rounded-full border-2 border-paper/25 border-t-yellow" />
              <span className={`ind-q ind-q-${i} absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500 text-ink`} style={d}>
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            </span>
            <span className="min-w-0 flex-1 truncate">{name}</span>
            <span className={`ind-q ind-q-${i} text-paper/40`} style={d}>
              {t}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 border-t border-paper/10 pt-3">
        <div className="flex justify-between">
          <span>
            Tests <span className="font-semibold text-emerald-400">142 passed</span> · 0 failed
          </span>
          <span className="text-paper/50">cov 92%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper/10">
          <span className="eng-a-fill block h-full rounded-full bg-emerald-500" style={v({ "--eng-d": "8s" })} />
        </div>
      </div>
    </div>
  );
}

const visuals: Record<EngineeringSlug, () => React.ReactElement> = {
  "ai-engineering": AiVisual,
  "full-stack-engineering": FullStackVisual,
  "web-engineering": WebVisual,
  "mobile-engineering": MobileVisual,
  "backend-engineering": BackendVisual,
  "devops-cloud": DevOpsVisual,
  "ui-ux-design": UiUxVisual,
  "quality-assurance": QaVisual,
};

/** The animated visual for a discipline, in its window frame. */
export function DisciplineVisual({ slug, label, title }: { slug: EngineeringSlug; label: string; title: string }) {
  const Visual = visuals[slug];
  return (
    <VisualFrame label={label} title={title}>
      <Visual />
    </VisualFrame>
  );
}
