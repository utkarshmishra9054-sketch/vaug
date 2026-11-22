import { Damion, Lato } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  Bell,
  BellRing,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Camera,
  ChartColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Headset,
  House,
  Lock,
  MapPin,
  MessageCircle,
  Mic,
  Phone as PhoneIcon,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Video,
  X,
} from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Avatar, Bar, BarChart, Browser, Btn, Donut, Kpi, Legend, LineChart, Panel, Phone, Pill, Segments, Tag, Th, Tr, type Screen, type Tone } from "./kit";
import { Photo } from "./tools";

/*
 * Summerhill Health · private GP clinic, Hale (Altrincham) · AI voice + WhatsApp agent.
 *
 * Brand from summerhillhealth.co.uk (read 22 Nov 2026): teal #05868e, cyan #5af0f9,
 * text #212529, panel grey #e7e5e8, cream #f3f0e4 and the secondary palette below;
 * Lato for text. Their script face (Black Jack) isn't a free font, so Damion stands in.
 * Logo and app icon are the clinic's own files.
 *
 * Fees (£135 / £175 / £285, home visits from £165), opening hours, the 6 pm-the-day-before
 * cancellation window, parking and Semble booking are from the clinic's site. Every patient,
 * conversation, number and chart below is illustrative. TODO(content): replace with real
 * exports, and confirm all figures with the client.
 */

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap", preload: false });
const damion = Damion({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const LATO: CSSProperties = { fontFamily: lato.style.fontFamily };
const SCRIPT: CSSProperties = { fontFamily: damion.style.fontFamily };
const SYS: CSSProperties = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

const TEAL = "#05868e";
const DEEP = "#035e64";
const CYAN = "#5af0f9";
const INK = "#212529";
const MIST = "#e7e5e8";
const CREAM = "#f3f0e4";
/** Secondary palette from the site's CSS (--bs-brand-*), used for appointment types. */
const PAL = { lavender: "#aebae3", sage: "#9cac95", blue: "#84b7c7", pink: "#e598a6", orange: "#ffb37e", yellow: "#c2b47a", purple: "#d2aecc" };
const soft = (c: string, pct = 14) => `color-mix(in oklab, ${c} ${pct}%, white)`;
const deep = (c: string, pct = 60) => `color-mix(in oklab, ${c} ${pct}%, black)`;

const BASE = "/case-studies/patient-whatsapp-voice-agent-manchester";
const LOGO_WHITE = { src: `${BASE}/logo-white.webp`, img: { w: 500, h: 348 } };
const ICON = { src: `${BASE}/avatar.webp`, img: { w: 192, h: 192 } };
const HOST = "console.summerhillhealth.co.uk";

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Live", Icon: Activity, badge: 4 },
  { label: "Handovers", Icon: Headset, badge: 3 },
  { label: "Diary", Icon: CalendarDays },
  { label: "Forms", Icon: ClipboardList, badge: 5 },
  { label: "Reminders", Icon: BellRing },
  { label: "Analytics", Icon: ChartColumn },
  { label: "Knowledge", Icon: BookOpen },
  { label: "Settings", Icon: Settings },
];

/** The clinic console's sidebar: teal like the clinic's site header, with its white logo. */
function SideNav({ active }: { active: number }) {
  return (
    <aside className="flex h-full w-[116px] shrink-0 flex-col px-[7px] pb-[8px] pt-[8px] text-white" style={{ background: TEAL }}>
      <div className="flex justify-center pb-[7px]">
        <Photo {...LOGO_WHITE} w={58} h={40} />
      </div>
      <p className="px-[6px] text-[6.5px] font-bold uppercase tracking-[0.14em] text-white/55">Front desk</p>
      <nav className="mt-[4px] flex flex-col gap-[2px]">
        {NAV.map((n, i) => {
          const on = i === active;
          return (
            <span key={n.label} className={`flex h-[21px] items-center gap-[6px] rounded-[6px] px-[6px] text-[8.5px] ${on ? "bg-white font-bold" : "text-white/85"}`} style={on ? { color: TEAL } : undefined}>
              <n.Icon className="size-[10px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <span className="truncate">{n.label}</span>
              {n.badge !== undefined && (
                <span className="ml-auto rounded-full px-[4px] py-[1.5px] text-[7px] font-bold leading-none" style={on ? { background: TEAL, color: "#fff" } : { background: "rgb(255 255 255 / 0.2)" }}>
                  {n.badge}
                </span>
              )}
            </span>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[7px] bg-white/10 p-[6px]">
        <p className="flex items-center gap-[4px] text-[7.5px] font-bold">
          <span className="size-[5px] rounded-full" style={{ background: CYAN, boxShadow: `0 0 0 2px ${CYAN}44` }} />
          Agent online
        </p>
        <p className="mt-[2px] text-[6.5px] leading-[1.35] text-white/70">
          Phone + WhatsApp · 24/7
          <br />
          Semble synced 12s ago
        </p>
      </div>
      <div className="mt-[6px] flex items-center gap-[5px] px-[2px]">
        <Avatar text="FD" i={4} size={17} />
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[8px] font-bold">Front desk</span>
          <span className="block truncate text-[6.5px] text-white/65">Hale clinic · WA15</span>
        </span>
      </div>
    </aside>
  );
}

/** Browser window holding the console: sidebar, top bar and the page body. */
function Console({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`${HOST}/${path}`}>
      <div className="flex h-full" style={{ ...LATO, color: INK, background: "#f4f6f6" }}>
        <SideNav active={active} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[38px] shrink-0 items-center gap-[8px] border-b border-black/[0.07] bg-white px-[12px]">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12.5px] font-black tracking-[-0.01em]">{title}</p>
              <p className="truncate text-[7.5px] text-black/50">{sub}</p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-[6px]">
              {right}
              <span className="flex h-[22px] w-[96px] items-center gap-[4px] rounded-full bg-black/[0.045] px-[7px] text-[7.5px] text-black/40">
                <Search className="size-[8px]" aria-hidden="true" />
                Patient, phone…
              </span>
              <span className="relative flex size-[20px] items-center justify-center text-black/50">
                <Bell className="size-[10px]" aria-hidden="true" />
                <span className="absolute right-[3px] top-[3px] size-[4px] rounded-full bg-[#e11d48]" />
              </span>
            </div>
          </header>
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

type Ch = "voice" | "wa";

function ChIcon({ ch, size = 18 }: { ch: Ch; size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: size, height: size, background: ch === "voice" ? soft(TEAL, 16) : "#dcfce7", color: ch === "voice" ? TEAL : "#15803d" }}>
      {ch === "voice" ? <PhoneIcon className="size-[8.5px]" aria-hidden="true" /> : <MessageCircle className="size-[8.5px]" aria-hidden="true" />}
    </span>
  );
}

/** Small "booked by the agent" marker. */
function AgentMark({ size = 9 }: { size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full" style={{ width: size, height: size, background: TEAL, color: "#fff" }}>
      <Sparkles style={{ width: size * 0.62, height: size * 0.62 }} aria-hidden="true" />
    </span>
  );
}

/* Phone helpers ----------------------------------------------------- */

function StatusIcons() {
  return (
    <span className="flex items-center gap-[3px]">
      <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={k * 3} y={6 - k * 2} width="2.2" height={2 + k * 2} rx="0.5" fill="currentColor" />
        ))}
      </svg>
      <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden="true">
        <rect x="0.5" y="0.5" width="15" height="7" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="8" height="4" rx="1" fill="currentColor" />
        <rect x="16.3" y="2.6" width="1.2" height="2.8" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </span>
  );
}

function Handset({ children, bg = "#fff", bar = "#fff", time = "21:42", dark = false }: { children: ReactNode; bg?: string; bar?: string; time?: string; dark?: boolean }) {
  return (
    <div className="h-[378px] w-[184px] shrink-0 rounded-[30px] bg-[#1d1d1f] p-[4px] shadow-[0_2px_4px_rgb(0_0_0/0.25),0_24px_40px_-18px_rgb(0_0_0/0.55)]" style={SYS}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] text-[#111b21]" style={{ background: bg }}>
        <div className={`relative flex h-[24px] shrink-0 items-center justify-between px-[16px] pt-[2px] text-[8.5px] font-semibold ${dark ? "text-white" : ""}`} style={{ background: bar }}>
          <span>{time}</span>
          <span className="absolute left-1/2 top-[5px] h-[13px] w-[46px] -translate-x-1/2 rounded-full bg-black" />
          <StatusIcons />
        </div>
        {children}
        <div className="absolute bottom-[4px] left-1/2 h-[3px] w-[60px] -translate-x-1/2 rounded-full bg-black/80" />
      </div>
    </div>
  );
}

function Bubble({ me = false, time, children }: { me?: boolean; time: string; children: ReactNode }) {
  return (
    <div className={`relative max-w-[88%] rounded-[8px] px-[6px] pb-[3px] pt-[4px] text-[7.8px] leading-[1.36] shadow-[0_0.5px_0.5px_rgb(11_20_26/0.14)] ${me ? "self-end rounded-tr-[2px]" : "self-start rounded-tl-[2px] bg-white"}`} style={me ? { background: "#d8f4ea" } : undefined}>
      {children}
      <span className="float-right ml-[6px] mt-[3px] flex translate-y-[2px] items-center gap-[2px] text-[6px] text-black/40">
        {time}
        {me && <span style={{ color: "#38bdf8" }}>✓✓</span>}
      </span>
    </div>
  );
}

function ChatButtons({ items }: { items: string[] }) {
  return (
    <div className="mt-[1.5px] grid gap-[1.5px] self-start" style={{ width: "88%", gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((t) => (
        <span key={t} className="flex h-[18px] items-center justify-center rounded-[6px] bg-white text-[7.5px] font-semibold shadow-[0_0.5px_0.5px_rgb(11_20_26/0.14)]" style={{ color: TEAL }}>
          {t}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · WhatsApp: same-day booking + pre-consultation questionnaire    */
/* ------------------------------------------------------------------ */

const STEPS: [typeof Clock, string, string][] = [
  [Clock, "Answered in 3 seconds", "Thu 21:42 · clinic closed"],
  [CalendarCheck, "Booked straight into Semble", "Fri 16 Oct · 08:20 · £135"],
  [ClipboardList, "Questionnaire before the visit", "New patient · 2 answers flagged"],
  [ShieldCheck, "No medical advice, ever", "Red flags go to 999 / NHS 111"],
];

const SYMPTOMS: [string, number][] = [
  ["Hot flushes or night sweats", 3],
  ["Sleep problems", 4],
  ["Low mood", 2],
  ["Joint and muscle aches", 2],
];
const SCALE = ["None", "Mild", "Mod.", "Severe", "V. sev."];

export const ChatBooking: Screen = () => (
  <div className="relative h-full w-full overflow-hidden" style={{ ...LATO, background: TEAL }}>
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
      <path d="M0 318 C 120 360 230 300 330 330 S 520 400 640 360 L640 400 L0 400 Z" fill="#fff" />
      <path d="M430 0 C 520 70 590 60 640 30 L640 0 Z" fill={DEEP} opacity="0.55" />
    </svg>

    <div className="absolute left-[24px] top-[26px] w-[200px] text-white">
      <Photo {...LOGO_WHITE} w={66} h={46} />
      <p className="mt-[12px] text-[25px] leading-[1.02]" style={{ ...SCRIPT, color: CYAN }}>
        Booked in a chat,
        <br />
        day or night.
      </p>
      <p className="mt-[7px] text-[8.5px] leading-[1.45] text-white/85">
        A parent messages at 21:42 with the clinic closed. The agent books a same-day GP appointment, then a new patient&apos;s first consultation and questionnaire.
      </p>
      <div className="mt-[9px] flex flex-col gap-[4px]">
        {STEPS.map(([Icon, a, b]) => (
          <div key={a} className="flex items-center gap-[6px] rounded-[7px] bg-white/[0.12] px-[6px] py-[4px] ring-1 ring-white/15">
            <span className="flex size-[17px] shrink-0 items-center justify-center rounded-full bg-white" style={{ color: TEAL }}>
              <Icon className="size-[9px]" strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[8px] font-bold">{a}</span>
              <span className="block truncate text-[7px] text-white/70">{b}</span>
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="absolute right-[20px] top-[11px] flex gap-[14px]">
      {/* Chat */}
      <Handset bg="#eef2f1" bar="#f7f7f5">
        <div className="flex h-[30px] shrink-0 items-center gap-[5px] border-b border-black/[0.08] bg-[#f7f7f5] px-[6px]">
          <ChevronLeft className="size-[12px] text-black/70" aria-hidden="true" />
          <Photo {...ICON} w={19} h={19} radius={10} />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[8.5px] font-semibold">Summerhill Health</span>
            <span className="block truncate text-[6.5px] text-black/45">Business account</span>
          </span>
          <Video className="size-[10px] text-black/60" aria-hidden="true" />
          <PhoneIcon className="ml-[3px] size-[9px] text-black/60" aria-hidden="true" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-[3px] overflow-hidden px-[7px] pb-[5px]">
          <span className="self-center rounded-[5px] bg-white px-[6px] py-[1.5px] text-[6.5px] text-black/50 shadow-[0_0.5px_0.5px_rgb(11_20_26/0.13)]">Thu 15 Oct</span>
          <Bubble me time="21:42">
            Hi, my daughter Ella (6) has had a temperature and earache since lunch. Can she be seen tomorrow?
          </Bubble>
          <Bubble time="21:42">
            Sorry Ella&apos;s unwell. I can&apos;t give medical advice, but I can book her in. If she gets very drowsy, has a stiff neck or a rash that doesn&apos;t fade, call 999 now.
            <br />
            <span className="font-semibold">Tomorrow with Dr Summerhill</span> · 20-min GP appointment, £135:
          </Bubble>
          <ChatButtons items={["08:20", "09:40", "12:10"]} />
          <Bubble me time="21:43">
            08:20 please
          </Bubble>
          <Bubble time="21:43">
            <span className="font-semibold">Booked ✓</span> Fri 16 Oct, 08:20, Ella Morgan. 6 Broomfield Lane, Hale WA15 9QA. Free 2-hour parking outside. Reply CHANGE to move it.
          </Bubble>
          <ChatButtons items={["Add to calendar", "Directions"]} />
        </div>
        <div className="flex shrink-0 items-center gap-[6px] bg-[#f7f7f5] px-[7px] pb-[13px] pt-[5px] text-black/45">
          <Plus className="size-[11px]" aria-hidden="true" />
          <span className="h-[17px] flex-1 rounded-full bg-white ring-1 ring-black/[0.08]" />
          <Camera className="size-[10px]" aria-hidden="true" />
          <Mic className="size-[10px]" aria-hidden="true" />
        </div>
      </Handset>

      {/* Questionnaire */}
      <Handset bg="#202124" bar="#202124" time="22:04" dark>
        <div className="h-[6px] shrink-0" />
        <div className="flex flex-1 flex-col rounded-t-[12px] bg-white" style={LATO}>
          <div className="flex h-[27px] shrink-0 items-center justify-between border-b border-black/[0.07] px-[10px]">
            <X className="size-[10px] text-black/50" aria-hidden="true" />
            <span className="text-[8.5px] font-bold">Before your first appointment</span>
            <span className="w-[10px]" />
          </div>
          <div className="flex-1 overflow-hidden px-[10px] pt-[6px]">
            <div className="flex items-center justify-between text-[6.5px] font-bold uppercase tracking-[0.08em]" style={{ color: TEAL }}>
              <span>Step 2 of 4 · Symptoms</span>
              <span className="normal-case tracking-normal text-black/40">Sarah W.</span>
            </div>
            <div className="mt-[3px] flex gap-[2px]">
              {[1, 1, 0, 0].map((on, k) => (
                <span key={k} className="h-[3px] flex-1 rounded-full" style={{ background: on ? TEAL : MIST }} />
              ))}
            </div>
            <p className="mt-[6px] text-[8.5px] font-bold leading-[1.3]">How much has each bothered you in the last month?</p>
            {SYMPTOMS.map(([q, v]) => (
              <div key={q} className="mt-[5px]">
                <p className="text-[7.5px] leading-tight">{q}</p>
                <div className="mt-[2px] grid grid-cols-5 gap-[2px]">
                  {SCALE.map((s, k) => (
                    <span key={s} className="flex h-[14px] items-center justify-center rounded-[4px] text-[6.3px] font-bold" style={k === v ? { background: TEAL, color: "#fff" } : { background: "#f1f3f3", color: "rgb(0 0 0 / 0.45)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <p className="mt-[7px] text-[7.5px] font-bold leading-tight">Any bleeding since your periods stopped?</p>
            <div className="mt-[3px] grid grid-cols-2 gap-[3px]">
              <span className="flex h-[16px] items-center justify-center gap-[3px] rounded-[5px] text-[7.5px] font-bold" style={{ background: "#fff7ed", color: "#c2410c", boxShadow: "inset 0 0 0 1.2px #fb923c" }}>
                <Check className="size-[8px]" aria-hidden="true" /> Yes
              </span>
              <span className="flex h-[16px] items-center justify-center rounded-[5px] bg-[#f1f3f3] text-[7.5px] font-bold text-black/45">No</span>
            </div>
            <p className="mt-[5px] rounded-[5px] px-[6px] py-[4px] text-[6.8px] leading-[1.35]" style={{ background: soft(TEAL, 10), color: deep(TEAL, 70) }}>
              Thank you. Dr Summerhill will see this before your appointment. If bleeding is heavy, call NHS 111.
            </p>
          </div>
          <div className="shrink-0 px-[10px] pb-[13px] pt-[4px]">
            <span className="flex h-[24px] items-center justify-center rounded-full text-[8.5px] font-bold text-white" style={{ background: TEAL }}>
              Continue
            </span>
            <p className="mt-[3px] flex items-center justify-center gap-[3px] text-[6px] text-black/45">
              <Lock className="size-[6px]" aria-hidden="true" /> Secure form · saved to your Summerhill record
            </p>
          </div>
        </div>
      </Handset>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 02 · Console: live calls and chats, handover queue                  */
/* ------------------------------------------------------------------ */

type Convo = { ch: Ch; who: string; what: string; st: string; tone: Tone; t: string };
const LIVE: Convo[] = [
  { ch: "voice", who: "0161 ••• 905", what: "Chest pain since lunch", st: "Urgent", tone: "red", t: "live 01:12" },
  { ch: "voice", who: "07842 ••• 116", what: "Blood test: fasting?", st: "Answering", tone: "blue", t: "live 00:48" },
  { ch: "wa", who: "Sarah W.", what: "Initial consultation + form", st: "Form sent", tone: "violet", t: "6m" },
  { ch: "voice", who: "0161 ••• 482", what: "Same-day GP → 16:40", st: "Booked", tone: "green", t: "9m" },
  { ch: "wa", who: "James O.", what: "TRT follow-up → Tue", st: "Moved", tone: "green", t: "11m" },
  { ch: "wa", who: "Joan P.", what: "Home visit, Knutsford WA16", st: "Handover", tone: "amber", t: "14m" },
  { ch: "wa", who: "Helen D.", what: "Parking for 60-min visit", st: "Answered", tone: "grey", t: "18m" },
  { ch: "voice", who: "07519 ••• 230", what: "Endometriosis test: next steps", st: "Answered", tone: "grey", t: "22m" },
];

const QUEUE: { ch: Ch; who: string; why: string; color: string; note: string; wait: string }[] = [
  { ch: "voice", who: "0161 ••• 905", why: "Red flag", color: "#e11d48", note: "999 advised · doctor alerted", wait: "0:40" },
  { ch: "wa", who: "Joan P.", why: "Home visit fee", color: "#d97706", note: "WA16 · confirm travel", wait: "3:10" },
  { ch: "wa", who: "Mark T.", why: "Invoice query", color: "#7c3aed", note: "Asked for a person", wait: "6:25" },
];

export const ClinicConsole: Screen = () => (
  <Console
    path="live"
    active={0}
    title="Live conversations"
    sub="Thu 15 Oct · 58 today · 4 active now"
    right={<Segments items={["Today", "7 days"]} active={0} tint={TEAL} />}
  >
    <div className="flex h-full flex-col gap-[7px] p-[9px]">
      <div className="grid shrink-0 grid-cols-4 gap-[7px]">
        <Kpi label="Conversations" value="58" delta="+9" sub="vs last Thu" tint={TEAL} />
        <Kpi label="Resolved by agent" value="79%" delta="46 of 58" tint={TEAL} accent />
        <Kpi label="Booked by agent" value="14" delta="£2,615" sub="in fees" tint={TEAL} />
        <Kpi label="Handed to team" value="6" delta="2m 10s" sub="avg pick-up" good={false} tint={TEAL} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[236px_minmax(0,1fr)] gap-[7px]">
        <Panel title="Conversations" action={<Segments items={["All", "Phone", "WhatsApp"]} active={0} tint={TEAL} />} pad={false}>
          {LIVE.map((c) => (
            <div key={c.who} className="flex h-[27px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] last:border-b-0" style={c.tone === "red" ? { background: "#fff1f2" } : c.st === "Handover" ? { background: "#fffbeb" } : undefined}>
              <ChIcon ch={c.ch} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[8.3px] font-bold">{c.what}</span>
                <span className="block truncate text-[7px] text-black/45">
                  {c.who} · {c.t}
                </span>
              </span>
              <Pill tone={c.tone} size={6.5} dot>
                {c.st}
              </Pill>
            </div>
          ))}
        </Panel>

        <div className="flex min-h-0 flex-col gap-[7px]">
          <Panel title="Handover queue" action={<span>3 waiting · oldest 6m</span>} pad={false}>
            {QUEUE.map((q, k) => (
              <div key={q.who} className="flex h-[24px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] last:border-b-0" style={k === 0 ? { background: "#fff1f2", boxShadow: "inset 3px 0 0 #e11d48" } : undefined}>
                <ChIcon ch={q.ch} size={16} />
                <span className="w-[58px] truncate text-[8px] font-bold">{q.who}</span>
                <Tag color={q.color} size={6.8}>
                  {q.why}
                </Tag>
                <span className="min-w-0 flex-1 truncate text-[7px] text-black/50">{q.note}</span>
                <span className="text-[7px] tabular-nums text-black/50">{q.wait}</span>
              </div>
            ))}
          </Panel>

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
            <div className="flex items-center gap-[6px] border-b border-black/[0.06] px-[9px] py-[5px]">
              <ChIcon ch="voice" size={19} />
              <span className="min-w-0 leading-tight">
                <span className="block text-[9px] font-black">Live call · 0161 ••• 905</span>
                <span className="block truncate text-[7px] text-black/45">Existing patient · D. Ashworth, 58</span>
              </span>
              <span className="ml-auto flex items-center gap-[3px] text-[7.5px] font-bold text-[#be123c]">
                <span className="size-[5px] rounded-full bg-[#e11d48]" />
                01:12
              </span>
            </div>
            <div className="flex-1 space-y-[4px] overflow-hidden px-[9px] py-[5px]">
              <div className="grid grid-cols-[56px_1fr] gap-y-[1.5px] rounded-[5px] bg-[#fff1f2] px-[6px] py-[4px] text-[7px] leading-[1.35]">
                <span className="font-bold text-[#be123c]">Red flag</span>
                <span>Chest pain with a heavy left arm</span>
                <span className="text-black/45">Agent action</span>
                <span>999 advised · no booking · Dr Summerhill alerted 14:31</span>
              </div>
              <p className="text-[7.5px] leading-[1.38]">
                <span className="font-bold text-black/45">Patient · </span>Tight chest since lunch and my left arm feels heavy. Can I come in today?
              </p>
              <p className="text-[7.5px] leading-[1.38]">
                <span className="font-bold" style={{ color: TEAL }}>
                  Agent ·{" "}
                </span>
                That needs urgent care: please call 999 now. I&apos;ve alerted Dr Summerhill&apos;s team.
              </p>
            </div>
            <div className="flex gap-[5px] border-t border-black/[0.06] px-[9px] py-[5px]">
              <Btn tint={TEAL} Icon={PhoneIcon} size="sm">
                Call back now
              </Btn>
              <Btn outline size="sm">
                Mark handled
              </Btn>
              <span className="ml-auto self-center text-[6.5px] text-black/40">Transcript saved to Semble</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Console>
);

/* ------------------------------------------------------------------ */
/* 03 · Diary: the day for Dr Summerhill and the team                  */
/* ------------------------------------------------------------------ */

type Appt = { at: string; min: number; who: string; what: string; c: string; agent?: boolean; form?: "in" | "due" | "flag"; icon?: "video" | "home" };
const START = 8;
const HOURS = 5.5;
const PX = 50;
const top = (at: string) => {
  const [h, m] = at.split(":").map(Number);
  return (h - START) * PX + (m / 60) * PX;
};

const COLS: { name: string; role: string; use: number; appts: Appt[]; note?: ReactNode }[] = [
  {
    name: "Dr N. Summerhill",
    role: "Room 1 · GP",
    use: 92,
    appts: [
      { at: "08:20", min: 20, who: "Ella Morgan (6)", what: "GP · 20 min", c: PAL.blue, agent: true },
      { at: "08:40", min: 20, who: "Mark Taylor", what: "GP · from waitlist", c: PAL.blue, agent: true },
      { at: "09:00", min: 60, who: "Claire Bennett", what: "Initial consultation", c: PAL.lavender, agent: true, form: "in" },
      { at: "10:00", min: 30, who: "Robert Lane", what: "Follow-up · TRT review", c: PAL.sage },
      { at: "11:00", min: 60, who: "Rebecca Holt", what: "Initial consultation", c: PAL.lavender, agent: true, form: "due" },
      { at: "12:10", min: 20, who: "Tom Ashby", what: "GP · 20 min", c: PAL.blue, agent: true },
      { at: "12:30", min: 60, who: "Out · home visit", what: "Back 13:40 · results and letters", c: "#9ca3af" },
    ],
  },
  {
    name: "Associate GP",
    role: "Room 2 · GP",
    use: 88,
    appts: [
      { at: "08:00", min: 30, who: "Peter Walsh", what: "Follow-up", c: PAL.sage },
      { at: "08:40", min: 20, who: "Amira Shah", what: "GP · 20 min", c: PAL.blue, agent: true },
      { at: "09:20", min: 20, who: "Lucy Grant", what: "Video · 20 min", c: PAL.blue, icon: "video" },
      { at: "10:00", min: 60, who: "Hannah Lewis", what: "Initial consultation", c: PAL.lavender, agent: true, form: "flag" },
      { at: "11:20", min: 20, who: "Oliver Reid (4)", what: "Children's health", c: PAL.orange },
      { at: "12:00", min: 30, who: "Priya Nair", what: "Follow-up · video", c: PAL.sage, icon: "video" },
      { at: "12:40", min: 20, who: "Ian Brooks", what: "GP · 20 min", c: PAL.blue, agent: true },
      { at: "13:00", min: 30, who: "Admin · results", what: "Lab results and letters", c: "#9ca3af" },
    ],
  },
  {
    name: "Practice nurse",
    role: "Treatment room",
    use: 75,
    appts: [
      { at: "08:00", min: 20, who: "K. Doyle", what: "Bloods · fasting", c: PAL.pink, agent: true },
      { at: "08:20", min: 20, who: "S. Patel", what: "Bloods", c: PAL.pink },
      { at: "09:00", min: 30, who: "L. Hart", what: "Coil check", c: PAL.purple },
      { at: "09:40", min: 20, who: "R. Moss", what: "Bloods · well woman", c: PAL.pink, agent: true },
      { at: "10:30", min: 30, who: "J. Fraser", what: "Smear test", c: PAL.purple },
      { at: "11:30", min: 20, who: "B. Carter", what: "Vaccination", c: PAL.yellow },
      { at: "12:20", min: 20, who: "N. Ali", what: "Bloods", c: PAL.pink, agent: true },
    ],
  },
  {
    name: "Home visits",
    role: "Dr Summerhill · pm",
    use: 50,
    appts: [{ at: "12:40", min: 50, who: "Margaret Hughes (84)", what: "Home visit · Bowdon WA14", c: PAL.orange, agent: true, icon: "home" }],
    note: (
      <div className="absolute inset-x-[4px] top-[6px] rounded-[6px] bg-white p-[5px] text-[6.8px] leading-[1.35] ring-1 ring-black/[0.07]">
        <p className="flex items-center gap-[3px] font-bold">
          <MapPin className="size-[7px]" style={{ color: TEAL }} aria-hidden="true" /> Postcode check
        </p>
        <p className="mt-[2px] flex items-center justify-between">
          WA14 Bowdon <Pill tone="green" size={6}>In area</Pill>
        </p>
        <p className="mt-[2px] flex items-center justify-between">
          WA16 Knutsford <Pill tone="amber" size={6}>Team</Pill>
        </p>
        <p className="mt-[2px] text-black/45">Fee from £165 by distance</p>
      </div>
    ),
  },
];

function ApptBlock({ a }: { a: Appt }) {
  const h = (a.min / 60) * PX - 2;
  const tall = h > 26;
  return (
    <div
      className="absolute inset-x-[3px] overflow-hidden rounded-[4px] px-[4px] py-[1.5px] leading-tight"
      style={{ top: top(a.at) + 1, height: h, background: soft(a.c, 34), boxShadow: `inset 2.5px 0 0 ${a.c}`, color: INK }}
    >
      <span className="flex items-center gap-[2.5px]">
        <span className="text-[6.3px] tabular-nums text-black/45">{a.at}</span>
        <span className="min-w-0 truncate text-[7.2px] font-bold">{a.who}</span>
        <span className="ml-auto flex shrink-0 items-center gap-[2px]">
          {a.icon === "video" && <Video className="size-[7px] text-black/50" aria-hidden="true" />}
          {a.icon === "home" && <House className="size-[7px] text-black/50" aria-hidden="true" />}
          {a.form === "in" && <ClipboardList className="size-[7px]" style={{ color: TEAL }} aria-hidden="true" />}
          {a.form === "due" && <ClipboardList className="size-[7px] text-[#d97706]" aria-hidden="true" />}
          {a.form === "flag" && <TriangleAlert className="size-[7px] text-[#e11d48]" aria-hidden="true" />}
          {a.agent && <AgentMark size={8} />}
        </span>
      </span>
      {tall ? <span className="mt-[1px] block truncate text-[6.6px] text-black/55">{a.what}</span> : null}
    </div>
  );
}

export const TeamDiary: Screen = () => (
  <Console
    path="diary/2026-10-16"
    active={2}
    title="Diary · Fri 16 October"
    sub="Hale clinic · 31 appointments · 12 booked by the agent · 2 slots free"
    right={
      <>
        <span className="flex items-center gap-[2px] text-black/50">
          <ChevronLeft className="size-[10px]" aria-hidden="true" />
          <span className="text-[8px] font-bold text-black/70">Today</span>
          <ChevronRight className="size-[10px]" aria-hidden="true" />
        </span>
        <Segments items={["Day", "Week"]} active={0} tint={TEAL} />
      </>
    }
  >
    <div className="flex h-full flex-col px-[8px] pb-[5px] pt-[7px]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
        <div className="grid h-[33px] shrink-0 grid-cols-[30px_repeat(4,minmax(0,1fr))] border-b border-black/[0.07]">
          <span />
          {COLS.map((c) => (
            <div key={c.name} className="flex flex-col justify-center border-l border-black/[0.06] px-[5px] leading-tight">
              <span className="flex items-center justify-between gap-[3px]">
                <span className="truncate text-[8px] font-black">{c.name}</span>
                <span className="text-[6.5px] font-bold tabular-nums" style={{ color: TEAL }}>
                  {c.use}%
                </span>
              </span>
              <span className="truncate text-[6.5px] text-black/45">{c.role}</span>
              <span className="mt-[2px]">
                <Bar pct={c.use} color={TEAL} h={2} />
              </span>
            </div>
          ))}
        </div>
        <div className="relative grid min-h-0 flex-1 grid-cols-[30px_repeat(4,minmax(0,1fr))]" style={{ height: HOURS * PX }}>
          <div className="relative">
            {Array.from({ length: Math.ceil(HOURS) + 1 }).map((_, k) => (
              <span key={k} className="absolute right-[4px] -translate-y-1/2 text-[6.5px] tabular-nums text-black/40" style={{ top: k * PX || 5 }}>
                {String(START + k).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          {COLS.map((c, ci) => (
            <div key={c.name} className="relative border-l border-black/[0.06]" style={ci === 3 ? { background: "repeating-linear-gradient(135deg, transparent 0 5px, rgb(0 0 0 / 0.025) 5px 10px)" } : undefined}>
              {Array.from({ length: Math.ceil(HOURS) }).map((_, k) => (
                <span key={k} className="absolute inset-x-0 border-t border-dashed border-black/[0.06]" style={{ top: k * PX }} />
              ))}
              {c.note}
              {c.appts.map((a) => (
                <ApptBlock key={a.at + a.who} a={a} />
              ))}
              {ci === 0 && (
                <div className="absolute inset-x-[3px] flex items-center justify-center rounded-[4px] border border-dashed text-[6.6px] font-bold" style={{ top: top("10:30") + 1, height: (30 / 60) * PX - 2, borderColor: TEAL, color: TEAL, background: soft(TEAL, 6) }}>
                  Free · offered to waitlist
                </div>
              )}
            </div>
          ))}
          <div className="pointer-events-none absolute left-[26px] right-0 flex items-center" style={{ top: top("09:24") }}>
            <span className="size-[5px] rounded-full bg-[#e11d48]" />
            <span className="h-px flex-1 bg-[#e11d48]" />
          </div>
        </div>
      </div>
      <div className="flex h-[17px] shrink-0 items-center gap-[8px] pt-[3px] text-[6.8px] text-black/55">
        <Legend
          items={[
            { label: "GP 20 min", color: PAL.blue },
            { label: "Initial 60 min", color: PAL.lavender },
            { label: "Follow-up", color: PAL.sage },
            { label: "Bloods", color: PAL.pink },
            { label: "Women's health", color: PAL.purple },
            { label: "Home / child", color: PAL.orange },
          ]}
        />
        <span className="ml-auto flex items-center gap-[3px]">
          <AgentMark size={8} /> booked by agent
        </span>
        <span className="flex items-center gap-[2px]">
          <ClipboardList className="size-[7px]" style={{ color: TEAL }} aria-hidden="true" /> form in
        </span>
      </div>
    </div>
  </Console>
);

/* ------------------------------------------------------------------ */
/* 04 · Questionnaire review                                           */
/* ------------------------------------------------------------------ */

const DUE: { who: string; what: string; when: string; st: string; tone: Tone }[] = [
  { who: "Sarah Whitfield", what: "Initial consultation", when: "Tue 20 Oct · 10:00", st: "2 flags", tone: "red" },
  { who: "Claire Bennett", what: "Initial consultation", when: "Fri 16 Oct · 09:00", st: "Reviewed", tone: "green" },
  { who: "Hannah Lewis", what: "Initial consultation", when: "Fri 16 Oct · 10:00", st: "1 flag", tone: "amber" },
  { who: "Rebecca Holt", what: "Initial consultation", when: "Fri 16 Oct · 11:00", st: "Reminder sent", tone: "grey" },
  { who: "Daniel Price", what: "Men's health check", when: "Mon 19 Oct · 08:00", st: "Complete", tone: "blue" },
  { who: "Grace O'Neill", what: "Menopause review", when: "Wed 21 Oct · 11:00", st: "Complete", tone: "blue" },
  { who: "Amira Kerr", what: "Coil fitting", when: "Thu 22 Oct · 09:00", st: "Complete", tone: "blue" },
];

const MRS: [string, number, number][] = [
  ["Somatic", 10, 16],
  ["Psychological", 10, 16],
  ["Urogenital", 4, 12],
];

const TOP_ITEMS: [string, number][] = [
  ["Sleep problems", 4],
  ["Hot flushes, sweating", 3],
  ["Anxiety", 3],
];

const FLAGS: { level: "red" | "amber" | "grey"; title: string; detail: string }[] = [
  { level: "red", title: "Bleeding after periods stopped", detail: "Last period Mar 2025 · spotting twice in Sep. Safety-netted to NHS 111." },
  { level: "amber", title: "Migraine with aura", detail: "Relevant to the HRT route. Since age 30, about monthly." },
  { level: "grey", title: "Takes sertraline 50 mg", detail: "Started 2024 · prescribed by NHS GP" },
];
const FLAG_C = { red: "#e11d48", amber: "#d97706", grey: "#64748b" };

function Dots({ v }: { v: number }) {
  return (
    <span className="flex gap-[2px]">
      {[0, 1, 2, 3].map((k) => (
        <span key={k} className="size-[5px] rounded-full" style={{ background: k < v ? TEAL : MIST }} />
      ))}
    </span>
  );
}

export const QuestionnaireReview: Screen = () => (
  <Console path="questionnaires/sarah-whitfield" active={3} title="Questionnaires" sub="Collected on WhatsApp before the appointment · 6 due this week">
    <div className="grid h-full grid-cols-[164px_minmax(0,1fr)] gap-[7px] p-[8px]">
      <Panel title="Due this week" action={<span>Flagged first</span>} pad={false}>
        {DUE.map((d, k) => (
          <div key={d.who} className="flex h-[36px] items-center gap-[5px] border-b border-black/[0.05] px-[7px] last:border-b-0" style={k === 0 ? { background: soft(TEAL, 8), boxShadow: `inset 3px 0 0 ${TEAL}` } : undefined}>
            <Avatar text={d.who.split(" ").map((p) => p[0]).join("")} i={k} size={18} />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[8px] font-bold">{d.who}</span>
              <span className="block truncate text-[6.6px] text-black/50">{d.what}</span>
              <span className="block truncate text-[6.6px] text-black/40">{d.when}</span>
            </span>
            <Pill tone={d.tone} size={6}>
              {d.st}
            </Pill>
          </div>
        ))}
      </Panel>

      <div className="flex min-h-0 flex-col gap-[6px]">
        <div className="flex shrink-0 items-center gap-[7px] rounded-[8px] bg-white px-[9px] py-[6px] ring-1 ring-black/[0.07]">
          <Avatar text="SW" i={0} size={26} />
          <div className="min-w-0 leading-tight">
            <p className="text-[10px] font-black">Sarah Whitfield · 51 · new patient</p>
            <p className="truncate text-[7.3px] text-black/50">Initial consultation · 60 min · Tue 20 Oct, 10:00 · Dr Summerhill</p>
            <p className="mt-[3px] flex gap-[3px]">
              <Tag color={TEAL} size={6.5}>
                <Sparkles className="size-[6px]" aria-hidden="true" /> Booked by agent · WhatsApp
              </Tag>
              <Tag color="#64748b" size={6.5}>
                Completed Thu 15 Oct, 22:05
              </Tag>
            </p>
          </div>
          <span className="ml-auto flex flex-col items-end gap-[3px]">
            <Btn tint={TEAL} Icon={Check} size="sm">
              Mark reviewed
            </Btn>
            <Btn outline size="sm">
              Message Sarah
            </Btn>
          </span>
        </div>

        <div className="grid min-h-0 shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-[6px]">
          <Panel title="Menopause score (MRS)" action={<span>0–4 × 11</span>}>
            <div className="flex items-end gap-[8px]">
              <span className="text-[22px] font-black leading-none tracking-[-0.03em]">
                24<span className="text-[10px] font-bold text-black/35"> / 44</span>
              </span>
              <Tag color="#e11d48" size={7}>
                Severe (17+)
              </Tag>
            </div>
            <div className="mt-[6px] space-y-[4px]">
              {MRS.map(([d, v, max]) => (
                <div key={d} className="grid grid-cols-[60px_1fr_24px] items-center gap-[5px] text-[7px]">
                  <span className="text-black/60">{d}</span>
                  <Bar pct={(v / max) * 100} color={TEAL} h={4} />
                  <span className="text-right font-bold tabular-nums">
                    {v}/{max}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-[6px] space-y-[3px] border-t border-black/[0.06] pt-[5px]">
              {TOP_ITEMS.map(([q, v]) => (
                <div key={q} className="flex items-center justify-between gap-[4px] text-[7px]">
                  <span className="truncate">{q}</span>
                  <Dots v={v} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="For Dr Summerhill" action={<Pill tone="red" size={6.3}>2 to review</Pill>} pad={false}>
            {FLAGS.map((f) => (
              <div key={f.title} className="flex gap-[6px] border-b border-black/[0.05] px-[8px] py-[5px] last:border-b-0" style={{ boxShadow: `inset 2.5px 0 0 ${FLAG_C[f.level]}` }}>
                <TriangleAlert className="mt-[1px] size-[9px] shrink-0" style={{ color: FLAG_C[f.level] }} aria-hidden="true" />
                <span className="min-w-0 leading-[1.35]">
                  <span className="block text-[7.8px] font-bold">{f.title}</span>
                  <span className="block text-[6.8px] text-black/55">{f.detail}</span>
                </span>
              </div>
            ))}
            <p className="px-[8px] py-[4px] text-[6.5px] leading-[1.35] text-black/45">The agent gave no advice. Flags are for the doctor only.</p>
          </Panel>
        </div>

        <Panel title="Medical history" action={<span className="flex items-center gap-[3px]"><Check className="size-[7px]" style={{ color: TEAL }} aria-hidden="true" /> Saved to Semble record</span>} className="min-h-0 flex-1">
          <div className="grid grid-cols-2 gap-x-[12px] gap-y-[3px] text-[7.2px]">
            {[
              ["Allergies", "Penicillin (rash)"],
              ["Current HRT", "None"],
              ["Family history", "Breast cancer, mother, 62"],
              ["BMI (self-reported)", "27.4"],
              ["Smoking", "Never"],
              ["Share with NHS GP", "Yes"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between gap-[6px] border-b border-black/[0.05] pb-[2px]">
                <span className="text-black/50">{k}</span>
                <span className="truncate text-right font-bold">{v}</span>
              </p>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  </Console>
);

/* ------------------------------------------------------------------ */
/* 05 · Analytics on the practice laptop + morning summary on a phone  */
/* ------------------------------------------------------------------ */

// Enquiries by hour of day across October (0-23). Opening hours are 08:00-18:00.
const CLOSED = "#3fd0da";
const BY_HOUR = [6, 3, 2, 1, 2, 5, 14, 38, 96, 112, 98, 84, 71, 78, 82, 74, 69, 58, 52, 61, 66, 58, 41, 20];
const REQUESTS: [string, number, number][] = [
  ["Book a same-day GP slot", 22, 94],
  ["Fees and which appointment", 17, 98],
  ["Reschedule or cancel", 14, 99],
  ["Clinical question → team", 6, 0],
];

export const AnalyticsDevices: Screen = () => (
  <div className="relative h-full w-full overflow-hidden" style={{ ...LATO, color: INK, background: `linear-gradient(160deg, ${CREAM}, ${MIST})` }}>
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
      <path d="M380 0 C 470 90 560 120 640 90 L640 0 Z" fill={TEAL} />
      <path d="M0 360 C 160 330 320 390 640 350 L640 400 L0 400 Z" fill="#fff" opacity="0.7" />
    </svg>
    <p className="absolute left-[30px] top-[10px] text-[18px] leading-none" style={{ ...SCRIPT, color: TEAL }}>
      October, at a glance.
    </p>

    <div className="absolute left-[40px] top-[34px]">
      <Laptop w={430} h={318}>
        <div className="flex h-full flex-col" style={{ ...LATO, color: INK, background: "#f4f6f6" }}>
          <div className="flex h-[24px] shrink-0 items-center gap-[6px] px-[8px] text-white" style={{ background: TEAL }}>
            <Photo {...LOGO_WHITE} w={24} h={17} />
            <span className="text-[8.5px] font-black">Analytics</span>
            <span className="text-[7px] text-white/70">1–31 Oct 2026 · phone + WhatsApp</span>
            <span className="ml-auto flex items-center gap-[3px] rounded-full bg-white/15 px-[6px] py-[2px] text-[6.5px] font-bold">
              October <ChevronDown className="size-[6px]" aria-hidden="true" />
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-[5px] p-[6px]">
            <div className="grid shrink-0 grid-cols-4 gap-[5px]">
              <Kpi label="Enquiries" value="1,284" delta="+21%" sub="vs Sep" tint={TEAL} />
              <Kpi label="Resolved by agent" value="78%" delta="1,002" tint={TEAL} accent />
              <Kpi label="Answer time" value="3.2s" delta="24/7" tint={TEAL} />
              <Kpi label="Missed appts" value="4.1%" delta="was 6.6%" tint={TEAL} />
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_118px] gap-[5px]">
              <Panel title="Enquiries by hour" action={<Legend items={[{ label: "Open 8–6", color: TEAL }, { label: "Closed · 38%", color: CLOSED }]} />} pad={false}>
                <div className="px-[8px] pb-[4px] pt-[7px]">
                  <BarChart
                    w={262}
                    h={74}
                    bars={BY_HOUR.map((v, k) => (k < 8 || k >= 18 ? [0, v] : [v, 0]))}
                    colors={[TEAL, CLOSED]}
                    max={120}
                    gap={0.25}
                    yFormat={(n) => String(Math.round(n))}
                    labels={BY_HOUR.map((_, k) => (k % 3 === 0 ? String(k).padStart(2, "0") : ""))}
                  />
                </div>
              </Panel>
              <Panel title="Channel">
                <div className="flex flex-col items-center gap-[5px]">
                  <Donut size={50} stroke={8} segments={[{ value: 54, color: TEAL }, { value: 46, color: "#22c55e" }]}>
                    <span className="text-[10px] font-black">1,284</span>
                    <span className="text-[6px] text-black/45">enquiries</span>
                  </Donut>
                  <div className="w-full space-y-[2px] text-[7px]">
                    <p className="flex justify-between">
                      <span className="flex items-center gap-[3px]">
                        <span className="size-[5px] rounded-[1.5px]" style={{ background: TEAL }} /> Phone
                      </span>
                      <b>54%</b>
                    </p>
                    <p className="flex justify-between">
                      <span className="flex items-center gap-[3px]">
                        <span className="size-[5px] rounded-[1.5px] bg-[#22c55e]" /> WhatsApp
                      </span>
                      <b>46%</b>
                    </p>
                  </div>
                </div>
              </Panel>
            </div>
            <Panel title="Top requests" action={<span>share · resolved by agent</span>} pad={false} className="shrink-0">
              {REQUESTS.map(([r, share, res]) => (
                <div key={r} className="grid h-[15px] grid-cols-[minmax(0,1fr)_90px_34px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] text-[7px] last:border-b-0">
                  <span className="truncate">{r}</span>
                  <span className="flex items-center gap-[4px]">
                    <Bar pct={share * 4} color={TEAL} h={3} />
                    <span className="w-[18px] text-right tabular-nums text-black/55">{share}%</span>
                  </span>
                  <span className="text-right font-bold tabular-nums" style={{ color: res ? TEAL : "#d97706" }}>
                    {res ? `${res}%` : "team"}
                  </span>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      </Laptop>
    </div>

    <div className="absolute right-[34px] top-[52px]">
      <Phone w={150} h={312} bg="#eef2f1" bar="#f7f7f5">
        <div className="flex h-[26px] shrink-0 items-center gap-[4px] border-b border-black/[0.07] bg-[#f7f7f5] px-[6px]" style={SYS}>
          <ChevronLeft className="size-[10px] text-black/60" aria-hidden="true" />
          <Photo {...ICON} w={16} h={16} radius={8} />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[7.5px] font-semibold">Summerhill agent</span>
            <span className="block truncate text-[6px] text-black/45">to Practice manager</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-[3px] overflow-hidden px-[6px] pb-[5px]" style={SYS}>
          <span className="self-center rounded-[5px] bg-white px-[5px] py-[1px] text-[6px] text-black/50">Fri 16 Oct · 07:30</span>
          <div className="rounded-[8px] rounded-tl-[2px] bg-white px-[7px] py-[5px] text-[7px] leading-[1.4] shadow-[0_0.5px_0.5px_rgb(11_20_26/0.14)]">
            <p className="text-[15px] leading-none" style={{ ...SCRIPT, color: TEAL }}>
              Good morning.
            </p>
            <p className="mt-[3px] font-bold">Overnight, 18:00–08:00</p>
            {[
              ["11", "enquiries, 8 resolved by me"],
              ["6", "appointments booked · £1,075"],
              ["1", "urgent call: 999 advised 22:14, called back ✓"],
              ["3", "questionnaires in · 1 flagged"],
              ["2", "cancellations refilled from the waitlist"],
            ].map(([n, t]) => (
              <p key={t} className="mt-[2px] flex gap-[4px]">
                <b className="w-[10px] shrink-0 text-right" style={{ color: TEAL }}>
                  {n}
                </b>
                <span>{t}</span>
              </p>
            ))}
            <p className="mt-[4px] border-t border-black/[0.06] pt-[3px] text-black/60">Today: 31 appointments, 2 free slots, 1 home visit.</p>
            <span className="float-right text-[5.5px] text-black/35">07:30</span>
          </div>
          <span className="flex h-[17px] items-center justify-center rounded-[6px] bg-white text-[7px] font-semibold shadow-[0_0.5px_0.5px_rgb(11_20_26/0.14)]" style={{ color: TEAL }}>
            Open console
          </span>
        </div>
      </Phone>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 06 · Reminders and no-show tracker                                  */
/* ------------------------------------------------------------------ */

const UPCOMING: { who: string; appt: string; type: string; d2: string; am: string; reply: string; tone: Tone }[] = [
  { who: "Sarah Whitfield", appt: "Tue 20 · 10:00", type: "Initial · 60", d2: "Sun 18:00", am: "Tue 07:30", reply: "Confirmed", tone: "green" },
  { who: "James Okafor", appt: "Mon 19 · 10:00", type: "Follow-up · 30", d2: "Sat 10:00", am: "—", reply: "Moved → Tue 09:40", tone: "blue" },
  { who: "Emma Clarke", appt: "Mon 19 · 09:20", type: "Video · 20", d2: "Sat 09:20", am: "Mon 07:30", reply: "Confirmed", tone: "green" },
  { who: "George Hill", appt: "Tue 20 · 08:40", type: "GP · 20", d2: "Sun 08:40", am: "Tue 07:00", reply: "No reply · calling", tone: "amber" },
  { who: "Grace O'Neill", appt: "Wed 21 · 11:00", type: "Menopause review", d2: "Mon 11:00", am: "Wed 07:30", reply: "Confirmed", tone: "green" },
  { who: "Daniel Price", appt: "Mon 19 · 08:00", type: "Men's health", d2: "Sat 08:00", am: "—", reply: "Cancelled · no fee", tone: "grey" },
  { who: "Isla Moore (4)", appt: "Thu 22 · 15:20", type: "Children's", d2: "Tue 15:20", am: "Thu 07:30", reply: "Scheduled", tone: "violet" },
];
const COLS6 = "minmax(0,1fr) 60px 30px minmax(0,1.15fr)";

export const RemindersTracker: Screen = () => (
  <Console
    path="reminders"
    active={4}
    title="Reminders"
    sub="19–23 Oct · 142 appointments · free changes until 6 pm the day before"
    right={<Segments items={["Next 7 days", "30 days"]} active={0} tint={TEAL} />}
  >
    <div className="flex h-full flex-col gap-[7px] p-[9px]">
      <div className="grid shrink-0 grid-cols-4 gap-[7px]">
        <Kpi label="Confirmed" value="118" delta="83%" sub="of 142" tint={TEAL} />
        <Kpi label="Moved with one tap" value="14" delta="0 calls" sub="needed" tint={TEAL} />
        <Kpi label="Late cancellations" value="3" delta="50% fee" sub="per policy" good={false} tint={TEAL} />
        <Kpi label="Missed, last 30 days" value="4.1%" delta="−38%" sub="vs before" tint={TEAL} accent />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_160px] gap-[7px]">
        <Panel title="Upcoming" action={<span>2 days before + same morning</span>} pad={false}>
          <Th cols={COLS6}>
            <span>Patient</span>
            <span>Appointment</span>
            <span>Sent</span>
            <span>Reply</span>
          </Th>
          {UPCOMING.map((u) => (
            <Tr key={u.who} cols={COLS6} h={27} highlight={u.tone === "amber" ? "#fffbeb" : undefined}>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[7.8px] font-bold">{u.who}</span>
                <span className="block truncate text-[6.6px] text-black/50">{u.type}</span>
              </span>
              <span className="truncate text-[7.2px] tabular-nums">{u.appt}</span>
              <span className="flex items-center gap-[2px]" title={`2-day reminder ${u.d2}; morning ${u.am}`}>
                <span className="flex size-[9px] items-center justify-center rounded-full" style={{ background: u.d2 ? TEAL : MIST, color: "#fff" }}>
                  <Check className="size-[6px]" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="flex size-[9px] items-center justify-center rounded-full" style={u.am === "—" ? { background: MIST } : { boxShadow: `inset 0 0 0 1.2px ${TEAL}`, color: TEAL }}>
                  <Clock className="size-[5.5px]" strokeWidth={3} aria-hidden="true" />
                </span>
              </span>
              <span className="min-w-0 overflow-hidden">
                <Pill tone={u.tone} size={6.3} dot>
                  {u.reply}
                </Pill>
              </span>
            </Tr>
          ))}
        </Panel>

        <div className="flex min-h-0 flex-col gap-[7px]">
          <Panel title="No-shows" action={<span>% of bookings</span>}>
            <div className="relative">
            <LineChart
              w={138}
              h={64}
              max={8}
              min={2}
              grid={3}
              yFormat={(n) => `${n}%`}
              labels={["Apr", "", "Jun", "", "Aug", "", "Oct"]}
              series={[{ values: [6.8, 6.4, 6.6, 5.2, 4.4, 4.0, 4.1], color: TEAL, area: true }]}
            />
              <span className="absolute top-[2px] h-[48px] border-l border-dashed border-black/35" style={{ left: 26 + (3 / 6) * 110 }} aria-hidden="true" />
            </div>
            <p className="mt-[3px] flex items-center gap-[4px] text-[6.6px] text-black/50">
              <span className="h-[8px] w-px border-l border-dashed border-black/40" /> Agent live from 1 Jul
            </p>
          </Panel>
          <Panel title="Waitlist" action={<span>3 waiting</span>} pad={false} className="min-h-0 flex-1">
            <div className="m-[6px] rounded-[6px] p-[5px] text-[6.8px] leading-[1.4]" style={{ background: soft(TEAL, 9) }}>
              <p className="font-bold" style={{ color: deep(TEAL, 75) }}>
                Fri 16 · 08:40 freed at 18:52
              </p>
              <p className="text-black/60">Offered to 3 on WhatsApp · Mark T. took it in 3 min</p>
            </div>
            {[
              ["Ruth Allen", "Any GP slot before Wed"],
              ["Sophie Ward", "Video, after 5 pm"],
            ].map(([n, w], k) => (
              <div key={n} className="flex h-[21px] items-center gap-[5px] border-t border-black/[0.05] px-[7px]">
                <Avatar text={n.split(" ").map((p) => p[0]).join("")} i={k + 2} size={14} />
                <span className="text-[7.3px] font-bold">{n}</span>
                <span className="ml-auto truncate text-[6.5px] text-black/45">{w}</span>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </div>
  </Console>
);

export const summerhillScreens: Screen[] = [ChatBooking, ClinicConsole, TeamDiary, QuestionnaireReview, AnalyticsDevices, RemindersTracker];
