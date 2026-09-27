import type { MapPin } from "@/content/contact";

/*
 * Dotted world map drawn at render time from coarse continent outlines.
 * Offices pulse, client regions glow, and arcs between them draw in and
 * carry a small travelling light. Purely decorative (aria-hidden); the
 * office list next to it carries the real information.
 */

const W = 720;
const H = 300;
const LAT_TOP = 80;
const LAT_SPAN = 140; // 80°N to 60°S

const project = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((LAT_TOP - lat) / LAT_SPAN) * H,
});

type Poly = [number, number][];

// Very coarse [lon, lat] outlines: good enough for a dot-matrix look.
const land: Poly[] = [
  // North America
  [[-165, 68], [-140, 70], [-110, 73], [-85, 72], [-80, 63], [-94, 59], [-82, 52], [-66, 60], [-56, 52], [-66, 45], [-76, 38], [-81, 31], [-80, 25], [-83, 29], [-90, 30], [-97, 27], [-97, 21], [-88, 21], [-87, 15], [-83, 9], [-78, 8], [-86, 13], [-92, 15], [-105, 20], [-112, 30], [-118, 34], [-124, 40], [-124, 48], [-135, 58], [-150, 60], [-165, 60]],
  // Greenland
  [[-55, 82], [-25, 82], [-20, 72], [-42, 60], [-50, 62], [-58, 75]],
  // South America
  [[-80, 9], [-72, 12], [-60, 10], [-50, 0], [-35, -6], [-40, -22], [-48, -27], [-58, -38], [-65, -42], [-68, -55], [-74, -50], [-72, -35], [-70, -18], [-81, -5]],
  // Eurasia
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 54], [10, 58], [5, 62], [15, 69], [28, 71], [40, 67], [60, 70], [80, 73], [100, 77], [140, 72], [180, 68], [180, 64], [160, 60], [155, 58], [142, 53], [140, 45], [130, 42], [127, 35], [122, 30], [120, 22], [108, 21], [106, 10], [100, 6], [98, 15], [92, 21], [88, 22], [80, 15], [77, 8], [73, 17], [67, 25], [57, 25], [56, 20], [52, 16], [44, 12], [40, 20], [35, 28], [34, 32], [36, 36], [28, 36], [26, 40], [23, 36], [20, 40], [15, 38], [12, 44], [8, 44], [3, 42], [-1, 37], [-6, 36]],
  // Africa
  [[-17, 21], [-17, 15], [-8, 5], [5, 5], [10, 3], [9, -2], [13, -10], [12, -18], [18, -34], [26, -34], [33, -26], [40, -15], [40, -5], [51, 12], [43, 12], [37, 20], [32, 31], [20, 32], [10, 37], [-6, 36], [-10, 30]],
  // Great Britain and Ireland
  [[-6, 50], [2, 51], [0, 53], [-2, 56], [-3, 59], [-6, 58], [-5, 54]],
  [[-10, 52], [-6, 52], [-6, 55], [-9, 55]],
  // Japan
  [[130, 31], [140, 35], [142, 40], [141, 45], [139, 40], [132, 34]],
  // Borneo, Sumatra, New Guinea
  [[109, -2], [118, 6], [119, -3], [114, -4]],
  [[95, 5], [106, -6], [102, -4]],
  [[131, -1], [150, -6], [141, -9]],
  // Madagascar
  [[44, -25], [50, -15], [49, -12], [43, -17]],
  // Australia
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [141, -38], [131, -31], [115, -34]],
  // New Zealand
  [[172, -35], [178, -38], [174, -41], [167, -46], [172, -42]],
];

function inside(lon: number, lat: number, poly: Poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const STEP = 3.6;
const dots: { x: number; y: number }[] = [];
for (let lat = LAT_TOP - STEP / 2; lat > LAT_TOP - LAT_SPAN; lat -= STEP) {
  for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
    if (land.some((p) => inside(lon, lat, p))) dots.push(project(lon, lat));
  }
}

function arc(a: MapPin, b: MapPin) {
  const p = project(a.lon, a.lat);
  const q = project(b.lon, b.lat);
  const dist = Math.hypot(q.x - p.x, q.y - p.y);
  const cx = (p.x + q.x) / 2;
  const cy = Math.min(p.y, q.y) - dist * 0.35;
  return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
}

/** Which pins to connect, by label. */
const links: [string, string][] = [
  ["Bengaluru", "London"],
  ["Bengaluru", "UAE"],
  ["London", "Europe"],
  ["New York", "London"],
  ["Bengaluru", "Europe"],
];

export function WorldMap({ pins }: { pins: MapPin[] }) {
  const byLabel = new Map(pins.map((p) => [p.label, p]));
  const paths = links
    .map(([a, b]) => (byLabel.has(a) && byLabel.has(b) ? arc(byLabel.get(a)!, byLabel.get(b)!) : null))
    .filter((d): d is string => d !== null);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="contact-map-glow">
          <stop offset="0%" stopColor="#ffd23f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd23f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="contact-map-arc" x1="0" x2="1">
          <stop offset="0%" stopColor="#b69cff" />
          <stop offset="100%" stopColor="#ffd23f" />
        </linearGradient>
      </defs>

      <g fill="#f5f4f0" className="contact-map-dots">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r="1.35" style={{ "--i": i % 29 } as React.CSSProperties} />
        ))}
      </g>

      <g data-reveal className="draw" fill="none" stroke="url(#contact-map-arc)" strokeWidth="1.4" strokeLinecap="round">
        {paths.map((d) => (
          <path key={d} d={d} pathLength={1} strokeOpacity="0.85" />
        ))}
      </g>

      <g className="contact-map-comets">
        {paths.map((d, i) => (
          <circle key={d} r="2.6" fill="#ffd23f">
            <animateMotion dur={`${3.6 + i * 0.5}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
        ))}
      </g>

      {pins.map((pin) => {
        const { x, y } = project(pin.lon, pin.lat);
        const office = pin.kind === "office";
        return (
          <g key={pin.label} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            {office ? (
              <>
                <circle r="16" fill="url(#contact-map-glow)" />
                <circle r="5" fill="none" stroke="#ffd23f" strokeWidth="1.5" className="contact-map-ping" />
                <circle r="4" fill="#ffd23f" stroke="#131116" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle r="9" fill="#8b5cf6" fillOpacity="0.25" className="contact-map-breathe" />
                <circle r="4" fill="none" stroke="#b69cff" strokeWidth="1.6" />
              </>
            )}
            <text
              x="0"
              y={office ? -12 : 18}
              textAnchor="middle"
              className="max-sm:hidden"
              fill={office ? "#f5f4f0" : "#b69cff"}
              fontSize="10"
              fontFamily="var(--font-code), monospace"
              letterSpacing="0.08em"
            >
              {pin.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
