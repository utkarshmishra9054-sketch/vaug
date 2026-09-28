"use client";

import { useEffect, useRef } from "react";

/* Glyph x-offsets for Geist 900 at font-size 400 with -0.07em tracking (measured). */
const LETTERS = [
  { ch: "V", x: 0 },
  { ch: "A", x: 233 },
  { ch: "U", x: 501 },
  { ch: "G", x: 758 },
];

/* The dot sits on the baseline after the G; the growth line climbs from it. */
const DOT = { x: 1102, y: 372 };
const TREND = `M${DOT.x} ${DOT.y} L1182 292 L1232 328 L1400 104`;
const HEAD = "M1332 120 L1400 104 L1400 174";
const SPARKS = [-80, -35, 10, 55, 100, 145];

/**
 * Footer sign-off: "VAUG" writes itself left to right (outlines draw in warm,
 * cool down, then fill), a dot drops onto the baseline, and a growth line shoots
 * up and to the right out of it, then settles to a quiet glow (brighter on
 * hover) with a faint pulse running along it. Plays each time the mark scrolls into view.
 *
 * Without JS or with reduced motion the finished mark is shown as-is: the
 * hidden starting state only applies once `is-armed` is set.
 */
export function FooterWordmark() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.45) el.classList.add("is-playing");
        else if (!entry.isIntersecting) el.classList.remove("is-playing");
      },
      { threshold: [0, 0.45] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} className="fmark" viewBox="-12 66 1446 342" role="img" aria-label="VAUG">
      <defs>
        <linearGradient id="fmark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f2f7" stopOpacity="0.2" />
          <stop offset="1" stopColor="#f4f2f7" stopOpacity="0.05" />
        </linearGradient>
        <filter id="fmark-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="fmark__letters">
        {LETTERS.map((l, i) => (
          <text key={l.ch} x={l.x} y={400} style={{ "--i": i } as React.CSSProperties}>
            {l.ch}
          </text>
        ))}
      </g>

      <g className="fmark__trend" filter="url(#fmark-glow)">
        <circle className="fmark__ripple" cx={DOT.x} cy={DOT.y} r="28" />
        <path className="fmark__line" d={TREND} pathLength={1} />
        <path className="fmark__comet" d={TREND} pathLength={1} />
        <g className="fmark__head-wrap">
          <path className="fmark__head" d={HEAD} pathLength={1} />
        </g>
        <g className="fmark__sparks">
          {SPARKS.map((deg) => (
            <line key={deg} x1="1400" y1="104" x2="1400" y2="82" style={{ "--a": `${deg}deg` } as React.CSSProperties} />
          ))}
        </g>
        <circle className="fmark__dot" cx={DOT.x} cy={DOT.y} r="28" />
      </g>
    </svg>
  );
}
