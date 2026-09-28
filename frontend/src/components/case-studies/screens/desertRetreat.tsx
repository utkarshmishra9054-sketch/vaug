import type { ReactNode } from "react";
import {
  Archive,
  Bath,
  BedDouble,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid3x3,
  Heart,
  Inbox,
  Mail,
  Menu,
  Mic,
  MoreVertical,
  Pencil,
  Phone as PhoneIcon,
  Plus,
  Printer,
  Reply,
  Ruler,
  Search,
  Send,
  Settings,
  Star,
  Trash2,
  Users,
  Video,
} from "lucide-react";

import { Browser, type Screen } from "./kit";
import { Photo } from "./tools";

/* Boutique desert retreat · Ras Al Khaimah (RAK Glamping, 24 villas) */

const SITE = "rakglamping.com";
const LOGO = { src: "/logos/rak-glamping.webp", img: { w: 122, h: 120 } };
const INK = "#2a1a10";

/* ------------------------------------------------------------------ */
/* Photography stand-ins: dunes in late light, villa exteriors          */
/* ------------------------------------------------------------------ */

/** Dune landscape with lit and shaded faces. `id` keeps gradient ids unique. */
function DunePhoto({ w, h, id, villa = true, dusk = false }: { w: number; h: number; id: string; villa?: boolean; dusk?: boolean }) {
  const y = (f: number) => Math.round(h * f);
  const x = (f: number) => Math.round(w * f);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 block" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={dusk ? "#6d7f99" : "#9fb4c4"} />
          <stop offset="0.55" stopColor={dusk ? "#d9a78a" : "#e6d2bb"} />
          <stop offset="1" stopColor={dusk ? "#eec39a" : "#efdcc4"} />
        </linearGradient>
        <linearGradient id={`${id}-lit`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#e7b27c" />
          <stop offset="1" stopColor="#c98a55" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#9a6038" />
          <stop offset="1" stopColor="#7d4a2a" />
        </linearGradient>
        <linearGradient id={`${id}-fg`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d9a06b" />
          <stop offset="1" stopColor="#b47744" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-sky)`} />
      {/* far range */}
      <path d={`M0 ${y(0.52)} C${x(0.12)} ${y(0.47)} ${x(0.22)} ${y(0.5)} ${x(0.34)} ${y(0.46)} S${x(0.62)} ${y(0.5)} ${x(0.78)} ${y(0.45)} S${x(0.95)} ${y(0.49)} ${w} ${y(0.47)} V${h} H0 Z`} fill="#d7b393" opacity="0.8" />
      {/* mid dune: lit face then shaded face */}
      <path d={`M0 ${y(0.66)} C${x(0.1)} ${y(0.58)} ${x(0.2)} ${y(0.55)} ${x(0.31)} ${y(0.53)} L${x(0.31)} ${y(0.53)} C${x(0.4)} ${y(0.6)} ${x(0.5)} ${y(0.64)} ${x(0.62)} ${y(0.66)} V${h} H0 Z`} fill={`url(#${id}-lit)`} />
      <path d={`M${x(0.62)} ${y(0.66)} C${x(0.72)} ${y(0.6)} ${x(0.84)} ${y(0.55)} ${w} ${y(0.57)} V${h} H${x(0.62)} Z`} fill={`url(#${id}-lit)`} opacity="0.9" />
      <path d={`M${x(0.31)} ${y(0.53)} C${x(0.4)} ${y(0.6)} ${x(0.5)} ${y(0.64)} ${x(0.62)} ${y(0.66)} C${x(0.56)} ${y(0.72)} ${x(0.46)} ${y(0.78)} ${x(0.4)} ${y(0.84)} C${x(0.38)} ${y(0.72)} ${x(0.35)} ${y(0.6)} ${x(0.31)} ${y(0.53)} Z`} fill={`url(#${id}-shade)`} opacity="0.75" />
      {villa && (
        <g>
          {[0.56, 0.68, 0.8].map((f, i) => (
            <g key={f}>
              <rect x={x(f)} y={y(0.6 + i * 0.012)} width={x(0.085)} height={y(0.07)} fill="#e9d6bb" />
              <rect x={x(f)} y={y(0.6 + i * 0.012)} width={x(0.085)} height={Math.max(2, y(0.008))} fill="#c9ab86" />
              <rect x={x(f + 0.012)} y={y(0.625 + i * 0.012)} width={x(0.03)} height={y(0.035)} fill={dusk ? "#f5c77e" : "#6b5440"} opacity="0.85" />
              <rect x={x(f + 0.05)} y={y(0.625 + i * 0.012)} width={x(0.022)} height={y(0.035)} fill={dusk ? "#f5c77e" : "#6b5440"} opacity="0.7" />
            </g>
          ))}
          <rect x={x(0.57)} y={y(0.705)} width={x(0.3)} height={y(0.016)} fill={dusk ? "#8fb9c0" : "#7fb3bd"} />
        </g>
      )}
      {/* foreground dune with ripples */}
      <path d={`M0 ${y(0.8)} C${x(0.2)} ${y(0.74)} ${x(0.45)} ${y(0.79)} ${x(0.7)} ${y(0.76)} S${x(0.9)} ${y(0.78)} ${w} ${y(0.75)} V${h} H0 Z`} fill={`url(#${id}-fg)`} />
      <g stroke="#9c6538" strokeOpacity="0.25" fill="none" strokeWidth="0.8">
        {[0.84, 0.88, 0.92, 0.96].map((f, i) => (
          <path key={f} d={`M${x(0.05 + i * 0.03)} ${y(f)} C${x(0.3)} ${y(f - 0.02)} ${x(0.55)} ${y(f + 0.01)} ${x(0.9)} ${y(f - 0.015)}`} />
        ))}
      </g>
    </svg>
  );
}

/** The real RAK Glamping badge plus its name. */
function Brand({ light = false, size = 13 }: { light?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-[6px]" style={{ color: light ? "#fff" : INK }}>
      <Badge size={Math.round(size * 1.9)} />
      <span className="font-serif leading-none tracking-[0.08em]" style={{ fontSize: size }}>
        RAK Glamping
      </span>
    </span>
  );
}

/** Round logo badge, e.g. for a WhatsApp or Gmail avatar. */
function Badge({ size = 20 }: { size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white" style={{ width: size, height: size }}>
      <Photo {...LOGO} w={size} h={size} />
    </span>
  );
}

/* 01 · Direct-booking home page ------------------------------------- */

const VILLAS = [
  { name: "Dune Pool Villa", meta: "1 bedroom · 85 m² · private pool", from: "2,450", count: 14 },
  { name: "Oasis Family Villa", meta: "2 bedrooms · 140 m² · sleeps 5", from: "3,900", count: 8 },
  { name: "Hajar Residence", meta: "3 bedrooms · 220 m² · butler", from: "6,800", count: 2 },
];

export const RetreatHome: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${SITE}/en`}>
    <div className="flex h-full flex-col bg-[#faf7f2] text-[#2a1a10]">
      <div className="relative h-[232px] shrink-0 overflow-hidden">
        <DunePhoto w={640} h={232} id="home" dusk />
        <span className="absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-black/35 to-transparent" />
        <div className="relative flex h-[34px] items-center gap-[14px] px-[18px] text-[7.5px] text-white/90">
          <Brand light />
          <span className="ml-[14px] flex gap-[13px]">
            {["Villas", "Experiences", "Dining", "Spa", "Offers", "Getting here"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
          <span className="ml-auto">EN · عربي</span>
          <span className="flex items-center gap-[2px]">
            AED
            <ChevronDown className="size-[7px]" aria-hidden="true" />
          </span>
          <span className="border border-white/80 px-[10px] py-[4px] text-[7.5px] font-semibold">Book now</span>
        </div>
        <div className="relative px-[34px] pt-[28px] text-white">
          <p className="text-[7px] tracking-[0.2em] text-white/85">RAS AL KHAIMAH · 60 MINUTES FROM DUBAI</p>
          <p className="mt-[6px] font-serif text-[26px] leading-[1.05] [text-shadow:0_1px_8px_rgb(0_0_0/0.25)]">
            Twenty-four villas
            <br />
            at the edge of the desert
          </p>
        </div>
        {/* booking bar */}
        <div className="absolute inset-x-[34px] bottom-[14px] flex h-[40px] items-stretch bg-white text-[7px] shadow-[0_4px_14px_rgb(0_0_0/0.18)]">
          {[
            ["Arrive", "Thu, 12 Feb 2026"],
            ["Depart", "Sun, 15 Feb 2026"],
            ["Guests", "2 adults, 0 children"],
            ["Promo code", "Optional"],
          ].map(([k, v], i) => (
            <span key={k} className="flex flex-1 flex-col justify-center border-r border-black/[0.08] px-[10px] leading-[1.35]">
              <span className="text-[6px] uppercase tracking-[0.12em] text-black/45">{k}</span>
              <span className={i === 3 ? "text-black/35" : "font-medium"}>{v}</span>
            </span>
          ))}
          <span className="flex w-[118px] items-center justify-center text-[8px] font-semibold text-white" style={{ background: tint }}>
            Check availability
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[18px] border-b border-black/[0.07] py-[7px] text-[7px] text-black/60">
        <span>Best rate when you book here</span>
        <span className="text-black/20">|</span>
        <span>Late check-out until 14:00</span>
        <span className="text-black/20">|</span>
        <span>Free cancellation up to 7 days before</span>
        <span className="text-black/20">|</span>
        <span className="flex items-center gap-[3px]">
          <Star className="size-[7px] fill-current" strokeWidth={0} aria-hidden="true" />
          4.8 · 312 reviews
        </span>
      </div>
      <div className="flex items-baseline justify-between px-[34px] pt-[12px]">
        <p className="font-serif text-[14px]">The villas</p>
        <p className="text-[7px] underline underline-offset-2">Compare all villas</p>
      </div>
      <div className="grid grid-cols-3 gap-[12px] px-[34px] pt-[8px]">
        {VILLAS.map((v, i) => (
          <div key={v.name}>
            <div className="relative h-[70px] overflow-hidden">
              {i === 0 && <PoolPhoto />}
              {i === 1 && <RoomPhoto />}
              {i === 2 && <DunePhoto w={180} h={70} id="hv2" dusk />}
              <Heart className="absolute right-[5px] top-[5px] size-[8px] text-white" aria-hidden="true" />
            </div>
            <p className="mt-[5px] font-serif text-[10px]">{v.name}</p>
            <p className="text-[6.5px] text-black/50">{v.meta}</p>
          </div>
        ))}
      </div>
    </div>
  </Browser>
);

function PoolPhoto() {
  return (
    <svg viewBox="0 0 90 64" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <rect width="90" height="64" fill="#e8c9a3" />
      <rect x="0" y="0" width="90" height="22" fill="#c9d6dc" />
      <path d="M0 22 Q30 16 60 21 T90 19 V30 H0Z" fill="#d6a978" />
      <rect x="0" y="34" width="90" height="30" fill="#79b6c0" />
      <rect x="0" y="30" width="90" height="5" fill="#d8b893" />
      <path d="M0 50 Q45 46 90 52 M0 58 Q40 55 90 59" stroke="#a9d4da" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function RoomPhoto() {
  return (
    <svg viewBox="0 0 90 64" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <rect width="90" height="64" fill="#efe4d6" />
      <rect x="0" y="42" width="90" height="22" fill="#d9c7b0" />
      <rect x="54" y="8" width="32" height="34" fill="#c7d9e0" />
      <path d="M54 30 Q70 24 86 29 V42 H54Z" fill="#d9ad7c" />
      <rect x="8" y="30" width="40" height="15" fill="#fbf7f1" />
      <rect x="8" y="25" width="40" height="7" fill="#e6d8c5" />
      <rect x="12" y="27" width="10" height="5" rx="1" fill="#fff" />
      <rect x="26" y="27" width="10" height="5" rx="1" fill="#fff" />
    </svg>
  );
}

/* 02 · Villa page with live availability and pricing ----------------- */

// February 2026: nightly rate in AED, null = sold out. Starts on Sunday 1 Feb.
const FEB: (number | null)[] = [
  2450, 2450, 2450, 2450, 2650, 2850, 2850, 2450, 2450, 2450, 2450, 2650, 3200, 3450, 2850, 2450, 2450, null, null, 2650, 2850, 2850, 2450, 2450, 2450, 2450, 2650, 2850,
];

export const VillaPage: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${SITE}/en/villas/dune-pool-villa?arrive=2026-02-12&nights=3`}>
    <div className="flex h-full flex-col bg-white text-[#2a1a10]">
      <div className="flex h-[30px] shrink-0 items-center gap-[14px] border-b border-black/[0.07] px-[18px] text-[7.5px] text-black/60">
        <Brand size={12} />
        <span className="ml-[14px] flex gap-[13px]">
          {["Villas", "Experiences", "Dining", "Spa", "Offers", "Getting here"].map((l, i) => (
            <span key={l} className={i === 0 ? "font-semibold text-black" : ""}>
              {l}
            </span>
          ))}
        </span>
        <span className="ml-auto">EN · AED</span>
      </div>
      <div className="flex min-h-0 flex-1 gap-[16px] px-[18px] pt-[9px]">
        <div className="min-w-0 flex-1">
          <p className="text-[6.5px] text-black/45">Villas / Dune Pool Villa</p>
          <div className="mt-[5px] grid h-[132px] grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-[3px]">
            <div className="relative row-span-2 overflow-hidden">
              <DunePhoto w={186} h={132} id="vp0" />
            </div>
            <div className="relative overflow-hidden bg-[#e9dccb]">
              <svg viewBox="0 0 90 64" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <rect width="90" height="64" fill="#efe4d6" />
                <rect x="0" y="40" width="90" height="24" fill="#d9c7b0" />
                <rect x="14" y="28" width="52" height="16" fill="#fbf7f1" />
                <rect x="14" y="24" width="52" height="6" fill="#e6d8c5" />
                <rect x="66" y="14" width="18" height="26" fill="#bcd3dc" />
              </svg>
            </div>
            <div className="relative overflow-hidden">
              <svg viewBox="0 0 90 64" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <rect width="90" height="64" fill="#e8c9a3" />
                <rect x="0" y="34" width="90" height="30" fill="#79b6c0" />
                <rect x="0" y="30" width="90" height="5" fill="#d8b893" />
                <path d="M0 50 Q45 46 90 52" stroke="#a9d4da" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="relative overflow-hidden">
              <svg viewBox="0 0 90 64" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <rect width="90" height="64" fill="#f4efe8" />
                <rect x="10" y="20" width="40" height="44" fill="#ffffff" />
                <ellipse cx="30" cy="46" rx="16" ry="7" fill="#eceae6" />
                <rect x="58" y="10" width="26" height="30" fill="#d7e4ea" />
              </svg>
            </div>
            <div className="relative overflow-hidden">
              <DunePhoto w={90} h={64} id="vp4" villa={false} dusk />
              <span className="absolute bottom-[4px] right-[4px] flex items-center gap-[2px] bg-white px-[4px] py-[1.5px] text-[6px] font-medium">
                <Grid3x3 className="size-[6px]" aria-hidden="true" />
                All 23 photos
              </span>
            </div>
          </div>
          <p className="mt-[9px] font-serif text-[17px] leading-none">Dune Pool Villa</p>
          <p className="mt-[5px] flex gap-[10px] text-[7px] text-black/60">
            <span className="flex items-center gap-[3px]">
              <BedDouble className="size-[8px]" aria-hidden="true" />1 king bed
            </span>
            <span className="flex items-center gap-[3px]">
              <Users className="size-[8px]" aria-hidden="true" />
              Up to 2 adults + 1 child
            </span>
            <span className="flex items-center gap-[3px]">
              <Ruler className="size-[8px]" aria-hidden="true" />
              85 m²
            </span>
            <span className="flex items-center gap-[3px]">
              <Bath className="size-[8px]" aria-hidden="true" />
              Outdoor rain shower
            </span>
          </p>
          <p className="mt-[7px] text-[7.5px] leading-[1.55] text-black/70">
            A single-storey villa facing west over the dunes, with a heated 8-metre plunge pool, a shaded majlis terrace and a fire pit for the evenings. Breakfast is served at the villa or in the courtyard restaurant.
          </p>
          <p className="mt-[6px] text-[7px] text-black/50">14 Dune Pool Villas · check-in 15:00 · check-out 12:00</p>
        </div>

        {/* booking widget */}
        <div className="w-[214px] shrink-0 border border-black/[0.12] px-[10px] py-[9px]">
          <p className="text-[7px] text-black/55">
            From <span className="text-[11px] font-semibold text-black">AED 2,450</span> / night
          </p>
          <div className="mt-[6px] flex items-center justify-between text-[7.5px] font-semibold">
            <ChevronLeft className="size-[8px] text-black/30" aria-hidden="true" />
            February 2026
            <ChevronRight className="size-[8px]" aria-hidden="true" />
          </div>
          <div className="mt-[4px] grid grid-cols-7 text-center text-[5.5px] text-black/40">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-[2px] grid grid-cols-7 gap-y-[1px] text-center">
            {FEB.map((p, i) => {
              const d = i + 1;
              const sel = d >= 12 && d <= 15;
              const edge = d === 12 || d === 15;
              return (
                <span
                  key={d}
                  className={`flex h-[19px] flex-col items-center justify-center leading-[1.1] ${p === null ? "text-black/25 line-through" : ""}`}
                  style={edge ? { background: tint, color: "#fff" } : sel ? { background: `color-mix(in oklab, ${tint} 16%, white)` } : undefined}
                >
                  <span className="text-[6.5px] font-medium">{d}</span>
                  <span className={`text-[4.8px] ${edge ? "text-white/85" : "text-black/40"}`}>{p === null ? "—" : d === 15 ? "" : (p / 1000).toFixed(p % 1000 ? 2 : 1).replace(/0$/, "") + "k"}</span>
                </span>
              );
            })}
          </div>
          <div className="mt-[6px] grid grid-cols-2 border border-black/[0.15] text-[6.5px]">
            <span className="border-r border-black/[0.15] px-[5px] py-[3px] leading-[1.3]">
              <span className="block text-[5.5px] uppercase tracking-[0.08em] text-black/45">Arrive</span>
              Thu 12 Feb
            </span>
            <span className="px-[5px] py-[3px] leading-[1.3]">
              <span className="block text-[5.5px] uppercase tracking-[0.08em] text-black/45">Depart</span>
              Sun 15 Feb
            </span>
          </div>
          <div className="mt-[6px] space-y-[2px] text-[6.5px]">
            {[
              ["12 Feb", "2,650.00"],
              ["13 Feb", "3,200.00"],
              ["14 Feb (Valentine's)", "3,450.00"],
              ["Service charge 10%", "930.00"],
              ["Municipality fee 7%", "651.00"],
              ["VAT 5%", "544.05"],
              ["Tourism Dirham, 3 nights", "45.00"],
            ].map(([k, v], i) => (
              <p key={k} className={`flex justify-between ${i > 2 ? "text-black/50" : ""}`}>
                <span>{k}</span>
                <span className="tabular-nums">{v}</span>
              </p>
            ))}
          </div>
          <p className="mt-[4px] flex justify-between border-t border-black/[0.12] pt-[4px] text-[8px] font-semibold">
            <span>Total</span>
            <span className="tabular-nums">AED 11,470.05</span>
          </p>
          <p className="mt-[1px] text-[6px] text-[#b45309]">Only 2 Dune Pool Villas left for these dates</p>
          <span className="mt-[5px] flex h-[22px] items-center justify-center text-[8px] font-semibold text-white" style={{ background: tint }}>
            Reserve
          </span>
          <p className="mt-[3px] text-center text-[5.5px] text-black/40">Free cancellation until 5 Feb · pay by card, Apple Pay</p>
        </div>
      </div>
    </div>
  </Browser>
);

/* 03 · WhatsApp concierge conversation ------------------------------- */

function Handset({ children, time = "16:24", w = 184, h = 382 }: { children: ReactNode; time?: string; w?: number; h?: number }) {
  return (
    <div className="shrink-0 rounded-[27px] bg-[#16161a] p-[4px] shadow-[0_10px_24px_-12px_rgb(0_0_0/0.45)]" style={{ width: w, height: h }}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] bg-[#efeae2] text-[#111b21]">
        <div className="relative flex h-[20px] shrink-0 items-center justify-between bg-[#f6f5f3] px-[14px] text-[7.5px] font-semibold">
          <span>{time}</span>
          <span className="absolute left-1/2 top-[4px] h-[11px] w-[46px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-[2px]">
            <span className="flex items-end gap-[0.8px]">
              {[3, 4, 5, 6].map((b) => (
                <span key={b} className="w-[1.6px] rounded-[0.5px] bg-current" style={{ height: b }} />
              ))}
            </span>
            <span className="text-[6px]">5G</span>
            <span className="relative ml-[1px] h-[6px] w-[11px] rounded-[1.5px] border border-current/40 p-[0.8px]">
              <span className="block h-full w-[48%] rounded-[0.5px] bg-current" />
            </span>
          </span>
        </div>
        {children}
        <span className="absolute bottom-[4px] left-1/2 h-[3px] w-[52px] -translate-x-1/2 rounded-full bg-black/80" />
      </div>
    </div>
  );
}

function WaHeader({ unread }: { unread: number }) {
  return (
    <div className="flex h-[30px] shrink-0 items-center gap-[5px] border-b border-black/[0.08] bg-[#f6f5f3] px-[6px]">
      <span className="flex items-center text-[#111b21]">
        <ChevronLeft className="size-[11px]" aria-hidden="true" />
        <span className="text-[7.5px]">{unread}</span>
      </span>
      <Badge />
      <span className="min-w-0 flex-1 leading-[1.2]">
        <span className="flex items-center gap-[2px] text-[8px] font-semibold">
          RAK Glamping
          <svg viewBox="0 0 10 10" className="size-[7px]" aria-hidden="true">
            <circle cx="5" cy="5" r="5" fill="#25d366" />
            <path d="M2.8 5.2 4.4 6.7 7.3 3.6" fill="none" stroke="#fff" strokeWidth="1.2" />
          </svg>
        </span>
        <span className="block text-[6px] text-black/45">Business account</span>
      </span>
      <Video className="size-[10px]" aria-hidden="true" />
      <PhoneIcon className="ml-[6px] mr-[3px] size-[9px]" aria-hidden="true" />
    </div>
  );
}

function Msg({ me = false, time, children, buttons, tail = true }: { me?: boolean; time: string; children: ReactNode; buttons?: string[]; tail?: boolean }) {
  return (
    <div className={`flex max-w-[86%] flex-col ${me ? "self-end" : "self-start"}`}>
      <div className={`rounded-[7px] px-[6px] pb-[3px] pt-[4px] text-[7.5px] leading-[1.38] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] ${me ? "bg-[#d9fdd3]" : "bg-white"} ${tail ? (me ? "rounded-tr-[1px]" : "rounded-tl-[1px]") : ""} ${buttons ? "rounded-b-[2px]" : ""}`}>
        {children}
        <span className="float-right ml-[6px] mt-[3px] flex items-center gap-[1px] text-[5.5px] leading-none text-[#667781]">
          {time}
          {me && <span className="text-[6.5px] tracking-[-1.5px] text-[#53bdeb]">✓✓</span>}
        </span>
      </div>
      {buttons?.map((b) => (
        <span key={b} className="mt-[1.5px] flex h-[17px] items-center justify-center gap-[3px] rounded-[3px] bg-white text-[7px] font-medium text-[#027eb5] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] last:rounded-b-[7px]">
          <Reply className="size-[7px]" aria-hidden="true" />
          {b}
        </span>
      ))}
    </div>
  );
}

function Day({ children }: { children: ReactNode }) {
  return <span className="mx-auto my-[2px] rounded-[5px] bg-white px-[6px] py-[2px] text-[6px] font-medium text-[#54656f] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">{children}</span>;
}

function WaInput() {
  return (
    <div className="mb-[10px] flex shrink-0 items-center gap-[5px] bg-[#f6f5f3] px-[6px] pb-[4px] pt-[5px] text-[#54656f]">
      <Plus className="size-[11px]" aria-hidden="true" />
      <span className="flex h-[17px] flex-1 items-center rounded-full border border-black/10 bg-white px-[7px] text-[6.5px] text-black/35" />
      <Camera className="size-[10px]" aria-hidden="true" />
      <Mic className="size-[10px]" aria-hidden="true" />
    </div>
  );
}

export const Concierge: Screen = () => (
  <div className="flex h-full items-center justify-center gap-[36px] bg-[#e7e8ea]">
    <Handset time="16:24">
      <WaHeader unread={3} />
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[4px] overflow-hidden px-[7px] pb-[4px]">
        <Day>Wednesday</Day>
        <Msg time="16:02" buttons={["Book airport transfer", "Share arrival time", "Dietary requests"]}>
          Marhaba Sophie, we&apos;re looking forward to having you with us from tomorrow, Thu 12 Feb. Your Dune Pool Villa (no. 7) will be ready from 15:00. How can we help before you arrive?
        </Msg>
        <Msg me time="16:19">
          We land at DXB at 14:10 tomorrow on EK 30. Can you pick us up?
        </Msg>
        <Msg time="16:19" buttons={["Yes, book it", "No thanks"]}>
          Of course. A private car from DXB for 2 guests with luggage is AED 450 and takes about 1 hr 15 min. Shall I book it for EK 30, landing 14:10?
        </Msg>
        <Msg me time="16:20">
          Yes, book it
        </Msg>
      </div>
      <WaInput />
    </Handset>
    <Handset time="16:31">
      <WaHeader unread={3} />
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[4px] overflow-hidden px-[7px] pb-[4px]">
        <Msg time="16:20">
          Booked. Anwar will meet you in Terminal 3 arrivals holding a RAK Glamping sign, and he&apos;ll track your flight if it&apos;s late. The AED 450 is added to your villa bill.
        </Msg>
        <Msg me time="16:27">
          Great thanks! Is the sunrise dune drive possible on Saturday? Also my husband has a nut allergy
        </Msg>
        <Msg time="16:27" buttons={["Book for 2 on Sat", "See other experiences"]}>
          Sunrise dune drive on Sat 14 Feb: pick-up at your villa at 05:50, back for breakfast by 08:30. AED 380 per person.
          <br />
          <br />I&apos;ve passed the nut allergy to our chef. Karim from the guest team will confirm your menu this evening.
        </Msg>
        <Msg me time="16:29">
          Book for 2 on Sat
        </Msg>
        <Msg time="16:29">Done, 2 places on Saturday&apos;s sunrise drive. See you tomorrow, safe flight.</Msg>
      </div>
      <WaInput />
    </Handset>
  </div>
);

/* 04 · Weekly owner report, as it lands in Gmail ---------------------- */

const NIGHTS = [
  ["Mon", 71],
  ["Tue", 67],
  ["Wed", 75],
  ["Thu", 88],
  ["Fri", 100],
  ["Sat", 96],
  ["Sun", 50],
] as const;

export const OwnerReport: Screen = ({ tint }) => (
  <Browser w={640} h={400} url="mail.google.com/mail/u/0/#inbox/FMfcgzQbdrJxWkQPLnXbGNlmTfRbvhZg">
    <div className="flex h-full flex-col bg-[#f8fafd] text-[#1f1f1f]">
      <div className="flex h-[34px] shrink-0 items-center gap-[8px] px-[10px]">
        <Menu className="size-[10px] text-[#444746]" aria-hidden="true" />
        <span className="flex items-center gap-[3px] text-[10px] text-[#444746]">
          <svg viewBox="0 0 20 15" className="h-[10px]" aria-hidden="true">
            <path d="M1 3v10.5h3.5V6.2L10 10l5.5-3.8v7.3H19V3l-1.9-1.4L10 6.5 2.9 1.6z" fill="#ea4335" />
            <path d="M1 3l3.5 2.6v7.9H1z" fill="#4285f4" />
            <path d="M15.5 5.6 19 3v10.5h-3.5z" fill="#34a853" />
            <path d="M4.5 6.2V2.9L10 6.8l5.5-3.9v3.3L10 10z" fill="#c5221f" opacity="0.9" />
          </svg>
          Gmail
        </span>
        <span className="ml-[44px] flex h-[22px] w-[300px] items-center gap-[6px] rounded-full bg-[#e9eef6] px-[9px] text-[7.5px] text-[#444746]">
          <Search className="size-[9px]" aria-hidden="true" />
          Search mail
        </span>
        <span className="ml-auto flex items-center gap-[9px] text-[#444746]">
          <Settings className="size-[9px]" aria-hidden="true" />
          <Grid3x3 className="size-[9px]" aria-hidden="true" />
          <span className="flex size-[18px] items-center justify-center rounded-full bg-[#5e35b1] text-[7px] font-medium text-white">K</span>
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="w-[112px] shrink-0 px-[6px] text-[7.5px] text-[#1f1f1f]">
          <span className="flex h-[26px] w-[74px] items-center gap-[5px] rounded-[9px] bg-[#c2e7ff] px-[9px] font-medium">
            <Pencil className="size-[8px]" aria-hidden="true" />
            Compose
          </span>
          <div className="mt-[7px] space-y-[1px]">
            {(
              [
                [Inbox, "Inbox", "4"],
                [Star, "Starred", ""],
                [Clock, "Snoozed", ""],
                [Send, "Sent", ""],
                [Mail, "Drafts", "1"],
                [Archive, "RAK Glamping", ""],
              ] as const
            ).map(([I, l, n], i) => (
              <span key={l} className={`flex h-[18px] items-center gap-[7px] rounded-r-full pl-[9px] pr-[7px] ${i === 0 ? "bg-[#d3e3fd] font-semibold" : ""}`}>
                <I className="size-[8px]" aria-hidden="true" />
                {l}
                <span className="ml-auto text-[6.5px]">{n}</span>
              </span>
            ))}
          </div>
        </aside>
        <div className="mb-[8px] mr-[8px] flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] bg-white">
          <div className="flex h-[24px] shrink-0 items-center gap-[12px] px-[12px] text-[#444746]">
            <ChevronLeft className="size-[9px]" aria-hidden="true" />
            <Archive className="size-[8px]" aria-hidden="true" />
            <Trash2 className="size-[8px]" aria-hidden="true" />
            <Mail className="size-[8px]" aria-hidden="true" />
            <Clock className="size-[8px]" aria-hidden="true" />
            <MoreVertical className="size-[8px]" aria-hidden="true" />
            <span className="ml-auto text-[6.5px]">3 of 1,284</span>
            <Printer className="size-[8px]" aria-hidden="true" />
          </div>
          <div className="min-h-0 flex-1 px-[16px] pt-[4px]">
            <p className="flex items-center gap-[6px] text-[11px]">
              RAK Glamping weekly report: 2 – 8 Feb 2026
              <span className="rounded-[3px] bg-[#ddd] px-[4px] py-[1px] text-[6px] text-[#444]">Inbox</span>
            </p>
            <div className="mt-[7px] flex items-center gap-[6px]">
              <Badge />
              <span className="min-w-0 flex-1 leading-[1.3]">
                <span className="block text-[7.5px]">
                  <b className="font-semibold">RAK Glamping Reports</b> <span className="text-[6.5px] text-[#5e5e5e]">&lt;reports@rakglamping.com&gt;</span>
                </span>
                <span className="flex items-center gap-[1px] text-[6.5px] text-[#5e5e5e]">
                  to me
                  <ChevronDown className="size-[6px]" aria-hidden="true" />
                </span>
              </span>
              <span className="text-[6.5px] text-[#5e5e5e]">Mon 9 Feb, 07:00</span>
              <Star className="size-[8px] text-[#5e5e5e]" aria-hidden="true" />
              <Reply className="size-[8px] text-[#5e5e5e]" aria-hidden="true" />
            </div>
            {/* email body: the one-page report */}
            <div className="ml-[26px] mt-[8px] w-[400px] border border-[#e8e2d8] text-[#2a1a10]">
              <div className="flex items-center justify-between border-b border-[#e8e2d8] px-[10px] py-[6px]">
                <Brand size={10} />
                <span className="text-[6.5px] text-black/50">Week 6 · 24 villas</span>
              </div>
              <div className="grid grid-cols-4 border-b border-[#e8e2d8]">
                {[
                  ["Occupancy", "78.0%", "last week 74.4%"],
                  ["Revenue (rooms)", "AED 402,860", "ADR AED 3,075"],
                  ["Direct bookings", "62%", "31 of 50 · OTA 32%"],
                  ["Guest rating", "4.8", "11 new reviews"],
                ].map(([k, v, s], i) => (
                  <div key={k} className={`px-[8px] py-[6px] ${i ? "border-l border-[#e8e2d8]" : ""}`}>
                    <p className="text-[6px] uppercase tracking-[0.08em] text-black/45">{k}</p>
                    <p className="mt-[2px] text-[10px] font-semibold tabular-nums">{v}</p>
                    <p className="text-[5.5px] text-black/45">{s}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-[12px] px-[10px] py-[6px]">
                <div className="w-[128px] shrink-0">
                  <p className="text-[6.5px] font-semibold">Occupancy by night</p>
                  <div className="mt-[4px] flex h-[42px] items-end gap-[4px]">
                    {NIGHTS.map(([d, v]) => (
                      <span key={d} className="flex flex-1 flex-col items-center gap-[1px]">
                        <span className="text-[5px] text-black/50">{v}%</span>
                        <span className="w-full" style={{ height: (v / 100) * 30, background: v === 100 ? tint : `color-mix(in oklab, ${tint} 45%, white)` }} />
                        <span className="text-[5px] text-black/45">{d}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <table className="min-w-0 flex-1 text-[6.5px]">
                  <thead>
                    <tr className="border-b border-[#e8e2d8] text-left text-black/45">
                      <th className="font-medium">New bookings (50)</th>
                      <th className="text-right font-medium">Bkgs</th>
                      <th className="text-right font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {[
                      ["Website (direct)", "29", "248,310"],
                      ["Booking.com", "11", "96,420"],
                      ["Expedia", "5", "39,210"],
                      ["Google Hotel Ads", "3", "27,140"],
                      ["Phone / WhatsApp", "2", "19,050"],
                    ].map(([c, b, r]) => (
                      <tr key={c}>
                        <td className="py-[0.5px]">{c}</td>
                        <td className="text-right">{b}</td>
                        <td className="text-right">{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[#e8e2d8] px-[10px] py-[5px] text-[6.5px] leading-[1.5] text-black/65">
                <p>
                  <b className="font-semibold text-black/80">Concierge:</b> 1,146 WhatsApp messages, 91% answered without staff. 17 transfers and 23 experiences sold (AED 18,940).
                </p>
                <p>
                  <b className="font-semibold text-black/80">Needs you:</b> approve Eid al-Fitr rates (20–23 Mar) by Thursday.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

export const desertRetreatScreens: Screen[] = [RetreatHome, VillaPage, Concierge, OwnerReport];
