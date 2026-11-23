"use client";

import { useEffect } from "react";

const ROOTS = ".shot, .mock-root, .mock2-root";

/** Reads a numeric custom property (px or unitless) from computed style. */
function num(style: CSSStyleDeclaration, name: string, fallback: number) {
  const v = parseFloat(style.getPropertyValue(name));
  return Number.isFinite(v) ? v : fallback;
}

/**
 * Sets the exact scale of every fixed-size design canvas from its box's real size:
 *  - `.shot` (640 x 400 case-study screens) gets `--shot-scale`;
 *  - `.mock-stage` / `.mock2-stage` inside `.mock-root` / `.mock2-root` get `--s`.
 *
 * CSS already scales these on its own (container-query steps, and `tan(atan2())` where the
 * browser computes it correctly). This makes the scale exact everywhere and fixes Safari, which
 * reads the `atan2()` angle as radians and so flips and blows up the canvas (blank frames on iPhone).
 */
export function CanvasScaler() {
  useEffect(() => {
    const fit = (el: Element) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.classList.contains("shot")) {
        if (el.clientWidth > 0) el.style.setProperty("--shot-scale", String(el.clientWidth / 640));
        return;
      }
      el.querySelectorAll<HTMLElement>(".mock-stage, .mock2-stage").forEach((stage) => {
        const cs = getComputedStyle(stage);
        const s = Math.min(
          1.15,
          (el.clientWidth - 2 * num(cs, "--px", 16)) / num(cs, "--mw", 640),
          ((el.clientHeight - num(cs, "--pt", 42) - num(cs, "--pb", 14)) * num(cs, "--crop", 1)) / num(cs, "--mh", 380),
        );
        if (s > 0) stage.style.setProperty("--s", String(s));
      });
    };

    const resize = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target)));
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll(ROOTS).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        resize.observe(el);
      });
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      resize.disconnect();
    };
  }, []);

  return null;
}
