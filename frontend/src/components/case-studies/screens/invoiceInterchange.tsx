import type { ReactNode } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, EllipsisVertical, Lock, Menu, Monitor, Pencil, RotateCcw, Smartphone, UserPlus } from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  CampaignManagerFrame,
  CheckBox,
  FONT,
  G,
  GAdsChartCard,
  GAdsDot,
  GAdsTable,
  GLink,
  GoogleAdsShell,
  GoogleSerp,
  Initials,
  LinkedInPost,
  LiStatus,
  LogoAvatar,
  noisy,
  Photo,
  SerpAd,
  SerpLabel,
  SerpResult,
  TimeChart,
  type Col,
} from "./tools";

/* Invoice Interchange · SME lead generation, Singapore (Google Ads + LinkedIn Ads +
   eligibility landing page + Looker Studio lead dashboard).
   TODO(content): every figure below is illustrative (see the study file).
   August 2026: Google Ads S$12,939.41 + LinkedIn S$4,810.52 = S$17,749.93 spend,
   142 qualified leads = S$125.00 per qualified lead (from S$212 and 46 a month at launch);
   landing-page conversion 7.8%. */

const NAVY = "#12294b";
const BLUE = "#3c87dc";
const SKY = "#1bb8f0";

const LOGO = { src: "/logos/invoice-interchange.webp", img: { w: 403, h: 120 } };
const SITE = { src: "/sites/invoice-interchange.webp", img: { w: 1440, h: 900 } };

const sgd = (n: number, d = 2) => `S$${n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;

/** The site favicon: the blue "ii" of the wordmark. */
function Favicon({ size = 15 }: { size?: number }) {
  return (
    <span className="flex items-center justify-center" style={{ width: size, height: size, borderRadius: 3, background: "#fff", color: BLUE, fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: size * 0.62, letterSpacing: -0.5 }}>
      ii
    </span>
  );
}

/* 01 · Google Ads campaigns ----------------------------------------- */

const GCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 114 },
  { label: "Budget", w: 60 },
  { label: "Status", w: 52 },
  { label: "Campaign type", w: 46 },
  { label: "Impr.", w: 40, align: "right" },
  { label: "Clicks", w: 34, align: "right" },
  { label: "CTR", w: 36, align: "right" },
  { label: "Cost", w: 56, align: "right" },
  { label: "Conversions", w: 52, align: "right" },
  { label: "Cost / conv.", w: 46, align: "right" },
];

const wrap = (t: ReactNode, color: string = G.text) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1, color }}>{t}</span>;

type GRow = [string, string, string, string, "enabled" | "paused", string, string, string, string, string, string];
const G_ROWS: GRow[] = [
  ["II_Search_InvoiceFin_Exact", "S$160.00/day", "Eligible", "Search", "enabled", "18,412", "1,583", "8.60%", "S$4,938.61", "57.00", "S$86.64"],
  ["II_Search_WorkingCap_SME", "S$120.00/day", "Limited by budget", "Search", "enabled", "22,870", "1,191", "5.21%", "S$3,668.22", "34.00", "S$107.89"],
  ["II_Search_Industry_Logistics", "S$60.00/day", "Eligible", "Search", "enabled", "9,644", "468", "4.85%", "S$1,656.72", "13.50", "S$122.72"],
  ["II_Brand_Exact", "S$25.00/day", "Eligible", "Search", "enabled", "2,318", "604", "26.06%", "S$428.84", "19.00", "S$22.57"],
  ["II_Display_Remarketing_30D", "S$40.00/day", "Eligible", "Display", "enabled", "214,906", "1,137", "0.53%", "S$1,159.74", "9.00", "S$128.86"],
  ["II_PMax_SME_Financing", "S$35.00/day", "Eligible (Learning)", "Performance Max", "enabled", "48,211", "395", "0.82%", "S$872.95", "4.50", "S$193.99"],
  ["II_Search_BusinessLoan_Broad", "S$50.00/day", "Paused", "Search", "paused", "3,902", "141", "3.61%", "S$214.33", "1.00", "S$214.33"],
];

// 1 – 31 Aug 2026 (starts on a Saturday): B2B searches dip at weekends.
const G_CONV = noisy({ n: 31, from: 3.9, to: 5, seed: 41, noise: 0.35, weekly: 0.6, weekStart: 5, decimals: 1, bumps: { 12: 1.5, 19: 0.55, 25: 1.4 } });
const G_COST = noisy({ n: 31, from: 430, to: 450, seed: 42, noise: 0.08, weekly: 0.35, weekStart: 5, bumps: { 19: 0.8 } });

export const AdsCampaigns: Screen = () => (
  <GoogleAdsShell account="Invoice Interchange Pte. Ltd." customerId="731-406-2285" title="Campaigns" dateRange="1 – 31 Aug 2026" nav={null} url="ads.google.com/aw/campaigns?ocid=617204339&__c=7314062285">
    <GAdsChartCard
      w={548}
      h={40}
      metrics={[
        { label: "Conversions", value: "138.00", on: true },
        { label: "Cost", value: "S$12.9K", on: true },
        { label: "Clicks", value: "5.52K" },
        { label: "Cost / conv.", value: "S$93.76" },
      ]}
      series={[G_CONV, G_COST]}
      xLabels={["1 Aug 2026", "31 Aug 2026"]}
      left={{ max: 10, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 600, ticks: 2, format: (n) => (n ? `S$${n}` : "S$0") }}
    />
    <GAdsTable
      cols={GCOLS}
      rowH={19}
      rows={G_ROWS.map(([name, budget, status, type, state, ...m]) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={state} />,
        <GLink key="n">{name}</GLink>,
        budget,
        status.length > 10 ? <span key="s">{wrap(status)}</span> : <span key="s" style={{ color: status === "Paused" ? G.grey : G.text }}>{status}</span>,
        type === "Performance Max" ? <span key="t">{wrap(type)}</span> : type,
        ...m,
      ])}
      total={["", "", "Total: all campaigns", "", "", "", "320,263", "5,519", "1.72%", "S$12,939.41", "138.00", "S$93.76"]}
    />
  </GoogleAdsShell>
);

/* 02 · Google search with the sponsored result ---------------------- */

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 6.5, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

export const SearchAd: Screen = () => (
  <GoogleSerp query="invoice financing singapore">
    <SerpLabel />
    <SerpAd
      ad={{
        site: "Invoice Interchange",
        url: "https://www.invoiceinterchange.com › eligibility",
        favicon: <Favicon />,
        title: "Invoice Financing for SMEs | Check Eligibility in 2 Minutes",
        desc: "Get paid upfront on outstanding B2B invoices. No property collateral. Transparent fees, decision in 48 hours. Singapore-registered companies only.",
        sitelinks: ["How It Works", "Fees", "Check Eligibility", "Industries We Fund"],
      }}
    />
    <SerpResult
      r={{
        site: "Enterprise Singapore",
        url: "https://www.enterprisesg.gov.sg › financial-assistance",
        favicon: <Fav bg="#c8102e" t="E" />,
        title: "Enterprise Financing Scheme - Trade Loan",
        desc: "Supports SMEs' working capital needs, including invoice financing, through participating financial institutions. Find out who is eligible and how to apply...",
      }}
    />
    <SerpResult
      r={{
        site: "MoneySmart.sg",
        url: "https://www.moneysmart.sg › business-loan › invoice-financing",
        favicon: <Fav bg="#01a6a0" t="M" />,
        title: "Invoice Financing in Singapore: How It Works and Who Offers It",
        date: "3 Jun 2026",
        desc: "Waiting 60 or 90 days for clients to pay? Here's how invoice financing works, what it costs, and how SMEs compare banks and online platforms...",
      }}
    />
    <SerpResult
      r={{
        site: "Invoice Interchange",
        url: "https://www.invoiceinterchange.com › how-it-works",
        favicon: <Favicon />,
        title: "How Invoice Financing Works - Invoice Interchange",
        desc: "Upload your invoice, get an advance on its value, and repay when your customer pays. A cash flow solution for Singapore SMEs.",
      }}
    />
  </GoogleSerp>
);

/* 03 · LinkedIn Campaign Manager ad preview ------------------------- */

/** Single-image creative: the woman-with-tablet photo from the site's hero on the brand navy. */
function AdCreative({ w, h }: { w: number; h: number }) {
  const pw = Math.round(w * 0.42);
  return (
    <div className="relative flex" style={{ width: w, height: h, background: NAVY, fontFamily: FONT.web, color: "#fff", overflow: "hidden" }}>
      <div className="relative min-w-0 flex-1" style={{ padding: "13px 12px" }}>
        <Photo {...LOGO} w={62} h={18.5} style={{ filter: "brightness(0) invert(1)" }} />
        <p style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.12, marginTop: 10, letterSpacing: -0.2 }}>Customers paying in 60 days?</p>
        <p style={{ fontSize: 8, lineHeight: 1.4, marginTop: 5, opacity: 0.85 }}>Get paid upfront on your outstanding invoices.</p>
        <span className="inline-block" style={{ marginTop: 9, fontSize: 7.5, fontWeight: 500, padding: "4px 10px", borderRadius: 10, background: SKY }}>
          Check eligibility
        </span>
      </div>
      <Photo {...SITE} crop={{ x: 900, y: 100, w: 440, h: 440 * (h / pw) }} w={pw} h={h} />
    </div>
  );
}

const LI_GREY = "rgb(0 0 0 / 0.6)";

function Row({ k, v, bold = false }: { k: string; v: ReactNode; bold?: boolean }) {
  return (
    <div className="flex justify-between" style={{ marginTop: 4, gap: 6 }}>
      <span style={{ color: LI_GREY, whiteSpace: "nowrap" }}>{k}</span>
      <span style={{ textAlign: "right", fontWeight: bold ? 600 : 400, fontVariantNumeric: "tabular-nums" }}>{v}</span>
    </div>
  );
}

export const LinkedInAd: Screen = () => (
  <CampaignManagerFrame account="Invoice Interchange" accountId="508231964" url="linkedin.com/campaignmanager/accounts/508231964/creatives/412688305">
    <div className="truncate" style={{ fontSize: 7.5, color: LI_GREY }}>
      Account › <span style={{ color: "#0a66c2", fontWeight: 600 }}>II | Lead gen | SG founders &amp; finance, 11–200 staff</span> › Ad 412688305
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
            <span className="flex items-center" style={{ gap: 3, padding: "3px 7px", color: LI_GREY }}>
              <Smartphone style={{ width: 8, height: 8 }} aria-hidden="true" />
              Mobile
            </span>
          </span>
        </div>
        <div className="flex justify-center" style={{ background: "#f4f2ee", marginTop: 7, padding: "8px 0 0", borderRadius: 4, height: 312, overflow: "hidden" }}>
          <LinkedInPost
            w={290}
            name="Invoice Interchange"
            followers="3,418"
            logo={
              <LogoAvatar size={28} shape="square">
                <Photo {...LOGO} w={25} h={7.4} />
              </LogoAvatar>
            }
            promoted
            text={<>Most B2B customers in Singapore pay in 30 to 90 days. Invoice financing turns those unpaid invoices into working capital now, so you can pay staff and suppliers on time. Check if your business qualifies in two minutes.</>}
            media={<AdCreative w={290} h={132} />}
            mediaH={132}
            cta="Apply"
            headline="Check your eligibility · invoiceinterchange.com"
            reactions="96"
            comments="7"
            reposts="3"
          />
        </div>
      </div>
      <aside className="shrink-0" style={{ width: 158, background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, padding: "8px 10px", fontSize: 7.5, alignSelf: "flex-start" }}>
        <p style={{ fontSize: 9, fontWeight: 600 }}>Ad details</p>
        <Row k="Status" v={<LiStatus s="Active" />} />
        <Row k="Format" v="Single image ad" />
        <Row k="Objective" v="Lead generation" />
        <p style={{ fontSize: 9, fontWeight: 600, marginTop: 8, paddingTop: 7, borderTop: "1px solid #e8e8e8" }}>Audience</p>
        <Row k="Location" v="Singapore" />
        <Row k="Company size" v="11–50, 51–200" />
        <Row k="Job function" v="Finance, Entrepreneurship" />
        <Row k="Seniority" v="Owner, CXO, Director" />
        <p style={{ fontSize: 9, fontWeight: 600, marginTop: 8, paddingTop: 7, borderTop: "1px solid #e8e8e8" }}>Performance</p>
        <p style={{ color: LI_GREY, marginTop: 1 }}>Aug 1 – Aug 31, 2026</p>
        <Row k="Spent" v="SGD 2,137.40" bold />
        <Row k="Impressions" v="27,915" bold />
        <Row k="Clicks" v="176" bold />
        <Row k="Average CTR" v="0.63%" bold />
        <Row k="Leads" v="22" bold />
        <Row k="Cost per lead" v="SGD 97.15" bold />
      </aside>
    </div>
  </CampaignManagerFrame>
);

/* 04 · Eligibility-check landing page ------------------------------- */

function Step({ n, label, on = false, done = false }: { n: number; label: string; on?: boolean; done?: boolean }) {
  return (
    <span className="flex items-center" style={{ gap: 4, fontSize: 7, fontWeight: on ? 600 : 400, color: on || done ? NAVY : "#9aa3b2" }}>
      <span className="flex items-center justify-center" style={{ width: 13, height: 13, borderRadius: "50%", background: on || done ? BLUE : "#e6e9ef", color: on || done ? "#fff" : "#9aa3b2", fontSize: 7, fontWeight: 600 }}>
        {n}
      </span>
      {label}
    </span>
  );
}

function Input({ label, value, placeholder, select = false, hint }: { label: string; value?: string; placeholder?: string; select?: boolean; hint?: string }) {
  return (
    <label className="block">
      <span className="block" style={{ fontSize: 7.5, fontWeight: 500, color: "#2d3748", marginBottom: 3 }}>
        {label}
      </span>
      <span className="flex items-center" style={{ height: 21, border: "1px solid #d5dbe4", borderRadius: 6, padding: "0 7px", fontSize: 8, color: value ? "#1a202c" : "#a0aab8" }}>
        <span className="flex-1 truncate">{value ?? placeholder}</span>
        {select && <ChevronDown style={{ width: 8, height: 8, color: "#718096" }} aria-hidden="true" />}
      </span>
      {hint && (
        <span className="block" style={{ fontSize: 6.5, color: "#8a94a6", marginTop: 2 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function Radio({ label, on = false }: { label: string; on?: boolean }) {
  return (
    <span className="flex flex-1 items-center" style={{ height: 21, gap: 5, padding: "0 7px", border: `1px solid ${on ? BLUE : "#d5dbe4"}`, background: on ? "#eef5fd" : "#fff", borderRadius: 6, fontSize: 7.5, color: "#1a202c" }}>
      <span className="flex items-center justify-center" style={{ width: 9, height: 9, borderRadius: "50%", border: `1.2px solid ${on ? BLUE : "#a0aab8"}` }}>
        {on && <span style={{ width: 5, height: 5, borderRadius: "50%", background: BLUE }} />}
      </span>
      {label}
    </span>
  );
}

export const LandingPage: Screen = () => (
  <BrowserChrome url="www.invoiceinterchange.com/check-eligibility?utm_source=google&utm_medium=cpc&utm_campaign=II_Search_InvoiceFin_Exact">
    <div className="h-full" style={{ fontFamily: FONT.web, color: NAVY, background: "#fff" }}>
      <header className="flex items-center" style={{ height: 40, padding: "0 20px", gap: 18 }}>
        <Photo {...LOGO} w={78} h={23.2} />
        <nav className="flex items-center" style={{ gap: 15, fontSize: 8, fontWeight: 500, color: "#1d2a3f", marginLeft: 8 }}>
          {["How It Works", "Solutions", "Work With Us", "More"].map((t) => (
            <span key={t} className="flex items-center" style={{ gap: 2 }}>
              {t}
              {t !== "How It Works" && <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />}
            </span>
          ))}
          <span style={{ fontWeight: 400, color: "#3b4658" }}>6591 8895</span>
        </nav>
        <span className="ml-auto flex items-center" style={{ gap: 14, fontSize: 8, fontWeight: 500 }}>
          Login
          <span style={{ padding: "5px 12px", borderRadius: 12, background: BLUE, color: "#fff", letterSpacing: 0.3 }}>Apply Now</span>
          <Menu style={{ width: 10, height: 10 }} aria-hidden="true" />
        </span>
      </header>
      <section className="relative flex" style={{ height: 262, background: NAVY, padding: "22px 20px 0", gap: 16, overflow: "hidden" }}>
        <div className="absolute" style={{ right: 0, top: 0 }}>
          <Photo {...SITE} crop={{ x: 760, y: 100, w: 680, h: 620 }} w={287} h={262} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${NAVY} 0%, rgb(18 41 75 / 0.4) 35%, rgb(18 41 75 / 0) 70%)` }} />
        </div>
        <div className="relative" style={{ width: 250, color: "#fff" }}>
          <p style={{ fontSize: 7.5, fontWeight: 500, letterSpacing: 0.4, color: SKY }}>INVOICE FINANCING FOR SINGAPORE SMEs</p>
          <h1 style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.12, marginTop: 7, letterSpacing: -0.2 }}>Check if your business qualifies in 2 minutes</h1>
          <p style={{ fontSize: 8.5, lineHeight: 1.5, marginTop: 8, opacity: 0.88 }}>Answer a few questions about your company and invoices. No credit check and no documents at this step.</p>
          <ul style={{ marginTop: 10, fontSize: 8, lineHeight: 1.9, opacity: 0.95 }}>
            {["Advance on invoices from 30 to 120 days", "No property collateral required", "Decision within 2 business days"].map((t) => (
              <li key={t} className="flex items-center" style={{ gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: SKY }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <form className="relative shrink-0" style={{ width: 214, background: "#fff", borderRadius: 10, padding: "11px 13px 12px", alignSelf: "flex-start", boxShadow: "0 4px 14px rgb(0 0 0 / 0.18)" }}>
          <div className="flex items-center justify-between">
            <Step n={1} label="Business" on />
            <span style={{ flex: 1, height: 1, background: "#e6e9ef", margin: "0 4px" }} />
            <Step n={2} label="Invoices" />
            <span style={{ flex: 1, height: 1, background: "#e6e9ef", margin: "0 4px" }} />
            <Step n={3} label="Contact" />
          </div>
          <p style={{ fontSize: 10.5, fontWeight: 600, marginTop: 10 }}>About your business</p>
          <div className="flex flex-col" style={{ gap: 6, marginTop: 7 }}>
            <Input label="Company UEN" value="201834127K" hint="Found on your ACRA BizFile" />
            <Input label="Annual revenue" value="S$1M – S$5M" select />
            <div>
              <span className="block" style={{ fontSize: 7.5, fontWeight: 500, color: "#2d3748", marginBottom: 3 }}>
                Who are your customers?
              </span>
              <div className="flex" style={{ gap: 5 }}>
                <Radio label="Businesses" on />
                <Radio label="Government" />
              </div>
            </div>
          </div>
          <span className="flex items-center justify-center" style={{ marginTop: 9, height: 22, borderRadius: 11, background: SKY, fontSize: 8.5, fontWeight: 500, color: "#fff", letterSpacing: 0.3 }}>
            Continue
          </span>
          <p className="flex items-center justify-center" style={{ gap: 3, marginTop: 5, fontSize: 6.5, color: "#8a94a6" }}>
            <Lock style={{ width: 6.5, height: 6.5 }} aria-hidden="true" />
            Your details are encrypted and never shared.
          </p>
        </form>
      </section>
      <div style={{ background: "#f5f5f5", height: 58, overflow: "hidden" }}>
        <Photo {...SITE} crop={{ x: 20, y: 740, w: 1400, h: 100 }} w={600} h={43} style={{ margin: "8px auto 0" }} />
      </div>
    </div>
  </BrowserChrome>
);

/* 05 · Looker Studio lead dashboard --------------------------------- */

/** Looker Studio's product mark. */
function LookerMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="13.5" cy="13.5" r="7" fill="none" stroke="#4285f4" strokeWidth="3.4" />
      <circle cx="13.5" cy="13.5" r="2.6" fill="#1967d2" />
      <circle cx="5" cy="5" r="2.8" fill="#669df6" />
    </svg>
  );
}

/**
 * Looker Studio (2025) report in view mode: top bar with the report name,
 * Reset / Share / Edit, then the report page on the grey canvas.
 * `labels` localise the buttons.
 */
export function LookerStudio({ title, url, children, labels = ["Reset", "Share", "Edit"], user = "V G" }: { title: string; url: string; children: ReactNode; labels?: [string, string, string]; user?: string }) {
  return (
    <BrowserChrome url={url}>
      <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#eceff1" }}>
        <header className="flex shrink-0 items-center" style={{ height: 32, background: "#fff", borderBottom: `1px solid ${G.border}`, padding: "0 10px", gap: 7 }}>
          <LookerMark size={16} />
          <span className="truncate" style={{ fontFamily: FONT.googleSans, fontSize: 11 }}>
            {title}
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 8, fontSize: 8, fontWeight: 500, color: G.grey, whiteSpace: "nowrap" }}>
            <span className="flex items-center" style={{ gap: 3 }}>
              <RotateCcw style={{ width: 8, height: 8 }} aria-hidden="true" />
              {labels[0]}
            </span>
            <span className="flex items-center" style={{ height: 20, padding: "0 9px", gap: 3, borderRadius: 4, border: `1px solid ${G.border}`, color: G.link }}>
              <UserPlus style={{ width: 8, height: 8 }} aria-hidden="true" />
              {labels[1]}
              <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
            </span>
            <span className="flex items-center" style={{ height: 20, padding: "0 9px", gap: 3, borderRadius: 4, background: G.link, color: "#fff" }}>
              <Pencil style={{ width: 8, height: 8 }} aria-hidden="true" />
              {labels[2]}
            </span>
            <EllipsisVertical style={{ width: 9, height: 9 }} aria-hidden="true" />
            <Initials name={user} size={16} bg="#7b5e9f" />
          </span>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden" style={{ padding: "8px 10px 0" }}>
          <div className="h-full" style={{ background: "#fff", boxShadow: "0 1px 2px rgb(60 64 67 / 0.25)", padding: "10px 12px", overflow: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/** Looker Studio scorecard with a comparison vs the previous period. */
export function LookerScore({ label, value, change, good = true, up = true }: { label: string; value: string; change: string; good?: boolean; up?: boolean }) {
  return (
    <div style={{ flex: "1 1 0", minWidth: 0, border: `1px solid ${G.line}`, padding: "5px 7px" }}>
      <p className="truncate" style={{ fontSize: 7, color: G.grey }}>
        {label}
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.2, marginTop: 2, whiteSpace: "nowrap" }}>{value}</p>
      <p style={{ fontSize: 6.5, color: good ? "#137333" : "#c5221f", whiteSpace: "nowrap" }}>
        {up ? "▲" : "▼"} {change}
      </p>
    </div>
  );
}

/** Looker Studio date-range / drop-down control. */
export function LookerControl({ children, w }: { children: ReactNode; w?: number }) {
  return (
    <span className="flex items-center" style={{ height: 18, width: w, padding: "0 6px", gap: 4, border: `1px solid ${G.border}`, fontSize: 7.5, color: G.text, whiteSpace: "nowrap" }}>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ChevronDown style={{ width: 7, height: 7, color: G.grey }} aria-hidden="true" />
    </span>
  );
}

/** Looker Studio table: grey header, numbered rows, optional bar cells, pager. */
export function LookerTable({ cols, rows, total, pager }: { cols: { label: string; w: number; align?: "left" | "right" }[]; rows: ReactNode[][]; total?: ReactNode[]; pager: string }) {
  const cell = (c: { w: number; align?: "left" | "right" }, v: ReactNode, k: number, bold = false) => (
    <span key={k} className="truncate" style={{ width: c.w, flexShrink: 0, padding: "0 5px", textAlign: c.align ?? "left", fontWeight: bold ? 600 : 400, fontVariantNumeric: "tabular-nums" }}>
      {v}
    </span>
  );
  return (
    <div style={{ fontSize: 7.5, border: `1px solid ${G.line}` }}>
      <div className="flex items-center" style={{ height: 19, background: "#f1f3f4", fontWeight: 600, color: G.text }}>
        <span style={{ width: 16 }} />
        {cols.map((c, i) => cell(c, c.label, i, true))}
      </div>
      {rows.map((r, ri) => (
        <div key={ri} className="flex items-center" style={{ height: 17, borderTop: `1px solid ${G.line}` }}>
          <span style={{ width: 16, textAlign: "right", color: G.grey, fontSize: 7 }}>{ri + 1}.</span>
          {cols.map((c, i) => cell(c, r[i], i))}
        </div>
      ))}
      {total && (
        <div className="flex items-center" style={{ height: 18, borderTop: `1px solid ${G.border}`, background: "#fafafa" }}>
          <span style={{ width: 16 }} />
          {cols.map((c, i) => cell(c, total[i], i, true))}
        </div>
      )}
      <div className="flex items-center justify-end" style={{ height: 15, gap: 5, padding: "0 6px", fontSize: 6.5, color: G.grey, borderTop: `1px solid ${G.line}` }}>
        {pager}
        <ChevronLeft style={{ width: 7, height: 7, opacity: 0.4 }} aria-hidden="true" />
        <ChevronRight style={{ width: 7, height: 7, opacity: 0.4 }} aria-hidden="true" />
      </div>
    </div>
  );
}

/** A Looker Studio in-cell bar (table "bar" metric style). */
export function CellBar({ v, max, label, color = "#4285f4" }: { v: number; max: number; label: string; color?: string }) {
  return (
    <span className="flex items-center justify-end" style={{ gap: 4 }}>
      <span style={{ width: 34, height: 7, background: "transparent", display: "flex" }}>
        <span style={{ width: `${(v / max) * 100}%`, height: "100%", background: color }} />
      </span>
      <span style={{ width: 20, textAlign: "right" }}>{label}</span>
    </span>
  );
}

// 26 weeks, 2 Mar – 24 Aug 2026: launch in mid-March, optimisation from June.
const WK_QL = noisy({ n: 26, from: 10, to: 34, seed: 51, noise: 0.16, ease: 0.2, bumps: { 3: 0.8, 9: 1.2, 14: 0.82, 20: 1.12, 23: 0.88 } });
const WK_CPQL = noisy({ n: 26, from: 214, to: 122, seed: 52, noise: 0.07, ease: 0.35, bumps: { 3: 1.12, 14: 1.1, 23: 1.06 } });

const CHANNELS: [string, number, number, number, string, string][] = [
  ["Google Ads · Search", 108, 86, 39, sgd(10906.72), sgd(126.82)],
  ["LinkedIn Ads", 44, 31, 11, sgd(4810.52), sgd(155.18)],
  ["Organic search", 19, 11, 5, "S$0.00", "–"],
  ["Direct / referral", 11, 7, 4, "S$0.00", "–"],
  ["Google Ads · Display & PMax", 14, 7, 2, sgd(2032.69), sgd(290.38)],
];

const STAGES: [string, number][] = [
  ["Qualified", 142],
  ["Credit review", 88],
  ["Approved", 61],
  ["First drawdown", 38],
];

export const LeadDashboard: Screen = () => (
  <LookerStudio title="Invoice Interchange · Lead funnel (paid media)" url="lookerstudio.google.com/reporting/7c1e0d52-9b8a-4f7e-a0c3-51d2e8b4a6f1/page/p_4kx8r2mbld">
    <div className="flex items-center" style={{ gap: 8 }}>
      <Photo {...LOGO} w={64} h={19} />
      <span style={{ fontSize: 10, fontWeight: 600, color: NAVY, marginLeft: 4 }}>Lead funnel: click to funding</span>
      <span className="ml-auto flex items-center" style={{ gap: 6 }}>
        <LookerControl w={70}>Channel: All</LookerControl>
        <LookerControl>1 Aug 2026 - 31 Aug 2026</LookerControl>
      </span>
    </div>
    <div className="flex" style={{ gap: 6, marginTop: 8 }}>
      <LookerScore label="Applications" value="196" change="12.6%" />
      <LookerScore label="Qualified leads" value="142" change="10.1%" />
      <LookerScore label="Approved" value="61" change="7.0%" />
      <LookerScore label="Ad spend" value="S$17,749.93" change="3.4%" good={false} />
      <LookerScore label="Cost / qualified lead" value="S$125.00" change="6.1%" up={false} />
      <LookerScore label="Landing page CVR" value="7.8%" change="4.0%" />
    </div>
    <div className="flex" style={{ gap: 10, marginTop: 9 }}>
      <div className="min-w-0 flex-1">
        <p style={{ fontSize: 7.5, fontWeight: 500 }}>Qualified leads and cost per qualified lead, by week</p>
        <p className="flex items-center" style={{ gap: 8, fontSize: 6.5, color: G.grey, marginTop: 2 }}>
          <span className="flex items-center" style={{ gap: 3 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4285f4" }} />
            Qualified leads
          </span>
          <span className="flex items-center" style={{ gap: 3 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff7043" }} />
            Cost / qualified lead
          </span>
        </p>
        <div style={{ marginTop: 4 }}>
          <TimeChart
            w={372}
            h={78}
            size={6.5}
            series={[
              { values: WK_QL, color: "#4285f4", width: 1.4 },
              { values: WK_CPQL, color: "#ff7043", axis: "right", width: 1.4 },
            ]}
            xLabels={["2 Mar", "6 Apr", "11 May", "15 Jun", "20 Jul", "24 Aug"]}
            left={{ max: 40, ticks: 4, format: (n) => `${n}` }}
            right={{ max: 300, ticks: 4, format: (n) => `S$${n}` }}
          />
        </div>
      </div>
      <div className="shrink-0" style={{ width: 196 }}>
        <p style={{ fontSize: 7.5, fontWeight: 500 }}>HubSpot deal stage (August cohort)</p>
        <div className="flex flex-col" style={{ gap: 5, marginTop: 9 }}>
          {STAGES.map(([s, v]) => (
            <div key={s} className="flex items-center" style={{ gap: 5, fontSize: 7 }}>
              <span className="truncate" style={{ width: 56, color: G.grey }}>
                {s}
              </span>
              <span style={{ width: (v / 142) * 104, height: 12, background: "#4285f4" }} />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="flex" style={{ gap: 4, marginTop: 7, marginLeft: 61, width: 104, justifyContent: "space-between", fontSize: 6, color: G.grey }}>
          {[0, 50, 100, 150].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
    <div style={{ marginTop: 8 }}>
      <LookerTable
        cols={[
          { label: "Channel", w: 150 },
          { label: "Applications", w: 62, align: "right" },
          { label: "Qualified leads", w: 94, align: "right" },
          { label: "Approved", w: 50, align: "right" },
          { label: "Spend", w: 74, align: "right" },
          { label: "Cost / qualified lead", w: 96, align: "right" },
        ]}
        rows={CHANNELS.map(([c, a, q, ap, s, cpq]) => [c, a, <CellBar key="q" v={q} max={86} label={`${q}`} />, ap, s, cpq])}
        total={["Grand total", "196", "142", "61", sgd(17749.93), sgd(125)]}
        pager="1 - 5 / 5"
      />
    </div>
  </LookerStudio>
);

export const invoiceInterchangeScreens: Screen[] = [AdsCampaigns, SearchAd, LinkedInAd, LandingPage, LeadDashboard];

