import { Inter, Playfair_Display } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Activity, Bell, Droplets, FileCheck2, Gauge, Inbox, LayoutDashboard, Settings, TriangleAlert } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Legend, LineChart, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Alkamy Carbon · plant monitoring and MRV portal, from alkamycarbon.com (read 23 Nov 2026): Inter
 * with Playfair Display headings, deep teal #0b2e2e, teal #0a8c8c, slate #5f7d7d. Product facts
 * (mineral dosing into existing plants, inlet and outlet sensing, automated optimisation, CO₂ to
 * bicarbonate, verifiable MRV) are from the site. TODO(content): illustrative. Plants are anonymised
 * pilot sites; every reading, tonne and enquiry is invented.
 */

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", preload: false });
const SANS: CSSProperties = { fontFamily: inter.style.fontFamily };
const SERIF: CSSProperties = { fontFamily: playfair.style.fontFamily };
const DEEP = "#0b2e2e";
const TEAL = "#0a8c8c";
const SLATE = "#5f7d7d";
const LINE = "#dfeaea";
const WASH = "#eef6f6";
const LOGO = { src: "/logos/alkamy.webp", img: { w: 468, h: 160 } };

const NAV: [string, typeof Gauge, number?][] = [
  ["Plants", LayoutDashboard, 3],
  ["Chemistry", Activity],
  ["Dosing", Droplets],
  ["Alerts", Bell, 2],
  ["Ledger & MRV", FileCheck2],
  ["Enquiries", Inbox, 5],
  ["Settings", Settings],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`plants.alkamycarbon.com/${path}`}>
      <div className="flex h-full" style={{ ...SANS, color: DEEP, background: "#f7fbfb" }}>
        <aside className="flex w-[114px] shrink-0 flex-col border-r bg-white px-[8px] py-[10px]" style={{ borderColor: LINE }}>
          <Photo {...LOGO} w={62} h={21} />
          <nav className="mt-[12px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-[6px] px-[6px] text-[8.4px]" style={i === active ? { background: DEEP, color: "#fff", fontWeight: 600 } : { color: SLATE }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto rounded-full px-[4px] text-[7px] font-bold" style={{ background: i === active ? TEAL : WASH, color: i === active ? "#fff" : DEEP }}>{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto rounded-[6px] p-[6px]" style={{ background: WASH }}>
            <p className="text-[7.8px] font-semibold">Operations</p>
            <p className="text-[6.8px]" style={{ color: SLATE }}>3 pilot plants · 24/7</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12.5px] font-bold" style={SERIF}>{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: SLATE }}>{sub}</p>
            </div>
            <div className="ml-auto flex items-center gap-[6px]">{right}</div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] rounded-[5px] px-[8px] text-[7.8px] font-semibold" style={solid ? { background: TEAL, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-semibold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal" style={{ color: SLATE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);
const Kpis = ({ items }: { items: [string, string, string][] }) => (
  <div className="grid grid-cols-4 gap-[8px]">
    {items.map(([k, v, s], i) => (
      <div key={k} className="rounded-[8px] px-[9px] py-[7px]" style={i === 0 ? { background: DEEP, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
        <p className="text-[7.5px]" style={{ opacity: 0.75 }}>{k}</p>
        <p className="mt-[3px] text-[16px] font-bold leading-none" style={SERIF}>{v}</p>
        <p className="mt-[4px] text-[7px]" style={{ opacity: 0.7 }}>{s}</p>
      </div>
    ))}
  </div>
);

/* 01 · Plant dashboard ---------------------------------------------- */

const Dashboard: Screen = () => (
  <Portal path="plants/pilot-a" active={0} title="Pilot plant A" sub="Activated-sludge plant · 40 MLD · mineral dosing since 2 Sep · live" right={<Btn>Last 14 days</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Kpis
        items={[
          ["CO₂ removed, Nov", "38.4 t", "+12% vs Oct"],
          ["Outlet pH", "7.4", "target 7.2–7.6"],
          ["Dosing uptime", "99.2%", "1 stop, 20 min"],
          ["Batches verified", "26 / 28", "2 pending lab check"],
        ]}
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_150px] gap-[8px]">
        <Box title="Dissolved inorganic carbon, mg/L" right={<Legend items={[{ label: "Inlet", color: SLATE }, { label: "Outlet", color: TEAL }]} />}>
          <LineChart
            w={300}
            h={168}
            max={60}
            min={20}
            labels={["10", "12", "14", "16", "18", "20", "22 Nov"]}
            yFormat={(n) => String(Math.round(n))}
            series={[
              { values: [36, 38, 35, 37, 39, 36, 37, 38, 36, 35, 37, 38, 36, 37], color: SLATE, dashed: true },
              { values: [48, 50, 47, 49, 52, 48, 50, 51, 49, 47, 50, 52, 49, 51], color: TEAL, area: true },
            ]}
          />
          <p className="mt-[3px] text-[7.2px]" style={{ color: SLATE }}>The gap between outlet and inlet is the carbon stored as bicarbonate.</p>
        </Box>
        <Box title="Right now">
          <div className="space-y-[5px] text-[7.8px]">
            {[
              ["Inlet pH", "6.9"],
              ["Outlet pH", "7.4"],
              ["Alkalinity out", "212 mg/L"],
              ["Flow", "1,640 m³/h"],
              ["Dose rate", "118 kg/h"],
              ["Sensors", "6 / 6 online"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between">
                <span style={{ color: SLATE }}>{k}</span>
                <b>{v}</b>
              </p>
            ))}
          </div>
        </Box>
      </div>
    </div>
  </Portal>
);

/* 02 · Dosing -------------------------------------------------------- */

const Dosing: Screen = () => (
  <Portal path="plants/pilot-a/dosing" active={2} title="Dosing · Pilot plant A" sub="Optimiser on · limits set by the plant · every change logged" right={<Btn solid>Edit limits</Btn>}>
    <div className="grid h-full grid-cols-[1fr_180px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Dose rate and outlet pH, last 24 h" right={<Legend items={[{ label: "Dose kg/h", color: TEAL }, { label: "pH ×15", color: "#c27c0e" }]} />}>
          <LineChart
            w={300}
            h={118}
            max={140}
            min={80}
            labels={["00", "04", "08", "12", "16", "20", "24"]}
            yFormat={(n) => String(Math.round(n))}
            series={[
              { values: [104, 102, 110, 122, 128, 124, 118, 112, 108, 116, 120, 118], color: TEAL, area: true },
              { values: [109, 110, 111, 112, 111, 111, 111, 110, 111, 112, 111, 111], color: "#c27c0e" },
            ]}
          />
        </Box>
        <Box title="Automatic adjustments" className="flex-1">
          <div className="space-y-[4px] text-[7.6px]">
            {[
              ["14:05", "Dose 112 → 118 kg/h", "Inlet alkalinity fell 8%"],
              ["11:40", "Dose 128 → 124 kg/h", "Outlet pH near upper limit"],
              ["08:15", "Dose 110 → 122 kg/h", "Morning flow peak"],
              ["02:30", "Dose 104 → 102 kg/h", "Night flow, low load"],
            ].map(([t, a, w]) => (
              <p key={t} className="grid grid-cols-[30px_92px_1fr] gap-[5px]">
                <b className="font-mono">{t}</b>
                <span>{a}</span>
                <span style={{ color: SLATE }}>{w}</span>
              </p>
            ))}
          </div>
        </Box>
      </div>
      <Box title="Limits">
        <div className="space-y-[8px] text-[7.8px]">
          {[
            ["Outlet pH", "7.0 – 7.8", 55],
            ["Dose rate", "60 – 160 kg/h", 58],
            ["Daily mineral", "≤ 3.4 t", 82],
          ].map(([k, v, f]) => (
            <div key={k as string}>
              <p className="flex justify-between">
                <span style={{ color: SLATE }}>{k}</span>
                <b>{v}</b>
              </p>
              <span className="mt-[3px] block h-[5px] rounded-full" style={{ background: WASH }}>
                <span className="block h-full rounded-full" style={{ width: `${f}%`, background: TEAL }} />
              </span>
            </div>
          ))}
          <p className="rounded-[5px] px-[6px] py-[4px] text-[7.2px] leading-[1.4]" style={{ background: "#ecfdf3", color: "#166534" }}>
            Treatment within the plant&apos;s normal ranges for 30 days.
          </p>
        </div>
      </Box>
    </div>
  </Portal>
);

/* 03 · Ledger and MRV ----------------------------------------------- */

const BATCHES: [string, string, string, string, "green" | "amber"][] = [
  ["B-1122", "22 Nov", "1.42 t", "6 / 6 sensors · lab sample", "green"],
  ["B-1121", "21 Nov", "1.38 t", "6 / 6 sensors · lab sample", "green"],
  ["B-1120", "20 Nov", "1.40 t", "6 / 6 sensors", "amber"],
  ["B-1119", "19 Nov", "1.29 t", "6 / 6 sensors · lab sample", "green"],
  ["B-1118", "18 Nov", "1.35 t", "5 / 6 sensors · gap filled", "amber"],
  ["B-1117", "17 Nov", "1.44 t", "6 / 6 sensors · lab sample", "green"],
];
const LC = "50px 44px 44px 1fr 62px";

const Ledger: Screen = () => (
  <Portal path="ledger" active={4} title="Carbon-removal ledger" sub="Pilot plant A · each batch is one day of treated water" right={<Btn solid>Export MRV report</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Kpis
        items={[
          ["Removed, verified", "36.9 t", "26 batches"],
          ["Pending", "2.8 t", "lab check due"],
          ["Method", "Δ DIC", "inlet vs outlet"],
          ["Raw readings kept", "100%", "unchanged"],
        ]}
      />
      <Box title="Batches" right="Every figure recomputable from the raw readings" className="flex-1">
        <div className="grid h-[18px] items-center gap-[6px] text-[6.8px] font-semibold uppercase tracking-[0.08em]" style={{ gridTemplateColumns: LC, color: SLATE }}>
          <span>Batch</span>
          <span>Date</span>
          <span>CO₂</span>
          <span>Evidence</span>
          <span>Status</span>
        </div>
        {BATCHES.map((b) => (
          <div key={b[0]} className="grid h-[25px] items-center gap-[6px] border-t text-[8px]" style={{ gridTemplateColumns: LC, borderColor: LINE }}>
            <b className="font-mono">{b[0]}</b>
            <span style={{ color: SLATE }}>{b[1]}</span>
            <b className="tabular-nums">{b[2]}</b>
            <span style={{ color: SLATE }}>{b[3]}</span>
            <span><Pill tone={b[4]} size={6.8}>{b[4] === "green" ? "Verified" : "Pending"}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 04 · Partner enquiries -------------------------------------------- */

const LEADS: [string, string, string, string, "violet" | "amber" | "green" | "grey"][] = [
  ["Municipal utility", "STP · 60 MLD", "Activated sludge", "Site visit 2 Dec", "violet"],
  ["Industrial park", "CETP · 12 MLD", "SBR", "Data requested", "amber"],
  ["Municipal utility", "STP · 25 MLD", "MBBR", "Pilot proposal sent", "green"],
  ["Real-estate developer", "On-site STP · 1.5 MLD", "MBR", "New", "grey"],
  ["Food processor", "ETP · 3 MLD", "Anaerobic + aerobic", "New", "grey"],
];
const EC = "1fr 82px 84px 84px";

const Enquiries: Screen = () => (
  <Portal path="enquiries" active={5} title="Partner enquiries" sub="From the website's partner form · flow, plant type and location asked up front" right={<Btn>Export</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Box title="Open enquiries" right="5 this month" className="flex-1">
        <div className="grid h-[18px] items-center gap-[6px] text-[6.8px] font-semibold uppercase tracking-[0.08em]" style={{ gridTemplateColumns: EC, color: SLATE }}>
          <span>Organisation</span>
          <span>Plant</span>
          <span>Process</span>
          <span>Next step</span>
        </div>
        {LEADS.map((l, i) => (
          <div key={i} className="grid h-[28px] items-center gap-[6px] border-t text-[8px]" style={{ gridTemplateColumns: EC, borderColor: LINE }}>
            <span className="font-semibold">{l[0]}</span>
            <span style={{ color: SLATE }}>{l[1]}</span>
            <span style={{ color: SLATE }}>{l[2]}</span>
            <span><Pill tone={l[4]} size={6.8}>{l[3]}</Pill></span>
          </div>
        ))}
      </Box>
      <Box title="Enquiry · Municipal utility, STP 60 MLD">
        <p className="text-[7.8px] leading-[1.45]">
          “Looking to cut chemical costs in secondary treatment and interested in carbon credits. Flow 60 MLD, activated sludge, aeration upgraded 2024.”
        </p>
        <p className="mt-[4px] text-[7px]" style={{ color: SLATE }}>Assigned to the co-founders · reply due in 1 business day</p>
      </Box>
    </div>
  </Portal>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...SANS, color: DEEP, background: "linear-gradient(150deg, #f7fbfb, #cfe7e7)" }}>
    <Laptop w={404} h={258}>
      <div className="flex h-full flex-col bg-white px-[14px] py-[10px]">
        <Photo {...LOGO} w={52} h={18} />
        <p className="mt-[22px] text-[22px] font-bold leading-[1.08]" style={SERIF}>
          Turning wastewater
          <br />
          into a carbon sink
        </p>
        <p className="mt-[8px] max-w-[250px] text-[7.4px] leading-[1.45]" style={{ color: SLATE }}>Natural minerals stabilise treatment chemistry while converting dissolved CO₂ into permanent, measurable carbon removal.</p>
        <span className="mt-[9px] inline-flex w-fit rounded-[5px] px-[9px] py-[4px] text-[7px] font-semibold text-white" style={{ background: TEAL }}>Partner with us</span>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg="#0b2e2e" dark>
      <div className="flex flex-1 flex-col px-[9px] pt-[10px] text-white">
        <p className="text-center text-[22px] font-semibold">06:40</p>
        <p className="text-center text-[7px] text-white/60">Tuesday 24 November</p>
        <div className="mt-[12px] rounded-[12px] bg-white/10 p-[7px]">
          <p className="flex items-center gap-[4px] text-[6.5px] font-semibold uppercase tracking-[0.05em] text-white/70">
            <TriangleAlert className="size-[8px] text-[#fbbf24]" aria-hidden="true" /> Alkamy plants
            <span className="ml-auto normal-case">now</span>
          </p>
          <p className="mt-[3px] text-[7.6px] font-semibold">Pilot plant A · outlet sensor drift</p>
          <p className="text-[7px] leading-[1.35] text-white/80">pH probe 2 reads 0.3 above probe 1. Dosing held at the last safe rate; calibration due.</p>
        </div>
      </div>
    </Phone>
  </div>
);

export const alkamyScreens: Screen[] = [Dashboard, Dosing, Ledger, Enquiries, LaptopPhone];
