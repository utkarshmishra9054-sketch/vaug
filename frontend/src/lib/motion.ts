/**
 * One switch for motion across the site (WCAG 2.2.2 Pause, Stop, Hide).
 *
 * Motion is reduced when the visitor asks their OS for less motion, or presses
 * "Pause animations" (MotionToggle), which sets `data-motion="reduced"` on <html>
 * and remembers the choice. CSS pauses animations under that attribute (see
 * globals.css); scripted loops ask `prefersLessMotion()` or `useLessMotion()`.
 */

export const MOTION_STORAGE_KEY = "vaug-motion";
const QUERY = "(prefers-reduced-motion: reduce)";
const EVENT = "vaug-motion";

/** Runs before first paint (layout.tsx) so a paused site never animates on load. */
export const motionInitScript = `(function(){try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="reduced"){document.documentElement.setAttribute("data-motion","reduced")}}catch(e){}})();`;

/** True when the visitor paused animations here or asked their OS for less motion. */
export function prefersLessMotion(): boolean {
  if (typeof window === "undefined") return true;
  return document.documentElement.getAttribute("data-motion") === "reduced" || window.matchMedia(QUERY).matches;
}

export function subscribeMotion(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    mq.removeEventListener("change", callback);
    window.removeEventListener(EVENT, callback);
  };
}

/** Pauses or resumes motion site-wide, remembers it, and tells every listener. */
export function setMotionPaused(paused: boolean) {
  const root = document.documentElement;
  if (paused) root.setAttribute("data-motion", "reduced");
  else root.removeAttribute("data-motion");
  try {
    localStorage.setItem(MOTION_STORAGE_KEY, paused ? "reduced" : "full");
  } catch {
    // Storage unavailable (private mode): the choice still applies to this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Whether the visitor paused animations on this site (their own toggle, not the OS setting). */
export function isMotionPaused(): boolean {
  return typeof document !== "undefined" && document.documentElement.getAttribute("data-motion") === "reduced";
}
