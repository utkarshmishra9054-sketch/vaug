import { Inter } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import {
  Bell,
  CalendarClock,
  Check,
  CircleCheck,
  Clock,
  FileClock,
  HeartHandshake,
  House,
  LayoutGrid,
  Pill as PillIcon,
  Settings,
  Stethoscope,
  Truck,
  Users,
  X,
} from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Kpi, Legend, LineChart, Panel, Phone, Pill, Th, Tr, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Theronix Health · Theronix Flow prototype (NHS Pathway 1 discharge coordination).
 *
 * Brand from theronixhealth.com (read 22 Nov 2026): Inter; the "Theronix Flow" wordmark in Pacifico
 * with a violet #b430ff to orange #ff9657 gradient; text #363636, purple #aa50dd, lavender wash.
 * Product facts (Day 2 prediction from MDT notes, frailty, mobility, medication dependency and social
 * circumstances; care aggregator over CQC-registered agencies; five readiness checks; clinician
 * approval; 7 to 14 day surge package at NCTR) are from the site.
 * TODO(content): illustrative prototype data. The ward, patients (initials), agencies (anonymised
 * provider codes), scores and hours are invented; confirm the prototype's real screens with Theronix.
 */

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: inter.style.fontFamily };

const VIOLET = "#b430ff";
const DEEP = "#6a1bb0";
const ORANGE = "#ff9657";
const INK = "#2b2b31";
const MUTED = "#6b6b76";
const WASH = "#f5effd";
const GRAD = `linear-gradient(250deg, ${ORANGE} 0%, ${VIOLET} 90%)`;
const LOGO = { src: "/logos/theronix.webp", img: { w: 604, h: 108 } };
const HOST = "flow.theronixhealth.com";

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const NAV: { label: string; Icon: typeof Users; badge?: number }[] = [
  { label: "Discharge board", Icon: LayoutGrid },
  { label: "Patients", Icon: Users, badge: 14 },
  { label: "Care aggregator", Icon: HeartHandshake },
  { label: "Packages", Icon: CircleCheck, badge: 3 },
  { label: "Surge care", Icon: CalendarClock, badge: 5 },
  { label: "Audit log", Icon: FileClock },
  { label: "Settings", Icon: Settings },
];

function Flow({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`${HOST}/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK, background: "#faf8fd" }}>
        <aside className="flex h-full w-[122px] shrink-0 flex-col border-r border-black/[0.07] bg-white px-[8px] py-[10px]">
          <Photo {...LOGO} w={88} h={16} />
          <p className="mt-[4px] text-[6.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: MUTED }}>
            Ward 7 · Acute medicine
          </p>
          <nav className="mt-[10px] flex flex-col gap-[2px]">
            {NAV.map((n, i) => {
              const on = i === active;
              return (
                <span key={n.label} className={`flex h-[23px] items-center gap-[6px] rounded-[7px] px-[6px] text-[8.6px] ${on ? "font-semibold" : ""}`} style={on ? { background: WASH, color: DEEP } : { color: MUTED }}>
                  <n.Icon className="size-[10.5px] shrink-0" strokeWidth={2.1} aria-hidden="true" />
                  <span className="truncate">{n.label}</span>
                  {n.badge !== undefined && (
                    <span className="ml-auto rounded-full px-[4.5px] py-[1.5px] text-[7px] font-bold leading-none text-white" style={{ background: on ? DEEP : "#c4b5fd" }}>
                      {n.badge}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
          <div className="mt-auto rounded-[8px] p-[6px]" style={{ background: WASH }}>
            <p className="text-[8px] font-semibold">Claire Morgan</p>
            <p className="text-[7px]" style={{ color: MUTED }}>
              Discharge coordinator
            </p>
          </div>
          <p className="mt-[5px] text-center text-[6px] font-semibold uppercase tracking-[0.08em]" style={{ color: "#a855f7" }}>
            Demo data · prototype
          </p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b border-black/[0.07] bg-white px-[12px]">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-semibold tracking-[-0.02em]">{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: MUTED }}>
                {sub}
              </p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-[6px]">
              {right}
              <span className="relative text-black/50">
                <Bell className="size-[11px]" aria-hidden="true" />
                <span className="absolute -right-[1px] -top-[1px] size-[4px] rounded-full" style={{ background: VIOLET }} />
              </span>
            </div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

function GradBtn({ children, Icon }: { children: ReactNode; Icon?: typeof Users }) {
  return (
    <span className="inline-flex h-[22px] items-center gap-[4px] rounded-full px-[10px] text-[8px] font-semibold text-white shadow-[0_2px_6px_rgb(180_48_255/0.35)]" style={{ background: GRAD }}>
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

/** A Pathway 1 probability bar. */
function Score({ v, w = 54 }: { v: number; w?: number }) {
  const c = v >= 75 ? DEEP : v >= 50 ? "#a855f7" : "#c4b5fd";
  return (
    <span className="flex items-center gap-[4px]">
      <span className="h-[5px] overflow-hidden rounded-full bg-black/[0.07]" style={{ width: w }}>
        <span className="block h-full rounded-full" style={{ width: `${v}%`, background: c }} />
      </span>
      <b className="w-[20px] text-[8.5px] tabular-nums" style={{ color: c }}>
        {v}%
      </b>
    </span>
  );
}

type R = "done" | "wait" | "todo";
function Ready({ s }: { s: R }) {
  const map = { done: ["#dcfce7", "#15803d", Check], wait: ["#fef3c7", "#b45309", Clock], todo: ["#f1f0f4", "#9ca3af", X] } as const;
  const [bg, fg, I] = map[s];
  return (
    <span className="flex size-[15px] items-center justify-center rounded-[4px]" style={{ background: bg, color: fg }}>
      <I className="size-[8.5px]" strokeWidth={3} aria-hidden="true" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · Discharge board                                                */
/* ------------------------------------------------------------------ */

const BOARD: { bed: string; who: string; day: string; v: number; r: [R, R, R, R, R]; status: [string, "violet" | "amber" | "green" | "grey" | "red"] }[] = [
  { bed: "14", who: "M.H. · 82 F", day: "D6", v: 86, r: ["done", "done", "done", "wait", "done"], status: ["Package ready", "violet"] },
  { bed: "3", who: "D.A. · 77 M", day: "D5", v: 81, r: ["done", "done", "wait", "wait", "done"], status: ["Package ready", "violet"] },
  { bed: "9", who: "S.P. · 88 F", day: "D7", v: 78, r: ["done", "wait", "done", "todo", "wait"], status: ["Building package", "amber"] },
  { bed: "21", who: "G.R. · 79 M", day: "D4", v: 72, r: ["wait", "wait", "done", "todo", "wait"], status: ["Building package", "amber"] },
  { bed: "6", who: "E.W. · 91 F", day: "D9", v: 90, r: ["done", "done", "done", "done", "done"], status: ["NCTR · going home", "green"] },
  { bed: "17", who: "P.K. · 74 M", day: "D3", v: 58, r: ["wait", "todo", "wait", "todo", "todo"], status: ["Watching", "grey"] },
  { bed: "11", who: "L.T. · 85 F", day: "D2", v: 44, r: ["todo", "todo", "wait", "todo", "todo"], status: ["Watching", "grey"] },
  { bed: "2", who: "R.B. · 80 M", day: "D8", v: 83, r: ["done", "done", "done", "done", "wait"], status: ["NCTR · package due", "red"] },
];
const BCOLS = "24px 76px 26px 80px 15px 15px 15px 15px 15px 1fr";

const DischargeBoard: Screen = () => (
  <Flow path="ward/7/board" active={0} title="Discharge board · Ward 7" sub="Fri 20 Nov 2026 · 08:30 board round · scores updated 06:00" right={<GhostBtn Icon={Users}>Filter: Pathway 1</GhostBtn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        <Kpi tint={DEEP} accent label="On Pathway 1 watch" value="14" sub="of 28 beds" />
        <Kpi tint={DEEP} label="Score 75% or more" value="6" delta="+2" sub="since yesterday" />
        <Kpi tint={DEEP} label="Packages for review" value="3" sub="ready to approve" />
        <Kpi tint={DEEP} label="At NCTR, waiting" value="1" delta="-2" sub="vs Monday" />
      </div>
      <Panel pad={false} className="min-h-0 flex-1" title="Patients, highest score first" action={<span className="flex items-center gap-[8px]">Clinical · therapy · meds · transport · package<Legend items={[{ label: "Done", color: "#15803d" }, { label: "In progress", color: "#b45309" }]} /></span>}>
        <Th cols={BCOLS}>
          <span>Bed</span>
          <span>Patient</span>
          <span>Day</span>
          <span>Pathway 1 score</span>
          {[Stethoscope, Users, PillIcon, Truck, House].map((I, k) => (
            <I key={k} className="size-[10px]" aria-hidden="true" />
          ))}
          <span>Status</span>
        </Th>
        {BOARD.map((b, i) => (
          <Tr key={b.bed} cols={BCOLS} h={27} highlight={i === 0 ? WASH : undefined}>
            <span className="font-mono text-[8px] font-bold">{b.bed}</span>
            <span className="text-[8.5px] font-semibold">{b.who}</span>
            <span className="font-mono text-[8px]" style={{ color: MUTED }}>
              {b.day}
            </span>
            <Score v={b.v} />
            {b.r.map((s, k) => (
              <Ready key={k} s={s} />
            ))}
            <span>
              <Pill tone={b.status[1]} size={7.2} dot>
                {b.status[0]}
              </Pill>
            </span>
          </Tr>
        ))}
      </Panel>
    </div>
  </Flow>
);

/* ------------------------------------------------------------------ */
/* 02 · Patient view: score and signals                                */
/* ------------------------------------------------------------------ */

const SIGNALS: [string, string, number][] = [
  ["Frailty", "Clinical Frailty Scale 6, up from 5 on admission", 34],
  ["Mobility", "Walking with a frame; needs one carer for transfers (PT, D3)", 26],
  ["Personal care", "OT: needs help washing and dressing, morning and evening", 22],
  ["Medication", "Needs prompting with 4 daily medicines", 11],
  ["Social", "Lives alone; daughter visits twice a week", 7],
];

const PatientView: Screen = () => (
  <Flow path="patients/bed-14" active={1} title="Bed 14 · M.H., 82 · Day 6" sub="Admitted Sun 15 Nov with a chest infection · medically improving" right={<GradBtn Icon={CircleCheck}>Review package</GradBtn>}>
    <div className="grid h-full grid-cols-[1fr_196px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Panel title="Pathway 1 score, daily" action={<Legend items={[{ label: "Score", color: DEEP }, { label: "Review threshold 75%", color: "#c4b5fd" }]} />}>
          <LineChart
            w={264}
            h={112}
            max={100}
            labels={["D2", "D3", "D4", "D5", "D6"]}
            yFormat={(n) => `${Math.round(n)}%`}
            series={[
              { values: [52, 61, 70, 79, 86], color: DEEP, area: true },
              { values: [75, 75, 75, 75, 75], color: "#c4b5fd", dashed: true },
            ]}
          />
        </Panel>
        <Panel className="min-h-0 flex-1" title="Why the score moved" action={<span>From MDT notes and routine assessments</span>}>
          <div className="space-y-[5px]">
            {SIGNALS.map(([k, t, w]) => (
              <div key={k} className="grid grid-cols-[58px_1fr_62px] items-center gap-[6px]">
                <span className="text-[8px] font-semibold">{k}</span>
                <span className="truncate text-[7.6px]" style={{ color: MUTED }}>
                  {t}
                </span>
                <span className="flex items-center gap-[3px]">
                  <span className="h-[5px] flex-1 rounded-full bg-black/[0.06]">
                    <span className="block h-full rounded-full" style={{ width: `${w * 2.6}%`, background: GRAD }} />
                  </span>
                  <span className="w-[16px] text-right text-[7px] font-bold tabular-nums">+{w}</span>
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Panel title="Readiness">
          <div className="space-y-[5px] text-[8px]">
            {(
              [
                ["Clinical stability", "Consultant, ward round D6", "done", Stethoscope],
                ["Therapy sign-off", "PT and OT, D5", "done", Users],
                ["Medications", "TTO ready, blister pack", "done", PillIcon],
                ["Transport", "Booked for Mon 23 Nov, 11:00", "wait", Truck],
                ["Care package", "Proposed, awaiting approval", "done", House],
              ] as [string, string, R, typeof Users][]
            ).map(([k, t, s, I]) => (
              <div key={k} className="flex items-center gap-[6px]">
                <I className="size-[10px] shrink-0" style={{ color: DEEP }} aria-hidden="true" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block font-semibold">{k}</span>
                  <span className="block truncate text-[7px]" style={{ color: MUTED }}>
                    {t}
                  </span>
                </span>
                <Ready s={s} />
              </div>
            ))}
          </div>
        </Panel>
        <div className="rounded-[8px] p-[8px] text-white" style={{ background: GRAD }}>
          <p className="text-[7px] font-semibold uppercase tracking-[0.08em] opacity-85">Proposed package</p>
          <p className="mt-[2px] text-[10px] font-semibold">2 visits a day · 45 min · 1 carer</p>
          <p className="mt-[1px] text-[7.4px] opacity-90">14-day surge package from Mon 23 Nov, while the long-term package is commissioned.</p>
        </div>
      </div>
    </div>
  </Flow>
);

/* ------------------------------------------------------------------ */
/* 03 · Care aggregator                                                */
/* ------------------------------------------------------------------ */

const AGENCIES: { code: string; area: string; rating: string; mins: number; hours: number[] }[] = [
  { code: "Provider K-104", area: "Maidstone", rating: "Good", mins: 12, hours: [6, 4, 7, 3, 5, 2, 1] },
  { code: "Provider K-219", area: "Tonbridge", rating: "Good", mins: 18, hours: [3, 5, 2, 6, 4, 4, 2] },
  { code: "Provider S-052", area: "Sevenoaks", rating: "Outstanding", mins: 24, hours: [2, 2, 4, 2, 3, 5, 3] },
  { code: "Provider K-311", area: "Maidstone", rating: "Good", mins: 9, hours: [1, 0, 2, 1, 0, 3, 2] },
  { code: "Provider X-078", area: "Tunbridge Wells", rating: "Good", mins: 27, hours: [4, 3, 3, 5, 6, 2, 0] },
  { code: "Provider K-145", area: "Aylesford", rating: "Requires improvement", mins: 15, hours: [5, 6, 4, 4, 5, 3, 2] },
];
const ACOLS = "100px 54px repeat(7, 15px)";
const heat = (h: number) => (h >= 6 ? DEEP : h >= 4 ? "#a855f7" : h >= 2 ? "#d8b4fe" : h >= 1 ? "#ede9fe" : "#f5f5f7");

const CareAggregator: Screen = () => (
  <Flow path="aggregator?patient=bed-14" active={2} title="Care aggregator · spare domiciliary hours" sub="CQC-registered agencies within 30 min of the patient's home · next 7 days" right={<GhostBtn Icon={Clock}>Refreshed 07:45</GhostBtn>}>
    <div className="grid h-full grid-cols-[minmax(0,1fr)_140px] gap-[8px]">
      <Panel pad={false} title="Unused hours by day" action={<span>86 h spare · 6 agencies</span>}>
        <Th cols={ACOLS}>
          <span>Agency</span>
          <span>CQC</span>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-center">
              {d}
            </span>
          ))}
        </Th>
        {AGENCIES.map((a, i) => (
          <Tr key={a.code} cols={ACOLS} h={29} highlight={i < 2 ? WASH : undefined}>
            <span className="leading-tight">
              <span className="block text-[8.2px] font-semibold">{a.code}</span>
              <span className="block text-[7px]" style={{ color: MUTED }}>
                {a.area} · {a.mins} min
              </span>
            </span>
            <span>
              <Pill tone={a.rating === "Requires improvement" ? "amber" : "green"} size={6.6}>
                {a.rating === "Requires improvement" ? "Req. improv." : a.rating}
              </Pill>
            </span>
            {a.hours.map((h, k) => (
              <span key={k} className="flex h-[15px] items-center justify-center rounded-[3px] text-[7px] font-bold" style={{ background: heat(h), color: h >= 4 ? "#fff" : INK }}>
                {h || ""}
              </span>
            ))}
          </Tr>
        ))}
        <p className="px-[10px] py-[6px] text-[7.4px]" style={{ color: MUTED }}>
          Agencies are anonymised in this demo. Hours come from each agency&apos;s rota feed; nothing is booked until a clinician approves.
        </p>
      </Panel>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Panel title="Needs · Bed 14">
          <div className="space-y-[3px] text-[7.8px]">
            {[
              ["Visits", "2 a day"],
              ["Length", "45 min"],
              ["Carers", "1"],
              ["Duration", "7 to 14 days"],
              ["Start", "Mon 23 Nov"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between">
                <span style={{ color: MUTED }}>{k}</span>
                <b>{v}</b>
              </p>
            ))}
          </div>
        </Panel>
        <Panel className="min-h-0 flex-1" title="Provisional package">
          <p className="text-[7.6px] leading-[1.4]">Mornings from K-104, evenings from K-219. Both within 20 minutes of home.</p>
          <div className="mt-[6px] space-y-[3px]">
            {[
              ["Mornings", "K-104", 100],
              ["Evenings", "K-219", 100],
              ["Weekends", "K-104 + K-219", 86],
            ].map(([k, a, c]) => (
              <div key={k as string}>
                <p className="flex justify-between text-[7px]">
                  <span>{k}</span>
                  <span style={{ color: MUTED }}>{a}</span>
                </p>
                <span className="block h-[5px] rounded-full bg-black/[0.06]">
                  <span className="block h-full rounded-full" style={{ width: `${c}%`, background: GRAD }} />
                </span>
              </div>
            ))}
          </div>
          <p className="mt-[6px] text-[7px] font-semibold" style={{ color: DEEP }}>
            96% of visits covered
          </p>
        </Panel>
      </div>
    </div>
  </Flow>
);

/* ------------------------------------------------------------------ */
/* 04 · Proposed package: clinician approval                           */
/* ------------------------------------------------------------------ */

const ProposedPackage: Screen = () => (
  <Flow path="packages/PKG-0381" active={3} title="Proposed package · Bed 14, M.H." sub="Score 86% · Day 6 · prepared 06:02 · nothing is booked until you approve" right={<span className="flex gap-[5px]"><GhostBtn Icon={X}>Reject</GhostBtn><GhostBtn>Modify</GhostBtn><GradBtn Icon={Check}>Approve</GradBtn></span>}>
    <div className="grid h-full grid-cols-[1fr_170px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Panel title="Visit schedule · first 7 days" action={<span>From Mon 23 Nov</span>}>
          <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-[3px] text-[7.2px]">
            <span />
            {["Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27", "Sat 28", "Sun 29"].map((d) => (
              <span key={d} className="text-center font-semibold" style={{ color: MUTED }}>
                {d}
              </span>
            ))}
            {[
              ["08:00–08:45", "K-104", [1, 1, 1, 1, 1, 1, 1]],
              ["18:30–19:15", "K-219", [1, 1, 1, 1, 1, 0, 1]],
            ].map(([t, a, days]) => (
              <div key={t as string} className="contents">
                <span className="leading-tight">
                  <b className="block">{t as string}</b>
                  <span style={{ color: MUTED }}>{a as string}</span>
                </span>
                {(days as number[]).map((d, i) => (
                  <span key={i} className="flex h-[24px] items-center justify-center rounded-[4px] text-[6.8px] font-semibold" style={d ? { background: WASH, color: DEEP, boxShadow: `inset 0 0 0 1px ${"#d8b4fe"}` } : { background: "#fff7ed", color: "#c2410c", boxShadow: "inset 0 0 0 1px #fed7aa" }}>
                    {d ? "Covered" : "Gap"}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-[6px] rounded-[6px] px-[6px] py-[4px] text-[7.4px]" style={{ background: "#fff7ed", color: "#9a3412" }}>
            One gap: Saturday evening. Daughter has offered to cover it; confirm with her before approving.
          </p>
        </Panel>
        <Panel className="min-h-0 flex-1" title="Matched to the assessments" action={<span>Confidence 86%</span>}>
          <div className="grid grid-cols-2 gap-x-[10px] gap-y-[4px] text-[7.6px]">
            {[
              ["Washing and dressing, mornings", "OT, D5"],
              ["Medication prompts, 4 a day", "Pharmacy, D6"],
              ["One carer, transfers with frame", "PT, D3"],
              ["Evening meal and settling", "Social work, D5"],
            ].map(([n, s]) => (
              <p key={n} className="flex items-start gap-[4px]">
                <CircleCheck className="mt-[1px] size-[8px] shrink-0 text-[#16a34a]" aria-hidden="true" />
                <span>
                  {n} <span style={{ color: MUTED }}>· {s}</span>
                </span>
              </p>
            ))}
          </div>
          <p className="mt-[8px] text-[6.8px] font-semibold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
            Passed to the agencies on approval
          </p>
          <div className="mt-[3px] flex flex-wrap gap-[4px] text-[7.2px]">
            {["Key safe at the front door", "Prefers a female carer", "Next of kin: daughter, 07700 900412", "Hearing aid, left ear"].map((t) => (
              <span key={t} className="rounded-full px-[6px] py-[2px]" style={{ background: WASH, color: DEEP }}>
                {t}
              </span>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Audit trail">
        <div className="space-y-[6px] text-[7.2px] leading-[1.35]">
          {[
            ["06:02", "Package prepared by Theronix Flow", "System"],
            ["06:02", "Score 86%, above the 75% threshold", "System"],
            ["08:31", "Opened by Claire Morgan", "Coordinator"],
            ["08:34", "Saturday gap noted; daughter to confirm", "Claire Morgan"],
            ["—", "Awaiting approval", "Clinician sign-off required"],
          ].map(([t, e, who], i) => (
            <div key={i} className="flex gap-[5px]">
              <span className="mt-[2px] size-[6px] shrink-0 rounded-full" style={{ background: i === 4 ? "#f59e0b" : VIOLET }} />
              <span>
                <b className="font-mono text-[6.8px]" style={{ color: MUTED }}>
                  {t}
                </b>{" "}
                {e}
                <span className="block text-[6.6px]" style={{ color: MUTED }}>
                  {who}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  </Flow>
);

/* ------------------------------------------------------------------ */
/* 05 · Surge tracking                                                 */
/* ------------------------------------------------------------------ */

const SURGE: { who: string; home: string; day: number; agency: string; lt: [string, "green" | "amber" | "grey" | "violet"] }[] = [
  { who: "E.W. · 91 F", home: "Maidstone", day: 2, agency: "K-104", lt: ["Assessment booked", "amber"] },
  { who: "J.F. · 76 M", home: "Aylesford", day: 6, agency: "K-145", lt: ["LA package agreed", "green"] },
  { who: "B.O. · 84 F", home: "Tonbridge", day: 9, agency: "K-219", lt: ["Awaiting LA panel", "amber"] },
  { who: "A.C. · 79 F", home: "Sevenoaks", day: 12, agency: "S-052", lt: ["Handover Mon 23", "violet"] },
  { who: "T.N. · 88 M", home: "Maidstone", day: 14, agency: "K-311", lt: ["Handed over", "grey"] },
];
const SCOLS = "74px 64px 1fr 48px 92px";

const SurgeTracking: Screen = () => (
  <Flow path="surge" active={4} title="Surge packages · home from hospital" sub="7 to 14 day bridges running alongside the Local Authority and ICB process" right={<GhostBtn Icon={CalendarClock}>This week</GhostBtn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-3 gap-[8px]">
        <Kpi tint={DEEP} label="Active surge packages" value="5" sub="across 5 agencies" />
        <Kpi tint={DEEP} label="Handed over this month" value="7" sub="to commissioned care" />
        <Kpi tint={DEEP} label="Due to hand over in 3 days" value="2" sub="LA confirmed for 1" />
      </div>
      <Panel pad={false} className="min-h-0 flex-1" title="Patients at home on a surge package">
        <Th cols={SCOLS}>
          <span>Patient</span>
          <span>Home</span>
          <span>Day of 14</span>
          <span>Agency</span>
          <span>Long-term package</span>
        </Th>
        {SURGE.map((s) => (
          <Tr key={s.who} cols={SCOLS} h={32}>
            <span className="text-[8.5px] font-semibold">{s.who}</span>
            <span className="text-[8px]" style={{ color: MUTED }}>
              {s.home}
            </span>
            <span className="flex items-center gap-[1.5px] pr-[8px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="h-[9px] flex-1 rounded-[2px]" style={{ background: i < s.day ? (s.day >= 12 ? ORANGE : VIOLET) : "rgb(0 0 0 / 0.07)" }} />
              ))}
              <b className="ml-[4px] w-[18px] text-[7.5px] tabular-nums">{s.day}</b>
            </span>
            <span className="font-mono text-[7.6px]">{s.agency}</span>
            <span>
              <Pill tone={s.lt[1]} size={7}>
                {s.lt[0]}
              </Pill>
            </span>
          </Tr>
        ))}
        <p className="px-[10px] py-[6px] text-[7.4px]" style={{ color: MUTED }}>
          Orange: package ends within 3 days. The coordinator is reminded to check the long-term handover.
        </p>
      </Panel>
    </div>
  </Flow>
);

/* ------------------------------------------------------------------ */
/* 06 · Laptop + phone                                                 */
/* ------------------------------------------------------------------ */

const LaptopAndPhone: Screen = () => (
  <div className="relative flex h-full w-full items-center justify-center gap-[20px]" style={{ ...FONT, color: INK, background: "linear-gradient(140deg, #f3e8ff, #fdf2f8 55%, #ffedd5)" }}>
    <Laptop w={410} h={262}>
      <div className="flex h-full flex-col" style={{ background: "#faf8fd" }}>
        <div className="flex h-[26px] items-center gap-[6px] border-b border-black/[0.07] bg-white px-[8px]">
          <Photo {...LOGO} w={66} h={12} />
          <span className="ml-auto text-[7px]" style={{ color: MUTED }}>
            Ward 7 · board round 08:30
          </span>
        </div>
        <div className="grid grid-cols-4 gap-[5px] p-[7px]">
          {[
            ["On watch", "14"],
            ["75%+", "6"],
            ["To review", "3"],
            ["At NCTR", "1"],
          ].map(([k, v], i) => (
            <div key={k} className="rounded-[6px] px-[6px] py-[4px]" style={i === 0 ? { background: GRAD, color: "#fff" } : { background: "#fff", boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.07)" }}>
              <p className="text-[6.5px] opacity-75">{k}</p>
              <p className="text-[12px] font-bold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mx-[7px] flex-1 overflow-hidden rounded-[6px] bg-white ring-1 ring-black/[0.07]">
          {BOARD.slice(0, 6).map((b) => (
            <div key={b.bed} className="grid h-[26px] grid-cols-[18px_62px_1fr_70px] items-center gap-[5px] border-b border-black/[0.05] px-[6px] text-[7px]">
              <b className="font-mono">{b.bed}</b>
              <span className="font-semibold">{b.who}</span>
              <Score v={b.v} w={44} />
              <Pill tone={b.status[1]} size={6.2}>
                {b.status[0]}
              </Pill>
            </div>
          ))}
        </div>
      </div>
    </Laptop>
    <Phone w={150} h={300} bg="#1a1033" dark>
      <div className="flex flex-1 flex-col px-[8px] pt-[10px] text-white">
        <p className="text-center text-[22px] font-semibold tracking-[-0.03em]">08:12</p>
        <p className="text-center text-[7px] text-white/60">Friday 20 November</p>
        <div className="mt-[12px] rounded-[12px] bg-white/[0.12] p-[7px] backdrop-blur">
          <div className="flex items-center gap-[4px]">
            <span className="flex size-[13px] items-center justify-center rounded-[4px]" style={{ background: GRAD }}>
              <HeartHandshake className="size-[8px]" aria-hidden="true" />
            </span>
            <span className="text-[6.5px] font-semibold uppercase tracking-[0.05em] text-white/70">Theronix Flow</span>
            <span className="ml-auto text-[6px] text-white/50">now</span>
          </div>
          <p className="mt-[3px] text-[7.5px] font-semibold">Package ready for review</p>
          <p className="text-[7px] leading-[1.35] text-white/80">Bed 14, M.H. · score 86% · 2 visits a day from Mon 23 Nov. One Saturday gap to confirm.</p>
        </div>
        <div className="mt-[6px] rounded-[12px] bg-white/[0.08] p-[7px]">
          <div className="flex items-center gap-[4px]">
            <span className="flex size-[13px] items-center justify-center rounded-[4px]" style={{ background: GRAD }}>
              <CalendarClock className="size-[8px]" aria-hidden="true" />
            </span>
            <span className="text-[6.5px] font-semibold uppercase tracking-[0.05em] text-white/70">Theronix Flow</span>
            <span className="ml-auto text-[6px] text-white/50">07:00</span>
          </div>
          <p className="mt-[3px] text-[7px] leading-[1.35] text-white/80">A.C. surge package ends Mon 23. Long-term handover is booked.</p>
        </div>
      </div>
    </Phone>
  </div>
);

export const theronixScreens: Screen[] = [DischargeBoard, PatientView, CareAggregator, ProposedPackage, SurgeTracking, LaptopAndPhone];
