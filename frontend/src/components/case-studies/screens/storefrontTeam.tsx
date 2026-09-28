import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  Bookmark,
  ChevronDown,
  CircleHelp,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Grid3x3,
  Heart,
  LayoutGrid,
  Maximize,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Ruler,
  Search,
  Settings,
  ShoppingBag,
  Smartphone,
  User,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Browser, Select, type Screen } from "./kit";
import { Photo } from "./tools";

/* Headless storefront team · Stockholm Shopify agency (Iggy), building for its end client Vindö */

const IGGY_LOGO = { src: "/logos/iggy.webp", img: { w: 283, h: 120 } };

/* ------------------------------------------------------------------ */
/* Knitwear imagery                                                    */
/* ------------------------------------------------------------------ */

type Knit = "crew" | "cardigan" | "vest" | "roll";

const BODY: Record<Knit, string> = {
  crew: "M21 8 Q30 13 39 8 L51 13 Q54 14 55 18 L59 44 L51 46 L46 25 L46 56 L14 56 L14 25 L9 46 L1 44 L5 18 Q6 14 9 13 Z",
  cardigan: "M22 8 L30 30 L38 8 L51 13 Q54 14 55 18 L59 44 L51 46 L46 25 L46 56 L14 56 L14 25 L9 46 L1 44 L5 18 Q6 14 9 13 Z",
  vest: "M21 8 Q30 22 39 8 L45 10 Q44 20 47 24 L47 56 L13 56 L13 24 Q16 20 15 10 Z",
  roll: "M22 5 L38 5 L38 10 L51 13 Q54 14 55 18 L59 44 L51 46 L46 25 L46 56 L14 56 L14 25 L9 46 L1 44 L5 18 Q6 14 9 13 L22 10 Z",
};

function Sweater({ id, kind, color, bg, h }: { id: string; kind: Knit; color: string; bg: string; h: number }) {
  const sleeves = kind !== "vest";
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-[3px]" style={{ height: h, background: `linear-gradient(180deg, ${bg}, color-mix(in oklab, ${bg} 90%, black))` }}>
      <svg viewBox="0 0 60 60" height={h * 0.7} aria-hidden="true" className="drop-shadow-[0_3px_3px_rgb(0_0_0/0.12)]">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.16" />
          </linearGradient>
          <pattern id={`${id}-k`} width="3" height="3" patternUnits="userSpaceOnUse">
            <path d="M0 0 L1.5 3 L3 0" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="0.5" />
          </pattern>
        </defs>
        <path d={BODY[kind]} fill={color} />
        <path d={BODY[kind]} fill={`url(#${id}-k)`} />
        <path d={BODY[kind]} fill={`url(#${id}-g)`} />
        <g stroke="#000" strokeOpacity="0.16" strokeWidth="0.6">
          {[16, 20, 24, 28, 32, 36, 40, 44].map((x) => (
            <path key={x} d={`M${x} 52 V56`} />
          ))}
          <path d="M14 52 H46" />
          {sleeves && <path d="M9 42 L1.6 40.2 M51 42 L58.4 40.2" strokeWidth="1.2" />}
        </g>
        {kind === "crew" && <path d="M21 8 Q30 16 39 8" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="1.4" />}
        {kind === "roll" && <path d="M22 7.5 H38" stroke="#000" strokeOpacity="0.15" strokeWidth="1" />}
        {kind === "cardigan" && (
          <g>
            <path d="M30 30 V56" stroke="#000" strokeOpacity="0.22" strokeWidth="0.8" />
            {[34, 40, 46, 52].map((y) => (
              <circle key={y} cx="31.6" cy={y} r="0.9" fill="#f5efe3" />
            ))}
          </g>
        )}
        {(kind === "crew" || kind === "roll") && (
          <path d="M27 16 q2 3 0 6 q-2 3 0 6 q2 3 0 6 q-2 3 0 6 q2 3 0 6 M33 16 q-2 3 0 6 q2 3 0 6 q-2 3 0 6 q2 3 0 6 q-2 3 0 6" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1.2" />
        )}
      </svg>
    </div>
  );
}

type Prod = { id: string; name: string; kind: Knit; color: string; bg: string; price: string; was?: string; swatches: string[]; badge?: [string, string] };

const KNITS: Prod[] = [
  { id: "k1", name: "Fjäll merino crew", kind: "crew", color: "#d6c4a4", bg: "#efebe4", price: "1 495 kr", swatches: ["#d6c4a4", "#3f5a47", "#2b3a55"], badge: ["New", "#111"] },
  { id: "k2", name: "Tuva cable cardigan", kind: "cardigan", color: "#efe6d4", bg: "#e4e8e6", price: "1 895 kr", swatches: ["#efe6d4", "#a4552f"] },
  { id: "k3", name: "Holm roll neck", kind: "roll", color: "#3b3d40", bg: "#ebe8e2", price: "1 295 kr", swatches: ["#3b3d40", "#efe6d4", "#6e2b35"] },
  { id: "k4", name: "Sälen knit vest", kind: "vest", color: "#c9a13b", bg: "#eeebe3", price: "995 kr", swatches: ["#c9a13b", "#3f5a47"] },
  { id: "k5", name: "Öland lambswool crew", kind: "crew", color: "#9fb6c8", bg: "#e9ecee", price: "1 195 kr", swatches: ["#9fb6c8", "#2b3a55"], badge: ["Bestseller", "#3f5a47"] },
  { id: "k6", name: "Runa zip cardigan", kind: "cardigan", color: "#6e2b35", bg: "#efe9e6", price: "1 047 kr", was: "1 495 kr", swatches: ["#6e2b35", "#3b3d40"], badge: ["−30%", "#b91c1c"] },
  { id: "k7", name: "Abisko turtleneck", kind: "roll", color: "#3f5a47", bg: "#e8ebe6", price: "1 395 kr", swatches: ["#3f5a47", "#d6c4a4"] },
  { id: "k8", name: "Klippan cable crew", kind: "crew", color: "#a4552f", bg: "#f0ebe5", price: "1 795 kr", swatches: ["#a4552f", "#efe6d4", "#3b3d40"] },
  { id: "k9", name: "Vik merino vest", kind: "vest", color: "#2b3a55", bg: "#e8eaee", price: "895 kr", swatches: ["#2b3a55", "#9fb6c8"] },
  { id: "k10", name: "Norra ribbed cardigan", kind: "cardigan", color: "#b8ab95", bg: "#eeece8", price: "1 595 kr", swatches: ["#b8ab95", "#2b3a55"], badge: ["Few left", "#b45309"] },
];

function Swatches({ colors, size = 7 }: { colors: string[]; size?: number }) {
  return (
    <span className="flex items-center gap-[3px]">
      {colors.map((c, i) => (
        <span key={c} className="rounded-full" style={{ width: size, height: size, background: c, boxShadow: i === 0 ? "0 0 0 1px #fff, 0 0 0 1.8px #111" : "inset 0 0 0 1px rgb(0 0 0 / 0.12)" }} />
      ))}
    </span>
  );
}

function ProductTile({ p, h }: { p: Prod; h: number }) {
  return (
    <div className="min-w-0">
      <div className="relative">
        <Sweater id={`plp-${p.id}`} kind={p.kind} color={p.color} bg={p.bg} h={h} />
        {p.badge && (
          <span className="absolute left-[4px] top-[4px] rounded-[2px] px-[3px] py-[1.5px] text-[6.5px] font-bold uppercase tracking-[0.05em] text-white" style={{ background: p.badge[1] }}>
            {p.badge[0]}
          </span>
        )}
        <Heart className="absolute right-[4px] top-[4px] size-[8px] text-black/45" aria-hidden="true" />
      </div>
      <p className="mt-[4px] truncate text-[8px] font-medium leading-tight">{p.name}</p>
      <p className="mt-[1px] flex items-center gap-[4px] text-[8px] leading-tight">
        <span className={`font-semibold ${p.was ? "text-[#b91c1c]" : ""}`}>{p.price}</span>
        {p.was && <span className="text-[7px] text-black/40 line-through">{p.was}</span>}
      </p>
      <span className="mt-[3px] block">
        <Swatches colors={p.swatches} size={6} />
      </span>
    </div>
  );
}

/* 01 · Delivered storefront: product listing page --------------------- */

export const StorefrontPlp: Screen = () => (
  <Browser w={640} h={400} url="vindo.se/collections/knitwear">
    <div className="flex h-full flex-col bg-white text-[#141414]">
      <div className="flex h-[16px] shrink-0 items-center justify-center bg-[#1f2a24] text-[7.5px] tracking-[0.04em] text-white/85">Free shipping over 900 kr · 60-day returns · Carbon-neutral delivery in the Nordics</div>
      <div className="flex h-[34px] shrink-0 items-center gap-[16px] border-b border-black/[0.07] px-[14px]">
        <span className="text-[13px] font-semibold tracking-[0.28em]">VINDÖ</span>
        <span className="flex gap-[12px] text-[8.5px] text-black/60">
          {["Women", "Men", "Knitwear", "Outerwear", "Journal"].map((n) => (
            <span key={n} className={n === "Knitwear" ? "font-semibold text-black underline decoration-[1.2px] underline-offset-[5px]" : ""}>
              {n}
            </span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-[10px] text-black/60">
          <span className="flex h-[18px] w-[110px] items-center gap-[4px] rounded-full bg-black/[0.045] px-[7px] text-[7.5px] text-black/40">
            <Search className="size-[8px]" aria-hidden="true" />
            Search knitwear
          </span>
          <span className="text-[7.5px] font-semibold">SE · SEK</span>
          <User className="size-[10px]" aria-hidden="true" />
          <span className="relative">
            <ShoppingBag className="size-[10px]" aria-hidden="true" />
            <span className="absolute -right-[4px] -top-[4px] flex size-[9px] items-center justify-center rounded-full bg-[#1f2a24] text-[6px] font-bold text-white">1</span>
          </span>
        </span>
      </div>
      <div className="flex items-end gap-[8px] px-[14px] pb-[8px] pt-[9px]">
        <div>
          <p className="text-[7.5px] text-black/40">Home / Women / Knitwear</p>
          <p className="mt-[2px] whitespace-nowrap text-[16px] font-semibold tracking-[-0.02em]">
            Knitwear <span className="text-[9px] font-normal text-black/40">48 products</span>
          </p>
        </div>
        <span className="ml-auto flex gap-[4px]">
          {["Merino", "Size M", "Under 1 500 kr"].map((c) => (
            <span key={c} className="flex items-center gap-[3px] whitespace-nowrap rounded-full bg-black/[0.05] px-[7px] py-[3px] text-[7.5px] font-medium">
              {c} <span className="text-black/35">×</span>
            </span>
          ))}
        </span>
        <Select>Sort: Featured</Select>
      </div>
      <div className="flex min-h-0 flex-1 gap-[14px] px-[14px]">
        <div className="w-[104px] shrink-0 space-y-[9px] text-[8px]">
          <div>
            <p className="mb-[4px] flex items-center justify-between font-semibold">
              Category <ChevronDown className="size-[8px] text-black/40" aria-hidden="true" />
            </p>
            {[
              ["Sweaters", 22, true],
              ["Cardigans", 14, false],
              ["Vests", 8, false],
              ["Roll necks", 4, false],
            ].map(([l, n, on]) => (
              <p key={l as string} className="flex h-[14px] items-center gap-[5px] text-black/70">
                <span className="size-[8px] rounded-[2px]" style={on ? { background: "#1f2a24" } : { boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.25)" }} />
                {l}
                <span className="ml-auto text-black/35">{n}</span>
              </p>
            ))}
          </div>
          <div>
            <p className="mb-[4px] font-semibold">Size</p>
            <div className="flex flex-wrap gap-[3px]">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <span key={s} className={`flex h-[15px] w-[18px] items-center justify-center rounded-[3px] text-[7px] font-semibold ${s === "M" ? "bg-[#1f2a24] text-white" : "ring-1 ring-black/15"}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-[4px] font-semibold">Colour</p>
            <div className="flex flex-wrap gap-[4px]">
              {["#d6c4a4", "#efe6d4", "#3b3d40", "#3f5a47", "#2b3a55", "#9fb6c8", "#a4552f", "#6e2b35", "#c9a13b"].map((c) => (
                <span key={c} className="size-[11px] rounded-full" style={{ background: c, boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.12)" }} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-[5px] font-semibold">Price</p>
            <span className="relative block h-[3px] rounded-full bg-black/10">
              <span className="absolute inset-y-0 left-0 right-[40%] rounded-full bg-[#1f2a24]" />
              <span className="absolute -top-[3px] left-0 size-[9px] rounded-full bg-white ring-1 ring-black/30" />
              <span className="absolute -top-[3px] right-[40%] size-[9px] rounded-full bg-white ring-1 ring-black/30" />
            </span>
            <p className="mt-[5px] flex justify-between text-[7px] text-black/45">
              <span>495 kr</span>
              <span>1 500 kr</span>
            </p>
          </div>
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-5 content-start gap-[9px]">
          {KNITS.map((p) => (
            <ProductTile key={p.id} p={p} h={96} />
          ))}
        </div>
      </div>
    </div>
  </Browser>
);

/* 02 · Shared starter kit in Storybook ------------------------------- */

const SB_BLUE = "#029cfd";

function SbIcon({ kind }: { kind: "group" | "component" | "story" | "docs" }) {
  if (kind === "component") return <LayoutGrid className="size-[8px] shrink-0 text-[#1ea7fd]" strokeWidth={2.4} aria-hidden="true" />;
  if (kind === "story") return <Bookmark className="size-[8px] shrink-0 text-[#37d5d3]" strokeWidth={2.4} aria-hidden="true" />;
  if (kind === "docs") return <span className="h-[8px] w-[6.5px] shrink-0 rounded-[1px] border-[1.4px] border-[#ff8300]" />;
  return <ChevronDown className="size-[7px] shrink-0 text-black/40" aria-hidden="true" />;
}

type TreeRow = { t: string; kind: "section" | "component" | "story" | "docs"; depth: number; open?: boolean; on?: boolean };

const SB_TREE: TreeRow[] = [
  { t: "Foundations", kind: "section", depth: 0 },
  { t: "Colour tokens", kind: "docs", depth: 1 },
  { t: "Typography", kind: "docs", depth: 1 },
  { t: "Commerce", kind: "section", depth: 0 },
  { t: "ProductCard", kind: "component", depth: 1, open: true },
  { t: "Docs", kind: "docs", depth: 2 },
  { t: "Default", kind: "story", depth: 2 },
  { t: "On Sale", kind: "story", depth: 2, on: true },
  { t: "Sold Out", kind: "story", depth: 2 },
  { t: "Low Stock", kind: "story", depth: 2 },
  { t: "Price", kind: "component", depth: 1 },
  { t: "VariantPicker", kind: "component", depth: 1 },
  { t: "CartDrawer", kind: "component", depth: 1 },
  { t: "PredictiveSearch", kind: "component", depth: 1 },
  { t: "Cms Blocks", kind: "section", depth: 0 },
  { t: "Hero", kind: "component", depth: 1 },
  { t: "EditorialGrid", kind: "component", depth: 1 },
  { t: "UspBar", kind: "component", depth: 1 },
];

function SbToggle({ on }: { on: boolean }) {
  return (
    <span className="inline-flex rounded-full bg-black/[0.06] p-[1.5px] text-[6.5px] leading-none">
      <span className={`rounded-full px-[5px] py-[2px] ${on ? "text-black/45" : "bg-white font-bold shadow-sm"}`}>False</span>
      <span className={`rounded-full px-[5px] py-[2px] ${on ? "bg-white font-bold shadow-sm" : "text-black/45"}`}>True</span>
    </span>
  );
}

function SbSelect({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[15px] w-[92px] items-center justify-between rounded-[3px] bg-white px-[5px] text-[7px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.14)]">
      {children}
      <ChevronDown className="size-[7px] text-black/40" aria-hidden="true" />
    </span>
  );
}

function CodeTag({ children }: { children: ReactNode }) {
  return <span className="rounded-[2px] border border-black/[0.08] bg-[#f8f8f8] px-[3px] font-mono text-[6px] text-black/70">{children}</span>;
}

const SB_ROWS: { name: string; req?: boolean; desc: string; type: ReactNode; def: string; control: ReactNode }[] = [
  { name: "product", req: true, desc: "Product from the Storefront API", type: <CodeTag>ProductCardFragment</CodeTag>, def: "-", control: <span className="font-mono text-[6.5px] text-black/60">{"product : {…} 9 keys"}</span> },
  { name: "badge", desc: "Merchandising label (metafield)", type: <CodeTag>{'"new" | "sale" | "low-stock"'}</CodeTag>, def: "undefined", control: <SbSelect>sale</SbSelect> },
  { name: "showSwatches", desc: "Colour variants under the price", type: <CodeTag>boolean</CodeTag>, def: "true", control: <SbToggle on /> },
  { name: "imageLoading", desc: "Use eager for the first row", type: <CodeTag>{'"eager" | "lazy"'}</CodeTag>, def: '"lazy"', control: <SbSelect>lazy</SbSelect> },
  { name: "sizes", desc: "Passed to the Hydrogen <Image>", type: <CodeTag>string</CodeTag>, def: '"(min-width: 45em) 20vw, 50vw"', control: <span className="inline-flex h-[15px] w-[92px] items-center rounded-[3px] bg-white px-[5px] text-[6.5px] text-black/60 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.14)]">(min-width: 45em) 2…</span> },
  { name: "onQuickAdd", desc: "", type: <CodeTag>{"(variantId: string) => void"}</CodeTag>, def: "-", control: <span className="text-[6.5px] text-black/40">-</span> },
];
const SBCOLS = "82px minmax(0,1fr) 76px 110px";

export const StarterKitLibrary: Screen = () => {
  const p = KNITS[5];
  return (
    <Browser w={640} h={400} url="kit.iggy.agency/?path=/story/commerce-productcard--on-sale">
      <div className="flex h-full text-[#2e3438]">
        {/* sidebar */}
        <aside className="flex w-[146px] shrink-0 flex-col bg-[#f6f9fc] px-[8px] pt-[9px] text-[7.5px]">
          <div className="flex items-center justify-between px-[2px]">
            <span className="flex items-center gap-[3px] text-[9px] tracking-[-0.01em]">
              <Photo {...IGGY_LOGO} w={26} h={11} />
              <span className="text-black/45">/hydrogen-kit</span>
            </span>
            <Settings className="size-[9px] text-black/45" aria-hidden="true" />
          </div>
          <span className="mt-[7px] flex h-[19px] items-center gap-[4px] rounded-full bg-white px-[6px] text-[7px] text-black/40 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]">
            <Search className="size-[8px]" aria-hidden="true" />
            Find components
            <span className="ml-auto rounded-[2px] border border-black/15 px-[3px] text-[6px]">/</span>
          </span>
          <div className="mt-[6px]">
            {SB_TREE.map((r) =>
              r.kind === "section" ? (
                <p key={r.t} className="mt-[5px] flex h-[15px] items-center gap-[3px] text-[6.5px] font-bold uppercase tracking-[0.08em] text-black/45">
                  <ChevronDown className="size-[7px]" aria-hidden="true" />
                  {r.t}
                </p>
              ) : (
                <p
                  key={r.t}
                  className={`flex h-[15px] items-center gap-[4px] rounded-[3px] pr-[4px] ${r.on ? "font-semibold text-white" : ""}`}
                  style={{ paddingLeft: 4 + (r.depth - 1) * 11, background: r.on ? SB_BLUE : undefined }}
                >
                  {r.kind === "component" && <ChevronDown className={`size-[7px] shrink-0 text-black/40 ${r.open ? "" : "-rotate-90"}`} aria-hidden="true" />}
                  {r.on ? <Bookmark className="size-[8px] shrink-0 text-white" strokeWidth={2.4} aria-hidden="true" /> : <SbIcon kind={r.kind} />}
                  <span className="truncate">{r.t}</span>
                </p>
              ),
            )}
          </div>
        </aside>
        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col border-l border-black/[0.08]">
          <div className="flex h-[24px] shrink-0 items-center gap-[9px] border-b border-black/[0.08] bg-white px-[9px] text-black/55">
            <ZoomIn className="size-[9px]" aria-hidden="true" />
            <ZoomOut className="size-[9px]" aria-hidden="true" />
            <RotateCcw className="size-[9px]" aria-hidden="true" />
            <span className="h-[12px] w-px bg-black/10" />
            <span className="size-[9px] rounded-[2px] border-[1.3px] border-current" />
            <Grid3x3 className="size-[9px]" aria-hidden="true" />
            <Smartphone className="size-[9px]" aria-hidden="true" />
            <Ruler className="size-[9px]" aria-hidden="true" />
            <span className="h-[12px] w-px bg-black/10" />
            <span className="flex items-center gap-[3px] text-[7px]">
              Brand: <b className="font-semibold text-black/75">Vindö</b>
              <ChevronDown className="size-[7px]" aria-hidden="true" />
            </span>
            <span className="flex items-center gap-[3px] text-[7px]">
              Locale: <b className="font-semibold text-black/75">sv-SE</b>
              <ChevronDown className="size-[7px]" aria-hidden="true" />
            </span>
            <span className="ml-auto flex items-center gap-[9px]">
              <Maximize className="size-[9px]" aria-hidden="true" />
              <ExternalLink className="size-[9px]" aria-hidden="true" />
              <Copy className="size-[9px]" aria-hidden="true" />
            </span>
          </div>
          {/* canvas */}
          <div className="min-h-0 flex-1 bg-white p-[16px]">
            <div className="w-[138px]">
              <div className="relative">
                <Sweater id="sb-sale" kind={p.kind} color={p.color} bg={p.bg} h={112} />
                <span className="absolute left-[5px] top-[5px] rounded-[2px] bg-[#b91c1c] px-[3px] py-[1.5px] text-[6.5px] font-bold uppercase tracking-[0.05em] text-white">−30%</span>
                <Heart className="absolute right-[5px] top-[5px] size-[8px] text-black/45" aria-hidden="true" />
              </div>
              <p className="mt-[5px] truncate text-[8px] font-medium">{p.name}</p>
              <p className="mt-[1px] flex items-center gap-[4px] text-[8px]">
                <span className="font-semibold text-[#b91c1c]">{p.price}</span>
                <span className="text-[7px] text-black/40 line-through">{p.was}</span>
              </p>
              <span className="mt-[3px] block">
                <Swatches colors={p.swatches} size={6} />
              </span>
            </div>
          </div>
          {/* addons panel */}
          <div className="flex h-[168px] shrink-0 flex-col border-t border-black/[0.1] bg-white">
            <div className="flex h-[22px] shrink-0 items-center gap-[12px] border-b border-black/[0.08] px-[9px] text-[7.5px] text-black/55">
              {["Controls", "Actions", "Interactions", "Accessibility", "Visual Tests"].map((t, i) => (
                <span key={t} className="flex h-full items-center font-semibold" style={i === 0 ? { color: SB_BLUE, boxShadow: `inset 0 -2px 0 ${SB_BLUE}` } : undefined}>
                  {t}
                  {i === 1 && <span className="ml-[3px] rounded-full bg-black/[0.07] px-[3px] text-[6px]">0</span>}
                  {i === 3 && <span className="ml-[3px] rounded-full bg-black/[0.07] px-[3px] text-[6px]">0</span>}
                </span>
              ))}
              <MoreHorizontal className="ml-auto size-[9px]" aria-hidden="true" />
            </div>
            <div className="grid h-[20px] shrink-0 items-center gap-[8px] border-b border-black/[0.08] px-[10px] text-[7px] font-bold text-black/50" style={{ gridTemplateColumns: SBCOLS }}>
              <span>Name</span>
              <span>Description</span>
              <span>Default</span>
              <span className="flex items-center justify-between">
                Control
                <RotateCcw className="size-[7px]" aria-hidden="true" />
              </span>
            </div>
            {SB_ROWS.map((r) => (
              <div key={r.name} className="grid min-h-[20px] items-center gap-[8px] border-b border-black/[0.06] px-[10px] py-[3px] text-[7px]" style={{ gridTemplateColumns: SBCOLS }}>
                <span className="font-bold">
                  {r.name}
                  {r.req && <span className="text-[#ff4400]">*</span>}
                </span>
                <span className="min-w-0 leading-[1.3]">
                  {r.desc && <span className="block truncate text-black/70">{r.desc}</span>}
                  <span className="block truncate">{r.type}</span>
                </span>
                <span className="truncate font-mono text-[6.5px] text-black/55">{r.def}</span>
                <span className="min-w-0">{r.control}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
};

/* 03 · Sprint board (Jira) ------------------------------------------- */

const J_BLUE = "#0c66e4";
type Epic = "vindo" | "lumi" | "hemma" | "kit" | "askek";
const EPICS: Record<Epic, [string, string, string]> = {
  vindo: ["VINDÖ – HYDROGEN REBUILD", "#dfd8fd", "#5e4db2"],
  lumi: ["LUMI – STOREFRONT + CMS", "#baf3db", "#216e4e"],
  hemma: ["HEMMA – LAUNCH", "#fedec8", "#a54800"],
  kit: ["STARTER KIT V2.4", "#cce0ff", "#0055cc"],
  askek: ["ASK & EK – RETAINER", "#fdd0ec", "#943d73"],
};
type Issue = { key: string; t: string; epic: Epic; type: "story" | "task" | "bug"; pts?: number; who?: string; i: number; prio?: "high" | "med" | "low" };

const COLS: { name: string; issues: Issue[] }[] = [
  {
    name: "To do",
    issues: [
      { key: "IGD-231", t: "Store locator with map and opening hours", epic: "vindo", type: "story", pts: 5, who: "AK", i: 0, prio: "med" },
      { key: "IGD-240", t: "Add fi-FI and nb-NO locale fallbacks", epic: "hemma", type: "task", pts: 2, i: 3, prio: "low" },
      { key: "IGD-236", t: "Shade finder quiz: results page", epic: "lumi", type: "story", pts: 8, who: "PB", i: 1, prio: "med" },
      { key: "IGD-243", t: "Gift card balance check on account page", epic: "askek", type: "story", pts: 3, i: 4 },
    ],
  },
  {
    name: "In progress",
    issues: [
      { key: "IGD-214", t: "PDP image gallery: swipe and pinch-zoom on mobile", epic: "vindo", type: "story", pts: 5, who: "EL", i: 2, prio: "high" },
      { key: "IGD-219", t: "Bundle builder (3 for 2 on minis)", epic: "lumi", type: "story", pts: 8, who: "AK", i: 0, prio: "med" },
      { key: "IGD-228", t: "Collection filters rendered server-side", epic: "hemma", type: "story", pts: 5, who: "MR", i: 3, prio: "med" },
      { key: "IGD-229", t: "PredictiveSearch: keyboard nav + a11y", epic: "kit", type: "task", pts: 3, who: "EL", i: 2 },
    ],
  },
  {
    name: "Code review",
    issues: [
      { key: "IGD-207", t: "Checkout UI extension: gift note", epic: "vindo", type: "story", pts: 3, who: "MR", i: 3, prio: "med" },
      { key: "IGD-233", t: "CLS on collection grid when images load late", epic: "hemma", type: "bug", pts: 2, who: "SN", i: 5, prio: "high" },
      { key: "IGD-222", t: "Storyblok schemas for campaign pages", epic: "lumi", type: "task", pts: 3, who: "JL", i: 4 },
    ],
  },
  {
    name: "QA",
    issues: [
      { key: "IGD-211", t: "Size guide modal", epic: "vindo", type: "story", pts: 2, who: "SN", i: 5, prio: "low" },
      { key: "IGD-225", t: "Klaviyo back-in-stock form", epic: "askek", type: "story", pts: 3, who: "SN", i: 5 },
      { key: "IGD-238", t: "Cart total wrong when discount + gift card", epic: "vindo", type: "bug", who: "SN", i: 5, prio: "high" },
    ],
  },
  {
    name: "Done",
    issues: [
      { key: "IGD-198", t: "Cart drawer upsells", epic: "vindo", type: "story", pts: 3, who: "EL", i: 2 },
      { key: "IGD-201", t: "Metaobject product FAQs", epic: "lumi", type: "story", pts: 2, who: "JL", i: 4 },
      { key: "IGD-205", t: "Lighthouse budget check in CI", epic: "kit", type: "task", pts: 2, who: "MR", i: 3 },
      { key: "IGD-217", t: "sv-SE / fi-FI currency formatting", epic: "hemma", type: "bug", pts: 1, who: "AK", i: 0 },
    ],
  },
];
const COUNTS = [4, 4, 3, 3, 11];

const PEOPLE = [
  ["#ffd5d2", "#ae2e24"],
  ["#dfd8fd", "#5e4db2"],
  ["#c6edfb", "#206a83"],
  ["#baf3db", "#216e4e"],
  ["#f8e6a0", "#7f5f01"],
  ["#e9f2ff", "#0055cc"],
];

function JAvatar({ t, i, size = 12 }: { t: string; i: number; size?: number }) {
  const [bg, fg] = PEOPLE[i % PEOPLE.length];
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-[1.5px] ring-white" style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.42 }}>
      {t}
    </span>
  );
}

function TypeIcon({ type }: { type: Issue["type"] }) {
  const c = type === "story" ? "#63ba3c" : type === "bug" ? "#e5493a" : "#4bade8";
  return (
    <span className="flex size-[9px] shrink-0 items-center justify-center rounded-[2px]" style={{ background: c }}>
      {type === "story" && <Bookmark className="size-[6px] fill-white text-white" strokeWidth={0} aria-hidden="true" />}
      {type === "bug" && <span className="size-[3.5px] rounded-full bg-white" />}
      {type === "task" && (
        <svg viewBox="0 0 10 10" className="size-[7px]" aria-hidden="true">
          <path d="M2.2 5.2 4.2 7 7.8 3" fill="none" stroke="#fff" strokeWidth="1.6" />
        </svg>
      )}
    </span>
  );
}

function Prio({ p }: { p?: Issue["prio"] }) {
  if (!p) return null;
  const c = p === "high" ? "#e2483d" : p === "med" ? "#e97f33" : "#2684ff";
  return (
    <svg viewBox="0 0 10 10" className="size-[8px] shrink-0" aria-hidden="true">
      {p === "high" && <path d="M2 6.5 5 3.5 8 6.5" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" />}
      {p === "med" && <path d="M2 4H8M2 6.5H8" stroke={c} strokeWidth="1.4" strokeLinecap="round" />}
      {p === "low" && <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}

export const SprintBoard: Screen = () => (
  <Browser w={640} h={400} url="iggy-agency.atlassian.net/jira/software/projects/IGD/boards/12">
    <div className="flex h-full flex-col bg-white text-[#172b4d]">
      <div className="flex h-[26px] shrink-0 items-center gap-[9px] border-b border-[#091e4224] px-[8px] text-[7.5px] text-[#44546f]">
        <LayoutGrid className="size-[9px]" aria-hidden="true" />
        <span className="flex items-center gap-[3px] font-bold text-[#0c66e4]">
          <svg viewBox="0 0 12 12" className="size-[10px]" aria-hidden="true">
            <path d="M6 0.5 11.5 6 6 11.5 0.5 6Z" fill="#0c66e4" />
            <path d="M6 3.5 8.5 6 6 8.5 3.5 6Z" fill="#fff" />
          </svg>
          <span className="text-[#44546f]">Jira</span>
        </span>
        {["Your work", "Projects", "Filters", "Dashboards", "Teams", "Plans", "Apps"].map((n, i) => (
          <span key={n} className={`flex items-center gap-[1px] ${i === 1 ? "font-semibold text-[#0c66e4]" : ""}`}>
            {n}
            <ChevronDown className="size-[6px]" aria-hidden="true" />
          </span>
        ))}
        <span className="rounded-[3px] px-[7px] py-[3px] font-semibold text-white" style={{ background: J_BLUE }}>
          Create
        </span>
        <span className="ml-auto flex h-[17px] w-[110px] items-center gap-[4px] rounded-[3px] border border-[#091e4224] px-[5px] text-[7px] text-[#626f86]">
          <Search className="size-[8px]" aria-hidden="true" />
          Search
        </span>
        <Bell className="size-[9px]" aria-hidden="true" />
        <CircleHelp className="size-[9px]" aria-hidden="true" />
        <Settings className="size-[9px]" aria-hidden="true" />
        <JAvatar t="EL" i={2} size={15} />
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[124px] shrink-0 flex-col border-r border-[#091e4224] px-[7px] pt-[9px] text-[7.5px] text-[#44546f]">
          <div className="flex items-center gap-[5px]">
            <span className="flex size-[18px] items-center justify-center rounded-[3px] bg-[#1f845a] text-[7px] font-bold text-white">IG</span>
            <span className="leading-tight">
              <span className="block font-semibold text-[#172b4d]">Iggy Delivery</span>
              <span className="block text-[6.5px]">Software project</span>
            </span>
          </div>
          <p className="mt-[10px] px-[4px] text-[6px] font-bold uppercase tracking-[0.04em] text-[#626f86]">Planning</p>
          {["Timeline", "Backlog", "Active sprints", "Reports", "Issues", "Components"].map((n, i) => (
            <span key={n} className={`mt-[1px] flex h-[17px] items-center rounded-[3px] px-[5px] ${i === 2 ? "font-semibold" : ""}`} style={i === 2 ? { background: "#e9f2ff", color: J_BLUE, boxShadow: `inset 2px 0 0 ${J_BLUE}` } : undefined}>
              {n}
            </span>
          ))}
          <p className="mt-[8px] px-[4px] text-[6px] font-bold uppercase tracking-[0.04em] text-[#626f86]">Development</p>
          {["Code", "Releases"].map((n) => (
            <span key={n} className="mt-[1px] flex h-[17px] items-center gap-[4px] rounded-[3px] px-[5px]">
              {n === "Code" && <Code className="size-[8px]" aria-hidden="true" />}
              {n}
            </span>
          ))}
          <span className="mx-[4px] my-[6px] h-px bg-[#091e4224]" />
          <span className="flex h-[17px] items-center px-[5px]">Project pages</span>
          <span className="flex h-[17px] items-center gap-[3px] px-[5px]">
            <Plus className="size-[8px]" aria-hidden="true" />
            Add shortcut
          </span>
          <span className="flex h-[17px] items-center px-[5px]">Project settings</span>
          <p className="mt-auto pb-[8px] text-center text-[6px] leading-[1.4] text-[#626f86]">You&apos;re in a team-managed project</p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col px-[12px] pt-[8px]">
          <p className="text-[7px] text-[#626f86]">Projects / Iggy Delivery</p>
          <div className="mt-[2px] flex items-center gap-[7px]">
            <p className="text-[12.5px] font-semibold">IGD Sprint 38</p>
            <span className="ml-auto flex items-center gap-[3px] text-[7px] text-[#44546f]">
              <Clock className="size-[8px]" aria-hidden="true" />3 days remaining
            </span>
            <span className="rounded-[3px] bg-[#091e420f] px-[7px] py-[3px] text-[7.5px] font-semibold text-[#44546f]">Complete sprint</span>
            <span className="rounded-[3px] bg-[#091e420f] px-[4px] py-[3px] text-[#44546f]">
              <MoreHorizontal className="size-[8px]" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-[7px] flex items-center gap-[6px] text-[7.5px] text-[#44546f]">
            <span className="flex h-[18px] w-[92px] items-center gap-[4px] rounded-[3px] border border-[#091e4224] px-[5px] text-[7px] text-[#626f86]">
              <Search className="size-[8px]" aria-hidden="true" />
              Search this board
            </span>
            <span className="flex -space-x-[3px]">
              {[
                ["EL", 2],
                ["AK", 0],
                ["MR", 3],
                ["JL", 4],
                ["SN", 5],
                ["PB", 1],
              ].map(([t, i]) => (
                <JAvatar key={t as string} t={t as string} i={i as number} size={15} />
              ))}
            </span>
            {["Epic", "Label", "Type"].map((f) => (
              <span key={f} className="flex items-center gap-[2px] rounded-[3px] px-[4px] py-[2px] font-semibold">
                {f}
                <ChevronDown className="size-[7px]" aria-hidden="true" />
              </span>
            ))}
            <span className="rounded-[3px] px-[4px] py-[2px] font-semibold">Only my issues</span>
            <span className="ml-auto flex items-center gap-[3px] text-[6.5px] font-bold uppercase">
              Group by
              <span className="flex items-center gap-[2px] rounded-[3px] bg-[#091e420f] px-[5px] py-[2px] text-[7px] font-semibold normal-case">
                None
                <ChevronDown className="size-[7px]" aria-hidden="true" />
              </span>
            </span>
          </div>
          <div className="mt-[8px] grid min-h-0 flex-1 grid-cols-5 gap-[5px] overflow-hidden">
            {COLS.map((c, ci) => (
              <div key={c.name} className="flex min-w-0 flex-col rounded-t-[4px] bg-[#f7f8f9] px-[4px] pt-[5px]">
                <p className="mb-[4px] px-[2px] text-[6.5px] font-semibold uppercase tracking-[0.02em] text-[#44546f]">
                  {c.name} <span className="font-normal">{COUNTS[ci]}</span>
                  {ci === 4 && <span className="ml-[2px] text-[#22a06b]">✓</span>}
                </p>
                <div className="flex flex-col gap-[4px]">
                  {c.issues.map((is) => {
                    const [label, bg, fg] = EPICS[is.epic];
                    return (
                      <div key={is.key} className="rounded-[3px] bg-white px-[5px] pb-[4px] pt-[5px] shadow-[0_1px_1px_#091e4240,0_0_1px_#091e424f]">
                        <p className="line-clamp-2 text-[7.5px] leading-[1.3]">{is.t}</p>
                        <span className="mt-[4px] inline-block max-w-full truncate rounded-[2px] px-[3px] py-[1px] text-[5.5px] font-bold leading-[1.3]" style={{ background: bg, color: fg }}>
                          {label}
                        </span>
                        <div className="mt-[4px] flex items-center gap-[3px]">
                          <TypeIcon type={is.type} />
                          <span className={`whitespace-nowrap text-[6.5px] font-semibold text-[#44546f] ${ci === 4 ? "line-through" : ""}`}>{is.key}</span>
                          <span className="ml-auto flex items-center gap-[3px]">
                            {is.pts !== undefined && <span className="rounded-full bg-[#091e420f] px-[3px] text-[6px] font-semibold text-[#44546f]">{is.pts}</span>}
                            <Prio p={is.prio} />
                            {is.who ? (
                              <JAvatar t={is.who} i={is.i} />
                            ) : (
                              <span className="flex size-[12px] items-center justify-center rounded-full bg-[#dfe1e6] text-[#626f86]">
                                <User className="size-[7px]" aria-hidden="true" />
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 04 · Before/after performance scores (Lighthouse CI compare) ------- */

function scoreColor(v: number) {
  return v >= 90 ? ["#0c6", "#008800"] : v >= 50 ? ["#fa3", "#c33300"] : ["#f33", "#cc0000"];
}

function Gauge({ v, size = 46 }: { v: number; size?: number }) {
  const [c, text] = scoreColor(v);
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill={c} fillOpacity={0.1} stroke={c} strokeOpacity={0.1} strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c} strokeWidth={4} strokeDasharray={`${((circ * v) / 100).toFixed(1)} ${circ.toFixed(1)}`} />
      </svg>
      <span className="relative font-mono font-medium" style={{ color: text, fontSize: size * 0.3 }}>
        {v}
      </span>
    </span>
  );
}

const CATS = [
  ["Performance", 38, 97],
  ["Accessibility", 81, 96],
  ["Best Practices", 75, 100],
  ["SEO", 90, 100],
] as const;

const METRICS = [
  ["First Contentful Paint", "2.8 s", "0.8 s", "−2.0 s", 71],
  ["Largest Contentful Paint", "4.9 s", "1.2 s", "−3.7 s", 76],
  ["Total Blocking Time", "1,240 ms", "60 ms", "−1,180 ms", 95],
  ["Cumulative Layout Shift", "0.27", "0.021", "−0.249", 92],
  ["Speed Index", "5.6 s", "1.9 s", "−3.7 s", 66],
] as const;

const AUDITS = [
  ["Reduce unused JavaScript", "Est savings of 1,162 KiB", "Est savings of 38 KiB"],
  ["Eliminate render-blocking resources", "6 resources", "0 resources"],
  ["Properly size images", "Est savings of 814 KiB", "Est savings of 22 KiB"],
  ["Avoid an excessive DOM size", "3,412 elements", "1,108 elements"],
  ["Image elements have explicit width and height", "Failed · 14 elements", "Passed"],
] as const;

export const PerformanceScores: Screen = () => (
  <Browser w={640} h={400} url="lhci.iggy.agency/app/projects/vindo-storefront/compare/7d02e1b">
    <div className="flex h-full flex-col bg-[#f5f5f5] text-[#212121]">
      <div className="flex h-[26px] shrink-0 items-center gap-[7px] bg-[#1c1c1c] px-[10px] text-[8px] text-white">
        <svg viewBox="0 0 12 14" className="h-[11px]" aria-hidden="true">
          <path d="M4 3h4l1 10H3z" fill="#f4f4f4" />
          <path d="M3.6 6.5h4.8l.3 2.5H3.3z" fill="#e53935" />
          <path d="M4 3 6 0.8 8 3z" fill="#e53935" />
        </svg>
        <span className="font-semibold">Lighthouse CI</span>
        <span className="text-white/40">/</span>
        <span>vindo-storefront</span>
        <span className="ml-auto text-[7px] text-white/55">Iggy · self-hosted</span>
      </div>
      <div className="flex h-[40px] shrink-0 items-center gap-[8px] border-b border-black/[0.1] bg-white px-[12px] text-[7px]">
        <span className="flex min-w-0 flex-col rounded-[3px] border border-black/[0.12] px-[6px] py-[3px] leading-[1.35]">
          <span className="text-[6px] font-bold uppercase tracking-[0.05em] text-black/45">Base</span>
          <span className="truncate">
            <b className="font-mono">a41f2c9</b> main · &quot;Liquid theme (Dawn 9.0)&quot; · Mar 12
          </span>
        </span>
        <ArrowRight className="size-[9px] shrink-0 text-black/35" aria-hidden="true" />
        <span className="flex min-w-0 flex-col rounded-[3px] border border-[#1a73e8] bg-[#e8f0fe] px-[6px] py-[3px] leading-[1.35]">
          <span className="text-[6px] font-bold uppercase tracking-[0.05em] text-[#1a73e8]">Compare</span>
          <span className="truncate">
            <b className="font-mono">7d02e1b</b> hydrogen · &quot;Go live: Hydrogen storefront&quot; · Sep 30
          </span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-[5px]">
          <Select>/collections/knitwear</Select>
          <Select>Mobile · median of 5</Select>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 gap-[9px] p-[9px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[9px]">
          <section className="flex shrink-0 justify-around rounded-[3px] bg-white py-[9px] shadow-[0_1px_2px_rgb(0_0_0/0.12)]">
            {CATS.map(([l, a, b]) => (
              <div key={l} className="flex flex-col items-center">
                <Gauge v={b} />
                <p className="mt-[4px] text-[7.5px]">{l}</p>
                <p className="mt-[2px] flex items-center gap-[3px] text-[6.5px] text-black/50">
                  base <span className="font-mono font-semibold" style={{ color: scoreColor(a)[1] }}>{a}</span>
                  <span className="rounded-[2px] bg-[#e6f4ea] px-[3px] font-mono font-semibold text-[#137333]">+{b - a}</span>
                </p>
              </div>
            ))}
          </section>
          <section className="min-h-0 flex-1 rounded-[3px] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.12)]">
            <p className="flex h-[20px] items-center border-b border-black/[0.08] px-[9px] text-[8px] font-semibold">
              Metrics
              <span className="ml-auto text-[6.5px] font-normal text-black/45">5 improved · 0 regressed</span>
            </p>
            <div className="grid h-[16px] grid-cols-[minmax(0,1fr)_46px_46px_96px] items-center gap-[8px] border-b border-black/[0.05] px-[9px] text-[6px] font-semibold uppercase tracking-[0.04em] text-black/40">
              <span>Metric</span>
              <span className="text-right">Base</span>
              <span className="text-right">Compare</span>
              <span className="text-right">Diff</span>
            </div>
            {METRICS.map(([l, a, b, d, pct]) => (
              <div key={l} className="grid h-[21px] grid-cols-[minmax(0,1fr)_46px_46px_96px] items-center gap-[8px] border-b border-black/[0.05] px-[9px] text-[7.5px] last:border-0">
                <span className="truncate">{l}</span>
                <span className="text-right font-mono text-[7px] text-[#c5221f]">{a}</span>
                <span className="text-right font-mono text-[7px] text-[#137333]">{b}</span>
                <span className="flex items-center gap-[4px]">
                  <span className="h-[5px] flex-1 bg-[#f1f3f4]">
                    <span className="block h-full bg-[#34a853]" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-[40px] text-right font-mono text-[6.5px] text-[#137333]">{d}</span>
                </span>
              </div>
            ))}
          </section>
        </div>
        <section className="flex w-[196px] shrink-0 flex-col rounded-[3px] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.12)]">
          <p className="flex h-[20px] shrink-0 items-center border-b border-black/[0.08] px-[9px] text-[8px] font-semibold">Audit changes (23)</p>
          {AUDITS.map(([l, a, b]) => (
            <div key={l} className="border-b border-black/[0.05] px-[9px] py-[5px] text-[7px] leading-[1.35]">
              <p className="flex items-start gap-[4px]">
                <span className="mt-[2px] size-[5px] shrink-0 rounded-full bg-[#0c6]" />
                <span className="font-medium">{l}</span>
              </p>
              <p className="pl-[9px] text-[6.5px] text-black/50">
                <span className="line-through">{a}</span> → <span className="text-[#137333]">{b}</span>
              </p>
            </div>
          ))}
          <p className="mt-auto px-[9px] pb-[6px] text-[6.5px] text-[#1a73e8]">Show 18 more</p>
        </section>
      </div>
    </div>
  </Browser>
);

export const storefrontTeamScreens: Screen[] = [StorefrontPlp, StarterKitLibrary, SprintBoard, PerformanceScores];
