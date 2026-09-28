import type { CSSProperties, ReactNode } from "react";
import { Baseline, Bold, ChevronDown, Cloud, FolderInput, History, Italic, Link, Lock, Menu, MessageSquarePlus, PaintRoller, Plus, Printer, Redo2, Search, Sigma, Star, Strikethrough, Undo2, Video } from "lucide-react";

import type { Screen } from "./kit";
import { BrowserChrome, CheckBox, FONT, G, GAdsChartCard, GAdsDot, GAdsTable, GLink, GoogleAdsShell, Initials, noisy, Photo, type Col } from "./tools";

/* Vivin Design · Google Ads search campaigns, Noida.
   Totals match the study: 27,164 impressions, 12,043 clicks, 2,023 enquiries (conversions).
   TODO(content): illustrative — the reporting period (1 Jan – 30 Jun 2023), budgets, CPCs, cost,
   the per-campaign / per-keyword / per-ad split, Quality Scores, top-of-page rates and the lead-sheet rows. */

const LOGO = { src: "/logos/vivin-design.webp", img: { w: 480, h: 116 } };
const ACCOUNT = { account: "Vivin Design (VC Design)", customerId: "318-624-7093" };
const RANGE = "1 Jan – 30 Jun 2023"; // TODO(content): illustrative period.

const int = (n: number) => n.toLocaleString("en-US");
const inr = (n: number) => `₹${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (a: number, b: number) => `${((a / b) * 100).toFixed(2)}%`;
const convs = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
const wrap = (t: ReactNode) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.15 }}>{t}</span>;

/* 01 · Campaigns overview ------------------------------------------ */

type Camp = { name: string; budget: number; status: string; state: "enabled" | "paused"; impr: number; clicks: number; cpc: number; conv: number; top: number };
// TODO(content): illustrative split; sums to 27,164 impr / 12,043 clicks / 2,023 conversions.
const CAMPS: Camp[] = [
  { name: "VD_Search_Interior-Designer_Noida", budget: 750, status: "Limited by budget", state: "enabled", impr: 11284, clicks: 5316, cpc: 21.84, conv: 912, top: 78.42 },
  { name: "VD_Search_Home-Interiors_Noida-GNoida", budget: 400, status: "Eligible", state: "enabled", impr: 6917, clicks: 3041, cpc: 19.62, conv: 507, top: 71.06 },
  { name: "VD_Search_Modular-Kitchen_Noida", budget: 200, status: "Eligible", state: "enabled", impr: 3862, clicks: 1512, cpc: 17.35, conv: 238, top: 64.91 },
  { name: "VD_Search_Office-Interior_Noida", budget: 200, status: "Eligible", state: "enabled", impr: 2640, clicks: 894, cpc: 28.91, conv: 121, top: 58.33 },
  { name: "VD_Brand_Vivin-Design_Exact", budget: 100, status: "Eligible", state: "enabled", impr: 1473, clicks: 1061, cpc: 4.12, conv: 219, top: 96.74 },
  { name: "VD_Search_Interior-Designer_Ghaziabad", budget: 150, status: "Paused", state: "paused", impr: 988, clicks: 219, cpc: 22.4, conv: 26, top: 41.2 },
];
const cost = (c: { clicks: number; cpc: number }) => Math.round(c.clicks * c.cpc * 100) / 100;
const T = CAMPS.reduce((a, c) => ({ impr: a.impr + c.impr, clicks: a.clicks + c.clicks, cost: a.cost + cost(c), conv: a.conv + c.conv, top: a.top + c.impr * c.top }), { impr: 0, clicks: 0, cost: 0, conv: 0, top: 0 });

const CCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 116 },
  { label: "Budget", w: 56 },
  { label: "Status", w: 50 },
  { label: "Impr.", w: 40, align: "right" },
  { label: "Clicks", w: 38, align: "right" },
  { label: "CTR", w: 38, align: "right" },
  { label: "Cost", w: 56, align: "right" },
  { label: "Conversions", w: 50, align: "right" },
  { label: "Cost / conv.", w: 44, align: "right" },
  { label: "Impr. (Abs. Top) %", w: 50, align: "right" },
];

// Daily clicks and conversions, 1 Jan (a Sunday) – 30 Jun 2023. Holi (8 Mar) dip.
const D_CLICKS = noisy({ n: 181, from: 56, to: 77, seed: 41, noise: 0.18, weekly: 0.1, weekStart: 6, bumps: { 66: 0.55, 67: 0.8, 118: 1.3 } });
const D_CONV = noisy({ n: 181, from: 8.5, to: 13.5, seed: 42, noise: 0.38, weekly: 0.12, weekStart: 6, bumps: { 66: 0.4, 118: 1.5 } });

export const Campaigns: Screen = () => (
  <GoogleAdsShell {...ACCOUNT} title="Campaigns" dateRange={RANGE} nav={null} url="ads.google.com/aw/campaigns?ocid=318624709">
    <GAdsChartCard
      w={548}
      h={60}
      metrics={[
        { label: "Clicks", value: "12K", on: true },
        { label: "Conversions", value: "2.02K", on: true },
        { label: "Cost", value: `₹${Math.round(T.cost / 1000)}K` },
        { label: "Impr. (Abs. Top) %", value: `${(T.top / T.impr).toFixed(2)}%` },
      ]}
      series={[D_CLICKS, D_CONV]}
      xLabels={["1 Jan 2023", "30 Jun 2023"]}
      left={{ max: 120, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 30, ticks: 2, format: (n) => `${n}` }}
    />
    <GAdsTable
      cols={CCOLS}
      rowH={21}
      rows={CAMPS.map((c) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={c.state} />,
        <GLink key="n">{wrap(c.name)}</GLink>,
        `${inr(c.budget)}/day`,
        c.status === "Limited by budget" ? wrap(c.status) : <span style={{ color: c.state === "paused" ? G.grey : G.text }}>{c.status}</span>,
        int(c.impr),
        int(c.clicks),
        pct(c.clicks, c.impr),
        inr(cost(c)),
        convs(c.conv),
        inr(cost(c) / c.conv),
        `${c.top.toFixed(2)}%`,
      ])}
      total={["", "", "Total: all campaigns", "", "", int(T.impr), int(T.clicks), pct(T.clicks, T.impr), inr(T.cost), convs(T.conv), inr(T.cost / T.conv), `${(T.top / T.impr).toFixed(2)}%`]}
    />
  </GoogleAdsShell>
);

/* 02 · Search keywords --------------------------------------------- */

type Kw = { kw: string; match: "Exact match" | "Phrase match" | "Broad match"; group: string; qs: number; impr: number; clicks: number; cpc: number; conv: number; top: number };
// TODO(content): illustrative keywords, Quality Scores and figures.
const KWS: Kw[] = [
  { kw: "[interior designer in noida]", match: "Exact match", group: "Interior Designer Noida", qs: 9, impr: 3412, clicks: 1733, cpc: 23.61, conv: 302, top: 84.1 },
  { kw: '"best interior designers in noida"', match: "Phrase match", group: "Best Interior Designers", qs: 8, impr: 2968, clicks: 1402, cpc: 22.08, conv: 241, top: 81.7 },
  { kw: '"home interior designers noida"', match: "Phrase match", group: "Home Interiors", qs: 8, impr: 2406, clicks: 1088, cpc: 19.94, conv: 186, top: 73.4 },
  { kw: "[interior designers noida]", match: "Exact match", group: "Interior Designer Noida", qs: 9, impr: 2215, clicks: 1061, cpc: 21.47, conv: 178, top: 82.9 },
  { kw: '"modular kitchen noida"', match: "Phrase match", group: "Modular Kitchen", qs: 7, impr: 1934, clicks: 702, cpc: 16.9, conv: 112, top: 62.8 },
  { kw: "interior designer near me", match: "Broad match", group: "Interior Designer Noida", qs: 6, impr: 1806, clicks: 571, cpc: 20.72, conv: 81, top: 61.5 },
  { kw: '"office interior designers in noida"', match: "Phrase match", group: "Office Interiors", qs: 7, impr: 1511, clicks: 498, cpc: 29.63, conv: 64, top: 59.0 },
  { kw: "[2bhk interior design cost noida]", match: "Exact match", group: "Home Interiors", qs: 7, impr: 1387, clicks: 596, cpc: 18.12, conv: 109, top: 66.2 },
  { kw: '"flat interior design greater noida"', match: "Phrase match", group: "Home Interiors", qs: 7, impr: 1160, clicks: 493, cpc: 19.05, conv: 88, top: 68.8 },
  { kw: "[vivin design]", match: "Exact match", group: "Brand", qs: 10, impr: 1102, clicks: 826, cpc: 3.87, conv: 171, top: 97.4 },
  { kw: '"interior decorators in noida sector"', match: "Phrase match", group: "Best Interior Designers", qs: 6, impr: 874, clicks: 318, cpc: 20.16, conv: 44, top: 57.9 },
];

const KCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Keyword", w: 110 },
  { label: "Match type", w: 62 },
  { label: "Ad group", w: 82 },
  { label: "Quality Score", w: 36, align: "right" },
  { label: "Impr.", w: 36, align: "right" },
  { label: "Clicks", w: 36, align: "right" },
  { label: "CTR", w: 36, align: "right" },
  { label: "Avg. CPC", w: 36, align: "right" },
  { label: "Conv.", w: 44, align: "right" },
  { label: "Impr. (Abs. Top) %", w: 50, align: "right" },
];

export const Keywords: Screen = () => (
  <GoogleAdsShell {...ACCOUNT} title="Search keywords" dateRange={RANGE} nav={null} filters={["Keyword status: All enabled", "Campaign type: Search"]} url="ads.google.com/aw/keywords?ocid=318624709">
    <GAdsTable
      cols={KCOLS}
      rowH={20}
      rows={KWS.map((k) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" />,
        <span key="k" style={{ color: G.text }}>
          {k.kw}
        </span>,
        k.match,
        <GLink key="g">{k.group}</GLink>,
        `${k.qs}/10`,
        int(k.impr),
        int(k.clicks),
        pct(k.clicks, k.impr),
        inr(k.cpc),
        convs(k.conv),
        `${k.top.toFixed(2)}%`,
      ])}
      total={["", "", "Total: all keywords", "", "", "", int(T.impr), int(T.clicks), pct(T.clicks, T.impr), inr(T.cost / T.clicks), convs(T.conv), `${(T.top / T.impr).toFixed(2)}%`]}
    />
  </GoogleAdsShell>
);

/* 03 · Responsive search ads with ad strength ---------------------- */

type Strength = "Excellent" | "Good" | "Average";
type Ad = { group: string; path: string; head: string; desc: string; strength: Strength; impr: number; clicks: number; conv: number };
// Copy of ad 1 is the live ad in the real screenshot; the rest are illustrative. TODO(content): illustrative figures.
const ADS: Ad[] = [
  {
    group: "Interior Designer Noida",
    path: "interior/noida",
    head: "Best Interior Designer Noida | Call Now To Get Big Discount | 800+ Projects Completed",
    desc: "High Quality, Budget Prices. 100% Trusted & Transparent Price. Easy EMI With 0% Interest.",
    strength: "Excellent",
    impr: 7106,
    clicks: 3412,
    conv: 598,
  },
  {
    group: "Best Interior Designers",
    path: "interior/designers",
    head: "Top-rated Interior Designers | Free Design Consultation | 10 Years Warranty",
    desc: "Design Your Home, Apartment with Experienced Home Interior Designer Vivin Chand. 11 Years of Work.",
    strength: "Good",
    impr: 4178,
    clicks: 1904,
    conv: 314,
  },
  {
    group: "Home Interiors",
    path: "home/interiors",
    head: "Home Interiors in Noida | Easy EMI With 0% Interest | 30 Days Delivery",
    desc: "Complete 2BHK & 3BHK Interiors. Modular Kitchen, Wardrobes & False Ceiling. Book a Free Site Visit.",
    strength: "Excellent",
    impr: 6917,
    clicks: 3041,
    conv: 507,
  },
  {
    group: "Modular Kitchen",
    path: "modular/kitchen",
    head: "Modular Kitchen Noida | Budget Prices, Top Quality | Get a Free Estimate",
    desc: "Custom Modular Kitchens Designed & Installed in 30 Days. 10 Years Warranty. Easy EMI Available.",
    strength: "Good",
    impr: 3862,
    clicks: 1512,
    conv: 238,
  },
  {
    group: "Office Interiors",
    path: "office/interior",
    head: "Office Interior Designers Noida | Turnkey Office Fit-Outs | Free Consultation",
    desc: "Corporate Offices, Retail Stores & Showrooms. Design to Handover by One Team. Call for a Quote.",
    strength: "Average",
    impr: 2640,
    clicks: 894,
    conv: 121,
  },
];

function StrengthRing({ s }: { s: Strength }) {
  const f = s === "Excellent" ? 1 : s === "Good" ? 0.75 : 0.5;
  const c = s === "Average" ? "#f9ab00" : "#1e8e3e";
  const r = 5;
  const len = 2 * Math.PI * r;
  return (
    <span className="flex items-center" style={{ gap: 4 }}>
      <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="6.5" cy="6.5" r={r} fill="none" stroke="#e8eaed" strokeWidth="2" />
        <circle cx="6.5" cy="6.5" r={r} fill="none" stroke={c} strokeWidth="2" strokeDasharray={`${len * f} ${len}`} transform="rotate(-90 6.5 6.5)" />
      </svg>
      <span style={{ lineHeight: 1.25 }}>
        <span className="block">{s}</span>
        <span className="block" style={{ color: G.link, fontSize: 7 }}>
          Edit
        </span>
      </span>
    </span>
  );
}

function AdPreview({ ad }: { ad: Ad }) {
  return (
    <span className="block" style={{ whiteSpace: "normal", lineHeight: 1.3, paddingRight: 6 }}>
      <span className="flex items-center" style={{ gap: 4, fontSize: 7 }}>
        <span className="flex items-center justify-center overflow-hidden" style={{ width: 11, height: 11, borderRadius: "50%", border: `0.5px solid ${G.border}`, background: "#fff" }}>
          <Photo {...LOGO} crop={{ x: 2, y: 6, w: 104, h: 104 }} w={7} h={7} />
        </span>
        <span style={{ color: G.text }}>Vivin Design</span>
        <span style={{ color: G.grey }}>www.vivindesign.in/{ad.path}</span>
      </span>
      <span className="block truncate" style={{ color: "#1a0dab", fontSize: 8.5, marginTop: 1 }}>
        {ad.head}
      </span>
      <span className="block" style={{ color: "#4d5156", fontSize: 7, overflow: "hidden", maxHeight: 18 }}>
        {ad.desc}
      </span>
    </span>
  );
}

const ACOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Ad", w: 188 },
  { label: "Ad group", w: 66 },
  { label: "Status", w: 38 },
  { label: "Ad type", w: 50 },
  { label: "Ad strength", w: 58 },
  { label: "Impr.", w: 36, align: "right" },
  { label: "Clicks", w: 34, align: "right" },
  { label: "CTR", w: 36, align: "right" },
  { label: "Conv.", w: 38, align: "right" },
];

export const Ads: Screen = () => (
  <GoogleAdsShell {...ACCOUNT} title="Ads" dateRange={RANGE} nav={null} filters={["Ad status: All enabled", "Campaign type: Search"]} url="ads.google.com/aw/ads?ocid=318624709">
    <GAdsTable
      cols={ACOLS}
      rowH={52}
      rows={ADS.map((a) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" />,
        <AdPreview key="a" ad={a} />,
        <GLink key="g">{wrap(a.group)}</GLink>,
        "Eligible",
        wrap("Responsive search ad"),
        <StrengthRing key="s" s={a.strength} />,
        int(a.impr),
        int(a.clicks),
        pct(a.clicks, a.impr),
        convs(a.conv),
      ])}
    />
  </GoogleAdsShell>
);

/* 04 · Enquiry sheet (Google Sheets) -------------------------------- */

type Status = "New" | "Called" | "Site visit booked" | "Quote sent" | "Not interested" | "Converted";
const CHIP: Record<Status, [string, string]> = {
  New: ["#e6e6e6", "#3c4043"],
  Called: ["#bfe1f6", "#0a53a8"],
  "Site visit booked": ["#ffe5a0", "#473822"],
  "Quote sent": ["#e6cff2", "#5a3286"],
  "Not interested": ["#ffcfc9", "#b10202"],
  Converted: ["#d4edbc", "#11734b"],
};
// TODO(content): illustrative enquiries; names and numbers are placeholders (numbers masked).
const LEADS: [string, string, string, string, string, string, string, Status][] = [
  ["19/06/2023 10:42", "Rohit Agarwal", "98XXXXX214", "Sector 150, Noida", "Full home interior", "3BHK apartment", "Interior-Designer_Noida", "Converted"],
  ["19/06/2023 12:07", "Neha Srivastava", "99XXXXX038", "Gaur City, Greater Noida W", "Modular kitchen", "2BHK apartment", "Modular-Kitchen_Noida", "Quote sent"],
  ["19/06/2023 15:31", "Amit Chauhan", "87XXXXX671", "Sector 62, Noida", "Office interior", "2,400 sq ft office", "Office-Interior_Noida", "Site visit booked"],
  ["20/06/2023 09:18", "Pooja Mehra", "98XXXXX550", "Sector 137, Noida", "Full home interior", "3BHK apartment", "Home-Interiors_Noida-GNoida", "Site visit booked"],
  ["20/06/2023 11:54", "Vikas Tyagi", "95XXXXX902", "Sector 75, Noida", "Wardrobes + false ceiling", "2BHK apartment", "Interior-Designer_Noida", "Called"],
  ["20/06/2023 18:26", "Sanjana Kapoor", "98XXXXX477", "Jaypee Wish Town", "Full home interior", "4BHK villa", "Brand_Vivin-Design_Exact", "Quote sent"],
  ["21/06/2023 08:47", "Deepak Sharma", "70XXXXX133", "Sector 44, Noida", "Living + dining", "Independent floor", "Interior-Designer_Noida", "Not interested"],
  ["21/06/2023 13:15", "Kritika Jain", "99XXXXX726", "Techzone 4, Greater Noida W", "Full home interior", "2BHK apartment", "Home-Interiors_Noida-GNoida", "Called"],
  ["21/06/2023 16:02", "Manish Bansal", "98XXXXX385", "Sector 128, Noida", "Modular kitchen", "3BHK apartment", "Modular-Kitchen_Noida", "Site visit booked"],
  ["22/06/2023 10:29", "Ritu Saxena", "88XXXXX241", "Sector 76, Noida", "Full home interior", "3BHK apartment", "Interior-Designer_Noida", "Called"],
  ["22/06/2023 12:48", "Arjun Malhotra", "97XXXXX658", "Sector 18, Noida", "Showroom interior", "1,100 sq ft retail", "Office-Interior_Noida", "New"],
  ["22/06/2023 17:36", "Swati Goel", "98XXXXX019", "Sector 121, Noida", "Full home interior", "2BHK apartment", "Interior-Designer_Noida", "New"],
  ["23/06/2023 09:05", "Nitin Rawat", "99XXXXX864", "Sector 1, Greater Noida W", "Bedroom + wardrobes", "3BHK apartment", "Home-Interiors_Noida-GNoida", "New"],
  ["23/06/2023 11:21", "Aarti Verma", "95XXXXX317", "Sector 93A, Noida", "Full home interior", "4BHK apartment", "Interior-Designer_Noida", "New"],
];
const FIRST_ROW = 2011;

const SCOLS: { l: string; w: number }[] = [
  { l: "Date & time", w: 62 },
  { l: "Name", w: 62 },
  { l: "Mobile", w: 50 },
  { l: "Location", w: 94 },
  { l: "Requirement", w: 80 },
  { l: "Property", w: 64 },
  { l: "Source", w: 44 },
  { l: "Campaign", w: 84 },
  { l: "Status", w: 72 },
];

const SHEETS_GREEN = "#0f9d58";
const S_LINE = "#e1e1e1";
const S_HEAD = "#f8f9fa";

function SheetsIcon() {
  return (
    <svg width="14" height="19" viewBox="0 0 14 19" aria-hidden="true">
      <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H9l5 5v12.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 17.5z" fill={SHEETS_GREEN} />
      <path d="M9 0v3.5A1.5 1.5 0 0 0 10.5 5H14z" fill="#87ceac" />
      <rect x="3" y="8" width="8" height="7" fill="none" stroke="#fff" strokeWidth="1.1" />
      <path d="M3 10.4h8M3 12.7h8M6.3 8v7" stroke="#fff" strokeWidth="1.1" />
    </svg>
  );
}

function Cell({ w, children, head = false, align = "left", style }: { w: number; children?: ReactNode; head?: boolean; align?: "left" | "center" | "right"; style?: CSSProperties }) {
  return (
    <div
      style={{
        width: w,
        flexShrink: 0,
        height: "100%",
        borderRight: `1px solid ${S_LINE}`,
        padding: "0 3px",
        display: "flex",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: head ? S_HEAD : undefined,
        color: head ? "#575a5f" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export const EnquirySheet: Screen = () => {
  const rowH = 15.5;
  const icons = [Undo2, Redo2, Printer, PaintRoller];
  return (
    <BrowserChrome url="docs.google.com/spreadsheets/d/1Qm7vHc0dXr2WkLbTq9pZ4sN8yVfJ3eA6uGiKoYtR5Ms/edit#gid=0" bg="#f9fbfd">
      <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: "#202124", background: "#f9fbfd" }}>
        <div className="flex shrink-0 items-center" style={{ height: 36, padding: "0 10px 0 10px", gap: 8 }}>
          <SheetsIcon />
          <div style={{ lineHeight: 1.25 }}>
            <div className="flex items-center" style={{ gap: 6, fontSize: 11 }}>
              Vivin Design – Website &amp; Ads Enquiries 2023
              <Star style={{ width: 9, height: 9, color: G.grey }} aria-hidden="true" />
              <FolderInput style={{ width: 9, height: 9, color: G.grey }} aria-hidden="true" />
              <Cloud style={{ width: 9, height: 9, color: G.grey }} aria-hidden="true" />
            </div>
            <div className="flex" style={{ gap: 8, fontSize: 8, color: "#3c4043" }}>
              {["File", "Edit", "View", "Insert", "Format", "Data", "Tools", "Extensions", "Help"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
          <span className="ml-auto flex items-center" style={{ gap: 10, color: "#444746" }}>
            <History style={{ width: 11, height: 11 }} aria-hidden="true" />
            <MessageSquarePlus style={{ width: 11, height: 11 }} aria-hidden="true" />
            <Video style={{ width: 12, height: 12 }} aria-hidden="true" />
            <span className="flex items-center" style={{ height: 20, padding: "0 10px", borderRadius: 10, background: "#c2e7ff", gap: 4, fontSize: 8.5, fontWeight: 500, color: "#001d35" }}>
              <Lock style={{ width: 8, height: 8 }} aria-hidden="true" />
              Share
            </span>
            <Initials name="V G" size={18} bg="#7b5e9f" />
          </span>
        </div>
        <div className="flex shrink-0 items-center" style={{ height: 22, margin: "0 8px", borderRadius: 11, background: "#edf2fa", padding: "0 10px", gap: 9, fontSize: 8, color: "#444746" }}>
          <Search style={{ width: 9, height: 9 }} aria-hidden="true" />
          {icons.map((I, i) => (
            <I key={i} style={{ width: 9, height: 9 }} aria-hidden="true" />
          ))}
          <span className="flex items-center" style={{ gap: 2 }}>
            100%
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
          <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
          <span>₹</span>
          <span>%</span>
          <span>.0</span>
          <span>.00</span>
          <span>123</span>
          <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
          <span className="flex items-center" style={{ gap: 2 }}>
            Default…
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
          <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
          <span className="flex items-center" style={{ gap: 3 }}>
            <span style={{ fontSize: 10 }}>−</span>
            <span style={{ border: "1px solid #747775", borderRadius: 3, padding: "0 4px" }}>10</span>
            <span style={{ fontSize: 10 }}>+</span>
          </span>
          <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
          <Bold style={{ width: 9, height: 9 }} aria-hidden="true" />
          <Italic style={{ width: 9, height: 9 }} aria-hidden="true" />
          <Strikethrough style={{ width: 9, height: 9 }} aria-hidden="true" />
          <Baseline style={{ width: 9, height: 9 }} aria-hidden="true" />
          <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
          <Link style={{ width: 9, height: 9 }} aria-hidden="true" />
          <Sigma style={{ width: 9, height: 9 }} aria-hidden="true" />
        </div>
        <div className="flex shrink-0 items-center" style={{ height: 20, marginTop: 4, borderTop: `1px solid ${S_LINE}`, borderBottom: `1px solid ${S_LINE}`, background: "#fff", fontSize: 8 }}>
          <span className="flex items-center" style={{ width: 60, height: "100%", padding: "0 6px", borderRight: `1px solid ${S_LINE}`, gap: 2, justifyContent: "space-between" }}>
            I2024
            <ChevronDown style={{ width: 7, height: 7, color: G.grey }} aria-hidden="true" />
          </span>
          <span style={{ padding: "0 8px", color: "#a0a0a0", fontStyle: "italic", fontFamily: "serif" }}>fx</span>
          <span>New</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden" style={{ background: "#fff", fontSize: 7 }}>
          <div className="flex" style={{ height: 14, borderBottom: `1px solid ${S_LINE}`, fontSize: 7 }}>
            <Cell w={28} head />
            {SCOLS.map((c, i) => (
              <Cell key={c.l} w={c.w} head align="center" style={i === 8 ? { background: "#d3e3fd", color: "#0b57d0", fontWeight: 500 } : undefined}>
                {String.fromCharCode(65 + i)}
              </Cell>
            ))}

          </div>
          <div className="flex" style={{ height: rowH + 1, borderBottom: `2px solid #c7c7c7`, fontWeight: 700 }}>
            <Cell w={28} head align="center">
              1
            </Cell>
            {SCOLS.map((c) => (
              <Cell key={c.l} w={c.w} style={{ background: "#f3f3f3" }}>
                {c.l}
              </Cell>
            ))}
          </div>
          {LEADS.map((r, ri) => {
            const n = FIRST_ROW + ri;
            const sel = n === 2024;
            return (
              <div key={n} className="flex" style={{ height: rowH, borderBottom: `1px solid ${S_LINE}` }}>
                <Cell w={28} head align="center" style={sel ? { background: "#d3e3fd", color: "#0b57d0", fontWeight: 500 } : undefined}>
                  {n}
                </Cell>
                {r.slice(0, 6).map((v, i) => (
                  <Cell key={i} w={SCOLS[i].w}>
                    {v}
                  </Cell>
                ))}
                <Cell w={SCOLS[6].w}>Google Ads</Cell>
                <Cell w={SCOLS[7].w}>{`VD_Search_${r[6]}`.replace("VD_Search_Brand", "VD_Brand")}</Cell>
                <Cell w={SCOLS[8].w} style={sel ? { boxShadow: "inset 0 0 0 1.5px #1a73e8" } : undefined}>
                  <span className="flex items-center" style={{ height: 11, padding: "0 5px", borderRadius: 6, background: CHIP[r[7]][0], color: CHIP[r[7]][1], gap: 2, fontSize: 7 }}>
                    {r[7]}
                    <ChevronDown style={{ width: 6, height: 6 }} aria-hidden="true" />
                  </span>
                </Cell>
              </div>
            );
          })}
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className="flex" style={{ height: rowH, borderBottom: `1px solid ${S_LINE}` }}>
              <Cell w={28} head align="center">
                {FIRST_ROW + LEADS.length + k}
              </Cell>
              {SCOLS.map((c) => (
                <Cell key={c.l} w={c.w} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center" style={{ height: 24, background: "#f9fbfd", borderTop: `1px solid ${S_LINE}`, padding: "0 8px", gap: 10, fontSize: 8, color: "#444746" }}>
          <Plus style={{ width: 10, height: 10 }} aria-hidden="true" />
          <Menu style={{ width: 10, height: 10 }} aria-hidden="true" />
          <span className="flex items-center" style={{ height: 18, padding: "0 8px", borderRadius: 4, background: "#e1e9f7", color: "#0b57d0", fontWeight: 500, gap: 3 }}>
            Enquiries
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
          <span className="flex items-center" style={{ gap: 3 }}>
            Calls log
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
          <span className="flex items-center" style={{ gap: 3 }}>
            Monthly summary
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
          <span className="ml-auto" style={{ padding: "3px 8px", borderRadius: 4, background: "#fff", boxShadow: "0 0 0 1px #dadce0", fontSize: 7.5 }}>
            Count: 1
          </span>
        </div>
      </div>
    </BrowserChrome>
  );
};

export const vivinScreens: Screen[] = [Campaigns, Keywords, Ads, EnquirySheet];
