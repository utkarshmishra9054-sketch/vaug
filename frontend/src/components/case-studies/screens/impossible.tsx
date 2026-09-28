import type { ReactNode } from "react";
import {
  Bell,
  Camera,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  Download,
  Ellipsis,
  EllipsisVertical,
  Heart,
  House,
  LayoutGrid,
  ListFilter,
  Megaphone,
  Menu,
  MessageCircle,
  Music2,
  Package,
  RotateCw,
  Search,
  Send,
  Settings,
  Share2,
  SquarePlay,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import type { Screen } from "./kit";
import {
  BrowserChrome,
  CheckBox,
  FONT,
  G,
  GoogleSerp,
  Initials,
  InstagramPost,
  InstagramStory,
  LogoAvatar,
  MetaAdsManager as AdsManager,
  MetaDelivery,
  MetaLink,
  MetaToggle,
  noisy,
  num,
  PhoneBackdrop,
  PhoneFrame,
  Photo,
  Place,
  SerpResult,
  Stars,
  TimeChart,
  Two,
  type Col,
} from "./tools";

/* Impossible · Meta + Google Shopping performance marketing (India).
   TODO(content): every number drawn here is illustrative except the +3,134% ROAS uplift. Confirm with the client.
   Last 30 days (18 Aug – 16 Sep 2025) vs. the pre-engagement baseline (1 – 30 Mar 2025):
   spend ₹235,001 (was ₹140,250), revenue ₹2,890,513 (was ₹53,341), ROAS 12.30 (was 0.38, +3,134%),
   1,286 purchases (was 31), cost per purchase ₹182.74 (was ₹4,524, -96%).
   Meta: ₹137,988.53 spend, ₹1,560,877 value, 744 purchases. Google Shopping: 42.0% of paid revenue. */

const LOGO = { src: "/logos/impossible.webp", img: { w: 480, h: 109 } };
const SITE = { src: "/sites/impossible.webp", img: { w: 1440, h: 900 } };

/** The real wordmark (black on transparent); `white` inverts it for dark backgrounds. */
function Wordmark({ w, white = false }: { w: number; white?: boolean }) {
  return <Photo {...LOGO} w={w} h={w * (109 / 480)} style={white ? { filter: "invert(1)" } : undefined} />;
}
function Avatar({ size }: { size: number }) {
  return (
    <LogoAvatar size={size} bg="#000" border={false}>
      <Wordmark w={size * 0.84} white />
    </LogoAvatar>
  );
}

/* 01 · Meta Ads Manager: campaigns, last 30 days -------------------- */

const MCOLS: Col[] = [
  { label: <CheckBox size={8} border="#8a8d91" />, w: 20 },
  { label: "Off / On", w: 36 },
  { label: "Campaign", w: 142 },
  { label: "Delivery ↑", w: 74 },
  { label: "Results", w: 66, align: "right" },
  { label: "Cost per result", w: 72, align: "right" },
  { label: "Amount spent", w: 62, align: "right" },
  { label: "Purchase ROAS (return on ad spend)", w: 70, align: "right" },
  { label: "Purchases conversion value", w: 70, align: "right" },
  { label: "Budget", w: 60, align: "right" },
];

type Delivery = "Active" | "Learning" | "Learning limited" | "Off";
const M_ROWS: [string, Delivery, string, string, string, string, string, string, string][] = [
  ["IMP | Prospecting | Apparel | Adv+ Audience", "Active", "214", "₹212.40", "₹45,453.60", "10.20", "₹463,627.00", "₹1,600.00", "Daily"],
  ["IMP | Retargeting | ATC + VC 14D | All products", "Active", "187", "₹104.12", "₹19,470.44", "22.19", "₹431,970.00", "₹700.00", "Daily"],
  ["IMP | Prospecting | Nutrition | Broad 21-44", "Active", "168", "₹198.75", "₹33,390.00", "8.96", "₹299,040.00", "₹1,200.00", "Daily"],
  ["IMP | Catalogue | DPA | Viewed not bought", "Active", "131", "₹176.30", "₹23,095.30", "12.71", "₹293,440.00", "₹800.00", "Daily"],
  ["IMP | Creative test | Wk 37 | 6 hooks", "Learning", "29", "₹383.41", "₹11,118.89", "5.35", "₹59,450.00", "₹2,800.00", "Lifetime"],
  ["IMP | Prospecting | Reels | Energy mix trial", "Learning limited", "15", "₹364.02", "₹5,460.30", "2.44", "₹13,350.00", "₹300.00", "Daily"],
  ["IMP | Prospecting | Interest stack | OLD", "Off", "—", "—", "₹0.00", "—", "₹0.00", "₹1,500.00", "Daily"],
];

export const MetaAdsManager: Screen = () => (
  <AdsManager
    account="IMPOSSIBLE Store"
    accountId="2381904476"
    dateRange="Last 30 days: 18 Aug 2025 – 16 Sep 2025"
    columnsLabel="Columns: Custom"
    rowH={30}
    cols={MCOLS}
    rows={M_ROWS.map(([name, delivery, res, cpr, spent, roas, value, budget, kind]) => [
      <CheckBox key="c" size={8} border="#8a8d91" />,
      <MetaToggle key="t" on={delivery !== "Off"} />,
      <MetaLink key="n">{name}</MetaLink>,
      <MetaDelivery key="d" status={delivery} />,
      res === "—" ? res : <Two key="r" a={res} b="Website purchases" />,
      cpr === "—" ? cpr : <Two key="p" a={cpr} b="Per purchase" />,
      spent,
      roas,
      value,
      <Two key="b" a={budget} b={kind} />,
    ])}
    total={[
      "",
      "",
      <Two key="t" a={<b style={{ fontWeight: 700 }}>Results from 7 campaigns</b>} b="Excludes deleted items" />,
      "",
      <Two key="r" a="744" b="Website purchases" />,
      <Two key="p" a="₹185.47" b="Per purchase" />,
      <Two key="s" a="₹137,988.53" b="Total spent" />,
      <Two key="ro" a="11.31" b="Average" />,
      <Two key="v" a="₹1,560,877.00" b="Total" />,
      "",
    ]}
  />
);

/* 02 · Instagram feed, Story and Reels ads --------------------------- */

function IgTabBar({ dark = false }: { dark?: boolean }) {
  const s = { width: 13, height: 13 };
  const c = dark ? "#fff" : "#000";
  return (
    <div className="mt-auto flex shrink-0 items-center justify-around" style={{ height: 34, paddingBottom: 10, borderTop: dark ? "none" : "0.5px solid #dbdbdb", color: c, background: dark ? "#000" : "#fff" }}>
      <House style={s} fill={dark ? "none" : c} aria-hidden="true" />
      <Search style={s} aria-hidden="true" />
      <SquarePlay style={s} fill={dark ? c : "none"} stroke={dark ? "#000" : c} aria-hidden="true" />
      <Send style={s} aria-hidden="true" />
      <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#b58a68" }} />
    </div>
  );
}

function IgTopBar() {
  return (
    <div className="flex shrink-0 items-center" style={{ height: 26, padding: "0 9px", background: "#fff", gap: 10 }}>
      <span style={{ fontFamily: "'Snell Roundhand', 'Brush Script MT', cursive", fontSize: 16, fontWeight: 700, color: "#000", lineHeight: 1 }}>Instagram</span>
      <ChevronDown style={{ width: 9, height: 9, marginLeft: -7 }} aria-hidden="true" />
      <Heart style={{ width: 13, height: 13, marginLeft: "auto" }} strokeWidth={1.8} aria-hidden="true" />
      <MessageCircle style={{ width: 13, height: 13 }} strokeWidth={1.8} aria-hidden="true" />
    </div>
  );
}

function FeedCreative({ w }: { w: number }) {
  return (
    <div className="relative" style={{ width: w, height: w }}>
      <Photo {...SITE} crop={{ x: 705, y: 143, w: 557, h: 557 }} w={w} h={w} />
      <span className="absolute" style={{ left: 9, top: 9 }}>
        <Wordmark w={62} white />
      </span>
    </div>
  );
}

function StoryCreative({ w, h }: { w: number; h: number }) {
  return (
    <div className="relative" style={{ width: w, height: h, color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <Photo {...SITE} crop={{ x: 705, y: 143, w: 300, h: 557 }} w={w} h={h} />
      <div className="absolute inset-x-0" style={{ bottom: 58, padding: "0 14px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.15, textShadow: "0 1px 3px rgb(0 0 0 / 0.5)" }}>Try our clean energy drink mix for free</p>
        <p style={{ fontSize: 8, marginTop: 4, textShadow: "0 1px 3px rgb(0 0 0 / 0.5)" }}>Just pay shipping</p>
      </div>
    </div>
  );
}

function Reel({ likes, comments }: { likes: string; comments: string }) {
  const icon = { width: 13, height: 13 };
  return (
    <div className="relative flex-1" style={{ background: "#000", color: "#fff", overflow: "hidden", fontFamily: FONT.apple }}>
      <Photo {...SITE} crop={{ x: 1010, y: 143, w: 300, h: 557 }} w={170} h={316} style={{ position: "absolute", top: 0, left: 0 }} />
      <div className="absolute inset-x-0 top-0 flex items-center" style={{ padding: "6px 9px", fontSize: 10, fontWeight: 700 }}>
        Reels
        <ChevronDown style={{ width: 9, height: 9, marginLeft: 2 }} aria-hidden="true" />
        <Camera style={{ ...icon, marginLeft: "auto" }} aria-hidden="true" />
      </div>
      <p className="absolute" style={{ left: 12, right: 44, top: 44, fontSize: 10.5, fontWeight: 700, lineHeight: 1.2, fontFamily: "Arial, sans-serif", textShadow: "0 1px 3px rgb(0 0 0 / 0.6)" }}>
        Shorts that keep up
        <br />
        with your legs day
      </p>
      <div className="absolute flex flex-col items-center" style={{ right: 7, bottom: 64, gap: 9, fontSize: 6.5, fontWeight: 600 }}>
        <span className="flex flex-col items-center" style={{ gap: 1 }}>
          <Heart style={icon} strokeWidth={1.8} aria-hidden="true" />
          {likes}
        </span>
        <span className="flex flex-col items-center" style={{ gap: 1 }}>
          <MessageCircle style={{ ...icon, transform: "scaleX(-1)" }} strokeWidth={1.8} aria-hidden="true" />
          {comments}
        </span>
        <Send style={icon} strokeWidth={1.8} aria-hidden="true" />
        <Ellipsis style={icon} aria-hidden="true" />
        <span style={{ width: 13, height: 13, borderRadius: 3, border: "1.5px solid #fff", background: "#222" }} />
      </div>
      <div className="absolute inset-x-0" style={{ bottom: 0, padding: "0 9px 7px" }}>
        <div className="flex items-center" style={{ gap: 5 }}>
          <Avatar size={16} />
          <span style={{ fontSize: 7.5, fontWeight: 600 }}>impossible</span>
          <span style={{ fontSize: 6.5, fontWeight: 600, border: "1px solid rgb(255 255 255 / 0.7)", borderRadius: 4, padding: "1px 5px" }}>Follow</span>
        </div>
        <p style={{ fontSize: 6.5, marginTop: 3, opacity: 0.95 }}>Sponsored</p>
        <p className="truncate" style={{ fontSize: 7, marginTop: 2, maxWidth: 125 }}>
          Training Shorts 7&quot;. Quick-dry, no ride-up...
        </p>
        <p className="flex items-center" style={{ fontSize: 6.5, marginTop: 3, gap: 3, opacity: 0.9 }}>
          <Music2 style={{ width: 7, height: 7 }} aria-hidden="true" />
          impossible · Original audio
        </p>
        <span className="flex items-center justify-between" style={{ marginTop: 5, height: 20, padding: "0 8px", borderRadius: 5, background: "rgb(255 255 255 / 0.18)", fontSize: 7.5, fontWeight: 600 }}>
          Shop now
          <ChevronRight style={{ width: 9, height: 9 }} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export const InstagramCreatives: Screen = () => (
  <PhoneBackdrop>
    <Place x={22} y={10}>
      <PhoneFrame time="7:18">
        <IgTopBar />
        <InstagramPost
          w={170}
          handle="impossible"
          avatar={<Avatar size={20} />}
          image={<FeedCreative w={170} />}
          imageH={170}
          cta="Shop now"
          likes="3,482"
          caption="The Performance Tank. Cut for movement, built for training days. Free shipping on orders over ₹1,999."
        />
        <IgTabBar />
      </PhoneFrame>
    </Place>
    <Place x={230} y={10}>
      <PhoneFrame dark time="7:21">
        <InstagramStory handle="impossible" avatar={<Avatar size={16} />} image={<StoryCreative w={170} h={330} />} cta="Shop now" progress={0.55} />
      </PhoneFrame>
    </Place>
    <Place x={438} y={10}>
      <PhoneFrame dark time="7:24">
        <Reel likes="12.4K" comments="186" />
        <IgTabBar dark />
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

/* 03 · Shopping ads on Google ---------------------------------------- */

/** A studio shot of the drink-mix pouch on white: matte black pouch with the wordmark. */
function Pouch({ w, h, flavour, band }: { w: number; h: number; flavour: string; band: string }) {
  const pw = w * 0.5;
  return (
    <span className="relative flex items-end justify-center" style={{ width: w, height: h, background: "#fff" }}>
      <span className="relative flex flex-col items-center" style={{ width: pw, height: h * 0.82, marginBottom: h * 0.06, background: "#161616", borderRadius: `${pw * 0.08}px ${pw * 0.08}px ${pw * 0.14}px ${pw * 0.14}px`, boxShadow: "inset -3px 0 5px rgb(255 255 255 / 0.07), 0 2px 3px rgb(0 0 0 / 0.18)" }}>
        <span style={{ width: "100%", height: 3, borderBottom: "1px solid #2e2e2e" }} />
        <span style={{ marginTop: h * 0.14 }}>
          <Wordmark w={pw * 0.8} white />
        </span>
        <span style={{ marginTop: 4, fontSize: pw * 0.085, color: "#fff", letterSpacing: 0.3, fontFamily: "Arial, sans-serif", fontWeight: 700 }}>CLEAN ENERGY</span>
        <span style={{ marginTop: "auto", marginBottom: h * 0.08, width: "70%", padding: "2px 0", textAlign: "center", background: band, color: "#111", fontSize: pw * 0.075, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>{flavour}</span>
      </span>
    </span>
  );
}

type Pla = { img: ReactNode; title: string; price: string; was?: string; rating?: number; reviews?: string; ship: string };
const PLAS: Pla[] = [
  { img: <Photo {...SITE} crop={{ x: 540, y: 400, w: 170, h: 170 }} w={96} h={96} />, title: "IMPOSSIBLE Men's Performance Tank – Black", price: "₹1,499.00", rating: 4.7, reviews: "212", ship: "Free delivery" },
  { img: <Pouch w={96} h={96} flavour="LEMON LIME" band="#d7e36a" />, title: "Clean Energy Drink Mix – Lemon Lime, 30 Servings", price: "₹2,299.00", was: "₹2,699", rating: 4.6, reviews: "1.1K", ship: "Free delivery" },
  { img: <Photo {...SITE} crop={{ x: 640, y: 420, w: 250, h: 250 }} w={96} h={96} />, title: "IMPOSSIBLE Training Shorts 7\" – Navy", price: "₹1,799.00", rating: 4.5, reviews: "98", ship: "Free delivery" },
  { img: <Pouch w={96} h={96} flavour="MIXED BERRY" band="#e58aa8" />, title: "Clean Energy Drink Mix – Mixed Berry, 30 Servings", price: "₹2,299.00", rating: 4.8, reviews: "846", ship: "Free delivery" },
  { img: <Pouch w={96} h={96} flavour="TRIAL PACK" band="#f2f2f2" />, title: "Clean Energy Trial Pack – 3 Stick Packs", price: "₹149.00", ship: "+₹99 delivery" },
];

function PlaCard({ p }: { p: Pla }) {
  return (
    <div className="shrink-0" style={{ width: 98, border: `1px solid ${G.line}`, borderRadius: 8, overflow: "hidden", background: "#fff" }}>
      <div className="flex items-center justify-center" style={{ height: 96, borderBottom: `1px solid ${G.line}` }}>
        {p.img}
      </div>
      <div style={{ padding: "5px 6px 6px", lineHeight: 1.3 }}>
        <p style={{ fontSize: 7.5, color: G.serpTitle, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: 19.5 }}>{p.title}</p>
        <p style={{ fontSize: 8.5, fontWeight: 700, marginTop: 3, color: G.text }}>
          {p.price} {p.was && <span style={{ fontSize: 7, fontWeight: 400, color: G.grey, textDecoration: "line-through" }}>{p.was}</span>}
        </p>
        <p style={{ fontSize: 7, color: G.serpText, marginTop: 1 }}>IMPOSSIBLE®</p>
        <p className="flex items-center" style={{ fontSize: 6.5, color: G.grey, gap: 2, marginTop: 1, height: 9 }}>
          {p.rating && (
            <>
              {p.rating} <Stars rating={p.rating} size={6} /> ({p.reviews})
            </>
          )}
        </p>
        <p style={{ fontSize: 6.5, color: p.ship.startsWith("Free") ? "#188038" : G.grey, marginTop: 1 }}>{p.ship}</p>
      </div>
    </div>
  );
}

export const ShoppingAds: Screen = () => (
  <GoogleSerp query="clean energy drink mix impossible" tabs={["All", "Shopping", "Images", "Videos", "News", "More"]}>
    <div style={{ width: 520 }}>
      <p className="flex items-center" style={{ fontSize: 9, color: G.text, gap: 4 }}>
        <b style={{ fontWeight: 700 }}>Sponsored</b>
        <span style={{ color: G.grey }}>·</span>
        <span style={{ fontSize: 11, fontFamily: FONT.googleSans }}>Shop clean energy drink mix impossible</span>
        <EllipsisVertical style={{ width: 9, height: 9, marginLeft: "auto", color: G.grey }} aria-hidden="true" />
      </p>
      <div className="flex" style={{ gap: 7, marginTop: 8 }}>
        {PLAS.map((p) => (
          <PlaCard key={p.title} p={p} />
        ))}
      </div>
    </div>
    <div style={{ marginTop: 16 }}>
      <SerpResult
        r={{
          site: "IMPOSSIBLE®",
          url: "https://impossible.co › products › clean-energy",
          favicon: <Avatar size={16} />,
          title: "Clean Energy Drink Mix | IMPOSSIBLE®",
          desc: "Science-backed clean energy with natural caffeine, electrolytes and no sugar crash. Try our clean energy drink mix for free, just pay shipping.",
        }}
      />
    </div>
  </GoogleSerp>
);

/* 04 · Google Merchant Center: product feed health ------------------ */

function MerchantMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" fill="#1a73e8" />
      <path d="M2 4h20l-1 5H3z" fill="#4285f4" />
      <path d="M2 4h5l-.5 5H3zM12 4h5l.5 5h-5z" fill="#aecbfa" />
      <rect x="9" y="13" width="6" height="8" fill="#fff" />
    </svg>
  );
}

type MStatus = "Approved" | "Limited" | "Not approved";
const MC_ROWS: [string, string, string, MStatus, string, string, string, ReactNode][] = [
  ["IMPOSSIBLE Men's Performance Tank Top – Black – Breathable Gym Vest – M", "shopify_IN_8021457_44917", "₹1,499.00", "Approved", "In stock", "1,284", "", <Photo key="i" {...SITE} crop={{ x: 540, y: 400, w: 170, h: 170 }} w={20} h={20} />],
  ["Clean Energy Drink Mix – Lemon Lime – 30 Servings – Natural Caffeine", "shopify_IN_8021733_45102", "₹2,299.00", "Approved", "In stock", "2,917", "", <Pouch key="i" w={20} h={20} flavour="" band="#d7e36a" />],
  ["IMPOSSIBLE Men's Training Shorts 7\" – Navy – Quick-Dry – L", "shopify_IN_8021502_44988", "₹1,799.00", "Approved", "In stock", "864", "", <Photo key="i" {...SITE} crop={{ x: 640, y: 420, w: 250, h: 250 }} w={20} h={20} />],
  ["Clean Energy Drink Mix – Mixed Berry – 30 Servings", "shopify_IN_8021734_45103", "₹2,299.00", "Limited", "In stock", "1,102", "Missing value [gtin]", <Pouch key="i" w={20} h={20} flavour="" band="#e58aa8" />],
  ["IMPOSSIBLE Performance Tank – Heather Grey – XXL", "shopify_IN_8021457_44921", "₹1,499.00", "Not approved", "Out of stock", "0", "Mismatched value (page crawl) [availability]", <Photo key="i" {...SITE} crop={{ x: 540, y: 400, w: 170, h: 170 }} w={20} h={20} style={{ filter: "grayscale(1) brightness(1.5)" }} />],
  ["Clean Energy Trial Pack – 3 Stick Packs", "shopify_IN_8022010_45310", "₹149.00", "Approved", "In stock", "3,406", "", <Pouch key="i" w={20} h={20} flavour="" band="#f2f2f2" />],
  ["IMPOSSIBLE Training Shorts 7\" – Black – S", "shopify_IN_8021502_44984", "₹1,799.00", "Limited", "In stock", "212", "Image too small [image_link]", <Photo key="i" {...SITE} crop={{ x: 640, y: 420, w: 250, h: 250 }} w={20} h={20} />],
];

const APPROVED = noisy({ n: 90, from: 164, to: 389, seed: 51, noise: 0.01, ease: 0.9 }).map((v, i) => (i < 16 ? 150 + (i % 3) : i < 22 ? Math.round(150 + (v - 150) * ((i - 15) / 7)) : v));
const NOT_APPROVED = APPROVED.map((_, i) => (i < 16 ? 214 - (i % 2) : i < 24 ? Math.round(214 - (200 * (i - 15)) / 9) : 5 + ((i * 7) % 4)));

function StatusCell({ s }: { s: MStatus }) {
  const [I, c] = s === "Approved" ? [CircleCheck, "#188038"] : s === "Limited" ? [TriangleAlert, "#e37400"] : [CircleAlert, "#d93025"];
  return (
    <span className="inline-flex items-center" style={{ gap: 3 }}>
      <I style={{ width: 9, height: 9, color: c }} aria-hidden="true" />
      {s}
    </span>
  );
}

export const MerchantFeed: Screen = () => (
  <BrowserChrome url="merchants.google.com/mc/products/list?a=5327719048">
    <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
      <header className="flex shrink-0 items-center" style={{ height: 32, padding: "0 10px", gap: 7, borderBottom: `1px solid ${G.line}` }}>
        <Menu style={{ width: 11, height: 11, color: G.grey }} aria-hidden="true" />
        <MerchantMark size={16} />
        <span style={{ fontFamily: FONT.googleSans, fontSize: 11, color: G.grey, whiteSpace: "nowrap" }}>Google Merchant Center</span>
        <span className="flex items-center" style={{ marginLeft: 8, height: 20, padding: "0 7px", borderRadius: 4, border: `1px solid ${G.border}`, fontSize: 8, gap: 3 }}>
          IMPOSSIBLE® <span style={{ color: G.grey }}>5327719048</span>
          <ChevronDown style={{ width: 8, height: 8 }} aria-hidden="true" />
        </span>
        <span className="flex items-center" style={{ marginLeft: 8, width: 170, height: 20, borderRadius: 10, background: "#f1f3f4", padding: "0 8px", gap: 5, fontSize: 8, color: G.grey }}>
          <Search style={{ width: 9, height: 9 }} aria-hidden="true" />
          Search products and pages
        </span>
        <span className="ml-auto flex items-center" style={{ gap: 9, color: G.grey }}>
          <CircleHelp style={{ width: 10, height: 10 }} aria-hidden="true" />
          <Bell style={{ width: 10, height: 10 }} aria-hidden="true" />
          <Initials name="V G" size={16} bg="#7b5e9f" />
        </span>
      </header>
      <div className="flex min-h-0 flex-1">
        <nav className="shrink-0" style={{ width: 112, paddingTop: 6, fontSize: 8, borderRight: `1px solid ${G.line}` }}>
          {(
            [
              [House, "Overview", 0],
              [Package, "Products", 0],
              [null, "All products", 2],
              [null, "Needs attention", 1],
              [null, "Data sources", 1],
              [TrendingUp, "Performance", 0],
              [Megaphone, "Marketing", 0],
              [LayoutGrid, "Growth", 0],
              [Settings, "Settings", 0],
            ] as const
          ).map(([I, t, lvl]) => (
            <div key={t} className="flex items-center" style={{ height: 20, padding: `0 8px 0 ${I ? 10 : 28}px`, gap: 6, marginRight: 6, borderRadius: "0 10px 10px 0", background: lvl === 2 ? "#e8f0fe" : undefined, color: lvl === 2 ? "#0b57d0" : G.text, fontWeight: lvl === 2 || t === "Products" ? 500 : 400 }}>
              {I && <I style={{ width: 10, height: 10, color: G.grey }} aria-hidden="true" />}
              {t}
            </div>
          ))}
        </nav>
        <main className="min-w-0 flex-1" style={{ padding: "8px 12px 0", background: "#fff" }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontFamily: FONT.googleSans, fontSize: 14 }}>All products</span>
            <span className="ml-auto flex items-center" style={{ gap: 4, fontSize: 8, color: "#0b57d0", fontWeight: 500, border: `1px solid ${G.border}`, borderRadius: 12, padding: "3px 9px" }}>
              Add products
            </span>
          </div>
          <div className="flex" style={{ marginTop: 8, border: `1px solid ${G.line}`, borderRadius: 8, padding: "8px 10px", gap: 14 }}>
            <div style={{ width: 150 }}>
              <p style={{ fontSize: 8, fontWeight: 500 }}>Product status</p>
              <p style={{ fontSize: 7, color: G.grey, marginTop: 1 }}>412 products · Updated 16 Sep 2025</p>
              <div className="flex" style={{ height: 6, borderRadius: 3, overflow: "hidden", marginTop: 7 }}>
                <span style={{ flex: 389, background: "#188038" }} />
                <span style={{ flex: 12, background: "#f9ab00" }} />
                <span style={{ flex: 5, background: "#d93025" }} />
                <span style={{ flex: 6, background: "#bdc1c6" }} />
              </div>
              <div style={{ marginTop: 6, fontSize: 7.5, lineHeight: 1.65 }}>
                {(
                  [
                    ["#188038", "Approved", "389"],
                    ["#f9ab00", "Limited", "12"],
                    ["#d93025", "Not approved", "5"],
                    ["#bdc1c6", "Under review", "6"],
                  ] as const
                ).map(([c, t, n]) => (
                  <p key={t} className="flex items-center" style={{ gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                    {t}
                    <span className="ml-auto" style={{ fontWeight: 500 }}>
                      {n}
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center" style={{ fontSize: 7.5, color: G.grey, gap: 8 }}>
                <span className="flex items-center" style={{ gap: 3 }}>
                  <span style={{ width: 8, height: 2, background: "#188038" }} /> Approved
                </span>
                <span className="flex items-center" style={{ gap: 3 }}>
                  <span style={{ width: 8, height: 2, background: "#d93025" }} /> Not approved
                </span>
                <span className="ml-auto">Last 90 days</span>
              </p>
              <div style={{ marginTop: 4 }}>
                <TimeChart
                  w={300}
                  h={78}
                  series={[
                    { values: APPROVED, color: "#188038" },
                    { values: NOT_APPROVED, color: "#d93025" },
                  ]}
                  xLabels={["19 Jun", "18 Jul", "17 Aug", "16 Sep"]}
                  left={{ max: 400, ticks: 2, format: (n) => `${n}` }}
                  size={7}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center" style={{ height: 26, marginTop: 4, gap: 10, color: G.grey, fontSize: 8 }}>
            <ListFilter style={{ width: 10, height: 10 }} aria-hidden="true" />
            <span>Filter</span>
            <span className="ml-auto flex items-center" style={{ gap: 10 }}>
              <Download style={{ width: 10, height: 10 }} aria-hidden="true" />
              <RotateCw style={{ width: 10, height: 10 }} aria-hidden="true" />
            </span>
          </div>
          <div style={{ fontSize: 8, borderTop: `1px solid ${G.line}` }}>
            <div className="flex items-center" style={{ height: 22, fontSize: 7.5, fontWeight: 500, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
              <span style={{ width: 18 }}>
                <CheckBox size={8} />
              </span>
              <span style={{ width: 190 }}>Product</span>
              <span style={{ width: 82 }}>Status</span>
              <span style={{ width: 50 }}>Availability</span>
              <span style={{ width: 44, textAlign: "right" }}>Price</span>
              <span style={{ width: 50, textAlign: "right" }}>Clicks (30d)</span>
              <span style={{ width: 110, paddingLeft: 10 }}>Issues</span>
            </div>
            {MC_ROWS.map(([title, id, price, status, avail, clicks, issue, img]) => (
              <div key={id} className="flex items-center" style={{ height: 27, borderBottom: `1px solid ${G.line}`, whiteSpace: "nowrap" }}>
                <span style={{ width: 18 }}>
                  <CheckBox size={8} />
                </span>
                <span className="flex items-center" style={{ width: 190, gap: 5, minWidth: 0 }}>
                  <span className="flex items-center justify-center" style={{ width: 22, height: 22, flexShrink: 0, border: `1px solid ${G.line}`, borderRadius: 3, overflow: "hidden" }}>{img}</span>
                  <span className="min-w-0" style={{ lineHeight: 1.3 }}>
                    <span className="block truncate" style={{ color: "#0b57d0" }}>
                      {title}
                    </span>
                    <span className="block truncate" style={{ fontSize: 6.5, color: G.grey }}>
                      {id}
                    </span>
                  </span>
                </span>
                <span style={{ width: 82, paddingLeft: 6 }}>
                  <StatusCell s={status} />
                </span>
                <span style={{ width: 50, color: avail === "In stock" ? G.text : G.grey }}>{avail}</span>
                <span style={{ width: 44, textAlign: "right" }}>{price}</span>
                <span style={{ width: 50, textAlign: "right" }}>{clicks}</span>
                <span className="truncate" style={{ width: 110, paddingLeft: 10, color: issue ? G.text : G.grey }}>
                  {issue || "—"}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  </BrowserChrome>
);

/* 05 · Looker Studio: paid media ROAS report ------------------------- */

function LookerMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" fill="none" stroke="#4285f4" strokeWidth="3" />
      <circle cx="17" cy="17" r="4.5" fill="#34a853" />
      <circle cx="17" cy="17" r="2" fill="#fff" />
    </svg>
  );
}

const WEEKS = 28;
const W_ROAS = noisy({ n: WEEKS, from: 0.36, to: 12.4, seed: 61, noise: 0.07, ease: 0.55, decimals: 2, bumps: { 0: 1.05, 1: 1.1, 2: 1.2, 15: 0.86, 16: 0.92 } });
const W_SPEND = noisy({ n: WEEKS, from: 33000, to: 55000, seed: 62, noise: 0.06, ease: 0.2 }).map((v, i) => (i < 4 ? 33000 + i * 900 : i < 8 ? v * 0.72 : v));
const W_REV = W_SPEND.map((s, i) => Math.round(s * W_ROAS[i]));
const REV_MAX = 800000;

function ComboChart({ w, h }: { w: number; h: number }) {
  const pl = 34;
  const pr = 22;
  const top = 6;
  const bottom = h - 14;
  const pw = w - pl - pr;
  const bw = pw / WEEKS;
  const yR = (v: number) => bottom - (v / REV_MAX) * (bottom - top);
  const yO = (v: number) => bottom - (v / 16) * (bottom - top);
  const line = W_ROAS.map((v, i) => `${i ? "L" : "M"}${(pl + bw * (i + 0.5)).toFixed(1)} ${yO(v).toFixed(1)}`).join(" ");
  const labels: [number, string][] = [
    [0, "3 Mar"],
    [9, "5 May"],
    [18, "7 Jul"],
    [27, "8 Sep"],
  ];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", fontFamily: FONT.google }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((t) => {
        const y = bottom - (t / 4) * (bottom - top);
        return (
          <g key={t}>
            <line x1={pl} x2={w - pr} y1={y} y2={y} stroke={t ? G.line : "#bdc1c6"} />
            <text x={pl - 4} y={y + 2.5} textAnchor="end" fontSize={7} fill={G.grey}>
              {t ? `₹${(REV_MAX * t) / 4 / 1000}K` : "₹0"}
            </text>
            <text x={w - pr + 4} y={y + 2.5} fontSize={7} fill={G.grey}>
              {t * 4}
            </text>
          </g>
        );
      })}
      {W_REV.map((v, i) => (
        <rect key={i} x={pl + bw * i + bw * 0.18} y={yR(v)} width={bw * 0.64} height={bottom - yR(v)} fill="#4285f4" />
      ))}
      <path d={line} fill="none" stroke="#ff6d01" strokeWidth={1.6} strokeLinejoin="round" />
      {labels.map(([i, t]) => (
        <text key={t} x={pl + bw * (i + 0.5)} y={h - 2} textAnchor="middle" fontSize={7} fill={G.grey}>
          {t}
        </text>
      ))}
    </svg>
  );
}

function Scorecard({ label, value, delta, good = true, down = false }: { label: string; value: string; delta: string; good?: boolean; down?: boolean }) {
  return (
    <div style={{ flex: 1, minWidth: 0, border: `1px solid ${G.line}`, padding: "6px 8px", background: "#fff" }}>
      <p className="truncate" style={{ fontSize: 7.5, color: G.grey }}>
        {label}
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.2, marginTop: 2 }}>{value}</p>
      <p style={{ fontSize: 7.5, color: good ? "#188038" : "#d93025", marginTop: 1 }}>
        {down ? "▼" : "▲"} {delta}
      </p>
    </div>
  );
}

const CH_ROWS: [string, number, number, number][] = [
  ["Meta – Prospecting", 95422.79, 835467, 426],
  ["Meta – Retargeting & catalogue", 42565.74, 725410, 318],
  ["Google – Shopping", 88560.0, 1214015, 498],
  ["Google – Brand search", 8452.47, 115621, 44],
];
const REV_TOTAL = 2890513;

export const RoasDashboard: Screen = () => (
  <BrowserChrome url="lookerstudio.google.com/reporting/7c1e2a90-4b3d-4f0a-9d15-2e8a61c3b702/page/p_k3x8ru2wkd">
    <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#e8eaed" }}>
      <header className="flex shrink-0 items-center" style={{ height: 30, padding: "0 10px", gap: 7, background: "#fff", borderBottom: `1px solid ${G.border}` }}>
        <LookerMark size={15} />
        <span style={{ fontSize: 10.5, fontFamily: FONT.googleSans }}>IMPOSSIBLE – Paid media ROAS</span>
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
            <Wordmark w={70} />
            <span style={{ width: 1, height: 14, background: G.border }} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>Paid media performance</span>
            <span className="ml-auto flex items-center" style={{ gap: 6, fontSize: 7.5 }}>
              <span className="flex items-center" style={{ gap: 3, border: `1px solid ${G.border}`, padding: "3px 6px" }}>
                Channel: All
                <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
              </span>
              <span className="flex items-center" style={{ gap: 3, border: `1px solid ${G.border}`, padding: "3px 6px" }}>
                18 Aug 2025 – 16 Sep 2025
                <ChevronDown style={{ width: 7, height: 7 }} aria-hidden="true" />
              </span>
            </span>
          </div>
          <div className="flex" style={{ marginTop: 9, gap: 6 }}>
            <Scorecard label="Spend" value="₹235.0K" delta="67.6%" />
            <Scorecard label="Revenue" value="₹2.89M" delta="5,318.9%" />
            <Scorecard label="ROAS" value="12.30" delta="3,134.0%" />
            <Scorecard label="Purchases" value="1,286" delta="4,048.4%" />
            <Scorecard label="Cost / purchase" value="₹182.74" delta="96.0%" down />
          </div>
          <p style={{ fontSize: 6.5, color: G.grey, marginTop: 3 }}>Compared with 1 Mar 2025 – 30 Mar 2025</p>
          <div className="flex" style={{ marginTop: 7, gap: 12 }}>
            <div style={{ width: 250 }}>
              <p className="flex items-center" style={{ fontSize: 8, fontWeight: 500, gap: 8 }}>
                Revenue and ROAS by week
              </p>
              <p className="flex items-center" style={{ fontSize: 7, color: G.grey, gap: 8, marginTop: 2 }}>
                <span className="flex items-center" style={{ gap: 3 }}>
                  <span style={{ width: 7, height: 7, background: "#4285f4" }} /> Revenue
                </span>
                <span className="flex items-center" style={{ gap: 3 }}>
                  <span style={{ width: 8, height: 2, background: "#ff6d01" }} /> ROAS
                </span>
              </p>
              <div style={{ marginTop: 4 }}>
                <ComboChart w={250} h={128} />
              </div>
            </div>
            <div className="min-w-0 flex-1" style={{ fontSize: 7.5 }}>
              <p style={{ fontSize: 8, fontWeight: 500, marginBottom: 4 }}>By channel</p>
              <div className="flex items-center" style={{ height: 20, background: "#f8f9fa", fontWeight: 500, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
                <span style={{ flex: 1, paddingLeft: 4 }}>Channel</span>
                <span style={{ width: 48, textAlign: "right" }}>Spend</span>
                <span style={{ width: 56, textAlign: "right" }}>Revenue</span>
                <span style={{ width: 30, textAlign: "right" }}>ROAS</span>
                <span style={{ width: 66, paddingLeft: 8 }}>% of revenue ▼</span>
              </div>
              {[...CH_ROWS]
                .sort((a, b) => b[2] - a[2])
                .map(([c, s, r]) => (
                  <div key={c} className="flex items-center" style={{ height: 21, borderBottom: `1px solid ${G.line}`, whiteSpace: "nowrap" }}>
                    <span className="truncate" style={{ flex: 1, paddingLeft: 4 }}>
                      {c}
                    </span>
                    <span style={{ width: 48, textAlign: "right" }}>₹{num(Math.round(s))}</span>
                    <span style={{ width: 56, textAlign: "right" }}>₹{num(r)}</span>
                    <span style={{ width: 30, textAlign: "right" }}>{num(r / s, { decimals: 2 })}</span>
                    <span className="flex items-center" style={{ width: 66, paddingLeft: 8, gap: 3 }}>
                      <span style={{ width: (r / REV_TOTAL) * 70, height: 7, background: "#4285f4" }} />
                      {num((r / REV_TOTAL) * 100, { decimals: 1 })}%
                    </span>
                  </div>
                ))}
              <div className="flex items-center" style={{ height: 21, fontWeight: 500, whiteSpace: "nowrap" }}>
                <span style={{ flex: 1, paddingLeft: 4 }}>Grand total</span>
                <span style={{ width: 48, textAlign: "right" }}>₹235,001</span>
                <span style={{ width: 56, textAlign: "right" }}>₹{num(REV_TOTAL)}</span>
                <span style={{ width: 30, textAlign: "right" }}>12.30</span>
                <span style={{ width: 66, paddingLeft: 8 }}>100.0%</span>
              </div>
              <p style={{ fontSize: 6.5, color: G.grey, marginTop: 4, textAlign: "right" }}>1 - 4 / 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

export const impossibleScreens: Screen[] = [MetaAdsManager, InstagramCreatives, ShoppingAds, MerchantFeed, RoasDashboard];
