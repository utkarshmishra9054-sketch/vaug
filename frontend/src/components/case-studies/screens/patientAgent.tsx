import type { ReactNode } from "react";
import {
  BookOpen,
  Camera,
  ChartColumn,
  CheckCheck,
  ChevronLeft,
  ClipboardList,
  EllipsisVertical,
  Headset,
  Hospital,
  LayoutDashboard,
  MessageCircle,
  Mic,
  Phone as PhoneIcon,
  PhoneCall,
  PhoneForwarded,
  Plus,
  Settings,
  TriangleAlert,
  UserRound,
  Video,
  X,
} from "lucide-react";

import { Avatar, Bar, BarChart, Browser, Btn, Kpi, Legend, LineChart, Panel, Pill, Segments, Select, Sidebar, Tag, Th, TONES, TopBar, Tr, type Screen, type Tone } from "./kit";
import { Photo } from "./tools";

/* Patient WhatsApp + voice agent · Manchester diagnostics network (brand: Summerhill Health) */

const BRAND = "Summerhill Health";
const URL = "console.summerhillhealth.co.uk";
const LOGO = { src: "/logos/summerhill-health.webp", img: { w: 172, h: 120 } };
const WA = "#008069";
const WA_BG = "#efeae2";
const soft = (tint: string, pct = 8) => `color-mix(in oklab, ${tint} ${pct}%, white)`;

const NAV = [
  { label: "Live", Icon: LayoutDashboard, badge: 38 },
  { label: "Handovers", Icon: Headset, badge: 7 },
  { label: "Forms", Icon: ClipboardList, badge: 12 },
  { label: "Analytics", Icon: ChartColumn },
  { label: "Centres", Icon: Hospital },
  { label: "Knowledge", Icon: BookOpen },
  { label: "Settings", Icon: Settings },
];
const USER = { name: "Claire Whitworth", role: "Booking team lead", initials: "CW" };

/** The kit sidebar with the real Summerhill Health logo over its brand row. */
function AppSidebar({ tint, active }: { tint: string; active: number }) {
  return (
    <div className="relative h-full shrink-0">
      <Sidebar tint={tint} brand={BRAND} mark="S" items={NAV} active={active} user={USER} />
      <div className="absolute left-0 right-[1px] top-0 flex h-[40px] items-center bg-[#fbfbfa] px-[12px] pt-[4px]">
        <Photo {...LOGO} w={43} h={30} />
      </div>
    </div>
  );
}

/* 01 · WhatsApp booking + questionnaire ----------------------------- */

const SYS = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };
const WA_LINK = "#027eb5";

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
        <rect x="2" y="2" width="6" height="4" rx="1" fill="currentColor" />
        <rect x="16.3" y="2.6" width="1.2" height="2.8" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </span>
  );
}

/** A plain phone: bezel, status bar, home indicator. */
function Handset({ children, bg = "#fff", bar = "#fff", time = "10:16", dark = false }: { children: ReactNode; bg?: string; bar?: string; time?: string; dark?: boolean }) {
  return (
    <div className="h-[378px] w-[184px] rounded-[30px] bg-[#1d1d1f] p-[4px] shadow-[0_1px_2px_rgb(0_0_0/0.25),0_16px_32px_-18px_rgb(0_0_0/0.45)]" style={SYS}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] text-[#111b21]" style={{ background: bg }}>
        <div className={`relative flex h-[24px] shrink-0 items-center justify-between px-[16px] pt-[2px] text-[8.5px] font-semibold ${dark ? "text-white" : ""}`} style={{ background: bar }}>
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

function Ticks() {
  return (
    <svg width="11" height="7" viewBox="0 0 16 11" aria-hidden="true">
      <path d="M1 5.8 4 8.8 10.5 1.8 M6.2 8.6 7 9.3 14.8 1.2" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WaBubble({ me = false, time, children, tail = false }: { me?: boolean; time: string; children: ReactNode; tail?: boolean }) {
  return (
    <div
      className={`relative max-w-[86%] px-[6px] pb-[3px] pt-[4px] text-[8px] leading-[1.35] shadow-[0_0.5px_0.5px_rgb(11_20_26/0.13)] ${me ? "self-end bg-[#d9fdd3]" : "self-start bg-white"} ${tail ? (me ? "rounded-[7px] rounded-tr-none" : "rounded-[7px] rounded-tl-none") : "rounded-[7px]"}`}
    >
      {children}
      <span className="float-right ml-[6px] mt-[3px] flex translate-y-[2px] items-center gap-[2px] text-[6px] text-[#667781]">
        {time}
        {me && <Ticks />}
      </span>
    </div>
  );
}

export const WhatsAppBooking: Screen = ({ tint }) => (
  <div className="flex h-full w-full items-center justify-center gap-[28px]" style={{ background: `color-mix(in oklab, ${tint} 7%, #f2f2f0)` }}>
    <Handset bg={WA_BG} bar="#f6f5f3">
      <div className="flex h-[30px] shrink-0 items-center gap-[5px] border-b border-black/[0.08] bg-[#f6f5f3] px-[6px]">
        <ChevronLeft className="size-[13px] text-[#111b21]" aria-hidden="true" />
        <span className="flex size-[20px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/[0.08]">
          <Photo {...LOGO} crop={{ x: 54, y: 0, w: 64, h: 62 }} w={15} h={15} />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-center gap-[2px] truncate text-[8.5px] font-semibold">
            Summerhill Health
            <svg width="8" height="8" viewBox="0 0 10 10" className="shrink-0" aria-hidden="true">
              <circle cx="5" cy="5" r="5" fill="#1d9bf0" />
              <path d="M2.9 5.1 4.4 6.5 7.2 3.6" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="block truncate text-[6.5px] text-[#667781]">Business account</span>
        </span>
        <Video className="size-[11px] text-[#111b21]" aria-hidden="true" />
        <PhoneIcon className="ml-[4px] size-[10px] text-[#111b21]" aria-hidden="true" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[3px] overflow-hidden px-[8px] pb-[5px]">
        <span className="self-center rounded-[5px] bg-white px-[6px] py-[1.5px] text-[6.5px] text-[#54656f] shadow-[0_0.5px_0.5px_rgb(11_20_26/0.13)]">Today</span>
        <span className="mx-[6px] self-center rounded-[5px] bg-[#ffeecd] px-[6px] py-[3px] text-center text-[6px] leading-[1.35] text-[#54656f]">
          This business uses a secure service from Meta to manage this chat. Tap to learn more.
        </span>
        <WaBubble me tail time="10:14">
          Hi, I need to book the knee MRI my GP referred me for. I&apos;m with Bupa
        </WaBubble>
        <WaBubble tail time="10:14">
          Thanks Joanne, I&apos;ve found your referral SH-58213 (MRI left knee). Earliest slots:
          <br />
          Salford Quays · Thu 1 Oct, 14:30
          <br />
          Stockport · Fri 2 Oct, 09:10
        </WaBubble>
        <WaBubble me tail time="10:15">
          salford thursday please
        </WaBubble>
        <div className="flex max-w-[86%] flex-col self-start">
          <WaBubble tail time="10:15">
            Booked for Thu 1 Oct, 14:30 at Salford Quays (ref A-2291). Please fill in the MRI safety form before your scan.
          </WaBubble>
          <span className="mt-[1.5px] flex h-[20px] items-center justify-center gap-[3px] rounded-[7px] bg-white text-[8px] font-medium shadow-[0_0.5px_0.5px_rgb(11_20_26/0.13)]" style={{ color: WA_LINK }}>
            <ClipboardList className="size-[8px]" aria-hidden="true" />
            Open form
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-[6px] bg-[#f6f5f3] px-[7px] pb-[14px] pt-[5px] text-[#54656f]">
        <Plus className="size-[12px]" aria-hidden="true" />
        <span className="h-[18px] flex-1 rounded-full bg-white ring-1 ring-black/[0.08]" />
        <Camera className="size-[11px]" aria-hidden="true" />
        <Mic className="size-[11px]" aria-hidden="true" />
      </div>
    </Handset>

    <Handset bg="#1a1a1a" bar="#1a1a1a" time="10:17" dark>
      <div className="h-[8px] shrink-0 bg-[#1a1a1a]" />
      <div className="flex flex-1 flex-col rounded-t-[10px] bg-white">
        <div className="flex h-[28px] shrink-0 items-center justify-between border-b border-black/[0.07] px-[10px]">
          <X className="size-[11px] text-[#54656f]" aria-hidden="true" />
          <span className="text-[8.5px] font-semibold">MRI safety questions</span>
          <EllipsisVertical className="size-[10px] text-[#54656f]" aria-hidden="true" />
        </div>
        <div className="flex-1 overflow-hidden px-[11px] pt-[7px]">
          <p className="text-[7px] text-[#667781]">Section 2 of 5 · Implants and metal</p>
          {[
            { q: "Do you have a pacemaker or implanted defibrillator?", a: "No" },
            { q: "Have you ever had metal fragments in your eyes, e.g. from welding or grinding?", a: "Yes" },
          ].map((x) => (
            <div key={x.q} className="mt-[7px]">
              <p className="text-[8px] font-semibold leading-[1.3]">{x.q}</p>
              <div className="mt-[3px]">
                {["Yes", "No", "Not sure"].map((o) => (
                  <div key={o} className="flex h-[19px] items-center justify-between border-b border-black/[0.06] text-[8px]">
                    {o}
                    <span className="flex size-[10px] items-center justify-center rounded-full" style={{ boxShadow: `inset 0 0 0 1.2px ${o === x.a ? WA : "rgb(0 0 0 / 0.3)"}` }}>
                      {o === x.a && <span className="size-[5px] rounded-full" style={{ background: WA }} />}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-[8px] rounded-[5px] px-[6px] pb-[4px] pt-[3px] ring-1" style={{ boxShadow: `inset 0 0 0 1.2px ${WA}` }}>
            <p className="text-[6.5px]" style={{ color: WA }}>
              Please give details
            </p>
            <p className="text-[8px]">
              Welder 2006–2011. Had a bit of metal taken out of my eye once
              <span className="ml-[1px] inline-block h-[8px] w-[1px] translate-y-[1px] bg-[#111b21]" />
            </p>
          </div>
        </div>
        <div className="shrink-0 px-[11px] pb-[14px]">
          <span className="flex h-[26px] items-center justify-center rounded-full text-[8.5px] font-semibold text-white" style={{ background: WA }}>
            Continue
          </span>
          <p className="mt-[4px] text-center text-[6px] text-[#667781]">
            Managed by Summerhill Health. <span style={{ color: WA_LINK }}>Learn more</span>
          </p>
        </div>
      </div>
    </Handset>
  </div>
);

/* 02 · Staff console: live conversations + handover queue ---------- */

type Convo = { ch: "voice" | "wa"; who: string; intent: string; st: string; tone: Tone; t: string };
const LIVE: Convo[] = [
  { ch: "voice", who: "0161 ••• 204", intent: "Reschedule MRI → Thu", st: "Booking", tone: "blue", t: "01:42" },
  { ch: "wa", who: "Joanne P.", intent: "Safety form 6/18", st: "Form", tone: "violet", t: "4m" },
  { ch: "voice", who: "07700 ••• 118", intent: "CT price, self-pay", st: "Answering", tone: "blue", t: "00:38" },
  { ch: "wa", who: "Marcus O.", intent: "Parking at Stockport", st: "Resolved", tone: "green", t: "1m" },
  { ch: "voice", who: "01625 ••• 377", intent: "Ultrasound prep", st: "Resolved", tone: "green", t: "02:10" },
  { ch: "wa", who: "Priya S.", intent: "Confirm Fri 09:10", st: "Resolved", tone: "green", t: "20s" },
  { ch: "voice", who: "0161 ••• 950", intent: "Contrast & kidneys", st: "Handover", tone: "amber", t: "00:51" },
  { ch: "wa", who: "Gareth L.", intent: "Insurer pre-auth", st: "Handover", tone: "amber", t: "3m" },
];

const QUEUE: { who: string; why: string; color: string; wait: string; ch: "voice" | "wa" }[] = [
  { who: "0161 ••• 950", why: "Clinical question", color: "#e11d48", wait: "0:24", ch: "voice" },
  { who: "Gareth L.", why: "Insurer pre-auth", color: "#7c3aed", wait: "2:05", ch: "wa" },
  { who: "Helen T.", why: "Complaint", color: "#d97706", wait: "3:40", ch: "wa" },
];

function ChIcon({ ch, tint, size = 18 }: { ch: "voice" | "wa"; tint: string; size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: size, height: size, background: ch === "voice" ? soft(tint, 14) : "#dcfce7", color: ch === "voice" ? tint : "#15803d" }}>
      {ch === "voice" ? <PhoneIcon className="size-[9px]" aria-hidden="true" /> : <MessageCircle className="size-[9px]" aria-hidden="true" />}
    </span>
  );
}

export const StaffConsole: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/live`}>
    <div className="flex h-full bg-[#f4f7f8] text-[#111827]" style={SYS}>
      <AppSidebar tint={tint} active={0} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Live conversations" sub="Tue 29 Sep · 1,146 today · 38 active">
          <Pill tone="green" dot size={7}>
            Agent online
          </Pill>
        </TopBar>
        <div className="grid min-h-0 flex-1 grid-cols-[200px_minmax(0,1fr)] gap-[8px] p-[10px]">
          <Panel title="Active now" action={<Segments items={["All", "Voice", "WA"]} active={0} tint={tint} />} pad={false}>
            {LIVE.map((c) => (
              <div key={c.who} className="flex h-[31px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] last:border-b-0" style={c.st === "Handover" ? { background: "#fffbeb" } : undefined}>
                <ChIcon ch={c.ch} tint={tint} />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[8.5px] font-semibold">{c.intent}</span>
                  <span className="block truncate text-[7.5px] text-black/45">
                    {c.who} · {c.t}
                  </span>
                </span>
                <Pill tone={c.tone} size={6.5} dot>
                  {c.st}
                </Pill>
              </div>
            ))}
          </Panel>

          <div className="flex min-h-0 flex-col gap-[8px]">
            <Panel title="Handover queue" action={<span>7 waiting · avg 1m 48s</span>} pad={false}>
              {QUEUE.map((q, k) => (
                <div
                  key={q.who}
                  className="flex h-[27px] items-center gap-[6px] border-b border-black/[0.05] px-[9px] last:border-b-0"
                  style={k === 0 ? { background: soft(tint, 7), boxShadow: `inset 3px 0 0 ${tint}` } : undefined}
                >
                  <ChIcon ch={q.ch} tint={tint} size={16} />
                  <span className="w-[74px] truncate text-[8.5px] font-semibold">{q.who}</span>
                  <Tag color={q.color} size={7}>
                    {q.why}
                  </Tag>
                  <span className="ml-auto text-[8px] tabular-nums text-black/50">waiting {q.wait}</span>
                </div>
              ))}
            </Panel>

            <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
              <div className="flex items-center gap-[7px] border-b border-black/[0.06] px-[10px] py-[6px]">
                <ChIcon ch="voice" tint={tint} size={20} />
                <span className="min-w-0 leading-tight">
                  <span className="block text-[9.5px] font-bold">Live call · 0161 ••• 950</span>
                  <span className="block truncate text-[7.5px] text-black/45">Mrs D. Ashworth · CT abdomen + contrast · Bolton</span>
                </span>
                <span className="ml-auto flex items-center gap-[3px] text-[8px] font-semibold text-[#be123c]">
                  <span className="size-[5px] rounded-full bg-[#e11d48]" />
                  00:51
                </span>
              </div>
              <div className="flex-1 space-y-[5px] overflow-hidden px-[10px] py-[6px]">
                <div className="grid grid-cols-[62px_1fr] gap-y-[2px] rounded-[5px] bg-black/[0.03] px-[7px] py-[5px] text-[7.5px] leading-[1.35]">
                  <span className="text-black/45">Reason</span>
                  <span>Clinical topic: contrast with kidney disease (CKD stage 3)</span>
                  <span className="text-black/45">Agent action</span>
                  <span>No advice given · caller on hold 0:24</span>
                  <span className="text-black/45">Booking</span>
                  <span>CT-7719 · Bolton · Mon 5 Oct 11:20</span>
                </div>
                <div className="space-y-[3px] text-[8px]">
                  <p>
                    <span className="font-semibold text-black/45">Patient · </span>My GP said my kidneys aren&apos;t great. Is the dye going to be a problem?
                  </p>
                  <p>
                    <span className="font-semibold" style={{ color: tint }}>
                      Agent ·{" "}
                    </span>
                    That&apos;s a question for our clinical team. I&apos;m connecting you to a colleague now, they&apos;ll see everything we&apos;ve discussed.
                  </p>
                </div>
              </div>
              <div className="flex gap-[6px] border-t border-black/[0.06] px-[10px] py-[7px]">
                <Btn tint={tint} Icon={PhoneForwarded} style={{ flex: 1, height: 24 }}>
                  Take over call
                </Btn>
                <Btn outline Icon={UserRound} style={{ height: 24 }}>
                  Assign radiographer
                </Btn>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 03 · Analytics: contacts, resolution, bookings by centre ---------- */

const HOURS = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
const VOICE = [18, 62, 88, 81, 72, 58, 66, 70, 64, 57, 49, 31, 22, 15, 9, 6];
const WAPP = [12, 41, 52, 49, 44, 40, 45, 43, 41, 38, 36, 30, 27, 22, 16, 8];

const CENTRES = [
  ["Salford Quays", 38, 81],
  ["Stockport", 31, 79],
  ["Altrincham", 29, 80],
  ["Bolton", 24, 76],
  ["Oldham", 22, 77],
  ["Wigan", 20, 75],
  ["Bury", 18, 78],
  ["Chester", 17, 74],
  ["Macclesfield", 15, 79],
] as const;

export const AgentAnalytics: Screen = ({ tint }) => {
  const light = `color-mix(in oklab, ${tint} 35%, white)`;
  return (
    <Browser w={640} h={400} url={`${URL}/analytics`}>
      <div className="flex h-full bg-[#f4f7f8] text-[#111827]" style={SYS}>
        <AppSidebar tint={tint} active={3} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar title="Analytics" sub="Tue 29 Sep · 9 centres · voice + WhatsApp">
            <Select>All centres</Select>
            <Segments items={["Today", "7d", "30d"]} active={0} tint={tint} />
          </TopBar>
          <div className="grid grid-cols-4 gap-[8px] px-[12px] pt-[9px]">
            <Kpi tint={tint} label="Contacts" value="1,146" delta="▲ 4.1%" sub="vs last Tue" />
            <Kpi tint={tint} label="Resolved without staff" value="78%" delta="▲ 1.2 pt" sub="vs last Tue" />
            <Kpi tint={tint} label="Median answer time" value="3.8s" delta="p95 4.9s" good />
            <Kpi tint={tint} label="Booked by agent" value="214" delta="▲ 23" sub="61 to staff" />
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_176px] gap-[8px] px-[12px] py-[8px]">
            <div className="flex min-h-0 flex-col gap-[8px]">
              <Panel title="Contacts by hour" action={<Legend items={[{ label: "Voice", color: tint }, { label: "WhatsApp", color: light }]} />}>
                <BarChart w={282} h={92} bars={VOICE.map((v, i) => [v, WAPP[i]])} colors={[tint, light]} max={150} labels={HOURS.map((h, i) => (i % 3 === 0 ? h : ""))} yFormat={(n) => String(Math.round(n))} gap={0.3} highlight={2} />
              </Panel>
              <Panel title="Resolved without staff, weekly" action={<Legend items={[{ label: "Resolved", color: tint }, { label: "To staff", color: "#d97706" }]} />} className="flex-1">
                <LineChart
                  w={282}
                  h={58}
                  min={0}
                  max={100}
                  grid={2}
                  series={[
                    { values: [58, 63, 61, 68, 70, 69, 74, 76, 75, 78], color: tint },
                    { values: [42, 37, 39, 32, 30, 31, 26, 24, 25, 22], color: "#d97706", dashed: true },
                  ]}
                  labels={["21 Jul", "25 Aug", "29 Sep"]}
                  yFormat={(n) => `${n}%`}
                />
              </Panel>
            </div>
            <Panel title="Bookings by centre" action={<span>today</span>} pad={false}>
              {CENTRES.map(([c, n, r], k) => (
                <div key={c} className="flex h-[23px] items-center gap-[6px] border-b border-black/[0.05] px-[9px] last:border-b-0">
                  <span className="w-[62px] truncate text-[8px] font-medium">{c}</span>
                  <span className="flex-1">
                    <Bar pct={(n / 38) * 100} color={k === 0 ? tint : light} h={5} />
                  </span>
                  <span className="w-[14px] text-right text-[8px] font-bold tabular-nums">{n}</span>
                  <span className="w-[22px] text-right text-[7px] tabular-nums text-black/45">{r}%</span>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      </div>
    </Browser>
  );
};

/* 04 · Flagged questionnaire review --------------------------------- */

const FLAGGED: { who: string; scan: string; when: string; flags: number; sel?: boolean; urgent?: boolean }[] = [
  { who: "Joanne Pickering", scan: "MRI knee · Salford", when: "Thu 14:30", flags: 2, sel: true, urgent: true },
  { who: "Adeel Hussain", scan: "MRI brain · Bolton", when: "Wed 09:40", flags: 1, urgent: true },
  { who: "Sandra Kaye", scan: "MRI spine · Chester", when: "Thu 11:00", flags: 1 },
  { who: "Liam Doherty", scan: "MRI hip · Wigan", when: "Fri 16:20", flags: 1 },
  { who: "Megan Hurst", scan: "MRI pelvis · Bury", when: "Mon 10:15", flags: 3 },
  { who: "Tomasz Wrona", scan: "MRI shoulder · Stockport", when: "Mon 13:50", flags: 1 },
  { who: "Rachel Ibbotson", scan: "MRI brain · Oldham", when: "Tue 08:30", flags: 1 },
  { who: "David Mercer", scan: "MRI knee · Altrincham", when: "Tue 15:10", flags: 2 },
];

const ANSWERS: { n: number; q: string; a: string; flag?: "red" | "amber"; note?: string }[] = [
  { n: 1, q: "Pacemaker or ICD", a: "No" },
  { n: 4, q: "Aneurysm clips", a: "No" },
  { n: 6, q: "Metal fragments in eyes", a: "Yes", flag: "red", note: "“Welder 2006–2011, metal removed from eye”" },
  { n: 9, q: "Cochlear implant", a: "No" },
  { n: 11, q: "Metal implants or pins", a: "Not sure", flag: "amber", note: "“Pins in right ankle?”" },
  { n: 14, q: "Surgery in the last 6 weeks", a: "No" },
  { n: 15, q: "Kidney disease or dialysis", a: "No" },
  { n: 17, q: "Pregnant or possibly pregnant", a: "No" },
];
const ACOLS = "18px minmax(0,1fr) 46px 116px";

export const QuestionnaireReview: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/questionnaires/A-2291`}>
    <div className="flex h-full bg-[#f4f7f8] text-[#111827]" style={SYS}>
      <AppSidebar tint={tint} active={2} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Questionnaire review" sub="MRI safety · 12 flagged for review">
          <Select>All centres</Select>
        </TopBar>
        <div className="grid min-h-0 flex-1 grid-cols-[138px_minmax(0,1fr)] gap-[8px] p-[10px]">
          <Panel title="Flagged" action={<span>12</span>} pad={false}>
            {FLAGGED.map((f) => (
              <div
                key={f.who}
                className="border-b border-black/[0.05] px-[8px] py-[5px] last:border-b-0"
                style={f.sel ? { background: soft(tint, 8), boxShadow: `inset 3px 0 0 ${tint}` } : undefined}
              >
                <div className="flex items-center gap-[4px]">
                  <span className="truncate text-[8.5px] font-semibold">{f.who}</span>
                  <span className="ml-auto shrink-0 rounded-full px-[4px] text-[7px] font-bold" style={{ background: f.urgent ? TONES.red.bg : TONES.amber.bg, color: f.urgent ? TONES.red.fg : TONES.amber.fg }}>
                    {f.flags}
                  </span>
                </div>
                <p className="truncate text-[7px] text-black/45">
                  {f.scan} · {f.when}
                </p>
              </div>
            ))}
          </Panel>

          <section className="flex min-h-0 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
            <div className="flex items-center gap-[8px] border-b border-black/[0.06] px-[10px] py-[7px]">
              <Avatar text="JP" i={1} size={24} />
              <span className="min-w-0 leading-tight">
                <span className="block text-[10.5px] font-bold">Joanne Pickering</span>
                <span className="block truncate text-[7.5px] text-black/45">DOB 14/03/1981 · MRI left knee · Salford · Thu 1 Oct 14:30</span>
              </span>
              <span className="ml-auto flex shrink-0 gap-[3px]">
                <Pill tone="red" size={7}>
                  1 contraindication risk
                </Pill>
              </span>
            </div>
            <div className="flex items-center gap-[6px] border-b border-black/[0.06] px-[10px] py-[4px] text-[7px] text-black/50">
              <span className="truncate">Submitted via WhatsApp, 28 Sep 10:23 · 18 of 18 answered · 2 flags</span>
            </div>
            <Th cols={ACOLS}>
              <span>#</span>
              <span>Question</span>
              <span>Answer</span>
              <span>Patient detail</span>
            </Th>
            <div className="min-h-0 flex-1">
              {ANSWERS.map((r) => (
                <Tr key={r.n} cols={ACOLS} h={24} highlight={r.flag === "red" ? "#fff1f2" : r.flag === "amber" ? "#fffbeb" : undefined}>
                  <span className="font-mono text-[7.5px] text-black/40">Q{r.n}</span>
                  <span className="flex min-w-0 items-center gap-[4px]">
                    {r.flag && <TriangleAlert className="size-[9px] shrink-0" style={{ color: TONES[r.flag].solid }} aria-hidden="true" />}
                    <span className={`truncate ${r.flag ? "font-semibold" : ""}`}>{r.q}</span>
                  </span>
                  <span>
                    <Pill tone={r.flag ?? "grey"} size={7}>
                      {r.a}
                    </Pill>
                  </span>
                  <span className="truncate text-[7.5px] italic text-black/55">{r.note ?? "—"}</span>
                </Tr>
              ))}
            </div>
            <div className="flex items-center gap-[6px] border-t border-black/[0.07] px-[10px] py-[7px]">
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block whitespace-nowrap text-[8px] font-semibold">Decision</span>
                <span className="block truncate text-[7px] text-black/45">Radiographer</span>
              </span>
              <Btn outline Icon={PhoneCall}>
                Call patient
              </Btn>
              <Btn outline>Orbit X-ray</Btn>
              <Btn tint={tint} Icon={CheckCheck}>
                Clear for scan
              </Btn>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Browser>
);

export const patientAgentScreens: Screen[] = [WhatsAppBooking, StaffConsole, AgentAnalytics, QuestionnaireReview];
