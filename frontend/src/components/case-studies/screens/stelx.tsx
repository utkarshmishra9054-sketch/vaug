import { Poppins } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Building2, Check, ChevronRight, CircleAlert, Factory, FileText, Inbox, Mountain, Navigation, Play, Radio, ShieldHalf, Siren, Timer } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * StelX Dynamics · website, requirement intake, portfolio demo and survey portal, from stelxdynamics.com
 * (read 23 Nov 2026): Poppins, navy #002e5f, yellow #ffc107, cyan #00bfff, near-black #1a1c22. Facts
 * (GPS-denied autonomous drones; stealth AI defence drones; mapping, survey and industrial inspection;
 * projects: GPS-denied drone, long-endurance surveillance drone, autonomous lunar rover; custom builds
 * from a requirement; Varanasi) are from the site. TODO(content): illustrative. Enquiries, the mission
 * replay, the survey site and every figure are invented; the site's counters are not used.
 */

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: poppins.style.fontFamily };
const NAVY = "#002e5f";
const YELLOW = "#ffc107";
const CYAN = "#00bfff";
const DARK = "#1a1c22";
const SOFT = "#f3f6fa";
const LINE = "#e2e8f0";
const MUTE = "#64748b";
const LOGO = { src: "/logos/stelx.webp", img: { w: 303, h: 102 } };
const LOGO_W = { src: "/case-studies/gps-denied-drone-robotics-varanasi/logo-white.webp", img: { w: 303, h: 102 } };

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Check }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] whitespace-nowrap rounded-full px-[10px] text-[7.6px] font-semibold" style={solid ? { background: YELLOW, color: DARK } : { background: "#fff", color: NAVY, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "", dark = false }: { title?: string; right?: ReactNode; children: ReactNode; className?: string; dark?: boolean }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] ${className}`} style={dark ? { background: "#22252d", boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.08)" } : { background: "#fff", boxShadow: `0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[22px] shrink-0 items-center justify-between border-b px-[8px] text-[8px] font-semibold" style={{ borderColor: dark ? "rgb(255 255 255 / 0.08)" : LINE, color: dark ? "#fff" : NAVY }}>
        {title}
        {right && <span className="text-[6.8px] font-normal" style={{ color: dark ? "rgb(255 255 255 / 0.55)" : MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);

/* 01 · Build with us: requirement intake --------------------------------- */

const Intake: Screen = () => (
  <div className="flex h-full w-full items-center justify-center" style={{ ...FONT, background: SOFT }}>
    <Browser w={600} h={372} url="stelxdynamics.com/build-with-us">
      <div className="flex h-full" style={{ ...FONT, color: DARK }}>
        <div className="flex w-[196px] shrink-0 flex-col p-[16px] text-white" style={{ background: NAVY }}>
          <Photo {...LOGO_W} w={66} h={22} />
          <p className="mt-[18px] text-[15px] font-semibold leading-[1.15]">Have a requirement for an autonomous drone or robotic system?</p>
          <p className="mt-[8px] text-[7.4px] leading-[1.5] text-white/70">Tell us your need. We&apos;ll turn it into reality: an engineer reads every requirement and replies with what we can build.</p>
          <div className="mt-auto space-y-[5px] text-[7.4px]">
            {["The mission", "Where it flies", "Payload and endurance", "You"].map((s, i) => (
              <p key={s} className="flex items-center gap-[6px]" style={{ color: i < 2 ? "#fff" : "rgb(255 255 255 / 0.5)" }}>
                <span className="flex size-[14px] items-center justify-center rounded-full text-[6.8px] font-bold" style={i < 2 ? { background: YELLOW, color: DARK } : { boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.35)" }}>
                  {i < 1 ? <Check className="size-[8px]" aria-hidden="true" /> : i + 1}
                </span>
                {s}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-1 p-[16px]">
          <p className="text-[7px] font-semibold uppercase tracking-[0.12em]" style={{ color: CYAN }}>Step 2 of 4 · Where it flies</p>
          <p className="mt-[3px] text-[13px] font-semibold" style={{ color: NAVY }}>What will the environment be like?</p>
          <p className="mt-[10px] text-[7.8px] font-semibold">Is GPS available?</p>
          <div className="mt-[4px] grid grid-cols-3 gap-[5px] text-[7.6px]">
            {["Yes, reliably", "Patchy or jammed", "No GPS at all"].map((o, i) => (
              <span key={o} className="rounded-[6px] py-[6px] text-center font-medium" style={i === 2 ? { background: NAVY, color: "#fff" } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>{o}</span>
            ))}
          </div>
          <p className="mt-[10px] text-[7.8px] font-semibold">Setting</p>
          <div className="mt-[4px] grid grid-cols-4 gap-[5px] text-[7.2px]">
            {[
              [Building2, "Indoors"],
              [Mountain, "Tunnels, mines"],
              [Factory, "Industrial site"],
              [Siren, "Disaster zone"],
            ].map(([I, t], i) => {
              const Icon = I as typeof Check;
              return (
                <span key={t as string} className="flex flex-col items-center gap-[3px] rounded-[6px] py-[7px] font-medium" style={i === 1 ? { background: "#e6f7ff", color: NAVY, boxShadow: `inset 0 0 0 1.5px ${CYAN}` } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                  <Icon className="size-[11px]" aria-hidden="true" />
                  {t as string}
                </span>
              );
            })}
          </div>
          <p className="mt-[10px] text-[7.8px] font-semibold">Human intervention during the mission</p>
          <div className="mt-[4px] flex h-[22px] items-center rounded-[6px] px-[8px] text-[7.6px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            None: it must complete the mission on its own
          </div>
          <div className="mt-[12px] flex items-center gap-[8px]">
            <Btn solid>Next: payload and endurance →</Btn>
            <span className="text-[7px]" style={{ color: MUTE }}>Saved as you go</span>
          </div>
        </div>
      </div>
    </Browser>
  </div>
);

/* 02 · Enquiries board ------------------------------------------------- */

const COLS: { title: string; tone: string; cards: [string, string, string][] }[] = [
  {
    title: "New",
    tone: CYAN,
    cards: [
      ["Industrial", "Boiler-house inspection, no GPS indoors", "2 h ago"],
      ["Disaster response", "Search over collapsed structures", "Today"],
    ],
  },
  {
    title: "With an engineer",
    tone: YELLOW,
    cards: [
      ["Mining", "Tunnel mapping, 40 min endurance", "Yesterday"],
      ["Agriculture", "Field survey, 120 ha a day", "Mon"],
    ],
  },
  {
    title: "Scoped",
    tone: "#22c55e",
    cards: [["Infrastructure", "Bridge underside inspection", "Last week"]],
  },
];

const Enquiries: Screen = () => (
  <Browser w={640} h={400} url="admin.stelxdynamics.com/enquiries">
    <div className="flex h-full" style={{ ...FONT, color: DARK, background: SOFT }}>
      <aside className="flex w-[104px] shrink-0 flex-col bg-white px-[8px] py-[10px]" style={{ borderRight: `1px solid ${LINE}` }}>
        <Photo {...LOGO} w={52} h={17.5} />
        <nav className="mt-[12px] space-y-[1px] text-[7.8px]">
          {[
            [Inbox, "Enquiries"],
            [FileText, "Portfolio"],
            [Play, "Demos"],
            [Radio, "Surveys"],
          ].map(([I, t], i) => {
            const Icon = I as typeof Check;
            return (
              <p key={t as string} className="flex h-[20px] items-center gap-[5px] rounded-[5px] px-[5px] font-medium" style={i === 0 ? { background: "#e6f0fa", color: NAVY } : { color: MUTE }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t as string}
              </p>
            );
          })}
        </nav>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col p-[10px]">
        <div className="flex items-center">
          <div>
            <p className="text-[12px] font-semibold" style={{ color: NAVY }}>Requirements</p>
            <p className="text-[7.2px]" style={{ color: MUTE }}>From the Build with us form · sample enquiries</p>
          </div>
          <div className="ml-auto flex gap-[5px]">
            <Pill tone="blue" size={6.6}>Every requirement read by an engineer</Pill>
          </div>
        </div>
        <div className="mt-[8px] grid min-h-0 flex-1 grid-cols-3 gap-[8px]">
          {COLS.map((c) => (
            <div key={c.title} className="flex min-h-0 flex-col rounded-[8px] p-[6px]" style={{ background: "#e9eef5" }}>
              <p className="flex items-center gap-[5px] px-[2px] text-[7.8px] font-semibold" style={{ color: NAVY }}>
                <span className="size-[6px] rounded-full" style={{ background: c.tone }} />
                {c.title}
                <span className="ml-auto text-[7px] font-normal" style={{ color: MUTE }}>{c.cards.length}</span>
              </p>
              <div className="mt-[5px] space-y-[5px]">
                {c.cards.map(([sector, need, when]) => (
                  <div key={need} className="rounded-[6px] bg-white p-[7px]" style={{ boxShadow: `0 1px 2px rgb(0 46 95 / 0.08)` }}>
                    <p className="text-[6.6px] font-semibold uppercase tracking-[0.08em]" style={{ color: CYAN }}>{sector}</p>
                    <p className="mt-[2px] text-[7.8px] font-medium leading-[1.3]" style={{ color: DARK }}>{need}</p>
                    <p className="mt-[4px] flex items-center gap-[4px] text-[6.6px]" style={{ color: MUTE }}>
                      <Navigation className="size-[7px]" aria-hidden="true" /> GPS: {need.includes("no GPS") || need.includes("Tunnel") ? "none" : "available"}
                      <span className="ml-auto">{when}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </Browser>
);

/* 03 · Portfolio demo: a GPS-denied mission replay ----------------------- */

const PATH = "M40 230 L40 150 Q40 120 70 120 L190 120 Q215 120 215 95 L215 55 Q215 40 230 40 L330 40 Q345 40 345 55 L345 150 Q345 170 365 170 L420 170";

const Replay: Screen = () => (
  <Browser w={640} h={400} url="stelxdynamics.com/portfolio/gps-denied-drone" dark>
    <div className="flex h-full flex-col p-[12px] text-white" style={{ ...FONT, background: DARK }}>
      <div className="flex items-center">
        <div>
          <p className="text-[6.8px] font-semibold uppercase tracking-[0.14em]" style={{ color: YELLOW }}>Project · Autonomous GPS-denied drone</p>
          <p className="text-[13px] font-semibold">A mission flown with no GPS and no pilot</p>
        </div>
        <span className="ml-auto rounded-full px-[8px] py-[2px] text-[6.6px] text-white/60" style={{ boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.2)" }}>Illustrative replay</span>
      </div>
      <div className="mt-[8px] grid min-h-0 flex-1 grid-cols-[1fr_150px] gap-[8px]">
        <div className="relative overflow-hidden rounded-[8px]" style={{ background: "#111318", boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.08)" }}>
          <svg width={448} height={262} viewBox="0 0 448 262" className="block" aria-hidden="true">
            {Array.from({ length: 19 }, (_, i) => <line key={`v${i}`} x1={i * 24} x2={i * 24} y1={0} y2={262} stroke="rgb(255 255 255 / 0.04)" />)}
            {Array.from({ length: 11 }, (_, i) => <line key={`h${i}`} x1={0} x2={448} y1={i * 24} y2={i * 24} stroke="rgb(255 255 255 / 0.04)" />)}
            <path d="M20 250 V100 H170 V20 H370 V150 H440 M60 250 V140 H235 V60 H325 V190 H440" fill="none" stroke="rgb(255 255 255 / 0.28)" strokeWidth={2} />
            <path d={PATH} fill="none" stroke={CYAN} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="1 0" />
            <path d={PATH} fill="none" stroke={CYAN} strokeWidth={10} strokeOpacity={0.12} strokeLinecap="round" />
            {[
              [40, 230, "Start"],
              [215, 95, "Turn"],
              [345, 120, "Inspect"],
              [420, 170, "Exit"],
            ].map(([x, y, t]) => (
              <g key={t as string}>
                <circle cx={x as number} cy={y as number} r={4} fill={YELLOW} />
                <text x={(x as number) + 7} y={(y as number) - 6} fontSize="8" fill="rgb(255 255 255 / 0.75)">{t as string}</text>
              </g>
            ))}
            <g transform="translate(300 40)">
              <circle r={9} fill="rgb(0 191 255 / 0.2)" />
              <path d="M-6 0 H6 M0 -6 V6" stroke="#fff" strokeWidth={1.4} />
            </g>
          </svg>
          <div className="absolute bottom-[6px] left-[6px] right-[6px] flex items-center gap-[6px] rounded-[6px] px-[8px] py-[4px]" style={{ background: "rgb(0 0 0 / 0.55)" }}>
            <Play className="size-[8px]" aria-hidden="true" />
            <span className="h-[3px] flex-1 rounded-full bg-white/15"><span className="block h-full w-[62%] rounded-full" style={{ background: CYAN }} /></span>
            <span className="text-[6.8px] text-white/70">04:12 / 06:45</span>
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-[8px]">
          <Box title="Mission" dark>
            {[
              ["GPS", "None"],
              ["Pilot input", "None"],
              ["Setting", "Indoor, multi-level"],
              ["Outcome", "Returned to exit"],
            ].map(([k, v]) => (
              <p key={k} className="flex h-[17px] items-center justify-between text-[7.2px]">
                <span className="text-white/55">{k}</span>
                <b className="font-medium">{v}</b>
              </p>
            ))}
          </Box>
          <Box title="Also in the portfolio" dark className="flex-1">
            {["AI long-endurance surveillance drone", "Autonomous lunar rover"].map((t) => (
              <p key={t} className="flex h-[22px] items-center gap-[4px] border-b text-[7.2px] last:border-b-0" style={{ borderColor: "rgb(255 255 255 / 0.08)" }}>
                {t}
                <ChevronRight className="ml-auto size-[8px] text-white/50" aria-hidden="true" />
              </p>
            ))}
          </Box>
        </div>
      </div>
    </div>
  </Browser>
);

/* 04 · Survey and inspection portal ------------------------------------- */

const FINDINGS: [string, string, "red" | "amber" | "green"][] = [
  ["F-01", "Corrosion on stack ladder, level 3", "red"],
  ["F-02", "Loose cladding panel, east wall", "amber"],
  ["F-03", "Blocked drain, north yard", "amber"],
  ["F-04", "Roof membrane intact", "green"],
];

const Survey: Screen = () => (
  <Browser w={640} h={400} url="survey.stelxdynamics.com/sample-plant">
    <div className="flex h-full flex-col p-[10px]" style={{ ...FONT, color: DARK, background: SOFT }}>
      <div className="flex items-center">
        <Photo {...LOGO} w={44} h={15} />
        <div className="ml-[10px] leading-tight">
          <p className="text-[12px] font-semibold" style={{ color: NAVY }}>Sample plant · site inspection</p>
          <p className="text-[7.2px]" style={{ color: MUTE }}>Survey flight 2 · mapped area and findings for the client</p>
        </div>
        <div className="ml-auto flex gap-[5px]">
          <Btn Icon={FileText}>Report PDF</Btn>
          <Btn solid>Download map</Btn>
        </div>
      </div>
      <div className="mt-[8px] grid min-h-0 flex-1 grid-cols-[1fr_190px] gap-[8px]">
        <div className="relative overflow-hidden rounded-[8px]" style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
          <svg width={414} height={316} viewBox="0 0 414 316" className="block" aria-hidden="true">
            <rect width={414} height={316} fill="#c9cdb8" />
            <rect x={0} y={0} width={414} height={316} fill="url(#sx-tex)" />
            <defs>
              <pattern id="sx-tex" width={14} height={14} patternUnits="userSpaceOnUse">
                <rect width={14} height={14} fill="#c6cab3" />
                <circle cx={3} cy={4} r={1.2} fill="#b6bba2" />
                <circle cx={10} cy={10} r={1} fill="#d3d6c2" />
              </pattern>
            </defs>
            <path d="M0 250 L414 210" stroke="#9aa08c" strokeWidth={18} />
            <rect x={60} y={60} width={130} height={90} fill="#8d939b" />
            <rect x={70} y={70} width={110} height={70} fill="#a3a9b1" />
            <rect x={230} y={40} width={110} height={150} fill="#7c838c" />
            <circle cx={290} cy={230} r={26} fill="#9ea4ad" stroke="#6d737b" strokeWidth={2} />
            <rect x={90} y={180} width={70} height={40} fill="#b4b9bf" />
            {[
              [176, 76, "F-01", "#ef4444"],
              [338, 120, "F-02", "#f59e0b"],
              [120, 230, "F-03", "#f59e0b"],
              [270, 60, "F-04", "#22c55e"],
            ].map(([x, y, t, c]) => (
              <g key={t as string}>
                <circle cx={x as number} cy={y as number} r={8} fill={c as string} stroke="#fff" strokeWidth={2} />
                <text x={(x as number) + 11} y={(y as number) + 3} fontSize="8" fontWeight="600" fill={NAVY}>{t as string}</text>
              </g>
            ))}
          </svg>
          <span className="absolute bottom-[6px] left-[6px] rounded-[4px] bg-white/90 px-[6px] py-[2px] text-[6.6px]" style={{ color: MUTE }}>Drawn map of a sample site</span>
        </div>
        <div className="flex min-h-0 flex-col gap-[8px]">
          <Box title="Flight">
            {[
              [Timer, "Flight time", "38 min"],
              [Mountain, "Area mapped", "14.6 ha"],
              [ShieldHalf, "GPS", "Lost near stack, held course"],
            ].map(([I, k, v]) => {
              const Icon = I as typeof Check;
              return (
                <p key={k as string} className="flex h-[18px] items-center gap-[5px] text-[7.2px]">
                  <Icon className="size-[8px]" style={{ color: CYAN }} aria-hidden="true" />
                  <span style={{ color: MUTE }}>{k as string}</span>
                  <b className="ml-auto text-right font-medium">{v as string}</b>
                </p>
              );
            })}
          </Box>
          <Box title="Findings" right="4" className="flex-1">
            {FINDINGS.map(([id, t, tone]) => (
              <p key={id} className="flex h-[22px] items-center gap-[5px] border-b text-[7.2px] last:border-b-0" style={{ borderColor: LINE }}>
                <b style={{ color: NAVY }}>{id}</b>
                <span className="min-w-0 flex-1 truncate">{t}</span>
                <Pill tone={tone} size={6}>{tone === "red" ? "Act now" : tone === "amber" ? "Plan" : "OK"}</Pill>
              </p>
            ))}
            <p className="mt-[5px] flex items-start gap-[4px] text-[6.6px] leading-[1.4]" style={{ color: MUTE }}>
              <CircleAlert className="mt-[1px] size-[7px] shrink-0" aria-hidden="true" /> Each finding links to the photos from the flight.
            </p>
          </Box>
        </div>
      </div>
    </div>
  </Browser>
);

/* 05 · Website on a laptop and a phone --------------------------------- */

const Site: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: `linear-gradient(160deg, #dfe8f2, ${SOFT})` }}>
    <Laptop w={404} h={258} bg={DARK}>
      <div className="relative flex h-full flex-col overflow-hidden text-white" style={FONT}>
        <div className="flex h-[22px] items-center px-[12px]" style={{ background: NAVY }}>
          <Photo {...LOGO_W} w={38} h={12.8} />
          <span className="ml-auto flex gap-[9px] text-[6.4px] text-white/80">
            {["Home", "About", "Services", "Portfolio", "Contact", "FAQ"].map((t) => <span key={t}>{t}</span>)}
          </span>
        </div>
        <svg width={170} height={90} viewBox="0 0 170 90" className="absolute right-[18px] top-[64px]" aria-hidden="true">
          <rect x={64} y={36} width={42} height={14} rx={4} fill="#d7dbe2" />
          <path d="M70 43 L20 30 M100 43 L150 30 M70 47 L22 62 M100 47 L148 62" stroke="#c4c9d2" strokeWidth={3} />
          {[
            [20, 30],
            [150, 30],
            [22, 62],
            [148, 62],
          ].map(([x, y]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx={18} ry={3} fill="#e8ebf0" opacity={0.8} />)}
          <path d="M85 50 V70" stroke="#c4c9d2" strokeWidth={2} />
        </svg>
        <div className="mt-[60px] px-[14px]">
          <p className="text-[19px] font-semibold leading-[1.1]">Welcome To StelX<br />Dynamics</p>
          <p className="mt-[5px] text-[7px] font-medium">Autonomous Drones. Intelligent Surveillance. Instant Insights</p>
          <div className="mt-[8px] flex gap-[5px]">
            <span className="rounded-full px-[9px] py-[3px] text-[6.6px] font-semibold" style={{ background: YELLOW, color: DARK }}>Explore</span>
            <span className="rounded-full px-[9px] py-[3px] text-[6.6px] font-semibold" style={{ boxShadow: "inset 0 0 0 1px #fff" }}>Contact Us</span>
          </div>
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296}>
      <div className="flex flex-1 flex-col px-[9px] pt-[4px]" style={{ ...FONT, color: DARK }}>
        <p className="text-center text-[11px] font-semibold" style={{ color: NAVY }}>Our Projects</p>
        {[
          ["Autonomous GPS-Denied Drone", "Completes missions with no GPS and no human intervention."],
          ["AI-Enabled Long-Endurance Surveillance Drone", "Autonomous detection over long durations."],
          ["Autonomous Lunar Rover", "Independent navigation and sample pick-and-drop."],
        ].map(([t, d]) => (
          <div key={t} className="mt-[6px] rounded-[8px] bg-white p-[7px] text-center" style={{ boxShadow: "0 2px 8px rgb(0 46 95 / 0.1)" }}>
            <p className="text-[7.4px] font-semibold" style={{ color: NAVY }}>{t}</p>
            <p className="mt-[2px] text-[6.4px] leading-[1.4]" style={{ color: MUTE }}>{d}</p>
          </div>
        ))}
      </div>
    </Phone>
  </div>
);

export const stelxScreens: Screen[] = [Intake, Enquiries, Replay, Survey, Site];
