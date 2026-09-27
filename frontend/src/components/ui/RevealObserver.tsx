"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-visible), [data-reveal-draw]:not(.is-visible)";

/**
 * Adds a fade-up on scroll to every element with `data-reveal`, and draws in
 * line illustrations marked `data-reveal-draw`.
 *
 * Robust by design, so content is never left hidden:
 *  - an element is revealed as soon as any part of it is in view;
 *  - a scroll/resize sweep also reveals everything at or above the viewport,
 *    which covers fast scrolling, anchor jumps and restored scroll positions;
 *  - a MutationObserver picks up content added by client-side navigation;
 *  - a final safety timer reveals anything still pending.
 * Content stays visible without JS: elements only start hidden once
 * `js-ready` is set on <html>.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");

    const show = (el: Element) => {
      el.classList.add("is-visible");
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) show(entry.target);
      },
      { threshold: 0 },
    );

    let frame = 0;
    const sweep = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const limit = window.innerHeight * 1.05;
        document.querySelectorAll(SELECTOR).forEach((el) => {
          if (el.getBoundingClientRect().top < limit) show(el);
          else observer.observe(el);
        });
      });
    };
    sweep();

    const mutations = new MutationObserver(sweep);
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep);
    document.addEventListener("visibilitychange", sweep);

    // Nothing should ever stay hidden, even if an observer never fires.
    const safety = setInterval(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight && b.bottom > -window.innerHeight) show(el);
      });
    }, 1500);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(safety);
      mutations.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
      document.removeEventListener("visibilitychange", sweep);
    };
  }, []);

  return null;
}
