import { useId, type ReactNode } from "react";
import { Bell, ChartColumn, Inbox, LayoutDashboard, Search, Settings, Users, Workflow } from "lucide-react";

import type { CaseStudy, CaseStudyDetail } from "@/content/types";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import type { LayoutProps, Variant } from "@/components/sections/mocks/kit";
import { InsuranceMock, ReconciliationMock } from "@/components/sections/mocks/finance";
import { PhysioMock, VoiceAgentMock } from "@/components/sections/mocks/health";
import { WhatsAppConciergeMock } from "@/components/sections/mocks/chat";
import { DesertRetreatMock, PropertyBrandMock, RentalRescueMock } from "@/components/sections/mocks/property";
import { AgencySprintMock, MarketplaceMock } from "@/components/sections/mocks/commerce";
import { CourierMock, RoutePlanningMock } from "@/components/sections/mocks/logistics";

/**
 * Pieces of the case study product mock (see `ScreenMock` in CaseStudies.tsx).
 *
 * The dashboard is drawn on a fixed-size canvas (px values below are design
 * pixels) and `.mock-stage` in globals.css scales that canvas to fit whatever
 * box it is rendered in, so text never reflows or overlaps at small sizes.
 * All figures are derived deterministically from the study, so server and
 * client renders match.
 */

export type MockStudy = CaseStudy & Partial<Pick<CaseStudyDetail, "features" | "domain" | "techStack" | "website" | "images" | "screenshots">>;

type Status = "Done" | "Review" | "Live" | "Flagged";

const STATUS_STYLE: Record<Status, { bg: string; fg: string }> = {
  Done: { bg: "#dcfce7", fg: "#166534" },
  Review: { bg: "#fef3c7", fg: "#92400e" },
  Live: { bg: "#dbeafe", fg: "#1e40af" },
  Flagged: { bg: "#ffe4e6", fg: "#9f1239" },
};

const PEOPLE = [
  { initials: "AK", bg: "#e0e7ff", fg: "#3730a3" },
  { initials: "MR", bg: "#fce7f3", fg: "#9d174d" },
  { initials: "JL", bg: "#dcfce7", fg: "#166534" },
  { initials: "SN", bg: "#fef3c7", fg: "#92400e" },
  { initials: "TB", bg: "#e0f2fe", fg: "#075985" },
];

const TIMES = ["2m ago", "14m ago", "1h ago", "3h ago", "Yesterday"];
const STATUSES: Status[] = ["Live", "Review", "Done", "Flagged", "Done"];
const NAV = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Queue", Icon: Inbox },
  { label: "Reports", Icon: ChartColumn },
  { label: "Automations", Icon: Workflow },
  { label: "Team", Icon: Users },
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Pseudo-random 0..1 from a seed and an index (integer maths only, so SSR and client agree). */
function rand(seed: number, i: number) {
  return hash(`${seed}:${i}`) / 4294967296;
}

/** Round to 0.1px so path strings are short and stable. */
const r1 = (n: number) => Math.round(n * 10) / 10;

/** First number in a display value ("AED 38M" -> 38, "14,210" -> 14210). */
function parseValue(v: string) {
  const m = v.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : 100;
}

function niceCeil(n: number) {
  const pow = 10 ** Math.floor(Math.log10(n || 1));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * pow >= n) ?? 10;
  return step * pow;
}

function fmt(n: number) {
  if (n >= 1000) return `${+(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  if (n < 10 && n % 1) return n.toFixed(1);
  return String(Math.round(n));
}

/** Labels where a fall is good news (shown as a green down arrow). */
const LOWER_IS_BETTER = /open|time|handed|due/i;

function initialsOf(client: string) {
  const words = client.replace(/^(a|an|the)\s+/i, "").split(/[\s-]+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

/** Table rows: the study's features, or its dashboard labels as a fallback. */
function rowsFor(study: MockStudy) {
  const titles = study.features?.length ? study.features.map((f) => f.title) : [...study.screen.map((s) => s.label), "Weekly report", "Data sync"];
  const seed = hash(study.slug);
  return titles.slice(0, 4).map((title, i) => ({
    title,
    person: PEOPLE[(seed + i) % PEOPLE.length],
    time: TIMES[i],
    status: STATUSES[(i + (seed % 2)) % 4],
  }));
}

function KpiCard({ label, value, index, seed, tint }: { label: string; value: string; index: number; seed: number; tint: string }) {
  const down = LOWER_IS_BETTER.test(label);
  const pct = (4 + rand(seed, index + 3) * 18).toFixed(1);
  const first = index === 0;
  return (
    <div className={`flex h-[50px] min-w-0 flex-col justify-between rounded-[7px] px-[8px] py-[6px] ${first ? "text-white" : "bg-white ring-1 ring-black/[0.06]"}`} style={first ? { background: tint } : undefined}>
      <p className={`truncate text-[8.5px] leading-none ${first ? "text-white/80" : "text-black/50"}`}>{label}</p>
      <div className="flex items-end justify-between gap-1">
        <p className="truncate text-[15px] font-bold leading-none tracking-[-0.02em]">{value}</p>
        <span
          className={`shrink-0 rounded-full px-[4px] py-[1.5px] text-[7.5px] font-semibold leading-none ${first ? "bg-white/20 text-white" : "bg-[#dcfce7] text-[#166534]"}`}
        >
          {down ? "▼" : "▲"} {pct}%
        </span>
      </div>
    </div>
  );
}

function Chart({ study, seed }: { study: MockStudy; seed: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const metric = study.screen[0] ?? { label: "Volume", value: "100" };
  const target = parseValue(metric.value);
  const max = niceCeil(target * 1.25);

  // Plot geometry, in design pixels.
  const W = 334;
  const H = 66;
  const L = 24;
  const R = 6;
  const T = 6;
  const B = 13;
  const pw = W - L - R;
  const ph = H - T - B;
  const n = 12;
  const x = (i: number) => r1(L + (i / (n - 1)) * pw);
  const y = (v: number) => r1(T + ph - (v / max) * ph);

  const series = (offset: number, scale: number) =>
    Array.from({ length: n }, (_, i) => {
      const trend = 0.5 + 0.5 * (i / (n - 1));
      const noise = (rand(seed + offset, i) - 0.5) * 0.16;
      return Math.max(0, Math.min(max, target * scale * (i === n - 1 && !offset ? 1 : trend + noise)));
    });
  const now = series(0, 1);
  const prev = series(97, 0.78);

  const smooth = (vals: number[]) =>
    vals
      .map((v, i) => {
        if (i === 0) return `M${x(0)},${y(v)}`;
        const cx = r1((x(i - 1) + x(i)) / 2);
        return `C${cx},${y(vals[i - 1])} ${cx},${y(v)} ${x(i)},${y(v)}`;
      })
      .join(" ");

  const line = smooth(now);
  const lastX = x(n - 1);
  const lastY = y(now[n - 1]);
  const xLabels = ["W1", "W3", "W5", "W7", "W9", "W12"];
  const xIdx = [0, 2, 4, 6, 8, 11];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block" aria-hidden="true">
      <defs>
        <linearGradient id={`g${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={study.tint} stopOpacity="0.22" />
          <stop offset="1" stopColor={study.tint} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(max * t)} y2={y(max * t)} stroke="#000" strokeOpacity={t === 0 ? 0.14 : 0.06} strokeDasharray={t === 0 ? undefined : "2 3"} />
          <text x={L - 4} y={y(max * t) + 2.5} textAnchor="end" fontSize="7" fill="#000" fillOpacity="0.4">
            {fmt(max * t)}
          </text>
        </g>
      ))}
      {xIdx.map((i, k) => (
        <text key={i} x={x(i)} y={H - 2} textAnchor={k === 0 ? "start" : k === xIdx.length - 1 ? "end" : "middle"} fontSize="7" fill="#000" fillOpacity="0.4">
          {xLabels[k]}
        </text>
      ))}
      <path d={smooth(prev)} fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d={`${line} L${lastX},${T + ph} L${L},${T + ph} Z`} fill={`url(#g${uid})`} className="mock-fade" />
      <path d={line} fill="none" stroke={study.tint} strokeWidth="2" strokeLinecap="round" className="mock-line" pathLength={1} />
      <line x1={lastX} x2={lastX} y1={lastY} y2={T + ph} stroke={study.tint} strokeOpacity="0.35" strokeDasharray="2 2" />
      <circle cx={lastX} cy={lastY} r="5" fill={study.tint} fillOpacity="0.18" className="mock-fade" />
      <circle cx={lastX} cy={lastY} r="2.6" fill="#fff" stroke={study.tint} strokeWidth="1.6" className="mock-fade" />
    </svg>
  );
}

function StatusPill({ status }: { status: Status }) {
  const s = STATUS_STYLE[status];
  return (
    <span className="inline-flex w-[46px] shrink-0 items-center justify-center gap-[3px] rounded-full py-[2px] text-[7.5px] font-semibold leading-none" style={{ background: s.bg, color: s.fg }}>
      <span className={`size-[4px] rounded-full bg-current ${status === "Live" ? "mock-pulse" : ""}`} />
      {status}
    </span>
  );
}

/** The tablet running the client dashboard: 480 x 320 design px. */
export function MockTablet({ study }: { study: MockStudy }) {
  const tint = study.tint;
  const seed = hash(study.slug);
  const rows = rowsFor(study);
  const queueCount = parseValue(study.screen[1]?.value ?? "12") % 100 || 12;

  return (
    <div className="mock-tablet h-[320px] w-[480px] rounded-[20px] bg-[#111] p-[8px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.75),inset_0_0_0_1px_rgb(255_255_255/0.08)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform:rotateY(-11deg)_rotateX(7deg)_rotateZ(-1.5deg)] group-hover:[transform:none]">
      <div className="flex h-full overflow-hidden rounded-[13px] bg-[#f6f6f3] font-sans text-[#15151a]">
        {/* sidebar */}
        <div className="flex w-[96px] shrink-0 flex-col border-r border-black/[0.06] bg-white px-[7px] py-[9px]">
          <div className="flex items-center gap-[5px] px-[3px]">
            <span className="flex size-[16px] items-center justify-center rounded-[5px] text-[7px] font-bold text-white" style={{ background: tint }}>
              {initialsOf(study.client)}
            </span>
            <span className="truncate text-[9px] font-semibold">Console</span>
          </div>
          <p className="mt-[12px] px-[3px] text-[7px] font-medium uppercase tracking-[0.12em] text-black/35">Menu</p>
          <ul className="mt-[5px] space-y-[2px]">
            {NAV.map(({ label, Icon }, i) => (
              <li
                key={label}
                className={`flex h-[20px] items-center gap-[5px] rounded-[5px] px-[5px] text-[8.5px] ${i === 0 ? "font-semibold" : "text-black/55"}`}
                style={i === 0 ? { background: `${tint}14`, color: tint } : undefined}
              >
                <Icon className="size-[10px] shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="truncate">{label}</span>
                {i === 1 && <span className="ml-auto rounded-full bg-black/[0.07] px-[4px] py-[1px] text-[7px] font-semibold leading-none text-black/60">{queueCount}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex h-[20px] items-center gap-[5px] px-[5px] text-[8.5px] text-black/55">
            <Settings className="size-[10px] shrink-0" strokeWidth={2} aria-hidden="true" />
            Settings
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* top bar */}
          <div className="flex h-[36px] shrink-0 items-center gap-[8px] border-b border-black/[0.06] bg-white px-[10px]">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[7.5px] leading-tight text-black/45">{study.client}</p>
              <p className="truncate text-[11px] font-semibold leading-tight">Overview</p>
            </div>
            <div className="flex h-[18px] w-[92px] shrink-0 items-center gap-[4px] rounded-[5px] bg-black/[0.045] px-[5px] text-[7.5px] text-black/40">
              <Search className="size-[8px]" strokeWidth={2.2} aria-hidden="true" />
              <span className="flex-1">Search</span>
              <span className="rounded-[3px] bg-white px-[2px] text-[6.5px] leading-[10px] ring-1 ring-black/10">⌘K</span>
            </div>
            <span className="relative flex size-[18px] shrink-0 items-center justify-center rounded-full text-black/50">
              <Bell className="size-[10px]" strokeWidth={2} aria-hidden="true" />
              <span className="absolute right-[3px] top-[3px] size-[4px] rounded-full bg-[#e11d48] ring-1 ring-white" />
            </span>
            <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full text-[7px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${tint}, #111)` }}>
              {PEOPLE[seed % PEOPLE.length].initials}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-[7px] p-[9px]">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-[6px]">
              {study.screen.slice(0, 3).map((row, i) => (
                <KpiCard key={row.label} label={row.label} value={row.value} index={i} seed={seed} tint={tint} />
              ))}
            </div>

            {/* chart */}
            <div className="rounded-[7px] bg-white px-[8px] pb-[4px] pt-[6px] ring-1 ring-black/[0.06]">
              <div className="flex h-[12px] items-center justify-between leading-none">
                <p className="truncate text-[8.5px] font-semibold">{study.screen[0]?.label ?? "Volume"} · 12 weeks</p>
                <div className="flex shrink-0 items-center gap-[7px] text-[7px] text-black/45">
                  <span className="flex items-center gap-[3px]">
                    <span className="h-[2px] w-[8px] rounded-full" style={{ background: tint }} />
                    This period
                  </span>
                  <span className="flex items-center gap-[3px]">
                    <span className="h-0 w-[8px] border-t border-dashed border-black/35" />
                    Previous
                  </span>
                </div>
              </div>
              <Chart study={study} seed={seed} />
            </div>

            {/* activity table */}
            <div className="min-h-0 flex-1 overflow-hidden rounded-[7px] bg-white px-[8px] py-[4px] ring-1 ring-black/[0.06]">
              <div className="flex h-[13px] items-center justify-between text-[7px] uppercase tracking-[0.1em] text-black/40">
                <span>Recent activity</span>
                <span className="normal-case tracking-normal" style={{ color: tint }}>
                  View all
                </span>
              </div>
              <ul>
                {rows.map((r) => (
                  <li key={r.title} className="flex h-[19px] items-center gap-[6px] border-t border-black/[0.05] text-[8.5px]">
                    <span className="flex size-[13px] shrink-0 items-center justify-center rounded-full text-[5.5px] font-bold" style={{ background: r.person.bg, color: r.person.fg }}>
                      {r.person.initials}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{r.title}</span>
                    <span className="w-[40px] shrink-0 text-right text-[7.5px] text-black/40">{r.time}</span>
                    <StatusPill status={r.status} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MockTag() {
  return <IllustrativeTag tone="light" className="absolute right-3 top-3 z-10" />;
}

/* ------------------------------------------------------------------ */
/* Per-study scenes                                                     */
/* ------------------------------------------------------------------ */

/** Fallback scene for studies without a bespoke layout: the dashboard tablet. */
function DashboardMock({ study, v }: LayoutProps) {
  return (
    <div className={`absolute top-0 ${v === "wide" ? "left-[80px]" : "left-[-40px] origin-top-left scale-[0.83]"}`} style={{ perspective: 1400 }}>
      <MockTablet study={study} />
    </div>
  );
}

/** Which product screen each case study shows, keyed by slug. */
const LAYOUTS: Record<string, (p: LayoutProps) => ReactNode> = {
  "reconciliation-agent-frankfurt-payments": ReconciliationMock,
  "freelancer-insurance-platform-london": InsuranceMock,
  "physio-booking-app-dubai": PhysioMock,
  "patient-whatsapp-voice-agent-manchester": VoiceAgentMock,
  "family-office-property-brand-dubai": PropertyBrandMock,
  "rental-prototype-rescue-lisbon": RentalRescueMock,
  "modest-fashion-marketplace-abu-dhabi": MarketplaceMock,
  "headless-storefront-team-stockholm": AgencySprintMock,
  "route-planning-pod-rotterdam": RoutePlanningMock,
  "courier-driver-app-birmingham": CourierMock,
  "boutique-desert-retreat-ras-al-khaimah": DesertRetreatMock,
  "whatsapp-concierge-barcelona": WhatsAppConciergeMock,
};

/**
 * One composed product scene on a fixed design canvas: "wide" is 640 x 380,
 * "narrow" 400 x 270. `.mock2-stage` in globals.css scales it to fit.
 */
export function MockScene({ study, v, alt = false }: { study: MockStudy; v: Variant; alt?: boolean }) {
  const Layout = LAYOUTS[study.slug] ?? DashboardMock;
  return (
    <div className={`mock2-stage mock2-${v} ${alt ? "mock2-alt" : ""} font-sans text-[#15151a]`} aria-hidden="true">
      <Layout study={study} v={v} />
    </div>
  );
}
