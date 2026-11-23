import { Inter } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { FileText, Inbox, LayoutGrid, MapPin, MessageCircle, Package, Phone as PhoneIcon, Ruler, Settings } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * EarthSprint Solutions · enquiry-to-pilot portal, from earthsprintsolutions.com (read 23 Nov 2026):
 * Inter, charcoal #1c1c1c / #2b2b2b, gold #e0b24c, deep gold #8a6514, light #f2f2f0. Products
 * (KisanKrete coatings, rice husk silica, KisanKrete Binder, battery anodes), the sample-panel colours
 * and the two request routes (sample panel, call back by phone or WhatsApp) are from the site.
 * TODO(content): illustrative. Companies (anonymised), sites, areas and dates are invented.
 */

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: inter.style.fontFamily };
const INK = "#1c1c1c";
const GOLD = "#e0b24c";
const DEEP = "#8a6514";
const GREY = "#6b6b66";
const LINE = "#e6e4df";
const LIGHT = "#f2f2f0";
const PANELS = { Sand: "#e8e4dc", Terracotta: "#e8875f", Charcoal: "#6e6d6a", Ochre: "#d9b551" } as const;
const LOGO = { src: "/logos/earthsprint.webp", img: { w: 382, h: 113 } };

const NAV: [string, typeof Inbox, number?][] = [
  ["Enquiries", Inbox, 14],
  ["Sample panels", Package, 6],
  ["Call backs", PhoneIcon, 3],
  ["Pilot floors", LayoutGrid, 3],
  ["Data sheets", FileText],
  ["Settings", Settings],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`portal.earthsprintsolutions.com/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK, background: LIGHT }}>
        <aside className="flex w-[114px] shrink-0 flex-col border-r bg-white px-[8px] py-[10px]" style={{ borderColor: LINE }}>
          <Photo {...LOGO} w={66} h={20} />
          <nav className="mt-[12px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-[4px] px-[6px] text-[8.4px]" style={i === active ? { background: INK, color: "#fff", fontWeight: 600 } : { color: GREY }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto rounded-[3px] px-[4px] text-[7px] font-bold" style={{ background: i === active ? GOLD : LIGHT, color: INK }}>{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto rounded-[4px] p-[6px]" style={{ background: LIGHT }}>
            <p className="text-[7.8px] font-semibold">Sales and pilots</p>
            <p className="text-[6.8px]" style={{ color: GREY }}>Nashik · 2 people</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12.5px] font-extrabold tracking-[-0.02em]">{title}</p>
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
  <span className="inline-flex h-[21px] items-center gap-[4px] rounded-[3px] px-[8px] text-[7.8px] font-semibold" style={solid ? { background: GOLD, color: INK } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[4px] bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-bold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal" style={{ color: GREY }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);
const Kpis = ({ items }: { items: [string, string, string][] }) => (
  <div className="grid grid-cols-4 gap-[8px]">
    {items.map(([k, v, s], i) => (
      <div key={k} className="rounded-[4px] px-[9px] py-[7px]" style={i === 0 ? { background: INK, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
        <p className="text-[7.5px]" style={{ opacity: 0.7 }}>{k}</p>
        <p className="mt-[3px] text-[16px] font-extrabold leading-none" style={i === 0 ? { color: GOLD } : undefined}>{v}</p>
        <p className="mt-[4px] text-[7px]" style={{ opacity: 0.65 }}>{s}</p>
      </div>
    ))}
  </div>
);
const Kind = ({ k }: { k: "Sample panel" | "Call back" | "Data sheet" }) => {
  const I = k === "Sample panel" ? Package : k === "Call back" ? PhoneIcon : FileText;
  return (
    <span className="inline-flex items-center gap-[3px] text-[7.6px]" style={{ color: DEEP }}>
      <I className="size-[9px]" aria-hidden="true" /> {k}
    </span>
  );
};

/* 01 · Enquiries ----------------------------------------------------- */

const ENQ: [string, string, "Sample panel" | "Call back" | "Data sheet", string, string, "amber" | "green" | "grey" | "violet"][] = [
  ["Pharma plant, Aurangabad", "KisanKrete Coatings", "Sample panel", "Terracotta", "Dispatched", "amber"],
  ["Food processing unit, Pune", "KisanKrete Coatings", "Call back", "WhatsApp", "Called · pilot likely", "violet"],
  ["Coatings formulator, Vapi", "Rice husk silica", "Data sheet", "—", "Sent", "green"],
  ["Auto-parts plant, Chakan", "KisanKrete Coatings", "Sample panel", "Charcoal", "Delivered", "green"],
  ["Warehouse developer, Bhiwandi", "KisanKrete Coatings", "Call back", "Phone", "New", "grey"],
  ["Ready-mix producer, Nashik", "KisanKrete Binder", "Call back", "Phone", "New", "grey"],
  ["Anode materials lab", "Silica for anodes", "Data sheet", "—", "Sent", "green"],
];
const EC = "1fr 92px 70px 52px 86px";

const Enquiries: Screen = () => (
  <Portal path="enquiries" active={0} title="Enquiries" sub="From the website · sample panels, call backs and data sheets" right={<Btn>This month</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Kpis
        items={[
          ["Open enquiries", "14", "9 coatings · 5 silica"],
          ["Sample panels out", "6", "2 delivered this week"],
          ["Call backs due", "3", "1 on WhatsApp"],
          ["Pilot floors", "3", "1 planned for Dec"],
        ]}
      />
      <Box title="Latest" right="Companies anonymised in this demo" className="flex-1">
        {ENQ.map((e, i) => (
          <div key={i} className="grid h-[25px] items-center gap-[6px] border-b text-[8px] last:border-b-0" style={{ gridTemplateColumns: EC, borderColor: LINE }}>
            <span className="truncate font-semibold">{e[0]}</span>
            <span className="truncate" style={{ color: GREY }}>{e[1]}</span>
            <Kind k={e[2]} />
            <span className="text-[7.4px]" style={{ color: GREY }}>{e[3]}</span>
            <span><Pill tone={e[5]} size={6.8}>{e[4]}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 02 · Sample panels ------------------------------------------------- */

const SAMPLES: [string, keyof typeof PANELS, string, string, "amber" | "green" | "grey"][] = [
  ["Pharma plant, Aurangabad", "Terracotta", "Aurangabad, MH", "In transit · ETA 25 Nov", "amber"],
  ["Auto-parts plant, Chakan", "Charcoal", "Chakan, MH", "Delivered 21 Nov", "green"],
  ["Chemical plant, Ankleshwar", "Sand", "Ankleshwar, GJ", "Packed", "grey"],
  ["Dairy, Kolhapur", "Ochre", "Kolhapur, MH", "Delivered 19 Nov", "green"],
  ["Textile unit, Bhilwara", "Sand", "Bhilwara, RJ", "In transit · ETA 26 Nov", "amber"],
  ["Cold store, Nashik", "Charcoal", "Nashik, MH", "Delivered 18 Nov", "green"],
];

const Samples: Screen = () => (
  <Portal path="samples" active={1} title="Sample panels" sub="KisanKrete sample panels · four colours · tracked to delivery" right={<Btn solid>New dispatch</Btn>}>
    <div className="grid h-full grid-cols-[1fr_150px] gap-[8px]">
      <Box title="Dispatches">
        {SAMPLES.map(([c, col, addr, st, t]) => (
          <div key={c} className="flex h-[38px] items-center gap-[8px] border-b text-[8px] last:border-b-0" style={{ borderColor: LINE }}>
            <span className="size-[24px] shrink-0 rounded-[3px]" style={{ background: PANELS[col], boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.08)" }} />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate font-semibold">{c}</span>
              <span className="flex items-center gap-[3px] text-[7.2px]" style={{ color: GREY }}>
                <MapPin className="size-[8px]" aria-hidden="true" /> {addr} · {col}
              </span>
            </span>
            <Pill tone={t} size={6.8}>{st}</Pill>
          </div>
        ))}
      </Box>
      <Box title="Colours">
        <div className="grid grid-cols-2 gap-[5px]">
          {(Object.keys(PANELS) as (keyof typeof PANELS)[]).map((k) => (
            <div key={k} className="text-center text-[7.2px]">
              <span className="block h-[40px] rounded-[3px]" style={{ background: PANELS[k], boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.08)" }} />
              <span className="mt-[2px] block">{k}</span>
            </div>
          ))}
        </div>
        <p className="mt-[8px] text-[7.2px] leading-[1.4]" style={{ color: GREY }}>Each panel goes with a one-page note on heat, chemical and moisture resistance.</p>
      </Box>
    </div>
  </Portal>
);

/* 03 · Pilot floors -------------------------------------------------- */

const Pilots: Screen = () => (
  <Portal path="pilots" active={3} title="Pilot floors" sub="Areas where epoxy keeps failing, coated with KisanKrete" right={<Btn solid>Plan a pilot</Btn>}>
    <div className="grid h-full grid-cols-3 gap-[8px]">
      {[
        ["Auto-parts plant, Chakan", "Press shop aisle", "120 m²", "Hot oil and heavy trolleys", "Day-28 pull-off test 14 Dec", "violet"],
        ["Dairy, Kolhapur", "Wash-down area", "60 m²", "Hot water and cleaning chemicals", "Coated 9 Nov · monthly check", "green"],
        ["Food processing unit, Pune", "Fryer line", "45 m²", "Heat and slab moisture", "Site visit 2 Dec", "amber"],
      ].map(([site, area, size, problem, next, t]) => (
        <Box key={site} title={site}>
          <div className="mb-[7px] h-[62px] rounded-[3px]" style={{ background: "repeating-linear-gradient(45deg,#d8d4cb 0 6px,#cfcac0 6px 12px)" }} />
          <div className="space-y-[4px] text-[7.8px]">
            {[
              ["Area", area],
              ["Size", size],
              ["Problem", problem],
            ].map(([k, v]) => (
              <p key={k}>
                <span className="block text-[6.8px] uppercase tracking-[0.06em]" style={{ color: GREY }}>{k}</span>
                <b>{v}</b>
              </p>
            ))}
          </div>
          <p className="mt-[6px] flex items-center gap-[3px] text-[7.2px]" style={{ color: GREY }}>
            <Ruler className="size-[8px]" aria-hidden="true" /> Next
          </p>
          <Pill tone={t as "violet"} size={6.8}>{next}</Pill>
        </Box>
      ))}
    </div>
  </Portal>
);

/* 04 · Data sheets --------------------------------------------------- */

const DataSheets: Screen = () => (
  <Portal path="data-sheets" active={4} title="Silica data sheets" sub="Rice husk silica · up to 99% SiO₂ · ultra-low alkali" right={<Btn>Upload new version</Btn>}>
    <div className="grid h-full grid-cols-[1fr_170px] gap-[8px]">
      <Box title="Requests">
        {[
          ["Coatings formulator, Vapi", "Coatings filler", "Sent 20 Nov", "Asked for a 5 kg trial"],
          ["Anode materials lab", "Battery anode feedstock", "Sent 18 Nov", "NDA signed"],
          ["Tyre compounder, Chennai", "Reinforcing filler", "Sent 15 Nov", "—"],
          ["Paints manufacturer, Mumbai", "Matting agent", "Sent 12 Nov", "Follow-up due"],
          ["Research institute", "Characterisation study", "Sent 10 Nov", "—"],
        ].map(([c, use, s, n]) => (
          <div key={c} className="grid h-[32px] grid-cols-[1.3fr_1fr_50px_72px] items-center gap-[6px] border-b text-[8px] last:border-b-0" style={{ borderColor: LINE }}>
            <span className="font-semibold leading-tight">{c}</span>
            <span style={{ color: GREY }}>{use}</span>
            <span className="text-[7.4px]" style={{ color: GREY }}>{s}</span>
            <span className="text-[7.4px]" style={{ color: DEEP }}>{n}</span>
          </div>
        ))}
      </Box>
      <Box title="Current data sheet">
        <div className="flex h-[96px] flex-col justify-between rounded-[3px] p-[7px] text-white" style={{ background: INK }}>
          <span className="text-[7px] font-bold tracking-[0.08em] text-white/80">EARTHSPRINT</span>
          <span>
            <span className="block text-[6.6px] uppercase tracking-[0.1em]" style={{ color: GOLD }}>Technical data sheet</span>
            <span className="block text-[10px] font-extrabold">Rice husk silica</span>
            <span className="block text-[6.8px] text-white/70">Version 3 · Nov 2026</span>
          </span>
        </div>
        <p className="mt-[7px] text-[7.4px] leading-[1.4]" style={{ color: GREY }}>Sent only on request, so every copy is tied to a buyer and a use.</p>
      </Box>
    </div>
  </Portal>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: "linear-gradient(150deg, #f2f2f0, #e7d6ad)" }}>
    <Laptop w={404} h={258} bg="#2b2b2b">
      <div className="flex h-full flex-col">
        <div className="flex h-[24px] items-center bg-white px-[8px]">
          <Photo {...LOGO} w={48} h={14} />
          <span className="ml-auto rounded-[2px] px-[6px] py-[2px] text-[6.5px] font-bold text-white" style={{ background: INK }}>Contact us</span>
        </div>
        <div className="flex-1 px-[14px] pt-[18px] text-white">
          <p className="text-[6.4px] font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD }}>— Industrial materials from raw rice husk</p>
          <p className="mt-[6px] text-[22px] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Floor coatings made with our own <span style={{ color: GOLD }}>rice husk silica.</span>
          </p>
          <div className="mt-[10px] flex gap-[6px] text-[6.8px] font-semibold">
            <span className="rounded-[2px] px-[7px] py-[3px]" style={{ background: GOLD, color: INK }}>Request a sample panel</span>
            <span className="rounded-[2px] px-[7px] py-[3px]" style={{ boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.5)" }}>Request a call back</span>
          </div>
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg="#e5ddd5">
      <div className="flex shrink-0 items-center gap-[5px] px-[8px] py-[5px] text-white" style={{ background: "#075e54" }}>
        <span className="flex size-[16px] items-center justify-center rounded-full bg-white text-[8px] font-extrabold" style={{ color: INK }}>
          E
        </span>
        <span className="text-[8px] font-semibold">EarthSprint</span>
      </div>
      <div className="flex flex-1 flex-col gap-[5px] px-[7px] pt-[7px] text-[7.2px] leading-[1.35]">
        <p className="max-w-[86%] self-end rounded-[6px] bg-[#dcf8c6] px-[6px] py-[4px]">Hi, I asked for a call back about our fryer-line floor. Epoxy keeps lifting.</p>
        <p className="max-w-[86%] rounded-[6px] bg-white px-[6px] py-[4px]">Thanks! Heat and slab moisture are exactly where KisanKrete helps. Can we visit on 2 Dec to look at a 40–50 m² pilot area?</p>
        <p className="max-w-[60%] self-end rounded-[6px] bg-[#dcf8c6] px-[6px] py-[4px]">2 Dec works.</p>
        <span className="mt-auto mb-[14px] flex items-center gap-[4px] self-center text-[6.6px]" style={{ color: GREY }}>
          <MessageCircle className="size-[8px]" aria-hidden="true" /> Logged to the enquiry record
        </span>
      </div>
    </Phone>
  </div>
);

export const earthsprintScreens: Screen[] = [Enquiries, Samples, Pilots, DataSheets, LaptopPhone];
