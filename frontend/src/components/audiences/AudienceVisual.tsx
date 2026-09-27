import type { AudienceSlug } from "@/content/types";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

/*
 * Bespoke animated scenes, one per audience (SVG, viewBox 400×300).
 * Shares the `.ind-*` motion classes with the industry scenes and adds a few
 * `.aud-*` ones. Everything stops under prefers-reduced-motion.
 */

type Vars = React.CSSProperties & Record<`--${string}`, string>;
const d = (delay: string): Vars => ({ "--d": delay });
/** Build-up slot: items arrive one after another and leave together (see `.ind-q-*` in globals.css). */
const q = (slot: number) => `ind-q ind-q-${slot}`;

const MONO = "var(--font-code), ui-monospace, monospace";
const PURPLE = "#7c3aed";
const YELLOW = "#ffd23f";

function T({ x, y, children, size = 9, fill = "var(--muted)", weight, anchor, mono = false }: { x: number; y: number; children: React.ReactNode; size?: number; fill?: string; weight?: number; anchor?: "start" | "middle" | "end"; mono?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} fontWeight={weight} textAnchor={anchor} fontFamily={mono ? MONO : undefined}>
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */

function Startups() {
  const curve = "M40 250 C90 246 112 232 140 220 S204 186 240 150 S312 78 350 58";
  const miles = [
    { x: 40, y: 250, l: "Idea", w: "wk 0" },
    { x: 140, y: 220, l: "MVP", w: "wk 2–8" },
    { x: 240, y: 150, l: "Launch", w: "wk 10" },
    { x: 350, y: 58, l: "Growth", w: "ongoing" },
  ];
  return (
    <>
      {/* grid */}
      <g stroke="var(--border)" strokeWidth={1}>
        {[70, 120, 170, 220].map((y) => (
          <line key={y} x1={24} y1={y} x2={384} y2={y} strokeDasharray="2 6" />
        ))}
      </g>
      <line x1={24} y1={270} x2={384} y2={270} stroke="var(--border-strong)" />
      <path d={`${curve} V270 H40 Z`} fill="var(--accent-soft)" />
      <path d={curve} stroke="var(--border-strong)" strokeWidth={2} />
      <path d={curve} stroke="var(--accent-text)" strokeWidth={3} strokeLinecap="round" pathLength={1} className="aud-grow-line" />
      {miles.map((m, i) => (
        <g key={m.l}>
          <circle cx={m.x} cy={m.y} r={9} fill="var(--bg)" stroke="var(--accent-text)" strokeWidth={2} />
          <circle cx={m.x} cy={m.y} r={9} fill={YELLOW} className="aud-milestone" style={{ ...d(`${i * 0.9}s`), transformOrigin: `${m.x}px ${m.y}px` }} />
          <T x={m.x + (i === 3 ? -14 : 14)} y={m.y + (i === 3 ? 38 : -14)} anchor={i === 3 ? "end" : "start"} fill="var(--fg)" size={10} weight={700}>
            {m.l}
          </T>
          <T x={m.x + (i === 3 ? -14 : 14)} y={m.y + (i === 3 ? 50 : -2)} anchor={i === 3 ? "end" : "start"} size={8} mono>
            {m.w}
          </T>
        </g>
      ))}
      {/* rocket */}
      <g className="ind-float">
        <g transform="translate(350 58) rotate(35)">
          <path d="M0 -22 C8 -14 8 0 5 8 H-5 C-8 0 -8 -14 0 -22 Z" fill="var(--fg)" />
          <circle cx={0} cy={-8} r={3} fill={PURPLE} />
          <path d="M-5 2 L-10 10 L-5 8 Z M5 2 L10 10 L5 8 Z" fill="var(--accent-text)" />
          <path d="M-3 9 Q0 22 3 9 Z" fill={YELLOW} className="aud-flame" />
        </g>
      </g>
      {/* status chip */}
      <g className={q(1)}>
        <rect x={24} y={22} width={150} height={28} rx={14} fill={PURPLE} />
        <circle cx={40} cy={36} r={4} fill={YELLOW} />
        <T x={52} y={39.5} fill="#fff" size={9} weight={600}>
          MVP live · first users in
        </T>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hnis() {
  const rows = [
    { l: "Brand & identity", w: 60 },
    { l: "Website & booking", w: 72 },
    { l: "Google listings", w: 48 },
    { l: "Monthly report", w: 64 },
  ];
  return (
    <>
      {/* back sheet */}
      <rect x={112} y={34} width={220} height={236} rx={14} fill="var(--surface-2)" transform="rotate(6 222 152)" />
      <g className="ind-float">
        <rect x={84} y={26} width={232} height={244} rx={14} fill="var(--bg)" stroke="var(--border-strong)" />
        {/* crown */}
        <path d="M104 62 l6 -16 l9 10 l9 -14 l9 14 l9 -10 l6 16 z" fill={YELLOW} />
        <T x={104} y={84} fill="var(--fg)" size={14} weight={700}>
          Project Atlas
        </T>
        <rect x={104} y={92} width={78} height={16} rx={8} fill={YELLOW} />
        <T x={143} y={103.5} anchor="middle" fill="#131116" size={7.5} weight={800} mono>
          PRIVATE · NDA
        </T>
        {/* redacted lines */}
        {[0, 1].map((i) => (
          <rect key={i} x={104} y={118 + i * 11} width={i ? 120 : 180} height={6} rx={3} fill="var(--fg)" opacity={0.8} className="aud-redact" style={d(`${i * 0.4}s`)} />
        ))}
        {rows.map((r, i) => {
          const y = 152 + i * 24;
          return (
            <g key={r.l} className={q(1 + i * 2)}>
              <circle cx={112} cy={y} r={8} fill="var(--accent-soft)" />
              <path d={`M108 ${y} l3 3 l5 -6`} stroke="var(--accent-text)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              <T x={126} y={y + 3.5} fill="var(--fg)" size={9}>
                {r.l}
              </T>
              <rect x={226} y={y - 3} width={r.w} height={6} rx={3} fill="var(--surface-2)" />
            </g>
          );
        })}
      </g>
      {/* lock */}
      <g transform="translate(318 30)">
        <circle cx={0} cy={14} r={30} fill={PURPLE} />
        <g className="aud-shackle">
          <path d="M-8 10 V2 a8 8 0 0 1 16 0 V10" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
        <rect x={-12} y={8} width={24} height={20} rx={4} fill="#fff" />
        <circle cx={0} cy={17} r={2.5} fill={PURPLE} />
      </g>
      {/* single contact */}
      <g className={q(9)}>
        <rect x={20} y={232} width={150} height={40} rx={20} fill="var(--surface)" stroke="var(--border-strong)" />
        <circle cx={40} cy={252} r={12} fill="var(--accent-soft)" />
        <circle cx={40} cy={248} r={4} fill="var(--accent-text)" />
        <path d="M32 259 a8 6 0 0 1 16 0" fill="var(--accent-text)" />
        <T x={60} y={249} fill="var(--fg)" size={9} weight={600}>
          Your lead
        </T>
        <T x={60} y={262} size={8} mono>
          one direct line
        </T>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Enterprises() {
  const systems = ["ERP", "CRM", "Data lake", "HR"];
  const outs = ["Finance", "Operations", "Support"];
  const hub = { x: 160, y: 108, w: 90, h: 84 };
  return (
    <>
      {systems.map((s, i) => {
        const y = 34 + i * 62;
        const path = `M110 ${y + 18} C135 ${y + 18} 135 150 ${hub.x} 150`;
        return (
          <g key={s}>
            <path d={path} stroke="var(--border-strong)" strokeWidth={1.5} />
            <path d={path} stroke="var(--accent-text)" strokeWidth={2} className="ind-dash" style={d(`${i * 0.3}s`)} />
            <rect x={20} y={y} width={90} height={36} rx={8} fill="var(--bg)" stroke="var(--border-strong)" />
            <rect x={30} y={y + 11} width={14} height={14} rx={3} fill="var(--surface-2)" />
            <T x={52} y={y + 22} fill="var(--fg)" size={9.5} weight={600}>
              {s}
            </T>
          </g>
        );
      })}
      {outs.map((o, i) => {
        const y = 56 + i * 70;
        const path = `M${hub.x + hub.w} 150 C272 150 272 ${y + 20} 290 ${y + 20}`;
        return (
          <g key={o}>
            <path d={path} stroke="var(--border-strong)" strokeWidth={1.5} />
            <path d={path} stroke={YELLOW} strokeWidth={2} className="ind-dash" style={d(`${i * 0.4}s`)} />
            <rect x={290} y={y} width={96} height={40} rx={8} fill="var(--bg)" stroke="var(--border-strong)" />
            <T x={301} y={y + 17} fill="var(--fg)" size={9.5} weight={600}>
              {o}
            </T>
            <T x={301} y={y + 30} size={7.5} fill="var(--accent-text)" mono>
              {["faster month-end", "auto-routed", "24/7 answers"][i]}
            </T>
          </g>
        );
      })}
      {/* hub */}
      <rect x={hub.x - 8} y={hub.y - 8} width={hub.w + 16} height={hub.h + 16} rx={18} fill="none" stroke={PURPLE} strokeWidth={2} className="ind-ping" style={{ transformOrigin: "205px 150px" }} />
      <rect x={hub.x} y={hub.y} width={hub.w} height={hub.h} rx={14} fill={PURPLE} />
      <T x={205} y={140} anchor="middle" fill="#fff" size={11} weight={700}>
        Agent layer
      </T>
      <T x={205} y={155} anchor="middle" fill="rgb(255 255 255 / 0.75)" size={7.5} mono>
        SSO · RBAC
      </T>
      <T x={205} y={167} anchor="middle" fill="rgb(255 255 255 / 0.75)" size={7.5} mono>
        audit log
      </T>
      <g className={q(1)}>
        <rect x={140} y={222} width={130} height={26} rx={13} fill="var(--surface)" stroke="var(--border-strong)" />
        <circle cx={156} cy={235} r={4} fill="#34d399" />
        <T x={166} y={238.5} fill="var(--fg)" size={8.5} weight={600}>
          Security review passed
        </T>
      </g>
      <g className={q(3)}>
        <rect x={148} y={256} width={114} height={24} rx={12} fill="var(--accent-soft)" />
        <T x={205} y={271.5} anchor="middle" fill="var(--accent-text)" size={8} weight={700} mono>
          pilot → scale
        </T>
      </g>
      <g className={q(0)}>
        <rect x={140} y={32} width={130} height={26} rx={13} fill={YELLOW} />
        <T x={205} y={49} anchor="middle" fill="#131116" size={8.5} weight={700}>
          Data stays in-region
        </T>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Agencies() {
  return (
    <>
      {/* VAUG layer underneath */}
      <g transform="rotate(-4 250 150)">
        <rect x={140} y={62} width={230} height={176} rx={14} fill="var(--surface-2)" stroke="var(--border-strong)" strokeDasharray="4 5" />
        <T x={156} y={226} size={8} mono>
          engineering · VAUG (hidden)
        </T>
      </g>
      {/* your brand on top */}
      <g className="aud-card">
        <rect x={40} y={34} width={240} height={180} rx={14} fill="var(--bg)" stroke="var(--border-strong)" />
        <rect x={40} y={34} width={240} height={34} rx={14} fill="var(--surface)" />
        <rect x={40} y={56} width={240} height={12} fill="var(--surface)" />
        <rect x={54} y={43} width={16} height={16} rx={4} fill={YELLOW} />
        <T x={78} y={55} fill="var(--fg)" size={10} weight={800}>
          YOUR STUDIO
        </T>
        <T x={266} y={55} anchor="end" size={8} mono>
          client portal v2
        </T>
        <rect x={56} y={84} width={120} height={10} rx={5} fill="var(--fg)" opacity={0.85} />
        <rect x={56} y={100} width={90} height={10} rx={5} fill="var(--fg)" opacity={0.5} />
        <rect x={56} y={120} width={150} height={6} rx={3} fill="var(--border-strong)" />
        <rect x={56} y={131} width={130} height={6} rx={3} fill="var(--border-strong)" />
        <rect x={56} y={150} width={70} height={22} rx={6} fill={PURPLE} />
        <T x={91} y={164.5} anchor="middle" fill="#fff" size={8} weight={700}>
          Get started
        </T>
        <rect x={196} y={82} width={68} height={92} rx={10} fill="var(--accent-soft)" />
        <circle cx={230} cy={116} r={18} fill={YELLOW} className="ind-float" />
        <rect x={210} y={146} width={40} height={6} rx={3} fill="var(--accent-text)" opacity={0.6} />
        <T x={56} y={200} size={8} mono>
          delivered by Your Studio ✓
        </T>
      </g>
      {/* white-label toggle */}
      <g>
        <rect x={40} y={238} width={170} height={36} rx={18} fill="var(--surface)" stroke="var(--border-strong)" />
        <rect x={52} y={247} width={36} height={18} rx={9} fill={PURPLE} />
        <circle cx={79} cy={256} r={7} fill="#fff" className="aud-toggle" />
        <T x={98} y={259.5} fill="var(--fg)" size={9} weight={600}>
          White-label: on
        </T>
      </g>
      {/* chips */}
      <g className={q(1)}>
        <rect x={250} y={242} width={128} height={26} rx={13} fill="var(--accent-soft)" />
        <T x={314} y={258.5} anchor="middle" fill="var(--accent-text)" size={8.5} weight={700}>
          NDA signed ✓
        </T>
      </g>
      <g className={q(3)}>
        <rect x={286} y={20} width={98} height={26} rx={13} fill={YELLOW} />
        <T x={335} y={36.5} anchor="middle" fill="#131116" size={8.5} weight={700}>
          Client demo · Fri
        </T>
      </g>
    </>
  );
}

const scenes: Record<AudienceSlug, { label: string; chrome: string; Scene: () => React.ReactNode }> = {
  startups: { label: "Animated growth curve rising from idea to MVP, launch and growth, with a rocket at the top.", chrome: "founder / roadmap", Scene: Startups },
  "hnis-family-offices": { label: "Animated private project dossier marked NDA, with brand, website, listings and report ticked off and a single named lead.", chrome: "private / project-atlas", Scene: Hnis },
  enterprises: { label: "Animated architecture: ERP, CRM, data and HR systems flowing through a secure agent layer to finance, operations and support.", chrome: "enterprise / agent-layer", Scene: Enterprises },
  agencies: { label: "Animated white-label product: a client portal branded as your studio sitting over hidden VAUG engineering, with an NDA signed.", chrome: "partner / white-label", Scene: Agencies },
};

export function AudienceVisual({ audience, size = "tile", className = "" }: { audience: AudienceSlug; size?: "hero" | "tile"; className?: string }) {
  const { label, chrome, Scene } = scenes[audience];
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
        </div>
        <div className="bg-[radial-gradient(var(--border)_1px,transparent_1px)] p-3 [background-size:16px_16px] sm:p-4">{svg}</div>
        <div className="flex justify-end border-t border-border px-4 py-2">
          <IllustrativeTag />
        </div>
      </div>
    </div>
  );
}
