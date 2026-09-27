import { useId } from "react";
import { AlertTriangle, CalendarDays, Check, Gauge, ShieldCheck, Star, Users } from "lucide-react";

import { At, Avatar, Browser, Card, Laptop, Pill, Tablet, Tilt, TONES, type LayoutProps } from "./kit";

/* ------------------------------------------------------------------ */
/* Family office property brand: marketing site + lead pipeline         */
/* ------------------------------------------------------------------ */

/** Skyline-and-water hero art, drawn at the given size. */
function WaterfrontArt({ w, h, tint }: { w: number; h: number; tint: string }) {
  const y = (f: number) => Math.round(h * f);
  const x = (f: number) => Math.round(w * f);
  const id = `wf${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width={w} height={h} className="absolute inset-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f7d9b8" />
          <stop offset="1" stopColor="#f2b58c" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
      <circle cx={x(0.78)} cy={y(0.42)} r={Math.round(h * 0.16)} fill="#fff4e0" opacity="0.85" />
      {[
        [0.6, 0.3, 0.05],
        [0.655, 0.18, 0.045],
        [0.705, 0.36, 0.035],
        [0.86, 0.34, 0.05],
        [0.92, 0.26, 0.04],
      ].map(([bx, top, bw]) => (
        <rect key={bx} x={x(bx)} y={y(top)} width={x(bw)} height={y(0.72 - top)} fill={tint} opacity="0.35" />
      ))}
      <rect x={x(0.75)} y={y(0.12)} width={x(0.02)} height={y(0.6)} fill={tint} opacity="0.45" />
      <rect y={y(0.72)} width={w} height={y(0.28)} fill="#9fb9c6" />
      <rect y={y(0.72)} width={w} height={2} fill="#fff" opacity="0.5" />
      {[0.8, 0.87, 0.94].map((f, i) => (
        <rect key={f} x={x(0.5 + i * 0.12)} y={y(f)} width={x(0.12)} height="1.5" fill="#fff" opacity="0.55" />
      ))}
    </svg>
  );
}

const LISTINGS = [
  { kind: "Villa", place: "Palm Jumeirah", price: "AED 14.5M" },
  { kind: "Penthouse", place: "Dubai Marina", price: "AED 9.2M" },
  { kind: "Townhouse", place: "Dubai Hills", price: "AED 6.8M" },
];

function PropertySite({ tint, w, heroH, listings }: { tint: string; w: number; heroH: number; listings: number }) {
  return (
    <div className="h-full bg-[#fbf8f4]">
      <div className="relative overflow-hidden" style={{ height: heroH }}>
        <WaterfrontArt w={w} h={heroH} tint={tint} />
        <div className="relative flex h-[28px] items-center gap-[12px] px-[14px] text-[9px] text-[#2b1d14]">
          <span className="font-serif text-[12px] font-semibold tracking-[0.18em]">SAHEL</span>
          <span className="ml-auto">Residences</span>
          <span>Journal</span>
          <span className="rounded-full px-[8px] py-[3px] font-semibold text-white" style={{ background: tint }}>
            Enquire
          </span>
        </div>
        <div className="relative px-[16px] pt-[10px] text-[#2b1d14]">
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.16em] opacity-70">Dubai waterfront</p>
          <p className="mt-[4px] max-w-[62%] font-serif text-[21px] leading-[1.08]">Homes on the water, quietly curated.</p>
          <span className="mt-[9px] inline-flex rounded-full px-[10px] py-[5px] text-[9.5px] font-semibold text-white" style={{ background: "#2b1d14" }}>
            Book a private viewing
          </span>
        </div>
      </div>
      <div className="grid gap-[8px] px-[12px] pt-[10px]" style={{ gridTemplateColumns: `repeat(${listings}, minmax(0, 1fr))` }}>
        {LISTINGS.slice(0, listings).map((l, i) => (
          <div key={l.kind} className="overflow-hidden rounded-[7px] bg-white ring-1 ring-black/[0.06]">
            <div className="h-[34px]" style={{ background: `linear-gradient(135deg, ${["#e8c9a8", "#b9cdd6", "#d6c3ae"][i]}, ${tint}55)` }} />
            <div className="px-[6px] py-[4px]">
              <p className="truncate text-[9.5px] font-semibold">{l.kind}</p>
              <p className="truncate text-[8.5px] text-black/50">{l.place}</p>
              <p className="text-[9px] font-bold" style={{ color: tint }}>
                {l.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const LEADS = [
  { name: "Khalid A.", budget: "AED 12–15M", score: 94, stage: "Viewing Thu", i: 0 },
  { name: "Elena M.", budget: "AED 8–10M", score: 88, stage: "Qualified", i: 1 },
  { name: "Rahul S.", budget: "AED 6–7M", score: 81, stage: "New", i: 3 },
  { name: "Sophie L.", budget: "AED 9M", score: 76, stage: "Offer", i: 4 },
];

function LeadCard({ study, w, rows }: { study: LayoutProps["study"]; w: number; rows: number }) {
  const tint = study.tint;
  const stages = [
    ["New", 31],
    ["Qualified", 19],
    ["Viewing", 12],
    ["Offer", 4],
  ] as const;
  return (
    <Card w={w}>
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-semibold">Buyer leads</p>
        <span className="text-[9px] font-semibold" style={{ color: tint }}>
          {study.screen[2]?.value}
        </span>
      </div>
      <div className="mt-[6px] flex h-[6px] gap-[2px] overflow-hidden rounded-full">
        {stages.map(([s, n], k) => (
          <span key={s} style={{ flex: n, background: tint, opacity: 1 - k * 0.22 }} />
        ))}
      </div>
      <div className="mt-[4px] flex justify-between text-[8px] text-black/45">
        {stages.map(([s, n]) => (
          <span key={s}>
            {s} {n}
          </span>
        ))}
      </div>
      <div className="mt-[6px] space-y-[5px]">
        {LEADS.slice(0, rows).map((l) => (
          <div key={l.name} className="flex items-center gap-[6px] border-t border-black/[0.05] pt-[5px]">
            <Avatar text={l.name.split(" ").map((s) => s[0]).join("")} i={l.i} size={18} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9.5px] font-semibold leading-tight">{l.name}</p>
              <p className="truncate text-[8.5px] leading-tight text-black/45">{l.budget}</p>
            </div>
            <Pill tone={l.score >= 85 ? "green" : "amber"} size={8}>
              {l.score}
            </Pill>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PropertyBrandMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={4} y={8}>
          <Tilt m="left">
            <Browser w={286} h={250} url="sahel-residences.ae">
              <PropertySite tint={tint} w={286} heroH={150} listings={2} />
            </Browser>
          </Tilt>
        </At>
        <At x={236} y={52} z={2}>
          <Tilt m="lift">
            <LeadCard study={study} w={158} rows={3} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={6} y={20}>
        <Tilt m="left">
          <Browser w={450} h={330} url="sahel-residences.ae">
            <PropertySite tint={tint} w={450} heroH={200} listings={3} />
          </Browser>
        </Tilt>
      </At>
      <At x={420} y={70} z={2}>
        <Tilt m="lift">
          <LeadCard study={study} w={204} rows={4} />
        </Tilt>
      </At>
      <At x={440} y={8} z={2}>
        <div className="flex items-center gap-[6px] rounded-full bg-white/95 py-[5px] pl-[5px] pr-[10px] text-[10px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[18px] items-center justify-center rounded-full text-white" style={{ background: tint }}>
            <Users className="size-[10px]" aria-hidden="true" />
          </span>
          {study.metrics[0]?.value} qualified leads
        </div>
      </At>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Lovable prototype rescue: before/after + security audit              */
/* ------------------------------------------------------------------ */

function BeforeAfter({ tint, w }: { tint: string; w: number }) {
  const half = w / 2;
  return (
    <div className="relative flex h-full">
      {/* before */}
      <div className="relative h-full overflow-hidden bg-[#ececec] grayscale" style={{ width: half }}>
        <div className="flex h-[22px] items-center px-[8px] text-[9px] font-semibold text-black/50">rentr-proto.app</div>
        <div className="mx-[8px] h-[64px] rounded-[5px] border border-dashed border-black/25 bg-black/[0.04]" />
        <div className="mx-[8px] mt-[6px] h-[7px] w-[70%] rounded bg-black/15" />
        <div className="mx-[8px] mt-[4px] h-[7px] w-[45%] rounded bg-black/10" />
      </div>
      <div className="absolute left-[8px] top-[118px] space-y-[4px]" style={{ width: half - 16 }}>
        {["API key in browser bundle", "Tables readable by anyone", "7.0s page load"].map((t) => (
          <p key={t} className="flex items-center gap-[4px] rounded-[5px] bg-[#fee2e2] px-[5px] py-[3px] text-[8.5px] font-semibold leading-tight text-[#991b1b]">
            <AlertTriangle className="size-[8px] shrink-0" aria-hidden="true" />
            <span className="truncate">{t}</span>
          </p>
        ))}
      </div>
      {/* after */}
      <div className="h-full overflow-hidden bg-white" style={{ width: half }}>
        <div className="flex h-[22px] items-center gap-[4px] px-[8px] text-[9px] font-bold">
          <span className="size-[9px] rounded-[3px]" style={{ background: tint }} />
          casa.pt
        </div>
        <div className="relative mx-[8px] h-[64px] overflow-hidden rounded-[5px]" style={{ background: `linear-gradient(135deg, #fde2c8, ${tint}66)` }}>
          <span className="absolute bottom-0 left-[14%] h-[60%] w-[30%] rounded-t-[3px] bg-white/70" />
          <span className="absolute bottom-0 left-[48%] h-[80%] w-[26%] rounded-t-[3px] bg-white/55" />
          <span className="absolute right-[6px] top-[6px] rounded-full bg-white px-[5px] py-[2px] text-[8px] font-bold text-[#166534]">1.2s</span>
        </div>
        <p className="mx-[8px] mt-[5px] truncate text-[10px] font-semibold leading-tight">T2 in Alfama, river view</p>
        <p className="mx-[8px] text-[9px] text-black/50">€1,450 / month · 68 m²</p>
        <span className="mx-[8px] mt-[6px] inline-flex rounded-[5px] px-[8px] py-[4px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          Apply now
        </span>
        <div className="mx-[8px] mt-[7px] flex gap-[4px]">
          <Pill tone="green" size={8}>
            Verified
          </Pill>
          <Pill tone="blue" size={8}>
            3 viewings
          </Pill>
        </div>
      </div>
      {/* labels + handle */}
      <span className="absolute bottom-[8px] left-[8px] rounded-full bg-black/70 px-[6px] py-[2px] text-[8px] font-bold uppercase tracking-[0.1em] text-white">Before</span>
      <span className="absolute bottom-[8px] rounded-full px-[6px] py-[2px] text-[8px] font-bold uppercase tracking-[0.1em] text-white" style={{ left: half + 8, background: tint }}>
        After
      </span>
      <span className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.1)]" style={{ left: half - 1 }} />
      <span className="absolute top-1/2 flex size-[20px] -translate-y-1/2 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black/60 shadow-md" style={{ left: half - 10 }}>
        ‹›
      </span>
    </div>
  );
}

const AUDIT = ["Row-level security on every table", "Secrets moved server-side", "Auth checked on all API routes", "Rate limits and bot checks", "Images optimised, CDN cached"];

function AuditCard({ tint, w, items }: { tint: string; w: number; items: number }) {
  return (
    <Card w={w}>
      <div className="flex items-center gap-[6px]">
        <span className="flex size-[22px] items-center justify-center rounded-[6px] text-white" style={{ background: tint }}>
          <ShieldCheck className="size-[12px]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10.5px] font-semibold leading-tight">Security audit</p>
          <p className="text-[8.5px] leading-tight text-black/45">Pre-launch · passed</p>
        </div>
      </div>
      <ul className="mt-[7px] space-y-[5px]">
        {AUDIT.slice(0, items).map((a) => (
          <li key={a} className="flex items-start gap-[5px] text-[9px] leading-[1.3]">
            <span className="mt-[1px] flex size-[11px] shrink-0 items-center justify-center rounded-full" style={{ background: TONES.green.bg, color: TONES.green.fg }}>
              <Check className="size-[7px]" strokeWidth={3.5} aria-hidden="true" />
            </span>
            {a}
          </li>
        ))}
      </ul>
      <div className="mt-[8px] flex gap-[4px]">
        <Pill tone="green" size={8}>
          0 critical
        </Pill>
        <Pill tone="green" size={8}>
          0 high
        </Pill>
      </div>
    </Card>
  );
}

export function RentalRescueMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={4} y={10}>
          <Tilt m="left">
            <Browser w={250} h={236} url="casa.pt/listings">
              <BeforeAfter tint={tint} w={250} />
            </Browser>
          </Tilt>
        </At>
        <At x={236} y={0} z={2}>
          <Tilt m="lift">
            <AuditCard tint={tint} w={158} items={4} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={30} y={14}>
        <Tilt m="left">
          <Laptop w={400} h={300}>
            <BeforeAfter tint={tint} w={386} />
          </Laptop>
        </Tilt>
      </At>
      <At x={414} y={56} z={2}>
        <Tilt m="lift">
          <AuditCard tint={tint} w={200} items={5} />
        </Tilt>
      </At>
      <At x={430} y={4} z={2}>
        <div className="flex items-center gap-[6px] rounded-full bg-white/95 py-[5px] pl-[5px] pr-[10px] text-[10px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[18px] items-center justify-center rounded-full bg-[#dcfce7] text-[#166534]">
            <Gauge className="size-[10px]" aria-hidden="true" />
          </span>
          Load 7.0s → {study.metrics[1]?.value ?? "1.2s"}
        </div>
      </At>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Desert retreat: brand website hero + occupancy calendar              */
/* ------------------------------------------------------------------ */

function DuneArt({ w, h }: { w: number; h: number }) {
  const y = (f: number) => Math.round(h * f);
  const x = (f: number) => Math.round(w * f);
  const id = `dn${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width={w} height={h} className="absolute inset-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3b2a4a" />
          <stop offset="0.55" stopColor="#c7715a" />
          <stop offset="1" stopColor="#f3b27a" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
      <circle cx={x(0.72)} cy={y(0.56)} r={Math.round(h * 0.11)} fill="#ffd9a0" />
      <path d={`M0 ${y(0.66)} Q${x(0.25)} ${y(0.5)} ${x(0.5)} ${y(0.66)} T${w} ${y(0.62)} V${h} H0 Z`} fill="#c98a55" />
      <path d={`M0 ${y(0.82)} Q${x(0.35)} ${y(0.64)} ${x(0.7)} ${y(0.8)} T${w} ${y(0.76)} V${h} H0 Z`} fill="#a86a3c" />
      <path d={`M0 ${y(0.93)} Q${x(0.4)} ${y(0.8)} ${w} ${y(0.95)} V${h} H0 Z`} fill="#7d4b27" />
      {[0.14, 0.2, 0.26].map((f) => (
        <rect key={f} x={x(f)} y={y(0.74)} width={x(0.045)} height={y(0.06)} rx="2" fill="#f6e7d2" opacity="0.9" />
      ))}
    </svg>
  );
}

function RetreatSite({ tint, w, h, narrow = false }: { tint: string; w: number; h: number; narrow?: boolean }) {
  return (
    <div className="relative h-full overflow-hidden">
      <DuneArt w={w} h={h} />
      <div className="relative flex h-[28px] items-center gap-[12px] px-[14px] text-[9px] text-white/90">
        <span className="font-serif text-[12px] italic tracking-[0.06em]">Qasr Sahra</span>
        <span className="ml-auto">Villas</span>
        <span>Dining</span>
        <span>Experiences</span>
      </div>
      <div className="relative px-[16px] pt-[12px] text-white">
        <p className={`font-serif leading-[1.05] ${narrow ? "max-w-[170px] text-[21px]" : "text-[23px]"}`}>Stay among the dunes.</p>
        <p className="mt-[4px] text-[9.5px] text-white/80">Twelve villas. One quiet horizon.</p>
      </div>
      <div
        className="absolute bottom-[12px] left-[12px] flex items-center gap-[1px] overflow-hidden rounded-[8px] bg-white text-[#2a1a10] shadow-lg"
        style={{ right: narrow ? 76 : 64 }}
      >
        {(narrow
          ? [
              ["Dates", "14–17 Nov"],
              ["Guests", "2"],
            ]
          : [
              ["Check-in", "14 Nov"],
              ["Check-out", "17 Nov"],
              ["Guests", "2 adults"],
            ]
        ).map(([k, val]) => (
          <div key={k} className="min-w-0 flex-1 border-r border-black/[0.06] px-[8px] py-[5px]">
            <p className="truncate text-[8px] uppercase tracking-[0.08em] text-black/45">{k}</p>
            <p className="truncate text-[10px] font-semibold">{val}</p>
          </div>
        ))}
        <span className="m-[4px] shrink-0 rounded-[6px] px-[9px] py-[7px] text-[9.5px] font-semibold text-white" style={{ background: tint }}>
          {narrow ? "Book" : "Book direct"}
        </span>
      </div>
    </div>
  );
}

/** November: 1 Nov 2026 is a Sunday; Monday-first grid. */
const OCC = "xoodddooxddddddoddxdddddodddxdd".split("");

function OccupancyCard({ study, w, cell }: { study: LayoutProps["study"]; w: number; cell: number }) {
  const tint = study.tint;
  const cells = [...Array(6).fill(null), ...OCC.slice(0, 30)];
  const color = (c: string | null) => (c === "d" ? tint : c === "o" ? "#d4d4d8" : c === "x" ? "#fff" : "transparent");
  return (
    <Card w={w}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-[5px] text-[10.5px] font-semibold">
          <CalendarDays className="size-[11px]" style={{ color: tint }} aria-hidden="true" />
          Occupancy · Nov
        </p>
        <span className="text-[10px] font-bold" style={{ color: tint }}>
          {study.screen[1]?.value}
        </span>
      </div>
      <div className="mt-[7px] grid grid-cols-7 gap-[3px] text-center text-[8px] text-black/40">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
        {cells.map((c, i) => (
          <span
            key={i}
            className="flex items-center justify-center rounded-[4px] text-[8px] font-semibold"
            style={{ height: cell, background: color(c), color: c === "d" ? "#fff" : "rgb(0 0 0 / 0.55)", boxShadow: c === "x" ? "inset 0 0 0 1px rgb(0 0 0 / 0.1)" : undefined }}
          >
            {c ? i - 5 : ""}
          </span>
        ))}
      </div>
      <div className="mt-[7px] flex items-center gap-[8px] text-[8.5px] text-black/55">
        <span className="flex items-center gap-[3px]">
          <span className="size-[7px] rounded-[2px]" style={{ background: tint }} /> Direct {study.screen[2]?.value}
        </span>
        <span className="flex items-center gap-[3px]">
          <span className="size-[7px] rounded-[2px] bg-[#d4d4d8]" /> OTA
        </span>
      </div>
    </Card>
  );
}

export function DesertRetreatMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={4} y={4}>
          <Tilt m="left">
            <Browser w={290} h={228} url="qasrsahra.ae">
              <RetreatSite tint={tint} w={290} h={204} narrow />
            </Browser>
          </Tilt>
        </At>
        <At x={232} y={44} z={2}>
          <Tilt m="lift">
            <OccupancyCard study={study} w={162} cell={15} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={6} y={16}>
        <Tilt m="left">
          <Browser w={450} h={320} url="qasrsahra.ae">
            <RetreatSite tint={tint} w={450} h={296} />
          </Browser>
        </Tilt>
      </At>
      <At x={404} y={60} z={2}>
        <Tablet w={228} h={262} bg="#fff">
          <div className="p-[2px]">
            <OccupancyCard study={study} w={210} cell={22} />
          </div>
        </Tablet>
      </At>
      <At x={414} y={4} z={3}>
        <div className="flex items-center gap-[6px] rounded-full bg-white/95 py-[5px] pl-[5px] pr-[10px] text-[10px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[18px] items-center justify-center rounded-full text-white" style={{ background: tint }}>
            <Star className="size-[10px]" aria-hidden="true" />
          </span>
          {study.metrics[2]?.value} guest rating
        </div>
      </At>
    </>
  );
}
