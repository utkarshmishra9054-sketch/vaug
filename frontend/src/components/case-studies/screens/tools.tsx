import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Camera,
  ChartColumn,
  ChartLine,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock,
  Columns3,
  Compass,
  Copy,
  CreditCard,
  Download,
  Earth,
  Ellipsis,
  EllipsisVertical,
  FlaskConical,
  Folder,
  Grid3x3,
  Heart,
  House,
  Image as ImageIcon,
  LayoutGrid,
  ListFilter,
  MapPin,
  Maximize2,
  Megaphone,
  Menu,
  MessageCircle,
  MessageSquareText,
  Mic,
  Navigation,
  Pencil,
  Phone,
  Plus,
  Repeat2,
  RotateCw,
  Search,
  Send,
  Settings,
  Share2,
  SlidersHorizontal,
  Smile,
  Star,
  ThumbsUp,
  Trophy,
  UsersRound,
  Video,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Faithful replicas of real marketing-tool UIs (Google Ads, Meta Ads Manager,
 * Google Search, Search Console, GA4, LinkedIn, HubSpot, WhatsApp, Google
 * Business Profile) for the case-study "screenshots". Everything is drawn at
 * the 640 x 400 design scale used by `ShotCanvas` (see ./kit.tsx), so px here
 * are design px.
 *
 * Realism rules: only draw what the real product shows. No annotation cards,
 * badges, gradients, glows or emoji; irregular numbers; the product's own
 * colours, type and terminology. Shells take data; screen files fill them.
 *
 * Desktop tools: wrap in <BrowserChrome> (fills the canvas edge to edge).
 * Phone views: <PhoneFrame> on <PhoneBackdrop>.
 */

/* ================================================================== */
/* Shared                                                              */
/* ================================================================== */

/** Font stacks of each product. */
export const FONT = {
  google: "Roboto, Arial, sans-serif",
  googleSans: "'Google Sans', 'Google Sans Text', Roboto, Arial, sans-serif",
  meta: "Helvetica, Arial, sans-serif",
  apple: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  linkedin: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  hubspot: "'Lexend Deca', Helvetica, Arial, sans-serif",
  web: "Inter, 'Helvetica Neue', Arial, sans-serif",
} as const;

/** Google palette. */
export const G = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#fbbc04",
  green: "#34a853",
  link: "#1a73e8",
  text: "#202124",
  grey: "#5f6368",
  border: "#dadce0",
  line: "#e8eaed",
  serpTitle: "#1a0dab",
  serpText: "#4d5156",
  gscClicks: "#4285f4",
  gscImpr: "#5e35b1",
  gscCtr: "#00897b",
  gscPos: "#e8710a",
} as const;

/** Deterministic PRNG so server and client renders match. */
function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A realistic, noisy daily series: a trend from `from` to `to` (optionally
 * eased), random noise (+/- `noise` share), a weekend dip (`weekly` share on
 * days 5 and 6 of each week, counted from `weekStart`) and one-off `bumps`
 * ({ index: factor }). Deterministic for a given `seed`.
 */
export function noisy({
  n,
  from,
  to,
  seed = 1,
  noise = 0.1,
  weekly = 0,
  weekStart = 0,
  ease = 0,
  bumps = {},
  decimals = 0,
}: {
  n: number;
  from: number;
  to: number;
  seed?: number;
  noise?: number;
  weekly?: number;
  weekStart?: number;
  /** 0 = linear; 1 = fast rise then flatten; -1 = slow start then climb. */
  ease?: number;
  bumps?: Record<number, number>;
  decimals?: number;
}): number[] {
  const r = prng(seed);
  const p = 10 ** decimals;
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 1 : i / (n - 1);
    const e = ease > 0 ? 1 - (1 - t) ** (1 + ease * 2) : ease < 0 ? t ** (1 - ease * 2) : t;
    let v = from + (to - from) * e;
    v *= 1 + (r() * 2 - 1) * noise;
    const d = (i + weekStart) % 7;
    if (weekly && (d === 5 || d === 6)) v *= 1 - weekly * (0.75 + r() * 0.5);
    if (bumps[i]) v *= bumps[i];
    return Math.round(v * p) / p;
  });
}

/** Formats a number with thousands separators (`indian` uses lakh grouping). */
export function num(n: number, { decimals = 0, indian = false }: { decimals?: number; indian?: boolean } = {}) {
  return n.toLocaleString(indian ? "en-IN" : "en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

const ic = (s: number): CSSProperties => ({ width: s, height: s, flexShrink: 0 });

/** Absolutely positions children on the canvas (design px). */
export function Place({ x, y, w, h, children, style }: { x: number; y: number; w?: number; h?: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}>{children}</div>;
}

/**
 * Crops a region of a raster image (natural px `crop` of an image of natural
 * size `img`) into a `w` x `h` box, cover-style. Use for real logos and
 * photos from /public (e.g. a crest cut out of /logos/<client>.webp).
 */
export function Photo({
  src,
  img,
  crop,
  w,
  h,
  radius = 0,
  bg = "transparent",
  style,
}: {
  src: string;
  img: { w: number; h: number };
  crop?: { x: number; y: number; w: number; h: number };
  w: number;
  h: number;
  radius?: number;
  bg?: string;
  style?: CSSProperties;
}) {
  const c = crop ?? { x: 0, y: 0, w: img.w, h: img.h };
  const s = Math.max(w / c.w, h / c.h);
  const ox = c.x * s + (c.w * s - w) / 2;
  const oy = c.y * s + (c.h * s - h) / 2;
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        display: "block",
        flexShrink: 0,
        width: w,
        height: h,
        borderRadius: radius,
        backgroundColor: bg,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${img.w * s}px ${img.h * s}px`,
        backgroundPosition: `${-ox}px ${-oy}px`,
        ...style,
      }}
    />
  );
}

/** A logo mark inside a padded frame (circle for Meta/IG, square for LinkedIn). */
export function LogoAvatar({ size, shape = "circle", bg = "#fff", border = true, children }: { size: number; shape?: "circle" | "square"; bg?: string; border?: boolean; children: ReactNode }) {
  return (
    <span
      className="flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size, flexShrink: 0, borderRadius: shape === "circle" ? "50%" : 2, background: bg, boxShadow: border ? "inset 0 0 0 0.5px rgb(0 0 0 / 0.15)" : undefined }}
    >
      {children}
    </span>
  );
}

/** A person's initials avatar (real products use photos; initials on flat colour read as a default avatar). */
export function Initials({ name, size, bg = "#c7ccd1", color = "#fff" }: { name: string; size: number; bg?: string; color?: string }) {
  const t = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="flex items-center justify-center rounded-full font-medium" style={{ width: size, height: size, flexShrink: 0, background: bg, color, fontSize: size * 0.42 }}>
      {t}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Charts and tables                                                   */
/* ------------------------------------------------------------------ */

export type ChartSeries = { values: number[]; color: string; axis?: "left" | "right"; width?: number; dashed?: boolean; area?: boolean; dots?: boolean };
export type ChartAxis = { max: number; min?: number; ticks?: number; format?: (n: number) => string };

/**
 * A product-style line chart: flat gridlines, axis labels, 1.5px lines.
 * `xLabels` are spread evenly (first left-aligned, last right-aligned).
 * Omit `left.format` to hide left labels.
 */
export function TimeChart({
  w,
  h,
  series,
  xLabels,
  left,
  right,
  size = 8,
  labelColor = G.grey,
  grid = G.line,
  font = FONT.google,
  baseline = "#bdc1c6",
  padL,
  padR,
}: {
  w: number;
  h: number;
  series: ChartSeries[];
  xLabels: string[];
  left: ChartAxis;
  right?: ChartAxis;
  size?: number;
  labelColor?: string;
  grid?: string;
  font?: string;
  baseline?: string;
  padL?: number;
  padR?: number;
}) {
  const pl = padL ?? (left.format ? 30 : 4);
  const pr = padR ?? (right?.format ? 30 : 4);
  const top = size / 2 + 2;
  const bottom = h - size - 6;
  const pw = w - pl - pr;
  const ph = bottom - top;
  const ticks = left.ticks ?? 4;
  const y = (v: number, a: ChartAxis) => bottom - ((v - (a.min ?? 0)) / (a.max - (a.min ?? 0))) * ph;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", fontFamily: font, overflow: "visible" }} aria-hidden="true">
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const yy = bottom - (i / ticks) * ph;
        const lv = (left.min ?? 0) + ((left.max - (left.min ?? 0)) * i) / ticks;
        const rv = right ? (right.min ?? 0) + ((right.max - (right.min ?? 0)) * i) / ticks : 0;
        return (
          <g key={i}>
            <line x1={pl} x2={w - pr} y1={yy} y2={yy} stroke={i === 0 ? baseline : grid} strokeWidth={1} />
            {left.format && (
              <text x={pl - 5} y={yy + size * 0.35} textAnchor="end" fontSize={size} fill={labelColor}>
                {left.format(lv)}
              </text>
            )}
            {right?.format && (
              <text x={w - pr + 5} y={yy + size * 0.35} textAnchor="start" fontSize={size} fill={labelColor}>
                {right.format(rv)}
              </text>
            )}
          </g>
        );
      })}
      {xLabels.map((l, i) => {
        const x = pl + (xLabels.length === 1 ? 0 : (i / (xLabels.length - 1)) * pw);
        const anchor = i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle";
        return (
          <text key={i} x={x} y={h - 2} textAnchor={anchor} fontSize={size} fill={labelColor}>
            {l}
          </text>
        );
      })}
      {series.map((s, si) => {
        const a = s.axis === "right" && right ? right : left;
        const pts = s.values.map((v, i) => [pl + (s.values.length === 1 ? 0 : (i / (s.values.length - 1)) * pw), y(v, a)] as const);
        const d = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
        return (
          <g key={si}>
            {s.area && <path d={`${d} L${pts[pts.length - 1][0]} ${bottom} L${pts[0][0]} ${bottom} Z`} fill={s.color} opacity={0.08} />}
            <path d={d} fill="none" stroke={s.color} strokeWidth={s.width ?? 1.5} strokeLinejoin="round" strokeDasharray={s.dashed ? "4 3" : undefined} />
            {s.dots && pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={1.8} fill="#fff" stroke={s.color} strokeWidth={1.2} />)}
          </g>
        );
      })}
    </svg>
  );
}

/** Simple vertical bars (GA4 / LinkedIn style). */
export function Bars({ w, h, values, max, color, labels, size = 7.5, labelColor = G.grey, grid = G.line, font = FONT.google, gap = 0.35 }: { w: number; h: number; values: number[]; max: number; color: string; labels?: string[]; size?: number; labelColor?: string; grid?: string; font?: string; gap?: number }) {
  const bottom = labels ? h - size - 5 : h;
  const bw = w / values.length;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", fontFamily: font }} aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={0} x2={w} y1={bottom - f * bottom} y2={bottom - f * bottom} stroke={grid} />
      ))}
      <line x1={0} x2={w} y1={bottom} y2={bottom} stroke="#bdc1c6" />
      {values.map((v, i) => {
        const bh = (v / max) * bottom;
        return <rect key={i} x={i * bw + (bw * gap) / 2} y={bottom - bh} width={bw * (1 - gap)} height={bh} fill={color} />;
      })}
      {labels?.map((l, i) => (
        <text key={i} x={i * bw + bw / 2} y={h - 1} textAnchor="middle" fontSize={size} fill={labelColor}>
          {l}
        </text>
      ))}
    </svg>
  );
}

export type Col = { label: ReactNode; w: number; align?: "left" | "right" | "center" };
type GridStyle = {
  font: string;
  size: number;
  color: string;
  rowH: number;
  headH: number;
  pad: number;
  line: string;
  head: CSSProperties;
  total?: CSSProperties;
  row?: CSSProperties;
};

/** Fixed-width table; columns past the right edge are cropped like a real screenshot. */
function Grid({ cols, rows, total, totalFirst = false, s, rowStyle }: { cols: Col[]; rows: ReactNode[][]; total?: ReactNode[]; totalFirst?: boolean; s: GridStyle; rowStyle?: (i: number) => CSSProperties | undefined }) {
  const cell = (c: Col, content: ReactNode, key: number, head = false) => (
    <div
      key={key}
      style={{
        width: c.w,
        flexShrink: 0,
        padding: `0 ${s.pad}px`,
        textAlign: c.align ?? "left",
        overflow: "hidden",
        whiteSpace: head && s.head.whiteSpace ? s.head.whiteSpace : "nowrap",
        textOverflow: "ellipsis",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {content}
    </div>
  );
  const totalRow = total && (
    <div className="flex items-center" style={{ minHeight: s.rowH, borderBottom: `1px solid ${s.line}`, ...s.total }}>
      {cols.map((c, i) => cell(c, total[i], i))}
    </div>
  );
  return (
    <div style={{ fontFamily: s.font, fontSize: s.size, color: s.color, overflow: "hidden", lineHeight: 1.25 }}>
      <div className="flex items-center" style={{ height: s.headH, borderBottom: `1px solid ${s.line}`, ...s.head }}>
        {cols.map((c, i) => cell(c, c.label, i, true))}
      </div>
      {totalFirst && totalRow}
      {rows.map((r, ri) => (
        <div key={ri} className="flex items-center" style={{ height: s.rowH, borderBottom: `1px solid ${s.line}`, ...s.row, ...rowStyle?.(ri) }}>
          {cols.map((c, i) => cell(c, r[i], i))}
        </div>
      ))}
      {!totalFirst && totalRow}
    </div>
  );
}

/** Two stacked, truncated lines in a table cell (value + grey sub-label). */
export function Two({ a, b, bColor = "#65676b", bSize }: { a: ReactNode; b: ReactNode; bColor?: string; bSize?: number }) {
  return (
    <span style={{ display: "block", lineHeight: 1.3, minWidth: 0, overflow: "hidden" }}>
      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis" }}>{a}</span>
      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", color: bColor, fontSize: bSize ?? "0.88em" }}>{b}</span>
    </span>
  );
}

/** A small check box. */
export function CheckBox({ on = false, color = G.link, size = 9, border = "#5f6368" }: { on?: boolean; color?: string; size?: number; border?: string }) {
  return (
    <span className="inline-flex items-center justify-center" style={{ width: size, height: size, borderRadius: 1.5, border: on ? "none" : `1.2px solid ${border}`, background: on ? color : "transparent", flexShrink: 0 }}>
      {on && <Check style={ic(size - 2)} color="#fff" strokeWidth={3.5} aria-hidden="true" />}
    </span>
  );
}

/* ================================================================== */
/* Browser and phone                                                   */
/* ================================================================== */

/**
 * Chrome-style window chrome filling the whole canvas: one thin toolbar
 * with the URL (host dark, path grey), then `children` fill the rest.
 */
export function BrowserChrome({ url, children, bg = "#fff" }: { url: string; children: ReactNode; bg?: string }) {
  const [host, ...rest] = url.split("/");
  const path = rest.length ? `/${rest.join("/")}` : "";
  return (
    <div className="flex flex-col" style={{ width: 640, height: 400, background: bg, fontFamily: FONT.google, overflow: "hidden" }}>
      <div className="flex shrink-0 items-center" style={{ height: 24, background: "#fff", borderBottom: "1px solid #dadce0", padding: "0 8px", gap: 7, color: "#5f6368" }}>
        <span className="flex" style={{ gap: 4 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
        </span>
        <ArrowLeft style={ic(10)} aria-hidden="true" />
        <ArrowRight style={{ ...ic(10), opacity: 0.4 }} aria-hidden="true" />
        <RotateCw style={ic(9)} aria-hidden="true" />
        <span className="flex min-w-0 flex-1 items-center" style={{ height: 16, borderRadius: 8, background: "#f1f3f4", padding: "0 8px", gap: 6, fontSize: 8.5 }}>
          <SlidersHorizontal style={ic(8)} aria-hidden="true" />
          <span className="truncate">
            <span style={{ color: "#202124" }}>{host}</span>
            <span style={{ color: "#5f6368" }}>{path}</span>
          </span>
          <Star style={{ ...ic(8), marginLeft: "auto" }} aria-hidden="true" />
        </span>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#8e6e53" }} />
        <EllipsisVertical style={ic(9)} aria-hidden="true" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/** Plain neutral backdrop for phone views (use with <Place> + <PhoneFrame>). */
export function PhoneBackdrop({ children, bg = "#e9ebee" }: { children: ReactNode; bg?: string }) {
  return (
    <div className="relative" style={{ width: 640, height: 400, background: bg, overflow: "hidden" }}>
      {children}
    </div>
  );
}

/** A plain phone: black bezel, iOS status bar (light or dark), home indicator. */
export function PhoneFrame({ w = 180, h = 380, dark = false, bar, children, time = "9:41" }: { w?: number; h?: number; dark?: boolean; bar?: string; children: ReactNode; time?: string }) {
  const fg = dark ? "#fff" : "#000";
  return (
    <div style={{ width: w, height: h, borderRadius: 28, background: "#1a1a1a", padding: 5, boxShadow: "0 0 0 1px #3a3a3a inset" }}>
      <div className="relative flex h-full flex-col overflow-hidden" style={{ borderRadius: 23, background: dark ? "#000" : "#fff", fontFamily: FONT.apple }}>
        <div className="relative flex shrink-0 items-center justify-between" style={{ height: 22, padding: "0 16px 0 20px", fontSize: 8.5, fontWeight: 600, color: fg, background: bar, zIndex: 2 }}>
          <span>{time}</span>
          <span style={{ position: "absolute", left: "50%", top: 5, width: 52, height: 14, marginLeft: -26, borderRadius: 8, background: "#000" }} />
          <span className="flex items-center" style={{ gap: 3 }}>
            <svg width="11" height="7" viewBox="0 0 11 7" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={i * 3} y={5 - i * 1.6} width="2" height={2 + i * 1.6} rx="0.5" fill={fg} />
              ))}
            </svg>
            <svg width="10" height="7" viewBox="0 0 10 7" aria-hidden="true">
              <path d="M5 7 L1.2 2.8 A5.5 5.5 0 0 1 8.8 2.8 Z" fill={fg} />
            </svg>
            <span style={{ width: 15, height: 7, borderRadius: 2, border: `1px solid ${fg}`, opacity: 0.9, padding: 1 }}>
              <span style={{ display: "block", width: "72%", height: "100%", background: fg, borderRadius: 1 }} />
            </span>
          </span>
        </div>
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
        <span style={{ position: "absolute", bottom: 4, left: "50%", width: 56, height: 3, marginLeft: -28, borderRadius: 2, background: dark ? "#fff" : "#000", opacity: 0.85, zIndex: 3 }} />
      </div>
    </div>
  );
}

/* ================================================================== */
/* Logos (simplified product marks)                                    */
/* ================================================================== */

export function GoogleAdsMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.6 18.2 L10.6 5.8" stroke={G.yellow} strokeWidth="5.4" strokeLinecap="round" />
      <path d="M10.6 5.8 L17.8 18.2" stroke={G.blue} strokeWidth="5.4" strokeLinecap="round" />
      <circle cx="4.9" cy="18.3" r="2.9" fill={G.green} />
    </svg>
  );
}

export function GoogleWordmark({ size = 20 }: { size?: number }) {
  const c = [G.blue, G.red, G.yellow, G.blue, G.green, G.red];
  return (
    <span style={{ fontFamily: "'Product Sans', 'Google Sans', Arial, sans-serif", fontSize: size, fontWeight: 500, letterSpacing: -size * 0.04, lineHeight: 1 }}>
      {"Google".split("").map((ch, i) => (
        <span key={i} style={{ color: c[i] }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function GoogleG({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z" fill={G.blue} />
      <path d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z" fill={G.green} />
      <path d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8z" fill={G.yellow} />
      <path d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z" fill={G.red} />
    </svg>
  );
}

export function MetaMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 32 20" aria-hidden="true">
      <path d="M4 14c0-5 2.6-10 5.8-10 2.6 0 4.2 2.4 6.2 6 2 3.6 3.6 6 6.2 6 1.9 0 3.2-1.6 3.2-4.4 0-4.1-2-7.6-4.6-7.6-2 0-3.6 2-4.8 4" fill="none" stroke="#0866ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 10c-2-3.6-3.6-6-6.2-6" fill="none" stroke="#0668e1" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 14c0 1.8.9 2.4 1.9 2.4 1.8 0 3.2-2.4 5-5.6" fill="none" stroke="#0081fb" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function LinkedInMark({ size = 16 }: { size?: number }) {
  return (
    <span className="flex items-center justify-center" style={{ width: size, height: size, borderRadius: size * 0.14, background: "#0a66c2", color: "#fff", fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: size * 0.68, letterSpacing: -size * 0.03, flexShrink: 0, paddingTop: size * 0.06 }}>
      in
    </span>
  );
}

export function HubSpotMark({ size = 16, color = "#ff5c35" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="15" cy="14" r="4.2" fill="none" stroke={color} strokeWidth="2.6" />
      <path d="M15 9.8V5.4M15 5.4a1.6 1.6 0 1 0 0-.1M11.8 11.4 5.4 6.6M11.9 16.7l-3.3 3" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="4" r="1.9" fill={color} />
      <circle cx="4.4" cy="5.8" r="1.8" fill={color} />
      <circle cx="7.8" cy="20.4" r="1.6" fill={color} />
    </svg>
  );
}

export function AnalyticsMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="16" y="2" width="6" height="20" rx="3" fill="#f9ab00" />
      <rect x="9" y="9" width="6" height="13" rx="3" fill="#e37400" />
      <circle cx="5" cy="19" r="3" fill="#e37400" />
    </svg>
  );
}

export function SearchConsoleMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="1.5" fill="#b0bec5" />
      <rect x="3.5" y="4.5" width="17" height="11" fill="#fff" />
      <circle cx="11" cy="10" r="3.6" fill="none" stroke={G.blue} strokeWidth="2" />
      <path d="M13.6 12.6 18 17" stroke={G.blue} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9 20h6" stroke="#90a4ae" strokeWidth="2" />
    </svg>
  );
}

/* ================================================================== */
/* Google Ads                                                          */
/* ================================================================== */

const GADS_RAIL: { label: string; Icon: LucideIcon }[] = [
  { label: "Create", Icon: Plus },
  { label: "Campaigns", Icon: Megaphone },
  { label: "Goals", Icon: Trophy },
  { label: "Tools", Icon: Wrench },
  { label: "Billing", Icon: CreditCard },
  { label: "Admin", Icon: Settings },
];

/** Default secondary nav of the Campaigns area; `children` rows are indented. */
export const GADS_NAV: { label: string; children?: string[]; open?: boolean }[] = [
  { label: "Overview" },
  { label: "Recommendations" },
  { label: "Insights and reports" },
  { label: "Campaigns", open: true, children: ["Campaigns", "Ad groups", "Ads", "Assets"] },
  { label: "Audiences, keywords and content", open: true, children: ["Search keywords", "Search terms", "Audiences"] },
  { label: "Change history" },
];

/**
 * Google Ads (2025 UI) shell: top bar with logo, account name + customer ID
 * and search; left rail (Create, Campaigns, Goals, Tools, Billing, Admin);
 * the Campaigns nav panel; page title with date range and filter chips.
 * Put <GAdsChartCard> and <GAdsTable> in `children`.
 */
export function GoogleAdsShell({
  account,
  customerId,
  title,
  dateRange,
  dateLabel = "Custom",
  filters = ["Campaign status: All enabled"],
  navActive = "Campaigns",
  nav = GADS_NAV,
  rail = "Campaigns",
  url = "ads.google.com/aw/campaigns?ocid=482913557",
  children,
}: {
  account: string;
  customerId: string;
  title: string;
  dateRange: string;
  dateLabel?: string;
  filters?: string[];
  /** Label of the active nav row (a child label when inside a group). */
  navActive?: string;
  /** Pass `null` to collapse the nav panel. */
  nav?: typeof GADS_NAV | null;
  rail?: string;
  url?: string;
  children: ReactNode;
}) {
  return (
    <BrowserChrome url={url}>
      <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
        <header className="flex shrink-0 items-center" style={{ height: 32, borderBottom: `1px solid ${G.border}`, padding: "0 10px 0 8px", gap: 8 }}>
          <Menu style={{ ...ic(11), color: G.grey }} aria-hidden="true" />
          <GoogleAdsMark size={16} />
          <span style={{ fontFamily: FONT.googleSans, fontSize: 11.5, color: G.grey, whiteSpace: "nowrap" }}>Google Ads</span>
          <span style={{ width: 1, height: 18, background: G.border, margin: "0 2px" }} />
          <span className="min-w-0" style={{ lineHeight: 1.2 }}>
            <span className="block truncate" style={{ fontSize: 9.5, fontWeight: 500 }}>
              {account}
            </span>
            <span className="block" style={{ fontSize: 7.5, color: G.grey }}>
              {customerId}
            </span>
          </span>
          <ChevronDown style={{ ...ic(9), color: G.grey }} aria-hidden="true" />
          <span className="flex items-center" style={{ marginLeft: 10, flex: "0 1 190px", height: 20, borderRadius: 10, background: "#f1f3f4", padding: "0 8px", gap: 5, fontSize: 8, color: G.grey, whiteSpace: "nowrap", overflow: "hidden" }}>
            <Search style={ic(9)} aria-hidden="true" />
            Search for a page or campaign
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 9, color: G.grey }}>
            <ChartColumn style={ic(10)} aria-hidden="true" />
            <RotateCw style={ic(10)} aria-hidden="true" />
            <CircleHelp style={ic(10)} aria-hidden="true" />
            <Bell style={ic(10)} aria-hidden="true" />
            <Initials name="V G" size={16} bg="#7b5e9f" />
          </span>
        </header>
        <div className="flex min-h-0 flex-1">
          <nav className="flex shrink-0 flex-col items-center" style={{ width: 46, paddingTop: 6, gap: 6, borderRight: `1px solid ${G.line}` }}>
            {GADS_RAIL.map(({ label, Icon }, i) => {
              const on = label === rail;
              return (
                <span key={label} className="flex flex-col items-center" style={{ gap: 2, fontSize: 6.5, color: on ? "#0b57d0" : G.grey, fontWeight: on ? 500 : 400 }}>
                  <span className="flex items-center justify-center" style={{ width: 28, height: 18, borderRadius: 9, background: on ? "#d3e3fd" : i === 0 ? "#fff" : "transparent", boxShadow: i === 0 ? "0 1px 2px rgb(0 0 0 / 0.3)" : undefined, color: i === 0 ? G.link : undefined }}>
                    <Icon style={ic(10)} strokeWidth={i === 0 ? 2.4 : 1.8} aria-hidden="true" />
                  </span>
                  {label}
                </span>
              );
            })}
          </nav>
          {nav && (
            <nav className="shrink-0" style={{ width: 118, borderRight: `1px solid ${G.line}`, paddingTop: 6, fontSize: 8, color: G.text, overflow: "hidden" }}>
              {nav.map((g) => (
                <div key={g.label}>
                  <div className="flex items-center justify-between" style={{ height: 19, padding: "0 8px 0 10px", fontWeight: g.children ? 500 : 400, background: !g.children && g.label === navActive ? "#e8f0fe" : undefined, color: !g.children && g.label === navActive ? "#0b57d0" : undefined, borderRadius: "0 10px 10px 0", marginRight: 6 }}>
                    <span className="truncate">{g.label}</span>
                    {g.children && <ChevronDown style={{ ...ic(8), color: G.grey, transform: g.open ? "rotate(180deg)" : undefined }} aria-hidden="true" />}
                  </div>
                  {g.open &&
                    g.children?.map((c) => {
                      const on = c === navActive;
                      return (
                        <div key={c} className="truncate" style={{ height: 18, lineHeight: "18px", padding: "0 8px 0 20px", marginRight: 6, borderRadius: "0 10px 10px 0", background: on ? "#e8f0fe" : undefined, color: on ? "#0b57d0" : G.text, fontWeight: on ? 500 : 400 }}>
                          {c}
                        </div>
                      );
                    })}
                </div>
              ))}
            </nav>
          )}
          <main className="flex min-w-0 flex-1 flex-col" style={{ background: "#fff" }}>
            <div className="flex shrink-0 items-center" style={{ height: 27, padding: "0 12px", gap: 8 }}>
              <span style={{ fontFamily: FONT.googleSans, fontSize: 14, color: G.text }}>{title}</span>
              <span className="ml-auto flex items-center" style={{ gap: 6, fontSize: 8, color: G.grey, whiteSpace: "nowrap" }}>
                <span>{dateLabel}</span>
                <span style={{ color: G.text, fontWeight: 500 }}>{dateRange}</span>
                <ChevronDown style={ic(9)} aria-hidden="true" />
                <ChevronLeft style={ic(9)} aria-hidden="true" />
                <ChevronRight style={{ ...ic(9), opacity: 0.4 }} aria-hidden="true" />
              </span>
            </div>
            <div className="flex shrink-0 items-center" style={{ height: 20, padding: "0 12px", gap: 6, fontSize: 7.5, color: G.grey }}>
              <ListFilter style={ic(9)} aria-hidden="true" />
              {filters.map((f) => (
                <span key={f} className="flex items-center" style={{ height: 15, padding: "0 6px", borderRadius: 4, border: `1px solid ${G.border}`, color: G.text, gap: 3, whiteSpace: "nowrap" }}>
                  {f}
                  <X style={{ ...ic(7), color: G.grey }} aria-hidden="true" />
                </span>
              ))}
              <span style={{ color: G.link, fontWeight: 500 }}>Add filter</span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden" style={{ padding: "2px 12px 0" }}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </BrowserChrome>
  );
}

export type GAdsMetric = { label: string; value: string; on?: boolean };
const GADS_CHIP = [G.blue, G.red, G.yellow, G.green];

/**
 * The chart card: up to 4 metric scorecards (selected ones filled blue, red,
 * yellow, green in order) and a line chart for the selected metrics.
 */
export function GAdsChartCard({ metrics, series, xLabels, left, right, h = 64, w = 432 }: { metrics: GAdsMetric[]; series: number[][]; xLabels: string[]; left: ChartAxis; right?: ChartAxis; h?: number; /** 432 with the nav panel open, 548 with `nav={null}`. */ w?: number }) {
  let k = 0;
  const colors = metrics.map((m) => (m.on ? GADS_CHIP[k++] : null));
  const lineColors = colors.filter(Boolean) as string[];
  return (
    <div style={{ border: `1px solid ${G.border}`, borderRadius: 8, overflow: "hidden" }}>
      <div className="flex" style={{ gap: 0 }}>
        {metrics.map((m, i) => {
          const c = colors[i];
          return (
            <div key={m.label} style={{ flex: "1 1 0", minWidth: 0, height: 38, padding: "5px 8px", background: c ?? "#fff", color: c ? "#fff" : G.text, borderRight: i < metrics.length - 1 ? `1px solid ${c ? "rgb(255 255 255 / 0.25)" : G.line}` : undefined }}>
              <span className="flex items-center" style={{ gap: 2, fontSize: 7.5, opacity: c ? 0.95 : 1, color: c ? undefined : G.grey, whiteSpace: "nowrap" }}>
                <span className="truncate">{m.label}</span>
                <ChevronDown style={ic(7)} aria-hidden="true" />
              </span>
              <span className="block" style={{ fontFamily: FONT.googleSans, fontSize: 14, lineHeight: 1.25, marginTop: 2, whiteSpace: "nowrap" }}>
                {m.value}
              </span>
            </div>
          );
        })}
        <span className="flex items-center" style={{ padding: "0 6px", color: G.grey }}>
          <EllipsisVertical style={ic(9)} aria-hidden="true" />
        </span>
      </div>
      <div style={{ padding: "8px 8px 4px" }}>
        <TimeChart w={w} h={h} series={series.map((v, i) => ({ values: v, color: lineColors[i] ?? G.blue, axis: i === 1 && right ? "right" : "left" }))} xLabels={xLabels} left={left} right={right} size={7} />
      </div>
    </div>
  );
}

/** Google Ads status cell: enabled dot, or paused glyph. */
export function GAdsDot({ state = "enabled" }: { state?: "enabled" | "paused" | "removed" }) {
  if (state === "paused")
    return (
      <span className="inline-flex" style={{ gap: 1.5 }}>
        <span style={{ width: 2, height: 7, background: "#80868b" }} />
        <span style={{ width: 2, height: 7, background: "#80868b" }} />
      </span>
    );
  return <span className="inline-block" style={{ width: 7, height: 7, borderRadius: "50%", background: state === "removed" ? G.red : "#1e8e3e" }} />;
}

/**
 * Dense Google Ads table with a toolbar (blue + button, Search / Filter,
 * Columns, Download, Expand icons), checkbox column and a total row.
 * First two columns of `cols` should be the checkbox (w 18) and status (w 14).
 */
export function GAdsTable({ cols, rows, total, rowH = 19 }: { cols: Col[]; rows: ReactNode[][]; total?: ReactNode[]; rowH?: number }) {
  return (
    <div style={{ marginTop: 5 }}>
      <div className="flex items-center" style={{ height: 22, gap: 10, color: G.grey }}>
        <span className="flex items-center justify-center" style={{ width: 19, height: 19, borderRadius: 6, background: "#0b57d0", color: "#fff" }}>
          <Plus style={ic(11)} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span className="ml-auto flex items-center" style={{ gap: 11 }}>
          {[Search, ListFilter, ChartColumn, Columns3, Download, Maximize2, EllipsisVertical].map((I, i) => (
            <I key={i} style={ic(10)} aria-hidden="true" />
          ))}
        </span>
      </div>
      <Grid
        cols={cols}
        rows={rows}
        total={total}
        s={{
          font: FONT.google,
          size: 8,
          color: G.text,
          rowH,
          headH: 24,
          pad: 4,
          line: G.line,
          head: { color: G.text, fontWeight: 500, fontSize: 7.5, borderTop: `1px solid ${G.border}`, background: "#fff", whiteSpace: "normal", lineHeight: 1.15 },
          total: { fontWeight: 500, background: "#f8f9fa" },
        }}
      />
    </div>
  );
}

/** Google Ads link-blue text (campaign names). */
export function GLink({ children }: { children: ReactNode }) {
  return <span style={{ color: G.link }}>{children}</span>;
}

/* ================================================================== */
/* Meta Ads Manager                                                    */
/* ================================================================== */

const META_TEXT = "#1c2b33";
const META_GREY = "#65676b";
const META_LINE = "#dddfe2";
const META_BLUE = "#0866ff";

/** Meta toggle (blue when on). */
export function MetaToggle({ on = true }: { on?: boolean }) {
  return (
    <span className="relative inline-block" style={{ width: 20, height: 11, borderRadius: 6, background: on ? META_BLUE : "#bcc0c4" }}>
      <span style={{ position: "absolute", top: 1.5, left: on ? 10.5 : 1.5, width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
    </span>
  );
}

/** Meta delivery cell: Active (green), Learning, Learning limited (amber), Off / Completed (grey). */
export function MetaDelivery({ status }: { status: "Active" | "Learning" | "Learning limited" | "Off" | "Completed" | "In review" }) {
  const c = status === "Active" || status === "Learning" ? "#31a24c" : status === "Learning limited" ? "#f7b928" : "#bcc0c4";
  return (
    <span className="inline-flex items-center" style={{ gap: 4 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} />
      {status}
    </span>
  );
}

/**
 * Meta Ads Manager (2025): icon rail, "Campaigns" header with the ad-account
 * selector, search bar with date range, the three wide Campaigns / Ad sets /
 * Ads tabs, the toolbar (+ Create, Duplicate, Edit, A/B test, More, Rules)
 * and a dense table with a "Results from N campaigns" summary row.
 */
export function MetaAdsManager({
  account,
  accountId,
  dateRange,
  tab = 0,
  cols,
  rows,
  total,
  rowH = 30,
  url,
  columnsLabel = "Columns: Performance",
}: {
  account: string;
  accountId: string;
  dateRange: string;
  columnsLabel?: string;
  tab?: 0 | 1 | 2;
  /** Include the checkbox (w 22) and toggle (w 30) columns yourself. */
  cols: Col[];
  rows: ReactNode[][];
  total?: ReactNode[];
  rowH?: number;
  url?: string;
}) {
  const tabs: [string, LucideIcon][] = [
    ["Campaigns", Folder],
    ["Ad sets", Grid3x3],
    ["Ads", ImageIcon],
  ];
  return (
    <BrowserChrome url={url ?? `adsmanager.facebook.com/adsmanager/manage/campaigns?act=${accountId}`}>
      <div className="flex h-full" style={{ fontFamily: FONT.meta, color: META_TEXT, background: "#f0f2f5" }}>
        <nav className="flex shrink-0 flex-col items-center" style={{ width: 34, background: "#fff", borderRight: `1px solid ${META_LINE}`, paddingTop: 8, gap: 12, color: "#606770" }}>
          <MetaMark size={18} />
          {[Menu, House, ChartLine, LayoutGrid, UsersRound, Megaphone, CreditCard].map((I, i) => (
            <span key={i} className="flex items-center justify-center" style={{ width: 22, height: 18, borderRadius: 5, background: i === 3 ? "#e7f0ff" : undefined, color: i === 3 ? META_BLUE : undefined }}>
              <I style={ic(10)} aria-hidden="true" />
            </span>
          ))}
          <span className="mt-auto flex flex-col items-center" style={{ gap: 12, paddingBottom: 10 }}>
            <Settings style={ic(10)} aria-hidden="true" />
            <CircleHelp style={ic(10)} aria-hidden="true" />
          </span>
        </nav>
        <div className="flex min-w-0 flex-1 flex-col" style={{ padding: "0 10px" }}>
          <div className="flex shrink-0 items-center" style={{ height: 34, gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Campaigns</span>
            <span className="flex min-w-0 items-center" style={{ height: 20, padding: "0 7px", borderRadius: 6, background: "#fff", border: `1px solid ${META_LINE}`, gap: 4, fontSize: 8, maxWidth: 240 }}>
              <span className="truncate">
                {account} ({accountId})
              </span>
              <ChevronDown style={ic(8)} aria-hidden="true" />
            </span>
            <span className="ml-auto flex items-center" style={{ gap: 7, fontSize: 7.5, color: META_GREY, whiteSpace: "nowrap" }}>
              Updated just now
              <RotateCw style={ic(8)} aria-hidden="true" />
              <span style={{ height: 20, lineHeight: "20px", padding: "0 8px", borderRadius: 6, background: "#e4e6eb", color: "#bcc0c4", fontWeight: 600 }}>Discard drafts</span>
              <span style={{ height: 20, lineHeight: "20px", padding: "0 8px", borderRadius: 6, background: "#e4e6eb", color: "#bcc0c4", fontWeight: 600 }}>Review and publish</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center" style={{ height: 24, gap: 8 }}>
            <span className="flex flex-1 items-center" style={{ height: 20, borderRadius: 6, background: "#fff", border: `1px solid ${META_LINE}`, padding: "0 7px", gap: 5, fontSize: 8, color: "#8a8d91" }}>
              <Search style={ic(9)} aria-hidden="true" />
              Search and filter
            </span>
            <span className="flex items-center" style={{ height: 20, borderRadius: 6, background: "#fff", border: `1px solid ${META_LINE}`, padding: "0 7px", gap: 5, fontSize: 8, whiteSpace: "nowrap" }}>
              {dateRange}
              <ChevronDown style={ic(8)} aria-hidden="true" />
            </span>
          </div>
          <div className="flex shrink-0" style={{ marginTop: 6, gap: 2 }}>
            {tabs.map(([t, I], i) => (
              <span
                key={t}
                className="flex flex-1 items-center"
                style={{ height: 26, padding: "0 10px", gap: 6, fontSize: 9, fontWeight: 700, borderRadius: "6px 6px 0 0", background: i === tab ? "#fff" : "transparent", color: i === tab ? META_BLUE : "#444950", border: i === tab ? `1px solid ${META_LINE}` : "1px solid transparent", borderBottom: "none" }}
              >
                <I style={ic(10)} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden" style={{ background: "#fff", border: `1px solid ${META_LINE}`, borderTop: "none" }}>
            <div className="flex shrink-0 items-center" style={{ height: 30, padding: "0 8px", gap: 6, fontSize: 8, fontWeight: 600, color: "#444950" }}>
              <span className="flex items-center" style={{ height: 20, padding: "0 8px", borderRadius: 6, background: "#42b72a", color: "#fff", gap: 3 }}>
                <Plus style={ic(9)} strokeWidth={3} aria-hidden="true" />
                Create
              </span>
              {(
                [
                  [Copy, "Duplicate"],
                  [Pencil, "Edit"],
                  [FlaskConical, "A/B test"],
                ] as [LucideIcon, string][]
              ).map(([I, t]) => (
                <span key={t} className="flex items-center" style={{ height: 20, padding: "0 7px", borderRadius: 6, border: `1px solid ${META_LINE}`, gap: 3 }}>
                  <I style={ic(8)} aria-hidden="true" />
                  {t}
                </span>
              ))}
              <span className="flex items-center" style={{ height: 20, padding: "0 7px", borderRadius: 6, border: `1px solid ${META_LINE}`, gap: 3 }}>
                More
                <ChevronDown style={ic(8)} aria-hidden="true" />
              </span>
              <span className="ml-auto flex items-center" style={{ gap: 6, whiteSpace: "nowrap" }}>
                {[columnsLabel, "Breakdown", "Reports"].map((t) => (
                  <span key={t} className="flex items-center" style={{ height: 20, padding: "0 7px", borderRadius: 6, border: `1px solid ${META_LINE}`, gap: 3 }}>
                    {t}
                    <ChevronDown style={ic(8)} aria-hidden="true" />
                  </span>
                ))}
              </span>
            </div>
            <Grid
              cols={cols}
              rows={rows}
              total={total}
              s={{
                font: FONT.meta,
                size: 8,
                color: META_TEXT,
                rowH,
                headH: 28,
                pad: 5,
                line: "#e4e6eb",
                head: { fontWeight: 700, fontSize: 7.5, borderTop: `1px solid ${META_LINE}`, background: "#fff", whiteSpace: "normal" },
                total: { background: "#fff", fontWeight: 400, borderTop: `1px solid ${META_LINE}` },
              }}
            />
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/** Meta link-style campaign name. */
export function MetaLink({ children }: { children: ReactNode }) {
  return <span style={{ color: "#0064d1", fontWeight: 400 }}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Meta ad previews (feed post, Instagram post and Story)              */
/* ------------------------------------------------------------------ */

/**
 * Facebook feed ad. `avatar` is a 22px mark; `image` fills the creative box
 * (`imageH` tall); the grey CTA bar shows domain, headline and button.
 */
export function FacebookPost({
  page,
  avatar,
  text,
  image,
  imageH,
  domain,
  headline,
  cta = "Learn more",
  reactions,
  comments,
  shares,
  w,
}: {
  page: string;
  avatar: ReactNode;
  text: ReactNode;
  image: ReactNode;
  imageH: number;
  domain: string;
  headline: string;
  cta?: string;
  reactions: string;
  comments: string;
  shares: string;
  w: number;
}) {
  return (
    <div style={{ width: w, background: "#fff", fontFamily: FONT.meta, color: "#050505" }}>
      <div className="flex items-center" style={{ padding: "7px 8px 5px", gap: 6 }}>
        {avatar}
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.2 }}>
          <span className="block truncate" style={{ fontSize: 8.5, fontWeight: 600 }}>
            {page}
          </span>
          <span className="flex items-center" style={{ fontSize: 7, color: META_GREY, gap: 2 }}>
            Sponsored · <Earth style={ic(6.5)} aria-hidden="true" />
          </span>
        </span>
        <Ellipsis style={{ ...ic(10), color: META_GREY }} aria-hidden="true" />
        <X style={{ ...ic(10), color: META_GREY }} aria-hidden="true" />
      </div>
      <div style={{ padding: "0 8px 6px", fontSize: 8, lineHeight: 1.35 }}>{text}</div>
      <div style={{ height: imageH, overflow: "hidden", position: "relative" }}>{image}</div>
      <div className="flex items-center" style={{ background: "#f0f2f5", padding: "6px 8px", gap: 6 }}>
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.25 }}>
          <span className="block truncate" style={{ fontSize: 6.5, color: META_GREY, textTransform: "uppercase" }}>
            {domain}
          </span>
          <span className="block truncate" style={{ fontSize: 8.5, fontWeight: 600 }}>
            {headline}
          </span>
        </span>
        <span style={{ fontSize: 8, fontWeight: 600, padding: "4px 8px", borderRadius: 5, background: "#e2e5e9", whiteSpace: "nowrap" }}>{cta}</span>
      </div>
      <div className="flex items-center" style={{ padding: "5px 8px", fontSize: 7.5, color: META_GREY, gap: 3 }}>
        <span className="flex">
          <span className="flex items-center justify-center" style={{ width: 11, height: 11, borderRadius: "50%", background: "#1877f2", border: "1px solid #fff" }}>
            <ThumbsUp style={ic(6)} color="#fff" fill="#fff" aria-hidden="true" />
          </span>
          <span className="flex items-center justify-center" style={{ width: 11, height: 11, borderRadius: "50%", background: "#f33e58", border: "1px solid #fff", marginLeft: -3 }}>
            <Heart style={ic(6)} color="#fff" fill="#fff" aria-hidden="true" />
          </span>
        </span>
        {reactions}
        <span className="ml-auto">
          {comments} comments · {shares} shares
        </span>
      </div>
      <div className="flex items-center justify-around" style={{ borderTop: "1px solid #ced0d4", margin: "0 8px", height: 22, fontSize: 8, fontWeight: 600, color: META_GREY }}>
        {(
          [
            [ThumbsUp, "Like"],
            [MessageCircle, "Comment"],
            [Share2, "Share"],
          ] as [LucideIcon, string][]
        ).map(([I, t]) => (
          <span key={t} className="flex items-center" style={{ gap: 4 }}>
            <I style={ic(10)} aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Instagram feed ad (inside a phone). The CTA row sits under the image. */
export function InstagramPost({
  handle,
  avatar,
  image,
  imageH,
  cta = "Learn more",
  likes,
  caption,
  w,
}: {
  handle: string;
  avatar: ReactNode;
  image: ReactNode;
  imageH: number;
  cta?: string;
  likes: string;
  caption: ReactNode;
  w: number;
}) {
  return (
    <div style={{ width: w, fontFamily: FONT.apple, color: "#000", background: "#fff" }}>
      <div className="flex items-center" style={{ padding: "6px 8px", gap: 6 }}>
        {avatar}
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.2 }}>
          <span className="block truncate" style={{ fontSize: 8, fontWeight: 600 }}>
            {handle}
          </span>
          <span className="block" style={{ fontSize: 7 }}>
            Sponsored
          </span>
        </span>
        <Ellipsis style={ic(11)} aria-hidden="true" />
      </div>
      <div style={{ height: imageH, overflow: "hidden", position: "relative" }}>{image}</div>
      <div className="flex items-center justify-between" style={{ height: 24, padding: "0 9px", fontSize: 8, fontWeight: 600, borderBottom: "0.5px solid #dbdbdb" }}>
        {cta}
        <ChevronRight style={ic(10)} aria-hidden="true" />
      </div>
      <div className="flex items-center" style={{ padding: "6px 9px 0", gap: 10 }}>
        <Heart style={ic(12)} strokeWidth={1.8} aria-hidden="true" />
        <MessageCircle style={{ ...ic(12), transform: "scaleX(-1)" }} strokeWidth={1.8} aria-hidden="true" />
        <Send style={ic(12)} strokeWidth={1.8} aria-hidden="true" />
        <Bookmark style={{ ...ic(12), marginLeft: "auto" }} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p style={{ padding: "4px 9px 0", fontSize: 7.5, fontWeight: 600 }}>{likes} likes</p>
      <p style={{ padding: "2px 9px 0", fontSize: 7.5, lineHeight: 1.35 }}>
        <b style={{ fontWeight: 600 }}>{handle}</b> {caption}
      </p>
    </div>
  );
}

/**
 * Instagram Story ad: progress bars, handle + "Sponsored", full-bleed
 * `image`, and the swipe-up CTA pill at the bottom.
 */
export function InstagramStory({ handle, avatar, image, cta = "Learn more", progress = 0.4 }: { handle: string; avatar: ReactNode; image: ReactNode; cta?: string; progress?: number }) {
  return (
    <div className="relative flex-1" style={{ fontFamily: FONT.apple, color: "#fff", background: "#000", overflow: "hidden", borderRadius: 6, margin: "0 0 18px" }}>
      <div className="absolute inset-0">{image}</div>
      <div className="relative flex" style={{ padding: "5px 6px 0", gap: 2 }}>
        <span style={{ flex: 1, height: 1.5, borderRadius: 1, background: "rgb(255 255 255 / 0.4)", overflow: "hidden" }}>
          <span style={{ display: "block", width: `${progress * 100}%`, height: "100%", background: "#fff" }} />
        </span>
      </div>
      <div className="relative flex items-center" style={{ padding: "6px 7px", gap: 5, textShadow: "0 0 3px rgb(0 0 0 / 0.35)" }}>
        {avatar}
        <span style={{ fontSize: 7.5, fontWeight: 600 }}>{handle}</span>
        <span style={{ fontSize: 7, opacity: 0.85 }}>Sponsored</span>
        <Ellipsis style={{ ...ic(10), marginLeft: "auto" }} aria-hidden="true" />
        <X style={ic(10)} aria-hidden="true" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center" style={{ paddingBottom: 12 }}>
        <span style={{ fontSize: 8, fontWeight: 600, padding: "5px 12px", borderRadius: 14, background: "#fff", color: "#000" }}>{cta}</span>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Google Search results                                              */
/* ================================================================== */

export type SerpAdData = { site: string; url: string; title: string; desc: string; sitelinks?: string[]; favicon?: ReactNode };
export type SerpOrganicData = { site: string; url: string; title: string; desc: string; date?: string; favicon?: ReactNode };

function Favicon({ node, site }: { node?: ReactNode; site: string }) {
  return (
    <span className="flex items-center justify-center overflow-hidden" style={{ width: 18, height: 18, borderRadius: "50%", background: "#f1f3f4", border: "1px solid #ecedef", flexShrink: 0, fontSize: 8, fontWeight: 700, color: G.grey }}>
      {node ?? site[0]}
    </span>
  );
}

/** Sponsored result (put a "Sponsored" <SerpLabel> above the first). */
export function SerpAd({ ad, w = 330 }: { ad: SerpAdData; w?: number }) {
  return (
    <div style={{ width: w, marginBottom: 14 }}>
      <div className="flex items-center" style={{ gap: 7 }}>
        <Favicon node={ad.favicon} site={ad.site} />
        <span className="min-w-0" style={{ lineHeight: 1.25 }}>
          <span className="block truncate" style={{ fontSize: 8.5, color: G.text }}>
            {ad.site}
          </span>
          <span className="flex items-center truncate" style={{ fontSize: 7.5, color: G.serpText, gap: 3 }}>
            {ad.url}
            <EllipsisVertical style={ic(8)} aria-hidden="true" />
          </span>
        </span>
      </div>
      <p className="truncate" style={{ marginTop: 5, fontSize: 12, color: G.serpTitle, lineHeight: 1.3 }}>
        {ad.title}
      </p>
      <p style={{ marginTop: 2, fontSize: 8, color: G.serpText, lineHeight: 1.5 }}>{ad.desc}</p>
      {ad.sitelinks && (
        <p className="flex flex-wrap" style={{ marginTop: 3, fontSize: 8.5, color: G.serpTitle, columnGap: 6, rowGap: 1 }}>
          {ad.sitelinks.map((s, i) => (
            <span key={s}>
              {s}
              {i < ad.sitelinks!.length - 1 && <span style={{ color: G.serpText, marginLeft: 6 }}>·</span>}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

/** Organic result. */
export function SerpResult({ r, w = 330 }: { r: SerpOrganicData; w?: number }) {
  return (
    <div style={{ width: w, marginBottom: 14 }}>
      <div className="flex items-center" style={{ gap: 7 }}>
        <Favicon node={r.favicon} site={r.site} />
        <span className="min-w-0" style={{ lineHeight: 1.25 }}>
          <span className="block truncate" style={{ fontSize: 8.5, color: G.text }}>
            {r.site}
          </span>
          <span className="flex items-center truncate" style={{ fontSize: 7.5, color: G.serpText, gap: 3 }}>
            {r.url}
            <EllipsisVertical style={ic(8)} aria-hidden="true" />
          </span>
        </span>
      </div>
      <p className="truncate" style={{ marginTop: 5, fontSize: 12, color: G.serpTitle, lineHeight: 1.3 }}>
        {r.title}
      </p>
      <p style={{ marginTop: 2, fontSize: 8, color: G.serpText, lineHeight: 1.5 }}>
        {r.date && <span style={{ color: "#70757a" }}>{r.date} — </span>}
        {r.desc}
      </p>
    </div>
  );
}

/** Bold "Sponsored" / "Sponsored results" label. */
export function SerpLabel({ children = "Sponsored" }: { children?: ReactNode }) {
  return <p style={{ fontSize: 9, fontWeight: 700, color: G.text, marginBottom: 8 }}>{children}</p>;
}

/**
 * Desktop Google results page: logo, search box, tabs (All, Images, ...),
 * then `children` in the 330px results column; `aside` is the 180px right
 * column (e.g. a <BusinessProfile> knowledge panel).
 */
export function GoogleSerp({ query, children, aside, tabs = ["All", "Images", "News", "Videos", "Maps", "Shopping", "More"] }: { query: string; children: ReactNode; aside?: ReactNode; tabs?: string[] }) {
  return (
    <BrowserChrome url={`google.com/search?q=${query.trim().replace(/\s+/g, "+")}`}>
      <div className="h-full" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
        <div className="flex items-center" style={{ height: 44, padding: "0 14px 0 18px", gap: 18 }}>
          <GoogleWordmark size={19} />
          <span className="flex items-center" style={{ width: 360, height: 26, borderRadius: 13, boxShadow: "0 1px 5px rgb(32 33 36 / 0.22)", padding: "0 10px 0 13px", gap: 8, fontSize: 9.5 }}>
            <span className="flex-1 truncate">{query}</span>
            <X style={{ ...ic(11), color: "#70757a" }} aria-hidden="true" />
            <span style={{ width: 1, height: 14, background: G.border }} />
            <Mic style={{ ...ic(10), color: G.blue }} aria-hidden="true" />
            <Camera style={{ ...ic(10), color: G.green }} aria-hidden="true" />
            <Search style={{ ...ic(10), color: G.blue }} aria-hidden="true" />
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 10, color: G.grey }}>
            <Settings style={ic(11)} aria-hidden="true" />
            <LayoutGrid style={ic(11)} aria-hidden="true" />
            <Initials name="V G" size={18} bg="#7b5e9f" />
          </span>
        </div>
        <div className="flex items-end" style={{ height: 22, paddingLeft: 98, gap: 14, fontSize: 8.5, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
          {tabs.map((t, i) => (
            <span key={t} style={{ paddingBottom: 5, borderBottom: i === 0 ? `2.5px solid ${G.text}` : "2.5px solid transparent", color: i === 0 ? G.text : undefined, fontWeight: i === 0 ? 500 : 400 }}>
              {t}
            </span>
          ))}
          <span className="ml-auto" style={{ paddingBottom: 5, marginRight: 150 }}>
            Tools
          </span>
        </div>
        <div className="flex" style={{ paddingLeft: 98, paddingTop: 12, gap: 24 }}>
          <div style={{ width: 330 }}>{children}</div>
          {aside && <div style={{ width: 180 }}>{aside}</div>}
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ================================================================== */
/* Google Search Console                                               */
/* ================================================================== */

export type GscMetric = { label: string; value: string; on?: boolean };
const GSC_COLORS = [G.gscClicks, G.gscImpr, G.gscCtr, G.gscPos];

/**
 * Search Console Performance report. `metrics` are the four tiles in order
 * (clicks, impressions, CTR, position); `series` are the lines of the
 * selected tiles (left axis first, right axis second).
 */
export function SearchConsole({
  property,
  metrics,
  series,
  xLabels,
  left,
  right,
  tab = 0,
  cols,
  rows,
  filters = ["Search type: Web", "Date: Last 3 months"],
}: {
  property: string;
  metrics: GscMetric[];
  series: number[][];
  xLabels: string[];
  left: ChartAxis;
  right?: ChartAxis;
  tab?: number;
  cols: Col[];
  rows: ReactNode[][];
  filters?: string[];
}) {
  const on = metrics.map((m, i) => (m.on ? GSC_COLORS[i] : null)).filter(Boolean) as string[];
  return (
    <BrowserChrome url={`search.google.com/search-console/performance/search-analytics?resource_id=${encodeURIComponent(property)}`}>
      <div className="flex h-full" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
        <nav className="shrink-0" style={{ width: 130, borderRight: `1px solid ${G.line}`, fontSize: 8, overflow: "hidden" }}>
          <div className="flex items-center" style={{ height: 32, padding: "0 10px", gap: 6 }}>
            <Menu style={{ ...ic(10), color: G.grey }} aria-hidden="true" />
            <SearchConsoleMark size={14} />
            <span style={{ fontFamily: FONT.googleSans, fontSize: 10, color: G.grey, whiteSpace: "nowrap" }}>Search Console</span>
          </div>
          <div className="flex items-center" style={{ margin: "2px 8px 6px", height: 20, border: `1px solid ${G.border}`, borderRadius: 4, padding: "0 6px", gap: 4, fontSize: 7.5 }}>
            <span className="flex-1 truncate">{property}</span>
            <ChevronDown style={ic(8)} aria-hidden="true" />
          </div>
          {[
            ["Overview", false],
            ["Performance", true],
            ["URL inspection", false],
          ].map(([t, a]) => (
            <div key={t as string} style={{ height: 19, lineHeight: "19px", padding: "0 10px 0 14px", marginRight: 8, borderRadius: "0 10px 10px 0", background: a ? "#e8f0fe" : undefined, color: a ? G.link : G.text, fontWeight: a ? 500 : 400 }}>
              {t as string}
            </div>
          ))}
          {[
            ["Indexing", ["Pages", "Video pages", "Sitemaps", "Removals"]],
            ["Experience", ["Page experience", "Core Web Vitals", "HTTPS"]],
          ].map(([h, items]) => (
            <div key={h as string} style={{ marginTop: 6 }}>
              <div style={{ padding: "4px 14px", fontSize: 7.5, fontWeight: 500, color: G.grey }}>{h as string}</div>
              {(items as string[]).map((t) => (
                <div key={t} style={{ height: 17, lineHeight: "17px", padding: "0 14px" }}>
                  {t}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <main className="min-w-0 flex-1" style={{ background: "#f8f9fa" }}>
          <div className="flex items-center" style={{ height: 32, padding: "0 14px", background: "#fff", borderBottom: `1px solid ${G.line}` }}>
            <span style={{ fontFamily: FONT.googleSans, fontSize: 12 }}>Performance on Search results</span>
            <span className="ml-auto flex items-center" style={{ gap: 4, fontSize: 8, fontWeight: 500, color: G.link }}>
              <Download style={ic(9)} aria-hidden="true" />
              EXPORT
            </span>
          </div>
          <div className="flex items-center" style={{ height: 26, padding: "0 14px", gap: 6, fontSize: 7.5 }}>
            {filters.map((f) => (
              <span key={f} className="flex items-center" style={{ height: 17, padding: "0 7px", borderRadius: 9, border: `1px solid ${G.border}`, background: "#fff", gap: 3 }}>
                {f}
                <Pencil style={{ ...ic(7), color: G.grey }} aria-hidden="true" />
              </span>
            ))}
            <span className="flex items-center" style={{ gap: 2, color: G.link, fontWeight: 500 }}>
              <Plus style={ic(8)} aria-hidden="true" />
              New
            </span>
            <span className="ml-auto" style={{ color: G.grey, fontSize: 7 }}>
              Last update: 7 hours ago
            </span>
          </div>
          <div style={{ margin: "0 14px", background: "#fff", border: `1px solid ${G.line}`, borderRadius: 6, overflow: "hidden" }}>
            <div className="flex">
              {metrics.map((m, i) => {
                const c = m.on ? GSC_COLORS[i] : null;
                return (
                  <div key={m.label} style={{ flex: 1, minWidth: 0, height: 50, padding: "6px 8px", background: c ?? "#fff", color: c ? "#fff" : G.grey }}>
                    <span className="flex items-center" style={{ gap: 4, fontSize: 7.5 }}>
                      <CheckBox on={!!c} color="rgb(255 255 255 / 0)" size={8} border={G.grey} />
                      <span className="truncate">{m.label}</span>
                    </span>
                    <span className="block" style={{ fontSize: 16, marginTop: 5, lineHeight: 1 }}>
                      {m.value}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "8px 8px 4px" }}>
              <TimeChart w={454} h={78} series={series.map((v, i) => ({ values: v, color: on[i] ?? G.blue, axis: i === 1 && right ? "right" : "left", width: 1.4 }))} xLabels={xLabels} left={left} right={right} size={7} />
            </div>
          </div>
          <div style={{ margin: "8px 14px 0", background: "#fff", border: `1px solid ${G.line}`, borderRadius: 6, overflow: "hidden" }}>
            <div className="flex" style={{ height: 24, fontSize: 7.5, fontWeight: 500, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
              {["QUERIES", "PAGES", "COUNTRIES", "DEVICES", "SEARCH APPEARANCE", "DATES"].map((t, i) => (
                <span key={t} className="flex items-center" style={{ padding: "0 9px", color: i === tab ? G.link : undefined, borderBottom: i === tab ? `2px solid ${G.link}` : "2px solid transparent" }}>
                  {t}
                </span>
              ))}
            </div>
            <Grid cols={cols} rows={rows} s={{ font: FONT.google, size: 8, color: G.text, rowH: 20, headH: 22, pad: 8, line: G.line, head: { fontSize: 7.5, color: G.grey, fontWeight: 500 } }} />
          </div>
        </main>
      </div>
    </BrowserChrome>
  );
}

/* ================================================================== */
/* Google Analytics 4                                                  */
/* ================================================================== */

/**
 * GA4 shell: top bar with the Analytics logo and property selector, the
 * left icon rail (Home, Reports, Explore, Advertising, Admin), the Reports
 * nav, page title with date range. Fill `children` with <GA4Card>s / <GA4Table>.
 */
export function GA4Shell({
  account,
  property,
  title,
  dateRange,
  navActive = "Traffic acquisition",
  children,
}: {
  account: string;
  property: string;
  title: string;
  dateRange: string;
  navActive?: string;
  children: ReactNode;
}) {
  const nav: [string, number][] = [
    ["Reports snapshot", 0],
    ["Realtime overview", 0],
    ["Life cycle", -1],
    ["Acquisition", 1],
    ["Overview", 2],
    ["User acquisition", 2],
    ["Traffic acquisition", 2],
    ["Engagement", 1],
    ["Monetisation", 1],
    ["Retention", 1],
    ["User", -1],
    ["User attributes", 1],
    ["Tech", 1],
  ];
  return (
    <BrowserChrome url="analytics.google.com/analytics/web/#/p318824571/reports/explorer">
      <div className="flex h-full flex-col" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
        <header className="flex shrink-0 items-center" style={{ height: 34, padding: "0 10px", gap: 7, borderBottom: `1px solid ${G.line}` }}>
          <AnalyticsMark size={15} />
          <span style={{ fontFamily: FONT.googleSans, fontSize: 11, color: G.grey }}>Analytics</span>
          <span className="min-w-0" style={{ lineHeight: 1.2, marginLeft: 6 }}>
            <span className="block truncate" style={{ fontSize: 7, color: G.grey }}>
              All accounts › {account}
            </span>
            <span className="flex items-center" style={{ fontSize: 9, gap: 2 }}>
              {property}
              <ChevronDown style={ic(8)} aria-hidden="true" />
            </span>
          </span>
          <span className="flex items-center" style={{ marginLeft: 16, width: 220, height: 22, borderRadius: 6, background: "#f1f3f4", padding: "0 8px", gap: 6, fontSize: 8, color: G.grey, whiteSpace: "nowrap", overflow: "hidden" }}>
            <Search style={ic(9)} aria-hidden="true" />
            Try searching &quot;{navActive}&quot;
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 9, color: G.grey }}>
            <LayoutGrid style={ic(10)} aria-hidden="true" />
            <CircleHelp style={ic(10)} aria-hidden="true" />
            <EllipsisVertical style={ic(10)} aria-hidden="true" />
            <Initials name="V G" size={16} bg="#7b5e9f" />
          </span>
        </header>
        <div className="flex min-h-0 flex-1">
          <nav className="flex shrink-0 flex-col items-center" style={{ width: 34, paddingTop: 8, gap: 12, color: G.grey, borderRight: `1px solid ${G.line}` }}>
            {[House, ChartColumn, Compass, Megaphone].map((I, i) => (
              <span key={i} className="flex items-center justify-center" style={{ width: 24, height: 20, borderRadius: 10, background: i === 1 ? "#e8f0fe" : undefined, color: i === 1 ? G.link : undefined }}>
                <I style={ic(10)} aria-hidden="true" />
              </span>
            ))}
            <Settings style={{ ...ic(10), marginTop: "auto", marginBottom: 10 }} aria-hidden="true" />
          </nav>
          <nav className="shrink-0" style={{ width: 118, fontSize: 7.5, paddingTop: 6, borderRight: `1px solid ${G.line}`, overflow: "hidden" }}>
            {nav.map(([t, lvl]) => {
              const on = t === navActive;
              return (
                <div
                  key={t}
                  className="flex items-center truncate"
                  style={{ height: lvl === -1 ? 20 : 17, padding: `0 6px 0 ${lvl === 2 ? 22 : 10}px`, fontSize: lvl === -1 ? 7 : 7.5, fontWeight: lvl === -1 || lvl === 1 ? 500 : 400, color: on ? G.link : lvl === -1 ? G.grey : G.text, background: on ? "#e8f0fe" : undefined, borderRadius: "0 9px 9px 0", marginRight: 6, gap: 4 }}
                >
                  {lvl === 1 && <ChevronDown style={{ ...ic(7), transform: t === "Acquisition" ? undefined : "rotate(-90deg)" }} aria-hidden="true" />}
                  {t}
                </div>
              );
            })}
          </nav>
          <main className="min-w-0 flex-1" style={{ background: "#f8f9fa", padding: "0 12px" }}>
            <div className="flex items-center" style={{ height: 34, gap: 6 }}>
              <span className="truncate" style={{ fontFamily: FONT.googleSans, fontSize: 12 }}>
                {title}
              </span>
              <span className="ml-auto flex items-center" style={{ gap: 5, fontSize: 7.5, whiteSpace: "nowrap" }}>
                <span style={{ color: G.grey }}>Custom</span>
                <span style={{ fontWeight: 500 }}>{dateRange}</span>
                <ChevronDown style={ic(8)} aria-hidden="true" />
              </span>
            </div>
            {children}
          </main>
        </div>
      </div>
    </BrowserChrome>
  );
}

/** GA4 white card with a title. */
export function GA4Card({ title, children, style }: { title?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${G.line}`, borderRadius: 8, padding: 8, ...style }}>
      {title && <p style={{ fontSize: 8, fontWeight: 500, marginBottom: 6 }}>{title}</p>}
      {children}
    </div>
  );
}

/**
 * GA4 report table: search box, dimension header, totals row first
 * ("Total" with "100% of total"), numbered rows.
 */
export function GA4Table({ cols, rows, total }: { cols: Col[]; rows: ReactNode[][]; total: ReactNode[] }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${G.line}`, borderRadius: 8, overflow: "hidden", marginTop: 8 }}>
      <div className="flex items-center" style={{ height: 24, padding: "0 8px", gap: 6, fontSize: 7.5, color: G.grey }}>
        <Search style={ic(9)} aria-hidden="true" />
        Search...
        <span className="ml-auto">Rows per page: 10 · 1–{rows.length} of {rows.length}</span>
      </div>
      <Grid
        cols={cols}
        rows={rows}
        total={total}
        totalFirst
        s={{ font: FONT.google, size: 8, color: G.text, rowH: 18, headH: 28, pad: 6, line: G.line, head: { fontSize: 7.5, fontWeight: 500, whiteSpace: "normal", borderTop: `1px solid ${G.line}`, alignItems: "flex-start", paddingTop: 5 }, total: { fontWeight: 500, background: "#fff", minHeight: 26 } }}
      />
    </div>
  );
}

/* ================================================================== */
/* LinkedIn                                                            */
/* ================================================================== */

const LI_TEXT = "rgb(0 0 0 / 0.9)";
const LI_GREY = "rgb(0 0 0 / 0.6)";
const LI_BLUE = "#0a66c2";
const LI_BG = "#f4f2ee";
const LI_LINE = "#e8e8e8";

/** LinkedIn global nav bar (logo, search, Home ... For Business). */
export function LinkedInNav({ active = "" }: { active?: string }) {
  const items: [string, LucideIcon][] = [
    ["Home", House],
    ["My Network", UsersRound],
    ["Jobs", BriefcaseBusiness],
    ["Messaging", MessageSquareText],
    ["Notifications", Bell],
  ];
  return (
    <div className="flex shrink-0 items-center" style={{ height: 34, background: "#fff", borderBottom: `1px solid ${LI_LINE}`, padding: "0 40px", gap: 6, fontFamily: FONT.linkedin }}>
      <LinkedInMark size={20} />
      <span className="flex items-center" style={{ width: 150, height: 20, borderRadius: 4, background: "#edf3f8", padding: "0 7px", gap: 5, fontSize: 8, color: LI_GREY }}>
        <Search style={ic(9)} aria-hidden="true" />
        Search
      </span>
      <span className="ml-auto flex items-end" style={{ gap: 14, color: LI_GREY }}>
        {items.map(([t, I]) => (
          <span key={t} className="flex flex-col items-center" style={{ fontSize: 6.5, gap: 1, color: t === active ? LI_TEXT : undefined }}>
            <I style={ic(12)} fill={t === active ? "currentColor" : "none"} aria-hidden="true" />
            {t}
          </span>
        ))}
        <span className="flex flex-col items-center" style={{ fontSize: 6.5, gap: 1 }}>
          <Initials name="V G" size={12} bg="#7b5e9f" />
          <span className="flex items-center">
            Me <ChevronDown style={ic(6)} aria-hidden="true" />
          </span>
        </span>
        <span style={{ width: 1, height: 26, background: LI_LINE }} />
        <span className="flex flex-col items-center" style={{ fontSize: 6.5, gap: 1 }}>
          <LayoutGrid style={ic(12)} aria-hidden="true" />
          <span className="flex items-center">
            For Business <ChevronDown style={ic(6)} aria-hidden="true" />
          </span>
        </span>
      </span>
    </div>
  );
}

/**
 * LinkedIn feed post (organic or `promoted`). `logo` is the square company
 * logo (use <LogoAvatar shape="square">). `media` fills a `mediaH` box.
 */
export function LinkedInPost({
  name,
  followers,
  logo,
  promoted = false,
  age = "2d",
  text,
  media,
  mediaH,
  cta,
  headline,
  reactions,
  comments,
  reposts,
  w,
}: {
  name: string;
  followers: string;
  logo: ReactNode;
  promoted?: boolean;
  age?: string;
  text: ReactNode;
  media?: ReactNode;
  mediaH?: number;
  /** Sponsored CTA under the media, e.g. "Learn more". */
  cta?: string;
  headline?: string;
  reactions: string;
  comments: string;
  reposts: string;
  w: number;
}) {
  return (
    <div style={{ width: w, background: "#fff", borderRadius: 8, border: `1px solid ${LI_LINE}`, fontFamily: FONT.linkedin, color: LI_TEXT, overflow: "hidden" }}>
      <div className="flex items-start" style={{ padding: "9px 10px 6px", gap: 7 }}>
        {logo}
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.3 }}>
          <span className="block truncate" style={{ fontSize: 9, fontWeight: 600 }}>
            {name}
          </span>
          <span className="block truncate" style={{ fontSize: 7.5, color: LI_GREY }}>
            {followers} followers
          </span>
          <span className="flex items-center" style={{ fontSize: 7.5, color: LI_GREY, gap: 2 }}>
            {promoted ? (
              "Promoted"
            ) : (
              <>
                {age} · <Earth style={ic(7)} aria-hidden="true" />
              </>
            )}
          </span>
        </span>
        {!promoted && (
          <span className="flex items-center" style={{ fontSize: 8.5, fontWeight: 600, color: LI_BLUE, gap: 2 }}>
            <Plus style={ic(9)} strokeWidth={2.5} aria-hidden="true" />
            Follow
          </span>
        )}
        <Ellipsis style={{ ...ic(11), color: LI_GREY }} aria-hidden="true" />
      </div>
      <div style={{ padding: "0 10px 7px", fontSize: 8.5, lineHeight: 1.4 }}>{text}</div>
      {media && <div style={{ height: mediaH, overflow: "hidden", position: "relative" }}>{media}</div>}
      {cta && (
        <div className="flex items-center" style={{ padding: "6px 10px", gap: 8, background: "#eef3f8" }}>
          <span className="min-w-0 flex-1 truncate" style={{ fontSize: 8.5, fontWeight: 600 }}>
            {headline}
          </span>
          <span style={{ fontSize: 8, fontWeight: 600, color: LI_BLUE, border: `1px solid ${LI_BLUE}`, borderRadius: 12, padding: "3px 10px", whiteSpace: "nowrap" }}>{cta}</span>
        </div>
      )}
      <div className="flex items-center" style={{ padding: "6px 10px 5px", fontSize: 7.5, color: LI_GREY, gap: 4 }}>
        <span className="flex">
          {(
            [
              ["#378fe9", ThumbsUp],
              ["#44712e", UsersRound],
              ["#df704d", Heart],
            ] as [string, LucideIcon][]
          ).map(([c, I], i) => (
            <span key={c} className="flex items-center justify-center" style={{ width: 11, height: 11, borderRadius: "50%", background: c, border: "1px solid #fff", marginLeft: i ? -3 : 0 }}>
              <I style={ic(6)} color="#fff" fill="#fff" aria-hidden="true" />
            </span>
          ))}
        </span>
        {reactions}
        <span className="ml-auto">
          {comments} comments · {reposts} reposts
        </span>
      </div>
      <div className="flex items-center justify-around" style={{ borderTop: `1px solid ${LI_LINE}`, margin: "0 10px", height: 26, fontSize: 8.5, fontWeight: 600, color: LI_GREY }}>
        {(
          [
            [ThumbsUp, "Like"],
            [MessageSquareText, "Comment"],
            [Repeat2, "Repost"],
            [Send, "Send"],
          ] as [LucideIcon, string][]
        ).map(([I, t]) => (
          <span key={t} className="flex items-center" style={{ gap: 4 }}>
            <I style={ic(11)} aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * LinkedIn Page admin view: global nav, left admin sidebar (logo, page
 * name, followers, admin nav with Analytics expanded), then `children` in
 * the main column.
 */
export function LinkedInPageAdmin({ page, followers, logo, active = "Content", children, url }: { page: string; followers: string; logo: ReactNode; active?: string; children: ReactNode; url?: string }) {
  const nav: [string, number][] = [
    ["Dashboard", 0],
    ["Page posts", 0],
    ["Analytics", 0],
    ["Content", 1],
    ["Followers", 1],
    ["Visitors", 1],
    ["Leads", 1],
    ["Competitors", 1],
    ["Feed", 0],
    ["Activity", 0],
    ["Inbox", 0],
    ["Edit Page", 0],
  ];
  return (
    <BrowserChrome url={url ?? `linkedin.com/company/10734231/admin/analytics/${active.toLowerCase() === "content" ? "updates" : active.toLowerCase()}/`}>
      <div className="flex h-full flex-col" style={{ background: LI_BG, fontFamily: FONT.linkedin, color: LI_TEXT }}>
        <LinkedInNav />
        <div className="flex min-h-0 flex-1" style={{ padding: "10px 40px 0", gap: 10 }}>
          <aside className="shrink-0" style={{ width: 128 }}>
            <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${LI_LINE}`, padding: "10px 0 6px" }}>
              <div style={{ padding: "0 10px" }}>
                {logo}
                <p className="truncate" style={{ fontSize: 9.5, fontWeight: 600, marginTop: 6 }}>
                  {page}
                </p>
                <p style={{ fontSize: 7.5, color: LI_GREY }}>{followers} followers</p>
              </div>
              <div style={{ marginTop: 8, borderTop: `1px solid ${LI_LINE}`, paddingTop: 4 }}>
                {nav.map(([t, lvl]) => {
                  const on = t === active;
                  return (
                    <div key={t} className="flex items-center justify-between" style={{ height: 17, padding: `0 10px 0 ${lvl ? 20 : 10}px`, fontSize: 8, fontWeight: on || t === "Analytics" ? 600 : 400, color: on ? LI_TEXT : LI_GREY, boxShadow: on ? `inset 2px 0 0 ${"#01754f"}` : undefined, background: on ? "#f3f6f8" : undefined }}>
                      {t}
                      {t === "Analytics" && <ChevronDown style={{ ...ic(8), transform: "rotate(180deg)" }} aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
          <main className="flex min-w-0 flex-1 flex-col" style={{ gap: 8 }}>
            {children}
          </main>
        </div>
      </div>
    </BrowserChrome>
  );
}

/** White LinkedIn card with a title row and optional right-side controls. */
export function LinkedInCard({ title, right, children, style }: { title?: ReactNode; right?: ReactNode; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${LI_LINE}`, padding: "9px 12px", ...style }}>
      {(title || right) && (
        <div className="flex items-center" style={{ marginBottom: 6, gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600 }}>{title}</span>
          <span className="ml-auto flex items-center" style={{ gap: 6 }}>
            {right}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

/** LinkedIn outlined dropdown pill (e.g. "Past 365 days"). */
export function LinkedInSelect({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center" style={{ height: 18, padding: "0 8px", borderRadius: 9, border: "1px solid rgb(0 0 0 / 0.6)", fontSize: 7.5, fontWeight: 600, color: LI_GREY, gap: 3, whiteSpace: "nowrap" }}>
      {children}
      <ChevronDown style={ic(8)} aria-hidden="true" />
    </span>
  );
}

/** One LinkedIn highlight metric: value, label, green/red % change. */
export function LinkedInStat({ value, label, change, up = true }: { value: string; label: string; change: string; up?: boolean }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: 13, fontWeight: 600 }}>{value}</p>
      <p className="truncate" style={{ fontSize: 7.5, color: LI_GREY }}>
        {label}
      </p>
      <p style={{ fontSize: 7.5, fontWeight: 600, color: up ? "#01754f" : "#cb112d" }}>
        {up ? "▲" : "▼"} {change}
      </p>
    </div>
  );
}

/** Generic LinkedIn-styled table (Posts table, etc.). */
export function LinkedInTable({ cols, rows, rowH = 30 }: { cols: Col[]; rows: ReactNode[][]; rowH?: number }) {
  return <Grid cols={cols} rows={rows} s={{ font: FONT.linkedin, size: 8, color: LI_TEXT, rowH, headH: 26, pad: 5, line: LI_LINE, head: { fontSize: 7.5, fontWeight: 600, color: LI_GREY, background: "#f9fafb", borderTop: `1px solid ${LI_LINE}`, whiteSpace: "normal", lineHeight: 1.15 } }} />;
}

/** Campaign Manager status: Active (green), Paused, Completed, Draft. */
export function LiStatus({ s }: { s: "Active" | "Paused" | "Completed" | "Draft" }) {
  const c = s === "Active" ? "#01754f" : s === "Paused" ? "#915907" : "#666";
  return (
    <span className="inline-flex items-center" style={{ gap: 4 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
      {s}
    </span>
  );
}

/**
 * LinkedIn Campaign Manager frame: top bar with account and left nav (Plan,
 * Advertise, Analyze, Test, Assets, Account settings). `children` fill the
 * main area (use for ad previews / detail pages).
 */
export function CampaignManagerFrame({ account, accountId, url, children }: { account: string; accountId: string; url?: string; children: ReactNode }) {
  return (
    <BrowserChrome url={url ?? `linkedin.com/campaignmanager/accounts/${accountId}/campaigns`}>
      <div className="flex h-full flex-col" style={{ fontFamily: FONT.linkedin, color: LI_TEXT, background: "#f3f2ef" }}>
        <header className="flex shrink-0 items-center" style={{ height: 32, background: "#fff", borderBottom: `1px solid ${LI_LINE}`, padding: "0 12px", gap: 7 }}>
          <LinkedInMark size={17} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>Campaign Manager</span>
          <span style={{ width: 1, height: 16, background: LI_LINE }} />
          <span className="flex items-center" style={{ fontSize: 8.5, gap: 3 }}>
            {account} <span style={{ color: LI_GREY }}>({accountId})</span>
            <ChevronDown style={ic(8)} aria-hidden="true" />
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 10, color: LI_GREY }}>
            <CircleHelp style={ic(11)} aria-hidden="true" />
            <Bell style={ic(11)} aria-hidden="true" />
            <Initials name="V G" size={16} bg="#7b5e9f" />
          </span>
        </header>
        <div className="flex min-h-0 flex-1">
          <nav className="shrink-0" style={{ width: 84, background: "#fff", borderRight: `1px solid ${LI_LINE}`, paddingTop: 8, fontSize: 8 }}>
            {["Plan", "Advertise", "Analyze", "Test", "Assets", "Account settings"].map((t) => (
              <div key={t} className="flex items-center justify-between" style={{ height: 22, padding: "0 10px", fontWeight: t === "Advertise" ? 600 : 400, color: t === "Advertise" ? LI_TEXT : LI_GREY, boxShadow: t === "Advertise" ? "inset 3px 0 0 #0a66c2" : undefined, background: t === "Advertise" ? "#eef3f8" : undefined }}>
                {t}
                {t !== "Account settings" && <ChevronDown style={{ ...ic(7), opacity: 0.6 }} aria-hidden="true" />}
              </div>
            ))}
          </nav>
          <main className="flex min-w-0 flex-1 flex-col" style={{ padding: "8px 10px 0" }}>
            {children}
          </main>
        </div>
      </div>
    </BrowserChrome>
  );
}

/**
 * LinkedIn Campaign Manager (2025) campaigns list inside <CampaignManagerFrame>:
 * tabs Campaign groups / Campaigns / Ads, toolbar with Create, filters and
 * date range; dense table with a totals row first. Include checkbox (w 20)
 * and toggle (w 32) columns.
 */
export function LinkedInCampaignManager({ account, accountId, dateRange, tab = 1, counts = [4, 11, 26], cols, rows, total, rowH = 30 }: { account: string; accountId: string; dateRange: string; tab?: 0 | 1 | 2; counts?: [number, number, number]; cols: Col[]; rows: ReactNode[][]; total?: ReactNode[]; rowH?: number }) {
  return (
    <CampaignManagerFrame account={account} accountId={accountId}>
      <div className="flex items-center" style={{ fontSize: 7.5, color: LI_GREY, gap: 3 }}>
        Account: <span style={{ color: LI_BLUE, fontWeight: 600 }}>{account}</span>
      </div>
      <div className="flex shrink-0" style={{ marginTop: 6, gap: 2, borderBottom: `1px solid ${LI_LINE}` }}>
        {["Campaign groups", "Campaigns", "Ads"].map((t, i) => (
          <span key={t} className="flex items-center" style={{ height: 24, padding: "0 10px", fontSize: 8.5, fontWeight: 600, gap: 4, color: i === tab ? "#01754f" : LI_GREY, borderBottom: i === tab ? "2px solid #01754f" : "2px solid transparent" }}>
            {t}
            <span style={{ fontSize: 7, fontWeight: 400, color: LI_GREY }}>({counts[i]})</span>
          </span>
        ))}
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 32, gap: 6, fontSize: 8 }}>
        <span style={{ height: 20, lineHeight: "20px", padding: "0 10px", borderRadius: 10, background: LI_BLUE, color: "#fff", fontWeight: 600 }}>Create</span>
        <span className="flex items-center" style={{ height: 20, width: 120, borderRadius: 4, border: "1px solid #b0b0b0", background: "#fff", padding: "0 6px", gap: 4, color: LI_GREY }}>
          <Search style={ic(8)} aria-hidden="true" />
          Search by name or ID
        </span>
        <span className="flex items-center" style={{ height: 20, padding: "0 8px", borderRadius: 10, border: "1px solid #b0b0b0", background: "#fff", gap: 3, color: LI_GREY, fontWeight: 600, whiteSpace: "nowrap" }}>
          Filters (1)
        </span>
        <span className="ml-auto flex items-center" style={{ height: 20, padding: "0 8px", borderRadius: 4, border: "1px solid #b0b0b0", background: "#fff", gap: 3, whiteSpace: "nowrap" }}>
          {dateRange}
          <ChevronDown style={ic(8)} aria-hidden="true" />
        </span>
        <span className="flex items-center" style={{ height: 20, padding: "0 8px", borderRadius: 4, border: "1px solid #b0b0b0", background: "#fff", gap: 3, whiteSpace: "nowrap" }}>
          Columns: Performance
          <ChevronDown style={ic(8)} aria-hidden="true" />
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden" style={{ background: "#fff", border: `1px solid ${LI_LINE}`, borderBottom: "none", borderRadius: "6px 6px 0 0" }}>
        <Grid
          cols={cols}
          rows={rows}
          total={total}
          totalFirst
          s={{ font: FONT.linkedin, size: 8, color: LI_TEXT, rowH, headH: 26, pad: 5, line: LI_LINE, head: { fontSize: 7.5, fontWeight: 600, color: LI_GREY, whiteSpace: "normal" }, total: { fontWeight: 600, background: "#f9fafb", minHeight: 22 } }}
        />
      </div>
    </CampaignManagerFrame>
  );
}

/** LinkedIn blue toggle. */
export function LiToggle({ on = true }: { on?: boolean }) {
  return (
    <span className="relative inline-block" style={{ width: 20, height: 11, borderRadius: 6, background: on ? "#01754f" : "#8c8c8c" }}>
      <span style={{ position: "absolute", top: 1.5, left: on ? 10.5 : 1.5, width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
    </span>
  );
}

/* ================================================================== */
/* HubSpot deals board                                                 */
/* ================================================================== */

export type HubDeal = { name: string; amount: string; close: string; owner: string; ownerColor?: string; /** Shown as an extra card property ("Original source"). */ source?: string };
export type HubStage = { stage: string; total: string; weighted?: string; count: number; deals: HubDeal[] };

/**
 * HubSpot CRM (2025) Deals board: dark left rail, top search bar, "Deals"
 * header with pipeline selector and orange "Create deal", view tabs, filter
 * row, then stage columns of deal cards with totals at the foot.
 */
export function HubSpotBoard({ pipeline, stages, portalId = "44921873", colW = 128 }: { pipeline: string; stages: HubStage[]; portalId?: string; colW?: number }) {
  const T = "#33475b";
  const LINE = "#cbd6e2";
  return (
    <BrowserChrome url={`app.hubspot.com/contacts/${portalId}/objects/0-3/views/all/board`}>
      <div className="flex h-full" style={{ fontFamily: FONT.hubspot, color: T, background: "#f5f8fa" }}>
        <nav className="flex shrink-0 flex-col items-center" style={{ width: 30, background: "#213343", paddingTop: 8, gap: 12, color: "#cbd6e2" }}>
          <HubSpotMark size={15} color="#ff5c35" />
          {[Bookmark, UsersRound, Megaphone, MessageSquareText, ChartColumn, BriefcaseBusiness].map((I, i) => (
            <I key={i} style={{ ...ic(10), color: i === 1 ? "#fff" : undefined }} aria-hidden="true" />
          ))}
        </nav>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center" style={{ height: 26, background: "#fff", borderBottom: `1px solid ${LINE}`, padding: "0 10px", gap: 8 }}>
            <span className="flex items-center" style={{ width: 200, height: 17, borderRadius: 3, border: `1px solid ${LINE}`, background: "#f5f8fa", padding: "0 6px", gap: 4, fontSize: 7.5, color: "#7c98b6" }}>
              <Search style={ic(8)} aria-hidden="true" />
              Search HubSpot
            </span>
            <span className="ml-auto flex items-center" style={{ gap: 9, color: "#516f90" }}>
              <Phone style={ic(9)} aria-hidden="true" />
              <Settings style={ic(9)} aria-hidden="true" />
              <Bell style={ic(9)} aria-hidden="true" />
              <Initials name="R K" size={14} bg="#6a78d1" />
            </span>
          </div>
          <div className="flex shrink-0 items-center" style={{ height: 34, background: "#fff", padding: "0 12px", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Deals</span>
            <ChevronDown style={ic(9)} aria-hidden="true" />
            <span className="ml-auto flex items-center" style={{ gap: 6, fontSize: 8 }}>
              <span style={{ height: 20, lineHeight: "18px", padding: "0 8px", borderRadius: 3, border: `1px solid ${LINE}`, color: T }}>Actions ▾</span>
              <span style={{ height: 20, lineHeight: "18px", padding: "0 8px", borderRadius: 3, border: `1px solid ${LINE}`, color: T }}>Import</span>
              <span style={{ height: 20, lineHeight: "20px", padding: "0 9px", borderRadius: 3, background: "#ff5c35", color: "#fff", fontWeight: 600 }}>Create deal</span>
            </span>
          </div>
          <div className="flex shrink-0 items-end" style={{ height: 22, background: "#fff", borderBottom: `1px solid ${LINE}`, padding: "0 12px", gap: 2, fontSize: 8 }}>
            {["All deals", "My deals", "Closing this month"].map((t, i) => (
              <span key={t} className="flex items-center" style={{ height: 20, padding: "0 10px", gap: 4, background: i === 0 ? "#fff" : "#f5f8fa", border: `1px solid ${LINE}`, borderBottom: i === 0 ? "1px solid #fff" : `1px solid ${LINE}`, borderRadius: "3px 3px 0 0", marginBottom: -1, fontWeight: i === 0 ? 600 : 400 }}>
                {t}
                {i === 0 && <X style={{ ...ic(7), opacity: 0.6 }} aria-hidden="true" />}
              </span>
            ))}
            <span style={{ padding: "0 8px 4px", color: "#0091ae" }}>+ Add view</span>
          </div>
          <div className="flex shrink-0 items-center" style={{ height: 30, padding: "0 12px", gap: 6, fontSize: 7.5, background: "#fff", borderBottom: `1px solid ${LINE}` }}>
            <span className="flex items-center" style={{ height: 18, padding: "0 7px", borderRadius: 3, border: `1px solid ${LINE}`, gap: 3, fontWeight: 600 }}>
              {pipeline}
              <ChevronDown style={ic(7)} aria-hidden="true" />
            </span>
            <span className="flex" style={{ borderRadius: 3, border: `1px solid ${LINE}`, overflow: "hidden" }}>
              <span style={{ padding: "3px 5px", background: "#eaf0f6" }}>
                <Columns3 style={ic(8)} aria-hidden="true" />
              </span>
              <span style={{ padding: "3px 5px" }}>
                <Menu style={ic(8)} aria-hidden="true" />
              </span>
            </span>
            {["Deal owner", "Create date", "Last activity date", "Close date"].map((t) => (
              <span key={t} className="flex items-center" style={{ gap: 2, color: "#0091ae", fontWeight: 600, whiteSpace: "nowrap" }}>
                {t}
                <ChevronDown style={ic(7)} aria-hidden="true" />
              </span>
            ))}
            <span className="flex items-center" style={{ gap: 3, color: "#0091ae", fontWeight: 600, whiteSpace: "nowrap" }}>
              <ListFilter style={ic(8)} aria-hidden="true" />
              Advanced filters (2)
            </span>
          </div>
          <div className="flex min-h-0 flex-1" style={{ padding: "8px 0 0 12px", gap: 8, overflow: "hidden" }}>
            {stages.map((s) => (
              <div key={s.stage} className="flex shrink-0 flex-col" style={{ width: colW, background: "#eaf0f6", borderRadius: 3, border: `1px solid ${LINE}`, overflow: "hidden" }}>
                <div className="flex items-center" style={{ height: 24, padding: "0 7px", gap: 4, fontSize: 7.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.2, background: "#fff", borderBottom: `1px solid ${LINE}` }}>
                  <span className="truncate">{s.stage}</span>
                  <span style={{ fontSize: 7, fontWeight: 400, color: "#516f90" }}>{s.count}</span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col" style={{ padding: 5, gap: 5, overflow: "hidden" }}>
                  {s.deals.map((d) => (
                    <div key={d.name} className="shrink-0" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 3, padding: "6px 7px", fontSize: 7, lineHeight: 1.45 }}>
                      <p style={{ fontSize: 8, fontWeight: 600, color: "#0091ae", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{d.name}</p>
                      <p className="truncate">
                        <span style={{ color: "#516f90" }}>Amount:</span> {d.amount}
                      </p>
                      <p className="truncate">
                        <span style={{ color: "#516f90" }}>Close date:</span> {d.close}
                      </p>
                      {d.source && (
                        <p className="truncate">
                          <span style={{ color: "#516f90" }}>Original source:</span> {d.source}
                        </p>
                      )}
                      <div className="flex items-center" style={{ marginTop: 3, gap: 4 }}>
                        <Initials name={d.owner} size={12} bg={d.ownerColor ?? "#6a78d1"} />
                        <span className="truncate" style={{ color: "#516f90" }}>
                          {d.owner}
                        </span>
                                              </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "4px 7px", fontSize: 7, background: "#fff", borderTop: `1px solid ${LINE}`, lineHeight: 1.4 }}>
                  <p className="truncate">
                    Total amount: <b style={{ fontWeight: 600 }}>{s.total}</b>
                  </p>
                  {s.weighted && <p className="truncate" style={{ color: "#516f90" }}>Weighted: {s.weighted}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ================================================================== */
/* WhatsApp                                                            */
/* ================================================================== */

export type WaMessage = { me?: boolean; text: ReactNode; time: string; read?: boolean; day?: string };

/**
 * WhatsApp (iOS) chat for inside a <PhoneFrame>: header with back, avatar,
 * name and status, #efeae2 wallpaper, white / #d9fdd3 bubbles with blue
 * ticks, and the input bar. Messages with `day` render a date chip above.
 */
export function WhatsAppChat({ name, status = "online", avatar, messages }: { name: string; status?: string; avatar: ReactNode; messages: WaMessage[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col" style={{ fontFamily: FONT.apple, color: "#111b21" }}>
      <div className="flex shrink-0 items-center" style={{ height: 34, padding: "0 8px", gap: 6, background: "#f6f6f6", borderBottom: "0.5px solid #d1d7db" }}>
        <ChevronLeft style={{ ...ic(14), color: "#007aff" }} aria-hidden="true" />
        {avatar}
        <span className="min-w-0 flex-1" style={{ lineHeight: 1.2 }}>
          <span className="block truncate" style={{ fontSize: 8.5, fontWeight: 600 }}>
            {name}
          </span>
          <span className="block truncate" style={{ fontSize: 6.5, color: "#667781" }}>
            {status}
          </span>
        </span>
        <Video style={{ ...ic(12), color: "#007aff" }} aria-hidden="true" />
        <Phone style={{ ...ic(10), color: "#007aff" }} aria-hidden="true" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end" style={{ background: "#efeae2", padding: "6px 7px", gap: 3, overflow: "hidden" }}>
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col">
            {m.day && <span style={{ alignSelf: "center", fontSize: 6.5, padding: "2px 6px", borderRadius: 5, background: "#fff", color: "#54656f", margin: "3px 0 4px", boxShadow: "0 0.5px 0.5px rgb(11 20 26 / 0.13)" }}>{m.day}</span>}
            <div
              style={{
                alignSelf: m.me ? "flex-end" : "flex-start",
                maxWidth: "82%",
                background: m.me ? "#d9fdd3" : "#fff",
                borderRadius: 6,
                padding: "3px 6px 3px",
                fontSize: 7.5,
                lineHeight: 1.35,
                boxShadow: "0 0.5px 0.5px rgb(11 20 26 / 0.13)",
              }}
            >
              {m.text}
              <span className="inline-flex items-center" style={{ float: "right", marginLeft: 6, marginTop: 3, fontSize: 5.5, color: "#667781", gap: 1 }}>
                {m.time}
                {m.me && <CheckCheck style={{ ...ic(8), color: m.read === false ? "#8696a0" : "#53bdeb" }} aria-hidden="true" />}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 items-center" style={{ height: 30, padding: "0 8px 6px", gap: 6, background: "#f6f6f6", color: "#007aff" }}>
        <Plus style={ic(12)} aria-hidden="true" />
        <span className="flex flex-1 items-center" style={{ height: 17, borderRadius: 9, background: "#fff", border: "0.5px solid #d1d7db", padding: "0 6px" }}>
          <Smile style={{ ...ic(9), marginLeft: "auto", color: "#8696a0" }} aria-hidden="true" />
        </span>
        <Camera style={ic(11)} aria-hidden="true" />
        <Mic style={ic(11)} aria-hidden="true" />
      </div>
    </div>
  );
}

/* ================================================================== */
/* Google Business Profile (Search knowledge panel)                    */
/* ================================================================== */

/** Five small stars; `rating` like 4.4 fills partially. */
export function Stars({ rating, size = 8, color = "#fbbc04" }: { rating: number; size?: number; color?: string }) {
  return (
    <span className="inline-flex" style={{ gap: 0.5 }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const f = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star style={{ ...ic(size), position: "absolute", color: "#dadce0" }} fill="#dadce0" strokeWidth={0} aria-hidden="true" />
            <span style={{ position: "absolute", inset: 0, width: `${f * 100}%`, overflow: "hidden" }}>
              <Star style={{ ...ic(size), color }} fill={color} strokeWidth={0} aria-hidden="true" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Google Business Profile as the knowledge panel on Search: photo strip,
 * name, rating + reviews, category, round action buttons, address, hours,
 * phone. `photos` are nodes (e.g. <Photo>) laid out 1 large + 2 small.
 */
export function BusinessProfile({
  name,
  rating,
  reviews,
  category,
  address,
  hours,
  phone,
  photos,
  w = 180,
}: {
  name: string;
  rating: number;
  reviews: string;
  category: string;
  address: string;
  hours: { open: boolean; text: string };
  phone: string;
  photos?: [ReactNode, ReactNode, ReactNode];
  w?: number;
}) {
  return (
    <div style={{ width: w, border: `1px solid ${G.border}`, borderRadius: 8, overflow: "hidden", fontFamily: FONT.google, color: G.text, background: "#fff" }}>
      {photos && (
        <div className="flex" style={{ height: 78, gap: 2 }}>
          <div style={{ flex: 2, overflow: "hidden" }}>{photos[0]}</div>
          <div className="flex flex-col" style={{ flex: 1, gap: 2 }}>
            <div style={{ flex: 1, overflow: "hidden" }}>{photos[1]}</div>
            <div style={{ flex: 1, overflow: "hidden" }}>{photos[2]}</div>
          </div>
        </div>
      )}
      <div style={{ padding: "8px 10px" }}>
        <p style={{ fontSize: 13, lineHeight: 1.2 }}>{name}</p>
        <p className="flex items-center" style={{ fontSize: 7.5, gap: 3, marginTop: 3, color: G.grey }}>
          <span style={{ color: G.text }}>{rating.toFixed(1)}</span>
          <Stars rating={rating} size={7.5} />
          <span style={{ color: G.link }}>{reviews} Google reviews</span>
        </p>
        <p style={{ fontSize: 7.5, color: G.grey, marginTop: 1 }}>{category}</p>
        <div className="flex justify-between" style={{ marginTop: 8 }}>
          {(
            [
              [Earth, "Website"],
              [Navigation, "Directions"],
              [Bookmark, "Save"],
              [Phone, "Call"],
            ] as [LucideIcon, string][]
          ).map(([I, t]) => (
            <span key={t} className="flex flex-col items-center" style={{ gap: 3, fontSize: 7, color: G.link }}>
              <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${G.border}` }}>
                <I style={ic(10)} aria-hidden="true" />
              </span>
              {t}
            </span>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${G.line}`, marginTop: 8, paddingTop: 6, fontSize: 7.5, lineHeight: 1.5 }}>
          <p className="flex" style={{ gap: 4 }}>
            <MapPin style={{ ...ic(8), marginTop: 1.5, color: G.grey }} aria-hidden="true" />
            <span>
              <b style={{ fontWeight: 500 }}>Address:</b> {address}
            </span>
          </p>
          <p className="flex" style={{ gap: 4 }}>
            <Clock style={{ ...ic(8), marginTop: 1.5, color: G.grey }} aria-hidden="true" />
            <span>
              <b style={{ fontWeight: 500 }}>Hours:</b> <span style={{ color: hours.open ? "#188038" : "#d93025" }}>{hours.open ? "Open" : "Closed"}</span> · {hours.text}
            </span>
          </p>
          <p className="flex" style={{ gap: 4 }}>
            <Phone style={{ ...ic(8), marginTop: 1.5, color: G.grey }} aria-hidden="true" />
            <span>
              <b style={{ fontWeight: 500 }}>Phone:</b> <span style={{ color: G.link }}>{phone}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Web page helpers (landing pages in <BrowserChrome>)                 */
/* ================================================================== */

/** A plain form field: label above, bordered input with value or placeholder. */
export function Field({ label, value, placeholder, select = false, w, font = FONT.web }: { label: string; value?: string; placeholder?: string; select?: boolean; w?: number | string; font?: string }) {
  return (
    <label style={{ display: "block", width: w, fontFamily: font }}>
      <span style={{ display: "block", fontSize: 7.5, fontWeight: 600, color: "#374151", marginBottom: 2 }}>{label}</span>
      <span className="flex items-center" style={{ height: 20, border: "1px solid #d1d5db", borderRadius: 3, padding: "0 6px", fontSize: 8, color: value ? "#111827" : "#9ca3af", background: "#fff" }}>
        <span className="flex-1 truncate">{value ?? placeholder}</span>
        {select && <ChevronDown style={{ ...ic(8), color: "#6b7280" }} aria-hidden="true" />}
      </span>
    </label>
  );
}


/* ================================================================== */
/* Notion calendar database                                            */
/* ================================================================== */

/** Notion's tag colours (light theme). */
export const NOTION_TAG = {
  gray: ["#e3e2e0", "#32302c"],
  brown: ["#eee0da", "#44291e"],
  orange: ["#fadec9", "#49290e"],
  yellow: ["#fdecc8", "#402c1b"],
  green: ["#dbeddb", "#1c3829"],
  blue: ["#d3e5ef", "#183347"],
  purple: ["#e8deee", "#412454"],
  pink: ["#f5e0e9", "#4c2337"],
  red: ["#ffe2dd", "#5d1715"],
} as const;
export type NotionColor = keyof typeof NOTION_TAG;
export type NotionEvent = { title: string; tag: string; color: NotionColor };

/** A Notion tag chip. */
export function NotionTag({ color, children }: { color: NotionColor; children: ReactNode }) {
  const [bg, fg] = NOTION_TAG[color];
  return <span style={{ display: "inline-block", fontSize: 6, lineHeight: "9px", padding: "0 3px", borderRadius: 2, background: bg, color: fg, whiteSpace: "nowrap" }}>{children}</span>;
}

/**
 * Notion database in Calendar view: sidebar (workspace, teamspace pages),
 * breadcrumb bar, page title, view tabs, month header and a Sunday-first
 * month grid. `start` is the date number shown in the first cell (e.g. 26 for
 * a month whose 1st is a Friday: the grid starts in the previous month),
 * `prevDays` the length of that previous month. `events` are keyed by day
 * of the current month.
 */
export function NotionCalendar({
  workspace,
  pages,
  activePage,
  breadcrumb,
  title,
  views,
  month,
  start,
  prevDays,
  days,
  today,
  events,
  weeks = 5,
  url,
}: {
  workspace: string;
  pages: { label: string; depth?: number }[];
  activePage: string;
  breadcrumb: string[];
  title: string;
  views: string[];
  month: string;
  start: number;
  prevDays: number;
  days: number;
  today?: number;
  events: Record<number, NotionEvent[]>;
  weeks?: number;
  url: string;
}) {
  const T = "#37352f";
  const GREY = "#787774";
  const LINE = "#e9e9e7";
  const cells = Array.from({ length: weeks * 7 }, (_, i) => {
    const lead = start > 1 ? prevDays - start + 1 : 0;
    const d = i - lead + 1;
    return d < 1 ? { n: prevDays + d, cur: false, d } : d > days ? { n: d - days, cur: false, d } : { n: d, cur: true, d };
  });
  return (
    <BrowserChrome url={url}>
      <div className="flex h-full" style={{ fontFamily: FONT.apple, color: T, background: "#fff" }}>
        <aside className="shrink-0" style={{ width: 128, background: "#f7f7f5", borderRight: `1px solid ${LINE}`, fontSize: 8, color: "#5f5e5b", padding: "6px 0" }}>
          <div className="flex items-center" style={{ padding: "0 10px", height: 22, gap: 5, color: T, fontWeight: 600 }}>
            <span className="flex items-center justify-center" style={{ width: 13, height: 13, borderRadius: 3, background: "#e3e2e0", fontSize: 7, color: T }}>
              {workspace[0]}
            </span>
            <span className="truncate">{workspace}</span>
            <ChevronDown style={ic(7)} aria-hidden="true" />
          </div>
          {(
            [
              [Search, "Search"],
              [House, "Home"],
              [Bell, "Inbox"],
            ] as [LucideIcon, string][]
          ).map(([I, t]) => (
            <div key={t} className="flex items-center" style={{ height: 17, padding: "0 10px", gap: 5 }}>
              <I style={ic(9)} aria-hidden="true" />
              {t}
            </div>
          ))}
          <div style={{ padding: "10px 10px 3px", fontSize: 7, fontWeight: 600, color: "#91918e" }}>Teamspaces</div>
          {pages.map((p) => {
            const on = p.label === activePage;
            return (
              <div key={p.label} className="flex items-center truncate" style={{ height: 17, padding: `0 8px 0 ${10 + (p.depth ?? 0) * 10}px`, gap: 4, background: on ? "#ebebea" : undefined, color: on ? T : undefined, fontWeight: on ? 500 : 400, margin: "0 4px", borderRadius: 4 }}>
                <ChevronRight style={{ ...ic(7), color: "#a5a4a1", transform: p.depth === 0 && !on ? undefined : "rotate(90deg)" }} aria-hidden="true" />
                <span className="truncate">{p.label}</span>
              </div>
            );
          })}
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center" style={{ height: 26, padding: "0 10px", gap: 4, fontSize: 8, color: T }}>
            {breadcrumb.map((b, i) => (
              <span key={b} className="flex items-center" style={{ gap: 4 }}>
                {i > 0 && <span style={{ color: "#c3c2bf" }}>/</span>}
                {b}
              </span>
            ))}
            <span className="ml-auto flex items-center" style={{ gap: 10, color: GREY }}>
              <span style={{ color: T }}>Share</span>
              <MessageSquareText style={ic(9)} aria-hidden="true" />
              <Star style={ic(9)} aria-hidden="true" />
              <Ellipsis style={ic(10)} aria-hidden="true" />
            </span>
          </div>
          <div style={{ padding: "8px 26px 0" }}>
            <p style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.2 }}>{title}</p>
            <div className="flex items-center" style={{ marginTop: 6, height: 22, gap: 12, fontSize: 8, color: GREY, borderBottom: `1px solid ${LINE}` }}>
              {views.map((v, i) => (
                <span key={v} className="flex h-full items-center" style={{ gap: 3, color: i === 0 ? T : undefined, fontWeight: i === 0 ? 500 : 400, boxShadow: i === 0 ? `inset 0 -2px 0 ${T}` : undefined }}>
                  {v}
                </span>
              ))}
              <span className="ml-auto flex items-center" style={{ gap: 9 }}>
                <ListFilter style={ic(9)} aria-hidden="true" />
                <Search style={ic(9)} aria-hidden="true" />
                <Ellipsis style={ic(10)} aria-hidden="true" />
                <span className="flex items-center" style={{ height: 16, borderRadius: 3, background: "#2383e2", color: "#fff", fontWeight: 500, padding: "0 6px", gap: 3 }}>
                  New <ChevronDown style={ic(7)} aria-hidden="true" />
                </span>
              </span>
            </div>
            <div className="flex items-center" style={{ height: 24, fontSize: 9.5, fontWeight: 600, gap: 6 }}>
              {month}
              <span className="ml-auto flex items-center" style={{ gap: 6, fontSize: 8, fontWeight: 400, color: GREY }}>
                <span>Open in Calendar</span>
                <ChevronLeft style={ic(9)} aria-hidden="true" />
                <span style={{ color: T }}>Today</span>
                <ChevronRight style={ic(9)} aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="min-h-0 flex-1" style={{ padding: "0 0 0 26px", overflow: "hidden" }}>
            <div className="grid" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", fontSize: 7, color: GREY, height: 14, alignItems: "center", textAlign: "center" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", borderTop: `1px solid ${LINE}`, borderLeft: `1px solid ${LINE}` }}>
              {cells.map((c, i) => {
                const ev = c.cur ? events[c.d] ?? [] : [];
                const weekend = i % 7 === 0 || i % 7 === 6;
                return (
                  <div key={i} style={{ height: 50, borderRight: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: weekend ? "#fbfbfa" : "#fff", padding: "2px 3px", overflow: "hidden" }}>
                    <div className="flex justify-end" style={{ fontSize: 7, color: c.cur ? T : "#b4b4b0", height: 11 }}>
                      <span style={c.cur && c.n === today ? { background: "#eb5757", color: "#fff", borderRadius: "50%", width: 11, height: 11, textAlign: "center", lineHeight: "11px" } : undefined}>{c.n}</span>
                    </div>
                    <div className="flex flex-col" style={{ gap: 2 }}>
                      {ev.map((e) => (
                        <div key={e.title} style={{ borderRadius: 3, background: "#fff", boxShadow: "0 0 0 1px rgb(15 15 15 / 0.1), 0 1px 2px rgb(15 15 15 / 0.1)", padding: "1px 3px 2px" }}>
                          <p className="truncate" style={{ fontSize: 6.5, fontWeight: 500, color: T, lineHeight: 1.35 }}>
                            {e.title}
                          </p>
                          <div style={{ lineHeight: 0 }}>
                            <NotionTag color={e.color}>{e.tag}</NotionTag>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </BrowserChrome>
  );
}
