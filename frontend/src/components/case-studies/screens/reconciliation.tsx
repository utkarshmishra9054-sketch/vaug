import { Bot, Check as CheckIcon, ChevronLeft, ChevronRight, CircleCheck, Download, FileClock, FileSpreadsheet, Inbox, LayoutDashboard, Link2, Loader, MoreHorizontal, Plug, RotateCcw, Settings, UserRound, X } from "lucide-react";

import { Bar, Browser, Btn, Check, LineChart, Panel, Pill, Segments, Select, Sidebar, Tag, Th, TONES, TopBar, Tr, type Screen, type Tone } from "./kit";
import { Photo } from "./tools";

/* Reconciliation agent · Frankfurt payments processor (internal tool) */

const URL = "reconcile.traxpay.internal";
const LOGO = { src: "/logos/traxpay.webp", img: { w: 480, h: 111 } };
const SYS = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };
const NAV = (open = 38) => [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Exceptions", Icon: Inbox, badge: open },
  { label: "Matches", Icon: Link2 },
  { label: "Sources", Icon: Plug },
  { label: "Audit log", Icon: FileClock },
  { label: "Settings", Icon: Settings },
];
const USER = { name: "Katrin Weber", role: "Finance analyst", initials: "KW" };

/** The kit sidebar with the real Traxpay wordmark over its brand row. */
function AppSidebar({ tint, active }: { tint: string; active: number }) {
  return (
    <div className="relative h-full shrink-0">
      <Sidebar tint={tint} brand="Traxpay Reconcile" mark="T" items={NAV()} active={active} user={USER} />
      <div className="absolute left-0 right-[1px] top-0 flex h-[32px] items-end gap-[5px] bg-[#fbfbfa] px-[12px] pb-[2px]">
        <Photo {...LOGO} w={52} h={12} />
        <span className="text-[9.5px] font-semibold leading-none tracking-[-0.01em] text-black/55">Reconcile</span>
      </div>
    </div>
  );
}

const REASON: Record<string, string> = {
  "Split settlement": "#2563eb",
  "Fee at source": "#7c3aed",
  "Duplicate refund": "#e11d48",
  "Timing (T+2)": "#d97706",
  "FX rounding": "#0891b2",
  "No ledger entry": "#52525b",
};

const confTone = (c: number): Tone => (c >= 85 ? "green" : c >= 50 ? "amber" : "red");

function Confidence({ value }: { value: number }) {
  const t = TONES[confTone(value)];
  return (
    <span className="flex items-center gap-[4px]">
      <span className="w-[30px]">
        <Bar pct={value} color={t.solid} h={3} />
      </span>
      <span className="text-[7.5px] font-semibold tabular-nums" style={{ color: t.fg }}>
        {value}%
      </span>
    </span>
  );
}

function Pager({ text, per = 25 }: { text: string; per?: number }) {
  return (
    <div className="flex h-[24px] shrink-0 items-center justify-between border-t border-black/[0.06] px-[10px] text-[7.5px] text-black/45">
      <span>{text}</span>
      <span className="flex items-center gap-[6px]">
        <span>Rows per page: {per}</span>
        <ChevronLeft className="size-[9px] text-black/25" aria-hidden="true" />
        <ChevronRight className="size-[9px]" aria-hidden="true" />
      </span>
    </div>
  );
}

/* 01 · Exception queue --------------------------------------------- */

const QUEUE = [
  { ref: "PSP-88240", src: "Adyen", who: "Nordlicht Mode GmbH", amt: "€12,005.12", reason: "Split settlement", conf: 64, age: "4h", sel: true },
  { ref: "WLT-10923", src: "PayPal", who: "Kaffeerösterei Lang", amt: "−€89.90", reason: "Duplicate refund", conf: 22, age: "4h", sel: true },
  { ref: "STR-55190", src: "Stripe", who: "Velo Werk Berlin", amt: "€640.00", reason: "Fee at source", conf: 71, age: "4h", sel: false },
  { ref: "SEPA-40188", src: "Deutsche Bank", who: "Alpen Outdoor AG", amt: "€3,118.40", reason: "Timing (T+2)", conf: 83, age: "1d", sel: true },
  { ref: "KLN-20471", src: "Klarna", who: "Haus & Hof Online", amt: "€1,249.99", reason: "Fee at source", conf: 58, age: "4h", sel: false },
  { ref: "PSP-88262", src: "Adyen", who: "Studio Feinkost", amt: "€7,402.66", reason: "Split settlement", conf: 76, age: "4h", sel: false },
  { ref: "SEPA-40203", src: "Commerzbank", who: "Brettspiel Kontor", amt: "€412.07", reason: "FX rounding", conf: 91, age: "2d", sel: false },
  { ref: "WLT-10930", src: "PayPal", who: "Grünwerk Naturkosmetik", amt: "€58.35", reason: "No ledger entry", conf: 12, age: "3d", sel: false },
  { ref: "PSP-88277", src: "Adyen", who: "Nordlicht Mode GmbH", amt: "€2,871.30", reason: "Split settlement", conf: 69, age: "4h", sel: false },
  { ref: "STR-55204", src: "Stripe", who: "Lindenholz Möbel", amt: "€19.00", reason: "Fee at source", conf: 88, age: "4h", sel: false },
  { ref: "SPK-7719", src: "Sparkasse", who: "Bäckerei Hollmann", amt: "€1,036.84", reason: "Timing (T+2)", conf: 47, age: "1d", sel: false },
  { ref: "KLN-20488", src: "Klarna", who: "Kinderzimmer Kiel", amt: "−€214.50", reason: "Duplicate refund", conf: 35, age: "4h", sel: false },
];
const QCOLS = "10px 60px minmax(0,1fr) 62px 84px 58px 22px 34px";

export const ExceptionQueue: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/exceptions?status=open&sort=confidence`}>
    <div className="flex h-full bg-[#f6f7f9] text-[#111827]" style={SYS}>
      <AppSidebar tint={tint} active={1} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Exceptions" sub="Close 30 Sep · run 06:00 CET · 38 open" search="Search reference, merchant…">
          <Btn Icon={Download} outline>
            CSV
          </Btn>
        </TopBar>
        <div className="flex items-center gap-[4px] px-[10px] pt-[7px]">
          {[
            ["All", 38],
            ["Split settlement", 12],
            ["Fee at source", 9],
            ["Timing", 7],
            ["Duplicate", 6],
            ["Other", 4],
          ].map(([l, n], i) => (
            <span key={l} className={`flex h-[18px] items-center gap-[3px] whitespace-nowrap rounded-[5px] px-[6px] text-[8px] font-medium ${i === 0 ? "bg-white text-black/85 ring-1 ring-black/15" : "text-black/55"}`}>
              {l}
              <span className="text-black/35">{n}</span>
            </span>
          ))}
          <span className="ml-auto">
            <Select>Sort: confidence</Select>
          </span>
        </div>
        <Panel className="mx-[10px] my-[7px] flex-1" pad={false}>
          <div className="flex h-[24px] items-center gap-[8px] border-b border-black/[0.06] px-[10px] text-[8px]" style={{ background: `color-mix(in oklab, ${tint} 6%, white)` }}>
            <span className="font-semibold">3 selected</span>
            <span className="tabular-nums text-black/50">€15,033.62</span>
            <span className="ml-auto flex items-center gap-[4px]">
              <Btn tint={tint} size="sm" Icon={CircleCheck}>
                Approve
              </Btn>
              <Btn size="sm" outline Icon={RotateCcw}>
                Override
              </Btn>
              <Btn size="sm" outline Icon={UserRound}>
                Reassign
              </Btn>
            </span>
          </div>
          <Th cols={QCOLS}>
            <Check tint={tint} />
            <span>Reference</span>
            <span>Merchant · source</span>
            <span className="text-right">Amount</span>
            <span>Reason</span>
            <span>Confidence</span>
            <span>Age</span>
            <span />
          </Th>
          {QUEUE.slice(0, 10).map((r) => (
            <Tr key={r.ref} cols={QCOLS} h={22.5} highlight={r.sel ? `color-mix(in oklab, ${tint} 4%, white)` : undefined} style={{ fontSize: 8 }}>
              <Check on={r.sel} tint={tint} />
              <span className="truncate font-mono text-[7.5px] font-semibold">{r.ref}</span>
              <span className="min-w-0 truncate">
                <span className="font-medium">{r.who}</span>
                <span className="text-black/40"> · {r.src}</span>
              </span>
              <span className="text-right font-medium tabular-nums">{r.amt}</span>
              <span>
                <Tag color={REASON[r.reason]} size={7}>
                  {r.reason}
                </Tag>
              </span>
              <Confidence value={r.conf} />
              <span className="text-black/45">{r.age}</span>
              <span className="flex justify-end gap-[5px] text-black/40">
                <CheckIcon className="size-[9px]" strokeWidth={2.5} aria-hidden="true" />
                <MoreHorizontal className="size-[9px]" aria-hidden="true" />
              </span>
            </Tr>
          ))}
          <Pager text="1–10 of 38" per={10} />
        </Panel>
      </div>
    </div>
  </Browser>
);

/* 02 · Daily dashboard ---------------------------------------------- */

const SOURCES = [
  { name: "Adyen", kind: "PSP · API", tx: 5198, auto: 91.2, open: 14, file: "05:52" },
  { name: "Stripe", kind: "PSP · API", tx: 3433, auto: 95.1, open: 6, file: "05:49" },
  { name: "PayPal", kind: "Wallet · API", tx: 2214, auto: 88.4, open: 8, file: "05:55" },
  { name: "Klarna", kind: "PSP · SFTP", tx: 1168, auto: 90.3, open: 5, file: "05:31" },
  { name: "Deutsche Bank", kind: "Bank · SFTP", tx: 1043, auto: 96.8, open: 2, file: "05:40" },
  { name: "Commerzbank", kind: "Bank · SFTP", tx: 715, auto: 97.2, open: 2, file: "05:44" },
  { name: "Sparkasse", kind: "Bank · SFTP", tx: 477, auto: 94.1, open: 1, file: "retry 06:15", warn: true },
];
const SCOLS = "minmax(0,1fr) 44px 60px 26px 50px";
const RATE_14D = [90.1, 91.3, 89.7, 92.0, 91.8, 88.9, 90.6, 92.2, 91.5, 93.0, 92.1, 91.7, 92.8, 92.4];

const RUN = [
  ["06:00:02", "Run started · 7 sources, 14,248 transactions"],
  ["06:00:41", "Sparkasse SFTP timed out, retry scheduled 06:15"],
  ["06:01:58", "Rules matched 12,904 · LLM matched 268"],
  ["06:02:31", "Adyen PO-7731: 318 txns less €412.06 fees, 14 to review"],
];

export const ReconDashboard: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/overview`}>
    <div className="flex h-full bg-[#f6f7f9] text-[#111827]" style={SYS}>
      <AppSidebar tint={tint} active={0} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Overview" sub="Tue 30 Sep 2026 · last run 06:15 CET">
          <Segments items={["Today", "7d", "Month"]} active={0} />
        </TopBar>
        <div className="grid grid-cols-4 border-b border-black/[0.07] bg-white">
          {[
            ["Matched", "14,210", "+832 vs Mon"],
            ["Auto-match rate", "92.4%", "13,172 of 14,248"],
            ["Open exceptions", "38", "59 at 06:00"],
            ["Avg. match time", "1.4s", "p95 3.1s"],
          ].map(([l, v, s], i) => (
            <div key={l} className={`px-[12px] py-[7px] ${i ? "border-l border-black/[0.06]" : ""}`}>
              <p className="text-[7.5px] text-black/50">{l}</p>
              <p className="mt-[2px] text-[14px] font-semibold tabular-nums tracking-[-0.02em]">{v}</p>
              <p className="text-[7px] text-black/40">{s}</p>
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-[7px] p-[9px]">
          <Panel title="By source" action="today" pad={false}>
            <Th cols={SCOLS}>
              <span>Source</span>
              <span className="text-right">Txns</span>
              <span>Auto-match</span>
              <span className="text-right">Open</span>
              <span className="text-right">Last file</span>
            </Th>
            {SOURCES.map((s) => (
              <Tr key={s.name} cols={SCOLS} h={25} style={{ fontSize: 8 }}>
                <span className="min-w-0 truncate leading-tight">
                  <span className="block truncate font-medium">{s.name}</span>
                  <span className="block truncate text-[6.5px] text-black/40">{s.kind}</span>
                </span>
                <span className="text-right tabular-nums">{s.tx.toLocaleString("en-GB")}</span>
                <span className="flex items-center gap-[4px]">
                  <span className="w-[26px]">
                    <Bar pct={(s.auto - 80) * 5} color={tint} h={3} />
                  </span>
                  <span className="tabular-nums text-black/70">{s.auto}%</span>
                </span>
                <span className="text-right font-semibold tabular-nums">{s.open}</span>
                <span className={`text-right tabular-nums ${s.warn ? "text-[#b45309]" : "text-black/45"}`}>{s.file}</span>
              </Tr>
            ))}
            <div className="grid h-[22px] items-center gap-[6px] bg-black/[0.02] px-[10px] text-[8px] font-semibold" style={{ gridTemplateColumns: SCOLS }}>
              <span>Total</span>
              <span className="text-right tabular-nums">14,248</span>
              <span className="tabular-nums">92.4%</span>
              <span className="text-right tabular-nums">38</span>
              <span />
            </div>
          </Panel>
          <div className="flex min-h-0 flex-col gap-[7px]">
            <Panel title="Auto-match rate, 14 days" action="target 90%">
              <LineChart
                w={184}
                h={70}
                min={86}
                max={95}
                grid={3}
                yFormat={(n) => `${Math.round(n)}%`}
                series={[
                  { values: RATE_14D, color: tint },
                  { values: Array(14).fill(90), color: "#94a3b8", dashed: true },
                ]}
                labels={["17 Sep", "23 Sep", "30 Sep"]}
              />
            </Panel>
            <Panel title="Agent run · 06:00" action={<span className="text-[#15803d]">completed</span>} pad={false} className="flex-1">
              {RUN.map(([t, m]) => (
                <div key={t} className="flex gap-[6px] border-b border-black/[0.04] px-[10px] py-[3.5px] text-[7.5px] leading-[1.3] last:border-b-0">
                  <span className="shrink-0 font-mono text-[7px] text-black/40">{t}</span>
                  <span className="text-black/70">{m}</span>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 03 · Transaction detail drawer ------------------------------------- */

export const TransactionDrawer: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/exceptions/PSP-88240`}>
    <div className="relative flex h-full bg-[#f6f7f9] text-[#111827]" style={SYS}>
      <AppSidebar tint={tint} active={1} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Exceptions" sub="Close 30 Sep · run 06:00 CET · 38 open" />
        <Panel className="m-[10px] flex-1" pad={false}>
          <Th cols={QCOLS}>
            <span />
            <span>Reference</span>
            <span>Merchant · source</span>
            <span className="text-right">Amount</span>
            <span>Reason</span>
            <span />
            <span />
            <span />
          </Th>
          {QUEUE.map((r, i) => (
            <Tr key={r.ref} cols={QCOLS} h={23} highlight={i === 0 ? `color-mix(in oklab, ${tint} 8%, white)` : undefined} style={{ fontSize: 8 }}>
              <span />
              <span className="font-mono text-[7.5px] font-semibold">{r.ref}</span>
              <span className="truncate">{r.who}</span>
              <span className="text-right tabular-nums">{r.amt}</span>
              <span className="truncate text-black/50">{r.reason}</span>
              <span />
              <span />
              <span />
            </Tr>
          ))}
        </Panel>
      </div>
      <div className="absolute inset-0 bg-black/[0.18]" />
      <div className="absolute inset-y-0 right-0 flex w-[292px] flex-col bg-white shadow-[-8px_0_24px_-12px_rgb(0_0_0/0.35)]">
        <div className="flex items-start gap-[8px] border-b border-black/[0.07] px-[12px] py-[9px]">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[7.5px] text-black/45">PSP-88240 · Adyen payout PO-7731 · value date 29 Sep</p>
            <p className="mt-[2px] text-[15px] font-semibold tabular-nums tracking-[-0.02em]">€12,005.12</p>
            <div className="mt-[3px] flex items-center gap-[4px]">
              <Tag color={REASON["Split settlement"]} size={7}>
                Split settlement
              </Tag>
              <Pill tone="amber" size={7}>
                64% confidence
              </Pill>
              <span className="text-[7px] text-black/40">Nordlicht Mode GmbH</span>
            </div>
          </div>
          <X className="size-[11px] text-black/40" aria-hidden="true" />
        </div>
        <div className="flex gap-[12px] border-b border-black/[0.07] px-[12px] text-[8px]">
          {["Details", "Ledger", "Activity (3)"].map((t, i) => (
            <span key={t} className={`py-[5px] ${i === 0 ? "font-semibold" : "text-black/45"}`} style={i === 0 ? { boxShadow: `inset 0 -1.5px 0 ${tint}` } : undefined}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex-1 space-y-[8px] overflow-hidden px-[12px] py-[8px]">
          <div>
            <p className="flex items-center gap-[4px] text-[7px] font-semibold uppercase tracking-[0.06em] text-black/40">
              <Bot className="size-[9px]" aria-hidden="true" />
              Agent explanation
            </p>
            <p className="mt-[3px] rounded-[5px] bg-black/[0.03] p-[7px] text-[8px] leading-[1.45] text-black/75">
              One payout settles 3 ledger entries for Nordlicht Mode GmbH, less a €37.40 fee taken at source. Totals agree to the cent, but order NM-40932 was part-refunded on 28 Sep, so this needs a human check.
            </p>
          </div>
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-[0.06em] text-black/40">Proposed match (3 → 1)</p>
            <div className="mt-[3px] overflow-hidden rounded-[5px] ring-1 ring-black/[0.08]">
              {[
                ["LED-551208", "Order NM-40911", "€6,210.00"],
                ["LED-551231", "Order NM-40925", "€3,988.52"],
                ["LED-551240", "Order NM-40932 (part refund)", "€1,844.00"],
                ["—", "Adyen fee, inferred", "−€37.40"],
              ].map(([a, b, c], i) => (
                <div key={b} className={`flex h-[17px] items-center gap-[6px] border-b border-black/[0.05] px-[7px] text-[8px] ${i === 3 ? "text-black/50" : ""}`}>
                  <span className="w-[54px] font-mono text-[7px] text-black/45">{a}</span>
                  <span className="flex-1 truncate">{b}</span>
                  <span className="tabular-nums">{c}</span>
                </div>
              ))}
              <div className="flex h-[19px] items-center justify-between bg-black/[0.025] px-[7px] text-[8px] font-semibold">
                <span>Difference</span>
                <span className="tabular-nums">€0.00</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-y-[3px] text-[8px]">
            <span className="text-black/45">Suggested</span>
            <span>Confirm match, post fee to 4970 PSP charges</span>
            <span className="text-black/45">Rule tried</span>
            <span className="font-mono text-[7.5px]">R-12 payout sum − fees (failed: refund)</span>
            <span className="text-black/45">Assignee</span>
            <span>Katrin Weber</span>
          </div>
        </div>
        <div className="flex gap-[5px] border-t border-black/[0.07] px-[12px] py-[8px]">
          <Btn tint={tint} style={{ flex: 1, height: 22 }}>
            Approve match
          </Btn>
          <Btn outline style={{ height: 22 }}>
            Override
          </Btn>
          <Btn outline style={{ height: 22 }}>
            Reassign
          </Btn>
        </div>
      </div>
    </div>
  </Browser>
);

/* 04 · Audit log export --------------------------------------------- */

const LOG = [
  ["09:12:02", "KLN-20471", "Overridden", "amber", "M. Hoffmann", "Fee rate 2.49% not 1.99%"],
  ["09:10:33", "SEPA-40188", "Approved", "blue", "M. Hoffmann", "Settled T+2, bank holiday"],
  ["08:43:07", "WLT-10923", "Written off", "red", "K. Weber", "Duplicate of WLT-10871"],
  ["08:41:52", "PSP-88240", "Approved", "blue", "K. Weber", "Confirmed split, fee to 4970"],
  ["06:15:11", "SPK-7702", "Auto-matched", "green", "Agent", "R-04 exact ref + amount"],
  ["06:02:19", "STR-55177", "LLM matched", "violet", "Agent", "Ref typo ‘INV-2O4’ → INV-204"],
  ["06:02:15", "PSP-88213", "Auto-matched", "green", "Agent", "R-12 payout sum − fees (PO-7731)"],
  ["06:02:15", "PSP-88214", "Auto-matched", "green", "Agent", "R-12 payout sum − fees (PO-7731)"],
  ["06:02:14", "SEPA-40117", "Auto-matched", "green", "Agent", "R-04 exact ref + amount"],
  ["06:02:14", "WLT-10930", "Flagged", "grey", "Agent", "No ledger entry found for PayPal txn"],
] as const;
const LCOLS = "44px 58px 64px 60px minmax(0,1fr)";

const EXPORTS = [
  { name: "september-close-audit.xlsx", meta: "412,380 rows · SHA-256 signed · 09:14", st: "ready" },
  { name: "q3-auditor-pack.zip", meta: "Jul–Sep · 1,196,442 rows", st: "running" },
  { name: "august-close-audit.xlsx", meta: "398,115 rows · SHA-256 signed · 1 Sep", st: "ready" },
];

export const AuditExport: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/audit?from=2026-09-01&to=2026-09-30`}>
    <div className="flex h-full bg-[#f6f7f9] text-[#111827]" style={SYS}>
      <AppSidebar tint={tint} active={4} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Audit log" sub="Every match, override and write-off, with the rule or reasoning">
          <Btn tint={tint} Icon={Download}>
            Export
          </Btn>
        </TopBar>
        <div className="flex items-center gap-[5px] px-[10px] pt-[7px]">
          <Select>1–30 Sep 2026</Select>
          <Select>All decisions</Select>
          <Select>All actors</Select>
          <span className="ml-auto text-[7.5px] text-black/45">Times in CET · 30 Sep</span>
        </div>
        <div className="mx-[10px] mt-[7px] grid grid-cols-3 overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.07]">
          {EXPORTS.map((e, i) => (
            <div key={e.name} className={`flex min-w-0 items-start gap-[5px] px-[8px] py-[6px] ${i ? "border-l border-black/[0.06]" : ""}`}>
              {e.st === "running" ? (
                <Loader className="mt-[1px] size-[10px] shrink-0 text-black/40" aria-hidden="true" />
              ) : (
                <FileSpreadsheet className="mt-[1px] size-[10px] shrink-0 text-[#15803d]" aria-hidden="true" />
              )}
              <span className="min-w-0 flex-1 leading-tight">
                <span className="flex items-center gap-[4px]">
                  <span className="truncate text-[7.5px] font-medium">{e.name}</span>
                  {e.st === "running" ? (
                    <span className="ml-auto shrink-0 text-[7px] text-black/45">64%</span>
                  ) : (
                    <Download className="ml-auto size-[8px] shrink-0" style={{ color: tint }} aria-hidden="true" />
                  )}
                </span>
                <span className="block truncate text-[6.5px] text-black/45">{e.meta}</span>
                {e.st === "running" && (
                  <span className="mt-[2px] block">
                    <Bar pct={64} color={tint} h={2} />
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        <Panel className="m-[10px] mt-[7px] flex-1" pad={false}>
          <Th cols={LCOLS}>
            <span>Time</span>
            <span>Item</span>
            <span>Decision</span>
            <span>Actor</span>
            <span>Reasoning</span>
          </Th>
          {LOG.map(([t, ref, d, tn, who, why]) => (
            <Tr key={ref + t} cols={LCOLS} h={20.5} style={{ fontSize: 8 }}>
              <span className="font-mono text-[7px] text-black/50">{t}</span>
              <span className="font-mono text-[7.5px] font-semibold">{ref}</span>
              <span>
                <Pill tone={tn as Tone} size={7}>
                  {d}
                </Pill>
              </span>
              <span className="flex items-center gap-[3px] truncate text-black/65">
                {who === "Agent" && <Bot className="size-[8px]" aria-hidden="true" />}
                {who}
              </span>
              <span className="truncate text-black/60">{why}</span>
            </Tr>
          ))}
          <Pager text="1–25 of 412,380" />
        </Panel>
      </div>
    </div>
  </Browser>
);

export const reconciliationScreens: Screen[] = [ExceptionQueue, ReconDashboard, TransactionDrawer, AuditExport];
