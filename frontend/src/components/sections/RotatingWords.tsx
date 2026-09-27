"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases. Letters roll up one after another inside a clipped
 * line, so outgoing and incoming phrases never spill onto the text around
 * them. All phrases share one grid cell, so the line keeps the width of the
 * longest phrase (no layout shift).
 */
export function RotatingWords({ words, interval = 3400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words[0]}</span>
      {words.map((w, i) => {
        const state = i === index ? "now" : i === (index - 1 + words.length) % words.length ? "past" : "next";
        return (
          // The clip box is padded so descenders (y, p, g) are never cut.
          <span key={w} aria-hidden="true" className="col-start-1 row-start-1 -my-[0.12em] overflow-hidden py-[0.12em] whitespace-nowrap">
            {[...w].map((ch, c) => (
              <span
                key={c}
                className={`inline-block transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] ${
                  state === "now" ? "translate-y-0 opacity-100" : state === "past" ? "-translate-y-[115%] opacity-0" : "translate-y-[115%] opacity-0"
                }`}
                style={{ transitionDelay: `${c * (state === "now" ? 18 : 10)}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        );
      })}
      {/* underline that redraws on every change */}
      <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[0.09em] w-full overflow-hidden rounded-full">
        <span key={index} className="block h-full origin-left bg-yellow" style={{ animation: `underline-draw ${interval}ms cubic-bezier(0.6,0,0.2,1) both` }} />
      </span>
    </span>
  );
}
