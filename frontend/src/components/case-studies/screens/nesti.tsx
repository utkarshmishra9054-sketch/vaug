import { Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Building2, Check, ClipboardCheck, FileSignature, History, Home, KeyRound, LayoutGrid, Lock, ShieldCheck, Smartphone, UserCheck, Users, Wallet } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { BarChart, Browser, Phone, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * nesti · rent payments that build a RentScore, from nesti.africa (read 23 Nov 2026): Euclid Circular on
 * the site (Plus Jakarta Sans here), near-black #1a1a1a, green #00da00 / #21c948, off-white #f8f8f5.
 * Product facts (pay rent through the app by M-Pesa, sent straight to the landlord or agent; the fee is
 * shown before paying; a RentScore built from on-time payments, useful after 6 months; rent financing;
 * shared with consent; property managers screen applicants, standardise onboarding and keep audit-ready
 * records) are from the site. TODO(content): illustrative. Tenants (IDs), properties, amounts, fees and
 * scores are invented; the site's calculator figures, statistics, partners and fees are not used.
 */

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: jakarta.style.fontFamily };
const INK = "#1a1a1a";
const GREEN = "#00c800";
const GREEN_D = "#169a32";
const PAPER = "#f8f8f5";
const LINE = "#e7e7e2";
const MUTE = "#73736d";
const LOGO = { src: "/logos/nesti.webp", img: { w: 273, h: 104 } };
const LOGO_W = { src: "/case-studies/rent-credit-score-kenya/logo-white.webp", img: { w: 273, h: 104 } };

function Gauge({ size = 120 }: { size?: number }) {
  const seg = ["#e5484d", "#f97316", "#f5c400", "#7ccf3a", GREEN_D];
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 120 74" aria-hidden="true">
      {seg.map((c, i) => {
        const a0 = Math.PI * (1 - i / 5) - 0.03;
        const a1 = Math.PI * (1 - (i + 1) / 5) + 0.03;
        const r = 50;
        const p = (a: number) => `${(60 + r * Math.cos(a)).toFixed(1)} ${(64 - r * Math.sin(a)).toFixed(1)}`;
        return <path key={c} d={`M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`} fill="none" stroke={c} strokeWidth={11} />;
      })}
      <path d="M60 64 L98 34" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={60} cy={64} r={22} fill={GREEN_D} />
      <text x={60} y={62} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">Very</text>
      <text x={60} y={71} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">good</text>
    </svg>
  );
}

const NAV: [string, typeof Home][] = [
  ["Portfolio", LayoutGrid],
  ["Applicants", Users],
  ["Onboarding", ClipboardCheck],
  ["Tenants", UserCheck],
  ["Collections", Wallet],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`managers.nesti.africa/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK }}>
        <aside className="flex w-[112px] shrink-0 flex-col px-[8px] py-[10px] text-white" style={{ background: INK }}>
          <Photo {...LOGO_W} w={42} h={16} />
          <p className="mt-[6px] text-[6.6px] text-white/50">For property managers</p>
          <nav className="mt-[10px] space-y-[1px] text-[8px]">
            {NAV.map(([t, Icon]) => (
              <p key={t} className="flex h-[21px] items-center gap-[6px] rounded-[6px] px-[6px] font-semibold" style={t === active ? { background: GREEN, color: INK } : { color: "rgb(255 255 255 / 0.66)" }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t}
              </p>
            ))}
          </nav>
          <p className="mt-auto rounded-[6px] p-[6px] text-[6.6px] leading-[1.4] text-white/65" style={{ background: "rgb(255 255 255 / 0.06)" }}>
            Demo Property Managers · 4 properties, 212 units
          </p>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col" style={{ background: PAPER }}>
          <div className="flex h-[42px] shrink-0 items-center border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-extrabold">{title}</p>
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

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Home }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] whitespace-nowrap rounded-full px-[10px] text-[7.6px] font-bold" style={solid ? { background: GREEN, color: INK } : { background: "#fff", color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[10px] bg-white ${className}`} style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[23px] shrink-0 items-center justify-between border-b px-[9px] text-[8.2px] font-bold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[6.8px] font-medium" style={{ color: MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);

/* 01 · Tenant app: pay rent, build a RentScore ---------------------------- */

const TenantApp: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[26px]" style={{ ...FONT, background: "linear-gradient(160deg, #dff7df, #f8f8f5)" }}>
    <Phone w={172} h={352}>
      <div className="flex flex-1 flex-col px-[10px] pt-[2px]" style={{ ...FONT, color: INK }}>
        <Photo {...LOGO} w={38} h={14.5} />
        <p className="mt-[8px] text-[11px] font-extrabold">Pay rent</p>
        <p className="text-[7px]" style={{ color: MUTE }}>December · due Tue 1 Dec</p>
        <div className="mt-[8px] rounded-[12px] p-[9px]" style={{ background: PAPER }}>
          <p className="text-[6.8px] font-semibold" style={{ color: MUTE }}>To your landlord&apos;s agent</p>
          <p className="text-[8.4px] font-bold">Demo Court · Unit B4</p>
          <div className="mt-[7px] space-y-[3px] text-[7.4px]">
            <p className="flex justify-between"><span style={{ color: MUTE }}>Rent</span><b>KES 32,000</b></p>
            <p className="flex justify-between"><span style={{ color: MUTE }}>nesti service fee</span><b>KES 160</b></p>
            <p className="flex justify-between border-t pt-[3px] text-[8.6px]" style={{ borderColor: LINE }}><span className="font-bold">You pay</span><b>KES 32,160</b></p>
          </div>
        </div>
        <p className="mt-[8px] flex items-center gap-[5px] rounded-[8px] px-[8px] py-[6px] text-[7.4px] font-semibold" style={{ boxShadow: `inset 0 0 0 1.5px ${GREEN}` }}>
          <Smartphone className="size-[10px]" style={{ color: GREEN_D }} aria-hidden="true" /> M-Pesa · 07•• ••• 418
          <Check className="ml-auto size-[9px]" style={{ color: GREEN_D }} aria-hidden="true" />
        </p>
        <p className="mt-[6px] text-[6.8px] leading-[1.4]" style={{ color: MUTE }}>The rent goes straight to the agent. nesti records it for your RentScore.</p>
        <span className="mt-auto mb-[12px] flex h-[26px] items-center justify-center rounded-full text-[8.6px] font-extrabold" style={{ background: GREEN }}>Pay KES 32,160</span>
      </div>
    </Phone>
    <Phone w={172} h={352}>
      <div className="flex flex-1 flex-col px-[10px] pt-[2px]" style={{ ...FONT, color: INK }}>
        <p className="text-[11px] font-extrabold">Your RentScore</p>
        <p className="text-[7px]" style={{ color: MUTE }}>From 9 months of rent paid through nesti</p>
        <div className="mt-[6px] flex justify-center">
          <Gauge size={136} />
        </div>
        <div className="mt-[6px] grid grid-cols-9 gap-[2px]">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-[14px] rounded-[3px]" style={{ background: i === 3 ? "#f5c400" : GREEN }} title="" />
          ))}
        </div>
        <p className="mt-[3px] text-[6.6px]" style={{ color: MUTE }}>8 on time · 1 paid two days late</p>
        <div className="mt-[8px] space-y-[5px]">
          {[
            [Wallet, "Rent financing", "Unlocked"],
            [KeyRound, "Better rental terms", "Share with a landlord"],
            [Home, "Home-loan readiness", "15 months to go"],
          ].map(([I, t, s]) => {
            const Icon = I as typeof Home;
            return (
              <p key={t as string} className="flex items-center gap-[6px] rounded-[8px] px-[7px] py-[5px] text-[7.4px]" style={{ background: PAPER }}>
                <Icon className="size-[10px]" style={{ color: GREEN_D }} aria-hidden="true" />
                <b>{t as string}</b>
                <span className="ml-auto text-[6.6px]" style={{ color: MUTE }}>{s as string}</span>
              </p>
            );
          })}
        </div>
      </div>
    </Phone>
  </div>
);

/* 02 · Screening an applicant ------------------------------------------- */

const Screening: Screen = () => (
  <Portal path="applicants/A-2041" active="Applicants" title="Applicant A-2041 · Demo Court, Unit C2" sub="RentScore and payment history, shared by the applicant with consent" right={<><Btn>Ask for documents</Btn><Btn solid Icon={Check}>Approve for onboarding</Btn></>}>
    <div className="grid h-full grid-cols-[170px_1fr] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="RentScore">
          <div className="flex justify-center">
            <Gauge size={120} />
          </div>
          <p className="mt-[3px] text-center text-[7px]" style={{ color: MUTE }}>Shared 23 Nov · valid 30 days</p>
        </Box>
        <Box title="Consent" className="flex-1">
          <p className="flex items-start gap-[4px] text-[7px] leading-[1.45]">
            <ShieldCheck className="mt-[1px] size-[8px] shrink-0" style={{ color: GREEN_D }} aria-hidden="true" />
            The applicant chose to share their score and 14 months of history with this manager.
          </p>
        </Box>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Rent paid through nesti, days late" right="short bar = on time">
          <BarChart
            w={306}
            h={120}
            max={3}
            bars={[[0.15], [0.15], [0.15], [2], [0.15], [0.15], [0.15], [0.15], [0.15], [0.15], [0.15], [0.15], [0.15], [0.15]]}
            colors={[GREEN_D]}
            highlight={3}
            labels={["O", "N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N"]}
          />
        </Box>
        <Box title="Summary" className="flex-1">
          {[
            ["Months recorded", "14"],
            ["Paid on or before the due date", "13"],
            ["Longest delay", "2 days, January"],
            ["Rent at last unit", "KES 28,000"],
          ].map(([k, v]) => (
            <p key={k} className="flex h-[18px] items-center justify-between border-b text-[7.6px] last:border-b-0" style={{ borderColor: LINE }}>
              <span style={{ color: MUTE }}>{k}</span>
              <b>{v}</b>
            </p>
          ))}
        </Box>
      </div>
    </div>
  </Portal>
);

/* 03 · Portfolio collections ------------------------------------------- */

const PROPS: [string, number, number, string][] = [
  ["Demo Court", 64, 97, "KES 41k"],
  ["Sample Heights", 48, 92, "KES 118k"],
  ["Demo Gardens", 56, 95, "KES 72k"],
  ["Sample Place", 44, 88, "KES 164k"],
];

const Portfolio: Screen = () => (
  <Portal path="portfolio" active="Portfolio" title="Portfolio · November" sub="Rent collected through nesti across every property" right={<Btn>Export for landlords</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[6px]">
        {[
          ["Collected", "94%", "of rent due"],
          ["Units", "212", "4 properties"],
          ["Arrears", "KES 395k", "13 tenants"],
          ["Applicants", "9", "waiting to screen"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-[10px] px-[9px] py-[6px]" style={i === 0 ? { background: INK, color: "#fff" } : { background: "#fff", boxShadow: `0 0 0 1px ${LINE}` }}>
            <p className="text-[7px] font-semibold" style={{ opacity: 0.7 }}>{k}</p>
            <p className="mt-[2px] text-[16px] font-extrabold leading-none" style={i === 0 ? { color: GREEN } : undefined}>{v}</p>
            <p className="mt-[3px] text-[6.6px]" style={{ opacity: 0.65 }}>{s}</p>
          </div>
        ))}
      </div>
      <Box title="Properties" right="sample portfolio" className="flex-1">
        <div className="grid h-[16px] grid-cols-[1fr_44px_1fr_70px] items-center text-[6.6px] font-bold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
          <span>Property</span>
          <span className="text-right">Units</span>
          <span className="pl-[10px]">Collected</span>
          <span className="text-right">Arrears</span>
        </div>
        {PROPS.map(([n, u, c, a]) => (
          <div key={n} className="grid h-[30px] grid-cols-[1fr_44px_1fr_70px] items-center border-t text-[7.8px]" style={{ borderColor: LINE }}>
            <b className="flex items-center gap-[5px]"><Building2 className="size-[9px]" style={{ color: MUTE }} aria-hidden="true" />{n}</b>
            <span className="text-right tabular-nums">{u}</span>
            <span className="flex items-center gap-[5px] pl-[10px]">
              <span className="h-[5px] flex-1 rounded-full" style={{ background: LINE }}><span className="block h-full rounded-full" style={{ width: `${c}%`, background: c >= 95 ? GREEN_D : "#f5c400" }} /></span>
              <span className="w-[22px] text-right text-[7px] tabular-nums">{c}%</span>
            </span>
            <span className="text-right tabular-nums">{a}</span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 04 · Standard onboarding --------------------------------------------- */

const STEPS: [string, string, boolean][] = [
  ["Application received", "18 Nov", true],
  ["RentScore shared with consent", "18 Nov", true],
  ["Screening decision: approved", "19 Nov · R. (manager)", true],
  ["Lease signed", "21 Nov · e-signature", true],
  ["Deposit and first rent paid via nesti", "Due 1 Dec", false],
  ["Keys handed over", "—", false],
];

const Onboarding: Screen = () => (
  <Portal path="onboarding/C2" active="Onboarding" title="Onboarding · Demo Court, Unit C2" sub="The same steps at every property, each one recorded for the landlord" right={<Btn Icon={History}>Audit trail</Btn>}>
    <div className="grid h-full grid-cols-[1fr_176px] gap-[8px]">
      <Box title="Steps" right="4 of 6 done">
        {STEPS.map(([s, when, done], i) => (
          <div key={s} className="flex h-[36px] items-center gap-[8px]">
            <span className="flex size-[16px] shrink-0 items-center justify-center rounded-full text-[7px] font-bold" style={done ? { background: GREEN, color: INK } : { boxShadow: `inset 0 0 0 1.5px ${LINE}`, color: MUTE }}>
              {done ? <Check className="size-[9px]" aria-hidden="true" /> : i + 1}
            </span>
            <div className="leading-tight">
              <p className="text-[8px] font-bold" style={done ? undefined : { color: MUTE }}>{s}</p>
              <p className="text-[6.8px]" style={{ color: MUTE }}>{when}</p>
            </div>
          </div>
        ))}
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Why approved">
          <p className="text-[7.2px] leading-[1.45]">RentScore very good; 13 of 14 months on time; rent within the unit&apos;s range.</p>
          <p className="mt-[4px] flex items-center gap-[3px] text-[6.6px]" style={{ color: MUTE }}><FileSignature className="size-[7px]" aria-hidden="true" /> Recorded with the decision</p>
        </Box>
        <Box title="Audit-ready" className="flex-1">
          <p className="flex items-start gap-[4px] text-[7px] leading-[1.45]">
            <Lock className="mt-[1px] size-[8px] shrink-0" style={{ color: GREEN_D }} aria-hidden="true" />
            Every step, who took it and when, ready to show a landlord or defend a placement.
          </p>
        </Box>
      </div>
    </div>
  </Portal>
);

/* 05 · Website and the RentScore journey ------------------------------ */

const Site: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: "linear-gradient(160deg, #dff7df, #f8f8f5)" }}>
    <Laptop w={404} h={258} bg="#fff">
      <div className="flex h-full flex-col px-[16px] py-[10px]" style={{ ...FONT, color: INK }}>
        <div className="flex items-center">
          <Photo {...LOGO} w={34} h={13} />
          <span className="ml-[16px] flex gap-[9px] text-[6px] font-semibold">
            {["Home", "How It Works", "Our Partners", "For Property Managers", "Contacts"].map((t) => <span key={t}>{t}</span>)}
          </span>
          <span className="ml-auto rounded-full px-[9px] py-[3px] text-[6.4px] font-bold" style={{ background: GREEN }}>Get Started</span>
        </div>
        <p className="mt-[26px] text-center text-[22px] font-extrabold tracking-[-0.02em]">Make Your Rent Count. Finally!</p>
        <p className="mt-[4px] text-center text-[7.4px]" style={{ color: MUTE }}>Turn your rent payment into a trusted financial score</p>
        <span className="mx-auto mt-[8px] rounded-full px-[14px] py-[4px] text-[7.4px] font-bold" style={{ background: GREEN }}>Get Started</span>
        <div className="mx-auto mt-[12px] flex gap-[10px]">
          <div className="rounded-[8px] bg-white p-[5px]" style={{ boxShadow: "0 4px 14px rgb(0 0 0 / 0.1)" }}>
            <p className="text-[5.6px] font-bold">RentScore</p>
            <Gauge size={70} />
          </div>
          <div className="w-[110px] rounded-[8px] bg-white p-[6px] text-[5.8px]" style={{ boxShadow: "0 4px 14px rgb(0 0 0 / 0.1)" }}>
            <p className="font-bold">How it works</p>
            {["Pay rent in the app", "Track your history", "Build a RentScore", "Unlock credit"].map((s, i) => (
              <p key={s} className="mt-[2px]"><b style={{ color: GREEN_D }}>{i + 1}</b> {s}</p>
            ))}
          </div>
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296}>
      <div className="flex flex-1 flex-col px-[9px] pt-[4px]" style={{ ...FONT, color: INK }}>
        <p className="text-[10px] font-extrabold">Your path</p>
        <p className="text-[6.6px]" style={{ color: MUTE }}>What a RentScore opens up over time</p>
        {[
          ["Today", "Pay rent by M-Pesa", true],
          ["6 months", "RentScore useful; rent financing", true],
          ["12 months", "Better rental terms", false],
          ["24 months", "Ready to talk to home-loan partners", false],
        ].map(([t, d, done]) => (
          <div key={t as string} className="mt-[7px] flex gap-[6px]">
            <span className="mt-[2px] size-[9px] shrink-0 rounded-full" style={done ? { background: GREEN } : { boxShadow: `inset 0 0 0 1.5px ${LINE}` }} />
            <div className="leading-tight">
              <p className="text-[7.4px] font-bold">{t as string}</p>
              <p className="text-[6.6px]" style={{ color: MUTE }}>{d as string}</p>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  </div>
);

export const nestiScreens: Screen[] = [TenantApp, Screening, Portfolio, Onboarding, Site];
