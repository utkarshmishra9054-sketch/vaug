import type { SectorSlug } from "@/content/types";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/*
 * Bespoke animated scenes, one per sector, drawn in SVG (viewBox 400×300).
 * Colours come from the band tokens so the same scene works on dark and light
 * bands. Motion is pure CSS (`.ind-*` in globals.css) and stops under
 * prefers-reduced-motion.
 */

type Vars = React.CSSProperties & Record<`--${string}`, string>;
const d = (delay: string): Vars => ({ "--d": delay });
/** Build-up slot: items arrive one after another and leave together (see `.ind-q-*` in globals.css). */
const q = (slot: number) => `ind-q ind-q-${slot}`;

const MONO = "var(--font-code), ui-monospace, monospace";
const PURPLE = "#7c3aed";
const YELLOW = "#ffd23f";

function Panel({ x, y, w, h, fill = "var(--bg)" }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke="var(--border-strong)" />;
}

function Label({ x, y, children, size = 9, fill = "var(--muted)", weight, anchor, mono = true }: { x: number; y: number; children: React.ReactNode; size?: number; fill?: string; weight?: number; anchor?: "start" | "middle" | "end"; mono?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} fontWeight={weight} textAnchor={anchor} fontFamily={mono ? MONO : undefined}>
      {children}
    </text>
  );
}

/** Small pulsing "live" dot. */
function Live({ x, y, color = "#34d399" }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={color} opacity={0.35} className="ind-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
      <circle cx={x} cy={y} r={3.5} fill={color} />
    </g>
  );
}

/* ------------------------------------------------------------------ */

function Fintech() {
  const rows = [
    { t: "Payout · Stripe", s: "matched", v: "£1,240.00" },
    { t: "KYC check", s: "passed", v: "✓" },
    { t: "Claim #2291", s: "triaged by agent", v: "auto" },
    { t: "Invoice INV-884", s: "matched", v: "€860.50" },
    { t: "FX settlement", s: "flagged for review", v: "!", warn: true },
  ];
  return (
    <>
      <defs>
        <linearGradient id="ind-fin-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      {/* card */}
      <g className="ind-float">
        <rect x={24} y={34} width={168} height={104} rx={12} fill="url(#ind-fin-card)" />
        <Label x={40} y={56} fill="rgb(255 255 255 / 0.8)" size={9} weight={600}>
          VAUG PAY
        </Label>
        <rect x={40} y={66} width={26} height={19} rx={4} fill={YELLOW} />
        <path d="M44 72 H62 M44 78 H62 M53 66 V85" stroke="#b58900" strokeWidth={0.8} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${150 + i * 7} 66 q6 9 0 18`} stroke="#fff" strokeWidth={2} strokeLinecap="round" className="ind-wave" style={d(`${i * 0.25}s`)} />
        ))}
        <Label x={40} y={120} fill="#fff" size={13} weight={600}>
          •••• 4821
        </Label>
      </g>
      {/* connector */}
      <path d="M192 88 H214" stroke="var(--accent-text)" strokeWidth={2} className="ind-dash" />

      {/* risk gauge */}
      <Panel x={24} y={156} w={168} h={124} />
      <Label x={38} y={176}>
        Risk score
      </Label>
      <path d="M52 256 A56 56 0 0 1 164 256" stroke="var(--surface-2)" strokeWidth={10} strokeLinecap="round" />
      <path d="M52 256 A56 56 0 0 1 164 256" stroke="var(--accent-text)" strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="0.32 1" />
      <g className="ind-needle" style={{ transformOrigin: "108px 256px" }}>
        <line x1={108} y1={256} x2={108} y2={212} stroke="var(--fg)" strokeWidth={3} strokeLinecap="round" />
      </g>
      <circle cx={108} cy={256} r={6} fill="var(--fg)" />
      <Label x={108} y={274} anchor="middle" fill="var(--fg)" weight={600}>
        0.02 · low
      </Label>

      {/* ledger feed */}
      <Panel x={214} y={20} w={166} h={260} />
      <Label x={228} y={42} fill="var(--fg)" size={10} weight={600} mono={false}>
        Live ledger
      </Label>
      <Live x={364} y={39} />
      {rows.map((r, i) => {
        const y = 56 + i * 44;
        return (
          <g key={r.t} className={q(i * 2)}>
            <rect x={224} y={y} width={146} height={36} rx={7} fill="var(--surface-2)" />
            <circle cx={240} cy={y + 18} r={8} fill={r.warn ? YELLOW : "var(--accent-soft)"} />
            <Label x={254} y={y + 15} fill="var(--fg)" size={8.5} mono={false} weight={600}>
              {r.t}
            </Label>
            <Label x={254} y={y + 27} size={7.5}>
              {r.s}
            </Label>
            <Label x={362} y={y + 21} anchor="end" size={8} fill={r.warn ? "var(--fg)" : "var(--accent-text)"} weight={700}>
              {r.v}
            </Label>
          </g>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */

function Healthcare() {
  const ecg = "M34 80 H108 L116 80 L122 62 L130 100 L138 50 L146 88 L152 80 H226 L234 80 L240 62 L248 100 L256 50 L264 88 L270 80 H366";
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
  const booked = new Set([1, 4, 6, 9, 10]);
  return (
    <>
      <Panel x={20} y={20} w={360} h={94} />
      <Label x={34} y={40}>
        Patient flow · today
      </Label>
      <g className="ind-beat" style={{ transformOrigin: "358px 38px" }}>
        <path d="M358 45 l-8 -8 a5 5 0 0 1 8 -6 a5 5 0 0 1 8 6 z" fill="#f43f5e" />
      </g>
      <path d={ecg} stroke="var(--border-strong)" strokeWidth={1.5} strokeLinejoin="round" />
      <path d={ecg} stroke="var(--accent-text)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="ind-scan" />

      {/* booking slots */}
      <Panel x={20} y={128} w={172} h={152} />
      <Label x={34} y={148} fill="var(--fg)" size={9.5} weight={600} mono={false}>
        Tue 14 · Physio
      </Label>
      {times.map((t, i) => {
        const x = 34 + (i % 3) * 50;
        const y = 158 + Math.floor(i / 3) * 29;
        return (
          <g key={t}>
            <rect x={x} y={y} width={44} height={23} rx={5} fill={booked.has(i) ? "var(--accent-soft)" : "var(--surface-2)"} />
            {(i === 2 || i === 8) && <rect x={x} y={y} width={44} height={23} rx={5} fill={YELLOW} className="ind-blink" style={d(i === 2 ? "0s" : "1.6s")} />}
            <Label x={x + 22} y={y + 15} anchor="middle" size={7.5} fill="var(--fg)">
              {t}
            </Label>
          </g>
        );
      })}

      {/* patient agent chat */}
      <Panel x={204} y={128} w={176} h={152} />
      <Label x={218} y={148} fill="var(--fg)" size={9.5} weight={600} mono={false}>
        WhatsApp · Clinic agent
      </Label>
      <g className={q(0)}>
        <rect x={216} y={158} width={118} height={26} rx={8} fill="var(--surface-2)" />
        <Label x={225} y={175} fill="var(--fg)" size={8.5} mono={false}>
          Can I move my 3pm?
        </Label>
      </g>
      <g className={q(2)}>
        <rect x={238} y={192} width={130} height={40} rx={8} fill={PURPLE} />
        <Label x={247} y={208} fill="#fff" size={8.5} mono={false}>
          Done: Thursday 10:30.
        </Label>
        <Label x={247} y={222} fill="rgb(255 255 255 / 0.8)" size={8} mono={false}>
          Reminder set ✓
        </Label>
      </g>
      <g className={q(4)}>
        <rect x={216} y={242} width={108} height={22} rx={11} fill="var(--accent-soft)" />
        <Label x={270} y={256} anchor="middle" fill="var(--accent-text)" size={8} weight={600}>
          Records synced ✓
        </Label>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

const buildings = [
  { x: 36, w: 62, h: 118 },
  { x: 106, w: 72, h: 176 },
  { x: 186, w: 52, h: 96 },
  { x: 246, w: 80, h: 140 },
];

function RealEstate() {
  const ground = 262;
  return (
    <>
      {/* map grid glow */}
      <ellipse cx={200} cy={ground} rx={190} ry={16} fill="var(--accent-soft)" />
      {buildings.map((b, bi) => {
        const top = ground - b.h;
        const cols = Math.floor((b.w - 12) / 14);
        const rows = Math.floor((b.h - 20) / 16);
        const wins: React.ReactNode[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const k = bi * 31 + r * 7 + c * 13;
            const x = b.x + 8 + c * 14;
            const y = top + 12 + r * 16;
            wins.push(<rect key={`${r}-${c}`} x={x} y={y} width={8} height={9} rx={1.5} fill="var(--surface)" />);
            if (k % 3 === 0) {
              wins.push(<rect key={`l-${r}-${c}`} x={x} y={y} width={8} height={9} rx={1.5} fill={YELLOW} className="ind-window" style={d(`${(k % 17) * 0.35}s`)} />);
            }
          }
        }
        return (
          <g key={b.x} className="ind-rise" style={{ ...d(`${bi * 0.12}s`), transformOrigin: `${b.x + b.w / 2}px ${ground}px` }}>
            <rect x={b.x} y={top} width={b.w} height={b.h} rx={3} fill={bi === 1 ? "var(--surface-2)" : "var(--bg)"} stroke="var(--border-strong)" />
            {bi === 1 && <path d={`M${b.x + b.w / 2} ${top} V${top - 18}`} stroke="var(--accent-text)" strokeWidth={2} />}
            {wins}
          </g>
        );
      })}
      <line x1={16} y1={ground} x2={384} y2={ground} stroke="var(--border-strong)" strokeWidth={1.5} />
      {[340, 360].map((x) => (
        <g key={x}>
          <line x1={x} y1={ground} x2={x} y2={ground - 12} stroke="var(--muted)" />
          <circle cx={x} cy={ground - 18} r={8} fill="var(--accent-soft)" stroke="var(--accent-text)" />
        </g>
      ))}

      {/* map pins */}
      {[
        { x: 67, y: 118, dl: "0s" },
        { x: 286, y: 96, dl: "0.8s" },
      ].map((p) => (
        <g key={p.x}>
          <ellipse cx={p.x} cy={p.y + 20} rx={10} ry={3.5} fill="none" stroke="var(--accent-text)" className="ind-ping" style={{ ...d(p.dl), transformOrigin: `${p.x}px ${p.y + 20}px` }} />
          <g className="ind-bob" style={d(p.dl)}>
            <path d={`M${p.x} ${p.y + 18} C${p.x - 12} ${p.y + 4} ${p.x - 12} ${p.y - 10} ${p.x} ${p.y - 10} C${p.x + 12} ${p.y - 10} ${p.x + 12} ${p.y + 4} ${p.x} ${p.y + 18} Z`} fill={PURPLE} />
            <circle cx={p.x} cy={p.y - 1} r={4} fill="#fff" />
          </g>
        </g>
      ))}

      {/* lead chip */}
      <g className={q(1)}>
        <rect x={18} y={18} width={150} height={28} rx={14} fill={PURPLE} />
        <Live x={33} y={32} color={YELLOW} />
        <Label x={44} y={35.5} fill="#fff" size={8.5} mono={false} weight={600}>
          New lead · replied in 4s
        </Label>
      </g>

      {/* listing card */}
      <g className="ind-float">
        <rect x={244} y={16} width={140} height={70} rx={10} fill="var(--bg)" stroke="var(--border-strong)" />
        <rect x={254} y={26} width={34} height={34} rx={6} fill="var(--accent-soft)" />
        <path d="M262 50 l9 -9 l9 9 v6 h-18 z" fill="var(--accent-text)" />
        <Label x={296} y={38} fill="var(--fg)" size={9} weight={600} mono={false}>
          3-bed · Marina
        </Label>
        <Label x={296} y={51} size={7.5}>
          viewing Sat 11:00
        </Label>
        <rect x={254} y={66} width={70} height={14} rx={7} fill="var(--accent-soft)" />
        <Label x={289} y={76} anchor="middle" size={7.5} fill="var(--accent-text)" weight={700}>
          Qualified ✓
        </Label>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Ecommerce() {
  const products = [
    { shape: "circle", c: PURPLE },
    { shape: "rect", c: YELLOW },
    { shape: "tri", c: YELLOW },
    { shape: "circle", c: "var(--accent-text)" },
  ];
  const bars = [38, 52, 46, 70, 92];
  return (
    <>
      {/* storefront */}
      <Panel x={20} y={20} w={232} h={260} />
      <circle cx={34} cy={36} r={3} fill="var(--border-strong)" />
      <circle cx={44} cy={36} r={3} fill="var(--border-strong)" />
      <Label x={58} y={39} size={8.5}>
        store.example
      </Label>
      {/* cart with counting badge */}
      <path d="M206 30 h5 l4 14 h16 l3 -10 h-21" stroke="var(--fg)" strokeWidth={1.6} strokeLinejoin="round" />
      <circle cx={218} cy={48} r={2} fill="var(--fg)" />
      <circle cx={229} cy={48} r={2} fill="var(--fg)" />
      <circle cx={236} cy={28} r={8} fill={YELLOW} />
      <clipPath id="ind-cart-clip">
        <circle cx={236} cy={28} r={8} />
      </clipPath>
      <g clipPath="url(#ind-cart-clip)">
        <g className="ind-count">
          {[1, 2, 3].map((n, i) => (
            <text key={n} x={236} y={31.5 + i * 16} fontSize={9} fontWeight={700} textAnchor="middle" fill="#131116">
              {n}
            </text>
          ))}
        </g>
      </g>
      {products.map((p, i) => {
        const x = 32 + (i % 2) * 110;
        const y = 58 + Math.floor(i / 2) * 110;
        const cx = x + 49;
        const cy = y + 34;
        return (
          <g key={i}>
            <rect x={x} y={y} width={98} height={100} rx={8} fill="var(--surface-2)" />
            <rect x={x + 8} y={y + 8} width={82} height={52} rx={6} fill="var(--bg)" />
            {p.shape === "circle" && <circle cx={cx} cy={cy} r={16} fill={p.c} />}
            {p.shape === "rect" && <rect x={cx - 15} y={cy - 15} width={30} height={30} rx={6} fill={p.c} transform={`rotate(12 ${cx} ${cy})`} />}
            {p.shape === "tri" && <path d={`M${cx} ${cy - 17} L${cx + 17} ${cy + 13} L${cx - 17} ${cy + 13} Z`} fill={p.c} />}
            <rect x={x + 8} y={y + 68} width={50} height={6} rx={3} fill="var(--border-strong)" />
            <Label x={x + 8} y={y + 90} fill="var(--fg)" size={9} weight={700}>
              £{[48, 32, 64, 29][i]}
            </Label>
            {i === 1 && (
              <g className={q(1)}>
                <rect x={x + 44} y={y + 80} width={46} height={16} rx={8} fill={PURPLE} />
                <Label x={x + 67} y={y + 91} anchor="middle" fill="#fff" size={7.5} weight={700}>
                  Added ✓
                </Label>
              </g>
            )}
          </g>
        );
      })}

      {/* conversion chart */}
      <Panel x={264} y={20} w={116} h={150} />
      <Label x={276} y={40}>
        Conversion
      </Label>
      <Label x={368} y={40} anchor="end" fill="var(--accent-text)" weight={700}>
        ↑
      </Label>
      {bars.map((h, i) => (
        <rect key={i} x={278 + i * 19} y={156 - h} width={12} height={h} rx={3} fill={i === bars.length - 1 ? YELLOW : "var(--accent-text)"} opacity={i === bars.length - 1 ? 1 : 0.35 + i * 0.12} className="ind-grow" style={d(`${i * 0.15}s`)} />
      ))}

      {/* support agent */}
      <Panel x={264} y={182} w={116} h={98} />
      <Label x={276} y={200} fill="var(--fg)" size={8.5} weight={600} mono={false}>
        Support agent
      </Label>
      <g className={q(1)}>
        <rect x={274} y={208} width={90} height={22} rx={7} fill="var(--surface-2)" />
        <Label x={281} y={222} fill="var(--fg)" size={7.5} mono={false}>
          Where&apos;s my order?
        </Label>
      </g>
      <g className={q(3)}>
        <rect x={284} y={236} width={88} height={34} rx={7} fill={PURPLE} />
        <Label x={291} y={250} fill="#fff" size={7.5} mono={false}>
          Out for delivery,
        </Label>
        <Label x={291} y={262} fill="#fff" size={7.5} mono={false}>
          arriving by 2pm ✓
        </Label>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Logistics() {
  const route = "M60 240 V160 H180 V90 H330";
  return (
    <>
      <Panel x={20} y={20} w={360} h={260} />
      {/* streets */}
      <g stroke="var(--surface-2)" strokeWidth={12} strokeLinecap="round">
        <path d="M60 40 V262 M180 40 V262 M330 40 V262 M36 90 H364 M36 160 H364 M36 240 H364" />
      </g>
      <g stroke="var(--border)" strokeWidth={1} strokeDasharray="3 5">
        <path d="M120 40 V262 M255 40 V262 M36 200 H364" />
      </g>
      {/* route */}
      <path d={route} stroke="var(--accent-text)" strokeWidth={3} strokeLinejoin="round" className="ind-dash" />

      {/* depot */}
      <rect x={44} y={226} width={32} height={28} rx={5} fill={PURPLE} />
      <path d="M50 240 l10 -8 l10 8 v10 h-20 z" fill="#fff" opacity={0.9} />
      <Label x={84} y={262} size={8}>
        Depot
      </Label>

      {/* stops */}
      {[
        { x: 180, y: 160, cls: "ind-stop-a", n: "Stop 1" },
        { x: 330, y: 90, cls: "ind-stop-b", n: "Stop 2" },
      ].map((s) => (
        <g key={s.n}>
          <circle cx={s.x} cy={s.y} r={10} fill="var(--bg)" stroke="var(--accent-text)" strokeWidth={2} />
          <g className={s.cls} style={{ transformOrigin: `${s.x}px ${s.y}px` }}>
            <circle cx={s.x} cy={s.y} r={10} fill={YELLOW} />
            <path d={`M${s.x - 4} ${s.y} l3 3 l6 -6`} stroke="#131116" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <Label x={s.x + 16} y={s.y + 20} size={8}>
            {s.n}
          </Label>
        </g>
      ))}

      {/* truck */}
      <g className="ind-truck">
        <circle r={16} fill="var(--accent-soft)" className="ind-ping" style={{ transformOrigin: "0 0" }} />
        <rect x={-11} y={-7} width={16} height={14} rx={2} fill={YELLOW} />
        <rect x={5} y={-4} width={7} height={11} rx={2} fill="#131116" />
      </g>

      {/* ETA */}
      <g className="ind-float">
        <rect x={228} y={120} width={140} height={46} rx={9} fill="var(--surface)" stroke="var(--border-strong)" />
        <Label x={240} y={140} fill="var(--fg)" size={12} weight={700} mono={false}>
          ETA 14:32
        </Label>
        <Label x={240} y={156} size={8}>
          on time · 2 stops
        </Label>
        <Live x={354} y={136} />
      </g>

      {/* document agent */}
      <g className={q(1)}>
        <rect x={210} y={200} width={158} height={46} rx={9} fill="var(--surface)" stroke="var(--border-strong)" />
        <rect x={220} y={210} width={20} height={26} rx={3} fill="var(--accent-soft)" />
        <path d="M224 218 h12 M224 223 h12 M224 228 h8" stroke="var(--accent-text)" strokeWidth={1.4} />
        <Label x={248} y={221} fill="var(--fg)" size={8.5} weight={600} mono={false}>
          Bill of lading
        </Label>
        <Label x={248} y={234} size={7.5} fill="var(--accent-text)">
          read by agent ✓
        </Label>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hospitality() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  return (
    <>
      {/* flight arc */}
      <path d="M40 107 A110 110 0 0 1 220 107" stroke="var(--border-strong)" strokeWidth={1.5} strokeDasharray="4 5" />
      <circle cx={40} cy={107} r={5} fill="var(--accent-text)" />
      <circle cx={220} cy={107} r={5} fill={YELLOW} />
      <Label x={40} y={124} anchor="middle" size={8}>
        LHR
      </Label>
      <Label x={220} y={124} anchor="middle" size={8}>
        DXB
      </Label>
      <g className="ind-arc" style={{ transformOrigin: "130px 170px" }}>
        <path d="M122 54 L140 60 L122 66 L126 60 Z" fill="var(--fg)" />
      </g>
      <g className={q(1)}>
        <rect x={20} y={20} width={128} height={26} rx={13} fill={PURPLE} />
        <Label x={84} y={36.5} anchor="middle" fill="#fff" size={8.5} weight={600} mono={false}>
          Booked direct · no OTA fee
        </Label>
      </g>

      {/* calendar */}
      <Panel x={20} y={136} w={180} h={144} />
      <Label x={34} y={156} fill="var(--fg)" size={9.5} weight={600} mono={false}>
        May · Villa 3
      </Label>
      {days.map((n, i) => {
        const x = 32 + (i % 7) * 23.5;
        const y = 166 + Math.floor(i / 7) * 26;
        return (
          <g key={n}>
            <rect x={x} y={y} width={20} height={20} rx={4} fill="var(--surface-2)" />
            <Label x={x + 10} y={y + 13.5} anchor="middle" size={7} fill="var(--muted)">
              {n}
            </Label>
          </g>
        );
      })}
      <rect x={32 + 2 * 23.5} y={192} width={4 * 23.5 - 3.5} height={20} rx={4} fill={YELLOW} className="ind-sweep" style={{ transformOrigin: `${32 + 2 * 23.5}px 202px` }} />
      <g className="ind-sweep-label">
        <Label x={125} y={206} anchor="middle" size={8} fill="#131116" weight={700}>
          4 nights
        </Label>
      </g>

      {/* concierge */}
      <Panel x={214} y={136} w={166} h={144} />
      <Label x={228} y={156} fill="var(--fg)" size={9.5} weight={600} mono={false}>
        Concierge · 24/7
      </Label>
      <Live x={366} y={153} />
      <g className={q(0)}>
        <rect x={224} y={166} width={112} height={22} rx={7} fill="var(--surface-2)" />
        <Label x={231} y={180} fill="var(--fg)" size={8} mono={false}>
          Late check-in tonight?
        </Label>
      </g>
      <g className={q(2)}>
        <rect x={240} y={194} width={130} height={34} rx={7} fill={PURPLE} />
        <Label x={248} y={208} fill="#fff" size={8} mono={false}>
          Arranged for 23:00.
        </Label>
        <Label x={248} y={220} fill="rgb(255 255 255 / 0.85)" size={8} mono={false}>
          Your key is on your phone.
        </Label>
      </g>
      <g className={q(4)}>
        <rect x={224} y={236} width={104} height={22} rx={7} fill="var(--surface-2)" />
        <Label x={231} y={250} fill="var(--fg)" size={8} mono={false}>
          Dinner for two?
        </Label>
      </g>
      <g className={q(6)}>
        <rect x={300} y={262} width={70} height={12} rx={6} fill="var(--accent-soft)" />
        <Label x={335} y={271} anchor="middle" size={7} fill="var(--accent-text)" weight={700}>
          20:30 booked ✓
        </Label>
      </g>

      {/* rating */}
      <g className="ind-float">
        <rect x={262} y={38} width={118} height={58} rx={10} fill="var(--surface)" stroke="var(--border-strong)" />
        <Label x={274} y={58} size={8}>
          Guest rating
        </Label>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${280 + i * 19} 66 l3 6 l6.5 1 l-4.8 4.5 l1.2 6.5 l-5.9 -3.1 l-5.9 3.1 l1.2 -6.5 l-4.8 -4.5 l6.5 -1 z`} fill={YELLOW} className="ind-star" style={d(`${i * 0.15}s`)} />
        ))}
      </g>
    </>
  );
}

const scenes: Record<SectorSlug, { label: string; chrome: string; Scene: () => React.ReactNode }> = {
  "fintech-insurance": { label: "Animated fintech dashboard: a payment card, a risk gauge and a live ledger of matched transactions.", chrome: "ops / reconciliation", Scene: Fintech },
  healthcare: { label: "Animated clinic dashboard: a heartbeat line, booking slots and a patient agent rescheduling an appointment on WhatsApp.", chrome: "clinic / patient-agent", Scene: Healthcare },
  "real-estate": { label: "Animated city skyline with lit windows, map pins, a new lead replied to in seconds and a qualified viewing.", chrome: "proptech / leads", Scene: RealEstate },
  "ecommerce-retail": { label: "Animated storefront: products, a cart counter going up, a conversion chart and a support agent answering an order question.", chrome: "store / checkout", Scene: Ecommerce },
  logistics: { label: "Animated delivery map: a van driving its route between stops, a live ETA and a bill of lading read by an agent.", chrome: "fleet / live-tracking", Scene: Logistics },
  "hospitality-travel": { label: "Animated hospitality dashboard: a flight arc, a booked calendar range and a concierge agent arranging late check-in and dinner.", chrome: "hotel / concierge", Scene: Hospitality },
};

/**
 * `size="hero"` adds window chrome and a glow for the page header;
 * `size="tile"` is the bare scene for cards.
 */
export function SectorVisual({ sector, size = "tile", className = "" }: { sector: SectorSlug; size?: "hero" | "tile"; className?: string }) {
  const { label, chrome, Scene } = scenes[sector];
  const svg = (
    <svg viewBox="0 0 400 300" className="ind-anim block h-auto w-full" fill="none" role="img" aria-label={label}>
      <Scene />
    </svg>
  );

  if (size === "tile") return <div className={className}>{svg}</div>;

  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-purple/20 blur-3xl" />
      <div data-tilt className="overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#f43f5e]/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-yellow/80" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-[#34d399]/70" aria-hidden="true" />
          <span className="ml-2 truncate font-mono text-[11px] text-subtle">vaug://{chrome}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-text">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-text" aria-hidden="true" />
            Live
          </span>
        </div>
        <div className="bg-[radial-gradient(var(--border)_1px,transparent_1px)] p-3 [background-size:16px_16px] sm:p-4">{svg}</div>
        <div className="flex justify-end border-t border-border px-4 py-2">
          <IllustrativeTag />
        </div>
      </div>
    </div>
  );
}
