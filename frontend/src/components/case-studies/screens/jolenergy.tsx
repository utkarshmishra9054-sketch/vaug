import { Barlow, Barlow_Condensed } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Battery, Check, ClipboardList, Cpu, FileText, FolderKanban, MessageCircle, Package, Truck, UserPlus } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * JOL Energy · client portal, quotes and onboarding, from jolenergy.in (read 23 Nov 2026): Barlow
 * and Barlow Condensed, navy #152633 / #0c1720, orange #ff8651, greys #63727c / #bdc8ce, light
 * #f3f5f5. The five recovery stages, the client access page ("Your projects. One place.") and the
 * quote-based metal pricing (no live price feed) are from the site.
 * TODO(content): illustrative. Clients, consignments, weights and people are invented; no prices shown.
 */

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const cond = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false });
const SANS: CSSProperties = { fontFamily: barlow.style.fontFamily };
const COND: CSSProperties = { fontFamily: cond.style.fontFamily };
const NAVY = "#152633";
const DARK = "#0c1720";
const OR = "#ff8651";
const GREY = "#63727c";
const LINE = "#dfe5e8";
const LIGHT = "#f3f5f5";
const LOGO = { src: "/logos/jolenergy.webp", img: { w: 662, h: 160 } };
const STAGES = ["Collect & sort", "Prepare & discharge", "Separate", "Recover & refine", "Check & return"];

const NAV: [string, typeof Package, number?][] = [
  ["Projects", FolderKanban, 6],
  ["Consignments", Truck, 4],
  ["Quotes", ClipboardList, 2],
  ["Documents", FileText],
  ["Onboarding", UserPlus],
  ["Messages", MessageCircle, 1],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`www.jolenergy.in/${path}`}>
      <div className="flex h-full" style={{ ...SANS, color: NAVY, background: LIGHT }}>
        <aside className="flex w-[114px] shrink-0 flex-col px-[8px] py-[10px] text-white" style={{ background: NAVY }}>
          <span className="rounded-[3px] bg-white px-[4px] py-[3px]">
            <Photo {...LOGO} w={82} h={20} />
          </span>
          <p className="mt-[6px] text-[7px] font-semibold uppercase tracking-[0.14em] text-white/60" style={COND}>JOL / client access</p>
          <nav className="mt-[10px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] px-[6px] text-[8.6px]" style={i === active ? { background: OR, color: DARK, fontWeight: 700 } : { color: "rgb(255 255 255 / 0.72)" }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto text-[7.4px] font-bold">{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto border-t border-white/15 pt-[6px] text-[7.4px]">
            <p className="font-semibold">Sample supplier (demo)</p>
            <p className="text-white/60">Supplier · since Jul 2026</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[42px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[15px] font-bold uppercase tracking-[0.01em]" style={COND}>{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: GREY }}>{sub}</p>
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
  <span className="inline-flex h-[22px] items-center gap-[4px] px-[9px] text-[7.8px] font-bold uppercase tracking-[0.04em]" style={solid ? { background: OR, color: DARK } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[9px] font-bold uppercase tracking-[0.04em]" style={{ ...COND, borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal normal-case tracking-normal" style={{ ...SANS, color: GREY }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);
function Stages({ at }: { at: number }) {
  return (
    <span className="flex items-center gap-[2px]">
      {STAGES.map((s, i) => (
        <span key={s} className="h-[6px] w-[16px]" style={{ background: i < at ? OR : i === at ? "#ffc4a8" : "#e3e8eb" }} title={s} />
      ))}
    </span>
  );
}

/* 01 · Projects and consignments ------------------------------------ */

const CONS: [string, typeof Battery, string, string, number, string, "amber" | "green" | "grey"][] = [
  ["JOL-C-2291", Battery, "Li-ion EV modules", "3.2 t", 3, "Recover & refine", "amber"],
  ["JOL-C-2288", Cpu, "E-waste · PCBs", "1.8 t", 2, "Separate", "amber"],
  ["JOL-C-2284", Battery, "Laptop packs", "0.9 t", 5, "Certificate issued", "green"],
  ["JOL-C-2280", Battery, "Power-bank cells", "0.6 t", 5, "Certificate issued", "green"],
  ["JOL-C-2276", Cpu, "E-waste · mixed", "2.4 t", 1, "Prepare & discharge", "amber"],
  ["JOL-C-2295", Battery, "Li-ion EV modules", "4.0 t", 0, "Pickup 26 Nov", "grey"],
];
const CC = "70px 1fr 38px 86px 92px";

const Projects: Screen = () => (
  <Portal path="dashboard.html" active={1} title="Your projects. One place." sub="Sample supplier (demo) · 6 consignments this quarter" right={<Btn solid>Book a pickup</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Received, quarter", "18.4 t", "6 consignments"],
          ["In process", "4", "across 4 stages"],
          ["Certificates", "12", "2 this month"],
          ["Next pickup", "26 Nov", "Hosur, 4.0 t"],
        ].map(([k, v, s], i) => (
          <div key={k} className="px-[9px] py-[7px]" style={i === 0 ? { background: NAVY, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.5px] uppercase tracking-[0.06em]" style={{ opacity: 0.7 }}>{k}</p>
            <p className="mt-[2px] text-[19px] font-bold leading-none" style={COND}>{v}</p>
            <p className="mt-[3px] text-[7px]" style={{ opacity: 0.7 }}>{s}</p>
          </div>
        ))}
      </div>
      <Box title="Consignments" right="Five stages: collect, prepare, separate, recover, check" className="flex-1">
        {CONS.map(([id, I, m, w, at, st, t], i) => (
          <div key={id} className="grid h-[27px] items-center gap-[6px] border-b text-[8.2px] last:border-b-0" style={{ gridTemplateColumns: CC, borderColor: LINE, background: i === 0 ? "#fff6f1" : undefined }}>
            <b className="font-mono text-[7.6px]">{id}</b>
            <span className="flex min-w-0 items-center gap-[4px]">
              <I className="size-[10px] shrink-0" style={{ color: OR }} aria-hidden="true" />
              <span className="truncate">{m}</span>
            </span>
            <b className="tabular-nums">{w}</b>
            <Stages at={at} />
            <span><Pill tone={t} size={6.8}>{st}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 02 · Consignment detail ------------------------------------------- */

const Detail: Screen = () => (
  <Portal path="dashboard.html#JOL-C-2291" active={1} title="Consignment JOL-C-2291" sub="Li-ion EV modules · 3.2 t received 12 Nov · stage 4 of 5" right={<Btn>Download documents</Btn>}>
    <div className="grid h-full grid-cols-[1fr_168px] gap-[8px]">
      <Box title="Recovery pathway">
        <div className="space-y-[6px]">
          {[
            ["Collect & sort", "12 Nov", "3.20 t received · weighbridge slip WB-8812", true],
            ["Prepare & discharge", "14 Nov", "Discharged to safe voltage · 3.18 t", true],
            ["Separate mechanically", "17 Nov", "Black mass 1.46 t · metals 0.92 t · plastics 0.41 t", true],
            ["Recover & refine", "In progress", "Hydrometallurgy batch HM-117 started 21 Nov", false],
            ["Check & return", "Due ~1 Dec", "Assay, then recovery certificate", false],
          ].map(([s, d, n, done], i) => (
            <div key={s as string} className="flex gap-[7px]">
              <span className="flex size-[16px] shrink-0 items-center justify-center text-[7px] font-bold" style={done ? { background: OR, color: DARK } : i === 3 ? { boxShadow: `inset 0 0 0 1.5px ${OR}`, color: OR } : { boxShadow: `inset 0 0 0 1px ${LINE}`, color: GREY }}>
                {done ? <Check className="size-[9px]" aria-hidden="true" /> : i + 1}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[8.6px] font-bold uppercase" style={COND}>{s as string} <span className="font-normal normal-case" style={{ ...SANS, color: GREY }}>· {d as string}</span></span>
                <span className="block text-[7.6px]" style={{ color: GREY }}>{n as string}</span>
              </span>
            </div>
          ))}
        </div>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Mass balance">
          <div className="space-y-[4px] text-[7.8px]">
            {[
              ["In", "3.20 t", 100],
              ["Black mass", "1.46 t", 46],
              ["Metals (Cu, Al, steel)", "0.92 t", 29],
              ["Plastics", "0.41 t", 13],
              ["Electrolyte & losses", "0.41 t", 13],
            ].map(([k, v, f]) => (
              <div key={k as string}>
                <p className="flex justify-between"><span style={{ color: GREY }}>{k}</span><b>{v}</b></p>
                <span className="block h-[4px] bg-[#e3e8eb]"><span className="block h-full" style={{ width: `${f}%`, background: NAVY }} /></span>
              </div>
            ))}
          </div>
        </Box>
        <Box title="Documents" className="flex-1">
          <div className="space-y-[4px] text-[7.6px]">
            {["Weighbridge slip WB-8812", "Transport manifest", "Discharge log", "Recovery certificate (pending)"].map((d, i) => (
              <p key={d} className="flex items-center gap-[4px]" style={{ color: i === 3 ? GREY : NAVY }}>
                <FileText className="size-[9px]" style={{ color: OR }} aria-hidden="true" /> {d}
              </p>
            ))}
          </div>
        </Box>
      </div>
    </div>
  </Portal>
);

/* 03 · Quote request -------------------------------------------------- */

const Quotes: Screen = () => (
  <Portal path="metal-prices.html#request" active={2} title="Request current pricing" sub="Prices depend on material, grade, quantity and delivery · no live market feed" right={<Btn solid>Send request</Btn>}>
    <div className="grid h-full grid-cols-[1fr_180px] gap-[8px]">
      <Box title="Your requirement">
        <div className="grid grid-cols-2 gap-[7px] text-[7.8px]">
          {[
            ["Material", "Cobalt sulphate"],
            ["Grade", "Battery grade, ≥ 20.5% Co"],
            ["Form", "Crystals, 25 kg bags"],
            ["Quantity", "2 t / month, 6 months"],
            ["Delivery", "Chennai, DAP"],
            ["Start", "January 2027"],
          ].map(([k, v]) => (
            <div key={k} className="px-[6px] py-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <p className="text-[6.8px] uppercase tracking-[0.06em]" style={{ color: GREY }}>{k}</p>
              <p className="font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-[8px] text-[7.4px] leading-[1.45]" style={{ color: GREY }}>Add your specification sheet and the team replies with a current quotation, usually within one business day.</p>
      </Box>
      <Box title="Materials">
        <div className="space-y-[5px] text-[7.8px]">
          {[
            ["Li", "Lithium", "3"],
            ["Co", "Cobalt", "27"],
            ["Ni", "Nickel", "28"],
          ].map(([sym, n, z], i) => (
            <div key={sym} className="flex items-center gap-[6px] px-[5px] py-[4px]" style={i === 1 ? { background: "#fff1e8", boxShadow: `inset 0 0 0 1px ${OR}` } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <span className="flex size-[22px] flex-col items-center justify-center text-white" style={{ background: NAVY }}>
                <span className="text-[5.5px] leading-none">{z}</span>
                <b className="text-[9px] leading-none" style={COND}>{sym}</b>
              </span>
              <span className="font-semibold">{n}</span>
            </div>
          ))}
          <p className="pt-[4px] text-[7px]" style={{ color: GREY }}>Open requests: 2 · answered: 9</p>
        </div>
      </Box>
    </div>
  </Portal>
);

/* 04 · Supplier onboarding ------------------------------------------ */

const Onboarding: Screen = () => (
  <Portal path="onboarding.html" active={4} title="Become a supplier" sub="Step 3 of 4 · about 5 minutes · saved as you go" right={<Btn solid>Continue</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[4px] text-[7.4px] font-bold uppercase" style={COND}>
        {["Company", "Material", "Pickup", "Documents"].map((s, i) => (
          <span key={s} className="px-[6px] py-[4px]" style={i < 2 ? { background: NAVY, color: "#fff" } : i === 2 ? { background: OR, color: DARK } : { background: "#fff", color: GREY, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            {i + 1} · {s}
          </span>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-[8px]">
        <Box title="Pickup location">
          <div className="space-y-[6px] text-[7.8px]">
            {[
              ["Site", "Hosur plant, Tamil Nadu"],
              ["Typical load", "3–5 t per pickup"],
              ["Frequency", "Monthly"],
              ["Packaging", "Discharged packs in UN-rated drums"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[6.8px] uppercase tracking-[0.06em]" style={{ color: GREY }}>{k}</p>
                <p className="h-[20px] px-[6px] py-[4px] font-medium" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>{v}</p>
              </div>
            ))}
          </div>
        </Box>
        <Box title="What happens next">
          <div className="space-y-[6px] text-[7.6px] leading-[1.4]">
            {["We confirm the material and arrange a first pickup.", "Your consignment appears in the client portal the day it arrives.", "You follow it through five stages and download the certificate."].map((t, i) => (
              <p key={t} className="flex gap-[5px]">
                <b className="text-[10px] leading-none" style={{ ...COND, color: OR }}>0{i + 1}</b>
                {t}
              </p>
            ))}
            <p className="mt-[4px] flex items-center gap-[4px] text-[7.2px]" style={{ color: GREY }}>
              <MessageCircle className="size-[9px]" aria-hidden="true" /> Questions? Chat on WhatsApp, Mon–Fri 9–6
            </p>
          </div>
        </Box>
      </div>
    </div>
  </Portal>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...SANS, background: `radial-gradient(circle at 30% 30%, #233a4c, ${DARK} 70%)` }}>
    <Laptop w={404} h={258} bg={DARK}>
      <div className="flex h-full flex-col">
        <div className="flex h-[24px] items-center bg-white px-[8px]">
          <Photo {...LOGO} w={62} h={15} />
          <span className="ml-auto bg-[#ff8651] px-[6px] py-[2px] text-[6.5px] font-bold uppercase" style={{ color: DARK }}>Let&apos;s talk ↗</span>
        </div>
        <div className="flex-1 px-[14px] pt-[22px] text-white">
          <p className="text-[6.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: OR }}>— Resources, recovered.</p>
          <p className="mt-[6px] text-[30px] font-bold uppercase leading-[0.95]" style={COND}>End of life.</p>
          <p className="text-[30px] font-bold uppercase leading-[0.95]" style={COND}>
            Start of <span style={{ color: OR }}>value.</span>
          </p>
          <p className="mt-[8px] max-w-[220px] text-[7.2px] leading-[1.45] text-white/75">Recovering valuable resources from batteries and e-waste for a more circular economy.</p>
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg={LIGHT}>
      <div className="flex flex-1 flex-col px-[9px] pt-[4px]" style={{ color: NAVY }}>
        <p className="text-[12px] font-bold uppercase leading-tight" style={COND}>JOL-C-2291</p>
        <p className="text-[6.8px]" style={{ color: GREY }}>Li-ion EV modules · 3.2 t</p>
        <div className="mt-[7px] space-y-[4px]">
          {STAGES.map((s, i) => (
            <p key={s} className="flex items-center gap-[5px] text-[7.4px]">
              <span className="flex size-[12px] items-center justify-center text-[6px] font-bold" style={i < 3 ? { background: OR, color: DARK } : i === 3 ? { boxShadow: `inset 0 0 0 1.5px ${OR}` } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                {i < 3 ? "✓" : i + 1}
              </span>
              {s}
            </p>
          ))}
        </div>
        <div className="mt-[8px] p-[6px] text-[7px] leading-[1.35]" style={{ background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
          <b>Update · 21 Nov</b>
          <br />
          Hydrometallurgy batch HM-117 started. Certificate expected around 1 Dec.
        </div>
      </div>
    </Phone>
  </div>
);

export const jolScreens: Screen[] = [Projects, Detail, Quotes, Onboarding, LaptopPhone];
