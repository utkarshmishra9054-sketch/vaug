import type { CSSProperties, ReactNode } from "react";
import { Copy, EllipsisVertical, Info, Lock, Menu, Mic, Monitor, RotateCw, Search, Smartphone, Users } from "lucide-react";

import type { Screen } from "./kit";
import { Diff, Donut, SEM, SemButton, SemrushShell, SemTable, SemTabs, type SemCol } from "./seoKit";
import { BrowserChrome, FONT, G, Initials, noisy, num, PhoneBackdrop, PhoneFrame, Place, SearchConsole, Stars, TimeChart, type Col } from "./tools";

/*
 * SEO for an e-commerce store · India (Jain Industries)
 * "Non-brand organic traffic up to 9x" is from the 2023 proposal; every other
 * number, the product range (steel kitchenware and home storage) and the
 * domain are illustrative. No real logo or site image is on file.
 * TODO(content): data illustrative; confirm the product range, the store's real domain and all figures with the client.
 */

const DOMAIN = "jainindustries.co.in";
const RUST = "#a3471b";

/* 01 · Semrush Site Audit overview -------------------------------------- */

function Card({ title, children, style }: { title: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ border: `1px solid ${SEM.line}`, borderRadius: 4, padding: "6px 8px", ...style }}>
      <p className="flex items-center" style={{ fontSize: 8, fontWeight: 600, gap: 3 }}>
        {title}
        <Info style={{ width: 7, height: 7, color: SEM.light }} aria-hidden="true" />
      </p>
      {children}
    </div>
  );
}

// Errors / warnings / notices over the last 8 crawls (weekly), falling after the fixes.
const ERR = [1891, 1874, 912, 406, 188, 61, 22, 14];
const WARN = [4318, 4296, 3480, 2610, 1904, 1386, 1101, 1027];

function Spark({ v, color }: { v: number[]; color: string }) {
  const m = Math.max(...v);
  const pts = v.map((x, i) => `${(i / (v.length - 1)) * 60},${16 - (x / m) * 15}`).join(" ");
  return (
    <svg width={60} height={17} aria-hidden="true" style={{ display: "block", marginTop: 3 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.2} />
    </svg>
  );
}

const PAGES: [string, number, string][] = [
  ["Healthy", 2114, SEM.green],
  ["Broken", 6, "#ff4953"],
  ["Have issues", 263, "#fdc23c"],
  ["Redirects", 29, "#2bb3ff"],
  ["Blocked", 6, "#a6b0b3"],
];

const THEMES: [string, number | null][] = [
  ["Crawlability", 96],
  ["HTTPS", 98],
  ["International SEO", null],
  ["Core Web Vitals", 83],
  ["Site Performance", 91],
  ["Internal Linking", 93],
  ["Markup", 100],
];

export const TechnicalAudit: Screen = () => (
  <SemrushShell
    url={`www.semrush.com/siteaudit/campaign/5528013/review/#overview`}
    active="Site Audit"
    crumbs={["Dashboard", "Projects", DOMAIN, "Site Audit"]}
    title={`Site Audit: ${DOMAIN}`}
    right={
      <>
        <SemButton>PDF</SemButton>
        <SemButton>Export</SemButton>
        <SemButton primary>Rerun campaign</SemButton>
      </>
    }
  >
    <p style={{ fontSize: 7.5, color: SEM.grey, marginTop: 2 }}>
      Last Update: Sep 22, 2025 · Mobile · Pages crawled: 2,418/5,000
    </p>
    <SemTabs tabs={["Overview", "Issues", "Crawled Pages", "Statistics", "Compare Crawls", "Progress", "JS Impact"]} active={0} />
    <div className="flex" style={{ gap: 6, marginTop: 7 }}>
      <Card title="Site Health" style={{ width: 128 }}>
        <div className="flex items-center" style={{ gap: 8, marginTop: 5 }}>
          <Donut value={92} size={52} stroke={7}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>92%</span>
          </Donut>
          <div style={{ fontSize: 7 }}>
            <Diff n={38} suffix="%" size={7} />
            <p style={{ color: SEM.grey, marginTop: 4 }}>You</p>
            <p style={{ fontWeight: 600 }}>92%</p>
            <p style={{ color: SEM.grey, marginTop: 2 }}>Top-10% websites</p>
            <p style={{ fontWeight: 600 }}>92%</p>
          </div>
        </div>
      </Card>
      <Card title="Crawled Pages" style={{ flex: 1 }}>
        <p className="flex items-baseline" style={{ gap: 5, marginTop: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: SEM.link }}>2,418</span>
          <Diff n={612} size={7} />
        </p>
        <div className="flex" style={{ height: 6, marginTop: 5, gap: 1 }}>
          {PAGES.map(([l, n, c]) => (
            <span key={l} style={{ flex: Math.max(n, 20), background: c }} />
          ))}
        </div>
        <div style={{ marginTop: 5, fontSize: 7, lineHeight: 1.55 }}>
          {PAGES.map(([l, n, c]) => (
            <p key={l} className="flex items-center" style={{ gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: 1, background: c }} />
              {l}
              <span className="ml-auto" style={{ color: SEM.link }}>
                {num(n)}
              </span>
            </p>
          ))}
        </div>
      </Card>
      <div className="flex flex-col" style={{ width: 104, gap: 6 }}>
        <Card title="Errors">
          <p className="flex items-baseline" style={{ gap: 5, marginTop: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: SEM.red }}>14</span>
            <Diff n={8} size={7} />
          </p>
          <Spark v={ERR} color={SEM.red} />
        </Card>
        <Card title="Warnings">
          <p className="flex items-baseline" style={{ gap: 5, marginTop: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f7a500" }}>1,027</span>
            <Diff n={74} size={7} />
          </p>
          <Spark v={WARN} color="#fdc23c" />
        </Card>
      </div>
    </div>
    <p style={{ fontSize: 9, fontWeight: 700, marginTop: 9 }}>Thematic Reports</p>
    <div className="flex" style={{ gap: 5, marginTop: 5 }}>
      {THEMES.map(([t, v]) => (
        <div key={t} className="flex flex-col items-center" style={{ flex: 1, border: `1px solid ${SEM.line}`, borderRadius: 4, padding: "5px 2px 6px", fontSize: 7 }}>
          <span className="truncate" style={{ fontWeight: 600, maxWidth: "100%" }}>
            {t}
          </span>
          {v === null ? (
            <span style={{ height: 34, display: "flex", alignItems: "center", color: SEM.grey, fontSize: 6.5, textAlign: "center" }}>No hreflang tags</span>
          ) : (
            <span style={{ marginTop: 4 }}>
              <Donut value={v} size={30} stroke={4} color={v < 85 ? "#fdc23c" : SEM.green}>
                <span style={{ fontSize: 8, fontWeight: 600 }}>{v}%</span>
              </Donut>
            </span>
          )}
          <span style={{ color: SEM.link, marginTop: 4, fontSize: 6.5 }}>{v === null ? "Get started" : "View details"}</span>
        </div>
      ))}
    </div>
    <p style={{ fontSize: 9, fontWeight: 700, marginTop: 9 }}>Top Issues</p>
    <div style={{ fontSize: 7.5, marginTop: 3 }}>
      {[
        ["6 pages returned 4XX status code", "0.2% of total issues"],
        ["8 internal links are broken", "0.3% of total issues"],
        ["412 images don't have alt attributes", "13.8% of total issues"],
      ].map(([a, b]) => (
        <p key={a} className="flex" style={{ height: 17, alignItems: "center", borderBottom: `1px solid ${SEM.line}` }}>
          <span style={{ color: SEM.link }}>{a}</span>
          <span className="ml-auto" style={{ color: SEM.grey }}>
            {b}
          </span>
        </p>
      ))}
    </div>
  </SemrushShell>
);

/* 02 · Search Console, non-brand queries (Query: -jain) ----------------- */

// TODO(content): illustrative daily series; non-brand clicks grow roughly 9x over 16 months.
const NB_CLICKS = noisy({ n: 486, from: 23, to: 208, seed: 51, noise: 0.16, weekly: 0.1, weekStart: 3, ease: -0.35, bumps: { 60: 0.7, 61: 0.76, 290: 1.3, 291: 1.22, 402: 1.18 } });
const NB_IMPR = noisy({ n: 486, from: 2100, to: 11800, seed: 52, noise: 0.1, weekly: 0.06, weekStart: 3, ease: -0.2, bumps: { 60: 0.72 } });
const tot = (a: number[]) => a.reduce((s, v) => s + v, 0);

const NB_COLS: Col[] = [
  { label: "Top queries", w: 300 },
  { label: "↓ Clicks", w: 76, align: "right" },
  { label: "Impressions", w: 88, align: "right" },
];
const NB_ROWS: [string, number, number][] = [
  ["steel container set for kitchen", 7418, 161208],
  ["masala box stainless steel", 5236, 97340],
  ["stainless steel kitchen rack", 4102, 142977],
  ["airtight steel containers", 3371, 88512],
  ["dish drying rack steel", 2089, 76104],
  ["steel lunch box for office", 1497, 104633],
];

export const NonBrandClicks: Screen = () => (
  <SearchConsole
    property={`sc-domain:${DOMAIN}`}
    filters={["Search type: Web", "Query: -jain", "Date: Last 16 months"]}
    metrics={[
      { label: "Total clicks", value: `${(tot(NB_CLICKS) / 1000).toFixed(1)}K`, on: true },
      { label: "Total impressions", value: `${(tot(NB_IMPR) / 1e6).toFixed(2)}M`, on: true },
      { label: "Average CTR", value: `${((tot(NB_CLICKS) / tot(NB_IMPR)) * 100).toFixed(1)}%` },
      { label: "Average position", value: "17.3" },
    ]}
    series={[NB_CLICKS, NB_IMPR]}
    xLabels={["1 Jun 2024", "30 Sept 2024", "28 Jan 2025", "28 May 2025", "28 Sept 2025"]}
    left={{ max: 300, ticks: 3, format: (n) => `${n}` }}
    right={{ max: 15000, ticks: 3, format: (n) => (n ? `${n / 1000}K` : "0") }}
    cols={NB_COLS}
    rows={NB_ROWS.map(([q, c, i]) => [q, num(c), num(i)])}
  />
);

/* 03 · Semrush Position Tracking, Tags tab ------------------------------ */

// [tag, keywords, visibility %, visibility diff, est. traffic, avg position, top 3, top 10, top 20, top 100]
const TAGS: [string, number, string, number, string, string, number, number, number, number][] = [
  ["steel containers", 34, "41.20%", 33.9, "612", "6.8", 11, 29, 31, 34],
  ["masala boxes", 19, "44.87%", 36.1, "301", "5.1", 7, 17, 18, 19],
  ["kitchen racks", 28, "36.05%", 30.2, "388", "8.9", 8, 22, 25, 28],
  ["pantry storage", 21, "23.18%", 19.4, "164", "12.2", 5, 11, 16, 21],
  ["dish racks", 22, "27.64%", 21.8, "196", "11.7", 4, 14, 19, 22],
  ["lunch boxes", 25, "19.32%", 15.0, "142", "14.9", 3, 13, 17, 24],
  ["water bottles", 16, "7.41%", 4.2, "38", "27.6", 0, 4, 9, 14],
];

const TAG_COLORS = ["#2bb3ff", "#59ddaa", "#ab6cfe", "#ff8c43"];
const TAG_SERIES = [
  noisy({ n: 34, from: 4.2, to: 41.2, seed: 61, noise: 0.06, ease: -0.2, decimals: 2 }),
  noisy({ n: 34, from: 9.8, to: 44.9, seed: 62, noise: 0.07, ease: 0.2, decimals: 2 }),
  noisy({ n: 34, from: 2.1, to: 36.1, seed: 63, noise: 0.08, ease: -0.1, decimals: 2 }),
  noisy({ n: 34, from: 1.3, to: 23.2, seed: 64, noise: 0.1, ease: -0.4, decimals: 2 }),
];

const TAG_COLS: SemCol[] = [
  { label: "Tag", w: 88 },
  { label: "Keywords", w: 44, align: "right" },
  { label: "Visibility", w: 48, align: "right" },
  { label: "Diff", w: 42, align: "right" },
  { label: "Est. traffic", w: 48, align: "right" },
  { label: "Avg. pos.", w: 40, align: "right" },
  { label: "Top 3", w: 34, align: "right" },
  { label: "Top 10", w: 36, align: "right" },
  { label: "Top 20", w: 36, align: "right" },
  { label: "Top 100", w: 40, align: "right" },
];

export const CategoryRankings: Screen = () => (
  <SemrushShell
    url="www.semrush.com/tracking/tags/?projectId=8820561"
    active="Position Tracking"
    crumbs={["Dashboard", "Projects", DOMAIN, "Position Tracking"]}
    title={`Position Tracking: ${DOMAIN}`}
    right={
      <>
        <SemButton>Export to PDF</SemButton>
        <SemButton>Settings</SemButton>
      </>
    }
  >
    <p style={{ fontSize: 7.5, color: SEM.grey, marginTop: 2 }}>
      Google · India · Mobile · English · <span style={{ color: SEM.link }}>165 keywords</span> · Tags: all except <span style={{ color: SEM.text }}>brand</span>
    </p>
    <SemTabs tabs={["Landscape", "Overview", "Rankings Distribution", "Pages", "Tags", "Competitors Discovery", "Featured Snippets"]} active={4} />
    <div style={{ marginTop: 6, border: `1px solid ${SEM.line}`, borderRadius: 4, padding: "6px 8px 3px" }}>
      <div className="flex items-center" style={{ fontSize: 7.5, gap: 10 }}>
        <b style={{ fontWeight: 600 }}>Visibility by tag</b>
        {TAGS.slice(0, 4).map(([t], i) => (
          <span key={t} className="flex items-center" style={{ gap: 3, color: SEM.grey }}>
            <span style={{ width: 6, height: 6, borderRadius: 1.5, background: TAG_COLORS[i] }} />
            {t}
          </span>
        ))}
        <span className="ml-auto" style={{ color: SEM.grey }}>
          Feb 3 – Sep 22, 2025 · Weekly
        </span>
      </div>
      <div style={{ marginTop: 5 }}>
        <TimeChart
          w={470}
          h={78}
          series={TAG_SERIES.map((v, i) => ({ values: v, color: TAG_COLORS[i], width: 1.3 }))}
          xLabels={["Feb 3", "Mar 17", "Apr 28", "Jun 9", "Jul 21", "Sep 1", "Sep 22"]}
          left={{ max: 60, ticks: 3, format: (n) => `${n}%` }}
          size={6.5}
          font={SEM.font}
          labelColor={SEM.grey}
          grid={SEM.line}
        />
      </div>
    </div>
    <SemTable
      style={{ marginTop: 6 }}
      rowH={19}
      cols={TAG_COLS}
      rows={TAGS.map(([t, kw, vis, d, tr, pos, t3, t10, t20, t100]) => [
        <span key="t" style={{ color: SEM.link }}>
          {t}
        </span>,
        kw,
        vis,
        <Diff key="d" n={d} suffix="%" size={7} />,
        tr,
        pos,
        t3,
        <b key="b" style={{ fontWeight: 600 }}>
          {t10}
        </b>,
        t20,
        t100,
      ])}
    />
  </SemrushShell>
);

/* 04 · Mobile Google results -------------------------------------------- */

function JFav() {
  return (
    <span className="flex items-center justify-center" style={{ width: 10, height: 10, borderRadius: 2, background: RUST, color: "#fff", fontSize: 6.5, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      J
    </span>
  );
}
function LFav({ bg, t, color = "#fff" }: { bg: string; t: string; color?: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 10, height: 10, borderRadius: 2, background: bg, color, fontSize: 6.5, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

type MResult = { site: string; url: string; fav: ReactNode; title: string; desc?: string; rich?: { rating: number; reviews: string; price: string } };

function MobileResult({ r }: { r: MResult }) {
  return (
    <div style={{ padding: "8px 9px", borderBottom: "5px solid #f1f3f4" }}>
      <div className="flex items-center" style={{ gap: 5 }}>
        <span className="flex items-center justify-center" style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #ecedef", background: "#fff" }}>
          {r.fav}
        </span>
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.2 }}>
          <span className="block truncate" style={{ fontSize: 7.5, color: G.text }}>
            {r.site}
          </span>
          <span className="block truncate" style={{ fontSize: 6.5, color: G.serpText }}>
            {r.url}
          </span>
        </span>
        <EllipsisVertical style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
      </div>
      <p style={{ fontSize: 10, lineHeight: 1.3, color: "#1a0dab", marginTop: 4 }}>{r.title}</p>
      {r.desc && <p style={{ fontSize: 7, lineHeight: 1.45, color: G.serpText, marginTop: 2 }}>{r.desc}</p>}
      {r.rich && (
        <p className="flex items-center" style={{ fontSize: 6.8, color: "#70757a", gap: 3, marginTop: 2 }}>
          {r.rich.rating.toFixed(1)}
          <Stars rating={r.rich.rating} size={6.5} color="#e7711b" />({r.rich.reviews}) · {r.rich.price} · In stock
        </p>
      )}
    </div>
  );
}

function MobileGoogle({ query, results }: { query: string; results: MResult[] }) {
  return (
    <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, background: "#fff", color: G.text }}>
      <div className="flex items-center" style={{ height: 26, padding: "0 9px" }}>
        <Menu style={{ width: 10, height: 10, color: G.grey }} aria-hidden="true" />
        <span className="flex-1" style={{ textAlign: "center", fontFamily: "'Product Sans', 'Google Sans', Arial, sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: -0.5 }}>
          {"Google".split("").map((ch, i) => (
            <span key={i} style={{ color: [G.blue, G.red, G.yellow, G.blue, G.green, G.red][i] }}>
              {ch}
            </span>
          ))}
        </span>
        <Initials name="R S" size={14} bg="#5c6bc0" />
      </div>
      <div className="flex items-center" style={{ margin: "2px 8px 0", height: 24, borderRadius: 12, boxShadow: "0 1px 4px rgb(32 33 36 / 0.25)", padding: "0 8px", gap: 5, fontSize: 8 }}>
        <Search style={{ width: 9, height: 9, color: G.grey }} aria-hidden="true" />
        <span className="flex-1 truncate">{query}</span>
        <Mic style={{ width: 9, height: 9, color: G.blue }} aria-hidden="true" />
      </div>
      <div className="flex" style={{ gap: 11, padding: "7px 9px 0", fontSize: 7.5, color: G.grey, borderBottom: `1px solid ${G.line}`, whiteSpace: "nowrap" }}>
        {["All", "Shopping", "Images", "Videos", "Short videos", "News"].map((t, i) => (
          <span key={t} style={{ paddingBottom: 5, color: i === 0 ? G.text : undefined, fontWeight: i === 0 ? 500 : 400, borderBottom: i === 0 ? `2px solid ${G.text}` : "2px solid transparent" }}>
            {t}
          </span>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {results.map((r) => (
          <MobileResult key={r.site + r.title} r={r} />
        ))}
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 40, padding: "4px 9px 14px", background: "#f6f6f6", borderTop: "0.5px solid #d0d0d0", gap: 6 }}>
        <span className="relative flex flex-1 items-center justify-center" style={{ height: 20, borderRadius: 7, background: "#fff", boxShadow: "0 0.5px 2px rgb(0 0 0 / 0.15)", fontSize: 8, gap: 3, fontFamily: FONT.apple }}>
          <Lock style={{ width: 6, height: 6, color: "#666" }} aria-hidden="true" />
          google.com
          <RotateCw style={{ width: 7, height: 7, color: "#333", position: "absolute", right: 7 }} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

// TODO(content): illustrative results and ratings.
export const MobileSerp: Screen = () => (
  <PhoneBackdrop>
    <Place x={110} y={10}>
      <PhoneFrame time="7:18">
        <MobileGoogle
          query="steel container set for kitchen"
          results={[
            { site: "Amazon.in", url: "https://www.amazon.in › steel-container-set", fav: <LFav bg="#fff" color="#111" t="a" />, title: "Steel Container Set For Kitchen - Amazon.in", desc: "Results 1 - 48 of 1,000+ — Airtight stainless steel containers in sets of 3, 6 and 12." },
            {
              site: "Jain Industries",
              url: `https://www.${DOMAIN} › steel-containers`,
              fav: <JFav />,
              title: "Stainless Steel Containers for Kitchen | Sets of 3, 6 & 12",
              desc: "Food-grade 304 steel containers with airtight lids, made in India. Free delivery on orders over ₹499.",
              rich: { rating: 4.6, reviews: "318", price: "₹1,249.00" },
            },
            { site: "Flipkart", url: "https://www.flipkart.com › kitchen-containers", fav: <LFav bg="#2874f0" t="f" />, title: "Kitchen Containers - Buy Steel Containers Online", desc: "Shop steel kitchen containers at the best prices in India." },
          ]}
        />
      </PhoneFrame>
    </Place>
    <Place x={350} y={10}>
      <PhoneFrame time="7:21">
        <MobileGoogle
          query="masala box stainless steel"
          results={[
            {
              site: "Jain Industries",
              url: `https://www.${DOMAIN} › masala-boxes`,
              fav: <JFav />,
              title: "Masala Box Stainless Steel | 7 Bowls with Spoon & Lid",
              desc: "Masala dabba in 304 stainless steel with a see-through lid, 7 bowls and a spoon. Sizes from 18 cm to 24 cm.",
              rich: { rating: 4.7, reviews: "204", price: "₹899.00" },
            },
            { site: "Amazon.in", url: "https://www.amazon.in › masala-box", fav: <LFav bg="#fff" color="#111" t="a" />, title: "Masala Box Stainless Steel: Buy Online", desc: "Results 1 - 48 of 3,000+ — Spice boxes with 7 containers and lids." },
            { site: "YouTube", url: "https://www.youtube.com › watch", fav: <LFav bg="#ff0000" t="▶" />, title: "Best Masala Dabba 2025 | Steel vs Glass" },
          ]}
        />
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

/* 05 · PageSpeed Insights, category page on mobile ---------------------- */

const PSI_GREEN = "#0c6";
const PSI_TEXT_GREEN = "#008800";

function PsiMetric({ name, value, split, marker }: { name: string; value: string; split: [number, number, number]; marker: number }) {
  return (
    <div style={{ flex: 1 }}>
      <p className="flex items-center" style={{ fontSize: 7.5, gap: 4 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: PSI_GREEN }} />
        {name}
      </p>
      <p style={{ fontSize: 14, color: PSI_TEXT_GREEN, marginTop: 2 }}>{value}</p>
      <div className="relative" style={{ marginTop: 5 }}>
        <span style={{ position: "absolute", left: `${marker}%`, top: -4, width: 1, height: 11, background: "#202124" }} />
        <div className="flex" style={{ height: 4, gap: 1 }}>
          <span style={{ flex: split[0], background: PSI_GREEN }} />
          <span style={{ flex: split[1], background: "#fa3" }} />
          <span style={{ flex: split[2], background: "#f33" }} />
        </div>
      </div>
    </div>
  );
}

function Gauge({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex flex-col items-center" style={{ width: 90, gap: 4 }}>
      <span className="relative flex items-center justify-center" style={{ width: 40, height: 40 }}>
        <svg width={40} height={40} style={{ position: "absolute", transform: "rotate(-90deg)" }} aria-hidden="true">
          <circle cx={20} cy={20} r={17} fill="rgb(0 204 102 / 0.1)" stroke="none" />
          <circle cx={20} cy={20} r={17} fill="none" stroke={PSI_GREEN} strokeWidth={3} strokeDasharray={`${(score / 100) * 2 * Math.PI * 17} 200`} />
        </svg>
        <span style={{ position: "relative", fontSize: 13, color: PSI_TEXT_GREEN, fontFamily: "Roboto Mono, Menlo, monospace" }}>{score}</span>
      </span>
      <span style={{ fontSize: 8, color: G.text }}>{label}</span>
    </div>
  );
}

export const MobileCategoryPage: Screen = () => (
  <BrowserChrome url="pagespeed.web.dev/analysis/https-www-jainindustries-co-in-steel-containers/7rj2kq1d4m?form_factor=mobile">
    <div className="h-full" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
      <header className="flex items-center" style={{ height: 30, padding: "0 16px", gap: 6, borderBottom: `1px solid ${G.line}` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 17a9 9 0 0 1 18 0" fill="none" stroke="#4285f4" strokeWidth="3" />
          <path d="M12 17 16.5 10" stroke="#ea4335" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="17" r="2" fill="#ea4335" />
        </svg>
        <span style={{ fontFamily: FONT.googleSans, fontSize: 11, color: G.grey }}>PageSpeed Insights</span>
        <span className="ml-auto flex items-center" style={{ gap: 14, fontSize: 8, color: G.grey }}>
          <span className="flex items-center" style={{ gap: 3 }}>
            <Copy style={{ width: 8, height: 8 }} aria-hidden="true" />
            Copy link
          </span>
          <span>Docs</span>
        </span>
      </header>
      <div className="flex items-center" style={{ margin: "10px 60px 0", gap: 8 }}>
        <span className="flex flex-1 items-center truncate" style={{ height: 24, borderRadius: 4, border: `1px solid ${G.border}`, padding: "0 8px", fontSize: 8.5 }}>
          https://www.{DOMAIN}/steel-containers
        </span>
        <span className="flex items-center" style={{ height: 24, padding: "0 14px", borderRadius: 4, background: "#1a73e8", color: "#fff", fontSize: 8.5, fontWeight: 500 }}>
          Analyse
        </span>
      </div>
      <div className="flex justify-center" style={{ marginTop: 8, gap: 26, fontSize: 8.5, borderBottom: `1px solid ${G.line}` }}>
        {[
          [Smartphone, "Mobile"],
          [Monitor, "Desktop"],
        ].map(([I, t], i) => {
          const Icon = I as typeof Smartphone;
          return (
            <span key={t as string} className="flex items-center" style={{ gap: 4, paddingBottom: 6, color: i === 0 ? "#1a73e8" : G.grey, borderBottom: i === 0 ? "2px solid #1a73e8" : "2px solid transparent", padding: "0 8px 6px" }}>
              <Icon style={{ width: 9, height: 9 }} aria-hidden="true" />
              {t as string}
            </span>
          );
        })}
      </div>
      <div style={{ margin: "0 60px" }}>
        <div className="flex items-center" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 10.5, fontFamily: FONT.googleSans }}>Discover what your real users are experiencing</span>
          <span className="ml-auto flex" style={{ fontSize: 7.5, border: `1px solid ${G.border}`, borderRadius: 4, overflow: "hidden" }}>
            <span style={{ padding: "3px 8px", background: "#e8f0fe", color: "#1a73e8" }}>This URL</span>
            <span style={{ padding: "3px 8px", color: G.grey }}>Origin</span>
          </span>
        </div>
        <p className="flex items-center" style={{ marginTop: 6, fontSize: 8.5, gap: 5 }}>
          Core Web Vitals Assessment: <span style={{ color: PSI_TEXT_GREEN, fontWeight: 500 }}>Passed</span>
          <Info style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
          <span className="ml-auto" style={{ fontSize: 7.5, color: "#1a73e8" }}>
            Expand view
          </span>
        </p>
        <div className="flex" style={{ gap: 18, marginTop: 6 }}>
          <PsiMetric name="Largest Contentful Paint (LCP)" value="2.1 s" split={[81, 13, 6]} marker={31} />
          <PsiMetric name="Interaction to Next Paint (INP)" value="142 ms" split={[88, 9, 3]} marker={24} />
          <PsiMetric name="Cumulative Layout Shift (CLS)" value="0.03" split={[92, 5, 3]} marker={12} />
        </div>
        <p style={{ fontSize: 6.5, fontWeight: 500, color: G.grey, marginTop: 10, letterSpacing: 0.4 }}>OTHER NOTABLE METRICS</p>
        <div className="flex" style={{ gap: 18, marginTop: 4 }}>
          <PsiMetric name="First Contentful Paint (FCP)" value="1.4 s" split={[84, 11, 5]} marker={27} />
          <PsiMetric name="Time to First Byte (TTFB)" value="0.6 s" split={[79, 16, 5]} marker={30} />
          <div style={{ flex: 1 }} />
        </div>
        <div className="flex flex-wrap" style={{ marginTop: 8, padding: "5px 0", borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}`, fontSize: 6.8, color: G.grey, columnGap: 16, rowGap: 3 }}>
          {["Latest 28-day collection period", "Various mobile devices", "Many samples (Chrome UX Report)"].map((t) => (
            <span key={t} className="flex items-center" style={{ gap: 3, width: 150 }}>
              <Users style={{ width: 7, height: 7 }} aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 10.5, fontFamily: FONT.googleSans, marginTop: 7 }}>Diagnose performance issues</p>
        <div className="flex justify-center" style={{ gap: 12, marginTop: 6 }}>
          <Gauge score={91} label="Performance" />
          <Gauge score={94} label="Accessibility" />
          <Gauge score={100} label="Best Practices" />
          <Gauge score={100} label="SEO" />
        </div>
      </div>
    </div>
  </BrowserChrome>
);

export const jainSeoScreens: Screen[] = [TechnicalAudit, NonBrandClicks, CategoryRankings, MobileSerp, MobileCategoryPage];
