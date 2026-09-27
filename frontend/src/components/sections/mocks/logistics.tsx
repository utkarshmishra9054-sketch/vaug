import { Camera, Check, MapPin, Navigation, Package, PenLine, Route, Truck } from "lucide-react";

import { At, Bar, Card, Phone, Pill, Tablet, Tilt, type LayoutProps } from "./kit";

/* ------------------------------------------------------------------ */
/* Route planning: live map with routes, trucks and backhauls           */
/* ------------------------------------------------------------------ */

type Pt = [number, number];

const ROADS: Pt[][] = [
  [
    [0, 0.3],
    [0.3, 0.34],
    [0.55, 0.28],
    [1, 0.36],
  ],
  [
    [0.1, 1],
    [0.22, 0.6],
    [0.3, 0.34],
    [0.36, 0],
  ],
  [
    [0.3, 0.34],
    [0.5, 0.62],
    [0.78, 0.7],
    [1, 0.82],
  ],
  [
    [0.55, 0.28],
    [0.62, 0.55],
    [0.5, 0.62],
    [0.46, 1],
  ],
  [
    [0.78, 0.7],
    [0.84, 0.4],
    [1, 0.2],
  ],
];

const ROUTES: { pts: Pt[]; color: string; empty?: boolean }[] = [
  {
    pts: [
      [0.3, 0.34],
      [0.5, 0.62],
      [0.78, 0.7],
      [0.84, 0.4],
    ],
    color: "tint",
  },
  {
    pts: [
      [0.3, 0.34],
      [0.55, 0.28],
      [0.62, 0.55],
    ],
    color: "#2563eb",
  },
  {
    pts: [
      [0.84, 0.4],
      [0.55, 0.28],
      [0.3, 0.34],
    ],
    color: "#16a34a",
    empty: true,
  },
];

const PLACES: { name: string; at: Pt; depot?: boolean }[] = [
  { name: "Rotterdam", at: [0.3, 0.34], depot: true },
  { name: "Antwerp", at: [0.22, 0.6] },
  { name: "Utrecht", at: [0.55, 0.28] },
  { name: "Eindhoven", at: [0.62, 0.55] },
  { name: "Duisburg", at: [0.84, 0.4] },
];

const TRUCKS: Pt[] = [
  [0.42, 0.51],
  [0.66, 0.67],
  [0.5, 0.3],
  [0.7, 0.34],
];

/** `ox` leaves the left share of the map free for a sidebar. */
const mx = (x: number, w: number, ox: number) => Math.round((ox + x * (1 - ox)) * w);

function RouteMap({ w, h, tint, ox = 0 }: { w: number; h: number; tint: string; ox?: number }) {
  const p = ([x, y]: Pt) => `${mx(x, w, ox)},${Math.round(y * h)}`;
  const line = (pts: Pt[]) => `M${pts.map(p).join(" L")}`;
  return (
    <svg width={w} height={h} className="absolute inset-0" aria-hidden="true">
      <rect width={w} height={h} fill="#eef0e8" />
      <path d={`M0 ${h * 0.05} C${w * 0.12} ${h * 0.12} ${w * 0.08} ${h * 0.3} 0 ${h * 0.42} Z`} fill="#cfe1ea" />
      <path d={`M${w * 0.05} ${h * 0.44} C${w * 0.2} ${h * 0.42} ${w * 0.26} ${h * 0.5} ${w * 0.4} ${h * 0.46}`} stroke="#cfe1ea" strokeWidth="7" fill="none" />
      {[
        [0.08, 0.72, 0.1, 0.14],
        [0.66, 0.1, 0.14, 0.12],
        [0.88, 0.58, 0.1, 0.16],
      ].map(([x, y, bw, bh]) => (
        <rect key={x} x={x * w} y={y * h} width={bw * w} height={bh * h} rx="6" fill="#dfe6d3" />
      ))}
      {ROADS.map((r, i) => (
        <g key={i}>
          <path d={line(r)} stroke="#d6d8d0" strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d={line(r)} stroke="#fff" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      ))}
      {ROUTES.map((r, i) => (
        <path
          key={i}
          d={line(r.pts)}
          stroke={r.color === "tint" ? tint : r.color}
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={r.empty ? "6 5" : undefined}
          className={r.empty ? "mock2-dash" : undefined}
        />
      ))}
      {PLACES.map((pl) => {
        const [x, y] = [mx(pl.at[0], w, ox), Math.round(pl.at[1] * h)];
        return (
          <g key={pl.name}>
            <circle cx={x} cy={y} r={pl.depot ? 5 : 3.5} fill="#fff" stroke={pl.depot ? tint : "#52525b"} strokeWidth="2" />
            <text x={x + 7} y={y - 6} fontSize="9.5" fontWeight="600" fill="#3f3f46" stroke="#eef0e8" strokeWidth="3" paintOrder="stroke">
              {pl.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TruckPins({ w, h, tint, ox = 0 }: { w: number; h: number; tint: string; ox?: number }) {
  return (
    <>
      {TRUCKS.map(([x, y], i) => (
        <span
          key={i}
          className="absolute flex size-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[6px] text-white shadow-[0_3px_8px_rgb(0_0_0/0.3)] ring-2 ring-white"
          style={{ left: mx(x, w, ox), top: Math.round(y * h), background: i === 2 ? "#16a34a" : i === 1 ? "#2563eb" : tint }}
        >
          <Truck className="size-[10px]" aria-hidden="true" />
        </span>
      ))}
    </>
  );
}

const FLEET = [
  { id: "NL-42", lane: "Rotterdam → Duisburg", load: 92, eta: "14:20", tone: "tint" },
  { id: "NL-17", lane: "Rotterdam → Eindhoven", load: 78, eta: "12:05", tone: "#2563eb" },
  { id: "DE-08", lane: "Duisburg → Rotterdam", load: 64, eta: "Backhaul", tone: "#16a34a" },
];

function FleetPanel({ tint, w, rows, flat = false }: { tint: string; w: number; rows: number; flat?: boolean }) {
  return (
    <Card w={w} className={flat ? "!p-[2px] !shadow-none !ring-0" : "!p-[9px]"}>
      <p className="flex items-center gap-[5px] text-[10.5px] font-semibold">
        <Route className="size-[11px]" style={{ color: tint }} aria-hidden="true" />
        Planned routes · Tue
      </p>
      <div className="mt-[6px] space-y-[7px]">
        {FLEET.slice(0, rows).map((f) => (
          <div key={f.id}>
            <div className="flex items-center gap-[5px] text-[9.5px]">
              <span className="size-[7px] shrink-0 rounded-full" style={{ background: f.tone === "tint" ? tint : f.tone }} />
              <span className="font-semibold">{f.id}</span>
              <span className="ml-auto text-[8.5px] text-black/50">{f.eta}</span>
            </div>
            <p className="truncate pl-[12px] text-[8.5px] text-black/50">{f.lane}</p>
            <div className="flex items-center gap-[4px] pl-[12px]">
              <span className="flex-1">
                <Bar pct={f.load} color={f.tone === "tint" ? tint : f.tone} h={4} />
              </span>
              <span className="text-[8px] tabular-nums text-black/50">{f.load}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function RoutePlanningMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  const empty = study.metrics[0]?.value ?? "-18%";
  if (v === "narrow") {
    const mw = 388 - 14;
    const mh = 256 - 14;
    return (
      <At x={6} y={0}>
        <Tilt m="left">
          <Tablet w={388} h={256}>
            <RouteMap w={mw} h={mh} tint={tint} />
            <TruckPins w={mw} h={mh} tint={tint} />
            <div className="absolute left-[8px] top-[8px] z-10 rounded-[8px] bg-white px-[8px] py-[6px] shadow-md">
              <p className="text-[8.5px] text-black/50">Empty km</p>
              <p className="text-[15px] font-bold leading-none text-[#16a34a]">{empty}</p>
            </div>
            <div className="absolute right-[8px] top-[8px] z-10 flex items-center gap-[4px] rounded-full bg-[#111] px-[8px] py-[4px] text-[9px] font-semibold text-white">
              <span className="mock-pulse size-[5px] rounded-full bg-[#22c55e]" />
              {study.screen[0]?.value} trucks live
            </div>
          </Tablet>
        </Tilt>
      </At>
    );
  }
  const mw = 600 - 14;
  const mh = 350 - 14;
  const ox = 0.3;
  return (
    <At x={20} y={6}>
      <Tilt m="left">
        <Tablet w={600} h={350}>
          <RouteMap w={mw} h={mh} tint={tint} ox={ox} />
          <TruckPins w={mw} h={mh} tint={tint} ox={ox} />
          <div className="absolute inset-y-0 left-0 z-10 w-[176px] border-r border-black/[0.06] bg-white/95 p-[8px]">
            <FleetPanel tint={tint} w={160} rows={3} flat />
            <div className="mt-[8px] rounded-[8px] bg-[#f0fdf4] p-[8px] ring-1 ring-[#bbf7d0]">
              <p className="text-[9.5px] font-semibold text-[#166534]">Backhaul matched</p>
              <p className="mt-[2px] text-[8.5px] leading-[1.35] text-[#166534]/80">DE-08 returns loaded from Duisburg, saving 164 km</p>
            </div>
          </div>
          <div className="absolute right-[10px] top-[10px] z-10 flex items-center gap-[4px] rounded-full bg-[#111] px-[8px] py-[4px] text-[9px] font-semibold text-white">
            <span className="mock-pulse size-[5px] rounded-full bg-[#22c55e]" />
            {study.screen[0]?.value} trucks live
          </div>
          <div className="absolute bottom-[10px] right-[10px] z-10 flex gap-[6px]">
            {[
              ["Empty km", empty, "#16a34a"],
              ["Loads / truck", study.metrics[1]?.value ?? "+22%", tint],
              ["On time", study.screen[2]?.value ?? "94.6%", "#111"],
            ].map(([k, val, c]) => (
              <div key={k} className="rounded-[8px] bg-white px-[9px] py-[5px] shadow-md">
                <p className="text-[8.5px] text-black/50">{k}</p>
                <p className="text-[14px] font-bold leading-none" style={{ color: c }}>
                  {val}
                </p>
              </div>
            ))}
          </div>
        </Tablet>
      </Tilt>
    </At>
  );
}

/* ------------------------------------------------------------------ */
/* Same-day courier: driver app job list + proof of delivery            */
/* ------------------------------------------------------------------ */

const STOPS = [
  { n: 9, addr: "Unit 4, Digbeth Trade Pk", win: "09:30–10:30", state: "done" },
  { n: 10, addr: "22 Colmore Row, B3", win: "10:30–11:30", state: "done" },
  { n: 11, addr: "14 Broad St, B1", win: "11:30–12:30", state: "next" },
  { n: 12, addr: "Jewellery Qtr, B18", win: "12:00–13:00", state: "todo" },
  { n: 13, addr: "Mailbox, Wharfside St", win: "13:00–14:00", state: "todo" },
];

function JobsPhone({ tint, w, h, stops = 5 }: { tint: string; w: number; h: number; stops?: number }) {
  return (
    <Phone w={w} h={h} bg="#f3f5f9" bar={tint} dark>
      <div className="shrink-0 px-[10px] pb-[8px] pt-[2px] text-white" style={{ background: tint }}>
        <p className="text-[8.5px] text-white/75">Van BX-12 · Today</p>
        <p className="text-[12px] font-bold leading-tight">18 stops</p>
        <div className="mt-[5px] flex items-center gap-[5px] text-[8.5px]">
          <span className="flex-1">
            <Bar pct={56} color="#fff" h={4} track="rgb(255 255 255 / 0.25)" />
          </span>
          10 of 18
        </div>
      </div>
      <div className="flex-1 px-[8px] pt-[7px] text-[#15151a]">
        {STOPS.slice(0, stops).map((s) => (
          <div
            key={s.n}
            className={`mb-[5px] flex items-center gap-[6px] rounded-[8px] px-[6px] py-[5px] ${s.state === "next" ? "bg-white shadow-[0_4px_12px_-4px_rgb(0_0_0/0.25)]" : ""}`}
            style={s.state === "next" ? { boxShadow: `inset 0 0 0 1.5px ${tint}, 0 4px 12px -4px rgb(0 0 0 / 0.25)` } : undefined}
          >
            <span
              className="flex size-[16px] shrink-0 items-center justify-center rounded-full text-[8px] font-bold"
              style={s.state === "done" ? { background: "#dcfce7", color: "#166534" } : s.state === "next" ? { background: tint, color: "#fff" } : { background: "rgb(0 0 0 / 0.07)", color: "rgb(0 0 0 / 0.5)" }}
            >
              {s.state === "done" ? <Check className="size-[9px]" strokeWidth={3} aria-hidden="true" /> : s.n}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-[9.5px] font-semibold leading-tight ${s.state === "done" ? "text-black/45" : ""}`}>{s.addr}</p>
              <p className="text-[8.5px] leading-tight text-black/45">{s.win}</p>
            </div>
            {s.state === "next" && (
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full text-white" style={{ background: tint }}>
                <Navigation className="size-[9px]" aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
    </Phone>
  );
}

function PodPhone({ tint, w, h }: { tint: string; w: number; h: number }) {
  return (
    <Phone w={w} h={h} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[4px]">
        <p className="text-[11px] font-bold">Proof of delivery</p>
        <p className="flex items-center gap-[3px] text-[8.5px] text-black/50">
          <MapPin className="size-[8px]" aria-hidden="true" /> 14 Broad St · 11:42
        </p>
        <div className="relative mt-[7px] h-[74px] overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,#c9b8a4,#8e7a66)]">
          <span className="absolute inset-x-[30%] bottom-0 top-[10%] rounded-t-[4px] bg-[#5b4636]" />
          <span className="absolute bottom-[4px] left-[18%] flex h-[26px] w-[34px] items-center justify-center rounded-[3px] bg-[#d6a86a] shadow">
            <Package className="size-[14px] text-[#7a5427]" aria-hidden="true" />
          </span>
          <span className="absolute right-[5px] top-[5px] flex items-center gap-[2px] rounded-full bg-black/55 px-[5px] py-[2px] text-[7.5px] text-white">
            <Camera className="size-[7px]" aria-hidden="true" /> Photo
          </span>
        </div>
        <p className="mt-[7px] flex items-center gap-[3px] text-[8.5px] text-black/50">
          <PenLine className="size-[8px]" aria-hidden="true" /> Signed by J. Patel
        </p>
        <div className="mt-[3px] h-[40px] rounded-[8px] bg-black/[0.035] ring-1 ring-black/[0.06]">
          <svg viewBox="0 0 120 40" className="h-full w-full" aria-hidden="true">
            <path d="M10 28 C18 8 24 34 32 20 S44 10 48 24 S60 30 66 16 C70 8 74 30 82 22 S98 18 108 20" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" className="mock-line" pathLength={1} />
          </svg>
        </div>
        <div className="mt-[6px] flex flex-wrap gap-[4px]">
          <Pill tone="green" size={8}>
            GPS matched
          </Pill>
          <Pill tone="blue" size={8}>
            Handed over
          </Pill>
        </div>
        <span className="mb-[4px] mt-auto flex h-[26px] items-center justify-center rounded-[9px] text-[10px] font-semibold text-white" style={{ background: tint }}>
          Complete delivery
        </span>
      </div>
    </Phone>
  );
}

export function CourierMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={36} y={0}>
          <Tilt m="left">
            <JobsPhone tint={tint} w={160} h={310} stops={4} />
          </Tilt>
        </At>
        <At x={206} y={14} z={2}>
          <Tilt m="lift">
            <PodPhone tint={tint} w={160} h={310} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={16} y={96}>
        <Card w={170}>
          <p className="text-[9px] text-black/50">Control panel · Birmingham</p>
          <p className="mt-[2px] text-[20px] font-bold leading-none tracking-[-0.02em]">{study.screen[2]?.value}</p>
          <p className="text-[9px] text-black/55">
            delivered of {study.screen[0]?.value} jobs
          </p>
          <span className="mt-[6px] block">
            <Bar pct={78} color={tint} h={5} />
          </span>
          <div className="mt-[8px] flex items-center justify-between text-[9px]">
            <span className="text-black/55">Drivers active</span>
            <span className="font-semibold">{study.screen[1]?.value}</span>
          </div>
          <div className="mt-[3px] flex items-center justify-between text-[9px]">
            <span className="text-black/55">POD captured</span>
            <span className="font-semibold text-[#166534]">{study.metrics[1]?.value}</span>
          </div>
        </Card>
      </At>
      <At x={210} y={0} z={2}>
        <Tilt m="lift">
          <JobsPhone tint={tint} w={180} h={364} />
        </Tilt>
      </At>
      <At x={410} y={16}>
        <Tilt m="right">
          <PodPhone tint={tint} w={176} h={352} />
        </Tilt>
      </At>
    </>
  );
}
