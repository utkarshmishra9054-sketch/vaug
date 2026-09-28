import { ChevronRight, Download } from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  CheckBox,
  FONT,
  LinkedInCampaignManager,
  LinkedInCard,
  LinkedInNav,
  LinkedInPageAdmin,
  LinkedInPost,
  LinkedInSelect,
  LinkedInStat,
  LinkedInTable,
  LiStatus,
  LiToggle,
  LogoAvatar,
  NotionCalendar,
  noisy,
  Photo,
  TimeChart,
  Two,
  type Col,
  type NotionEvent,
} from "./tools";

/* Parul University · LinkedIn and social content with paid social.
   TODO(content): all figures below are illustrative except the +573% LinkedIn engagement.
   Jul–Dec 2023: 2,318,447 impressions, 5.2% engagement rate, +41,000 followers
   (246,5xx → 287,614), 822,096 of the impressions sponsored. */

const BLUE = "#1f45c8";
const YELLOW = "#fcc31e";
const LOGO = { src: "/logos/parul-university.webp", img: { w: 445, h: 120 } };
const LI_GREY = "rgb(0 0 0 / 0.6)";

/** The crest from Parul's real logo, as a square LinkedIn page logo. */
function PageLogo({ size }: { size: number }) {
  return (
    <LogoAvatar size={size} shape="square">
      <Photo {...LOGO} crop={{ x: 0, y: -26, w: 172, h: 172 }} w={size - 2} h={size - 2} />
    </LogoAvatar>
  );
}

/* 01 · LinkedIn Page analytics: content ---------------------------- */

const ORGANIC = noisy({ n: 184, from: 3900, to: 11800, seed: 21, noise: 0.28, weekly: 0.35, weekStart: 5, ease: -0.2, bumps: { 67: 1.9, 68: 1.5, 118: 2.1, 119: 1.6, 157: 2.6, 158: 1.9, 159: 1.3 } });
const SPON_RAW = noisy({ n: 184, from: 7400, to: 9800, seed: 22, noise: 0.22, weekly: 0.3, weekStart: 5 });
/** Three paid flights (boosting the strongest posts); zero between them. */
const SPONSORED = SPON_RAW.map((v, i) => {
  const f = [
    [40, 70],
    [95, 125],
    [150, 184],
  ].find(([a, b]) => i >= a && i < b);
  if (!f) return 0;
  const ramp = Math.min(1, (i - f[0] + 1) / 4);
  return Math.round(v * ramp);
});

export const PageAnalytics: Screen = () => (
  <LinkedInPageAdmin page="Parul University" followers="287,614" logo={<PageLogo size={36} />} active="Content">
    <LinkedInCard
      title="Content"
      right={
        <>
          <LinkedInSelect>Jul 1, 2023 – Dec 31, 2023</LinkedInSelect>
          <span className="flex items-center" style={{ gap: 3, height: 18, padding: "0 9px", borderRadius: 9, border: "1px solid #0a66c2", color: "#0a66c2", fontSize: 7.5, fontWeight: 600 }}>
            <Download style={{ width: 8, height: 8 }} aria-hidden="true" />
            Export
          </span>
        </>
      }
      style={{ padding: "8px 12px" }}
    >
      <p style={{ fontSize: 7.5, color: LI_GREY }}>Compared with the previous 184 days</p>
    </LinkedInCard>
    <LinkedInCard title="Highlights">
      <div className="flex" style={{ gap: 10 }}>
        <LinkedInStat value="2,318,447" label="Impressions" change="402.6%" />
        <LinkedInStat value="96,184" label="Reactions" change="588.3%" />
        <LinkedInStat value="4,071" label="Comments" change="512.7%" />
        <LinkedInStat value="3,960" label="Reposts" change="541.2%" />
        <LinkedInStat value="5.2%" label="Engagement rate" change="1.9%" />
      </div>
    </LinkedInCard>
    <LinkedInCard
      title="Metrics"
      right={
        <>
          <LinkedInSelect>Impressions</LinkedInSelect>
          <LinkedInSelect>Organic and sponsored</LinkedInSelect>
        </>
      }
      style={{ flex: 1, minHeight: 0 }}
    >
      <div className="flex items-center" style={{ gap: 10, fontSize: 7, color: LI_GREY, marginBottom: 4 }}>
        <span className="flex items-center" style={{ gap: 3 }}>
          <span style={{ width: 8, height: 2, background: "#0a66c2" }} />
          Organic
        </span>
        <span className="flex items-center" style={{ gap: 3 }}>
          <span style={{ width: 8, height: 2, background: "#e7a33e" }} />
          Sponsored
        </span>
      </div>
      <TimeChart
        w={396}
        h={116}
        font={FONT.linkedin}
        labelColor={LI_GREY}
        size={7}
        series={[
          { values: ORGANIC, color: "#0a66c2", width: 1.2 },
          { values: SPONSORED, color: "#e7a33e", width: 1.2 },
        ]}
        xLabels={["Jul 1", "Aug 1", "Sep 1", "Oct 1", "Nov 1", "Dec 1", "Dec 31"]}
        left={{ max: 32000, ticks: 4, format: (n) => (n ? `${n / 1000}K` : "0") }}
      />
    </LinkedInCard>
  </LinkedInPageAdmin>
);

/* 02 · Placements document carousel in the feed -------------------- */

const SLIDES: { tag: string; head: string; bg?: string; fg?: string }[] = [
  { tag: "PLACEMENTS 2023", head: "Where our graduates are starting their careers" },
  { tag: "CONVOCATION 2023", head: "Congratulations, graduates", bg: "#10225e" },
  { tag: "RESEARCH", head: "Low-cost drug delivery, from our pharmacy labs", bg: "#f2f5fd", fg: "#10225e" },
  { tag: "INTERNATIONAL DAY", head: "One campus, many countries", bg: "#0f7a5c" },
  { tag: "CAMPUS LIFE", head: "A day on the Vadodara campus", bg: "#c2410c" },
  { tag: "ALUMNI STORIES", head: "From B.Pharm to quality lead", bg: "#10225e" },
  { tag: "POLL", head: "Which skill should every engineer learn?", bg: "#f2f5fd", fg: "#10225e" },
];

function Slide({ w, h, tag = SLIDES[0].tag, head = SLIDES[0].head, bg = BLUE, fg = "#fff" }: { w: number; h: number; tag?: string; head?: string; bg?: string; fg?: string }) {
  return (
    <div className="relative" style={{ width: w, height: h, background: bg, color: fg, fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      <div className="absolute" style={{ right: -34, top: -44, width: 130, height: 130, borderRadius: "50%", border: `20px solid ${YELLOW}` }} />
      <div style={{ position: "absolute", left: 16, top: 12, background: "#fff", padding: "3px 5px" }}>
        <Photo {...LOGO} w={62} h={17} />
      </div>
      <div style={{ position: "absolute", left: 16, top: 46, right: 96 }}>
        <p style={{ display: "inline-block", background: YELLOW, color: "#10225e", fontSize: 7.5, fontWeight: 700, padding: "2px 6px", letterSpacing: 0.4 }}>{tag}</p>
        <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.08, marginTop: 6, letterSpacing: -0.3 }}>{head}</p>
      </div>
    </div>
  );
}

export const CarouselPost: Screen = () => (
  <BrowserChrome url="linkedin.com/company/paruluniversity/posts/?feedView=all">
    <div className="flex h-full flex-col" style={{ background: "#f4f2ee", fontFamily: FONT.linkedin, color: "rgb(0 0 0 / 0.9)" }}>
      <LinkedInNav />
      <div className="flex min-h-0 flex-1" style={{ padding: "10px 60px 0", gap: 12 }}>
        <aside className="shrink-0" style={{ width: 150 }}>
          <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", overflow: "hidden" }}>
            <div style={{ height: 34, background: BLUE }} />
            <div style={{ padding: "0 10px 10px", marginTop: -16 }}>
              <PageLogo size={34} />
              <p style={{ fontSize: 9.5, fontWeight: 600, marginTop: 5 }}>Parul University</p>
              <p style={{ fontSize: 7.5, color: LI_GREY, lineHeight: 1.35 }}>Higher Education · Vadodara, Gujarat · 287,614 followers</p>
              <span className="flex items-center justify-center" style={{ marginTop: 7, height: 18, borderRadius: 9, border: "1px solid rgb(0 0 0 / 0.6)", fontSize: 8, fontWeight: 600, color: LI_GREY }}>
                Following
              </span>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", marginTop: 8, padding: "6px 0", fontSize: 8, color: LI_GREY }}>
            {["Home", "About", "Posts", "Jobs", "Life", "People", "Alumni"].map((t) => (
              <div key={t} style={{ padding: "3px 10px", fontWeight: t === "Posts" ? 600 : 400, color: t === "Posts" ? "#01754f" : undefined, boxShadow: t === "Posts" ? "inset 2px 0 0 #01754f" : undefined }}>
                {t}
              </div>
            ))}
          </div>
        </aside>
        <div style={{ width: 318 }}>
          <LinkedInPost
            w={318}
            name="Parul University"
            followers="287,614"
            logo={<PageLogo size={30} />}
            age="3w"
            text={
              <>
                Placement season 2023 in 8 slides: the recruiters, the roles and the students behind this year&rsquo;s offers.{" "}
                <span style={{ color: "#0a66c2", fontWeight: 600 }}>#ParulUniversity #Placements2023 #CampusHiring</span>
              </>
            }
            media={
              <div className="relative">
                <div className="flex items-center" style={{ height: 18, padding: "0 8px", background: "#1d2226", color: "#fff", fontSize: 7.5, gap: 4 }}>
                  <span className="truncate">Placements 2023 at Parul University</span>
                  <span style={{ opacity: 0.7 }}>· 8 pages</span>
                </div>
                <Slide w={318} h={160} />
                <span className="absolute flex items-center justify-center" style={{ right: 8, top: 86, width: 22, height: 22, borderRadius: "50%", background: "rgb(0 0 0 / 0.6)", color: "#fff" }}>
                  <ChevronRight style={{ width: 12, height: 12 }} aria-hidden="true" />
                </span>
                <span className="absolute" style={{ left: 8, bottom: 8, fontSize: 7, padding: "1px 5px", borderRadius: 3, background: "rgb(0 0 0 / 0.6)", color: "#fff" }}>
                  1 / 8
                </span>
              </div>
            }
            mediaH={178}
            reactions="2,413"
            comments="186"
            reposts="97"
          />
        </div>
      </div>
    </div>
  </BrowserChrome>
);

/* 03 · Content calendar in Notion ---------------------------------- */

const P = {
  place: (title: string): NotionEvent => ({ title, tag: "Placements", color: "blue" }),
  research: (title: string): NotionEvent => ({ title, tag: "Research", color: "purple" }),
  faculty: (title: string): NotionEvent => ({ title, tag: "Faculty", color: "green" }),
  student: (title: string): NotionEvent => ({ title, tag: "Students", color: "orange" }),
  campus: (title: string): NotionEvent => ({ title, tag: "Campus life", color: "pink" }),
};

const DEC: Record<number, NotionEvent[]> = {
  1: [P.research("Pharmacy research grant")],
  4: [P.faculty("Faculty voice: AI in teaching")],
  5: [P.place("Placements 2023 carousel")],
  6: [P.campus("Hostel life reel")],
  8: [P.student("Hackathon winners")],
  11: [P.faculty("Dean's note: industry labs")],
  12: [P.place("Recruiter spotlight #3")],
  13: [P.research("Solar lab explainer")],
  14: [P.campus("Poll: best canteen")],
  15: [P.student("National games medals")],
  18: [P.place("Internship stories video")],
  19: [P.faculty("Faculty voice: law clinic")],
  20: [P.research("Patent filed: bio-fertiliser")],
  22: [P.campus("Winter fest teaser")],
  26: [P.place("Year in placements")],
  27: [P.student("Alumni story: startup")],
  28: [P.campus("Winter fest recap")],
  29: [P.research("Research round-up 2023")],
};

export const ContentCalendar: Screen = () => (
  <NotionCalendar
    url="notion.so/vaug/Parul-LinkedIn-content-calendar-8f2c41d9b07e4a3c"
    workspace="VAUG"
    pages={[
      { label: "Clients", depth: 0 },
      { label: "Parul University", depth: 1 },
      { label: "LinkedIn content calendar", depth: 2 },
      { label: "Story round-ups", depth: 2 },
      { label: "Monthly reports", depth: 2 },
      { label: "Brand assets", depth: 2 },
    ]}
    activePage="LinkedIn content calendar"
    breadcrumb={["Parul University", "LinkedIn content calendar"]}
    title="LinkedIn content calendar"
    views={["Calendar", "By pillar", "Approvals", "All posts"]}
    month="December 2023"
    start={26}
    prevDays={30}
    days={31}
    today={12}
    events={DEC}
  />
);

/* 04 · Sponsored content in LinkedIn Campaign Manager -------------- */

const CCOLS: Col[] = [
  { label: <CheckBox size={8} border="#8c8c8c" />, w: 20 },
  { label: "", w: 32 },
  { label: "Campaign name", w: 112 },
  { label: "Status", w: 66 },
  { label: "Spent", w: 70, align: "right" },
  { label: "Key results", w: 64, align: "right" },
  { label: "Cost per result", w: 48, align: "right" },
  { label: "Impressions", w: 58, align: "right" },
  { label: "Clicks", w: 44, align: "right" },
  { label: "Average CTR", w: 42, align: "right" },
];

const C_ROWS: [string, string, "Active" | "Paused" | "Completed", string, string, string, string, string, string, string][] = [
  ["PU | Placements carousel | Parents 40-55 GJ-MH", "Engagement · Document ad", "Active", "₹92,146.40", "19,406", "Engagements", "₹4.75", "302,904", "4,817", "1.59%"],
  ["PU | Faculty stories | Students 17-21 India", "Engagement · Single image", "Active", "₹61,204.35", "12,118", "Engagements", "₹5.05", "221,280", "2,804", "1.27%"],
  ["PU | Research highlights | Recruiters & HR", "Website visits · Carousel", "Active", "₹49,440.10", "702", "Landing page clicks", "₹70.43", "104,316", "790", "0.76%"],
  ["PU | Campus life video | Students 17-21", "Video views · Video", "Paused", "₹21,871.90", "30,208", "Video views", "₹0.72", "94,002", "506", "0.54%"],
  ["PU | International admissions | Africa, SEA", "Lead generation · Single image", "Completed", "₹18,905.00", "106", "Leads", "₹178.35", "48,114", "604", "1.26%"],
  ["PU | Alumni stories | Page visitor retargeting", "Engagement · Single image", "Active", "₹13,118.62", "3,404", "Engagements", "₹3.85", "51,480", "894", "1.74%"],
];

export const CampaignManager: Screen = () => (
  <LinkedInCampaignManager
    account="Parul University"
    accountId="508912347"
    dateRange="Jul 1, 2023 – Dec 31, 2023"
    counts={[3, 6, 21]}
    cols={CCOLS}
    rowH={31}
    rows={C_ROWS.map(([name, type, status, spent, res, resType, cpr, impr, clicks, ctr]) => [
      <CheckBox key="c" size={8} border="#8c8c8c" />,
      <LiToggle key="t" on={status === "Active"} />,
      <Two key="n" a={<span style={{ color: "#0a66c2", fontWeight: 600 }}>{name}</span>} b={type} bColor={LI_GREY} />,
      <LiStatus key="s" s={status} />,
      spent,
      <Two key="r" a={res} b={resType} bColor={LI_GREY} />,
      cpr,
      impr,
      clicks,
      ctr,
    ])}
    total={["", "", "Total (6 campaigns)", "", "₹256,686.37", "", "", "822,096", "10,415", "1.27%"]}
  />
);

/* 05 · Top posts in LinkedIn content analytics ---------------------- */

/** A post thumbnail: the post's own creative, scaled down. */
function Thumb({ i }: { i: number }) {
  const v = SLIDES[i % SLIDES.length];
  return (
    <span className="relative block shrink-0 overflow-hidden" style={{ width: 24, height: 24, borderRadius: 2 }}>
      <span className="absolute" style={{ left: -12, top: 0, transform: "scale(0.15)", transformOrigin: "top left" }}>
        <Slide w={318} h={160} {...v} />
      </span>
    </span>
  );
}

const POSTS: [string, string, string, string, string, string, string, string, string, string][] = [
  ["Placement season 2023 in 8 slides: the recruiters, the roles…", "Dec 5", "Organic", "184,306", "11,204", "6.08%", "2,413", "186", "97", "7.54%"],
  ["Convocation 2023 in pictures. Congratulations to every gradu…", "Oct 28", "Organic", "142,870", "6,907", "4.83%", "3,120", "211", "84", "7.22%"],
  ["New research from our Faculty of Pharmacy on low-cost drug…", "Nov 21", "Organic", "96,512", "4,318", "4.47%", "1,806", "94", "61", "6.51%"],
  ["International Day 2023: students from across the world…", "Oct 10", "Organic", "38,115", "812", "2.13%", "1,109", "27", "15", "5.15%"],
  ["Hostel life, in 30 seconds. A day on the Vadodara campus…", "Aug 30", "Organic", "54,960", "1,286", "2.34%", "1,390", "44", "31", "5.01%"],
  ["Meet the alumni: from our B.Pharm class to a quality lead at…", "Nov 8", "Sponsored", "88,204", "2,940", "3.33%", "1,062", "58", "22", "4.63%"],
  ["Poll: which skill should every engineering student learn befo…", "Sep 19", "Organic", "61,033", "1,018", "1.67%", "802", "406", "12", "3.67%"],
];

const PCOLS: Col[] = [
  { label: "Post", w: 140 },
  { label: "Impressions", w: 62, align: "right" },
  { label: "Clicks", w: 42, align: "right" },
  { label: "Reactions", w: 50, align: "right" },
  { label: "Comments", w: 52, align: "right" },
  { label: "Engagement rate", w: 64, align: "right" },
  { label: "Reposts", w: 40, align: "right" },
];

export const MonthlyReport: Screen = () => (
  <LinkedInPageAdmin page="Parul University" followers="287,614" logo={<PageLogo size={36} />} active="Content">
    <LinkedInCard
      title="All posts"
      right={
        <>
          <LinkedInSelect>Jul 1, 2023 – Dec 31, 2023</LinkedInSelect>
          <LinkedInSelect>Sort by: Engagement rate</LinkedInSelect>
        </>
      }
      style={{ padding: "9px 12px 0", flex: 1, minHeight: 0, overflow: "hidden" }}
    >
      <div style={{ paddingBottom: 6, fontSize: 7.5, color: LI_GREY, marginTop: -2 }}>Showing 7 of 96 posts</div>
      <div style={{ margin: "0 -12px" }}>
      <LinkedInTable
        cols={PCOLS}
        rowH={35}
        rows={POSTS.map(([title, date, type, impr, clicks, , reactions, comments, reposts, er], i) => [
          <span key="t" className="flex items-center" style={{ gap: 6, minWidth: 0 }}>
            <Thumb i={i} />
            <Two a={<span style={{ fontWeight: 600 }}>{title}</span>} b={`${date}, 2023 · ${type}`} bColor={LI_GREY} />
          </span>,
          impr,
          clicks,
          reactions,
          comments,
          er,
          reposts,
        ])}
      />
      </div>
    </LinkedInCard>
  </LinkedInPageAdmin>
);

export const parulScreens: Screen[] = [PageAnalytics, CarouselPost, ContentCalendar, CampaignManager, MonthlyReport];
