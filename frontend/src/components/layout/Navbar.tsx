"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import type { NavItem } from "@/content/types";
import { ArrowBox, arrowButtonClass } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ items }: { items: NavItem[] }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Hover intent: menus open after a short pause and close shortly after the
  // pointer leaves, so sweeping across the header never opens the wrong one.
  const intent = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoverTo = (label: string | null, delay = label ? 90 : 160) => {
    clearTimeout(intent.current);
    intent.current = setTimeout(() => setOpenMenu(label), delay);
  };
  useEffect(() => () => clearTimeout(intent.current), []);
  const isActive = (item: NavItem) =>
    [item.href, ...(item.menu ?? []).map((m) => m.href)].some((h) => h !== "/" && h.startsWith("/") && (pathname === h || pathname.startsWith(`${h}/`)));

  // Close menus after navigating (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - lastY) > 6) {
        // Pinned sections (marked data-keep-header) reserve space for the header, so keep it shown there.
        const pinned = Array.from(document.querySelectorAll("[data-keep-header]")).some((el) => {
          const b = el.getBoundingClientRect();
          return b.top < 80 && b.bottom > window.innerHeight;
        });
        setHidden(!pinned && y > lastY && y > 400);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };
  const activeItem = items.find((i) => i.label === openMenu && i.menu);
  const activeMenu = activeItem?.menu;

  return (
    <header
      data-tone="dark"
      onMouseLeave={() => hoverTo(null)}
      className={`nav-glass fixed inset-x-0 top-0 z-50 text-fg transition-[translate,box-shadow] duration-300 ${scrolled || openMenu || mobileOpen ? "is-scrolled" : ""} ${
        hidden && !mobileOpen && !openMenu ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="frame frame-open">
        <nav className="frame-pad flex h-16 items-center justify-between gap-6 lg:h-20 lg:px-10" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {items.map((item) =>
              item.menu ? (
                <li key={item.label} onMouseEnter={() => hoverTo(item.label)}>
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    onClick={() => {
                      clearTimeout(intent.current);
                      setOpenMenu(openMenu === item.label ? null : item.label);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[15px] transition-colors xl:px-3.5 ${
                      openMenu === item.label ? "bg-white/[0.08] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]" : isActive(item) ? "text-fg" : "text-muted hover:bg-white/[0.05] hover:text-fg"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform duration-300 ${openMenu === item.label ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </li>
              ) : (
                <li key={item.label} onMouseEnter={() => hoverTo(null, 60)}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={`relative rounded-md px-2.5 py-2 text-[15px] transition-colors hover:bg-white/[0.05] hover:text-fg xl:px-3.5 ${isActive(item) ? "text-fg" : "text-muted"}`}
                  >
                    <span className="link-underline pb-0.5">{item.label}</span>
                    {item.href === "/agents" && <span className="absolute right-0.5 top-0.5 size-1.5 animate-pulse-dot rounded-full bg-yellow" aria-hidden="true" />}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2" onMouseEnter={() => hoverTo(null, 0)}>
            <ThemeToggle />
            <div className="hidden sm:block">
              <a href="#contact" data-magnetic className={arrowButtonClass("outline", "border-border")}>
                <span>Book a call</span>
                <ArrowBox variant="outline" />
              </a>
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-fg lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop mega-menu */}
      <div
        className={`hidden overflow-hidden border-t border-border bg-bg transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:block ${
          activeMenu ? "max-h-[40rem] opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <div key={openMenu ?? "none"} className="frame grid grid-cols-[minmax(0,1fr)_16rem]">
          <ul className="grid grid-cols-2 border-r border-border">
            {(activeMenu ?? []).map((link, i) => (
              <li
                key={link.label}
                style={{ animationDelay: `${i * 15}ms` }}
                className={`animate-[fade-up_0.22s_ease-out_both] border-b border-dashed border-border ${i % 2 === 0 ? "border-r" : ""}`}
              >
                <Link href={link.href} onClick={closeAll} data-glow className={`group flex items-center justify-between gap-6 px-8 py-6 transition-colors hover:bg-surface/60 ${pathname === link.href ? "bg-surface/60" : ""}`}>
                  <span>
                    <span className="block text-lg font-medium text-fg transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                    {link.description && <span className="mt-1 block text-sm text-muted">{link.description}</span>}
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          {activeItem?.aside && (
            <div className="animate-[fade-up_0.25s_ease-out_both] p-8 [animation-delay:60ms]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{activeItem.aside.title}</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {activeItem.aside.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} onClick={closeAll} className="group inline-flex items-center gap-2 text-[15px] text-muted transition-colors hover:text-fg">
                      <span className="h-px w-3 bg-border-strong transition-all duration-300 group-hover:w-5 group-hover:bg-accent-text" aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={activeItem.href} onClick={closeAll} className={arrowButtonClass("solid", "mt-8")}>
                <span>View all</span>
                <ArrowBox />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto border-t border-border bg-bg transition-[max-height,opacity] duration-300 lg:hidden ${
          mobileOpen ? "max-h-[calc(100dvh-4rem)] opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-4">
          {items.map((item) => (
            <li key={item.label} className="border-b border-border last:border-b-0">
              {item.menu ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg text-fg">
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mb-3 flex flex-col gap-1">
                    {[...item.menu, ...(item.aside?.links ?? []).filter((l) => !item.menu?.some((m) => m.href === l.href))].map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} onClick={closeAll} className="block rounded-md px-3 py-2.5 text-muted hover:bg-surface hover:text-fg">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={item.href} onClick={closeAll} className="block py-4 text-lg text-fg">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="pt-4">
            <a href="#contact" onClick={closeAll} className={arrowButtonClass("solid", "w-full justify-between")}>
              <span>Book a call</span>
              <ArrowBox />
            </a>
            <Link href="/contact" onClick={closeAll} className="mt-3 block py-2 text-center text-sm text-muted hover:text-fg">
              Or visit the contact page
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
