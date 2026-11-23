import { Geist, Geist_Mono } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { ArrowUp, BookOpen, Boxes, Brain, Check, Download, Eraser, FlaskConical, FolderOpen, LayoutGrid, Merge, Microscope, Paperclip, PenLine, Repeat, Scissors, TriangleAlert, Workflow } from "lucide-react";

import { Browser, LineChart, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * VolkCell · AI microscopy image analyst, from volkcell.com and its guide (read 23 Nov 2026): Geist and
 * Geist Mono, near-black #101010 on white and #f4f5f5, teal #1f6b7a / #14525e, warning red #b42318,
 * yellow mask outlines. Product facts (describe the assay in chat, check what runs, accept or refine a
 * new workflow, counts / CSVs / overlays / plots, masks and quality warnings, every run recorded with
 * plan, method and software version, corrections and custom model training) are from the site.
 * TODO(content): illustrative. Images are drawn, not real micrographs; files, counts, runs and charts
 * are invented. The site's "used by researchers at" list and its own demo outputs are not used.
 */

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: geist.style.fontFamily };
const MONO: CSSProperties = { fontFamily: mono.style.fontFamily };
const INK = "#101010";
const GREY = "#5c5c5c";
const TEAL = "#1f6b7a";
const TEAL_D = "#14525e";
const SOFT = "#f4f5f5";
const RED = "#b42318";
const MASK = "#e5e23a";
const LINE = "#e6e8e8";
const LOGO = { src: "/logos/volkcell.webp", img: { w: 261, h: 57 } };

/* Drawn microscopy fields (seeded, so server and client renders match) ---- */

function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r1 = (n: number) => Math.round(n * 10) / 10;
type Blob = { x: number; y: number; rx: number; ry: number; a: number; flag: boolean };

function blobs(seed: number, n: number, w: number, h: number, rmin: number, rmax: number, gap = 0): Blob[] {
  const rand = rng(seed);
  const out: Blob[] = [];
  let tries = 0;
  while (out.length < n && tries < n * 30) {
    tries++;
    const x = rand() * w;
    const y = rand() * h;
    const rx = rmin + rand() * (rmax - rmin);
    const ry = rx * (0.6 + rand() * 0.35);
    if (gap && Math.abs(x - w / 2) < gap / 2 + rx * 0.4) continue;
    if (out.some((b) => Math.hypot(b.x - x, b.y - y) < (b.rx + rx) * 0.8)) continue;
    out.push({ x: r1(x), y: r1(y), rx: r1(rx), ry: r1(ry), a: Math.round(rand() * 180), flag: false });
  }
  return out;
}

function Field({
  w,
  h,
  seed,
  n,
  kind = "phase",
  masks = false,
  gap = 0,
  flags = [],
  r = [5, 10],
  select,
}: {
  w: number;
  h: number;
  seed: number;
  n: number;
  kind?: "phase" | "fluor";
  masks?: boolean;
  gap?: number;
  flags?: number[];
  r?: [number, number];
  select?: "center";
}) {
  const bs = blobs(seed, n, w, h, r[0], r[1], gap);
  const sel = select ? bs.reduce((best, b, i) => (Math.hypot(b.x - w * 0.55, b.y - h * 0.5) < Math.hypot(bs[best].x - w * 0.55, bs[best].y - h * 0.5) ? i : best), 0) : -1;
  const fluor = kind === "fluor";
  const id = `vc-${seed}-${w}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.45" cy="0.4" r="0.8">
          <stop offset="0" stopColor={fluor ? "#0b1024" : "#8b9094"} />
          <stop offset="1" stopColor={fluor ? "#03050c" : "#5d6266"} />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-bg)`} />
      {gap > 0 && <rect x={r1(w / 2 - gap / 2)} y={0} width={gap} height={h} fill="#6c7175" opacity={0.6} />}
      {bs.map((b, i) => {
        const flagged = flags.includes(i);
        return (
          <g key={i} transform={`rotate(${b.a} ${b.x} ${b.y})`}>
            {fluor ? (
              <ellipse cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="#4f7dff" opacity={0.85} />
            ) : (
              <>
                <ellipse cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="#a7adb1" stroke="#474c50" strokeWidth={0.8} />
                <ellipse cx={b.x} cy={b.y} rx={r1(b.rx * 0.35)} ry={r1(b.ry * 0.4)} fill="#70767a" />
              </>
            )}
            {masks && (
              <ellipse
                cx={b.x}
                cy={b.y}
                rx={r1(b.rx + 1)}
                ry={r1(b.ry + 1)}
                fill={flagged ? "rgb(180 35 24 / 0.25)" : i === sel ? "rgb(31 107 122 / 0.55)" : "rgb(56 189 178 / 0.22)"}
                stroke={flagged ? "#ff6b5e" : i === sel ? "#7fe3d6" : MASK}
                strokeWidth={i === sel ? 1.8 : 1.1}
                strokeDasharray={i === sel ? "3 2" : undefined}
              />
            )}
          </g>
        );
      })}
      {masks && gap > 0 && (
        <>
          <line x1={r1(w / 2 - gap / 2)} x2={r1(w / 2 - gap / 2)} y1={0} y2={h} stroke="#7fe3d6" strokeWidth={1.4} />
          <line x1={r1(w / 2 + gap / 2)} x2={r1(w / 2 + gap / 2)} y1={0} y2={h} stroke="#7fe3d6" strokeWidth={1.4} />
        </>
      )}
    </svg>
  );
}

/* Workspace shell ---------------------------------------------------- */

const NAV: [string, typeof LayoutGrid][] = [
  ["Overview", LayoutGrid],
  ["Analysis", Microscope],
  ["Experiments", FlaskConical],
  ["Saved workflows", Workflow],
  ["Training", Brain],
  ["Models", Boxes],
  ["Exports", Download],
  ["Guide", BookOpen],
];

function Workspace({ path, active, title, sub, right, children }: { path: string; active: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`volkcell.com/app/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK }}>
        <aside className="flex w-[112px] shrink-0 flex-col border-r px-[8px] py-[10px]" style={{ background: SOFT, borderColor: LINE }}>
          <Photo {...LOGO} w={58} h={13} />
          <nav className="mt-[12px] space-y-[1px] text-[8px]">
            {NAV.map(([t, Icon]) => (
              <p key={t} className="flex h-[20px] items-center gap-[5px] rounded-[5px] px-[5px] font-medium" style={t === active ? { background: "#fff", color: TEAL, boxShadow: `0 0 0 1px ${LINE}` } : { color: GREY }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t}
              </p>
            ))}
          </nav>
          <div className="mt-auto rounded-[6px] bg-white p-[6px] text-[6.8px] leading-[1.35]" style={{ color: GREY, boxShadow: `0 0 0 1px ${LINE}` }}>
            <p className="font-semibold" style={{ color: INK }}>Demo Lab workspace</p>
            Daily analysis allowance: 62% left
          </div>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[40px] shrink-0 items-center border-b px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[11.5px] font-semibold tracking-[-0.01em]">{title}</p>
              <p className="truncate text-[7.4px]" style={{ color: GREY }}>{sub}</p>
            </div>
            <div className="ml-auto flex shrink-0 gap-[5px]">{right}</div>
          </div>
          <div className="min-h-0 flex-1 p-[9px]" style={{ background: "#fafafa" }}>
            {children}
          </div>
        </main>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Check }) => (
  <span
    className="inline-flex h-[20px] items-center gap-[4px] whitespace-nowrap rounded-full px-[9px] text-[7.6px] font-semibold"
    style={solid ? { background: TEAL, color: "#fff" } : { background: "#fff", color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}
  >
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] bg-white ${className}`} style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[22px] shrink-0 items-center justify-between border-b px-[8px] text-[8px] font-semibold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7px] font-normal" style={{ color: GREY }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);
const File = ({ name }: { name: string }) => (
  <span className="flex items-center gap-[4px] rounded-[4px] px-[5px] py-[3px] text-[7px]" style={{ ...MONO, background: SOFT }}>
    <Download className="size-[7px]" style={{ color: TEAL }} aria-hidden="true" />
    {name}
  </span>
);

/* 01 · Ask, then check what runs -------------------------------------- */

const PLAN = [
  "Read pixel size from the TIFF metadata (0.65 µm/px)",
  "Correct uneven background",
  "Segment nuclei (nuclei model, sensitivity auto)",
  "Split touching nuclei",
  "Check each image: focus, saturation, clumps",
  "Return counts per well (CSV), overlays and a bar plot",
];

const Ask: Screen = () => (
  <Workspace path="analysis/new" active="Analysis" title="New analysis · Hoechst nuclei, plate 07" sub="Describe the assay. VolkCell says what it will run before it runs." right={<Btn Icon={FolderOpen}>Add to experiment</Btn>}>
    <div className="flex h-full flex-col">
      <div className="flex justify-end">
        <div className="max-w-[330px] rounded-[10px] rounded-tr-[3px] p-[7px] text-white" style={{ background: TEAL }}>
          <div className="mb-[5px] flex gap-[4px]">
            {[11, 12, 13].map((s, i) => (
              <span key={s} className="overflow-hidden rounded-[4px] ring-1 ring-white/30">
                <Field w={56} h={40} seed={s} n={26} kind="fluor" r={[2, 3.6]} />
                <span className="block bg-black/30 px-[3px] py-[1px] text-[5.6px]" style={MONO}>A0{i + 1}.tif</span>
              </span>
            ))}
          </div>
          <p className="text-[8px] leading-[1.4]">Count the Hoechst-stained nuclei per well and flag anything that looks off. 96-well plate, 20x.</p>
        </div>
      </div>
      <div className="mt-[8px] flex gap-[6px]">
        <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: SOFT }}>
          <Microscope className="size-[9px]" style={{ color: TEAL }} aria-hidden="true" />
        </span>
        <div className="flex-1 rounded-[10px] rounded-tl-[3px] bg-white p-[8px]" style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
          <p className="text-[8px] leading-[1.4]">
            This is a new workflow for this experiment, so here is the plan. <b>Nothing runs until you accept it.</b>
          </p>
          <ol className="mt-[5px] space-y-[2.5px] text-[7.5px]">
            {PLAN.map((s, i) => (
              <li key={s} className="flex items-center gap-[5px]">
                <span className="flex size-[12px] shrink-0 items-center justify-center rounded-full text-[6.5px] font-semibold" style={{ background: SOFT, color: TEAL, ...MONO }}>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-[6px] flex flex-wrap gap-[4px]">
            {["Analysis: nuclei count", "ROI: whole field", "Sensitivity: auto", "Plate: 96-well"].map((c) => (
              <span key={c} className="rounded-full px-[6px] py-[2px] text-[6.8px] font-medium" style={{ background: "#e8f1f3", color: TEAL_D }}>{c}</span>
            ))}
          </div>
          <div className="mt-[7px] flex gap-[5px]">
            <Btn solid Icon={Check}>Accept and run</Btn>
            <Btn Icon={PenLine}>Refine</Btn>
          </div>
        </div>
      </div>
      <div className="mt-auto flex h-[28px] items-center gap-[6px] rounded-full bg-white px-[10px] text-[8px]" style={{ color: GREY, boxShadow: `0 0 0 1px ${LINE}` }}>
        <Paperclip className="size-[9px]" aria-hidden="true" />
        Reply to refine, e.g. &ldquo;Only count nuclei inside the well edge&rdquo;
        <span className="ml-auto flex size-[18px] items-center justify-center rounded-full" style={{ background: TEAL }}>
          <ArrowUp className="size-[9px] text-white" aria-hidden="true" />
        </span>
      </div>
    </div>
  </Workspace>
);

/* 02 · Results with masks and warnings -------------------------------- */

const ROWS: [string, string, string, "green" | "amber"][] = [
  ["B03_f1.tif", "214", "38.2%", "green"],
  ["B03_f2.tif", "198", "36.9%", "green"],
  ["B03_f3.tif", "231", "41.0%", "amber"],
  ["B04_f1.tif", "187", "33.5%", "green"],
  ["B04_f2.tif", "205", "37.4%", "green"],
];

const Results: Screen = () => (
  <Workspace path="runs/2051" active="Analysis" title="Results · cell count and confluency" sub="Run 2051 · 5 images · finished in under a minute" right={<><Btn Icon={Repeat}>Save as workflow</Btn><Btn solid Icon={Download}>Download all</Btn></>}>
    <div className="grid h-full grid-cols-[262px_1fr] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[6px]">
        <div className="relative overflow-hidden rounded-[8px]">
          <Field w={262} h={196} seed={7} n={58} masks flags={[4, 17]} r={[6, 11]} />
          <span className="absolute left-[6px] top-[6px] rounded-[4px] bg-black/55 px-[5px] py-[2px] text-[6.8px] text-white" style={MONO}>B03_f3.tif · masks</span>
          <span className="absolute bottom-[6px] right-[6px] flex gap-[3px]">
            {["Image", "Masks", "Both"].map((t, i) => (
              <span key={t} className="rounded-[4px] px-[5px] py-[2px] text-[6.6px] font-medium" style={i === 2 ? { background: "#fff", color: INK } : { background: "rgb(0 0 0 / 0.5)", color: "#fff" }}>{t}</span>
            ))}
          </span>
        </div>
        <div className="flex gap-[6px] rounded-[8px] p-[7px]" style={{ background: "#fdf1ef", boxShadow: "inset 0 0 0 1px #f5c9c3" }}>
          <TriangleAlert className="mt-[1px] size-[10px] shrink-0" style={{ color: RED }} aria-hidden="true" />
          <p className="text-[7.4px] leading-[1.4]" style={{ color: "#5b1a12" }}>
            <b>B03_f3: two possible clumps.</b> Count kept at 231; the 2 areas outlined in red may hold more cells than were split. Review the masks or correct them.
          </p>
        </div>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <div className="grid grid-cols-3 gap-[6px]">
          {[
            ["Cells", "1,035"],
            ["Confluency", "37.4%"],
            ["Warnings", "1"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[8px] bg-white px-[8px] py-[6px]" style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
              <p className="text-[6.6px] uppercase tracking-[0.08em]" style={{ ...MONO, color: GREY }}>{k}</p>
              <p className="mt-[2px] text-[15px] font-semibold tracking-[-0.02em]">{v}</p>
            </div>
          ))}
        </div>
        <Box title="Per image" right="measurements.csv">
          {ROWS.map(([f, c, conf, t]) => (
            <div key={f} className="grid h-[20px] grid-cols-[1fr_34px_40px_64px] items-center border-b text-[7.6px] last:border-b-0" style={{ borderColor: LINE }}>
              <span style={MONO}>{f}</span>
              <span className="text-right tabular-nums">{c}</span>
              <span className="text-right tabular-nums">{conf}</span>
              <span className="text-right"><Pill tone={t} size={6.4}>{t === "green" ? "Checked" : "Warning"}</Pill></span>
            </div>
          ))}
        </Box>
        <Box title="Outputs" className="flex-1">
          <div className="flex flex-wrap gap-[4px]">
            <File name="measurements.csv" />
            <File name="overlays.zip" />
            <File name="masks.zip" />
            <File name="confluency-plot.png" />
          </div>
        </Box>
      </div>
    </div>
  </Workspace>
);

/* 03 · Wound healing across time points -------------------------------- */

const TIMES = ["0 h", "12 h", "24 h", "36 h"];
const GAPS = [46, 34, 22, 12];

const Wound: Screen = () => (
  <Workspace path="experiments/scratch-12" active="Experiments" title="Wound closure · scratch assay, plate 12" sub="Same field at four time points · control vs treated · edges detected per image" right={<Btn solid Icon={Download}>wound-closure.csv</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[6px]">
        {TIMES.map((t, i) => (
          <div key={t} className="relative overflow-hidden rounded-[6px]">
            <Field w={120} h={70} seed={30 + i} n={34} gap={GAPS[i]} masks r={[4, 7]} />
            <span className="absolute left-[4px] top-[4px] rounded-[3px] bg-black/55 px-[4px] py-[1px] text-[6.6px] text-white" style={MONO}>Control · {t}</span>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_150px] gap-[8px]">
        <Box
          title="Open wound area, % of 0 h"
          right={
            <span className="flex gap-[8px]">
              <span className="flex items-center gap-[3px]"><span className="size-[6px] rounded-[2px]" style={{ background: TEAL }} />Control</span>
              <span className="flex items-center gap-[3px]"><span className="size-[6px] rounded-[2px]" style={{ background: "#c2410c" }} />Treated</span>
            </span>
          }
        >
          <LineChart
            w={300}
            h={164}
            max={100}
            labels={["0 h", "6 h", "12 h", "18 h", "24 h", "30 h", "36 h"]}
            yFormat={(n) => `${Math.round(n)}%`}
            series={[
              { values: [100, 86, 71, 57, 44, 33, 24], color: TEAL, area: true },
              { values: [100, 94, 87, 80, 73, 66, 60], color: "#c2410c", dashed: true },
            ]}
          />
        </Box>
        <div className="flex min-h-0 flex-col gap-[8px]">
          <Box title="Closure at 36 h">
            <div className="space-y-[5px] text-[7.6px]">
              <p className="flex justify-between"><span>Control (n=6)</span><b>76%</b></p>
              <p className="flex justify-between"><span>Treated (n=6)</span><b>40%</b></p>
              <p className="pt-[2px] text-[6.8px] leading-[1.35]" style={{ color: GREY }}>Pixel size read from each TIFF, so areas are in µm².</p>
            </div>
          </Box>
          <Box title="Method" className="flex-1">
            <p className="text-[7px] leading-[1.45]" style={{ color: GREY }}>Wound edges found per image, area measured between them, normalised to 0 h. Recorded with this run.</p>
          </Box>
        </div>
      </div>
    </div>
  </Workspace>
);

/* 04 · Run record: repeat and cite -------------------------------------- */

const Record: Screen = () => (
  <Workspace path="runs/2048" active="Experiments" title="Run 2048 · wound closure, plate 12" sub="Every run keeps its plan, method and software version" right={<><Btn Icon={Repeat}>Re-run on new images</Btn><Btn solid Icon={BookOpen}>Copy citation</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_190px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Plan" right="accepted 23 Nov, 14:02">
          <ol className="space-y-[3px] text-[7.5px]">
            {["Read pixel size from TIFF metadata", "Align each time point to 0 h", "Detect wound edges (auto threshold)", "Measure open area between edges", "Normalise to 0 h, average per condition", "Plot closure over time, export CSV"].map((s, i) => (
              <li key={s} className="flex items-center gap-[5px]">
                <Check className="size-[8px] shrink-0" style={{ color: TEAL }} aria-hidden="true" />
                <span style={{ ...MONO, color: GREY }}>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </Box>
        <Box title="Inputs and outputs" className="flex-1">
          <div className="grid grid-cols-2 gap-[6px] text-[7.2px]">
            <div>
              <p className="font-semibold">Inputs</p>
              <p className="mt-[2px]" style={{ ...MONO, color: GREY }}>48 images · 12 fields × 4 time points</p>
              <p style={{ ...MONO, color: GREY }}>TIFF, 2048 × 2048, 16-bit</p>
            </div>
            <div>
              <p className="font-semibold">Quality checks</p>
              <p className="mt-[2px] flex items-center gap-[4px]"><Pill tone="green" size={6.2}>46 checked</Pill><Pill tone="amber" size={6.2}>2 warnings</Pill></p>
            </div>
          </div>
          <div className="mt-[7px] flex flex-wrap gap-[4px]">
            <File name="wound-closure.csv" />
            <File name="edges-overlays.zip" />
            <File name="closure-plot.svg" />
            <File name="run-2048.json" />
          </div>
        </Box>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Software">
          <div className="space-y-[3px] text-[7.2px]" style={MONO}>
            <p className="flex justify-between"><span style={{ color: GREY }}>VolkCell</span>1.0.0</p>
            <p className="flex justify-between"><span style={{ color: GREY }}>Workflow</span>scratch-v2</p>
            <p className="flex justify-between"><span style={{ color: GREY }}>Run by</span>Demo Lab</p>
          </div>
        </Box>
        <Box title="How to cite" className="flex-1">
          <p className="rounded-[5px] p-[6px] text-[6.9px] leading-[1.45]" style={{ ...MONO, background: SOFT }}>
            VolkCell Technologies Ltd. (2026). VolkCell (Version 1.0.0) [Computer software]. Run 2048.
          </p>
          <p className="mt-[6px] text-[6.8px] leading-[1.4]" style={{ color: GREY }}>Paste into your methods section. The run ID lets a reviewer see exactly what ran.</p>
        </Box>
      </div>
    </div>
  </Workspace>
);

/* 05 · Correct masks, train on your images ----------------------------- */

const Train: Screen = () => (
  <Workspace path="training/hela-confocal" active="Training" title="Corrections and a model trained on your images" sub="Fix masks where the default model missed, then train on your corrected images" right={<Btn solid Icon={Brain}>Use for this experiment</Btn>}>
    <div className="grid h-full grid-cols-[262px_1fr] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[6px]">
        <div className="flex gap-[3px]">
          {[
            ["Draw", PenLine],
            ["Erase", Eraser],
            ["Split", Scissors],
            ["Merge", Merge],
          ].map(([t, I], i) => {
            const Icon = I as typeof PenLine;
            return (
              <span key={t as string} className="flex h-[20px] flex-1 items-center justify-center gap-[3px] rounded-[5px] text-[7.2px] font-medium" style={i === 2 ? { background: TEAL, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                <Icon className="size-[8px]" aria-hidden="true" />
                {t as string}
              </span>
            );
          })}
        </div>
        <div className="relative overflow-hidden rounded-[8px]">
          <Field w={262} h={200} seed={52} n={40} masks select="center" r={[8, 14]} />
          <span className="absolute left-[6px] top-[6px] rounded-[4px] bg-black/55 px-[5px] py-[2px] text-[6.8px] text-white" style={MONO}>C07_f2.tif · splitting 1 mask</span>
        </div>
        <p className="text-[7px]" style={{ color: GREY }}>37 masks corrected across 12 images in this experiment.</p>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Training · my-lab-hela-v2" right="on your 12 corrected images">
          <div className="flex items-center justify-between text-[7.4px]">
            <span>Epoch 18 of 40</span>
            <span style={{ color: GREY }}>about 6 min left</span>
          </div>
          <span className="mt-[4px] block h-[5px] rounded-full" style={{ background: SOFT }}>
            <span className="block h-full w-[45%] rounded-full" style={{ background: TEAL }} />
          </span>
          <p className="mt-[7px] text-[7px] font-semibold">Agreement with your corrections, held-out images</p>
          <LineChart w={210} h={84} max={1} min={0.5} grid={2} yFormat={(n) => n.toFixed(2)} series={[{ values: [0.62, 0.71, 0.78, 0.82, 0.85, 0.87, 0.88], color: TEAL, area: true }]} />
        </Box>
        <Box title="Models" className="flex-1">
          {[
            ["Default nuclei model", "Built in", "grey"],
            ["Default cell model", "Built in", "grey"],
            ["my-lab-hela-v1", "Custom · 6 images", "green"],
            ["my-lab-hela-v2", "Training", "amber"],
          ].map(([m, s, t]) => (
            <p key={m} className="flex h-[19px] items-center justify-between border-b text-[7.4px] last:border-b-0" style={{ borderColor: LINE }}>
              <span style={MONO}>{m}</span>
              <Pill tone={t as "grey" | "green" | "amber"} size={6.2}>{s}</Pill>
            </p>
          ))}
        </Box>
      </div>
    </div>
  </Workspace>
);

export const volkcellScreens: Screen[] = [Ask, Results, Wound, Record, Train];
