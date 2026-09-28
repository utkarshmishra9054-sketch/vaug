import type { ReactNode } from "react";
import { ChevronDown, Search, ShoppingBag, UserRound } from "lucide-react";

import type { Screen } from "./kit";
import { Diff, Intent, SEM, SemButton, SemrushShell, SemTable, SemTabs, SerpRich, type SemCol } from "./seoKit";
import { BrowserChrome, FONT, GA4Card, GA4Shell, GA4Table, GoogleSerp, noisy, num, Photo, SearchConsole as GscReport, SerpResult, TimeChart, type Col } from "./tools";

/*
 * SEO for a D2C brand · India (Brandless, brandless.co.in, Shopify).
 * "Organic traffic up 76%+" is from the 2023 proposal; the average position
 * (21.8 -> 11.4) and everything else below is illustrative.
 * TODO(content): data illustrative; confirm keywords, positions, sessions and products with Brandless.
 */

const LOGO = { src: "/logos/brandless.webp", img: { w: 150, h: 120 } };
const SITE = { src: "/sites/brandless.webp", img: { w: 1440, h: 900 } };

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 7, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

const BrandlessFav = () => <Photo {...LOGO} crop={{ x: 14, y: 0, w: 122, h: 120 }} w={14} h={14} bg="#fff" />;

/* 01 · Search Console, last 12 months --------------------------------- */

// TODO(content): illustrative daily series; roughly +76% clicks, last 6 months on the previous 6.
const CLICKS = noisy({ n: 365, from: 98, to: 196, seed: 21, noise: 0.14, weekly: 0.12, weekStart: 1, ease: -0.15, bumps: { 22: 1.35, 23: 1.28, 24: 1.2, 55: 1.18, 214: 0.72, 330: 1.22, 331: 1.3 } });
const IMPR = noisy({ n: 365, from: 5600, to: 9100, seed: 22, noise: 0.1, weekly: 0.08, weekStart: 1, bumps: { 22: 1.25, 23: 1.2, 214: 0.8 } });
const sum = (a: number[]) => a.reduce((s, v) => s + v, 0);
const TOTAL_CLICKS = sum(CLICKS);
const TOTAL_IMPR = sum(IMPR);
const k = (n: number) => `${(n / 1000).toFixed(1)}K`;

const GSC_COLS: Col[] = [
  { label: "Top queries", w: 300 },
  { label: "↓ Clicks", w: 76, align: "right" },
  { label: "Impressions", w: 88, align: "right" },
];

const QUERIES: [string, number, number][] = [
  ["brandless", 6812, 24107],
  ["yoga mat bag", 3147, 118305],
  ["leather bottle holder", 1908, 61442],
  ["canvas yoga mat bag", 1266, 29870],
  ["yoga mat cover bag", 974, 52213],
  ["personalised corporate gifts india", 611, 73905],
];

export const SearchConsole: Screen = () => (
  <GscReport
    property="https://www.brandless.co.in/"
    filters={["Search type: Web", "Date: Last 12 months"]}
    metrics={[
      { label: "Total clicks", value: k(TOTAL_CLICKS), on: true },
      { label: "Total impressions", value: `${(TOTAL_IMPR / 1e6).toFixed(2)}M`, on: true },
      { label: "Average CTR", value: `${((TOTAL_CLICKS / TOTAL_IMPR) * 100).toFixed(1)}%` },
      { label: "Average position", value: "14.7" },
    ]}
    series={[CLICKS, IMPR]}
    xLabels={["1 Oct 2024", "31 Dec 2024", "1 Apr 2025", "1 Jul 2025", "30 Sept 2025"]}
    left={{ max: 300, ticks: 3, format: (n) => `${n}` }}
    right={{ max: 12000, ticks: 3, format: (n) => (n ? `${n / 1000}K` : "0") }}
    cols={GSC_COLS}
    rows={QUERIES.map(([q, c, i]) => [q, num(c), num(i)])}
  />
);

/* 02 · Semrush Position Tracking ---------------------------------------- */

const VIS = noisy({ n: 180, from: 4.1, to: 18.4, seed: 31, noise: 0.07, ease: -0.2, decimals: 2, bumps: { 61: 0.86, 62: 0.9, 118: 1.12, 119: 1.1 } });

// [keyword, intent, position 1 Apr, position 27 Sept, volume, url]; null = outside the top 100.
const RANKS: [string, ("I" | "C" | "T")[], number | null, number | null, string, string][] = [
  ["canvas yoga mat carrier", ["C", "T"], 34, 1, "1,000", "/collections/yoga-mat-bags"],
  ["leather bottle holder", ["T"], 27, 2, "2,400", "/products/leather-bottle-holder"],
  ["yoga mat bag", ["C", "T"], 19, 3, "9,900", "/collections/yoga-mat-bags"],
  ["monogram leather keyring", ["T"], 12, 4, "880", "/products/monogram-keyring"],
  ["yoga mat cover bag", ["C"], 41, 6, "3,600", "/collections/yoga-mat-bags"],
  ["personalised corporate gifts", ["C"], 64, 9, "6,600", "/pages/corporate-gifting"],
  ["gym pouch for men", ["T"], null, 18, "1,300", "/products/gym-essentials-pouch"],
  ["bottle holder bag", ["T"], 22, 25, "720", "/products/leather-bottle-holder"],
];

const RCOLS: SemCol[] = [
  { label: "Keyword", w: 118 },
  { label: "Intent", w: 38 },
  { label: "Pos. Apr 1", w: 46, align: "right" },
  { label: "Pos. Sep 27", w: 50, align: "right" },
  { label: "Diff", w: 36, align: "right" },
  { label: "Volume", w: 44, align: "right" },
  { label: "URL", w: 150 },
];

function Tile({ label, value, diff, on = false }: { label: string; value: string; diff: ReactNode; on?: boolean }) {
  return (
    <div style={{ flex: 1, padding: "5px 8px", borderRight: `1px solid ${SEM.line}`, borderBottom: on ? `2px solid ${SEM.blue}` : "2px solid transparent" }}>
      <p style={{ fontSize: 7, color: SEM.grey }}>{label}</p>
      <p className="flex items-baseline" style={{ gap: 5, marginTop: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
        {diff}
      </p>
    </div>
  );
}

export const RankTracker: Screen = () => (
  <SemrushShell
    url="www.semrush.com/tracking/overview/?projectId=8814207"
    active="Position Tracking"
    crumbs={["Dashboard", "Projects", "brandless.co.in", "Position Tracking"]}
    title="Position Tracking: brandless.co.in"
    right={
      <>
        <SemButton>Export to PDF</SemButton>
        <SemButton>Settings</SemButton>
      </>
    }
  >
    <p style={{ fontSize: 7.5, color: SEM.grey, marginTop: 2 }}>
      Google · India · Mobile · English · <span style={{ color: SEM.link }}>48 keywords</span>
    </p>
    <SemTabs tabs={["Landscape", "Overview", "Rankings Distribution", "Pages", "Tags", "Competitors Discovery", "Featured Snippets"]} active={1} />
    <div style={{ marginTop: 6, border: `1px solid ${SEM.line}`, borderRadius: 4 }}>
      <div className="flex">
        <Tile on label="Visibility" value="18.42%" diff={<Diff n={14.31} suffix="%" />} />
        <Tile label="Estimated traffic" value="1,294" diff={<Diff n={968} />} />
        <Tile label="Average position" value="11.4" diff={<Diff n={10.4} />} />
        <div style={{ flex: 1, padding: "5px 8px", fontSize: 7, color: SEM.grey }}>
          Apr 1 – Sep 27, 2025
          <span className="flex items-center" style={{ gap: 3, marginTop: 3, color: SEM.text }}>
            Daily <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div style={{ padding: "6px 6px 3px" }}>
        <TimeChart w={484} h={62} series={[{ values: VIS, color: SEM.blue, width: 1.3 }]} xLabels={["Apr 1", "May 1", "Jun 1", "Jul 1", "Aug 1", "Sep 1", "Sep 27"]} left={{ max: 24, ticks: 3, format: (n) => `${n}%` }} size={6.5} font={SEM.font} labelColor={SEM.grey} grid={SEM.line} />
      </div>
    </div>
    <SemTable
      style={{ marginTop: 6 }}
      rowH={19}
      cols={RCOLS}
      rows={RANKS.map(([kw, intents, a, b, vol, url]) => [
        <span key="k" style={{ color: SEM.link }}>
          {kw}
        </span>,
        <span key="i">{intents.map((x) => <Intent key={x} k={x} />)}</span>,
        a ?? <span style={{ color: SEM.light }}>–</span>,
        <b key="b" style={{ fontWeight: 600 }}>
          {b}
        </b>,
        a === null ? <span style={{ color: SEM.green, fontWeight: 500 }}>new</span> : <Diff n={a - (b ?? 101)} />,
        vol,
        <span key="u" className="truncate" style={{ color: SEM.link }}>
          brandless.co.in{url}
        </span>,
      ])}
    />
  </SemrushShell>
);

/* 03 · Google results for "yoga mat bag" -------------------------------- */

export const SerpTopThree: Screen = () => (
  <GoogleSerp query="yoga mat bag" tabs={["All", "Shopping", "Images", "Videos", "Short videos", "News", "More"]}>
    <SerpResult
      r={{
        site: "Amazon.in",
        url: "https://www.amazon.in › yoga-mat-bag › k=yoga+mat+bag",
        favicon: <Fav bg="#fff" color="#111" t="a" />,
        title: "Yoga Mat Bag - Buy Yoga Mat Bags Online at Best Prices",
        desc: "Results 1 - 48 of 2,000+ — Shop yoga mat bags with free delivery on eligible orders. Carry bags, straps and covers from top brands.",
      }}
    />
    <SerpRich
      site="Brandless"
      url="https://www.brandless.co.in › collections › yoga-mat-bags"
      favicon={<BrandlessFav />}
      title="Yoga Mat Bags | Handcrafted Canvas & Leather | Brandless"
      desc="Canvas yoga mat bags with leather trims, a zip pocket and an adjustable strap. Free monogramming of initials on every bag."
      rating={4.8}
      reviews="212"
      price="₹1,890.00"
      stock="In stock"
    />
    <SerpResult
      r={{
        site: "Decathlon",
        url: "https://www.decathlon.in › yoga › yoga-bags",
        favicon: <Fav bg="#0082c3" t="D" />,
        title: "Yoga Bags | Yoga Mat Bags & Carriers Online",
        desc: "Buy yoga mat bags and carriers online at Decathlon. Mat straps, backpacks and kit bags for yoga and pilates.",
      }}
    />
    <SerpResult
      r={{
        site: "Myntra",
        url: "https://www.myntra.com › yoga-mat-bag",
        favicon: <Fav bg="#ff3f6c" t="M" />,
        title: "Yoga Mat Bag - Buy Yoga Mat Bag online in India",
        desc: "Buy Yoga Mat Bag at best price in India. Easy returns and exchange on a range of yoga mat bags.",
      }}
    />
  </GoogleSerp>
);

/* 04 · Collection page on the Shopify store ----------------------------- */

// TODO(content): product names and prices illustrative; photos are crops of the real site hero.
const PRODUCTS: { name: string; price: string; was?: string; crop: { x: number; y: number; w: number; h: number } }[] = [
  { name: "Canvas Yoga Mat Bag – Midnight Navy", price: "Rs. 1,890.00", crop: { x: 515, y: 240, w: 260, h: 260 } },
  { name: "Yoga Mat Carrier Strap – Tan Leather", price: "Rs. 1,290.00", crop: { x: 640, y: 200, w: 330, h: 330 } },
  { name: "Leather Bottle Holder with Strap", price: "Rs. 1,490.00", was: "Rs. 1,690.00", crop: { x: 940, y: 270, w: 300, h: 300 } },
  { name: "Bottle Sleeve – Olive Leather", price: "Rs. 1,190.00", crop: { x: 900, y: 142, w: 200, h: 200 } },
];

export const CollectionPage: Screen = () => (
  <BrowserChrome url="www.brandless.co.in/collections/yoga-mat-bags">
      <div style={{ fontFamily: "Assistant, 'Helvetica Neue', Arial, sans-serif", color: "#121212", background: "#fff" }}>
        <div className="flex items-center justify-center" style={{ height: 15, background: "#121212", color: "#fff", fontSize: 6.5, letterSpacing: 0.6, fontFamily: "Montserrat, Arial, sans-serif" }}>
          FREE MONOGRAMMING OF INITIALS | ENJOY A SPECIAL DISCOUNT ON PREPAID ORDERS →
        </div>
        <header className="flex items-center" style={{ height: 40, padding: "0 56px 0 64px", borderBottom: "1px solid #e8e8e8", gap: 18 }}>
          <Photo {...LOGO} w={38} h={30} />
          <nav className="flex items-center" style={{ gap: 12, fontSize: 6.8, letterSpacing: 0.5, color: "#3a3a3a" }}>
            {["SHOP (ALL)", "COLLECTIONS", "GIFT COLLECTION", "CORPORATE GIFTING", "OUR JOURNEY"].map((t, i) => (
              <span key={t} className="flex items-center" style={{ gap: 2, textDecoration: i === 1 ? "underline" : undefined, textUnderlineOffset: 3 }}>
                {t}
                {(i < 2 || i === 4) && <ChevronDown style={{ width: 6, height: 6 }} aria-hidden="true" />}
              </span>
            ))}
          </nav>
          <span className="ml-auto flex items-center" style={{ gap: 12 }}>
            <Search style={{ width: 10, height: 10 }} aria-hidden="true" />
            <UserRound style={{ width: 10, height: 10 }} aria-hidden="true" />
            <ShoppingBag style={{ width: 10, height: 10 }} aria-hidden="true" />
          </span>
        </header>
        <section style={{ padding: "16px 64px 0" }}>
          <h1 style={{ fontFamily: "Montserrat, Arial, sans-serif", fontSize: 17, fontWeight: 500, letterSpacing: 0.4 }}>Collection: Yoga Mat Bags</h1>
          <p style={{ fontSize: 8, lineHeight: 1.6, color: "#4a4a4a", marginTop: 6, maxWidth: 460 }}>
            Handcrafted canvas yoga mat bags and carriers with leather trims, built to take a standard 4–6 mm mat to class and back. Each bag has a zip pocket for your phone and keys, an adjustable shoulder strap, and free monogramming of your initials.
          </p>
        </section>
        <div className="flex items-center" style={{ margin: "12px 64px 0", fontSize: 7.5, color: "#5a5a5a", gap: 12 }}>
          <span>Filter:</span>
          {["Availability", "Price"].map((t) => (
            <span key={t} className="flex items-center" style={{ gap: 2, color: "#121212" }}>
              {t}
              <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
            </span>
          ))}
          <span className="ml-auto">Sort by:</span>
          <span className="flex items-center" style={{ gap: 2, color: "#121212" }}>
            Best selling
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
          <span>9 products</span>
        </div>
        <div className="flex" style={{ margin: "10px 64px 0", gap: 8 }}>
          {PRODUCTS.map((p) => (
            <div key={p.name} style={{ width: 122 }}>
              <div className="relative">
                <Photo {...SITE} crop={p.crop} w={122} h={122} bg="#f3f3f3" />
                {p.was && (
                  <span className="absolute" style={{ left: 5, bottom: 5, fontSize: 6.5, padding: "2px 6px", borderRadius: 8, background: "#121212", color: "#fff" }}>
                    Sale
                  </span>
                )}
              </div>
              <p style={{ fontSize: 7.8, lineHeight: 1.35, marginTop: 6, letterSpacing: 0.2 }}>{p.name}</p>
              <p style={{ fontSize: 7.8, marginTop: 3 }}>
                {p.was && <s style={{ color: "#707070", marginRight: 5 }}>{p.was}</s>}
                {p.price}
              </p>
            </div>
          ))}
        </div>
      </div>
  </BrowserChrome>
);

/* 05 · GA4 traffic acquisition ------------------------------------------ */

const CH_COLORS = ["#1a73e8", "#12b5cb", "#e52592", "#e8710a", "#9334e6"];
const CH: [string, number, number, string, string, number, string][] = [
  // [channel, sessions, engaged sessions, engagement rate, avg engagement time, key events, revenue]
  ["Organic Search", 24815, 15883, "64.01%", "1m 12s", 612, "₹9,41,380"],
  ["Direct", 11406, 7109, "62.33%", "1m 04s", 318, "₹5,02,310"],
  ["Paid Social", 9872, 4027, "40.79%", "0m 31s", 201, "₹2,88,760"],
  ["Organic Social", 3318, 1792, "54.01%", "0m 48s", 57, "₹81,420"],
  ["Referral", 1247, 842, "67.52%", "1m 21s", 29, "₹44,960"],
  ["Email", 961, 688, "71.59%", "1m 33s", 34, "₹52,170"],
  ["Unassigned", 402, 96, "23.88%", "0m 09s", 7, "₹0"],
];
const SERIES = [
  noisy({ n: 180, from: 104, to: 176, seed: 41, noise: 0.13, weekly: 0.1, ease: -0.2, bumps: { 106: 0.74 } }),
  noisy({ n: 180, from: 58, to: 70, seed: 42, noise: 0.15, weekly: 0.12 }),
  noisy({ n: 180, from: 62, to: 46, seed: 43, noise: 0.25, bumps: { 40: 1.5, 41: 1.4, 150: 1.35 } }),
  noisy({ n: 180, from: 17, to: 20, seed: 44, noise: 0.3 }),
  noisy({ n: 180, from: 6, to: 8, seed: 45, noise: 0.45 }),
];

const GA_COLS: Col[] = [
  { label: "Session primary channel group (Default Channel Group)", w: 126 },
  { label: "↓ Sessions", w: 50, align: "right" },
  { label: "Engagement rate", w: 54, align: "right" },
  { label: "Average engagement time per session", w: 90, align: "right" },
  { label: "Key events", w: 50, align: "right" },
  { label: "Total revenue", w: 70, align: "right" },
];

export const Ga4Organic: Screen = () => (
  <GA4Shell account="Brandless" property="brandless.co.in – GA4" title="Traffic acquisition: Session primary channel group" dateRange="1 Apr – 27 Sept 2025">
    <GA4Card>
      <div className="flex" style={{ gap: 10, fontSize: 7, color: "#5f6368", marginBottom: 4, fontFamily: FONT.google }}>
        {CH.slice(0, 5).map(([c], i) => (
          <span key={c} className="flex items-center" style={{ gap: 3 }}>
            <span style={{ width: 8, height: 2, background: CH_COLORS[i] }} />
            {c}
          </span>
        ))}
      </div>
      <TimeChart w={438} h={70} series={SERIES.map((v, i) => ({ values: v, color: CH_COLORS[i], width: 1.2 }))} xLabels={["01 Apr", "01 May", "01 Jun", "01 Jul", "01 Aug", "01 Sept"]} left={{ max: 240, ticks: 3, format: (n) => `${n}` }} size={6.5} />
    </GA4Card>
    <GA4Table
      cols={GA_COLS}
      total={["Total", <Two2 key="s" a="52,021" />, <Two2 key="r" a="58.51%" b="Avg 0%" />, <Two2 key="t" a="0m 58s" b="Avg 0%" />, <Two2 key="k" a="1,258" />, <Two2 key="v" a="₹19,11,000" />]}
      rows={CH.map(([c, s, , r, t, ke, rev], i) => [`${i + 1}  ${c}`, num(s), r, t, num(ke), rev])}
    />
  </GA4Shell>
);

/** GA4 total cell: value with the grey "100% of total" line. */
function Two2({ a, b = "100% of total" }: { a: string; b?: string }) {
  return (
    <span style={{ display: "block", lineHeight: 1.25 }}>
      <span style={{ display: "block" }}>{a}</span>
      <span style={{ display: "block", fontSize: 6.5, color: "#5f6368", fontWeight: 400 }}>{b}</span>
    </span>
  );
}

export const brandlessSeoScreens: Screen[] = [SearchConsole, RankTracker, SerpTopThree, CollectionPage, Ga4Organic];
