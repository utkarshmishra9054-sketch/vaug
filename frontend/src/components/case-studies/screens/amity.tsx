import { Check, ChevronDown, House, Menu, MessageCircle, Phone, Plus, Search, Send, SquarePlay, UsersRound } from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  CheckBox,
  FacebookPost,
  Field,
  FONT,
  G,
  GAdsChartCard,
  GAdsDot,
  GAdsTable,
  GLink,
  GoogleAdsShell,
  GoogleSerp,
  InstagramPost,
  InstagramStory,
  LogoAvatar,
  MetaAdsManager,
  MetaDelivery,
  MetaLink,
  MetaToggle,
  noisy,
  PhoneBackdrop,
  PhoneFrame,
  Photo,
  Place,
  SerpAd,
  SerpLabel,
  SerpResult,
  Two,
  type Col,
} from "./tools";

/* Amity University · admissions campaigns (Google Ads + Meta Ads + landing pages).
   TODO(content): all figures below are illustrative except the 10,000+ enquiries total.
   Google Ads 6,037 conversions at ₹291.47 + Meta 4,418 leads at ₹323.73
   = 10,455 enquiries at ~₹305 each; search CTR 6.4%; landing-page conversion 9.8%. */

const NAVY = "#1d3a78";
const GOLD = "#fdb913";

const LOGO = { src: "/logos/amity-university.webp", img: { w: 432, h: 120 } };
const SITE = { src: "/sites/amity-university.webp", img: { w: 1440, h: 900 } };

/** The crest cut from Amity's real logo. */
function Crest({ size }: { size: number }) {
  return <Photo {...LOGO} crop={{ x: 0, y: 2, w: 100, h: 116 }} w={size * 0.8} h={size * 0.92} />;
}
function Avatar({ size }: { size: number }) {
  return (
    <LogoAvatar size={size}>
      <Crest size={size * 0.8} />
    </LogoAvatar>
  );
}

/* 01 · Google Ads campaigns ---------------------------------------- */

const GCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 98 },
  { label: "Budget", w: 60 },
  { label: "Status", w: 54 },
  { label: "Campaign type", w: 52 },
  { label: "Impr.", w: 46, align: "right" },
  { label: "Interactions", w: 48, align: "right" },
  { label: "Interaction rate", w: 46, align: "right" },
  { label: "Cost", w: 64, align: "right" },
  { label: "Conversions", w: 52, align: "right" },
  { label: "Cost / conv.", w: 46, align: "right" },
  { label: "Avg. cost", w: 40, align: "right" },
];

const wrap = (t: string) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1 }}>{t}</span>;

const G_ROWS: [string, string, string, string, "enabled" | "paused", string, string, string, string, string, string, string][] = [
  ["AU_Search_BTech_NCR-UP", "₹6,000.00/day", "Eligible", "Search", "enabled", "295,400", "17,391", "5.89%", "₹492,598.08", "1,784.00", "₹276.12", "₹28.32"],
  ["AU_Search_MBA-BBA_North", "₹4,400.00/day", "Limited by budget", "Search", "enabled", "219,800", "12,607", "5.74%", "₹393,628.92", "1,236.00", "₹318.47", "₹31.22"],
  ["AU_PMax_Admissions_Remarketing", "₹3,500.00/day", "Eligible", "Performance Max", "enabled", "241,930", "6,241", "2.58%", "₹279,581.07", "597.00", "₹468.31", "₹44.80"],
  ["AU_Brand_Amity_Exact", "₹2,500.00/day", "Eligible", "Search", "enabled", "128,905", "13,962", "10.83%", "₹187,630.48", "1,318.00", "₹142.36", "₹13.44"],
  ["AU_Search_Design-Media", "₹2,500.00/day", "Eligible", "Search", "enabled", "97,612", "5,107", "5.23%", "₹174,113.28", "432.00", "₹403.04", "₹34.09"],
  ["AU_Search_Law_BALLB", "₹2,000.00/day", "Eligible", "Search", "enabled", "91,244", "5,318", "5.83%", "₹160,974.55", "541.00", "₹297.55", "₹30.27"],
  ["AU_Search_BSc_Sciences", "₹1,800.00/day", "Paused", "Search", "paused", "41,877", "1,752", "4.18%", "₹71,079.00", "129.00", "₹551.00", "₹40.57"],
];

const G_CONV = noisy({ n: 90, from: 44, to: 88, seed: 11, noise: 0.2, weekly: 0.22, weekStart: 2, ease: -0.3, bumps: { 16: 1.3, 17: 1.22, 58: 0.7, 71: 1.35, 72: 1.28, 80: 1.18 } });
const G_COST = noisy({ n: 90, from: 15800, to: 22600, seed: 12, noise: 0.08, weekly: 0.12, weekStart: 2, bumps: { 58: 0.62, 59: 0.8 } });

export const AdsDashboard: Screen = () => (
  <GoogleAdsShell account="Amity University – Admissions" customerId="482-913-5570" title="Campaigns" dateRange="1 Jan – 31 Mar 2025" nav={null}>
    <GAdsChartCard
      w={548}
      h={44}
      metrics={[
        { label: "Conversions", value: "6.04K", on: true },
        { label: "Cost", value: "₹1.76M", on: true },
        { label: "Clicks", value: "62.4K" },
        { label: "Cost / conv.", value: "₹291.47" },
      ]}
      series={[G_CONV, G_COST]}
      xLabels={["1 Jan 2025", "31 Mar 2025"]}
      left={{ max: 150, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 30000, ticks: 2, format: (n) => (n ? `₹${n / 1000}K` : "₹0") }}
    />
    <GAdsTable
      cols={GCOLS}
      rowH={19}
      rows={G_ROWS.map(([name, budget, status, type, state, ...m]) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={state} />,
        <GLink key="n">{name}</GLink>,
        budget,
        status === "Limited by budget" ? (
          <span key="s" style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1, color: G.text }}>
            Limited by budget
          </span>
        ) : (
          <span key="s" style={{ color: status === "Paused" ? G.grey : G.text }}>
            {status}
          </span>
        ),
        type === "Performance Max" ? wrap(type) : type,
        ...m,
      ])}
      total={["", "", "Total: all campaigns", "", "", "", "1,116,768", "62,378", "5.59%", "₹1,759,605.38", "6,037.00", "₹291.47", "₹28.21"]}
    />
  </GoogleAdsShell>
);

/* 02 · Meta ads: Facebook feed, Instagram feed and Story ------------ */

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
          <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#c9a27e" }} />
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

/** Square creative: the real campus studio photo with the course band. */
function FeedCreative({ w }: { w: number }) {
  return (
    <div className="relative" style={{ width: w, height: w, fontFamily: "Arial, sans-serif" }}>
      <Photo {...SITE} crop={{ x: 640, y: 150, w: 700, h: 700 }} w={w} h={w} />
      <span className="absolute" style={{ left: 7, top: 7, background: "#fff", padding: "3px 4px", borderRadius: 2 }}>
        <Photo {...LOGO} w={52} h={14.4} />
      </span>
      <div className="absolute inset-x-0 bottom-0" style={{ background: NAVY, padding: "6px 8px 7px", color: "#fff" }}>
        <p style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: 0.6, color: GOLD }}>ADMISSIONS OPEN 2025</p>
        <p style={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1.15, marginTop: 1 }}>B.Tech | MBA | BJMC | BA LLB</p>
        <p style={{ fontSize: 6.5, marginTop: 2, opacity: 0.85 }}>Amity University, Noida campus</p>
      </div>
    </div>
  );
}

/** Facebook creative: the studio floor from the same shoot, with the accreditation line. */
function AccreditationCreative({ w, h }: { w: number; h: number }) {
  return (
    <div className="relative" style={{ width: w, height: h, fontFamily: "Arial, sans-serif" }}>
      <Photo {...SITE} crop={{ x: 420, y: 440, w: 460, h: 400 }} w={w} h={h} />
      <div className="absolute inset-x-0 bottom-0" style={{ background: NAVY, padding: "5px 8px 6px", color: "#fff" }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, lineHeight: 1.15 }}>Engineering, Management, Law, Media</p>
        <p style={{ fontSize: 6.5, marginTop: 2, color: GOLD, fontWeight: 700 }}>ACCREDITED BY WASC (USA) AND QAA (UK)</p>
      </div>
    </div>
  );
}

/** Story creative: vertical crop of the studio photo with the deadline. */
function StoryCreative({ w, h }: { w: number; h: number }) {
  return (
    <div className="relative" style={{ width: w, height: h, fontFamily: "Arial, sans-serif", color: "#fff" }}>
      <Photo {...SITE} crop={{ x: 830, y: 120, w: 440, h: 780 }} w={w} h={h} />
      <div className="absolute" style={{ left: 10, right: 10, top: 44, background: NAVY, padding: "7px 9px" }}>
        <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.6, color: GOLD }}>AMITY UNIVERSITY NOIDA</p>
        <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.1, marginTop: 2 }}>Media &amp; Journalism admissions 2025</p>
        <p style={{ fontSize: 7, marginTop: 3, opacity: 0.85 }}>Apply by 31 March</p>
      </div>
    </div>
  );
}

export const MetaAds: Screen = () => (
  <PhoneBackdrop>
    <Place x={22} y={10}>
      <PhoneFrame>
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
          page="Amity University"
          avatar={<Avatar size={20} />}
          text={<>Admissions 2025 are open across engineering, management, law and media. Get fees and eligibility for your course.</>}
          image={<AccreditationCreative w={170} h={150} />}
          imageH={150}
          domain="amity.edu"
          headline="Admissions 2025 open"
          cta="Sign up"
          reactions="1.4K"
          comments="86"
          shares="31"
        />
        <FeedTabBar />
      </PhoneFrame>
    </Place>
    <Place x={230} y={10}>
      <PhoneFrame>
        <InstagramPost
          w={170}
          handle="amity.university"
          avatar={<Avatar size={20} />}
          image={<FeedCreative w={170} />}
          imageH={170}
          cta="Sign up"
          likes="2,317"
          caption="B.Tech, MBA, BJMC and BA LLB admissions for 2025 are open. Tap Sign up for fees, eligibility and a call from our team."
        />
        <FeedTabBar ig />
      </PhoneFrame>
    </Place>
    <Place x={438} y={10}>
      <PhoneFrame dark>
        <InstagramStory handle="amity.university" avatar={<Avatar size={16} />} image={<StoryCreative w={170} h={330} />} cta="Sign up" progress={0.35} />
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

/* 03 · B.Tech landing page with enquiry form ----------------------- */

export const LandingPage: Screen = () => (
  <BrowserChrome url="admissions.amity.edu/btech-2025/?utm_source=google&utm_medium=cpc">
    <div className="h-full" style={{ fontFamily: FONT.web, color: "#1f2937", background: "#fff" }}>
      <div className="flex items-center" style={{ height: 16, background: NAVY, color: "#fff", fontSize: 6.5, padding: "0 20px", gap: 12 }}>
        <span className="flex items-center" style={{ gap: 3 }}>
          <Phone style={{ width: 7, height: 7 }} aria-hidden="true" />
          Admissions helpline (Mon–Sat, 9 am–6 pm)
        </span>
        <span className="ml-auto" style={{ opacity: 0.85 }}>
          Scholarships · Hostel · Education loan
        </span>
      </div>
      <header className="flex items-center" style={{ height: 38, padding: "0 20px", borderBottom: "1px solid #e5e7eb", gap: 16 }}>
        <Photo {...LOGO} w={94} h={26} />
        <nav className="ml-auto flex items-center" style={{ gap: 14, fontSize: 8, fontWeight: 600, color: "#374151" }}>
          {["Programmes", "Fees & Scholarships", "Placements", "Campus Life", "FAQs"].map((t) => (
            <span key={t} className="flex items-center" style={{ gap: 2 }}>
              {t}
              {t === "Programmes" && <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />}
            </span>
          ))}
        </nav>
        <span style={{ fontSize: 8, fontWeight: 700, padding: "6px 11px", background: GOLD, color: "#111827", borderRadius: 2 }}>APPLY NOW</span>
      </header>
      <section className="relative flex" style={{ height: 246, padding: "14px 20px 0", gap: 20 }}>
        <div className="absolute inset-0">
          <Photo {...SITE} crop={{ x: 420, y: 190, w: 960, h: 560 }} w={640} h={246} />
          <div className="absolute inset-0" style={{ background: "rgb(15 30 66 / 0.78)" }} />
        </div>
        <div className="relative flex-1" style={{ color: "#fff", paddingTop: 6 }}>
          <p style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 0.8, color: GOLD }}>ADMISSIONS OPEN 2025–26</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.12, marginTop: 5, letterSpacing: -0.3 }}>
            B.Tech at Amity University,
            <br />
            Noida
          </h1>
          <p style={{ fontSize: 8.5, lineHeight: 1.5, marginTop: 7, opacity: 0.88, maxWidth: 300 }}>Computer Science &amp; Engineering, AI &amp; Machine Learning, Electronics &amp; Communication, Mechanical, Civil and Biotechnology.</p>
          <ul style={{ marginTop: 9, fontSize: 8, lineHeight: 1.9 }}>
            {["Accredited by WASC (USA) and QAA (UK)", "Merit scholarships on Class 12 and JEE scores", "Industry projects and internships from year two"].map((t) => (
              <li key={t} className="flex items-center" style={{ gap: 5 }}>
                <Check style={{ width: 9, height: 9, color: GOLD }} strokeWidth={3} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <form className="relative shrink-0" style={{ width: 200, background: "#fff", padding: "9px 12px 10px", borderTop: `3px solid ${GOLD}`, alignSelf: "flex-start", boxShadow: "0 2px 10px rgb(0 0 0 / 0.14)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>Enquire Now</p>
          <p style={{ fontSize: 7, color: "#6b7280", marginTop: 1 }}>Get fees, eligibility and scholarship details.</p>
          <div className="flex flex-col" style={{ gap: 4, marginTop: 6 }}>
            <Field label="Full name*" placeholder="Enter your name" />
            <div className="flex" style={{ gap: 5 }}>
              <Field label="Mobile*" placeholder="+91" w={80} />
              <Field label="Email*" placeholder="Email address" w="100%" />
            </div>
            <Field label="Programme*" value="B.Tech – CSE" select />
            <Field label="State*" placeholder="Select state" select />
          </div>
          <p className="flex" style={{ gap: 4, fontSize: 6, color: "#6b7280", marginTop: 6, lineHeight: 1.35 }}>
            <CheckBox on size={7} color={NAVY} />I authorise Amity University to contact me by call, SMS, email or WhatsApp.
          </p>
          <span className="flex items-center justify-center" style={{ marginTop: 6, height: 20, background: GOLD, fontSize: 8.5, fontWeight: 700, color: "#111827" }}>
            SUBMIT
          </span>
        </form>
      </section>
      <div className="flex" style={{ height: 26, borderBottom: "1px solid #e5e7eb", padding: "0 20px", gap: 18, fontSize: 8, fontWeight: 600, color: "#4b5563" }}>
        {["Overview", "Specialisations", "Eligibility", "Fee Structure", "Placements", "FAQs"].map((t, i) => (
          <span key={t} className="flex items-center" style={{ color: i === 0 ? NAVY : undefined, borderBottom: i === 0 ? `2px solid ${NAVY}` : "2px solid transparent" }}>
            {t}
          </span>
        ))}
      </div>
      <section style={{ padding: "10px 20px" }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>Why B.Tech at Amity?</h2>
        <p style={{ fontSize: 8, lineHeight: 1.55, color: "#4b5563", marginTop: 4, maxWidth: 520 }}>
          A four-year programme taught in labs and project studios on the Noida campus, with electives in cloud computing, cyber security and data science, and a dedicated placement cell working with recruiters across India.
        </p>
      </section>
    </div>
  </BrowserChrome>
);

/* 04 · Meta Ads Manager: lead campaigns ---------------------------- */

const MCOLS: Col[] = [
  { label: <CheckBox size={8} border="#8a8d91" />, w: 20 },
  { label: "Off / On", w: 38 },
  { label: "Campaign", w: 130 },
  { label: "Delivery ↑", w: 78 },
  { label: "Results", w: 78, align: "right" },
  { label: "Cost per result", w: 84, align: "right" },
  { label: "Amount spent", w: 64, align: "right" },
  { label: "Reach", w: 56, align: "right" },
  { label: "Impressions", w: 60, align: "right" },
  { label: "Budget", w: 64, align: "right" },
  { label: "Ends", w: 50 },
];

const lead = "On-Facebook leads";
const M_ROWS: [string, "Active" | "Learning limited" | "Off", string, string, string, string, string, string, string, string][] = [
  ["AU | Leads | Students 17-21 | NCR-UP | IF", "Active", "1,612", lead, "₹286.17", "₹461,306.04", "612,408", "2,184,221", "₹5,000.00", "Ongoing"],
  ["AU | Leads | Parents 40-55 | Tier 1 cities", "Active", "1,038", lead, "₹338.62", "₹351,487.56", "402,115", "1,302,586", "₹3,500.00", "Ongoing"],
  ["AU | Leads | LAL 1% Past Applicants", "Active", "894", lead, "₹301.95", "₹269,943.30", "288,904", "1,071,774", "₹3,000.00", "Ongoing"],
  ["AU | Leads | Adv+ Audience | Stories-Reels", "Learning limited", "611", lead, "₹391.02", "₹238,913.22", "356,210", "902,318", "₹2,500.00", "Ongoing"],
  ["AU | Conv | Course LPs | Retargeting 30D", "Active", "263", "Website leads", "₹412.80", "₹108,566.40", "97,316", "486,332", "₹1,200.00", "Ongoing"],
  ["AU | Leads | Hindi creatives test", "Off", "—", "", "—", "₹0.00", "—", "—", "₹1,000.00", "14 Jan 2025"],
];

export const LeadDashboard: Screen = () => (
  <MetaAdsManager
    account="Amity University Admissions"
    accountId="1029384756"
    dateRange="1 Jan 2025 – 31 Mar 2025"
    columnsLabel="Columns: Custom"
    rowH={30}
    cols={MCOLS}
    rows={M_ROWS.map(([name, delivery, res, resType, cpr, spent, reach, impr, budget, ends]) => [
      <CheckBox key="c" size={8} border="#8a8d91" />,
      <MetaToggle key="t" on={delivery !== "Off"} />,
      <MetaLink key="n">{name}</MetaLink>,
      <MetaDelivery key="d" status={delivery} />,
      resType ? <Two key="r" a={res} b={resType} /> : res,
      resType ? <Two key="p" a={cpr} b={resType === lead ? "Per On-Facebook lead" : "Per website lead"} /> : cpr,
      spent,
      reach,
      impr,
      <Two key="b" a={budget} b="Daily" />,
      ends,
    ])}
    total={[
      "",
      "",
      <Two key="t" a={<b style={{ fontWeight: 700 }}>Results from 6 campaigns</b>} b="Excludes deleted items" />,
      "",
      <Two key="r" a="—" b="Multiple conversions" />,
      <Two key="p" a="—" b="Multiple conversions" />,
      <Two key="s" a="₹1,430,216.52" b="Total spent" />,
      <Two key="rc" a="1,524,907" b="Accounts Centre accounts" />,
      <Two key="i" a="5,947,231" b="Total" />,
      "",
      "",
    ]}
  />
);

/* 05 · Google search with Amity's sponsored result ----------------- */

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 7, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

export const SearchAd: Screen = () => (
  <GoogleSerp query="btech admission 2025 noida">
    <SerpLabel />
    <SerpAd
      ad={{
        site: "Amity University",
        url: "https://www.amity.edu › admissions",
        favicon: <Crest size={15} />,
        title: "B.Tech Admissions 2025 Open | Amity University Noida",
        desc: "Apply for B.Tech in CSE, AI & ML, ECE and more. Merit scholarships, industry projects and campus placements. Enquire now for fees and eligibility.",
        sitelinks: ["B.Tech CSE", "Fee Structure", "Scholarships", "Placements"],
      }}
    />
    <SerpResult
      r={{
        site: "Shiksha",
        url: "https://www.shiksha.com › ... › Noida",
        favicon: <Fav bg="#008489" t="S" />,
        title: "B.Tech Colleges in Noida 2025: Fees, Admission, Cutoff",
        date: "12 Feb 2025",
        desc: "Find the top B.Tech colleges in Noida with fees, admission process, JEE Main cutoff, placements and reviews...",
      }}
    />
    <SerpResult
      r={{
        site: "Amity University",
        url: "https://www.amity.edu › programme-list",
        favicon: <Crest size={15} />,
        title: "Bachelor of Technology (B.Tech) - Amity University",
        desc: "Programme structure, eligibility and specialisations for B.Tech at Amity School of Engineering & Technology, Noida.",
      }}
    />
    <SerpResult
      r={{
        site: "Collegedunia",
        url: "https://collegedunia.com › btech › noida-colleges",
        favicon: <Fav bg="#1b5fb4" t="C" />,
        title: "Top B.Tech Colleges in Noida 2025 - Rankings, Fees",
        desc: "List of B.Tech colleges in Noida with fees, rankings, entrance exams accepted and latest admission updates.",
      }}
    />
  </GoogleSerp>
);

export const amityScreens: Screen[] = [AdsDashboard, MetaAds, LandingPage, LeadDashboard, SearchAd];
