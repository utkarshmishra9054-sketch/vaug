import type { ReactNode } from "react";
import { ChevronDown, ChevronRight, EllipsisVertical, Menu, MessageCircle, Mic, Phone, RotateCw, Search, Share2, X } from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  BusinessProfile as GbpPanel,
  CheckBox,
  Field,
  FONT,
  G,
  GAdsChartCard,
  GAdsDot,
  GAdsTable,
  GLink,
  GoogleAdsShell,
  GoogleSerp,
  GoogleWordmark,
  Initials,
  LogoAvatar,
  noisy,
  num,
  PhoneBackdrop,
  PhoneFrame,
  Photo,
  Place,
  SerpResult,
  Stars,
  WhatsAppChat,
  type Col,
} from "./tools";

/* Devgun Packers and Movers (Transport Nagar, Karnal) · B2B lead generation.
   TODO(content): every number drawn here is illustrative. The only confirmed outcome is new moving orders from B2B clients.
   August 2025: Google Ads 2,106 clicks, ₹58,394 cost, 291 conversions (142 calls, 61 quote forms, 88 WhatsApp clicks).
   Lead report, August vs March 2025: 318 unique enquiries, 104 from businesses (34 in March, ~3×),
   180 calls from Google (ads 142 + Business Profile 38; 75 in March, +140%), 23 orders won (9 B2B). */

const LOGO = { src: "/logos/devgun-packers-movers.webp", img: { w: 447, h: 120 } };
const SITE = { src: "/sites/devgun-packers-movers.webp", img: { w: 1440, h: 900 } };
const RED = "#d3222a";
const NAVY = "#0c3350";
// TODO(content): replace with the phone number on the real Google Business Profile.
// Masked on purpose: never show an invented, dialable number for a real business.
const PHONE = "0XXXX XXXXX";

/** The truck mark cut from the real logo. */
function Truck({ w }: { w: number }) {
  return <Photo {...LOGO} crop={{ x: 0, y: 4, w: 184, h: 112 }} w={w} h={w * (112 / 184)} />;
}
function Avatar({ size }: { size: number }) {
  return (
    <LogoAvatar size={size}>
      <Truck w={size * 0.78} />
    </LogoAvatar>
  );
}

/* 01 · Mobile: search ad, Places results and a WhatsApp enquiry ------ */

function MobileSerpTop({ query }: { query: string }) {
  return (
    <div className="shrink-0" style={{ background: "#fff", fontFamily: FONT.google }}>
      <div className="flex items-center" style={{ height: 24, padding: "0 9px" }}>
        <Menu style={{ width: 11, height: 11, color: G.grey }} aria-hidden="true" />
        <span style={{ margin: "0 auto" }}>
          <GoogleWordmark size={14} />
        </span>
        <Initials name="A M" size={14} bg="#1e8e3e" />
      </div>
      <div className="flex items-center" style={{ margin: "2px 8px 0", height: 24, borderRadius: 12, boxShadow: "0 1px 4px rgb(32 33 36 / 0.25)", padding: "0 8px", gap: 5, fontSize: 8, color: G.text }}>
        <Search style={{ width: 9, height: 9, color: G.grey }} aria-hidden="true" />
        <span className="flex-1 truncate">{query}</span>
        <X style={{ width: 9, height: 9, color: G.grey }} aria-hidden="true" />
        <Mic style={{ width: 9, height: 9, color: G.blue }} aria-hidden="true" />
      </div>
      <div className="flex items-end" style={{ height: 22, padding: "0 10px", gap: 11, fontSize: 7.5, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
        {["All", "Maps", "Images", "News", "Videos"].map((t, i) => (
          <span key={t} style={{ paddingBottom: 4, color: i === 0 ? G.text : undefined, fontWeight: i === 0 ? 500 : 400, borderBottom: i === 0 ? `2px solid ${G.text}` : "2px solid transparent" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function MobileAd({ site, url, fav, title, desc, sitelinks, call }: { site: string; url: string; fav: ReactNode; title: string; desc: string; sitelinks?: string[]; call?: boolean }) {
  return (
    <div style={{ padding: "8px 10px 6px", borderBottom: `6px solid #f1f3f4`, fontFamily: FONT.google }}>
      <p style={{ fontSize: 7.5, fontWeight: 700, color: G.text }}>Sponsored</p>
      <div className="flex items-center" style={{ gap: 5, marginTop: 5 }}>
        {fav}
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.25 }}>
          <span className="block truncate" style={{ fontSize: 7.5, color: G.text }}>
            {site}
          </span>
          <span className="block truncate" style={{ fontSize: 6.5, color: G.serpText }}>
            {url}
          </span>
        </span>
        <EllipsisVertical style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
      </div>
      <p style={{ fontSize: 10, lineHeight: 1.3, color: G.serpTitle, marginTop: 4 }}>{title}</p>
      <p style={{ fontSize: 7, lineHeight: 1.45, color: G.serpText, marginTop: 3 }}>{desc}</p>
      {call && (
        <span className="flex items-center justify-center" style={{ marginTop: 6, height: 20, borderRadius: 10, border: `1px solid ${G.border}`, gap: 4, fontSize: 7.5, fontWeight: 500, color: G.link }}>
          <Phone style={{ width: 8, height: 8 }} aria-hidden="true" />
          Call {PHONE}
        </span>
      )}
      {sitelinks && (
        <div style={{ marginTop: 5 }}>
          {sitelinks.map((s) => (
            <p key={s} className="flex items-center justify-between" style={{ height: 19, borderTop: `1px solid ${G.line}`, fontSize: 7.5, color: G.serpTitle }}>
              {s}
              <ChevronRight style={{ width: 8, height: 8, color: G.grey }} aria-hidden="true" />
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/** A small Google Maps tile of Karnal: NH 44 running north–south, the canal, local roads and pins. */
function MapTile({ w, h }: { w: number; h: number }) {
  const pins: [number, number, boolean][] = [
    [0.44, 0.52, true],
    [0.64, 0.3, false],
    [0.3, 0.74, false],
    [0.78, 0.66, false],
  ];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", background: "#eef0ea" }} aria-hidden="true">
      <rect x={w * 0.05} y={h * 0.08} width={w * 0.16} height={h * 0.22} fill="#cfe8c9" />
      <rect x={w * 0.7} y={h * 0.78} width={w * 0.2} height={h * 0.18} fill="#cfe8c9" />
      <path d={`M${w * 0.9} 0 C ${w * 0.84} ${h * 0.35}, ${w * 0.92} ${h * 0.6}, ${w * 0.86} ${h}`} stroke="#aad3f2" strokeWidth={4} fill="none" />
      {[0.2, 0.46, 0.7].map((y) => (
        <path key={y} d={`M0 ${h * y} L${w} ${h * (y + 0.06)}`} stroke="#fff" strokeWidth={3} />
      ))}
      {[0.22, 0.58].map((x) => (
        <path key={x} d={`M${w * x} 0 L${w * (x + 0.05)} ${h}`} stroke="#fff" strokeWidth={2.5} />
      ))}
      <path d={`M${w * 0.36} 0 C ${w * 0.4} ${h * 0.4}, ${w * 0.47} ${h * 0.6}, ${w * 0.52} ${h}`} stroke="#f7d774" strokeWidth={5} fill="none" />
      <path d={`M${w * 0.36} 0 C ${w * 0.4} ${h * 0.4}, ${w * 0.47} ${h * 0.6}, ${w * 0.52} ${h}`} stroke="#fce9a8" strokeWidth={3} fill="none" />
      <text x={w * 0.49} y={h * 0.2} fontSize={6} fill="#6f6a5a" fontFamily="Roboto, Arial, sans-serif">
        44
      </text>
      <text x={w * 0.06} y={h * 0.58} fontSize={6.5} fill="#5f6368" fontFamily="Roboto, Arial, sans-serif">
        Karnal
      </text>
      {pins.map(([x, y, me], i) => (
        <g key={i} transform={`translate(${w * x} ${h * y})`}>
          <path d="M0 0 C -5 -6 -5 -12 0 -12 C 5 -12 5 -6 0 0 Z" fill={me ? "#ea4335" : "#ea4335"} stroke="#b31412" strokeWidth={0.6} />
          <circle cx={0} cy={-8} r={1.8} fill="#b31412" />
        </g>
      ))}
    </svg>
  );
}

function Place1({ name, rating, reviews, meta, line, img }: { name: string; rating: number; reviews: string; meta: string; line: string; img?: ReactNode }) {
  return (
    <div className="flex" style={{ padding: "7px 10px", gap: 7, borderBottom: `1px solid ${G.line}` }}>
      <div className="min-w-0 flex-1" style={{ lineHeight: 1.35 }}>
        <p className="truncate" style={{ fontSize: 8.5, color: G.serpTitle }}>
          {name}
        </p>
        <p className="flex items-center" style={{ fontSize: 6.5, color: G.grey, gap: 2 }}>
          {rating.toFixed(1)} <Stars rating={rating} size={6} /> ({reviews})
        </p>
        <p className="truncate" style={{ fontSize: 6.5, color: G.grey }}>
          {meta}
        </p>
        <p className="truncate" style={{ fontSize: 6.5, color: G.grey }}>
          {line}
        </p>
      </div>
      {img && <span style={{ width: 40, height: 40, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#f1f3f4" }}>{img}</span>}
    </div>
  );
}

export const MobileSearchAd: Screen = () => (
  <PhoneBackdrop>
    <Place x={22} y={10}>
      <PhoneFrame time="10:42">
        <MobileSerpTop query="office shifting services in karnal" />
        <div className="min-h-0 flex-1 overflow-hidden" style={{ background: "#fff" }}>
          <MobileAd
            site="Devgun Packers and Movers"
            url="devgunpackersandmovers.com"
            fav={<Avatar size={15} />}
            title="Office Shifting in Karnal | Get a Business Moving Quote"
            desc="Workstations, IT and files packed, moved and set up over a weekend. Local, intercity and PAN India moves."
            call
            sitelinks={["Business Quote", "Office Relocation", "Warehouse Shifting"]}
          />
          <MobileAd
            site="Shree Balaji Packers & Movers"
            url="www.shreebalajimovers.in"
            fav={<span style={{ width: 15, height: 15, borderRadius: "50%", background: "#f1f3f4", border: "1px solid #e3e3e3" }} />}
            title="Packers and Movers Karnal - Best Rates"
            desc="Household shifting, car transport and more..."
          />
        </div>
      </PhoneFrame>
    </Place>
    <Place x={230} y={10}>
      <PhoneFrame time="10:43">
        <MobileSerpTop query="corporate relocation company near me" />
        <div className="min-h-0 flex-1 overflow-hidden" style={{ background: "#fff", fontFamily: FONT.google }}>
          <p style={{ padding: "7px 10px 5px", fontSize: 10, color: G.text, fontFamily: FONT.googleSans }}>Places</p>
          <MapTile w={170} h={78} />
          <div className="flex" style={{ padding: "6px 10px 2px", gap: 4, fontSize: 6.5 }}>
            {["Rating", "Open now", "Top rated"].map((t) => (
              <span key={t} className="flex items-center" style={{ height: 15, padding: "0 6px", borderRadius: 8, border: `1px solid ${G.border}`, color: G.text, gap: 2 }}>
                {t}
                {t === "Rating" && <ChevronDown style={{ width: 6, height: 6 }} aria-hidden="true" />}
              </span>
            ))}
          </div>
          <Place1
            name="Devgun Packers and Movers"
            rating={4.8}
            reviews="126"
            meta="Moving company · Transport Nagar"
            line="Open · Closes 8 pm"
            img={<Photo {...SITE} crop={{ x: 1020, y: 90, w: 300, h: 300 }} w={40} h={40} />}
          />
          <Place1 name="Haryana Cargo Packers & Movers" rating={4.3} reviews="58" meta="Moving company · Sector 32" line="Open · Closes 7 pm" />
          <Place1 name="Shree Balaji Packers & Movers" rating={4.1} reviews="211" meta="Mover · GT Road" line="Open 24 hours" />
        </div>
      </PhoneFrame>
    </Place>
    <Place x={438} y={10}>
      <PhoneFrame time="11:07">
        <WhatsAppChat
          name="Devgun Packers and Movers"
          status="Business account"
          avatar={<Avatar size={20} />}
          messages={[
            { me: true, day: "Today", text: "Hi, I found you on Google. We need a quote to move our office in Karnal, about 40 workstations.", time: "10:51" },
            { text: "Hello, thank you for contacting Devgun Packers and Movers. Could you share the new address and your preferred moving date?", time: "10:53" },
            { me: true, text: "Sector 12 to HSIIDC Industrial Area. Weekend of 18–19 October. There are 2 server racks as well.", time: "10:58" },
            { text: "Noted. Our move manager can visit tomorrow at 11 am for a survey. We will send the quotation after the visit.", time: "11:02" },
            { me: true, text: "Tomorrow 11 am works. Thanks.", time: "11:04" },
          ]}
        />
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

/* 02 · Google Business Profile on Search ----------------------------- */

export const BusinessProfile: Screen = () => (
  <GoogleSerp
    query="devgun packers and movers karnal"
    aside={
      <GbpPanel
        name="Devgun Packers and Movers"
        rating={4.8}
        reviews="126"
        category="Moving company in Karnal, Haryana"
        address="Shop No. 420, Transport Nagar, Sector 4, Karnal, Haryana 132001"
        hours={{ open: true, text: "Closes 8 pm" }}
        phone={PHONE}
        photos={[
          <Photo key="a" {...SITE} crop={{ x: 1020, y: 90, w: 420, h: 300 }} w={120} h={78} />,
          <Photo key="b" {...SITE} crop={{ x: 500, y: 90, w: 300, h: 190 }} w={60} h={38} />,
          <span key="c" className="flex h-full items-center justify-center" style={{ background: "#fff", borderLeft: `1px solid ${G.line}` }}>
            <Photo {...LOGO} w={56} h={15} />
          </span>,
        ]}
      />
    }
  >
    <SerpResult
      r={{
        site: "devgunpackersandmovers.com",
        url: "https://devgunpackersandmovers.com",
        favicon: <Avatar size={16} />,
        title: "Devgun Packers and Movers - Most Trusted Relocating Partner",
        desc: "Devgun Packers and Movers offers professional packing and moving services for all sorts of office relocation and home shifting requirements within India and ...",
      }}
    />
    <SerpResult
      r={{
        site: "IndiaMART",
        url: "https://m.indiamart.com › devgun-packers-movers",
        favicon: <span style={{ fontSize: 8, fontWeight: 700, color: "#2e3192" }}>i</span>,
        title: "Devgun Packers & Movers, Karnal - Service Provider of ...",
        desc: "Devgun Packers & Movers - Service Provider of Packers Movers Service, Packers & Movers from Karnal, Haryana.",
      }}
    />
    <SerpResult
      r={{
        site: "Facebook",
        url: "https://www.facebook.com › Devgun-packers-and-movers-karnal",
        favicon: <span style={{ fontSize: 9, fontWeight: 700, color: "#0866ff" }}>f</span>,
        title: "Devgun packers and movers karnal | Karnal",
        desc: "Devgun packers and movers karnal, Karnal. Mall Road, Karnal. Office shifting, household shifting and car carrier services.",
      }}
    />
  </GoogleSerp>
);

/* 03 · Business quote landing page ------------------------------------ */

// TODO(content): the service promises on this page (move manager, weekend moves, 24-hour quotes) are illustrative. Confirm with the client.
export const QuoteLandingPage: Screen = () => (
  <BrowserChrome url="devgunpackersandmovers.com/office-relocation/?utm_source=google&utm_medium=cpc&utm_campaign=office">
    <div className="relative h-full" style={{ fontFamily: "'Open Sans', Arial, sans-serif", color: "#333", background: "#fff" }}>
      <header className="flex items-center" style={{ height: 40, padding: "0 70px 0 80px", borderBottom: "1px solid #e5e5e5" }}>
        <Photo {...LOGO} w={100} h={26.8} />
        <nav className="ml-auto flex items-center" style={{ gap: 13, fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: 0.5, color: "#222" }}>
          {["HOME", "ABOUT", "GALLERY", "SERVICES", "CONTACT"].map((t) => (
            <span key={t} style={{ color: t === "SERVICES" ? RED : undefined }}>
              {t}
            </span>
          ))}
        </nav>
      </header>
      <section className="relative flex" style={{ height: 246, padding: "16px 80px 0", gap: 20 }}>
        <div className="absolute inset-0">
          <Photo {...SITE} crop={{ x: 1020, y: 80, w: 420, h: 485 }} w={640} h={246} />
          <div className="absolute inset-0" style={{ background: "rgb(12 22 34 / 0.62)" }} />
        </div>
        <div className="relative flex-1" style={{ color: "#fff", paddingTop: 8 }}>
          <p style={{ fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 1, color: "#ff4b52" }}>FOR OFFICES, SHOWROOMS &amp; WAREHOUSES</p>
          <h1 style={{ fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif", fontSize: 24, fontWeight: 700, lineHeight: 1.1, marginTop: 5 }}>
            Office &amp; Corporate
            <br />
            Relocation
          </h1>
          <p style={{ fontSize: 8, lineHeight: 1.55, marginTop: 7, opacity: 0.88, maxWidth: 230 }}>Planned, packed and moved over a weekend, so your team is back at work on Monday. Local, intercity and PAN India.</p>
          <ul style={{ marginTop: 8, fontSize: 7.5, lineHeight: 1.9 }}>
            {["Free site survey by a move manager", "Workstations, IT and server racks", "Transit insurance and GST invoice"].map((t) => (
              <li key={t} className="flex items-center" style={{ gap: 5 }}>
                <span style={{ width: 5, height: 5, background: RED }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <form className="relative shrink-0" style={{ width: 208, background: "#fff", padding: "9px 12px 10px", alignSelf: "flex-start", borderTop: `3px solid ${RED}` }}>
          <p style={{ fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif", fontSize: 11.5, fontWeight: 700, color: NAVY }}>GET A BUSINESS MOVING QUOTE</p>
          <div className="flex flex-col" style={{ gap: 4, marginTop: 6 }}>
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Company*" placeholder="Company name" w="100%" />
              <Field label="Phone*" placeholder="+91" w={70} />
            </div>
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Moving from*" placeholder="City / area" w="100%" />
              <Field label="Moving to*" placeholder="City / area" w="100%" />
            </div>
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Move type*" value="Office relocation" select w="100%" />
              <Field label="Workstations" value="20–50" select w={70} />
            </div>
            <Field label="Preferred date" placeholder="dd/mm/yyyy" />
          </div>
          <span className="flex items-center justify-center" style={{ marginTop: 7, height: 21, background: RED, fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: "#fff" }}>
            GET MY QUOTE
          </span>
          <p style={{ fontSize: 6, color: "#777", marginTop: 4, textAlign: "center" }}>We reply within 24 hours, Monday to Saturday.</p>
        </form>
      </section>
      <section style={{ padding: "12px 80px 0", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif", fontSize: 15, fontWeight: 700, color: NAVY, letterSpacing: 0.4 }}>WHAT WE MOVE FOR BUSINESSES</h2>
        <p style={{ fontSize: 7.5, color: "#666", lineHeight: 1.5, marginTop: 4 }}>Corporate offices, bank branches, showrooms, clinics, factories and warehouses, within Haryana and across India.</p>
      </section>
      <span className="absolute flex items-center" style={{ left: 10, bottom: 10, gap: 5 }}>
        <span className="flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: "50%", background: "#ec5f2a", color: "#fff" }}>
          <Phone style={{ width: 11, height: 11 }} aria-hidden="true" />
        </span>
        <span style={{ fontSize: 7, background: "#fff", padding: "2px 5px", borderRadius: 3, boxShadow: "0 1px 3px rgb(0 0 0 / 0.2)", fontFamily: "Arial, sans-serif" }}>Call Us</span>
      </span>
      <span className="absolute flex items-center" style={{ right: 10, bottom: 10, gap: 5 }}>
        <span style={{ fontSize: 7, background: "#fff", padding: "2px 5px", borderRadius: 3, boxShadow: "0 1px 3px rgb(0 0 0 / 0.2)", fontFamily: "Arial, sans-serif" }}>Message us</span>
        <span className="flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: "50%", background: "#4dc247", color: "#fff" }}>
          <MessageCircle style={{ width: 12, height: 12 }} aria-hidden="true" />
        </span>
      </span>
    </div>
  </BrowserChrome>
);

/* 04 · Google Ads campaigns with call, form and WhatsApp conversions -- */

const wrap = (t: string) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1 }}>{t}</span>;

const ACOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 126 },
  { label: "Budget", w: 54 },
  { label: "Status", w: 48 },
  { label: "Clicks", w: 36, align: "right" },
  { label: "Avg. CPC", w: 40, align: "right" },
  { label: "Cost", w: 54, align: "right" },
  { label: "Conversions", w: 48, align: "right" },
  { label: "Phone calls", w: 36, align: "right" },
  { label: "Quote forms", w: 38, align: "right" },
  { label: "WhatsApp clicks", w: 44, align: "right" },
  { label: "Cost / conv.", w: 48, align: "right" },
];

const A_ROWS: [string, string, string, "enabled" | "paused", number, number, number, number, number][] = [
  ["DPM_Search_Office-Relocation_Karnal-Panipat", "₹900.00/day", "Eligible", "enabled", 812, 31.4, 58, 29, 34],
  ["DPM_Search_Corporate-Shifting_Haryana", "₹600.00/day", "Eligible", "enabled", 488, 34.85, 37, 17, 22],
  ["DPM_Search_Intercity-Office-Moves_NCR", "₹350.00/day", "Eligible", "enabled", 263, 38.2, 19, 9, 14],
  ["DPM_Search_Warehouse-Industrial", "₹140.00/day", "Limited by budget", "enabled", 141, 29.7, 7, 2, 5],
  ["DPM_Brand_Devgun", "₹100.00/day", "Eligible", "enabled", 402, 4.12, 21, 4, 13],
  ["DPM_Search_Household_Local", "₹500.00/day", "Paused", "paused", 0, 0, 0, 0, 0],
];

const A_CONV = noisy({ n: 31, from: 7.5, to: 11, seed: 71, noise: 0.3, weekly: 0.5, weekStart: 4, bumps: { 12: 0.4, 14: 1.3 } });
const A_CALLS = noisy({ n: 31, from: 3.8, to: 5.4, seed: 72, noise: 0.35, weekly: 0.55, weekStart: 4, bumps: { 12: 0.3 } });

export const CampaignConversions: Screen = () => (
  <GoogleAdsShell account="Devgun Packers and Movers" customerId="604-318-2297" title="Campaigns" dateRange="1 – 31 Aug 2025" nav={null} url="ads.google.com/aw/campaigns?ocid=604318229">
    <GAdsChartCard
      w={548}
      h={60}
      metrics={[
        { label: "Conversions", value: "291.00", on: true },
        { label: "Phone calls", value: "142", on: true },
        { label: "Cost", value: "₹58.4K" },
        { label: "Cost / conv.", value: "₹200.67" },
      ]}
      series={[A_CONV, A_CALLS]}
      xLabels={["1 Aug 2025", "31 Aug 2025"]}
      left={{ max: 20, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 10, ticks: 2, format: (n) => `${n}` }}
    />
    <GAdsTable
      cols={ACOLS}
      rowH={20}
      rows={A_ROWS.map(([name, budget, status, state, clicks, cpc, calls, forms, wa]) => {
        const cost = clicks * cpc;
        const conv = calls + forms + wa;
        return [
          <CheckBox key="c" size={8} />,
          <GAdsDot key="d" state={state} />,
          <GLink key="n">{name}</GLink>,
          budget,
          status === "Limited by budget" ? (
            <span key="s">{wrap(status)}</span>
          ) : (
            <span key="s" style={{ color: status === "Paused" ? G.grey : G.text }}>
              {status}
            </span>
          ),
          num(clicks),
          clicks ? `₹${num(cpc, { decimals: 2 })}` : "—",
          `₹${num(cost, { decimals: 2 })}`,
          `${conv}.00`,
          num(calls),
          num(forms),
          num(wa),
          `₹${num(conv ? cost / conv : 0, { decimals: 2 })}`,
        ];
      })}
      total={["", "", "Total: all campaigns", "", "", "2,106", "₹27.73", "₹58,394.14", "291.00", "142", "61", "88", "₹200.67"]}
    />
  </GoogleAdsShell>
);

/* 05 · Looker Studio: monthly lead report by source ------------------- */

function LookerMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" fill="none" stroke="#4285f4" strokeWidth="3" />
      <circle cx="17" cy="17" r="4.5" fill="#34a853" />
      <circle cx="17" cy="17" r="2" fill="#fff" />
    </svg>
  );
}

const SOURCES: { name: string; color: string }[] = [
  { name: "Google Ads", color: "#4285f4" },
  { name: "Business Profile", color: "#ea4335" },
  { name: "Website (organic)", color: "#fbbc04" },
  { name: "Directories", color: "#34a853" },
  { name: "Referral", color: "#ff6d01" },
];
const MONTHS: [string, number[]][] = [
  ["Mar", [21, 30, 22, 51, 18]],
  ["Apr", [24, 33, 24, 49, 20]],
  ["May", [82, 38, 23, 36, 17]],
  ["Jun", [118, 45, 27, 38, 19]],
  ["Jul", [151, 55, 29, 30, 16]],
  ["Aug", [176, 64, 31, 29, 18]],
];

function StackedColumns({ w, h }: { w: number; h: number }) {
  const pl = 22;
  const bottom = h - 12;
  const max = 400;
  const bw = (w - pl) / MONTHS.length;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", fontFamily: FONT.google }} aria-hidden="true">
      {[0, 100, 200, 300, 400].map((t) => {
        const y = bottom - (t / max) * (bottom - 4);
        return (
          <g key={t}>
            <line x1={pl} x2={w} y1={y} y2={y} stroke={t ? G.line : "#bdc1c6"} />
            <text x={pl - 4} y={y + 2.5} textAnchor="end" fontSize={7} fill={G.grey}>
              {t}
            </text>
          </g>
        );
      })}
      {MONTHS.map(([m, vals], i) => {
        let acc = 0;
        const x = pl + bw * i + bw * 0.2;
        return (
          <g key={m}>
            {vals.map((v, j) => {
              const y0 = bottom - (acc / max) * (bottom - 4);
              acc += v;
              const y1 = bottom - (acc / max) * (bottom - 4);
              return <rect key={j} x={x} y={y1} width={bw * 0.6} height={y0 - y1} fill={SOURCES[j].color} />;
            })}
            <text x={x + bw * 0.3} y={h - 2} textAnchor="middle" fontSize={7} fill={G.grey}>
              {m} 2025
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Scorecard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, border: `1px solid ${G.line}`, padding: "6px 8px" }}>
      <p className="truncate" style={{ fontSize: 7.5, color: G.grey }}>
        {label}
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.2, marginTop: 2 }}>{value}</p>
      <p style={{ fontSize: 7.5, color: "#188038", marginTop: 1 }}>▲ {delta}</p>
    </div>
  );
}

const R_ROWS: [string, number, number, number, number][] = [
  ["Google Ads", 176, 71, 58, 9],
  ["Business Profile", 64, 21, 22, 6],
  ["Website (organic)", 31, 7, 11, 3],
  ["Directories", 29, 3, 9, 3],
  ["Referral", 18, 2, 7, 2],
];

export const LeadReport: Screen = () => (
  <BrowserChrome url="lookerstudio.google.com/reporting/2f9b61d4-8c07-4e3a-b1d2-7a55e0c914ab/page/p_9w1lqz3xkd">
    <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#e8eaed" }}>
      <header className="flex shrink-0 items-center" style={{ height: 30, padding: "0 10px", gap: 7, background: "#fff", borderBottom: `1px solid ${G.border}` }}>
        <LookerMark size={15} />
        <span style={{ fontSize: 10.5, fontFamily: FONT.googleSans }}>Devgun – Monthly lead report</span>
        <span className="ml-auto flex items-center" style={{ gap: 8, fontSize: 8, color: G.grey }}>
          <RotateCw style={{ width: 9, height: 9 }} aria-hidden="true" />
          <span>Reset</span>
          <span className="flex items-center" style={{ gap: 3, height: 20, padding: "0 9px", borderRadius: 4, border: `1px solid ${G.border}`, color: "#0b57d0", fontWeight: 500 }}>
            <Share2 style={{ width: 8, height: 8 }} aria-hidden="true" />
            Share
            <ChevronDown style={{ width: 8, height: 8 }} aria-hidden="true" />
          </span>
          <span style={{ height: 20, lineHeight: "20px", padding: "0 10px", borderRadius: 4, background: "#0b57d0", color: "#fff", fontWeight: 500 }}>Edit</span>
          <EllipsisVertical style={{ width: 10, height: 10 }} aria-hidden="true" />
          <Initials name="V G" size={16} bg="#7b5e9f" />
        </span>
      </header>
      <div className="min-h-0 flex-1" style={{ padding: "8px 10px 0" }}>
        <div style={{ height: "100%", background: "#fff", padding: "10px 12px" }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <Photo {...LOGO} w={78} h={21} />
            <span style={{ width: 1, height: 14, background: G.border }} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>Enquiries by source</span>
            <span className="ml-auto flex items-center" style={{ gap: 6, fontSize: 7.5 }}>
              <span className="flex items-center" style={{ gap: 3, border: `1px solid ${G.border}`, padding: "3px 6px" }}>
                Customer type: All
                <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
              </span>
              <span className="flex items-center" style={{ gap: 3, border: `1px solid ${G.border}`, padding: "3px 6px" }}>
                1 Aug 2025 – 31 Aug 2025
                <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
              </span>
            </span>
          </div>
          <div className="flex" style={{ marginTop: 9, gap: 6 }}>
            <Scorecard label="Enquiries" value="318" delta="123.9%" />
            <Scorecard label="Business (B2B) enquiries" value="104" delta="205.9%" />
            <Scorecard label="Calls from Google" value="180" delta="140.0%" />
            <Scorecard label="Orders won" value="23" delta="91.7%" />
            <Scorecard label="B2B orders won" value="9" delta="800.0%" />
          </div>
          <p style={{ fontSize: 6.5, color: G.grey, marginTop: 3 }}>Compared with 1 Mar 2025 – 31 Mar 2025 · Source: lead sheet (calls, forms, WhatsApp), deduplicated</p>
          <div className="flex" style={{ marginTop: 7, gap: 14 }}>
            <div style={{ width: 236 }}>
              <p style={{ fontSize: 8, fontWeight: 500 }}>Enquiries by month and source</p>
              <p className="flex flex-wrap items-center" style={{ fontSize: 6.5, color: G.grey, columnGap: 7, rowGap: 1, marginTop: 2 }}>
                {SOURCES.map((s) => (
                  <span key={s.name} className="flex items-center" style={{ gap: 3 }}>
                    <span style={{ width: 6, height: 6, background: s.color }} />
                    {s.name}
                  </span>
                ))}
              </p>
              <div style={{ marginTop: 4 }}>
                <StackedColumns w={236} h={118} />
              </div>
            </div>
            <div className="min-w-0 flex-1" style={{ fontSize: 7.5 }}>
              <p style={{ fontSize: 8, fontWeight: 500, marginBottom: 4 }}>August by source</p>
              <div className="flex items-center" style={{ height: 20, background: "#f8f9fa", fontWeight: 500, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
                <span style={{ flex: 1, paddingLeft: 4 }}>Source</span>
                <span style={{ width: 46, textAlign: "right" }}>Enquiries ▼</span>
                <span style={{ width: 30, textAlign: "right" }}>B2B</span>
                <span style={{ width: 44, textAlign: "right" }}>Quotes sent</span>
                <span style={{ width: 30, textAlign: "right" }}>Won</span>
                <span style={{ width: 40, textAlign: "right", paddingRight: 4 }}>Win rate</span>
              </div>
              {R_ROWS.map(([s, e, b, q, w]) => (
                <div key={s} className="flex items-center" style={{ height: 21, borderBottom: `1px solid ${G.line}`, whiteSpace: "nowrap" }}>
                  <span className="truncate" style={{ flex: 1, paddingLeft: 4 }}>
                    {s}
                  </span>
                  <span style={{ width: 46, textAlign: "right" }}>{e}</span>
                  <span style={{ width: 30, textAlign: "right" }}>{b}</span>
                  <span style={{ width: 44, textAlign: "right" }}>{q}</span>
                  <span style={{ width: 30, textAlign: "right" }}>{w}</span>
                  <span style={{ width: 40, textAlign: "right", paddingRight: 4 }}>{num((w / e) * 100, { decimals: 1 })}%</span>
                </div>
              ))}
              <div className="flex items-center" style={{ height: 21, fontWeight: 500, whiteSpace: "nowrap" }}>
                <span style={{ flex: 1, paddingLeft: 4 }}>Grand total</span>
                <span style={{ width: 46, textAlign: "right" }}>318</span>
                <span style={{ width: 30, textAlign: "right" }}>104</span>
                <span style={{ width: 44, textAlign: "right" }}>107</span>
                <span style={{ width: 30, textAlign: "right" }}>23</span>
                <span style={{ width: 40, textAlign: "right", paddingRight: 4 }}>7.2%</span>
              </div>
              <p style={{ fontSize: 6.5, color: G.grey, marginTop: 4, textAlign: "right" }}>1 - 5 / 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

export const devgunScreens: Screen[] = [MobileSearchAd, BusinessProfile, QuoteLandingPage, CampaignConversions, LeadReport];
