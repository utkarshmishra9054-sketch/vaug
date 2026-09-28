import type { ReactNode } from "react";
import { ChevronRight, EllipsisVertical, MapPin, Menu, Mic, Phone, Search } from "lucide-react";

import type { Screen } from "./kit";
import { CheckBox, FONT, G, GADS_NAV, GAdsChartCard, GAdsDot, GAdsTable, GLink, GoogleAdsShell, GoogleWordmark, Initials, noisy, PhoneBackdrop, PhoneFrame, Photo, Place, Two, type Col } from "./tools";

/* Phoenix Institute · PETEX 2022 scholarship test, Google Ads search campaigns (Gujarat).
   Totals match the study: 41,278 impressions (40,000+), 20,473 clicks (20,000+), 5,117 enquiries (5,000+).
   TODO(content): illustrative — the run dates (1 Oct – 11 Dec 2022), cost, CPCs, the per-campaign /
   per-location / per-keyword split, Quality Scores and the ad copy other than the live ad's. */

const LOGO = { src: "/logos/phoenix-institute.webp", img: { w: 432, h: 120 } };
const ACCOUNT = { account: "Phoenix Institute – PETEX", customerId: "742-305-1968" };
const RANGE = "1 Oct – 11 Dec 2022"; // TODO(content): illustrative run dates (the exam was on 11 Dec 2022).

const int = (n: number) => n.toLocaleString("en-US");
const inr = (n: number) => `₹${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (a: number, b: number) => `${((a / b) * 100).toFixed(2)}%`;
const convs = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
const cost = (c: { clicks: number; cpc: number }) => Math.round(c.clicks * c.cpc * 100) / 100;
const wrap = (t: ReactNode) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.15 }}>{t}</span>;

/* 01 · Campaigns overview ------------------------------------------ */

type Camp = { name: string; budget: number; status: string; state: "enabled" | "paused"; impr: number; clicks: number; cpc: number; conv: number };
// TODO(content): illustrative geo split; sums to 41,278 impr / 20,473 clicks / 5,117 conversions.
const CAMPS: Camp[] = [
  { name: "PETEX22_Search_Vadodara", budget: 1500, status: "Limited by budget", state: "enabled", impr: 17904, clicks: 9213, cpc: 9.84, conv: 2486 },
  { name: "PETEX22_Search_Ahmedabad-Gandhinagar", budget: 800, status: "Eligible", state: "enabled", impr: 8617, clicks: 3992, cpc: 12.31, conv: 874 },
  { name: "PETEX22_Search_Surat", budget: 500, status: "Eligible", state: "enabled", impr: 5208, clicks: 2316, cpc: 11.72, conv: 497 },
  { name: "PETEX22_Search_Anand-Bharuch", budget: 350, status: "Eligible", state: "enabled", impr: 4331, clicks: 2187, cpc: 8.46, conv: 551 },
  { name: "Phoenix_Brand_Exact", budget: 150, status: "Eligible", state: "enabled", impr: 2746, clicks: 1904, cpc: 3.18, conv: 562 },
  { name: "PETEX22_Search_Rajkot", budget: 300, status: "Paused", state: "paused", impr: 2472, clicks: 861, cpc: 10.95, conv: 147 },
];
const T = CAMPS.reduce((a, c) => ({ impr: a.impr + c.impr, clicks: a.clicks + c.clicks, cost: a.cost + cost(c), conv: a.conv + c.conv }), { impr: 0, clicks: 0, cost: 0, conv: 0 });

const CCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 122 },
  { label: "Budget", w: 60 },
  { label: "Status", w: 50 },
  { label: "Impr.", w: 42, align: "right" },
  { label: "Clicks", w: 40, align: "right" },
  { label: "CTR", w: 38, align: "right" },
  { label: "Avg. CPC", w: 38, align: "right" },
  { label: "Cost", w: 56, align: "right" },
  { label: "Conversions", w: 50, align: "right" },
  { label: "Cost / conv.", w: 44, align: "right" },
];

// Daily, 1 Oct (a Saturday) – 11 Dec 2022: Diwali dip (22–26 Oct), push in the last fortnight, exam day.
const DIP = { 22: 0.7, 23: 0.5, 24: 0.45, 25: 0.6, 26: 0.8 };
const D_CONV = noisy({ n: 72, from: 34, to: 118, seed: 71, noise: 0.16, weekly: 0.08, weekStart: 5, ease: -0.35, bumps: { ...DIP, 62: 1.2, 63: 1.25, 66: 1.3, 67: 1.35, 68: 1.22, 69: 0.9, 70: 0.55, 71: 0.18 } });
const D_COST = noisy({ n: 72, from: 2000, to: 3350, seed: 72, noise: 0.12, weekly: 0.05, weekStart: 5, ease: 0.4, bumps: { ...DIP, 66: 1.18, 67: 1.2, 70: 0.7, 71: 0.3 } });

export const Campaigns: Screen = () => (
  <GoogleAdsShell {...ACCOUNT} title="Campaigns" dateRange={RANGE} nav={null} url="ads.google.com/aw/campaigns?ocid=742305196">
    <GAdsChartCard
      w={548}
      h={60}
      metrics={[
        { label: "Conversions", value: "5.12K", on: true },
        { label: "Cost", value: `₹${Math.round(T.cost / 1000)}K`, on: true },
        { label: "Clicks", value: "20.5K" },
        { label: "Cost / conv.", value: inr(T.cost / T.conv) },
      ]}
      series={[D_CONV, D_COST]}
      xLabels={["1 Oct 2022", "11 Dec 2022"]}
      left={{ max: 200, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 6000, ticks: 2, format: (n) => (n ? `₹${n / 1000}K` : "₹0") }}
    />
    <GAdsTable
      cols={CCOLS}
      rowH={21}
      rows={CAMPS.map((c) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={c.state} />,
        <GLink key="n">{wrap(c.name)}</GLink>,
        `${inr(c.budget)}/day`,
        c.status === "Limited by budget" ? wrap(c.status) : <span style={{ color: c.state === "paused" ? G.grey : G.text }}>{c.status}</span>,
        int(c.impr),
        int(c.clicks),
        pct(c.clicks, c.impr),
        inr(c.cpc),
        inr(cost(c)),
        convs(c.conv),
        inr(cost(c) / c.conv),
      ])}
      total={["", "", "Total: all campaigns", "", "", int(T.impr), int(T.clicks), pct(T.clicks, T.impr), inr(T.cost / T.clicks), inr(T.cost), convs(T.conv), inr(T.cost / T.conv)]}
    />
  </GoogleAdsShell>
);

/* 02 · Search keywords --------------------------------------------- */

type Kw = { kw: string; match: "Exact match" | "Phrase match" | "Broad match"; group: string; qs: number; impr: number; clicks: number; cpc: number; conv: number };
// TODO(content): illustrative keywords, Quality Scores and figures.
const KWS: Kw[] = [
  { kw: "[petex exam]", match: "Exact match", group: "PETEX", qs: 10, impr: 3876, clicks: 2614, cpc: 4.62, conv: 842 },
  { kw: '"scholarship test 2022"', match: "Phrase match", group: "Scholarship Test", qs: 8, impr: 4912, clicks: 2407, cpc: 9.31, conv: 618 },
  { kw: '"scholarship exam for class 10"', match: "Phrase match", group: "Scholarship Test", qs: 8, impr: 3541, clicks: 1688, cpc: 8.74, conv: 452 },
  { kw: "[scholarship test in vadodara]", match: "Exact match", group: "Scholarship Test Vadodara", qs: 9, impr: 2218, clicks: 1302, cpc: 7.96, conv: 391 },
  { kw: '"neet coaching vadodara"', match: "Phrase match", group: "NEET Coaching", qs: 7, impr: 3104, clicks: 1316, cpc: 13.48, conv: 287 },
  { kw: '"jee coaching in vadodara"', match: "Phrase match", group: "JEE Coaching", qs: 7, impr: 2687, clicks: 1109, cpc: 14.02, conv: 236 },
  { kw: "[phoenix institute vadodara]", match: "Exact match", group: "Brand", qs: 10, impr: 1864, clicks: 1318, cpc: 2.91, conv: 402 },
  { kw: '"talent search exam gujarat"', match: "Phrase match", group: "Talent Search Exam", qs: 8, impr: 1732, clicks: 812, cpc: 8.17, conv: 219 },
  { kw: '"scholarship test for class 11 science"', match: "Phrase match", group: "Scholarship Test", qs: 7, impr: 1508, clicks: 677, cpc: 9.83, conv: 171 },
  { kw: "baroda science tuition classes", match: "Broad match", group: "Science Classes Vadodara", qs: 6, impr: 2296, clicks: 794, cpc: 11.26, conv: 148 },
  { kw: '"free scholarship exam ahmedabad"', match: "Phrase match", group: "Scholarship Test Ahmedabad", qs: 7, impr: 1318, clicks: 584, cpc: 10.64, conv: 139 },
];

const KCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Keyword", w: 118 },
  { label: "Match type", w: 62 },
  { label: "Ad group", w: 92 },
  { label: "Quality Score", w: 36, align: "right" },
  { label: "Impr.", w: 36, align: "right" },
  { label: "Clicks", w: 36, align: "right" },
  { label: "CTR", w: 36, align: "right" },
  { label: "Avg. CPC", w: 36, align: "right" },
  { label: "Conv.", w: 44, align: "right" },
  { label: "Conv. rate", w: 40, align: "right" },
];

export const Keywords: Screen = () => (
  <GoogleAdsShell {...ACCOUNT} title="Search keywords" dateRange={RANGE} nav={null} filters={["Keyword status: All enabled", "Campaign type: Search"]} url="ads.google.com/aw/keywords?ocid=742305196">
    <GAdsTable
      cols={KCOLS}
      rowH={20}
      rows={KWS.map((k) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" />,
        <span key="k" style={{ color: G.text }}>
          {k.kw}
        </span>,
        k.match,
        <GLink key="g">{k.group}</GLink>,
        `${k.qs}/10`,
        int(k.impr),
        int(k.clicks),
        pct(k.clicks, k.impr),
        inr(k.cpc),
        convs(k.conv),
        pct(k.conv, k.clicks),
      ])}
      total={["", "", "Total: all keywords", "", "", "", int(T.impr), int(T.clicks), pct(T.clicks, T.impr), inr(T.cost / T.clicks), convs(T.conv), pct(T.conv, T.clicks)]}
    />
  </GoogleAdsShell>
);

/* 03 · Locations: conversions by targeted location ------------------ */

type Loc = { name: string; type: string; camp: string; impr: number; clicks: number; cpc: number; conv: number };
// TODO(content): illustrative; rows add up to the campaign totals above.
const LOCS: Loc[] = [
  { name: "Vadodara, Gujarat, India", type: "City", camp: "PETEX22_Search_Vadodara", impr: 15295, clicks: 7894, cpc: 10.12, conv: 2151 },
  { name: "Ahmedabad, Gujarat, India", type: "City", camp: "PETEX22_Search_Ahmedabad-Gandhinagar", impr: 6934, clicks: 3172, cpc: 12.58, conv: 689 },
  { name: "Gujarat, India", type: "State", camp: "Phoenix_Brand_Exact", impr: 2746, clicks: 1904, cpc: 3.18, conv: 562 },
  { name: "Surat, Gujarat, India", type: "City", camp: "PETEX22_Search_Surat", impr: 5208, clicks: 2316, cpc: 11.72, conv: 497 },
  { name: "Anand, Gujarat, India", type: "City", camp: "PETEX22_Search_Anand-Bharuch", impr: 2511, clicks: 1289, cpc: 8.21, conv: 326 },
  { name: "Bharuch, Gujarat, India", type: "City", camp: "PETEX22_Search_Anand-Bharuch", impr: 1820, clicks: 898, cpc: 8.82, conv: 225 },
  { name: "Padra, Gujarat, India", type: "City", camp: "PETEX22_Search_Vadodara", impr: 1512, clicks: 748, cpc: 8.36, conv: 192 },
  { name: "Gandhinagar, Gujarat, India", type: "City", camp: "PETEX22_Search_Ahmedabad-Gandhinagar", impr: 1683, clicks: 820, cpc: 11.26, conv: 185 },
  { name: "Rajkot, Gujarat, India", type: "City", camp: "PETEX22_Search_Rajkot", impr: 2472, clicks: 861, cpc: 10.95, conv: 147 },
  { name: "Dabhoi, Gujarat, India", type: "City", camp: "PETEX22_Search_Vadodara", impr: 1097, clicks: 571, cpc: 7.64, conv: 143 },
];
const LT = LOCS.reduce((a, c) => ({ impr: a.impr + c.impr, clicks: a.clicks + c.clicks, cost: a.cost + cost(c), conv: a.conv + c.conv }), { impr: 0, clicks: 0, cost: 0, conv: 0 });

const LOC_NAV = GADS_NAV.map((g) => (g.label === "Campaigns" ? { ...g, children: ["Campaigns", "Ad groups", "Ads", "Assets", "Locations", "Ad schedule", "Devices"] } : g.children ? { ...g, open: false } : g));

const LCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "Location", w: 100 },
  { label: "Campaign", w: 118 },
  { label: "Impr.", w: 36, align: "right" },
  { label: "Clicks", w: 34, align: "right" },
  { label: "Cost", w: 56, align: "right" },
  { label: "Conv.", w: 40, align: "right" },
  { label: "Cost / conv.", w: 42, align: "right" },
];

export const Locations: Screen = () => (
  <GoogleAdsShell {...ACCOUNT} title="Locations" dateRange={RANGE} nav={LOC_NAV} navActive="Locations" filters={["Campaign status: All", "Sort: Conversions ↓"]} url="ads.google.com/aw/locations?ocid=742305196">
    <div className="flex items-end" style={{ height: 18, gap: 14, fontSize: 8, fontWeight: 500, borderBottom: `1px solid ${G.border}` }}>
      {["Targeted", "Excluded", "Matched locations"].map((t, i) => (
        <span key={t} style={{ paddingBottom: 4, color: i === 0 ? "#0b57d0" : G.grey, borderBottom: i === 0 ? "2px solid #0b57d0" : "2px solid transparent" }}>
          {t}
        </span>
      ))}
    </div>
    <GAdsTable
      cols={LCOLS}
      rowH={19.5}
      rows={LOCS.map((l) => [
        <CheckBox key="c" size={8} />,
        <Two key="l" a={l.name} b={l.type} bColor={G.grey} bSize={6.5} />,
        <GLink key="g">{wrap(l.camp)}</GLink>,
        int(l.impr),
        int(l.clicks),
        inr(cost(l)),
        convs(l.conv),
        inr(cost(l) / l.conv),
      ])}
      total={["", "Total: all locations", "", int(LT.impr), int(LT.clicks), inr(LT.cost), convs(LT.conv), inr(LT.cost / LT.conv)]}
    />
  </GoogleAdsShell>
);

/* 04 · The ads on mobile search ------------------------------------ */

function Favicon() {
  return (
    <span className="flex items-center justify-center overflow-hidden" style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", border: "1px solid #ecedef", flexShrink: 0 }}>
      <Photo {...LOGO} crop={{ x: 0, y: 20, w: 62, h: 76 }} w={10} h={12} />
    </span>
  );
}

function MobileSerp({ query, children }: { query: string; children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
      <div className="flex shrink-0 items-center justify-between" style={{ height: 26, padding: "0 9px" }}>
        <Menu style={{ width: 11, height: 11, color: G.grey }} aria-hidden="true" />
        <GoogleWordmark size={15} />
        <Initials name="R P" size={15} bg="#5c6bc0" />
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 24, margin: "2px 8px 0", borderRadius: 12, boxShadow: "0 1px 4px rgb(32 33 36 / 0.25)", padding: "0 8px", gap: 5, fontSize: 8 }}>
        <Search style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
        <span className="flex-1 truncate">{query}</span>
        <Mic style={{ width: 8, height: 8, color: G.blue }} aria-hidden="true" />
      </div>
      <div className="flex shrink-0 items-end" style={{ height: 20, gap: 10, padding: "0 10px", fontSize: 7.5, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
        {["All", "Images", "Maps", "News", "Videos", "Books"].map((t, i) => (
          <span key={t} style={{ paddingBottom: 4, color: i === 0 ? G.text : undefined, fontWeight: i === 0 ? 500 : 400, borderBottom: i === 0 ? `2px solid ${G.text}` : "2px solid transparent" }}>
            {t}
          </span>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden" style={{ background: "#f1f3f4", paddingTop: 6 }}>
        {children}
      </div>
    </div>
  );
}

function MobileAd({ title, desc, sitelinks, extra }: { title: string; desc: ReactNode; sitelinks: string[]; extra?: ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, margin: "0 5px 6px", padding: "8px 9px 4px" }}>
      <p style={{ fontSize: 8, fontWeight: 700, marginBottom: 5 }}>Sponsored</p>
      <div className="flex items-center" style={{ gap: 5 }}>
        <Favicon />
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.25 }}>
          <span className="block truncate" style={{ fontSize: 7.5 }}>
            Phoenix Institute
          </span>
          <span className="block truncate" style={{ fontSize: 6.5, color: G.serpText }}>
            https://www.phoenixinstitute.co › petex
          </span>
        </span>
        <EllipsisVertical style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
      </div>
      <p style={{ marginTop: 5, fontSize: 10.5, lineHeight: 1.25, color: "#1a0dab" }}>{title}</p>
      <p style={{ marginTop: 3, fontSize: 7, lineHeight: 1.45, color: G.serpText }}>{desc}</p>
      {extra}
      <div style={{ marginTop: 4 }}>
        {sitelinks.map((s) => (
          <div key={s} className="flex items-center justify-between" style={{ height: 19, borderTop: `1px solid ${G.line}`, fontSize: 8, color: "#1a0dab" }}>
            {s}
            <ChevronRight style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Organic({ site, url, title }: { site: string; url: string; title: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, margin: "0 5px 6px", padding: "8px 9px" }}>
      <span className="block" style={{ fontSize: 7.5 }}>
        {site}
      </span>
      <span className="block truncate" style={{ fontSize: 6.5, color: G.serpText }}>
        {url}
      </span>
      <p style={{ marginTop: 4, fontSize: 10, lineHeight: 1.25, color: "#1a0dab" }}>{title}</p>
    </div>
  );
}

const b = (t: string) => <b style={{ fontWeight: 700, color: "#3c4043" }}>{t}</b>;

export const MobileAds: Screen = () => (
  <PhoneBackdrop>
    <Place x={112} y={10}>
      <PhoneFrame time="7:48">
        <MobileSerp query="scholarship test 2022 vadodara">
          <MobileAd
            title="PETEX 2022 - Gujarat's Biggest Scholarship Test | Win Up to 90% Scholarship"
            desc={
              <>
                {b("Scholarship Test")} on 11 Dec 2022, Sunday. Register for ₹100 only. Complete study material & experienced faculty. {b("Vadodara")}&apos;s No. 1 institute.
              </>
            }
            extra={
              <p className="flex items-center" style={{ marginTop: 4, gap: 3, fontSize: 7, color: "#1a0dab" }}>
                <MapPin style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
                Vadodara
                <span style={{ color: G.serpText }}>·</span>4 locations nearby
              </p>
            }
            sitelinks={["Register for PETEX", "Download PETEX Booklet", "Exam Centres & Dates"]}
          />
          <Organic site="Phoenix Institute" url="https://www.phoenixinstitute.co › petex" title="PETEX - Phoenix Eligibility and Talent Search Exam" />
        </MobileSerp>
      </PhoneFrame>
    </Place>
    <Place x={348} y={10}>
      <PhoneFrame time="9:16">
        <MobileSerp query="neet jee coaching scholarship exam gujarat">
          <MobileAd
            title="NEET & JEE Coaching Scholarship | PETEX Exam on 11 Dec 2022"
            desc={
              <>
                Class 8 to 12 students can win up to 90% fee {b("scholarship")}. Study materials by experienced faculty. Registration fee ₹100 only.
              </>
            }
            extra={
              <p className="flex items-center" style={{ marginTop: 4, gap: 4, fontSize: 7.5 }}>
                <span className="flex items-center" style={{ height: 17, padding: "0 8px", borderRadius: 9, border: `1px solid ${G.border}`, gap: 3, color: "#1a0dab" }}>
                  <Phone style={{ width: 7, height: 7 }} aria-hidden="true" />
                  Call
                </span>
                <span className="flex items-center" style={{ height: 17, padding: "0 8px", borderRadius: 9, border: `1px solid ${G.border}`, color: "#1a0dab" }}>
                  Register now
                </span>
              </p>
            }
            sitelinks={["PETEX Syllabus & Pattern", "Our Results", "Phoenix Facilities"]}
          />
          <Organic site="Shiksha" url="https://www.shiksha.com › ... › Gujarat" title="Scholarship Exams in Gujarat 2022: Dates, Eligibility" />
        </MobileSerp>
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

export const phoenixScreens: Screen[] = [Campaigns, Keywords, Locations, MobileAds];
