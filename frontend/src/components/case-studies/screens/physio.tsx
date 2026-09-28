import type { ReactNode } from "react";
import {
  BellRing,
  CalendarCheck,
  CalendarDays,
  Car,
  Check as CheckIcon,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  CreditCard,
  House,
  MapPin,
  Navigation,
  NotebookPen,
  Package,
  Paperclip,
  Plus,
  Settings,
  Star,
  Timer,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Avatar, Bar, Browser, Legend, Segments, Select, Sidebar, TONES, TopBar, type Screen } from "./kit";
import { Photo } from "./tools";

/* Physio booking app · Dubai physiotherapy clinic (brand: PhysioFit Sports & Rehab) */

const BRAND = "PhysioFit";
const URL = "admin.physiofitdxb.com";
const LOGO = { src: "/logos/physiofit.webp", img: { w: 393, h: 120 } };
const soft = (tint: string, pct = 8) => `color-mix(in oklab, ${tint} ${pct}%, white)`;
const HOME = "#d97706";
const SYS = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

/* Mobile helpers ---------------------------------------------------- */

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
        <rect x="2" y="2" width="7.5" height="4" rx="1" fill="currentColor" />
        <rect x="16.3" y="2.6" width="1.2" height="2.8" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </span>
  );
}

/** A plain phone: bezel, status bar, home indicator. */
function Handset({ children, bg = "#fff", time = "10:12", w = 184, h = 378 }: { children: ReactNode; bg?: string; time?: string; w?: number; h?: number }) {
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

function PhonePair({ tint, children }: { tint: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-[28px]" style={{ background: `color-mix(in oklab, ${tint} 7%, #f2f2f0)` }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[7px] font-semibold uppercase tracking-[0.06em] text-black/40">{children}</p>;
}

/* 01 · Patient booking: clinic / home-visit toggle ------------------ */

const DAYS = [
  ["Mon", 9, false],
  ["Tue", 10, false],
  ["Wed", 11, true],
  ["Thu", 12, false],
  ["Fri", 13, false],
] as const;
const THERAPISTS = [
  { name: "Sara K.", initials: "SK", i: 2, rating: "4.9" },
  { name: "Omar H.", initials: "OH", i: 0, rating: "4.8" },
  { name: "Aisha R.", initials: "AR", i: 5, rating: "4.9" },
];
const SLOTS: [string, "free" | "taken" | "picked"][] = [
  ["08:30", "taken"],
  ["09:15", "taken"],
  ["10:30", "picked"],
  ["11:45", "free"],
  ["13:00", "taken"],
  ["14:15", "free"],
];

export const PatientBooking: Screen = ({ tint }) => (
  <PhonePair tint={tint}>
    <Handset>
      <div className="flex flex-1 flex-col px-[11px] pt-[3px]">
        <div className="flex items-center gap-[4px]">
          <ChevronLeft className="size-[12px] text-black/55" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Book a session</span>
          <span className="ml-auto text-[7.5px] font-medium text-black/50">عربي</span>
        </div>
        <p className="ml-[16px] text-[7.5px] text-black/45">Lower back pain · 45 min</p>

        <div className="mt-[7px] flex rounded-[7px] bg-black/[0.06] p-[2px] text-[8.5px] font-medium">
          <span className="flex flex-1 items-center justify-center gap-[3px] py-[4px] text-black/55">Clinic</span>
          <span className="flex flex-1 items-center justify-center gap-[3px] rounded-[5px] bg-white py-[4px] shadow-sm">Home visit</span>
        </div>

        <div className="mt-[6px] flex items-center gap-[6px] border-b border-black/[0.07] pb-[6px]">
          <MapPin className="size-[10px] shrink-0 text-black/50" aria-hidden="true" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[8.5px] font-medium">Marina Gate 2, Apt 1904</span>
            <span className="block truncate text-[7px] text-black/45">Dubai Marina</span>
          </span>
          <span className="text-[7.5px] font-medium" style={{ color: tint }}>
            Change
          </span>
        </div>

        <div className="mt-[6px] flex items-center justify-between">
          <Label>March 2026</Label>
          <ChevronRight className="size-[9px] text-black/40" aria-hidden="true" />
        </div>
        <div className="mt-[3px] grid grid-cols-5 gap-[3px]">
          {DAYS.map(([d, n, on]) => (
            <span key={d} className="flex flex-col items-center rounded-[6px] py-[3px] leading-none" style={on ? { background: tint, color: "#fff" } : undefined}>
              <span className={`text-[7px] ${on ? "text-white/80" : "text-black/45"}`}>{d}</span>
              <span className="mt-[2px] text-[10px] font-semibold">{n}</span>
            </span>
          ))}
        </div>

        <div className="mt-[6px]">
          <Label>Therapist</Label>
        </div>
        <div className="mt-[3px] space-y-[1px]">
          {THERAPISTS.map((t, k) => (
            <div key={t.name} className="flex h-[21px] items-center gap-[5px] rounded-[5px] px-[4px]" style={k === 0 ? { background: soft(tint, 9) } : undefined}>
              <Avatar text={t.initials} i={t.i} size={15} />
              <span className="text-[8px] font-medium">{t.name}</span>
              <span className="flex items-center gap-[1px] text-[7px] text-black/45">
                <Star className="size-[6px] fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
                {t.rating}
              </span>
              <span className="ml-auto text-[7px] text-black/40">{k === 0 ? "Selected" : k === 1 ? "Downtown" : "Home visits"}</span>
            </div>
          ))}
        </div>

        <div className="mt-[6px] flex items-center justify-between">
          <Label>Available times</Label>
          <span className="text-[6.5px] text-black/40">travel time included</span>
        </div>
        <div className="mt-[3px] grid grid-cols-3 gap-[3px]">
          {SLOTS.map(([t, st]) => (
            <span
              key={t}
              className={`flex h-[18px] items-center justify-center rounded-[5px] text-[8px] font-medium tabular-nums ${st === "taken" ? "text-black/25" : ""}`}
              style={st === "picked" ? { background: tint, color: "#fff" } : st === "free" ? { boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.14)" } : { background: "rgb(0 0 0 / 0.04)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <span className="mb-[16px] mt-auto flex h-[27px] shrink-0 items-center justify-center rounded-[8px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          Continue
        </span>
      </div>
    </Handset>

    <Handset>
      <div className="flex flex-1 flex-col px-[11px] pt-[3px]">
        <div className="flex items-center gap-[4px]">
          <ChevronLeft className="size-[12px] text-black/55" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Review &amp; pay</span>
        </div>

        <div className="mt-[8px] flex items-center gap-[7px]">
          <Avatar text="SK" i={2} size={26} />
          <span className="min-w-0 leading-tight">
            <span className="block text-[9px] font-semibold">Home visit with Sara K.</span>
            <span className="block text-[7.5px] text-black/50">Wed 11 Mar · 10:30–11:15</span>
            <span className="block truncate text-[7.5px] text-black/50">Marina Gate 2, Apt 1904</span>
          </span>
        </div>

        <div className="mt-[8px] space-y-[3px] border-t border-black/[0.07] pt-[6px] text-[8px]">
          <p className="flex justify-between">
            <span className="text-black/55">Home visit, 45 min</span>
            <span className="tabular-nums">AED 450.00</span>
          </p>
          <p className="flex justify-between">
            <span className="text-black/55">Pay after session</span>
            <span className="tabular-nums text-black/55">AED 350.00</span>
          </p>
          <p className="flex justify-between font-semibold">
            <span>Deposit due today</span>
            <span className="tabular-nums">AED 100.00</span>
          </p>
        </div>

        <div className="mt-[8px] flex items-start gap-[6px] rounded-[7px] p-[6px] ring-1 ring-black/[0.1]">
          <span className="mt-[1px] size-[9px] shrink-0 rounded-full ring-1 ring-black/30" />
          <span className="min-w-0 leading-tight">
            <span className="flex items-center gap-[3px] text-[8px] font-medium">
              <Package className="size-[8px] text-black/50" aria-hidden="true" />
              6-session rehab pack
            </span>
            <span className="block text-[7px] text-black/50">AED 2,340 (AED 390 per session). Use at either clinic or at home.</span>
          </span>
        </div>

        <div className="mt-[8px]">
          <Label>Payment</Label>
        </div>
        <div className="mt-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[7px] ring-1 ring-black/[0.1]">
          <span className="rounded-[2px] bg-[#eb001b] px-[2px] text-[5.5px] font-bold text-white">MC</span>
          <span className="text-[8px]">Mastercard •••• 0381</span>
          <ChevronRight className="ml-auto size-[9px] text-black/35" aria-hidden="true" />
        </div>

        <div className="mt-[8px] space-y-[3px] text-[7px] leading-[1.35] text-black/50">
          <p className="flex gap-[4px]">
            <BellRing className="mt-[1px] size-[8px] shrink-0" aria-hidden="true" />
            Reminders by push and SMS 24 hours and 2 hours before. Sara&apos;s ETA is shared when she sets off.
          </p>
          <p className="flex gap-[4px]">
            <CalendarCheck className="mt-[1px] size-[8px] shrink-0" aria-hidden="true" />
            Free rescheduling up to 24 hours before. The deposit is kept for missed sessions.
          </p>
        </div>

        <span className="mb-[16px] mt-auto flex h-[27px] shrink-0 items-center justify-center rounded-[8px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          Pay AED 100 deposit
        </span>
      </div>
    </Handset>
  </PhonePair>
);

/* 02 · Therapist daily schedule (mobile) ---------------------------- */

type Visit = { time: string; end: string; who: string; what: string; where: string; home: boolean; st: "done" | "now" | "next" | "open" };
const DAY: Visit[] = [
  { time: "08:30", end: "09:15", who: "Rania T.", what: "ACL post-op · wk 6", where: "Marina Walk clinic · Rm 2", home: false, st: "done" },
  { time: "09:15", end: "10:00", who: "Khalid A.", what: "Lower back pain · 4 of 6", where: "JLT · Cluster D, Apt 1207", home: true, st: "done" },
  { time: "10:30", end: "11:15", who: "Emma W.", what: "Lower back · first visit", where: "Marina Gate 2, Apt 1904", home: true, st: "next" },
  { time: "12:00", end: "12:45", who: "Yousef M.", what: "Shoulder impingement", where: "Marina Walk clinic · Rm 1", home: false, st: "next" },
  { time: "14:00", end: "14:45", who: "No booking", what: "Open in app", where: "Marina Walk clinic", home: false, st: "open" },
  { time: "15:00", end: "15:45", who: "Nadia S.", what: "Hip · follow-up", where: "Marina Walk clinic · Rm 2", home: false, st: "next" },
  { time: "16:30", end: "17:15", who: "Hamdan K.", what: "Ankle sprain · 2 of 4", where: "Marina Walk clinic · Rm 2", home: false, st: "next" },
];

export const TherapistDay: Screen = ({ tint }) => (
  <PhonePair tint={tint}>
    <Handset bg="#f2f2f7">
      <div className="shrink-0 px-[11px] pb-[5px] pt-[3px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-[-0.01em]">Today</span>
          <Avatar text="SK" i={2} size={18} />
        </div>
        <p className="text-[7.5px] text-black/45">Wed 11 Mar · 7 sessions</p>
      </div>
      <div className="flex-1 overflow-hidden px-[8px]">
        <div className="overflow-hidden rounded-[9px] bg-white">
          {DAY.map((v, k) => (
            <div key={v.time}>
              {k === 2 && (
                <div className="flex items-center gap-[4px] border-b border-black/[0.06] bg-[#fff7ed] px-[7px] py-[4px] text-[7px] text-[#9a3412]">
                  <Car className="size-[8px] shrink-0" aria-hidden="true" />
                  <span className="truncate">Leave by 10:08 · 18 min to Dubai Marina</span>
                  <Navigation className="ml-auto size-[8px] shrink-0" aria-hidden="true" />
                </div>
              )}
              <div className="flex gap-[6px] border-b border-black/[0.06] px-[7px] py-[5px] last:border-b-0">
                <span className="w-[26px] shrink-0 leading-tight">
                  <span className={`block text-[8px] font-semibold tabular-nums ${v.st === "done" ? "text-black/35" : ""}`}>{v.time}</span>
                  <span className="block text-[6.5px] tabular-nums text-black/35">{v.end}</span>
                </span>
                <span className="w-[2px] shrink-0 rounded-full" style={{ background: v.st === "open" ? "rgb(0 0 0 / 0.12)" : v.home ? HOME : tint, opacity: v.st === "done" ? 0.35 : 1 }} />
                <div className="min-w-0 flex-1">
                  <p className={`flex items-center gap-[3px] truncate text-[8.5px] font-semibold leading-tight ${v.st === "done" || v.st === "open" ? "text-black/40" : ""}`}>
                    <span className="truncate">{v.who}</span>
                    {v.st === "done" && <CheckIcon className="size-[8px] shrink-0 text-[#16a34a]" strokeWidth={3} aria-hidden="true" />}
                  </p>
                  <p className="truncate text-[7px] leading-tight text-black/55">{v.what}</p>
                  <p className="flex items-center gap-[2px] truncate text-[6.5px] leading-tight text-black/40">
                    {v.home ? <House className="size-[6.5px] shrink-0" aria-hidden="true" /> : <MapPin className="size-[6.5px] shrink-0" aria-hidden="true" />}
                    <span className="truncate">{v.where}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-4 border-t border-black/[0.08] bg-white/95 pb-[14px] pt-[5px] text-[6.5px] text-black/45">
        {[
          [CalendarDays, "Today"],
          [UsersRound, "Patients"],
          [NotebookPen, "Notes"],
          [UserRound, "Profile"],
        ].map(([I, l], k) => {
          const Icon = I as typeof CalendarDays;
          return (
            <span key={l as string} className="flex flex-col items-center gap-[1px]" style={k === 0 ? { color: tint } : undefined}>
              <Icon className="size-[10px]" aria-hidden="true" />
              {l as string}
            </span>
          );
        })}
      </div>
    </Handset>

    <Handset>
      <div className="flex flex-1 flex-col px-[11px] pt-[3px]">
        <div className="flex items-center gap-[4px] text-[8px]">
          <ChevronLeft className="size-[12px] text-black/55" aria-hidden="true" />
          <span className="text-black/55">Today</span>
          <span className="ml-auto font-semibold" style={{ color: tint }}>
            Save
          </span>
        </div>
        <div className="mt-[6px] flex items-center gap-[6px]">
          <Avatar text="KA" i={4} size={22} />
          <span className="min-w-0 leading-tight">
            <span className="block text-[10px] font-semibold">Khalid A.</span>
            <span className="block text-[7px] text-black/45">Session 4 of 6 · home visit, JLT</span>
          </span>
        </div>

        <div className="mt-[8px]">
          <Label>Pain today (0–10)</Label>
        </div>
        <div className="mt-[3px] grid grid-cols-11 gap-[2px]">
          {Array.from({ length: 11 }).map((_, n) => (
            <span key={n} className="flex h-[15px] items-center justify-center rounded-[3px] text-[7px] tabular-nums" style={n === 4 ? { background: tint, color: "#fff" } : { background: "rgb(0 0 0 / 0.05)", color: "rgb(0 0 0 / 0.5)" }}>
              {n}
            </span>
          ))}
        </div>
        <p className="mt-[2px] text-[6.5px] text-black/40">Last session: 6</p>

        <div className="mt-[6px] grid grid-cols-2 gap-[6px]">
          {[
            ["Lumbar flexion", "70°", "was 55°"],
            ["SLR (right)", "62°", "was 48°"],
          ].map(([l, v, sub]) => (
            <div key={l} className="rounded-[6px] px-[6px] py-[4px] ring-1 ring-black/[0.1]">
              <p className="text-[6.5px] text-black/45">{l}</p>
              <p className="text-[10px] font-semibold tabular-nums">{v}</p>
              <p className="truncate text-[6px] text-black/40">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-[7px]">
          <Label>Notes</Label>
        </div>
        <div className="mt-[3px] rounded-[6px] px-[6px] py-[5px] text-[7.5px] leading-[1.45] ring-1 ring-black/[0.1]">
          Reduced guarding in forward bend. Manual therapy L4–L5, core activation cues. Progress to bird-dog and glute bridge, 3×10 daily. Review sitting tolerance next visit
          <span className="ml-[1px] inline-block h-[9px] w-[1px] translate-y-[1px]" style={{ background: tint }} />
        </div>

        <div className="mt-[7px] flex items-center gap-[6px] border-y border-black/[0.07] py-[5px]">
          <Paperclip className="size-[9px] shrink-0 text-black/45" aria-hidden="true" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[8px] font-medium">Lower back · Week 2</span>
            <span className="block text-[6.5px] text-black/45">5 exercises · shared with patient on save</span>
          </span>
          <ChevronRight className="size-[9px] text-black/35" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-[6px] border-b border-black/[0.07] py-[5px]">
          <Plus className="size-[9px] shrink-0 text-black/45" aria-hidden="true" />
          <span className="flex-1 text-[8px]">Book next session</span>
          <span className="text-[7px] text-black/45">Sat 14 Mar, 10:30</span>
        </div>

        <span className="mb-[16px] mt-auto flex h-[27px] shrink-0 items-center justify-center rounded-[8px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          Save and share with patient
        </span>
      </div>
    </Handset>
  </PhonePair>
);

/* 03 · Admin calendar: all therapists + utilisation ---------------- */

type Block = { s: number; e: number; kind: "clinic" | "home" | "travel" | "open"; label?: string; sub?: string };
const STAFF: { name: string; initials: string; i: number; util: number; loc: string; blocks: Block[] }[] = [
  {
    name: "Sara K.",
    initials: "SK",
    i: 2,
    util: 91,
    loc: "Marina",
    blocks: [
      { s: 8.5, e: 9.25, kind: "clinic", label: "Rania T.", sub: "ACL post-op" },
      { s: 9.25, e: 10, kind: "home", label: "Khalid A.", sub: "JLT" },
      { s: 10, e: 10.5, kind: "travel" },
      { s: 10.5, e: 11.25, kind: "home", label: "Emma W.", sub: "Marina" },
      { s: 12, e: 12.75, kind: "clinic", label: "Yousef M.", sub: "Shoulder" },
      { s: 14, e: 14.75, kind: "open" },
      { s: 15, e: 16.5, kind: "clinic", label: "2 sessions", sub: "Rm 2" },
      { s: 16.5, e: 17.25, kind: "clinic", label: "Nadia S.", sub: "Hip" },
    ],
  },
  {
    name: "Omar H.",
    initials: "OH",
    i: 0,
    util: 86,
    loc: "Downtown",
    blocks: [
      { s: 8, e: 9.5, kind: "clinic", label: "2 sessions", sub: "Sports" },
      { s: 9.75, e: 10.5, kind: "clinic", label: "Hessa R.", sub: "Knee rehab" },
      { s: 11, e: 11.5, kind: "travel" },
      { s: 11.5, e: 12.25, kind: "home", label: "Tariq S.", sub: "Downtown" },
      { s: 13.5, e: 15, kind: "clinic", label: "2 sessions", sub: "Rm 4" },
      { s: 15.25, e: 16, kind: "clinic", label: "Priya D.", sub: "Neck" },
      { s: 16.25, e: 17.25, kind: "clinic", label: "Tom B.", sub: "Knee" },
    ],
  },
  {
    name: "Lina M.",
    initials: "LM",
    i: 1,
    util: 78,
    loc: "Marina",
    blocks: [
      { s: 9, e: 9.75, kind: "clinic", label: "Mark L.", sub: "Back pain" },
      { s: 10, e: 10.75, kind: "open" },
      { s: 11, e: 12.5, kind: "clinic", label: "2 sessions", sub: "Rm 1" },
      { s: 14, e: 14.5, kind: "travel" },
      { s: 14.5, e: 15.25, kind: "home", label: "Noura K.", sub: "JLT" },
      { s: 15.5, e: 16.25, kind: "open" },
      { s: 16.5, e: 17.25, kind: "clinic", label: "Chris M.", sub: "Running" },
    ],
  },
  {
    name: "Daniel R.",
    initials: "DR",
    i: 3,
    util: 88,
    loc: "Downtown",
    blocks: [
      { s: 8, e: 8.75, kind: "clinic", label: "Ali F.", sub: "Post-op hip" },
      { s: 9, e: 10.5, kind: "clinic", label: "2 sessions", sub: "Rm 3" },
      { s: 11, e: 11.75, kind: "clinic", label: "Sofia B.", sub: "Ankle" },
      { s: 12, e: 12.5, kind: "travel" },
      { s: 12.5, e: 13.25, kind: "home", label: "Omar J.", sub: "Downtown" },
      { s: 14.5, e: 16, kind: "clinic", label: "2 sessions", sub: "Rm 3" },
      { s: 16.5, e: 17.25, kind: "open" },
    ],
  },
  {
    name: "Aisha R.",
    initials: "AR",
    i: 5,
    util: 79,
    loc: "Home visits",
    blocks: [
      { s: 8.5, e: 9, kind: "travel" },
      { s: 9, e: 9.75, kind: "home", label: "Layla H.", sub: "Marina" },
      { s: 9.75, e: 10.25, kind: "travel" },
      { s: 10.25, e: 11, kind: "home", label: "James P.", sub: "JLT" },
      { s: 12.5, e: 13.25, kind: "open" },
      { s: 13.5, e: 14, kind: "travel" },
      { s: 14, e: 14.75, kind: "home", label: "Fatima Z.", sub: "Downtown" },
      { s: 14.75, e: 15.25, kind: "travel" },
      { s: 15.25, e: 16, kind: "home", label: "Reem A.", sub: "JLT" },
    ],
  },
];
const HOUR_H = 20.5;
const START = 8;
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const NAV = [
  { label: "Calendar", Icon: CalendarDays },
  { label: "Bookings", Icon: CalendarCheck, badge: 312 },
  { label: "Patients", Icon: UsersRound },
  { label: "Therapists", Icon: UserRound },
  { label: "Packages", Icon: Package },
  { label: "Payments", Icon: CreditCard },
  { label: "Reminders", Icon: BellRing },
  { label: "Settings", Icon: Settings },
];

function CalBlock({ b, tint }: { b: Block; tint: string }) {
  const top = (b.s - START) * HOUR_H;
  const h = (b.e - b.s) * HOUR_H - 1.5;
  const base = "absolute inset-x-[3px] overflow-hidden rounded-[4px] px-[4px] leading-tight";
  if (b.kind === "travel")
    return (
      <div
        className={`${base} flex items-center gap-[2px] text-[6.5px] text-black/45`}
        style={{ top, height: h, background: "repeating-linear-gradient(135deg, rgb(0 0 0 / 0.05) 0 3px, transparent 3px 6px)" }}
      >
        <Car className="size-[7px] shrink-0" aria-hidden="true" />
        <span className="truncate">Drive</span>
      </div>
    );
  if (b.kind === "open")
    return (
      <div className={`${base} flex items-center text-[7px] font-semibold`} style={{ top, height: h, boxShadow: `inset 0 0 0 1px ${tint}66`, color: tint, background: "rgb(255 255 255 / 0.7)" }}>
        <Plus className="mr-[2px] size-[7px]" aria-hidden="true" />
        Open
      </div>
    );
  const color = b.kind === "home" ? HOME : tint;
  return (
    <div className={`${base} pt-[2px]`} style={{ top, height: h, background: `color-mix(in oklab, ${color} 14%, white)`, boxShadow: `inset 2px 0 0 ${color}` }}>
      <p className="truncate text-[7.5px] font-semibold" style={{ color: `color-mix(in oklab, ${color} 75%, black)` }}>
        {b.label}
      </p>
      {h > 18 && <p className="truncate text-[6.5px] text-black/45">{b.sub}</p>}
    </div>
  );
}

export const AdminCalendar: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/calendar?date=2026-03-11`}>
    <div className="flex h-full bg-[#f5f7f6] text-[#15151a]" style={SYS}>
      <div className="relative h-full shrink-0">
        <Sidebar tint={tint} brand={BRAND} mark="P" items={NAV} active={0} user={{ name: "Hind Al Mansoori", role: "Clinic manager", initials: "HM" }} />
        <div className="absolute left-0 right-[1px] top-0 flex h-[38px] items-end bg-[#fbfbfa] px-[9px]">
          <Photo {...LOGO} w={85} h={26} />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Calendar" sub="Wed 11 Mar 2026 · Marina Walk, Downtown + home visits">
          <Select>All locations</Select>
          <Segments items={["Day", "Week"]} active={0} />
        </TopBar>
        <div className="grid shrink-0 grid-cols-4 border-b border-black/[0.07] bg-white">
          {[
            ["Utilisation this week", "84%", "+3 pt vs last week"],
            ["Sessions this week", "312", "212 booked in-app"],
            ["Home visits", "74", "+12 vs last week"],
            ["Open slots", "19", "4 today"],
          ].map(([l, v, sub], i) => (
            <div key={l} className={`min-w-0 px-[12px] py-[6px] ${i ? "border-l border-black/[0.06]" : ""}`}>
              <p className="truncate text-[7.5px] text-black/50">{l}</p>
              <p className="mt-[1px] text-[13px] font-semibold tabular-nums tracking-[-0.02em]">{v}</p>
              <p className="truncate text-[7px] text-black/40">{sub}</p>
            </div>
          ))}
        </div>
        <section className="mx-[10px] my-[8px] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
          <div className="grid shrink-0 grid-cols-[26px_repeat(5,minmax(0,1fr))] border-b border-black/[0.07]">
            <span className="flex items-end justify-center pb-[3px] text-[6.5px] text-black/35">GST</span>
            {STAFF.map((t) => (
              <div key={t.name} className="border-l border-black/[0.06] px-[5px] py-[4px]">
                <div className="flex items-center gap-[4px]">
                  <Avatar text={t.initials} i={t.i} size={15} />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-[8px] font-semibold">{t.name}</span>
                    <span className="block truncate text-[6.5px] text-black/45">{t.loc}</span>
                  </span>
                  <span className="ml-auto text-[7.5px] font-bold tabular-nums" style={{ color: t.util >= 85 ? tint : "#92400e" }}>
                    {t.util}%
                  </span>
                </div>
                <span className="mt-[3px] block">
                  <Bar pct={t.util} color={t.util >= 85 ? tint : TONES.amber.solid} h={2.5} />
                </span>
              </div>
            ))}
          </div>
          <div className="relative grid min-h-0 flex-1 grid-cols-[26px_repeat(5,minmax(0,1fr))]">
            <div className="relative">
              {HOURS.map((hr) => (
                <span key={hr} className="absolute right-[4px] text-[6.5px] tabular-nums text-black/35" style={{ top: (hr - START) * HOUR_H + 1 }}>
                  {String(hr).padStart(2, "0")}:00
                </span>
              ))}
            </div>
            {STAFF.map((t) => (
              <div key={t.name} className="relative border-l border-black/[0.06]">
                {HOURS.map((hr) => (
                  <span key={hr} className="absolute inset-x-0 border-t border-black/[0.05]" style={{ top: (hr - START) * HOUR_H }} />
                ))}
                {t.blocks.map((b) => (
                  <CalBlock key={b.s} b={b} tint={tint} />
                ))}
              </div>
            ))}
            <div className="pointer-events-none absolute left-[26px] right-0 flex items-center" style={{ top: (10.2 - START) * HOUR_H }}>
              <span className="size-[5px] -translate-x-[2px] rounded-full bg-[#e11d48]" />
              <span className="h-[1px] flex-1 bg-[#e11d48]" />
            </div>
          </div>
          <div className="flex h-[20px] shrink-0 items-center border-t border-black/[0.06] px-[8px]">
            <Legend
              items={[
                { label: "Clinic", color: tint },
                { label: "Home visit", color: HOME },
                { label: "Drive time", color: "#c4c4c4" },
              ]}
            />
            <span className="ml-auto text-[7px] text-black/40">Synced 10:12 · 5 of 9 therapists shown</span>
          </div>
        </section>
      </div>
    </div>
  </Browser>
);

/* 04 · Patient exercise plan --------------------------------------- */

type Pose = "bridge" | "birddog" | "catcow" | "knees" | "stretch";
const EXERCISES: { name: string; ar: string; dose: string; pose: Pose; done: boolean }[] = [
  { name: "Glute bridge", ar: "جسر الأرداف", dose: "3 × 10 · hold 3s", pose: "bridge", done: true },
  { name: "Bird-dog", ar: "تمرين الطائر والكلب", dose: "3 × 8 each side", pose: "birddog", done: true },
  { name: "Cat–cow", ar: "القطة والبقرة", dose: "2 × 10 slow", pose: "catcow", done: true },
  { name: "Knee-to-chest", ar: "الركبة إلى الصدر", dose: "3 × 20s each leg", pose: "knees", done: false },
  { name: "Child's pose", ar: "وضعية الطفل", dose: "3 × 30s", pose: "stretch", done: false },
];

const POSES: Record<Pose, string> = {
  bridge: "M6 30 L16 30 L24 20 L36 24 L42 30 M16 30 L10 24",
  birddog: "M8 22 L20 20 L32 20 L42 17 M20 20 L20 31 M32 20 L32 31 M20 31 L14 31",
  catcow: "M8 28 L14 20 Q24 12 34 20 L38 28 M14 20 L14 31 M34 20 L34 31",
  knees: "M8 30 L28 30 M28 30 L24 20 L16 22 M24 20 L34 26",
  stretch: "M10 30 L22 30 L28 22 L40 28 M22 30 L28 22",
};
const HEADS: Record<Pose, [number, number]> = { bridge: [42, 26], birddog: [8, 18], catcow: [6, 24], knees: [6, 27], stretch: [43, 30] };

function PoseArt({ pose, color, w = 48, h = 36 }: { pose: Pose; color: string; w?: number; h?: number }) {
  const [cx, cy] = HEADS[pose];
  return (
    <svg viewBox="0 0 48 36" width={w} height={h} aria-hidden="true">
      <line x1="2" y1="32" x2="46" y2="32" stroke="rgb(0 0 0 / 0.12)" strokeWidth="1" />
      <path d={POSES[pose]} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r="3.4" fill={color} />
    </svg>
  );
}

export const ExercisePlan: Screen = ({ tint }) => (
  <PhonePair tint={tint}>
    <Handset time="19:26">
      <div className="flex flex-1 flex-col px-[11px] pt-[3px]">
        <div className="flex items-center gap-[4px]">
          <ChevronLeft className="size-[12px] text-black/55" aria-hidden="true" />
          <span className="text-[11px] font-semibold">My exercises</span>
          <span className="ml-auto text-[7.5px] font-medium text-black/50">عربي</span>
        </div>
        <div className="mt-[7px] border-b border-black/[0.07] pb-[7px]">
          <p className="text-[9.5px] font-semibold">Lower back · Week 2</p>
          <p className="text-[7px] text-black/45">From Sara K. · updated Wed 11 Mar, 09:58</p>
          <div className="mt-[5px] flex items-center gap-[6px]">
            <span className="flex-1">
              <Bar pct={60} color={tint} h={3} />
            </span>
            <span className="text-[7px] tabular-nums text-black/55">3 of 5 today</span>
          </div>
          <div className="mt-[6px] flex justify-between">
            {[
              ["M", "done"],
              ["T", "done"],
              ["W", "part"],
              ["T", "done"],
              ["F", "part"],
              ["S", "today"],
              ["S", ""],
            ].map(([d, st], k) => (
              <span key={k} className="flex flex-col items-center gap-[2px] text-[6.5px] text-black/45">
                <span
                  className="size-[11px] rounded-full"
                  style={st === "done" ? { background: tint } : st === "part" ? { background: soft(tint, 40) } : st === "today" ? { boxShadow: `inset 0 0 0 1.5px ${tint}` } : { background: "rgb(0 0 0 / 0.07)" }}
                />
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-[3px]">
          {EXERCISES.map((e, k) => (
            <div key={e.name} className="flex items-center gap-[7px] border-b border-black/[0.06] py-[4px] last:border-b-0">
              <span className="flex h-[28px] w-[36px] shrink-0 items-center justify-center rounded-[5px] bg-black/[0.04]">
                <PoseArt pose={e.pose} color={e.done ? "rgb(0 0 0 / 0.35)" : tint} w={32} h={24} />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className={`block truncate text-[8.5px] font-medium ${e.done ? "text-black/40" : ""}`}>{e.name}</span>
                <span className="block truncate text-[7px] text-black/45">{e.dose}</span>
              </span>
              {e.done ? (
                <CheckIcon className="size-[10px] text-[#16a34a]" strokeWidth={3} aria-hidden="true" />
              ) : (
                <CirclePlay className="size-[13px]" style={{ color: k === 3 ? tint : "rgb(0 0 0 / 0.3)" }} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <span className="mb-[16px] mt-auto flex h-[27px] shrink-0 items-center justify-center rounded-[8px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          Start knee-to-chest
        </span>
      </div>
    </Handset>

    <Handset time="19:31">
      <div dir="rtl" className="flex flex-1 flex-col px-[11px] pt-[3px]">
        <div className="flex items-center gap-[4px]">
          <ChevronRight className="size-[12px] text-black/55" aria-hidden="true" />
          <span className="text-[11px] font-semibold">الركبة إلى الصدر</span>
          <span className="ms-auto text-[8px] text-black/45">٤ من ٥</span>
        </div>
        <div className="relative mt-[7px] flex h-[104px] items-center justify-center overflow-hidden rounded-[8px] bg-[#e9eceb]">
          <PoseArt pose="knees" color="#3f4a47" w={112} h={84} />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-[5px] bg-black/45 px-[6px] py-[3px] text-[6.5px] text-white" dir="ltr">
            <span>0:14</span>
            <span className="h-[2px] flex-1 rounded-full bg-white/30">
              <span className="block h-full w-[33%] rounded-full bg-white" />
            </span>
            <span>0:42</span>
          </div>
        </div>
        <div className="mt-[7px] grid grid-cols-3 border-y border-black/[0.07] py-[5px] text-center">
          {[
            ["٣", "مجموعات"],
            ["٢٠ث", "ثبات"],
            ["٢", "الساقين"],
          ].map(([v, l]) => (
            <span key={l} className="leading-tight">
              <span className="block text-[10px] font-semibold">{v}</span>
              <span className="block text-[6.5px] text-black/50">{l}</span>
            </span>
          ))}
        </div>
        <p className="mt-[7px] text-[8px] leading-[1.6] text-black/70">استلقِ على ظهرك واسحب ركبة واحدة نحو صدرك ببطء. حافظ على استرخاء أسفل الظهر وتنفّس بعمق.</p>
        <p className="mt-[5px] text-[7px] leading-[1.5] text-black/45">ملاحظة من سارة: توقّف إذا زاد الألم عن ٤ من ١٠.</p>
        <div className="mt-[7px] flex items-center gap-[5px] rounded-[6px] bg-black/[0.04] px-[7px] py-[5px] text-[8px]">
          <Timer className="size-[10px] shrink-0 text-black/50" aria-hidden="true" />
          <span className="font-medium tabular-nums">٠:١٤ / ٠:٢٠</span>
          <span className="ms-auto text-[7px] text-black/45">المجموعة ٢ من ٣</span>
        </div>
        <span className="mb-[16px] mt-auto flex h-[27px] shrink-0 items-center justify-center rounded-[8px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          تم · المجموعة التالية
        </span>
      </div>
    </Handset>
  </PhonePair>
);

export const physioScreens: Screen[] = [PatientBooking, TherapistDay, AdminCalendar, ExercisePlan];
