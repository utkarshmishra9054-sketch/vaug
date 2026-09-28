import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CalendarCheck,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Heart,
  Kanban,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Printer,
  Share2,
  Star,
  Users,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { BarChart, Browser, Legend, Pill, Segments, TONES, type Screen } from "./kit";
import { Photo } from "./tools";

/* Family office property brand · Dubai (La Boutique Real Estate, buyer-side advisory) */

const SITE = "laboutiquerealestate.com";
const LOGO = { src: "/logos/la-boutique-real-estate.webp", img: { w: 258, h: 120 } };
const PHOTO = { src: "/sites/la-boutique-real-estate.webp", img: { w: 1440, h: 900 } };
/** La Boutique's own deep green, whatever the study tint. */
const BRAND_GREEN = "#1d3b2e";
const INK = "#2b1d14";
const CREAM = "#fbf8f4";

/** The real La Boutique Real Estate logo, used on the website and reports. */
function Wordmark({ h = 26 }: { h?: number }) {
  return <Photo {...LOGO} w={(h * LOGO.img.w) / LOGO.img.h} h={h} />;
}

/** Website top navigation. */
function SiteNav({ tint, active }: { tint: string; active?: string }) {
  return (
    <div className="flex h-[34px] shrink-0 items-center gap-[12px] whitespace-nowrap px-[14px] text-[8.5px]" style={{ color: INK }}>
      <Wordmark />
      <span className="ml-[14px] flex items-center gap-[14px] text-black/60">
        {["Projects", "Buyer's guide", "ROI calculator", "Why Dubai", "Journal"].map((l) => (
          <span key={l} className={l === active ? "font-semibold" : ""} style={l === active ? { color: tint } : undefined}>
            {l}
          </span>
        ))}
      </span>
      <span className="ml-auto flex items-center gap-[4px] text-[8px] text-black/50">
        <b style={{ color: INK }}>EN</b>
        <span>|</span>
        <span className="font-sans">عربي</span>
      </span>
      <span className="flex size-[20px] items-center justify-center rounded-full bg-[#25d366] text-white">
        <MessageCircle className="size-[10px]" aria-hidden="true" />
      </span>
      <span className="rounded-full px-[10px] py-[5px] text-[8.5px] font-semibold text-white" style={{ background: tint }}>
        Book a consultation
      </span>
    </div>
  );
}

/** Hero photo: Palm Jumeirah at dusk, cut from La Boutique's own site, with a left shade for the copy. */
function HeroPhoto({ w, h, tint }: { w: number; h: number; tint: string }) {
  return (
    <span className="absolute inset-0" aria-hidden="true">
      <Photo {...PHOTO} crop={{ x: 144, y: 340, w: 1152, h: 318 }} w={w} h={h} />
      <span className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgb(12 20 16 / 0.78), rgb(12 20 16 / 0.25) 60%, rgb(12 20 16 / 0) 100%)" }} />
      <span className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: tint, opacity: 0.5 }} />
    </span>
  );
}

/** Small project "photo" in four variants. */
function ProjectArt({ kind, w, h, tint }: { kind: 0 | 1 | 2 | 3; w: number; h: number; tint: string }) {
  const skies = [
    ["#f3cfa8", "#e79d6c"],
    ["#bcd6e2", "#e8d6c0"],
    ["#e9dcc8", "#c9b294"],
    ["#d8c3d6", "#f0b38b"],
  ][kind];
  const g = `pb-art-${kind}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={skies[0]} />
          <stop offset="1" stopColor={skies[1]} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${g})`} />
      {kind === 0 && (
        <>
          <rect x={w * 0.36} y={h * 0.1} width={w * 0.14} height={h * 0.9} fill="#5b3b33" />
          <rect x={w * 0.52} y={h * 0.26} width={w * 0.12} height={h * 0.74} fill="#7a4e40" />
          <rect x={w * 0.2} y={h * 0.4} width={w * 0.12} height={h * 0.6} fill="#8d6150" />
          {[0.18, 0.3, 0.42, 0.54, 0.66, 0.78].map((f) => (
            <rect key={f} x={w * 0.37} y={h * f} width={w * 0.12} height="1.2" fill="#f7d6b0" opacity="0.7" />
          ))}
          <rect y={h * 0.84} width={w} height={h * 0.16} fill="#8aa5b0" />
        </>
      )}
      {kind === 1 && (
        <>
          <rect y={h * 0.7} width={w} height={h * 0.3} fill="#6fa3b8" />
          <rect x={w * 0.14} y={h * 0.34} width={w * 0.66} height={h * 0.36} fill="#f5efe6" />
          <rect x={w * 0.1} y={h * 0.3} width={w * 0.74} height={h * 0.06} fill="#d9cbb8" />
          {[0.2, 0.36, 0.52, 0.66].map((f) => (
            <rect key={f} x={w * f} y={h * 0.42} width={w * 0.1} height={h * 0.2} fill="#9cc2d0" />
          ))}
          <rect x={w * 0.84} y={h * 0.2} width="2" height={h * 0.5} fill="#5d6b4a" />
          <ellipse cx={w * 0.845} cy={h * 0.2} rx="9" ry="4" fill="#5d6b4a" />
        </>
      )}
      {kind === 2 && (
        <>
          <rect y={h * 0.8} width={w} height={h * 0.2} fill="#8f9e6e" />
          {[0.06, 0.34, 0.62].map((f) => (
            <g key={f}>
              <rect x={w * f} y={h * 0.38} width={w * 0.26} height={h * 0.42} fill="#f2ebe0" />
              <path d={`M${w * f - 2} ${h * 0.4} L${w * (f + 0.13)} ${h * 0.2} L${w * (f + 0.26) + 2} ${h * 0.4} Z`} fill="#b08463" />
              <rect x={w * (f + 0.04)} y={h * 0.5} width={w * 0.07} height={h * 0.12} fill="#a9bfc6" />
              <rect x={w * (f + 0.15)} y={h * 0.56} width={w * 0.06} height={h * 0.24} fill="#8b6a52" />
            </g>
          ))}
        </>
      )}
      {kind === 3 && (
        <>
          <rect x={w * 0.12} y={h * 0.28} width={w * 0.1} height={h * 0.5} fill="#6b4c5a" />
          <rect x={w * 0.26} y={h * 0.12} width={w * 0.12} height={h * 0.66} fill="#57404d" />
          <rect x={w * 0.42} y={h * 0.36} width={w * 0.09} height={h * 0.42} fill="#7b5a64" />
          <rect x={w * 0.66} y={h * 0.2} width={w * 0.14} height={h * 0.58} fill="#57404d" />
          <path d={`M${w * 0.55} ${h * 0.78} Q${w * 0.6} ${h * 0.5} ${w * 0.64} ${h * 0.78}`} fill="none" stroke="#57404d" strokeWidth="2" />
          <rect y={h * 0.78} width={w} height={h * 0.22} fill="#7f8fa6" />
          <rect x={w * 0.2} y={h * 0.86} width={w * 0.4} height="1.2" fill="#fff" opacity="0.5" />
        </>
      )}
      <rect width={w} height={h} fill={tint} opacity="0.06" />
    </svg>
  );
}

/* 01 · Website home page -------------------------------------------- */

const PROJECTS = [
  { name: "Marina Crest", area: "Dubai Marina", tag: "Off-plan · Q4 2027", price: "AED 1.85M", yld: "6.9%", beds: "1–3 BR", permit: "71034921", kind: 0 as const },
  { name: "Palm Vista Residences", area: "Palm Jumeirah", tag: "Ready to move", price: "AED 4.20M", yld: "5.6%", beds: "2–4 BR", permit: "70982217", kind: 1 as const },
  { name: "Hills Park Townhouses", area: "Dubai Hills Estate", tag: "Off-plan · Q2 2027", price: "AED 3.10M", yld: "6.1%", beds: "3–4 BR", permit: "71190458", kind: 2 as const },
  { name: "Creek Horizon", area: "Dubai Creek Harbour", tag: "Ready to move", price: "AED 1.42M", yld: "7.2%", beds: "1–2 BR", permit: "70877302", kind: 3 as const },
];

export const HomePage: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${SITE}/en`}>
    <div className="flex h-full flex-col" style={{ background: CREAM, color: INK }}>
      <SiteNav tint={tint} />
      <div className="relative mx-[12px] h-[170px] shrink-0 overflow-hidden rounded-[10px]">
        <HeroPhoto w={616} h={170} tint={tint} />
        <div className="relative px-[22px] pt-[17px] text-white">
          <p className="flex items-center gap-[6px] text-[7.5px] font-semibold uppercase tracking-[0.22em] text-white/75">
            <span className="h-px w-[16px] bg-white/60" />
            Buyer-side advisory · Dubai
          </p>
          <p className="mt-[8px] w-[300px] font-serif text-[25px] leading-[1.06] tracking-[-0.01em]">Dubai property, advised from your side of the table.</p>
          <p className="mt-[7px] w-[270px] text-[8.5px] leading-[1.45] text-white/75">Off-plan and ready homes for investors from the UK, Germany and India. Independent advice, three vetted developers, no listing noise.</p>
          <div className="mt-[11px] flex gap-[6px]">
            <span className="flex items-center gap-[4px] rounded-full bg-white px-[11px] py-[6px] text-[8.5px] font-semibold" style={{ color: INK }}>
              Explore projects
              <ArrowRight className="size-[9px]" aria-hidden="true" />
            </span>
            <span className="flex items-center gap-[4px] rounded-full px-[11px] py-[6px] text-[8.5px] font-semibold text-white ring-1 ring-white/50">
              <Download className="size-[9px]" aria-hidden="true" />
              2026 buyer&apos;s guide
            </span>
          </div>
        </div>
        <div className="absolute bottom-[12px] right-[12px] flex items-center gap-[8px] rounded-[8px] bg-white/92 px-[9px] py-[6px] shadow-lg backdrop-blur" style={{ color: INK }}>
          <span className="flex size-[20px] items-center justify-center rounded-full bg-white text-[10px] font-bold ring-1 ring-black/10">
            <span className="text-[#4285f4]">G</span>
          </span>
          <span className="leading-tight">
            <span className="flex items-center gap-[2px] text-[9px] font-bold">
              4.9
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-[7px] fill-[#f5a524] text-[#f5a524]" aria-hidden="true" />
              ))}
            </span>
            <span className="block text-[7px] text-black/50">128 Google reviews</span>
          </span>
          <span className="h-[20px] w-px bg-black/10" />
          <span className="leading-tight">
            <span className="block text-[9px] font-bold">11 homes</span>
            <span className="block text-[7px] text-black/50">bought by our clients</span>
          </span>
        </div>
      </div>
      <div className="flex items-end gap-[10px] px-[14px] pt-[9px]">
        <div className="leading-tight">
          <p className="font-serif text-[14px]">Featured projects</p>
          <p className="text-[8px] text-black/50">Hand-picked with our three developer partners · prices in AED</p>
        </div>
        <span className="ml-auto flex gap-[4px] text-[8px]">
          {["All", "Off-plan", "Ready"].map((t, i) => (
            <span key={t} className={`rounded-full px-[8px] py-[3px] ${i === 0 ? "font-semibold text-white" : "text-black/55 ring-1 ring-black/10"}`} style={i === 0 ? { background: INK } : undefined}>
              {t}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-[3px] text-[8px] font-semibold" style={{ color: tint }}>
          View all 24 <ArrowRight className="size-[8px]" aria-hidden="true" />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-[8px] px-[12px] pt-[8px]">
        {PROJECTS.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.06]">
            <div className="relative">
              <ProjectArt kind={p.kind} w={148} h={46} tint={tint} />
              <span className="absolute left-[5px] top-[5px] rounded-full bg-white/90 px-[5px] py-[2px] text-[6.5px] font-semibold">{p.tag}</span>
              <span className="absolute right-[5px] top-[5px] flex size-[14px] items-center justify-center rounded-full bg-white/90">
                <Heart className="size-[7px]" aria-hidden="true" />
              </span>
            </div>
            <div className="px-[7px] pb-[6px] pt-[5px]">
              <p className="truncate text-[9.5px] font-semibold">{p.name}</p>
              <p className="truncate text-[7.5px] text-black/50">
                {p.area} · {p.beds}
              </p>
              <div className="mt-[4px] flex items-baseline justify-between">
                <span className="text-[9px] font-bold" style={{ color: tint }}>
                  <span className="text-[7px] font-medium text-black/45">from </span>
                  {p.price}
                </span>
                <span className="text-[7.5px] text-black/55">{p.yld} yield</span>
              </div>
              <p className="mt-[4px] border-t border-black/[0.06] pt-[3px] font-mono text-[6.5px] text-black/40">RERA permit {p.permit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Browser>
);

/* 02 · ROI calculator on a project page ------------------------------ */

function Slider({ label, value, pct, lo, hi, tint }: { label: string; value: string; pct: number; lo: string; hi: string; tint: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[8px]">
        <span className="text-black/55">{label}</span>
        <span className="text-[9px] font-bold tabular-nums">{value}</span>
      </div>
      <div className="relative mt-[5px] h-[4px] rounded-full bg-black/[0.08]">
        <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: tint }} />
        <span className="absolute top-1/2 size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.35)]" style={{ left: `${pct}%`, boxShadow: `0 0 0 2px ${tint}, 0 1px 3px rgb(0 0 0 / 0.3)` }} />
      </div>
      <div className="mt-[3px] flex justify-between text-[6.5px] text-black/35">
        <span>{lo}</span>
        <span>{hi}</span>
      </div>
    </div>
  );
}

const ROI_YEARS = [
  [134, 98],
  [268, 200],
  [403, 306],
  [537, 416],
  [671, 531],
];

export const RoiCalculator: Screen = ({ tint }) => {
  const soft = `color-mix(in oklab, ${tint} 35%, white)`;
  return (
    <Browser w={640} h={400} url={`${SITE}/en/projects/marina-crest#roi`}>
      <div className="flex h-full flex-col" style={{ background: CREAM, color: INK }}>
        <SiteNav tint={tint} active="ROI calculator" />
        <div className="flex h-[20px] shrink-0 items-center gap-[5px] border-t border-black/[0.06] px-[14px] text-[7.5px] text-black/45">
          <span>Projects</span>
          <ChevronRight className="size-[7px]" aria-hidden="true" />
          <span>Dubai Marina</span>
          <ChevronRight className="size-[7px]" aria-hidden="true" />
          <span className="font-semibold text-black/75">Marina Crest</span>
          <span className="ml-auto flex items-center gap-[3px] font-mono text-[7px]">
            <BadgeCheck className="size-[8px]" style={{ color: tint }} aria-hidden="true" />
            RERA permit 71034921 · DLD registered
          </span>
        </div>
        <div className="flex min-h-0 flex-1 gap-[10px] px-[12px] pb-[10px] pt-[4px]">
          {/* project */}
          <div className="flex w-[262px] shrink-0 flex-col">
            <div className="relative overflow-hidden rounded-[8px]">
              <ProjectArt kind={0} w={262} h={92} tint={tint} />
              <span className="absolute left-[7px] top-[7px] rounded-full bg-white/92 px-[6px] py-[2px] text-[7px] font-semibold">Off-plan · Handover Q4 2027</span>
              <span className="absolute right-[7px] top-[7px] flex gap-[4px]">
                {[Heart, Share2].map((I, i) => (
                  <span key={i} className="flex size-[16px] items-center justify-center rounded-full bg-white/92">
                    <I className="size-[8px]" aria-hidden="true" />
                  </span>
                ))}
              </span>
              <span className="absolute bottom-[7px] right-[7px] rounded-full bg-black/55 px-[6px] py-[2px] text-[7px] font-semibold text-white">1 / 18</span>
              <span className="absolute left-[6px] top-1/2 flex size-[16px] -translate-y-1/2 items-center justify-center rounded-full bg-white/80">
                <ChevronLeft className="size-[9px]" aria-hidden="true" />
              </span>
              <span className="absolute right-[6px] top-1/2 flex size-[16px] -translate-y-1/2 items-center justify-center rounded-full bg-white/80">
                <ChevronRight className="size-[9px]" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-[4px] grid grid-cols-4 gap-[4px]">
              {([0, 3, 1, 2] as const).map((k, i) => (
                <div key={k} className="overflow-hidden rounded-[4px]" style={{ boxShadow: i === 0 ? `0 0 0 1.5px ${tint}` : undefined }}>
                  <ProjectArt kind={k} w={62} h={24} tint={tint} />
                </div>
              ))}
            </div>
            <p className="mt-[8px] font-serif text-[16px] leading-none">Marina Crest</p>
            <p className="mt-[3px] text-[8px] text-black/50">Dubai Marina · by Crestline Developments · 212 residences</p>
            <div className="mt-[7px] grid grid-cols-3 overflow-hidden rounded-[7px] bg-white ring-1 ring-black/[0.06]">
              {[
                ["Units", "1–3 BR"],
                ["Sizes", "742–1,610 sq ft"],
                ["From", "AED 1.85M"],
                ["Payment plan", "60 / 40"],
                ["Service charge", "AED 18 / sq ft"],
                ["Est. rent (2 BR)", "AED 165k / yr"],
              ].map(([k, v], i) => (
                <div key={k} className={`px-[7px] py-[5px] ${i < 3 ? "border-b border-black/[0.06]" : ""} ${i % 3 !== 2 ? "border-r border-black/[0.06]" : ""}`}>
                  <p className="text-[6.5px] uppercase tracking-[0.08em] text-black/40">{k}</p>
                  <p className="truncate text-[8.5px] font-semibold">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-[7px]">
              <p className="flex justify-between text-[7.5px]">
                <span className="font-semibold">Payment plan</span>
                <span className="text-black/45">Construction 38% complete</span>
              </p>
              <div className="mt-[4px] flex h-[6px] gap-[2px] overflow-hidden rounded-full">
                <span style={{ flex: 10, background: tint }} />
                <span style={{ flex: 50, background: tint, opacity: 0.55 }} />
                <span style={{ flex: 40, background: tint, opacity: 0.22 }} />
              </div>
              <div className="mt-[3px] flex text-[6.5px] text-black/50">
                <span style={{ flex: 10 }}>10%</span>
                <span style={{ flex: 50 }}>50% during construction</span>
                <span style={{ flex: 40 }}>40% on handover</span>
              </div>
            </div>
            <div className="mt-auto flex gap-[6px]">
              <span className="flex h-[24px] flex-1 items-center justify-center gap-[4px] rounded-full text-[8.5px] font-semibold text-white" style={{ background: INK }}>
                <Download className="size-[9px]" aria-hidden="true" />
                Brochure &amp; floor plans
              </span>
              <span className="flex h-[24px] flex-1 items-center justify-center gap-[4px] rounded-full bg-[#25d366] text-[8.5px] font-semibold text-white">
                <MessageCircle className="size-[9px]" aria-hidden="true" />
                WhatsApp an adviser
              </span>
            </div>
          </div>
          {/* calculator */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] bg-white ring-1 ring-black/[0.07]">
            <div className="flex h-[30px] shrink-0 items-center gap-[6px] border-b border-black/[0.06] px-[10px]">
              <span className="flex size-[18px] items-center justify-center rounded-[5px] text-white" style={{ background: tint }}>
                <Calculator className="size-[10px]" aria-hidden="true" />
              </span>
              <span className="text-[10.5px] font-semibold">ROI calculator</span>
              <span className="ml-auto">
                <Segments items={["AED", "GBP", "EUR", "INR"]} active={0} tint={tint} />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-[14px] gap-y-[5px] px-[10px] pt-[7px]">
              <div>
                <p className="text-[8px] text-black/55">Unit type</p>
                <div className="mt-[3px] flex gap-[3px]">
                  {["1 BR", "2 BR", "3 BR"].map((u, i) => (
                    <span key={u} className={`flex h-[20px] flex-1 items-center justify-center rounded-[5px] text-[8px] font-semibold ${i === 1 ? "text-white" : "text-black/60 ring-1 ring-black/10"}`} style={i === 1 ? { background: tint } : undefined}>
                      {u}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[8px] text-black/55">Financing</p>
                <div className="mt-[3px] flex gap-[3px]">
                  {["Cash", "Mortgage 50%"].map((u, i) => (
                    <span key={u} className={`flex h-[20px] flex-1 items-center justify-center rounded-[5px] text-[8px] font-semibold ${i === 0 ? "text-white" : "text-black/60 ring-1 ring-black/10"}`} style={i === 0 ? { background: tint } : undefined}>
                      {u}
                    </span>
                  ))}
                </div>
              </div>
              <Slider tint={tint} label="Purchase price" value="AED 2,450,000" pct={46} lo="1.85M" hi="3.20M" />
              <Slider tint={tint} label="Annual rent" value="AED 165,000" pct={58} lo="120k" hi="200k" />
              <Slider tint={tint} label="Capital growth / yr" value="4.0%" pct={40} lo="0%" hi="10%" />
              <Slider tint={tint} label="Hold period" value="5 years" pct={40} lo="1 yr" hi="10 yrs" />
            </div>
            <div className="mx-[10px] mt-[6px] grid grid-cols-3 gap-[6px]">
              {[
                ["Gross yield", "6.7%", "AED 165k / yr"],
                ["Net yield", "5.5%", "after fees & charges"],
                ["5-yr total return", "AED 1.10M", "+44.9% on price"],
              ].map(([k, v, s], i) => (
                <div key={k} className="rounded-[7px] px-[8px] py-[4px]" style={i === 2 ? { background: tint, color: "#fff" } : { background: `color-mix(in oklab, ${tint} 7%, white)` }}>
                  <p className={`text-[7.5px] ${i === 2 ? "text-white/75" : "text-black/50"}`}>{k}</p>
                  <p className="text-[13px] font-bold leading-[1.15] tracking-[-0.02em]">{v}</p>
                  <p className={`truncate text-[6.5px] ${i === 2 ? "text-white/70" : "text-black/40"}`}>{s}</p>
                </div>
              ))}
            </div>
            <div className="mx-[10px] mt-[6px] flex items-center justify-between">
              <span className="text-[8.5px] font-semibold">Cumulative return, AED k</span>
              <Legend items={[{ label: "Net rent", color: tint }, { label: "Capital growth", color: soft }]} />
            </div>
            <div className="mx-[10px] mt-[4px] flex items-end gap-[10px]">
              <BarChart w={206} h={60} bars={ROI_YEARS} colors={[tint, soft]} max={1200} labels={["Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"]} yFormat={(n) => `${n}`} gap={0.45} highlight={4} />
              <div className="mb-[10px] min-w-0 flex-1 space-y-[2px] text-[7.5px]">
                {[
                  ["Net rent (5 yrs)", "+671k"],
                  ["Capital growth", "+531k"],
                  ["DLD fee 4% + costs", "−102k"],
                ].map(([k, v]) => (
                  <p key={k} className="flex justify-between gap-[4px] whitespace-nowrap">
                    <span className="text-black/50">{k}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </p>
                ))}
                <p className="flex justify-between border-t border-black/[0.08] pt-[3px] text-[8px] font-bold">
                  <span>Total</span>
                  <span style={{ color: tint }}>AED 1.10M</span>
                </p>
              </div>
            </div>
            <p className="mt-auto truncate border-t border-black/[0.06] bg-black/[0.02] px-[10px] py-[4px] text-[6.5px] text-black/40">Illustrative estimate from Q3 2026 Dubai Marina rents · not financial advice · FX rates updated daily</p>
          </div>
        </div>
      </div>
    </Browser>
  );
};

/* 03 · CRM pipeline (HubSpot deals board) --------------------------- */

const HS_NAVY = "#213343";
const HS_LINK = "#0091ae";
const HS_LINE = "#cbd6e2";
const SYS = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

type Deal = { name: string; amount: string; close: string; score: number; mk: string; when: string; owner: string; i: number };

const COLS: { stage: string; n: number; total: string; deals: Deal[] }[] = [
  {
    stage: "New enquiry",
    n: 31,
    total: "AED 58,215,000",
    deals: [
      { name: "James Whitfield – Marina Crest", amount: "AED 2,500,000", close: "31/12/2026", score: 72, mk: "UK", when: "0–3 months", owner: "RK", i: 1 },
      { name: "Priya Raman – 2BR off-plan", amount: "AED 1,750,000", close: "31/03/2027", score: 64, mk: "India", when: "3–6 months", owner: "AM", i: 4 },
      { name: "Tobias Krüger – Hills Park", amount: "AED 3,400,000", close: "30/06/2027", score: 58, mk: "Germany", when: "6–12 months", owner: "RK", i: 1 },
      { name: "Hamza Siddiqui", amount: "AED 1,200,000", close: "31/03/2027", score: 41, mk: "UAE", when: "Not sure", owner: "AM", i: 4 },
    ],
  },
  {
    stage: "Qualified",
    n: 19,
    total: "AED 52,380,000",
    deals: [
      { name: "Anika Sharma – Palm Vista 3BR", amount: "AED 4,600,000", close: "15/11/2026", score: 88, mk: "India", when: "0–3 months", owner: "RK", i: 1 },
      { name: "Daniel Hughes – Creek Horizon", amount: "AED 2,500,000", close: "30/11/2026", score: 84, mk: "UK", when: "0–3 months", owner: "AM", i: 4 },
      { name: "Katharina Vogel", amount: "AED 7,000,000", close: "31/01/2027", score: 81, mk: "Germany", when: "3–6 months", owner: "RK", i: 1 },
      { name: "Marco Bianchi – Marina Crest", amount: "AED 1,850,000", close: "31/01/2027", score: 69, mk: "Italy", when: "3–6 months", owner: "AM", i: 4 },
    ],
  },
  {
    stage: "Viewing booked",
    n: 12,
    total: "AED 29,580,000",
    deals: [
      { name: "Rohan Mehta – Palm Vista 3BR", amount: "AED 9,800,000", close: "31/10/2026", score: 94, mk: "India", when: "Thu 2 Oct, 11:00", owner: "RK", i: 1 },
      { name: "Emma Clarke – Hills Park 4BR", amount: "AED 3,200,000", close: "30/11/2026", score: 90, mk: "UK", when: "Sat 4 Oct, 10:30", owner: "AM", i: 4 },
      { name: "Stefan Braun – Palm Vista 2BR", amount: "AED 5,000,000", close: "30/11/2026", score: 86, mk: "Germany", when: "Fri 3 Oct, video", owner: "RK", i: 1 },
    ],
  },
  {
    stage: "Offer / reserved",
    n: 4,
    total: "AED 8,420,000",
    deals: [
      { name: "Vikram Nair – Marina Crest 2BR", amount: "AED 2,450,000", close: "10/10/2026", score: 97, mk: "India", when: "Reservation paid", owner: "RK", i: 1 },
      { name: "Oliver Grant – Creek Horizon 1BR", amount: "AED 1,420,000", close: "17/10/2026", score: 91, mk: "UK", when: "Offer sent 26 Sep", owner: "AM", i: 4 },
      { name: "Camille Roux – Creek Horizon", amount: "AED 950,000", close: "24/10/2026", score: 89, mk: "France", when: "SPA with lawyer", owner: "AM", i: 4 },
    ],
  },
];

function HsIcon({ children }: { children: ReactNode }) {
  return <span className="flex size-[16px] items-center justify-center rounded-[3px] text-white/75">{children}</span>;
}

export const CrmPipeline: Screen = () => (
  <Browser w={640} h={400} url="app-eu1.hubspot.com/contacts/144983921/objects/0-3/views/all/board">
    <div className="flex h-full flex-col bg-white text-[#33475b]" style={SYS}>
      <div className="flex h-[24px] shrink-0 items-center gap-[8px] px-[10px]" style={{ background: HS_NAVY }}>
        <span className="flex size-[12px] items-center justify-center rounded-full bg-[#ff5c35] text-[7px] font-bold text-white">h</span>
        <span className="flex h-[15px] w-[180px] items-center rounded-[3px] bg-white/10 px-[6px] text-[7px] text-white/55">Search HubSpot</span>
        <span className="ml-auto flex items-center gap-[4px]">
          <HsIcon>
            <MessageCircle className="size-[9px]" aria-hidden="true" />
          </HsIcon>
          <HsIcon>
            <CalendarCheck className="size-[9px]" aria-hidden="true" />
          </HsIcon>
          <span className="ml-[2px] flex items-center gap-[4px] text-[7px] text-white/80">
            <span className="flex size-[14px] items-center justify-center rounded-full bg-[#ffbcac] text-[6px] font-bold text-[#7a2a14]">RK</span>
            La Boutique Real Estate
          </span>
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[26px] shrink-0 flex-col items-center gap-[6px] pt-[8px]" style={{ background: HS_NAVY }}>
          {[LayoutDashboard, Users, Kanban, Megaphone, ChartColumn].map((I, k) => (
            <span key={k} className={`flex size-[18px] items-center justify-center rounded-[3px] ${k === 2 ? "bg-white/15 text-white" : "text-white/55"}`}>
              <I className="size-[10px]" aria-hidden="true" />
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center gap-[6px] px-[12px] pt-[8px]">
            <span className="text-[13px] font-semibold text-[#2e3f50]">Deals</span>
            <span className="flex items-center gap-[2px] text-[8px] font-semibold" style={{ color: HS_LINK }}>
              Buyer pipeline
              <ChevronRight className="size-[8px] rotate-90" aria-hidden="true" />
            </span>
            <span className="ml-auto rounded-[3px] px-[7px] py-[3px] text-[7.5px] font-semibold ring-1" style={{ color: HS_LINK, boxShadow: `inset 0 0 0 1px ${HS_LINE}` }}>
              Import
            </span>
            <span className="rounded-[3px] bg-[#ff5c35] px-[7px] py-[3px] text-[7.5px] font-semibold text-white">Create deal</span>
          </div>
          <div className="mt-[6px] flex shrink-0 items-end gap-[1px] border-b px-[12px] text-[7.5px]" style={{ borderColor: HS_LINE }}>
            {["All deals", "My deals", "Viewings this week", "UK + DE investors"].map((t, k) => (
              <span key={t} className={`rounded-t-[3px] px-[8px] py-[4px] ${k === 0 ? "border border-b-white bg-white font-semibold text-[#2e3f50]" : "text-[#516f90]"}`} style={k === 0 ? { borderColor: HS_LINE, marginBottom: -1 } : undefined}>
                {t}
              </span>
            ))}
            <span className="px-[6px] py-[4px]" style={{ color: HS_LINK }}>
              + Add view
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-[10px] px-[12px] py-[5px] text-[7.5px] font-semibold" style={{ color: HS_LINK }}>
            {["Deal owner", "Create date", "Last activity date", "Market"].map((f) => (
              <span key={f} className="flex items-center gap-[2px]">
                {f}
                <ChevronRight className="size-[7px] rotate-90" aria-hidden="true" />
              </span>
            ))}
            <span>Advanced filters (1)</span>
            <span className="ml-auto font-normal text-[#7c98b6]">66 deals</span>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-4 gap-[6px] px-[12px]">
            {COLS.map((c) => (
              <div key={c.stage} className="flex min-h-0 min-w-0 flex-col rounded-t-[3px] border border-b-0 bg-[#f5f8fa]" style={{ borderColor: HS_LINE }}>
                <div className="flex items-center gap-[4px] border-b bg-white px-[6px] py-[4px] text-[7px] font-semibold uppercase tracking-[0.03em] text-[#33475b]" style={{ borderColor: HS_LINE }}>
                  <span className="truncate">{c.stage}</span>
                  <span className="font-normal text-[#7c98b6]">{c.n}</span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-[4px] overflow-hidden p-[4px]">
                  {c.deals.map((d) => (
                    <div key={d.name} className="shrink-0 rounded-[3px] border bg-white px-[6px] py-[4px] text-[7px] leading-[1.45]" style={{ borderColor: HS_LINE }}>
                      <p className="truncate text-[7.5px] font-semibold" style={{ color: HS_LINK }}>
                        {d.name}
                      </p>
                      <p>
                        <span className="text-[#7c98b6]">Amount: </span>
                        {d.amount}
                      </p>
                      <p>
                        <span className="text-[#7c98b6]">Close date: </span>
                        {d.close}
                      </p>
                      <p className="truncate">
                        <span className="text-[#7c98b6]">Lead score: </span>
                        {d.score} · {d.mk} · {d.when}
                      </p>
                      <div className="mt-[2px] flex items-center justify-between border-t border-[#eaf0f6] pt-[2px]">
                        <span className="flex size-[11px] items-center justify-center rounded-full text-[5px] font-bold" style={{ background: d.i === 1 ? "#ffbcac" : "#b3e5f0", color: "#2e3f50" }}>
                          {d.owner}
                        </span>
                        <span className="flex gap-[4px] text-[#7c98b6]">
                          <MessageCircle className="size-[7px]" aria-hidden="true" />
                          <CalendarCheck className="size-[7px]" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="shrink-0 border-t bg-white px-[6px] py-[3px] text-[6.5px] text-[#516f90]" style={{ borderColor: HS_LINE }}>
                  Total amount: <b className="font-semibold text-[#33475b]">{c.total}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

const MKT: Record<string, string> = { GB: "#1d4ed8", DE: "#b45309", IN: "#0f766e", AE: "#6d28d9", FR: "#be185d" };

function Market({ c }: { c: string }) {
  return (
    <span className="inline-flex h-[12px] items-center rounded-[3px] px-[3px] font-mono text-[6.5px] font-bold leading-none text-white" style={{ background: MKT[c] }}>
      {c}
    </span>
  );
}

/* 04 · Weekly principal report (one page) --------------------------- */

function Section({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="border-b border-black/[0.08] pb-[3px] text-[7px] font-bold uppercase tracking-[0.12em] text-black/45">{title}</p>
      <div className="pt-[5px]">{children}</div>
    </div>
  );
}

const WEEKS = [14, 17, 16, 21, 19, 22, 24, 23, 26, 25, 24, 31];
const WEEKS_Q = [3, 4, 5, 9, 10, 12, 14, 14, 16, 15, 15, 19];

export const PrincipalReport: Screen = ({ tint }) => {
  const soft = `color-mix(in oklab, ${tint} 28%, white)`;
  return (
    <Browser w={640} h={400} url={`reports.${SITE}/principal/2026-W39.pdf`}>
      <div className="flex h-full flex-col bg-[#525659]">
        <div className="flex h-[26px] shrink-0 items-center gap-[10px] bg-[#323639] px-[12px] text-[8.5px] text-white/80">
          <FileText className="size-[10px]" aria-hidden="true" />
          <span className="font-medium">LaBoutique_Principal_Report_2026-W39.pdf</span>
          <span className="ml-auto flex items-center gap-[8px]">
            <span className="rounded-[3px] bg-black/30 px-[5px] py-[1px] tabular-nums">1</span>
            <span className="text-white/50">/ 1</span>
            <span className="h-[12px] w-px bg-white/20" />
            <ZoomOut className="size-[10px]" aria-hidden="true" />
            <span className="rounded-[3px] bg-black/30 px-[5px] py-[1px]">100%</span>
            <ZoomIn className="size-[10px]" aria-hidden="true" />
            <span className="h-[12px] w-px bg-white/20" />
            <Download className="size-[10px]" aria-hidden="true" />
            <Printer className="size-[10px]" aria-hidden="true" />
          </span>
        </div>
        <div className="mx-auto mt-[9px] flex h-[332px] w-[576px] flex-col bg-white px-[18px] pb-[10px] pt-[14px] text-[#1c1917] shadow-[0_6px_24px_rgb(0_0_0/0.45)]">
          {/* header */}
          <div className="flex items-start gap-[10px] border-b-2 pb-[8px]" style={{ borderColor: tint }}>
            <Wordmark h={30} />
            <div className="ml-[8px] leading-tight">
              <p className="font-serif text-[14px]">Weekly principal report</p>
              <p className="text-[7.5px] text-black/50">Week 39 · 22–28 Sep 2026 · sent Mon 29 Sep, 07:00 GST</p>
            </div>
            <span className="ml-auto rounded-[3px] px-[5px] py-[2px] text-[6.5px] font-bold uppercase tracking-[0.12em]" style={{ background: `color-mix(in oklab, ${tint} 10%, white)`, color: tint }}>
              Confidential · principals only
            </span>
          </div>
          {/* kpis */}
          <div className="mt-[8px] grid grid-cols-5 gap-[6px]">
            {[
              ["New leads", "31", "▲ 7 vs W38", true],
              ["Qualified", "61%", "19 of 31 leads", true],
              ["Viewings booked", "12", "▲ 3 vs W38", true],
              ["Pipeline value", "AED 38.0M", "▲ AED 2.4M", true],
              ["Closed to date", "11 deals", "1 this week", true],
            ].map(([k, v, d], i) => (
              <div key={k as string} className={`px-[7px] py-[3px] ${i ? "border-l border-black/[0.1]" : ""}`}>
                <p className="text-[7px] text-black/50">{k}</p>
                <p className="text-[13px] font-semibold leading-[1.25] tracking-[-0.02em]">{v}</p>
                <p className="text-[6.5px] text-black/50">{d}</p>
              </div>
            ))}
          </div>
          {/* middle */}
          <div className="mt-[9px] grid grid-cols-[1fr_1fr_1.25fr] gap-[14px]">
            <Section title="Leads by market">
              {[
                ["UK", 11, "#1d4ed8"],
                ["India", 9, "#0f766e"],
                ["Germany", 7, "#b45309"],
                ["UAE", 3, "#6d28d9"],
                ["Other", 1, "#a1a1aa"],
              ].map(([k, n, c]) => (
                <div key={k as string} className="flex h-[12px] items-center gap-[5px] text-[7.5px]">
                  <span className="w-[34px] text-black/60">{k}</span>
                  <span className="h-[5px] rounded-full" style={{ width: (n as number) * 7, background: c as string }} />
                  <span className="font-semibold tabular-nums">{n}</span>
                </div>
              ))}
            </Section>
            <Section title="Deals by stage (AED)">
              {[
                ["New (budgets)", "58.2M", 100],
                ["Qualified (budgets)", "52.4M", 90],
                ["Viewing booked", "29.6M", 51],
                ["Offer / reserved", "8.4M", 14],
              ].map(([k, v, p], i) => (
                <div key={k as string} className="mb-[3px]">
                  <div className="flex justify-between text-[7.5px]">
                    <span className="text-black/60">{k}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </div>
                  <span className="mt-[1px] block h-[4px] rounded-full bg-black/[0.06]">
                    <span className="block h-full rounded-full" style={{ width: `${p}%`, background: tint, opacity: 0.4 + i * 0.2 }} />
                  </span>
                </div>
              ))}
            </Section>
            <Section title="Leads per week · last 12 weeks">
              <BarChart w={176} h={58} bars={WEEKS.map((t, i) => [WEEKS_Q[i], t - WEEKS_Q[i]])} colors={[tint, soft]} max={32} labels={["W28", "", "", "", "", "W33", "", "", "", "", "", "W39"]} gap={0.3} highlight={11} />
              <div className="mt-[3px]">
                <Legend items={[{ label: "Qualified", color: tint }, { label: "Unqualified", color: soft }]} />
              </div>
            </Section>
          </div>
          {/* bottom */}
          <div className="mt-[9px] grid min-h-0 flex-1 grid-cols-[1.35fr_1fr] gap-[14px]">
            <Section title="Top opportunities">
              {[
                ["Rohan Mehta", "IN", "Palm Vista 3 BR", "AED 9.8M", "Viewing Thu", "blue"],
                ["Stefan Braun", "DE", "Palm Vista 2 BR", "AED 5.0M", "Video tour Fri", "blue"],
                ["Arjun Kapoor", "IN", "Hills Park 3 BR", "AED 3.58M", "Offer countered", "amber"],
                ["Vikram Nair", "IN", "Marina Crest 2 BR", "AED 2.45M", "Reserved", "green"],
              ].map(([n, m, p, v, s, tn]) => (
                <div key={n} className="flex h-[17px] items-center gap-[5px] border-b border-black/[0.05] text-[7.5px] last:border-b-0">
                  <Market c={m} />
                  <span className="w-[74px] truncate font-semibold">{n}</span>
                  <span className="min-w-0 flex-1 truncate text-black/55">{p}</span>
                  <span className="w-[46px] text-right font-semibold tabular-nums">{v}</span>
                  <span className="flex w-[64px] justify-end">
                    <Pill tone={tn as "amber"} size={6.5}>
                      {s}
                    </Pill>
                  </span>
                </div>
              ))}
            </Section>
            <Section title="Highlights & decisions">
              <ul className="space-y-[3px] text-[7.5px] leading-[1.35]">
                <li className="flex gap-[4px]">
                  <Star className="mt-[1px] size-[7px] shrink-0 fill-[#f5a524] text-[#f5a524]" aria-hidden="true" />
                  <span>
                    Google rating <b>4.9★</b>, +6 reviews (128 total)
                  </span>
                </li>
                <li className="flex gap-[4px]">
                  <span className="mt-[3px] size-[4px] shrink-0 rounded-full" style={{ background: tint }} />
                  <span>
                    Cost per qualified lead <b>AED 410</b>, down 12%
                  </span>
                </li>
                <li className="flex gap-[4px]">
                  <span className="mt-[3px] size-[4px] shrink-0 rounded-full" style={{ background: tint }} />
                  <span>India campaign now 29% of qualified leads</span>
                </li>
                <li className="flex gap-[4px] rounded-[4px] px-[4px] py-[2px]" style={{ background: TONES.amber.bg, color: TONES.amber.fg }}>
                  <span className="font-bold">Decision:</span>
                  <span>approve Hills Park launch budget (AED 45k)</span>
                </li>
              </ul>
            </Section>
          </div>
          <div className="mt-[4px] flex items-center justify-between border-t border-black/[0.06] pt-[4px] text-[6.5px] text-black/35">
            <span>Source: HubSpot, Google Ads, Meta Ads, Google Business Profile · auto-generated</span>
            <span className="flex items-center gap-[6px]">
              <span>Pipeline = viewing + offer stages · 412 qualified leads since launch</span>
              <span>Page 1 of 1</span>
            </span>
          </div>
        </div>
      </div>
    </Browser>
  );
};

const onBrand = (S: Screen): Screen => {
  const Branded: Screen = () => <S tint={BRAND_GREEN} />;
  return Branded;
};

export const propertyBrandScreens: Screen[] = [HomePage, RoiCalculator, CrmPipeline, PrincipalReport].map(onBrand);

