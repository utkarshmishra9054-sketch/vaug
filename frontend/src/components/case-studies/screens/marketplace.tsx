import type { ReactNode } from "react";
import {
  Apple,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  Filter,
  Globe,
  Heart,
  Home,
  LayoutGrid,
  Lock,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tags,
  User,
  Wallet,
} from "lucide-react";

import { Browser, type Screen } from "./kit";
import { Photo } from "./tools";

/* Modest-fashion marketplace · Abu Dhabi (Fantasy Abaya) */

/* ------------------------------------------------------------------ */
/* Product imagery: garment on a hanger, shot on a plain studio wall    */
/* ------------------------------------------------------------------ */

type Kind = "abaya" | "open" | "kaftan" | "dress" | "hijab";

const SHAPES: Record<Kind, string> = {
  abaya: "M25 10 Q30 14 35 10 L44 12 Q48 13 49 17 L57 51 L49 54 L43 28 L49 82 Q30 85 11 82 L17 28 L11 54 L3 51 L11 17 Q12 13 16 12 Z",
  open: "M25 10 Q30 14 35 10 L44 12 Q48 13 49 17 L57 51 L49 54 L43 28 L49 82 Q30 85 11 82 L17 28 L11 54 L3 51 L11 17 Q12 13 16 12 Z",
  kaftan: "M24 10 Q30 14 36 10 L50 15 L59 35 L52 39 L45 27 L48 82 Q30 85 12 82 L15 27 L8 39 L1 35 L10 15 Z",
  dress: "M25 10 Q30 14 35 10 L41 12 L47 37 L42 38 L39 23 L38 37 Q46 60 49 82 Q30 85 11 82 Q14 60 22 37 L21 23 L18 38 L13 37 L19 12 Z",
  hijab: "M30 14 C20 14 17 24 18 34 C18 42 13 50 7 62 Q30 71 53 62 C47 50 42 42 42 34 C43 24 40 14 30 14 Z",
};

/** Garment photo stand-in: silhouette with fabric shading on a flat studio backdrop. */
function Garment({ id, kind, fabric, trim = "#d4b483", bg, h, w, radius = 0 }: { id: string; kind: Kind; fabric: string; trim?: string; bg: string; h: number; w?: number; radius?: number }) {
  return (
    <div className="relative overflow-hidden" style={{ height: h, width: w, background: bg, borderRadius: radius }}>
      <span className="absolute inset-x-[22%] bottom-[4%] h-[5%] rounded-[50%] bg-black/[0.08] blur-[2px]" />
      <svg viewBox="0 0 60 86" className="absolute inset-x-0 bottom-[3%] mx-auto" height={h * 0.9} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-s`} x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        {kind !== "hijab" && (
          <g fill="none" stroke="#8a8175" strokeWidth="1" strokeLinecap="round">
            <path d="M30 6 V3.6 a1.8 1.8 0 1 1 1.8 -1.8" />
            <path d="M17 12 L30 6 L43 12" />
          </g>
        )}
        {kind === "hijab" && <ellipse cx="30" cy="10" rx="5" ry="3" fill="#cdbfae" />}
        <path d={SHAPES[kind]} fill={fabric} />
        <path d={SHAPES[kind]} fill={`url(#${id}-s)`} />
        {kind === "open" && <path d="M27.5 13 L25 83 L35 83 L32.5 13 Q30 15 27.5 13 Z" fill="#f1e9de" />}
        {kind === "open" && <path d="M27.5 13 L25 83 M32.5 13 L35 83" stroke={trim} strokeWidth="1.1" />}
        {kind === "kaftan" && <path d="M24 10 Q30 22 36 10" fill="none" stroke={trim} strokeWidth="1.8" />}
        {kind === "kaftan" && <path d="M28.5 18 L28 50 M31.5 18 L32 50" stroke={trim} strokeWidth="0.7" strokeDasharray="1.4 1.2" />}
        {kind === "dress" && <rect x="21.5" y="35" width="17" height="3.2" rx="1" fill={trim} />}
        {kind === "abaya" && <path d="M49.5 53 L56.6 50.2 M10.5 53 L3.4 50.2" stroke={trim} strokeWidth="2" />}
        {kind === "hijab" && <ellipse cx="30" cy="31" rx="6.5" ry="8.5" fill="#e9d9c6" />}
        {kind !== "hijab" && (
          <g fill="none" stroke="#000" strokeOpacity="0.1" strokeWidth="0.8">
            <path d="M22 32 Q20 58 18 81" />
            <path d="M38 32 Q40 58 42 81" />
          </g>
        )}
      </svg>
    </div>
  );
}

type Product = { id: string; kind: Kind; fabric: string; trim?: string; bg: string; en: string; ar: string; by: string; byAr: string; price: number; was?: number };

const PRODUCTS: Product[] = [
  { id: "p1", kind: "abaya", fabric: "#2b2622", trim: "#c9a86a", bg: "#efe8de", en: "Linen abaya", ar: "عباية كتان بأطراف ذهبية", by: "Layla Studio", byAr: "ليلى ستوديو", price: 420 },
  { id: "p2", kind: "kaftan", fabric: "#6f5a86", trim: "#e8c77a", bg: "#ece9ef", en: "Embroidered kaftan", ar: "قفطان مطرز يدوياً", by: "Maison Rawan", byAr: "ميزون روان", price: 530 },
  { id: "p3", kind: "open", fabric: "#a88663", trim: "#6f5335", bg: "#f1ece5", en: "Open front abaya", ar: "عباية مفتوحة كريب", by: "Dar Kenza", byAr: "دار كنزة", price: 510, was: 640 },
  { id: "p4", kind: "dress", fabric: "#4f7563", trim: "#d9c28f", bg: "#e9ede9", en: "Pleated maxi dress", ar: "فستان بليسيه طويل", by: "Hessa Atelier", byAr: "حصة أتيليه", price: 390 },
  { id: "p5", kind: "hijab", fabric: "#b0807a", bg: "#f2ebe8", en: "Jersey hijab", ar: "طرحة جيرسي", by: "Rimal", byAr: "رمال", price: 85 },
  { id: "p6", kind: "abaya", fabric: "#1d2330", trim: "#8e98b0", bg: "#eceae6", en: "Crepe abaya, navy", ar: "عباية كريب كحلي", by: "Sahar & Co", byAr: "سحر وشركاه", price: 465 },
];

const HOST = "fantasyabaya.me";
const LOGO = { src: "/logos/fantasy-abaya.webp", img: { w: 480, h: 98 } };
/** Fantasy Abaya's own red (the logo mark), whatever the study tint. */
const BRAND_RED = "#b5121b";
const n2 = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* 01 · Storefront home (Arabic) ------------------------------------- */

export const StorefrontBilingual: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${HOST}/ar`}>
    <div dir="rtl" className="flex h-full flex-col bg-white text-[#1c1917]">
      <div className="flex h-[17px] shrink-0 items-center justify-center text-[7.5px] text-white" style={{ background: tint }}>
        توصيل مجاني داخل الإمارات للطلبات فوق 300 د.إ · طلبات رمضان تُشحن خلال 24 ساعة
      </div>
      <div className="flex h-[34px] shrink-0 items-center gap-[14px] px-[16px]">
        <span className="flex flex-col leading-none">
          <Photo {...LOGO} w={74} h={15} />
          <span className="mt-[3px] text-[5.5px] tracking-[0.3em] text-black/45" dir="ltr">
            ABAYA & SHAILA
          </span>
        </span>
        <span className="flex h-[20px] w-[190px] items-center gap-[5px] rounded-[3px] border border-black/15 px-[7px] text-[7.5px] text-black/40">
          <Search className="size-[9px]" aria-hidden="true" />
          ابحثي عن عباية، قفطان، مصممة…
        </span>
        <span className="ms-auto flex items-center gap-[12px] text-[7.5px] text-black/70">
          <span className="flex items-center gap-[3px]" dir="ltr">
            <Globe className="size-[9px]" aria-hidden="true" />
            English
          </span>
          <span className="flex items-center gap-[3px]">
            <User className="size-[10px]" aria-hidden="true" />
            حسابي
          </span>
          <Heart className="size-[10px]" aria-hidden="true" />
          <span className="relative">
            <ShoppingBag className="size-[10px]" aria-hidden="true" />
            <span className="absolute -end-[5px] -top-[4px] flex size-[9px] items-center justify-center rounded-full bg-black text-[5.5px] font-bold text-white">2</span>
          </span>
        </span>
      </div>
      <nav className="flex h-[22px] shrink-0 items-center justify-center gap-[16px] border-y border-black/[0.08] text-[7.5px] text-black/75">
        {["وصل حديثاً", "العبايات", "القفاطين", "فساتين المناسبات", "الطرح", "المصممات", "تشكيلة رمضان", "تخفيضات"].map((n, i) => (
          <span key={n} className={i === 6 ? "font-semibold" : i === 7 ? "text-[#b42318]" : ""} style={i === 6 ? { color: tint } : undefined}>
            {n}
          </span>
        ))}
      </nav>
      {/* hero banner */}
      <div className="relative flex h-[150px] shrink-0 overflow-hidden bg-[#ebe1d5]">
        <div className="flex w-[46%] flex-col justify-center pe-[10px] ps-[34px]">
          <p className="text-[7.5px] font-semibold" style={{ color: tint }}>
            تشكيلة رمضان 2026
          </p>
          <p className="mt-[5px] font-serif text-[17px] font-semibold leading-[1.25]">قطع محتشمة من ١٤٠ مصممة خليجية</p>
          <p className="mt-[5px] text-[8px] leading-[1.5] text-black/60">عبايات وقفاطين وأزياء المناسبات، مع توصيل إلى الإمارات والسعودية.</p>
          <span className="mt-[9px] flex gap-[6px]">
            <span className="bg-[#1c1917] px-[12px] py-[5px] text-[7.5px] font-semibold text-white">تسوقي التشكيلة</span>
            <span className="border border-black/60 px-[12px] py-[5px] text-[7.5px] font-semibold">المصممات</span>
          </span>
        </div>
        <div className="flex flex-1 items-end justify-center gap-[6px] bg-[#e4d8ca] pb-[2px]">
          {[PRODUCTS[2], PRODUCTS[0], PRODUCTS[1], PRODUCTS[5]].map((p, i) => (
            <Garment key={p.id} id={`hero-${i}`} kind={p.kind} fabric={p.fabric} trim={p.trim} bg="transparent" h={i === 1 ? 138 : 124} w={i === 1 ? 82 : 72} />
          ))}
        </div>
        <span className="absolute bottom-[7px] start-1/2 flex gap-[4px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[3px] rounded-full ${i === 0 ? "w-[12px] bg-black/70" : "w-[5px] bg-black/25"}`} />
          ))}
        </span>
      </div>
      {/* new in */}
      <div className="flex items-baseline justify-between px-[16px] pt-[11px]">
        <p className="font-serif text-[11px] font-semibold">وصل حديثاً</p>
        <p className="text-[7.5px] text-black/55 underline underline-offset-2">عرض الكل (1,247)</p>
      </div>
      <div className="grid grid-cols-6 gap-[8px] px-[16px] pt-[6px]">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="min-w-0">
            <div className="relative">
              <Garment id={`ar-${p.id}`} kind={p.kind} fabric={p.fabric} trim={p.trim} bg={p.bg} h={96} />
              <Heart className="absolute end-[5px] top-[5px] size-[8px] text-black/45" aria-hidden="true" />
              {p.was && <span className="absolute start-[4px] top-[4px] bg-[#b42318] px-[3px] py-[1px] text-[6px] font-bold text-white">-20%</span>}
            </div>
            <p className="mt-[4px] truncate text-[6.5px] text-black/45">{p.byAr}</p>
            <p className="truncate text-[7.5px] leading-tight">{p.ar}</p>
            <p className="mt-[1px] text-[7.5px] font-semibold">
              {p.price} د.إ{p.was && <span className="ms-[4px] font-normal text-black/35 line-through">{p.was} د.إ</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Browser>
);

/* 02 · Checkout with Tabby and Apple Pay ------------------------------ */

function TabbyMark({ size = 8 }: { size?: number }) {
  return (
    <span className="inline-flex items-center rounded-[3px] bg-[#3bffc1] px-[4px] py-[1.5px] font-extrabold leading-none tracking-[-0.02em] text-[#111]" style={{ fontSize: size }}>
      tabby
    </span>
  );
}

function ApplePayMark({ size = 8 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-[1px] rounded-[3px] border border-black/25 bg-white px-[4px] py-[1.5px] font-semibold leading-none text-black" style={{ fontSize: size }}>
      <Apple className="size-[1.05em] fill-current" strokeWidth={0} aria-hidden="true" />
      Pay
    </span>
  );
}

function CardMarks() {
  return (
    <span className="flex items-center gap-[3px]">
      <span className="rounded-[2px] bg-[#1a1f71] px-[3px] py-[1px] text-[6px] font-extrabold italic text-white">VISA</span>
      <span className="flex h-[10px] w-[16px] items-center justify-center rounded-[2px] border border-black/15 bg-white">
        <span className="size-[6px] rounded-full bg-[#eb001b]" />
        <span className="-ml-[2px] size-[6px] rounded-full bg-[#f79e1b] opacity-90" />
      </span>
      <span className="rounded-[2px] bg-[#2e77bc] px-[2px] py-[1px] text-[5.5px] font-bold text-white">AMEX</span>
    </span>
  );
}

function Radio({ on }: { on: boolean }) {
  return <span className="size-[9px] shrink-0 rounded-full" style={on ? { boxShadow: "inset 0 0 0 3px #1c1917" } : { boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.3)" }} />;
}

export const Checkout: Screen = () => (
  <Browser w={640} h={400} url={`${HOST}/en/checkouts/cn/Z2NwLWV1cm9wZS13ZXN0NDowMUhR`}>
    <div className="flex h-full bg-white text-[#1c1917]">
      {/* left: steps + payment */}
      <div className="flex w-[360px] shrink-0 flex-col items-end border-r border-black/[0.1] pr-[26px]">
        <div className="w-[270px] pt-[12px]">
          <Photo {...LOGO} w={69} h={14} />
          <p className="mt-[6px] flex items-center gap-[3px] text-[7px] text-black/50">
            <span className="text-[#1c1917]/80 underline">Bag</span>
            <ChevronRight className="size-[7px]" aria-hidden="true" />
            <span className="underline">Information</span>
            <ChevronRight className="size-[7px]" aria-hidden="true" />
            <span className="underline">Shipping</span>
            <ChevronRight className="size-[7px]" aria-hidden="true" />
            <span className="font-semibold text-[#1c1917]">Payment</span>
          </p>
          <div className="mt-[10px] rounded-[4px] border border-black/[0.12] px-[9px] text-[7.5px]">
            {[
              ["Contact", "mariam.alhashimi@gmail.com"],
              ["Ship to", "Villa 14, Al Raha Gardens, Khalifa City, Abu Dhabi"],
              ["Method", "Aramex Express · 1 business day · Free"],
            ].map(([k, v], i) => (
              <div key={k} className={`flex items-center gap-[8px] py-[5px] ${i ? "border-t border-black/[0.08]" : ""}`}>
                <span className="w-[38px] shrink-0 text-black/50">{k}</span>
                <span className="min-w-0 flex-1 truncate">{v}</span>
                <span className="text-[6.5px] underline">Change</span>
              </div>
            ))}
          </div>
          <p className="mt-[9px] text-[10px] font-semibold">Payment</p>
          <p className="text-[7px] text-black/50">All transactions are secure and encrypted.</p>
          <div className="mt-[6px] overflow-hidden rounded-[4px] border border-black/[0.12] text-[7.5px]">
            <div className="flex items-center gap-[6px] border-b border-[#1c1917] bg-[#f9f9f8] px-[9px] py-[6px]" style={{ boxShadow: "inset 0 0 0 1px #1c1917" }}>
              <Radio on />
              <span className="font-medium">Pay in 4. No interest, no fees.</span>
              <span className="ml-auto">
                <TabbyMark />
              </span>
            </div>
            <div className="border-b border-black/[0.1] bg-[#f5f5f4] px-[9px] py-[6px] text-[7px] leading-[1.45] text-black/65">
              <div className="flex justify-between">
                {[
                  ["Today", "AED 237.50"],
                  ["9 Apr", "AED 237.50"],
                  ["9 May", "AED 237.50"],
                  ["8 Jun", "AED 237.50"],
                ].map(([d, a], i) => (
                  <span key={d} className="flex flex-col items-center">
                    <span className="flex size-[12px] items-center justify-center rounded-full border border-black/30 text-[5.5px] font-bold" style={i === 0 ? { background: "#1c1917", color: "#fff", borderColor: "#1c1917" } : undefined}>
                      {i + 1}
                    </span>
                    <span className="mt-[2px] font-semibold text-black/80">{a}</span>
                    <span className="text-[6.5px] text-black/45">{d}</span>
                  </span>
                ))}
              </div>
              <p className="mt-[5px] text-center text-[6.5px] text-black/45">You&apos;ll be redirected to Tabby to complete your purchase.</p>
            </div>
            <div className="flex items-center gap-[6px] border-b border-black/[0.1] px-[9px] py-[6px]">
              <Radio on={false} />
              <span>Apple Pay</span>
              <span className="ml-auto">
                <ApplePayMark />
              </span>
            </div>
            <div className="flex items-center gap-[6px] border-b border-black/[0.1] px-[9px] py-[6px]">
              <Radio on={false} />
              <span>Credit / debit card</span>
              <span className="ml-auto">
                <CardMarks />
              </span>
            </div>
            <div className="flex items-center gap-[6px] px-[9px] py-[6px] text-black/40">
              <Radio on={false} />
              <span>Cash on delivery</span>
              <span className="ml-auto text-[6.5px]">Not available for orders over AED 750</span>
            </div>
          </div>
          <div className="mt-[9px] flex items-center justify-between">
            <span className="flex items-center gap-[2px] text-[7px] underline">
              <ChevronLeft className="size-[7px]" aria-hidden="true" />
              Return to shipping
            </span>
            <span className="rounded-[4px] bg-[#1c1917] px-[14px] py-[7px] text-[8px] font-semibold text-white">Continue with Tabby</span>
          </div>
        </div>
      </div>
      {/* right: order summary */}
      <div className="flex-1 bg-[#f7f6f4] pl-[24px] pr-[18px] pt-[40px] text-[7.5px]">
        {[
          { p: PRODUCTS[0], opts: "Sand / 54", q: 1 },
          { p: PRODUCTS[1], opts: "Plum / M", q: 1 },
        ].map(({ p, opts, q }) => (
          <div key={p.id} className="mb-[9px] flex items-center gap-[8px]">
            <span className="relative">
              <span className="block overflow-hidden rounded-[5px] border border-black/[0.1]">
                <Garment id={`co-${p.id}`} kind={p.kind} fabric={p.fabric} trim={p.trim} bg="#fff" h={38} w={34} />
              </span>
              <span className="absolute -right-[5px] -top-[5px] flex size-[11px] items-center justify-center rounded-full bg-[#6b6b6b] text-[6px] font-semibold text-white">{q}</span>
            </span>
            <span className="min-w-0 flex-1 leading-[1.35]">
              <span className="block font-medium">{p.en}</span>
              <span className="block text-[6.5px] text-black/50">
                {opts} · {p.by}
              </span>
            </span>
            <span className="tabular-nums">AED {n2(p.price)}</span>
          </div>
        ))}
        <div className="mt-[4px] flex gap-[6px]">
          <span className="flex h-[22px] flex-1 items-center rounded-[4px] border border-black/[0.15] bg-white px-[7px] text-black/40">Discount code or gift card</span>
          <span className="flex h-[22px] items-center rounded-[4px] border border-black/[0.1] bg-[#ecebe8] px-[9px] font-medium text-black/40">Apply</span>
        </div>
        <div className="mt-[11px] space-y-[5px]">
          <p className="flex justify-between">
            <span>Subtotal · 2 items</span>
            <span className="tabular-nums">AED 950.00</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span>FREE</span>
          </p>
          <p className="flex justify-between text-black/50">
            <span>Ships from 2 designers (Abu Dhabi, Dubai)</span>
          </p>
        </div>
        <p className="mt-[9px] flex items-baseline justify-between">
          <span className="text-[10px] font-semibold">Total</span>
          <span>
            <span className="mr-[4px] text-[6.5px] text-black/45">AED</span>
            <span className="text-[12px] font-semibold tabular-nums">950.00</span>
          </span>
        </p>
        <p className="mt-[1px] text-[6.5px] text-black/45">Including AED 45.24 in taxes</p>
        <p className="mt-[16px] flex items-center gap-[4px] text-[6.5px] text-black/45">
          <Lock className="size-[7px]" aria-hidden="true" />
          Payments processed by Stripe. Tabby is subject to eligibility.
        </p>
      </div>
    </div>
  </Browser>
);

/* 03 · Seller portal: orders + earnings ------------------------------ */

type OrderRow = { id: string; date: string; buyer: string; city: string; items: string; pay: "Paid" | "Tabby" | "Refunded" | "Pending"; ful: "Unfulfilled" | "Packed" | "Shipped" | "Delivered" | "Return requested" | "Cancelled"; net: number };

const ORDERS: OrderRow[] = [
  { id: "#FA-24817", date: "Today, 11:42", buyer: "Mariam Al Hashimi", city: "Abu Dhabi", items: "Linen abaya · Sand / 54", pay: "Tabby", ful: "Unfulfilled", net: 357.0 },
  { id: "#FA-24809", date: "Today, 09:15", buyer: "Noura S.", city: "Riyadh", items: "Linen abaya · Black / 56", pay: "Paid", ful: "Unfulfilled", net: 357.0 },
  { id: "#FA-24802", date: "Today, 01:03", buyer: "Hind Al Qasimi", city: "Sharjah", items: "Linen abaya · Sand / 52 ×2", pay: "Paid", ful: "Packed", net: 714.0 },
  { id: "#FA-24796", date: "Yesterday", buyer: "Fatima Rashed", city: "Dubai", items: "Pleated maxi · Sage / S", pay: "Paid", ful: "Shipped", net: 331.5 },
  { id: "#FA-24781", date: "Yesterday", buyer: "Aisha K.", city: "Jeddah", items: "Open front abaya · Camel / 52", pay: "Tabby", ful: "Shipped", net: 433.5 },
  { id: "#FA-24779", date: "3 Mar", buyer: "Reem Obaid", city: "Al Ain", items: "Linen abaya · Black / 54", pay: "Pending", ful: "Unfulfilled", net: 357.0 },
  { id: "#FA-24760", date: "3 Mar", buyer: "Latifa M.", city: "Sharjah", items: "Linen abaya · Sand / 54", pay: "Paid", ful: "Delivered", net: 357.0 },
  { id: "#FA-24744", date: "2 Mar", buyer: "Shamma Al Mazrouei", city: "Abu Dhabi", items: "Jersey hijab ×3", pay: "Paid", ful: "Delivered", net: 216.75 },
  { id: "#FA-24731", date: "2 Mar", buyer: "Dana Y.", city: "Kuwait City", items: "Linen abaya · Black / 58", pay: "Refunded", ful: "Return requested", net: 0 },
  { id: "#FA-24719", date: "1 Mar", buyer: "Mouza Al Ketbi", city: "Dubai", items: "Linen abaya · Sand / 56", pay: "Paid", ful: "Delivered", net: 357.0 },
  { id: "#FA-24702", date: "1 Mar", buyer: "Sara H.", city: "Doha", items: "Pleated maxi · Sage / M", pay: "Paid", ful: "Cancelled", net: 0 },
];

const PAY_STYLE: Record<OrderRow["pay"], [string, string]> = {
  Paid: ["#e3f1df", "#2f6b2a"],
  Tabby: ["#e3f1df", "#2f6b2a"],
  Pending: ["#fff1d6", "#8a5a00"],
  Refunded: ["#ececec", "#555"],
};
const FUL_STYLE: Record<OrderRow["ful"], [string, string]> = {
  Unfulfilled: ["#fff1d6", "#8a5a00"],
  Packed: ["#e6eefc", "#2952a3"],
  Shipped: ["#e6eefc", "#2952a3"],
  Delivered: ["#ececec", "#444"],
  "Return requested": ["#fde7e7", "#a12626"],
  Cancelled: ["#ececec", "#777"],
};

function Badge({ c, children }: { c: [string, string]; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[3px] whitespace-nowrap rounded-[3px] px-[4px] py-[1.5px] text-[6.5px] font-medium leading-none" style={{ background: c[0], color: c[1] }}>
      <span className="size-[4px] rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

const OCOLS = "70px 62px minmax(0,1fr) minmax(0,1.15fr) 58px 76px 58px";

export const SellerPortal: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`sellers.${HOST}/orders`}>
    <div className="flex h-full bg-[#f4f4f5] text-[#18181b]">
      <aside className="flex w-[118px] shrink-0 flex-col border-r border-black/[0.08] bg-white px-[7px] py-[9px] text-[7.5px]">
        <div className="flex items-center gap-[5px] rounded-[4px] border border-black/[0.1] px-[5px] py-[4px]">
          <span className="flex size-[14px] items-center justify-center rounded-[3px] bg-[#e8dcc9] text-[6.5px] font-bold text-[#6f5335]">LS</span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-semibold">Layla Studio</span>
            <span className="block truncate text-[6px] text-black/45">Seller · Abu Dhabi</span>
          </span>
          <ChevronDown className="size-[7px] text-black/40" aria-hidden="true" />
        </div>
        <nav className="mt-[9px] flex flex-col gap-[1px] text-black/65">
          {(
            [
              [Home, "Home"],
              [Package, "Orders", "12"],
              [Tags, "Products"],
              [LayoutGrid, "Inventory"],
              [Wallet, "Payouts"],
              [Star, "Reviews"],
              [Settings, "Settings"],
            ] as const
          ).map(([I, l, b], i) => (
            <span key={l} className={`flex h-[19px] items-center gap-[6px] rounded-[4px] px-[5px] ${i === 1 ? "bg-black/[0.06] font-semibold text-[#18181b]" : ""}`}>
              <I className="size-[9px]" aria-hidden="true" />
              {l}
              {b && <span className="ml-auto rounded-[3px] bg-black/[0.08] px-[3px] text-[6.5px] font-semibold">{b}</span>}
            </span>
          ))}
        </nav>
        <div className="mt-auto space-y-[1px] text-black/55">
          <span className="flex h-[18px] items-center gap-[6px] px-[5px]">
            <CircleHelp className="size-[9px]" aria-hidden="true" />
            Seller help
          </span>
          <p className="px-[5px] text-[6px] text-black/35">Fantasy Abaya Seller Centre</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[28px] shrink-0 items-center gap-[6px] border-b border-black/[0.08] bg-white px-[12px]">
          <span className="flex h-[18px] w-[200px] items-center gap-[4px] rounded-[4px] bg-black/[0.05] px-[6px] text-[7px] text-black/40">
            <Search className="size-[8px]" aria-hidden="true" />
            Search orders, buyers, SKUs
          </span>
          <span className="ml-auto flex items-center gap-[10px] text-black/50">
            <Bell className="size-[9px]" aria-hidden="true" />
            <span className="flex size-[16px] items-center justify-center rounded-full bg-[#e8dcc9] text-[6px] font-bold text-[#6f5335]">LA</span>
          </span>
        </div>
        <div className="min-h-0 flex-1 px-[12px] pt-[9px]">
          <div className="flex items-center gap-[6px]">
            <p className="text-[11px] font-semibold">Orders</p>
            <span className="ml-auto flex h-[18px] items-center gap-[3px] rounded-[4px] border border-black/[0.12] bg-white px-[6px] text-[7px] font-medium">
              <Download className="size-[8px]" aria-hidden="true" />
              Export
            </span>
            <span className="flex h-[18px] items-center rounded-[4px] border border-black/[0.12] bg-white px-[6px] text-[7px] font-medium">Print packing slips (3)</span>
          </div>
          {/* balance strip */}
          <div className="mt-[7px] flex items-center divide-x divide-black/[0.08] rounded-[5px] border border-black/[0.08] bg-white py-[5px] text-[7px]">
            {[
              ["Available for payout", "AED 9,860.00"],
              ["Pending (in return window)", "AED 4,212.75"],
              ["Next payout", "Thu 5 Mar · ADCB ••0716"],
              ["Commission", "15% of item price"],
            ].map(([k, v]) => (
              <span key={k} className="min-w-0 flex-1 px-[9px] leading-[1.35]">
                <span className="block truncate text-black/50">{k}</span>
                <span className="block truncate text-[8.5px] font-semibold tabular-nums">{v}</span>
              </span>
            ))}
          </div>
          <div className="mt-[7px] overflow-hidden rounded-[5px] border border-black/[0.08] bg-white">
            <div className="flex h-[23px] items-center gap-[1px] border-b border-black/[0.08] px-[6px] text-[7px]">
              {["All", "Unfulfilled 4", "Ready to ship 1", "Shipped", "Returns 1", "Cancelled"].map((t, i) => (
                <span key={t} className={`rounded-[4px] px-[6px] py-[3px] ${i === 0 ? "bg-black/[0.07] font-semibold" : "text-black/55"}`}>
                  {t}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-[3px] rounded-[4px] border border-black/[0.1] px-[5px] py-[2px] text-black/55">
                <Filter className="size-[7px]" aria-hidden="true" />
                March 2026
              </span>
            </div>
            <div className="grid h-[18px] items-center gap-[6px] border-b border-black/[0.08] bg-[#fafafa] px-[8px] text-[6.5px] font-medium text-black/50" style={{ gridTemplateColumns: OCOLS }}>
              <span>Order</span>
              <span>Date</span>
              <span>Buyer</span>
              <span>Items</span>
              <span>Payment</span>
              <span>Fulfilment</span>
              <span className="text-right">Your net</span>
            </div>
            {ORDERS.map((o, i) => (
              <div key={o.id} className="grid h-[19px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] text-[7px] last:border-b-0" style={{ gridTemplateColumns: OCOLS, background: i === 0 ? `color-mix(in oklab, ${tint} 4%, white)` : undefined }}>
                <span className="font-semibold">{o.id}</span>
                <span className="truncate text-black/55">{o.date}</span>
                <span className="truncate">
                  {o.buyer} <span className="text-black/40">· {o.city}</span>
                </span>
                <span className="truncate text-black/70">{o.items}</span>
                <span>
                  <Badge c={PAY_STYLE[o.pay]}>{o.pay}</Badge>
                </span>
                <span>
                  <Badge c={FUL_STYLE[o.ful]}>{o.ful}</Badge>
                </span>
                <span className={`text-right tabular-nums ${o.net === 0 ? "text-black/35" : ""}`}>{o.net === 0 ? "—" : `AED ${n2(o.net)}`}</span>
              </div>
            ))}
            <div className="flex h-[20px] items-center justify-between border-t border-black/[0.08] px-[8px] text-[6.5px] text-black/50">
              <span>1–11 of 107 orders</span>
              <span className="flex items-center gap-[6px]">
                <ChevronLeft className="size-[8px] text-black/25" aria-hidden="true" />
                <ChevronRight className="size-[8px]" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 04 · Admin GMV dashboard (Metabase) -------------------------------- */

// Daily GMV in AED for March 2026 (Eid al-Fitr ~20 Mar). Sums to ~612K.
const DAILY = [
  15415, 16964, 15854, 18465, 20755, 19371, 16799, 20082, 21905, 20609, 23766, 26134, 24818, 22509, 27244, 30440,
  33987, 32272, 28784, 13895, 9617, 11128, 13593, 14908, 13759, 16448, 17111, 15522, 16019, 17744, 16467,
];
const MB = "#509ee3";

function Card({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`flex min-h-0 flex-col rounded-[5px] border border-[#eeecec] bg-white px-[9px] py-[6px] shadow-[0_1px_2px_rgb(0_0_0/0.04)] ${className}`}>
      <p className="truncate text-[7.5px] font-bold text-[#4c5773]">{title}</p>
      {children}
    </section>
  );
}

function Scalar({ title, value, sub, delta, good = true }: { title: string; value: string; sub: string; delta: string; good?: boolean }) {
  return (
    <Card title={title}>
      <p className="mt-[5px] text-[16px] font-bold leading-none tracking-[-0.02em] text-[#2e353b]">{value}</p>
      <p className="mt-[5px] truncate text-[6.5px] text-[#949aab]">
        <span className="font-bold" style={{ color: good ? "#84bb4c" : "#ed6e6e" }}>
          {good ? "↑" : "↓"} {delta}
        </span>{" "}
        {sub}
      </p>
    </Card>
  );
}

function GmvChart() {
  const w = 446;
  const h = 124;
  const L = 28;
  const B = 12;
  const max = 40000;
  const pw = w - L - 4;
  const ph = h - B - 6;
  const x = (i: number) => L + (i / (DAILY.length - 1)) * pw;
  const y = (v: number) => 4 + ph - (v / max) * ph;
  const d = DAILY.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} className="mt-[4px] block" aria-hidden="true">
      {[0, 10000, 20000, 30000, 40000].map((g) => (
        <g key={g}>
          <line x1={L} x2={w - 4} y1={y(g)} y2={y(g)} stroke="#eeecec" />
          <text x={L - 4} y={y(g) + 2.5} textAnchor="end" fontSize="6.5" fill="#949aab">
            {g === 0 ? "0" : `${g / 1000}k`}
          </text>
        </g>
      ))}
      <path d={`${d} L${x(DAILY.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`} fill={MB} opacity={0.12} />
      <path d={d} fill="none" stroke={MB} strokeWidth={1.4} strokeLinejoin="round" />
      {DAILY.map((v, i) => (
        <circle key={i} cx={x(i).toFixed(1)} cy={y(v).toFixed(1)} r={1.3} fill="#fff" stroke={MB} strokeWidth={0.9} />
      ))}
      {[0, 5, 10, 15, 20, 25, 30].map((i) => (
        <text key={i} x={x(i)} y={h - 2} textAnchor="middle" fontSize="6.5" fill="#949aab">
          {`Mar ${i + 1}`}
        </text>
      ))}
    </svg>
  );
}

const DESIGNERS = [
  ["Layla Studio", "AE", 214, "71,904.50"],
  ["Maison Rawan", "AE", 168, "64,212.00"],
  ["Dar Kenza", "SA", 151, "52,839.75"],
  ["Hessa Atelier", "KW", 139, "41,506.00"],
  ["Sahar & Co", "AE", 97, "38,118.25"],
  ["Rimal", "AE", 188, "16,002.50"],
] as const;

export const AdminGmv: Screen = () => (
  <Browser w={640} h={400} url={`insights.${HOST}/dashboard/3-marketplace-overview`}>
    <div className="flex h-full flex-col bg-[#f9fbfc] text-[#4c5773]">
      <div className="flex h-[28px] shrink-0 items-center gap-[8px] border-b border-[#eeecec] bg-white px-[10px]">
        <span className="flex size-[14px] items-center justify-center">
          <svg viewBox="0 0 16 20" className="h-[13px]" aria-hidden="true">
            {[0, 1, 2, 3].flatMap((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={2 + c * 6} cy={2 + r * 5.3} r={1.6} fill={MB} opacity={(r + c) % 3 === 0 ? 1 : 0.35} />))}
          </svg>
        </span>
        <span className="text-[7.5px] text-[#949aab]">
          Our analytics <span className="mx-[2px]">/</span> <span className="text-[#4c5773]">Marketplace</span>
        </span>
        <span className="ml-auto flex h-[18px] w-[150px] items-center gap-[4px] rounded-[4px] border border-[#eeecec] bg-[#f9fbfc] px-[6px] text-[7px] text-[#949aab]">
          <Search className="size-[8px]" aria-hidden="true" />
          Search…
        </span>
        <span className="rounded-[4px] px-[7px] py-[3px] text-[7px] font-bold text-white" style={{ background: MB }}>
          + New
        </span>
        <span className="flex size-[16px] items-center justify-center rounded-full bg-[#a989c5] text-[6px] font-bold text-white">RS</span>
      </div>
      <div className="flex h-[40px] shrink-0 items-center gap-[8px] border-b border-[#eeecec] bg-white px-[14px]">
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-[#2e353b]">Marketplace overview</p>
          <p className="text-[6.5px] text-[#949aab]">Edited 2 days ago by Omar · auto-refresh 5 min</p>
        </div>
        <span className="ml-auto flex items-center gap-[5px]">
          {[
            ["Date", "March 2026"],
            ["Market", "All"],
            ["Channel", "Web, iOS, Android"],
          ].map(([k, v]) => (
            <span key={k} className="flex flex-col rounded-[4px] border border-[#eeecec] px-[6px] py-[2px] leading-tight">
              <span className="text-[5.5px] font-bold uppercase text-[#949aab]">{k}</span>
              <span className="text-[7px] font-bold" style={{ color: MB }}>
                {v}
              </span>
            </span>
          ))}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-[7px] p-[9px]">
        <div className="grid h-[58px] shrink-0 grid-cols-4 gap-[7px]">
          <Scalar title="GMV (AED)" value="612,384" sub="vs. Feb (soft launch)" delta="138.4%" />
          <Scalar title="Orders" value="1,318" sub="vs. Feb" delta="121.2%" />
          <Scalar title="Storefront conversion" value="2.81%" sub="vs. Feb" delta="0.37 pt" />
          <Scalar title="Payment failure rate" value="0.62%" sub="vs. Feb" delta="4.1 pt" good={false} />
        </div>
        <div className="flex h-[156px] shrink-0 gap-[7px]">
          <Card title="GMV by day" className="min-w-0 flex-1">
            <GmvChart />
            <p className="mt-auto flex items-center gap-[10px] text-[6.5px] text-[#949aab]">
              <span className="flex items-center gap-[3px]">
                <span className="size-[5px] rounded-full" style={{ background: MB }} />
                GMV (AED, incl. VAT)
              </span>
              <span>Eid al-Fitr: 20 Mar</span>
            </p>
          </Card>
          <div className="flex w-[146px] shrink-0 flex-col gap-[7px]">
            <Card title="Payment method" className="flex-1">
              <div className="mt-[4px] space-y-[3px] text-[7px]">
                {[
                  ["Card", 44.1, MB],
                  ["Apple Pay", 33.4, "#88bf4d"],
                  ["Tabby", 21.9, "#a989c5"],
                  ["COD", 0.6, "#ef8c8c"],
                ].map(([l, v, c]) => (
                  <div key={l as string}>
                    <p className="flex justify-between leading-tight">
                      <span>{l as string}</span>
                      <span className="font-bold text-[#2e353b]">{(v as number).toFixed(1)}%</span>
                    </p>
                    <span className="mt-[1px] block h-[2.5px] bg-[#f0f0f0]">
                      <span className="block h-full" style={{ width: `${v as number}%`, background: c as string }} />
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="GMV by market (AED)" className="h-[62px] shrink-0">
              <table className="mt-[2px] w-full text-[6.5px] leading-[1.45]">
                <tbody>
                  {[
                    ["United Arab Emirates", "434,210"],
                    ["Saudi Arabia", "147,092"],
                    ["Kuwait", "18,665"],
                    ["Qatar", "12,417"],
                  ].map(([m, v]) => (
                    <tr key={m}>
                      <td>{m}</td>
                      <td className="text-right font-bold text-[#2e353b] tabular-nums">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
        <section className="min-h-0 flex-1 overflow-hidden rounded-[5px] border border-[#eeecec] bg-white px-[9px] pt-[6px]">
          <p className="text-[7.5px] font-bold text-[#4c5773]">Top designers by GMV</p>
          <div className="mt-[3px] grid grid-cols-[minmax(0,1fr)_60px_60px_70px_70px] gap-x-[8px] border-b border-[#eeecec] pb-[2px] text-[6px] font-bold uppercase text-[#949aab]">
            <span>Designer</span>
            <span>Market</span>
            <span className="text-right">Orders</span>
            <span className="text-right">GMV (AED)</span>
            <span className="text-right">Payout status</span>
          </div>
          {DESIGNERS.map(([n, m, o, g], i) => (
            <div key={n} className="grid grid-cols-[minmax(0,1fr)_60px_60px_70px_70px] gap-x-[8px] border-b border-[#f3f3f3] py-[2.5px] text-[7px]">
              <span style={{ color: MB }}>{n}</span>
              <span>{m}</span>
              <span className="text-right tabular-nums">{o}</span>
              <span className="text-right tabular-nums">{g}</span>
              <span className="text-right">{i === 3 ? "Scheduled 5 Mar" : "Paid 26 Feb"}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  </Browser>
);

const onBrand = (S: Screen): Screen => {
  const Branded: Screen = () => <S tint={BRAND_RED} />;
  return Branded;
};

export const marketplaceScreens: Screen[] = [StorefrontBilingual, Checkout, SellerPortal, AdminGmv].map(onBrand);

