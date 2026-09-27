"use client";

import { useEffect, useRef } from "react";

/**
 * Circular text badge around the VAUG mark. Drifts slowly on its own and
 * spins faster as the page scrolls.
 */
export function RotatingBadge({ words }: { words: string[] }) {
  const ring = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let angle = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;

    const tick = () => {
      const y = window.scrollY;
      velocity += (y - lastScroll) * 0.25;
      lastScroll = y;
      velocity *= 0.9;
      angle += 0.06 + velocity * 0.1;
      ring.current?.setAttribute("transform", `rotate(${angle} 200 200)`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const text = words.map((w) => `${w}  •  `).join("").repeat(2);

  return (
    <svg viewBox="0 0 400 400" className="size-full" aria-hidden="true">
      <defs>
        <path id="badge-circle" d="M200,200 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0" />
      </defs>
      <g ref={ring}>
        <text className="fill-[#8f8a96]" style={{ font: "500 38px var(--font-body)", letterSpacing: "4px" }}>
          <textPath href="#badge-circle" textLength={1000} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </g>
      {/* VAUG mark: heavy V with the yellow progress dot */}
      <circle cx="200" cy="200" r="118" fill="#7c3aed" />
      <path d="M134 138 L178 262 H208 L252 138 H220 L193 222 L166 138 Z" fill="#f5f4f0" />
      <circle cx="262" cy="248" r="17" fill="#ffd23f" />
    </svg>
  );
}
