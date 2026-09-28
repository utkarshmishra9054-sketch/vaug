import { ChevronDown, ChevronRight, Heart, Minus, Plus, Search, ShoppingBag, Truck, User } from "lucide-react";

import type { Screen } from "./kit";
import { Diff, SEM, SemButton, SemrushShell, SemTable, SemTabs, type SemCol } from "./seoKit";
import { BrowserChrome, FONT, G, GA4Card, GA4Shell, GA4Table, noisy, num, Photo, SearchConsole, Stars, TimeChart, type Col } from "./tools";

/* CBD2Heal (C2H) · SEO for a Canadian CBD store.
   From the study: average position 62 -> 6; 79% of traffic from organic search;
   #1 for four primary keywords and #2 for "best cbd detox bath bomb" (volumes
   3500 / 7800 / 2200 / 1100 / 2400 and URLs from the real ranking sheet).
   The domain (cbd2heal.ca) and product imagery come from the real storefront.
   TODO(content): illustrative — the tracking period (Apr 2022 – Mar 2023), every
   click, session, revenue, price and review figure, and the start positions. */

const DOMAIN = "cbd2heal.ca";
const STORE = { src: "/case-studies/seo-cbd-ecommerce-canada/storefront.webp", img: { w: 863, h: 447 } };
const PINK = "#ec8d89";
const AMBER = "#f8b660";

/* 01 · Semrush Position Tracking: average position 62 -> 6 --------- */

// TODO(content): illustrative weekly series; start (62) and end (6) are from the study.
const AVG_POS = noisy({ n: 52, from: 62, to: 6, seed: 41, noise: 0.05, ease: 0.35, bumps: { 0: 1, 1: 1.02, 2: 1.04, 3: 1.03, 9: 1.08, 10: 1.06, 27: 1.12, 28: 1.07 } }).map((v, i) => (i < 3 ? 62 - i * 0.4 : i === 51 ? 6.04 : Math.max(5.6, v)));

const PT_ROWS: [string, number, number, string, string, string][] = [
  ["pure cbd oil tincture in canada", 71, 1, "31.20%", "3,500", "/shop/pure-cbd-oil-tincture/"],
  ["pure cbd gel capsules 500mg", 58, 1, "31.20%", "7,800", "/shop/pure-cbd-gel-capsules/"],
  ["cbd healing salve cream", 64, 1, "31.20%", "2,200", "/shop/cbd-healing-salve/"],
  ["cbd2heal broad spectrum", 44, 1, "31.20%", "1,100", "/shop/broad-spectrum-cbd-oil/"],
  ["best cbd detox bath bomb", 83, 2, "24.70%", "2,400", "/shop/cbd2heal-cbd-detox-bath-bomb/"],
  ["cbd bath bombs canada", 6, 3, "18.60%", "1,300", "/product-category/bath-bombs/"],
  ["cbd oil for dogs canada", 9, 4, "13.40%", "1,900", "/product-category/pets/"],
];

const PT_COLS: SemCol[] = [
  { label: "Keyword", w: 150 },
  { label: "Pos. Apr 4", w: 50, align: "right" },
  { label: "Pos. Mar 27", w: 54, align: "right" },
  { label: "Diff", w: 38, align: "right" },
  { label: "Visibility", w: 50, align: "right" },
  { label: "Volume", w: 44, align: "right" },
  { label: "URL", w: 160 },
];

function PtTile({ label, value, diff, on = false }: { label: string; value: string; diff: string; on?: boolean }) {
  return (
    <div style={{ flex: 1, padding: "5px 8px", borderRight: `1px solid ${SEM.line}`, background: on ? "#fff" : SEM.head, boxShadow: on ? `inset 0 2px 0 ${SEM.blue}` : undefined, borderBottom: on ? "1px solid #fff" : `1px solid ${SEM.line}` }}>
      <p style={{ fontSize: 7, color: SEM.grey }}>{label}</p>
      <p className="flex items-baseline" style={{ gap: 5, marginTop: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{value}</span>
        <span style={{ fontSize: 7.5, color: SEM.green, fontWeight: 500 }}>{diff}</span>
      </p>
    </div>
  );
}

function Select({ children }: { children: string }) {
  return (
    <span className="flex items-center" style={{ height: 17, padding: "0 6px", borderRadius: 4, border: `1px solid ${SEM.border}`, fontSize: 7.5, gap: 3, whiteSpace: "nowrap" }}>
      {children}
      <ChevronDown style={{ width: 7, height: 7, color: SEM.grey }} aria-hidden="true" />
    </span>
  );
}

export const PositionTracking: Screen = () => (
  <SemrushShell
    url="www.semrush.com/tracking/overview.html?projectId=7719204"
    active="Position Tracking"
    crumbs={["Dashboard", "Projects", DOMAIN, "Position Tracking"]}
    title={<>Position Tracking: {DOMAIN}</>}
    right={
      <>
        <SemButton>Export</SemButton>
        <SemButton>Settings</SemButton>
      </>
    }
  >
    <div className="flex items-center" style={{ marginTop: 5, gap: 5 }}>
      <Select>Google.ca · Canada · English</Select>
      <Select>Desktop</Select>
      <Select>Apr 4, 2022 – Mar 27, 2023</Select>
      <span style={{ marginLeft: "auto", fontSize: 7, color: SEM.grey }}>42 keywords tracked</span>
    </div>
    <SemTabs tabs={["Landscape", "Overview", "Rankings Distribution", "Pages", "Tags", "Competitors Discovery", "Featured Snippets", "Devices & Locations"]} active={1} />
    <div style={{ marginTop: 6, border: `1px solid ${SEM.line}`, borderRadius: 4, overflow: "hidden" }}>
      <div className="flex">
        <PtTile label="Visibility" value="41.87%" diff="+38.92" />
        <PtTile label="Estimated traffic" value="2,974" diff="+2,811" />
        <PtTile label="Average position" value="6.04" diff="+55.96" on />
      </div>
      <div style={{ padding: "6px 8px 4px" }}>
        <div className="flex items-center" style={{ gap: 5, fontSize: 7, color: SEM.grey, marginBottom: 3 }}>
          <span style={{ width: 7, height: 7, borderRadius: 2, background: SEM.blue }} />
          <span style={{ color: SEM.text }}>{DOMAIN}</span>
          <span style={{ marginLeft: "auto" }}>Daily · Weekly</span>
        </div>
        <TimeChart
          w={480}
          h={84}
          font={SEM.font}
          labelColor={SEM.grey}
          grid={SEM.line}
          baseline={SEM.line}
          series={[{ values: AVG_POS.map((v) => -v), color: SEM.blue, width: 1.6 }]}
          xLabels={["Apr 4", "Jun 1", "Aug 1", "Oct 1", "Dec 1", "Feb 1", "Mar 27"]}
          left={{ min: -80, max: 0, ticks: 4, format: (n) => (n === 0 ? "1" : `${-n}`) }}
          size={7}
        />
      </div>
    </div>
    <SemTable
      style={{ marginTop: 6 }}
      rowH={18}
      cols={PT_COLS}
      rows={PT_ROWS.map(([kw, a, b, vis, vol, url]) => [
        <span key="k" style={{ color: SEM.link }}>
          {kw}
        </span>,
        a,
        <b key="b" style={{ fontWeight: 600 }}>
          {b}
        </b>,
        <Diff key="d" n={a - b} />,
        vis,
        vol,
        <span key="u" className="truncate" style={{ color: SEM.link }}>
          {DOMAIN}
          {url}
        </span>,
      ])}
    />
  </SemrushShell>
);

/* 02 · Search Console: primary queries at positions 1-2 ------------- */

// TODO(content): illustrative daily clicks and positions (1 Jan – 31 Mar 2023).
const GSC_CLICKS = noisy({ n: 90, from: 88, to: 122, seed: 43, noise: 0.14, weekly: 0.1, weekStart: 6, bumps: { 44: 1.28, 45: 1.18, 70: 0.8 } });
const GSC_POS = noisy({ n: 90, from: 6.9, to: 5.8, seed: 44, noise: 0.07, decimals: 1 });

const GSC_ROWS: [string, string, string][] = [
  ["pure cbd oil tincture in canada", "1,284", "1.1"],
  ["pure cbd gel capsules 500mg", "1,106", "1.2"],
  ["cbd2heal", "874", "1"],
  ["cbd healing salve cream", "612", "1.3"],
  ["best cbd detox bath bomb", "498", "2.1"],
  ["cbd2heal broad spectrum", "341", "1"],
  ["cbd oil canada", "287", "7.4"],
  ["cbd bath bombs canada", "219", "3.2"],
];

const GSC_COLS: Col[] = [
  { label: "Top queries", w: 300 },
  { label: "↓ Clicks", w: 90, align: "right" },
  { label: "Position", w: 90, align: "right" },
];

export const SearchConsoleQueries: Screen = () => (
  <SearchConsole
    property={`https://${DOMAIN}/`}
    metrics={[
      { label: "Total clicks", value: "9.41K", on: true },
      { label: "Total impressions", value: "214K" },
      { label: "Average CTR", value: "4.4%" },
      { label: "Average position", value: "6.2", on: true },
    ]}
    series={[GSC_CLICKS, GSC_POS.map((v) => -v)]}
    xLabels={["1/1/23", "1/22/23", "2/12/23", "3/5/23", "3/26/23"]}
    left={{ max: 200, ticks: 4, format: (n) => `${n}` }}
    right={{ min: -12, max: 0, format: (n) => `${-n}` }}
    cols={GSC_COLS}
    rows={GSC_ROWS.map(([q, c, p]) => [q, c, p])}
  />
);

/* 03 · GA4 traffic acquisition: 79% organic -------------------------- */

// TODO(content): illustrative sessions, conversions and revenue; the 79% organic share is from the study.
const CH: { name: string; color: string; s: number; es: number; conv: number; rev: number }[] = [
  { name: "Organic Search", color: "#1a73e8", s: 11741, es: 8337, conv: 342, rev: 38164.2 },
  { name: "Direct", color: "#12b5cb", s: 1487, es: 953, conv: 61, rev: 6902.55 },
  { name: "Referral", color: "#e52592", s: 698, es: 452, conv: 22, rev: 2311.4 },
  { name: "Organic Social", color: "#f9ab00", s: 506, es: 247, conv: 9, rev: 870.15 },
  { name: "Email", color: "#9334e6", s: 312, es: 214, conv: 19, rev: 1985.3 },
  { name: "Unassigned", color: "#7cb342", s: 118, es: 31, conv: 1, rev: 94.99 },
];
const TOT = CH.reduce((a, c) => ({ s: a.s + c.s, es: a.es + c.es, conv: a.conv + c.conv, rev: a.rev + c.rev }), { s: 0, es: 0, conv: 0, rev: 0 });
const cad = (n: number) => `CA$${num(n, { decimals: 2 })}`;
const pct = (a: number, b: number) => `${((a / b) * 100).toFixed(2)}%`;

const GA_COLS: Col[] = [
  { label: "", w: 22 },
  { label: "Session default channel group", w: 112 },
  { label: "↓ Sessions", w: 60, align: "right" },
  { label: "Engaged sessions", w: 58, align: "right" },
  { label: "Engagement rate", w: 58, align: "right" },
  { label: "Conversions All events", w: 62, align: "right" },
  { label: "Total revenue", w: 80, align: "right" },
];

export const Ga4Acquisition: Screen = () => (
  <GA4Shell account="CBD2Heal" property={`${DOMAIN} – GA4`} title="Traffic acquisition: Session default channel group" dateRange="1 Jan – 31 Mar 2023">
    <GA4Card>
      <div className="flex items-center" style={{ gap: 10, fontSize: 7, color: G.grey, marginBottom: 4 }}>
        <span style={{ fontSize: 7.5, fontWeight: 500, color: G.text }}>Sessions by Session default channel group over time</span>
        <span className="ml-auto flex" style={{ gap: 8 }}>
          {CH.slice(0, 5).map((c) => (
            <span key={c.name} className="flex items-center" style={{ gap: 3 }}>
              <span style={{ width: 8, height: 2, background: c.color }} />
              {c.name}
            </span>
          ))}
        </span>
      </div>
      <TimeChart
        w={440}
        h={78}
        size={7}
        series={CH.slice(0, 5).map((c, i) => ({ values: noisy({ n: 90, from: (c.s / 90) * 0.9, to: (c.s / 90) * 1.1, seed: 50 + i, noise: i ? 0.3 : 0.12, weekly: 0.12, weekStart: 6, bumps: i === 4 ? { 20: 3.2, 51: 2.8, 79: 3 } : {} }), color: c.color, width: 1.2 }))}
        xLabels={["01 Jan", "15", "01 Feb", "15", "01 Mar", "15"]}
        left={{ max: 200, ticks: 4, format: (n) => `${n}` }}
        padR={4}
      />
    </GA4Card>
    <GA4Table
      cols={GA_COLS}
      total={["", "Total", <Tot key="s" a={num(TOT.s)} b="100% of total" />, <Tot key="e" a={num(TOT.es)} b="100% of total" />, <Tot key="r" a={pct(TOT.es, TOT.s)} b="Avg 0%" />, <Tot key="c" a={num(TOT.conv)} b="100% of total" />, <Tot key="v" a={cad(TOT.rev)} b="100% of total" />]}
      rows={CH.map((c, i) => [<span key="n" style={{ color: G.grey }}>{i + 1}</span>, c.name, num(c.s), num(c.es), pct(c.es, c.s), `${num(c.conv)}.00`, cad(c.rev)])}
    />
  </GA4Shell>
);

function Tot({ a, b }: { a: string; b: string }) {
  return (
    <span style={{ display: "block", lineHeight: 1.25 }}>
      {a}
      <span style={{ display: "block", fontSize: 6.5, fontWeight: 400, color: G.grey }}>{b}</span>
    </span>
  );
}

/* 04 · Optimised product page ---------------------------------------- */

const NAV = ["shop cbd", "tinctures", "salves", "pets", "capsules", "bath bombs", "about us", "contact"];

export const ProductPage: Screen = () => (
  <BrowserChrome url={`${DOMAIN}/shop/pure-cbd-oil-tincture/`}>
    <div className="h-full" style={{ fontFamily: FONT.web, color: "#3c3c3c", background: "#fff" }}>
      <header className="flex items-center" style={{ height: 26, padding: "0 16px", gap: 12 }}>
        <Photo {...STORE} crop={{ x: 4, y: 2, w: 88, h: 17 }} w={78} h={15} />
        <nav className="ml-auto flex items-center" style={{ gap: 13, fontSize: 7.5, color: "#6b6b6b" }}>
          {NAV.map((t, i) => (
            <span key={t} className="flex items-center" style={{ gap: 3, color: t === "tinctures" ? "#333" : undefined }}>
              {i === 0 && <ShoppingBag style={{ width: 8, height: 8, color: AMBER }} aria-hidden="true" />}
              {t}
            </span>
          ))}
        </nav>
        <Search style={{ width: 9, height: 9, color: "#6b6b6b" }} aria-hidden="true" />
        <span className="flex items-center" style={{ height: 17, padding: "0 7px", border: "1px solid #333", borderRadius: 3, fontSize: 7, fontWeight: 600, gap: 3 }}>
          <User style={{ width: 8, height: 8 }} aria-hidden="true" />
          Sign in
        </span>
      </header>
      <div className="flex items-center justify-center" style={{ height: 16, background: AMBER, color: "#fff", fontSize: 7, fontWeight: 700, letterSpacing: 0.4 }}>
        FREE SHIPPING ON ALL ORDERS
      </div>
      <p className="flex items-center" style={{ padding: "7px 34px 0", fontSize: 6.5, color: "#8a8a8a", gap: 3 }}>
        Home <ChevronRight style={{ width: 6, height: 6 }} aria-hidden="true" /> Shop CBD <ChevronRight style={{ width: 6, height: 6 }} aria-hidden="true" /> Tinctures <ChevronRight style={{ width: 6, height: 6 }} aria-hidden="true" />
        <span style={{ color: "#555" }}>Pure CBD Oil Tincture</span>
      </p>
      <div className="flex" style={{ padding: "8px 34px 0", gap: 26 }}>
        <div style={{ width: 236 }}>
          <div style={{ border: "1px solid #eee" }}>
            <Photo {...STORE} crop={{ x: 430, y: 70, w: 400, h: 366 }} w={234} h={214} />
          </div>
          <div className="flex" style={{ gap: 5, marginTop: 5 }}>
            {[
              { x: 430, y: 70, w: 400, h: 366 },
              { x: 588, y: 150, w: 110, h: 297 },
              { x: 630, y: 90, w: 233, h: 357 },
              { x: 745, y: 140, w: 118, h: 307 },
            ].map((c, i) => (
              <span key={i} style={{ border: i === 0 ? `1.5px solid ${PINK}` : "1px solid #eee" }}>
                <Photo {...STORE} crop={c} w={52} h={46} />
              </span>
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1" style={{ paddingTop: 2 }}>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: PINK, lineHeight: 1.15, letterSpacing: -0.2 }}>Pure CBD Oil Tincture</h1>
          <p className="flex items-center" style={{ gap: 4, marginTop: 5, fontSize: 7, color: "#777" }}>
            {/* TODO(content): illustrative rating and review count */}
            <Stars rating={4.8} size={8} color="#f5a623" />
            (127 customer reviews)
          </p>
          {/* TODO(content): illustrative prices */}
          <p style={{ fontSize: 13, fontWeight: 600, color: "#333", marginTop: 7 }}>$59.99 – $189.99</p>
          <p style={{ fontSize: 7.5, lineHeight: 1.6, color: "#666", marginTop: 6 }}>
            Our best-selling pure CBD oil tincture, made in Canada with zero THC. Available in 1000mg, 2500mg and 5000mg strengths in a 30 ml dropper bottle. Take under the tongue or add to food and drinks.
          </p>
          <div style={{ marginTop: 9, fontSize: 7, fontWeight: 600, color: "#444" }}>Strength</div>
          <div className="flex" style={{ gap: 5, marginTop: 4 }}>
            {["1000mg", "2500mg", "5000mg"].map((s) => (
              <span key={s} style={{ padding: "4px 9px", fontSize: 7.5, border: s === "5000mg" ? `1.5px solid ${PINK}` : "1px solid #ddd", borderRadius: 3, color: s === "5000mg" ? "#333" : "#666", fontWeight: s === "5000mg" ? 600 : 400 }}>
                {s}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#333", marginTop: 8 }}>$189.99</p>
          <div className="flex items-center" style={{ gap: 7, marginTop: 6 }}>
            <span className="flex items-center" style={{ height: 24, border: "1px solid #ddd", borderRadius: 3, fontSize: 8, color: "#444" }}>
              <Minus style={{ width: 8, height: 8, margin: "0 7px", color: "#999" }} aria-hidden="true" />1
              <Plus style={{ width: 8, height: 8, margin: "0 7px", color: "#999" }} aria-hidden="true" />
            </span>
            <span className="flex items-center justify-center" style={{ height: 24, width: 150, borderRadius: 12, background: PINK, color: "#fff", fontSize: 8.5, fontWeight: 600, letterSpacing: 0.4 }}>
              ADD TO CART
            </span>
            <Heart style={{ width: 11, height: 11, color: "#999" }} aria-hidden="true" />
          </div>
          <p className="flex items-center" style={{ gap: 4, fontSize: 7, color: "#666", marginTop: 8 }}>
            <Truck style={{ width: 9, height: 9, color: AMBER }} aria-hidden="true" />
            Free shipping across Canada
          </p>
          <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid #eee", fontSize: 6.5, color: "#888", lineHeight: 1.7 }}>
            <p>SKU: C2H-PT-5000</p>
            <p>
              Categories: <span style={{ color: "#555" }}>CBD Oil, Tinctures</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex" style={{ margin: "10px 34px 0", gap: 16, borderBottom: "1px solid #eee", fontSize: 8, fontWeight: 600, color: "#888" }}>
        {["Description", "Additional information", "Reviews (127)"].map((t, i) => (
          <span key={t} style={{ paddingBottom: 5, color: i === 0 ? "#333" : undefined, borderBottom: i === 0 ? `2px solid ${PINK}` : "2px solid transparent" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </BrowserChrome>
);

export const cbd2healScreens: Screen[] = [PositionTracking, SearchConsoleQueries, Ga4Acquisition, ProductPage];
