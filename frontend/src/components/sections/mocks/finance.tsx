import { Bot, Check, Clock, FileSearch, ShieldCheck, Zap } from "lucide-react";

import { At, Avatar, Bar, Browser, Card, Laptop, LogoMark, Phone, Pill, Tablet, Tilt, TONES, type LayoutProps, type Tone } from "./kit";

/* ------------------------------------------------------------------ */
/* Reconciliation agent: finance exception queue                       */
/* ------------------------------------------------------------------ */

const TXNS: { ref: string; source: string; amount: string; conf: number; status: string; tone: Tone }[] = [
  { ref: "PSP-88213", source: "Adyen payout", amount: "€18,420.00", conf: 97, status: "Matched", tone: "green" },
  { ref: "WLT-10923", source: "PayPal", amount: "€89.90", conf: 22, status: "Unmatched", tone: "red" },
  { ref: "PSP-88240", source: "Adyen · split", amount: "€12,005.12", conf: 64, status: "Review", tone: "amber" },
  { ref: "SEPA-40117", source: "Deutsche Bank", amount: "€2,310.50", conf: 91, status: "Matched", tone: "green" },
  { ref: "STR-55190", source: "Stripe", amount: "€640.00", conf: 58, status: "Review", tone: "amber" },
  { ref: "SEPA-40152", source: "Commerzbank", amount: "€5,000.00", conf: 99, status: "Matched", tone: "green" },
];

const confTone = (c: number): Tone => (c >= 85 ? "green" : c >= 50 ? "amber" : "red");

function ReconScreen({ study, narrow }: { study: LayoutProps["study"]; narrow: boolean }) {
  const tint = study.tint;
  const rows = narrow ? TXNS.slice(0, 4) : TXNS;
  const [matched, open, speed] = study.screen;
  return (
    <div className="flex h-full flex-col bg-[#f7f8fa] text-[#111827]">
      <div className="flex h-[30px] shrink-0 items-center gap-[8px] border-b border-black/[0.07] bg-white px-[10px]">
        <LogoMark tint={tint} text="R" size={16} />
        <span className="text-[10.5px] font-semibold">Reconcile</span>
        <span className="ml-[6px] flex gap-[10px] text-[9px] text-black/45">
          <span className="font-semibold" style={{ color: tint }}>
            Exceptions
          </span>
          <span>Matches</span>
          {!narrow && <span>Audit log</span>}
        </span>
        <span className="ml-auto rounded-[5px] bg-black/[0.05] px-[6px] py-[3px] text-[8.5px] font-medium text-black/60">Close · 31 Mar</span>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-[7px] px-[10px] pt-[9px]">
        {[matched, open, speed].map((s, i) => (
          <div key={s?.label ?? i} className="rounded-[7px] bg-white px-[8px] py-[6px] ring-1 ring-black/[0.06]">
            <p className="truncate text-[8.5px] text-black/50">{s?.label}</p>
            <p className="mt-[2px] text-[15px] font-bold leading-none tracking-[-0.02em]" style={i === 1 ? { color: TONES.red.solid } : undefined}>
              {s?.value}
            </p>
            {i === 0 && (
              <span className="mt-[5px] block">
                <Bar pct={92} color={tint} h={3} />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mx-[10px] mt-[9px] min-h-0 flex-1 overflow-hidden rounded-[7px] bg-white ring-1 ring-black/[0.06]">
        <div className="flex h-[24px] items-center justify-between border-b border-black/[0.06] px-[8px]">
          <span className="text-[10px] font-semibold">Exception queue</span>
          <span className="flex items-center gap-[4px] text-[8.5px] text-black/45">
            <Bot className="size-[9px]" style={{ color: tint }} aria-hidden="true" />
            Agent ran 06:00
          </span>
        </div>
        <div className="flex h-[18px] items-center gap-[8px] bg-black/[0.025] px-[8px] text-[8px] font-medium uppercase tracking-[0.06em] text-black/40">
          <span className="w-[64px]">Reference</span>
          {!narrow && <span className="w-[82px]">Source</span>}
          <span className="flex-1 text-right">Amount</span>
          <span className="w-[76px]">Confidence</span>
          <span className="w-[58px]">Status</span>
        </div>
        {rows.map((r) => {
          const t = TONES[confTone(r.conf)];
          return (
            <div key={r.ref} className="flex h-[25px] items-center gap-[8px] border-t border-black/[0.05] px-[8px] text-[9.5px]" style={r.tone === "red" ? { background: "#fff5f6" } : undefined}>
              <span className="w-[64px] truncate font-mono text-[8.5px] font-medium">{r.ref}</span>
              {!narrow && <span className="w-[82px] truncate text-black/55">{r.source}</span>}
              <span className="flex-1 text-right font-medium tabular-nums">{r.amount}</span>
              <span className="flex w-[76px] items-center gap-[4px]">
                <span className="flex-1">
                  <Bar pct={r.conf} color={t.solid} h={4} />
                </span>
                <span className="w-[20px] text-right text-[8.5px] tabular-nums text-black/55">{r.conf}%</span>
              </span>
              <span className="w-[58px]">
                <Pill tone={r.tone} size={8}>
                  {r.status}
                </Pill>
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-[9px] shrink-0" />
    </div>
  );
}

function AgentExplain({ tint, w }: { tint: string; w: number }) {
  return (
    <Card w={w}>
      <div className="flex items-center gap-[6px]">
        <span className="flex size-[20px] items-center justify-center rounded-[6px] text-white" style={{ background: tint }}>
          <FileSearch className="size-[11px]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold leading-tight">Why unmatched?</p>
          <p className="font-mono text-[8.5px] leading-tight text-black/45">WLT-10923 · €89.90</p>
        </div>
      </div>
      <p className="mt-[7px] text-[9.5px] leading-[1.4] text-black/70">Refund issued twice. Duplicate of WLT-10871 from 28 Mar.</p>
      <div className="mt-[6px] rounded-[6px] bg-black/[0.035] px-[7px] py-[5px] text-[9px] leading-[1.35]">
        <span className="font-semibold">Suggested:</span> write off and notify merchant
      </div>
      <div className="mt-[8px] flex gap-[5px]">
        <span className="flex h-[20px] flex-1 items-center justify-center gap-[3px] rounded-[6px] text-[9px] font-semibold text-white" style={{ background: tint }}>
          <Check className="size-[9px]" strokeWidth={3} aria-hidden="true" />
          Approve
        </span>
        <span className="flex h-[20px] flex-1 items-center justify-center rounded-[6px] text-[9px] font-semibold text-black/60 ring-1 ring-black/10">Reassign</span>
      </div>
    </Card>
  );
}

export function ReconciliationMock({ study, v }: LayoutProps) {
  if (v === "narrow") {
    return (
      <At x={8} y={0}>
        <Tilt m="lift">
          <Browser w={384} h={262} url="finance.internal/reconcile">
            <ReconScreen study={study} narrow />
          </Browser>
        </Tilt>
      </At>
    );
  }
  return (
    <>
      <At x={0} y={6}>
        <Tilt m="left">
          <Laptop w={468} h={330} bg="#f7f8fa">
            <ReconScreen study={study} narrow={false} />
          </Laptop>
        </Tilt>
      </At>
      <At x={446} y={150} z={2}>
        <Tilt m="lift">
          <AgentExplain tint={study.tint} w={190} />
        </Tilt>
      </At>
      <At x={452} y={40} z={2}>
        <div className="flex items-center gap-[6px] rounded-full bg-white/95 py-[5px] pl-[5px] pr-[10px] text-[10px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[18px] items-center justify-center rounded-full bg-[#dcfce7] text-[#166534]">
            <Clock className="size-[10px]" aria-hidden="true" />
          </span>
          Close in {study.metrics[1]?.value ?? "4 hrs"}
        </div>
      </At>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Freelancer insurance: phone quote flow + broker pipeline kanban      */
/* ------------------------------------------------------------------ */

const LANES = [
  {
    name: "New",
    count: 9,
    cards: [
      { who: "Tom Reyes", job: "Videographer", cover: "PI + Kit", i: 0 },
      { who: "Ana Costa", job: "UX consultant", cover: "PI £1M", i: 1 },
    ],
  },
  {
    name: "Quoted",
    count: 14,
    cards: [
      { who: "Maya Chen", job: "Photographer", cover: "£38.40/mo", i: 2 },
      { who: "Idris Bello", job: "Developer", cover: "£24.10/mo", i: 3 },
      { who: "Lea Martin", job: "Copywriter", cover: "£19.80/mo", i: 4 },
    ],
  },
  {
    name: "Bound",
    count: 41,
    cards: [
      { who: "Sam Oduya", job: "Architect", cover: "Bound · 52s", i: 5 },
      { who: "Priya Nair", job: "Stylist", cover: "Bound · 1m", i: 0 },
    ],
  },
];

function Kanban({ tint, lanes }: { tint: string; lanes: typeof LANES }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f4f7]">
      <div className="flex h-[30px] shrink-0 items-center gap-[7px] border-b border-black/[0.07] bg-white px-[10px]">
        <LogoMark tint={tint} text="Q" size={16} />
        <span className="text-[10.5px] font-semibold">Broker pipeline</span>
        <span className="ml-auto flex -space-x-[5px]">
          <Avatar text="JB" i={1} size={16} />
          <Avatar text="RK" i={3} size={16} />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 gap-[7px] p-[8px]">
        {lanes.map((lane) => (
          <div key={lane.name} className="flex min-w-0 flex-1 flex-col rounded-[8px] bg-black/[0.035] p-[5px]">
            <div className="flex items-center justify-between px-[3px] pb-[5px] text-[9px] font-semibold">
              <span className="flex items-center gap-[4px]">
                <span className="size-[6px] rounded-full" style={{ background: lane.name === "Bound" ? TONES.green.solid : lane.name === "Quoted" ? tint : TONES.grey.solid }} />
                {lane.name}
              </span>
              <span className="text-black/40">{lane.count}</span>
            </div>
            <div className="space-y-[5px]">
              {lane.cards.map((c) => (
                <div key={c.who} className="rounded-[6px] bg-white p-[6px] shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-black/[0.05]">
                  <div className="flex items-center gap-[5px]">
                    <Avatar text={c.who.split(" ").map((s) => s[0]).join("")} i={c.i} size={16} />
                    <div className="min-w-0">
                      <p className="truncate text-[9.5px] font-semibold leading-tight">{c.who}</p>
                      <p className="truncate text-[8.5px] leading-tight text-black/45">{c.job}</p>
                    </div>
                  </div>
                  <p className="mt-[5px] text-[9px] font-semibold" style={{ color: lane.name === "Bound" ? TONES.green.fg : tint }}>
                    {c.cover}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotePhone({ tint, w, h }: { tint: string; w: number; h: number }) {
  return (
    <Phone w={w} h={h} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[6px]">
        <div className="flex items-center justify-between text-[9px] text-black/45">
          <span>Get covered</span>
          <span>Step 3 of 3</span>
        </div>
        <span className="mt-[5px] block">
          <Bar pct={100} color={tint} h={3} />
        </span>
        <div className="mt-[9px] rounded-[10px] p-[9px] text-white" style={{ background: `linear-gradient(145deg, ${tint}, color-mix(in oklab, ${tint} 60%, #000))` }}>
          <p className="text-[9px] text-white/75">Your quote · Photographer</p>
          <p className="mt-[3px] text-[20px] font-bold leading-none tracking-[-0.02em]">
            £38.40<span className="text-[10px] font-medium text-white/75"> /mo</span>
          </p>
          <p className="mt-[4px] flex items-center gap-[3px] text-[8.5px] text-white/80">
            <Zap className="size-[8px]" aria-hidden="true" /> Quoted in 52s
          </p>
        </div>
        <div className="mt-[8px] space-y-[5px]">
          {[
            ["Professional indemnity", true],
            ["Equipment cover", true],
            ["Legal expenses", false],
          ].map(([label, on]) => (
            <div key={label as string} className="flex items-center justify-between gap-[4px] text-[9.5px]">
              <span className="truncate">{label}</span>
              <span className="flex h-[12px] w-[21px] shrink-0 items-center rounded-full p-[2px]" style={{ background: on ? tint : "rgb(0 0 0 / 0.15)", justifyContent: on ? "flex-end" : "flex-start" }}>
                <span className="size-[8px] rounded-full bg-white" />
              </span>
            </div>
          ))}
        </div>
        <span className="mt-[10px] flex h-[26px] items-center justify-center gap-[4px] rounded-[8px] text-[10px] font-semibold text-white" style={{ background: tint }}>
          <ShieldCheck className="size-[11px]" aria-hidden="true" />
          Bind policy
        </span>
        <p className="mt-[5px] text-center text-[8px] text-black/40">Cover starts today</p>
      </div>
    </Phone>
  );
}

export function InsuranceMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={4} y={18}>
          <Tilt m="left">
            <Tablet w={262} h={236} bg="#f4f4f7">
              <Kanban tint={tint} lanes={LANES.slice(1)} />
            </Tablet>
          </Tilt>
        </At>
        <At x={250} y={0} z={2}>
          <Tilt m="lift">
            <QuotePhone tint={tint} w={146} h={300} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={0} y={44}>
        <Tilt m="left">
          <Tablet w={452} h={300} bg="#f4f4f7">
            <Kanban tint={tint} lanes={LANES} />
          </Tablet>
        </Tilt>
      </At>
      <At x={436} y={0} z={2}>
        <Tilt m="lift">
          <QuotePhone tint={tint} w={172} h={352} />
        </Tilt>
      </At>
      <At x={300} y={6} z={3}>
        <div className="flex items-center gap-[6px] rounded-full bg-white/95 py-[5px] pl-[5px] pr-[10px] text-[10px] font-semibold shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <span className="flex size-[18px] items-center justify-center rounded-full text-white" style={{ background: tint }}>
            <Zap className="size-[10px]" aria-hidden="true" />
          </span>
          {study.metrics[1]?.value} policies bound
        </div>
      </At>
    </>
  );
}
