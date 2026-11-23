import { Archivo, IBM_Plex_Mono } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Battery, Check, CloudSun, Crosshair, Download, Eye, FileDown, Layers, Map as MapIcon, Plane, RotateCcw, Route, ShieldCheck, X } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Aerosearch Technologies · ClearLandMine survey console, from aerosearchtech.com (read 23 Nov 2026):
 * Archivo and IBM Plex Mono, near-black #0a0a09 / #272320, cream #ede7dd, amber #d9a441, red #e4462b.
 * Product facts (the aircraft goes first and no one enters the ground; coordinated multi-aircraft
 * coverage; several sensor feeds read as one picture, each contact marked by the sensor that calls it;
 * candidates, not conclusions; a map handed to the team that acts on it) are from the site.
 * TODO(content): illustrative. The survey site is a sample with no real location; areas, sorties,
 * contacts, sensors (named A, B, C) and teams are invented. The site's landmine statistics are not used.
 */

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", preload: false });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: archivo.style.fontFamily };
const MONO: CSSProperties = { fontFamily: plex.style.fontFamily };
const BG = "#0a0a09";
const PANEL = "#141311";
const EDGE = "#272320";
const CREAM = "#ede7dd";
const MUTE = "rgb(237 231 221 / 0.55)";
const AMBER = "#d9a441";
const RED = "#e4462b";
const SENSORS = [
  { k: "A", color: AMBER },
  { k: "B", color: "#3fb8a9" },
  { k: "C", color: "#6b8cff" },
];
const LOGO = { src: "/case-studies/autonomous-landmine-detection-india/logo-light.webp", img: { w: 896, h: 71 } };

/* Drawn survey ground (seeded, so server and client renders match) -------- */

function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r1 = (n: number) => Math.round(n * 10) / 10;
type Contact = { x: number; y: number; s: number[] };

function contacts(seed: number, n: number, w: number, h: number): Contact[] {
  const rand = rng(seed);
  return Array.from({ length: n }, () => {
    const x = r1(w * 0.12 + rand() * w * 0.76);
    const y = r1(h * 0.14 + rand() * h * 0.72);
    const roll = rand();
    const s = roll > 0.8 ? [0, 1, 2] : roll > 0.62 ? [0, rand() > 0.5 ? 1 : 2] : [Math.floor(rand() * 3)];
    return { x, y, s };
  });
}

/** The survey's contacts: sensor picks don't depend on size, so counts match every drawn map. */
const BASE = contacts(3, 46, 1, 1);
const COUNT = [0, 1, 2].map((k) => BASE.filter((c) => c.s.includes(k)).length);
const FUSED = BASE.filter((c) => c.s.length > 1).length;
const HELD = 3; // 2 for another pass, 1 dismissed
const MARKED = FUSED - HELD;
const FIRST_FUSED = BASE.findIndex((c) => c.s.length === 3);

function Ground({
  w,
  h,
  seed = 3,
  n = 0,
  lanes = 0,
  done = 0,
  marked = false,
  skip = 0,
  select,
  children,
}: {
  w: number;
  h: number;
  seed?: number;
  n?: number;
  lanes?: number;
  done?: number;
  marked?: boolean;
  /** With `marked`, leave out the first `skip` agreeing contacts (held back or dismissed). */
  skip?: number;
  select?: number;
  children?: ReactNode;
}) {
  const cs = contacts(seed, n, w, h);
  const held = new Set(cs.flatMap((c, i) => (c.s.length > 1 ? [i] : [])).slice(0, skip));
  const poly = `${r1(w * 0.08)},${r1(h * 0.12)} ${r1(w * 0.9)},${r1(h * 0.08)} ${r1(w * 0.94)},${r1(h * 0.88)} ${r1(w * 0.12)},${r1(h * 0.92)}`;
  const contours = [0.25, 0.45, 0.65, 0.85].map((f, i) => `M0 ${r1(h * f)} C ${r1(w * 0.3)} ${r1(h * (f - 0.12 + i * 0.02))}, ${r1(w * 0.6)} ${r1(h * (f + 0.1))}, ${w} ${r1(h * (f - 0.04))}`);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block" aria-hidden="true">
      <rect width={w} height={h} fill="#12110f" />
      {Array.from({ length: Math.ceil(w / 24) }, (_, i) => <line key={`v${i}`} x1={i * 24} x2={i * 24} y1={0} y2={h} stroke="rgb(237 231 221 / 0.05)" />)}
      {Array.from({ length: Math.ceil(h / 24) }, (_, i) => <line key={`h${i}`} x1={0} x2={w} y1={i * 24} y2={i * 24} stroke="rgb(237 231 221 / 0.05)" />)}
      {contours.map((d) => <path key={d} d={d} fill="none" stroke="rgb(217 164 65 / 0.12)" strokeWidth={1} />)}
      <polygon points={poly} fill="rgb(217 164 65 / 0.06)" stroke={AMBER} strokeWidth={1.2} strokeDasharray="5 3" />
      {Array.from({ length: lanes }, (_, i) => {
        const y = h * 0.16 + (i * (h * 0.7)) / Math.max(lanes - 1, 1);
        const covered = i < done;
        return <line key={`l${i}`} x1={r1(w * 0.1)} x2={r1(w * 0.92)} y1={r1(y)} y2={r1(y)} stroke={covered ? AMBER : "rgb(237 231 221 / 0.22)"} strokeWidth={covered ? 9 : 1} strokeOpacity={covered ? 0.16 : 1} strokeDasharray={covered ? undefined : "2 4"} />;
      })}
      {cs.map((c, i) => {
        const fused = c.s.length > 1;
        if (marked && (!fused || held.has(i))) return null;
        return (
          <g key={i}>
            {c.s.map((si, k) => (
              <circle key={si} cx={r1(c.x + (k - (c.s.length - 1) / 2) * 3.4)} cy={c.y} r={2.6} fill={SENSORS[si].color} />
            ))}
            {fused && <circle cx={c.x} cy={c.y} r={marked ? 6.5 : 7.5} fill="none" stroke={RED} strokeWidth={marked ? 1.6 : 1.1} />}
            {marked && fused && <path d={`M${c.x} ${r1(c.y - 13)} l4 6 h-8 z`} fill={RED} />}
            {i === select && <circle cx={c.x} cy={c.y} r={12} fill="none" stroke={CREAM} strokeWidth={1.2} strokeDasharray="3 2" />}
          </g>
        );
      })}
      {children}
    </svg>
  );
}

/* Console shell --------------------------------------------------------- */

const NAV: [string, typeof MapIcon][] = [
  ["Plan", Route],
  ["Detect", Layers],
  ["Review", Eye],
  ["Map", MapIcon],
];

function Console({ step, title, sub, right, children }: { step: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`clearlandmine.aerosearchtech.com/sa-07/${step.toLowerCase()}`} dark>
      <div className="flex h-full flex-col" style={{ ...FONT, background: BG, color: CREAM }}>
        <div className="flex h-[32px] shrink-0 items-center gap-[12px] border-b px-[12px]" style={{ borderColor: EDGE }}>
          <Photo {...LOGO} w={128} h={10} />
          <nav className="ml-[4px] flex gap-[3px]">
            {NAV.map(([t, Icon], i) => (
              <span key={t} className="flex h-[19px] items-center gap-[4px] rounded-[3px] px-[7px] text-[7.6px] uppercase tracking-[0.12em]" style={{ ...MONO, ...(t === step ? { background: CREAM, color: BG } : { color: MUTE }) }}>
                <span style={{ opacity: 0.6 }}>0{i + 1}</span>
                <Icon className="size-[8px]" aria-hidden="true" />
                {t}
              </span>
            ))}
          </nav>
          <span className="ml-auto text-[7px] uppercase tracking-[0.14em]" style={{ ...MONO, color: MUTE }}>Survey area SA-07 · sample site</span>
        </div>
        <div className="flex h-[36px] shrink-0 items-center px-[12px]">
          <div className="leading-tight">
            <p className="text-[13px] font-medium tracking-[-0.02em]">{title}</p>
            <p className="text-[7.4px]" style={{ color: MUTE }}>{sub}</p>
          </div>
          <div className="ml-auto flex gap-[5px]">{right}</div>
        </div>
        <div className="min-h-0 flex-1 px-[10px] pb-[10px]">{children}</div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Check }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] whitespace-nowrap rounded-[3px] px-[9px] text-[7.6px] font-medium" style={solid ? { background: CREAM, color: BG } : { color: CREAM, boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[4px] ${className}`} style={{ background: PANEL, boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
    {title && (
      <div className="flex h-[22px] shrink-0 items-center justify-between border-b px-[8px] text-[7px] uppercase tracking-[0.14em]" style={{ ...MONO, borderColor: EDGE, color: MUTE }}>
        {title}
        {right && <span>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);
const Row = ({ k, v }: { k: string; v: ReactNode }) => (
  <p className="flex h-[18px] items-center justify-between border-b text-[7.6px] last:border-b-0" style={{ borderColor: EDGE }}>
    <span style={{ color: MUTE }}>{k}</span>
    <span style={MONO}>{v}</span>
  </p>
);
const SensorKey = () => (
  <span className="flex items-center gap-[7px] text-[6.8px]" style={MONO}>
    {SENSORS.map((s) => (
      <span key={s.k} className="flex items-center gap-[3px]">
        <span className="size-[5px] rounded-full" style={{ background: s.color }} />
        Sensor {s.k}
      </span>
    ))}
    <span className="flex items-center gap-[3px]">
      <span className="size-[7px] rounded-full" style={{ boxShadow: `inset 0 0 0 1px ${RED}` }} />2+ agree
    </span>
  </span>
);

/* 01 · Search plan ------------------------------------------------------ */

const Plan: Screen = () => (
  <Console step="Plan" title="Search plan · the aircraft goes first" sub="Boundary from the survey team · three aircraft in formation · no one enters the ground" right={<Btn solid Icon={Plane}>Launch sortie 2</Btn>}>
    <div className="grid h-full grid-cols-[1fr_178px] gap-[8px]">
      <div className="relative overflow-hidden rounded-[4px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
        <Ground w={426} h={296} lanes={8} done={3}>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${r1(250 + i * 26)} ${r1(124 + i * 7)})`}>
              <circle r={8} fill="rgb(237 231 221 / 0.08)" stroke={CREAM} strokeWidth={0.8} />
              <path d="M-4 0 h8 M0 -4 v8" stroke={CREAM} strokeWidth={1.2} />
            </g>
          ))}
        </Ground>
        <span className="absolute bottom-[6px] left-[6px] rounded-[3px] px-[6px] py-[2px] text-[6.6px] uppercase tracking-[0.12em]" style={{ ...MONO, background: "rgb(10 10 9 / 0.8)", color: MUTE }}>Lanes 1–3 covered · 4–8 planned</span>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Plan">
          <Row k="Area" v="38 ha" />
          <Row k="Aircraft" v="3, in formation" />
          <Row k="Sorties" v="1 of 3 flown" />
          <Row k="Sensors" v="A · B · C" />
          <Row k="Est. remaining" v="1 h 50 min" />
        </Box>
        <Box title="Before launch" className="flex-1">
          {[
            [ShieldCheck, "Boundary confirmed by survey team"],
            [Battery, "Batteries, 3 aircraft"],
            [CloudSun, "Wind within limits"],
            [Crosshair, "Ground team outside the boundary"],
          ].map(([I, t]) => {
            const Icon = I as typeof Check;
            return (
              <p key={t as string} className="flex h-[19px] items-center gap-[5px] text-[7.4px]">
                <Icon className="size-[8px]" style={{ color: AMBER }} aria-hidden="true" />
                {t as string}
                <Check className="ml-auto size-[8px]" style={{ color: "#7fd18b" }} aria-hidden="true" />
              </p>
            );
          })}
        </Box>
      </div>
    </div>
  </Console>
);

/* 02 · Detect: several feeds as one picture ------------------------------ */

const Detect: Screen = () => (
  <Console step="Detect" title="Three sensors over the same ground" sub="Each contact marked by whichever sensor calls it · candidates, not conclusions" right={<SensorKey />}>
    <div className="grid h-full grid-cols-[1fr_168px] gap-[8px]">
      <div className="overflow-hidden rounded-[4px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
        <Ground w={436} h={296} n={46} lanes={8} done={8} />
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Contacts">
          <Row k="Sensor A" v={COUNT[0]} />
          <Row k="Sensor B" v={COUNT[1]} />
          <Row k="Sensor C" v={COUNT[2]} />
          <Row k="Two or more agree" v={<span style={{ color: RED }}>{FUSED}</span>} />
        </Box>
        <Box title="Queue for review" className="flex-1">
          {[
            ["C-14", "A · B · C"],
            ["C-09", "A · B · C"],
            ["C-31", "A · C"],
            ["C-22", "B · C"],
            ["C-05", "A · B"],
          ].map(([id, s]) => (
            <p key={id} className="flex h-[18px] items-center justify-between border-b text-[7.4px] last:border-b-0" style={{ ...MONO, borderColor: EDGE }}>
              <span>{id}</span>
              <span style={{ color: MUTE }}>{s}</span>
            </p>
          ))}
        </Box>
      </div>
    </div>
  </Console>
);

/* 03 · Review one candidate ---------------------------------------------- */

function SensorTile({ color, seed, label }: { color: string; seed: number; label: string }) {
  const rand = rng(seed);
  const blobs = Array.from({ length: 7 }, () => ({ x: r1(10 + rand() * 100), y: r1(10 + rand() * 70), r: r1(3 + rand() * 6), o: r1(0.1 + rand() * 0.25) }));
  return (
    <div className="overflow-hidden rounded-[4px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
      <svg width={128} height={92} viewBox="0 0 128 92" className="block" aria-hidden="true">
        <rect width={128} height={92} fill="#100f0d" />
        {blobs.map((b, i) => <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={color} opacity={b.o} />)}
        <circle cx={64} cy={46} r={10} fill={color} opacity={0.75} />
        <circle cx={64} cy={46} r={17} fill="none" stroke={RED} strokeWidth={1.2} />
      </svg>
      <p className="px-[5px] py-[3px] text-[6.6px] uppercase tracking-[0.1em]" style={{ ...MONO, color: MUTE, background: PANEL }}>{label}</p>
    </div>
  );
}

const Review: Screen = () => (
  <Console step="Review" title="Candidate C-14 · 3 of 3 sensors agree" sub="An analyst decides; the model only proposes" right={<span className="text-[7px]" style={{ ...MONO, color: MUTE }}>9 of {FUSED} reviewed</span>}>
    <div className="grid h-full grid-cols-[1fr_178px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <div className="grid grid-cols-3 gap-[6px]">
          {SENSORS.map((s, i) => <SensorTile key={s.k} color={s.color} seed={70 + i} label={`Sensor ${s.k} · called it`} />)}
        </div>
        <Box title="Where it sits" className="flex-1">
          <div className="overflow-hidden rounded-[3px]">
            <Ground w={384} h={118} n={46} seed={3} select={FIRST_FUSED} />
          </div>
        </Box>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Candidate">
          <Row k="Grid ref" v="SA-07 / C-14" />
          <Row k="Seen on" v="Sorties 1 and 3" />
          <Row k="Sensors" v="A · B · C" />
          <Row k="Model score" v="0.91" />
        </Box>
        <Box title="Decision" className="flex-1">
          <div className="space-y-[5px]">
            <span className="flex h-[22px] items-center gap-[5px] rounded-[3px] px-[8px] text-[7.8px] font-medium" style={{ background: RED, color: "#fff" }}>
              <Crosshair className="size-[8px]" aria-hidden="true" /> Mark for the clearance team
            </span>
            <span className="flex h-[22px] items-center gap-[5px] rounded-[3px] px-[8px] text-[7.8px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
              <RotateCcw className="size-[8px]" aria-hidden="true" /> Needs another pass
            </span>
            <span className="flex h-[22px] items-center gap-[5px] rounded-[3px] px-[8px] text-[7.8px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
              <X className="size-[8px]" aria-hidden="true" /> Dismiss, with a reason
            </span>
          </div>
          <p className="mt-[7px] text-[6.8px] leading-[1.45]" style={{ color: MUTE }}>Every decision is logged with the analyst, the time and the sensor views it was made on.</p>
        </Box>
      </div>
    </div>
  </Console>
);

/* 04 · The map handed over ---------------------------------------------- */

const Handover: Screen = () => (
  <Console step="Map" title="A map the team can act on" sub="Marked contacts only, each with its views and decision log" right={<><Btn Icon={Download}>KML</Btn><Btn Icon={Download}>GeoJSON</Btn><Btn solid Icon={FileDown}>Field map PDF</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_168px] gap-[8px]">
      <div className="overflow-hidden rounded-[4px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
        <Ground w={436} h={296} n={46} marked skip={HELD} />
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Handover">
          <Row k="Marked" v={<span style={{ color: RED }}>{MARKED}</span>} />
          <Row k="Another pass" v="2" />
          <Row k="Dismissed" v="1" />
          <Row k="To" v="Clearance team 2" />
          <Row k="Sent" v="Today, 16:20" />
        </Box>
        <Box title="Next" className="flex-1">
          <p className="text-[7.2px] leading-[1.45]" style={{ color: MUTE }}>
            Sortie 4 re-flies lanes 2 and 6 for the two contacts that need another pass. The team starts from the marked map; nothing here clears ground on its own.
          </p>
        </Box>
      </div>
    </div>
  </Console>
);

/* 05 · Website and the field map ---------------------------------------- */

const Site: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: `radial-gradient(circle at 30% 30%, #2a2418, ${BG} 70%)` }}>
    <Laptop w={404} h={258} bg={BG}>
      <div className="relative flex h-full flex-col overflow-hidden px-[16px] py-[10px]" style={{ ...FONT, color: CREAM }}>
        <div className="flex items-center">
          <Photo {...LOGO} w={120} h={9.5} />
          <span className="ml-auto rounded-[2px] px-[7px] py-[2px] text-[6.4px]" style={{ background: CREAM, color: BG }}>Talk to us</span>
        </div>
        <svg width={170} height={170} viewBox="0 0 170 170" className="absolute right-[10px] top-[30px]" aria-hidden="true">
          <defs>
            <linearGradient id="as-beam" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={AMBER} stopOpacity={0.7} />
              <stop offset="1" stopColor={AMBER} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <rect x={58} y={20} width={54} height={8} rx={2} fill="#3a3732" />
          <rect x={40} y={16} width={22} height={3} rx={1.5} fill="#55514a" />
          <rect x={108} y={16} width={22} height={3} rx={1.5} fill="#55514a" />
          <path d="M80 30 L92 30 L118 138 L54 138 Z" fill="url(#as-beam)" />
          <ellipse cx={86} cy={138} rx={33} ry={9} fill="none" stroke={AMBER} strokeOpacity={0.7} />
        </svg>
        <p className="mt-[34px] text-[6.4px] uppercase tracking-[0.18em]" style={{ ...MONO, color: AMBER }}>— Tactical edge perception</p>
        <p className="mt-[6px] text-[25px] font-medium leading-[1.02] tracking-[-0.03em]">Autonomous threat<br />prediction.</p>
        <p className="mt-[8px] max-w-[190px] text-[6.8px] leading-[1.45]" style={{ color: MUTE }}>Hardware-integrated autonomy for contested environments, fusing raw signals into real-time predictive threat intelligence.</p>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg={BG} dark>
      <div className="flex flex-1 flex-col px-[8px] pt-[4px]" style={{ ...FONT, color: CREAM }}>
        <p className="text-[6.4px] uppercase tracking-[0.14em]" style={{ ...MONO, color: MUTE }}>Field map · SA-07</p>
        <p className="text-[10px] font-medium">{MARKED} marked contacts</p>
        <div className="mt-[5px] overflow-hidden rounded-[4px]" style={{ boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
          <Ground w={130} h={150} n={46} marked skip={HELD} />
        </div>
        <p className="mt-[6px] text-[6.8px] leading-[1.4]" style={{ color: MUTE }}>Tap a mark for its sensor views and the analyst&apos;s note. Works offline.</p>
      </div>
    </Phone>
  </div>
);

export const aerosearchScreens: Screen[] = [Plan, Detect, Review, Handover, Site];
