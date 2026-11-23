import { JetBrains_Mono, Open_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, BookOpen, Calendar, Check, ClipboardList, FileText, LayoutGrid, Mic, PenLine, Quote, Save, ShieldCheck, Users, Volume2 } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * ND Lens · ADHD assessment platform, from ndlens.com (read 23 Nov 2026): Open Sans and JetBrains Mono,
 * deep indigo #16132b, purple #6f5fa8, mint #7fbf9f, warm grey #f0eeeb. Product facts (a mobile,
 * voice-enabled questionnaire with read-aloud, transcription and save-and-resume; AI matching against
 * DSM-5 and ICD-11 criteria; draft reports with evidence citations; clinician review and sign-off; a
 * clinician dashboard for assessments, progress and drafts; demo booking) are from the site.
 * TODO(content): illustrative. Patients are IDs only; questions, answers, criteria wording (paraphrased,
 * by code) and every figure are invented. The site's time-saving, compliance and waiting-list figures,
 * team and funding details are not used.
 */

const sans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: sans.style.fontFamily };
const MONO: CSSProperties = { fontFamily: mono.style.fontFamily };
const NIGHT = "#16132b";
const PURPLE = "#6f5fa8";
const MINT = "#7fbf9f";
const WARM = "#f0eeeb";
const INK = "#3d3a55";
const LINE = "#e6e3ef";
const MUTE = "#7a7690";
const LOGO = { src: "/logos/ndlens.webp", img: { w: 399, h: 96 } };
const LOGO_D = { src: "/case-studies/adhd-assessment-platform-harlow/logo-dark-bg.webp", img: { w: 399, h: 96 } };

const NAV: [string, typeof LayoutGrid][] = [
  ["Overview", LayoutGrid],
  ["Assessments", ClipboardList],
  ["Patients", Users],
  ["Reports", FileText],
  ["Criteria", BookOpen],
];

function Clinic({ path, active, title, sub, right, children }: { path: string; active: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`app.ndlens.com/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK }}>
        <aside className="flex w-[112px] shrink-0 flex-col px-[8px] py-[10px] text-white" style={{ background: NIGHT }}>
          <Photo {...LOGO_D} w={64} h={15.4} />
          <nav className="mt-[14px] space-y-[1px] text-[8px]">
            {NAV.map(([t, Icon]) => (
              <p key={t} className="flex h-[21px] items-center gap-[6px] rounded-[5px] px-[6px] font-semibold" style={t === active ? { background: PURPLE } : { color: "rgb(255 255 255 / 0.62)" }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t}
              </p>
            ))}
          </nav>
          <p className="mt-auto rounded-[5px] p-[6px] text-[6.6px] leading-[1.4] text-white/65" style={{ background: "rgb(255 255 255 / 0.06)" }}>
            Demo clinic · <span style={{ color: MINT }}>sample patients only</span>
          </p>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col" style={{ background: WARM }}>
          <div className="flex h-[42px] shrink-0 items-center border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-extrabold" style={{ color: NIGHT }}>{title}</p>
              <p className="truncate text-[7.4px]" style={{ color: MUTE }}>{sub}</p>
            </div>
            <div className="ml-auto flex shrink-0 gap-[5px]">{right}</div>
          </div>
          <div className="min-h-0 flex-1 p-[9px]">{children}</div>
        </main>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Check }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] whitespace-nowrap rounded-[6px] px-[9px] text-[7.6px] font-bold" style={solid ? { background: PURPLE, color: "#fff" } : { background: "#fff", color: NIGHT, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] bg-white ${className}`} style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[22px] shrink-0 items-center justify-between border-b px-[8px] text-[8px] font-bold" style={{ borderColor: LINE, color: NIGHT }}>
        {title}
        {right && <span className="text-[6.8px] font-normal" style={{ color: MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);
const AiNote = () => (
  <p className="flex items-center gap-[4px] rounded-[5px] px-[7px] py-[4px] text-[6.8px]" style={{ background: "#eeeaf8", color: PURPLE }}>
    <ShieldCheck className="size-[8px]" aria-hidden="true" /> AI draft for review. The clinician makes the diagnosis.
  </p>
);

/* 01 · Patient questionnaire ------------------------------------------- */

const Questionnaire: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[26px]" style={{ ...FONT, background: `linear-gradient(160deg, #e9e5f3, ${WARM})` }}>
    <Phone w={172} h={352}>
      <div className="flex flex-1 flex-col px-[10px] pt-[2px]" style={{ ...FONT, color: INK }}>
        <Photo {...LOGO} w={58} h={14} />
        <p className="mt-[8px] text-[10px] font-extrabold" style={{ color: NIGHT }}>Self-report questionnaire</p>
        <p className="text-[6.8px]" style={{ color: MUTE }}>Thinking about the last 6 months</p>
        <div className="mt-[6px] flex items-center justify-between text-[6.6px]" style={{ ...MONO, color: MUTE }}>
          <span>Question 18 of 55</span>
          <span>33%</span>
        </div>
        <span className="mt-[2px] block h-[4px] rounded-full" style={{ background: LINE }}><span className="block h-full w-[33%] rounded-full" style={{ background: PURPLE }} /></span>
        <div className="mt-[8px] rounded-[10px] p-[8px]" style={{ background: WARM }}>
          <p className="flex items-start gap-[5px] text-[8.2px] font-semibold leading-[1.35]" style={{ color: NIGHT }}>
            How often do you lose track of what you were doing after being interrupted?
            <Volume2 className="mt-[1px] size-[10px] shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
          </p>
        </div>
        <div className="mt-[6px] space-y-[4px] text-[7.6px]">
          {["Never", "Rarely", "Sometimes", "Often", "Very often"].map((o, i) => (
            <p key={o} className="flex h-[20px] items-center gap-[6px] rounded-[6px] px-[7px]" style={i === 3 ? { background: "#eeeaf8", boxShadow: `inset 0 0 0 1.5px ${PURPLE}`, color: NIGHT, fontWeight: 700 } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <span className="size-[8px] rounded-full" style={i === 3 ? { background: PURPLE } : { boxShadow: `inset 0 0 0 1px ${MUTE}` }} />
              {o}
            </p>
          ))}
        </div>
        <div className="mt-auto mb-[12px] flex items-center justify-between text-[7px]" style={{ color: MUTE }}>
          <span className="flex items-center gap-[3px]"><Save className="size-[8px]" aria-hidden="true" /> Saved · resume any time</span>
          <span className="rounded-[5px] px-[8px] py-[3px] font-bold text-white" style={{ background: PURPLE }}>Next</span>
        </div>
      </div>
    </Phone>
    <Phone w={172} h={352}>
      <div className="flex flex-1 flex-col px-[10px] pt-[2px]" style={{ ...FONT, color: INK }}>
        <p className="text-[7px] font-semibold uppercase tracking-[0.1em]" style={{ color: PURPLE }}>Question 31 · in your own words</p>
        <p className="mt-[4px] text-[8.6px] font-bold leading-[1.35]" style={{ color: NIGHT }}>Tell us about a time when being restless made something harder for you.</p>
        <div className="mt-[10px] flex flex-col items-center">
          <span className="flex size-[52px] items-center justify-center rounded-full" style={{ background: PURPLE, boxShadow: "0 0 0 10px rgb(111 95 168 / 0.15)" }}>
            <Mic className="size-[20px] text-white" aria-hidden="true" />
          </span>
          <p className="mt-[10px] text-[7px]" style={{ ...MONO, color: MUTE }}>Listening · 0:21</p>
        </div>
        <div className="mt-[8px] rounded-[8px] p-[8px] text-[7.4px] leading-[1.45]" style={{ background: WARM }}>
          <p className="text-[6.4px] font-semibold uppercase tracking-[0.08em]" style={{ color: MUTE }}>Transcript, you can edit it</p>
          In team meetings I end up pacing or fidgeting, and I lose the thread of what&apos;s being said…
        </div>
        <div className="mt-auto mb-[12px] flex gap-[5px] text-[7px] font-bold">
          <span className="flex-1 rounded-[6px] py-[5px] text-center" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>Type instead</span>
          <span className="flex-1 rounded-[6px] py-[5px] text-center text-white" style={{ background: PURPLE }}>Use this answer</span>
        </div>
      </div>
    </Phone>
  </div>
);

/* 02 · Clinician dashboard --------------------------------------------- */

const PATIENTS: [string, string, number, string, "blue" | "amber" | "violet" | "green"][] = [
  ["P-1042", "Adult · referral 2 Nov", 100, "Draft ready", "violet"],
  ["P-1038", "Adult · referral 30 Oct", 100, "Signed off", "green"],
  ["P-1051", "Adult · referral 9 Nov", 64, "In progress", "blue"],
  ["P-1047", "Adult · referral 5 Nov", 22, "Reminder sent", "amber"],
  ["P-1055", "Adult · referral 14 Nov", 0, "Invited", "blue"],
];

const Dashboard: Screen = () => (
  <Clinic path="overview" active="Overview" title="Good morning" sub="Your assessments, where each patient is, and drafts waiting for you" right={<Btn solid>New assessment</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[6px]">
        {[
          ["Active assessments", "14"],
          ["Waiting on patient", "6"],
          ["Drafts to review", "3"],
          ["Signed off, November", "11"],
        ].map(([k, v], i) => (
          <div key={k} className="rounded-[8px] px-[8px] py-[6px]" style={i === 2 ? { background: PURPLE, color: "#fff" } : { background: "#fff", boxShadow: `0 0 0 1px ${LINE}` }}>
            <p className="text-[6.8px] font-semibold" style={{ opacity: 0.75 }}>{k}</p>
            <p className="mt-[2px] text-[16px] font-extrabold leading-none">{v}</p>
          </div>
        ))}
      </div>
      <Box title="Patients" right="sample patients · IDs only" className="flex-1">
        <div className="grid h-[16px] grid-cols-[56px_1fr_110px_76px] items-center text-[6.6px] font-bold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
          <span>ID</span>
          <span>Assessment</span>
          <span>Questionnaire</span>
          <span className="text-right">Status</span>
        </div>
        {PATIENTS.map(([id, a, p, s, t]) => (
          <div key={id} className="grid h-[27px] grid-cols-[56px_1fr_110px_76px] items-center border-t text-[7.6px]" style={{ borderColor: LINE }}>
            <b style={{ ...MONO, color: NIGHT }}>{id}</b>
            <span>{a}</span>
            <span className="flex items-center gap-[4px]">
              <span className="h-[4px] flex-1 rounded-full" style={{ background: LINE }}><span className="block h-full rounded-full" style={{ width: `${p}%`, background: p === 100 ? MINT : PURPLE }} /></span>
              <span className="w-[24px] text-right text-[6.8px]" style={MONO}>{p}%</span>
            </span>
            <span className="text-right"><Pill tone={t} size={6.4}>{s}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </Clinic>
);

/* 03 · Draft report: criteria and cited evidence ------------------------- */

const CRITERIA: [string, string, string, "violet" | "grey" | "amber", string[]][] = [
  ["A1(b)", "Keeping attention on tasks", "Likely met", "violet", ["Q12", "Q18", "Q31"]],
  ["A1(d)", "Following through on tasks", "Likely met", "violet", ["Q14", "Q22"]],
  ["A1(h)", "Easily distracted", "Likely met", "violet", ["Q18", "Q40"]],
  ["A2(a)", "Fidgeting or restlessness", "Unclear", "amber", ["Q31"]],
  ["A2(f)", "Talking excessively", "Not indicated", "grey", ["Q44"]],
];

const Draft: Screen = () => (
  <Clinic path="reports/P-1042" active="Reports" title="Draft report · P-1042" sub="Responses matched against DSM-5 and ICD-11 criteria, each with the answers it rests on" right={<Btn solid Icon={PenLine}>Review draft</Btn>}>
    <div className="grid h-full grid-cols-[1fr_176px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[6px]">
        <AiNote />
        <Box title="DSM-5 criteria, by code" right="5 of 18 shown" className="flex-1">
          {CRITERIA.map(([code, label, s, t, cites]) => (
            <div key={code} className="grid h-[25px] grid-cols-[38px_1fr_64px_86px] items-center border-b text-[7.6px] last:border-b-0" style={{ borderColor: LINE }}>
              <b style={{ ...MONO, color: PURPLE }}>{code}</b>
              <span>{label}</span>
              <span><Pill tone={t} size={6.2}>{s}</Pill></span>
              <span className="flex justify-end gap-[3px]">
                {cites.map((c) => (
                  <span key={c} className="rounded-[3px] px-[3px] text-[6.2px]" style={{ ...MONO, background: WARM }}>{c}</span>
                ))}
              </span>
            </div>
          ))}
        </Box>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Evidence · Q31">
          <p className="flex gap-[4px] text-[7.2px] leading-[1.45]">
            <Quote className="mt-[1px] size-[8px] shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
            In team meetings I end up pacing or fidgeting, and I lose the thread of what&apos;s being said.
          </p>
          <p className="mt-[4px] text-[6.6px]" style={{ color: MUTE }}>Voice answer, transcribed · cited by A1(b), A2(a)</p>
        </Box>
        <Box title="ICD-11" className="flex-1">
          <p className="text-[7.2px] leading-[1.45]">Pattern suggests the predominantly inattentive presentation. <span style={{ color: MUTE }}>Childhood history and the clinical interview still to add.</span></p>
        </Box>
      </div>
    </div>
  </Clinic>
);

/* 04 · Review and sign-off -------------------------------------------- */

const SignOff: Screen = () => (
  <Clinic path="reports/P-1042/review" active="Reports" title="Review and sign off · P-1042" sub="Edit the draft, add the interview, then sign" right={<><Btn Icon={FileText}>Preview PDF</Btn><Btn solid Icon={Check}>Sign off</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_176px] gap-[8px]">
      <Box title="Report" right="edited 3 times">
        <div className="space-y-[6px] text-[7.4px] leading-[1.5]">
          <p className="text-[8.4px] font-extrabold" style={{ color: NIGHT }}>Summary of findings</p>
          <p>
            The patient&apos;s responses describe persistent difficulty keeping attention on tasks and following them through, across work and home, over the last six months.
            <span className="rounded-[2px] px-[2px]" style={{ background: "#e3f3ea", color: "#2f6b4f" }}> Collateral history from a family member supports onset before age 12.</span>
          </p>
          <p>
            Restlessness is reported in meetings
            <span className="rounded-[2px] px-[2px] line-through" style={{ background: "#fde7e7", color: "#9b2c2c" }}> and meets criterion A2(a)</span>
            <span className="rounded-[2px] px-[2px]" style={{ background: "#e3f3ea", color: "#2f6b4f" }}> but does not on its own meet A2(a); explored further at interview</span>.
          </p>
          <p className="text-[8.4px] font-extrabold" style={{ color: NIGHT }}>Clinical interview</p>
          <p style={{ color: MUTE }}>Added by the clinician, 21 Nov.</p>
        </div>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Before signing">
          {["All criteria reviewed", "Evidence checked", "Interview notes added", "Outcome and plan written"].map((c, i) => (
            <p key={c} className="flex h-[19px] items-center gap-[5px] text-[7.2px]">
              <span className="flex size-[11px] items-center justify-center rounded-[3px]" style={i < 3 ? { background: MINT } : { boxShadow: `inset 0 0 0 1px ${MUTE}` }}>
                {i < 3 && <Check className="size-[7px] text-white" aria-hidden="true" />}
              </span>
              {c}
            </p>
          ))}
        </Box>
        <Box title="Signed by" className="flex-1">
          <p className="text-[7.4px]">Consultant psychiatrist <span style={{ color: MUTE }}>(demo)</span></p>
          <p className="mt-[3px] text-[6.8px] leading-[1.4]" style={{ color: MUTE }}>Every edit to the AI draft is kept with the report.</p>
        </Box>
      </div>
    </div>
  </Clinic>
);

/* 05 · Website and demo booking ---------------------------------------- */

const Site: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: `linear-gradient(160deg, #e9e5f3, ${WARM})` }}>
    <Laptop w={404} h={258} bg={NIGHT}>
      <div className="flex h-full flex-col px-[16px] py-[10px] text-white" style={FONT}>
        <div className="flex items-center">
          <Photo {...LOGO_D} w={58} h={14} />
          <span className="ml-auto flex items-center gap-[9px] text-[6.4px] text-white/70">
            <span>Platform</span>
            <span>Team</span>
            <span className="rounded-[4px] px-[7px] py-[2px] font-bold text-white" style={{ background: PURPLE }}>Contact Us</span>
          </span>
        </div>
        <span className="mt-[24px] w-fit rounded-[3px] px-[6px] py-[2px] text-[5.8px] tracking-[0.12em]" style={{ ...MONO, background: "rgb(255 255 255 / 0.08)", color: "rgb(255 255 255 / 0.7)" }}>AI-POWERED ADHD ASSESSMENT</span>
        <p className="mt-[6px] text-[24px] font-extrabold leading-[1.02] tracking-[-0.02em]">
          Clearer diagnoses.
          <br />
          <span style={{ color: MINT }}>Faster</span> than ever.
        </p>
        <span className="mt-[12px] flex w-fit items-center gap-[4px] rounded-[5px] px-[10px] py-[5px] text-[7px] font-bold" style={{ background: PURPLE }}>
          Book a demo <ArrowRight className="size-[7px]" aria-hidden="true" />
        </span>
      </div>
    </Laptop>
    <Phone w={146} h={296}>
      <div className="flex flex-1 flex-col px-[9px] pt-[4px]" style={{ ...FONT, color: INK }}>
        <p className="text-[10px] font-extrabold" style={{ color: NIGHT }}>Book a demo</p>
        <p className="text-[6.6px]" style={{ color: MUTE }}>For NHS services and private clinics</p>
        {["Name", "Work email", "Service or clinic", "Role"].map((f) => (
          <span key={f} className="mt-[5px] flex h-[19px] items-center rounded-[5px] px-[6px] text-[6.8px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}`, color: MUTE }}>{f}</span>
        ))}
        <p className="mt-[7px] flex items-center gap-[3px] text-[6.8px] font-bold" style={{ color: NIGHT }}><Calendar className="size-[8px]" aria-hidden="true" /> Pick a time</p>
        <div className="mt-[4px] grid grid-cols-3 gap-[3px] text-[6.4px]">
          {["Tue 10:00", "Tue 14:30", "Wed 11:00", "Thu 09:30", "Thu 15:00", "Fri 10:30"].map((t, i) => (
            <span key={t} className="rounded-[4px] py-[3px] text-center" style={i === 2 ? { background: PURPLE, color: "#fff" } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>{t}</span>
          ))}
        </div>
        <span className="mt-[8px] rounded-[6px] py-[5px] text-center text-[7px] font-bold text-white" style={{ background: PURPLE }}>Confirm demo</span>
      </div>
    </Phone>
  </div>
);

export const ndlensScreens: Screen[] = [Questionnaire, Dashboard, Draft, SignOff, Site];
