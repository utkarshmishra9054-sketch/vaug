import { Check, Monitor, Phone, Smartphone, Upload } from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  CampaignManagerFrame,
  CheckBox,
  Field,
  FONT,
  G,
  GAdsChartCard,
  GAdsDot,
  GAdsTable,
  GLink,
  GoogleAdsShell,
  GoogleSerp,
  HubSpotBoard,
  LinkedInPost,
  LiStatus,
  LogoAvatar,
  noisy,
  Photo,
  SerpAd,
  SerpLabel,
  SerpResult,
  type Col,
  type HubStage,
} from "./tools";

/* Pennar Industries · B2B lead generation (Google Ads + LinkedIn + RFQ landing pages).
   TODO(content): every figure below is illustrative; no confirmed result exists for this engagement.
   Apr–Dec 2024: 2,260 enquiries (Google 1,612 at ₹546.16, LinkedIn 648),
   860 qualified RFQs, ~₹12.47 lakh total spend = ~₹1,450 per qualified lead. */

const PENNAR = "#2a37a6";
const LOGO = { src: "/logos/pennar-industries.webp", img: { w: 432, h: 120 } };
const SITE = { src: "/sites/pennar-industries.webp", img: { w: 1440, h: 900 } };

/** Pennar's real logo mark (the blue sail), cut from the logo file. */
function Mark({ size }: { size: number }) {
  return <Photo {...LOGO} crop={{ x: 8, y: -4, w: 132, h: 132 }} w={size} h={size} />;
}

/* 01 · Google Ads campaigns by product line ------------------------ */

const GCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 86 },
  { label: "Budget", w: 60 },
  { label: "Status", w: 50 },
  { label: "Clicks", w: 34, align: "right" },
  { label: "Impr.", w: 44, align: "right" },
  { label: "CTR", w: 40, align: "right" },
  { label: "Cost", w: 58, align: "right" },
  { label: "Conversions", w: 50, align: "right" },
  { label: "Cost / conv.", w: 50, align: "right" },
];

const G_ROWS: [string, string, string, "enabled" | "paused", string, string, string, string, string, string][] = [
  ["PI_Search_PEB_Pre-Engineered-Buildings", "₹1,200.00/day", "Eligible", "enabled", "6,904", "142,806", "4.83%", "₹312,616.08", "588.00", "₹531.66"],
  ["PI_Search_Precision-Tubes_CDW-ERW", "₹900.00/day", "Limited by budget", "enabled", "4,211", "98,417", "4.28%", "₹231,093.72", "402.00", "₹574.86"],
  ["PI_Search_Solar-Mounting-Structures", "₹700.00/day", "Eligible", "enabled", "3,602", "121,390", "2.97%", "₹168,770.28", "331.00", "₹509.88"],
  ["PI_Search_CRSS-Steel-Strips", "₹400.00/day", "Eligible", "enabled", "1,388", "44,512", "3.12%", "₹74,318.54", "142.00", "₹523.37"],
  ["PI_Brand_Pennar", "₹300.00/day", "Eligible", "enabled", "3,015", "18,774", "16.06%", "₹52,409.50", "110.00", "₹476.45"],
  ["PI_Search_Hydraulic-Cylinders", "₹350.00/day", "Paused", "paused", "612", "21,906", "2.79%", "₹41,199.99", "39.00", "₹1,056.41"],
];

const W_CONV = noisy({ n: 39, from: 27, to: 54, seed: 31, noise: 0.22, bumps: { 12: 0.62, 30: 0.7, 31: 1.25 } });
const W_CPA = noisy({ n: 39, from: 790, to: 455, seed: 32, noise: 0.14, ease: 0.3, bumps: { 12: 1.45, 30: 1.3 } });

export const ProductCampaigns: Screen = () => (
  <GoogleAdsShell account="Pennar Industries – B2B Leads" customerId="739-204-6618" title="Campaigns" dateRange="1 Apr – 31 Dec 2024" url="ads.google.com/aw/campaigns?ocid=739204661">
    <GAdsChartCard
      h={48}
      metrics={[
        { label: "Conversions", value: "1.61K", on: true },
        { label: "Cost / conv.", value: "₹546.16", on: true },
        { label: "Clicks", value: "19.7K" },
        { label: "Cost", value: "₹880K" },
      ]}
      series={[W_CONV, W_CPA]}
      xLabels={["1 Apr 2024", "31 Dec 2024"]}
      left={{ max: 80, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 1200, ticks: 2, format: (n) => `₹${n.toLocaleString("en-US")}` }}
    />
    <GAdsTable
      cols={GCOLS}
      rowH={20}
      rows={G_ROWS.map(([name, budget, status, state, ...m]) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={state} />,
        <GLink key="n">{name}</GLink>,
        budget,
        <span key="s" style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1, color: state === "paused" ? G.grey : G.text }}>
          {status}
        </span>,
        ...m,
      ])}
      total={["", "", "Total: all campaigns", "", "", "19,732", "447,805", "4.41%", "₹880,408.11", "1,612.00", "₹546.16"]}
    />
  </GoogleAdsShell>
);

/* 02 · Google search with Pennar's sponsored result ---------------- */

function Fav({ bg, t, color = "#fff" }: { bg: string; t: string; color?: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 7, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

export const SearchResult: Screen = () => (
  <GoogleSerp query="pre engineered building manufacturers in india">
    <SerpLabel />
    <SerpAd
      ad={{
        site: "Pennar Industries",
        url: "https://www.pennarindia.com › pre-engineered-buildings",
        favicon: <Mark size={13} />,
        title: "Pre-Engineered Building Manufacturer | Pennar Industries Ltd",
        desc: "Factories, warehouses and industrial sheds designed to IS 800 and MBMA. Share your drawings and get a detailed quotation from our PEB team.",
        sitelinks: ["Request a Quote", "Project References", "Solar Structures", "Precision Tubes"],
      }}
    />
    <SerpResult
      r={{
        site: "IndiaMART",
        url: "https://dir.indiamart.com › impcat › pre-engineered-buildings",
        favicon: <Fav bg="#2e3192" t="IM" />,
        title: "Pre Engineered Buildings - PEB Structure Latest Price",
        desc: "Find here Pre Engineered Buildings, PEB Structure manufacturers, suppliers & exporters in India. Get contact details & address of companies...",
      }}
    />
    <SerpResult
      r={{
        site: "Pennar Industries Limited",
        url: "https://www.pennarindia.com › divisions",
        favicon: <Mark size={13} />,
        title: "Divisions - Pennar Industries Limited",
        desc: "Steel products, tubes, pre-engineered buildings, solar mounting structures and hydraulics for industrial and infrastructure customers.",
      }}
    />
    <SerpResult
      r={{
        site: "Wikipedia",
        url: "https://en.wikipedia.org › wiki › Pre-engineered_building",
        favicon: <Fav bg="#fff" color="#000" t="W" />,
        title: "Pre-engineered building - Wikipedia",
        desc: "A pre-engineered building (PEB) is designed by a PEB supplier or manufacturer, fabricated using best-suited inventory raw materials...",
      }}
    />
  </GoogleSerp>
);

/* 03 · Pre-engineered buildings landing page with RFQ form --------- */

export const RfqLanding: Screen = () => (
  <BrowserChrome url="pennarindia.com/pre-engineered-buildings/?utm_source=google&utm_campaign=peb">
    <div className="h-full" style={{ fontFamily: FONT.web, color: "#1f2937", background: "#fff" }}>
      <header className="flex items-center" style={{ height: 40, padding: "0 20px", borderBottom: "1px solid #e5e7eb", gap: 18 }}>
        <Photo {...LOGO} w={86} h={24} />
        <nav className="flex items-center" style={{ gap: 13, fontSize: 7.5, color: "#374151", marginLeft: 8 }}>
          {["Home", "Profile", "Divisions", "Industries", "Investors", "News", "Careers"].map((t) => (
            <span key={t} style={{ color: t === "Divisions" ? PENNAR : undefined, fontWeight: t === "Divisions" ? 600 : 400 }}>
              {t}
            </span>
          ))}
        </nav>
        <span className="ml-auto" style={{ fontSize: 7.5, fontWeight: 600, padding: "5px 10px", background: PENNAR, color: "#fff", borderRadius: 2 }}>Contact Us</span>
      </header>
      <section className="flex" style={{ background: "#f3f5fb", padding: "14px 20px 16px", gap: 18, height: 262 }}>
        <div className="min-w-0 flex-1">
          <p style={{ fontSize: 7, color: "#6b7280" }}>Home › Divisions › Pre-Engineered Buildings</p>
          <h1 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.15, marginTop: 6, color: "#111827", letterSpacing: -0.2 }}>Pre-Engineered Buildings for factories, warehouses and industrial sheds</h1>
          <p style={{ fontSize: 8, lineHeight: 1.55, marginTop: 6, color: "#4b5563" }}>Design, manufacture, supply and erection of complete steel building systems, from primary framing to roof and wall cladding.</p>
          <div className="flex" style={{ gap: 10, marginTop: 10 }}>
            <div className="shrink-0 overflow-hidden" style={{ width: 92, height: 118 }}>
              <Photo {...SITE} crop={{ x: 1222, y: 110, w: 218, h: 280 }} w={92} h={118} />
            </div>
            <table style={{ fontSize: 7.5, borderCollapse: "collapse", flex: 1, alignSelf: "flex-start", background: "#fff" }}>
              <tbody>
                {[
                  ["Building types", "Factories, warehouses, cold stores, sheds"],
                  ["Design codes", "IS 800, MBMA, AISC"],
                  ["Scope", "Design, supply, erection"],
                  ["Roof & wall", "Single skin, insulated panels"],
                  ["Add-ons", "Mezzanines, crane beams, canopies"],
                  ["Delivery", "Pan-India"],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "4px 6px", color: "#6b7280", whiteSpace: "nowrap" }}>{k}</td>
                    <td style={{ padding: "4px 6px", color: "#111827" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form className="shrink-0" style={{ width: 214, background: "#fff", border: "1px solid #e5e7eb", padding: "10px 12px 11px", alignSelf: "flex-start" }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: "#111827" }}>Request for Quotation</p>
          <p style={{ fontSize: 6.5, color: "#6b7280", marginTop: 1 }}>Our PEB team replies within one working day.</p>
          <div className="flex flex-col" style={{ gap: 4, marginTop: 6 }}>
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Name*" placeholder="Full name" w="50%" />
              <Field label="Company*" placeholder="Company name" w="50%" />
            </div>
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Work email*" placeholder="name@company.com" w="50%" />
              <Field label="Phone*" placeholder="+91" w="50%" />
            </div>
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Project location*" placeholder="City, state" w="50%" />
              <Field label="Built-up area (sq m)" placeholder="e.g. 12,000" w="50%" />
            </div>
            <Field label="Timeline*" value="3–6 months" select />
            <span className="flex items-center" style={{ gap: 4, height: 18, border: "1px dashed #9ca3af", borderRadius: 3, padding: "0 6px", fontSize: 7, color: "#4b5563" }}>
              <Upload style={{ width: 8, height: 8 }} aria-hidden="true" />
              Attach drawings (PDF, DWG, max 20 MB)
            </span>
          </div>
          <span className="flex items-center justify-center" style={{ marginTop: 7, height: 20, background: PENNAR, fontSize: 8, fontWeight: 600, color: "#fff", borderRadius: 2 }}>
            Submit RFQ
          </span>
        </form>
      </section>
      <div className="flex items-center" style={{ height: 36, padding: "0 20px", gap: 16, fontSize: 7.5, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>
        <span style={{ fontWeight: 600, color: "#111827" }}>Industries we build for</span>
        {["Automotive", "Warehousing & logistics", "Pharma", "FMCG", "Solar & power", "Engineering"].map((t) => (
          <span key={t} className="flex items-center" style={{ gap: 3 }}>
            <Check style={{ width: 8, height: 8, color: PENNAR }} strokeWidth={3} aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center" style={{ padding: "8px 20px", gap: 6, fontSize: 7.5, color: "#4b5563" }}>
        <Phone style={{ width: 8, height: 8 }} aria-hidden="true" />
        Prefer to talk? Call our Hyderabad sales office, Monday to Saturday.
      </div>
    </div>
  </BrowserChrome>
);

/* 04 · LinkedIn sponsored post: Campaign Manager ad preview -------- */

function AdCreative({ w, h }: { w: number; h: number }) {
  return (
    <div className="relative flex" style={{ width: w, height: h, background: "#0e1a52", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <svg width={w - 110} height={h} viewBox={`0 0 ${w - 110} ${h}`} className="absolute left-0 top-0" aria-hidden="true">
        <g stroke="rgb(255 255 255 / 0.16)" strokeWidth="1" fill="none">
          <path d={`M14 ${h - 18} L14 ${h - 70} L${(w - 110) / 2} ${h - 100} L${w - 124} ${h - 70} L${w - 124} ${h - 18}`} />
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((f) => (
            <path key={f} d={`M${14 + (w - 138) * f} ${h - 18} L${14 + (w - 138) * f} ${h - 70 - (f < 0.5 ? f : 1 - f) * 60}`} />
          ))}
          <path d={`M4 ${h - 18} L${w - 114} ${h - 18}`} />
        </g>
      </svg>
      <div className="relative min-w-0 flex-1" style={{ padding: "14px 14px" }}>
        <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.6, color: "#8fa2ff" }}>PRE-ENGINEERED BUILDINGS</p>
        <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.12, marginTop: 5 }}>Your next plant, designed, built and delivered</p>
        <p style={{ fontSize: 7.5, marginTop: 6, opacity: 0.8 }}>Factories · Warehouses · Industrial sheds</p>
      </div>
      <div className="relative shrink-0" style={{ width: 110, height: h }}>
        <Photo {...SITE} crop={{ x: 1222, y: 92, w: 218, h: 330 }} w={110} h={h} />
      </div>
    </div>
  );
}

export const LinkedInAd: Screen = () => (
  <CampaignManagerFrame account="Pennar Industries Ltd" accountId="512087734" url="linkedin.com/campaignmanager/accounts/512087734/creatives/384120957">
    <div style={{ fontSize: 7.5, color: "rgb(0 0 0 / 0.6)" }}>
      Account › <span style={{ color: "#0a66c2", fontWeight: 600 }}>PI | PEB | Procurement heads, plant heads, EPC</span> › Ad 384120957
    </div>
    <div className="flex min-h-0 flex-1" style={{ gap: 10, marginTop: 6 }}>
      <div className="min-w-0 flex-1" style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, padding: "8px 10px", overflow: "hidden" }}>
        <div className="flex items-center" style={{ gap: 6, fontSize: 9, fontWeight: 600 }}>
          Ad preview
          <span className="ml-auto flex overflow-hidden" style={{ border: "1px solid #b0b0b0", borderRadius: 4, fontSize: 7.5, fontWeight: 600 }}>
            <span className="flex items-center" style={{ gap: 3, padding: "3px 7px", background: "#e8f0fb", color: "#0a66c2" }}>
              <Monitor style={{ width: 8, height: 8 }} aria-hidden="true" />
              Desktop
            </span>
            <span className="flex items-center" style={{ gap: 3, padding: "3px 7px", color: "rgb(0 0 0 / 0.6)" }}>
              <Smartphone style={{ width: 8, height: 8 }} aria-hidden="true" />
              Mobile
            </span>
          </span>
        </div>
        <div className="flex justify-center" style={{ background: "#f4f2ee", marginTop: 7, padding: "8px 0", borderRadius: 4 }}>
          <LinkedInPost
            w={290}
            name="Pennar Industries Limited"
            followers="58,207"
            logo={
              <LogoAvatar size={28} shape="square">
                <Mark size={22} />
              </LogoAvatar>
            }
            promoted
            text={<>Planning a new plant or warehouse? We design, manufacture and erect pre-engineered buildings for factories, warehouses and industrial sheds across India.</>}
            media={<AdCreative w={290} h={128} />}
            mediaH={128}
            cta="Learn more"
            headline="Request a PEB quotation · pennarindia.com"
            reactions="312"
            comments="14"
            reposts="9"
          />
        </div>
      </div>
      <aside className="shrink-0" style={{ width: 150, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, padding: "8px 10px", fontSize: 7.5, alignSelf: "flex-start" }}>
        <p style={{ fontSize: 9, fontWeight: 600 }}>Ad details</p>
        {[
          ["Status", <LiStatus key="s" s="Active" />],
          ["Format", "Single image ad"],
          ["Objective", "Lead generation"],
          ["Created", "May 14, 2024"],
        ].map(([k, v]) => (
          <div key={k as string} className="flex justify-between" style={{ marginTop: 5, gap: 6 }}>
            <span style={{ color: "rgb(0 0 0 / 0.6)" }}>{k}</span>
            <span style={{ textAlign: "right" }}>{v}</span>
          </div>
        ))}
        <p style={{ fontSize: 9, fontWeight: 600, marginTop: 10, paddingTop: 8, borderTop: "1px solid #e8e8e8" }}>Performance</p>
        <p style={{ color: "rgb(0 0 0 / 0.6)", marginTop: 1 }}>May 14 – Dec 31, 2024</p>
        {[
          ["Spent", "₹117,336.20"],
          ["Impressions", "186,412"],
          ["Clicks", "1,904"],
          ["Average CTR", "1.02%"],
          ["Leads", "214"],
          ["Cost per lead", "₹548.30"],
          ["Lead form completion rate", "11.24%"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between" style={{ marginTop: 5, gap: 6 }}>
            <span style={{ color: "rgb(0 0 0 / 0.6)" }}>{k}</span>
            <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{v}</span>
          </div>
        ))}
      </aside>
    </div>
  </CampaignManagerFrame>
);

/* 05 · HubSpot deals board ------------------------------------------ */

const OWNERS = { rk: ["Ravi Kumar", "#6a78d1"], sr: ["Sneha Reddy", "#00a4bd"], ar: ["Arjun Rao", "#f2547d"], mp: ["Meena Pillai", "#00bda5"] } as const;
const d = (name: string, amount: string, close: string, o: keyof typeof OWNERS, source?: string) => ({ name, amount, close, owner: OWNERS[o][0], ownerColor: OWNERS[o][1], source });

const STAGES: HubStage[] = [
  {
    stage: "Enquiry received",
    count: 412,
    total: "₹41,26,50,000",
    deals: [d("Sai Krishna Agro Foods – PEB warehouse", "₹1,84,00,000", "28/02/2025", "rk", "Paid search"), d("Deccan Cold Chain – cold store shed", "₹96,50,000", "15/03/2025", "sr", "Paid social"), d("Vasavi Auto Components – CDW tubes", "₹18,40,000", "31/01/2025", "ar", "Paid search")],
  },
  {
    stage: "Qualified RFQ",
    count: 138,
    total: "₹64,82,00,000",
    weighted: "₹12,96,40,000",
    deals: [d("Godavari Solar Parks – MMS 40 MW", "₹6,20,00,000", "31/03/2025", "mp", "Paid social"), d("Nandi Pharma – PEB plant expansion", "₹2,35,00,000", "14/02/2025", "rk", "Paid search"), d("Kakatiya Engineering – ERW tubes 120 t", "₹42,60,000", "07/02/2025", "ar", "Paid search")],
  },
  {
    stage: "Technical discussion",
    count: 64,
    total: "₹38,14,00,000",
    weighted: "₹15,25,60,000",
    deals: [d("Orion Logistics Park – 3 warehouses", "₹8,90,00,000", "30/04/2025", "sr", "Paid search"), d("Sri Venkateswara Textiles – shed", "₹1,12,00,000", "21/02/2025", "rk", "Paid social")],
  },
  {
    stage: "Quotation sent",
    count: 41,
    total: "₹27,48,00,000",
    weighted: "₹16,48,80,000",
    deals: [d("Tungabhadra Steels – CRSS strips", "₹58,20,000", "10/02/2025", "ar", "Paid search"), d("Coastal EPC – solar structures 25 MW", "₹3,85,00,000", "28/03/2025", "mp", "Paid social")],
  },
  {
    stage: "Negotiation",
    count: 17,
    total: "₹14,06,00,000",
    weighted: "₹11,24,80,000",
    deals: [d("Hyderabad Precision Tools – new plant", "₹1,48,00,000", "31/01/2025", "sr", "Paid search")],
  },
  {
    stage: "Closed won",
    count: 29,
    total: "₹22,70,00,000",
    deals: [d("Bharat Agri Storage – PEB warehouse", "₹2,06,00,000", "18/12/2024", "rk", "Paid search")],
  },
];

export const Pipeline: Screen = () => <HubSpotBoard pipeline="B2B RFQ pipeline" stages={STAGES} />;

export const pennarScreens: Screen[] = [ProductCampaigns, SearchResult, RfqLanding, LinkedInAd, Pipeline];
