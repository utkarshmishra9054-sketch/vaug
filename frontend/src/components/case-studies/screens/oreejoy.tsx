import { Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import {
  Activity,
  BatteryMedium,
  Bluetooth,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  CircleCheck,
  Download,
  FileText,
  Footprints,
  Gauge,
  LayoutDashboard,
  Pause,
  Pencil,
  Settings,
  ShieldAlert,
  Smartphone,
  TriangleAlert,
  Users,
  Vibrate,
  Zap,
} from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Donut, Kpi, Legend, LineChart, Panel, Phone, Pill, Spark, Tag, Th, Tr, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Oreejoy MedTech · Instrole smart-insole gait system · clinician portal, companion app, website editor.
 *
 * Brand from oreejoy.in (read 22 Nov 2026): Plus Jakarta Sans; blue #2563eb to cyan #0891b2
 * gradient on buttons; navy #0f172a text, slate #475569, light #f8fafc and a pale blue wash.
 * Conditions (foot drop, Parkinson's freezing of gait, elderly fall risk, gait indexing), lab
 * highlights and publication titles are from the site.
 * TODO(content): illustrative. Patients (initials only), clinicians, sessions, readings and every
 * chart are invented demo data; confirm the portal's real screens with Oreejoy.
 */

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: jakarta.style.fontFamily };

const BLUE = "#2563eb";
const CYAN = "#0891b2";
const NAVY = "#0f172a";
const SLATE = "#475569";
const WASH = "#eef4fb";
const GRAD = `linear-gradient(135deg, ${BLUE}, ${CYAN})`;
/** Condition colours. */
const COND = { pd: "#7c3aed", stroke: "#0891b2", drop: "#f59e0b", fall: "#e11d48" } as const;
const LOGO = { src: "/logos/oreejoy.webp", img: { w: 599, h: 157 } };
const HOST = "portal.oreejoy.in";

/* ------------------------------------------------------------------ */
/* Portal shell                                                        */
/* ------------------------------------------------------------------ */

const NAV: { label: string; Icon: typeof Users; badge?: number }[] = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Patients", Icon: Users, badge: 24 },
  { label: "Sessions", Icon: Activity },
  { label: "Freezing", Icon: Zap, badge: 9 },
  { label: "Fall risk", Icon: ShieldAlert, badge: 3 },
  { label: "Reports", Icon: FileText },
  { label: "Devices", Icon: Footprints, badge: 18 },
  { label: "Settings", Icon: Settings },
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`${HOST}/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: NAVY, background: "#f8fafc" }}>
        <aside className="flex h-full w-[124px] shrink-0 flex-col border-r border-black/[0.07] bg-white px-[8px] py-[10px]">
          <Photo {...LOGO} w={92} h={24} />
          <p className="mt-[3px] pl-[2px] text-[6.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: CYAN }}>
            Instrole clinician portal
          </p>
          <nav className="mt-[10px] flex flex-col gap-[2px]">
            {NAV.map((n, i) => {
              const on = i === active;
              return (
                <span key={n.label} className={`flex h-[23px] items-center gap-[6px] rounded-[7px] px-[6px] text-[8.8px] ${on ? "font-bold text-white" : "font-medium"}`} style={on ? { background: GRAD } : { color: SLATE }}>
                  <n.Icon className="size-[10.5px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  <span className="truncate">{n.label}</span>
                  {n.badge !== undefined && (
                    <span className="ml-auto rounded-full px-[4.5px] py-[1.5px] text-[7px] font-bold leading-none" style={on ? { background: "rgb(255 255 255 / 0.25)" } : { background: WASH, color: BLUE }}>
                      {n.badge}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
          <div className="mt-auto rounded-[8px] p-[6px]" style={{ background: WASH }}>
            <p className="text-[8px] font-bold">Dr. Kavya Mehta</p>
            <p className="text-[7px]" style={{ color: SLATE }}>
              Physiotherapist · Gait lab
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b border-black/[0.07] bg-white px-[12px]">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-extrabold tracking-[-0.02em]">{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: SLATE }}>
                {sub}
              </p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-[6px]">{right}</div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

function GradBtn({ children, Icon }: { children: ReactNode; Icon?: typeof Users }) {
  return (
    <span className="inline-flex h-[22px] items-center gap-[4px] rounded-full px-[9px] text-[8px] font-bold text-white" style={{ background: GRAD }}>
      {Icon && <Icon className="size-[9px]" aria-hidden="true" />}
      {children}
    </span>
  );
}

function GhostBtn({ children, Icon }: { children: ReactNode; Icon?: typeof Users }) {
  return (
    <span className="inline-flex h-[22px] items-center gap-[4px] rounded-full bg-white px-[9px] text-[8px] font-semibold ring-1 ring-black/10">
      {Icon && <Icon className="size-[9px]" aria-hidden="true" />}
      {children}
    </span>
  );
}

const condTag = (c: keyof typeof COND) => {
  const label = { pd: "Parkinson's", stroke: "Post-stroke", drop: "Foot drop", fall: "Fall risk" }[c];
  return (
    <Tag color={COND[c]} size={7.5}>
      {label}
    </Tag>
  );
};

/* ------------------------------------------------------------------ */
/* 01 · Patients                                                       */
/* ------------------------------------------------------------------ */

const PATIENTS: { id: string; who: string; c: keyof typeof COND; last: string; gi: number; trend: number[]; cad: number; asym: string; fog: number; risk: ["Low" | "Medium" | "High", "green" | "amber" | "red"] }[] = [
  { id: "PD-014", who: "R.P. · 67 M", c: "pd", last: "Today 10:40", gi: 64, trend: [70, 68, 69, 66, 65, 64], cad: 92, asym: "11%", fog: 4, risk: ["High", "red"] },
  { id: "ST-021", who: "S.K. · 58 F", c: "stroke", last: "Today 09:15", gi: 71, trend: [61, 63, 66, 67, 70, 71], cad: 98, asym: "17%", fog: 0, risk: ["Medium", "amber"] },
  { id: "FD-007", who: "A.D. · 44 M", c: "drop", last: "Yesterday", gi: 78, trend: [72, 73, 75, 76, 77, 78], cad: 104, asym: "8%", fog: 0, risk: ["Low", "green"] },
  { id: "EL-030", who: "M.S. · 79 F", c: "fall", last: "Yesterday", gi: 59, trend: [66, 65, 63, 62, 60, 59], cad: 86, asym: "6%", fog: 0, risk: ["High", "red"] },
  { id: "PD-019", who: "J.N. · 72 M", c: "pd", last: "Mon 16 Nov", gi: 68, trend: [66, 67, 66, 68, 67, 68], cad: 95, asym: "9%", fog: 3, risk: ["Medium", "amber"] },
  { id: "ST-026", who: "P.B. · 63 M", c: "stroke", last: "Mon 16 Nov", gi: 66, trend: [58, 60, 61, 63, 65, 66], cad: 93, asym: "21%", fog: 0, risk: ["Medium", "amber"] },
  { id: "EL-033", who: "K.V. · 81 F", c: "fall", last: "Sun 15 Nov", gi: 62, trend: [62, 63, 62, 61, 62, 62], cad: 88, asym: "5%", fog: 0, risk: ["Medium", "amber"] },
  { id: "FD-011", who: "H.T. · 39 F", c: "drop", last: "Sat 14 Nov", gi: 81, trend: [74, 76, 78, 79, 80, 81], cad: 106, asym: "7%", fog: 0, risk: ["Low", "green"] },
];
const PCOLS = "78px 64px 1fr 32px 24px 42px";

const Patients: Screen = () => (
  <Portal path="patients" active={1} title="Patients" sub="Gait lab · IIT Gandhinagar Research Park · Wed 18 Nov 2026" right={<><GhostBtn Icon={Download}>Export</GhostBtn><GradBtn Icon={Users}>Add patient</GradBtn></>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        <Kpi tint={BLUE} accent label="Patients monitored" value="24" sub="4 conditions" />
        <Kpi tint={BLUE} label="Walks this week" value="61" delta="+12" sub="vs last week" />
        <Kpi tint={BLUE} label="Freezing episodes" value="9" delta="-3" sub="flagged for review" />
        <Kpi tint={BLUE} label="Fall-risk alerts" value="3" delta="+1" good={false} sub="balance degrading" />
      </div>
      <div className="flex min-h-0 flex-1 gap-[8px]">
        <Panel pad={false} className="min-w-0 flex-1" title="All patients" action={<span>Sorted by last walk</span>}>
          <Th cols={PCOLS}>
            <span>Patient</span>
            <span>Condition</span>
            <span>Gait index · 6 wks</span>
            <span className="text-right">Asym.</span>
            <span className="text-right">FoG</span>
            <span className="text-right">Risk</span>
          </Th>
          {PATIENTS.map((p, i) => (
            <Tr key={p.id} cols={PCOLS} h={27} highlight={i === 0 ? WASH : undefined}>
              <span className="leading-tight">
                <span className="block text-[8.5px] font-bold">{p.who}</span>
                <span className="block text-[6.8px]" style={{ color: SLATE }}>
                  <span className="font-mono">{p.id}</span> · {p.last}
                </span>
              </span>
              <span>{condTag(p.c)}</span>
              <span className="flex items-center gap-[5px]">
                <b className="w-[16px] text-[9px]">{p.gi}</b>
                <Spark values={p.trend} w={50} h={14} color={p.trend[5] >= p.trend[0] ? "#16a34a" : "#e11d48"} />
              </span>
              <span className="text-right text-[8.5px] tabular-nums">{p.asym}</span>
              <span className="text-right text-[8.5px] font-bold tabular-nums" style={{ color: p.fog ? COND.pd : SLATE }}>
                {p.fog}
              </span>
              <span className="flex justify-end">
                <Pill tone={p.risk[1]} size={7.2}>
                  {p.risk[0]}
                </Pill>
              </span>
            </Tr>
          ))}
        </Panel>
        <Panel className="w-[112px] shrink-0" title="By condition">
          <div className="flex flex-col items-center gap-[8px]">
            <Donut size={78} stroke={11} segments={[{ value: 9, color: COND.pd }, { value: 6, color: COND.stroke }, { value: 4, color: COND.drop }, { value: 5, color: COND.fall }]}>
              <span className="text-center leading-none">
                <b className="block text-[15px]">24</b>
                <span className="text-[6.5px]" style={{ color: SLATE }}>
                  patients
                </span>
              </span>
            </Donut>
            <div className="w-full space-y-[4px] text-[7.6px]">
              {[
                ["Parkinson's", 9, COND.pd],
                ["Post-stroke", 6, COND.stroke],
                ["Fall risk", 5, COND.fall],
                ["Foot drop", 4, COND.drop],
              ].map(([l, n, c]) => (
                <p key={l as string} className="flex items-center gap-[4px]">
                  <span className="size-[6px] rounded-[2px]" style={{ background: c as string }} />
                  <span className="flex-1">{l}</span>
                  <b>{n}</b>
                </p>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  </Portal>
);

/* ------------------------------------------------------------------ */
/* 02 · Session report: pressure maps, gait cycle                      */
/* ------------------------------------------------------------------ */

/** A foot-shaped insole with pressure "blobs". Right foot is mirrored. */
function Insole({ side, spots }: { side: "L" | "R"; spots: { x: number; y: number; r: number; v: number }[] }) {
  const id = `ins-${side}`;
  const heat = (v: number) => (v > 0.8 ? "#ef4444" : v > 0.6 ? "#f59e0b" : v > 0.4 ? "#facc15" : v > 0.2 ? "#22d3ee" : "#3b82f6");
  return (
    <svg width="64" height="150" viewBox="0 0 64 150" aria-hidden="true" style={side === "R" ? { transform: "scaleX(-1)" } : undefined}>
      <defs>
        <clipPath id={id}>
          <path d="M30 4 C 46 4 56 18 56 38 C 56 58 50 70 48 86 C 46 104 52 118 50 132 C 48 144 40 148 30 148 C 18 148 12 140 12 128 C 12 112 18 102 16 86 C 14 70 6 56 8 36 C 10 16 18 4 30 4 Z" />
        </clipPath>
        {spots.map((s, i) => (
          <radialGradient key={i} id={`${id}-g${i}`}>
            <stop offset="0%" stopColor={heat(s.v)} stopOpacity="0.95" />
            <stop offset="55%" stopColor={heat(s.v * 0.7)} stopOpacity="0.6" />
            <stop offset="100%" stopColor={heat(0.1)} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="64" height="150" fill="#1e3a8a" opacity="0.12" />
        {spots.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`url(#${id}-g${i})`} />
        ))}
      </g>
      <path d="M30 4 C 46 4 56 18 56 38 C 56 58 50 70 48 86 C 46 104 52 118 50 132 C 48 144 40 148 30 148 C 18 148 12 140 12 128 C 12 112 18 102 16 86 C 14 70 6 56 8 36 C 10 16 18 4 30 4 Z" fill="none" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

const LEFT = [
  { x: 24, y: 18, r: 14, v: 0.55 },
  { x: 40, y: 40, r: 16, v: 0.72 },
  { x: 20, y: 46, r: 14, v: 0.5 },
  { x: 44, y: 84, r: 12, v: 0.34 },
  { x: 30, y: 128, r: 20, v: 0.9 },
];
const RIGHT = [
  { x: 24, y: 18, r: 12, v: 0.42 },
  { x: 40, y: 40, r: 15, v: 0.6 },
  { x: 20, y: 48, r: 12, v: 0.38 },
  { x: 44, y: 86, r: 14, v: 0.48 },
  { x: 30, y: 128, r: 18, v: 0.66 },
];

const SessionReport: Screen = () => (
  <Portal path="sessions/PD-014/2026-11-18" active={2} title="Session report · R.P. (PD-014)" sub="Today 10:40 · 10 min 12 s indoor walk with two turns · cueing on" right={<><GhostBtn Icon={Pencil}>Add note</GhostBtn><GradBtn Icon={FileText}>PDF report</GradBtn></>}>
    <div className="grid h-full grid-cols-[176px_1fr] gap-[8px]">
      <Panel title="Peak foot pressure" action={<span>kPa</span>}>
        <div className="flex items-start justify-center gap-[10px]">
          <div className="text-center">
            <Insole side="L" spots={LEFT} />
            <p className="text-[7.5px] font-bold">Left · 312</p>
          </div>
          <div className="text-center">
            <Insole side="R" spots={RIGHT} />
            <p className="text-[7.5px] font-bold">Right · 248</p>
          </div>
        </div>
        <div className="mt-[6px] h-[5px] rounded-full" style={{ background: "linear-gradient(90deg,#3b82f6,#22d3ee,#facc15,#f59e0b,#ef4444)" }} />
        <p className="mt-[2px] flex justify-between text-[6.5px]" style={{ color: SLATE }}>
          <span>0</span>
          <span>150</span>
          <span>300+</span>
        </p>
        <p className="mt-[5px] rounded-[6px] px-[6px] py-[4px] text-[7.2px] leading-[1.35]" style={{ background: WASH }}>
          <b>Heel-loaded left foot.</b> Forefoot push-off weaker on the right; consistent with last 3 sessions.
        </p>
      </Panel>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <div className="grid grid-cols-4 gap-[8px]">
          <Kpi tint={BLUE} label="Cadence" value="92" sub="per min" delta="-4" good={false} />
          <Kpi tint={BLUE} label="Stride time" value="1.31 s" sub="CV 6.8%" />
          <Kpi tint={BLUE} label="Asymmetry" value="11%" sub="L longer" delta="+2" good={false} />
          <Kpi tint={BLUE} label="Gait index" value="64" sub="of 100" delta="-1" good={false} />
        </div>
        <Panel title="Gait cycle · strides 40–46" action={<span className="flex gap-[6px]"><Legend items={[{ label: "Stance", color: BLUE }, { label: "Swing", color: "#bae6fd" }]} /></span>}>
          <div className="space-y-[6px]">
            {(["Left", "Right"] as const).map((s, k) => (
              <div key={s} className="flex items-center gap-[6px]">
                <span className="w-[24px] text-[7.5px] font-bold">{s}</span>
                <div className="flex h-[12px] flex-1 overflow-hidden rounded-[3px]">
                  {[62, 38, 60, 40, 63, 37, 61, 39, 64, 36, 60, 40, 62, 38].map((w, i) => (
                    <span key={i} style={{ flex: w, background: (i + k) % 2 === 0 ? BLUE : "#bae6fd", marginLeft: i === 0 && k ? 18 : 0 }} />
                  ))}
                </div>
              </div>
            ))}
            <p className="flex justify-between pl-[30px] font-mono text-[6.5px]" style={{ color: SLATE }}>
              <span>0 s</span>
              <span>2 s</span>
              <span>4 s</span>
              <span>6 s</span>
              <span>8 s</span>
            </p>
          </div>
        </Panel>
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-[8px]">
          <Panel title="Stride variability · this walk">
            <LineChart w={128} h={76} max={1.6} min={1.0} labels={["0", "2", "4", "6", "8", "10"]} yFormat={(n) => n.toFixed(1)} series={[{ values: [1.24, 1.28, 1.3, 1.42, 1.29, 1.33, 1.51, 1.3, 1.27, 1.31, 1.29], color: BLUE, area: true }]} />
          </Panel>
          <Panel title="Clinician note">
            <p className="text-[7.6px] leading-[1.45]">Freezing at both turns, shorter with cueing on. Asymmetry up 2 points since 4 Nov. Review medication timing with neurology; repeat walk in 1 week.</p>
            <p className="mt-[5px] flex items-center gap-[4px] text-[7px]" style={{ color: SLATE }}>
              <CircleCheck className="size-[8px] text-[#16a34a]" aria-hidden="true" /> Signed by Dr. Kavya Mehta · 11:02
            </p>
          </Panel>
        </div>
      </div>
    </div>
  </Portal>
);

/* ------------------------------------------------------------------ */
/* 03 · Freezing-of-gait review                                        */
/* ------------------------------------------------------------------ */

/** `i` is the point (of 21, every 30 s) where the speed dips. */
const EPISODES: { t: string; i: number; dur: string; trigger: string; cue: string; resolved: string }[] = [
  { t: "00:31", i: 1, dur: "2.4 s", trigger: "Start of walk", cue: "Vibration", resolved: "1.1 s after cue" },
  { t: "03:02", i: 6, dur: "4.1 s", trigger: "Turn, 180°", cue: "Vibration", resolved: "1.9 s after cue" },
  { t: "05:31", i: 11, dur: "1.6 s", trigger: "Doorway", cue: "Vibration", resolved: "0.8 s after cue" },
  { t: "08:01", i: 16, dur: "3.3 s", trigger: "Turn, 180°", cue: "Vibration", resolved: "1.4 s after cue" },
];
const SPEED = [0.62, 0.14, 0.78, 0.84, 0.86, 0.8, 0.12, 0.8, 0.84, 0.9, 0.85, 0.16, 0.82, 0.86, 0.88, 0.84, 0.15, 0.79, 0.83, 0.81, 0.7];
const ECOLS = "40px 46px 1fr 64px 1fr";

const FreezingReview: Screen = () => (
  <Portal path="freezing/PD-014" active={3} title="Freezing-of-gait review · R.P. (PD-014)" sub="10 min 12 s walk · 4 episodes detected · on-demand cueing (vibration)" right={<GradBtn Icon={CircleCheck}>Confirm episodes</GradBtn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Panel title="Walking speed and detected freezing" action={<Legend items={[{ label: "Speed (m/s)", color: BLUE }, { label: "Freezing", color: "#e11d48" }, { label: "Cue", color: "#f59e0b" }]} />}>
        <div className="relative">
          <LineChart w={466} h={104} max={1.2} labels={["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00"]} yFormat={(n) => n.toFixed(1)} series={[{ values: SPEED, color: BLUE, area: true }]} />
          {EPISODES.map((e) => (
            <span key={e.t} className="absolute top-[4px] h-[86px] w-[10px] rounded-[2px]" style={{ left: 26 + (e.i / 20) * 438 - 5, background: "rgb(225 29 72 / 0.16)", boxShadow: "inset 0 0 0 1px rgb(225 29 72 / 0.45)" }}>
              <span className="absolute -top-[2px] left-1/2 size-0 -translate-x-1/2 border-x-[4px] border-t-[6px] border-x-transparent" style={{ borderTopColor: "#f59e0b" }} />
            </span>
          ))}
        </div>
      </Panel>
      <div className="flex min-h-0 flex-1 gap-[8px]">
        <Panel pad={false} className="min-w-0 flex-1" title="Episodes" action={<span>Detected from insole pressure and step timing</span>}>
          <Th cols={ECOLS}>
            <span>Time</span>
            <span>Length</span>
            <span>Trigger</span>
            <span>Cue</span>
            <span>Outcome</span>
          </Th>
          {EPISODES.map((e) => (
            <Tr key={e.t} cols={ECOLS} h={24}>
              <span className="font-mono text-[8px] font-bold">{e.t}</span>
              <span className="text-[8.5px]">{e.dur}</span>
              <span className="text-[8.5px]">{e.trigger}</span>
              <span className="flex items-center gap-[3px] text-[8px]">
                <Vibrate className="size-[9px]" style={{ color: "#f59e0b" }} aria-hidden="true" /> {e.cue}
              </span>
              <span className="text-[8px]" style={{ color: "#15803d" }}>
                {e.resolved}
              </span>
            </Tr>
          ))}
          <p className="px-[10px] py-[6px] text-[7.5px]" style={{ color: SLATE }}>
            Turns trigger 2 of 4 episodes, as in the last three walks.
          </p>
        </Panel>
        <Panel className="w-[160px] shrink-0" title="Episodes per walk · 6 weeks">
          <div className="flex h-[96px] items-end gap-[6px] px-[2px]">
            {[7, 6, 6, 5, 6, 4].map((v, i) => (
              <span key={i} className="flex flex-1 flex-col items-center gap-[2px]">
                <b className="text-[7px]">{v}</b>
                <span className="w-full rounded-t-[3px]" style={{ height: v * 11, background: i === 5 ? GRAD : "#c7d7f5" }} />
                <span className="text-[6.5px]" style={{ color: SLATE }}>
                  W{i + 1}
                </span>
              </span>
            ))}
          </div>
          <p className="mt-[6px] text-[7.2px] leading-[1.4]">Cueing switched on in week 3. Average freeze length down from 4.0 s to 2.9 s.</p>
        </Panel>
      </div>
    </div>
  </Portal>
);

/* ------------------------------------------------------------------ */
/* 04 · Fall-risk trend                                                */
/* ------------------------------------------------------------------ */

const FallRisk: Screen = () => (
  <Portal path="fall-risk/EL-030" active={4} title="Fall risk · M.S. (EL-030), 79" sub="Home walks, 3 a week · 12-week trend · alert threshold set by clinician" right={<><GhostBtn Icon={CalendarDays}>Book review</GhostBtn><GradBtn Icon={FileText}>Share with GP</GradBtn></>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="flex items-center gap-[8px] rounded-[8px] px-[10px] py-[7px] text-[8px]" style={{ background: "#fff1f2", color: "#9f1239" }}>
        <TriangleAlert className="size-[11px] shrink-0" aria-hidden="true" />
        <span>
          <b>Balance degrading for 4 weeks.</b> Sway index above threshold on 5 of the last 6 walks; gait speed down 9%. Suggest a falls assessment.
        </span>
      </div>
      <div className="grid grid-cols-4 gap-[8px]">
        <Kpi tint={BLUE} label="Gait speed" value="0.74 m/s" delta="-9%" good={false} sub="12 wks" />
        <Kpi tint={BLUE} label="Sway index" value="3.8" delta="+0.9" good={false} sub="threshold 3.5" />
        <Kpi tint={BLUE} label="Double support" value="34%" delta="+4 pts" good={false} sub="of gait cycle" />
        <Kpi tint={BLUE} label="Walks recorded" value="35" sub="of 36 planned" />
      </div>
      <div className="flex min-h-0 flex-1 gap-[8px]">
        <Panel className="min-w-0 flex-1" title="12-week trend" action={<Legend items={[{ label: "Gait index", color: BLUE }, { label: "Sway index ×10", color: "#e11d48" }, { label: "Threshold", color: "#94a3b8" }]} />}>
          <LineChart
            w={318}
            h={150}
            max={80}
            min={20}
            labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"]}
            yFormat={(n) => String(Math.round(n))}
            series={[
              { values: [66, 66, 65, 66, 65, 64, 63, 63, 61, 60, 60, 59], color: BLUE, area: true },
              { values: [29, 30, 29, 30, 31, 31, 33, 34, 35, 36, 37, 38], color: "#e11d48" },
              { values: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35], color: "#94a3b8", dashed: true },
            ]}
          />
        </Panel>
        <Panel className="w-[150px] shrink-0" title="Alerts and actions">
          <div className="space-y-[6px] text-[7.4px] leading-[1.35]">
            {[
              ["Today", "Sway above threshold, 5 of 6 walks", "red"],
              ["Tue 10 Nov", "Gait speed below 0.8 m/s", "amber"],
              ["Fri 30 Oct", "Clinician lowered threshold to 3.5", "blue"],
              ["Mon 19 Oct", "Daughter added as carer contact", "grey"],
            ].map(([d, t, c]) => (
              <div key={t} className="flex gap-[5px]">
                <span className="mt-[2px] size-[6px] shrink-0 rounded-full" style={{ background: { red: "#e11d48", amber: "#f59e0b", blue: BLUE, grey: "#94a3b8" }[c as "red"] }} />
                <span>
                  <b className="block text-[7px]" style={{ color: SLATE }}>
                    {d}
                  </b>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  </Portal>
);

/* ------------------------------------------------------------------ */
/* 05 · Companion app                                                  */
/* ------------------------------------------------------------------ */

function AppHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-[4px] px-[10px] pb-[6px] pt-[4px]">
      <ChevronLeft className="size-[12px]" style={{ color: SLATE }} aria-hidden="true" />
      <span className="leading-tight">
        <span className="block text-[11px] font-extrabold">{title}</span>
        {sub && (
          <span className="block text-[7px]" style={{ color: SLATE }}>
            {sub}
          </span>
        )}
      </span>
    </div>
  );
}

const CompanionApp: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[34px]" style={{ ...FONT, color: NAVY, background: `linear-gradient(160deg, #f8fafc, #dbeafe 60%, #cffafe)` }}>
    <Phone w={176} h={360} bg="#f8fafc">
      <AppHead title="My insoles" sub="Instrole · paired to this phone" />
      <div className="flex flex-1 flex-col gap-[7px] px-[10px]">
        {[
          ["Left insole", "IS-L 2041", 82],
          ["Right insole", "IS-R 2042", 76],
        ].map(([n, id, b]) => (
          <div key={n as string} className="flex items-center gap-[7px] rounded-[10px] bg-white p-[7px] shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
            <span className="flex size-[26px] items-center justify-center rounded-[8px] text-white" style={{ background: GRAD }}>
              <Footprints className="size-[13px]" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[8.5px] font-bold">{n}</span>
              <span className="block font-mono text-[6.8px]" style={{ color: SLATE }}>
                {id}
              </span>
            </span>
            <span className="flex flex-col items-end gap-[1px] text-[7px] font-semibold">
              <span className="flex items-center gap-[2px] text-[#16a34a]">
                <Bluetooth className="size-[8px]" aria-hidden="true" /> On
              </span>
              <span className="flex items-center gap-[2px]" style={{ color: SLATE }}>
                <BatteryMedium className="size-[9px]" aria-hidden="true" /> {b}%
              </span>
            </span>
          </div>
        ))}
        <div className="rounded-[10px] bg-white p-[8px] shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
          <p className="text-[7px] font-bold uppercase tracking-[0.08em]" style={{ color: SLATE }}>
            Calibration
          </p>
          <p className="mt-[2px] text-[8px] leading-[1.35]">Stand still for 5 seconds, then walk 10 steps.</p>
          <div className="mt-[5px] h-[5px] overflow-hidden rounded-full bg-[#e2e8f0]">
            <span className="block h-full w-full rounded-full" style={{ background: GRAD }} />
          </div>
          <p className="mt-[3px] flex items-center gap-[3px] text-[7px] font-semibold text-[#16a34a]">
            <CircleCheck className="size-[8px]" aria-hidden="true" /> Calibrated today, 09:58
          </p>
        </div>
        <div className="rounded-[10px] p-[8px] text-white" style={{ background: GRAD }}>
          <p className="text-[8.5px] font-bold">Your plan this week</p>
          <p className="mt-[1px] text-[7.2px] opacity-90">3 walks of 10 minutes · cueing on</p>
          <div className="mt-[5px] flex gap-[3px]">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className={`flex size-[15px] items-center justify-center rounded-full text-[6.5px] font-bold ${i < 3 ? (i === 1 ? "bg-white/25" : "bg-white text-[#2563eb]") : "bg-white/15"}`}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Phone>
    <Phone w={176} h={360} bg="#0f172a" dark>
      <div className="flex shrink-0 items-center justify-between px-[12px] pb-[4px] pt-[6px] text-white">
        <span className="text-[11px] font-extrabold">Today&apos;s walk</span>
        <span className="flex items-center gap-[3px] rounded-full bg-[#ef4444] px-[6px] py-[2px] text-[7px] font-bold">
          <span className="size-[4px] rounded-full bg-white" /> REC
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center px-[12px] text-white">
        <p className="mt-[8px] font-mono text-[28px] font-bold tracking-[-0.04em]">06:12</p>
        <p className="text-[7.5px] text-white/60">of 10:00 planned</p>
        <div className="mt-[10px] grid w-full grid-cols-3 gap-[5px] text-center">
          {[
            ["548", "steps"],
            ["94", "steps/min"],
            ["1", "freeze"],
          ].map(([v, l]) => (
            <span key={l} className="rounded-[8px] bg-white/10 py-[5px]">
              <b className="block text-[12px]">{v}</b>
              <span className="text-[6.5px] text-white/60">{l}</span>
            </span>
          ))}
        </div>
        <div className="mt-[9px] w-full rounded-[10px] bg-white/10 p-[7px]">
          <p className="flex items-center gap-[4px] text-[8px] font-bold">
            <Vibrate className="size-[9px] text-[#fbbf24]" aria-hidden="true" /> On-demand cueing
          </p>
          <p className="mt-[2px] text-[7px] leading-[1.35] text-white/70">Your insoles vibrate in step rhythm when a hesitation is detected.</p>
          <div className="mt-[5px] flex items-center justify-between text-[7px]">
            <span>Strength</span>
            <span className="flex gap-[2px]">
              {[1, 1, 1, 0, 0].map((on, i) => (
                <span key={i} className="h-[6px] w-[10px] rounded-[2px]" style={{ background: on ? "#fbbf24" : "rgb(255 255 255 / 0.2)" }} />
              ))}
            </span>
          </div>
        </div>
        <div className="mt-[9px] flex w-full gap-[6px]">
          <span className="flex h-[28px] flex-1 items-center justify-center gap-[3px] rounded-full bg-white/15 text-[8px] font-bold">
            <Pause className="size-[9px]" aria-hidden="true" /> Pause
          </span>
          <span className="flex h-[28px] flex-1 items-center justify-center rounded-full text-[8px] font-bold" style={{ background: GRAD }}>
            Finish walk
          </span>
        </div>
        <p className="mt-[8px] flex items-center gap-[3px] text-[6.8px] text-white/55">
          <Smartphone className="size-[8px]" aria-hidden="true" /> Uploads when the walk ends
        </p>
      </div>
    </Phone>
  </div>
);

/* ------------------------------------------------------------------ */
/* 06 · Website editor on a laptop                                     */
/* ------------------------------------------------------------------ */

const WebsiteEditor: Screen = () => (
  <div className="flex h-full w-full items-center justify-center" style={{ ...FONT, color: NAVY, background: `linear-gradient(160deg, ${WASH}, #e0f2fe)` }}>
    <Laptop w={500} h={318}>
      <div className="flex h-full" style={{ background: "#f8fafc" }}>
        <aside className="w-[104px] shrink-0 border-r border-black/[0.07] bg-white px-[7px] py-[8px]">
          <Photo {...LOGO} w={78} h={20} />
          <p className="mt-[2px] text-[6px] font-semibold uppercase tracking-[0.1em]" style={{ color: CYAN }}>
            Website editor
          </p>
          <nav className="mt-[8px] space-y-[2px] text-[7.6px]">
            {[
              ["Home slides", 7],
              ["Lab highlights", 5],
              ["Publications", 9],
              ["Founders", 2],
              ["Brochure", 1],
              ["Enquiries", 3],
            ].map(([l, n], i) => (
              <span key={l as string} className={`flex h-[19px] items-center rounded-[6px] px-[5px] ${i === 1 ? "font-bold text-white" : ""}`} style={i === 1 ? { background: GRAD } : { color: SLATE }}>
                {l}
                <span className="ml-auto text-[6.5px] font-bold">{n}</span>
              </span>
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[30px] shrink-0 items-center border-b border-black/[0.07] bg-white px-[9px]">
            <span className="text-[9.5px] font-extrabold">Lab highlights</span>
            <span className="ml-auto flex gap-[5px]">
              <GhostBtn>Preview</GhostBtn>
              <GradBtn>Publish</GradBtn>
            </span>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_140px] gap-[7px] p-[7px]">
            <div className="min-w-0 space-y-[4px]">
              {[
                ["Boeing BUILD 5.0 national winner", "Published", "green"],
                ["Prof. Uttama Lahiri at Boeing BUILD 5.0", "Published", "green"],
                ["Regional winners at IIT Gandhinagar", "Published", "green"],
                ["Instrole shown to the Director of AIIMS Rajkot", "Published", "green"],
                ["Meeting with clinical educators", "Draft", "amber"],
              ].map(([t, s, c], i) => (
                <div key={t} className={`flex items-center gap-[5px] rounded-[7px] bg-white p-[5px] ring-1 ${i === 4 ? "ring-[#2563eb]" : "ring-black/[0.07]"}`}>
                  <span className="h-[24px] w-[34px] shrink-0 rounded-[4px]" style={{ background: i % 2 ? "#dbeafe" : "#cffafe" }} />
                  <span className="min-w-0 flex-1 truncate text-[7.4px] font-semibold">{t}</span>
                  <Pill tone={c as "green"} size={6.5}>
                    {s}
                  </Pill>
                </div>
              ))}
            </div>
            <div className="min-w-0 rounded-[8px] bg-white p-[6px] ring-1 ring-black/[0.07]">
              <p className="text-[6.5px] font-bold uppercase tracking-[0.08em]" style={{ color: SLATE }}>
                Edit highlight
              </p>
              <p className="mt-[4px] text-[6.5px]" style={{ color: SLATE }}>
                Title
              </p>
              <p className="truncate rounded-[4px] bg-[#f1f5f9] px-[4px] py-[3px] text-[7px] font-semibold">Meeting with clinical educators</p>
              <p className="mt-[4px] text-[6.5px]" style={{ color: SLATE }}>
                Photo
              </p>
              <span className="mt-[1px] block h-[38px] rounded-[4px]" style={{ background: "linear-gradient(135deg,#dbeafe,#cffafe)" }} />
              <p className="mt-[4px] text-[6.5px]" style={{ color: SLATE }}>
                Linked publication
              </p>
              <p className="flex items-center gap-[3px] rounded-[4px] bg-[#f1f5f9] px-[4px] py-[3px] text-[6.6px]">
                <BookOpen className="size-[7px] shrink-0" aria-hidden="true" />
                <span className="truncate">GaitWEAR: An Augmented Wearable System…</span>
              </p>
              <span className="mt-[6px] flex h-[18px] items-center justify-center gap-[3px] rounded-full text-[7px] font-bold text-white" style={{ background: GRAD }}>
                <Gauge className="size-[8px]" aria-hidden="true" /> Save draft
              </span>
            </div>
          </div>
        </div>
      </div>
    </Laptop>
  </div>
);

export const oreejoyScreens: Screen[] = [Patients, SessionReport, FreezingReview, FallRisk, CompanionApp, WebsiteEditor];
