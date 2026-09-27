"use client";

import { Moon, Sun } from "lucide-react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Switches between the default alternating bands and an all-dark page.
 * Where supported, the new theme spreads out in a circle from the button,
 * so the change is obvious even when the visible section is already dark.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function apply(next: string) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): theme still switches for this visit.
    }
  }

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply(next);
      return;
    }
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.documentElement.classList.add("theme-switching");
    const t = document.startViewTransition(() => apply(next));
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.6, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    t.finished.finally(() => document.documentElement.classList.remove("theme-switching"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle all-dark theme"
      className={`group relative inline-flex size-10 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-2 hover:text-fg ${className}`}
    >
      {/* Icons swap purely via CSS so server and client markup always match. */}
      <Moon className="size-[18px] transition-transform duration-500 group-hover:-rotate-12 [[data-theme=dark]_&]:hidden" aria-hidden="true" />
      <Sun className="hidden size-[18px] transition-transform duration-500 group-hover:rotate-45 [[data-theme=dark]_&]:block" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100"
      >
        <span className="[[data-theme=dark]_&]:hidden">Switch to all-dark</span>
        <span className="hidden [[data-theme=dark]_&]:inline">Switch to light sections</span>
      </span>
    </button>
  );
}
