"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Cycles through phrases. Letters roll up one after another inside a clipped
 * line, so outgoing and incoming phrases never spill onto the text around
 * them. All phrases share one grid cell, so the line keeps the width of the
 * longest phrase (no layout shift). The underline is sized to the current
 * phrase, so it ends where the words end.
 */
export function RotatingWords({ words, interval = 3400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [lineWidth, setLineWidth] = useState<number | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Measure the current phrase so the underline matches it, not the longest one.
  useLayoutEffect(() => {
    const measure = () => {
      const el = wordRefs.current[index];
      if (el) setLineWidth(el.offsetWidth);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words[0]}</span>
      {words.map((w, i) => {
        const state = i === index ? "now" : i === (index - 1 + words.length) % words.length ? "past" : "next";
        return (
          // The clip box is padded so descenders (y, p, g) are never cut. Phrases wrap
          // between words on narrow screens; each word stays on one line.
          <span key={w} aria-hidden="true" className="col-start-1 row-start-1 -my-[0.12em] overflow-hidden py-[0.12em]">
            <span ref={(el) => { wordRefs.current[i] = el; }} className="inline-block">
              {w.split(" ").map((word, wi, all) => {
                const offset = all.slice(0, wi).join(" ").length + (wi > 0 ? 1 : 0);
                return (
                  <span key={wi}>
                    {wi > 0 && " "}
                    <span className="inline-block whitespace-nowrap">
                      {[...word].map((ch, c) => (
                        <span
                          key={c}
                          className={`inline-block transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] ${
                            state === "now" ? "translate-y-0 opacity-100" : state === "past" ? "-translate-y-[115%] opacity-0" : "translate-y-[115%] opacity-0"
                          }`}
                          style={{ transitionDelay: `${(offset + c) * (state === "now" ? 18 : 10)}ms` }}
                        >
                          {ch}
                        </span>
                      ))}
                    </span>
                  </span>
                );
              })}
            </span>
          </span>
        );
      })}
      {/* underline that redraws on every change */}
      <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[0.09em] w-full overflow-hidden rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]" style={lineWidth === null ? undefined : { width: lineWidth }}>
        <span key={index} className="block h-full origin-left bg-yellow" style={{ animation: `underline-draw ${interval}ms cubic-bezier(0.6,0,0.2,1) both` }} />
      </span>
    </span>
  );
}
