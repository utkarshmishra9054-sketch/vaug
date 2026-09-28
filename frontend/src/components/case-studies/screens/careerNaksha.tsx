import { ArrowLeft, ArrowRight, ChevronDown, Earth, Grid3x3, Info, Maximize2, Navigation, X } from "lucide-react";

import type { Screen } from "./kit";
import { Bars, BrowserChrome, FONT, G, GoogleSerp, noisy, num, Photo, SearchConsole, SerpResult, Stars, type Col } from "./tools";

/* CareerNaksha · SEO and local SEO (28 Jan – 3 May 2022).
   From the study: average map rank 20.2 -> 1.4 on a 5x5 grid at 500 m spacing
   (1 -> 25 high-ranking points), organic traffic +300%.
   The per-point ranks below are chosen so the averages match exactly
   (Jan: 3 + 20 + 20 + 22 x "20+" (21) = 505 / 25 = 20.2; May: 17 x 1 + 6 x 2 + 2 x 3 = 35 / 25 = 1.4).
   TODO(content): illustrative — the tracked keyword, per-point ranks, competitor
   names, rating and review count, city page URLs and every click, impression
   and Business Profile figure. */

const LOGO = { src: "/logos/careernaksha.webp", img: { w: 480, h: 99 } };
const KEYWORD = "career counselling near me";

function Mark({ size }: { size: number }) {
  return <Photo {...LOGO} crop={{ x: 0, y: 0, w: 116, h: 99 }} w={size} h={size * 0.85} />;
}

/* 01 · Local rank grid, 28 Jan vs 3 May 2022 ------------------------ */

const RT = { font: "'Open Sans', 'Noto Sans', Arial, sans-serif", red: "#c8101b", orange: "#d9760f", green: "#1ca33c", text: "#222", grey: "#666", line: "#e3e3e3" };

// TODO(content): illustrative per-point ranks (row by row, business at the centre); averages match the study.
const JAN: (number | "20+")[] = ["20+", "20+", "20+", "20+", "20+", "20+", "20+", 20, "20+", "20+", "20+", 20, 3, "20+", "20+", "20+", "20+", "20+", "20+", "20+", "20+", "20+", "20+", "20+", "20+"];
const MAY: number[] = [2, 1, 1, 1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 2, 1, 1, 2];

const rankColor = (r: number | "20+") => (r === "20+" || r > 10 ? RT.red : r > 3 ? RT.orange : RT.green);

/** A Google-style base map (roads, a park, a lake), the same area in both panels. */
function MapBase({ w, h }: { w: number; h: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 300 250" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      <rect width="300" height="250" fill="#f1f3f4" />
      <path d="M0 0h300v250H0z" fill="#eef0ec" opacity="0.5" />
      <path d="M196 150c14-6 34-4 44 8 9 11 4 26-10 30-16 5-38 0-44-12-4-9 1-21 10-26z" fill="#aadaff" />
      <path d="M22 168h58v46H22z" fill="#c9e8d0" rx="3" />
      <path d="M214 18h58v34h-58z" fill="#c9e8d0" />
      <path d="M118 196h40v30h-40z" fill="#e6e1ec" />
      {/* minor streets */}
      {[
        "M0 34 L300 40",
        "M0 88 L140 84 L300 92",
        "M0 206 L300 214",
        "M36 0 L40 250",
        "M92 0 L86 120 L94 250",
        "M178 0 L184 250",
        "M232 0 L236 120",
        "M270 60 L276 250",
        "M120 40 L150 84",
        "M20 140 L70 150 L110 128",
        "M140 170 L186 186",
        "M200 64 L262 70",
        "M60 60 L64 118",
        "M150 100 L152 160",
      ].map((d) => (
        <g key={d}>
          <path d={d} stroke="#dadce0" strokeWidth="4" fill="none" />
          <path d={d} stroke="#fff" strokeWidth="2.6" fill="none" />
        </g>
      ))}
      {/* arterials */}
      {["M0 128 C80 122 150 136 300 124", "M126 0 C130 70 118 150 132 250", "M0 236 L110 180 L300 60"].map((d) => (
        <g key={d}>
          <path d={d} stroke="#f2b92a" strokeWidth="6" fill="none" opacity="0.7" />
          <path d={d} stroke="#fde293" strokeWidth="4.4" fill="none" />
        </g>
      ))}
    </svg>
  );
}

function RankPin({ r }: { r: number | "20+" }) {
  const c = rankColor(r);
  return (
    <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: "50%", background: c, color: "#fff", border: "1.5px solid #fff", boxShadow: "0 1px 2px rgb(0 0 0 / 0.35)", fontSize: r === "20+" ? 7.5 : 9, fontWeight: 700, fontFamily: RT.font }}>
      {r}
    </span>
  );
}

function GridPanel({ date, avg, ranks }: { date: string; avg: string; ranks: (number | "20+")[] }) {
  const good = parseFloat(avg) <= 3;
  const W = 296;
  const H = 262;
  return (
    <div style={{ width: W, border: `1px solid ${RT.line}`, borderRadius: 3, overflow: "hidden", background: "#fff" }}>
      <div className="flex items-center" style={{ height: 34, padding: "0 10px", gap: 8, borderBottom: `1px solid ${RT.line}` }}>
        <span style={{ fontSize: 11, fontWeight: 700 }}>{date}</span>
        <span className="ml-auto flex items-center" style={{ gap: 5, fontSize: 7.5, color: RT.grey }}>
          Average Map Rank
          <span style={{ minWidth: 30, textAlign: "center", padding: "3px 5px", borderRadius: 2, background: good ? RT.green : RT.red, color: "#fff", fontSize: 10, fontWeight: 600 }}>{avg}</span>
        </span>
      </div>
      <div className="relative" style={{ width: W, height: H }}>
        <MapBase w={W} h={H} />
        {ranks.map((r, i) => (
          <span key={i} style={{ position: "absolute", left: 38 + (i % 5) * 55 - 11, top: 26 + Math.floor(i / 5) * 52 - 11 }}>
            <RankPin r={r} />
          </span>
        ))}
        <span className="flex flex-col" style={{ position: "absolute", right: 6, bottom: 20, background: "#fff", borderRadius: 2, boxShadow: "0 1px 3px rgb(0 0 0 / 0.3)", fontSize: 11, color: "#666", lineHeight: "15px", textAlign: "center", width: 16 }}>
          <span style={{ borderBottom: "1px solid #eee" }}>+</span>
          <span>−</span>
        </span>
        <span className="flex items-center justify-center" style={{ position: "absolute", right: 6, top: 6, width: 16, height: 16, background: "#fff", borderRadius: 2, boxShadow: "0 1px 3px rgb(0 0 0 / 0.3)", color: "#666" }}>
          <Maximize2 style={{ width: 8, height: 8 }} aria-hidden="true" />
        </span>
        <span style={{ position: "absolute", left: 4, bottom: 3, fontFamily: "'Product Sans', Arial, sans-serif", fontSize: 9, fontWeight: 500, color: "#5f6368" }}>Google</span>
        <span style={{ position: "absolute", right: 0, bottom: 0, background: "rgb(255 255 255 / 0.75)", padding: "0 4px", fontSize: 5.5, color: "#444", fontFamily: FONT.google }}>Map data ©2022 Google · Terms</span>
      </div>
    </div>
  );
}

export const RankGridCompare: Screen = () => (
  <div style={{ width: 640, height: 400, background: "#f7f7f7", fontFamily: RT.font, color: RT.text, overflow: "hidden" }}>
    <div className="flex items-center" style={{ height: 44, padding: "0 16px", gap: 10, background: "#fff", borderBottom: `1px solid ${RT.line}` }}>
      <span style={{ fontSize: 7.5, color: RT.grey }}>Keyword</span>
      <span className="flex items-center" style={{ height: 22, padding: "0 8px", border: "1px solid #ccc", borderRadius: 3, fontSize: 9, fontWeight: 600, gap: 18 }}>
        {KEYWORD}
        <ChevronDown style={{ width: 9, height: 9, color: RT.grey }} aria-hidden="true" />
      </span>
      <span className="ml-auto flex items-center" style={{ gap: 12, fontSize: 8, color: "#333" }}>
        <span className="flex items-center" style={{ gap: 3 }}>
          <Grid3x3 style={{ width: 9, height: 9 }} aria-hidden="true" />
          Grid Size: 5x5 (Grid Points: 25)
        </span>
        <span className="flex items-center" style={{ gap: 3 }}>
          <Maximize2 style={{ width: 8, height: 8 }} aria-hidden="true" />
          Spacing: 500 Meters
        </span>
        <span style={{ padding: "4px 8px", border: "1px solid #6a5acd", color: "#4b3fa7", borderRadius: 3 }}>Compare Maps</span>
      </span>
    </div>
    <div className="flex" style={{ gap: 16, padding: "12px 16px 0" }}>
      <GridPanel date="28th Jan 2022" avg="20.2" ranks={JAN} />
      <GridPanel date="3rd May 2022" avg="1.4" ranks={MAY} />
    </div>
    <div className="flex items-center" style={{ gap: 14, padding: "8px 16px 0", fontSize: 7.5, color: RT.grey }}>
      {[
        [RT.green, "1–3"],
        [RT.orange, "4–10"],
        [RT.red, "11–20+"],
      ].map(([c, t]) => (
        <span key={t} className="flex items-center" style={{ gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* 02 · Google local results with CareerNaksha first ------------------ */

type PackItem = { name: string; rating: number; reviews: string; line2: string; hours: string; logo?: boolean };

// TODO(content): illustrative competitor names, ratings, review counts and hours.
const PACK: PackItem[] = [
  { name: "CareerNaksha – Career Counselling", rating: 4.9, reviews: "1,146", line2: "Career guidance service · Online appointments", hours: "Closes 8 pm", logo: true },
  { name: "Disha Career Guidance Centre", rating: 4.6, reviews: "212", line2: "Career guidance service", hours: "Closes 7 pm" },
  { name: "Pathway Career Counsellors", rating: 4.7, reviews: "96", line2: "Educational consultant", hours: "Closes 6:30 pm" },
];

function PackMap() {
  return (
    <div className="relative" style={{ height: 86, overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
      <MapBase w={330} h={86} />
      {[
        { l: 150, t: 34, n: "A", on: true },
        { l: 84, t: 52, n: "B" },
        { l: 238, t: 22, n: "C" },
      ].map((p) => (
        <span key={p.n} className="flex items-center justify-center" style={{ position: "absolute", left: p.l, top: p.t, width: 13, height: 17, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: "#ea4335", border: "1px solid #b31412" }}>
          <span style={{ transform: "rotate(45deg)", fontSize: 7, fontWeight: 700, color: "#fff" }}>{p.n}</span>
        </span>
      ))}
    </div>
  );
}

export const LocalPack: Screen = () => (
  <GoogleSerp query={KEYWORD} tabs={["All", "Maps", "Images", "News", "Videos", "More"]}>
    <div style={{ border: `1px solid ${G.border}`, borderRadius: 8, marginBottom: 14 }}>
      <PackMap />
      <div className="flex" style={{ gap: 5, padding: "7px 10px 2px" }}>
        {["Rating", "Hours", "Online appointments"].map((t) => (
          <span key={t} className="flex items-center" style={{ height: 16, padding: "0 7px", borderRadius: 8, border: `1px solid ${G.border}`, fontSize: 7.5, color: G.text, gap: 2 }}>
            {t}
            {t !== "Online appointments" && <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />}
          </span>
        ))}
      </div>
      {PACK.map((p, i) => (
        <div key={p.name} className="flex" style={{ padding: "6px 10px", borderBottom: i < 2 ? `1px solid ${G.line}` : undefined, gap: 8 }}>
          <div className="min-w-0 flex-1" style={{ lineHeight: 1.45 }}>
            <p style={{ fontSize: 10, color: G.serpTitle }}>{p.name}</p>
            <p className="flex items-center" style={{ fontSize: 7.5, color: G.serpText, gap: 3 }}>
              {p.rating.toFixed(1)}
              <Stars rating={p.rating} size={7} />({p.reviews})
            </p>
            <p style={{ fontSize: 7.5, color: G.serpText }}>{p.line2}</p>
            <p style={{ fontSize: 7.5, color: G.serpText }}>
              <span style={{ color: "#188038" }}>Open</span> · {p.hours}
            </p>
          </div>
          {p.logo && (
            <span className="flex items-center justify-center self-center" style={{ width: 44, height: 44, borderRadius: 6, border: `1px solid ${G.line}` }}>
              <Mark size={34} />
            </span>
          )}
          <span className="flex items-center self-center" style={{ gap: 8 }}>
            {[Earth, Navigation].map((I, k) => (
              <span key={k} className="flex flex-col items-center" style={{ gap: 2, fontSize: 6.5, color: G.link }}>
                <span className="flex items-center justify-center" style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${G.border}` }}>
                  <I style={{ width: 9, height: 9 }} aria-hidden="true" />
                </span>
                {k ? "Directions" : "Website"}
              </span>
            ))}
          </span>
        </div>
      ))}
      <div className="flex items-center justify-center" style={{ height: 24, borderTop: `1px solid ${G.line}`, fontSize: 8.5, color: G.text, gap: 4 }}>
        More businesses
        <ArrowRight style={{ width: 9, height: 9 }} aria-hidden="true" />
      </div>
    </div>
    <SerpResult
      r={{
        site: "CareerNaksha",
        url: "https://www.careernaksha.com › career-counselling",
        favicon: <Mark size={14} />,
        title: "Career Counselling Near Me | Online & Offline Career Guidance",
        desc: "Book a 1-to-1 session with an expert career counsellor. Psychometric career tests and counselling for Class 8–12 students, graduates and professionals.",
      }}
    />
  </GoogleSerp>
);

/* 03 · Search Console, Jan – May 2022: clicks recovering ------------ */

// TODO(content): illustrative daily series; the growth (~4x, +300%) matches the study.
const CLICKS = noisy({ n: 151, from: 118, to: 492, seed: 71, noise: 0.11, weekly: 0.16, weekStart: 5, ease: -0.25, bumps: { 3: 0.78, 4: 0.72, 5: 0.74, 6: 0.8, 7: 0.84, 8: 0.9 } });
const IMPR = noisy({ n: 151, from: 9200, to: 27400, seed: 72, noise: 0.09, weekly: 0.12, weekStart: 5, ease: -0.1, bumps: { 3: 0.8, 4: 0.76, 5: 0.78, 6: 0.84 } });
const kfmt = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : `${(n / 1000).toFixed(n >= 1e5 ? 0 : 1)}K`);
const TOTAL_C = CLICKS.reduce((a, b) => a + b, 0);
const TOTAL_I = IMPR.reduce((a, b) => a + b, 0);

// TODO(content): illustrative page URLs and figures.
const PAGES: [string, number, number][] = [
  ["https://www.careernaksha.com/", 9846, 214093],
  ["https://www.careernaksha.com/career-counselling-in-delhi", 4412, 98270],
  ["https://www.careernaksha.com/career-counselling-in-mumbai", 3978, 91506],
  ["https://www.careernaksha.com/career-counselling-in-bangalore", 3265, 77841],
  ["https://www.careernaksha.com/psychometric-test", 2917, 70112],
  ["https://www.careernaksha.com/career-counselling-in-pune", 2184, 49368],
  ["https://www.careernaksha.com/career-counselling-in-hyderabad", 1731, 41904],
  ["https://www.careernaksha.com/career-counselling-in-kolkata", 1206, 30777],
];

const PAGE_COLS: Col[] = [
  { label: "Top pages", w: 300 },
  { label: "↓ Clicks", w: 90, align: "right" },
  { label: "Impressions", w: 90, align: "right" },
];

export const SearchConsoleCities: Screen = () => (
  <SearchConsole
    property="sc-domain:careernaksha.com"
    filters={["Search type: Web", "Date: 1 Jan 2022 – 31 May 2022"]}
    metrics={[
      { label: "Total clicks", value: kfmt(TOTAL_C), on: true },
      { label: "Total impressions", value: kfmt(TOTAL_I), on: true },
      { label: "Average CTR", value: `${((TOTAL_C / TOTAL_I) * 100).toFixed(1)}%` },
      { label: "Average position", value: "11.8" },
    ]}
    series={[CLICKS, IMPR]}
    xLabels={["01/01/2022", "01/02/2022", "01/03/2022", "01/04/2022", "01/05/2022", "31/05/2022"]}
    left={{ max: 750, ticks: 3, format: (n) => `${n}` }}
    right={{ max: 45000, format: (n) => (n ? `${n / 1000}K` : "0") }}
    tab={1}
    cols={PAGE_COLS}
    rows={PAGES.map(([u, c, i]) => [u, num(c), num(i)])}
  />
);

/* 04 · Business Profile performance (Jan – May 2022) ----------------- */

// TODO(content): illustrative monthly interactions and search terms.
const MONTHLY = [212, 268, 351, 476, 555];
const SEARCHES: [string, string][] = [
  ["career counselling near me", "1,974"],
  ["career counsellor", "1,208"],
  ["careernaksha", "861"],
  ["psychometric test near me", "642"],
  ["career guidance centre", "417"],
  ["career counselling for class 10", "288"],
];

export const ProfilePerformance: Screen = () => (
  <BrowserChrome url="www.google.com/search?q=careernaksha&authuser=0#mpd=~performance">
    <div className="relative h-full" style={{ background: "#5f6368", fontFamily: FONT.google, color: G.text }}>
      <div className="absolute flex flex-col" style={{ left: 28, right: 28, top: 10, bottom: 0, background: "#fff", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
        <div className="flex shrink-0 items-center" style={{ height: 34, padding: "0 12px", gap: 10, borderBottom: `1px solid ${G.line}` }}>
          <ArrowLeft style={{ width: 11, height: 11, color: G.grey }} aria-hidden="true" />
          <span style={{ fontFamily: FONT.googleSans, fontSize: 12 }}>Performance</span>
          <span className="flex items-center" style={{ gap: 5, fontSize: 8, color: G.grey, marginLeft: 8 }}>
            <Mark size={14} />
            CareerNaksha – Career Counselling
          </span>
          <X style={{ width: 11, height: 11, color: G.grey, marginLeft: "auto" }} aria-hidden="true" />
        </div>
        <div className="flex shrink-0" style={{ height: 24, padding: "0 12px", gap: 14, fontSize: 8, fontWeight: 500, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
          {["Overview", "Calls", "Messages", "Bookings", "Directions", "Website clicks"].map((t, i) => (
            <span key={t} className="flex items-center" style={{ color: i === 0 ? G.link : undefined, borderBottom: i === 0 ? `2px solid ${G.link}` : "2px solid transparent" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex min-h-0 flex-1" style={{ padding: "10px 14px", gap: 18 }}>
          <div style={{ width: 300 }}>
            <span className="inline-flex items-center" style={{ height: 18, padding: "0 8px", border: `1px solid ${G.border}`, borderRadius: 4, fontSize: 8, gap: 4 }}>
              Jan 2022 – May 2022
              <ChevronDown style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
            </span>
            <p style={{ fontFamily: FONT.googleSans, fontSize: 20, marginTop: 10 }}>{num(MONTHLY.reduce((a, b) => a + b, 0))}</p>
            <p className="flex items-center" style={{ fontSize: 8, color: G.grey, gap: 3 }}>
              Business Profile interactions
              <Info style={{ width: 8, height: 8 }} aria-hidden="true" />
            </p>
            <div style={{ marginTop: 8 }}>
              <Bars w={296} h={130} values={MONTHLY} max={600} color="#1a73e8" labels={["Jan", "Feb", "Mar", "Apr", "May"]} gap={0.55} />
            </div>
            <div className="grid grid-cols-2" style={{ marginTop: 10, gap: "6px 16px", fontSize: 8 }}>
              {[
                ["Calls", "418"],
                ["Bookings", "301"],
                ["Directions", "236"],
                ["Website clicks", "907"],
              ].map(([l, v]) => (
                <span key={l} className="flex justify-between" style={{ borderBottom: `1px solid ${G.line}`, paddingBottom: 4 }}>
                  <span style={{ color: G.grey }}>{l}</span>
                  <span>{v}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p style={{ fontSize: 9, fontWeight: 500 }}>Searches showed your Business Profile in the search results</p>
            <p style={{ fontFamily: FONT.googleSans, fontSize: 16, marginTop: 6 }}>6,418</p>
            <p style={{ fontSize: 7.5, color: G.grey, marginTop: 6 }}>Searches breakdown</p>
            {SEARCHES.map(([q, n], i) => (
              <div key={q} className="flex items-center" style={{ height: 20, fontSize: 8, borderBottom: `1px solid ${G.line}`, gap: 6 }}>
                <span style={{ width: 10, color: G.grey }}>{i + 1}.</span>
                <span className="truncate">{q}</span>
                <span className="ml-auto" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {n}
                </span>
              </div>
            ))}
            <p style={{ fontSize: 8, color: G.link, fontWeight: 500, marginTop: 7 }}>See more</p>
          </div>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

export const careerNakshaScreens: Screen[] = [RankGridCompare, LocalPack, SearchConsoleCities, ProfilePerformance];
