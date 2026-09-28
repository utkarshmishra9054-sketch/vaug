import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Bath,
  BedDouble,
  ChevronDown,
  Check as CheckIcon,
  Building,
  CalendarCheck,
  CircleCheck,
  CloudUpload,
  Download,
  FileText,
  Heart,
  ImageOff,
  Inbox,
  LayoutDashboard,
  LoaderCircle,
  Lock,
  Ruler,
  Search,
  Settings,
  Users,
  Wallet,
  Wifi,
} from "lucide-react";

import { Avatar, Bar, BarChart, Browser, Btn, Legend, Panel, Pill, Sidebar, Th, TONES, TopBar, Tr, type Screen, type Tone } from "./kit";
import { Photo } from "./tools";

/* Lovable prototype rescue · Lisbon mid-term rentals (Unlockit) */

const SITE = "unlockit.io";
const LOGO = { src: "/logos/unlockit.webp", img: { w: 480, h: 103 } };
/** Unlockit's own indigo, whatever the study tint. */
const BRAND_INDIGO = "#4f46e5";

/** The real Unlockit logo (lilac U + wordmark). */
function UnlockitLogo({ h = 15 }: { h?: number }) {
  return <Photo {...LOGO} w={(h * LOGO.img.w) / LOGO.img.h} h={h} />;
}

/** Lisbon apartment "photo": window onto terracotta roofs and the Tagus. */
function LisbonArt({ w, h, tint }: { w: number; h: number; tint: string }) {
  const wx = w * 0.46;
  const ww = w * 0.44;
  const wy = h * 0.12;
  const wh = h * 0.58;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block" aria-hidden="true">
      <defs>
        <linearGradient id="rr-wall" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f6efe6" />
          <stop offset="1" stopColor="#e9dccb" />
        </linearGradient>
        <linearGradient id="rr-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#9fc7e0" />
          <stop offset="1" stopColor="#e7eef0" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#rr-wall)" />
      {/* window view */}
      <rect x={wx} y={wy} width={ww} height={wh} fill="url(#rr-sky)" />
      <rect x={wx} y={wy + wh * 0.62} width={ww} height={wh * 0.38} fill="#6f9fb8" />
      <rect x={wx} y={wy + wh * 0.62} width={ww} height="1.2" fill="#fff" opacity="0.7" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={wx + (ww / 6) * i} y={wy + wh * (0.5 + (i % 3) * 0.05)} width={ww / 6 - 1} height={wh * 0.3} fill={["#f2e4cf", "#f7ede0", "#eed8bd"][i % 3]} />
          <path d={`M${wx + (ww / 6) * i - 1} ${wy + wh * (0.5 + (i % 3) * 0.05)} L${wx + (ww / 6) * (i + 0.5)} ${wy + wh * (0.42 + (i % 3) * 0.05)} L${wx + (ww / 6) * (i + 1)} ${wy + wh * (0.5 + (i % 3) * 0.05)} Z`} fill="#c8643b" />
        </g>
      ))}
      <rect x={wx} y={wy} width={ww} height={wh} fill="none" stroke="#fff" strokeWidth="4" />
      <rect x={wx + ww / 2 - 1.5} y={wy} width="3" height={wh} fill="#fff" />
      {/* room */}
      <rect y={h * 0.8} width={w} height={h * 0.2} fill="#c9a27c" />
      <rect x={w * 0.05} y={h * 0.52} width={w * 0.32} height={h * 0.2} rx="4" fill={tint} opacity="0.75" />
      <rect x={w * 0.05} y={h * 0.68} width={w * 0.32} height={h * 0.12} rx="3" fill={tint} opacity="0.9" />
      <rect x={w * 0.09} y={h * 0.44} width={w * 0.08} height={h * 0.12} rx="3" fill="#f4d5a5" />
      <rect x={w * 0.52} y={h * 0.76} width={w * 0.26} height="3" fill="#6b4a33" />
      <rect x={w * 0.54} y={h * 0.76} width="2" height={h * 0.12} fill="#6b4a33" />
      <rect x={w * 0.75} y={h * 0.76} width="2" height={h * 0.12} fill="#6b4a33" />
      <rect x={w * 0.62} y={h * 0.69} width={w * 0.08} height={h * 0.07} rx="1" fill="#2a2a2e" />
      <path d={`M${w * 0.9} ${h * 0.8} L${w * 0.92} ${h * 0.62} L${w * 0.95} ${h * 0.8} Z`} fill="#4d7a4f" />
    </svg>
  );
}

/* 01 · Before / after listing page ---------------------------------- */

const SYS = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

export const BeforeAfter: Screen = ({ tint }) => (
  <div className="flex h-full w-full items-center justify-center gap-[12px] bg-[#e9e9e7] px-[10px]" style={SYS}>
    {/* before: the Lovable prototype, as found in the week 1 audit */}
    <Browser w={304} h={376} url="unlockit-proto.lovable.app/listing?id=42">
      <div className="relative h-full bg-white text-[#222]">
        <div className="flex h-[26px] items-center gap-[10px] bg-[#6366f1] px-[8px] text-[8.5px] text-white">
          <b className="text-[11px]">Unlockit</b>
          <span>Home</span>
          <span>Listings</span>
          <span className="ml-auto rounded-[3px] bg-white px-[5px] py-[1px] text-[7.5px] text-[#6366f1]">Login</span>
        </div>
        <div className="relative mx-[8px] mt-[8px] flex h-[96px] flex-col items-center justify-center gap-[3px] rounded-[4px] bg-[#f1f1f1] text-[#9a9a9a]">
          <ImageOff className="size-[16px]" aria-hidden="true" />
          <span className="text-[7px]">apartment_photo_final(2).jpg</span>
        </div>
        <p className="ml-[8px] mt-[7px] w-[330px] whitespace-nowrap text-[12px] font-bold">T2 Alfama RIVER VIEW!!! (furnished) - ideal for nomads</p>
        <p className="ml-[8px] mt-[3px] text-[10px] font-bold text-[#16a34a]">€NaN / month</p>
        <p className="ml-[8px] mt-[1px] text-[7.5px] text-[#999]">undefined m² · undefined bedrooms</p>
        <div className="ml-[8px] mt-[7px] flex items-center gap-[5px] text-[8px] text-[#777]">
          <LoaderCircle className="size-[9px]" aria-hidden="true" />
          Loading amenities...
        </div>
        <div className="ml-[8px] mt-[6px] space-y-[4px]">
          <span className="block h-[6px] w-[80%] rounded bg-[#eee]" />
          <span className="block h-[6px] w-[64%] rounded bg-[#eee]" />
          <span className="block h-[6px] w-[72%] rounded bg-[#eee]" />
        </div>
        <p className="ml-[8px] mt-[9px] text-[8px] font-semibold">Contact the landlord</p>
        <p className="ml-[8px] mt-[1px] w-[270px] text-[7.5px] leading-[1.4] text-[#666]">To reserve, pay the deposit by bank transfer. The landlord will send the IBAN in the chat.</p>
        <span className="ml-[8px] mt-[7px] inline-block rounded-[4px] bg-[#3b82f6] px-[22px] py-[5px] text-[9px] text-white">Apply</span>
        <span className="ml-[4px] inline-block rounded-[4px] bg-[#e5e7eb] px-[10px] py-[5px] text-[9px] text-[#374151]">Message</span>
        <div className="absolute bottom-[8px] left-[8px] right-[8px] rounded-[4px] border border-[#fecaca] bg-[#fef2f2] px-[7px] py-[5px] text-[7px] leading-[1.4] text-[#b91c1c]">
          <b>Something went wrong.</b> Cannot read properties of undefined (reading &apos;price&apos;)
        </div>
        <span className="absolute bottom-[44px] right-[8px] flex items-center gap-[3px] rounded-[5px] bg-[#111] px-[6px] py-[3px] text-[7px] font-medium text-white">
          <span className="size-[6px] rounded-[2px] bg-[#f5533d]" />
          Edit with Lovable
        </span>
      </div>
    </Browser>

    {/* after: the production listing page at launch */}
    <Browser w={304} h={376} url={`${SITE}/lisboa/alfama-t2-river-view`}>
      <div className="relative h-full bg-white text-[#18181b]">
        <div className="flex h-[28px] items-center gap-[8px] border-b border-black/[0.06] px-[9px]">
          <UnlockitLogo />
          <span className="ml-[4px] flex h-[16px] items-center gap-[4px] rounded-full bg-black/[0.045] px-[7px] text-[7.5px] text-black/55">
            <Search className="size-[7px]" aria-hidden="true" />
            Lisbon · Oct → Mar
          </span>
          <span className="ml-auto text-[7.5px] text-black/55">For landlords</span>
          <Avatar text="LB" i={0} size={15} />
        </div>
        <div className="relative mx-[9px] mt-[8px] overflow-hidden rounded-[6px]">
          <LisbonArt w={286} h={112} tint={tint} />
          <span className="absolute right-[6px] top-[6px] flex size-[16px] items-center justify-center rounded-full bg-white">
            <Heart className="size-[8px]" aria-hidden="true" />
          </span>
          <span className="absolute bottom-[6px] right-[6px] rounded-[4px] bg-black/55 px-[5px] py-[1px] text-[7px] text-white">1 / 14</span>
        </div>
        <div className="px-[10px] pt-[7px]">
          <p className="text-[12px] font-semibold tracking-[-0.01em]">T2 in Alfama with river view</p>
          <p className="mt-[2px] flex items-center gap-[7px] text-[8px] text-black/55">
            <span className="flex items-center gap-[2px]">
              <BedDouble className="size-[8px]" aria-hidden="true" />2 bed
            </span>
            <span className="flex items-center gap-[2px]">
              <Bath className="size-[8px]" aria-hidden="true" />1 bath
            </span>
            <span className="flex items-center gap-[2px]">
              <Ruler className="size-[8px]" aria-hidden="true" />
              68 m²
            </span>
            <span>Alfama, Lisboa</span>
          </p>
          <p className="mt-[5px] flex items-center gap-[3px] text-[7.5px] text-black/60">
            <BadgeCheck className="size-[8px]" style={{ color: tint }} aria-hidden="true" />
            Marta S. · ID-verified landlord · usually replies within 2 hours
          </p>
          <div className="mt-[6px] flex flex-wrap gap-[4px]">
            {["Fibre 1 Gbps", "Desk + monitor", "Washer", "A/C", "Lift"].map((a) => (
              <span key={a} className="flex items-center gap-[3px] rounded-[4px] px-[5px] py-[2px] text-[7px] text-black/65 ring-1 ring-black/10">
                {a === "Fibre 1 Gbps" && <Wifi className="size-[7px]" aria-hidden="true" />}
                {a}
              </span>
            ))}
          </div>
          <div className="mt-[8px] rounded-[8px] p-[8px] ring-1 ring-black/[0.1]">
            <div className="flex items-baseline justify-between">
              <p>
                <span className="text-[14px] font-semibold tracking-[-0.02em]">€1,450</span>
                <span className="text-[8px] text-black/50"> / month</span>
              </p>
              <span className="text-[7.5px] text-black/50">From 1 Oct · 1–6 months</span>
            </div>
            <p className="mt-[3px] text-[7.5px] text-black/55">Deposit €2,900 · bills included up to €80</p>
            <div className="mt-[6px] flex gap-[5px]">
              <span className="flex h-[22px] flex-1 items-center justify-center gap-[4px] rounded-[6px] text-[8.5px] font-semibold text-white" style={{ background: tint }}>
                Apply
              </span>
              <span className="flex h-[22px] items-center rounded-[6px] px-[8px] text-[8.5px] font-medium ring-1 ring-black/15">Book a video tour</span>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  </div>
);

/* 02 · Tenant application with document upload ---------------------- */

const STEPS = ["Profile", "ID check", "Documents", "Deposit & sign"];

const DOCS: { label: string; file: string; size: string; state: "verified" | "uploaded" | "uploading" | "missing"; note: string; pct?: number }[] = [
  { label: "Passport", file: "Lukas_Becker_passport.pdf", size: "1.2 MB", state: "verified", note: "Matched to selfie · Stripe Identity" },
  { label: "Employment contract", file: "Contract_Nordwind_GmbH.pdf", size: "840 KB", state: "uploaded", note: "Employer: Nordwind GmbH, Berlin" },
  { label: "Last 3 payslips", file: "payslips_jul-sep_2026.pdf", size: "2.4 MB", state: "uploading", note: "Uploading · 1.5 MB of 2.4 MB", pct: 64 },
  { label: "Guarantor letter", file: "Optional · speeds up approval", size: "", state: "missing", note: "" },
];

function DocState({ s, tint }: { s: (typeof DOCS)[number]["state"]; tint: string }) {
  if (s === "verified")
    return (
      <Pill tone="green" size={7.5}>
        <BadgeCheck className="size-[8px]" aria-hidden="true" />
        Verified
      </Pill>
    );
  if (s === "uploaded")
    return (
      <Pill tone="blue" size={7.5}>
        Uploaded
      </Pill>
    );
  if (s === "uploading")
    return (
      <Pill tone="amber" size={7.5}>
        64%
      </Pill>
    );
  return (
    <Btn tint={tint} size="sm" outline>
      Add file
    </Btn>
  );
}

export const TenantApplication: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${SITE}/apply/LX-2291/documents`}>
    <div className="flex h-full flex-col bg-[#fafaf9] text-[#18181b]" style={SYS}>
      <div className="flex h-[32px] shrink-0 items-center gap-[10px] border-b border-black/[0.06] bg-white px-[14px]">
        <UnlockitLogo />
        <span className="text-[8.5px] text-black/40">/</span>
        <span className="text-[8.5px] font-semibold">Application · T2 in Alfama with river view</span>
        <span className="ml-auto flex items-center gap-[4px] text-[8px] text-black/50">
          <Lock className="size-[8px]" aria-hidden="true" />
          Saved 12s ago
        </span>
        <Avatar text="LB" i={0} size={18} />
      </div>
      {/* stepper */}
      <div className="flex shrink-0 items-center gap-[6px] px-[14px] pt-[10px]">
        {STEPS.map((s, i) => {
          const done = i < 2;
          const on = i === 2;
          return (
            <div key={s} className="flex flex-1 items-center gap-[6px]">
              <span
                className="flex size-[17px] shrink-0 items-center justify-center rounded-full text-[8px] font-bold"
                style={done ? { background: tint, color: "#fff" } : on ? { boxShadow: `inset 0 0 0 1.5px ${tint}`, color: tint, background: "#fff" } : { background: "rgb(0 0 0 / 0.06)", color: "rgb(0 0 0 / 0.4)" }}
              >
                {done ? <CheckIcon className="size-[9px]" strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              <span className={`whitespace-nowrap text-[8.5px] ${on ? "font-bold" : done ? "font-semibold" : "text-black/45"}`}>{s}</span>
              {i < STEPS.length - 1 && <span className="h-[2px] flex-1 rounded-full" style={{ background: done ? tint : "rgb(0 0 0 / 0.08)" }} />}
            </div>
          );
        })}
      </div>
      <div className="flex min-h-0 flex-1 gap-[10px] p-[12px]">
        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col rounded-[10px] bg-white p-[12px] ring-1 ring-black/[0.07]">
          <p className="text-[13px] font-bold tracking-[-0.01em]">Upload your documents</p>
          <p className="mt-[2px] text-[8px] text-black/50">Shared only with Marta S. for this application. PDF, JPG or PNG, up to 10 MB each.</p>
          <div className="mt-[7px] flex h-[46px] items-center justify-center gap-[10px] rounded-[8px] border-[1.5px] border-dashed" style={{ borderColor: `color-mix(in oklab, ${tint} 45%, white)`, background: `color-mix(in oklab, ${tint} 4%, white)` }}>
            <span className="flex size-[26px] items-center justify-center rounded-full bg-white shadow-sm">
              <CloudUpload className="size-[13px]" style={{ color: tint }} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[9px] font-semibold">
                Drag files here or <span style={{ color: tint }}>browse</span>
              </span>
              <span className="block text-[7.5px] text-black/45">or take a photo on your phone</span>
            </span>
          </div>
          <div className="mt-[8px] flex flex-col">
            {DOCS.map((d) => (
              <div key={d.label} className="flex h-[33px] items-center gap-[8px] border-b border-black/[0.05] last:border-b-0">
                <span className={`flex size-[24px] shrink-0 items-center justify-center rounded-[6px] ${d.state === "missing" ? "border border-dashed border-black/20 text-black/30" : "bg-black/[0.04] text-black/55"}`}>
                  <FileText className="size-[11px]" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="flex items-center gap-[5px] text-[8.5px] font-semibold">
                    {d.label}
                    {d.size && <span className="font-normal text-black/35">{d.size}</span>}
                  </p>
                  <p className="truncate text-[7.5px] text-black/45">{d.file}</p>
                  {d.pct !== undefined ? (
                    <span className="mt-[2px] block w-[160px]">
                      <Bar pct={d.pct} color={tint} h={3} />
                    </span>
                  ) : (
                    d.note && <p className="truncate text-[7px] text-black/40">{d.note}</p>
                  )}
                </div>
                <DocState s={d.state} tint={tint} />
              </div>
            ))}
          </div>
          <div className="mt-[6px] flex items-center gap-[6px] rounded-[6px] px-[8px] py-[5px] text-[8px]" style={{ background: TONES.green.bg, color: TONES.green.fg }}>
            <CircleCheck className="size-[10px]" aria-hidden="true" />
            <span>
              Income check passed: <b>€5,800 / month</b> is above 3× rent (€4,350)
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between pt-[8px]">
            <Btn outline Icon={ArrowLeft}>
              Back
            </Btn>
            <span className="text-[7.5px] text-black/40">Step 3 of 4</span>
            <Btn tint={tint} style={{ height: 24, paddingLeft: 12, paddingRight: 12 }}>
              Continue
            </Btn>
          </div>
        </div>
        {/* summary */}
        <div className="flex w-[196px] shrink-0 flex-col gap-[8px]">
          <div className="overflow-hidden rounded-[10px] bg-white ring-1 ring-black/[0.07]">
            <LisbonArt w={196} h={66} tint={tint} />
            <div className="p-[9px]">
              <p className="text-[9.5px] font-bold">T2 in Alfama with river view</p>
              <p className="text-[7.5px] text-black/50">Marta S. · verified landlord · replies in ~2h</p>
              <div className="mt-[6px] flex items-center gap-[4px] rounded-[6px] bg-black/[0.035] px-[6px] py-[4px] text-[8px]">
                <CalendarCheck className="size-[9px] text-black/50" aria-hidden="true" />
                <span className="font-semibold">1 Oct 2026 → 31 Mar 2027</span>
                <span className="ml-auto text-black/45">6 mo</span>
              </div>
              <div className="mt-[6px] space-y-[3px] text-[8px]">
                {[
                  ["Monthly rent", "€1,450.00"],
                  ["Deposit (2 months)", "€2,900.00"],
                  ["Unlockit service fee", "€145.00"],
                ].map(([k, v]) => (
                  <p key={k} className="flex justify-between">
                    <span className="text-black/55">{k}</span>
                    <span className="tabular-nums">{v}</span>
                  </p>
                ))}
                <p className="flex justify-between border-t border-black/[0.07] pt-[4px] text-[9px] font-bold">
                  <span>Due on approval</span>
                  <span className="tabular-nums">€4,495.00</span>
                </p>
              </div>
            </div>
          </div>
          <p className="px-[4px] text-[7px] leading-[1.45] text-black/45">
            You&apos;ll only be charged if Marta approves your application. Documents are deleted 30 days after the tenancy ends. <u>Privacy</u>
          </p>
        </div>
      </div>
    </div>
  </Browser>
);

/* 03 · Landlord dashboard with payouts ------------------------------ */

const PAYOUTS: { date: string; id: string; period: string; gross: string; fees: string; net: string; status: string; tone: Tone }[] = [
  { date: "3 Oct 2026", id: "po_1QcT8vKx2R", period: "October rent", gross: "€7,420.00", fees: "−€259.70", net: "€7,160.30", status: "Scheduled", tone: "grey" },
  { date: "3 Sep 2026", id: "po_1Q4mZ3Kx2R", period: "September rent", gross: "€7,420.00", fees: "−€259.70", net: "€7,160.30", status: "Paid", tone: "green" },
  { date: "3 Aug 2026", id: "po_1PwY0aKx2R", period: "August rent", gross: "€7,420.00", fees: "−€259.70", net: "€7,160.30", status: "Paid", tone: "green" },
  { date: "22 Jul 2026", id: "po_1PpE7dKx2R", period: "Deposit release", gross: "€2,300.00", fees: "€0.00", net: "€2,300.00", status: "Paid", tone: "green" },
  { date: "3 Jul 2026", id: "po_1PhR2nKx2R", period: "July rent", gross: "€6,270.00", fees: "−€219.45", net: "€6,050.55", status: "Paid", tone: "green" },
  { date: "3 Jun 2026", id: "po_1PZk4sKx2R", period: "June rent", gross: "€5,222.80", fees: "−€182.80", net: "€5,040.00", status: "Paid", tone: "green" },
];
const PCOLS = "62px 76px minmax(0,1fr) 58px 50px 58px 58px";

export const LandlordPayouts: Screen = ({ tint }) => {
  const soft = `color-mix(in oklab, ${tint} 28%, white)`;
  return (
    <Browser w={640} h={400} url={`${SITE}/landlord/payouts`}>
      <div className="flex h-full bg-[#f7f7f6] text-[#18181b]" style={SYS}>
        <div className="relative h-full shrink-0">
          <Sidebar
            tint={tint}
            brand="Unlockit · hosts"
            mark="U"
            active={3}
            items={[
              { label: "Overview", Icon: LayoutDashboard },
              { label: "Listings", Icon: Building, badge: 6 },
              { label: "Applications", Icon: Inbox, badge: 4 },
              { label: "Payouts", Icon: Wallet },
              { label: "Tenants", Icon: Users },
              { label: "Settings", Icon: Settings },
            ]}
            user={{ name: "Marta Silva", role: "Landlord · 6 units", initials: "MS" }}
          />
          <div className="absolute left-0 right-[1px] top-0 flex h-[36px] items-center gap-[6px] bg-[#fbfbfa] px-[12px] pt-[6px]">
            <UnlockitLogo h={13} />
            <span className="text-[9.5px] font-semibold leading-none text-black/50">Hosts</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar title="Payouts" sub="Stripe Connect · Millennium bcp PT50 •••• 4471 · paid on the 3rd">
            <Btn outline Icon={Download}>
              Statements
            </Btn>
          </TopBar>
          <div className="grid shrink-0 grid-cols-4 border-b border-black/[0.07] bg-white">
            {[
              ["Next payout · 3 Oct", "€7,160.30", "Oct rent, 5 units"],
              ["Rent collected · Sep", "€7,420.00", "5 of 5 paid"],
              ["Occupancy", "5 / 6", "Arroios T1 free from 1 Nov"],
              ["Deposits held", "€14,840.00", "by Stripe, per tenancy"],
            ].map(([l, v, sub], i) => (
              <div key={l} className={`min-w-0 px-[12px] py-[6px] ${i ? "border-l border-black/[0.06]" : ""}`}>
                <p className="truncate text-[7.5px] text-black/50">{l}</p>
                <p className="mt-[1px] text-[13px] font-semibold tabular-nums tracking-[-0.02em]">{v}</p>
                <p className="truncate text-[7px] text-black/40">{sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-[8px] px-[10px] pt-[8px]">
            <Panel title="Net payouts · 2026" action={<Legend items={[{ label: "Rent", color: tint }, { label: "Deposit release", color: soft }]} />}>
              <BarChart
                w={236}
                h={62}
                bars={[
                  [3960, 0],
                  [5040, 0],
                  [5040, 0],
                  [6051, 2300],
                  [7160, 0],
                  [7160, 0],
                ]}
                colors={[tint, soft]}
                max={9000}
                labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
                yFormat={(n) => (n ? `€${n / 1000}k` : "0")}
                gap={0.45}
              />
            </Panel>
            <Panel title="Next payout breakdown" action="3 Oct">
              <div className="space-y-[4px] text-[8.5px]">
                {[
                  ["Rent collected (5 units)", "€7,420.00", ""],
                  ["Unlockit fee 3%", "−€222.60", "text-black/55"],
                  ["Stripe processing", "−€37.10", "text-black/55"],
                ].map(([k, v, c]) => (
                  <p key={k} className={`flex justify-between ${c}`}>
                    <span>{k}</span>
                    <span className="tabular-nums">{v}</span>
                  </p>
                ))}
                <p className="flex justify-between border-t border-black/[0.07] pt-[4px] text-[9px] font-semibold">
                  <span>To your bank</span>
                  <span className="tabular-nums">
                    €7,160.30
                  </span>
                </p>
                <p className="flex items-center gap-[4px] text-[7.5px] text-black/45">
                  <Banknote className="size-[9px]" aria-hidden="true" />
                  SEPA · arrives 1–2 business days
                </p>
              </div>
            </Panel>
          </div>
          <Panel className="mx-[10px] my-[8px] flex-1" pad={false}>
            <Th cols={PCOLS}>
              <span>Date</span>
              <span>Payout</span>
              <span>Description</span>
              <span className="text-right">Gross</span>
              <span className="text-right">Fees</span>
              <span className="text-right">Net</span>
              <span className="text-right">Status</span>
            </Th>
            {PAYOUTS.map((p) => (
              <Tr key={p.id} cols={PCOLS} h={21}>
                <span className="text-[8px] text-black/60">{p.date}</span>
                <span className="truncate font-mono text-[7.5px] text-black/55">{p.id}</span>
                <span className="truncate">{p.period}</span>
                <span className="text-right tabular-nums text-black/60">{p.gross}</span>
                <span className="text-right tabular-nums text-black/45">{p.fees}</span>
                <span className="text-right font-semibold tabular-nums">{p.net}</span>
                <span className="flex justify-end">
                  <Pill tone={p.tone} size={7.5} dot>
                    {p.status}
                  </Pill>
                </span>
              </Tr>
            ))}
          </Panel>
        </div>
      </div>
    </Browser>
  );
};

/* 04 · Security audit summary --------------------------------------- */

/* The audit was run as a project in the team's issue tracker (Linear-style). */

type Prio = "urgent" | "high" | "medium" | "low";
const ISSUES: { id: string; title: string; prio: Prio; done: boolean; who: string; i: number; date: string }[] = [
  { id: "UNL-112", title: "RLS disabled on profiles, applications", prio: "urgent", done: true, who: "RM", i: 0, date: "14 Aug" },
  { id: "UNL-113", title: "service_role key shipped in client bundle", prio: "urgent", done: true, who: "RM", i: 0, date: "12 Aug" },
  { id: "UNL-114", title: "Public bucket tenant-docs exposes IDs and payslips", prio: "urgent", done: true, who: "AF", i: 3, date: "15 Aug" },
  { id: "UNL-118", title: "Tenants can update listings.price through the REST API", prio: "urgent", done: true, who: "RM", i: 0, date: "19 Aug" },
  { id: "UNL-121", title: "Stripe webhook signature not verified", prio: "high", done: true, who: "AF", i: 3, date: "28 Aug" },
  { id: "UNL-122", title: "No rate limit on magic-link sign-in", prio: "high", done: true, who: "AF", i: 3, date: "26 Aug" },
  { id: "UNL-124", title: "Landlord can read other landlords' applicants", prio: "high", done: true, who: "RM", i: 0, date: "21 Aug" },
  { id: "UNL-128", title: "Password reset tokens never expire", prio: "high", done: true, who: "JT", i: 5, date: "2 Sep" },
  { id: "UNL-129", title: "/admin routes reachable without role check", prio: "high", done: true, who: "RM", i: 0, date: "27 Aug" },
  { id: "UNL-125", title: "Applicant PII logged to browser console", prio: "high", done: true, who: "AF", i: 3, date: "24 Aug" },
  { id: "UNL-126", title: "Deposit amount trusted from client on checkout", prio: "high", done: true, who: "AF", i: 3, date: "29 Aug" },
];

function PrioIcon({ p }: { p: Prio }) {
  if (p === "urgent")
    return (
      <span className="flex size-[10px] items-center justify-center rounded-[2px] bg-[#f97316] text-[7px] font-bold leading-none text-white" aria-hidden="true">
        !
      </span>
    );
  const n = p === "high" ? 3 : p === "medium" ? 2 : 1;
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <rect key={k} x={1 + k * 3} y={7 - k * 2.5} width="2" height={2 + k * 2.5} rx="0.5" fill={k < n ? "#6b6f76" : "#d4d4d8"} />
      ))}
    </svg>
  );
}

function StatusIcon({ done }: { done: boolean }) {
  return done ? (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <circle cx="5" cy="5" r="5" fill="#5e6ad2" />
      <path d="M3 5.1 4.4 6.4 7 3.7" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <circle cx="5" cy="5" r="4.4" fill="#fff" stroke="#95959f" strokeWidth="1.2" />
      <path d="M3.6 3.6 6.4 6.4 M6.4 3.6 3.6 6.4" stroke="#95959f" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

const GROUPS: { prio: Prio; label: string; found: number; fixed: number; open: boolean }[] = [
  { prio: "urgent", label: "Urgent", found: 4, fixed: 4, open: true },
  { prio: "high", label: "High", found: 8, fixed: 8, open: true },
  { prio: "medium", label: "Medium", found: 11, fixed: 11, open: false },
  { prio: "low", label: "Low", found: 8, fixed: 7, open: false },
];

export const SecurityAudit: Screen = ({ tint }) => (
  <Browser w={640} h={400} url="linear.app/unlockit/project/launch-security-audit-5f1c/issues">
    <div className="flex h-full bg-[#fcfcfd] text-[#1f2023]" style={SYS}>
      <aside className="flex w-[118px] shrink-0 flex-col border-r border-[#ececef] bg-[#f7f7f8] px-[7px] py-[8px] text-[8px] text-[#3c3d42]">
        <div className="flex items-center gap-[5px] px-[3px]">
          <span className="flex size-[14px] items-center justify-center rounded-[3px] text-[7px] font-bold text-white" style={{ background: tint }}>
            U
          </span>
          <span className="font-semibold">Unlockit</span>
        </div>
        <div className="mt-[10px] space-y-[1px]">
          {["Inbox", "My issues", "Views"].map((l) => (
            <p key={l} className="rounded-[4px] px-[4px] py-[3px]">
              {l}
            </p>
          ))}
        </div>
        <p className="mt-[9px] px-[4px] text-[7px] text-[#8a8b91]">Your teams</p>
        <p className="px-[4px] py-[3px] font-medium">Platform</p>
        {["Issues", "Cycles", "Projects"].map((l) => (
          <p key={l} className={`rounded-[4px] py-[3px] pl-[12px] ${l === "Projects" ? "bg-[#ebebee] font-medium" : ""}`}>
            {l}
          </p>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[28px] shrink-0 items-center gap-[5px] border-b border-[#ececef] px-[12px] text-[8px]">
          <span className="text-[#8a8b91]">Projects</span>
          <span className="text-[#c4c4c8]">›</span>
          <span className="font-medium">Launch security audit</span>
          <span className="ml-[8px] flex gap-[2px]">
            {["Overview", "Issues", "Updates"].map((t) => (
              <span key={t} className={`rounded-[4px] px-[6px] py-[2px] ${t === "Issues" ? "bg-[#ebebee] font-medium" : "text-[#6b6f76]"}`}>
                {t}
              </span>
            ))}
          </span>
          <span className="ml-auto text-[7.5px] text-[#8a8b91]">Group: Priority</span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 overflow-hidden">
            {GROUPS.map((g) => (
              <div key={g.prio}>
                <div className="flex h-[21px] items-center gap-[6px] border-b border-[#ececef] bg-[#f4f4f6] px-[12px] text-[8px]">
                  <ChevronDown className={`size-[8px] text-[#8a8b91] ${g.open ? "" : "-rotate-90"}`} aria-hidden="true" />
                  <PrioIcon p={g.prio} />
                  <span className="font-medium">{g.label}</span>
                  <span className="text-[#8a8b91]">{g.found}</span>
                  <span className="ml-auto text-[7px] text-[#8a8b91]">
                    {g.fixed} of {g.found} done
                  </span>
                </div>
                {g.open && ISSUES.filter((it) => it.prio === g.prio).map((it) => (
                  <div key={it.id} className="flex h-[21px] items-center gap-[7px] border-b border-[#f0f0f2] px-[12px] text-[8px]">
                    <PrioIcon p={it.prio} />
                    <span className="w-[40px] shrink-0 text-[7.5px] text-[#8a8b91]">{it.id}</span>
                    <StatusIcon done={it.done} />
                    <span className={`min-w-0 flex-1 truncate ${it.done ? "" : "text-[#6b6f76]"}`}>{it.title}</span>
                    <span className="shrink-0 rounded-full px-[5px] py-[1px] text-[6.5px] text-[#6b6f76] ring-1 ring-[#e4e4e7]">
                      <span className="mr-[3px] inline-block size-[5px] rounded-full bg-[#eb5757]" />
                      security
                    </span>
                    <span className="w-[30px] shrink-0 text-right text-[7px] text-[#8a8b91]">{it.date}</span>
                    <Avatar text={it.who} i={it.i} size={13} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="w-[128px] shrink-0 space-y-[8px] border-l border-[#ececef] px-[10px] py-[9px] text-[7.5px]">
            <div>
              <p className="text-[#8a8b91]">Progress</p>
              <p className="mt-[2px] text-[11px] font-semibold tabular-nums">30 / 31</p>
              <span className="mt-[3px] block h-[3px] overflow-hidden rounded-full bg-[#ececef]">
                <span className="block h-full w-[97%] rounded-full bg-[#5e6ad2]" />
              </span>
              <p className="mt-[2px] text-[#8a8b91]">1 won&apos;t fix (low)</p>
            </div>
            {[
              ["Status", "Completed"],
              ["Lead", "Rui Matos"],
              ["Start", "9 Aug 2026"],
              ["Target", "18 Sep 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-[4px]">
                <span className="text-[#8a8b91]">{k}</span>
                <span className="truncate font-medium">{v}</span>
              </div>
            ))}
            <div className="border-t border-[#ececef] pt-[6px]">
              <p className="text-[#8a8b91]">Description</p>
              <p className="mt-[2px] leading-[1.45] text-[#3c3d42]">Week 1 audit of the Lovable prototype. Re-test on 18 Sep before demo day: 0 critical open, listing page LCP 7.0s → 1.2s.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

const onBrand = (S: Screen): Screen => {
  const Branded: Screen = () => <S tint={BRAND_INDIGO} />;
  return Branded;
};

export const rentalRescueScreens: Screen[] = [BeforeAfter, TenantApplication, LandlordPayouts, SecurityAudit].map(onBrand);
