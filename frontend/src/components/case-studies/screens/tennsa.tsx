import { Inter, Mitr } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { ArrowUp, Bell, Boxes, Building2, Cable, CalendarClock, ChartLine, FileText, Lock, Mail, MessageSquare, Server, Sparkles, TriangleAlert } from "lucide-react";

import { BarChart, Browser, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Tennsa OS · the AI for supply chain businesses, from tennsa.com (read 23 Nov 2026): Mitr headings and
 * Inter, navy #1a2f5c / #14223d, night blue #16284f, off-white #fafaf7, dot blue #6b9be8. Product facts
 * (reads stock, accounting, payments and email continuously and read-only; back-office servers such as
 * IQ Retail, Sage 200 Evolution and SYSPRO plus cloud tools; briefings ranked by cost and traced to the
 * record; ask anything; a kept record over the years; branches as one business; 30/60/90-day cash; reports;
 * use from Claude, ChatGPT or Gemini) are from the site. TODO(content): illustrative. Companies are
 * "Demo" names, and every figure is invented; Tennsa's own sample data and prices are not used.
 */

const mitr = Mitr({ subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: inter.style.fontFamily };
const HEAD: CSSProperties = { fontFamily: mitr.style.fontFamily };
const NAVY = "#1a2f5c";
const DEEP = "#14223d";
const PAPER = "#fafaf7";
const INK = "#3d434f";
const DOT = "#6b9be8";
const LINE = "#e6e6e0";
const MUTE = "#7a808b";
const LOGO_W = { src: "/case-studies/supply-chain-business-ai-south-africa/logo-white.webp", img: { w: 938, h: 173 } };

const NAV: [string, typeof Bell][] = [
  ["Briefing", Bell],
  ["Ask", MessageSquare],
  ["Cash", ChartLine],
  ["Stock", Boxes],
  ["Branches", Building2],
  ["Reports", FileText],
  ["Connections", Cable],
];

function Os({ path, active, title, sub, right, children }: { path: string; active: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`tennsa.com/os/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK }}>
        <aside className="flex w-[112px] shrink-0 flex-col px-[8px] py-[11px] text-white" style={{ background: DEEP }}>
          <Photo {...LOGO_W} w={64} h={12} />
          <p className="mt-[5px] text-[6.6px] text-white/50">Demo Distributors (Pty) Ltd</p>
          <nav className="mt-[10px] space-y-[1px] text-[8.2px]">
            {NAV.map(([t, Icon]) => (
              <p key={t} className="flex h-[21px] items-center gap-[6px] rounded-[5px] px-[6px]" style={t === active ? { background: "rgb(255 255 255 / 0.12)", color: "#fff" } : { color: "rgb(255 255 255 / 0.66)" }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t}
              </p>
            ))}
          </nav>
          <p className="mt-auto flex items-center gap-[4px] rounded-[5px] px-[6px] py-[4px] text-[6.6px] text-white/70" style={{ background: "rgb(255 255 255 / 0.06)" }}>
            <Lock className="size-[7px]" aria-hidden="true" /> Read-only · 7 systems
          </p>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col" style={{ background: PAPER }}>
          <div className="flex h-[42px] shrink-0 items-center px-[12px]">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px]" style={{ ...HEAD, color: NAVY }}>{title}</p>
              <p className="truncate text-[7.4px]" style={{ color: MUTE }}>{sub}</p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-[5px]">{right}</div>
          </div>
          <div className="min-h-0 flex-1 px-[10px] pb-[10px]">{children}</div>
        </main>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Bell }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] whitespace-nowrap rounded-[6px] px-[9px] text-[7.8px] font-semibold" style={solid ? { background: NAVY, color: "#fff" } : { background: "#fff", color: NAVY, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[9px] bg-white ${className}`} style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[23px] shrink-0 items-center justify-between border-b px-[9px] text-[8.2px] font-semibold" style={{ borderColor: LINE, color: NAVY }}>
        {title}
        {right && <span className="text-[7px] font-normal" style={{ color: MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);
const Source = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-[3px] rounded-full px-[6px] py-[1.5px] text-[6.6px] font-medium" style={{ background: "#eef3fc", color: NAVY }}>
    <span className="size-[4px] rounded-full" style={{ background: DOT }} />
    {children}
  </span>
);
const Sample = () => <span className="rounded-full px-[6px] py-[1.5px] text-[6.6px] font-semibold" style={{ background: "#f1efe6", color: MUTE }}>Sample data</span>;

/* 01 · Briefing ------------------------------------------------------- */

const ITEMS: { tone: "red" | "amber" | "blue"; kind: string; title: string; body: string; next: string; from: string[] }[] = [
  {
    tone: "red",
    kind: "Stock",
    title: "5L primer runs out in 4 days, against an order due Friday",
    body: "On hand 38 tins across 3 branches. Order SO-5521 from Demo Hardware needs 60 by Friday. Last delivery from the supplier took 9 days.",
    next: "Move 22 tins from Durban, or place a purchase order today.",
    from: ["IQ Retail", "Sage 200 Evolution"],
  },
  {
    tone: "amber",
    kind: "Supplier",
    title: "Demo Steel Supplies has moved you from 60 to 30 days",
    body: "Their last two invoices carry 30-day terms; an email on 14 Nov mentions a new credit policy. R212,400 now falls due a month earlier.",
    next: "Confirm the change, and move the payment in the cash plan.",
    from: ["Xero", "Gmail"],
  },
  {
    tone: "blue",
    kind: "Customer",
    title: "Demo Builders is 64 days overdue and still being invoiced",
    body: "R96,300 outstanding across 4 invoices. Two more invoices went out this week.",
    next: "Hold new orders on account until the oldest invoice is paid.",
    from: ["Sage 200 Evolution"],
  },
];

const Briefing: Screen = () => (
  <Os path="briefing" active="Briefing" title="Your briefing, Monday 23 November" sub="What changed, what is at risk, what to act on first · ranked by what it costs you" right={<><Sample /><Btn Icon={Mail}>Also by email</Btn></>}>
    <div className="flex h-full flex-col gap-[7px]">
      {ITEMS.map((it, i) => (
        <section key={it.title} className="rounded-[9px] bg-white p-[8px]" style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
          <div className="flex items-center gap-[5px]">
            <span className="flex size-[15px] items-center justify-center rounded-full text-[7px] font-bold text-white" style={{ background: i === 0 ? "#b42318" : i === 1 ? "#b45309" : NAVY }}>{i + 1}</span>
            <Pill tone={it.tone} size={6.4}>{it.kind}</Pill>
            <p className="truncate text-[8.8px] font-semibold" style={{ color: NAVY }}>{it.title}</p>
          </div>
          <p className="mt-[4px] pl-[20px] text-[7.4px] leading-[1.4]">{it.body}</p>
          <div className="mt-[4px] flex items-center gap-[5px] pl-[20px]">
            <p className="flex-1 text-[7.2px]"><b style={{ color: NAVY }}>Next:</b> {it.next}</p>
            {it.from.map((f) => <Source key={f}>{f}</Source>)}
            <span className="text-[7px] font-semibold" style={{ color: NAVY }}>Investigate →</span>
          </div>
        </section>
      ))}
    </div>
  </Os>
);

/* 02 · Ask anything --------------------------------------------------- */

const Ask: Screen = () => (
  <Os path="ask" active="Ask" title="Ask anything" sub="Answers come from your own records, with the invoices behind every figure" right={<Sample />}>
    <div className="flex h-full flex-col">
      <div className="ml-auto max-w-[300px] rounded-[10px] rounded-tr-[3px] px-[9px] py-[6px] text-[8px] text-white" style={{ background: NAVY }}>
        Which customers paid late three months running, and how much do they owe now?
      </div>
      <div className="mt-[8px] rounded-[10px] rounded-tl-[3px] bg-white p-[9px]" style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
        <p className="text-[8px]">
          <Sparkles className="mr-[4px] inline size-[9px] align-[-1px]" style={{ color: DOT }} aria-hidden="true" />
          Three customers paid every invoice late in August, September and October. Together they owe <b>R268,900</b>.
        </p>
        <div className="mt-[6px] grid h-[16px] grid-cols-[1fr_60px_60px_70px] items-center text-[6.6px] font-semibold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
          <span>Customer</span>
          <span className="text-right">Avg days late</span>
          <span className="text-right">Owes now</span>
          <span className="text-right">Trend</span>
        </div>
        {[
          ["Demo Builders", "41", "R96,300", "Getting later", "red"],
          ["Demo Farm Supplies", "23", "R118,200", "Steady", "amber"],
          ["Demo Retail Group", "17", "R54,400", "Improving", "green"],
        ].map(([c, d, o, t, tone]) => (
          <div key={c} className="grid h-[22px] grid-cols-[1fr_60px_60px_70px] items-center border-t text-[7.6px]" style={{ borderColor: LINE }}>
            <b style={{ color: NAVY }}>{c}</b>
            <span className="text-right tabular-nums">{d}</span>
            <span className="text-right tabular-nums">{o}</span>
            <span className="text-right"><Pill tone={tone as "red" | "amber" | "green"} size={6.2}>{t}</Pill></span>
          </div>
        ))}
        <div className="mt-[6px] flex flex-wrap items-center gap-[4px]">
          <span className="text-[6.8px]" style={{ color: MUTE }}>Computed from</span>
          <Source>Sage 200 Evolution · 61 invoices</Source>
          <Source>Bank feed · 47 payments</Source>
          <span className="ml-auto text-[7px] font-semibold" style={{ color: NAVY }}>Show the invoices →</span>
        </div>
      </div>
      <div className="mt-[7px] flex flex-wrap gap-[4px]">
        {["What was our stock at the end of August?", "How have supplier terms moved this year?", "Which branch sells the most 20L drums?"].map((q) => (
          <span key={q} className="rounded-full bg-white px-[8px] py-[3px] text-[7px]" style={{ color: NAVY, boxShadow: `inset 0 0 0 1px ${LINE}` }}>{q}</span>
        ))}
      </div>
      <div className="mt-auto flex h-[28px] items-center rounded-[8px] bg-white px-[10px] text-[8px]" style={{ color: MUTE, boxShadow: `0 0 0 1px ${LINE}` }}>
        Ask about your business…
        <span className="ml-auto flex size-[18px] items-center justify-center rounded-[5px]" style={{ background: NAVY }}>
          <ArrowUp className="size-[9px] text-white" aria-hidden="true" />
        </span>
      </div>
    </div>
  </Os>
);

/* 03 · Cash in 30, 60 and 90 days -------------------------------------- */

const Cash: Screen = () => (
  <Os path="cash" active="Cash" title="Cash you can plan with" sub="What arrives in 30, 60 and 90 days, from how each customer actually pays" right={<><Sample /><Btn Icon={FileText}>Report</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_168px] gap-[8px]">
      <Box title="Cash in, by month (R thousands)" right="last 3 months, then projected">
        <BarChart
          w={312}
          h={190}
          max={2400}
          bars={[[1820], [2050], [1910], [1640, 420], [1180, 760], [620, 1020]]}
          colors={[NAVY, DOT]}
          labels={["Aug", "Sep", "Oct", "30 days", "60 days", "90 days"]}
          highlight={3}
          yFormat={(n) => String(Math.round(n))}
        />
        <p className="mt-[3px] flex items-center gap-[10px] text-[6.8px]" style={{ color: MUTE }}>
          <span className="flex items-center gap-[3px]"><span className="size-[6px] rounded-[2px]" style={{ background: NAVY }} />Received / likely, by payment history</span>
          <span className="flex items-center gap-[3px]"><span className="size-[6px] rounded-[2px]" style={{ background: DOT }} />Due, but this customer usually pays later</span>
        </p>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Next 30 days">
          <p className="text-[17px] leading-none" style={{ ...HEAD, color: NAVY }}>R1.64M</p>
          <p className="mt-[3px] text-[7px]" style={{ color: MUTE }}>likely, from 214 open invoices</p>
          <p className="mt-[6px] text-[7.2px]">R420k more is due, but the payers&apos; history says it lands later.</p>
        </Box>
        <Box title="Behind the figure" className="flex-1">
          {[
            ["Demo Retail Group", "R312k", "pays on day 34"],
            ["Demo Farm Supplies", "R188k", "pays on day 52"],
            ["Demo Builders", "R96k", "pays on day 71"],
          ].map(([c, v, s]) => (
            <div key={c} className="border-b py-[3px] text-[7.2px] last:border-b-0" style={{ borderColor: LINE }}>
              <p className="flex justify-between"><b style={{ color: NAVY }}>{c}</b><span>{v}</span></p>
              <p className="text-[6.6px]" style={{ color: MUTE }}>{s} on average</p>
            </div>
          ))}
        </Box>
      </div>
    </div>
  </Os>
);

/* 04 · Branches as one business --------------------------------------- */

const BRANCHES: [string, string, string, number, string][] = [
  ["Johannesburg", "R2.41M", "R1.92M", 3, "IQ Retail · server"],
  ["Cape Town", "R1.87M", "R1.48M", 5, "IQ Retail · server"],
  ["Durban", "R1.32M", "R1.21M", 0, "IQ Retail · server"],
  ["Gqeberha", "R0.74M", "R0.66M", 2, "IQ Retail · server"],
  ["Bloemfontein", "R0.58M", "R0.52M", 1, "IQ Retail · server"],
  ["Online", "R0.46M", "—", 0, "Shopify · cloud"],
];

const Branches: Screen = () => (
  <Os path="branches" active="Branches" title="Every branch, one business" sub="Six branches on six systems, read as one · October" right={<><Sample /><Btn Icon={CalendarClock}>Compare months</Btn></>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[6px]">
        {[
          ["Sales, all branches", "R7.38M"],
          ["Stock on hand", "R5.79M"],
          ["Lines below reorder", "11"],
          ["People with access", "14"],
        ].map(([k, v], i) => (
          <div key={k} className="rounded-[9px] px-[9px] py-[6px]" style={i === 0 ? { background: NAVY, color: "#fff" } : { background: "#fff", boxShadow: `0 0 0 1px ${LINE}` }}>
            <p className="text-[6.8px]" style={{ opacity: 0.7 }}>{k}</p>
            <p className="mt-[2px] text-[15px] leading-none" style={HEAD}>{v}</p>
          </div>
        ))}
      </div>
      <Box title="Branches" right="each person sees the branches they're given" className="flex-1">
        <div className="grid h-[16px] grid-cols-[1fr_62px_62px_80px_96px] items-center text-[6.6px] font-semibold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
          <span>Branch</span>
          <span className="text-right">Sales</span>
          <span className="text-right">Stock</span>
          <span className="text-right">Below reorder</span>
          <span className="text-right">Source</span>
        </div>
        {BRANCHES.map(([b, s, st, low, src]) => (
          <div key={b} className="grid h-[23px] grid-cols-[1fr_62px_62px_80px_96px] items-center border-t text-[7.6px]" style={{ borderColor: LINE }}>
            <b style={{ color: NAVY }}>{b}</b>
            <span className="text-right tabular-nums">{s}</span>
            <span className="text-right tabular-nums">{st}</span>
            <span className="text-right">{low ? <Pill tone={low > 2 ? "amber" : "grey"} size={6.2}>{low} {low === 1 ? "line" : "lines"}</Pill> : <span style={{ color: MUTE }}>—</span>}</span>
            <span className="flex items-center justify-end gap-[3px] text-[6.8px]" style={{ color: MUTE }}>
              {src.includes("server") ? <Server className="size-[7px]" aria-hidden="true" /> : <Cable className="size-[7px]" aria-hidden="true" />}
              {src}
            </span>
          </div>
        ))}
      </Box>
    </div>
  </Os>
);

/* 05 · Connections and the assistant you already use -------------------- */

const SYSTEMS: [string, string, "green" | "grey"][] = [
  ["IQ Retail", "Back-office server · 5 branches", "green"],
  ["Sage 200 Evolution", "Back-office server", "green"],
  ["Xero", "Cloud", "green"],
  ["Shopify", "Cloud", "green"],
  ["Gmail", "Cloud · 3 inboxes", "green"],
  ["Bank feed", "Cloud", "green"],
  ["SYSPRO", "Back-office server", "grey"],
];

const Connect: Screen = () => (
  <Os path="connections" active="Connections" title="Connections" sub="Reads only, enforced in code and by the permissions you grant" right={<Btn solid Icon={Cable}>Connect a system</Btn>}>
    <div className="grid h-full grid-cols-[1fr_206px] gap-[8px]">
      <Box title="Systems" right="7 connected or in setup">
        {SYSTEMS.map(([n, w, t]) => (
          <div key={n} className="flex h-[25px] items-center gap-[6px] border-b text-[7.8px] last:border-b-0" style={{ borderColor: LINE }}>
            <span className="flex size-[16px] items-center justify-center rounded-[4px]" style={{ background: "#eef3fc" }}>
              {w.startsWith("Back") ? <Server className="size-[8px]" style={{ color: NAVY }} aria-hidden="true" /> : <Cable className="size-[8px]" style={{ color: NAVY }} aria-hidden="true" />}
            </span>
            <b style={{ color: NAVY }}>{n}</b>
            <span className="text-[7px]" style={{ color: MUTE }}>{w}</span>
            <span className="ml-auto flex items-center gap-[4px]">
              <span className="flex items-center gap-[2px] text-[6.6px]" style={{ color: MUTE }}><Lock className="size-[6px]" aria-hidden="true" />Read-only</span>
              <Pill tone={t} size={6.2}>{t === "green" ? "Reading" : "Setting up"}</Pill>
            </span>
          </div>
        ))}
      </Box>
      <div className="flex min-h-0 flex-col rounded-[9px] p-[8px] text-white" style={{ background: `linear-gradient(170deg, #16284f, ${DEEP})` }}>
        <p className="text-[8.4px]" style={HEAD}>From the assistant you already use</p>
        <p className="mt-[2px] text-[6.8px] text-white/60">Connected to Claude, ChatGPT or Gemini, each person with their own access.</p>
        <div className="mt-[7px] ml-auto max-w-[160px] rounded-[8px] rounded-tr-[2px] px-[7px] py-[5px] text-[7.2px]" style={{ background: "rgb(255 255 255 / 0.14)" }}>
          What should I chase this week?
        </div>
        <div className="mt-[6px] rounded-[8px] rounded-tl-[2px] bg-white px-[7px] py-[6px] text-[7.2px] leading-[1.4]" style={{ color: INK }}>
          <p className="flex items-center gap-[3px] text-[6.4px] font-semibold uppercase tracking-[0.06em]" style={{ color: DOT }}>
            <Sparkles className="size-[7px]" aria-hidden="true" /> using Tennsa OS
          </p>
          Start with <b>Demo Builders</b>: R96,300 over 64 days, still being invoiced. Then the 5L primer order due Friday.
          <p className="mt-[4px] text-[6.4px]" style={{ color: MUTE }}>Figures computed by Tennsa OS from your records; the assistant explains them.</p>
        </div>
        <p className="mt-auto flex items-center gap-[4px] text-[6.6px] text-white/60">
          <TriangleAlert className="size-[7px]" aria-hidden="true" /> Disconnect a system and its data is deleted.
        </p>
      </div>
    </div>
  </Os>
);

export const tennsaScreens: Screen[] = [Briefing, Ask, Cash, Branches, Connect];
