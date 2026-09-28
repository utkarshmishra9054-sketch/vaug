import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowUp, Bell, ChevronDown, CircleHelp, EllipsisVertical, LayoutGrid, Search } from "lucide-react";

import { BrowserChrome, FONT, G, Initials, Stars } from "./tools";

/**
 * Faithful replicas of the SEO tools used on the Brandless, Jain Industries,
 * Ntech and epi.logic studies that ./tools.tsx does not cover: Semrush
 * (Position Tracking, Site Audit, Keyword Magic Tool) and a Google organic
 * result with product rich snippets. Design px on the 640 x 400 canvas.
 * Same realism rules as tools.tsx: only what the real product shows.
 */

const ic = (s: number): CSSProperties => ({ width: s, height: s, flexShrink: 0 });

/* ================================================================== */
/* Semrush (Intergalactic design system)                               */
/* ================================================================== */

export const SEM = {
  font: "Inter, 'Factor A', 'Helvetica Neue', Arial, sans-serif",
  text: "#191b23",
  grey: "#6c6e79",
  light: "#a6b0b3",
  line: "#e0e1e9",
  border: "#c4c7cf",
  head: "#f4f5f9",
  link: "#006dca",
  blue: "#008ff8",
  green: "#009f81",
  red: "#ff4953",
  orange: "#ff642d",
  purple: "#8649f1",
} as const;

/** The Semrush mark (orange ball with the white swoosh) and wordmark. */
export function SemrushLogo({ size = 15 }: { size?: number }) {
  return (
    <span className="flex items-center" style={{ gap: size * 0.3 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill={SEM.orange} />
        <path d="M5.2 13.4c1.8 3.7 7.4 5 11 2.2 2.3-1.8 2.9-5.1 1.3-7.4" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M8.4 12.2c1 1.6 3.4 2 4.9.8 1-.8 1.3-2.2.6-3.3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: SEM.font, fontSize: size * 0.82, fontWeight: 700, color: SEM.text, letterSpacing: -0.2 }}>Semrush</span>
    </span>
  );
}

const SEM_NAV: [string, string[]][] = [
  ["", ["Dashboard"]],
  ["COMPETITIVE RESEARCH", ["Domain Overview", "Traffic Analytics", "Organic Research", "Keyword Gap", "Backlink Gap"]],
  ["KEYWORD RESEARCH", ["Keyword Overview", "Keyword Magic Tool", "Keyword Strategy Builder", "Position Tracking", "Organic Traffic Insights"]],
  ["LINK BUILDING", ["Backlink Analytics", "Backlink Audit", "Link Building Tool"]],
  ["ON PAGE & TECH SEO", ["Site Audit", "Listing Management", "SEO Content Template", "On Page SEO Checker", "Log File Analyzer"]],
];

/**
 * Semrush app shell: header (logo, toolkit, search, account), the SEO
 * toolkit sidebar, breadcrumbs and page title. `children` fill the page.
 */
export function SemrushShell({
  url,
  active,
  crumbs,
  title,
  titleExtra,
  right,
  children,
}: {
  url: string;
  active: string;
  crumbs: string[];
  title: ReactNode;
  titleExtra?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <BrowserChrome url={url}>
      <div className="flex h-full flex-col" style={{ fontFamily: SEM.font, color: SEM.text, background: "#fff" }}>
        <header className="flex shrink-0 items-center" style={{ height: 28, padding: "0 10px", gap: 10, borderBottom: `1px solid ${SEM.line}` }}>
          <SemrushLogo size={14} />
          <span className="flex items-center" style={{ height: 17, padding: "0 6px", borderRadius: 4, background: SEM.head, fontSize: 7.5, fontWeight: 600, gap: 3 }}>
            SEO
            <ChevronDown style={ic(7)} aria-hidden="true" />
          </span>
          <span className="flex items-center" style={{ width: 190, height: 18, borderRadius: 4, border: `1px solid ${SEM.border}`, padding: "0 6px", gap: 4, fontSize: 7.5, color: SEM.light }}>
            <Search style={ic(8)} aria-hidden="true" />
            Enter domain, keyword or URL
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 10, fontSize: 7.5, color: SEM.grey }}>
            <span>Pricing</span>
            <span>Resources</span>
            <LayoutGrid style={ic(9)} aria-hidden="true" />
            <Bell style={ic(9)} aria-hidden="true" />
            <Initials name="V G" size={15} bg="#7b5e9f" />
          </span>
        </header>
        <div className="flex min-h-0 flex-1">
          <nav className="shrink-0 overflow-hidden" style={{ width: 118, background: SEM.head, borderRight: `1px solid ${SEM.line}`, paddingTop: 5, fontSize: 7.5 }}>
            {SEM_NAV.map(([h, items]) => (
              <div key={h || "top"}>
                {h && <div style={{ padding: "6px 10px 2px", fontSize: 6, fontWeight: 600, letterSpacing: 0.3, color: SEM.grey }}>{h}</div>}
                {items.map((t) => {
                  const on = t === active;
                  return (
                    <div key={t} className="truncate" style={{ height: 15, lineHeight: "15px", padding: "0 10px", background: on ? "#dcdfe6" : undefined, fontWeight: on ? 600 : 400, boxShadow: on ? `inset 2px 0 0 ${SEM.text}` : undefined }}>
                      {t}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
          <main className="min-w-0 flex-1 overflow-hidden" style={{ padding: "6px 12px 0" }}>
            <div className="flex items-center truncate" style={{ fontSize: 7, color: SEM.grey, gap: 3 }}>
              {crumbs.map((c, i) => (
                <span key={c} style={{ color: i < crumbs.length - 1 ? SEM.link : SEM.grey }}>
                  {c}
                  {i < crumbs.length - 1 && <span style={{ color: SEM.light, marginLeft: 3 }}>›</span>}
                </span>
              ))}
            </div>
            <div className="flex items-center" style={{ marginTop: 4, gap: 6 }}>
              <h1 className="truncate" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>
                {title}
              </h1>
              {titleExtra}
              <span className="ml-auto flex items-center" style={{ gap: 5 }}>
                {right}
              </span>
            </div>
            {children}
          </main>
        </div>
      </div>
    </BrowserChrome>
  );
}

/** Semrush secondary button (white, bordered). */
export function SemButton({ children, primary = false }: { children: ReactNode; primary?: boolean }) {
  return (
    <span className="flex items-center" style={{ height: 18, padding: "0 7px", borderRadius: 4, fontSize: 7.5, fontWeight: 600, whiteSpace: "nowrap", gap: 3, background: primary ? SEM.blue : "#fff", color: primary ? "#fff" : SEM.text, border: primary ? "none" : `1px solid ${SEM.border}` }}>
      {children}
    </span>
  );
}

/** Semrush tab strip (underlined active tab). */
export function SemTabs({ tabs, active }: { tabs: string[]; active: number }) {
  return (
    <div className="flex" style={{ marginTop: 6, gap: 12, fontSize: 8, borderBottom: `1px solid ${SEM.line}`, whiteSpace: "nowrap" }}>
      {tabs.map((t, i) => (
        <span key={t} style={{ paddingBottom: 5, fontWeight: i === active ? 600 : 400, color: i === active ? SEM.text : SEM.grey, borderBottom: i === active ? `2px solid ${SEM.blue}` : "2px solid transparent" }}>
          {t}
        </span>
      ))}
    </div>
  );
}

/** Green / red change figure with an arrow (Semrush "Diff" cells). `n` = positions gained. */
export function Diff({ n, suffix = "", size = 7.5 }: { n: number; suffix?: string; size?: number }) {
  if (n === 0) return <span style={{ color: SEM.light, fontSize: size }}>0</span>;
  const up = n > 0;
  const I = up ? ArrowUp : ArrowDown;
  return (
    <span className="inline-flex items-center" style={{ color: up ? SEM.green : SEM.red, fontSize: size, gap: 1, fontWeight: 500 }}>
      <I style={ic(size)} strokeWidth={2.5} aria-hidden="true" />
      {Math.abs(n)}
      {suffix}
    </span>
  );
}

/** Search intent badge: I(nformational), N(avigational), C(ommercial), T(ransactional). */
export function Intent({ k }: { k: "I" | "N" | "C" | "T" }) {
  const c = { I: ["#c4e5fe", "#006dca"], N: ["#e9dcfd", "#8649f1"], C: ["#ffe9b3", "#a26d00"], T: ["#9ef2c9", "#007c65"] }[k];
  return (
    <span className="inline-flex items-center justify-center" style={{ width: 11, height: 11, borderRadius: 3, background: c[0], color: c[1], fontSize: 6.5, fontWeight: 700, marginRight: 2 }}>
      {k}
    </span>
  );
}

/** Keyword difficulty % with the coloured difficulty dot. */
export function Kd({ v }: { v: number }) {
  const c = v < 15 ? "#009f81" : v < 30 ? "#59ddaa" : v < 50 ? "#fdc23c" : v < 70 ? "#ff8c43" : v < 85 ? "#ff4953" : "#d1002f";
  return (
    <span className="inline-flex items-center" style={{ gap: 3 }}>
      {v}
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
    </span>
  );
}

/** Tiny bar trend (12 months) as in Keyword Magic Tool. */
export function Trend({ v }: { v: number[] }) {
  const m = Math.max(...v);
  return (
    <svg width={v.length * 3} height={10} aria-hidden="true" style={{ display: "block" }}>
      {v.map((x, i) => (
        <rect key={i} x={i * 3} y={10 - Math.max(1, (x / m) * 10)} width={2} height={Math.max(1, (x / m) * 10)} fill="#a6b0b3" />
      ))}
    </svg>
  );
}

export type SemCol = { label: ReactNode; w: number; align?: "left" | "right" | "center" };

/** Semrush data table: grey header row, 20px rows, cropped at the right edge. */
export function SemTable({ cols, rows, rowH = 20, size = 7.5, style }: { cols: SemCol[]; rows: ReactNode[][]; rowH?: number; size?: number; style?: CSSProperties }) {
  const cell = (c: SemCol, v: ReactNode, k: number) => (
    <div key={k} className="flex items-center" style={{ width: c.w, flexShrink: 0, padding: "0 5px", justifyContent: c.align === "right" ? "flex-end" : c.align === "center" ? "center" : "flex-start", overflow: "hidden", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
      {v}
    </div>
  );
  return (
    <div style={{ fontSize: size, color: SEM.text, overflow: "hidden", ...style }}>
      <div className="flex" style={{ height: 22, background: SEM.head, borderTop: `1px solid ${SEM.line}`, borderBottom: `1px solid ${SEM.line}`, fontWeight: 600, fontSize: size - 0.5, color: SEM.grey }}>
        {cols.map((c, i) => cell(c, c.label, i))}
      </div>
      {rows.map((r, ri) => (
        <div key={ri} className="flex" style={{ height: rowH, borderBottom: `1px solid ${SEM.line}` }}>
          {cols.map((c, i) => cell(c, r[i], i))}
        </div>
      ))}
    </div>
  );
}

/** Semrush donut (Site Health and thematic report scores). */
export function Donut({ value, size, stroke, color = SEM.green, children }: { value: number; size: number; stroke: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e0e1e9" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${(value / 100) * c} ${c}`} />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ================================================================== */
/* Google organic result with product rich snippet                    */
/* ================================================================== */

/**
 * Organic result as Google shows it for a product page with Product schema:
 * favicon + site + breadcrumb URL, title, snippet, then a rating line and
 * price / availability row.
 */
export function SerpRich({
  site,
  url,
  favicon,
  title,
  desc,
  rating,
  reviews,
  price,
  stock = "In stock",
  extra,
  w = 330,
}: {
  site: string;
  url: string;
  favicon: ReactNode;
  title: string;
  desc: string;
  rating: number;
  reviews: string;
  price?: string;
  stock?: string;
  extra?: string;
  w?: number;
}) {
  return (
    <div style={{ width: w, marginBottom: 14, fontFamily: FONT.google }}>
      <div className="flex items-center" style={{ gap: 7 }}>
        <span className="flex items-center justify-center overflow-hidden" style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", border: "1px solid #ecedef", flexShrink: 0 }}>
          {favicon}
        </span>
        <span className="min-w-0" style={{ lineHeight: 1.25 }}>
          <span className="block truncate" style={{ fontSize: 8.5, color: G.text }}>
            {site}
          </span>
          <span className="flex items-center truncate" style={{ fontSize: 7.5, color: G.serpText, gap: 3 }}>
            {url}
            <EllipsisVertical style={ic(8)} aria-hidden="true" />
          </span>
        </span>
      </div>
      <p className="truncate" style={{ marginTop: 5, fontSize: 12, color: G.serpTitle, lineHeight: 1.3 }}>
        {title}
      </p>
      <p style={{ marginTop: 2, fontSize: 8, color: G.serpText, lineHeight: 1.5 }}>{desc}</p>
      <p className="flex items-center" style={{ marginTop: 2, fontSize: 7.5, color: "#70757a", gap: 3, whiteSpace: "nowrap" }}>
        <span style={{ color: G.serpText }}>{rating.toFixed(1)}</span>
        <Stars rating={rating} size={7} color="#e7711b" />
        <span>({reviews})</span>
        {price && <span>· {price}</span>}
        {stock && <span>· {stock}</span>}
        {extra && <span>· {extra}</span>}
      </p>
    </div>
  );
}

/** Google's round help / info glyph row used under SERP features ("Feedback"). */
export function SerpFeedback() {
  return (
    <p className="flex items-center justify-end" style={{ gap: 3, fontSize: 7, color: G.grey, marginTop: -6, marginBottom: 10 }}>
      <CircleHelp style={ic(7)} aria-hidden="true" />
      Feedback
    </p>
  );
}
