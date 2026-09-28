import { ChevronDown, ChevronRight, Earth, MapPin, Navigation, Plus } from "lucide-react";

import type { Screen } from "./kit";
import { Diff, Intent, Kd, SEM, SemButton, SemrushShell, SemTable, SemTabs, Trend, type SemCol } from "./seoKit";
import { BrowserChrome, CheckBox, FONT, G, GA4Card, GA4Shell, GA4Table, GoogleSerp, noisy, Photo, SerpResult, Stars, TimeChart, type Col } from "./tools";

/*
 * Local SEO for a 3D printing firm · Ahmedabad (Ntech Engineering Solutions,
 * ntechsolutions.co.in, WordPress).
 * "Ranked on Google within 4 months" is from the 2023 proposal; keyword
 * volumes, positions, competitors and enquiry numbers below are illustrative.
 * TODO(content): data illustrative; confirm keywords, positions and enquiry counts with Ntech.
 */

const DOMAIN = "ntechsolutions.co.in";
const LOGO = { src: "/logos/ntech.webp", img: { w: 355, h: 120 } };
const SITE = { src: "/sites/ntech.webp", img: { w: 1440, h: 900 } };
const NT_BLUE = "#236aa4";

const NtechFav = () => <Photo {...LOGO} crop={{ x: 0, y: 0, w: 120, h: 120 }} w={13} h={13} bg="#fff" />;

/* 01 · Semrush Keyword Magic Tool --------------------------------------- */

function IndiaFlag() {
  return (
    <span className="inline-flex flex-col" style={{ width: 11, height: 8, border: "0.5px solid #ddd" }}>
      <span style={{ flex: 1, background: "#ff9933" }} />
      <span className="flex items-center justify-center" style={{ flex: 1, background: "#fff" }}>
        <span style={{ width: 2, height: 2, borderRadius: "50%", border: "0.5px solid #000080" }} />
      </span>
      <span style={{ flex: 1, background: "#138808" }} />
    </span>
  );
}

const GROUPS: [string, number][] = [
  ["ahmedabad", 186],
  ["printing", 181],
  ["service", 34],
  ["near", 21],
  ["me", 21],
  ["price", 17],
  ["company", 15],
  ["gujarat", 12],
  ["online", 11],
  ["cost", 9],
  ["machine", 8],
  ["metal", 6],
  ["sla", 5],
  ["classes", 4],
];

// [keyword, intent, volume, 12-month trend, KD, CPC (USD), selected]
const KWS: [string, ("I" | "C" | "T")[], string, number[], number, string, boolean][] = [
  ["3d printing ahmedabad", ["C"], "590", [6, 7, 6, 8, 7, 9, 8, 8, 10, 9, 11, 10], 21, "0.38", true],
  ["3d printing in ahmedabad", ["C"], "390", [5, 6, 6, 5, 7, 7, 8, 7, 8, 9, 8, 9], 18, "0.41", true],
  ["3d printing service ahmedabad", ["C", "T"], "170", [3, 4, 3, 4, 5, 4, 5, 6, 5, 6, 7, 6], 14, "0.52", true],
  ["3d printing near me ahmedabad", ["T"], "140", [2, 3, 3, 4, 3, 4, 5, 4, 6, 5, 6, 7], 9, "0.44", true],
  ["3d printing company in ahmedabad", ["C"], "110", [4, 3, 4, 4, 5, 4, 4, 5, 4, 5, 5, 4], 16, "0.36", false],
  ["3d printer shop in ahmedabad", ["T"], "90", [3, 3, 2, 3, 4, 3, 3, 4, 3, 4, 3, 4], 7, "0.29", false],
  ["3d printing price in ahmedabad", ["C"], "70", [2, 2, 3, 2, 3, 3, 2, 3, 4, 3, 3, 4], 5, "0.47", true],
  ["3d printing classes in ahmedabad", ["I"], "50", [3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2], 3, "0.12", false],
  ["sla 3d printing ahmedabad", ["C"], "40", [1, 1, 2, 1, 2, 2, 1, 2, 2, 3, 2, 2], 4, "0.61", false],
  ["metal 3d printing ahmedabad", ["C"], "30", [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2], 12, "0.88", false],
];

const KCOLS: SemCol[] = [
  { label: <CheckBox size={8} border={SEM.border} />, w: 18 },
  { label: "Keyword", w: 142 },
  { label: "Intent", w: 36 },
  { label: "Volume", w: 38, align: "right" },
  { label: "Trend", w: 46 },
  { label: "KD %", w: 34, align: "right" },
  { label: "CPC (USD)", w: 46, align: "right" },
  { label: "Com.", w: 30, align: "right" },
];

const COM = ["0.62", "0.58", "0.71", "0.49", "0.55", "0.83", "0.37", "0.08", "0.44", "0.29"];

export const KeywordResearch: Screen = () => (
  <SemrushShell
    url="www.semrush.com/analytics/keywordmagic/?q=3d+printing+ahmedabad&db=in"
    active="Keyword Magic Tool"
    crumbs={["Dashboard", "Keyword Magic Tool"]}
    title={
      <>
        Keyword Magic Tool: <span style={{ fontWeight: 400 }}>3d printing ahmedabad</span>
      </>
    }
    right={<SemButton>View search history</SemButton>}
  >
    <div className="flex items-center" style={{ gap: 5, marginTop: 5 }}>
      <span className="flex items-center" style={{ height: 19, flex: 1, border: `1px solid ${SEM.border}`, borderRadius: 4, padding: "0 6px", fontSize: 8 }}>
        3d printing ahmedabad
      </span>
      <span className="flex items-center" style={{ height: 19, border: `1px solid ${SEM.border}`, borderRadius: 4, padding: "0 6px", fontSize: 7.5, gap: 4 }}>
        <IndiaFlag />
        IN
        <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
      </span>
      <SemButton primary>Search</SemButton>
    </div>
    <div className="flex items-center" style={{ gap: 4, marginTop: 6, fontSize: 7.5 }}>
      {["All", "Questions"].map((t, i) => (
        <span key={t} style={{ padding: "2px 7px", borderRadius: 4, background: i === 0 ? "#e0e1e9" : undefined, fontWeight: i === 0 ? 600 : 400 }}>
          {t}
        </span>
      ))}
      <span style={{ width: 1, height: 10, background: SEM.line, margin: "0 3px" }} />
      {["Broad Match", "Phrase Match", "Exact Match", "Related"].map((t, i) => (
        <span key={t} style={{ padding: "2px 7px", borderRadius: 4, background: i === 0 ? "#e0e1e9" : undefined, fontWeight: i === 0 ? 600 : 400 }}>
          {t}
        </span>
      ))}
    </div>
    <div className="flex items-center" style={{ gap: 4, marginTop: 5, fontSize: 7, whiteSpace: "nowrap" }}>
      {["Languages", "Volume", "KD %", "Intent", "CPC (USD)", "Include keywords", "Exclude keywords", "Advanced filters"].map((t) => (
        <span key={t} className="flex items-center" style={{ height: 16, padding: "0 5px", border: `1px solid ${SEM.border}`, borderRadius: 4, gap: 2 }}>
          {t}
          <ChevronDown style={{ width: 6, height: 6 }} aria-hidden="true" />
        </span>
      ))}
    </div>
    <div className="flex" style={{ gap: 8, marginTop: 7 }}>
      <div style={{ width: 96, flexShrink: 0, fontSize: 7.5 }}>
        <div className="flex" style={{ fontSize: 7, color: SEM.grey, gap: 6, marginBottom: 4 }}>
          <span style={{ color: SEM.text, fontWeight: 600 }}>By number</span>
          <span>By volume</span>
        </div>
        <div className="flex items-center" style={{ height: 16, padding: "0 5px", background: "#e0e1e9", borderRadius: 3, fontWeight: 600 }}>
          All keywords
          <span className="ml-auto">186</span>
        </div>
        {GROUPS.map(([g, n]) => (
          <div key={g} className="flex items-center" style={{ height: 15, padding: "0 5px", gap: 3 }}>
            <ChevronRight style={{ width: 6, height: 6, color: SEM.light }} aria-hidden="true" />
            {g}
            <span className="ml-auto" style={{ color: SEM.grey }}>
              {n}
            </span>
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center" style={{ fontSize: 7.5, gap: 12, height: 18 }}>
          <span>
            <span style={{ color: SEM.grey }}>All keywords: </span>
            <b style={{ fontWeight: 600 }}>186</b>
          </span>
          <span>
            <span style={{ color: SEM.grey }}>Total Volume: </span>
            <b style={{ fontWeight: 600 }}>5,410</b>
          </span>
          <span>
            <span style={{ color: SEM.grey }}>Average KD: </span>
            <b style={{ fontWeight: 600 }}>17%</b>
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 4 }}>
            <SemButton>
              <Plus style={{ width: 7, height: 7 }} aria-hidden="true" />
              To Keyword Strategy
            </SemButton>
            <SemButton>Export</SemButton>
          </span>
        </div>
        <SemTable
          style={{ marginTop: 4 }}
          rowH={19}
          cols={KCOLS}
          rows={KWS.map(([kw, intents, vol, trend, kd, cpc, on], i) => [
            <CheckBox key="c" on={on} size={8} color={SEM.blue} border={SEM.border} />,
            <span key="k" className="truncate" style={{ color: SEM.link }}>
              {kw}
            </span>,
            <span key="i">{intents.map((x) => <Intent key={x} k={x} />)}</span>,
            vol,
            <Trend key="t" v={trend} />,
            <Kd key="d" v={kd} />,
            cpc,
            COM[i],
          ])}
        />
      </div>
    </div>
  </SemrushShell>
);

/* 02 · Semrush Position Tracking, Rankings Distribution ----------------- */

const WEEKS = 26;
const clamp = (v: number[]) => v.map((x) => Math.max(0, Math.round(x)));
// Keywords (of 42 tracked) in each band per week, 6 Jan – 30 Jun 2025.
const T3 = clamp(noisy({ n: WEEKS, from: -3.5, to: 6, seed: 71, noise: 0.05, ease: -0.2 }));
const T10 = clamp(noisy({ n: WEEKS, from: -2, to: 17, seed: 72, noise: 0.06, ease: 0.3 }));
const T20 = clamp(noisy({ n: WEEKS, from: 1, to: 9, seed: 73, noise: 0.15, ease: 0.6, bumps: { 8: 1.4, 9: 1.3 } }));
const T100 = clamp(noisy({ n: WEEKS, from: 3, to: 8, seed: 74, noise: 0.2, bumps: { 4: 2.6, 5: 2.8, 6: 2.5, 7: 2.1, 8: 1.7 } }));
// Last week matches the tiles: 6 in top 3, 23 in top 10, 32 in top 20, 40 in top 100.
T3[WEEKS - 1] = 6;
T10[WEEKS - 1] = 17;
T20[WEEKS - 1] = 9;
T100[WEEKS - 1] = 8;

const BANDS: [string, number[], string][] = [
  ["Top 3", T3, "#2bb3ff"],
  ["4–10", T10, "#59ddaa"],
  ["11–20", T20, "#fdc23c"],
  ["21–100", T100, "#ab6cfe"],
];

function Distribution({ w, h }: { w: number; h: number }) {
  const pl = 18;
  const bottom = h - 12;
  const max = 45;
  const bw = (w - pl) / WEEKS;
  const labels: [number, string][] = [
    [0, "Jan 6"],
    [4, "Feb 3"],
    [8, "Mar 3"],
    [13, "Apr 7"],
    [17, "May 5"],
    [21, "Jun 2"],
    [25, "Jun 30"],
  ];
  return (
    <svg width={w} height={h} style={{ display: "block", fontFamily: SEM.font }} aria-hidden="true">
      {[0, 15, 30, 45].map((v) => {
        const y = bottom - (v / max) * (bottom - 4);
        return (
          <g key={v}>
            <line x1={pl} x2={w} y1={y} y2={y} stroke={SEM.line} />
            <text x={pl - 4} y={y + 2.5} fontSize={6.5} fill={SEM.grey} textAnchor="end">
              {v}
            </text>
          </g>
        );
      })}
      {Array.from({ length: WEEKS }, (_, i) => {
        let acc = 0;
        return (
          <g key={i}>
            {BANDS.map(([name, v, c]) => {
              const hh = (v[i] / max) * (bottom - 4);
              acc += hh;
              return <rect key={name} x={pl + i * bw + bw * 0.18} y={bottom - acc} width={bw * 0.64} height={hh} fill={c} />;
            })}
          </g>
        );
      })}
      {labels.map(([i, t]) => (
        <text key={t} x={pl + i * bw + bw / 2} y={h - 2} fontSize={6.5} fill={SEM.grey} textAnchor="middle">
          {t}
        </text>
      ))}
    </svg>
  );
}

// [keyword, position 6 Jan (null = not in top 100), position 30 Jun, volume]
const NT_RANKS: [string, number | null, number, string][] = [
  ["sla 3d printing ahmedabad", 88, 3, "40"],
  ["rapid prototyping ahmedabad", null, 4, "210"],
  ["3d printing in ahmedabad", null, 5, "390"],
  ["3d printing ahmedabad", null, 6, "590"],
  ["fdm 3d printing service", null, 9, "170"],
  ["3d printing service in gujarat", null, 14, "90"],
  ["industrial 3d printing india", null, 38, "480"],
];

const NCOLS: SemCol[] = [
  { label: "Keyword", w: 150 },
  { label: "Pos. Jan 6", w: 54, align: "right" },
  { label: "Pos. Jun 30", w: 56, align: "right" },
  { label: "Diff", w: 44, align: "right" },
  { label: "Volume", w: 44, align: "right" },
  { label: "URL", w: 140 },
];
const NURL: Record<string, string> = {
  "sla 3d printing ahmedabad": "/sla-3d-printing/",
  "rapid prototyping ahmedabad": "/rapid-prototyping-ahmedabad/",
  "3d printing in ahmedabad": "/3d-printing-in-ahmedabad/",
  "3d printing ahmedabad": "/3d-printing-in-ahmedabad/",
  "fdm 3d printing service": "/fdm-3d-printing/",
  "3d printing service in gujarat": "/3d-printing-in-ahmedabad/",
  "industrial 3d printing india": "/industrial-3d-printing/",
};

export const RankingTimeline: Screen = () => (
  <SemrushShell
    url="www.semrush.com/tracking/distribution/?projectId=7712934"
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
      Google · Ahmedabad, Gujarat, India · Mobile · English · <span style={{ color: SEM.link }}>42 keywords</span>
    </p>
    <SemTabs tabs={["Landscape", "Overview", "Rankings Distribution", "Pages", "Tags", "Competitors Discovery", "Featured Snippets"]} active={2} />
    <div style={{ marginTop: 6, border: `1px solid ${SEM.line}`, borderRadius: 4 }}>
      <div className="flex" style={{ borderBottom: `1px solid ${SEM.line}` }}>
        {(
          [
            ["Top 3", "6", 6, "#2bb3ff"],
            ["Top 10", "23", 23, "#59ddaa"],
            ["Top 20", "32", 31, "#fdc23c"],
            ["Top 100", "40", 37, "#ab6cfe"],
          ] as const
        ).map(([l, v, d, c]) => (
          <div key={l} style={{ flex: 1, padding: "4px 8px", borderRight: `1px solid ${SEM.line}` }}>
            <p className="flex items-center" style={{ fontSize: 7, color: SEM.grey, gap: 3 }}>
              <span style={{ width: 6, height: 6, borderRadius: 1.5, background: c }} />
              Keywords in {l}
            </p>
            <p className="flex items-baseline" style={{ gap: 5, marginTop: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
              <Diff n={d} size={7} />
            </p>
          </div>
        ))}
        <div style={{ flex: 0.9, padding: "4px 8px", fontSize: 7, color: SEM.grey }}>
          Jan 6 – Jun 30, 2025
          <span className="flex items-center" style={{ gap: 3, marginTop: 3, color: SEM.text }}>
            Weekly <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div style={{ padding: "6px 8px 4px" }}>
        <Distribution w={482} h={84} />
      </div>
    </div>
    <SemTable
      style={{ marginTop: 6 }}
      rowH={19}
      cols={NCOLS}
      rows={NT_RANKS.map(([kw, a, b, vol]) => [
        <span key="k" style={{ color: SEM.link }}>
          {kw}
        </span>,
        a ?? <span style={{ color: SEM.light }}>–</span>,
        <b key="b" style={{ fontWeight: 600 }}>
          {b}
        </b>,
        a === null ? <span style={{ color: SEM.green, fontWeight: 500 }}>new</span> : <Diff n={a - b} />,
        vol,
        <span key="u" className="truncate" style={{ color: SEM.link }}>
          {DOMAIN}
          {NURL[kw]}
        </span>,
      ])}
    />
  </SemrushShell>
);

/* 03 · Google results with the Maps pack -------------------------------- */

/** Google Maps tile of west Ahmedabad (Sabarmati on the right, S.G. Highway on the left). */
function LocalMap({ w, h }: { w: number; h: number }) {
  const pins: [number, number, string, boolean][] = [
    [96, 60, "Ntech Engineering Solutions", true],
    [172, 30, "Protoshape 3D Studio", false],
    [226, 74, "Shreeji 3D Print Hub", false],
  ];
  return (
    <svg width={w} height={h} style={{ display: "block", background: "#f1f3f4" }} aria-hidden="true">
      <rect x={196} y={0} width={30} height={20} fill="#c8e6c9" />
      <rect x={30} y={78} width={26} height={18} fill="#c8e6c9" />
      <path d={`M${w - 70} 0 C ${w - 62} 30, ${w - 86} 60, ${w - 72} ${h}`} stroke="#aadaff" strokeWidth="13" fill="none" />
      {[
        "M0 32 L330 44",
        "M0 70 L330 88",
        "M120 0 L136 110",
        "M180 0 L170 110",
        "M60 0 C 90 50, 110 70, 150 110",
        "M0 100 L330 60",
      ].map((d) => (
        <path key={d} d={d} stroke="#fff" strokeWidth="3" fill="none" />
      ))}
      <path d="M40 0 C 44 40, 36 80, 42 110" stroke="#f9ab00" strokeWidth="5.5" fill="none" />
      <path d="M40 0 C 44 40, 36 80, 42 110" stroke="#fde293" strokeWidth="4" fill="none" />
      <path d="M0 18 C 120 14, 200 24, 330 20" stroke="#f9ab00" strokeWidth="4.5" fill="none" />
      <path d="M0 18 C 120 14, 200 24, 330 20" stroke="#fde293" strokeWidth="3" fill="none" />
      {[
        [72, 90, "Prahlad Nagar"],
        [150, 52, "Vastrapur"],
        [196, 102, "Jodhpur"],
        [214, 44, "Navrangpura"],
        [w - 36, 96, "Paldi"],
        [52, 12, "Bodakdev"],
      ].map(([x, y, t]) => (
        <text key={t as string} x={x as number} y={y as number} fontSize={6.5} fill="#5f6368" fontFamily={FONT.google} textAnchor="middle">
          {t as string}
        </text>
      ))}
      <text x={w - 70} y={58} fontSize={6} fill="#4c8fcf" fontFamily={FONT.google} fontStyle="italic" textAnchor="middle" transform={`rotate(80 ${w - 70} 58)`}>
        Sabarmati River
      </text>
      {pins.map(([x, y, name, me]) => (
        <g key={name}>
          <path d={`M${x} ${y} c-4.5 -6 -6.5 -8.5 -6.5 -11.5 a6.5 6.5 0 0 1 13 0 c0 3 -2 5.5 -6.5 11.5z`} fill="#ea4335" stroke="#b31412" strokeWidth="0.6" />
          <circle cx={x} cy={y - 11.5} r={2.3} fill="#b31412" />
          <text x={x + 9} y={y - 9} fontSize={6.5} fontWeight={me ? 700 : 500} fill="#b31412" fontFamily={FONT.google} stroke="#fff" strokeWidth={2} paintOrder="stroke">
            {name}
          </text>
        </g>
      ))}
    </svg>
  );
}

// TODO(content): illustrative competitor names, ratings and hours.
const PLACES: { name: string; rating: number; reviews: number; type: string; line: string; hours: string; me?: boolean }[] = [
  { name: "Shreeji 3D Print Hub", rating: 4.7, reviews: 112, type: "3D printing service", line: "8+ years in business · Paldi", hours: "Open · Closes 8 pm" },
  { name: "Ntech Engineering Solutions", rating: 5.0, reviews: 46, type: "3D printing service", line: "Prahladnagar Rd · 075677 56262", hours: "Open · Closes 7 pm", me: true },
  { name: "Protoshape 3D Studio", rating: 4.4, reviews: 38, type: "Rapid prototyping service", line: "Vastrapur", hours: "Closed · Opens 10 am Mon" },
];

export const LocalSerp: Screen = () => (
  <GoogleSerp query="3d printing in ahmedabad" tabs={["All", "Maps", "Images", "Shopping", "Videos", "News", "More"]}>
    <div style={{ border: `1px solid ${G.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
      <LocalMap w={330} h={108} />
      <div className="flex" style={{ gap: 5, padding: "6px 10px 2px", fontSize: 7.5 }}>
        {["Rating", "Hours"].map((t) => (
          <span key={t} className="flex items-center" style={{ height: 15, padding: "0 7px", borderRadius: 8, border: `1px solid ${G.border}`, gap: 2, color: G.text }}>
            {t}
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
        ))}
      </div>
      {PLACES.map((p) => (
        <div key={p.name} className="flex" style={{ padding: "5px 10px", borderTop: `1px solid ${G.line}`, gap: 8 }}>
          <div className="min-w-0 flex-1" style={{ lineHeight: 1.35 }}>
            <p style={{ fontSize: 9.5, color: G.serpTitle }}>{p.name}</p>
            <p className="flex items-center" style={{ fontSize: 7.5, color: G.serpText, gap: 3 }}>
              {p.rating.toFixed(1)}
              <Stars rating={p.rating} size={7} />({p.reviews}) · {p.type}
            </p>
            <p style={{ fontSize: 7.5, color: G.serpText }}>{p.line}</p>
            <p style={{ fontSize: 7.5, color: p.hours.startsWith("Open") ? "#188038" : "#d93025" }}>
              {p.hours.split(" · ")[0]}
              <span style={{ color: G.serpText }}> · {p.hours.split(" · ")[1]}</span>
            </p>
          </div>
          <div className="flex items-center" style={{ gap: 8 }}>
            {[Earth, Navigation].map((I, i) => (
              <span key={i} className="flex flex-col items-center" style={{ gap: 2, fontSize: 6.5, color: G.link }}>
                <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${G.border}` }}>
                  <I style={{ width: 8, height: 8 }} aria-hidden="true" />
                </span>
                {i === 0 ? "Website" : "Directions"}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center" style={{ height: 24, borderTop: `1px solid ${G.line}`, fontSize: 8, color: G.text, gap: 4 }}>
        More places
        <ChevronRight style={{ width: 8, height: 8 }} aria-hidden="true" />
      </div>
    </div>
    <SerpResult
      r={{
        site: "Ntech Engineering Solutions",
        url: `https://${DOMAIN} › 3d-printing-in-ahmedabad`,
        favicon: <NtechFav />,
        title: "3D Printing in Ahmedabad | FDM, SLA & Industrial | Ntech",
        desc: "Professional 3D printing in Ahmedabad for rapid prototyping and industrial parts. FDM, SLA and resin printing with 3D design support.",
      }}
    />
  </GoogleSerp>
);

/* 04 · Rapid prototyping service page ------------------------------------ */

export const ServicePage: Screen = () => (
  <BrowserChrome url={`${DOMAIN}/rapid-prototyping-ahmedabad/`}>
    <div className="h-full" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", color: "#0b1426", background: "#fff" }}>
      <div className="flex items-center" style={{ height: 16, background: NT_BLUE, color: "#fff", fontSize: 6.5, padding: "0 50px", gap: 4 }}>
        <MapPin style={{ width: 7, height: 7 }} aria-hidden="true" />
        Location: Prahladnagar Road, Ahmedabad
        <span className="ml-auto flex items-center" style={{ gap: 10, fontWeight: 700 }}>
          <span>f</span>
          <span>X</span>
          <span>in</span>
          <span style={{ width: 7, height: 7, border: "1.2px solid #fff", borderRadius: 2 }} />
        </span>
      </div>
      <header className="flex items-center" style={{ height: 34, paddingLeft: 30, gap: 22 }}>
        <Photo {...LOGO} w={68} h={23} />
        <nav className="ml-auto flex items-center" style={{ gap: 20, fontSize: 8, color: "#1f2937" }}>
          {["About", "Service +", "Manufacturing +", "Gallery", "Blogs", "Contact"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </nav>
        <span className="flex flex-col items-center justify-center" style={{ height: 34, width: 124, background: NT_BLUE, color: "#fff", marginRight: 40 }}>
          <span style={{ fontSize: 9, fontWeight: 700 }}>Get Consultation</span>
          <span style={{ fontSize: 7.5 }}>+91 75677 56262</span>
        </span>
      </header>
      <section className="relative" style={{ height: 212, background: "#000a1f" }}>
        <div className="absolute" style={{ left: 205, top: 0, right: 0, height: 8, background: "#6cbde7" }} />
        <div className="absolute" style={{ left: 205, top: 8, right: 0, bottom: 0 }}>
          <Photo {...SITE} crop={{ x: 760, y: 150, w: 680, h: 560 }} w={435} h={204} />
        </div>
        <div className="absolute" style={{ left: 66, top: 34, width: 262, background: "#fff", padding: "18px 22px 18px" }}>
          <p style={{ fontSize: 7, color: NT_BLUE, fontWeight: 700 }}>Home › Services › Rapid Prototyping</p>
          <h1 style={{ fontFamily: "Kanit, 'DM Sans', Arial, sans-serif", fontSize: 18, fontWeight: 600, lineHeight: 1.12, marginTop: 5 }}>Rapid Prototyping in Ahmedabad</h1>
          <p style={{ fontSize: 7.5, lineHeight: 1.6, color: "#374151", marginTop: 6 }}>
            Ntech Engineering Solutions turns CAD files into working prototypes in 24–72 hours, using FDM, SLA and industrial 3D printing for fit checks, functional testing and short production runs.
          </p>
          <span className="inline-flex items-center" style={{ marginTop: 9, height: 20, padding: "0 14px", background: NT_BLUE, color: "#fff", fontSize: 8 }}>
            Get a Quote
          </span>
        </div>
      </section>
      <section style={{ padding: "14px 66px 0" }}>
        <h2 style={{ fontFamily: "Kanit, 'DM Sans', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>Rapid prototyping services we offer</h2>
        <div className="flex" style={{ gap: 10, marginTop: 8 }}>
          {[
            ["FDM prototyping", "PLA, ABS, PETG and nylon parts for form and fit checks, up to 300 × 300 × 400 mm."],
            ["SLA prototyping", "High-detail resin parts with smooth surfaces for display models and small components."],
            ["Functional prototypes", "Engineering-grade materials for snap fits, jigs, fixtures and testing."],
          ].map(([t, d]) => (
            <div key={t} style={{ flex: 1, borderTop: `2px solid ${NT_BLUE}`, background: "#f3f6fa", padding: "7px 9px" }}>
              <p style={{ fontSize: 8.5, fontWeight: 700 }}>{t}</p>
              <p style={{ fontSize: 7, lineHeight: 1.5, color: "#4b5563", marginTop: 3 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </BrowserChrome>
);

/* 05 · GA4: enquiries (generate_lead) by channel ------------------------- */

// Weekly generate_lead key events, 6 Jan – 29 Jun 2025.
const ORG_LEADS = noisy({ n: 26, from: 2, to: 14, seed: 81, noise: 0.22, ease: -0.3, bumps: { 3: 0.5, 17: 1.3 } });
const DIR_LEADS = noisy({ n: 26, from: 3, to: 4.5, seed: 82, noise: 0.35 });

const LCOLS: Col[] = [
  { label: "Session primary channel group (Default Channel Group)", w: 120 },
  { label: "↓ Sessions", w: 52, align: "right" },
  { label: "Engaged sessions", w: 56, align: "right" },
  { label: "Engagement rate", w: 56, align: "right" },
  { label: "Key events generate_lead", w: 76, align: "right" },
  { label: "Session key event rate generate_lead", w: 80, align: "right" },
];

const LROWS: [string, string, string, string, string, string][] = [
  ["Organic Search", "6,184", "3,872", "62.61%", "212.00", "3.02%"],
  ["Direct", "2,907", "1,716", "59.03%", "96.00", "2.92%"],
  ["Referral", "611", "402", "65.79%", "21.00", "3.11%"],
  ["Organic Social", "488", "251", "51.43%", "9.00", "1.64%"],
  ["Unassigned", "164", "38", "23.17%", "2.00", "1.22%"],
];

function Total({ a, b = "100% of total" }: { a: string; b?: string }) {
  return (
    <span style={{ display: "block", lineHeight: 1.25 }}>
      <span style={{ display: "block" }}>{a}</span>
      <span style={{ display: "block", fontSize: 6.5, color: "#5f6368", fontWeight: 400 }}>{b}</span>
    </span>
  );
}

export const OrganicEnquiries: Screen = () => (
  <GA4Shell account="Ntech Engineering Solutions" property={`${DOMAIN} – GA4`} title="Traffic acquisition: Session primary channel group" dateRange="1 Jan – 30 Jun 2025">
    <GA4Card>
      <div className="flex items-center" style={{ gap: 10, fontSize: 7, color: "#5f6368", marginBottom: 4 }}>
        <span style={{ color: G.text, fontWeight: 500 }}>Key events (generate_lead) by Session primary channel group over time</span>
        {[
          ["Organic Search", "#1a73e8"],
          ["Direct", "#12b5cb"],
        ].map(([t, c]) => (
          <span key={t} className="flex items-center" style={{ gap: 3 }}>
            <span style={{ width: 8, height: 2, background: c }} />
            {t}
          </span>
        ))}
      </div>
      <TimeChart
        w={438}
        h={78}
        series={[
          { values: ORG_LEADS, color: "#1a73e8", width: 1.4 },
          { values: DIR_LEADS, color: "#12b5cb", width: 1.4 },
        ]}
        xLabels={["05 Jan", "02 Feb", "02 Mar", "30 Mar", "27 Apr", "25 May", "22 Jun"]}
        left={{ max: 21, ticks: 3, format: (n) => `${n}` }}
        size={6.5}
      />
    </GA4Card>
    <GA4Table
      cols={LCOLS}
      total={["Total", <Total key="s" a="10,354" />, <Total key="e" a="6,279" />, <Total key="r" a="60.64%" b="Avg 0%" />, <Total key="k" a="340.00" />, <Total key="kr" a="2.87%" b="Avg 0%" />]}
      rows={LROWS.map(([c, ...rest], i) => [`${i + 1}  ${c}`, ...rest])}
    />
  </GA4Shell>
);

export const ntechSeoScreens: Screen[] = [KeywordResearch, RankingTimeline, LocalSerp, ServicePage, OrganicEnquiries];
