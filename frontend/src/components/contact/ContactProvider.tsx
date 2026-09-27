"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarClock, X } from "lucide-react";

import { ContactForm } from "./ContactForm";

const ContactContext = createContext<{ open: () => void }>({ open: () => {} });

export const useContact = () => useContext(ContactContext);

/**
 * Site-wide contact panel. Any link to "#contact" opens it, as do
 * `useContact().open()` and the floating chat button.
 */
export function ContactProvider({ children, email }: { children: React.ReactNode; email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    lastFocus.current?.focus();
  }, []);

  // Intercept every in-page link to #contact.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href="#contact"], a[href="/#contact"]');
      if (!link || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      open();
    };
    document.addEventListener("click", onClick);
    const fromHash = setTimeout(() => window.location.hash === "#contact" && open(), 0);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(fromHash);
    };
  }, [open]);

  // Lock scroll, close on Escape, move focus into the panel.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <ContactContext.Provider value={{ open }}>
      {children}

      {/* Floating booking launcher: a round button whose label slides out on hover/focus.
          Solid and compact, so it never sits translucently over page text. */}
      <button
        type="button"
        onClick={open}
        aria-label="Book a free strategy call"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`group fixed bottom-5 right-5 z-40 flex h-14 items-center overflow-hidden rounded-full bg-purple pl-[1.1rem] pr-[1.1rem] text-white shadow-xl shadow-purple/30 ring-1 ring-white/15 transition-all duration-300 hover:pr-5 focus-visible:pr-5 ${
          isOpen ? "pointer-events-none translate-y-3 opacity-0" : ""
        }`}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-purple/40 [animation-duration:3s] group-hover:hidden" aria-hidden="true" />
        <CalendarClock className="relative size-5 shrink-0" aria-hidden="true" />
        <span className="relative max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-40 group-focus-visible:opacity-100">
          Book a free call
        </span>
      </button>

      {/* Slide-over panel */}
      <div
        className={`fixed inset-0 z-[70] transition-[visibility] ${isOpen ? "visible" : "invisible delay-500"}`}
        aria-hidden={!isOpen}
      >
        <div
          onClick={close}
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          data-tone="dark"
          className={`absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-bg text-fg shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between gap-6 border-b border-border p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent-text">Book a free strategy call</p>
              <h2 id="contact-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
                <span className="font-light">Tell us what you&apos;re</span> building.
              </h2>
              <p className="mt-2 text-sm text-muted">A senior lead replies within one business day to set up a 30-minute call.</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close contact form"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border text-fg transition hover:bg-surface-2"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 p-6 sm:p-8">{isOpen && <ContactForm />}</div>
          <p className="flex flex-wrap justify-between gap-3 border-t border-border px-6 py-5 font-mono text-xs text-muted sm:px-8">
            <span>
              Prefer email?{" "}
              <a href={`mailto:${email}`} className="text-accent-text hover:underline">
                {email}
              </a>
            </span>
            <Link href="/contact" onClick={close} className="text-accent-text hover:underline">
              Offices &amp; full contact page →
            </Link>
          </p>
        </div>
      </div>
    </ContactContext.Provider>
  );
}
