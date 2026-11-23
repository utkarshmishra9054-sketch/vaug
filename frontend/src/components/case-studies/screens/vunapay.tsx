import { Nunito_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Bluetooth, Boxes, Check, ChevronRight, CloudOff, FileText, LayoutGrid, MapPin, Scale, Search, Send, Users, Wallet } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { BarChart, Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * VunaPay · produce collection, records and farmer payouts for agricultural cooperatives in Kenya, from
 * vunapay.com (read 23 Nov 2026): Avenir on the site (Nunito Sans here), sky #bee5fb, green #559265,
 * mint #b2e1be, slate #40667c, cream #fff7e9. Product facts (collect: produce collection synced from
 * IoT devices; manage: real-time farmer records and inventory; payout: transparent payouts to farmers;
 * partners are Agricultural Cooperative Societies; early-access sign-up) are from the site.
 * TODO(content): illustrative. The produce (coffee cherry), centres, members, weights, amounts, the SMS
 * receipts and the mobile-money payout channel are assumptions; members are numbers only.
 */

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: nunito.style.fontFamily };
const SKY = "#bee5fb";
const GREEN = "#559265";
const MINT = "#b2e1be";
const SLATE = "#40667c";
const INK = "#213d4d";
const CREAM = "#fff7e9";
const LINE = "#e3ebef";
const MUTE = "#6b8291";
const LOGO = { src: "/logos/vunapay.webp", img: { w: 772, h: 133 } };

const NAV: [string, typeof LayoutGrid][] = [
  ["Dashboard", LayoutGrid],
  ["Collections", Scale],
  ["Farmers", Users],
  ["Inventory", Boxes],
  ["Payouts", Wallet],
  ["Centres", MapPin],
  ["Reports", FileText],
];

function Coop({ path, active, title, sub, right, children }: { path: string; active: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`app.vunapay.com/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK }}>
        <aside className="flex w-[118px] shrink-0 flex-col px-[8px] py-[10px] text-white" style={{ background: SLATE }}>
          <span className="rounded-[6px] bg-white px-[6px] py-[4px]">
            <Photo {...LOGO} w={78} h={13} />
          </span>
          <p className="mt-[8px] px-[4px] text-[6.8px] font-semibold uppercase tracking-[0.08em] text-white/55">Demo Farmers&apos; Co-op</p>
          <nav className="mt-[4px] space-y-[1px] text-[8.2px]">
            {NAV.map(([t, Icon]) => (
              <p key={t} className="flex h-[21px] items-center gap-[6px] rounded-[5px] px-[5px] font-semibold" style={t === active ? { background: "rgb(255 255 255 / 0.16)" } : { color: "rgb(255 255 255 / 0.72)" }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t}
              </p>
            ))}
          </nav>
          <p className="mt-auto flex items-center gap-[4px] px-[4px] text-[6.8px] text-white/60">
            <span className="size-[5px] rounded-full" style={{ background: MINT }} /> 6 centres synced
          </p>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col" style={{ background: "#f6fafc" }}>
          <div className="flex h-[40px] shrink-0 items-center border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
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

const Btn = ({ children, solid = false, Icon }: { children: ReactNode; solid?: boolean; Icon?: typeof Check }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] whitespace-nowrap rounded-[6px] px-[9px] text-[7.8px] font-bold" style={solid ? { background: GREEN, color: "#fff" } : { background: "#fff", color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {Icon && <Icon className="size-[8px]" aria-hidden="true" />}
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] bg-white ${className}`} style={{ boxShadow: `0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[22px] shrink-0 items-center justify-between border-b px-[8px] text-[8.2px] font-bold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7px] font-semibold" style={{ color: MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);
const Kpis = ({ items }: { items: [string, string, string][] }) => (
  <div className="grid grid-cols-4 gap-[6px]">
    {items.map(([k, v, s], i) => (
      <div key={k} className="rounded-[8px] px-[8px] py-[6px]" style={i === 0 ? { background: GREEN, color: "#fff" } : { background: "#fff", boxShadow: `0 0 0 1px ${LINE}` }}>
        <p className="text-[7px] font-semibold" style={{ opacity: 0.75 }}>{k}</p>
        <p className="mt-[2px] text-[15px] font-extrabold leading-none">{v}</p>
        <p className="mt-[3px] text-[6.6px]" style={{ opacity: 0.7 }}>{s}</p>
      </div>
    ))}
  </div>
);

/* 01 · Collection day: weighed and synced from the scale --------------- */

const Collect: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[26px]" style={{ ...FONT, background: SKY, color: INK }}>
    <Phone w={176} h={360}>
      <div className="flex flex-1 flex-col px-[10px] pt-[2px]" style={{ ...FONT, color: INK }}>
        <div className="flex items-center justify-between">
          <Photo {...LOGO} w={62} h={11} />
          <span className="flex items-center gap-[3px] rounded-full px-[5px] py-[1.5px] text-[6.4px] font-bold" style={{ background: "#e5f4ea", color: GREEN }}>
            <Bluetooth className="size-[7px]" aria-hidden="true" /> Scale connected
          </span>
        </div>
        <p className="mt-[7px] text-[11px] font-extrabold">Centre 3 · Collection</p>
        <p className="text-[7px]" style={{ color: MUTE }}>Coffee cherry · Thu 12 Nov · Clerk: Desk 1</p>
        <div className="mt-[7px] flex h-[22px] items-center gap-[5px] rounded-[6px] px-[7px] text-[8px] font-bold" style={{ background: CREAM }}>
          <Search className="size-[8px]" style={{ color: MUTE }} aria-hidden="true" /> M-0412
          <span className="ml-auto text-[6.6px] font-semibold" style={{ color: GREEN }}>Member found</span>
        </div>
        <div className="mt-[8px] rounded-[10px] p-[8px] text-center text-white" style={{ background: SLATE }}>
          <p className="text-[6.8px] font-semibold uppercase tracking-[0.08em] text-white/70">Weight from scale</p>
          <p className="text-[30px] font-extrabold leading-[1.05]">23.4<span className="text-[13px]"> kg</span></p>
          <p className="text-[6.8px] text-white/70">Stable reading · not typed</p>
        </div>
        <p className="mt-[8px] text-[7.4px] font-bold">Grade</p>
        <div className="mt-[3px] grid grid-cols-3 gap-[4px] text-[7.6px] font-bold">
          {["A", "B", "Reject"].map((g, i) => (
            <span key={g} className="rounded-[5px] py-[4px] text-center" style={i === 0 ? { background: GREEN, color: "#fff" } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>{g}</span>
          ))}
        </div>
        <span className="mt-[9px] flex h-[26px] items-center justify-center gap-[4px] rounded-[7px] text-[8.4px] font-extrabold text-white" style={{ background: GREEN }}>
          <Check className="size-[9px]" aria-hidden="true" /> Record delivery
        </span>
        <p className="mt-[5px] text-center text-[6.6px]" style={{ color: MUTE }}>The farmer gets an SMS receipt straight away.</p>
      </div>
    </Phone>
    <div className="flex w-[250px] flex-col gap-[10px]">
      <div className="rounded-[14px] bg-white p-[12px]" style={{ boxShadow: "0 10px 30px -12px rgb(33 61 77 / 0.35)" }}>
        <div className="flex items-center gap-[10px]">
          <div className="flex h-[54px] w-[92px] flex-col items-center justify-center rounded-[8px] text-white" style={{ background: INK }}>
            <span className="text-[17px] font-extrabold leading-none" style={{ color: MINT }}>23.4</span>
            <span className="mt-[2px] text-[6.4px] text-white/60">kg · STABLE</span>
          </div>
          <div className="text-[7.6px] leading-[1.4]">
            <p className="flex items-center gap-[4px] font-extrabold"><Scale className="size-[9px]" style={{ color: GREEN }} aria-hidden="true" /> Scale 3-A</p>
            <p style={{ color: MUTE }}>Sends each stable reading to the clerk&apos;s phone over Bluetooth</p>
          </div>
        </div>
      </div>
      <div className="rounded-[14px] bg-white p-[12px] text-[7.8px]" style={{ boxShadow: "0 10px 30px -12px rgb(33 61 77 / 0.35)" }}>
        <p className="text-[9px] font-extrabold">Today at Centre 3</p>
        {[
          ["Deliveries", "148"],
          ["Weighed", "3,912 kg"],
          ["Grade A", "91%"],
        ].map(([k, v]) => (
          <p key={k} className="mt-[4px] flex justify-between border-b pb-[3px]" style={{ borderColor: LINE }}>
            <span style={{ color: MUTE }}>{k}</span>
            <b>{v}</b>
          </p>
        ))}
        <p className="mt-[6px] flex items-start gap-[5px] rounded-[6px] p-[6px] text-[7px] leading-[1.4]" style={{ background: CREAM }}>
          <CloudOff className="mt-[1px] size-[9px] shrink-0" style={{ color: SLATE }} aria-hidden="true" />
          No signal at the centre? Deliveries queue on the phone and sync when it&apos;s back.
        </p>
      </div>
    </div>
  </div>
);

/* 02 · Cooperative dashboard ------------------------------------------- */

const DELIVERIES: [string, string, string, string, string][] = [
  ["09:14", "M-0412", "Centre 3", "23.4", "A"],
  ["09:12", "M-1187", "Centre 1", "41.0", "A"],
  ["09:11", "M-0733", "Centre 3", "17.8", "B"],
  ["09:09", "M-0951", "Centre 5", "36.2", "A"],
  ["09:08", "M-0206", "Centre 2", "28.6", "A"],
];

const Dashboard: Screen = () => (
  <Coop path="dashboard" active="Dashboard" title="Dashboard · Thu 12 Nov" sub="Live from every collection centre, as each delivery is recorded" right={<Btn Icon={FileText}>Season report</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Kpis
        items={[
          ["Collected today", "12,480 kg", "6 centres"],
          ["Deliveries", "486", "since 06:30"],
          ["Active farmers", "1,206", "this season"],
          ["In store", "18.4 t", "awaiting dispatch"],
        ]}
      />
      <div className="grid min-h-0 flex-1 grid-cols-[190px_1fr] gap-[8px]">
        <Box title="Today by centre, kg">
          <BarChart w={172} h={150} max={4000} bars={[[2640], [1980], [3912], [1210], [1730], [1008]]} colors={[GREEN]} labels={["C1", "C2", "C3", "C4", "C5", "C6"]} highlight={2} yFormat={(n) => (n ? `${n / 1000}k` : "0")} />
        </Box>
        <Box title="Latest deliveries" right="synced from scales">
          <div className="grid h-[16px] grid-cols-[34px_48px_1fr_36px_26px_42px] items-center text-[6.6px] font-bold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
            <span>Time</span>
            <span>Member</span>
            <span>Centre</span>
            <span className="text-right">kg</span>
            <span className="text-center">Gr.</span>
            <span />
          </div>
          {DELIVERIES.map((d) => (
            <div key={d[1]} className="grid h-[23px] grid-cols-[34px_48px_1fr_36px_26px_42px] items-center border-t text-[7.6px]" style={{ borderColor: LINE }}>
              <span style={{ color: MUTE }}>{d[0]}</span>
              <b>{d[1]}</b>
              <span>{d[2]}</span>
              <span className="text-right tabular-nums">{d[3]}</span>
              <span className="text-center font-bold">{d[4]}</span>
              <span className="text-right"><Pill tone="green" size={6.2}>Scale</Pill></span>
            </div>
          ))}
        </Box>
      </div>
    </div>
  </Coop>
);

/* 03 · One farmer's record --------------------------------------------- */

const Farmer: Screen = () => (
  <Coop path="farmers/M-0412" active="Farmers" title="Member M-0412 · Centre 3" sub="Member since 2021 · coffee · phone +254 7•• ••• 214" right={<Btn Icon={Send}>Send statement by SMS</Btn>}>
    <div className="grid h-full grid-cols-[1fr_176px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Deliveries this season, kg per week" right="every one from a scale reading">
          <BarChart w={312} h={118} max={120} bars={[[42], [58], [71], [96], [88], [104], [77], [107]]} colors={[GREEN]} labels={["W38", "W39", "W40", "W41", "W42", "W43", "W44", "W45"]} highlight={7} yFormat={(n) => String(Math.round(n))} />
        </Box>
        <Box title="Recent deliveries" className="flex-1">
          {[
            ["12 Nov", "Centre 3", "23.4 kg", "A"],
            ["9 Nov", "Centre 3", "31.0 kg", "A"],
            ["5 Nov", "Centre 3", "19.6 kg", "B"],
          ].map(([d, c, kg, g]) => (
            <p key={d} className="grid h-[19px] grid-cols-[46px_1fr_50px_22px] items-center border-b text-[7.6px] last:border-b-0" style={{ borderColor: LINE }}>
              <span style={{ color: MUTE }}>{d}</span>
              <span>{c}</span>
              <b className="text-right">{kg}</b>
              <span className="text-center font-bold">{g}</span>
            </p>
          ))}
        </Box>
      </div>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="This payout period">
          <div className="space-y-[4px] text-[7.6px]">
            <p className="flex justify-between"><span style={{ color: MUTE }}>Delivered</span><b>184.2 kg</b></p>
            <p className="flex justify-between"><span style={{ color: MUTE }}>Gross</span><b>KES 11,052</b></p>
            <p className="flex justify-between"><span style={{ color: MUTE }}>Input advance</span><b>− KES 1,500</b></p>
            <p className="flex justify-between"><span style={{ color: MUTE }}>Society levy</span><b>− KES 221</b></p>
            <p className="flex justify-between border-t pt-[4px] text-[9px]" style={{ borderColor: LINE }}><span className="font-bold">Net due</span><b style={{ color: GREEN }}>KES 9,331</b></p>
          </div>
        </Box>
        <Box title="Payouts" className="flex-1">
          {[
            ["31 Oct", "KES 8,904"],
            ["15 Oct", "KES 7,612"],
            ["30 Sep", "KES 6,980"],
          ].map(([d, v]) => (
            <p key={d} className="flex h-[19px] items-center justify-between border-b text-[7.6px] last:border-b-0" style={{ borderColor: LINE }}>
              <span style={{ color: MUTE }}>{d}</span>
              <span className="flex items-center gap-[4px]"><b>{v}</b><Pill tone="green" size={6}>Paid</Pill></span>
            </p>
          ))}
        </Box>
      </div>
    </div>
  </Coop>
);

/* 04 · Payout run ----------------------------------------------------- */

const PAYROWS: [string, string, string, string, string][] = [
  ["M-0206", "212.4", "12,744", "1,000", "11,489"],
  ["M-0412", "184.2", "11,052", "1,500", "9,331"],
  ["M-0733", "96.8", "5,808", "0", "5,692"],
  ["M-0951", "240.0", "14,400", "2,000", "12,112"],
  ["M-1187", "301.6", "18,096", "0", "17,734"],
];

const Payout: Screen = () => (
  <Coop path="payouts/2026-11a" active="Payouts" title="Payout · 1–15 November" sub="Built from every recorded delivery, less approved deductions" right={<><Btn>Export for audit</Btn><Btn solid Icon={Send}>Approve and send</Btn></>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Kpis
        items={[
          ["Farmers paid", "1,206", "all centres"],
          ["Produce", "92.7 t", "6,310 deliveries"],
          ["Deductions", "KES 0.41M", "advances and levy"],
          ["Net to farmers", "KES 5.15M", "to mobile money"],
        ]}
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_168px] gap-[8px]">
        <Box title="Farmers" right="showing 5 of 1,206">
          <div className="grid h-[16px] grid-cols-[52px_1fr_1fr_1fr_1fr] items-center text-[6.6px] font-bold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
            <span>Member</span>
            <span className="text-right">kg</span>
            <span className="text-right">Gross</span>
            <span className="text-right">Deduct.</span>
            <span className="text-right">Net, KES</span>
          </div>
          {PAYROWS.map((r) => (
            <div key={r[0]} className="grid h-[23px] grid-cols-[52px_1fr_1fr_1fr_1fr] items-center border-t text-[7.6px] tabular-nums" style={{ borderColor: LINE }}>
              <b>{r[0]}</b>
              <span className="text-right">{r[1]}</span>
              <span className="text-right">{r[2]}</span>
              <span className="text-right" style={{ color: MUTE }}>{r[3]}</span>
              <b className="text-right">{r[4]}</b>
            </div>
          ))}
        </Box>
        <Box title="Checks before sending">
          <div className="space-y-[5px] text-[7.2px] leading-[1.35]">
            {["Every kg traces to a scale reading", "Deductions match signed advances", "Each farmer's statement ready by SMS", "Board approval recorded"].map((c, i) => (
              <p key={c} className="flex items-start gap-[5px]">
                <span className="mt-[1px] flex size-[10px] shrink-0 items-center justify-center rounded-full" style={i < 3 ? { background: GREEN } : { boxShadow: `inset 0 0 0 1px ${LINE}` }}>
                  {i < 3 && <Check className="size-[6px] text-white" aria-hidden="true" />}
                </span>
                {c}
              </p>
            ))}
          </div>
          <p className="mt-[8px] rounded-[6px] p-[6px] text-[6.8px] leading-[1.4]" style={{ background: CREAM }}>Waiting on the chair&apos;s approval, then each farmer is paid and gets a receipt.</p>
        </Box>
      </div>
    </div>
  </Coop>
);

/* 05 · Website and an SMS receipt ------------------------------------- */

const Site: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: `linear-gradient(160deg, ${MINT}, ${SKY})` }}>
    <Laptop w={404} h={258} bg={SKY}>
      <div className="flex h-full flex-col px-[16px] py-[10px]" style={{ ...FONT, color: INK }}>
        <Photo {...LOGO} w={86} h={15} />
        <div className="mt-[22px] flex items-center gap-[10px]">
          <div className="flex-1">
            <p className="text-[23px] font-extrabold leading-[1.02]" style={{ color: GREEN }}>HARVESTING<br />A BETTER<br />FUTURE</p>
            <p className="mt-[6px] text-[7.4px] font-bold" style={{ color: "#5b6670" }}>Empowering smallholders through financial stability</p>
            <div className="mt-[8px] flex gap-[5px]">
              <span className="flex h-[16px] w-[118px] items-center rounded-full px-[7px] text-[6.2px]" style={{ background: CREAM, color: "#8a9aa3" }}>e.g., name@example.com</span>
              <span className="flex h-[16px] items-center rounded-full px-[7px] text-[6.2px] font-bold text-white" style={{ background: GREEN }}>Get Early Access</span>
            </div>
          </div>
          <div className="grid w-[120px] grid-cols-2 gap-[6px]">
            {[
              ["COLLECT", Scale],
              ["MANAGE", Users],
              ["PAYOUT", Wallet],
            ].map(([t, I]) => {
              const Icon = I as typeof Scale;
              return (
                <span key={t as string} className="flex aspect-square flex-col items-center justify-center rounded-full text-[6px] font-extrabold text-white" style={{ background: GREEN }}>
                  <Icon className="mb-[2px] size-[12px]" aria-hidden="true" />
                  {t as string}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296}>
      <div className="flex flex-1 flex-col px-[8px] pt-[2px]" style={{ ...FONT, color: INK }}>
        <p className="flex items-center justify-center gap-[3px] text-[8.6px] font-extrabold">
          VUNAPAY <ChevronRight className="size-[8px]" aria-hidden="true" />
        </p>
        <p className="text-center text-[6.4px]" style={{ color: MUTE }}>Text message</p>
        {[
          ["Thu 12 Nov, 09:14", "VunaPay: Received 23.4 kg coffee cherry, grade A, at Centre 3. Total since 1 Nov: 184.2 kg. Ref D-88214."],
          ["Mon 16 Nov, 10:02", "VunaPay: Payout for 1–15 Nov. Gross KES 11,052, input advance 1,500, levy 221. KES 9,331 sent to your mobile money."],
        ].map(([t, m]) => (
          <div key={t} className="mt-[7px]">
            <p className="text-center text-[5.8px]" style={{ color: MUTE }}>{t}</p>
            <p className="mt-[3px] max-w-[92%] rounded-[10px] rounded-bl-[3px] px-[7px] py-[5px] text-[7px] leading-[1.38]" style={{ background: "#e9edf0" }}>{m}</p>
          </div>
        ))}
      </div>
    </Phone>
  </div>
);

export const vunapayScreens: Screen[] = [Collect, Dashboard, Farmer, Payout, Site];
