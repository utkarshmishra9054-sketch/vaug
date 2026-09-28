import { ArrowRight, Check } from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
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
  noisy,
  num,
  Photo,
  SerpAd,
  SerpLabel,
  SerpResult,
  type Col,
} from "./tools";

/* JAS Associates (Vadodara) · Google Ads search campaigns by service.
   TODO(content): every number drawn here is illustrative except the 36% CPC drop in under 3 months. Confirm with the client.
   12 weeks, 7 Apr – 29 Jun 2025, on a flat ~₹1,500/day budget: avg. CPC ₹42.0 in week 1 -> ₹26.9 in week 12 (-36%),
   weekly clicks 250 -> 390 (+56% on the same spend). Last 30 days: 1,677 clicks, ₹45,044 cost, avg. CPC ₹26.86. */

const LOGO = { src: "/logos/jas-associates.webp", img: { w: 113, h: 120 } };
const SITE = { src: "/sites/jas-associates.webp", img: { w: 1440, h: 900 } };
const ORANGE = "#c4501a";

function Logo({ size }: { size: number }) {
  return <Photo {...LOGO} w={size} h={size * (120 / 113)} />;
}

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 7, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

/* 01 · Search ad in top position ------------------------------------ */

export const SearchAd: Screen = () => (
  <GoogleSerp query="peso license consultant vadodara">
    <SerpLabel>Sponsored results</SerpLabel>
    <SerpAd
      ad={{
        site: "JAS Associates",
        url: "https://www.jas-associates.com › peso-licence",
        favicon: <Logo size={13} />,
        title: "PESO Licence Consultants in Vadodara | Grant, Renewal & Approvals",
        desc: "Plan layout drawings, NOC and PESO approval for petroleum, gas cylinder and LPG storage. 12+ years in industrial safety. Request a quote today.",
        sitelinks: ["PESO Licensing", "Safety Audits", "Statutory Approvals", "Contact Us"],
      }}
    />
    <SerpAd
      ad={{
        site: "IndiaMART",
        url: "https://www.indiamart.com › peso-license-consultant",
        favicon: <Fav bg="#2e3192" t="i" />,
        title: "PESO License Consultant - Get Quotes From Verified Sellers",
        desc: "Find PESO license consultants in Vadodara. Compare prices, contact suppliers and get the best deals on IndiaMART.",
      }}
    />
    <SerpResult
      r={{
        site: "JAS Associates",
        url: "https://jas-associates.com › our-services › peso-laisioning",
        favicon: <Logo size={13} />,
        title: "PESO Laisioning - JAS Associates",
        desc: "Consultation for obtaining the NOC, plan layout drawings as per Gas Cylinder Rules 2016, and PESO approval on the plan layouts & application...",
      }}
    />
    <SerpResult
      r={{
        site: "Justdial",
        url: "https://www.justdial.com › Vadodara › Peso-License-Consultants",
        favicon: <Fav bg="#ff6f00" t="J" />,
        title: "Top PESO License Consultants in Vadodara - Best Explosive ...",
        desc: "Find PESO License Consultants in Vadodara. Get phone numbers, addresses, latest reviews & ratings on Justdial.",
      }}
    />
  </GoogleSerp>
);

/* 02 · Google Ads campaigns by service (last 30 days) --------------- */

const wrap = (t: string) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1 }}>{t}</span>;

const CCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 116 },
  { label: "Budget", w: 58 },
  { label: "Status", w: 52 },
  { label: "Impr.", w: 42, align: "right" },
  { label: "Clicks", w: 36, align: "right" },
  { label: "CTR", w: 38, align: "right" },
  { label: "Avg. CPC", w: 40, align: "right" },
  { label: "Cost", w: 56, align: "right" },
  { label: "Conversions", w: 50, align: "right" },
  { label: "Cost / conv.", w: 50, align: "right" },
];

const C_ROWS: [string, string, string, "enabled" | "paused", string, string, string, string, string, string, string][] = [
  ["JAS_Search_PESO-Licensing", "₹450.00/day", "Eligible", "enabled", "9,812", "512", "5.22%", "₹27.10", "₹13,875.20", "21.00", "₹660.72"],
  ["JAS_Search_SHE-Consultancy", "₹420.00/day", "Eligible", "enabled", "8,944", "421", "4.71%", "₹31.40", "₹13,219.40", "14.00", "₹944.24"],
  ["JAS_Search_Safety-Audits", "₹330.00/day", "Eligible", "enabled", "7,105", "336", "4.73%", "₹28.90", "₹9,710.40", "12.00", "₹809.20"],
  ["JAS_Search_Statutory-Approvals", "₹150.00/day", "Limited by budget", "enabled", "4,610", "188", "4.08%", "₹24.12", "₹4,534.56", "5.00", "₹906.91"],
  ["JAS_Search_Training-Certification", "₹120.00/day", "Eligible", "enabled", "5,377", "143", "2.66%", "₹21.35", "₹3,053.05", "3.00", "₹1,017.68"],
  ["JAS_Brand_Exact", "₹30.00/day", "Eligible", "enabled", "214", "77", "35.98%", "₹8.46", "₹651.42", "9.00", "₹72.38"],
  ["Search - All Services - Broad (old)", "₹1,500.00/day", "Paused", "paused", "0", "0", "—", "—", "₹0.00", "0.00", "₹0.00"],
];

const L30_CLICKS = noisy({ n: 30, from: 51, to: 60, seed: 31, noise: 0.18, weekly: 0.35, weekStart: 5 });
const L30_CPC = noisy({ n: 30, from: 27.6, to: 26.3, seed: 32, noise: 0.07, decimals: 2 });

export const CampaignsByService: Screen = () => (
  <GoogleAdsShell account="JAS Associates" customerId="731-204-5586" title="Campaigns" dateRange="31 May – 29 Jun 2025" dateLabel="Last 30 days" navActive="Campaigns" url="ads.google.com/aw/campaigns?ocid=731204558">
    <GAdsChartCard
      h={50}
      metrics={[
        { label: "Clicks", value: "1.68K", on: true },
        { label: "Avg. CPC", value: "₹26.86", on: true },
        { label: "Cost", value: "₹45K" },
        { label: "Conversions", value: "64.00" },
      ]}
      series={[L30_CLICKS, L30_CPC]}
      xLabels={["31 May 2025", "29 Jun 2025"]}
      left={{ max: 100, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 40, ticks: 2, format: (n) => `₹${n}` }}
    />
    <GAdsTable
      cols={CCOLS}
      rows={C_ROWS.map(([name, budget, status, state, ...m]) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={state} />,
        <GLink key="n">{name}</GLink>,
        budget,
        status === "Limited by budget" ? (
          <span key="s">{wrap(status)}</span>
        ) : (
          <span key="s" style={{ color: status === "Paused" ? G.grey : G.text }}>
            {status}
          </span>
        ),
        ...m,
      ])}
      total={["", "", "Total: all campaigns", "", "", "36,062", "1,677", "4.65%", "₹26.86", "₹45,044.03", "64.00", "₹703.81"]}
    />
  </GoogleAdsShell>
);

/* 03 · Avg. CPC by week over the 12 weeks --------------------------- */

const WEEKS = ["7 Apr", "14 Apr", "21 Apr", "28 Apr", "5 May", "12 May", "19 May", "26 May", "2 Jun", "9 Jun", "16 Jun", "23 Jun"];
const W_CPC = [42.04, 41.31, 39.18, 36.42, 34.77, 32.12, 31.35, 29.61, 28.83, 27.92, 27.24, 26.91];
const W_COST = [10482.3, 10511.84, 10390.12, 10508.4, 10466.07, 10493.61, 10277.25, 10502.9, 10488.35, 10431.02, 10505.72, 10497.18];
const W_IMPR = [8911, 8604, 8390, 8112, 8237, 8570, 8196, 8809, 8420, 8703, 8655, 8941];
const W_CONV = [6, 7, 5, 9, 8, 11, 10, 13, 12, 14, 15, 16];
const W_CLICKS = W_COST.map((c, i) => Math.round(c / W_CPC[i]));
const W_IS = ["41.8%", "43.2%", "44.9%", "47.5%", "50.6%", "52.3%", "55.0%", "58.9%", "61.2%", "63.4%", "64.1%", "66.7%"];

const TOT_COST = W_COST.reduce((a, b) => a + b, 0);
const TOT_CLICKS = W_CLICKS.reduce((a, b) => a + b, 0);

/* Daily avg. CPC and clicks across the 84 days, following the weekly figures. */
const D_CPC = noisy({ n: 84, from: 42.6, to: 26.7, seed: 41, noise: 0.06, ease: 0.25, decimals: 2, bumps: { 23: 1.08, 24: 1.06, 51: 0.94 } });
const D_CLICKS = noisy({ n: 84, from: 35, to: 57, seed: 42, noise: 0.16, weekly: 0.3, ease: 0.25, bumps: { 20: 0.55 } });

const WCOLS: Col[] = [
  { label: "Week (Mon–Sun) ↓", w: 96 },
  { label: "Impr.", w: 50, align: "right" },
  { label: "Clicks", w: 44, align: "right" },
  { label: "CTR", w: 44, align: "right" },
  { label: "Avg. CPC", w: 50, align: "right" },
  { label: "Cost", w: 62, align: "right" },
  { label: "Conversions", w: 54, align: "right" },
  { label: "Search impr. share", w: 60, align: "right" },
  { label: "Search lost IS (rank)", w: 60, align: "right" },
];

const rupees = (n: number) => `₹${num(n, { decimals: 2 })}`;
const pct = (n: number) => `${num(n * 100, { decimals: 2 })}%`;

export const CpcTrend: Screen = () => (
  <GoogleAdsShell account="JAS Associates" customerId="731-204-5586" title="Campaigns" dateRange="7 Apr – 29 Jun 2025" filters={["Campaign type: Search", "Campaign status: All enabled"]} nav={null} url="ads.google.com/aw/campaigns?ocid=731204558">
    <GAdsChartCard
      w={548}
      h={88}
      metrics={[
        { label: "Avg. CPC", value: `₹${num(TOT_COST / TOT_CLICKS, { decimals: 2 })}`, on: true },
        { label: "Clicks", value: `${num(TOT_CLICKS / 1000, { decimals: 2 })}K`, on: true },
        { label: "Cost", value: `₹${num(TOT_COST / 1000, { decimals: 1 })}K` },
        { label: "Search impr. share", value: "54.9%" },
      ]}
      series={[D_CPC, D_CLICKS]}
      xLabels={["7 Apr 2025", "5 May 2025", "2 Jun 2025", "29 Jun 2025"]}
      left={{ max: 60, ticks: 3, format: (n) => `₹${n}` }}
      right={{ max: 90, ticks: 3, format: (n) => `${n}` }}
    />
    <GAdsTable
      cols={WCOLS}
      rowH={18}
      rows={WEEKS.map((_, j) => {
        const i = WEEKS.length - 1 - j;
        return [
          `${WEEKS[i]} 2025`,
          num(W_IMPR[i]),
          num(W_CLICKS[i]),
          pct(W_CLICKS[i] / W_IMPR[i]),
          rupees(W_CPC[i]),
          rupees(W_COST[i]),
          `${W_CONV[i]}.00`,
          W_IS[i],
          `${num(Math.max(8, 52 - i * 3.4 + ((i * 7) % 3)), { decimals: 1 })}%`,
        ];
      })}
    />
  </GoogleAdsShell>
);

/* 04 · Search terms with negatives being added ----------------------- */

const SCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "Search term", w: 132 },
  { label: "Match type", w: 70 },
  { label: "Added/ Excluded", w: 44 },
  { label: "Campaign", w: 92 },
  { label: "Clicks", w: 32, align: "right" },
  { label: "Impr.", w: 36, align: "right" },
  { label: "CTR", w: 38, align: "right" },
  { label: "Avg. CPC", w: 40, align: "right" },
  { label: "Cost", w: 50, align: "right" },
  { label: "Conv.", w: 32, align: "right" },
];

const S_ROWS: [boolean, string, string, string, string, string, string, string, string, string, string][] = [
  [false, "peso licence consultant vadodara", "Exact match", "Added", "JAS_Search_PESO-Licensing", "96", "1,204", "7.97%", "₹25.14", "₹2,413.44", "6.00"],
  [false, "safety audit company in gujarat", "Exact match", "Added", "JAS_Search_Safety-Audits", "58", "1,090", "5.32%", "₹29.44", "₹1,707.52", "4.00"],
  [false, "peso license for diesel storage tank", "Phrase match", "None", "JAS_Search_PESO-Licensing", "41", "688", "5.96%", "₹27.90", "₹1,143.90", "3.00"],
  [false, "fire noc consultant near me", "Phrase match", "None", "JAS_Search_Statutory-Approvals", "33", "802", "4.11%", "₹22.06", "₹727.98", "2.00"],
  [false, "iso 45001 certification cost", "Phrase match (close variant)", "None", "JAS_Search_SHE-Consultancy", "27", "611", "4.42%", "₹31.02", "₹837.54", "1.00"],
  [false, "factory licence renewal gujarat", "Phrase match", "None", "JAS_Search_Statutory-Approvals", "22", "415", "5.30%", "₹23.80", "₹523.60", "1.00"],
  [false, "hazop study consultants", "Exact match", "Added", "JAS_Search_SHE-Consultancy", "19", "244", "7.79%", "₹34.60", "₹657.40", "2.00"],
  [true, "nebosh course fees in vadodara", "Phrase match (close variant)", "None", "JAS_Search_Training-Certification", "14", "902", "1.55%", "₹16.85", "₹235.90", "0.00"],
  [false, "safety officer job vacancy vadodara", "Phrase match", "Excluded", "JAS_Search_SHE-Consultancy", "12", "540", "2.22%", "₹18.40", "₹220.80", "0.00"],
  [true, "free safety audit checklist pdf", "Phrase match", "None", "JAS_Search_Safety-Audits", "9", "377", "2.39%", "₹21.70", "₹195.30", "0.00"],
  [true, "peso exam syllabus", "Phrase match (close variant)", "None", "JAS_Search_PESO-Licensing", "6", "298", "2.01%", "₹19.30", "₹115.80", "0.00"],
  [false, "industrial safety training certificate", "Phrase match", "None", "JAS_Search_Training-Certification", "11", "486", "2.26%", "₹20.45", "₹224.95", "1.00"],
];

export const SearchTerms: Screen = () => (
  <GoogleAdsShell
    account="JAS Associates"
    customerId="731-204-5586"
    title="Search terms"
    dateRange="31 May – 29 Jun 2025"
    dateLabel="Last 30 days"
    navActive="Search terms"
    nav={null}
    filters={["Campaign status: All enabled", "Clicks > 5"]}
    url="ads.google.com/aw/searchterms?ocid=731204558"
  >
    <div className="relative">
      <GAdsTable
        cols={SCOLS}
        rowH={19}
        rows={S_ROWS.map(([sel, term, match, added, campaign, ...m]) => [
          <CheckBox key="c" size={8} on={sel} color="#0b57d0" />,
          <span key="t" style={{ color: G.text }}>
            {term}
          </span>,
          match.includes("(") ? <span key="m">{wrap(match)}</span> : match,
          <span key="a" style={{ color: added === "None" ? G.grey : G.text }}>
            {added}
          </span>,
          <GLink key="cp">{campaign}</GLink>,
          ...m,
        ])}
        total={["", "Total: Search terms", "", "", "", "1,677", "36,062", "4.65%", "₹26.86", "₹45,044.03", "64.00"]}
      />
      <div className="absolute inset-x-0 flex items-center" style={{ top: 0, height: 27, zIndex: 2, background: "#d3e3fd", padding: "0 10px", gap: 16, fontSize: 8, color: "#041e49", fontFamily: FONT.google }}>
        <span style={{ fontWeight: 500 }}>3 selected</span>
        <span style={{ color: "#0b57d0", fontWeight: 500 }}>Add as keyword</span>
        <span style={{ color: "#0b57d0", fontWeight: 500 }}>Add as negative keyword</span>
        <span style={{ color: "#0b57d0", fontWeight: 500 }}>Download</span>
        <span className="ml-auto" style={{ color: "#0b57d0", fontWeight: 500 }}>
          Cancel
        </span>
      </div>
    </div>
  </GoogleAdsShell>
);

/* 05 · PESO licence landing page with quote form -------------------- */

// TODO(content): the page copy and the one-working-day call-back promise are illustrative. Confirm with the client.
export const LandingPage: Screen = () => (
  <BrowserChrome url="jas-associates.com/peso-licence-consultant/?utm_source=google&utm_medium=cpc&utm_campaign=peso">
    <div className="relative h-full" style={{ fontFamily: "Outfit, 'Helvetica Neue', Arial, sans-serif", color: "#1f1f1f", background: "#fff" }}>
      <section className="relative" style={{ height: 284, overflow: "hidden" }}>
        <div className="absolute inset-0">
          <Photo {...SITE} crop={{ x: 960, y: 90, w: 480, h: 300 }} w={640} h={284} />
          <div className="absolute inset-0" style={{ background: "rgb(20 20 22 / 0.55)" }} />
        </div>
        <header className="relative flex items-center" style={{ height: 36, padding: "0 28px", background: "rgb(236 233 229 / 0.94)", gap: 20 }}>
          <Logo size={24} />
          <nav className="flex items-center" style={{ marginLeft: "auto", marginRight: "auto", gap: 22, fontSize: 8, fontWeight: 600, color: "#2b2b2b" }}>
            {["Home", "About", "Services", "Contact"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </nav>
          <span className="flex items-center" style={{ gap: 4, fontSize: 7.5, fontWeight: 700, color: "#fff", background: ORANGE, padding: "5px 10px", borderRadius: 3 }}>
            Request Quote
            <ArrowRight style={{ width: 8, height: 8 }} aria-hidden="true" />
          </span>
        </header>
        <div className="relative flex" style={{ padding: "18px 28px 0", gap: 26 }}>
          <div className="flex-1" style={{ color: "#fff" }}>
            <span style={{ display: "inline-block", fontSize: 6.5, fontWeight: 600, letterSpacing: 0.6, color: "#e0793f", border: "1px solid rgb(224 121 63 / 0.6)", borderRadius: 10, padding: "3px 8px" }}>PESO LICENSING · VADODARA &amp; GUJARAT</span>
            <h1 style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif", fontWeight: 900, fontSize: 25, lineHeight: 1.02, marginTop: 9, letterSpacing: 0.4 }}>
              PESO LICENCE
              <br />
              GRANT &amp; RENEWAL
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: 24, color: "#d98a2b", lineHeight: 1.1, marginTop: 2 }}>handled end to end</p>
            <ul style={{ marginTop: 10, fontSize: 8, lineHeight: 1.85, color: "rgb(255 255 255 / 0.85)" }}>
              {["Plan layout drawings as per Gas Cylinder Rules 2016", "NOC from the District Authority", "Application, inspection and follow-up with PESO"].map((t) => (
                <li key={t} className="flex items-center" style={{ gap: 5 }}>
                  <Check style={{ width: 9, height: 9, color: "#e0793f" }} strokeWidth={3} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <form className="shrink-0" style={{ width: 196, background: "#fff", borderRadius: 6, padding: "10px 12px 11px", alignSelf: "flex-start" }}>
            <p style={{ fontSize: 11, fontWeight: 700 }}>Get a quote</p>
            <p style={{ fontSize: 7, color: "#6b7280", marginTop: 1 }}>Our consultant will call you within one working day.</p>
            <div className="flex flex-col" style={{ gap: 4, marginTop: 7 }}>
              <Field label="Name*" placeholder="Your name" />
              <Field label="Company*" placeholder="Company / plant name" />
              <div className="flex" style={{ gap: 5 }}>
                <Field label="Mobile*" placeholder="+91" w={80} />
                <Field label="Email" placeholder="Work email" w="100%" />
              </div>
              <Field label="Licence required*" value="Petroleum storage (Form XV)" select />
            </div>
            <span className="flex items-center justify-center" style={{ marginTop: 7, height: 21, background: ORANGE, borderRadius: 3, fontSize: 8.5, fontWeight: 700, color: "#fff" }}>
              Request Quote
            </span>
          </form>
        </div>
      </section>
      <section style={{ padding: "10px 28px 0" }}>
        <p style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: 0.8, color: ORANGE }}>LICENCES WE HANDLE</p>
        <div className="flex" style={{ marginTop: 7, gap: 10 }}>
          {[
            ["Petroleum storage", "Form XIV and XV licences for diesel, petrol and furnace oil tanks."],
            ["Gas cylinder storage", "Licences under the Gas Cylinder Rules 2016 for cylinder stores."],
            ["Compressed gas & LPG", "SMPV(U) approvals for LPG, CO₂ and other pressure vessels."],
            ["Explosives", "Licences for storage and use of explosives at sites and quarries."],
          ].map(([t, d]) => (
            <div key={t} style={{ flex: 1, borderTop: "2px solid #eee", paddingTop: 6 }}>
              <p style={{ fontSize: 9, fontWeight: 700 }}>{t}</p>
              <p style={{ fontSize: 7, color: "#6b7280", lineHeight: 1.45, marginTop: 2 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </BrowserChrome>
);

export const jasScreens: Screen[] = [SearchAd, CampaignsByService, CpcTrend, SearchTerms, LandingPage];
