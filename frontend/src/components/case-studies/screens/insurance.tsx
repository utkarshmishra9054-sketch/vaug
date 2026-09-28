import type { ReactNode } from "react";
import { CalendarClock, Check as CheckIcon, ChevronLeft, Download, FlaskConical, Inbox, LayoutDashboard, Lock, Pencil, Send, Settings, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react";

import { Avatar, Browser, Btn, Check, Panel, Pill, Segments, Select, Sidebar, Tag, Th, Toggle, TopBar, Tr, type Screen, type Tone } from "./kit";
import { Photo } from "./tools";

/* Freelancer insurance platform · London insurtech (brand: Onsi, formerly Collective Benefits) */

const BRAND = "Onsi";
const URL = "brokers.onsi.com";
const LOGO = { src: "/logos/onsi.webp", img: { w: 383, h: 120 } };
/** Onsi's own monochrome palette (black UI on white), whatever the study tint. */
const ONSI_INK = "#111111";
const NAV = [
  { label: "Pipeline", Icon: LayoutDashboard },
  { label: "Quotes", Icon: Inbox, badge: 186 },
  { label: "Referrals", Icon: UserRound, badge: 9 },
  { label: "Policies", Icon: ShieldCheck },
  { label: "Renewals", Icon: CalendarClock, badge: 12 },
  { label: "Rating rules", Icon: SlidersHorizontal },
  { label: "Settings", Icon: Settings },
];
const USER = { name: "James Bennett", role: "Founder · Broker", initials: "JB" };
const INSURER_A = "Syndicate 4711";
const INSURER_B = "Meridian Specialty";

/** The kit sidebar with the real Onsi wordmark over its brand row. */
function AppSidebar({ tint, active }: { tint: string; active: number }) {
  return (
    <div className="relative h-full shrink-0">
      <Sidebar tint={tint} brand={BRAND} mark="O" items={NAV} active={active} user={USER} />
      <div className="absolute left-0 right-[1px] top-0 flex h-[32px] items-end gap-[6px] bg-[#fbfbfa] px-[12px] pb-[3px]">
        <Photo {...LOGO} w={38} h={12} />
        <span className="text-[9.5px] font-semibold leading-none tracking-[-0.01em] text-black/55">Brokers</span>
      </div>
    </div>
  );
}

const soft = (tint: string, pct = 8) => `color-mix(in oklab, ${tint} ${pct}%, white)`;

/* Mobile helpers ---------------------------------------------------- */

const SYS = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

function StatusIcons() {
  return (
    <span className="flex items-center gap-[3px]">
      <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={k * 3} y={6 - k * 2} width="2.2" height={2 + k * 2} rx="0.5" fill="currentColor" />
        ))}
      </svg>
      <svg width="11" height="8" viewBox="0 0 11 8" aria-hidden="true">
        <path d="M5.5 7.6 3.7 5.8a2.6 2.6 0 0 1 3.6 0Z M2.3 4.4a4.6 4.6 0 0 1 6.4 0l-.9.9a3.3 3.3 0 0 0-4.6 0Z M.9 3a6.6 6.6 0 0 1 9.2 0l-.9.9a5.3 5.3 0 0 0-7.4 0Z" fill="currentColor" />
      </svg>
      <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden="true">
        <rect x="0.5" y="0.5" width="15" height="7" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="9.5" height="4" rx="1" fill="currentColor" />
        <rect x="16.3" y="2.6" width="1.2" height="2.8" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </span>
  );
}

/** A plain phone: bezel, status bar, home indicator. */
function Handset({ children, bg = "#fff", time = "10:41", w = 184, h = 378 }: { children: ReactNode; bg?: string; time?: string; w?: number; h?: number }) {
  return (
    <div className="rounded-[30px] bg-[#1d1d1f] p-[4px] shadow-[0_1px_2px_rgb(0_0_0/0.25),0_16px_32px_-18px_rgb(0_0_0/0.45)]" style={{ width: w, height: h, ...SYS }}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] text-[#111]" style={{ background: bg }}>
        <div className="relative flex h-[24px] shrink-0 items-center justify-between px-[16px] pt-[2px] text-[8.5px] font-semibold">
          <span>{time}</span>
          <span className="absolute left-1/2 top-[5px] h-[13px] w-[46px] -translate-x-1/2 rounded-full bg-black" />
          <StatusIcons />
        </div>
        {children}
        <div className="absolute bottom-[4px] left-1/2 h-[3px] w-[60px] -translate-x-1/2 rounded-full bg-black/85" />
      </div>
    </div>
  );
}

/** Divided stat strip under the top bar. */
function Stats({ items }: { items: [string, string, string][] }) {
  return (
    <div className="grid shrink-0 border-b border-black/[0.07] bg-white" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map(([l, v, sub], i) => (
        <div key={l} className={`min-w-0 px-[12px] py-[7px] ${i ? "border-l border-black/[0.06]" : ""}`}>
          <p className="truncate text-[7.5px] text-black/50">{l}</p>
          <p className="mt-[2px] text-[14px] font-semibold tabular-nums tracking-[-0.02em]">{v}</p>
          <p className="truncate text-[7px] text-black/40">{sub}</p>
        </div>
      ))}
    </div>
  );
}

function PhonePair({ tint, children }: { tint: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-[28px]" style={{ background: `color-mix(in oklab, ${tint} 7%, #f2f2f0)` }}>
      {children}
    </div>
  );
}

function FlowHeader({ tint, step }: { tint: string; step: number }) {
  return (
    <div className="shrink-0 px-[12px] pt-[4px]">
      <div className="flex items-center gap-[5px]">
        <ChevronLeft className="size-[12px] text-black/55" aria-hidden="true" />
        <Photo {...LOGO} w={32} h={10} />
        <span className="ml-auto text-[7.5px] text-black/45">Step {step} of 5</span>
      </div>
      <div className="mt-[5px] h-[2px] rounded-full bg-black/[0.07]">
        <div className="h-full rounded-full" style={{ width: `${step * 20}%`, background: tint }} />
      </div>
    </div>
  );
}

/* 01 · Mobile quote flow: price screen ------------------------------ */

const COVER = [
  { label: "Professional indemnity", sub: "£1,000,000 limit", price: "£32.20", on: true, fixed: true },
  { label: "Public liability", sub: "£2,000,000 limit", price: "+£6.20", on: true },
  { label: "Equipment cover", sub: "Up to £5,000 of kit", price: "+£9.80", on: false },
];

export const QuotePrice: Screen = ({ tint }) => (
  <PhonePair tint={tint}>
    <Handset>
      <FlowHeader tint={tint} step={4} />
      <div className="flex flex-1 flex-col px-[12px] pt-[9px]">
        <p className="text-[13px] font-bold leading-tight tracking-[-0.01em]">Your price</p>
        <p className="text-[8px] text-black/50">Photographer · £48k turnover</p>

        <div className="mt-[7px] rounded-[9px] px-[10px] py-[7px] ring-1 ring-black/[0.1]">
          <p className="text-[7.5px] text-black/55">{INSURER_A} at Lloyd&apos;s</p>
          <p className="mt-[3px] text-[21px] font-bold leading-none tracking-[-0.03em] tabular-nums">
            £38.40<span className="text-[9px] font-medium text-black/45"> a month</span>
          </p>
          <p className="mt-[3px] text-[7.5px] text-black/50">or £422.40 a year, paid today</p>
          <div className="mt-[6px] flex rounded-[6px] bg-black/[0.05] p-[2px] text-[8px] font-semibold">
            <span className="flex-1 rounded-[4px] bg-white py-[3px] text-center shadow-sm">Monthly</span>
            <span className="flex-1 py-[3px] text-center text-black/50">Annually</span>
          </div>
        </div>

        <p className="mt-[7px] text-[7.5px] font-semibold uppercase tracking-[0.06em] text-black/40">Your cover</p>
        <div className="mt-[2px]">
          {COVER.map((c) => (
            <div key={c.label} className="flex h-[25px] items-center gap-[6px] border-b border-black/[0.06] last:border-b-0">
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[8.5px] font-medium">{c.label}</span>
                <span className="block truncate text-[7px] text-black/45">{c.sub}</span>
              </span>
              <span className={`text-[8px] tabular-nums ${c.on ? "font-semibold" : "text-black/40"}`}>{c.price}</span>
              {c.fixed ? <span className="w-[21px]" /> : <Toggle on={c.on} tint={tint} />}
            </div>
          ))}
        </div>
        <div className="mt-[5px] space-y-[2px] text-[7.5px] text-black/55">
          <p className="flex justify-between">
            <span>Excess £250 each claim</span>
            <span>IPT included</span>
          </p>
        </div>

        <div className="mt-[7px] flex items-start gap-[5px] text-[7.5px] leading-[1.35] text-black/60">
          <span className="mt-[1px]">
            <Check on tint={tint} />
          </span>
          <span>
            I&apos;ve read the <u>IPID</u> and <u>policy wording</u>
          </span>
        </div>

        <span className="mb-[16px] mt-auto flex h-[28px] shrink-0 items-center justify-center rounded-[8px] text-[9.5px] font-semibold text-white" style={{ background: tint }}>
          Continue to payment
        </span>
      </div>
    </Handset>

    <Handset>
      <FlowHeader tint={tint} step={5} />
      <div className="flex flex-1 flex-col px-[12px] pt-[9px]">
        <p className="text-[13px] font-bold leading-tight tracking-[-0.01em]">Payment</p>
        <p className="text-[8px] text-black/50">£38.40 today, then on the 14th</p>

        <span className="mt-[8px] flex h-[26px] items-center justify-center gap-[3px] rounded-[5px] bg-black text-[10px] font-semibold text-white">
          <svg width="9" height="11" viewBox="0 0 14 17" aria-hidden="true">
            <path fill="#fff" d="M11.6 9c0-2 1.6-2.9 1.7-3a3.7 3.7 0 0 0-2.9-1.6c-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7A3.9 3.9 0 0 0 1.5 6.4c-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2s1.4-.6 2.6-.6 1.5.6 2.6.6 1.7-1 2.4-2a8 8 0 0 0 1.1-2.2A3.4 3.4 0 0 1 11.6 9ZM9.6 3.1A3.4 3.4 0 0 0 10.4.6 3.5 3.5 0 0 0 8.1 1.8a3.3 3.3 0 0 0-.8 2.4 2.9 2.9 0 0 0 2.3-1.1Z" />
          </svg>
          Pay
        </span>
        <div className="my-[7px] flex items-center gap-[6px] text-[7px] text-black/40">
          <span className="h-px flex-1 bg-black/10" />
          Or pay with card
          <span className="h-px flex-1 bg-black/10" />
        </div>

        {[
          ["Card number", "4658 5820 1134 4417", true],
        ].map(([l, v, card]) => (
          <div key={l as string} className="mb-[6px]">
            <p className="mb-[2px] text-[7.5px] text-black/60">{l}</p>
            <div className="flex h-[22px] items-center rounded-[5px] bg-white px-[7px] text-[8.5px] shadow-[0_1px_1px_rgb(0_0_0/0.04)] ring-1 ring-[#e0e0e0]">
              <span className="flex-1 tabular-nums">{v}</span>
              {card && <span className="rounded-[2px] bg-[#1a1f71] px-[3px] text-[6px] font-bold italic text-white">VISA</span>}
            </div>
          </div>
        ))}
        <div className="mb-[6px] grid grid-cols-2 gap-[6px]">
          {[
            ["Expiry", "08 / 28"],
            ["CVC", "•••"],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="mb-[2px] text-[7.5px] text-black/60">{l}</p>
              <div className="flex h-[22px] items-center rounded-[5px] bg-white px-[7px] text-[8.5px] ring-1 ring-[#e0e0e0]">{v}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.4fr_1fr] gap-[6px]">
          {[
            ["Country", "United Kingdom"],
            ["Postcode", "E8 3PH"],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="mb-[2px] text-[7.5px] text-black/60">{l}</p>
              <div className="flex h-[22px] items-center rounded-[5px] bg-white px-[7px] text-[8.5px] ring-1 ring-[#e0e0e0]">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-[8px] space-y-[2px] border-t border-black/[0.07] pt-[6px] text-[7.5px] text-black/55">
          <p className="flex justify-between">
            <span>12 monthly payments</span>
            <span className="tabular-nums">£38.40</span>
          </p>
          <p className="flex justify-between font-semibold text-black/80">
            <span>Due today</span>
            <span className="tabular-nums">£38.40</span>
          </p>
        </div>

        <span className="mt-auto flex h-[28px] shrink-0 items-center justify-center gap-[4px] rounded-[8px] text-[9.5px] font-semibold text-white" style={{ background: tint }}>
          <Lock className="size-[9px]" aria-hidden="true" />
          Pay £38.40 and start cover
        </span>
        <p className="mb-[14px] mt-[4px] text-center text-[6.5px] text-black/40">
          Powered by <b className="font-bold text-black/50">stripe</b> · Terms · Privacy
        </p>
      </div>
    </Handset>
  </PhonePair>
);

/* 02 · Broker dashboard: pipeline + renewals ------------------------ */


const QUOTES: { who: string; job: string; cover: string; prem: string; t: string; st: string; tone: Tone; i: number }[] = [
  { who: "Idris Bello", job: "Developer", cover: "PI £1m", prem: "£24.10", t: "41s", st: "Bound online", tone: "green", i: 3 },
  { who: "Tom Reyes", job: "Videographer", cover: "PI + kit £18k", prem: "£46.90", t: "58s", st: "Referred", tone: "amber", i: 0 },
  { who: "Lea Martin", job: "Copywriter", cover: "PI £500k", prem: "£19.80", t: "37s", st: "Quoted", tone: "blue", i: 4 },
  { who: "Ana Costa", job: "UX consultant", cover: "PI £2m + PL", prem: "£52.30", t: "1m 04s", st: "Bound online", tone: "green", i: 1 },
  { who: "Hannah Price", job: "Event planner", cover: "PL £5m", prem: "—", t: "—", st: "Declined · US work", tone: "red", i: 5 },
  { who: "Olu Adeyemi", job: "Data consultant", cover: "PI £1m", prem: "£27.65", t: "49s", st: "Payment failed", tone: "red", i: 2 },
  { who: "Grace Lin", job: "Illustrator", cover: "PI £500k + PL", prem: "£21.35", t: "44s", st: "Abandoned", tone: "grey", i: 0 },
  { who: "Kieran Walsh", job: "Web developer", cover: "PI £1m", prem: "£24.10", t: "39s", st: "Bound online", tone: "green", i: 3 },
];
const QCOLS = "minmax(0,1fr) 48px 34px 84px";

const RENEWALS: { who: string; job: string; due: string; prem: string; st: string; tone: Tone; i: number }[] = [
  { who: "Sam Oduya", job: "Architect", due: "3 days", prem: "£612", st: "Opened", tone: "blue", i: 5 },
  { who: "Priya Nair", job: "Stylist", due: "6 days", prem: "£288", st: "Not opened", tone: "red", i: 0 },
  { who: "Ben Hartley", job: "Illustrator", due: "11 days", prem: "£341", st: "Renewed", tone: "green", i: 3 },
  { who: "Chloe Evans", job: "PR consultant", due: "18 days", prem: "£497", st: "Reminder sent", tone: "grey", i: 1 },
  { who: "Marek Nowak", job: "3D artist", due: "27 days", prem: "£265", st: "Reminder sent", tone: "grey", i: 2 },
];

export const BrokerDashboard: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/pipeline`}>
    <div className="flex h-full bg-[#f6f6f9] text-[#15151f]" style={SYS}>
      <AppSidebar tint={tint} active={0} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Pipeline" sub="Tuesday 29 Sep · PI & public liability · 2 insurers" search="Search name, policy…">
          <Segments items={["Today", "7d", "30d"]} active={0} tint={tint} />
        </TopBar>
        <Stats
          items={[
            ["Quotes started", "186", "+22% vs last Tue"],
            ["Policies bound", "41", "29 online · 12 by broker"],
            ["Median time to quote", "52s", "p90 1m 38s"],
            ["Renewals due", "12", "next 30 days"],
          ]}
        />
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-[8px] px-[10px] py-[8px]">
          <Panel title="Today’s quotes" action={<span>1–8 of 186</span>} pad={false}>
            <Th cols={QCOLS}>
              <span>Applicant</span>
              <span className="text-right">Premium</span>
              <span className="text-right">Time</span>
              <span>Status</span>
            </Th>
            {QUOTES.map((q) => (
              <Tr key={q.who} cols={QCOLS} h={22} style={{ fontSize: 8 }}>
                <span className="flex min-w-0 items-center gap-[5px]">
                  <Avatar text={q.who.split(" ").map((s) => s[0]).join("")} i={q.i} size={16} />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate font-semibold">{q.who}</span>
                    <span className="block truncate text-[7.5px] text-black/45">
                      {q.job} · {q.cover}
                    </span>
                  </span>
                </span>
                <span className="text-right font-semibold tabular-nums">
                  {q.prem}
                  {q.prem !== "—" && <span className="text-[7px] font-normal text-black/40">/mo</span>}
                </span>
                <span className="text-right tabular-nums text-black/55">{q.t}</span>
                <span>
                  <Pill tone={q.tone} size={7} dot>
                    {q.st}
                  </Pill>
                </span>
              </Tr>
            ))}
          </Panel>
          <div className="flex min-h-0 flex-col gap-[8px]">
            <Panel title="Renewals" action={<span>next 30 days</span>} pad={false} className="flex-1">
              {RENEWALS.map((r) => (
                <div key={r.who} className="flex h-[24px] items-center gap-[6px] border-b border-black/[0.05] px-[9px] last:border-b-0">
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[8.5px] font-semibold">{r.who}</span>
                    <span className="block truncate text-[7.5px] text-black/45">
                      {r.prem}/yr · in {r.due}
                    </span>
                  </span>
                  <Pill tone={r.tone} size={7}>
                    {r.st}
                  </Pill>
                </div>
              ))}
            </Panel>
            <Panel title="Referrals" action={<span>9 open · oldest 2h 14m</span>} pad={false} className="shrink-0">
              {[
                ["Tom Reyes", "Kit over £15k", "2h 14m"],
                ["Farah Qureshi", "Prior claim 2023", "1h 02m"],
                ["Dev Patel", "Turnover £310k", "38m"],
              ].map(([n, why, age]) => (
                <div key={n} className="flex h-[21px] items-center gap-[6px] whitespace-nowrap border-b border-black/[0.05] px-[9px] text-[8px] last:border-b-0">
                  <span className="shrink-0 font-medium">{n}</span>
                  <span className="truncate text-black/45">{why}</span>
                  <span className="ml-auto shrink-0 tabular-nums text-black/40">{age}</span>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 03 · Policy detail: payments + documents ------------------------- */

const PAYMENTS: { date: string; ref: string; amt: string; st: string; tone: Tone; note?: string }[] = [
  { date: "14 Oct", ref: "Scheduled", amt: "£48.20", st: "Upcoming", tone: "grey" },
  { date: "14 Sep", ref: "pi_3PzK8r2eZvKYlo", amt: "£48.20", st: "Paid", tone: "green" },
  { date: "14 Aug", ref: "pi_3PmT1a2eZvKYlo", amt: "£48.20", st: "Paid", tone: "green" },
  { date: "17 Jul", ref: "pi_3PdQ7c2eZvKYlo", amt: "£48.20", st: "Paid · retry", tone: "amber", note: "Declined 14 Jul, retried" },
  { date: "14 Jun", ref: "pi_3PRb4x2eZvKYlo", amt: "£48.20", st: "Paid", tone: "green" },
  { date: "14 May", ref: "pi_3PGh9w2eZvKYlo", amt: "£38.40", st: "Paid", tone: "green" },
  { date: "14 Apr", ref: "pi_3P4n6k2eZvKYlo", amt: "£38.40", st: "Paid", tone: "green" },
];
const PCOLS = "38px minmax(0,1fr) 40px 66px";

const DOCS = [
  ["Policy schedule v2", "Endorsed 14 Jun", "142 KB"],
  ["Certificate of insurance", "Issued on bind", "88 KB"],
  ["Endorsement E1 · kit cover", "14 Jun 2026", "64 KB"],
  ["IPID · Professional indemnity", "FCA disclosure", "210 KB"],
  ["Statement of fact", "Answers at bind", "97 KB"],
];

export const PolicyDetail: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/policies/ON-PI-26-018342`}>
    <div className="flex h-full bg-[#f6f6f9] text-[#15151f]" style={SYS}>
      <AppSidebar tint={tint} active={3} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="ON-PI-26-018342" sub="Policies › Maya Chen · bound online 14 Mar 2026, 10:42">
          <Btn outline Icon={Pencil}>
            Endorse
          </Btn>
          <Btn tint={tint} Icon={Send}>
            Resend docs
          </Btn>
        </TopBar>
        <div className="mx-[12px] mt-[9px] rounded-[8px] bg-white px-[10px] py-[8px] ring-1 ring-black/[0.07]">
          <div className="flex items-center gap-[8px]">
            <Avatar text="MC" i={2} size={26} />
            <div className="min-w-0 leading-tight">
              <p className="text-[11px] font-bold">Maya Chen</p>
              <p className="truncate text-[8px] text-black/45">Freelance photographer · Hackney, London E8 · customer since Mar 2026</p>
            </div>
            <span className="ml-auto flex gap-[4px]">
              <Pill tone="green" size={7.5} dot>
                Live
              </Pill>
              <Pill tone="grey" size={7.5}>
                Bound online
              </Pill>
            </span>
          </div>
          <div className="mt-[7px] grid grid-cols-[1fr_1.2fr_1.5fr_1.3fr] gap-[8px] border-t border-black/[0.06] pt-[6px] text-[8px]">
            {[
              ["Premium", "£48.20 / month"],
              ["Cover", "PI £1m · PL £2m · Kit"],
              ["Period", "14 Mar 2026 – 13 Mar 2027"],
              ["Insurer", `${INSURER_A} · Lloyd's`],
            ].map(([k, v]) => (
              <span key={k} className="min-w-0 leading-tight">
                <span className="block text-black/45">{k}</span>
                <span className="block truncate text-[8.5px] font-semibold">{v}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-[8px] px-[12px] py-[8px]">
          <Panel
            title={
              <span className="flex items-center gap-[5px]">
                Payment history
                <span className="rounded-[3px] bg-[#635bff] px-[3px] py-[1px] text-[7px] font-bold text-white">stripe</span>
              </span>
            }
            action={<span>Monthly · 7 of 12 paid</span>}
            pad={false}
          >
            <Th cols={PCOLS}>
              <span>Date</span>
              <span>Payment</span>
              <span className="text-right">Amount</span>
              <span>Status</span>
            </Th>
            {PAYMENTS.map((p) => (
              <Tr key={p.date} cols={PCOLS} h={25} highlight={p.tone === "amber" ? "#fffbeb" : undefined}>
                <span className="tabular-nums text-black/55">{p.date}</span>
                <span className="min-w-0 leading-tight">
                  <span className={`block truncate ${p.ref === "Scheduled" ? "text-black/45" : "font-mono text-[7.5px]"}`}>{p.ref}</span>
                  {p.note ? (
                    <span className="block truncate text-[7px] text-[#92400e]">{p.note}</span>
                  ) : p.date === "14 Jun" ? (
                    <span className="block truncate text-[7px] text-black/45">Kit cover added (E1)</span>
                  ) : null}
                </span>
                <span className={`text-right font-semibold tabular-nums ${p.tone === "grey" ? "text-black/40" : ""}`}>{p.amt}</span>
                <span>
                  <Pill tone={p.tone} size={7}>
                    {p.st}
                  </Pill>
                </span>
              </Tr>
            ))}
          </Panel>
          <div className="flex min-h-0 flex-col gap-[8px]">
            <Panel title="Documents" action={<span>5 files</span>} pad={false} className="flex-1">
              {DOCS.map(([n, s, kb]) => (
                <div key={n} className="flex h-[27px] items-center gap-[6px] border-b border-black/[0.05] px-[9px] last:border-b-0">
                  <span className="flex h-[17px] w-[14px] shrink-0 items-center justify-center rounded-[2px] bg-[#fee2e2] text-[5.5px] font-bold text-[#b91c1c]">PDF</span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[8.5px] font-semibold">{n}</span>
                    <span className="block truncate text-[7px] text-black/45">
                      {s} · {kb}
                    </span>
                  </span>
                  <Download className="size-[9px] shrink-0 text-black/40" aria-hidden="true" />
                </div>
              ))}
            </Panel>
            <Panel title="Renewal" action={<span>13 Mar 2027</span>} className="shrink-0">
              <div className="space-y-[2px] text-[7.5px] text-black/60">
                <p className="flex justify-between">
                  <span>Reminder 1</span>
                  <span>11 Feb 2027 · email</span>
                </p>
                <p className="flex justify-between">
                  <span>Reminder 2</span>
                  <span>6 Mar 2027 · email + SMS</span>
                </p>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 04 · Admin: insurer rating rules ---------------------------------- */

const RULES: { group: string; factor: string; a: string; b: string; edited?: boolean; refer?: "a" | "b" | "both" }[] = [
  { group: "Base", factor: "Photographer · class C2", a: "£276.00", b: "£289.00", edited: true },
  { group: "Base", factor: "Developer · class A1", a: "£198.00", b: "£205.00" },
  { group: "Turnover", factor: "£25k – £75k", a: "× 1.25", b: "× 1.30" },
  { group: "Turnover", factor: "£75k – £250k", a: "× 1.60", b: "× 1.55" },
  { group: "Limit", factor: "£2m indemnity", a: "× 1.42", b: "× 1.38" },
  { group: "Claims", factor: "1 claim in 5 years", a: "+ 25%", b: "Refer", refer: "b" },
  { group: "Territory", factor: "Work in USA / Canada", a: "Refer", b: "Decline", refer: "both" },
  { group: "Floor", factor: "Minimum premium", a: "£168.00", b: "£180.00" },
];
const RCOLS = "52px minmax(0,1fr) 58px 58px";

const valueCell = (v: string) => (v === "Refer" ? <Pill tone="amber" size={7}>Refer</Pill> : v === "Decline" ? <Pill tone="red" size={7}>Decline</Pill> : v);

export const RatingRules: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/admin/rating-rules/pi-uk`}>
    <div className="flex h-full bg-[#f6f6f9] text-[#15151f]" style={SYS}>
      <AppSidebar tint={tint} active={5} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Rating rules" sub="Professional indemnity · UK freelancers · live v13">
          <Pill tone="amber" size={7.5} dot>
            Draft v14 · 1 change
          </Pill>
          <Btn tint={tint} Icon={CheckIcon}>
            Publish
          </Btn>
        </TopBar>
        <div className="flex items-center gap-[6px] px-[12px] pt-[9px]">
          <Select>Professional indemnity</Select>
          <Select>All factors</Select>
          <span className="ml-auto text-[7.5px] text-black/45">v13 published 2 Sep 2026 by James Bennett</span>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_170px] gap-[8px] px-[12px] py-[8px]">
          <Panel title="Rating factors" action={<span>Annual, before IPT</span>} pad={false}>
            <Th cols={RCOLS}>
              <span>Group</span>
              <span>Factor</span>
              <span className="text-right">{INSURER_A.replace("Syndicate ", "Syn. ")}</span>
              <span className="text-right">Meridian</span>
            </Th>
            {RULES.map((r) => (
              <Tr key={r.factor} cols={RCOLS} h={26} highlight={r.edited ? soft(tint, 6) : undefined}>
                <span>
                  <Tag color={r.group === "Claims" || r.group === "Territory" ? "#d97706" : tint} size={7}>
                    {r.group}
                  </Tag>
                </span>
                <span className="truncate">{r.factor}</span>
                <span className="flex justify-end">
                  {r.edited ? (
                    <span className="flex h-[18px] items-center gap-[3px] rounded-[4px] bg-white px-[5px] font-semibold tabular-nums" style={{ boxShadow: `0 0 0 1.5px ${tint}` }}>
                      {r.a}
                    </span>
                  ) : (
                    <span className="font-semibold tabular-nums">{valueCell(r.a)}</span>
                  )}
                </span>
                <span className="flex justify-end font-semibold tabular-nums text-black/70">{valueCell(r.b)}</span>
              </Tr>
            ))}
            <div className="flex h-[25px] items-center gap-[5px] border-t border-black/[0.06] px-[10px] text-[8px] font-semibold" style={{ color: tint }}>
              <span className="text-[11px] leading-none">+</span> Add factor
              <span className="ml-auto font-normal text-black/40">8 of 23 factors</span>
            </div>
          </Panel>

          <div className="flex min-h-0 flex-col gap-[8px]">
            <Panel
              title={
                <span className="flex items-center gap-[4px]">
                  <FlaskConical className="size-[9px]" style={{ color: tint }} aria-hidden="true" />
                  Test quote
                </span>
              }
            >
              <div className="space-y-[3px] text-[8px]">
                {[
                  ["Profession", "Photographer"],
                  ["Turnover", "£48,000"],
                  ["Limit", "£1m"],
                  ["Claims", "0"],
                ].map(([k, v]) => (
                  <div key={k} className="flex h-[17px] items-center justify-between rounded-[4px] bg-black/[0.035] px-[6px]">
                    <span className="text-black/50">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-[7px] space-y-[4px]">
                <div className="rounded-[6px] px-[7px] py-[5px]" style={{ background: soft(tint, 9), boxShadow: `inset 0 0 0 1px ${tint}` }}>
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="font-semibold">{INSURER_A}</span>
                    <Pill tone="green" size={6.5}>
                      Best
                    </Pill>
                  </div>
                  <p className="mt-[2px] text-[12px] font-bold tabular-nums" style={{ color: tint }}>
                    £386.40<span className="text-[8px] font-medium text-black/45"> · £32.20/mo</span>
                  </p>
                </div>
                <div className="rounded-[6px] px-[7px] py-[5px] ring-1 ring-black/[0.08]">
                  <p className="text-[8px] font-semibold text-black/60">{INSURER_B}</p>
                  <p className="mt-[2px] text-[11px] font-bold tabular-nums text-black/60">
                    £420.78<span className="text-[8px] font-medium text-black/40"> · £35.07/mo</span>
                  </p>
                </div>
              </div>
              <p className="mt-[5px] text-[7.5px] text-black/45">
                v13 price £378.00 · <span className="font-semibold text-black/70">+£8.40</span>
              </p>
            </Panel>
            <div className="flex shrink-0 items-start gap-[6px] rounded-[8px] bg-white p-[8px] ring-1 ring-black/[0.07]">
              <Avatar text="RK" i={3} size={16} />
              <p className="min-w-0 text-[7.5px] leading-[1.4] text-black/60">
                <b className="text-black/80">Rhys Kaur</b> changed C2 base £270.00 → £276.00 per insurer notice
                <span className="block text-black/40">Today 09:18 · pending review</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

const onBrand = (S: Screen): Screen => {
  const Branded: Screen = () => <S tint={ONSI_INK} />;
  return Branded;
};

export const insuranceScreens: Screen[] = [QuotePrice, BrokerDashboard, PolicyDetail, RatingRules].map(onBrand);
