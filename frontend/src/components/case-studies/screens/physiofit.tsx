import { Montserrat } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import {
  Apple,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CirclePlay,
  Clock,
  CreditCard,
  Globe,
  Lock,
  MapPin,
  MessageCircle,
  Package,
  Search,
  Smartphone,
  Star,
  Trophy,
  X,
} from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Avatar, Bar, BarChart, Browser, Btn, Donut, Kpi, Legend, LineChart, Panel, Phone, Pill, Segments, Tag, type Screen, type Tone } from "./kit";
import { Photo } from "./tools";

/*
 * PhysioFit Sports & Rehab Clinic · Bay View Tower, Business Bay, Dubai · patient booking app.
 *
 * Brand from physiofitdxb.com (read 22 Nov 2026): teal #4db6ac (header, buttons), deep teal
 * #074f57 (text, dark buttons), mint #66dbc9, off-white #fcfcfc; Gotham on the site, so
 * Montserrat (the closest free match) here. Logo and app icon are the clinic's own files.
 *
 * Treatments, team roles, hours (Sun-Thu 8:30-6, Fri 8:30-1, Sat closed) and the website form
 * fields are from the clinic's site. Prices, patients, bookings and every chart are illustrative.
 * TODO(content): replace with real exports and confirm all figures with the client.
 */

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const MONT: CSSProperties = { fontFamily: montserrat.style.fontFamily };
const SYS: CSSProperties = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };
const ARABIC: CSSProperties = { fontFamily: '"SF Arabic", "Geeza Pro", "Noto Sans Arabic", Tahoma, sans-serif' };

const TEAL = "#4db6ac";
const DEEP = "#074f57";
const MINT = "#66dbc9";
const OFF = "#fcfcfc";
const INK = "#202124";
const WASH = "#eef7f6";
/** Treatment colours, built around the brand teal. */
const TX = { physio: "#4db6ac", needling: "#2a9d8f", rehab: "#5b9bd5", chiro: "#8c7ae6", massage: "#f2a65a", assess: "#074f57", ortho: "#e76f51" };
const soft = (c: string, pct = 14) => `color-mix(in oklab, ${c} ${pct}%, white)`;

const BASE = "/case-studies/physio-booking-app-dubai";
const LOGO_WHITE = { src: `${BASE}/logo-white.svg`, img: { w: 365.65, h: 111.96 } };
const LOGO_TEAL = { src: `${BASE}/logo-teal.svg`, img: { w: 365.65, h: 111.96 } };
const ICON = { src: `${BASE}/icon.webp`, img: { w: 192, h: 192 } };
const HOST = "admin.physiofitdxb.com";

/* ------------------------------------------------------------------ */
/* Admin shell: teal top bar like the clinic's own site header         */
/* ------------------------------------------------------------------ */

const TABS: { label: string; badge?: number }[] = [{ label: "Inbox", badge: 6 }, { label: "Calendar" }, { label: "Patients" }, { label: "Packages" }, { label: "Reminders" }, { label: "Reports" }];

function Admin({ path, tab, title, sub, right, children }: { path: string; tab: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`${HOST}/${path}`}>
      <div className="flex h-full flex-col" style={{ ...MONT, color: INK, background: "#f3f8f7" }}>
        <div className="flex h-[34px] shrink-0 items-center gap-[8px] px-[12px] text-white" style={{ background: TEAL }}>
          <Photo {...LOGO_WHITE} w={72} h={22} />
          <nav className="ml-[4px] flex h-full items-stretch">
            {TABS.map((t, i) => (
              <span key={t.label} className={`relative flex items-center gap-[3px] px-[7px] text-[7.8px] font-semibold uppercase tracking-[0.05em] ${i === tab ? "text-white" : "text-white/75"}`}>
                {t.label}
                {t.badge !== undefined && (
                  <span className="rounded-full bg-white px-[4px] py-[1px] text-[6.5px] font-bold leading-none" style={{ color: DEEP }}>
                    {t.badge}
                  </span>
                )}
                {i === tab && <span className="absolute inset-x-[6px] bottom-0 h-[2.5px] rounded-t-full bg-white" />}
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-[7px]">
            <span className="flex h-[20px] w-[92px] items-center gap-[4px] rounded-full bg-white/20 px-[7px] text-[7.5px] text-white/80">
              <Search className="size-[8px]" aria-hidden="true" />
              Patient, phone…
            </span>
            <Bell className="size-[10px]" aria-hidden="true" />
            <Avatar text="FD" i={4} size={18} />
          </div>
        </div>
        <div className="flex h-[36px] shrink-0 items-center gap-[8px] border-b border-black/[0.06] bg-white px-[12px]">
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-bold tracking-[-0.01em]" style={{ color: DEEP }}>
              {title}
            </p>
            <p className="truncate text-[7.5px] text-black/50">{sub}</p>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-[6px]">{right}</div>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </Browser>
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
        <rect x="2" y="2" width="9" height="4" rx="1" fill="currentColor" />
        <rect x="16.3" y="2.6" width="1.2" height="2.8" rx="0.5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </span>
  );
}

function Handset({ children, bg = OFF, bar = OFF, time = "9:41", dark = false }: { children: ReactNode; bg?: string; bar?: string; time?: string; dark?: boolean }) {
  return (
    <div className="h-[378px] w-[184px] shrink-0 rounded-[30px] bg-[#1d1d1f] p-[4px] shadow-[0_2px_4px_rgb(0_0_0/0.25),0_24px_40px_-18px_rgb(0_0_0/0.5)]" style={MONT}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[26px]" style={{ background: bg, color: INK }}>
        <div className={`relative flex h-[24px] shrink-0 items-center justify-between px-[16px] pt-[2px] text-[8.5px] font-semibold ${dark ? "text-white" : ""}`} style={{ ...SYS, background: bar }}>
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

function PhoneHead({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-[4px] px-[10px] pb-[5px] pt-[3px]">
      <ChevronLeft className="size-[12px] text-black/55" aria-hidden="true" />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[10.5px] font-bold" style={{ color: DEEP }}>
          {title}
        </span>
        {sub && <span className="block truncate text-[7px] text-black/45">{sub}</span>}
      </span>
      {right}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[6.8px] font-bold uppercase tracking-[0.08em] text-black/40">{children}</p>;
}

function CTA({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className="flex h-[26px] items-center justify-center gap-[4px] rounded-full text-[8.5px] font-bold uppercase tracking-[0.04em] text-white" style={{ background: dark ? DEEP : TEAL }}>
      {children}
    </span>
  );
}

/** Soft backdrop for phone compositions: off-white with the site's teal wave. */
function Backdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ ...MONT, background: `linear-gradient(170deg, ${OFF}, ${WASH})` }}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        <path d="M0 300 C 140 270 240 340 380 316 S 560 260 640 280 L640 400 L0 400 Z" fill={TEAL} />
        <path d="M470 0 C 540 50 600 60 640 40 L640 0 Z" fill={TEAL} opacity="0.16" />
      </svg>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · Patient app: treatment, practitioner, time, deposit            */
/* ------------------------------------------------------------------ */

const TREATMENTS = ["Physiotherapy", "Sports rehab", "Chiropractic", "Sports massage"];
const PRACS = [
  { name: "Shereen H.", role: "Physiotherapist · dry needling", initials: "SH", i: 2, next: "Wed 11:30", rating: "5.0" },
  { name: "Senior sports physio", role: "Rehab · return to sport", initials: "SP", i: 0, next: "Mon 15:00", rating: "5.0" },
  { name: "Chiropractor", role: "Spine · neurology", initials: "DC", i: 4, next: "Tue 09:00", rating: "4.9" },
];
const DAYS: [string, string, "on" | "pick" | "half"][] = [
  ["Mon", "23", "on"],
  ["Tue", "24", "on"],
  ["Wed", "25", "pick"],
  ["Thu", "26", "on"],
  ["Fri", "27", "half"],
];
const SLOTS: [string, "free" | "taken" | "pick"][] = [
  ["08:30", "taken"],
  ["09:15", "taken"],
  ["10:00", "free"],
  ["11:30", "pick"],
  ["14:15", "free"],
  ["16:45", "taken"],
];

export const PatientBooking: Screen = () => (
  <Backdrop>
    <div className="absolute left-[26px] top-[30px] w-[196px]" style={{ color: DEEP }}>
      <Photo {...LOGO_TEAL} w={104} h={32} />
      <p className="mt-[14px] text-[19px] font-bold leading-[1.12] tracking-[-0.02em]">
        Book in under
        <br />a minute.
      </p>
      <p className="mt-[6px] text-[8.5px] leading-[1.5] text-black/60">Treatment, practitioner and time, then a deposit by card or Apple Pay. Reminders and rescheduling come with it.</p>
      <div className="mt-[10px] flex flex-col gap-[4px]">
        {[
          [Smartphone, "68% of bookings in-app", "Up from zero at launch"],
          [CircleCheck, "−45% no-shows", "Deposit + 24 h and 2 h reminders"],
          [Globe, "English and العربية", "One app, both directions"],
        ].map(([Icon, a, b]) => {
          const I = Icon as typeof Smartphone;
          return (
            <div key={a as string} className="flex items-center gap-[6px] rounded-[8px] bg-white px-[7px] py-[4px] shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-black/[0.05]">
              <span className="flex size-[17px] shrink-0 items-center justify-center rounded-full text-white" style={{ background: TEAL }}>
                <I className="size-[9px]" strokeWidth={2.4} aria-hidden="true" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[8px] font-bold">{a as string}</span>
                <span className="block truncate text-[6.8px] text-black/50">{b as string}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>

    <div className="absolute right-[20px] top-[11px] flex gap-[14px]">
      <Handset>
        <PhoneHead title="Book a session" sub="Bay View Tower, Business Bay" right={<span className="rounded-full px-[5px] py-[1.5px] text-[6.5px] font-bold ring-1 ring-black/15">عربي</span>} />
        <div className="flex flex-1 flex-col px-[10px]">
          <Label>Treatment</Label>
          <div className="mt-[3px] grid grid-cols-2 gap-[3px]">
            {TREATMENTS.map((t, k) => (
              <span key={t} className="flex h-[19px] items-center justify-center rounded-full text-[7.5px] font-semibold" style={k === 0 ? { background: TEAL, color: "#fff" } : { boxShadow: `inset 0 0 0 1px ${DEEP}55`, color: DEEP }}>
                {t}
              </span>
            ))}
          </div>
          <div className="mt-[6px]">
            <Label>Practitioner</Label>
          </div>
          {PRACS.map((p, k) => (
            <div key={p.name} className="mt-[3px] flex items-center gap-[5px] rounded-[7px] px-[5px] py-[3px]" style={k === 0 ? { background: soft(TEAL, 16), boxShadow: `inset 0 0 0 1px ${TEAL}` } : { background: "#fff", boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.06)" }}>
              <Avatar text={p.initials} i={p.i} size={18} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[8px] font-bold">{p.name}</span>
                <span className="block truncate text-[6.5px] text-black/50">{p.role}</span>
              </span>
              <span className="text-right leading-tight">
                <span className="flex items-center justify-end gap-[1px] text-[6.5px] font-bold">
                  <Star className="size-[6px] fill-[#f5b301] text-[#f5b301]" aria-hidden="true" />
                  {p.rating}
                </span>
                <span className="block text-[6px] text-black/45">{p.next}</span>
              </span>
            </div>
          ))}
          <div className="mt-[6px] flex items-center justify-between">
            <Label>November 2026</Label>
            <span className="text-[6.5px] text-black/40">Sat closed</span>
          </div>
          <div className="mt-[3px] grid grid-cols-5 gap-[3px]">
            {DAYS.map(([d, n, st]) => (
              <span key={d} className="flex flex-col items-center rounded-[7px] py-[3px] leading-tight" style={st === "pick" ? { background: DEEP, color: "#fff" } : { background: "#fff", boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.07)" }}>
                <span className="text-[6.5px] opacity-70">{d}</span>
                <span className="text-[10px] font-bold">{n}</span>
                {st === "half" && <span className="text-[5.5px] opacity-60">to 1 pm</span>}
              </span>
            ))}
          </div>
          <div className="mt-[5px] grid grid-cols-3 gap-[3px]">
            {SLOTS.map(([t, st]) => (
              <span
                key={t}
                className={`flex h-[17px] items-center justify-center rounded-[6px] text-[7.5px] font-semibold ${st === "taken" ? "text-black/25 line-through" : ""}`}
                style={st === "pick" ? { background: TEAL, color: "#fff" } : st === "taken" ? { background: "#f0f2f2" } : { boxShadow: `inset 0 0 0 1px ${TEAL}`, color: DEEP }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mb-[14px] mt-auto">
            <CTA>Continue</CTA>
          </div>
        </div>
      </Handset>

      <Handset>
        <PhoneHead title="Review & pay" sub="Step 3 of 3" />
        <div className="flex flex-1 flex-col px-[10px]">
          <div className="flex items-center gap-[6px] rounded-[9px] p-[7px] text-white" style={{ background: DEEP }}>
            <Photo {...ICON} w={24} h={24} radius={12} bg="#fff" />
            <span className="min-w-0 leading-tight">
              <span className="block text-[8.5px] font-bold">Physiotherapy · 45 min</span>
              <span className="block text-[7px] text-white/75">Shereen H. · Wed 25 Nov, 11:30</span>
              <span className="mt-[1px] flex items-center gap-[2px] text-[6.5px] text-white/60">
                <MapPin className="size-[6px]" aria-hidden="true" /> Bay View Tower, Business Bay
              </span>
            </span>
          </div>
          <div className="mt-[6px] space-y-[2px] text-[7.8px]">
            {[
              ["Follow-up session", "AED 450"],
              ["Pay at the clinic", "AED 350"],
            ].map(([a, b]) => (
              <p key={a} className="flex justify-between text-black/60">
                <span>{a}</span>
                <span>{b}</span>
              </p>
            ))}
            <p className="flex justify-between border-t border-black/[0.08] pt-[3px] font-bold">
              <span>Deposit today</span>
              <span>AED 100</span>
            </p>
          </div>
          <div className="mt-[6px] flex gap-[5px] rounded-[8px] p-[6px]" style={{ background: soft(MINT, 22) }}>
            <Package className="mt-[1px] size-[10px] shrink-0" style={{ color: DEEP }} aria-hidden="true" />
            <span className="leading-[1.35]">
              <span className="block text-[7.8px] font-bold" style={{ color: DEEP }}>
                6-session rehab pack
              </span>
              <span className="block text-[6.8px] text-black/60">AED 2,340 · save AED 360 · use within 4 months</span>
            </span>
            <span className="ml-auto mt-[1px] size-[10px] shrink-0 rounded-full ring-1 ring-black/25" />
          </div>
          <div className="mt-[6px]">
            <Label>Payment</Label>
          </div>
          <span className="mt-[3px] flex h-[22px] items-center justify-center gap-[3px] rounded-[7px] bg-black text-[8.5px] font-semibold text-white" style={SYS}>
            <Apple className="size-[9px] fill-white" aria-hidden="true" /> Pay
          </span>
          <span className="mt-[3px] flex h-[20px] items-center gap-[5px] rounded-[7px] bg-white px-[7px] text-[7.5px] ring-1 ring-black/10">
            <CreditCard className="size-[9px] text-black/50" aria-hidden="true" /> Visa •••• 4417
            <ChevronRight className="ml-auto size-[8px] text-black/35" aria-hidden="true" />
          </span>
          <div className="mt-[6px] space-y-[2px] text-[6.8px] leading-[1.35] text-black/55">
            <p className="flex gap-[3px]">
              <Bell className="mt-[1px] size-[7px] shrink-0" style={{ color: TEAL }} aria-hidden="true" /> Reminders 24 hours and 2 hours before
            </p>
            <p className="flex gap-[3px]">
              <Clock className="mt-[1px] size-[7px] shrink-0" style={{ color: TEAL }} aria-hidden="true" /> Move it free up to 24 hours before
            </p>
          </div>
          <div className="mb-[14px] mt-auto">
            <CTA dark>
              <Lock className="size-[8px]" aria-hidden="true" /> Pay AED 100 deposit
            </CTA>
          </div>
        </div>
      </Handset>
    </div>
  </Backdrop>
);

/* ------------------------------------------------------------------ */
/* 02 · Front-desk inbox: website form, WhatsApp and app requests      */
/* ------------------------------------------------------------------ */

type Src = "form" | "wa" | "app";
const SRC: Record<Src, { label: string; color: string; Icon: typeof Globe }> = {
  form: { label: "Website form", color: "#5b9bd5", Icon: Globe },
  wa: { label: "WhatsApp", color: "#22a559", Icon: MessageCircle },
  app: { label: "App", color: TEAL, Icon: Smartphone },
};
const REQS: { src: Src; who: string; what: string; when: string; at: string; st: string; tone: Tone }[] = [
  { src: "form", who: "Rahul Mehta", what: "Sports rehab", when: "Thu 19 Nov", at: "08:52", st: "New", tone: "blue" },
  { src: "wa", who: "Elena Petrova", what: "Sports massage", when: "This week, pm", at: "08:41", st: "New", tone: "blue" },
  { src: "app", who: "Omar Farouk", what: "Move Thu 10:00", when: "Thu 19 Nov", at: "08:30", st: "Auto-moved", tone: "green" },
  { src: "wa", who: "Hannah Wells", what: "Chiropractic · first visit", when: "Sun 22 Nov", at: "08:12", st: "Slots sent", tone: "violet" },
  { src: "form", who: "Khalid Al Suwaidi", what: "Physiotherapy", when: "Any morning", at: "07:58", st: "Confirmed", tone: "green" },
  { src: "app", who: "Sophie Laurent", what: "Package 6 · session 2", when: "Fri 20 Nov", at: "07:31", st: "Paid", tone: "green" },
];

function SrcIcon({ s, size = 16 }: { s: Src; size?: number }) {
  const { Icon, color } = SRC[s];
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: size, height: size, background: soft(color, 18), color }}>
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} aria-hidden="true" />
    </span>
  );
}

export const FrontDeskInbox: Screen = () => (
  <Admin
    path="inbox"
    tab={0}
    title="Booking requests"
    sub="Wed 18 Nov · website form, WhatsApp and app in one queue"
    right={<Segments items={["Open", "All"]} active={0} tint={DEEP} />}
  >
    <div className="flex h-full flex-col gap-[6px] p-[8px]">
      <div className="grid shrink-0 grid-cols-4 gap-[6px]">
        {[
          ["Requests today", "9", "3 form · 4 WhatsApp · 2 app"],
          ["Confirmed", "6", "by 09:00"],
          ["Time to confirm", "2m 10s", "was ~3 h by message"],
          ["Booked in-app", "68%", "this week"],
        ].map(([l, v, sub], k) => (
          <div key={l} className="rounded-[8px] px-[9px] py-[5px] ring-1 ring-black/[0.06]" style={k === 3 ? { background: DEEP, color: "#fff" } : { background: "#fff" }}>
            <p className={`text-[7px] font-semibold ${k === 3 ? "text-white/70" : "text-black/50"}`}>{l}</p>
            <p className="text-[14px] font-bold leading-tight tracking-[-0.02em]">{v}</p>
            <p className={`truncate text-[6.5px] ${k === 3 ? "text-white/60" : "text-black/40"}`}>{sub}</p>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[226px_minmax(0,1fr)] gap-[6px]">
        <Panel title="Waiting for a slot" action={<span>Newest first</span>} pad={false}>
          {REQS.map((r, k) => (
            <div key={r.who} className="flex h-[33px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] last:border-b-0" style={k === 0 ? { background: soft(TEAL, 10), boxShadow: `inset 3px 0 0 ${TEAL}` } : undefined}>
              <SrcIcon s={r.src} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[8px] font-bold">{r.who}</span>
                <span className="block truncate text-[6.8px] text-black/50">
                  {r.what} · {r.when}
                </span>
              </span>
              <span className="flex flex-col items-end gap-[2px]">
                <Pill tone={r.tone} size={6}>
                  {r.st}
                </Pill>
                <span className="text-[6px] tabular-nums text-black/40">{r.at}</span>
              </span>
            </div>
          ))}
        </Panel>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
          <div className="flex h-[26px] shrink-0 items-center gap-[6px] border-b border-black/[0.06] px-[9px]">
            <SrcIcon s="form" size={15} />
            <span className="text-[8.5px] font-bold">Website form</span>
            <span className="text-[7px] text-black/45">physiofitdxb.com · Book an appointment · 08:52</span>
            <Tag color="#5b9bd5" size={6.3}>
              New patient
            </Tag>
          </div>
          <div className="grid grid-cols-[1fr_1fr] gap-x-[10px] gap-y-[3px] px-[9px] pt-[6px] text-[7.3px]">
            {[
              ["Full name", "Rahul Mehta"],
              ["Treatment", "Sports Rehab"],
              ["Email address", "r•••••@gmail.com"],
              ["Preferred date", "Thu 19 Nov"],
              ["Contact number", "+971 55 ••• 2290"],
              ["Note", "Padel · right shoulder"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between gap-[6px] border-b border-black/[0.05] pb-[2px]">
                <span className="text-black/45">{k}</span>
                <span className="truncate font-semibold">{v}</span>
              </p>
            ))}
          </div>
          <div className="px-[9px] pt-[6px]">
            <p className="text-[6.8px] font-bold uppercase tracking-[0.08em] text-black/40">Suggested slots · Thu 19 Nov</p>
            <div className="mt-[3px] grid grid-cols-3 gap-[4px]">
              {[
                ["09:15", "Senior sports physio", true],
                ["11:30", "Shereen H.", false],
                ["16:00", "Senior sports physio", false],
              ].map(([t, w, on]) => (
                <span key={t as string} className="rounded-[6px] px-[6px] py-[3px] leading-tight" style={on ? { background: TEAL, color: "#fff" } : { boxShadow: `inset 0 0 0 1px ${TEAL}`, color: DEEP }}>
                  <span className="block text-[9px] font-bold">{t as string}</span>
                  <span className="block truncate text-[6.3px] opacity-80">{w as string} · 60 min initial</span>
                </span>
              ))}
            </div>
          </div>
          <p className="mx-[9px] mt-[4px] flex items-center gap-[3px] text-[6.6px] text-black/50">
            <CircleCheck className="size-[7px]" style={{ color: TEAL }} aria-hidden="true" /> New patients get a 60-min first visit · padel shoulder matched to the sports physio first
          </p>
          <div className="mx-[9px] mt-[5px] rounded-[8px] rounded-tl-[2px] bg-[#e7f7ec] px-[7px] py-[5px] text-[7.2px] leading-[1.4]" style={SYS}>
            <p className="text-[6.3px] font-semibold text-[#22a559]">WhatsApp preview</p>
            Hi Rahul, thanks for getting in touch with PhysioFit. You&apos;re booked for Sports Rehab, Thu 19 Nov at 09:15, Bay View Tower, Business Bay. Tap below to pay the AED 100 deposit and get the app.
          </div>
          <div className="mt-auto flex items-center gap-[5px] border-t border-black/[0.06] px-[9px] py-[5px]">
            <Btn tint={DEEP} Icon={Check} size="sm">
              Confirm and send
            </Btn>
            <Btn outline size="sm">
              Offer other times
            </Btn>
            <span className="ml-auto text-[6.5px] text-black/40">Holds the slot for 2 hours</span>
          </div>
        </section>
      </div>
    </div>
  </Admin>
);

/* ------------------------------------------------------------------ */
/* 03 · Clinic calendar: every practitioner's day                      */
/* ------------------------------------------------------------------ */

type Appt = { at: string; min: number; who: string; what: string; c: string; app?: boolean; pkg?: string; dep?: boolean; first?: boolean };
const START = 8.5;
const HOURS = 6;
const PX = 42;
const top = (at: string) => {
  const [h, m] = at.split(":").map(Number);
  return (h + m / 60 - START) * PX;
};
const COLS: { name: string; role: string; use: number; appts: Appt[] }[] = [
  {
    name: "Shereen Hassam",
    role: "Physio · Room 1",
    use: 92,
    appts: [
      { at: "08:30", min: 45, who: "Marco Dell'Orto", what: "Physio + dry needling", c: TX.needling, app: true, dep: true },
      { at: "09:15", min: 45, who: "Fatima Saeed", what: "Neck pain · follow-up", c: TX.physio, app: true, pkg: "3/6" },
      { at: "10:30", min: 45, who: "Nadia Karim", what: "ACL rehab · needling", c: TX.needling, app: true, pkg: "4/6" },
      { at: "11:15", min: 60, who: "James Carter", what: "Initial assessment", c: TX.assess, first: true, dep: true },
      { at: "13:15", min: 45, who: "Priya Nair", what: "Headaches · follow-up", c: TX.physio, app: true },
    ],
  },
  {
    name: "Senior sports physio",
    role: "Room 2 · rehab gym",
    use: 86,
    appts: [
      { at: "08:30", min: 60, who: "Ali Hassan", what: "Return to run · gym", c: TX.rehab, app: true, pkg: "5/6" },
      { at: "09:45", min: 45, who: "Claire Dubois", what: "Post-op shoulder", c: TX.physio, dep: true },
      { at: "10:45", min: 60, who: "Daniel Ortiz", what: "Padel elbow · gym", c: TX.rehab, app: true },
      { at: "12:30", min: 45, who: "Lena Fischer", what: "Pre-natal care", c: TX.physio, app: true },
    ],
  },
  {
    name: "Chiropractor",
    role: "Room 3",
    use: 81,
    appts: [
      { at: "09:00", min: 30, who: "Tom Becker", what: "Adjustment", c: TX.chiro, app: true },
      { at: "09:30", min: 30, who: "Aisha Rahman", what: "Lower back", c: TX.chiro, app: true },
      { at: "10:30", min: 45, who: "Grace Tan", what: "First visit", c: TX.assess, first: true },
      { at: "11:30", min: 30, who: "Yusuf Khan", what: "Neck", c: TX.chiro, dep: true },
      { at: "13:00", min: 30, who: "Marta Silva", what: "Adjustment", c: TX.chiro, app: true },
    ],
  },
  {
    name: "Sports massage",
    role: "Room 4",
    use: 78,
    appts: [
      { at: "09:00", min: 60, who: "Ben Ward", what: "Deep tissue", c: TX.massage, app: true },
      { at: "10:30", min: 60, who: "Maya Chen", what: "Lymphatic", c: TX.massage, app: true, pkg: "2/6" },
      { at: "12:00", min: 60, who: "Rania Haddad", what: "Sports massage", c: TX.massage },
    ],
  },
];

function ApptBlock({ a }: { a: Appt }) {
  const h = (a.min / 60) * PX - 2;
  const dark = a.c === TX.assess;
  return (
    <div
      className="absolute inset-x-[3px] overflow-hidden rounded-[5px] px-[4px] py-[2px] leading-tight"
      style={{ top: top(a.at) + 1, height: h, background: dark ? DEEP : soft(a.c, 30), boxShadow: dark ? undefined : `inset 2.5px 0 0 ${a.c}`, color: dark ? "#fff" : INK }}
    >
      <span className="flex items-center gap-[2.5px]">
        <span className={`text-[6.2px] tabular-nums ${dark ? "text-white/70" : "text-black/45"}`}>{a.at}</span>
        <span className="min-w-0 truncate text-[7.2px] font-bold">{a.who}</span>
        <span className="ml-auto flex shrink-0 items-center gap-[2px]">
          {a.app && <Smartphone className="size-[7px]" style={{ color: dark ? "#fff" : DEEP }} aria-hidden="true" />}
          {a.dep && <CreditCard className="size-[7px]" style={{ color: dark ? "#fff" : DEEP }} aria-hidden="true" />}
        </span>
      </span>
      {h > 18 && (
        <span className={`mt-[1px] flex items-center gap-[3px] text-[6.4px] ${dark ? "text-white/75" : "text-black/55"}`}>
          <span className="truncate">{a.what}</span>
          {a.pkg && <span className="ml-auto shrink-0 rounded-[3px] bg-white/80 px-[2px] text-[5.8px] font-bold text-black/60">Pack {a.pkg}</span>}
          {a.first && <span className="ml-auto shrink-0 rounded-[3px] bg-white/20 px-[2px] text-[5.8px] font-bold">NEW</span>}
        </span>
      )}
    </div>
  );
}

export const ClinicCalendar: Screen = () => (
  <Admin
    path="calendar/2026-11-18"
    tab={1}
    title="Wed 18 November"
    sub="Bay View Tower · 4 practitioners · open 8:30–6:00"
    right={
      <>
        <Pill tone="green" size={7}>
          Today 86% booked
        </Pill>
        <Pill tone="grey" size={7}>
          Week 84%
        </Pill>
        <Segments items={["Day", "Week"]} active={0} tint={DEEP} />
      </>
    }
  >
    <div className="flex h-full flex-col px-[8px] pb-[4px] pt-[6px]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
        <div className="grid h-[30px] shrink-0 grid-cols-[30px_repeat(4,minmax(0,1fr))] border-b border-black/[0.07]">
          <span />
          {COLS.map((c, k) => (
            <div key={c.name} className="flex items-center gap-[4px] border-l border-black/[0.06] px-[5px]">
              <Avatar text={c.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()} i={[2, 0, 4, 3][k]} size={16} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[7.6px] font-bold">{c.name}</span>
                <span className="flex items-center gap-[3px] text-[6.3px] text-black/45">
                  <span className="truncate">{c.role}</span>
                  <span className="ml-auto font-bold" style={{ color: DEEP }}>
                    {c.use}%
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="relative grid min-h-0 flex-1 grid-cols-[30px_repeat(4,minmax(0,1fr))]">
          <div className="relative">
            {Array.from({ length: HOURS }).map((_, k) => (
              <span key={k} className="absolute right-[4px] text-[6.3px] tabular-nums text-black/40" style={{ top: k * PX + 1 }}>
                {`${String(Math.floor(START + k)).padStart(2, "0")}:30`}
              </span>
            ))}
          </div>
          {COLS.map((c) => (
            <div key={c.name} className="relative border-l border-black/[0.06]">
              {Array.from({ length: HOURS }).map((_, k) => (
                <span key={k} className="absolute inset-x-0 border-t border-dashed border-black/[0.06]" style={{ top: k * PX }} />
              ))}
              {c.appts.map((a) => (
                <ApptBlock key={a.at + a.who} a={a} />
              ))}
            </div>
          ))}
          <div className="absolute left-[30px] right-0 top-0 grid grid-cols-4" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="relative">
              <span className="absolute inset-x-[3px] flex items-center justify-center rounded-[5px] border border-dashed text-[6.4px] font-bold" style={{ top: top("13:15") + 1, height: (60 / 60) * PX - 2, borderColor: TEAL, color: DEEP, background: soft(TEAL, 8) }}>
                Open · offered to waitlist
              </span>
            </span>
          </div>
          <div className="pointer-events-none absolute left-[26px] right-0 flex items-center" style={{ top: top("11:05") }}>
            <span className="size-[5px] rounded-full bg-[#e11d48]" />
            <span className="h-px flex-1 bg-[#e11d48]" />
          </div>
        </div>
      </div>
      <div className="flex h-[15px] shrink-0 items-center gap-[7px] pt-[3px] text-[6.6px] text-black/55">
        <Legend
          items={[
            { label: "Physio", color: TX.physio },
            { label: "Dry needling", color: TX.needling },
            { label: "Rehab gym", color: TX.rehab },
            { label: "Chiropractic", color: TX.chiro },
            { label: "Massage", color: TX.massage },
            { label: "First visit", color: TX.assess },
          ]}
        />
        <span className="ml-auto flex items-center gap-[2px]">
          <Smartphone className="size-[7px]" style={{ color: DEEP }} aria-hidden="true" /> booked in app
        </span>
        <span className="flex items-center gap-[2px]">
          <CreditCard className="size-[7px]" style={{ color: DEEP }} aria-hidden="true" /> deposit paid
        </span>
      </div>
    </div>
  </Admin>
);

/* ------------------------------------------------------------------ */
/* 04 · Practitioner app: the day and a session note                   */
/* ------------------------------------------------------------------ */

const DAY: { at: string; who: string; what: string; tag?: string; tone?: Tone; now?: boolean; gap?: boolean }[] = [
  { at: "08:30", who: "Marco Dell'Orto", what: "Physio + dry needling · 45 min", tag: "Paid", tone: "green" },
  { at: "09:15", who: "Fatima Saeed", what: "Neck pain · pack 3 of 6", tag: "Pack", tone: "violet" },
  { at: "10:00", who: "Free 30 min", what: "Notes and calls", gap: true },
  { at: "10:30", who: "Nadia Karim", what: "ACL rehab wk 14 · pack 4 of 6", tag: "Now", tone: "blue", now: true },
  { at: "11:15", who: "James Carter", what: "Initial assessment · 60 min", tag: "New", tone: "amber" },
  { at: "13:15", who: "Priya Nair", what: "Headaches · follow-up", tag: "Paid", tone: "green" },
];

function Callout({ x, y, w, children }: { x: number; y: number; w: number; children: ReactNode }) {
  return (
    <div className="absolute rounded-[10px] bg-white p-[7px] shadow-[0_10px_24px_-12px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.05]" style={{ left: x, top: y, width: w }}>
      {children}
    </div>
  );
}

export const PractitionerApp: Screen = () => (
  <Backdrop>
    <Callout x={16} y={46} w={100}>
      <p className="text-[6.8px] font-bold uppercase tracking-[0.08em] text-black/40">Nadia · pain score</p>
      <LineChart w={86} h={44} max={8} min={0} grid={2} labels={["S1", "S2", "S3", "S4"]} series={[{ values: [7, 5, 4, 2], color: TEAL, area: true }]} />
      <p className="mt-[2px] text-[7px] font-bold" style={{ color: DEEP }}>
        7 → 2 in four sessions
      </p>
    </Callout>
    <Callout x={16} y={168} w={100}>
      <p className="flex items-center gap-[3px] text-[7.3px] font-bold" style={{ color: DEEP }}>
        <Package className="size-[8px]" aria-hidden="true" /> Pack 4 of 6 used
      </p>
      <div className="mt-[3px]">
        <Bar pct={67} color={TEAL} h={4} />
      </div>
      <p className="mt-[3px] text-[6.6px] leading-[1.35] text-black/50">The app offers a renewal after session 5.</p>
    </Callout>
    <Callout x={524} y={70} w={100}>
      <p className="flex items-center gap-[3px] text-[7.3px] font-bold" style={{ color: DEEP }}>
        <CircleCheck className="size-[8px]" style={{ color: TEAL }} aria-hidden="true" /> Synced
      </p>
      <p className="mt-[3px] text-[6.6px] leading-[1.4] text-black/55">Note saved to Nadia&apos;s record, home plan sent to her app, next session held in the calendar.</p>
    </Callout>
    <Callout x={524} y={176} w={100}>
      <p className="text-[6.8px] font-bold uppercase tracking-[0.08em] text-black/40">Shereen&apos;s week</p>
      <p className="mt-[2px] text-[15px] font-bold leading-none" style={{ color: DEEP }}>
        92%
      </p>
      <p className="mt-[2px] text-[6.6px] text-black/50">of bookable hours filled · 1 slot left</p>
    </Callout>
    <div className="absolute left-1/2 top-[11px] flex -translate-x-1/2 gap-[18px]">
      <Handset>
        <div className="flex items-center gap-[6px] px-[11px] pb-[6px] pt-[3px]">
          <Avatar text="SH" i={2} size={22} />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[10.5px] font-bold" style={{ color: DEEP }}>
              Today
            </span>
            <span className="block truncate text-[7px] text-black/45">Wed 18 Nov · Room 1</span>
          </span>
          <Photo {...ICON} w={18} h={18} radius={9} />
        </div>
        <div className="mx-[10px] grid grid-cols-3 gap-[4px]">
          {[
            ["6", "sessions"],
            ["92%", "booked"],
            ["2", "packs due"],
          ].map(([v, l]) => (
            <span key={l} className="rounded-[7px] bg-white px-[5px] py-[3px] text-center leading-tight ring-1 ring-black/[0.06]">
              <span className="block text-[11px] font-bold" style={{ color: DEEP }}>
                {v}
              </span>
              <span className="block text-[6.3px] text-black/45">{l}</span>
            </span>
          ))}
        </div>
        <div className="mt-[6px] flex flex-1 flex-col gap-[3px] px-[10px]">
          {DAY.map((d) => (
            <div
              key={d.at}
              className="flex items-center gap-[6px] rounded-[8px] px-[6px] py-[4px]"
              style={d.now ? { background: DEEP, color: "#fff" } : d.gap ? { boxShadow: `inset 0 0 0 1px ${TEAL}66`, background: "transparent" } : { background: "#fff", boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.06)" }}
            >
              <span className={`w-[22px] shrink-0 text-[7px] font-bold tabular-nums ${d.now ? "text-white/80" : "text-black/45"}`}>{d.at}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className={`block truncate text-[8px] font-bold ${d.gap ? "text-black/45" : ""}`}>{d.who}</span>
                <span className={`block truncate text-[6.5px] ${d.now ? "text-white/70" : "text-black/45"}`}>{d.what}</span>
              </span>
              {d.tag && !d.now && (
                <Pill tone={d.tone} size={6}>
                  {d.tag}
                </Pill>
              )}
              {d.now && <ChevronRight className="size-[9px]" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="mb-[13px] mt-[5px] grid grid-cols-4 border-t border-black/[0.07] px-[6px] pt-[5px] text-center text-[6px] text-black/45">
          {[
            [CalendarDays, "Today", true],
            [Search, "Patients", false],
            [Package, "Plans", false],
            [Bell, "Alerts", false],
          ].map(([I, l, on]) => {
            const Icon = I as typeof Bell;
            return (
              <span key={l as string} className="flex flex-col items-center gap-[1px]" style={on ? { color: DEEP, fontWeight: 700 } : undefined}>
                <Icon className="size-[10px]" aria-hidden="true" />
                {l as string}
              </span>
            );
          })}
        </div>
      </Handset>

      <Handset>
        <PhoneHead title="Session note" sub="Nadia Karim · session 4 of 6" right={<span className="text-[7.5px] font-bold" style={{ color: TEAL }}>Save</span>} />
        <div className="flex flex-1 flex-col px-[10px]">
          <p className="rounded-[6px] px-[6px] py-[3px] text-[7px] leading-[1.35]" style={{ background: soft(TEAL, 14), color: DEEP }}>
            Right knee · ACL reconstruction, week 14 · goal: back to padel
          </p>
          <div className="mt-[6px]">
            <Label>Pain today (0–10)</Label>
          </div>
          <div className="mt-[3px] grid grid-cols-11 gap-[1.5px]">
            {Array.from({ length: 11 }).map((_, k) => (
              <span key={k} className="flex h-[13px] items-center justify-center rounded-[3px] text-[6.5px] font-bold" style={k === 2 ? { background: DEEP, color: "#fff" } : { background: "#eef1f1", color: "rgb(0 0 0 / 0.45)" }}>
                {k}
              </span>
            ))}
          </div>
          <p className="mt-[2px] text-[6.3px] text-black/40">Last session: 4 · first visit: 7</p>
          <div className="mt-[5px] grid grid-cols-2 gap-[4px]">
            {[
              ["Knee flexion", "128°", "target 135°"],
              ["Single-leg squat", "3 × 8", "no valgus"],
            ].map(([l, v, s]) => (
              <span key={l} className="rounded-[7px] bg-white px-[6px] py-[4px] leading-tight ring-1 ring-black/[0.07]">
                <span className="block text-[6.5px] text-black/45">{l}</span>
                <span className="block text-[12px] font-bold" style={{ color: DEEP }}>
                  {v}
                </span>
                <span className="block text-[6px] text-black/40">{s}</span>
              </span>
            ))}
          </div>
          <div className="mt-[5px]">
            <Label>Dry needling</Label>
          </div>
          <div className="mt-[3px] flex flex-wrap gap-[3px]">
            {["VMO", "Lateral quad", "ITB", "+ Add"].map((t, k) => (
              <span key={t} className="rounded-full px-[6px] py-[2px] text-[6.8px] font-semibold" style={k < 3 ? { background: soft(TX.needling, 22), color: DEEP } : { boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.15)", color: "rgb(0 0 0 / 0.5)" }}>
                {t}
              </span>
            ))}
          </div>
          <div className="mt-[5px] rounded-[7px] bg-white px-[6px] py-[4px] text-[7px] leading-[1.4] ring-1 ring-black/[0.08]">
            Good session. Quads firing well; progress to jogging intervals 2 × 10 min. Review hop test next week.
            <span className="ml-[1px] inline-block h-[7px] w-px translate-y-[1px] bg-black" />
          </div>
          <div className="mt-[5px] flex items-center gap-[5px] rounded-[7px] px-[6px] py-[4px] text-[7px]" style={{ background: soft(MINT, 20) }}>
            <CirclePlay className="size-[9px]" style={{ color: DEEP }} aria-hidden="true" />
            <span className="leading-tight">
              <b style={{ color: DEEP }}>Home plan updated</b>
              <span className="block text-[6.3px] text-black/50">4 exercises · sent to Nadia&apos;s app</span>
            </span>
          </div>
          <div className="mb-[14px] mt-auto">
            <CTA>Book next · Tue 24 Nov, 10:30</CTA>
          </div>
        </div>
      </Handset>
    </div>
  </Backdrop>
);

/* ------------------------------------------------------------------ */
/* 05 · Patient app: milestones and home exercises (EN + AR)           */
/* ------------------------------------------------------------------ */

const MILESTONES: { title: string; when: string; st: "done" | "now" | "next" }[] = [
  { title: "Walk without a limp", when: "Week 4", st: "done" },
  { title: "Full knee extension", when: "Week 8", st: "done" },
  { title: "Jog 5 km pain-free", when: "Week 12", st: "done" },
  { title: "Single-leg squat 3 × 10", when: "Week 14 · now", st: "now" },
  { title: "Back on the padel court", when: "Target week 20", st: "next" },
];

const EXERCISES_AR: { name: string; dose: string; done: boolean }[] = [
  { name: "تمرين الجسر", dose: "٣ × ١٢", done: true },
  { name: "القرفصاء على ساق واحدة", dose: "٣ × ٨", done: true },
  { name: "تمديد عضلة الفخذ الخلفية", dose: "٣ × ٣٠ ث", done: false },
  { name: "التوازن على ساق واحدة", dose: "٣ × ٤٥ ث", done: false },
];

export const RecoveryPlan: Screen = () => (
  <Backdrop>
    <div className="absolute left-[24px] top-[34px] w-[190px]" style={{ color: DEEP }}>
      <p className="text-[7.5px] font-bold uppercase tracking-[0.14em] text-black/45">Your recovery, in your pocket</p>
      <p className="mt-[6px] text-[17px] font-bold leading-[1.15] tracking-[-0.02em]">Track each milestone.</p>
      <p className="mt-[6px] text-[8.3px] leading-[1.5] text-black/60">The clinic&apos;s three steps (consultation, recovery plan, milestones) live in the app, with home exercises after every session.</p>
      <div className="mt-[9px] flex flex-col gap-[4px]">
        {["Visit us for a consultation", "Begin your journey of recovery", "Track each milestone"].map((t, k) => (
          <div key={t} className="flex items-center gap-[6px]">
            <span className="flex size-[16px] shrink-0 items-center justify-center rounded-full text-[7.5px] font-bold text-white" style={{ background: DEEP }}>
              {k + 1}
            </span>
            <span className="text-[8px] font-semibold">{t}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="absolute right-[20px] top-[11px] flex gap-[14px]">
      <Handset>
        <PhoneHead title="My recovery" sub="Right knee · ACL rehab" right={<Photo {...ICON} w={16} h={16} radius={8} />} />
        <div className="flex flex-1 flex-col px-[10px]">
          <div className="flex items-center gap-[8px] rounded-[10px] p-[7px] text-white" style={{ background: `linear-gradient(135deg, ${TEAL}, ${DEEP})` }}>
            <Donut size={40} stroke={5} segments={[{ value: 70, color: "#fff" }]}>
              <span className="text-[9px] font-bold text-white">70%</span>
            </Donut>
            <span className="leading-tight">
              <span className="block text-[8.5px] font-bold">Week 14 of 20</span>
              <span className="block text-[6.8px] text-white/75">3 of 5 milestones reached</span>
              <span className="mt-[2px] block text-[6.5px] text-white/75">Next: Tue 24 Nov, 10:30 · Shereen</span>
            </span>
          </div>
          <div className="mt-[7px]">
            <Label>Milestones</Label>
          </div>
          <div className="relative mt-[3px] flex flex-col gap-[4px] pl-[14px]">
            <span className="absolute bottom-[8px] left-[5px] top-[6px] w-[1.5px] rounded-full" style={{ background: `linear-gradient(${TEAL}, ${TEAL} 62%, #d9e2e1 62%)` }} />
            {MILESTONES.map((m) => (
              <div key={m.title} className="relative leading-tight">
                <span
                  className="absolute -left-[14px] top-[1px] flex size-[11px] items-center justify-center rounded-full"
                  style={m.st === "done" ? { background: TEAL, color: "#fff" } : m.st === "now" ? { background: "#fff", boxShadow: `inset 0 0 0 2px ${DEEP}` } : { background: "#fff", boxShadow: "inset 0 0 0 1.5px #c9d4d3" }}
                >
                  {m.st === "done" && <Check className="size-[7px]" strokeWidth={3} aria-hidden="true" />}
                </span>
                <span className={`block text-[8px] ${m.st === "now" ? "font-bold" : "font-semibold"}`} style={{ color: m.st === "next" ? "rgb(0 0 0 / 0.45)" : DEEP }}>
                  {m.title}
                </span>
                <span className="block text-[6.5px] text-black/45">{m.when}</span>
              </div>
            ))}
          </div>
          <div className="mt-[6px] flex items-center gap-[5px] rounded-[8px] bg-white px-[6px] py-[4px] ring-1 ring-black/[0.06]">
            <Trophy className="size-[10px] shrink-0 text-[#f2a65a]" aria-hidden="true" />
            <span className="text-[7px] leading-[1.35]">12-day exercise streak. Shereen sees your progress before each session.</span>
          </div>
          <div className="mb-[14px] mt-auto">
            <CTA>Today&apos;s exercises · 4</CTA>
          </div>
        </div>
      </Handset>

      <Handset>
        <div dir="rtl" className="flex flex-1 flex-col" style={ARABIC}>
          <div className="flex shrink-0 items-center gap-[4px] px-[10px] pb-[5px] pt-[3px]">
            <ChevronRight className="size-[12px] text-black/55" aria-hidden="true" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[10.5px] font-bold" style={{ color: DEEP }}>
                تماريني اليوم
              </span>
              <span className="block truncate text-[7px] text-black/45">الركبة اليمنى · الأسبوع ١٤</span>
            </span>
            <span className="rounded-full px-[5px] py-[1.5px] text-[6.5px] font-bold ring-1 ring-black/15" style={MONT}>
              EN
            </span>
          </div>
          <div className="mx-[10px] overflow-hidden rounded-[10px]" style={{ background: `linear-gradient(135deg, ${DEEP}, ${TEAL})` }}>
            <div className="relative flex h-[78px] items-center justify-center">
              <svg viewBox="0 0 120 60" className="absolute inset-0 size-full opacity-90" aria-hidden="true">
                <path d="M10 48 H110" stroke="#ffffff55" strokeWidth="1.5" />
                <circle cx="38" cy="20" r="5" fill="#fff" />
                <path d="M38 25 L48 36 L66 36 L76 47 M48 36 L44 47 M66 36 L82 30" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="relative flex size-[22px] items-center justify-center rounded-full bg-white/90" style={{ color: DEEP }}>
                <CirclePlay className="size-[13px]" aria-hidden="true" />
              </span>
              <span className="absolute bottom-[4px] left-[6px] rounded-[3px] bg-black/40 px-[3px] text-[6px] font-semibold text-white" style={MONT}>
                0:42
              </span>
            </div>
          </div>
          <div className="mx-[10px] mt-[6px] flex items-center justify-between text-[7px]">
            <span className="font-bold" style={{ color: DEEP }}>
              ٢ من ٤ مكتملة
            </span>
            <span className="w-[70px]">
              <Bar pct={50} color={TEAL} h={4} />
            </span>
          </div>
          <div className="mt-[5px] flex flex-col gap-[3px] px-[10px]">
            {EXERCISES_AR.map((e) => (
              <div key={e.name} className="flex items-center gap-[6px] rounded-[8px] bg-white px-[6px] py-[5px] ring-1 ring-black/[0.06]">
                <span className="flex size-[13px] shrink-0 items-center justify-center rounded-full" style={e.done ? { background: TEAL, color: "#fff" } : { boxShadow: "inset 0 0 0 1.5px #c9d4d3" }}>
                  {e.done && <Check className="size-[8px]" strokeWidth={3} aria-hidden="true" />}
                </span>
                <span className={`min-w-0 flex-1 truncate text-[8px] font-semibold ${e.done ? "text-black/45 line-through" : ""}`}>{e.name}</span>
                <span className="shrink-0 text-[7.5px] font-bold" style={{ color: DEEP }}>
                  {e.dose}
                </span>
              </div>
            ))}
          </div>
          <p className="mx-[10px] mt-[6px] rounded-[7px] px-[6px] py-[4px] text-[7px] leading-[1.45]" style={{ background: soft(MINT, 22), color: DEEP }}>
            ملاحظة من شيرين: لا تتجاوزي ألمًا أكثر من ٣ من ١٠.
          </p>
          <div className="mb-[14px] mt-auto px-[10px]">
            <span className="flex h-[26px] items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: TEAL }}>
              ابدئي التمرين التالي
            </span>
          </div>
        </div>
      </Handset>
    </div>
  </Backdrop>
);

/* ------------------------------------------------------------------ */
/* 06 · Owner dashboard on a laptop + next-day summary on a phone       */
/* ------------------------------------------------------------------ */

const UTIL = [51, 58, 67, 76, 81, 84, 84];
const MONTHS_SHORT = ["Start", "", "M2", "", "M4", "", "M6"];
// Bookings per month by channel: app, WhatsApp, website form, phone.
const CHANNELS = [
  [0, 210, 70, 110],
  [150, 120, 40, 70],
  [260, 80, 35, 45],
  [330, 70, 30, 35],
  [360, 75, 28, 32],
  [385, 82, 30, 30],
  [392, 85, 32, 30],
];
const CH_COLORS = [TEAL, "#22a559", "#5b9bd5", "#b8c4c3"];

export const OwnerDashboard: Screen = () => (
  <div className="relative h-full w-full overflow-hidden" style={{ ...MONT, color: INK, background: `linear-gradient(165deg, ${OFF}, ${WASH})` }}>
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
      <path d="M0 0 H640 V70 C 520 110 380 40 230 80 S 60 90 0 60 Z" fill={TEAL} />
    </svg>
    <div className="absolute left-[30px] top-[14px] flex items-center gap-[10px] text-white">
      <Photo {...LOGO_WHITE} w={84} h={26} />
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/85">Six months after launch</span>
    </div>

    <div className="absolute left-[40px] top-[50px]">
      <Laptop w={426} h={300}>
        <div className="flex h-full flex-col" style={{ ...MONT, color: INK, background: "#f3f8f7" }}>
          <div className="flex h-[22px] shrink-0 items-center gap-[6px] px-[8px] text-white" style={{ background: DEEP }}>
            <span className="text-[8px] font-bold">Clinic performance</span>
            <span className="text-[6.8px] text-white/65">Owner view · all practitioners</span>
            <span className="ml-auto rounded-full bg-white/15 px-[6px] py-[1.5px] text-[6.5px] font-semibold">Last 6 months</span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-[5px] p-[6px]">
            <div className="grid shrink-0 grid-cols-4 gap-[5px]">
              <Kpi label="Utilisation" value="84%" delta="from 51%" tint={DEEP} accent />
              <Kpi label="Booked in-app" value="68%" delta="+68 pts" tint={DEEP} />
              <Kpi label="No-shows" value="−45%" delta="11% → 6%" tint={DEEP} />
              <Kpi label="Packs sold" value="42" delta="6 sessions" sub="each" tint={DEEP} />
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[5px]">
              <Panel title="Utilisation" action={<span>% of bookable hours</span>} pad={false}>
                <div className="px-[8px] pb-[3px] pt-[5px]">
                  <LineChart w={176} h={82} max={100} min={40} grid={3} yFormat={(n) => `${n}%`} labels={MONTHS_SHORT} series={[{ values: UTIL, color: TEAL, area: true }]} />
                </div>
              </Panel>
              <Panel title="Bookings by channel" action={<span>per month</span>} pad={false}>
                <div className="px-[8px] pb-[2px] pt-[5px]">
                  <BarChart w={176} h={64} bars={CHANNELS} colors={CH_COLORS} max={540} gap={0.3} yFormat={(n) => String(Math.round(n))} labels={MONTHS_SHORT} />
                  <div className="mt-[2px]">
                    <Legend items={[{ label: "App", color: CH_COLORS[0] }, { label: "WhatsApp", color: CH_COLORS[1] }, { label: "Form", color: CH_COLORS[2] }, { label: "Phone", color: CH_COLORS[3] }]} />
                  </div>
                </div>
              </Panel>
            </div>
            <Panel title="Treatment mix this month" pad={false} className="shrink-0">
              <div className="flex items-center gap-[10px] px-[8px] py-[5px]">
                {[
                  ["Physio + needling", 46, TX.physio],
                  ["Chiropractic", 21, TX.chiro],
                  ["Sports rehab", 18, TX.rehab],
                  ["Massage", 15, TX.massage],
                ].map(([l, v, c]) => (
                  <div key={l as string} className="min-w-0 flex-1">
                    <p className="flex justify-between text-[6.8px]">
                      <span className="truncate text-black/60">{l as string}</span>
                      <b>{v as number}%</b>
                    </p>
                    <div className="mt-[2px]">
                      <Bar pct={(v as number) * 2} color={c as string} h={3} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </Laptop>
    </div>

    <div className="absolute right-[30px] top-[78px]">
      <Phone w={148} h={300} bg={WASH} bar={WASH}>
        <div className="flex flex-1 flex-col gap-[5px] px-[7px] pb-[6px] pt-[4px]" style={MONT}>
          <p className="text-center text-[6.5px] text-black/45" style={SYS}>
            Wednesday 18 November
          </p>
          <p className="text-center text-[22px] font-semibold leading-none tracking-[-0.02em]" style={{ ...SYS, color: DEEP }}>
            19:30
          </p>
          <div className="mt-[4px] rounded-[10px] bg-white/90 p-[6px] shadow-[0_2px_6px_rgb(0_0_0/0.08)] ring-1 ring-black/[0.04]">
            <div className="flex items-center gap-[4px]">
              <Photo {...ICON} w={13} h={13} radius={3} />
              <span className="text-[6.5px] font-semibold uppercase tracking-[0.04em] text-black/50">PhysioFit Admin</span>
              <span className="ml-auto text-[6px] text-black/40">now</span>
            </div>
            <p className="mt-[3px] text-[8px] font-bold" style={{ color: DEEP }}>
              Tomorrow, Thu 19 Nov
            </p>
            <div className="mt-[2px] space-y-[2px] text-[7px] leading-[1.35]">
              {[
                ["31", "sessions booked · 88%"],
                ["3", "open slots offered to 5 on the waitlist"],
                ["2", "deposits still to pay"],
                ["4", "first visits, 60 min each"],
              ].map(([n, t]) => (
                <p key={t} className="flex gap-[4px]">
                  <b className="w-[10px] shrink-0 text-right" style={{ color: TEAL }}>
                    {n}
                  </b>
                  <span>{t}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[10px] bg-white/90 p-[6px] shadow-[0_2px_6px_rgb(0_0_0/0.08)] ring-1 ring-black/[0.04]">
            <div className="flex items-center gap-[4px]">
              <Photo {...ICON} w={13} h={13} radius={3} />
              <span className="text-[6.5px] font-semibold uppercase tracking-[0.04em] text-black/50">PhysioFit Admin</span>
              <span className="ml-auto text-[6px] text-black/40">18:40</span>
            </div>
            <p className="mt-[3px] text-[7px] leading-[1.35]">
              <b>Slot refilled.</b> Ben W. cancelled Thu 13:15 massage; Elena P. took it from the waitlist in 4 min.
            </p>
          </div>
          <span className="mt-auto flex items-center justify-center gap-[3px] text-[6.5px] text-black/40">
            <X className="size-[6px]" aria-hidden="true" /> Clear
          </span>
        </div>
      </Phone>
    </div>
  </div>
);

export const physioFitScreens: Screen[] = [PatientBooking, FrontDeskInbox, ClinicCalendar, PractitionerApp, RecoveryPlan, OwnerDashboard];
