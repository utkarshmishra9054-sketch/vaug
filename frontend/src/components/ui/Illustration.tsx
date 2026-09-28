import type { IllustrationName } from "@/content/types";

/*
 * Original isometric line illustrations for the engagement models.
 *
 * Everything is placed in a small 3D "world" (x, y on the floor, z up) and
 * projected with P(). Strokes use pathLength=1 so `.draw` can draw them in on
 * scroll; `.ill-*` classes add continuous motion afterwards. Neutral strokes
 * use currentColor, highlights use the band accent.
 */

type V3 = [number, number, number];

const OX = 200;
const OY = 178;
/** Isometric projection of a world point to screen coordinates. */
const P = ([x, y, z]: V3): [number, number] => [OX + (x - y) * 0.866, OY + (x + y) * 0.5 - z];
const pt = (v: V3) => P(v).map((n) => n.toFixed(1)).join(",");
const poly = (...vs: V3[]) => `M${vs.map(pt).join(" L")} Z`;
const line = (...vs: V3[]) => `M${vs.map(pt).join(" L")}`;

const ACCENT = "text-accent-text";

function Path({ d, className, fill }: { d: string; className?: string; fill?: string }) {
  return <path pathLength={1} d={d} className={className} fill={fill ?? "none"} />;
}

/** Box centred on (cx, cy) standing on z. Draws top face and the three front edges. */
function Box({ c, w, d, h, accent, fillTop }: { c: V3; w: number; d: number; h: number; accent?: boolean; fillTop?: boolean }) {
  const [cx, cy, z] = c;
  const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - d / 2, y1 = cy + d / 2;
  const t = z + h;
  return (
    <g className={accent ? ACCENT : undefined}>
      <Path d={poly([x0, y0, t], [x1, y0, t], [x1, y1, t], [x0, y1, t])} fill={fillTop ? "var(--accent-soft)" : undefined} />
      <Path d={`${line([x1, y0, t], [x1, y0, z], [x1, y1, z], [x0, y1, z], [x0, y1, t])} ${line([x1, y1, t], [x1, y1, z])}`} />
    </g>
  );
}

/** Vertical panel facing the viewer's left (constant y), spanning x0..x1 and z0..z1. */
function PanelY({ y, x0, x1, z0, z1, accent, fill }: { y: number; x0: number; x1: number; z0: number; z1: number; accent?: boolean; fill?: boolean }) {
  return (
    <Path
      className={accent ? ACCENT : undefined}
      fill={fill ? "var(--bg)" : undefined}
      d={poly([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1])}
    />
  );
}

/** Line drawn on a constant-y panel using panel coordinates (u along x, v up). */
const onY = (y: number, x0: number, z0: number) => (u0: number, v0: number, u1: number, v1: number) =>
  line([x0 + u0, y, z0 + v0], [x0 + u1, y, z0 + v1]);

/** Floor grid around the scene. */
function Floor({ size = 120, step = 24 }: { size?: number; step?: number }) {
  const lines: string[] = [];
  for (let i = -size; i <= size; i += step) {
    lines.push(line([i, -size, 0], [i, size, 0]));
    lines.push(line([-size, i, 0], [size, i, 0]));
  }
  return <path d={lines.join(" ")} className="ill-grid" fill="none" />;
}

/** Ellipse of an isometric circle of radius r lying flat at c. */
function FlatCircle({ c, r, className }: { c: V3; r: number; className?: string }) {
  const [x, y] = P(c);
  return <ellipse pathLength={1} cx={x} cy={y} rx={r * 1.2247} ry={r * 0.7071} className={className} fill="none" />;
}

/** A small dot travelling along a screen-space path forever. */
function Traveller({ d, dur = 3, delay = 0 }: { d: string; dur?: number; delay?: number }) {
  return (
    <circle r={3.2} className="ill-motion fill-current text-accent-text" stroke="none">
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
    </circle>
  );
}

function Sparkle({ x, y, s = 6, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <path
      pathLength={1}
      className="ill-blink text-accent-text"
      style={{ animationDelay: `${delay}s` }}
      d={`M${x},${y - s} L${x},${y + s} M${x - s},${y} L${x + s},${y}`}
    />
  );
}

/* ---------------------------------------------------------------- scenes */

function Agents() {
  const sats: V3[] = [[-92, 0, 0], [0, -92, 0], [92, 0, 0], [0, 92, 0]];
  const [cx, cy] = P([0, 0, 64]);
  return (
    <>
      <Floor />
      {/* connectors + data flowing to the core */}
      {sats.map(([x, y], i) => {
        const from: V3 = [x * 0.28, y * 0.28, 5];
        const to: V3 = [x * 0.8, y * 0.8, 5];
        const d = line(to, from);
        return (
          <g key={i}>
            <Path d={d} />
            <Traveller d={d} dur={2.4} delay={i * 0.6} />
          </g>
        );
      })}
      <Box c={[0, 0, 0]} w={96} d={96} h={6} fillTop />
      <FlatCircle c={[0, 0, 6]} r={62} className="ill-pulse text-accent-text" />
      <Box c={[0, 0, 6]} w={46} d={46} h={52} accent />
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-current text-accent-text" stroke="none" style={{ font: "600 15px var(--font-code)" }}>
        AI
      </text>

      {/* satellites */}
      {sats.map((c, i) => (
        <Box key={i} c={c} w={40} d={40} h={5} />
      ))}
      {/* database */}
      <g>
        {(() => {
          const [x, y] = P([-92, 0, 44]);
          const [, yb] = P([-92, 0, 10]);
          return (
            <>
              <ellipse pathLength={1} cx={x} cy={y} rx={17} ry={8} fill="none" />
              <Path d={`M${x - 17},${y} V${yb} A17,8 0 0 0 ${x + 17},${yb} V${y}`} />
              <Path d={`M${x - 17},${(y + yb) / 2} A17,8 0 0 0 ${x + 17},${(y + yb) / 2}`} className={ACCENT} />
            </>
          );
        })()}
      </g>
      {/* chat bubble, floating */}
      <g className="ill-float">
        {(() => {
          const [x, y] = P([0, -92, 48]);
          return (
            <>
              <Path d={`M${x - 24},${y - 16} h48 a6,6 0 0 1 6,6 v18 a6,6 0 0 1 -6,6 h-26 l-10,9 v-9 h-12 a6,6 0 0 1 -6,-6 v-18 a6,6 0 0 1 6,-6 Z`} fill="var(--bg)" />
              <Path d={`M${x - 16},${y - 6} h32 M${x - 16},${y + 3} h20`} className={ACCENT} />
            </>
          );
        })()}
      </g>
      {/* document panel */}
      <PanelY y={0} x0={78} x1={106} z0={6} z1={48} fill />
      <Path d={[onY(0, 78, 6)(5, 34, 22, 34), onY(0, 78, 6)(5, 26, 22, 26), onY(0, 78, 6)(5, 18, 16, 18)].join(" ")} className={ACCENT} />
      {/* globe */}
      {(() => {
        const [x, y] = P([0, 92, 30]);
        return (
          <g>
            <circle pathLength={1} cx={x} cy={y} r={18} fill="none" />
            <ellipse pathLength={1} cx={x} cy={y} rx={8} ry={18} fill="none" className="ill-turn text-accent-text" />
            <Path d={`M${x - 18},${y} H${x + 18}`} />
          </g>
        );
      })()}
      <Sparkle x={330} y={70} delay={0.2} />
      <Sparkle x={70} y={250} s={5} delay={1} />
      <Sparkle x={250} y={40} s={4} delay={0.6} />
    </>
  );
}

function Developers() {
  const deskZ = 46;
  const mons = [-54, 0, 54];
  return (
    <>
      <Floor />
      {/* desk */}
      <Box c={[0, 12, deskZ]} w={176} d={64} h={6} fillTop />
      <Path d={[line([-84, 40, deskZ], [-84, 40, 0]), line([84, 40, deskZ], [84, 40, 0]), line([84, -16, deskZ], [84, -16, 0])].join(" ")} />
      {/* monitors */}
      {mons.map((x, i) => {
        const x0 = x - 22;
        const z0 = deskZ + 6 + 14;
        const on = onY(-6, x0, z0);
        return (
          <g key={x} className={i === 1 ? ACCENT : undefined}>
            <Path d={line([x, -6, deskZ + 6], [x, -6, z0])} />
            <Path d={line([x - 8, -2, deskZ + 6], [x + 8, -2, deskZ + 6])} />
            <PanelY y={-6} x0={x0} x1={x0 + 44} z0={z0} z1={z0 + 32} fill />
            <Path d={[on(5, 25, 20, 25), on(9, 18, 32, 18), on(9, 11, 26, 11), on(5, 4, 16, 4)].join(" ")} />
            <path d={on(34, 4, 38, 4)} pathLength={1} className="ill-blink text-accent-text" strokeWidth={3} style={{ animationDelay: `${i * 0.35}s` }} />
          </g>
        );
      })}
      {/* mug */}
      {(() => {
        const [x, y] = P([66, 30, deskZ + 22]);
        const [, yb] = P([66, 30, deskZ + 6]);
        return (
          <g>
            <ellipse pathLength={1} cx={x} cy={y} rx={8} ry={4} fill="none" />
            <Path d={`M${x - 8},${y} V${yb} A8,4 0 0 0 ${x + 8},${yb} V${y} M${x + 8},${y + 4} a5,5 0 0 1 0,10`} />
            <Path d={`M${x - 3},${y - 8} q3,-5 0,-10 M${x + 3},${y - 8} q3,-5 0,-10`} className="ill-steam text-accent-text" />
          </g>
        );
      })()}
      {/* commits rising */}
      {[0, 1, 2].map((i) => {
        const [x, y] = P([mons[i], -6, 118]);
        return (
          <g key={i} className="ill-rise text-accent-text" style={{ animationDelay: `${i * 1.1}s` }}>
            <rect pathLength={1} x={x - 16} y={y - 9} width={32} height={18} rx={9} fill="var(--bg)" />
            <Path d={`M${x - 6},${y} l4,4 l8,-8`} />
          </g>
        );
      })}
      {/* branch graph */}
      <g>
        <Path d="M352,70 V250" />
        <Path d="M352,120 C372,130 372,170 352,180" className={ACCENT} />
        {[70, 120, 180, 250].map((y) => (
          <circle key={y} pathLength={1} cx={352} cy={y} r={5} fill="var(--bg)" />
        ))}
        <Traveller d="M352,70 V250" dur={3.4} />
      </g>
    </>
  );
}

function Gear({ x, y, r, teeth = 8 }: { x: number; y: number; r: number; teeth?: number }) {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.78;
    const a2 = a + Math.PI / (teeth * 2);
    pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`);
    pts.push(`${(x + Math.cos(a2) * rr).toFixed(1)},${(y + Math.sin(a2) * rr).toFixed(1)}`);
  }
  return (
    <g className="ill-spin">
      <Path d={`M${pts.join(" L")} Z`} fill="var(--bg)" />
      <circle pathLength={1} cx={x} cy={y} r={r * 0.32} fill="none" className={ACCENT} />
    </g>
  );
}

function Custom() {
  const on = onY(-40, -104, 22);
  return (
    <>
      <Floor />
      {/* browser window */}
      <PanelY y={-40} x0={-104} x1={30} z0={22} z1={128} fill />
      <Path d={on(0, 92, 134, 92)} />
      {[8, 16, 24].map((u) => (
        <Path key={u} d={on(u, 99, u + 2, 99)} />
      ))}
      <Path d={[on(40, 70, 26, 56), on(26, 56, 40, 42)].join(" ")} className={ACCENT} />
      <Path d={[on(94, 70, 108, 56), on(108, 56, 94, 42)].join(" ")} className={ACCENT} />
      <Path d={on(58, 36, 76, 76)} className={ACCENT} />
      <Path d={[on(10, 24, 70, 24), on(10, 14, 50, 14)].join(" ")} />
      <path d={on(54, 14, 58, 14)} pathLength={1} strokeWidth={3} className="ill-blink text-accent-text" />
      {/* blocks being assembled */}
      <Box c={[64, 46, 0]} w={34} d={34} h={24} />
      <Box c={[64, 46, 24]} w={34} d={34} h={24} accent />
      <g className="ill-float" style={{ animationDuration: "3.2s" }}>
        <Box c={[64, 46, 60]} w={34} d={34} h={24} />
      </g>
      <Path d={line([64, 46, 58], [64, 46, 50])} className={ACCENT} />
      <Gear x={330} y={72} r={22} />
      <Gear x={296} y={104} r={13} teeth={6} />
      <Sparkle x={60} y={60} delay={0.4} />
    </>
  );
}

function Venture() {
  const [px, py] = P([-30, 30, 8]);
  return (
    <>
      <Floor />
      {/* launch pad */}
      <Box c={[-30, 30, 0]} w={76} d={76} h={8} fillTop />
      <FlatCircle c={[-30, 30, 8]} r={26} className="ill-pulse text-accent-text" />
      {/* rocket */}
      <g className="ill-float" style={{ animationDuration: "2.6s" }}>
        <g transform={`translate(${px} ${py - 118})`}>
          <Path d="M0,0 c20,18 26,50 17,84 h-34 c-9,-34 -3,-66 17,-84 Z" className={ACCENT} fill="var(--bg)" />
          <circle pathLength={1} cx={0} cy={40} r={9} fill="none" className={ACCENT} />
          <Path d="M-17,62 l-15,22 h18 M17,62 l15,22 h-18" />
          <path pathLength={1} d="M-9,86 q9,26 18,0" className="ill-flame text-yellow" fill="currentColor" stroke="none" />
        </g>
      </g>
      {/* growth bars */}
      {[
        { x: 58, y: -52, h: 26 },
        { x: 84, y: -52, h: 46 },
        { x: 110, y: -52, h: 72 },
      ].map((b, i) => (
        <g key={i} className="ill-grow" style={{ animationDelay: `${i * 0.25}s` }}>
          <Box c={[b.x, b.y, 0]} w={18} d={18} h={b.h} accent={i === 2} fillTop={i === 2} />
        </g>
      ))}
      <Path d={line([46, -80, 40], [72, -80, 64], [96, -80, 80], [124, -80, 112])} className={ACCENT} />
      {/* map pin */}
      <Box c={[72, 70, 0]} w={34} d={34} h={4} />
      {(() => {
        const [x, y] = P([72, 70, 4]);
        return (
          <g className="ill-bounce">
            <Path d={`M${x},${y} c0,0 -18,-18 -18,-32 a18,18 0 0 1 36,0 c0,14 -18,32 -18,32 Z`} fill="var(--bg)" />
            <circle pathLength={1} cx={x} cy={y - 32} r={6} fill="none" className={ACCENT} />
          </g>
        );
      })()}
      <Sparkle x={70} y={60} delay={0.1} />
      <Sparkle x={120} y={100} s={4} delay={0.8} />
      <Sparkle x={340} y={60} s={5} delay={1.3} />
    </>
  );
}

function Fixed() {
  const on = onY(-46, -96, 8);
  return (
    <>
      <Floor />
      {/* scope document */}
      <PanelY y={-46} x0={-96} x1={-6} z0={8} z1={100} fill />
      <Path d={[on(10, 88, 60, 88), on(10, 80, 44, 80)].join(" ")} />
      {[66, 50, 34, 18].map((v, i) => (
        <g key={v}>
          <Path d={[on(10, v, 20, v), on(20, v, 20, v - 10), on(20, v - 10, 10, v - 10), on(10, v - 10, 10, v)].join(" ")} />
          <Path d={on(28, v - 5, 76, v - 5)} />
          {i < 3 && <Path d={[on(11, v - 5, 14, v - 9), on(14, v - 9, 22, v + 3)].join(" ")} className={ACCENT} />}
        </g>
      ))}
      {/* timeline of milestones */}
      {(() => {
        const d = line([-80, 70, 0], [60, 70, 0]);
        return (
          <g>
            <Path d={d} />
            {[-80, -34, 12, 60].map((x, i) => {
              const [sx, sy] = P([x, 70, 0]);
              return <rect key={x} pathLength={1} x={sx - 5} y={sy - 5} width={10} height={10} transform={`rotate(45 ${sx} ${sy})`} fill={i < 3 ? "var(--accent-soft)" : "var(--bg)"} className={i < 3 ? ACCENT : undefined} />;
            })}
            <Traveller d={d} dur={4} />
          </g>
        );
      })()}
      {/* hanging price tag */}
      <g className="ill-swing">
        <Path d="M300,26 V70" />
        <Path d="M276,70 h48 l14,28 l-14,28 h-48 Z" className={ACCENT} fill="var(--bg)" />
        <circle pathLength={1} cx={300} cy={78} r={4} fill="none" className={ACCENT} />
        <Path d="M286,102 h28 M286,112 h18" />
      </g>
      {/* lock */}
      <Box c={[76, 34, 0]} w={34} d={22} h={30} fillTop />
      {(() => {
        const [x, y] = P([76, 34, 30]);
        return <Path d={`M${x - 12},${y - 2} v-12 a12,12 0 0 1 24,0 v12`} className={`${ACCENT} ill-shackle`} />;
      })()}
    </>
  );
}

function Rescue() {
  const on = onY(-36, -100, 24);
  return (
    <>
      <Floor />
      {/* broken browser */}
      <PanelY y={-36} x0={-100} x1={36} z0={24} z1={130} fill />
      <Path d={on(0, 90, 136, 90)} />
      {[8, 16, 24].map((u) => (
        <Path key={u} d={on(u, 98, u + 2, 98)} />
      ))}
      <Path d={[on(70, 90, 62, 70), on(62, 70, 78, 54), on(78, 54, 66, 34), on(66, 34, 74, 0)].join(" ")} className={ACCENT} />
      <Path d={[on(10, 70, 46, 70), on(10, 60, 36, 60)].join(" ")} />
      {/* progress bar being fixed */}
      <Path d={[on(10, 22, 126, 22), on(126, 22, 126, 12), on(126, 12, 10, 12), on(10, 12, 10, 22)].join(" ")} />
      {(() => {
        const [x0, y0] = P([-90, -36, 36]);
        const [x1] = P([26, -36, 36]);
        return <path d={`M${x0},${y0} L${x1},${y0 - (x1 - x0) * 0.577}`} strokeWidth={5} className="ill-progress text-accent-text" pathLength={1} />;
      })()}
      {/* toolbox */}
      <Box c={[70, 50, 0]} w={50} d={30} h={26} fillTop />
      {(() => {
        const [x, y] = P([70, 50, 26]);
        return <Path d={`M${x - 12},${y} v-8 h24 v8`} />;
      })()}
      {/* wrench at work */}
      <g className="ill-wobble">
        <Path
          className={ACCENT}
          fill="var(--bg)"
          d="M246,210 l58,-58 a20,20 0 0 1 26,-26 l-12,12 l3,11 l11,3 l12,-12 a20,20 0 0 1 -26,26 l-58,58 a8,8 0 0 1 -14,-14 Z"
        />
      </g>
      {/* fixed! */}
      <g className="ill-pulse-badge">
        <circle pathLength={1} cx={330} cy={52} r={20} fill="var(--bg)" />
        <Path d="M321,52 l7,7 l12,-13" className={ACCENT} />
      </g>
      <Sparkle x={236} y={150} s={5} delay={0.2} />
      <Sparkle x={290} y={236} s={4} delay={0.9} />
    </>
  );
}

const map: Record<IllustrationName, () => React.JSX.Element> = {
  agents: Agents,
  developers: Developers,
  custom: Custom,
  build: Venture,
  retainer: Fixed,
  rescue: Rescue,
};

export function Illustration({ name, className = "" }: { name: IllustrationName; className?: string }) {
  const Art = map[name];
  return (
    // Padded viewBox + visible overflow: floating/bouncing parts never get clipped at the edges.
    <svg
      viewBox="-24 -28 448 376"
      overflow="visible"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-reveal-draw
      className={`draw ill ${className}`}
    >
      <Art />
    </svg>
  );
}
