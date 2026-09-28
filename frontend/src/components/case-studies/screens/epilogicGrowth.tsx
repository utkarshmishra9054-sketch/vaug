import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  House,
  Inbox,
  LayoutTemplate,
  ListFilter,
  Mail,
  Megaphone,
  MessageSquare,
  Minus,
  Package,
  Percent,
  Plus,
  Search,
  Settings,
  Store,
  Tag,
  UserRound,
  UsersRound,
  Workflow,
} from "lucide-react";

import type { Screen } from "./kit";
import { SerpRich } from "./seoKit";
import { BrowserChrome, CheckBox, G, GAdsChartCard, GAdsDot, GAdsTable, GLink, GoogleAdsShell, GoogleSerp, noisy, Photo, SerpResult, Stars, TimeChart, type Col } from "./tools";

/*
 * E-commerce growth for a skincare brand · New York (epi.logic, Shopify).
 * TODO(content): data illustrative. There is no confirmed result for this
 * engagement: every figure below (sales, ROAS, conversion rate, flows,
 * product name and price) must be confirmed with or replaced by the client.
 * Figures agree with the study: +48% online sales, 2.1% -> 3.0% conversion,
 * about a quarter of sales from email and SMS.
 */

const LOGO = { src: "/logos/epilogic.webp", img: { w: 470, h: 120 } };
const SITE = { src: "/sites/epilogic.webp", img: { w: 1440, h: 900 } };
const DOMAIN = "epilogicskincare.com";

/* 01 · Shopify admin Analytics ------------------------------------------ */

const SH = { text: "#303030", grey: "#616161", line: "#e3e3e3", bg: "#f1f1f1", nav: "#ebebeb", green: "#29845a", blue: "#1f8ae2", blueLight: "#a9cdf0" };

function ShopifyBag({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 6.5h15l-1.4 14.2a1.5 1.5 0 0 1-1.5 1.3H7.4a1.5 1.5 0 0 1-1.5-1.3z" fill="#95bf47" />
      <path d="M8.8 8V5.6a3.2 3.2 0 0 1 6.4 0V8" fill="none" stroke="#95bf47" strokeWidth="1.8" />
      <path d="M14.3 11.2c-.5-.4-1.3-.6-2-.6-1.4 0-2.3.8-2.3 1.8 0 2.2 3.6 1.7 3.6 3.4 0 .7-.7 1.2-1.6 1.2-.8 0-1.6-.3-2.1-.8" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ShopifyAdmin({ active, children }: { active: string; children: ReactNode }) {
  const nav: [string, typeof House, string[]?][] = [
    ["Home", House],
    ["Orders", Inbox],
    ["Products", Tag],
    ["Customers", UserRound],
    ["Content", LayoutTemplate],
    ["Analytics", ChartColumn, ["Reports", "Live View"]],
    ["Marketing", Megaphone],
    ["Discounts", Percent],
  ];
  return (
    <BrowserChrome url={`admin.shopify.com/store/epilogic-skincare/analytics`}>
      <div className="flex h-full flex-col" style={{ fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif", color: SH.text, background: "#1a1a1a" }}>
        <header className="flex shrink-0 items-center" style={{ height: 30, padding: "0 10px", gap: 8 }}>
          <ShopifyBag size={15} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: -0.3 }}>shopify</span>
          <span className="flex items-center" style={{ margin: "0 auto", width: 230, height: 19, borderRadius: 7, background: "#303030", border: "1px solid #4a4a4a", padding: "0 7px", gap: 5, fontSize: 7.5, color: "#b5b5b5" }}>
            <Search style={{ width: 8, height: 8 }} aria-hidden="true" />
            Search
            <span className="ml-auto" style={{ fontSize: 6.5, padding: "0 3px", borderRadius: 3, background: "#4a4a4a" }}>
              ⌘ K
            </span>
          </span>
          <Bell style={{ width: 10, height: 10, color: "#e3e3e3" }} aria-hidden="true" />
          <span className="flex items-center" style={{ gap: 5, padding: "2px 5px", borderRadius: 6, background: "#303030", color: "#e3e3e3", fontSize: 7.5 }}>
            <span className="flex items-center justify-center" style={{ width: 13, height: 13, borderRadius: 4, background: "#91d0ff", color: "#1a1a1a", fontSize: 6.5, fontWeight: 700 }}>
              EL
            </span>
            epi.logic
          </span>
        </header>
        <div className="flex min-h-0 flex-1" style={{ borderRadius: "10px 10px 0 0", overflow: "hidden", background: SH.bg }}>
          <nav className="shrink-0" style={{ width: 118, background: SH.nav, padding: "8px 6px", fontSize: 8, fontWeight: 550 }}>
            {nav.map(([t, I, sub]) => {
              const on = t === active;
              return (
                <div key={t}>
                  <div className="flex items-center" style={{ height: 19, padding: "0 6px", gap: 6, borderRadius: 6, background: on ? "#fafafa" : undefined, fontWeight: on ? 650 : 550 }}>
                    <I style={{ width: 10, height: 10, color: on ? SH.text : "#4a4a4a" }} aria-hidden="true" />
                    {t}
                  </div>
                  {on &&
                    sub?.map((x) => (
                      <div key={x} style={{ height: 17, lineHeight: "17px", paddingLeft: 22, color: SH.grey, fontWeight: 450 }}>
                        {x}
                      </div>
                    ))}
                </div>
              );
            })}
            <p className="flex items-center" style={{ fontSize: 7, color: SH.grey, margin: "10px 6px 3px", gap: 2 }}>
              Sales channels
              <ChevronRight style={{ width: 7, height: 7 }} aria-hidden="true" />
            </p>
            {[
              [Store, "Online Store"],
              [Package, "Shop"],
            ].map(([I, t]) => {
              const Icon = I as typeof Store;
              return (
                <div key={t as string} className="flex items-center" style={{ height: 19, padding: "0 6px", gap: 6 }}>
                  <Icon style={{ width: 10, height: 10, color: "#4a4a4a" }} aria-hidden="true" />
                  {t as string}
                </div>
              );
            })}
            <div className="flex items-center" style={{ height: 19, padding: "0 6px", gap: 6, marginTop: 116 }}>
              <Settings style={{ width: 10, height: 10, color: "#4a4a4a" }} aria-hidden="true" />
              Settings
            </div>
          </nav>
          <main className="min-w-0 flex-1 overflow-hidden" style={{ padding: "10px 14px 0" }}>
            {children}
          </main>
        </div>
      </div>
    </BrowserChrome>
  );
}

function ShCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 1px 0 rgb(26 26 26 / 0.07), inset 0 0 0 1px rgb(0 0 0 / 0.06)", padding: "8px 10px", ...style }}>{children}</div>;
}

function Up({ v }: { v: string }) {
  return (
    <span className="inline-flex items-center" style={{ color: SH.green, fontSize: 7, gap: 1, fontWeight: 500 }}>
      <ArrowUpRight style={{ width: 7, height: 7 }} strokeWidth={2.5} aria-hidden="true" />
      {v}
    </span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center" style={{ height: 18, padding: "0 7px", borderRadius: 7, background: "#fff", boxShadow: "inset 0 0 0 1px #d4d4d4, 0 1px 0 #d4d4d4", fontSize: 7.5, fontWeight: 550, gap: 4, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

// Daily total sales, 1 Jul – 28 Sep 2025, and the previous 90 days (dashed).
const SALES = noisy({ n: 90, from: 3500, to: 5000, seed: 91, noise: 0.16, weekly: -0.08, weekStart: 1, bumps: { 18: 1.5, 19: 1.35, 46: 1.4, 63: 1.62, 64: 1.3, 80: 1.28 } });
const PREV = noisy({ n: 90, from: 2900, to: 2920, seed: 92, noise: 0.16, weekly: -0.06, bumps: { 30: 1.45, 55: 1.3 } });

const TILES: [string, string, string, number[]][] = [
  ["Gross sales", "$421,715.40", "48%", noisy({ n: 20, from: 10, to: 16, seed: 93, noise: 0.12 })],
  ["Returning customer rate", "31.4%", "22%", noisy({ n: 20, from: 26, to: 32, seed: 94, noise: 0.05 })],
  ["Orders fulfilled", "5,106", "41%", noisy({ n: 20, from: 50, to: 72, seed: 95, noise: 0.15 })],
  ["Orders", "5,214", "43%", noisy({ n: 20, from: 50, to: 73, seed: 96, noise: 0.14 })],
];

function Spark({ v }: { v: number[] }) {
  const mx = Math.max(...v);
  const mn = Math.min(...v);
  const pts = v.map((x, i) => `${(i / (v.length - 1)) * 34},${14 - ((x - mn) / (mx - mn || 1)) * 12}`).join(" ");
  return (
    <svg width={34} height={15} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={SH.blue} strokeWidth={1.1} />
    </svg>
  );
}

const FUNNEL: [string, string, string][] = [
  ["Sessions", "173,800", "100%"],
  ["Added to cart", "15,468", "8.9%"],
  ["Reached checkout", "7,995", "4.6%"],
  ["Completed checkout", "5,214", "3.0%"],
];

export const ShopifyAnalytics: Screen = () => (
  <ShopifyAdmin active="Analytics">
    <div className="flex items-center" style={{ gap: 6 }}>
      <ChartColumn style={{ width: 11, height: 11 }} aria-hidden="true" />
      <span style={{ fontSize: 12, fontWeight: 700 }}>Analytics</span>
      <span className="ml-auto" style={{ fontSize: 7, color: SH.grey }}>
        Last refreshed: 10:42 AM
      </span>
    </div>
    <div className="flex items-center" style={{ gap: 5, marginTop: 7 }}>
      <Pill>
        <CalendarDays style={{ width: 8, height: 8 }} aria-hidden="true" />
        Last 90 days
      </Pill>
      <Pill>Jul 1–Sep 28, 2025</Pill>
      <Pill>Compare: Apr 2–Jun 30, 2025</Pill>
      <Pill>USD $</Pill>
    </div>
    <ShCard style={{ marginTop: 7, padding: 0, display: "flex" }}>
      {TILES.map(([l, v, d, s], i) => (
        <div key={l} style={{ flex: 1, minWidth: 0, overflow: "hidden", padding: "7px 9px", borderRight: i < 3 ? `1px solid ${SH.line}` : undefined }}>
          <p style={{ fontSize: 7.5, fontWeight: 550, textDecoration: "underline dotted #b5b5b5", textUnderlineOffset: 2 }}>{l}</p>
          <div className="flex items-end" style={{ marginTop: 3, gap: 4 }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap" }}>{v}</span>
            <Up v={d} />
            <span className="ml-auto">
              <Spark v={s} />
            </span>
          </div>
        </div>
      ))}
    </ShCard>
    <div className="flex" style={{ gap: 8, marginTop: 8 }}>
      <ShCard style={{ flex: 1.7 }}>
        <p style={{ fontSize: 7.5, fontWeight: 550, textDecoration: "underline dotted #b5b5b5", textUnderlineOffset: 2 }}>Total sales over time</p>
        <p className="flex items-center" style={{ gap: 5, marginTop: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>$386,904.12</span>
          <Up v="48%" />
        </p>
        <div style={{ marginTop: 5 }}>
          <TimeChart
            w={250}
            h={116}
            series={[
              { values: PREV, color: SH.blueLight, dashed: true, width: 1.2 },
              { values: SALES, color: SH.blue, width: 1.4 },
            ]}
            xLabels={["Jul 1", "Jul 31", "Aug 30", "Sep 28"]}
            left={{ max: 9000, ticks: 3, format: (n) => (n ? `$${n / 1000}K` : "$0") }}
            size={6.5}
            font="Inter, sans-serif"
            labelColor={SH.grey}
            grid="#ebebeb"
            baseline="#d4d4d4"
          />
        </div>
        <div className="flex" style={{ gap: 10, fontSize: 6.5, color: SH.grey, marginTop: 5 }}>
          <span className="flex items-center" style={{ gap: 3 }}>
            <span style={{ width: 8, height: 2, background: SH.blue }} />
            Jul 1–Sep 28, 2025
          </span>
          <span className="flex items-center" style={{ gap: 3 }}>
            <span style={{ width: 8, height: 0, borderTop: `1.5px dashed ${SH.blueLight}` }} />
            Apr 2–Jun 30, 2025
          </span>
        </div>
      </ShCard>
      <ShCard style={{ flex: 1 }}>
        <p style={{ fontSize: 7.5, fontWeight: 550, textDecoration: "underline dotted #b5b5b5", textUnderlineOffset: 2 }}>Conversion rate</p>
        <p className="flex items-center" style={{ gap: 5, marginTop: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>3.0%</span>
          <Up v="43%" />
        </p>
        <div style={{ marginTop: 6 }}>
          {FUNNEL.map(([l, n, p], i) => (
            <div key={l} style={{ padding: "4px 0", borderTop: i ? `1px solid ${SH.line}` : undefined }}>
              <p className="flex" style={{ fontSize: 7.5, fontWeight: 550 }}>
                {l}
                <span className="ml-auto">{p}</span>
              </p>
              <p className="flex" style={{ fontSize: 6.8, color: SH.grey, marginTop: 1 }}>
                {n} sessions
              </p>
              <div style={{ height: 4, borderRadius: 2, background: "#ebebeb", marginTop: 3, overflow: "hidden" }}>
                <div style={{ width: i === 0 ? "100%" : `${Math.max(3, parseFloat(p) * 3)}%`, height: "100%", background: SH.blue }} />
              </div>
            </div>
          ))}
        </div>
      </ShCard>
    </div>
  </ShopifyAdmin>
);

/* 02 · Google Ads: Shopping and Performance Max ------------------------- */

const ACOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 118 },
  { label: "Budget", w: 50 },
  { label: "Status", w: 52 },
  { label: "Campaign type", w: 54 },
  { label: "Clicks", w: 40, align: "right" },
  { label: "Cost", w: 52, align: "right" },
  { label: "Conversions", w: 50, align: "right" },
  { label: "Conv. value", w: 56, align: "right" },
  { label: "Conv. value / cost", w: 44, align: "right" },
];

const AROWS: [string, string, string, string, "enabled" | "paused", string, string, string, string, string][] = [
  ["EL_PMax_Feed_AllProducts", "$220.00/day", "Eligible", "Performance Max", "enabled", "21,904", "$17,842.61", "1,089.42", "$68,215.40", "3.82"],
  ["EL_Shopping_Serums_Oils", "$120.00/day", "Eligible", "Shopping", "enabled", "9,870", "$9,116.30", "432.18", "$29,440.92", "3.23"],
  ["EL_PMax_Bestsellers_FaceOil", "$90.00/day", "Eligible", "Performance Max", "enabled", "6,412", "$7,020.55", "341.60", "$25,672.10", "3.66"],
  ["EL_Search_Brand", "$40.00/day", "Eligible", "Search", "enabled", "7,110", "$2,318.74", "298.05", "$21,884.66", "9.44"],
  ["EL_Search_NonBrand_FaceOil", "$60.00/day", "Limited by budget", "Search", "enabled", "3,021", "$4,981.20", "71.33", "$5,457.07", "1.10"],
  ["EL_Shopping_Cleansers", "$35.00/day", "Paused", "Shopping", "paused", "612", "$512.08", "4.00", "$268.00", "0.52"],
];

const VALUE = noisy({ n: 90, from: 1250, to: 2050, seed: 97, noise: 0.18, weekly: -0.06, bumps: { 18: 1.4, 63: 1.55, 64: 1.3 } });
const COST = noisy({ n: 90, from: 420, to: 500, seed: 98, noise: 0.08, bumps: { 63: 1.2 } });

const wrap = (t: string) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1 }}>{t}</span>;

export const AdsPerformance: Screen = () => (
  <GoogleAdsShell account="epi.logic" customerId="731-208-4496" title="Campaigns" dateRange="1 Jul – 28 Sep 2025" nav={null} url="ads.google.com/aw/campaigns?ocid=731208449">
    <GAdsChartCard
      w={548}
      h={44}
      metrics={[
        { label: "Conv. value", value: "$151K", on: true },
        { label: "Cost", value: "$41.8K", on: true },
        { label: "Conv. value / cost", value: "3.61" },
        { label: "Conversions", value: "2.24K" },
      ]}
      series={[VALUE, COST]}
      xLabels={["1 Jul 2025", "28 Sep 2025"]}
      left={{ max: 4000, ticks: 2, format: (n) => (n ? `$${n / 1000}K` : "$0") }}
      right={{ max: 800, ticks: 2, format: (n) => `$${n}` }}
    />
    <GAdsTable
      cols={ACOLS}
      rowH={21}
      rows={AROWS.map(([name, budget, status, type, state, ...m]) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={state} />,
        <GLink key="n">{name}</GLink>,
        budget,
        status === "Limited by budget" ? wrap(status) : <span style={{ color: status === "Paused" ? G.grey : G.text }}>{status}</span>,
        type === "Performance Max" ? wrap(type) : type,
        ...m,
      ])}
      total={["", "", "Total: all campaigns", "", "", "", "48,929", "$41,791.48", "2,236.58", "$150,938.15", "3.61"]}
    />
  </GoogleAdsShell>
);

/* 03 · Google results for "multivitamin face oil" ----------------------- */

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 7, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

export const SkincareSerp: Screen = () => (
  <GoogleSerp query="multivitamin face oil" tabs={["All", "Shopping", "Images", "Videos", "Short videos", "Forums", "More"]}>
    <SerpResult
      r={{
        site: "Reddit · r/SkincareAddiction",
        url: "https://www.reddit.com › r › SkincareAddiction",
        favicon: <Fav bg="#ff4500" t="r" />,
        title: "Anyone tried a multivitamin face oil? Worth it over a serum?",
        date: "30+ comments · 4 months ago",
        desc: "I've been using a vitamin oil at night for dry patches and it's the first thing that hasn't pilled under my moisturiser...",
      }}
    />
    <SerpResult
      r={{
        site: "Byrdie",
        url: "https://www.byrdie.com › best-face-oils",
        favicon: <Fav bg="#111" t="B" />,
        title: "The 14 Best Face Oils for Every Skin Type, Tested",
        date: "12 Aug 2025",
        desc: "We tested face oils with vitamins A, C and E, squalane and rosehip on dry, oily and sensitive skin...",
      }}
    />
    <SerpRich
      site="epi.logic"
      url={`https://${DOMAIN} › products › daily-dose`}
      favicon={<Photo {...LOGO} crop={{ x: 0, y: 30, w: 64, h: 64 }} w={12} h={12} bg="#fff" />}
      title="daily dose | Multi-Vitamin Face Oil – epi.logic"
      desc="A lightweight face oil with vitamins A, C, E and F for dry, dull skin. Because skin needs more than just one vitamin."
      rating={4.9}
      reviews="17"
      price="$68.00"
      stock="In stock"
      extra="Free delivery over $75"
    />
    <SerpResult
      r={{
        site: "Sephora",
        url: "https://www.sephora.com › shop › face-oils",
        favicon: <Fav bg="#000" t="S" />,
        title: "Face Oils | Sephora",
        desc: "Shop face oils for glowing skin, including vitamin C oils, rosehip and squalane.",
      }}
    />
  </GoogleSerp>
);

/* 04 · Product page on the Shopify store -------------------------------- */

export const ProductPage: Screen = () => (
  <BrowserChrome url={`${DOMAIN}/products/daily-dose`}>
    <div className="h-full" style={{ fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif", color: "#111", background: "#fff" }}>
      <div className="flex items-center justify-center" style={{ height: 15, background: "#8fb0c4", color: "#fff", fontSize: 6.8, fontWeight: 700, letterSpacing: 0.3 }}>
        FREE SHIPPING ON US ORDERS $75+
      </div>
      <header className="relative flex items-center" style={{ height: 24, background: "#000", color: "#fff", padding: "0 10px", gap: 5 }}>
        <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", color: "#000" }}>
          <Minus style={{ width: 6, height: 6 }} aria-hidden="true" />
        </span>
        <span style={{ fontSize: 8, fontWeight: 700 }}>Shop</span>
        <span className="absolute" style={{ left: "50%", marginLeft: -22 }}>
          <Photo {...LOGO} w={44} h={11.2} style={{ filter: "invert(1)" }} />
        </span>
        <span className="ml-auto flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", color: "#000", fontSize: 6.5, fontWeight: 700 }}>
          0
        </span>
      </header>
      <div className="flex" style={{ height: 337 }}>
        <div className="flex" style={{ width: 330, gap: 2, background: "#f2f2f2" }}>
          <div className="flex flex-col" style={{ width: 40, gap: 2, padding: 4 }}>
            {[
              { x: 930, y: 290, w: 150, h: 320 },
              { x: 0, y: 650, w: 360, h: 250 },
              { x: 740, y: 150, w: 660, h: 500 },
            ].map((c, i) => (
              <span key={i} style={{ outline: i === 0 ? "1px solid #111" : undefined, outlineOffset: 1 }}>
                <Photo {...SITE} crop={c} w={32} h={40} />
              </span>
            ))}
          </div>
          <Photo {...SITE} crop={{ x: 880, y: 250, w: 280, h: 390 }} w={286} h={337} />
        </div>
        <div className="min-w-0 flex-1" style={{ padding: "16px 24px 0" }}>
          <p style={{ fontSize: 7, color: "#6b6b6b" }}>Shop / Face oils</p>
          <h1 style={{ fontSize: 17, fontWeight: 700, marginTop: 5, letterSpacing: -0.3 }}>daily dose</h1>
          <p style={{ fontSize: 9, marginTop: 1 }}>Multi-Vitamin Face Oil · 30 ml</p>
          <p className="flex items-center" style={{ gap: 4, fontSize: 7.5, marginTop: 5 }}>
            <Stars rating={4.9} size={7.5} color="#111" />
            <span style={{ fontStyle: "italic" }}>(17)</span>
          </p>
          <p style={{ fontSize: 8, fontStyle: "italic", marginTop: 5, lineHeight: 1.45, color: "#333" }}>Because skin needs more than just one vitamin.</p>
          <p style={{ fontSize: 12, fontWeight: 700, marginTop: 7 }}>$68.00</p>
          <div style={{ marginTop: 8, fontSize: 8 }}>
            {[
              ["Subscribe & save 15%", "$57.80", "Delivered every 60 days · skip or cancel anytime", true],
              ["One-time purchase", "$68.00", "", false],
            ].map(([t, p, s, on]) => (
              <div key={t as string} className="flex" style={{ padding: "6px 8px", border: `1px solid ${on ? "#111" : "#d4d4d4"}`, marginTop: on ? 0 : 4, gap: 6 }}>
                <span className="flex items-center justify-center" style={{ width: 9, height: 9, borderRadius: "50%", border: "1px solid #111", marginTop: 1, flexShrink: 0 }}>
                  {on && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#111" }} />}
                </span>
                <span className="flex-1">
                  <span className="flex">
                    <span style={{ fontWeight: 700 }}>{t as string}</span>
                    <span className="ml-auto">{p as string}</span>
                  </span>
                  {s && <span style={{ display: "block", fontSize: 6.8, color: "#6b6b6b", marginTop: 2 }}>{s as string}</span>}
                </span>
              </div>
            ))}
          </div>
          <span className="flex items-center justify-center" style={{ marginTop: 9, height: 24, background: "#000", color: "#fff", fontSize: 8.5, fontWeight: 700 }}>
            Add to cart — $57.80
          </span>
          <p style={{ fontSize: 7, color: "#6b6b6b", marginTop: 5 }}>Free shipping on US orders over $75.</p>
          <div style={{ marginTop: 8, fontSize: 8.5, fontWeight: 700 }}>
            {["Key ingredients", "How to use", "Full ingredient list"].map((t) => (
              <div key={t} className="flex items-center" style={{ height: 22, borderTop: "1px solid #d4d4d4" }}>
                {t}
                <Plus style={{ width: 8, height: 8, marginLeft: "auto" }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

/* 05 · Klaviyo flows ------------------------------------------------------ */

const KL = { text: "#232426", grey: "#6f7275", line: "#e7e7e7", bg: "#f7f7f7" };

function KlaviyoLogo() {
  return (
    <span className="flex items-center" style={{ gap: 1 }}>
      <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: -0.4, color: KL.text }}>klaviyo</span>
      <svg width={7} height={6} viewBox="0 0 10 8" aria-hidden="true" style={{ marginTop: -5 }}>
        <path d="M0 0h10L7.5 4 10 8H0z" fill={KL.text} />
      </svg>
    </span>
  );
}

// [flow, channels, trigger, recipients, open rate, click rate, placed order rate, revenue, updated]
const FLOWS: [string, ("email" | "sms")[], string, string, string, string, string, string, string][] = [
  ["Welcome Series – Protocols & Perks", ["email", "sms"], "Added to list: Newsletter", "14,208", "58.14%", "4.92%", "6.84%", "$31,806.20", "Sep 9, 2025"],
  ["Abandoned Checkout", ["email", "sms"], "Checkout Started", "9,872", "61.30%", "8.10%", "7.92%", "$28,944.72", "Aug 21, 2025"],
  ["Replenishment – Face Oils (55 days)", ["email"], "Placed Order", "3,614", "52.77%", "6.44%", "9.38%", "$12,402.55", "Aug 4, 2025"],
  ["Browse Abandonment", ["email"], "Viewed Product", "18,340", "49.21%", "3.12%", "1.41%", "$7,690.18", "Jul 28, 2025"],
  ["Win-back – 120 days", ["email", "sms"], "Placed Order", "2,911", "38.42%", "1.96%", "2.23%", "$3,902.16", "Jul 15, 2025"],
  ["Post-Purchase – How to use", ["email"], "Fulfilled Order", "5,106", "66.03%", "3.71%", "1.21%", "$2,288.40", "Jul 15, 2025"],
  ["Sunset – Unengaged 180 days", ["email"], "Added to segment", "1,487", "12.64%", "0.33%", "0.07%", "$68.00", "Jul 2, 2025"],
];

const KCOLS: { label: string; w: number; right?: boolean }[] = [
  { label: "Flow", w: 150 },
  { label: "Trigger", w: 84 },
  { label: "Status", w: 38 },
  { label: "Recipients", w: 44, right: true },
  { label: "Open rate", w: 42, right: true },
  { label: "Click rate", w: 38, right: true },
  { label: "Placed Order", w: 46, right: true },
  { label: "Revenue", w: 56, right: true },
];

export const KlaviyoFlows: Screen = () => (
  <BrowserChrome url="www.klaviyo.com/flows">
    <div className="flex h-full" style={{ fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif", color: KL.text, background: "#fff" }}>
      <nav className="shrink-0" style={{ width: 112, borderRight: `1px solid ${KL.line}`, padding: "10px 8px", fontSize: 8 }}>
        <KlaviyoLogo />
        <div className="flex items-center" style={{ marginTop: 10, height: 18, gap: 4, padding: "0 5px", borderRadius: 5, border: `1px solid ${KL.line}`, fontSize: 7.5 }}>
          epi.logic
          <ChevronDown style={{ width: 7, height: 7, marginLeft: "auto" }} aria-hidden="true" />
        </div>
        <div style={{ marginTop: 8 }}>
          {(
            [
              [House, "Home"],
              [Megaphone, "Campaigns"],
              [Workflow, "Flows"],
              [LayoutTemplate, "Sign-up forms"],
              [UsersRound, "Audience"],
              [Mail, "Content"],
              [ChartColumn, "Analytics"],
              [MessageSquare, "Conversations"],
            ] as [typeof House, string][]
          ).map(([I, t]) => {
            const on = t === "Flows";
            return (
              <div key={t} className="flex items-center" style={{ height: 20, padding: "0 5px", gap: 6, borderRadius: 5, background: on ? "#f0f0f0" : undefined, fontWeight: on ? 600 : 400 }}>
                <I style={{ width: 10, height: 10 }} aria-hidden="true" />
                {t}
              </div>
            );
          })}
        </div>
      </nav>
      <main className="min-w-0 flex-1" style={{ padding: "10px 14px 0", background: "#fff" }}>
        <div className="flex items-center">
          <span style={{ fontSize: 14, fontWeight: 600 }}>Flows</span>
          <span className="ml-auto flex items-center" style={{ gap: 5 }}>
            <span className="flex items-center" style={{ height: 19, padding: "0 8px", borderRadius: 5, border: "1px solid #c9c9c9", fontSize: 7.5, fontWeight: 600, gap: 3 }}>
              Options
              <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
            </span>
            <span className="flex items-center" style={{ height: 19, padding: "0 9px", borderRadius: 5, background: "#1c1c1c", color: "#fff", fontSize: 7.5, fontWeight: 600 }}>
              Create flow
            </span>
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 5, marginTop: 9, fontSize: 7.5 }}>
          <span className="flex items-center" style={{ width: 130, height: 19, borderRadius: 5, border: "1px solid #c9c9c9", padding: "0 6px", gap: 4, color: KL.grey }}>
            <Search style={{ width: 8, height: 8 }} aria-hidden="true" />
            Search flows
          </span>
          {["Tags", "Status", "Channel", "Trigger"].map((t) => (
            <span key={t} className="flex items-center" style={{ height: 19, padding: "0 7px", borderRadius: 5, border: "1px solid #c9c9c9", gap: 3 }}>
              {t}
              <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
            </span>
          ))}
          <span className="ml-auto flex items-center" style={{ gap: 3, color: KL.grey }}>
            <ListFilter style={{ width: 8, height: 8 }} aria-hidden="true" />
            Last 90 days · Placed Order
          </span>
        </div>
        <div style={{ marginTop: 9, fontSize: 7.5, border: `1px solid ${KL.line}`, borderRadius: 6, overflow: "hidden" }}>
          <div className="flex items-center" style={{ height: 24, background: KL.bg, color: KL.grey, fontWeight: 600, borderBottom: `1px solid ${KL.line}` }}>
            {KCOLS.map((c) => (
              <span key={c.label} style={{ width: c.w, padding: "0 6px", textAlign: c.right ? "right" : "left", flexShrink: 0 }}>
                {c.label}
              </span>
            ))}
          </div>
          {FLOWS.map(([name, ch, trig, rec, open, click, po, rev, upd]) => (
            <div key={name} className="flex items-center" style={{ height: 33, borderBottom: `1px solid ${KL.line}` }}>
              <span style={{ width: KCOLS[0].w, padding: "0 6px", flexShrink: 0, overflow: "hidden" }}>
                <span className="block truncate" style={{ fontWeight: 600 }}>
                  {name}
                </span>
                <span className="flex items-center" style={{ gap: 4, color: KL.grey, fontSize: 6.5, marginTop: 2 }}>
                  {ch.map((c) => (
                    <span key={c} className="flex items-center" style={{ gap: 2 }}>
                      {c === "email" ? <Mail style={{ width: 7, height: 7 }} aria-hidden="true" /> : <MessageSquare style={{ width: 7, height: 7 }} aria-hidden="true" />}
                      {c === "email" ? "Email" : "SMS"}
                    </span>
                  ))}
                  <span>· Updated {upd}</span>
                </span>
              </span>
              <span className="truncate" style={{ width: KCOLS[1].w, padding: "0 6px", flexShrink: 0, color: KL.grey }}>
                {trig}
              </span>
              <span style={{ width: KCOLS[2].w, padding: "0 6px", flexShrink: 0 }}>
                <span style={{ padding: "1px 5px", borderRadius: 4, background: "#dcf4e6", color: "#12603a", fontWeight: 600, fontSize: 7 }}>Live</span>
              </span>
              {[rec, open, click, po, rev].map((v, i) => (
                <span key={i} style={{ width: KCOLS[3 + i].w, padding: "0 6px", flexShrink: 0, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: i === 4 ? 600 : 400 }}>
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  </BrowserChrome>
);

export const epilogicGrowthScreens: Screen[] = [ShopifyAnalytics, AdsPerformance, SkincareSerp, ProductPage, KlaviyoFlows];
