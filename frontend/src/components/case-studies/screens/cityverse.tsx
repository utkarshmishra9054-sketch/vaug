import { Geist, Lora } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Camera, Check, CircleDollarSign, FileText, FolderKanban, HardHat, MapPin, MessageSquare, Mic, Scale, Search, Settings, Waves } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * CityVerse AI · portal (Portfolio, Themis plan review, document Q&A, Field Operations), from
 * cityverseai.com (read 23 Nov 2026): Geist for UI, Lora for headings, near-black #131312 on white,
 * greys #5e5e5e / #a4a49e, red from the logo mark. Product behaviour (checks with a suggested
 * verdict, citations to sheets and standard plates, Accept / Disagree, "needs your judgment") is
 * from the site. TODO(content): illustrative. "Sample City", projects, people and figures are invented.
 */

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], display: "swap", preload: false });
const SANS: CSSProperties = { fontFamily: geist.style.fontFamily };
const SERIF: CSSProperties = { fontFamily: lora.style.fontFamily };
const INK = "#131312";
const GREY = "#5e5e5e";
const LINE = "#e7e7e3";
const RED = "#d9352a";
const LOGO = { src: "/logos/cityverse.webp", img: { w: 526, h: 120 } };

const NAV: [string, typeof Search, number?][] = [
  ["Portfolio", FolderKanban],
  ["Themis", Scale, 7],
  ["Field Ops", HardHat],
  ["Documents", FileText],
  ["Utilities", Waves],
  ["Finance", CircleDollarSign],
  ["Settings", Settings],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`app.cityverseai.com/${path}`}>
      <div className="flex h-full" style={{ ...SANS, color: INK, background: "#fafaf8" }}>
        <aside className="flex w-[116px] shrink-0 flex-col border-r bg-white px-[8px] py-[10px]" style={{ borderColor: LINE }}>
          <Photo {...LOGO} w={84} h={19} />
          <p className="mt-[4px] text-[6.6px] font-medium uppercase tracking-[0.1em]" style={{ color: GREY }}>
            Sample City · Public Works
          </p>
          <nav className="mt-[10px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-[5px] px-[6px] text-[8.5px]" style={i === active ? { background: INK, color: "#fff", fontWeight: 600 } : { color: GREY }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto rounded-full px-[4px] text-[7px] font-bold" style={{ background: i === active ? RED : "#eeeeea", color: i === active ? "#fff" : INK }}>{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto border-t pt-[6px] text-[7.4px]" style={{ borderColor: LINE }}>
            <p className="font-semibold">M. Reyes, PE</p>
            <p style={{ color: GREY }}>City engineer</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12.5px] font-semibold" style={SERIF}>{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: GREY }}>{sub}</p>
            </div>
            <div className="ml-auto flex items-center gap-[6px]">{right}</div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] rounded-[4px] px-[8px] text-[7.8px] font-semibold" style={dark ? { background: INK, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[6px] bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-semibold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal" style={{ color: GREY }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);
const Cite = ({ children }: { children: ReactNode }) => (
  <span className="mx-[1px] inline-flex rounded-[3px] px-[3px] text-[6.8px] font-semibold" style={{ background: "#f1f1ed", color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);

/* 01 · Portfolio ----------------------------------------------------- */

const PROJECTS: [string, string, string, number, string, "amber" | "green" | "grey" | "red"][] = [
  ["Elm St. Reconstruction", "60% plans", "$4.8M", 18, "Cycle 2 · 7 findings", "amber"],
  ["North Basin Sewer Lining", "Construction", "$2.1M", 64, "Field ops daily", "green"],
  ["Riverside Water Main, Ph. 2", "90% plans", "$6.3M", 31, "Cycle 3 · 2 findings", "amber"],
  ["Oak Ave. ADA Ramps", "Construction", "$0.9M", 82, "Punch list", "green"],
  ["Harbor Rd. Resurfacing", "Preliminary", "$3.4M", 6, "Specs drafting", "grey"],
  ["Pine St. Storm Drain", "60% plans", "$1.7M", 15, "Resubmittal late", "red"],
  ["Westgate Lift Station", "Bid", "$5.2M", 9, "Bid opens 4 Dec", "grey"],
];
const PJC = "1fr 62px 42px 70px 92px";

const Portfolio: Screen = () => (
  <Portal path="portfolio" active={0} title="Capital projects portfolio" sub="Sample City · FY2026–27 · 18 active projects" right={<><Btn>Export</Btn><Btn dark>New project</Btn></>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Active projects", "18", "6 in construction"],
          ["In design review", "5", "2 resubmittals due"],
          ["Findings to decide", "7", "1 fail · 1 needs judgment"],
          ["Spent vs budget", "41%", "$11.6M of $28.4M"],
        ].map(([k, v, s]) => (
          <div key={k} className="rounded-[6px] bg-white px-[9px] py-[7px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.5px]" style={{ color: GREY }}>{k}</p>
            <p className="mt-[3px] text-[17px] font-semibold leading-none" style={SERIF}>{v}</p>
            <p className="mt-[4px] text-[7px]" style={{ color: GREY }}>{s}</p>
          </div>
        ))}
      </div>
      <Box title="Projects" right="Sorted by next deadline" className="flex-1">
        <div className="grid h-[18px] items-center gap-[6px] text-[6.8px] font-semibold uppercase tracking-[0.08em]" style={{ gridTemplateColumns: PJC, color: GREY }}>
          <span>Project</span>
          <span>Phase</span>
          <span>Budget</span>
          <span>Spent</span>
          <span>Status</span>
        </div>
        {PROJECTS.map((p, i) => (
          <div key={p[0]} className="grid h-[26px] items-center gap-[6px] border-t text-[8.2px]" style={{ gridTemplateColumns: PJC, borderColor: LINE, background: i === 0 ? "#fbf3f2" : undefined }}>
            <span className="truncate font-medium">{p[0]}</span>
            <span style={{ color: GREY }}>{p[1]}</span>
            <span className="tabular-nums">{p[2]}</span>
            <span className="flex items-center gap-[4px]">
              <span className="h-[4px] flex-1 rounded-full bg-[#eeeeea]">
                <span className="block h-full rounded-full" style={{ width: `${p[3]}%`, background: INK }} />
              </span>
              <span className="w-[18px] text-right text-[7px] tabular-nums" style={{ color: GREY }}>{p[3]}%</span>
            </span>
            <span><Pill tone={p[5]} size={6.8}>{p[4]}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 02 · Themis review ------------------------------------------------- */

const CHECKS: [string, string, "Suggests fail" | "Accepted" | "Needs your judgment" | "Suggests pass"][] = [
  ["Check 4", "Typical sections match the standard plates", "Suggests fail"],
  ["Check 5", "ADA ramps detailed at every crossing", "Accepted"],
  ["Check 6", "Joints laid out at each intersection", "Needs your judgment"],
  ["Check 7", "Pavement markings match the striping plan", "Suggests pass"],
  ["Check 8", "Traffic control phasing is shown", "Suggests pass"],
];
const tone = (s: string): "red" | "green" | "amber" | "grey" => (s === "Suggests fail" ? "red" : s === "Accepted" ? "green" : s === "Needs your judgment" ? "amber" : "grey");

const Themis: Screen = () => (
  <Portal path="themis/elm-st/60" active={1} title="Themis · Elm St. Reconstruction, 60% plans" sub="Phase 2 · Paving · 6 findings so far · Phase 3 · Drainage is next" right={<Btn dark>Send comments to designer</Btn>}>
    <div className="grid h-full grid-cols-[176px_1fr] gap-[8px]">
      <Box title="Checks · Phase 2">
        <div className="space-y-[4px]">
          {CHECKS.map(([n, t, s], i) => (
            <div key={n} className="rounded-[5px] p-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${i === 0 ? INK : LINE}`, background: i === 0 ? "#fbfbf9" : undefined }}>
              <p className="text-[6.8px] font-semibold uppercase tracking-[0.06em]" style={{ color: GREY }}>{n}</p>
              <p className="text-[8px] font-medium leading-[1.3]">{t}</p>
              <span className="mt-[3px] inline-block"><Pill tone={tone(s)} size={6.6}>{s}</Pill></span>
            </div>
          ))}
        </div>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Check 4 · Typical sections match the governing standard plates" right="Suggests fail">
          <p className="text-[8.4px] leading-[1.55]">
            Sheet <Cite>C-201 p1</Cite> shows 7″ PCC pavement over 4″ of granular base. Standard Plate 700-02 calls for 6″ of crushed rock base under arterial sections <Cite>§700.3 p21</Cite>, so the typical section is 2″ short.
          </p>
          <p className="mt-[6px] rounded-[4px] px-[6px] py-[4px] text-[8px]" style={{ background: "#fdeceb", color: "#9b1c13" }}>
            <b>Verdict:</b> Fail. The typical section departs from the standard plate.
          </p>
          <div className="mt-[7px] flex items-center gap-[6px]">
            <Btn dark><Check className="size-[9px]" aria-hidden="true" /> Accept</Btn>
            <Btn>Disagree…</Btn>
            <span className="text-[7.2px]" style={{ color: GREY }}>Stands as suggested unless you rule otherwise.</span>
          </div>
        </Box>
        <Box title="Comment to the designer (draft)" className="flex-1">
          <p className="text-[8px] leading-[1.5]" style={{ color: "#2b2b2a" }}>
            C-201, Typical Section A: increase crushed rock base to 6″ under the arterial section per Std. Plate 700-02 §700.3, or note the approved deviation. Please resubmit with Phase 2 revisions.
          </p>
          <p className="mt-[5px] text-[7px]" style={{ color: GREY }}>Drafted from the finding · edit before sending · logged to the project record</p>
        </Box>
      </div>
    </div>
  </Portal>
);

/* 03 · Ask the documents -------------------------------------------- */

const AskDocs: Screen = () => (
  <Portal path="documents/ask" active={3} title="Ask about these documents" sub="Elm St. Reconstruction · 3 plan sets, 2 specs, city standards · answers cite their source" right={<Btn>Sources (4)</Btn>}>
    <div className="grid h-full grid-cols-[1fr_158px] gap-[8px]">
      <Box title="Conversation" className="overflow-hidden">
        <div className="space-y-[7px] text-[8.2px] leading-[1.5]">
          <p className="ml-auto max-w-[78%] rounded-[8px] px-[8px] py-[5px] text-white" style={{ background: INK }}>
            What base do we need under the arterial pavement, and does the contractor’s submittal meet it?
          </p>
          <div className="max-w-[92%] rounded-[8px] px-[8px] py-[6px]" style={{ background: "#f4f4f0" }}>
            The city requires 6″ of crushed rock base under arterial sections <Cite>Std. Plate 700-02 §700.3 p21</Cite>. The contractor’s aggregate submittal proposes 4″ with a geogrid <Cite>Submittal 32-11-23 p3</Cite>, which the spec allows only with the engineer’s written approval <Cite>Spec 32 11 23 §2.4</Cite>.
            <p className="mt-[4px] font-semibold">So: it doesn’t meet the plate as submitted. An approved deviation would be needed.</p>
          </div>
          <p className="ml-auto max-w-[70%] rounded-[8px] px-[8px] py-[5px] text-white" style={{ background: INK }}>
            Draft the response to the contractor.
          </p>
          <div className="max-w-[92%] rounded-[8px] px-[8px] py-[6px]" style={{ background: "#f4f4f0" }}>
            Draft ready in Follow-ups, citing the plate and spec section. Nothing is sent until you approve it.
          </div>
        </div>
        <div className="mt-[8px] flex h-[24px] items-center gap-[5px] rounded-[5px] bg-white px-[7px] text-[7.8px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}`, color: GREY }}>
          <MessageSquare className="size-[9px]" aria-hidden="true" /> Ask a question about this project…
        </div>
      </Box>
      <Box title="Sources">
        <div className="space-y-[5px] text-[7.4px]">
          {[
            ["Std. Plate 700-02", "City standards · p21"],
            ["Spec 32 11 23", "Aggregate base · §2.4"],
            ["Submittal 32-11-23", "Contractor · p3"],
            ["C-201", "60% plans · Typical sections"],
          ].map(([t, s]) => (
            <div key={t} className="rounded-[4px] p-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <p className="font-semibold">{t}</p>
              <p style={{ color: GREY }}>{s}</p>
            </div>
          ))}
        </div>
      </Box>
    </div>
  </Portal>
);

/* 04 · Field Operations phones -------------------------------------- */

const FieldOps: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[30px]" style={{ ...SANS, color: INK, background: "linear-gradient(160deg, #f6f6f3, #e4e4de)" }}>
    <Phone w={170} h={350} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[4px]">
        <p className="text-[11px] font-semibold" style={SERIF}>New observation</p>
        <p className="text-[7px]" style={{ color: GREY }}>North Basin Sewer Lining · MH-14 to MH-15</p>
        <div className="mt-[6px] h-[92px] overflow-hidden rounded-[8px]" style={{ background: "linear-gradient(160deg,#8b8b84,#5b5a55 55%,#3d3c38)" }}>
          <svg viewBox="0 0 150 92" className="block h-full w-full" aria-hidden="true">
            <path d="M0 60 L150 52 L150 92 L0 92 Z" fill="#6b5a45" />
            <ellipse cx="80" cy="62" rx="26" ry="9" fill="#2d2b28" />
            <rect x="96" y="20" width="10" height="40" fill="#f59e0b" />
          </svg>
        </div>
        <div className="mt-[6px] flex items-center gap-[6px] rounded-[8px] p-[6px]" style={{ background: "#f4f4f0" }}>
          <span className="flex size-[18px] items-center justify-center rounded-full text-white" style={{ background: RED }}>
            <Mic className="size-[9px]" aria-hidden="true" />
          </span>
          <span className="flex h-[14px] flex-1 items-center gap-[1.5px]">
            {[4, 9, 6, 12, 8, 14, 7, 10, 5, 11, 6, 9, 4, 8, 12, 6].map((h, i) => (
              <span key={i} className="w-[2px] rounded-full" style={{ height: h, background: INK }} />
            ))}
          </span>
          <span className="text-[7px]" style={{ color: GREY }}>0:18</span>
        </div>
        <p className="mt-[5px] text-[7.4px] leading-[1.4]">“Liner reinstated at service 3, minor wrinkle at 12 o’clock, within tolerance.”</p>
        <p className="mt-[5px] flex items-center gap-[3px] text-[7px]" style={{ color: GREY }}>
          <MapPin className="size-[8px]" aria-hidden="true" /> MH-14 · GPS fixed ±3 m · 10:42
        </p>
        <span className="mt-auto mb-[14px] flex h-[24px] items-center justify-center gap-[4px] rounded-[6px] text-[8px] font-semibold text-white" style={{ background: INK }}>
          <Camera className="size-[9px]" aria-hidden="true" /> Save to project
        </span>
      </div>
    </Phone>
    <Phone w={170} h={350} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[4px]">
        <p className="text-[11px] font-semibold" style={SERIF}>Daily report · 23 Nov</p>
        <p className="text-[7px]" style={{ color: GREY }}>Drafted from 14 photos and 6 voice notes</p>
        <div className="mt-[6px] space-y-[5px] text-[7.4px] leading-[1.4]">
          {[
            ["Work", "Lined 186 ft, MH-14 to MH-15; 3 services reinstated."],
            ["Crew", "Contractor 5, inspector 1. Weather 48°F, dry."],
            ["Quantities", "CIPP 8″ · 186 LF · bid item 33-01."],
            ["Issues", "Minor liner wrinkle at service 3, within spec tolerance."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[6px] p-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <p className="text-[6.6px] font-semibold uppercase tracking-[0.06em]" style={{ color: GREY }}>{k}</p>
              <p>{v}</p>
            </div>
          ))}
        </div>
        <span className="mt-auto mb-[14px] flex h-[24px] items-center justify-center rounded-[6px] text-[8px] font-semibold" style={{ boxShadow: `inset 0 0 0 1px ${INK}` }}>
          Review and sign
        </span>
      </div>
    </Phone>
  </div>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[20px]" style={{ ...SANS, color: INK, background: "linear-gradient(140deg, #ffffff, #eceae4)" }}>
    <Laptop w={410} h={260}>
      <div className="flex h-full flex-col bg-white px-[14px] py-[10px]">
        <div className="flex items-center">
          <Photo {...LOGO} w={70} h={16} />
          <span className="ml-auto flex gap-[8px] text-[6.8px]" style={{ color: GREY }}>
            <span>Platform</span>
            <span>About</span>
            <span>Pricing</span>
            <span className="rounded-[3px] px-[5px] text-white" style={{ background: INK }}>Request a Demo</span>
          </span>
        </div>
        <p className="mt-[16px] text-[24px] leading-[1.05]" style={SERIF}>
          The Operating
          <br />
          Layer for Capital Projects
        </p>
        <div className="mt-[10px] flex-1 rounded-t-[6px] p-[7px]" style={{ background: "#f4f4f0", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
          <p className="text-[7px] font-semibold">Check 4 · Typical sections match the governing standard plates</p>
          <p className="mt-[2px] text-[6.6px]" style={{ color: GREY }}>Sheet C-201 shows 7″ PCC over 4″ of base. Std. Plate 700-02 calls for 6″…</p>
          <span className="mt-[3px] inline-block"><Pill tone="red" size={6}>Suggests fail</Pill></span>
        </div>
      </div>
    </Laptop>
    <Phone w={140} h={288} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[8px] pt-[4px]">
        <Photo {...LOGO} w={66} h={15} />
        <p className="mt-[8px] text-[10px] font-semibold" style={SERIF}>Findings to decide</p>
        {CHECKS.slice(0, 3).map(([n, t, s]) => (
          <div key={n} className="mt-[5px] rounded-[6px] p-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7px] font-medium leading-[1.3]">{t}</p>
            <span className="mt-[2px] inline-block"><Pill tone={tone(s)} size={6}>{s}</Pill></span>
          </div>
        ))}
      </div>
    </Phone>
  </div>
);

export const cityverseScreens: Screen[] = [Portfolio, Themis, AskDocs, FieldOps, LaptopPhone];
