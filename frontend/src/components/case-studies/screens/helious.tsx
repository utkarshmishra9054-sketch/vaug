import type { CSSProperties, ReactNode } from "react";
import { Activity, Bell, Check, CircleCheck, ClipboardList, Cpu, Layers, LayoutDashboard, Map as MapIcon, Plane, Settings, ShieldCheck, Upload, X } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * HeliousAI · E-AOS mission console (dark), from heliousai.com (read 23 Nov 2026): system font,
 * orange #ff9500 accent on near-black #1a1a1a, white text. The four-step E-AOS flow (flight pattern,
 * multi-layer reconstruction, signal vs noise, ground composite) is from the site.
 * TODO(content): illustrative. Passes, areas, frame counts, signatures and people are invented.
 */

const FONT: CSSProperties = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };
const OR = "#ff9500";
const BG = "#111214";
const PANEL = "#1a1b1e";
const LINE = "rgb(255 255 255 / 0.08)";
const MUTE = "rgb(255 255 255 / 0.55)";
const LOGO = { src: "/case-studies/defence-ai-mission-console-india/logo-white.webp", img: { w: 622, h: 160 } };

const NAV: [string, typeof Activity, number?][] = [
  ["Overview", LayoutDashboard],
  ["Flight plans", MapIcon],
  ["Passes", Plane, 6],
  ["Reconstruction", Layers],
  ["Composites", Cpu, 4],
  ["Review", ShieldCheck, 11],
  ["Audit log", ClipboardList],
  ["Settings", Settings],
];

function Console({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`console.heliousai.com/${path}`} dark>
      <div className="flex h-full" style={{ ...FONT, background: BG, color: "#fff" }}>
        <aside className="flex w-[118px] shrink-0 flex-col border-r px-[8px] py-[10px]" style={{ borderColor: LINE, background: "#0c0d0f" }}>
          <Photo {...LOGO} w={70} h={18} />
          <p className="mt-[3px] text-[6.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: OR }}>
            Mission console
          </p>
          <nav className="mt-[10px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-[6px] px-[6px] text-[8.5px]" style={i === active ? { background: "rgb(255 149 0 / 0.14)", color: OR, fontWeight: 600 } : { color: MUTE }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && (
                  <span className="ml-auto rounded-full px-[4px] text-[7px] font-bold" style={{ background: i === active ? OR : "rgb(255 255 255 / 0.1)", color: i === active ? "#111" : "#fff" }}>
                    {b}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <div className="mt-auto rounded-[6px] p-[6px]" style={{ background: PANEL }}>
            <p className="text-[8px] font-semibold">Operator · A. Rawat</p>
            <p className="text-[6.8px]" style={{ color: MUTE }}>
              Role: analyst · MFA on
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[38px] shrink-0 items-center gap-[8px] border-b px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[11.5px] font-bold">{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: MUTE }}>
                {sub}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-[6px]">
              {right}
              <Bell className="size-[11px]" style={{ color: MUTE }} aria-hidden="true" />
            </div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

const Card = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] ${className}`} style={{ background: PANEL, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-semibold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.5px] font-normal" style={{ color: MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span className="inline-flex h-[20px] items-center gap-[4px] rounded-[5px] px-[8px] text-[7.8px] font-semibold" style={solid ? { background: OR, color: "#111" } : { boxShadow: `inset 0 0 0 1px rgb(255 255 255 / 0.2)` }}>
    {children}
  </span>
);

const Status = ({ s }: { s: "Ready" | "Running" | "Queued" | "Uploading" }) => {
  const c = { Ready: ["#14532d", "#4ade80"], Running: ["#3b2a07", OR], Queued: ["#26272b", "#a1a1aa"], Uploading: ["#172554", "#93c5fd"] }[s];
  return (
    <span className="inline-flex items-center gap-[3px] rounded-full px-[5px] py-[1.5px] text-[7px] font-semibold" style={{ background: c[0], color: c[1] }}>
      <span className="size-[4px] rounded-full" style={{ background: c[1] }} />
      {s}
    </span>
  );
};

/* 01 · Overview ------------------------------------------------------ */

const PASSES: [string, string, string, string, string, number, "Ready" | "Running" | "Queued" | "Uploading"][] = [
  ["P-0412", "Sector A-14", "Lawnmower", "35 m", "3,072", 100, "Ready"],
  ["P-0411", "Sector A-14", "Spiral", "40 m", "2,880", 100, "Ready"],
  ["P-0410", "Sector C-02", "Lawnmower", "35 m", "3,114", 100, "Running"],
  ["P-0409", "Sector C-02", "Lawnmower", "30 m", "3,206", 100, "Ready"],
  ["P-0408", "Sector B-07", "Spiral", "40 m", "2,640", 72, "Uploading"],
  ["P-0407", "Sector B-07", "Lawnmower", "35 m", "3,508", 0, "Queued"],
];
const PC = "46px 64px 58px 34px 46px 1fr 62px";

const Overview: Screen = () => (
  <Console path="overview" active={0} title="Today's passes" sub="Exercise area North · 6 passes · 18,420 frames · all times IST" right={<Btn solid>New flight plan</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Passes today", "6", "2 areas"],
          ["Frames uploaded", "18,420", "98.6% verified"],
          ["Composites ready", "4", "1 running"],
          ["Signatures to review", "11", "none confirmed yet"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-[8px] px-[9px] py-[7px]" style={i === 3 ? { background: OR, color: "#111" } : { background: PANEL, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.5px] font-medium" style={{ opacity: 0.7 }}>{k}</p>
            <p className="mt-[3px] text-[16px] font-bold leading-none">{v}</p>
            <p className="mt-[4px] text-[7px]" style={{ opacity: 0.65 }}>{s}</p>
          </div>
        ))}
      </div>
      <Card title="Passes" right="Newest first" className="flex-1">
        <div className="grid h-[18px] items-center gap-[6px] text-[6.8px] font-semibold uppercase tracking-[0.08em]" style={{ gridTemplateColumns: PC, color: MUTE }}>
          <span>Pass</span>
          <span>Area</span>
          <span>Pattern</span>
          <span>Alt.</span>
          <span>Frames</span>
          <span>Upload</span>
          <span>Status</span>
        </div>
        {PASSES.map((p, i) => (
          <div key={p[0]} className="grid h-[27px] items-center gap-[6px] border-t text-[8px]" style={{ gridTemplateColumns: PC, borderColor: LINE, background: i === 0 ? "rgb(255 149 0 / 0.06)" : undefined }}>
            <span className="font-mono font-bold">{p[0]}</span>
            <span>{p[1]}</span>
            <span style={{ color: MUTE }}>{p[2]}</span>
            <span className="tabular-nums">{p[3]}</span>
            <span className="tabular-nums">{p[4]}</span>
            <span className="flex items-center gap-[4px]">
              <span className="h-[4px] flex-1 overflow-hidden rounded-full" style={{ background: "rgb(255 255 255 / 0.1)" }}>
                <span className="block h-full rounded-full" style={{ width: `${p[5]}%`, background: p[5] === 100 ? "#4ade80" : "#93c5fd" }} />
              </span>
              <span className="w-[22px] text-right text-[7px] tabular-nums" style={{ color: MUTE }}>{p[5]}%</span>
            </span>
            <Status s={p[6]} />
          </div>
        ))}
      </Card>
    </div>
  </Console>
);

/* 02 · Flight planner ------------------------------------------------ */

function Terrain({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox="0 0 300 220" className="block h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="hx-c" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3f6b3a" />
          <stop offset="1" stopColor="#1d3a1f" />
        </radialGradient>
      </defs>
      <rect width="300" height="220" fill="#16281a" />
      {Array.from({ length: 70 }).map((_, i) => (
        <circle key={i} cx={(i * 47) % 300} cy={(i * 29 + (i % 7) * 13) % 220} r={9 + (i % 5) * 3} fill="url(#hx-c)" opacity={0.75} />
      ))}
      <path d="M0 160 C 60 150 90 190 160 170 S 260 120 300 132" fill="none" stroke="#6b7f5e" strokeWidth="3" opacity="0.6" />
      {children}
    </svg>
  );
}

const FlightPlanner: Screen = () => (
  <Console path="plans/A-14" active={1} title="Flight plan · Sector A-14" sub="Synthetic-aperture pattern for E-AOS · draft by A. Rawat" right={<><Btn>Simulate</Btn><Btn solid>Send to pilot</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_150px] gap-[8px]">
      <Card title="Area and pattern" right="Grid A-14 · 1.2 km²" className="overflow-hidden">
        <div className="relative h-full overflow-hidden rounded-[6px]">
          <Terrain>
            <polygon points="40,30 250,22 268,180 30,196" fill="rgb(255 149 0 / 0.08)" stroke={OR} strokeWidth="1.5" strokeDasharray="5 3" />
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 52 + i * 24;
              return <path key={i} d={i % 2 ? `M${x} 186 L${x} 32` : `M${x} 32 L${x} 186`} stroke="#fff" strokeOpacity="0.85" strokeWidth="1.2" fill="none" />;
            })}
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={`t${i}`} d={`M${52 + i * 24} ${i % 2 ? 32 : 186} L${76 + i * 24} ${i % 2 ? 32 : 186}`} stroke="#fff" strokeOpacity="0.85" strokeWidth="1.2" />
            ))}
            <circle cx="52" cy="186" r="4" fill={OR} />
            <text x="58" y="200" fontSize="8" fill="#fff">Launch</text>
          </Terrain>
        </div>
      </Card>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Card title="Pattern">
          <div className="grid grid-cols-2 gap-[3px] text-[7.5px]">
            {["Lawnmower", "Spiral"].map((p, i) => (
              <span key={p} className="rounded-[4px] py-[3px] text-center font-semibold" style={i === 0 ? { background: OR, color: "#111" } : { background: "rgb(255 255 255 / 0.08)" }}>
                {p}
              </span>
            ))}
          </div>
          <div className="mt-[7px] space-y-[4px] text-[7.8px]">
            {[
              ["Altitude", "35 m"],
              ["Track spacing", "24 m"],
              ["Frame rate", "4 / s"],
              ["Angular diversity", "±32°"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between">
                <span style={{ color: MUTE }}>{k}</span>
                <b>{v}</b>
              </p>
            ))}
          </div>
        </Card>
        <Card title="Expected" className="flex-1">
          <div className="space-y-[4px] text-[7.8px]">
            {[
              ["Frames", "≈ 3,100"],
              ["Flight time", "14 min"],
              ["Battery at land", "31%"],
              ["Wind (forecast)", "9 km/h NE"],
            ].map(([k, v]) => (
              <p key={k} className="flex justify-between">
                <span style={{ color: MUTE }}>{k}</span>
                <b>{v}</b>
              </p>
            ))}
          </div>
          <p className="mt-[6px] rounded-[5px] px-[6px] py-[4px] text-[7px] leading-[1.4]" style={{ background: "rgb(74 222 128 / 0.1)", color: "#86efac" }}>
            Coverage meets the reconstruction minimum for this canopy density.
          </p>
        </Card>
      </div>
    </div>
  </Console>
);

/* 03 · Composite viewer --------------------------------------------- */

function Thermal({ clear }: { clear: boolean }) {
  return (
    <svg viewBox="0 0 200 150" className="block h-full w-full" aria-hidden="true">
      <rect width="200" height="150" fill="#0b0b10" />
      {Array.from({ length: clear ? 14 : 60 }).map((_, i) => (
        <circle key={i} cx={(i * 37) % 200} cy={(i * 23 + (i % 5) * 9) % 150} r={clear ? 6 : 8 + (i % 4) * 3} fill={clear ? "#2a2440" : i % 3 ? "#6d3f7a" : "#c2557a"} opacity={clear ? 0.35 : 0.55} />
      ))}
      {clear && (
        <>
          <rect x="44" y="52" width="20" height="10" rx="2" fill="#f4c76b" />
          <rect x="118" y="88" width="9" height="16" rx="3" fill="#f7d58c" />
          <rect x="150" y="34" width="14" height="8" rx="2" fill="#eab35a" />
          {[
            [40, 48, 28, 18, "SIG-01 · 0.91"],
            [114, 84, 17, 24, "SIG-02 · 0.84"],
            [146, 30, 22, 16, "SIG-03 · 0.62"],
          ].map(([x, y, w, h, t]) => (
            <g key={t as string}>
              <rect x={x as number} y={y as number} width={w as number} height={h as number} fill="none" stroke={OR} strokeWidth="1.2" />
              <text x={x as number} y={(y as number) - 3} fontSize="7" fill={OR} fontWeight="700">
                {t}
              </text>
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

const Composite: Screen = () => (
  <Console path="composites/P-0412" active={4} title="Composite · Pass P-0412" sub="Sector A-14 · 3,072 frames · reconstruction 6 min 40 s · ground layer" right={<Btn solid>Open review (3)</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="flex items-center gap-[6px] text-[7.5px]">
        <span style={{ color: MUTE }}>Layer</span>
        {["Canopy", "Mid-layer", "Ground"].map((l, i) => (
          <span key={l} className="rounded-[4px] px-[7px] py-[3px] font-semibold" style={i === 2 ? { background: OR, color: "#111" } : { background: "rgb(255 255 255 / 0.08)" }}>
            {l}
          </span>
        ))}
        <span className="ml-auto" style={{ color: MUTE }}>Signatures are unconfirmed until reviewed</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-[8px]">
        <Card title="Single thermal frame (canopy)" right="frame 1,512">
          <div className="h-full overflow-hidden rounded-[5px]">
            <Thermal clear={false} />
          </div>
        </Card>
        <Card title="E-AOS ground composite" right="3,072 frames fused">
          <div className="h-full overflow-hidden rounded-[5px]">
            <Thermal clear />
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-[8px] text-[7.8px]">
        {[
          ["SIG-01", "Static · 2.1 × 1.0 m", "0.91"],
          ["SIG-02", "Static · 0.8 × 1.6 m", "0.84"],
          ["SIG-03", "Static · 1.4 × 0.8 m", "0.62"],
        ].map(([id, d, c]) => (
          <div key={id} className="flex items-center gap-[6px] rounded-[6px] px-[7px] py-[5px]" style={{ background: PANEL, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <b style={{ color: OR }}>{id}</b>
            <span className="min-w-0 flex-1 truncate" style={{ color: MUTE }}>{d}</span>
            <b className="tabular-nums">{c}</b>
          </div>
        ))}
      </div>
    </div>
  </Console>
);

/* 04 · Operator review ---------------------------------------------- */

const Review: Screen = () => (
  <Console path="review/SIG-01" active={5} title="Review · SIG-01 (Pass P-0412)" sub="Confidence 0.91 · grid A-14 / 0412-07 · nothing is shared until confirmed" right={<><Btn><X className="size-[9px]" aria-hidden="true" /> Dismiss</Btn><Btn solid><Check className="size-[9px]" aria-hidden="true" /> Confirm</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_168px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <div className="grid grid-cols-3 gap-[8px]">
          {["Canopy", "Mid-layer", "Ground"].map((l, i) => (
            <Card key={l} title={l}>
              <div className="h-[86px] overflow-hidden rounded-[4px]">
                <svg viewBox="0 0 100 70" className="block h-full w-full" aria-hidden="true">
                  <rect width="100" height="70" fill="#0b0b10" />
                  {Array.from({ length: i === 2 ? 4 : i === 1 ? 14 : 26 }).map((_, k) => (
                    <circle key={k} cx={(k * 31) % 100} cy={(k * 17) % 70} r={6 + (k % 3) * 3} fill={i === 2 ? "#2a2440" : "#7a4688"} opacity={0.5} />
                  ))}
                  <rect x="38" y="28" width={i === 2 ? 24 : 18} height={i === 2 ? 12 : 9} rx="2" fill="#f4c76b" opacity={i === 2 ? 1 : i === 1 ? 0.45 : 0.18} />
                  {i === 2 && <rect x="34" y="24" width="32" height="20" fill="none" stroke={OR} strokeWidth="1.2" />}
                </svg>
              </div>
            </Card>
          ))}
        </div>
        <Card title="Operator note" className="flex-1">
          <p className="rounded-[5px] px-[6px] py-[5px] text-[7.8px] leading-[1.45]" style={{ background: "rgb(255 255 255 / 0.05)" }}>
            Persistent across passes P-0411 and P-0412; shape consistent with a covered static object. Recommend a second pass at 30 m before reporting.
          </p>
          <div className="mt-[6px] flex flex-wrap gap-[4px] text-[7px]">
            {["Seen in 2 passes", "Static", "Not on last week's composite"].map((t) => (
              <span key={t} className="rounded-full px-[6px] py-[2px]" style={{ background: "rgb(255 149 0 / 0.12)", color: OR }}>
                {t}
              </span>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Audit trail">
        <div className="space-y-[6px] text-[7.2px] leading-[1.35]">
          {[
            ["09:42", "Pass P-0412 landed, 3,072 frames verified", "System"],
            ["09:49", "Reconstruction finished (ground layer)", "System"],
            ["09:49", "SIG-01 flagged, confidence 0.91", "Model v2.3"],
            ["10:05", "Opened for review", "A. Rawat"],
            ["10:07", "Note added; second pass requested", "A. Rawat"],
          ].map(([t, e, w], i) => (
            <div key={i} className="flex gap-[5px]">
              <span className="mt-[2px] size-[5px] shrink-0 rounded-full" style={{ background: i > 2 ? OR : "#71717a" }} />
              <span>
                <b className="font-mono" style={{ color: MUTE }}>{t}</b> {e}
                <span className="block" style={{ color: MUTE }}>{w}</span>
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </Console>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: "radial-gradient(circle at 30% 20%, #3a2a12, #0c0d0f 70%)" }}>
    <Laptop w={400} h={256} bg={BG}>
      <div className="flex h-full flex-col p-[8px] text-white">
        <div className="flex items-center gap-[6px]">
          <Photo {...LOGO} w={56} h={14} />
          <span className="ml-auto text-[6.5px]" style={{ color: MUTE }}>Exercise area North</span>
        </div>
        <div className="mt-[6px] grid flex-1 grid-cols-2 gap-[6px]">
          <div className="overflow-hidden rounded-[5px]">
            <Thermal clear={false} />
          </div>
          <div className="overflow-hidden rounded-[5px]">
            <Thermal clear />
          </div>
        </div>
        <div className="mt-[6px] flex gap-[5px] text-[6.5px]">
          {["P-0412 · Ready", "P-0411 · Ready", "P-0410 · Running"].map((t, i) => (
            <span key={t} className="rounded-full px-[6px] py-[2px]" style={{ background: i === 2 ? "#3b2a07" : "#14532d", color: i === 2 ? OR : "#4ade80" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Laptop>
    <Phone w={150} h={300} bg="#0c0d0f" dark>
      <div className="flex flex-1 flex-col px-[9px] pt-[10px] text-white">
        <p className="text-center text-[22px] font-semibold">10:12</p>
        <p className="text-center text-[7px]" style={{ color: MUTE }}>Monday 23 November</p>
        <div className="mt-[12px] rounded-[12px] p-[7px]" style={{ background: "rgb(255 255 255 / 0.1)" }}>
          <p className="flex items-center gap-[4px] text-[6.5px] font-semibold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
            <span className="flex size-[12px] items-center justify-center rounded-[3px]" style={{ background: OR }}>
              <Upload className="size-[7px] text-black" aria-hidden="true" />
            </span>
            HeliousAI console
            <span className="ml-auto normal-case">now</span>
          </p>
          <p className="mt-[3px] text-[7.6px] font-semibold">Composite ready · P-0412</p>
          <p className="text-[7px] leading-[1.35]" style={{ color: "rgb(255 255 255 / 0.8)" }}>Sector A-14 · 3 signatures to review. Nothing is shared until an operator confirms.</p>
        </div>
        <div className="mt-[6px] rounded-[12px] p-[7px]" style={{ background: "rgb(255 255 255 / 0.06)" }}>
          <p className="flex items-center gap-[4px] text-[7px]">
            <CircleCheck className="size-[8px] text-[#4ade80]" aria-hidden="true" /> P-0411 reviewed by A. Rawat
          </p>
        </div>
      </div>
    </Phone>
  </div>
);

export const heliousScreens: Screen[] = [Overview, FlightPlanner, Composite, Review, LaptopPhone];
