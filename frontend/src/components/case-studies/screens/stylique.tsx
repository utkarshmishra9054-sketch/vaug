import type { CSSProperties, ReactNode } from "react";
import { Box as BoxIcon, Download, FolderOpen, Image as ImageIcon, KeyRound, Ruler, Scissors, Sparkles, Users } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";

/*
 * Stylique AI by YOKO (yokostyles.com, read 23 Nov 2026): system UI font, black and white with slate
 * greys, and the plum of the site's fabric hero. Product facts (patterns from text, image or CAD;
 * 50+ body types; DXF export; 3D preview; grading and marker optimisation; API and SDK; beta
 * waitlist) are from the site. TODO(content): illustrative. Garments, sizes, measurements, waitlist
 * entries and numbers are invented.
 */

const FONT: CSSProperties = { fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' };
const INK = "#0b0b0d";
const SLATE = "#5b6472";
const LINE = "#e6e7eb";
const PLUM = "#7a2a52";
const ROSE = "#c2527f";

const NAV: [string, typeof Sparkles, number?][] = [
  ["Generate", Sparkles],
  ["Projects", FolderOpen, 12],
  ["Grading", Ruler],
  ["3D & export", BoxIcon],
  ["Waitlist", Users, 640],
  ["API keys", KeyRound],
];

function App({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`app.yokostyles.com/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK, background: "#f7f7f8" }}>
        <aside className="flex w-[112px] shrink-0 flex-col border-r bg-white px-[8px] py-[10px]" style={{ borderColor: LINE }}>
          <p className="text-[11px] font-extrabold tracking-[-0.02em]">Stylique AI</p>
          <p className="text-[6.6px] font-semibold uppercase tracking-[0.14em]" style={{ color: PLUM }}>by YOKO · beta</p>
          <nav className="mt-[12px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-full px-[7px] text-[8.5px]" style={i === active ? { background: INK, color: "#fff", fontWeight: 600 } : { color: SLATE }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto text-[7px] font-bold" style={{ color: i === active ? "#fff" : SLATE }}>{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto rounded-[8px] p-[6px]" style={{ background: "#f1f1f3" }}>
            <p className="text-[7.8px] font-semibold">Studio Kaveri</p>
            <p className="text-[6.8px]" style={{ color: SLATE }}>Founding user · team of 3</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-bold tracking-[-0.01em]">{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: SLATE }}>{sub}</p>
            </div>
            <div className="ml-auto flex items-center gap-[6px]">{right}</div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] rounded-full px-[9px] text-[7.8px] font-semibold" style={solid ? { background: INK, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[10px] bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-semibold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal" style={{ color: SLATE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);

/** Pattern pieces for an A-line skirt: front, back and waistband, with grain lines and seam allowance. */
function Pieces({ scale = 1, nest = false }: { scale?: number; nest?: boolean }) {
  const piece = (d: string, k: number) => (
    <g key={k}>
      <path d={d} fill={nest ? "none" : "#fdf3f7"} stroke={nest ? ROSE : INK} strokeWidth={nest ? 0.8 : 1.2} />
      {!nest && <path d={d} fill="none" stroke={ROSE} strokeWidth="0.8" strokeDasharray="3 2" transform="translate(0 0) scale(1)" opacity="0.8" />}
    </g>
  );
  return (
    <svg viewBox={nest ? "-6 4 132 170" : "0 0 260 180"} className="block h-full w-full" aria-hidden="true">
      <g transform={`scale(${scale})`}>
        {(nest ? [0.9, 0.95, 1, 1.05, 1.1] : [1]).map((s, i) => (
          <g key={i} transform={`translate(${60 - 60 * s} ${20 - 20 * s}) scale(${s})`}>
            {piece("M30 20 L90 20 L110 160 L10 160 Z", i)}
            {!nest && (
              <>
                <path d="M60 40 L60 140" stroke={INK} strokeWidth="0.9" markerEnd="none" />
                <path d="M57 46 L60 40 L63 46 M57 134 L60 140 L63 134" fill="none" stroke={INK} strokeWidth="0.9" />
                <text x="44" y="96" fontSize="8" fill={INK}>FRONT ×1</text>
                <path d="M30 20 l0 -5 M90 20 l0 -5" stroke={ROSE} strokeWidth="1" />
              </>
            )}
          </g>
        ))}
        {!nest && (
          <>
            {piece("M140 20 L200 20 L220 160 L120 160 Z", 9)}
            <path d="M170 40 L170 140" stroke={INK} strokeWidth="0.9" />
            <text x="148" y="96" fontSize="8" fill={INK}>BACK ×2</text>
            {piece("M130 168 L250 168 L250 176 L130 176 Z", 10)}
            <text x="164" y="174.5" fontSize="5.5" fill={INK}>WAISTBAND ×1</text>
            <circle cx="200" cy="40" r="2" fill={ROSE} />
          </>
        )}
      </g>
    </svg>
  );
}

/* 01 · Generate ------------------------------------------------------ */

const Generate: Screen = () => (
  <App path="generate" active={0} title="New pattern · A-line midi skirt" sub="Generated in 9 s from a text brief and a sketch · base size M" right={<><Btn>Regenerate</Btn><Btn solid>Save to project</Btn></>}>
    <div className="grid h-full grid-cols-[150px_1fr_120px] gap-[8px]">
      <Box title="Brief">
        <p className="rounded-[8px] p-[6px] text-[7.8px] leading-[1.45]" style={{ background: "#f4f4f6" }}>
          A-line midi skirt, high waist, side invisible zip, two front pleats, hem 72 cm from waist.
        </p>
        <p className="mt-[7px] text-[7px] font-semibold uppercase tracking-[0.08em]" style={{ color: SLATE }}>Reference</p>
        <div className="mt-[3px] flex h-[70px] items-center justify-center rounded-[8px]" style={{ background: "linear-gradient(160deg,#f6e9ef,#ecd3df)" }}>
          <svg viewBox="0 0 60 60" className="h-[56px]" aria-hidden="true">
            <path d="M20 10 L40 10 L50 54 L10 54 Z" fill="none" stroke={PLUM} strokeWidth="1.5" />
            <path d="M26 10 L24 54 M34 10 L36 54" stroke={PLUM} strokeWidth="0.8" strokeDasharray="2 2" />
          </svg>
        </div>
        <p className="mt-[4px] flex items-center gap-[3px] text-[7px]" style={{ color: SLATE }}>
          <ImageIcon className="size-[8px]" aria-hidden="true" /> sketch_skirt_v2.jpg
        </p>
        <p className="mt-[6px] text-[7px]" style={{ color: SLATE }}>Also accepts CAD (DXF, AAMA)</p>
      </Box>
      <Box title="Pattern pieces" right="3 pieces · 1 cm seam allowance">
        <div className="h-full rounded-[8px]" style={{ background: "repeating-linear-gradient(0deg,#fafafb 0 9px,#f1f1f4 9px 10px), repeating-linear-gradient(90deg,transparent 0 9px,#f1f1f4 9px 10px)" }}>
          <Pieces />
        </div>
      </Box>
      <Box title="Settings">
        <div className="space-y-[5px] text-[7.6px]">
          {[
            ["Fabric", "Cotton twill"],
            ["Ease, hip", "+4 cm"],
            ["Seam allowance", "1 cm"],
            ["Hem", "3 cm"],
            ["Grain", "Straight"],
            ["Units", "cm"],
          ].map(([k, v]) => (
            <p key={k} className="flex justify-between gap-[4px]">
              <span style={{ color: SLATE }}>{k}</span>
              <b>{v}</b>
            </p>
          ))}
        </div>
        <p className="mt-[8px] rounded-[6px] px-[5px] py-[4px] text-[7px] leading-[1.4]" style={{ background: "#ecfdf3", color: "#166534" }}>Seams match in length; notches aligned.</p>
      </Box>
    </div>
  </App>
);

/* 02 · Grading ------------------------------------------------------- */

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

const Grading: Screen = () => (
  <App path="grading/skirt-a-line" active={2} title="Grading · A-line midi skirt" sub="6 sizes × 3 heights = 18 of 50+ body types selected" right={<Btn solid>Apply grading</Btn>}>
    <div className="grid h-full grid-cols-[1fr_210px] gap-[8px]">
      <Box title="Graded nest · front panel" right="XS to 2XL">
        <div className="h-full">
          <Pieces nest />
        </div>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Body types">
          <div className="grid grid-cols-[34px_repeat(6,1fr)] gap-[2px] text-center text-[6.8px]">
            <span />
            {SIZES.map((s) => (
              <b key={s}>{s}</b>
            ))}
            {["Petite", "Regular", "Tall"].map((h) => (
              <div key={h} className="contents">
                <span className="text-left" style={{ color: SLATE }}>{h}</span>
                {SIZES.map((s) => (
                  <span key={s} className="rounded-[3px] py-[3px]" style={{ background: INK, color: "#fff" }}>✓</span>
                ))}
              </div>
            ))}
          </div>
        </Box>
        <Box title="Measurements, regular (cm)" className="flex-1">
          <div className="grid grid-cols-[42px_repeat(6,1fr)] gap-y-[3px] text-[7px] tabular-nums">
            <span />
            {SIZES.map((s) => (
              <b key={s} className="text-right">{s}</b>
            ))}
            {[
              ["Waist", [62, 66, 70, 76, 82, 88]],
              ["Hip", [88, 92, 96, 102, 108, 114]],
              ["Length", [70, 71, 72, 73, 74, 75]],
            ].map(([k, v]) => (
              <div key={k as string} className="contents">
                <span style={{ color: SLATE }}>{k as string}</span>
                {(v as number[]).map((n, i) => (
                  <span key={i} className="text-right" style={i === 2 ? { color: PLUM, fontWeight: 700 } : undefined}>{n}</span>
                ))}
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  </App>
);

/* 03 · 3D preview + DXF export -------------------------------------- */

const Export: Screen = () => (
  <App path="export/skirt-a-line" active={3} title="3D preview and export" sub="Size M, regular · cotton twill · marker for 150 cm fabric width" right={<Btn solid><Download className="size-[9px]" aria-hidden="true" /> Download DXF</Btn>}>
    <div className="grid h-full grid-cols-[180px_1fr] gap-[8px]">
      <Box title="3D preview" right="drag to rotate">
        <div className="flex h-full items-center justify-center rounded-[8px]" style={{ background: "radial-gradient(circle at 50% 35%, #ffffff, #ececf0)" }}>
          <svg viewBox="0 0 120 160" className="h-[170px]" aria-hidden="true">
            <defs>
              <linearGradient id="st-sk" x1="0" x2="1">
                <stop offset="0" stopColor="#5a1d3c" />
                <stop offset="0.5" stopColor={ROSE} />
                <stop offset="1" stopColor="#5a1d3c" />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="22" rx="20" ry="9" fill="#d9d9de" />
            <rect x="40" y="22" width="40" height="22" fill="#d9d9de" />
            <path d="M40 44 L80 44 L98 146 Q60 154 22 146 Z" fill="url(#st-sk)" />
            <path d="M52 44 L48 146 M68 44 L72 146" stroke="#3d1027" strokeWidth="0.8" opacity="0.6" />
            <rect x="38" y="40" width="44" height="6" fill="#4a1630" />
            <line x1="60" y1="146" x2="60" y2="158" stroke="#9a9aa2" strokeWidth="2" />
          </svg>
        </div>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Marker layout" right="efficiency 84% · 1.12 m of fabric">
          <div className="relative h-[110px] overflow-hidden rounded-[6px]" style={{ background: "#f6eef2", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            {[
              [1.5, 8, 17, 84],
              [19.5, 8, 17, 84],
              [37.5, 8, 17, 84],
              [55.5, 8, 17, 84],
              [74, 8, 24, 11],
              [74, 22, 24, 11],
            ].map(([l, t, w, h], i) => (
              <span key={i} className="absolute rounded-[2px]" style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`, background: i < 4 ? "#fff" : "#fde7f0", boxShadow: `inset 0 0 0 1px ${INK}` }} />
            ))}
          </div>
        </Box>
        <Box title="Export" className="flex-1">
          <div className="grid grid-cols-2 gap-[6px] text-[7.8px]">
            {[
              ["Format", "DXF · AAMA"],
              ["Sizes", "18 graded"],
              ["Includes", "Notches, grain, labels"],
              ["Units", "mm"],
            ].map(([k, v]) => (
              <p key={k} className="rounded-[6px] p-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                <span className="block text-[6.8px]" style={{ color: SLATE }}>{k}</span>
                <b>{v}</b>
              </p>
            ))}
          </div>
          <p className="mt-[6px] flex items-center gap-[4px] text-[7.4px]" style={{ color: SLATE }}>
            <Scissors className="size-[9px]" aria-hidden="true" /> Ready for the cutting room or your PLM
          </p>
        </Box>
      </div>
    </div>
  </App>
);

/* 04 · Beta waitlist ------------------------------------------------- */

const WL: [string, string, string, number, string][] = [
  ["Designer, own label", "Bengaluru", "Faster sampling for capsule drops", 92, "Batch 4"],
  ["Manufacturer", "Tiruppur", "Grading for export orders", 88, "Batch 4"],
  ["Fashion-tech platform", "Mumbai", "API: patterns inside our app", 85, "Batch 4"],
  ["Pattern maker", "Jaipur", "Speed up first drafts", 74, "Batch 5"],
  ["Student", "NIFT, Delhi", "Final-year collection", 61, "Batch 5"],
  ["Brand, D2C", "Pune", "Size inclusivity, 50+ body types", 79, "Batch 4"],
];
const WC = "104px 64px 1fr 30px 50px";

const Waitlist: Screen = () => (
  <App path="waitlist" active={4} title="Beta waitlist" sub="640 sign-ups · batch 4 goes out on 1 Dec" right={<Btn solid>Invite batch 4 (60)</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Waitlist", "640", "+38 this week"],
          ["Invited so far", "180", "3 batches"],
          ["Activated", "131", "73% of invited"],
          ["Patterns generated", "1,940", "by founding users"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-[10px] px-[9px] py-[7px]" style={i === 0 ? { background: INK, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.5px]" style={{ opacity: 0.7 }}>{k}</p>
            <p className="mt-[3px] text-[16px] font-bold leading-none">{v}</p>
            <p className="mt-[4px] text-[7px]" style={{ opacity: 0.65 }}>{s}</p>
          </div>
        ))}
      </div>
      <Box title="Next in line" right="Scored by role mix and use case" className="flex-1">
        {WL.map((w, i) => (
          <div key={i} className="grid h-[26px] items-center gap-[6px] border-b text-[8px] last:border-b-0" style={{ gridTemplateColumns: WC, borderColor: LINE }}>
            <span className="truncate font-semibold">{w[0]}</span>
            <span style={{ color: SLATE }}>{w[1]}</span>
            <span className="truncate" style={{ color: SLATE }}>{w[2]}</span>
            <b className="text-right tabular-nums">{w[3]}</b>
            <span><Pill tone={w[4] === "Batch 4" ? "violet" : "grey"} size={6.6}>{w[4]}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </App>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, color: INK, background: "radial-gradient(circle at 25% 25%, #5a1d3c, #2a1220 60%, #160a11)" }}>
    <Laptop w={404} h={258}>
      <div className="flex h-full flex-col bg-white p-[9px]">
        <p className="text-[9px] font-extrabold">Stylique AI <span className="text-[6.5px] font-semibold" style={{ color: PLUM }}>by YOKO</span></p>
        <div className="mt-[6px] flex-1 rounded-[8px]" style={{ background: "#f6f6f8" }}>
          <Pieces />
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[6px]">
        <p className="text-[10.5px] font-bold leading-tight">Join the beta waitlist</p>
        <p className="mt-[2px] text-[6.8px]" style={{ color: SLATE }}>Early access, special pricing for founding users</p>
        {["Your name", "Work email", "I am a… Designer", "What will you make?"].map((f) => (
          <span key={f} className="mt-[6px] flex h-[22px] items-center rounded-[8px] px-[7px] text-[7px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}`, color: SLATE }}>
            {f}
          </span>
        ))}
        <span className="mt-[8px] flex h-[24px] items-center justify-center rounded-full text-[7.8px] font-semibold text-white" style={{ background: INK }}>Sign up</span>
        <p className="mt-[6px] text-center text-[6.2px]" style={{ color: SLATE }}>We respect your privacy. No spam, ever.</p>
      </div>
    </Phone>
  </div>
);

export const styliqueScreens: Screen[] = [Generate, Grading, Export, Waitlist, LaptopPhone];
