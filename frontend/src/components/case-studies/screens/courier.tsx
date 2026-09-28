import type { ReactNode } from "react";
import {
  ArrowLeft,
  Bell,
  Bike,
  Camera,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  CloudOff,
  Download,
  FileText,
  Info,
  MapPin,
  MessageSquare,
  MoreVertical,
  Navigation,
  Package,
  Phone as PhoneIcon,
  Plus,
  RotateCw,
  ScanBarcode,
  Search,
  Share,
  TestTube,
  Truck,
  Video,
  type LucideIcon,
} from "lucide-react";

import { Browser, type Screen } from "./kit";
import { Photo } from "./tools";
import { at, GeoMap, line, MapControls, MapScale, proj, RouteLine, split, StopPin, streetNet, VehiclePin, type Geo, type P, type View } from "./routePlanning";

/* Driver app + dispatch panel · Birmingham same-day courier network (City Quick Logistics) */

const LOGO = { src: "/logos/city-quick.webp", img: { w: 207, h: 120 } };
/** City Quick's own orange, whatever the study tint. */
const BRAND_ORANGE = "#e8770e";

/* ================================================================== */
/* Birmingham geography (world units ~1000 x 700, city centre 500,350)  */
/* ================================================================== */

const ring = (pts: P[]): P[] => [...pts, pts[0], pts[1]];
const BROAD: P[] = [[512, 336], [500, 342], [488, 350], [470, 358], [452, 366], [436, 378], [425, 392]];
const HAGLEY: P[] = [[425, 392], [390, 396], [350, 402], [300, 410], [200, 418], [0, 432]];

export const BIRMINGHAM: Geo = {
  land: "#eef0ea",
  water: [],
  lakes: [
    [398, 318, 16, 11],
    [590, 90, 22, 10],
  ],
  rivers: [
    { pts: [[260, 60], [400, 110], [520, 150], [650, 190], [800, 196], [1020, 210]], w: 5 },
    { pts: [[470, 720], [490, 600], [512, 500], [548, 420], [575, 380], [610, 300], [640, 196]], w: 3 },
  ],
  canals: [
    [[505, 336], [540, 312], [600, 262], [660, 222], [720, 200]],
    [[470, 356], [430, 340], [380, 326], [300, 310], [180, 296], [0, 290]],
    [[462, 360], [450, 400], [430, 460], [405, 540], [380, 640], [360, 720]],
    [[540, 350], [600, 380], [680, 430], [780, 470], [900, 520]],
  ],
  urban: [
    [500, 350, 120, 100], [400, 180, 90, 60], [700, 150, 110, 60], [720, 450, 110, 80], [330, 470, 90, 60], [520, 560, 110, 60], [860, 620, 70, 50],
  ],
  green: [
    [472, 525, 26, 18], [690, 470, 22, 16], [572, 215, 16, 12], [400, 148, 20, 16], [425, 482, 24, 16], [250, 560, 40, 30], [820, 60, 60, 40],
    [620, 610, 26, 16], [300, 350, 18, 12], [760, 330, 20, 14], [360, 250, 16, 10], [880, 330, 30, 20],
  ],
  minor: streetNet(11, [-20, -20, 1020, 720], 34, 20, 0.62),
  streets: streetNet(5, [370, 270, 640, 470], 15, 7, 0.7),
  rail: [
    [[500, 358], [560, 360], [640, 380], [760, 420], [880, 470], [1020, 520]],
    [[500, 358], [450, 380], [400, 440], [360, 520], [320, 700]],
    [[510, 330], [560, 280], [620, 210], [700, 120], [760, -20]],
    [[495, 345], [440, 300], [360, 240], [240, 170], [100, 110]],
  ],
  major: [
    ring([[500, 262], [560, 268], [598, 300], [612, 345], [598, 395], [565, 428], [510, 440], [455, 432], [415, 400], [402, 350], [414, 305], [452, 272]]),
    ring([[500, 318], [530, 325], [540, 350], [528, 378], [500, 385], [470, 375], [462, 350], [472, 326]]),
    ring([[500, 118], [650, 138], [762, 228], [792, 350], [742, 482], [620, 562], [480, 582], [330, 532], [238, 420], [252, 290], [340, 170]]),
    [[505, 318], [490, 262], [470, 200], [455, 120], [440, -20]],
    [[472, 326], [452, 272], [400, 230], [330, 190], [200, 130], [60, 60]],
    [[462, 345], [402, 342], [300, 322], [150, 302], [-20, 290]],
    BROAD,
    HAGLEY,
    [[490, 385], [470, 432], [430, 500], [380, 580], [320, 720]],
    [[500, 385], [510, 440], [505, 520], [495, 720]],
    [[520, 382], [540, 440], [560, 540], [580, 720]],
    [[530, 378], [565, 428], [620, 500], [680, 580], [740, 720]],
    [[538, 365], [598, 395], [680, 470], [780, 560], [860, 620], [940, 700]],
    [[540, 355], [612, 368], [700, 410], [820, 440], [1020, 480]],
    [[535, 335], [598, 300], [680, 285], [800, 280], [1020, 300]],
    [[560, 268], [620, 230], [690, 160], [740, 60]],
    [[330, 470], [300, 470], [250, 480], [150, 500]],
  ],
  motorways: [
    [[-20, 118], [200, 140], [420, 165], [615, 180], [760, 200], [1020, 240]],
    [[525, 322], [560, 268], [590, 220], [615, 180]],
    [[80, -20], [60, 300], [90, 720]],
    [[700, 720], [900, 560], [1020, 420]],
  ],
  labels: [
    { t: "Birmingham", at: [500, 348], tier: 1, dot: false },
    { t: "Jewellery Quarter", at: [448, 292], tier: 2, kind: "area" },
    { t: "Aston", at: [590, 228], tier: 2, kind: "area" },
    { t: "Digbeth", at: [566, 392], tier: 2, kind: "area" },
    { t: "Edgbaston", at: [405, 448], tier: 2, kind: "area" },
    { t: "Ladywood", at: [420, 350], tier: 3, kind: "area" },
    { t: "Nechells", at: [650, 292], tier: 3, kind: "area" },
    { t: "Small Heath", at: [700, 440], tier: 3, kind: "area" },
    { t: "Sparkbrook", at: [600, 480], tier: 3, kind: "area" },
    { t: "Moseley", at: [560, 560], tier: 3, kind: "area" },
    { t: "Selly Oak", at: [380, 600], tier: 3, kind: "area" },
    { t: "Handsworth", at: [370, 150], tier: 3, kind: "area" },
    { t: "Erdington", at: [720, 110], tier: 3, kind: "area" },
    { t: "Harborne", at: [300, 480], tier: 3, kind: "area" },
    { t: "Solihull", at: [860, 620], tier: 1 },
    { t: "Bordesley", at: [640, 408], tier: 3, kind: "area" },
    { t: "Broad St", at: [462, 358], tier: 4, kind: "street", rot: -24 },
    { t: "Suffolk St Queensway", at: [516, 318], tier: 4, kind: "street", rot: -30 },
    { t: "Gas St", at: [456, 382], tier: 4, kind: "street", rot: 60 },
    { t: "Hagley Rd", at: [360, 396], tier: 4, kind: "street", rot: -8 },
    { t: "War Ln", at: [322, 436], tier: 4, kind: "street", rot: 70 },
  ],
  shields: [
    { t: "M6", at: [300, 151], c: "#1d4ed8" },
    { t: "A38(M)", at: [575, 244], c: "#15803d" },
    { t: "A4540", at: [612, 330], c: "#15803d" },
    { t: "A45", at: [760, 432], c: "#15803d" },
    { t: "A34", at: [650, 540], c: "#15803d" },
    { t: "A456", at: [270, 412], c: "#15803d" },
  ],
};

/* ================================================================== */
/* Shared bits                                                          */
/* ================================================================== */

const GREEN = "#16a34a";
const AMBER = "#d97706";
const GREY = "#94a3b8";
const MED = "#e11d48";
const DOC = "#7c3aed";
const PARCEL = "#0f766e";

/** Hand-drawn signature. */
function Signature({ w = 150, h = 44, color = "#0f172a" }: { w?: number; h?: number; color?: string }) {
  return (
    <svg width={w} height={h} viewBox="0 0 150 44" aria-hidden="true">
      <path
        d="M10 30 C14 12 22 10 20 26 S18 38 28 24 C33 16 36 14 36 24 C36 32 40 30 44 22 C47 16 50 18 49 26 C48 33 54 31 58 22 C61 16 64 20 63 27 C70 12 76 10 74 22 C73 30 80 30 86 20 M86 20 C90 14 96 16 94 24 C92 32 100 30 106 22 C110 17 114 19 116 24 C120 32 128 22 138 18"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 36 C62 34 96 33 128 30" fill="none" stroke={color} strokeWidth={1.1} strokeLinecap="round" opacity={0.7} />
    </svg>
  );
}

/** Plain phone: black bezel, iOS-style status bar and home indicator. */
function Handset({ children, time = "11:46", bg = "#fff", bar = "#fff", w = 184, h = 382 }: { children: ReactNode; time?: string; bg?: string; bar?: string; w?: number; h?: number }) {
  return (
    <div className="shrink-0 rounded-[27px] bg-[#16161a] p-[4px] shadow-[0_10px_24px_-12px_rgb(0_0_0/0.45)]" style={{ width: w, height: h }}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] text-[#111]" style={{ background: bg }}>
        <div className="relative flex h-[20px] shrink-0 items-center justify-between px-[14px] text-[7.5px] font-semibold" style={{ background: bar }}>
          <span>{time}</span>
          <span className="absolute left-1/2 top-[4px] h-[11px] w-[46px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-[2px]">
            <span className="flex items-end gap-[0.8px]">
              {[3, 4, 5, 6].map((b, i) => (
                <span key={b} className={`w-[1.6px] rounded-[0.5px] ${i < 3 ? "bg-current" : "bg-current opacity-30"}`} style={{ height: b }} />
              ))}
            </span>
            <span className="text-[6px]">4G</span>
            <span className="relative ml-[1px] h-[6px] w-[11px] rounded-[1.5px] border border-current/40 p-[0.8px]">
              <span className="block h-full w-[64%] rounded-[0.5px] bg-current" />
            </span>
          </span>
        </div>
        {children}
        <span className="absolute bottom-[4px] left-1/2 h-[3px] w-[52px] -translate-x-1/2 rounded-full bg-black/80" />
      </div>
    </div>
  );
}

/* 01 · Driver app: job screen + proof of delivery --------------------- */

const NV: View = { x: 440, y: 306, s: 1.7 };
const NAV_ROUTE: P[] = [[540, 322], [524, 330], [512, 336], [502, 341], [488, 350], [470, 358], [452, 366]];

export const DriverApp: Screen = ({ tint }) => {
  const route = line(NV, NAV_ROUTE);
  const [, ahead, van, deg] = split(route, 0.28);
  const dest = proj(NV, [452, 366]);
  return (
    <div className="flex h-full items-center justify-center gap-[36px] bg-[#e7e8ea]">
      {/* job screen */}
      <Handset>
        <div className="flex h-[28px] shrink-0 items-center gap-[6px] border-b border-black/[0.08] px-[9px]">
          <ArrowLeft className="size-[10px]" aria-hidden="true" />
          <span className="text-[9px] font-semibold">Job 11 of 18</span>
          <span className="ml-auto flex items-center gap-[3px] text-[6.5px] text-black/45">
            <CloudOff className="size-[8px]" aria-hidden="true" />3 to sync
          </span>
          <MoreVertical className="size-[10px] text-black/50" aria-hidden="true" />
        </div>
        <div className="relative shrink-0">
          <GeoMap geo={BIRMINGHAM} view={NV} w={176} h={112} k={1.3} maxTier={4} svg={<RouteLine pts={ahead} color={tint} width={3} arrows={22} />}>
            <StopPin n={<MapPin className="size-[7px]" strokeWidth={2.6} aria-hidden="true" />} color={tint} style={{ left: dest[0], top: dest[1] }} size={14} />
            <VehiclePin color="#111827" deg={deg} style={{ left: van[0], top: van[1] }} size={12} />
          </GeoMap>
          <span className="absolute bottom-[6px] right-[6px] flex items-center gap-[3px] rounded-full px-[8px] py-[4px] text-[7.5px] font-semibold text-white shadow-[0_1px_3px_rgb(0_0_0/0.3)]" style={{ background: tint }}>
            <Navigation className="size-[8px]" aria-hidden="true" />
            Navigate · 4 min
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-[10px] pt-[8px]">
          <div className="flex items-center gap-[4px] text-[6.5px] font-semibold">
            <span className="rounded-[3px] bg-[#e0e7ff] px-[4px] py-[1.5px] text-[#3730a3]">DROP</span>
            <span className="rounded-[3px] bg-[#fef3c7] px-[4px] py-[1.5px] text-[#92400e]">Due by 12:30</span>
            <span className="ml-auto font-mono text-black/40">J-48213</span>
          </div>
          <p className="mt-[6px] text-[11px] font-semibold leading-tight">14 Broad Street</p>
          <p className="text-[8px] text-black/55">Birmingham B1 2HF · 1.1 mi</p>
          <div className="mt-[8px] space-y-[5px] border-t border-black/[0.07] pt-[7px] text-[7.5px]">
            <p className="flex justify-between">
              <span className="text-black/50">Recipient</span>
              <span className="font-medium">Colmore Dental Lab</span>
            </p>
            <p className="flex justify-between">
              <span className="text-black/50">Parcels</span>
              <span className="font-medium">2 · 3.4 kg</span>
            </p>
            <p className="flex justify-between">
              <span className="text-black/50">Proof</span>
              <span className="font-medium">Signature + photo</span>
            </p>
          </div>
          <p className="mt-[7px] rounded-[4px] bg-[#f4f4f5] px-[6px] py-[5px] text-[7px] leading-[1.4] text-black/70">
            <b className="font-semibold">Note:</b> Use the loading bay off Gas St. Buzz 2 for reception, they close 12:30–13:15.
          </p>
          <div className="mb-[8px] mt-[7px] grid grid-cols-2 gap-[5px]">
            <span className="flex h-[24px] items-center justify-center gap-[4px] rounded-[5px] border border-black/15 text-[7.5px] font-semibold">
              <PhoneIcon className="size-[8px]" aria-hidden="true" />
              Call
            </span>
            <span className="flex h-[24px] items-center justify-center gap-[4px] rounded-[5px] border border-black/15 text-[7.5px] font-semibold">
              <MessageSquare className="size-[8px]" aria-hidden="true" />
              Message
            </span>
          </div>
          <span className="mt-auto mb-[14px] flex h-[32px] items-center justify-center rounded-[6px] text-[9.5px] font-semibold text-white" style={{ background: tint }}>
            Arrived at drop
          </span>
        </div>
      </Handset>

      {/* proof of delivery */}
      <Handset time="11:47" bg="#f4f4f5">
        <div className="flex h-[28px] shrink-0 items-center gap-[6px] border-b border-black/[0.08] bg-white px-[9px]">
          <ArrowLeft className="size-[10px]" aria-hidden="true" />
          <span className="text-[9px] font-semibold">Proof of delivery</span>
          <span className="ml-auto font-mono text-[6.5px] text-black/40">J-48213</span>
        </div>
        <div className="flex shrink-0 items-center gap-[4px] bg-[#fef3c7] px-[9px] py-[4px] text-[6.5px] text-[#92400e]">
          <CloudOff className="size-[8px]" aria-hidden="true" />
          No signal. Saved on the phone, will sync automatically.
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[6px] px-[8px] pt-[7px]">
          <section className="rounded-[6px] bg-white px-[8px] py-[6px]">
            <p className="flex items-center justify-between text-[7.5px] font-semibold">
              <span className="flex items-center gap-[4px]">
                <ScanBarcode className="size-[9px]" aria-hidden="true" />
                Scan parcels
              </span>
              <span className="text-[#15803d]">2 / 2</span>
            </p>
            {["CQL7730441201", "CQL7730441202"].map((b) => (
              <p key={b} className="mt-[3px] flex items-center gap-[4px] font-mono text-[6.5px] text-black/60">
                <Check className="size-[8px] text-[#15803d]" strokeWidth={3} aria-hidden="true" />
                {b}
              </p>
            ))}
          </section>
          <section className="rounded-[6px] bg-white px-[8px] py-[6px]">
            <p className="text-[7.5px] font-semibold">Photo</p>
            <div className="mt-[4px] flex gap-[5px]">
              <div className="relative h-[52px] w-[70px] overflow-hidden rounded-[4px] bg-[#8a7a68]">
                <span className="absolute inset-y-0 left-[18px] w-[34px] bg-[#5a4636]" />
                <span className="absolute left-[46px] top-[26px] size-[2px] rounded-full bg-[#d6c7a1]" />
                <span className="absolute bottom-0 left-0 right-0 h-[10px] bg-[#6f6a63]" />
                <span className="absolute bottom-[6px] left-[22px] h-[12px] w-[18px] rounded-[1px] bg-[#c9a36b]" />
                <span className="absolute bottom-[6px] left-[34px] h-[9px] w-[14px] rounded-[1px] bg-[#b98f58]" />
                <span className="absolute right-[2px] top-[2px] rounded-[2px] bg-black/50 px-[2px] text-[5px] text-white">11:47</span>
              </div>
              <span className="flex h-[52px] w-[52px] flex-col items-center justify-center gap-[2px] rounded-[4px] border border-dashed border-black/20 text-[6px] text-black/45">
                <Camera className="size-[9px]" aria-hidden="true" />
                Add
              </span>
            </div>
          </section>
          <section className="rounded-[6px] bg-white px-[8px] py-[6px]">
            <p className="flex items-center justify-between text-[7.5px] font-semibold">
              Signature <span className="text-[6.5px] font-normal text-black/45">Clear</span>
            </p>
            <div className="mt-[3px] flex h-[46px] items-center justify-center border-b border-dashed border-black/25">
              <Signature w={126} h={38} />
            </div>
            <p className="mt-[5px] flex h-[18px] items-center justify-between rounded-[4px] border border-black/15 px-[5px] text-[7px]">
              <span className="text-black/45">Received by</span>
              <span className="font-medium">R. Khan</span>
            </p>
          </section>
          <p className="px-[2px] text-[6px] text-black/45">GPS 52.4776, −1.9102 · ±12 m from address · 11:47:32</p>
          <span className="mt-auto mb-[14px] flex h-[32px] items-center justify-center rounded-[6px] bg-[#15803d] text-[9.5px] font-semibold text-white">Complete delivery</span>
        </div>
      </Handset>
    </div>
  );
};

/* 02 · Live dispatch map ------------------------------------------------ */

const DV: View = { x: 330, y: 186, s: 0.6 };

type Drv = { at: P; deg: number; veh: "van" | "car" | "bike"; st: "job" | "free" | "break" | "off" };
const DRIVERS: Drv[] = [
  { at: [420, 445], deg: -40, veh: "car", st: "free" },
  { at: [455, 522], deg: 80, veh: "van", st: "job" },
  { at: [520, 300], deg: 10, veh: "bike", st: "job" },
  { at: [470, 200], deg: -90, veh: "van", st: "job" },
  { at: [598, 330], deg: 90, veh: "van", st: "job" },
  { at: [650, 285], deg: 0, veh: "car", st: "free" },
  { at: [700, 410], deg: 20, veh: "van", st: "job" },
  { at: [565, 428], deg: 150, veh: "bike", st: "job" },
  { at: [540, 520], deg: 80, veh: "car", st: "break" },
  { at: [620, 500], deg: 45, veh: "van", st: "job" },
  { at: [340, 402], deg: 180, veh: "van", st: "job" },
  { at: [360, 250], deg: 200, veh: "car", st: "job" },
  { at: [760, 220], deg: 10, veh: "van", st: "off" },
  { at: [740, 520], deg: 40, veh: "van", st: "job" },
  { at: [400, 330], deg: 180, veh: "bike", st: "free" },
  { at: [610, 180], deg: 0, veh: "van", st: "job" },
  { at: [505, 395], deg: 60, veh: "van", st: "job" },
  { at: [680, 600], deg: 120, veh: "car", st: "job" },
];
const JOBS: { at: P; kind: "parcel" | "med" | "doc" }[] = [
  { at: [480, 300], kind: "doc" },
  { at: [540, 250], kind: "parcel" },
  { at: [630, 360], kind: "parcel" },
  { at: [590, 560], kind: "med" },
  { at: [680, 330], kind: "parcel" },
  { at: [360, 520], kind: "parcel" },
  { at: [720, 460], kind: "doc" },
  { at: [500, 470], kind: "parcel" },
];
const KIND: Record<string, { c: string; Icon: LucideIcon; label: string }> = {
  parcel: { c: PARCEL, Icon: Package, label: "Parcel" },
  med: { c: MED, Icon: TestTube, label: "Medical" },
  doc: { c: DOC, Icon: FileText, label: "Docs" },
};
const VEH: Record<string, LucideIcon> = { van: Truck, car: Car, bike: Bike };
const stColor = (st: Drv["st"], tint: string) => (st === "job" ? tint : st === "free" ? GREEN : st === "break" ? AMBER : GREY);

const QUEUE = [
  { id: "J-48291", kind: "med", from: "QE Hospital lab, B15", to: "Midlands Pathology, B6", due: "11:55", age: "6m" },
  { id: "J-48288", kind: "parcel", from: "Bullring loading bay", to: "Solihull, B91 3QJ", due: "12:30", age: "9m" },
  { id: "J-48285", kind: "doc", from: "Colmore Row, B3", to: "Brindleyplace, B1", due: "12:00", age: "11m" },
  { id: "J-48280", kind: "parcel", from: "Digbeth Trade Pk", to: "Jewellery Qtr, B18", due: "13:00", age: "14m" },
  { id: "J-48277", kind: "med", from: "Heartlands Hospital", to: "City Hospital, B18", due: "12:15", age: "15m" },
  { id: "J-48271", kind: "parcel", from: "Fort Shopping Pk", to: "Erdington, B23", due: "14:00", age: "22m" },
] as const;

const TEAM = [
  ["Priya Sandhu", "car", "BX21 KHT", "free", "idle 6m"],
  ["Dan Walsh", "van", "BD19 ZPE", "job", "4/9"],
  ["Aisha Rahman", "bike", "Bike 07", "job", "6/11"],
  ["Tom Kelly", "van", "BK68 VNU", "break", "12m"],
  ["Marek Nowak", "van", "BV70 LCA", "job", "8/14"],
  ["Grace Obi", "car", "BN20 WYS", "off", "no GPS"],
  ["Imran Hussain", "van", "BJ18 XRA", "job", "2/7"],
  ["Chloe Evans", "car", "BF67 TLO", "free", "idle 1m"],
  ["Kwame Mensah", "bike", "Bike 12", "job", "3/5"],
  ["Sean Doyle", "van", "BL22 HMW", "job", "9/16"],
] as const;

function AppHead({ tint, active }: { tint: string; active: number }) {
  return (
    <header className="flex h-[28px] shrink-0 items-center gap-[12px] border-b border-black/[0.1] bg-white px-[10px] text-[7.5px] text-black/55">
      <span className="flex items-center gap-[5px] text-[9px] font-bold text-[#111827]">
        <Photo {...LOGO} w={33} h={19} />
        <span className="font-normal text-black/40">Control</span>
      </span>
      <nav className="flex h-full items-center gap-[11px]">
        {["Dispatch", "Jobs", "Drivers", "Clients", "Invoicing", "Reports"].map((n, i) => (
          <span key={n} className={`flex h-full items-center ${i === active ? "font-semibold text-[#111827]" : ""}`} style={i === active ? { boxShadow: `inset 0 -2px 0 ${tint}` } : undefined}>
            {n}
          </span>
        ))}
      </nav>
      <span className="ml-auto flex items-center gap-[9px]">
        <span className="flex h-[16px] w-[104px] items-center gap-[4px] rounded-[3px] bg-black/[0.05] px-[5px] text-[7px] text-black/40">
          <Search className="size-[8px]" aria-hidden="true" />
          Job, postcode, driver
        </span>
        <span className="flex items-center gap-[2px]">
          Birmingham
          <ChevronDown className="size-[7px]" aria-hidden="true" />
        </span>
        <Bell className="size-[9px]" aria-hidden="true" />
        <span className="flex size-[15px] items-center justify-center rounded-full bg-[#fce7f3] text-[6px] font-bold text-[#9d174d]">SR</span>
      </span>
    </header>
  );
}

export const DispatchMap: Screen = ({ tint }) => {
  const job: P = [392, 478];
  const priya = DRIVERS[0].at;
  const [jx, jy] = proj(DV, job);
  const [px, py] = proj(DV, priya);
  return (
    <Browser w={640} h={400} url="control.cityquick.co.uk/dispatch">
      <div className="flex h-full flex-col bg-white text-[#111827]">
        <AppHead tint={tint} active={0} />
        <div className="flex h-[22px] shrink-0 items-center gap-[12px] border-b border-black/[0.1] bg-[#f8fafc] px-[10px] text-[7px] text-black/55">
          <span>
            Jobs today <b className="text-black/80">2,436</b>
          </span>
          <span>
            Unassigned <b className="text-[#b45309]">14</b>
          </span>
          <span>
            Drivers online <b className="text-black/80">284</b> (61 free)
          </span>
          <span>
            Late risk <b className="text-[#b91c1c]">5</b>
          </span>
          <span className="ml-auto">Tue 30 Sep · 11:41</span>
        </div>
        <div className="flex min-h-0 flex-1">
          {/* unassigned queue */}
          <div className="flex w-[176px] shrink-0 flex-col border-r border-black/[0.1]">
            <div className="flex h-[20px] shrink-0 items-center justify-between border-b border-black/[0.08] px-[8px] text-[7.5px] font-semibold">
              Unassigned (14)
              <span className="flex items-center gap-[2px] text-[6.5px] font-normal text-black/45">
                Due soonest
                <ChevronDown className="size-[6px]" aria-hidden="true" />
              </span>
            </div>
            {QUEUE.map((q, i) => {
              const k = KIND[q.kind];
              return (
                <div key={q.id}>
                  <div className="border-b border-black/[0.07] px-[8px] py-[4px] text-[6.5px]" style={i === 0 ? { background: `color-mix(in oklab, ${tint} 7%, white)`, boxShadow: `inset 2px 0 0 ${tint}` } : undefined}>
                    <p className="flex items-center gap-[4px]">
                      <span className="font-mono text-[7px] font-semibold">{q.id}</span>
                      <span className="flex items-center gap-[2px] font-semibold" style={{ color: k.c }}>
                        <k.Icon className="size-[7px]" aria-hidden="true" />
                        {k.label}
                      </span>
                      <span className="ml-auto font-semibold tabular-nums">{q.due}</span>
                    </p>
                    <p className="mt-[1px] truncate text-black/60">
                      {q.from} → {q.to}
                    </p>
                  </div>
                  {i === 0 && (
                    <div className="border-b border-black/[0.08] bg-[#fafafa] px-[8px] py-[4px] text-[6.5px]">
                      <p className="mb-[2px] font-semibold text-black/60">Suggested drivers · chain of custody</p>
                      {[
                        ["Priya Sandhu", "car", "0.8 mi", "4 min", true],
                        ["Chloe Evans", "car", "1.4 mi", "7 min", false],
                        ["Dan Walsh", "van · 4 on board", "1.6 mi", "9 min", false],
                      ].map(([n, v, d, t, best]) => (
                        <p key={n as string} className="flex h-[15px] items-center gap-[4px]">
                          <span className="min-w-0 flex-1 truncate">
                            <span className="font-medium">{n as string}</span> <span className="text-black/40">{v as string}</span>
                          </span>
                          <span className="tabular-nums text-black/55">
                            {d as string} · {t as string}
                          </span>
                          <span className={`rounded-[2px] px-[4px] py-[1px] font-semibold ${best ? "text-white" : "border border-black/15 text-black/60"}`} style={best ? { background: tint } : undefined}>
                            Assign
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* map */}
          <GeoMap geo={BIRMINGHAM} view={DV} w={304} h={326} k={0.9}>
            <svg className="absolute inset-0" width={304} height={326} aria-hidden="true">
              <line x1={px} y1={py} x2={jx} y2={jy} stroke={tint} strokeWidth={1.3} strokeDasharray="3 2" />
            </svg>
            {JOBS.map((j, i) => {
              const k = KIND[j.kind];
              return (
                <span key={i} className="absolute flex size-[12px] -translate-x-1/2 -translate-y-full items-center justify-center rounded-[3px] text-white shadow-[0_1px_3px_rgb(0_0_0/0.3)] ring-1 ring-white" style={{ ...at(DV, j.at), background: k.c }}>
                  <k.Icon className="size-[7px]" aria-hidden="true" />
                </span>
              );
            })}
            {DRIVERS.map((d, i) => (
              <VehiclePin key={i} color={stColor(d.st, tint)} deg={d.deg} style={at(DV, d.at)} size={i === 0 ? 13 : 11} Icon={VEH[d.veh]} halo={i === 0 ? "rgb(22 163 74 / 0.22)" : undefined} />
            ))}
            <StopPin n="!" color={MED} style={{ left: jx, top: jy }} size={14} />
            <span className="absolute whitespace-nowrap rounded-[2px] bg-white px-[3px] py-[1px] text-[6px] font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.3)]" style={{ left: jx + 9, top: jy - 4 }}>
              J-48291
            </span>
            <MapControls style={{ right: 7, top: 7 }} />
            <MapScale label="1 mi" px={30} style={{ left: 7, bottom: 6 }} />
          </GeoMap>

          {/* drivers */}
          <div className="flex min-w-0 flex-1 flex-col border-l border-black/[0.1]">
            <div className="flex h-[20px] shrink-0 items-center justify-between border-b border-black/[0.08] px-[7px] text-[7.5px] font-semibold">
              Drivers
              <span className="text-[6.5px] font-normal text-black/45">nearest to J-48291</span>
            </div>
            {TEAM.map(([n, v, reg, st, note], i) => {
              const Icon = VEH[v];
              return (
                <div key={n} className="flex h-[25px] shrink-0 items-center gap-[5px] border-b border-black/[0.05] px-[7px]" style={i === 0 ? { background: "#f0fdf4" } : undefined}>
                  <span className="size-[5px] shrink-0 rounded-full" style={{ background: stColor(st as Drv["st"], tint) }} />
                  <span className="min-w-0 flex-1 leading-[1.25]">
                    <span className="block truncate text-[7px] font-medium">{n}</span>
                    <span className="flex items-center gap-[2px] text-[6px] text-black/45">
                      <Icon className="size-[6.5px]" aria-hidden="true" />
                      {reg}
                    </span>
                  </span>
                  <span className="text-[6px] tabular-nums text-black/50">{note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Browser>
  );
};

/* 03 · Client tracking: SMS + tracking page ------------------------------ */

const TV: View = { x: 300, y: 330, s: 0.98 };
const TRACK: P[] = [[470, 358], [452, 366], [436, 378], [425, 392], [390, 396], [350, 402], [322, 406], [318, 420], [320, 436], [324, 448]];

function SmsBubble({ children }: { children: ReactNode }) {
  return <div className="max-w-[84%] self-start rounded-[12px] bg-[#e9e9eb] px-[8px] py-[5px] text-[7.5px] leading-[1.38]">{children}</div>;
}

export const ClientTracking: Screen = ({ tint }) => {
  const route = line(TV, TRACK);
  const [done, rest, van, deg] = split(route, 0.42);
  const home = proj(TV, [324, 448]);
  return (
    <div className="flex h-full items-center justify-center gap-[36px] bg-[#e7e8ea]">
      {/* Messages */}
      <Handset time="11:38" bar="#f6f6f6">
        <div className="flex shrink-0 flex-col items-center border-b border-black/[0.08] bg-[#f6f6f6] pb-[5px] pt-[2px]">
          <span className="absolute left-[10px] top-[28px] flex items-center text-[#0a84ff]">
            <ChevronLeft className="size-[12px]" aria-hidden="true" />
            <span className="text-[8px]">12</span>
          </span>
          <span className="flex size-[26px] items-center justify-center rounded-full bg-gradient-to-b from-[#a5a8b0] to-[#868991] text-[10px] font-semibold text-white">C</span>
          <span className="mt-[2px] text-[7px]">CityQuick</span>
          <span className="absolute right-[12px] top-[30px] text-[#0a84ff]">
            <Video className="size-[11px]" aria-hidden="true" />
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[5px] px-[9px] pt-[8px]">
          <p className="text-center text-[6.5px] text-black/40">
            <b className="font-semibold">Today</b> 08:02
          </p>
          <SmsBubble>CityQuick: Your parcel from Boots (order 7735-0092) will be delivered today between 11:30 and 13:30. Track it: track.cityquick.co.uk/8KQ2F</SmsBubble>
          <p className="text-center text-[6.5px] text-black/40">
            <b className="font-semibold">Today</b> 11:31
          </p>
          <SmsBubble>CityQuick: Priya is on her way and you&apos;re 3 stops away. New time: 11:52–12:07.</SmsBubble>
          <div className="max-w-[84%] self-start overflow-hidden rounded-[12px] bg-[#e9e9eb]">
            <div className="h-[58px] bg-[#dfe6dc]">
              <svg viewBox="0 0 150 58" className="h-full w-full" aria-hidden="true">
                <path d="M0 40 C40 30 70 44 150 20" stroke="#fff" strokeWidth="5" fill="none" />
                <path d="M30 0 C40 20 30 40 50 58" stroke="#fff" strokeWidth="3" fill="none" />
                <path d="M90 58 C95 40 110 30 150 34" stroke="#fbecc0" strokeWidth="4" fill="none" />
                <circle cx="96" cy="31" r="4" fill={tint} stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="px-[7px] py-[4px] leading-[1.3]">
              <p className="text-[7px] font-semibold">Track your delivery · City Quick</p>
              <p className="text-[6.5px] text-black/45">track.cityquick.co.uk</p>
            </div>
          </div>
        </div>
        <div className="mb-[14px] flex shrink-0 items-center gap-[5px] px-[8px]">
          <span className="flex size-[18px] items-center justify-center rounded-full bg-[#e9e9eb] text-black/50">
            <Plus className="size-[10px]" aria-hidden="true" />
          </span>
          <span className="flex h-[18px] flex-1 items-center rounded-full border border-black/15 px-[7px] text-[7px] text-black/35">Text Message</span>
        </div>
      </Handset>

      {/* tracking page in Safari */}
      <Handset time="11:39">
        <div className="flex h-[26px] shrink-0 items-center gap-[5px] border-b border-black/[0.08] px-[10px]">
          <Photo {...LOGO} w={26} h={15} />
          <span className="ml-auto text-[6.5px] text-black/45">Help</span>
        </div>
        <div className="shrink-0 px-[10px] pb-[7px] pt-[8px]">
          <p className="text-[7px] text-black/50">Arriving today</p>
          <p className="text-[15px] font-semibold leading-tight tracking-[-0.01em]">11:52 – 12:07</p>
          <p className="mt-[2px] text-[7px] text-black/55">Priya is 3 stops away</p>
          <div className="mt-[5px] flex gap-[2px]">
            {[1, 1, 1, 0.5, 0].map((f, i) => (
              <span key={i} className="h-[3px] flex-1 rounded-full bg-black/10">
                <span className="block h-full rounded-full" style={{ width: `${f * 100}%`, background: tint }} />
              </span>
            ))}
          </div>
        </div>
        <GeoMap
          geo={BIRMINGHAM}
          view={TV}
          w={176}
          h={128}
          k={1.1}
          maxTier={3}
          svg={
            <>
              <RouteLine pts={rest} color={tint} dashed width={2.4} arrows={false} />
              <RouteLine pts={done} color={tint} width={2.8} arrows={false} />
            </>
          }
        >
          <StopPin n={<MapPin className="size-[7px]" strokeWidth={2.6} aria-hidden="true" />} color="#111827" style={{ left: home[0], top: home[1] }} size={14} />
          <VehiclePin color={tint} deg={deg} style={{ left: van[0], top: van[1] }} size={13} Icon={Car} />
        </GeoMap>
        <div className="flex min-h-0 flex-1 flex-col px-[10px] pt-[7px] text-[7px]">
          <p className="flex items-center gap-[6px]">
            <span className="flex size-[20px] items-center justify-center rounded-full bg-[#dcfce7] text-[7px] font-bold text-[#166534]">PS</span>
            <span className="leading-[1.3]">
              <span className="block font-semibold">Priya</span>
              <span className="block text-[6.5px] text-black/50">Silver Toyota Corolla · BX21 KHT</span>
            </span>
          </p>
          <p className="mt-[6px] border-t border-black/[0.07] pt-[5px] text-black/55">From Boots · 1 parcel · signature needed</p>
          <span className="mt-[6px] flex h-[22px] items-center justify-center rounded-[5px] border border-black/15 font-semibold">Add delivery instructions</span>
        </div>
        <div className="mb-[12px] flex shrink-0 items-center gap-[6px] px-[8px] pt-[4px] text-black/55">
          <span className="flex h-[20px] flex-1 items-center justify-between rounded-[8px] bg-[#f0f0f2] px-[7px] text-[7px] shadow-[0_1px_2px_rgb(0_0_0/0.1)]">
            <span className="text-[6.5px] font-semibold">AA</span>
            <span className="text-black/80">track.cityquick.co.uk</span>
            <RotateCw className="size-[7px]" aria-hidden="true" />
          </span>
          <Share className="size-[9px] text-[#0a84ff]" aria-hidden="true" />
        </div>
      </Handset>
    </div>
  );
};

/* 04 · Daily operations dashboard -------------------------------------- */

// Jobs created / delivered per hour, 06:00–15:00 so far.
const HOURS = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];
const CREATED = [118, 264, 331, 298, 276, 312, 287, 241, 203, 106];
const DELIVERED = [12, 96, 214, 268, 259, 247, 281, 236, 208, 81];

const CLIENTS = [
  ["Boots (Midlands stores)", 412, 377, "97.1%", 6],
  ["Midlands Pathology", 318, 289, "99.3%", 0],
  ["Colmore Dental Group", 164, 131, "96.2%", 2],
  ["Bullring retailers", 297, 211, "93.8%", 9],
  ["Heartlands Hospital", 142, 128, "98.4%", 1],
  ["Ad-hoc / web bookings", 606, 452, "91.6%", 17],
] as const;

const FAILED = [
  ["J-47916", "No one available, card left", "Erdington B23"],
  ["J-47988", "Access: gate code wrong", "Harborne B17"],
  ["J-48102", "Refused by recipient", "Digbeth B5"],
  ["J-48133", "Business closed", "Aston B6"],
] as const;

function HourChart({ tint }: { tint: string }) {
  const w = 262;
  const h = 96;
  const L = 18;
  const slot = (w - L) / HOURS.length;
  const max = 350;
  const y = (v: number) => 4 + ((max - v) / max) * (h - 16);
  return (
    <svg width={w} height={h} className="block" aria-hidden="true">
      {[0, 100, 200, 300].map((g) => (
        <g key={g}>
          <line x1={L} x2={w} y1={y(g)} y2={y(g)} stroke="rgb(0 0 0 / 0.07)" />
          <text x={L - 3} y={y(g) + 2.2} textAnchor="end" fontSize="6" fill="rgb(0 0 0 / 0.4)">
            {g}
          </text>
        </g>
      ))}
      {HOURS.map((hh, i) => {
        const x = L + i * slot + 3;
        const bw = (slot - 8) / 2;
        return (
          <g key={hh}>
            <rect x={x.toFixed(1)} y={y(CREATED[i]).toFixed(1)} width={bw.toFixed(1)} height={(y(0) - y(CREATED[i])).toFixed(1)} fill="#cbd5e1" />
            <rect x={(x + bw + 1).toFixed(1)} y={y(DELIVERED[i]).toFixed(1)} width={bw.toFixed(1)} height={(y(0) - y(DELIVERED[i])).toFixed(1)} fill={tint} />
            <text x={(x + bw).toFixed(1)} y={h - 3} textAnchor="middle" fontSize="6" fill="rgb(0 0 0 / 0.45)">
              {hh}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export const OpsDashboard: Screen = ({ tint }) => (
  <Browser w={640} h={400} url="control.cityquick.co.uk/reports/today">
    <div className="flex h-full flex-col bg-[#f4f5f7] text-[#111827]">
      <AppHead tint={tint} active={5} />
      <div className="flex h-[30px] shrink-0 items-center gap-[8px] px-[12px]">
        <p className="text-[10.5px] font-semibold">Operations today</p>
        <span className="text-[7px] text-black/45">Tue 30 Sep · live, updated 15:42</span>
        <span className="ml-auto flex overflow-hidden rounded-[3px] border border-black/[0.15] bg-white text-[7px]">
          {["Today", "Yesterday", "7 days", "Custom"].map((t, i) => (
            <span key={t} className={`px-[6px] py-[2px] ${i === 0 ? "bg-[#111827] font-semibold text-white" : "border-l border-black/10 text-black/60"}`}>
              {t}
            </span>
          ))}
        </span>
        <span className="flex h-[17px] items-center gap-[3px] rounded-[3px] border border-black/[0.15] bg-white px-[6px] text-[7px] font-semibold text-black/70">
          <Download className="size-[7px]" aria-hidden="true" />
          CSV
        </span>
      </div>
      <div className="mx-[12px] shrink-0 rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[6px]">
        <div className="flex items-baseline gap-[6px]">
          <span className="text-[14px] font-semibold tabular-nums">2,436</span>
          <span className="text-[7px] text-black/50">jobs · 284 drivers active</span>
          <span className="ml-auto text-[7px] text-black/50">
            Proof of delivery captured <b className="text-black/80">99.2%</b> (1,887 of 1,902)
          </span>
        </div>
        <div className="mt-[5px] flex h-[7px] overflow-hidden rounded-[2px]">
          {[
            [1902, tint],
            [388, `color-mix(in oklab, ${tint} 40%, white)`],
            [88, "#f59e0b"],
            [41, "#dc2626"],
            [17, "#cbd5e1"],
          ].map(([v, c]) => (
            <span key={c as string} style={{ width: `${((v as number) / 2436) * 100}%`, background: c as string }} />
          ))}
        </div>
        <div className="mt-[4px] flex gap-[12px] text-[6.5px] text-black/55">
          {[
            ["Delivered", "1,902", tint],
            ["In progress", "388", `color-mix(in oklab, ${tint} 40%, white)`],
            ["Not yet assigned", "88", "#f59e0b"],
            ["Failed", "41", "#dc2626"],
            ["Cancelled", "17", "#cbd5e1"],
          ].map(([l, v, c]) => (
            <span key={l} className="flex items-center gap-[3px]">
              <span className="size-[5px] rounded-[1px]" style={{ background: c }} />
              {l} <b className="text-black/75">{v}</b>
            </span>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 gap-[8px] p-[12px] pt-[8px]">
        <div className="flex w-[282px] shrink-0 flex-col gap-[8px]">
          <section className="rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[6px]">
            <p className="flex items-center justify-between text-[7.5px] font-semibold">
              Jobs per hour
              <span className="flex gap-[7px] text-[6.5px] font-normal text-black/50">
                <span className="flex items-center gap-[2px]">
                  <span className="size-[5px] bg-[#cbd5e1]" />
                  Booked
                </span>
                <span className="flex items-center gap-[2px]">
                  <span className="size-[5px]" style={{ background: tint }} />
                  Delivered
                </span>
              </span>
            </p>
            <HourChart tint={tint} />
          </section>
          <section className="min-h-0 flex-1 overflow-hidden rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[6px]">
            <p className="flex items-center justify-between text-[7.5px] font-semibold">
              Failed deliveries (41)
              <span className="text-[6.5px] font-normal" style={{ color: tint }}>
                View all
              </span>
            </p>
            {FAILED.map(([id, why, where]) => (
              <p key={id} className="mt-[3px] flex items-center gap-[5px] border-t border-black/[0.05] pt-[3px] text-[6.5px]">
                <span className="font-mono font-semibold">{id}</span>
                <span className="min-w-0 flex-1 truncate">{why}</span>
                <span className="text-black/45">{where}</span>
              </p>
            ))}
          </section>
        </div>
        <section className="min-w-0 flex-1 overflow-hidden rounded-[4px] border border-black/[0.08] bg-white">
          <p className="flex h-[20px] items-center justify-between border-b border-black/[0.08] px-[9px] text-[7.5px] font-semibold">
            By client
            <Info className="size-[8px] text-black/35" aria-hidden="true" />
          </p>
          <div className="grid h-[16px] grid-cols-[minmax(0,1fr)_30px_40px_36px_26px] items-center gap-[5px] border-b border-black/[0.08] bg-[#f8fafc] px-[9px] text-[6px] font-semibold uppercase text-black/45">
            <span>Client</span>
            <span className="text-right">Jobs</span>
            <span className="text-right">Delivered</span>
            <span className="text-right">On time</span>
            <span className="text-right">Failed</span>
          </div>
          {CLIENTS.map(([c, j, d, ot, f]) => (
            <div key={c} className="grid h-[20px] grid-cols-[minmax(0,1fr)_30px_40px_36px_26px] items-center gap-[5px] border-b border-black/[0.05] px-[9px] text-[7px]">
              <span className="truncate">{c}</span>
              <span className="text-right tabular-nums">{j}</span>
              <span className="text-right tabular-nums">{d}</span>
              <span className="text-right tabular-nums" style={{ color: parseFloat(ot) < 95 ? "#b45309" : undefined }}>
                {ot}
              </span>
              <span className="text-right tabular-nums text-black/55">{f}</span>
            </div>
          ))}
          <div className="grid h-[20px] grid-cols-[minmax(0,1fr)_30px_40px_36px_26px] items-center gap-[5px] px-[9px] text-[7px] font-semibold">
            <span>Total (incl. 497 other)</span>
            <span className="text-right tabular-nums">2,436</span>
            <span className="text-right tabular-nums">1,902</span>
            <span className="text-right tabular-nums">95.4%</span>
            <span className="text-right tabular-nums">41</span>
          </div>
          <p className="border-t border-black/[0.08] px-[9px] py-[5px] text-[6.5px] leading-[1.45] text-black/50">
            Dispatch calls today: <b className="text-black/70">37</b> (driver app messages: 412). Offline proofs waiting to sync: <b className="text-black/70">3</b>.
          </p>
        </section>
      </div>
    </div>
  </Browser>
);

const onBrand = (S: Screen): Screen => {
  const Branded: Screen = () => <S tint={BRAND_ORANGE} />;
  return Branded;
};

export const courierScreens: Screen[] = [DriverApp, DispatchMap, ClientTracking, OpsDashboard].map(onBrand);
