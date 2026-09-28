import { Check, ChevronDown, Phone, Upload } from "lucide-react";

import type { Screen } from "./kit";
import { BrowserChrome, G, GA4Card, GA4Shell, GA4Table, noisy, num, Photo, SearchConsole, TimeChart, type Col } from "./tools";

/* Think3D · SEO, content and lead-generation campaigns (since July 2020).
   From the study: 1,250+ leads a month; page 1 for several high-traffic
   keywords; #1 for "best 3d printing in ahmedabad". The landing page reuses the
   real site's header, copy ("Manufacturing On Demand" line, 4M+ / 69 / 10K+
   stats) and the "Trusted by" strip from /sites/think3d.webp.
   TODO(content): illustrative — the report period (Jan – Mar 2023), every click,
   impression, position and conversion figure, the conversion event names and
   the landing-page form fields. */

const SITE = { src: "/sites/think3d.webp", img: { w: 1440, h: 900 } };
const RED = "#ec2227";
const POPPINS = "Poppins, 'Helvetica Neue', Arial, sans-serif";

/* 01 · Search Console: 3D printing searches on page 1 ---------------- */

// TODO(content): illustrative daily clicks and positions.
const CLICKS = noisy({ n: 90, from: 318, to: 392, seed: 91, noise: 0.1, weekly: 0.3, weekStart: 6, bumps: { 38: 1.2, 64: 0.82 } });
const POS = noisy({ n: 90, from: 9.1, to: 7.9, seed: 92, noise: 0.06, decimals: 1 });

const QUERIES: [string, string, string][] = [
  ["think3d", "3,912", "1"],
  ["3d printing service", "1,846", "3.2"],
  ["3d printing near me", "1,402", "4.1"],
  ["3d printing in hyderabad", "1,187", "1.4"],
  ["3d printing service in india", "964", "2.3"],
  ["best 3d printing in ahmedabad", "402", "1"],
  ["rapid prototyping services", "377", "5.6"],
  ["3d printing bangalore", "351", "6.2"],
];

const Q_COLS: Col[] = [
  { label: "Top queries", w: 300 },
  { label: "↓ Clicks", w: 90, align: "right" },
  { label: "Position", w: 90, align: "right" },
];

export const SearchConsoleQueries: Screen = () => (
  <SearchConsole
    property="sc-domain:think3d.in"
    filters={["Search type: Web", "Date: Last 3 months"]}
    metrics={[
      { label: "Total clicks", value: "31.6K", on: true },
      { label: "Total impressions", value: "1.12M" },
      { label: "Average CTR", value: "2.8%" },
      { label: "Average position", value: "8.4", on: true },
    ]}
    series={[CLICKS, POS.map((v) => -v)]}
    xLabels={["01/01/2023", "22/01/2023", "12/02/2023", "05/03/2023", "26/03/2023"]}
    left={{ max: 600, ticks: 4, format: (n) => `${n}` }}
    right={{ min: -20, max: 0, format: (n) => `${-n}` }}
    cols={Q_COLS}
    rows={QUERIES.map(([q, c, p]) => [q, c, p])}
  />
);

/* 02 · GA4 conversions: 1,284 leads in March 2023 --------------------- */

// TODO(content): illustrative event names and counts (total above the study's 1,250+ a month).
const EVENTS: { name: string; color: string; conv: number; users: number }[] = [
  { name: "generate_lead", color: "#1a73e8", conv: 612, users: 571 },
  { name: "whatsapp_click", color: "#12b5cb", conv: 287, users: 262 },
  { name: "click_to_call", color: "#e52592", conv: 241, users: 228 },
  { name: "quote_file_upload", color: "#f9ab00", conv: 144, users: 139 },
];
const TOTAL = EVENTS.reduce((a, e) => a + e.conv, 0);
const USERS = 1107;

const E_COLS: Col[] = [
  { label: "", w: 22 },
  { label: "Event name", w: 150 },
  { label: "↓ Conversions", w: 90, align: "right" },
  { label: "Total users", w: 90, align: "right" },
  { label: "Event value", w: 90, align: "right" },
];

function Tot({ a, b }: { a: string; b: string }) {
  return (
    <span style={{ display: "block", lineHeight: 1.25 }}>
      {a}
      <span style={{ display: "block", fontSize: 6.5, fontWeight: 400, color: G.grey }}>{b}</span>
    </span>
  );
}

export const Ga4Conversions: Screen = () => (
  <GA4Shell account="Think3D" property="think3d.in – GA4" title="Conversions: Event name" dateRange="1 – 31 Mar 2023" navActive="Engagement">
    <GA4Card>
      <div className="flex items-center" style={{ gap: 10, fontSize: 7, color: G.grey, marginBottom: 4 }}>
        <span style={{ fontSize: 7.5, fontWeight: 500, color: G.text }}>Conversions by Event name over time</span>
        <span className="ml-auto flex" style={{ gap: 8 }}>
          {EVENTS.map((e) => (
            <span key={e.name} className="flex items-center" style={{ gap: 3 }}>
              <span style={{ width: 8, height: 2, background: e.color }} />
              {e.name}
            </span>
          ))}
        </span>
      </div>
      <TimeChart
        w={440}
        h={96}
        size={7}
        series={EVENTS.map((e, i) => ({ values: noisy({ n: 31, from: e.conv / 31, to: e.conv / 31, seed: 95 + i, noise: 0.28, weekly: 0.45, weekStart: 3 }), color: e.color, width: 1.3 }))}
        xLabels={["01 Mar", "08", "15", "22", "29"]}
        left={{ max: 40, ticks: 4, format: (n) => `${n}` }}
        padR={4}
      />
    </GA4Card>
    <GA4Table
      cols={E_COLS}
      total={["", "Total", <Tot key="c" a={num(TOTAL)} b="100% of total" />, <Tot key="u" a={num(USERS)} b="100% of total" />, <Tot key="v" a="0.00" b="" />]}
      rows={EVENTS.map((e, i) => [<span key="n" style={{ color: G.grey }}>{i + 1}</span>, e.name, `${num(e.conv)}.00`, num(e.users), "0.00"])}
    />
  </GA4Shell>
);

/* 03 · Ahmedabad landing page with the quote form -------------------- */

function Slant({ bg, children }: { bg: string; children: string }) {
  return (
    <span className="flex items-center justify-center" style={{ height: 20, padding: "0 13px", background: bg, color: "#fff", fontSize: 8, clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}>
      {children}
    </span>
  );
}

function Input({ label, value }: { label: string; value?: string }) {
  return (
    <span className="flex items-center" style={{ height: 20, border: "1px solid #d6d6d6", borderRadius: 2, padding: "0 7px", fontSize: 7.5, color: value ? "#222" : "#9a9a9a" }}>
      {value ?? label}
    </span>
  );
}

export const LandingPage: Screen = () => (
  <BrowserChrome url="www.think3d.in/3d-printing-service-in-ahmedabad/">
    <div className="h-full" style={{ fontFamily: POPPINS, background: "#fff" }}>
      <section className="relative" style={{ height: 262, background: "#1f2024", color: "#fff", overflow: "hidden" }}>
        <div className="absolute" style={{ right: -40, top: 18, opacity: 0.5 }}>
          <Photo {...SITE} crop={{ x: 840, y: 95, w: 440, h: 360 }} w={250} h={205} />
        </div>
        <header className="relative flex items-center" style={{ height: 36, padding: "0 22px", gap: 16 }}>
          <Photo {...SITE} crop={{ x: 106, y: 18, w: 170, h: 44 }} w={82} h={21} />
          <nav className="ml-auto flex items-center" style={{ gap: 14, fontSize: 8 }}>
            {["Services", "Materials", "Resources"].map((t) => (
              <span key={t} className="flex items-center" style={{ gap: 2 }}>
                {t}
                <ChevronDown style={{ width: 8, height: 8 }} strokeWidth={3} aria-hidden="true" />
              </span>
            ))}
          </nav>
          <span className="flex" style={{ gap: 4 }}>
            <Slant bg="#5a5b60">Get Quote</Slant>
            <Slant bg={RED}>Contact Us</Slant>
          </span>
        </header>
        <div className="relative flex" style={{ padding: "12px 22px 0", gap: 20 }}>
          <div className="min-w-0 flex-1">
            <p style={{ fontSize: 7, letterSpacing: 1, color: "#b9b9bd" }}>AHMEDABAD · GUJARAT</p>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: RED, lineHeight: 1.15, letterSpacing: -0.5, marginTop: 4 }}>3D Printing Service in Ahmedabad</h1>
            <p style={{ fontSize: 9, lineHeight: 1.5, marginTop: 7, maxWidth: 300 }}>From single prototype to multiple end parts in just a matter of days.</p>
            <ul style={{ marginTop: 8, fontSize: 7.5, lineHeight: 1.9, color: "#d6d6da" }}>
              {["FDM, SLA, SLS, MJF and metal 3D printing", "Rapid prototyping and low-volume production", "Delivery across Ahmedabad and Gujarat"].map((t) => (
                <li key={t} className="flex items-center" style={{ gap: 5 }}>
                  <Check style={{ width: 8, height: 8, color: RED }} strokeWidth={3.5} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex" style={{ gap: 22, marginTop: 12 }}>
              {[
                ["4M+", "Parts Produced"],
                ["69", "Machines In-House"],
                ["10K+", "Customers Served"],
              ].map(([v, l]) => (
                <span key={l}>
                  <span style={{ display: "block", fontSize: 17, fontWeight: 600, color: RED, lineHeight: 1 }}>{v}</span>
                  <span style={{ display: "block", fontSize: 7, marginTop: 3, color: "#e3e3e6" }}>{l}</span>
                </span>
              ))}
            </div>
          </div>
          <form className="shrink-0" style={{ width: 196, background: "#fff", color: "#222", padding: "10px 12px 12px", borderTop: `3px solid ${RED}` }}>
            <p style={{ fontSize: 10.5, fontWeight: 600 }}>Get an Instant Quote</p>
            <p style={{ fontSize: 6.5, color: "#777", marginTop: 1 }}>Upload your part and our engineers will reply within hours.</p>
            <div className="flex flex-col" style={{ gap: 4, marginTop: 7 }}>
              <Input label="Full Name*" />
              <Input label="Email*" />
              <div className="flex" style={{ gap: 4 }}>
                <span style={{ width: 52 }}>
                  <Input label="+91" value="+91" />
                </span>
                <span className="flex-1">
                  <Input label="Phone*" />
                </span>
              </div>
              <Input label="City" value="Ahmedabad" />
              <span className="flex flex-col items-center justify-center" style={{ height: 36, border: "1px dashed #bdbdbd", borderRadius: 2, fontSize: 6.5, color: "#777", gap: 2 }}>
                <Upload style={{ width: 9, height: 9, color: RED }} aria-hidden="true" />
                Upload CAD file (STL, STEP, OBJ)
              </span>
            </div>
            <span className="flex items-center justify-center" style={{ marginTop: 7, height: 21, background: RED, color: "#fff", fontSize: 8.5, fontWeight: 600 }}>
              Get Quote
            </span>
          </form>
        </div>
      </section>
      <div style={{ background: "#f7f7f7", height: 42, overflow: "hidden" }}>
        <Photo {...SITE} crop={{ x: 160, y: 578, w: 1120, h: 92 }} w={560} h={42} style={{ margin: "0 auto" }} />
      </div>
      <div className="flex flex-col items-center" style={{ paddingTop: 9 }}>
        <p style={{ fontSize: 7, letterSpacing: 1.4, fontWeight: 600, color: RED }}>3D PRINTING IN AHMEDABAD</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 3 }}>Our 3D Printing Technologies</p>
        <span style={{ width: 44, height: 2, background: RED, marginTop: 5 }} />
        <p className="flex items-center" style={{ fontSize: 7.5, color: "#555", marginTop: 7, gap: 4 }}>
          <Phone style={{ width: 8, height: 8, color: RED }} aria-hidden="true" />
          Talk to an engineer about materials, finishes and lead times
        </p>
      </div>
    </div>
  </BrowserChrome>
);

export const think3dScreens: Screen[] = [SearchConsoleQueries, Ga4Conversions, LandingPage];
