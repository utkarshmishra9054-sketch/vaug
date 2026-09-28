import type { CSSProperties, ReactNode } from "react";
import {
  Anchor,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Filter,
  Layers,
  LocateFixed,
  Mail,
  MapPin,
  Minus,
  MoreHorizontal,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Truck,
  Webhook,
} from "lucide-react";

import { Browser, Toggle, type Screen } from "./kit";
import { Photo } from "./tools";

/* Route planning + live tracking pod · Rotterdam freight forwarder */

/* ================================================================== */
/* Map engine (shared with courier.tsx)                                */
/* ================================================================== */

export type P = [number, number];
/** Viewport onto a geo's world coordinates: top-left corner and px per world unit. */
export type View = { x: number; y: number; s: number };

const rd = (n: number) => Math.round(n * 10) / 10;
export const proj = (v: View, [x, y]: P): P => [rd((x - v.x) * v.s), rd((y - v.y) * v.s)];
/** Absolute-position style for an HTML overlay at a world point. */
export const at = (v: View, p: P): CSSProperties => {
  const [left, top] = proj(v, p);
  return { left, top };
};

/** Catmull-Rom spline through the points, sampled into a dense polyline. */
export function smooth(pts: P[], closed = false, steps = 7): P[] {
  if (pts.length < 3) return pts;
  const n = pts.length;
  const get = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  const out: P[] = [];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    for (let k = 0; k < steps; k++) {
      const t = k / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const c = (j: 0 | 1) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      out.push([c(0), c(1)]);
    }
  }
  if (!closed) out.push(pts[n - 1]);
  return out;
}

export const toD = (pts: P[], closed = false) => `M${pts.map((p) => `${rd(p[0])} ${rd(p[1])}`).join("L")}${closed ? "Z" : ""}`;

/** Projects and smooths a world polyline into px. */
export const line = (v: View, pts: P[], closed = false) => smooth(pts.map((p) => proj(v, p)), closed);

/** Parallel copy of a px polyline, `o` px to its right. */
export function offset(pts: P[], o: number): P[] {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [p[0] - (dy / len) * o, p[1] + (dx / len) * o];
  });
}

/** Cuts a px polyline at a share (0..1) of its length. */
export function split(pts: P[], frac: number): [P[], P[], P, number] {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = lens.reduce((a, b) => a + b, 0);
  const target = total * frac;
  let acc = 0;
  for (let i = 0; i < lens.length; i++) {
    if (acc + lens[i] >= target) {
      const t = (target - acc) / (lens[i] || 1);
      const a = pts[i];
      const b = pts[i + 1];
      const m: P = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      const deg = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
      return [[...pts.slice(0, i + 1), m], [m, ...pts.slice(i + 1)], m, deg];
    }
    acc += lens[i];
  }
  const last = pts[pts.length - 1];
  return [pts, [last], last, 0];
}

/** Evenly spaced chevrons along a px polyline (position + heading). */
export function chevrons(pts: P[], every: number, start = every / 2): { p: P; deg: number }[] {
  const out: { p: P; deg: number }[] = [];
  let next = start;
  let acc = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    while (len > 0 && next <= acc + len) {
      const t = (next - acc) / len;
      out.push({ p: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], deg: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI });
      next += every;
    }
    acc += len;
  }
  return out;
}

/** Deterministic street fabric: a jittered grid with some links dropped. */
export function streetNet(seed: number, box: [number, number, number, number], step: number, jitter: number, keep: number): P[][] {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const [x0, y0, x1, y1] = box;
  const cols = Math.floor((x1 - x0) / step) + 1;
  const rows = Math.floor((y1 - y0) / step) + 1;
  const g: P[][] = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (__, c): P => [x0 + c * step + (rnd() - 0.5) * jitter, y0 + r * step + (rnd() - 0.5) * jitter]));
  const segs: P[][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1 && rnd() < keep) segs.push([g[r][c], g[r][c + 1]]);
      if (r < rows - 1 && rnd() < keep) segs.push([g[r][c], g[r + 1][c]]);
    }
  }
  return segs;
}

export type Label = { t: string; at: P; tier: 1 | 2 | 3 | 4; kind?: "place" | "water" | "area" | "country" | "street"; anchor?: "start" | "middle" | "end"; dot?: boolean; rot?: number; dy?: number };
export type Geo = {
  land: string;
  water: P[][];
  rivers: { pts: P[]; w: number }[];
  basins?: [number, number, number, number][];
  urban: [number, number, number, number][];
  green: [number, number, number, number][];
  lakes?: [number, number, number, number][];
  minor: P[][];
  streets?: P[][];
  major: P[][];
  motorways: P[][];
  rail?: P[][];
  canals?: P[][];
  borders?: P[][];
  labels: Label[];
  shields?: { t: string; at: P; c: string }[];
};

const LABEL: Record<string, { size: number; weight: number; fill: string; italic?: boolean; caps?: boolean; ls?: number }> = {
  "place-1": { size: 9, weight: 700, fill: "#454a42" },
  "place-2": { size: 8, weight: 600, fill: "#555a51" },
  "place-3": { size: 7, weight: 500, fill: "#6f746a" },
  "place-4": { size: 6.5, weight: 500, fill: "#7d8278" },
  water: { size: 7, weight: 500, fill: "#5d8db0", italic: true, ls: 0.4 },
  area: { size: 6.5, weight: 600, fill: "#8b9086", caps: true, ls: 0.8 },
  country: { size: 8, weight: 600, fill: "#a6aa9f", caps: true, ls: 3 },
  street: { size: 6.5, weight: 500, fill: "#6b7065" },
};

/**
 * Vector map: land, urban areas, parks, water, a road hierarchy and labels,
 * drawn for a viewport. `svg` adds vector overlays (routes); `children`
 * adds absolutely positioned HTML (markers, callouts, controls).
 */
export function GeoMap({ geo, view, w, h, k = 1, maxTier = 3, svg, children, className = "" }: { geo: Geo; view: View; w: number; h: number; k?: number; maxTier?: number; svg?: ReactNode; children?: ReactNode; className?: string }) {
  const L = (pts: P[], closed = false) => toD(line(view, pts, closed), closed);
  const flat = (segs: P[][]) => segs.map((s) => toD(s.map((p) => proj(view, p)))).join(" ");
  const road = (segs: P[][], casing: string, fill: string, wc: number, wf: number) => (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {segs.map((r, i) => (
        <path key={`c${i}`} d={L(r)} stroke={casing} strokeWidth={wc * k} />
      ))}
      {segs.map((r, i) => (
        <path key={`f${i}`} d={L(r)} stroke={fill} strokeWidth={wf * k} />
      ))}
    </g>
  );
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: w, height: h, background: geo.land }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 block" aria-hidden="true">
        {geo.urban.map(([x, y, rx, ry], i) => {
          const [cx, cy] = proj(view, [x, y]);
          return <ellipse key={i} cx={cx} cy={cy} rx={rd(rx * view.s)} ry={rd(ry * view.s)} fill="#e4e3db" />;
        })}
        {geo.green.map(([x, y, rx, ry], i) => {
          const [cx, cy] = proj(view, [x, y]);
          return <ellipse key={i} cx={cx} cy={cy} rx={rd(rx * view.s)} ry={rd(ry * view.s)} fill="#dcebd5" />;
        })}
        <path d={flat(geo.minor)} fill="none" stroke="#fff" strokeWidth={0.9 * k} strokeLinecap="round" opacity={0.95} />
        {geo.streets && <path d={flat(geo.streets)} fill="none" stroke="#fff" strokeWidth={1.3 * k} strokeLinecap="round" />}
        {geo.water.map((poly, i) => (
          <path key={i} d={L(poly, true)} fill="#cfe3f0" />
        ))}
        {geo.lakes?.map(([x, y, rx, ry], i) => {
          const [cx, cy] = proj(view, [x, y]);
          return <ellipse key={i} cx={cx} cy={cy} rx={rd(rx * view.s)} ry={rd(ry * view.s)} fill="#cfe3f0" />;
        })}
        {geo.basins?.map(([x, y, bw, bh], i) => {
          const [px, py] = proj(view, [x, y]);
          return <rect key={i} x={px} y={py} width={rd(bw * view.s)} height={rd(bh * view.s)} fill="#cfe3f0" />;
        })}
        {geo.rivers.map((r, i) => (
          <path key={i} d={L(r.pts)} fill="none" stroke="#cfe3f0" strokeWidth={Math.max(1.4, r.w * view.s)} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {geo.canals?.map((c, i) => (
          <path key={i} d={L(c)} fill="none" stroke="#bcd6e8" strokeWidth={1.3 * k} strokeLinecap="round" />
        ))}
        {geo.borders?.map((b, i) => (
          <path key={i} d={L(b)} fill="none" stroke="#b7b3c4" strokeWidth={1} strokeDasharray="4 2 1 2" />
        ))}
        {geo.rail?.map((r, i) => (
          <g key={i} fill="none">
            <path d={L(r)} stroke="#c4c6bd" strokeWidth={1.8 * k} />
            <path d={L(r)} stroke="#f4f4f0" strokeWidth={0.9 * k} strokeDasharray="3 3" />
          </g>
        ))}
        {road(geo.major, "#d9dbd1", "#ffffff", 3.4, 2.2)}
        {road(geo.motorways, "#e3c98a", "#fbecc0", 4.6, 3.2)}
        {geo.labels
          .filter((l) => l.tier <= maxTier || (l.kind && l.kind !== "place" && l.kind !== "street"))
          .map((l) => {
            const [x, y] = proj(view, l.at);
            const st = LABEL[l.kind && l.kind !== "place" ? l.kind : `place-${l.tier}`];
            const dot = l.dot ?? ((!l.kind || l.kind === "place") && l.tier <= 2);
            const anchor = l.anchor ?? (dot ? "start" : "middle");
            return (
              <g key={l.t}>
                {dot && <circle cx={x} cy={y} r={2.1} fill="#fff" stroke="#80857a" strokeWidth={1} />}
                <text
                  x={dot ? (anchor === "end" ? x - 4 : x + 4) : x}
                  y={(dot ? y + 2.8 : y) + (l.dy ?? 0)}
                  textAnchor={anchor}
                  fontSize={st.size}
                  fontWeight={st.weight}
                  fontStyle={st.italic ? "italic" : undefined}
                  letterSpacing={st.ls}
                  fill={st.fill}
                  stroke={geo.land}
                  strokeWidth={2.4}
                  strokeLinejoin="round"
                  paintOrder="stroke"
                  transform={l.rot ? `rotate(${l.rot} ${x} ${y})` : undefined}
                >
                  {st.caps ? l.t.toUpperCase() : l.t}
                </text>
              </g>
            );
          })}
        {geo.shields?.map((s) => {
          const [x, y] = proj(view, s.at);
          const sw = 5 + s.t.length * 4.1;
          return (
            <g key={s.t + s.at.join()}>
              <rect x={rd(x - sw / 2)} y={rd(y - 4.5)} width={rd(sw)} height={9} rx={2} fill={s.c} stroke="#fff" strokeWidth={0.8} />
              <text x={x} y={y + 2.3} textAnchor="middle" fontSize={6.3} fontWeight={700} fill="#fff">
                {s.t}
              </text>
            </g>
          );
        })}
        {svg}
      </svg>
      {children}
    </div>
  );
}

/** Route polyline with a white casing and directional chevrons. */
export function RouteLine({ pts, color, width = 3, dashed = false, arrows = 34, faded = false }: { pts: P[]; color: string; width?: number; dashed?: boolean; arrows?: number | false; faded?: boolean }) {
  const d = toD(pts);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={faded ? 0.45 : 1}>
      <path d={d} stroke="#fff" strokeWidth={width + 2.4} opacity={0.9} />
      <path d={d} stroke={color} strokeWidth={width} strokeDasharray={dashed ? `${width * 1.8} ${width * 1.3}` : undefined} />
      {arrows &&
        chevrons(pts, arrows).map(({ p, deg }, i) => (
          <path key={i} d="M-1.6 -1.9 L0.9 0 L-1.6 1.9" transform={`translate(${rd(p[0])} ${rd(p[1])}) rotate(${Math.round(deg)})`} stroke={dashed ? color : "#fff"} strokeWidth={1.1} />
        ))}
    </g>
  );
}

/** Zoom / layers / locate control cluster. */
export function MapControls({ style }: { style?: CSSProperties }) {
  return (
    <div className="absolute flex flex-col gap-[5px]" style={style}>
      <span className="flex flex-col overflow-hidden rounded-[6px] bg-white shadow-[0_2px_6px_rgb(0_0_0/0.15)] ring-1 ring-black/[0.08]">
        <span className="flex size-[20px] items-center justify-center border-b border-black/[0.07] text-black/60">
          <Plus className="size-[10px]" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span className="flex size-[20px] items-center justify-center text-black/60">
          <Minus className="size-[10px]" strokeWidth={2.4} aria-hidden="true" />
        </span>
      </span>
      <span className="flex size-[20px] items-center justify-center rounded-[6px] bg-white text-black/60 shadow-[0_2px_6px_rgb(0_0_0/0.15)] ring-1 ring-black/[0.08]">
        <Layers className="size-[10px]" aria-hidden="true" />
      </span>
      <span className="flex size-[20px] items-center justify-center rounded-[6px] bg-white text-black/60 shadow-[0_2px_6px_rgb(0_0_0/0.15)] ring-1 ring-black/[0.08]">
        <LocateFixed className="size-[10px]" aria-hidden="true" />
      </span>
    </div>
  );
}

/** Scale bar + attribution. */
export function MapScale({ label, px = 40, style }: { label: string; px?: number; style?: CSSProperties }) {
  return (
    <div className="absolute flex items-end gap-[6px] text-[6.5px] text-black/45" style={style}>
      <span className="flex flex-col items-start leading-none">
        <span className="mb-[1px] font-semibold text-black/55">{label}</span>
        <span className="block h-[4px] border-x border-b border-black/45" style={{ width: px }} />
      </span>
      <span className="rounded-[2px] bg-white/70 px-[3px] py-[1px]">© OpenStreetMap</span>
    </div>
  );
}

/** Numbered stop marker. */
export function StopPin({ n, color, style, size = 14, ring = "#fff" }: { n: ReactNode; color: string; style: CSSProperties; size?: number; ring?: string }) {
  return (
    <span
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-bold leading-none text-white shadow-[0_2px_4px_rgb(0_0_0/0.3)]"
      style={{ ...style, width: size, height: size, background: color, fontSize: size * 0.55, boxShadow: `0 0 0 1.5px ${ring}, 0 2px 4px rgb(0 0 0 / 0.3)` }}
    >
      {n}
    </span>
  );
}

/** Vehicle marker with a heading wedge (deg: 0 = east, clockwise). */
export function VehiclePin({ color, deg, style, size = 16, Icon = Truck, halo }: { color: string; deg: number; style: CSSProperties; size?: number; Icon?: typeof Truck; halo?: string }) {
  return (
    <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ ...style, width: size, height: size }}>
      {halo && <span className="absolute -inset-[5px] rounded-full" style={{ background: halo }} />}
      <span className="absolute -inset-[5px]" style={{ transform: `rotate(${deg + 90}deg)` }}>
        <span className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: 0, height: 0, borderLeft: "3.5px solid transparent", borderRight: "3.5px solid transparent", borderBottom: `5px solid ${color}` }} />
      </span>
      <span className="absolute inset-0 flex items-center justify-center rounded-[5px] text-white shadow-[0_2px_5px_rgb(0_0_0/0.35)] ring-[1.5px] ring-white" style={{ background: color }}>
        <Icon className="size-[60%]" strokeWidth={2.3} aria-hidden="true" />
      </span>
    </span>
  );
}

/* ================================================================== */
/* Benelux + Rhine-Ruhr geography (world units ~1000 x 760)            */
/* ================================================================== */

const NL = "#e2231a";
const DE = "#1d5aa8";
const EU = "#138a43";

const A15: P[] = [[112, 270], [150, 274], [190, 274], [225, 272], [260, 274], [288, 292], [320, 304], [380, 312], [440, 312], [500, 308], [560, 304], [600, 300]];
const A12E: P[] = [[600, 300], [650, 304], [700, 332], [740, 362], [768, 392]];
const A16: P[] = [[262, 252], [280, 270], [296, 294], [308, 330], [322, 362], [332, 390], [312, 418], [285, 440], [262, 462]];
const A58: P[] = [[180, 395], [240, 395], [300, 392], [335, 392], [375, 398], [412, 402], [455, 420], [492, 440]];
const A67: P[] = [[262, 462], [320, 458], [380, 452], [440, 445], [492, 440], [540, 440], [590, 442], [632, 446], [680, 440], [730, 428], [766, 418], [800, 402], [822, 398]];
const A2: P[] = [[320, 105], [350, 150], [365, 190], [372, 212], [400, 250], [430, 300], [462, 350], [480, 400], [492, 440], [530, 475], [570, 505], [605, 550], [598, 590], [592, 626]];

export const BENELUX: Geo = {
  land: "#eef0ea",
  water: [
    [[-40, -40], [264, -40], [262, 0], [252, 60], [238, 110], [216, 160], [196, 196], [172, 228], [150, 246], [112, 248], [92, 258], [96, 280], [132, 284], [140, 296], [116, 308], [90, 318], [72, 340], [62, 366], [72, 388], [50, 404], [22, 420], [-40, 436]],
    [[360, -40], [372, 30], [366, 70], [392, 88], [430, 70], [458, 30], [470, -40]],
  ],
  rivers: [
    { pts: [[118, 266], [150, 262], [185, 264], [215, 262], [240, 257], [262, 255], [282, 262], [296, 276], [302, 292]], w: 7 },
    { pts: [[302, 292], [330, 302], [370, 306], [410, 304], [460, 306], [510, 306], [560, 308], [610, 302], [650, 298]], w: 5 },
    { pts: [[650, 298], [690, 318], [720, 350], [745, 385], [760, 420], [772, 455], [780, 490], [772, 530], [765, 570], [760, 610], [750, 660], [740, 780]], w: 6 },
    { pts: [[110, 308], [160, 310], [210, 312], [250, 316], [290, 324], [322, 334]], w: 11 },
    { pts: [[60, 352], [110, 356], [150, 362], [178, 372]], w: 13 },
    { pts: [[40, 406], [90, 414], [140, 420], [180, 432], [215, 446], [240, 458], [252, 470]], w: 15 },
    { pts: [[252, 470], [256, 500], [252, 540], [262, 580]], w: 4 },
    { pts: [[322, 334], [360, 334], [410, 330], [460, 334], [520, 336], [570, 345], [600, 375], [625, 420], [632, 450], [622, 490], [616, 525], [600, 570], [592, 620], [590, 780]], w: 4 },
    { pts: [[250, 100], [290, 98], [330, 96], [366, 88]], w: 5 },
  ],
  basins: [
    [124, 268, 5, 17],
    [136, 267, 6, 20],
    [150, 267, 5, 15],
    [163, 267, 6, 18],
    [178, 266, 5, 13],
    [180, 252, 5, 11],
    [200, 265, 5, 14],
    [216, 262, 4, 12],
    [238, 259, 5, 11],
  ],
  urban: [
    [320, 105, 26, 18], [205, 195, 17, 14], [262, 252, 27, 15], [300, 290, 9, 7], [370, 210, 16, 13], [332, 390, 12, 9], [410, 400, 13, 9],
    [460, 352, 10, 8], [490, 440, 17, 13], [560, 318, 11, 9], [590, 282, 12, 9], [630, 446, 9, 7], [255, 462, 21, 16], [765, 418, 16, 14],
    [822, 398, 24, 14], [785, 482, 16, 16], [760, 610, 25, 21], [720, 455, 10, 8], [700, 522, 13, 10], [620, 522, 7, 6], [592, 626, 10, 9],
    [130, 520, 16, 12], [270, 640, 26, 20], [270, 545, 9, 7], [340, 625, 10, 8], [500, 580, 10, 8], [785, 378, 11, 8],
  ],
  green: [
    [520, 222, 62, 34], [420, 482, 42, 20], [300, 428, 18, 12], [845, 338, 32, 18], [700, 720, 60, 40], [290, 676, 16, 10],
    [562, 468, 26, 15], [660, 508, 14, 10], [425, 222, 26, 10], [160, 470, 30, 14], [540, 640, 30, 18],
  ],
  minor: streetNet(7, [-20, 40, 1020, 780], 58, 38, 0.5),
  major: [
    [[150, 400], [130, 360], [140, 320], [170, 300], [205, 290]],
    [[262, 252], [270, 300], [282, 332]],
    [[462, 352], [520, 300], [590, 282]],
    [[412, 402], [440, 375], [462, 352]],
    [[462, 352], [520, 400], [560, 440]],
    [[492, 440], [512, 500], [560, 540]],
    [[560, 318], [610, 360], [640, 400]],
    [[700, 440], [740, 470], [785, 482]],
    [[650, 300], [700, 296], [760, 300], [822, 322]],
    [[130, 522], [190, 470], [262, 462]],
    [[262, 462], [300, 500], [340, 540], [340, 625]],
    [[300, 300], [380, 338], [462, 352], [520, 338], [560, 318]],
    [[205, 197], [250, 250], [262, 252]],
  ],
  motorways: [
    A15,
    A12E,
    [[768, 392], [775, 430], [785, 480], [778, 540], [765, 600]],
    A16,
    [[262, 462], [266, 510], [268, 560], [270, 640]],
    [[262, 252], [240, 228], [205, 197]],
    [[205, 197], [250, 160], [290, 125], [320, 105]],
    [[205, 197], [260, 210], [310, 214], [370, 212], [420, 228], [470, 250], [530, 268], [590, 282], [640, 296]],
    A2,
    [[372, 212], [372, 260], [360, 300], [345, 340], [335, 390]],
    A58,
    A67,
    [[560, 318], [585, 360], [610, 405], [632, 446], [630, 490], [620, 522]],
    [[660, 330], [690, 380], [710, 420], [722, 456], [735, 500], [748, 560], [760, 610]],
    [[320, 105], [400, 120], [480, 130], [560, 140], [640, 150]],
    [[-20, 500], [60, 510], [130, 522], [200, 580], [270, 640]],
    [[262, 462], [340, 500], [420, 540], [500, 580]],
    [[640, 470], [680, 500], [700, 522], [720, 580], [740, 640]],
  ],
  borders: [
    [[40, 404], [90, 398], [140, 404], [190, 410], [230, 430], [262, 436], [300, 440], [330, 430], [370, 438], [410, 445], [440, 462], [480, 470], [520, 468], [560, 480], [585, 500], [595, 540], [600, 580], [595, 620], [590, 660], [610, 700], [640, 780]],
    [[660, 60], [650, 200], [640, 262], [662, 294], [690, 302], [670, 332], [652, 380], [660, 420], [650, 462], [664, 500], [650, 540], [630, 580], [615, 640], [610, 700]],
  ],
  labels: [
    { t: "North Sea", at: [118, 226], tier: 1, kind: "water" },
    { t: "Maas", at: [470, 342], tier: 3, kind: "water" },
    { t: "Rhein", at: [728, 344], tier: 3, kind: "water", rot: 52 },
    { t: "Westerschelde", at: [118, 432], tier: 3, kind: "water", rot: 12 },
    { t: "Nederland", at: [470, 180], tier: 1, kind: "country" },
    { t: "België", at: [400, 610], tier: 1, kind: "country" },
    { t: "Deutschland", at: [880, 300], tier: 1, kind: "country", rot: 90 },
    { t: "Rotterdam", at: [262, 252], tier: 1, anchor: "end", dy: -7 },
    { t: "Antwerp", at: [255, 462], tier: 1, anchor: "end" },
    { t: "Amsterdam", at: [320, 105], tier: 1 },
    { t: "Duisburg", at: [765, 418], tier: 1 },
    { t: "Köln", at: [760, 610], tier: 1 },
    { t: "Brussels", at: [270, 640], tier: 1 },
    { t: "Düsseldorf", at: [785, 482], tier: 2 },
    { t: "Eindhoven", at: [490, 440], tier: 2 },
    { t: "Utrecht", at: [370, 210], tier: 2 },
    { t: "Venlo", at: [630, 446], tier: 2 },
    { t: "The Hague", at: [205, 195], tier: 2, anchor: "end" },
    { t: "Nijmegen", at: [560, 318], tier: 2 },
    { t: "Essen", at: [822, 398], tier: 2 },
    { t: "Ghent", at: [130, 520], tier: 2 },
    { t: "Breda", at: [332, 390], tier: 3 },
    { t: "Tilburg", at: [410, 400], tier: 3 },
    { t: "'s-Hertogenbosch", at: [460, 360], tier: 3 },
    { t: "Arnhem", at: [590, 282], tier: 3 },
    { t: "Krefeld", at: [720, 455], tier: 3 },
    { t: "Mönchengladbach", at: [700, 530], tier: 3 },
    { t: "Roermond", at: [620, 528], tier: 3 },
    { t: "Maastricht", at: [592, 634], tier: 3 },
    { t: "Dordrecht", at: [300, 296], tier: 3 },
    { t: "Moerdijk", at: [306, 340], tier: 4 },
    { t: "Maasvlakte", at: [104, 244], tier: 4 },
    { t: "Hasselt", at: [500, 588], tier: 3 },
  ],
  shields: [
    { t: "A15", at: [420, 312], c: NL },
    { t: "A16", at: [318, 352], c: NL },
    { t: "A67", at: [410, 449], c: NL },
    { t: "A2", at: [426, 294], c: NL },
    { t: "A58", at: [372, 398], c: NL },
    { t: "A73", at: [598, 382], c: NL },
    { t: "A3", at: [781, 510], c: DE },
    { t: "A40", at: [700, 436], c: DE },
    { t: "E19", at: [267, 530], c: EU },
    { t: "A12", at: [470, 250], c: NL },
  ],
};

/* ================================================================== */
/* Shared chrome for this study                                        */
/* ================================================================== */

const HOST = "plan.egsrotterdam.com";
const LOGO = { src: "/logos/egs-rotterdam.webp", img: { w: 237, h: 120 } };
const BLUE = "#2563eb";
const VIOLET = "#7c3aed";
const TEAL = "#0891b2";
const GREEN = "#15803d";
const SUB = "#64748b";
const RED = "#dc2626";

/** Planner app header: product tabs on a dark bar. */
function AppBar({ tint, active }: { tint: string; active: number }) {
  return (
    <header className="flex h-[26px] shrink-0 items-center gap-[12px] bg-[#1e2329] px-[10px] text-[7.5px] text-white/65">
      <span className="flex items-center gap-[5px] font-semibold text-white">
        <span className="rounded-[3px] bg-white px-[3px] py-[1.5px]">
          <Photo {...LOGO} w={34} h={17} />
        </span>
        Rotterdam
      </span>
      <nav className="flex h-full items-center gap-[11px]">
        {["Planner", "Live fleet", "Shipments", "Orders", "Customer portal", "Reports"].map((n, i) => (
          <span key={n} className={`flex h-full items-center ${i === active ? "font-semibold text-white" : ""}`} style={i === active ? { boxShadow: `inset 0 -2px 0 ${tint}` } : undefined}>
            {n}
          </span>
        ))}
      </nav>
      <span className="ml-auto flex items-center gap-[9px]">
        <span className="flex h-[16px] w-[120px] items-center gap-[4px] rounded-[3px] bg-white/10 px-[5px] text-[7px] text-white/45">
          <Search className="size-[8px]" aria-hidden="true" />
          Order, truck, container…
        </span>
        <span className="flex items-center gap-[2px]">
          Waalhaven
          <ChevronDown className="size-[7px]" aria-hidden="true" />
        </span>
        <Bell className="size-[9px]" aria-hidden="true" />
        <span className="flex size-[15px] items-center justify-center rounded-full bg-[#3b82f6] text-[6px] font-bold text-white">EV</span>
      </span>
    </header>
  );
}

function Btn2({ children, primary, tint, Icon }: { children: ReactNode; primary?: boolean; tint?: string; Icon?: typeof Truck }) {
  return (
    <span className={`inline-flex h-[18px] shrink-0 items-center gap-[3px] whitespace-nowrap rounded-[3px] px-[7px] text-[7px] font-semibold ${primary ? "text-white" : "border border-black/[0.15] bg-white text-black/70"}`} style={primary ? { background: tint } : undefined}>
      {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
      {children}
    </span>
  );
}

function Status({ tone, children }: { tone: "green" | "amber" | "red" | "blue" | "grey"; children: ReactNode }) {
  const c = { green: ["#dcfce7", "#166534"], amber: ["#fef3c7", "#92400e"], red: ["#fee2e2", "#991b1b"], blue: ["#dbeafe", "#1e40af"], grey: ["#f1f5f9", "#475569"] }[tone];
  return (
    <span className="inline-flex whitespace-nowrap rounded-[2px] px-[3px] py-[1px] text-[6px] font-semibold leading-none" style={{ background: c[0], color: c[1] }}>
      {children}
    </span>
  );
}

/* 01 · Planner map with suggested routes and backhauls ---------------- */

const PV: View = { x: 98, y: 178, s: 0.55 };
const R1: P[] = [[114, 270], ...A15.slice(1), ...A12E.slice(1), [766, 416]];
const R1_BACK: P[] = [[766, 416], [768, 392], [740, 362], [700, 332], [650, 304], [600, 300], [560, 304], [500, 308], [440, 312], [380, 312], [320, 304], [288, 292], [262, 276], [248, 264]];
const R2: P[] = [[250, 262], [262, 252], [285, 232], [310, 214], [370, 212], [400, 250], [430, 300], [462, 350], [480, 400], [492, 440], [540, 440], [590, 442], [630, 446]];
const R3: P[] = [[238, 452], [262, 462], [285, 440], [312, 418], [332, 390], [375, 398], [412, 402]];
const R4: P[] = [[304, 334], [340, 334], [380, 338], [420, 346], [462, 352], [520, 338], [560, 318]];

const PLAN = [
  { id: "NL-42", driver: "Jan de Vries", stops: 3, km: 412, empty: 4, color: "tint", st: ["Suggested", "blue"] },
  { id: "NL-17", driver: "Mila Bakker", stops: 5, km: 268, empty: 11, color: BLUE, st: ["Confirmed", "green"] },
  { id: "BE-05", driver: "T. Peeters (sub)", stops: 3, km: 118, empty: 23, color: VIOLET, st: ["Review", "amber"] },
  { id: "NL-23", driver: "Sanne Jansen", stops: 3, km: 164, empty: 9, color: TEAL, st: ["Confirmed", "green"] },
  { id: "NL-31", driver: "Kees Mulder", stops: 4, km: 301, empty: 14, color: SUB, st: ["Confirmed", "green"] },
  { id: "DE-08", driver: "Lukas Becker", stops: 2, km: 388, empty: 31, color: SUB, st: ["Review", "amber"] },
  { id: "NL-09", driver: "Priya Ramdin", stops: 6, km: 142, empty: 0, color: SUB, st: ["Confirmed", "green"] },
  { id: "NL-12", driver: "—", stops: 3, km: 226, empty: 18, color: SUB, st: ["No driver", "red"] },
  { id: "NL-26", driver: "Bram Visser", stops: 4, km: 247, empty: 12, color: SUB, st: ["Confirmed", "green"] },
] as const;

const STOPS = [
  ["06:30", "ECT Delta, Maasvlakte", "Pick up 40' HC MSKU 704312-8 · slot 06:30–07:00"],
  ["09:05", "Valburg DC", "Deliver 22 pallets · dock 4"],
  ["11:40", "DeCeTe Duisburg", "Deliver container · return empty"],
] as const;

const PCOLS = "38px minmax(0,1fr) 22px 26px 26px 44px";

export const PlannerMap: Screen = ({ tint }) => {
  const r1 = line(PV, R1);
  const back = offset(line(PV, R1_BACK), 4.5);
  const r2 = line(PV, R2);
  const r3 = offset(line(PV, R3), -3.5);
  const r4 = line(PV, R4);
  return (
    <Browser w={640} h={400} url={`${HOST}/planner?date=2026-09-30&depot=WHV`}>
      <div className="flex h-full flex-col bg-white text-[#1f2937]">
        <AppBar tint={tint} active={0} />
      <div className="flex h-[28px] shrink-0 items-center gap-[7px] border-b border-black/[0.1] px-[10px] text-[7.5px]">
        <span className="flex items-center gap-[3px] font-semibold">
          <ChevronLeft className="size-[8px] text-black/40" aria-hidden="true" />
          Tue 30 Sep 2026
          <ChevronRight className="size-[8px] text-black/40" aria-hidden="true" />
        </span>
        <span className="text-black/45">Plan v3 · optimised 05:10 · 38 routes · 212 trucks · 7 unplanned orders</span>
        <span className="ml-auto flex items-center gap-[5px]">
          <Btn2 Icon={RefreshCw}>Re-optimise</Btn2>
          <Btn2 primary tint={tint}>
            Publish to drivers (29)
          </Btn2>
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        {/* route list */}
        <div className="flex w-[238px] shrink-0 flex-col border-r border-black/[0.1]">
          <div className="flex h-[20px] shrink-0 items-center gap-[10px] border-b border-black/[0.08] px-[8px] text-[7px] text-black/50">
            <span className="flex h-full items-center font-semibold text-black" style={{ boxShadow: `inset 0 -2px 0 ${tint}` }}>
              Routes 38
            </span>
            <span>Unplanned 7</span>
            <span>Backhaul offers 12</span>
            <Filter className="ml-auto size-[8px]" aria-hidden="true" />
          </div>
          <div className="grid h-[16px] shrink-0 items-center gap-[4px] border-b border-black/[0.08] bg-[#f8fafc] px-[8px] text-[6px] font-semibold uppercase text-black/45" style={{ gridTemplateColumns: PCOLS }}>
            <span>Route</span>
            <span>Driver</span>
            <span className="text-right">Stp</span>
            <span className="text-right">Km</span>
            <span className="text-right">Empty</span>
            <span>Status</span>
          </div>
          {PLAN.map((r, i) => (
            <div key={r.id}>
              <div className="grid h-[17px] items-center gap-[4px] border-b border-black/[0.06] px-[8px] text-[7px]" style={{ gridTemplateColumns: PCOLS, background: i === 0 ? `color-mix(in oklab, ${tint} 7%, white)` : undefined }}>
                <span className="flex items-center gap-[3px] font-semibold">
                  <span className="h-[7px] w-[2.5px] rounded-[1px]" style={{ background: r.color === "tint" ? tint : r.color }} />
                  {r.id}
                </span>
                <span className={`truncate ${r.driver === "—" ? "text-black/35" : ""}`}>{r.driver}</span>
                <span className="text-right tabular-nums">{r.stops}</span>
                <span className="text-right tabular-nums">{r.km}</span>
                <span className="text-right tabular-nums" style={{ color: r.empty > 20 ? "#b45309" : undefined }}>
                  {r.empty}%
                </span>
                <span>
                  <Status tone={r.st[1]}>{r.st[0]}</Status>
                </span>
              </div>
              {i === 0 && (
                <div className="border-b border-black/[0.08] bg-[#fafafa] px-[8px] py-[5px] text-[6.5px]">
                  {STOPS.map(([t, what, sub], j) => (
                    <div key={t} className="flex gap-[5px] pb-[3px]">
                      <span className="w-[20px] shrink-0 font-semibold tabular-nums">{t}</span>
                      <span className="flex size-[9px] shrink-0 items-center justify-center rounded-full text-[5.5px] font-bold text-white" style={{ background: tint }}>
                        {j + 1}
                      </span>
                      <span className="min-w-0 leading-[1.3]">
                        <span className="block truncate font-medium">{what}</span>
                        <span className="block truncate text-black/45">{sub}</span>
                      </span>
                    </div>
                  ))}
                  <div className="mt-[2px] rounded-[3px] border border-[#bbf7d0] bg-[#f0fdf4] px-[5px] py-[4px] leading-[1.35]">
                    <p className="flex items-center gap-[3px] font-semibold text-[#166534]">
                      <Package className="size-[7px]" aria-hidden="true" />
                      Backhaul offer BH-20931 · Duisburg → Waalhaven
                    </p>
                    <p className="text-black/55">18 pallets, 11.4 t · ready 13:00 · removes 164 empty km · +6 km detour</p>
                    <p className="text-black/55">Drive time after: 8h 55m of 9h (EU 561 ok)</p>
                    <span className="mt-[3px] flex gap-[4px]">
                      <span className="rounded-[2px] bg-[#15803d] px-[5px] py-[1.5px] font-semibold text-white">Add to NL-42</span>
                      <span className="rounded-[2px] border border-black/15 bg-white px-[5px] py-[1.5px] font-semibold text-black/60">Skip</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* map */}
        <GeoMap
          geo={BENELUX}
          view={PV}
          w={402}
          h={304}
          svg={
            <>
              <RouteLine pts={r4} color={TEAL} faded />
              <RouteLine pts={r3} color={VIOLET} faded />
              <RouteLine pts={r2} color={BLUE} faded />
              <RouteLine pts={back} color={GREEN} dashed width={2.4} arrows={26} />
              <RouteLine pts={r1} color={tint} width={3.2} />
            </>
          }
        >
          <StopPin n={1} color={tint} style={at(PV, [114, 270])} />
          <StopPin n={2} color={tint} style={at(PV, [580, 302])} />
          <StopPin n={3} color={tint} style={at(PV, [766, 416])} />
          <StopPin n={<Package className="size-[7px]" strokeWidth={2.5} aria-hidden="true" />} color={GREEN} style={at(PV, [248, 264])} size={14} />
          {(
            [
              [[630, 446], BLUE],
              [[412, 402], VIOLET],
              [[560, 318], TEAL],
            ] as [P, string][]
          ).map(([p, c]) => (
            <span key={c} className="absolute size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-[1.5px] ring-white" style={{ ...at(PV, p), background: c }} />
          ))}
          <VehiclePin color={tint} deg={20} style={at(PV, [340, 308])} size={13} />
          <VehiclePin color={BLUE} deg={-2} style={at(PV, [340, 213])} size={11} />
          <VehiclePin color={VIOLET} deg={-50} style={at(PV, [300, 426])} size={11} />
          <VehiclePin color={TEAL} deg={8} style={at(PV, [400, 342])} size={11} />
          <span className="absolute flex items-center gap-[2px] whitespace-nowrap rounded-[2px] bg-white px-[3px] py-[1px] text-[6px] font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.25)]" style={{ left: proj(PV, [114, 270])[0] + 7, top: proj(PV, [114, 270])[1] + 7 }}>
            <Anchor className="size-[6px]" style={{ color: tint }} aria-hidden="true" />
            ECT Delta
          </span>
          <MapControls style={{ right: 8, top: 8 }} />
          <MapScale label="20 km" px={36} style={{ left: 8, bottom: 6 }} />
        </GeoMap>
      </div>
      <div className="flex h-[18px] shrink-0 items-center gap-[12px] border-t border-black/[0.1] bg-[#f8fafc] px-[10px] text-[6.5px] text-black/55">
        <span>
          Planned <b className="text-black/75">9,412 km</b>
        </span>
        <span>
          Empty <b className="text-black/75">2,318 km (24.6%)</b>
        </span>
        <span>
          Backhauls matched <b className="text-black/75">23</b>
        </span>
        <span>
          EU 561 violations <b className="text-[#15803d]">0</b>
        </span>
        <span className="ml-auto">TMS sync 05:12 · OR-Tools solve 41 s</span>
      </div>
      </div>
    </Browser>
  );
};

/* 02 · Live fleet tracking ------------------------------------------- */

const FV: View = { x: 130, y: 196, s: 0.52 };

/** Truck positions along the corridors: [world point, heading deg, own fleet?, status]. */
const FLEET: [P, number, boolean, "ok" | "late" | "stop"][] = [
  [[170, 274], 0, true, "ok"], [[205, 273], 180, true, "ok"], [[300, 298], 20, false, "ok"], [[350, 308], 5, true, "ok"],
  [[470, 310], -3, true, "ok"], [[530, 306], 180, false, "ok"], [[680, 320], 30, true, "ok"], [[725, 350], 45, true, "stop"],
  [[308, 330], 75, true, "late"], [[330, 380], 80, false, "ok"], [[300, 430], 130, true, "ok"], [[390, 399], 5, true, "ok"],
  [[460, 418], 25, false, "ok"], [[520, 440], 0, true, "ok"], [[600, 443], 180, true, "late"], [[700, 436], -15, false, "ok"],
  [[790, 468], 80, true, "ok"], [[772, 560], 100, false, "ok"], [[400, 250], 55, true, "ok"], [[440, 320], 65, true, "ok"],
  [[610, 405], 60, false, "ok"], [[330, 213], 0, true, "ok"], [[240, 227], 220, true, "ok"], [[350, 455], 180, true, "ok"],
  [[266, 520], 90, false, "ok"], [[580, 505], 40, true, "ok"], [[700, 390], 60, false, "stop"], [[420, 540], 25, true, "ok"],
];

const TRUCKS = [
  ["NL-17", "Mila Bakker", "late", "Venlo DC", "12:05", "+25"],
  ["NL-42", "Jan de Vries", "ok", "Valburg DC", "09:02", "−3"],
  ["BE-05", "T. Peeters", "ok", "Tilburg Vossenberg", "09:10", "0"],
  ["NL-31", "Kees Mulder", "stop", "ECT Delta", "11:00", "slot"],
  ["DE-08", "Lukas Becker", "ok", "DeCeTe Duisburg", "arrived", ""],
  ["NL-23", "Sanne Jansen", "ok", "Nijmegen Noord", "08:47", "+2"],
  ["NL-26", "Bram Visser", "late", "Moerdijk Port", "09:31", "+14"],
  ["BE-11", "D. Claes", "ok", "Antwerp Deurganck", "08:58", "0"],
  ["NL-09", "Priya Ramdin", "ok", "Breda Hazeldonk", "08:40", "−1"],
  ["DE-14", "M. Schulz", "ok", "Krefeld Uerdingen", "10:15", "+4"],
  ["NL-04", "Ruud Smit", "ok", "Waalhaven Oost", "08:36", "0"],
] as const;
const TCOLS = "34px minmax(0,1fr) minmax(0,1.1fr) 30px 22px";

export const LiveFleet: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${HOST}/fleet/live`}>
    <div className="flex h-full flex-col bg-white text-[#1f2937]">
    <AppBar tint={tint} active={1} />
    <div className="flex h-[26px] shrink-0 items-center gap-[4px] border-b border-black/[0.1] px-[10px] text-[7px]">
      {[
        ["All", "212"],
        ["Own fleet", "148"],
        ["Subcontracted", "64"],
        ["Delayed", "11"],
        ["Stopped > 20 min", "6"],
      ].map(([l, n], i) => (
        <span key={l} className={`rounded-[3px] px-[6px] py-[2.5px] ${i === 0 ? "bg-[#1e2329] font-semibold text-white" : "border border-black/[0.12] text-black/65"}`}>
          {l} <span className={i === 0 ? "text-white/60" : "text-black/40"}>{n}</span>
        </span>
      ))}
      <span className="ml-auto text-[6.5px] text-black/45">GPS 6 feeds · last update 07:52:14</span>
    </div>
    <div className="flex min-h-0 flex-1">
      <GeoMap geo={BENELUX} view={FV} w={372} h={324} k={0.85} maxTier={2}>
        {FLEET.map(([p, deg, own, st], i) => (
          <VehiclePin key={i} color={st === "late" ? RED : st === "stop" ? "#d97706" : own ? tint : SUB} deg={deg} style={at(FV, p)} size={i === 8 ? 13 : 10} halo={i === 8 ? "rgb(220 38 38 / 0.2)" : undefined} />
        ))}
        {(
          [
            [[192, 292], 18],
            [[268, 438], 9],
            [[770, 412], 7],
          ] as [P, number][]
        ).map(([p, n]) => (
          <span key={n} className="absolute flex size-[17px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white text-[7px] font-bold text-white shadow-[0_1px_3px_rgb(0_0_0/0.3)]" style={{ ...at(FV, p), background: `color-mix(in oklab, ${tint} 85%, black)` }}>
            {n}
          </span>
        ))}
        <span className="absolute whitespace-nowrap rounded-[2px] bg-white px-[3px] py-[1px] text-[6.5px] font-semibold shadow-[0_1px_2px_rgb(0_0_0/0.3)]" style={{ left: proj(FV, FLEET[8][0])[0] + 9, top: proj(FV, FLEET[8][0])[1] - 5 }}>
          NL-17
        </span>
        <MapControls style={{ right: 7, top: 7 }} />
        <MapScale label="20 km" px={32} style={{ left: 7, bottom: 6 }} />
      </GeoMap>
      <div className="flex min-w-0 flex-1 flex-col border-l border-black/[0.1]">
        <div className="grid h-[17px] shrink-0 items-center gap-[4px] border-b border-black/[0.08] bg-[#f8fafc] px-[7px] text-[6px] font-semibold uppercase text-black/45" style={{ gridTemplateColumns: TCOLS }}>
          <span>Truck</span>
          <span>Driver</span>
          <span>Next stop</span>
          <span className="text-right">ETA</span>
          <span className="text-right">Δ</span>
        </div>
        {TRUCKS.map(([id, d, st, next, eta, delta], i) => (
          <div key={id} className="grid h-[16px] shrink-0 items-center gap-[4px] border-b border-black/[0.05] px-[7px] text-[6.5px]" style={{ gridTemplateColumns: TCOLS, background: i === 0 ? "#fef2f2" : undefined }}>
            <span className="flex items-center gap-[3px] font-semibold">
              <span className="size-[5px] rounded-full" style={{ background: st === "late" ? RED : st === "stop" ? "#d97706" : "#22c55e" }} />
              {id}
            </span>
            <span className="truncate">{d}</span>
            <span className="truncate text-black/60">{next}</span>
            <span className="text-right tabular-nums">{eta}</span>
            <span className="text-right tabular-nums" style={{ color: delta.startsWith("+") && delta !== "+2" ? RED : "rgb(0 0 0 / 0.45)" }}>
              {delta}
            </span>
          </div>
        ))}
        <div className="mt-auto border-t border-black/[0.1] px-[8px] py-[6px] text-[6.5px] leading-[1.45]">
          <p className="flex items-center gap-[4px] text-[8px] font-semibold">
            NL-17 · Mila Bakker
            <Status tone="red">Delayed 25 min</Status>
          </p>
          <p className="text-black/55">A16 southbound, Moerdijk bridge · 18 km/h · congestion</p>
          <div className="mt-[3px] grid grid-cols-2 gap-x-[8px] text-black/55">
            <span>
              ETA Venlo DC <b className="text-[#b91c1c]">12:05</b> (plan 11:40)
            </span>
            <span>
              Drive time left <b className="text-black/80">5h 20m</b>
            </span>
            <span>Load: 22 pallets, 14.8 t</span>
            <span>Transics · ping 8 s ago</span>
          </div>
          <span className="mt-[5px] flex gap-[4px]">
            <Btn2 Icon={Mail}>Notify customer</Btn2>
            <Btn2 Icon={Phone}>Call driver</Btn2>
          </span>
        </div>
      </div>
    </div>
    </div>
  </Browser>
);

/* 03 · Customer tracking portal -------------------------------------- */

const TV: View = { x: 92, y: 196, s: 0.64 };
const SHIP: P[] = [[114, 270], [150, 274], [190, 274], [225, 272], [260, 274], [288, 292], [296, 294], [308, 330], [322, 362], [332, 390], [375, 398], [412, 402], [455, 420], [492, 440], [540, 440], [590, 442], [630, 446], [640, 452]];

const STEPS = [
  ["Collected", "ECT Delta, Maasvlakte · 06:48", "done"],
  ["Customs", "T1 released · 07:05", "done"],
  ["In transit", "A58 near Tilburg · 84 km/h", "now"],
  ["Arriving", "Venlo Tradeport, dock 14", "todo"],
  ["Delivered", "POD sent by email", "todo"],
] as const;

export const CustomerPortal: Screen = ({ tint }) => {
  const route = line(TV, SHIP);
  const [done, rest, truck, deg] = split(route, 0.56);
  const end = proj(TV, [640, 452]);
  return (
    <Browser w={640} h={400} url="track.egsrotterdam.com/shipments/EGS-2409-58317">
      <div className="flex h-full flex-col bg-[#f4f5f7] text-[#1f2937]">
        <header className="flex h-[30px] shrink-0 items-center gap-[10px] border-b border-black/[0.08] bg-white px-[14px]">
          <Photo {...LOGO} w={43} h={22} />
          <span className="text-[9.5px] font-normal text-black/45">Track</span>
          <nav className="ml-[8px] flex h-full gap-[12px] text-[7.5px] text-black/55">
            {["Shipments", "Notifications", "Documents", "API keys"].map((n, i) => (
              <span key={n} className={`flex h-full items-center ${i === 0 ? "font-semibold text-black" : ""}`} style={i === 0 ? { boxShadow: `inset 0 -2px 0 ${tint}` } : undefined}>
                {n}
              </span>
            ))}
          </nav>
          <span className="ml-auto flex items-center gap-[6px] text-[7.5px] text-black/60">
            Brabant Foods BV
            <span className="flex size-[16px] items-center justify-center rounded-full bg-[#e0f2fe] text-[6px] font-bold text-[#075985]">JH</span>
          </span>
        </header>
        <div className="flex h-[30px] shrink-0 items-center gap-[6px] px-[14px] text-[7.5px]">
          <span className="text-black/45">Shipments /</span>
          <span className="font-mono font-semibold">EGS-2409-58317</span>
          <Copy className="size-[8px] text-black/35" aria-hidden="true" />
          <span className="ml-auto flex gap-[5px]">
            <Btn2 Icon={Share2}>Share tracking link</Btn2>
            <Btn2 Icon={Download}>CMR (PDF)</Btn2>
          </span>
        </div>
        <div className="flex min-h-0 flex-1 gap-[8px] px-[14px] pb-[10px]">
          <div className="flex w-[206px] shrink-0 flex-col gap-[7px]">
            <section className="rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[8px]">
              <div className="flex items-center justify-between text-[7px] text-black/50">
                Estimated arrival
                <Status tone="blue">In transit</Status>
              </div>
              <p className="mt-[3px] text-[17px] font-semibold leading-none tracking-[-0.02em]">
                12:40 <span className="text-[8px] font-normal text-black/50">Tue 30 Sep</span>
              </p>
              <p className="mt-[3px] text-[6.5px] text-black/45">± 8 min · updated 07:52 · 118 km to go</p>
              <div className="mt-[8px]">
                {STEPS.map(([l, s, st], i) => (
                  <div key={l} className="relative flex gap-[6px] pb-[5px] last:pb-0">
                    {i < STEPS.length - 1 && <span className="absolute left-[3.5px] top-[9px] h-[calc(100%-6px)] w-px" style={{ background: st === "done" ? tint : "rgb(0 0 0 / 0.12)" }} />}
                    <span className="relative mt-[1.5px] size-[8px] shrink-0 rounded-full" style={st === "todo" ? { boxShadow: "inset 0 0 0 1.2px rgb(0 0 0 / 0.25)", background: "#fff" } : st === "now" ? { background: "#fff", boxShadow: `inset 0 0 0 2.2px ${tint}` } : { background: tint }} />
                    <span className="min-w-0 leading-[1.3]">
                      <span className={`block text-[7.5px] font-semibold ${st === "todo" ? "text-black/45" : ""}`}>{l}</span>
                      <span className="block truncate text-[6.5px] text-black/45">{s}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[6px] text-[6.5px] leading-[1.6]">
              {[
                ["Your ref.", "PO 4500891123"],
                ["Container", "MSKU 704312-8 · 40' HC"],
                ["Weight", "18,240 kg · 22 pallets"],
                ["From", "ECT Delta, Maasvlakte"],
                ["To", "Venlo Tradeport, dock 14"],
              ].map(([k, v]) => (
                <p key={k} className="flex justify-between gap-[6px]">
                  <span className="text-black/45">{k}</span>
                  <span className="truncate font-medium">{v}</span>
                </p>
              ))}
            </section>
            <section className="flex-1 rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[6px] text-[7px]">
              {(
                [
                  [Mail, "Email on status change", true],
                  [Webhook, "Webhook to your TMS", true],
                ] as const
              ).map(([I, l, on]) => (
                <p key={l} className="flex h-[15px] items-center gap-[5px]">
                  <I className="size-[8px] text-black/45" aria-hidden="true" />
                  <span className="flex-1 truncate">{l}</span>
                  <Toggle on={on} tint={tint} />
                </p>
              ))}
            </section>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[4px] border border-black/[0.08]">
            <GeoMap
              geo={BENELUX}
              view={TV}
              w={396}
              h={296}
              svg={
                <>
                  <RouteLine pts={rest} color={tint} dashed width={2.6} arrows={false} />
                  <RouteLine pts={done} color={tint} width={3.2} arrows={30} />
                </>
              }
            >
              <StopPin n={<Anchor className="size-[7px]" strokeWidth={2.5} aria-hidden="true" />} color="#374151" style={at(TV, [114, 270])} size={14} />
              <StopPin n={<MapPin className="size-[8px]" strokeWidth={2.5} aria-hidden="true" />} color={tint} style={{ left: end[0], top: end[1] }} size={16} />
              <VehiclePin color={tint} deg={deg} style={{ left: truck[0], top: truck[1] }} size={15} halo={`color-mix(in oklab, ${tint} 22%, transparent)`} />
              <MapControls style={{ right: 7, top: 7 }} />
              <MapScale label="20 km" px={40} style={{ left: 7, bottom: 6 }} />
            </GeoMap>
          </div>
        </div>
      </div>
    </Browser>
  );
};

/* 04 · Route KPI report (Power BI) ----------------------------------- */

const PBI = ["#118dff", "#12239e", "#e66c37", "#6b007b"];
// Weekly empty-km share, W14 (planner pilot) to W39.
const EMPTY = [31.4, 30.6, 31.2, 30.1, 30.8, 29.9, 30.3, 29.2, 28.8, 29.1, 28.0, 27.4, 27.9, 26.8, 26.5, 26.9, 25.7, 26.1, 25.2, 25.8, 24.9, 25.4, 25.1, 24.6, 25.3, 25.4];
const LOADS_M = [4.6, 4.5, 4.7, 4.9, 5.1, 5.3, 5.4, 5.6];

function PbiCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-[6px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
      <p className="text-[17px] font-light leading-none text-[#252423]">{value}</p>
      <p className="mt-[3px] text-[6.5px] text-[#605e5c]">{label}</p>
    </div>
  );
}

function EmptyChart() {
  const w = 262;
  const h = 102;
  const L = 18;
  const x = (i: number) => L + (i / (EMPTY.length - 1)) * (w - L - 4);
  const y = (v: number) => 6 + ((33 - v) / 11) * (h - 22);
  const d = EMPTY.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} className="block" aria-hidden="true">
      {[22, 26, 30].map((g) => (
        <g key={g}>
          <line x1={L} x2={w - 4} y1={y(g)} y2={y(g)} stroke="#e1dfdd" strokeDasharray="1 2" />
          <text x={L - 3} y={y(g) + 2.2} textAnchor="end" fontSize="6" fill="#605e5c">
            {g}%
          </text>
        </g>
      ))}
      <line x1={L} x2={w - 4} y1={y(31)} y2={y(31)} stroke="#e66c37" strokeDasharray="3 2" strokeWidth={0.8} />
      <text x={w - 5} y={y(31) - 2} textAnchor="end" fontSize="5.5" fill="#e66c37">
        Manual baseline 31.0%
      </text>
      <path d={d} fill="none" stroke={PBI[0]} strokeWidth={1.3} />
      {[0, 5, 10, 15, 20, 25].map((i) => (
        <text key={i} x={x(i)} y={h - 3} textAnchor={i === 25 ? "end" : "middle"} fontSize="6" fill="#605e5c">
          W{14 + i}
        </text>
      ))}
    </svg>
  );
}

function LoadsChart() {
  const w = 222;
  const h = 102;
  const L = 16;
  const bw = 16;
  const slot = (w - L) / LOADS_M.length;
  const y = (v: number) => 6 + ((6 - v) / 6) * (h - 22);
  return (
    <svg width={w} height={h} className="block" aria-hidden="true">
      {[0, 2, 4, 6].map((g) => (
        <g key={g}>
          <line x1={L} x2={w} y1={y(g)} y2={y(g)} stroke="#e1dfdd" strokeDasharray={g ? "1 2" : undefined} />
          <text x={L - 3} y={y(g) + 2.2} textAnchor="end" fontSize="6" fill="#605e5c">
            {g}
          </text>
        </g>
      ))}
      {LOADS_M.map((v, i) => {
        const bx = L + i * slot + (slot - bw) / 2;
        return (
          <g key={i}>
            <rect x={bx.toFixed(1)} y={y(v).toFixed(1)} width={bw} height={(y(0) - y(v)).toFixed(1)} fill={PBI[1]} />
            <text x={(bx + bw / 2).toFixed(1)} y={(y(v) - 2).toFixed(1)} textAnchor="middle" fontSize="5.5" fill="#252423">
              {v.toFixed(1)}
            </text>
            <text x={(bx + bw / 2).toFixed(1)} y={h - 3} textAnchor="middle" fontSize="6" fill="#605e5c">
              {["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"][i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const LANES = [
  ["Maasvlakte – Duisburg", 148, "29.8%", "12.1%", "81%"],
  ["Waalhaven – Venlo", 126, "27.2%", "18.4%", "72%"],
  ["Antwerp – Tilburg", 94, "33.5%", "26.9%", "58%"],
  ["Moerdijk – Nijmegen", 71, "30.1%", "21.7%", "64%"],
  ["Maasvlakte – Köln", 58, "36.0%", "34.8%", "41%"],
  ["Waalhaven – Genk", 44, "32.2%", "29.5%", "47%"],
] as const;

export const RouteKpis: Screen = () => (
  <Browser w={640} h={400} url="app.powerbi.com/groups/me/reports/8c1e…/ReportSection3">
    <div className="flex h-full flex-col bg-[#eaeaea] text-[#252423]">
      <div className="flex h-[24px] shrink-0 items-center gap-[8px] bg-[#252423] px-[10px] text-[7.5px] text-white">
        <LayoutGridIcon />
        <span className="font-semibold">Power BI</span>
        <span className="text-white/60">Route KPIs</span>
        <span className="text-white/40">|</span>
        <span className="text-white/60">Data updated 30/09/26 06:00</span>
        <span className="ml-auto flex h-[15px] w-[110px] items-center gap-[4px] rounded-[2px] bg-white px-[5px] text-[6.5px] text-black/45">
          <Search className="size-[7px]" aria-hidden="true" />
          Search
        </span>
        <MoreHorizontal className="size-[9px]" aria-hidden="true" />
        <span className="flex size-[14px] items-center justify-center rounded-full bg-[#c4dbf6] text-[5.5px] font-bold text-[#004578]">RD</span>
      </div>
      <div className="flex h-[20px] shrink-0 items-center gap-[10px] border-b border-black/[0.1] bg-white px-[10px] text-[7px] text-[#252423]">
        {["File", "Export", "Share", "Chat in Teams", "Get insights", "Subscribe to report", "Edit"].map((n) => (
          <span key={n}>{n}</span>
        ))}
        <span className="ml-auto flex items-center gap-[4px] text-black/55">
          <RefreshCw className="size-[7px]" aria-hidden="true" />
          Reset to default
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 p-[8px]">
          <div className="flex h-full flex-col gap-[6px] bg-[#f3f2f1] p-[8px] shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
            <div className="flex items-end justify-between">
              <p className="text-[11px] font-semibold">Route optimisation · weekly KPIs</p>
              <p className="text-[6.5px] text-[#605e5c]">Planner live since W14 · all depots · own + subcontracted</p>
            </div>
            <div className="grid grid-cols-4 gap-[6px]">
              <PbiCard value="25.4%" label="Empty km share (W39)" />
              <PbiCard value="5.6" label="Loads per truck per week" />
              <PbiCard value="94.6%" label="On-time delivery" />
              <PbiCard value="412" label="“Where is my shipment?” calls / week" />
            </div>
            <div className="flex gap-[6px]">
              <div className="bg-white px-[6px] py-[5px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
                <p className="text-[7.5px] font-semibold">Empty km share by week</p>
                <EmptyChart />
              </div>
              <div className="min-w-0 flex-1 bg-white px-[6px] py-[5px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
                <p className="text-[7.5px] font-semibold">Avg loads per truck per week by month</p>
                <LoadsChart />
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden bg-white px-[6px] py-[5px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
              <p className="text-[7.5px] font-semibold">Lanes · last 4 weeks</p>
              <table className="mt-[2px] w-full text-[6.5px]">
                <thead>
                  <tr className="border-b border-[#c8c6c4] text-left font-semibold">
                    <th className="py-[1.5px] font-semibold">Lane</th>
                    <th className="text-right font-semibold">Trips</th>
                    <th className="text-right font-semibold">Empty km (before)</th>
                    <th className="text-right font-semibold">Empty km (now)</th>
                    <th className="text-right font-semibold">Backhaul fill</th>
                  </tr>
                </thead>
                <tbody>
                  {LANES.map(([l, t, a, b, f], i) => (
                    <tr key={l} style={{ background: i % 2 ? "#f3f2f1" : undefined }}>
                      <td className="py-[1.5px]">{l}</td>
                      <td className="text-right tabular-nums">{t}</td>
                      <td className="text-right tabular-nums">{a}</td>
                      <td className="text-right tabular-nums">{b}</td>
                      <td className="text-right tabular-nums">{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex w-[16px] shrink-0 flex-col items-center gap-[30px] border-l border-black/[0.1] bg-white pt-[10px] text-[6.5px] text-[#605e5c]">
          <span className="rotate-90 whitespace-nowrap">Filters</span>
          <span className="mt-[10px] rotate-90 whitespace-nowrap">Visualizations</span>
        </div>
      </div>
      <div className="flex h-[18px] shrink-0 items-center gap-[1px] border-t border-black/[0.1] bg-[#f3f2f1] px-[8px] text-[6.5px]">
        <ChevronLeft className="size-[7px] text-black/40" aria-hidden="true" />
        <ChevronRight className="mr-[4px] size-[7px] text-black/40" aria-hidden="true" />
        {["Overview", "Planner adoption", "Route KPIs", "Lanes", "Customer service"].map((n, i) => (
          <span key={n} className={`px-[7px] py-[3px] ${i === 2 ? "bg-white font-semibold" : "text-[#605e5c]"}`} style={i === 2 ? { boxShadow: "inset 0 -2px 0 #f2c811" } : undefined}>
            {n}
          </span>
        ))}
      </div>
    </div>
  </Browser>
);

function LayoutGridIcon() {
  return (
    <svg viewBox="0 0 10 10" className="size-[8px]" aria-hidden="true">
      {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={c * 3.6} y={r * 3.6} width={2.2} height={2.2} fill="#fff" />))}
    </svg>
  );
}

export const routePlanningScreens: Screen[] = [PlannerMap, LiveFleet, CustomerPortal, RouteKpis];
