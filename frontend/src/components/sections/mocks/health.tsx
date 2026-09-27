import { CalendarCheck, ChevronLeft, Home, MapPin, MessageCircle, Mic, Phone as PhoneIcon, PhoneForwarded, UserRound } from "lucide-react";

import { At, Avatar, Bar, Browser, Card, Phone, Pill, Tilt, ToolChip, type LayoutProps } from "./kit";

/* ------------------------------------------------------------------ */
/* Physio booking app: mobile calendar, time slots, therapists         */
/* ------------------------------------------------------------------ */

const DAYS = [
  ["Mon", 9],
  ["Tue", 10],
  ["Wed", 11],
  ["Thu", 12],
  ["Fri", 13],
] as const;
const THERAPISTS = [
  { name: "Sara", initials: "SK", i: 2, util: 91 },
  { name: "Omar", initials: "OH", i: 0, util: 86 },
  { name: "Lina", initials: "LM", i: 1, util: 78 },
];
const SLOTS: [string, "free" | "taken" | "picked"][] = [
  ["08:30", "free"],
  ["09:15", "taken"],
  ["10:00", "free"],
  ["10:30", "picked"],
  ["11:15", "taken"],
  ["12:00", "free"],
  ["14:00", "free"],
  ["15:30", "taken"],
  ["16:15", "free"],
];

function BookingPhone({ tint, w, h, slots = 9 }: { tint: string; w: number; h: number; slots?: number }) {
  return (
    <Phone w={w} h={h} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[4px]">
        <div className="flex items-center gap-[4px]">
          <ChevronLeft className="size-[11px] text-black/40" aria-hidden="true" />
          <span className="text-[11px] font-bold">Book a session</span>
        </div>
        <p className="mt-[6px] text-[8.5px] font-medium uppercase tracking-[0.08em] text-black/40">March 2026</p>
        <div className="mt-[4px] grid grid-cols-5 gap-[4px]">
          {DAYS.map(([d, n]) => {
            const on = n === 11;
            return (
              <span key={d} className="flex flex-col items-center rounded-[8px] py-[4px] leading-none" style={on ? { background: tint, color: "#fff" } : { background: "rgb(0 0 0 / 0.04)" }}>
                <span className={`text-[8px] ${on ? "text-white/80" : "text-black/45"}`}>{d}</span>
                <span className="mt-[3px] text-[11px] font-bold">{n}</span>
              </span>
            );
          })}
        </div>
        <p className="mt-[8px] text-[8.5px] font-medium uppercase tracking-[0.08em] text-black/40">Therapist</p>
        <div className="mt-[5px] flex justify-between px-[2px]">
          {THERAPISTS.map((t, k) => (
            <span key={t.name} className="flex flex-col items-center gap-[3px]">
              <Avatar text={t.initials} i={t.i} size={24} ring={k === 0 ? tint : undefined} />
              <span className={`text-[8.5px] ${k === 0 ? "font-semibold" : "text-black/50"}`}>{t.name}</span>
            </span>
          ))}
        </div>
        <p className="mt-[7px] text-[8.5px] font-medium uppercase tracking-[0.08em] text-black/40">Available times</p>
        <div className="mt-[4px] grid grid-cols-3 gap-[4px]">
          {SLOTS.slice(0, slots).map(([t, s]) => (
            <span
              key={t}
              className={`flex h-[18px] items-center justify-center rounded-[6px] text-[9px] font-semibold ${s === "taken" ? "text-black/25 line-through" : ""}`}
              style={s === "picked" ? { background: tint, color: "#fff" } : s === "free" ? { boxShadow: `inset 0 0 0 1px ${tint}55`, color: tint } : { background: "rgb(0 0 0 / 0.04)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-[7px] flex items-center justify-between rounded-[7px] bg-black/[0.04] px-[7px] py-[5px] text-[9px]">
          <span className="flex items-center gap-[4px]">
            <Home className="size-[9px]" aria-hidden="true" /> Home visit
          </span>
          <span className="flex h-[11px] w-[19px] items-center justify-end rounded-full p-[2px]" style={{ background: tint }}>
            <span className="size-[7px] rounded-full bg-white" />
          </span>
        </div>
        <span className="mt-[7px] flex h-[25px] shrink-0 items-center justify-center rounded-[9px] text-[10px] font-semibold text-white" style={{ background: tint }}>
          Confirm 10:30 with Sara
        </span>
      </div>
    </Phone>
  );
}

const AGENDA = [
  { time: "08:30", what: "Knee rehab", where: "Clinic · Room 2", tone: "grey" as const },
  { time: "10:30", what: "Lower back", where: "Home visit · JLT", tone: "blue" as const },
  { time: "12:00", what: "Sports massage", where: "Clinic · Room 1", tone: "grey" as const },
  { time: "14:00", what: "Shoulder assessment", where: "Clinic · Room 2", tone: "grey" as const },
];

function TherapistDayPhone({ tint, w, h }: { tint: string; w: number; h: number }) {
  return (
    <Phone w={w} h={h} bg="#f4f7f6">
      <div className="px-[10px] pb-[8px] pt-[4px] text-white" style={{ background: tint }}>
        <p className="text-[8.5px] text-white/75">Wed 11 March</p>
        <p className="text-[12px] font-bold leading-tight">Sara&apos;s day</p>
        <div className="mt-[6px] flex items-center gap-[6px] text-[8.5px]">
          <span className="flex-1">
            <Bar pct={91} color="#fff" h={4} track="rgb(255 255 255 / 0.25)" />
          </span>
          91% booked
        </div>
      </div>
      <div className="flex-1 space-y-[5px] px-[8px] pt-[7px]">
        {AGENDA.map((a) => (
          <div key={a.time} className="flex gap-[6px] rounded-[8px] bg-white p-[6px] ring-1 ring-black/[0.05]">
            <span className="w-[26px] shrink-0 text-[9px] font-bold" style={{ color: tint }}>
              {a.time}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[9.5px] font-semibold leading-tight">{a.what}</p>
              <p className="mt-[1px] flex items-center gap-[2px] truncate text-[8.5px] leading-tight text-black/45">
                {a.tone === "blue" ? <Home className="size-[7px] shrink-0" aria-hidden="true" /> : <MapPin className="size-[7px] shrink-0" aria-hidden="true" />}
                {a.where}
              </p>
            </div>
          </div>
        ))}
        <p className="flex items-center gap-[4px] px-[2px] pt-[2px] text-[8.5px] text-black/50">
          <MessageCircle className="size-[8px]" aria-hidden="true" /> Reminders sent to all patients
        </p>
      </div>
    </Phone>
  );
}

function UtilCard({ tint, w, value }: { tint: string; w: number; value: string }) {
  return (
    <Card w={w}>
      <p className="text-[9px] text-black/50">Therapist utilisation</p>
      <p className="text-[20px] font-bold leading-tight tracking-[-0.02em]" style={{ color: tint }}>
        {value}
      </p>
      <div className="mt-[6px] space-y-[6px]">
        {THERAPISTS.map((t) => (
          <div key={t.name} className="flex items-center gap-[6px] text-[9px]">
            <Avatar text={t.initials} i={t.i} size={16} />
            <span className="w-[26px]">{t.name}</span>
            <span className="flex-1">
              <Bar pct={t.util} color={tint} h={5} />
            </span>
            <span className="w-[24px] text-right font-semibold tabular-nums">{t.util}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PhysioMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  const util = study.metrics[0]?.value ?? "84%";
  if (v === "narrow") {
    return (
      <>
        <At x={28} y={0} z={2}>
          <Tilt m="lift">
            <BookingPhone tint={tint} w={160} h={310} slots={6} />
          </Tilt>
        </At>
        <At x={208} y={26}>
          <UtilCard tint={tint} w={176} value={util} />
        </At>
        <At x={208} y={164}>
          <div className="flex items-center gap-[6px] rounded-[10px] bg-white px-[9px] py-[7px] text-[9.5px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
            <CalendarCheck className="size-[12px]" style={{ color: tint }} aria-hidden="true" />
            No-shows {study.metrics[2]?.value ?? "-45%"}
          </div>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={24} y={70}>
        <UtilCard tint={tint} w={184} value={util} />
      </At>
      <At x={226} y={0} z={2}>
        <Tilt m="lift">
          <BookingPhone tint={tint} w={176} h={362} />
        </Tilt>
      </At>
      <At x={420} y={34}>
        <Tilt m="right">
          <TherapistDayPhone tint={tint} w={168} h={330} />
        </Tilt>
      </At>
      <At x={36} y={250} z={3}>
        <div className="flex items-center gap-[7px] rounded-[10px] bg-white px-[10px] py-[8px] text-[10px] shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[20px] items-center justify-center rounded-full bg-[#dcfce7] text-[#166534]">
            <CalendarCheck className="size-[11px]" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold">Home visit booked</span>
            <span className="block text-[9px] text-black/50">Wed 10:30 · Sara K.</span>
          </span>
        </div>
      </At>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Diagnostics voice agent: live call transcript + staff console        */
/* ------------------------------------------------------------------ */

const WAVE = [5, 9, 14, 8, 17, 11, 6, 13, 18, 9, 12, 7, 15, 10, 5, 11, 16, 8, 12, 6];

function CallPhone({ tint, w, h, short = false }: { tint: string; w: number; h: number; short?: boolean }) {
  return (
    <Phone w={w} h={h} dark bg={`linear-gradient(180deg, color-mix(in oklab, ${tint} 55%, #000) 0%, #0b1114 55%)`}>
      <div className="flex flex-1 flex-col px-[10px] pt-[6px]">
        <div className="flex flex-col items-center">
          <span className="flex size-[30px] items-center justify-center rounded-full ring-1 ring-white/25" style={{ background: `${tint}` }}>
            <Mic className="size-[14px]" aria-hidden="true" />
          </span>
          <p className="mt-[5px] text-[11px] font-semibold leading-tight">AI receptionist</p>
          <p className="text-[8.5px] text-white/60">Northside Imaging · 01:42</p>
          <div className="mock2-wave mt-[6px] flex h-[18px] items-center gap-[2px]">
            {WAVE.slice(0, short ? 14 : 20).map((b, i) => (
              <span key={i} className="w-[2.5px] rounded-full bg-white/80" style={{ height: b }} />
            ))}
          </div>
        </div>
        <div className="mt-[8px] space-y-[5px]">
          <p className="max-w-[88%] rounded-[9px] rounded-bl-[3px] bg-white/12 px-[7px] py-[5px] text-[9px] leading-[1.35] ring-1 ring-white/10">Can I move my MRI to Thursday afternoon?</p>
          <ToolChip dark>check_slots(MRI, Thu)</ToolChip>
          <p className="ml-auto max-w-[88%] rounded-[9px] rounded-br-[3px] px-[7px] py-[5px] text-[9px] leading-[1.35]" style={{ background: tint }}>
            Thursday 14:30 is free at Salford. Shall I book it?
          </p>
          {!short && (
            <>
              <p className="max-w-[60%] rounded-[9px] rounded-bl-[3px] bg-white/12 px-[7px] py-[5px] text-[9px] leading-[1.35] ring-1 ring-white/10">Yes, please.</p>
              <ToolChip dark>book_appointment → #A-2291</ToolChip>
            </>
          )}
        </div>
        <div className="mt-auto flex justify-center gap-[14px] pb-[6px] pt-[6px]">
          <span className="flex size-[26px] items-center justify-center rounded-full bg-white/15">
            <PhoneForwarded className="size-[11px]" aria-hidden="true" />
          </span>
          <span className="flex size-[26px] items-center justify-center rounded-full bg-[#ef4444]">
            <PhoneIcon className="size-[11px] rotate-[135deg]" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Phone>
  );
}

const CONVOS = [
  { who: "Patient · 0161 ••• 204", what: "Moved MRI to Thu 14:30", ch: "voice" as const, status: "Resolved", tone: "green" as const },
  { who: "Patient · WhatsApp", what: "Pre-scan questionnaire done", ch: "chat" as const, status: "Resolved", tone: "green" as const },
  { who: "Patient · 07700 ••• 118", what: "Asks about sedation risk", ch: "voice" as const, status: "Handover", tone: "amber" as const },
  { who: "Patient · WhatsApp", what: "Booked CT, Salford", ch: "chat" as const, status: "Resolved", tone: "green" as const },
  { who: "GP referral", what: "Ultrasound slot offered", ch: "chat" as const, status: "Waiting", tone: "blue" as const },
];

function ConsoleScreen({ study, rows }: { study: LayoutProps["study"]; rows: number }) {
  const tint = study.tint;
  return (
    <div className="flex h-full flex-col bg-[#f5f7f8]">
      <div className="grid grid-cols-3 gap-[6px] px-[9px] pt-[9px]">
        {study.screen.map((s, i) => (
          <div key={s.label} className="rounded-[7px] bg-white px-[7px] py-[5px] ring-1 ring-black/[0.06]">
            <p className="truncate text-[8.5px] text-black/50">{s.label}</p>
            <p className="text-[14px] font-bold leading-tight" style={i === 1 ? { color: tint } : undefined}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <p className="px-[10px] pb-[4px] pt-[8px] text-[9px] font-semibold uppercase tracking-[0.08em] text-black/40">Live conversations</p>
      <div className="mx-[9px] overflow-hidden rounded-[7px] bg-white ring-1 ring-black/[0.06]">
        {CONVOS.slice(0, rows).map((c, k) => (
          <div key={k} className="flex h-[30px] items-center gap-[7px] border-t border-black/[0.05] px-[8px] first:border-t-0" style={c.status === "Handover" ? { background: "#fffbeb" } : undefined}>
            <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: c.ch === "voice" ? `${tint}1f` : "#dcfce7", color: c.ch === "voice" ? tint : "#15803d" }}>
              {c.ch === "voice" ? <PhoneIcon className="size-[9px]" aria-hidden="true" /> : <MessageCircle className="size-[9px]" aria-hidden="true" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9.5px] font-semibold leading-tight">{c.what}</p>
              <p className="truncate text-[8.5px] leading-tight text-black/45">{c.who}</p>
            </div>
            {c.status === "Handover" ? (
              <Pill tone="amber" size={8}>
                <UserRound className="size-[8px]" aria-hidden="true" />
                To staff
              </Pill>
            ) : (
              <Pill tone={c.tone} dot size={8}>
                {c.status}
              </Pill>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function VoiceAgentMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={226} y={0} z={2}>
          <Tilt m="lift">
            <CallPhone tint={tint} w={166} h={300} short />
          </Tilt>
        </At>
        <At x={4} y={24}>
          <Tilt m="left">
            <Browser w={222} h={236} url="northside-imaging.co.uk">
              <ConsoleScreen study={study} rows={4} />
            </Browser>
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={10} y={36}>
        <Tilt m="left">
          <Browser w={410} h={300} url="console.northside-imaging.co.uk/live">
            <ConsoleScreen study={study} rows={5} />
          </Browser>
        </Tilt>
      </At>
      <At x={432} y={0} z={2}>
        <Tilt m="lift">
          <CallPhone tint={tint} w={184} h={364} />
        </Tilt>
      </At>
      <At x={250} y={300} z={3}>
        <div className="flex items-center gap-[7px] rounded-full bg-white py-[5px] pl-[5px] pr-[11px] text-[10px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[20px] items-center justify-center rounded-full bg-[#fef3c7] text-[#92400e]">
            <PhoneForwarded className="size-[10px]" aria-hidden="true" />
          </span>
          Handed to staff with full context
        </div>
      </At>
    </>
  );
}
