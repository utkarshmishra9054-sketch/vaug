import { ArrowRightLeft, Bot, CircleCheck, Download, FileClock, FileText, Inbox, LayoutDashboard, Link2, Plug, RotateCcw, Settings, ShieldCheck, Sparkles, UserRound, X } from "lucide-react";

import { Bar, BarChart, Browser, Btn, Check, Kpi, Legend, LineChart, Panel, Pill, Segments, Select, Sidebar, Tag, Th, TONES, TopBar, Tr, type Screen, type Tone } from "./kit";

/* Reconciliation agent · Frankfurt payments processor */

const URL = "reconcile.finance-eu.internal";
const NAV = (open = 38) => [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Exceptions", Icon: Inbox, badge: open },
  { label: "Matches", Icon: Link2 },
  { label: "Sources", Icon: Plug },
  { label: "Audit log", Icon: FileClock },
  { label: "Settings", Icon: Settings },
];
const USER = { name: "Katrin Weber", role: "Finance analyst", initials: "KW" };

const REASON: Record<string, string> = {
  "Split settlement": "#2563eb",
  "Fee at source": "#7c3aed",
  "Duplicate refund": "#e11d48",
  "Timing (T+2)": "#d97706",
  "FX rounding": "#0891b2",
};

const confTone = (c: number): Tone => (c >= 85 ? "green" : c >= 50 ? "amber" : "red");

function Confidence({ value }: { value: number }) {
  const t = TONES[confTone(value)];
  return (
    <span className="flex items-center gap-[5px]">
      <span className="w-[38px]">
        <Bar pct={value} color={t.solid} h={4} />
      </span>
      <span className="w-[20px] text-[8.5px] font-semibold tabular-nums" style={{ color: t.fg }}>
        {value}%
      </span>
    </span>
  );
}

/* 01 · Exception queue --------------------------------------------- */

const QUEUE = [
  { ref: "PSP-88240", src: "Adyen", who: "Nordlicht Mode GmbH", amt: "€12,005.12", reason: "Split settlement", conf: 64, sel: true },
  { ref: "WLT-10923", src: "PayPal", who: "Kaffeerösterei Lang", amt: "−€89.90", reason: "Duplicate refund", conf: 22, sel: true },
  { ref: "STR-55190", src: "Stripe", who: "Velo Werk Berlin", amt: "€640.00", reason: "Fee at source", conf: 71, sel: false },
  { ref: "SEPA-40188", src: "Deutsche Bank", who: "Alpen Outdoor AG", amt: "€3,118.40", reason: "Timing (T+2)", conf: 83, sel: true },
  { ref: "KLN-20471", src: "Klarna", who: "Haus & Hof Online", amt: "€1,249.99", reason: "Fee at source", conf: 58, sel: false },
  { ref: "PSP-88262", src: "Adyen", who: "Studio Feinkost", amt: "€7,402.66", reason: "Split settlement", conf: 76, sel: false },
  { ref: "SEPA-40203", src: "Commerzbank", who: "Brettspiel Kontor", amt: "€412.07", reason: "FX rounding", conf: 91, sel: false },
];
const QCOLS = "10px 58px minmax(0,1fr) 58px 80px 64px 82px";

export const ExceptionQueue: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/exceptions`}>
    <div className="flex h-full bg-[#f6f7f9] text-[#111827]">
      <Sidebar tint={tint} brand="Reconcile" mark="R" items={NAV()} active={1} user={USER} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Exception queue" sub="Close · 30 Sep · agent run 06:00 CET" search="Search reference, merchant…">
          <Btn tint={tint} Icon={Download} outline>
            Export
          </Btn>
        </TopBar>
        <div className="flex items-center gap-[5px] px-[12px] pt-[9px]">
          {[
            ["All", 38],
            ["Split settlement", 12],
            ["Fee at source", 9],
            ["Timing", 7],
            ["Duplicate", 6],
          ].map(([l, n], i) => (
            <span key={l} className={`flex h-[20px] items-center whitespace-nowrap gap-[4px] rounded-full px-[8px] text-[8.5px] font-medium ${i === 0 ? "text-white" : "bg-white text-black/60 ring-1 ring-black/[0.08]"}`} style={i === 0 ? { background: "#111827" } : undefined}>
              {l}
              <span className={i === 0 ? "text-white/60" : "text-black/35"}>{n}</span>
            </span>
          ))}
          <span className="ml-auto">
            <Select>Confidence ↑</Select>
          </span>
        </div>
        <Panel className="mx-[12px] mt-[8px] flex-1" pad={false}>
          <Th cols={QCOLS}>
            <Check tint={tint} />
            <span>Reference</span>
            <span>Merchant · source</span>
            <span className="text-right">Amount</span>
            <span>Reason</span>
            <span>Confidence</span>
            <span className="text-right">Action</span>
          </Th>
          {QUEUE.map((r) => (
            <Tr key={r.ref} cols={QCOLS} h={33} highlight={r.sel ? `color-mix(in oklab, ${tint} 5%, white)` : undefined}>
              <Check on={r.sel} tint={tint} />
              <span className="truncate font-mono text-[8.5px] font-semibold">{r.ref}</span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate font-medium">{r.who}</span>
                <span className="block truncate text-[7.5px] text-black/45">{r.src}</span>
              </span>
              <span className="text-right font-semibold tabular-nums">{r.amt}</span>
              <Tag color={REASON[r.reason]}>{r.reason}</Tag>
              <Confidence value={r.conf} />
              <span className="flex justify-end gap-[3px]">
                <Btn tint={tint} size="sm" Icon={CircleCheck}>
                  Approve
                </Btn>
                <Btn size="sm" outline Icon={RotateCcw} style={{ width: 18, padding: 0 }}>
                  {null}
                </Btn>
              </span>
            </Tr>
          ))}
        </Panel>
        <div className="mx-[12px] my-[8px] flex h-[30px] items-center gap-[8px] rounded-[8px] bg-[#111827] px-[10px] text-[9px] text-white">
          <span className="font-semibold">3 selected</span>
          <span className="text-white/50">€15,033.62 total</span>
          <span className="ml-auto flex items-center gap-[4px] text-white/60">
            <Bot className="size-[10px]" aria-hidden="true" />
            Agent suggests: approve 2, write off 1
          </span>
          <Btn tint={tint} Icon={CircleCheck}>
            Apply suggestions
          </Btn>
        </div>
      </div>
    </div>
  </Browser>
);

/* 02 · Daily dashboard ---------------------------------------------- */

const SOURCES = [
  { short: "Adyen", m: 5180, o: 14 },
  { short: "Stripe", m: 3420, o: 6 },
  { short: "PayPal", m: 2210, o: 8 },
  { short: "Klarna", m: 1160, o: 5 },
  { short: "DB", m: 1040, o: 2 },
  { short: "Coba", m: 720, o: 2 },
  { short: "Spk", m: 480, o: 1 },
];

export const ReconDashboard: Screen = ({ tint }) => {
  const soft = `color-mix(in oklab, ${tint} 30%, white)`;
  return (
    <Browser w={640} h={400} url={`${URL}/overview`}>
      <div className="flex h-full bg-[#f6f7f9] text-[#111827]">
        <Sidebar tint={tint} brand="Reconcile" mark="R" items={NAV()} active={0} user={USER} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar title="Daily reconciliation" sub="Tuesday 30 Sep · 7 sources · 3 banks, 4 PSPs">
            <Segments items={["Today", "7d", "Month"]} active={0} tint={tint} />
          </TopBar>
          <div className="grid grid-cols-4 gap-[8px] px-[12px] pt-[10px]">
            <Kpi tint={tint} accent label="Matched today" value="14,210" delta="▲ 6.2%" sub="vs Mon" />
            <Kpi tint={tint} label="Auto-match rate" value="92.4%" delta="▲ 0.8 pt" />
            <Kpi tint={tint} label="Open exceptions" value="38" delta="▼ 21" sub="since 06:00" />
            <Kpi tint={tint} label="Avg. match time" value="1.4s" delta="▼ 0.3s" />
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-[8px] px-[12px] py-[8px]">
            <Panel title="Matched vs open by source" action={<Legend items={[{ label: "Matched", color: tint }, { label: "Open ×50", color: "#f59e0b" }]} />}>
              <BarChart w={246} h={120} bars={SOURCES.map((s) => [s.m, s.o * 50])} colors={[tint, "#f59e0b"]} max={6000} labels={SOURCES.map((s) => s.short)} yFormat={(n) => (n ? `${n / 1000}k` : "0")} gap={0.42} />
              <div className="mt-[8px] grid grid-cols-3 gap-[6px] border-t border-black/[0.06] pt-[7px] text-[8px]">
                <span>
                  <span className="block text-black/45">Card (PSP)</span>
                  <span className="text-[10px] font-bold">11,970</span>
                </span>
                <span>
                  <span className="block text-black/45">SEPA (bank)</span>
                  <span className="text-[10px] font-bold">2,240</span>
                </span>
                <span>
                  <span className="block text-black/45">Value matched</span>
                  <span className="text-[10px] font-bold">€4.82M</span>
                </span>
              </div>
            </Panel>
            <div className="flex min-h-0 flex-col gap-[8px]">
              <Panel title="Match rate · 14d" action="target 90%">
                <LineChart
                  w={164}
                  h={46}
                  min={80}
                  max={95}
                  grid={3}
                  series={[
                    { values: [84, 85, 87, 86, 88, 89, 88, 90, 91, 90, 92, 91, 92, 92.4], color: tint, area: true },
                    { values: Array(14).fill(90), color: "#94a3b8", dashed: true },
                  ]}
                  labels={["17 Sep", "23 Sep", "30 Sep"]}
                />
              </Panel>
              <Panel title="Source status" pad={false} className="flex-1">
                {[
                  ["Adyen", "API", "05:52", "green"],
                  ["Deutsche Bank", "SFTP", "05:40", "green"],
                  ["PayPal", "API", "05:55", "green"],
                  ["Sparkasse", "SFTP", "retry 06:15", "amber"],
                ].map(([n, via, t, tn]) => (
                  <div key={n} className="flex h-[19px] items-center gap-[6px] border-b border-black/[0.05] px-[10px] text-[8.5px] last:border-b-0">
                    <span className="size-[5px] rounded-full" style={{ background: TONES[tn as Tone].solid }} />
                    <span className="font-medium">{n}</span>
                    <span className="rounded-[3px] bg-black/[0.05] px-[3px] font-mono text-[7px] text-black/50">{via}</span>
                    <span className="ml-auto tabular-nums text-black/45">{t}</span>
                  </div>
                ))}
              </Panel>
            </div>
          </div>
          <div className="mx-[12px] mb-[10px] flex items-center gap-[8px] whitespace-nowrap rounded-[7px] px-[10px] py-[6px] text-[8.5px]" style={{ background: soft }}>
            <Sparkles className="size-[10px]" style={{ color: tint }} aria-hidden="true" />
            <span>
              <b>Agent note:</b> Adyen payout PO-7731 covers 318 transactions less €412.06 fees. 14 need review.
            </span>
          </div>
        </div>
      </div>
    </Browser>
  );
};

/* 03 · Transaction detail drawer ------------------------------------- */

export const TransactionDrawer: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/exceptions/PSP-88240`}>
    <div className="relative flex h-full bg-[#f6f7f9] text-[#111827]">
      <Sidebar tint={tint} brand="Reconcile" mark="R" items={NAV()} active={1} user={USER} />
      <div className="flex min-w-0 flex-1 flex-col opacity-60">
        <TopBar title="Exception queue" sub="Close · 30 Sep" />
        <Panel className="m-[12px] flex-1" pad={false}>
          <Th cols={QCOLS}>
            <span />
            <span>Reference</span>
            <span>Merchant</span>
            <span>Amount</span>
            <span />
            <span />
            <span />
          </Th>
          {QUEUE.slice(0, 7).map((r, i) => (
            <Tr key={r.ref} cols={QCOLS} h={33} highlight={i === 0 ? `color-mix(in oklab, ${tint} 10%, white)` : undefined}>
              <span />
              <span className="font-mono text-[8.5px] font-semibold">{r.ref}</span>
              <span className="truncate">{r.who}</span>
              <span className="font-semibold">{r.amt}</span>
              <span />
              <span />
              <span />
            </Tr>
          ))}
        </Panel>
      </div>
      <div className="absolute inset-y-0 right-0 flex w-[300px] flex-col bg-white shadow-[-20px_0_40px_-20px_rgb(0_0_0/0.35)]">
        <div className="flex items-start gap-[8px] border-b border-black/[0.07] px-[14px] py-[10px]">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[8.5px] text-black/45">PSP-88240 · Adyen payout PO-7731</p>
            <p className="mt-[2px] text-[16px] font-bold tracking-[-0.02em]">€12,005.12</p>
            <div className="mt-[4px] flex gap-[4px]">
              <Tag color={REASON["Split settlement"]}>Split settlement</Tag>
              <Pill tone="amber" size={7.5}>
                64% confidence
              </Pill>
            </div>
          </div>
          <X className="size-[12px] text-black/40" aria-hidden="true" />
        </div>
        <div className="flex-1 space-y-[8px] overflow-hidden px-[14px] py-[9px]">
          <div className="rounded-[8px] p-[9px]" style={{ background: `color-mix(in oklab, ${tint} 7%, white)`, boxShadow: `inset 3px 0 0 ${tint}` }}>
            <p className="flex items-center gap-[4px] text-[8.5px] font-bold" style={{ color: tint }}>
              <Bot className="size-[10px]" aria-hidden="true" />
              Why the agent could not auto-match
            </p>
            <p className="mt-[4px] text-[9px] leading-[1.45] text-black/75">
              One payout settles <b>3 ledger entries</b> for Nordlicht Mode GmbH, less a <b>€37.40 fee</b> taken at source. Totals agree to the cent, but order NM-40932 was part-refunded on 28 Sep, so a human should confirm.
            </p>
          </div>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.06em] text-black/40">Proposed match (3 → 1)</p>
            <div className="mt-[4px] overflow-hidden rounded-[7px] ring-1 ring-black/[0.07]">
              {[
                ["LED-551208", "Order NM-40911", "€6,210.00"],
                ["LED-551231", "Order NM-40925", "€3,988.52"],
                ["LED-551240", "Order NM-40932 · part refund", "€1,844.00"],
                ["FEE", "Adyen fee (inferred)", "−€37.40"],
              ].map(([a, b, c], i) => (
                <div key={a} className={`flex h-[18px] items-center gap-[6px] border-b border-black/[0.05] px-[8px] text-[8.5px] ${i === 3 ? "text-black/50" : ""}`}>
                  <span className="w-[58px] font-mono text-[7.5px] text-black/45">{a}</span>
                  <span className="flex-1 truncate">{b}</span>
                  <span className="font-semibold tabular-nums">{c}</span>
                </div>
              ))}
              <div className="flex h-[22px] items-center justify-between bg-black/[0.025] px-[8px] text-[9px] font-bold">
                <span className="flex items-center gap-[4px]">
                  <ArrowRightLeft className="size-[9px]" aria-hidden="true" />
                  Difference
                </span>
                <span className="text-[#15803d]">€0.00</span>
              </div>
            </div>
          </div>
          <div className="text-[8.5px]">
            <p className="text-[8px] font-semibold uppercase tracking-[0.06em] text-black/40">Suggested action</p>
            <p className="mt-[3px] leading-[1.4]">Confirm match and post fee to 4970 · PSP charges.</p>
          </div>
        </div>
        <div className="flex gap-[6px] border-t border-black/[0.07] px-[14px] py-[10px]">
          <Btn tint={tint} Icon={CircleCheck} style={{ flex: 1, height: 26 }}>
            Approve match
          </Btn>
          <Btn outline Icon={RotateCcw} style={{ height: 26 }}>
            Override
          </Btn>
          <Btn outline Icon={UserRound} style={{ height: 26 }}>
            Reassign
          </Btn>
        </div>
      </div>
    </div>
  </Browser>
);

/* 04 · Audit log export --------------------------------------------- */

const LOG = [
  ["06:02:14", "SEPA-40117", "Auto-matched", "green", "Agent", "Rule R-04 · exact ref + amount"],
  ["06:02:15", "PSP-88213", "Auto-matched", "green", "Agent", "Rule R-12 · payout sum − fees"],
  ["06:02:19", "STR-55177", "LLM matched", "violet", "Agent", "Ref typo ‘INV-2O4’ → INV-204"],
  ["08:41:52", "PSP-88240", "Approved", "blue", "K. Weber", "Confirmed split, fee to 4970"],
  ["08:43:07", "WLT-10923", "Written off", "red", "K. Weber", "Duplicate of WLT-10871"],
  ["09:10:33", "SEPA-40188", "Approved", "blue", "M. Hoffmann", "Settled T+2, bank holiday"],
  ["09:12:02", "KLN-20471", "Overridden", "amber", "M. Hoffmann", "Fee rate 2.49% not 1.99%"],
] as const;
const LCOLS = "44px 62px 70px 66px minmax(0,1fr)";

export const AuditExport: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${URL}/audit`}>
    <div className="relative flex h-full bg-[#f6f7f9] text-[#111827]">
      <Sidebar tint={tint} brand="Reconcile" mark="R" items={NAV()} active={4} user={USER} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Audit log" sub="412,380 decisions · every match, override and write-off">
          <Btn tint={tint} Icon={Download}>
            Export
          </Btn>
        </TopBar>
        <div className="flex items-center gap-[6px] px-[12px] pt-[9px]">
          <Select>1–30 Sep 2026</Select>
          <Select>All decisions</Select>
          <Select>All actors</Select>
        </div>
        <Panel className="mx-[12px] my-[8px] flex-1" pad={false}>
          <Th cols={LCOLS}>
            <span>Timestamp</span>
            <span>Item</span>
            <span>Decision</span>
            <span>Actor</span>
            <span>Reasoning</span>
          </Th>
          {LOG.map(([t, ref, d, tn, who, why]) => (
            <Tr key={ref} cols={LCOLS} h={29}>
              <span className="font-mono text-[7.5px] text-black/50">{t}</span>
              <span className="font-mono text-[8px] font-semibold">{ref}</span>
              <span>
                <Pill tone={tn as Tone} size={7.5}>
                  {d}
                </Pill>
              </span>
              <span className="flex items-center gap-[3px] truncate text-black/65">
                {who === "Agent" && <Bot className="size-[9px]" style={{ color: tint }} aria-hidden="true" />}
                {who}
              </span>
              <span className="truncate text-black/60">{why}</span>
            </Tr>
          ))}
        </Panel>
      </div>

      <div className="absolute right-[40px] top-[38px] w-[236px] rounded-[10px] bg-white p-[12px] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.45)] ring-1 ring-black/10">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold">Export for auditors</p>
          <X className="size-[11px] text-black/40" aria-hidden="true" />
        </div>
        <p className="mt-[2px] text-[8.5px] text-black/50">September close · 412,380 records</p>
        <p className="mt-[10px] text-[8px] font-semibold uppercase tracking-[0.06em] text-black/40">Format</p>
        <div className="mt-[4px] grid grid-cols-3 gap-[5px]">
          {["CSV", "XLSX", "PDF summary"].map((f, i) => (
            <span key={f} className={`flex h-[34px] flex-col items-center justify-center gap-[2px] rounded-[7px] text-[8.5px] font-semibold ${i === 1 ? "" : "text-black/60 ring-1 ring-black/10"}`} style={i === 1 ? { boxShadow: `inset 0 0 0 1.5px ${tint}`, color: tint, background: `color-mix(in oklab, ${tint} 6%, white)` } : undefined}>
              <FileText className="size-[11px]" aria-hidden="true" />
              {f}
            </span>
          ))}
        </div>
        <div className="mt-[10px] space-y-[6px] text-[9px]">
          {[
            ["Include agent reasoning", true],
            ["Include source file hashes", true],
            ["Only human decisions", false],
          ].map(([l, on]) => (
            <label key={l as string} className="flex items-center gap-[6px]">
              <Check on={on as boolean} tint={tint} />
              {l}
            </label>
          ))}
        </div>
        <div className="mt-[10px] flex items-center gap-[6px] rounded-[7px] bg-[#f0fdf4] px-[8px] py-[6px] text-[8px] text-[#166534]">
          <ShieldCheck className="size-[11px] shrink-0" aria-hidden="true" />
          Signed SHA-256 manifest · data stays in eu-central-1
        </div>
        <div className="mt-[12px] flex justify-end gap-[6px]">
          <Btn outline>Cancel</Btn>
          <Btn tint={tint} Icon={Download}>
            Export 412k records
          </Btn>
        </div>
      </div>
    </div>
  </Browser>
);

export const reconciliationScreens: Screen[] = [ExceptionQueue, ReconDashboard, TransactionDrawer, AuditExport];
