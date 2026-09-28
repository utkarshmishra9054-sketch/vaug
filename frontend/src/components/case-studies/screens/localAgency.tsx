import type { ReactNode } from "react";
import {
  AlignLeft,
  Bold,
  ChevronDown,
  Clock,
  Cloud,
  House,
  Italic,
  Lock,
  Menu,
  MessageCircle,
  MessageSquare,
  PaintBucket,
  Paintbrush,
  Plus,
  Printer,
  Redo2,
  Search,
  Send,
  SquarePlay,
  Star,
  Strikethrough,
  Undo2,
  UsersRound,
  Video,
} from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  FacebookPost,
  FONT,
  G,
  GoogleSerp,
  HubSpotBoard,
  Initials,
  InstagramPost,
  InstagramStory,
  LogoAvatar,
  PhoneBackdrop,
  PhoneFrame,
  Photo,
  Place,
  SerpAd,
  SerpLabel,
  SerpResult,
  type HubStage,
} from "./tools";

/* Local Agency Co. · landlord appraisal funnel, Sydney (Meta + Google Ads, appraisal
   landing page, HubSpot pipeline, monthly Google Sheets report).
   TODO(content): every figure below is illustrative (see the study file).
   August 2026: 38 appraisal requests (19 Google, 15 Meta, 4 referral/organic),
   A$2,432.00 ad spend = A$64.00 per appraisal lead, 7 agreements signed (18%). */

const SAGE = "#9dcac6";
const INK = "#111";

const LOGO = { src: "/logos/local-agency-co.webp", img: { w: 480, h: 100 } };
const SITE = { src: "/sites/local-agency-co.webp", img: { w: 1440, h: 900 } };

/** The house mark cut from the real logo. */
function House_({ size }: { size: number }) {
  return <Photo {...LOGO} crop={{ x: 0, y: 2, w: 100, h: 98 }} w={size} h={size * 0.98} />;
}
function Avatar({ size }: { size: number }) {
  return (
    <LogoAvatar size={size} bg={SAGE}>
      <House_ size={size * 0.66} />
    </LogoAvatar>
  );
}

/* 01 · Meta ads: Facebook feed, Instagram feed and Story ------------ */

function FeedTabBar({ ig = false }: { ig?: boolean }) {
  const s = { width: 13, height: 13 };
  return (
    <div className="mt-auto flex shrink-0 items-center justify-around" style={{ height: 34, paddingBottom: 10, borderTop: "0.5px solid #dbdbdb", color: "#000", background: "#fff" }}>
      {ig ? (
        <>
          <House style={s} fill="#000" aria-hidden="true" />
          <Search style={s} aria-hidden="true" />
          <SquarePlay style={s} aria-hidden="true" />
          <Send style={s} aria-hidden="true" />
          <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#b59a82" }} />
        </>
      ) : (
        <>
          <House style={{ ...s, color: "#0866ff" }} fill="#0866ff" aria-hidden="true" />
          <SquarePlay style={{ ...s, color: "#65676b" }} aria-hidden="true" />
          <UsersRound style={{ ...s, color: "#65676b" }} aria-hidden="true" />
          <MessageCircle style={{ ...s, color: "#65676b" }} aria-hidden="true" />
          <Menu style={{ ...s, color: "#65676b" }} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

/** Letter-spaced caps, the style of the agency's site headings. */
function Caps({ children, size, color = INK, spacing = 0.28 }: { children: ReactNode; size: number; color?: string; spacing?: number }) {
  return <p style={{ fontSize: size, letterSpacing: size * spacing, color, fontWeight: 500, lineHeight: 1.35, textTransform: "uppercase" }}>{children}</p>;
}

/** Facebook creative: harbour photo from the site with the sage band. */
function FeedCreative({ w, h }: { w: number; h: number }) {
  return (
    <div className="relative" style={{ width: w, height: h, fontFamily: FONT.web }}>
      <Photo {...SITE} crop={{ x: 430, y: 220, w: 620, h: 420 }} w={w} h={h} />
      <div className="absolute inset-x-0 bottom-0 text-center" style={{ background: SAGE, padding: "6px 6px 7px" }}>
        <Caps size={9}>Free rental appraisal</Caps>
        <p style={{ fontSize: 6.5, marginTop: 1, color: INK }}>Eastern Suburbs &amp; Lower North Shore</p>
      </div>
    </div>
  );
}

/** Instagram creative: the terraces and apartments above the harbour. */
function SquareCreative({ w }: { w: number }) {
  return (
    <div className="relative" style={{ width: w, height: w, fontFamily: FONT.web }}>
      <Photo {...SITE} crop={{ x: 720, y: 180, w: 360, h: 360 }} w={w} h={w} />
      <span className="absolute" style={{ left: 8, top: 8, background: "#fff", padding: "3px 5px" }}>
        <Photo {...LOGO} w={62} h={12.9} />
      </span>
      <div className="absolute" style={{ left: 8, right: 8, bottom: 8, background: "rgb(255 255 255 / 0.94)", padding: "5px 7px" }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: INK, lineHeight: 1.15 }}>What could your property rent for?</p>
        <p style={{ fontSize: 6.5, color: "#333", marginTop: 2 }}>Free appraisal from a local property manager</p>
      </div>
    </div>
  );
}

/** Story creative: vertical crop around the Harbour Bridge. */
function StoryCreative({ w, h }: { w: number; h: number }) {
  return (
    <div className="relative" style={{ width: w, height: h, fontFamily: FONT.web }}>
      <Photo {...SITE} crop={{ x: 1110, y: 150, w: 200, h: 388 }} w={w} h={h} />
      <div className="absolute text-center" style={{ left: 12, right: 12, top: 118, background: SAGE, padding: "9px 8px" }}>
        <Caps size={8.5}>Landlords</Caps>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: INK, lineHeight: 1.15, marginTop: 3 }}>Switching property managers is easier than you think</p>
        <p style={{ fontSize: 6.5, color: INK, marginTop: 4 }}>We handle the handover with your current agent</p>
      </div>
    </div>
  );
}

export const MetaAd: Screen = () => (
  <PhoneBackdrop>
    <Place x={22} y={10}>
      <PhoneFrame time="7:52">
        <div className="flex shrink-0 items-center" style={{ height: 24, padding: "0 9px", gap: 8, fontFamily: FONT.meta, background: "#fff" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0866ff", letterSpacing: -0.4 }}>facebook</span>
          <span className="ml-auto flex" style={{ gap: 6 }}>
            {[Plus, Search, MessageCircle].map((I, i) => (
              <span key={i} className="flex items-center justify-center" style={{ width: 15, height: 15, borderRadius: "50%", background: "#e4e6eb", color: "#050505" }}>
                <I style={{ width: 8, height: 8 }} strokeWidth={2.5} aria-hidden="true" />
              </span>
            ))}
          </span>
        </div>
        <div style={{ height: 5, background: "#c9ccd1" }} />
        <FacebookPost
          w={170}
          page="Local Agency Co."
          avatar={<Avatar size={20} />}
          text={<>Own an investment property in Bondi, Coogee or Randwick? Find out what it could rent for with a free appraisal from our local team.</>}
          image={<FeedCreative w={170} h={142} />}
          imageH={142}
          domain="localagencyco.com"
          headline="Free rental appraisal"
          cta="Book now"
          reactions="47"
          comments="6"
          shares="2"
        />
        <FeedTabBar />
      </PhoneFrame>
    </Place>
    <Place x={230} y={10}>
      <PhoneFrame time="7:53">
        <InstagramPost
          w={170}
          handle="localagencyco"
          avatar={<Avatar size={20} />}
          image={<SquareCreative w={170} />}
          imageH={170}
          cta="Book now"
          likes="112"
          caption="Landlords in Mosman, Neutral Bay and Cremorne: book a free rental appraisal and see what your property is worth in today's market."
        />
        <FeedTabBar ig />
      </PhoneFrame>
    </Place>
    <Place x={438} y={10}>
      <PhoneFrame dark time="7:55">
        <InstagramStory handle="localagencyco" avatar={<Avatar size={16} />} image={<StoryCreative w={170} h={330} />} cta="Book now" progress={0.6} />
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

/* 02 · Rental appraisal landing page -------------------------------- */

function Choice({ children, on = false, w }: { children: ReactNode; on?: boolean; w?: number }) {
  return (
    <span className="flex items-center justify-center" style={{ height: 20, width: w, padding: w ? 0 : "0 8px", border: `1px solid ${on ? INK : "#c9c9c9"}`, background: on ? INK : "#fff", color: on ? "#fff" : "#333", fontSize: 7.5, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: 7, fontWeight: 600, color: "#333", marginBottom: 3, letterSpacing: 0.2 }}>{children}</p>;
}

export const AppraisalLanding: Screen = () => (
  <BrowserChrome url="localagencyco.com/rental-appraisal/eastern-suburbs?utm_source=facebook&utm_medium=paid_social&utm_campaign=LA_Landlords_EastSubs">
    <div className="relative h-full" style={{ fontFamily: FONT.web, color: INK, background: "#fff" }}>
      <header className="relative flex items-center justify-center" style={{ height: 44, background: SAGE }}>
        <Photo {...LOGO} w={150} h={31.25} />
        <span className="absolute flex items-center" style={{ right: 26, gap: 16 }}>
          <Search style={{ width: 12, height: 12 }} strokeWidth={2.5} aria-hidden="true" />
          <Menu style={{ width: 14, height: 14 }} strokeWidth={2.5} aria-hidden="true" />
        </span>
      </header>
      <section className="relative" style={{ height: 150 }}>
        <Photo {...SITE} crop={{ x: 0, y: 190, w: 1400, h: 328 }} w={640} h={150} />
        <div className="absolute inset-0" style={{ background: "rgb(0 0 0 / 0.18)" }} />
        <div className="absolute text-center" style={{ left: 20, width: 330, top: 50, color: "#fff", textShadow: "0 1px 3px rgb(0 0 0 / 0.4)" }}>
          <Caps size={13} color="#fff" spacing={0.3}>
            Free rental appraisal
          </Caps>
          <Caps size={7} color="#fff" spacing={0.3}>
            Eastern Suburbs &amp; Lower North Shore
          </Caps>
        </div>
      </section>
      <section style={{ padding: "14px 20px 0", width: 340 }}>
        <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Find out what your property could rent for</p>
        <p style={{ fontSize: 8, lineHeight: 1.55, color: "#444", marginTop: 6 }}>
          A property manager who knows your street will inspect the property and send a written appraisal within 24 hours. There&apos;s no cost and no obligation to list with us.
        </p>
        <div className="flex" style={{ gap: 16, marginTop: 10 }}>
          {[
            ["20+", "years in the Eastern Suburbs"],
            ["98.6%", "occupancy across our rent roll"],
            ["4.9", "from 212 Google reviews"],
          ].map(([v, l]) => (
            <div key={l}>
              <p style={{ fontSize: 13, fontWeight: 700 }}>{v}</p>
              <p style={{ fontSize: 6.5, color: "#555", width: 84, lineHeight: 1.35 }}>{l}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="absolute" style={{ left: 20, top: 305, width: 356 }}>
        <Caps size={7} spacing={0.25}>
          Recently leased by our team
        </Caps>
        <div className="flex" style={{ gap: 8, marginTop: 5 }}>
          {(
            [
              [{ x: 880, y: 400, w: 180, h: 110 }, "Bondi Beach", "2 bed · 1 bath", "A$1,050/wk"],
              [{ x: 140, y: 410, w: 180, h: 110 }, "Coogee", "3 bed · 2 bath", "A$1,480/wk"],
              [{ x: 1190, y: 390, w: 180, h: 110 }, "Randwick", "1 bed · 1 bath", "A$720/wk"],
            ] as const
          ).map(([crop, sub, beds, rent]) => (
            <div key={sub} style={{ width: 113, border: "1px solid #e3e3e3" }}>
              <Photo {...SITE} crop={crop} w={111} h={26} />
              <div style={{ padding: "3px 5px 4px", fontSize: 6.5, lineHeight: 1.35 }}>
                <p style={{ fontWeight: 700, fontSize: 7.5 }}>{rent}</p>
                <p style={{ color: "#555" }}>
                  {sub} · {beds}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <form className="absolute" style={{ right: 22, top: 70, width: 232, background: "#fff", border: `3px solid ${SAGE}`, padding: "11px 13px 12px" }}>
        <div className="flex items-center" style={{ gap: 5, fontSize: 6.5, color: "#777", letterSpacing: 0.4 }}>
          {["Address", "Property", "Time"].map((t, i) => (
            <span key={t} className="flex flex-1 flex-col" style={{ gap: 3 }}>
              <span style={{ height: 3, background: i < 2 ? INK : "#e2e2e2" }} />
              <span style={{ color: i === 1 ? INK : undefined, fontWeight: i === 1 ? 600 : 400 }}>
                {i + 1}. {t.toUpperCase()}
              </span>
            </span>
          ))}
        </div>
        <p style={{ fontSize: 10.5, fontWeight: 700, marginTop: 10 }}>Tell us about the property</p>
        <p style={{ fontSize: 7, color: "#666", marginTop: 1 }}>27 Brighton Blvd, Bondi Beach NSW 2026</p>
        <div style={{ marginTop: 8 }}>
          <Label>Property type</Label>
          <div className="flex" style={{ gap: 4 }}>
            <Choice>House</Choice>
            <Choice on>Apartment</Choice>
            <Choice>Townhouse</Choice>
          </div>
        </div>
        <div className="flex" style={{ gap: 12, marginTop: 7 }}>
          <div>
            <Label>Bedrooms</Label>
            <div className="flex" style={{ gap: 3 }}>
              {["1", "2", "3", "4+"].map((t) => (
                <Choice key={t} w={20} on={t === "2"}>
                  {t}
                </Choice>
              ))}
            </div>
          </div>
          <div>
            <Label>Bathrooms</Label>
            <div className="flex" style={{ gap: 3 }}>
              {["1", "2", "3+"].map((t) => (
                <Choice key={t} w={20} on={t === "1"}>
                  {t}
                </Choice>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 7 }}>
          <Label>The property is currently</Label>
          <div className="flex" style={{ gap: 4 }}>
            <Choice on>Tenanted</Choice>
            <Choice>Vacant</Choice>
            <Choice>Owner-occupied</Choice>
          </div>
        </div>
        <div className="flex items-center" style={{ marginTop: 11, gap: 8 }}>
          <span style={{ fontSize: 7.5, textDecoration: "underline", color: "#444" }}>Back</span>
          <span className="ml-auto flex items-center justify-center" style={{ height: 22, padding: "0 16px", background: INK, color: "#fff", fontSize: 7.5, fontWeight: 600, letterSpacing: 1 }}>
            NEXT: CHOOSE A TIME
          </span>
        </div>
      </form>
      <span className="absolute flex flex-col items-center" style={{ right: 0, top: 196, width: 16, padding: "8px 0 5px", gap: 5, background: "#3c3c3c", color: "#fff", fontSize: 6, fontWeight: 600 }}>
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Chat with us</span>
        <MessageSquare style={{ width: 8, height: 8 }} fill="#fff" aria-hidden="true" />
      </span>
    </div>
  </BrowserChrome>
);

/* 03 · Google search with the sponsored result ---------------------- */

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 6.5, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

const favicon = (
  <span className="flex items-center justify-center" style={{ width: 18, height: 18, background: SAGE }}>
    <House_ size={11} />
  </span>
);

export const MobileSearchAd: Screen = () => (
  <GoogleSerp query="property management bondi">
    <SerpLabel />
    <SerpAd
      ad={{
        site: "Local Agency Co.",
        url: "https://www.localagencyco.com › rental-appraisal",
        favicon,
        title: "Property Management Bondi | Book a Free Rental Appraisal",
        desc: "Boutique property managers in the Eastern Suburbs for 20+ years. One dedicated manager, monthly statements and a free appraisal within 24 hours.",
        sitelinks: ["Free Rental Appraisal", "Our Fees", "Switching Agents", "Rentals Available"],
      }}
    />
    <SerpResult
      r={{
        site: "realestate.com.au",
        url: "https://www.realestate.com.au › find-agent › bondi",
        favicon: <Fav bg="#e4002b" t="r" />,
        title: "Property Management Agents in Bondi, NSW 2026",
        desc: "Compare property managers in Bondi. See rent roll size, days on market and reviews from landlords before you choose an agent.",
      }}
    />
    <SerpResult
      r={{
        site: "Local Agency Co.",
        url: "https://localagencyco.com › property-management",
        favicon,
        title: "Property Management Eastern Suburbs | Local Agency Co.",
        desc: "Boutique property management and sales in Sydney's Eastern Suburbs and Lower North Shore. Rent appraisals, leasing and routine inspections.",
      }}
    />
    <SerpResult
      r={{
        site: "Reddit · r/AusFinance",
        url: "https://www.reddit.com › r › AusFinance › comments",
        favicon: <Fav bg="#ff4500" t="r" />,
        title: "Worth switching property managers? Eastern suburbs unit",
        date: "11 Mar 2026",
        desc: "Current agent takes a week to answer anything and the last inspection report was two lines. How hard is it to switch mid-lease?...",
      }}
    />
  </GoogleSerp>
);

/* 04 · HubSpot appraisal pipeline ----------------------------------- */

const CH = ["Claire Hudson", "#00a4bd"] as const;
const TN = ["Tom Nguyen", "#f2547d"] as const;
const PS = ["Priya Shah", "#6a78d1"] as const;

const d = (name: string, amount: string, close: string, [owner, ownerColor]: readonly [string, string], source: string) => ({ name, amount, close, owner, ownerColor, source });

const STAGES: HubStage[] = [
  {
    stage: "Appraisal requested",
    count: 9,
    total: "A$36,904",
    deals: [
      d("14 Wellington St, Bondi", "A$4,368", "30/09/2026", TN, "Paid social"),
      d("6/31 Carr St, Coogee", "A$3,120", "30/09/2026", TN, "Paid search"),
      d("22 Raglan St, Mosman", "A$5,512", "15/10/2026", PS, "Paid search"),
    ],
  },
  {
    stage: "Appraisal booked",
    count: 7,
    total: "A$29,745",
    deals: [
      d("3/118 Brook St, Coogee", "A$3,276", "25/09/2026", CH, "Paid social"),
      d("41 Macpherson St, Bronte", "A$6,032", "30/09/2026", CH, "Referrals"),
      d("9/5 Ben Boyd Rd, Neutral Bay", "A$3,432", "02/10/2026", PS, "Paid search"),
    ],
  },
  {
    stage: "Appraisal completed",
    count: 6,
    total: "A$24,180",
    deals: [
      d("12 Glenayr Ave, Bondi Beach", "A$4,784", "19/09/2026", TN, "Paid search"),
      d("7/40 Avoca St, Randwick", "A$2,964", "22/09/2026", TN, "Paid social"),
      d("58 Spofforth St, Cremorne", "A$4,056", "26/09/2026", PS, "Organic search"),
    ],
  },
  {
    stage: "Proposal sent",
    count: 5,
    total: "A$21,346",
    deals: [
      d("15 Hargrave St, Paddington", "A$5,148", "12/09/2026", CH, "Paid search"),
      d("2/9 Beach Rd, Bondi Beach", "A$3,588", "16/09/2026", TN, "Paid social"),
      d("30 Belmont Rd, Mosman", "A$4,420", "19/09/2026", PS, "Paid search"),
    ],
  },
  {
    stage: "Agreement signed",
    count: 7,
    total: "A$27,794",
    deals: [
      d("5/211 Birrell St, Bondi", "A$3,432", "28/08/2026", TN, "Paid search"),
      d("18 Dudley St, Coogee", "A$4,628", "26/08/2026", CH, "Paid social"),
      d("11/2 Hampden Ave, Cremorne", "A$2,808", "21/08/2026", PS, "Referrals"),
    ],
  },
];

export const AppraisalPipeline: Screen = () => <HubSpotBoard pipeline="Landlord appraisals" portalId="39018264" stages={STAGES} colW={112} />;

/* 05 · Monthly report in Google Sheets ------------------------------ */

function SheetsMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size * 0.75} height={size} viewBox="0 0 18 24" aria-hidden="true">
      <path d="M2 0h10l6 6v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#0f9d58" />
      <path d="M12 0l6 6h-4a2 2 0 0 1-2-2z" fill="#87ceac" />
      <path d="M4 11h10v8H4z M5.4 12.4v1.9h3v-1.9z M9.6 12.4v1.9h3v-1.9z M5.4 15.7v1.9h3v-1.9z M9.6 15.7v1.9h3v-1.9z" fill="#fff" fillRule="evenodd" />
    </svg>
  );
}

const COLS = [74, 50, 38, 56, 50, 56, 48, 40, 52, 52, 52, 52];
const LETTERS = "ABCDEFGHIJKL".split("");
const ROW_H = 14;

type Cell = { v: ReactNode; b?: boolean; r?: boolean; bg?: string; c?: string; i?: boolean; top?: boolean };
const cell = (v: ReactNode, o: Omit<Cell, "v"> = {}): Cell => ({ v, ...o });
const HEAD = "#d0e6e4";

const SUBURBS: [string, number, number, number, number, number][] = [
  ["Bondi", 5, 3, 1, 512.4, 2],
  ["Coogee", 3, 2, 0, 338.15, 1],
  ["Randwick", 2, 3, 1, 351.02, 1],
  ["Paddington", 2, 1, 1, 233.66, 1],
  ["Double Bay", 1, 1, 0, 176.8, 0],
  ["Mosman", 4, 2, 0, 402.93, 1],
  ["Neutral Bay", 1, 2, 1, 227.54, 1],
  ["Cremorne", 1, 1, 0, 189.5, 0],
];
const aud = (n: number) => `A$${n.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SHEET: Cell[][] = [
  [cell("August 2026 – Appraisal leads by suburb and channel", { b: true })],
  [cell("Source: HubSpot deals created 1–31 Aug, Google Ads, Meta Ads Manager. Spend ex GST.", { c: "#666", i: true })],
  ["Suburb", "Google Ads", "Meta", "Referral / org.", "Appraisals", "Ad spend", "Cost / lead", "Signed"].map((h, i) => cell(h, { b: true, bg: HEAD, r: i > 0 })),
  ...SUBURBS.map(([s, g, m, r, sp, sg]) => [cell(s), cell(g, { r: true }), cell(m, { r: true }), cell(r, { r: true }), cell(g + m + r, { r: true }), cell(aud(sp), { r: true }), cell(aud(sp / (g + m + r)), { r: true }), cell(sg, { r: true })]),
  ["Total", "19", "15", "4", "38", aud(2432), aud(64), "7"].map((v, i) => cell(v, { b: true, r: i > 0, top: true })),
  [],
  [cell("By channel", { b: true })],
  ["Channel", "Leads", "Signed", "Ad spend", "Cost / lead"].map((h, i) => cell(h, { b: true, bg: HEAD, r: i > 0 })),
  [cell("Google Ads"), cell(19, { r: true }), cell(4, { r: true }), cell(aud(1384.2), { r: true }), cell(aud(72.85), { r: true })],
  [cell("Meta Ads"), cell(15, { r: true }), cell(2, { r: true }), cell(aud(1047.8), { r: true }), cell(aud(69.85), { r: true })],
  [cell("Referral / organic"), cell(4, { r: true }), cell(1, { r: true }), cell("–", { r: true }), cell("–", { r: true })],
];

const MONTHS: [string, number][] = [
  ["Mar", 9],
  ["Apr", 13],
  ["May", 21],
  ["Jun", 24],
  ["Jul", 31],
  ["Aug", 38],
];

function SheetsChart() {
  const w = 184;
  const h = 146;
  const pl = 22;
  const top = 30;
  const bottom = h - 18;
  const pw = w - pl - 10;
  const bw = pw / MONTHS.length;
  return (
    <div style={{ width: w, height: h, background: "#fff", border: "1px solid #dadce0", position: "relative", fontFamily: "Arial, sans-serif" }}>
      <p style={{ position: "absolute", left: 10, top: 8, fontSize: 8.5, fontWeight: 700, color: "#222" }}>Appraisal requests per month</p>
      <svg width={w} height={h} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        {[0, 10, 20, 30, 40].map((t) => {
          const y = bottom - (t / 40) * (bottom - top);
          return (
            <g key={t}>
              <line x1={pl} x2={w - 10} y1={y} y2={y} stroke={t ? "#e6e6e6" : "#9e9e9e"} />
              <text x={pl - 4} y={y + 2.5} textAnchor="end" fontSize={6.5} fill="#444">
                {t}
              </text>
            </g>
          );
        })}
        {MONTHS.map(([m, v], i) => {
          const bh = (v / 40) * (bottom - top);
          const x = pl + i * bw + bw * 0.2;
          return (
            <g key={m}>
              <rect x={x} y={bottom - bh} width={bw * 0.6} height={bh} fill="#4285f4" />
              <text x={x + bw * 0.3} y={bottom - bh - 3} textAnchor="middle" fontSize={6.5} fill="#444">
                {v}
              </text>
              <text x={x + bw * 0.3} y={h - 7} textAnchor="middle" fontSize={6.5} fill="#444">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const IC = { width: 9, height: 9 };

export const CampaignReport: Screen = () => (
  <BrowserChrome url="docs.google.com/spreadsheets/d/1qZr8Kx3TbL0vW2nYf5sQ7uE4hA9cJ6mP1dRgO3xBkVs/edit#gid=1840263317">
    <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#f9fbfd" }}>
      <div className="flex shrink-0 items-center" style={{ height: 38, padding: "0 10px", gap: 8 }}>
        <SheetsMark size={20} />
        <div className="min-w-0" style={{ lineHeight: 1.25 }}>
          <p className="flex items-center" style={{ fontFamily: FONT.googleSans, fontSize: 10.5, gap: 6 }}>
            LAC – Monthly campaign report 2026
            <Star style={{ ...IC, color: G.grey }} aria-hidden="true" />
            <Cloud style={{ ...IC, color: G.grey }} aria-hidden="true" />
          </p>
          <p className="flex" style={{ fontSize: 7.5, gap: 8, color: G.text }}>
            {["File", "Edit", "View", "Insert", "Format", "Data", "Tools", "Extensions", "Help"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </div>
        <span className="ml-auto flex items-center" style={{ gap: 11, color: G.grey }}>
          <Clock style={IC} aria-hidden="true" />
          <MessageSquare style={IC} aria-hidden="true" />
          <Video style={IC} aria-hidden="true" />
          <span className="flex items-center" style={{ height: 20, padding: "0 11px", gap: 4, borderRadius: 10, background: "#c2e7ff", color: "#001d35", fontSize: 8, fontWeight: 500 }}>
            <Lock style={{ width: 8, height: 8 }} aria-hidden="true" />
            Share
          </span>
          <Initials name="V G" size={17} bg="#7b5e9f" />
        </span>
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 22, margin: "0 8px", padding: "0 8px", gap: 9, borderRadius: 11, background: "#edf2fa", color: "#444746", fontSize: 7.5 }}>
        <Search style={IC} aria-hidden="true" />
        <Undo2 style={IC} aria-hidden="true" />
        <Redo2 style={IC} aria-hidden="true" />
        <Printer style={IC} aria-hidden="true" />
        <Paintbrush style={IC} aria-hidden="true" />
        <span className="flex items-center" style={{ gap: 2 }}>
          100% <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
        </span>
        <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
        <span>$</span>
        <span>%</span>
        <span>.0</span>
        <span>.00</span>
        <span>123</span>
        <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
        <span className="flex items-center" style={{ gap: 2 }}>
          Arial <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
        </span>
        <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
        <span>−</span>
        <span style={{ border: "1px solid #747775", borderRadius: 2, padding: "0 4px" }}>10</span>
        <span>+</span>
        <span style={{ width: 1, height: 12, background: "#c7c7c7" }} />
        <Bold style={IC} aria-hidden="true" />
        <Italic style={IC} aria-hidden="true" />
        <Strikethrough style={IC} aria-hidden="true" />
        <span style={{ fontWeight: 600, textDecoration: "underline" }}>A</span>
        <PaintBucket style={IC} aria-hidden="true" />
        <AlignLeft style={IC} aria-hidden="true" />
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 22, fontSize: 7.5, gap: 8, padding: "0 8px", marginTop: 3, background: "#fff", borderTop: "1px solid #e1e3e1", borderBottom: "1px solid #e1e3e1" }}>
        <span className="flex items-center" style={{ width: 44, gap: 2, justifyContent: "space-between" }}>
          G8 <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
        </span>
        <span style={{ width: 1, height: 12, background: "#e1e3e1" }} />
        <span style={{ fontStyle: "italic", color: G.grey, fontFamily: "Georgia, serif" }}>fx</span>
        <span style={{ fontFamily: "Arial, sans-serif" }}>=IFERROR(F8/E8,&quot;–&quot;)</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden" style={{ background: "#fff", fontFamily: "Arial, sans-serif", fontSize: 7.5 }}>
        <div className="flex" style={{ height: 14, background: "#f8f9fa", borderBottom: "1px solid #c0c0c0", color: "#5f6368", fontSize: 7 }}>
          <span style={{ width: 26, flexShrink: 0, borderRight: "1px solid #c0c0c0" }} />
          {COLS.map((w, i) => (
            <span key={i} className="flex items-center justify-center" style={{ width: w, flexShrink: 0, borderRight: "1px solid #e1e1e1", background: i === 6 ? "#d3e3fd" : undefined, color: i === 6 ? "#0b57d0" : undefined, fontWeight: i === 6 ? 600 : 400 }}>
              {LETTERS[i]}
            </span>
          ))}
        </div>
        {Array.from({ length: 18 }, (_, ri) => {
          const row = SHEET[ri] ?? [];
          return (
            <div key={ri} className="flex" style={{ height: ROW_H, borderBottom: "1px solid #e2e2e2" }}>
              <span className="flex items-center justify-center" style={{ width: 26, flexShrink: 0, background: ri === 7 ? "#d3e3fd" : "#f8f9fa", color: ri === 7 ? "#0b57d0" : "#5f6368", fontSize: 7, borderRight: "1px solid #c0c0c0", fontWeight: ri === 7 ? 600 : 400 }}>
                {ri + 1}
              </span>
              {COLS.map((w, ci) => {
                const c = row[ci];
                const sel = ri === 7 && ci === 6;
                return (
                  <span
                    key={ci}
                    className="flex items-center"
                    style={{
                      width: w,
                      flexShrink: 0,
                      padding: "0 3px",
                      borderRight: "1px solid #e2e2e2",
                      background: c?.bg,
                      fontWeight: c?.b ? 700 : 400,
                      fontStyle: c?.i ? "italic" : undefined,
                      color: c?.c ?? "#000",
                      justifyContent: c?.r ? "flex-end" : "flex-start",
                      whiteSpace: "nowrap",
                      overflow: ci === 0 && ri < 2 ? "visible" : "hidden",
                      borderTop: c?.top ? "1px solid #000" : undefined,
                      boxShadow: sel ? "inset 0 0 0 2px #1a73e8" : undefined,
                      position: "relative",
                      zIndex: ci === 0 && ri < 2 ? 1 : undefined,
                      fontSize: ri === 0 ? 9 : undefined,
                    }}
                  >
                    {c?.v}
                  </span>
                );
              })}
            </div>
          );
        })}
        <div className="absolute" style={{ left: 26 + COLS.slice(0, 8).reduce((a, b) => a + b, 0) + 10, top: 14 + ROW_H * 2 + 3 }}>
          <SheetsChart />
        </div>
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 24, background: "#f9fbfd", borderTop: "1px solid #e1e3e1", padding: "0 8px", gap: 4, fontSize: 7.5, color: "#444746" }}>
        <Plus style={IC} aria-hidden="true" />
        <Menu style={{ ...IC, marginRight: 6 }} aria-hidden="true" />
        {["Aug 2026", "Jul 2026", "Jun 2026", "May 2026", "HubSpot export"].map((t, i) => (
          <span key={t} className="flex items-center" style={{ height: 18, padding: "0 9px", gap: 3, borderRadius: i === 0 ? 4 : 0, background: i === 0 ? "#e1e9f7" : undefined, color: i === 0 ? "#0b57d0" : undefined, fontWeight: i === 0 ? 600 : 400 }}>
            {t}
            <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  </BrowserChrome>
);

export const localAgencyScreens: Screen[] = [MetaAd, AppraisalLanding, MobileSearchAd, AppraisalPipeline, CampaignReport];
