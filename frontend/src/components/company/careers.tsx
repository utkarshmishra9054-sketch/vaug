import { Mail } from "lucide-react";

import type { Perk, Role } from "@/content/careers";
import { departmentIcon } from "@/content/careers";
import type { Feature } from "@/content/types";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ */
/* Hero: a fanned stack of role cards with a "we're hiring" badge       */
/* ------------------------------------------------------------------ */

export function RoleStack({ roles }: { roles: Pick<Role, "title" | "department" | "location">[] }) {
  const top = roles.slice(0, 4);
  return (
    <div className="company-fan-wrap relative mx-auto aspect-[5/4] w-full max-w-[28rem]" aria-hidden="true">
      <div className="absolute inset-[10%] rounded-full bg-purple/25 blur-3xl" />
      {top.map((r, i) => (
        <div
          key={r.title}
          className="company-fan absolute inset-x-[6%] top-[14%] rounded-xl border border-border bg-surface p-5 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]"
          style={{ "--i": i, "--n": top.length, zIndex: 10 - i } as React.CSSProperties}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent-text">
              <Icon name={departmentIcon[r.department]} className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-fg">{r.title}</p>
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">{r.location}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="h-2 w-1/3 rounded-full bg-surface-2" />
            <span className="h-2 w-1/4 rounded-full bg-surface-2" />
            <span className="h-2 w-1/5 rounded-full bg-accent-soft" />
          </div>
        </div>
      ))}
      <div className="absolute -right-1 bottom-[4%] z-20 flex size-24 items-center justify-center rounded-full bg-yellow text-ink shadow-xl sm:size-28">
        <svg viewBox="0 0 100 100" className="company-spin absolute inset-0" style={{ "--dur": "14s" } as React.CSSProperties}>
          <defs>
            <path id="hire-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text className="fill-ink font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]">
            <textPath href="#hire-circle">We&apos;re hiring · We&apos;re hiring ·</textPath>
          </text>
        </svg>
        <span className="text-2xl">✦</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Perks                                                                */
/* ------------------------------------------------------------------ */

export function PerksGrid({ perks }: { perks: Perk[] }) {
  return (
    <ul className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
      {perks.map((p, i) => (
        <li key={p.title} data-reveal style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
          <div data-glow className="group relative h-full overflow-hidden p-8">
            <span className="relative inline-flex size-12 items-center justify-center">
              <span aria-hidden="true" className="absolute inset-0 rounded-md bg-accent-soft transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
              <Icon name={p.icon} className="relative size-5 text-accent-text transition-transform duration-500 group-hover:scale-110" />
            </span>
            <h3 className="mt-6 text-lg font-semibold text-fg">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Hiring path: connected steps with a line that draws itself           */
/* ------------------------------------------------------------------ */

export function HiringPath({ steps }: { steps: Feature[] }) {
  return (
    <div className="frame-pad relative pb-4">
      <svg aria-hidden="true" data-reveal className="draw pointer-events-none absolute left-[calc(4rem+2rem)] right-[calc(4rem+2rem)] top-8 hidden h-4 lg:block" preserveAspectRatio="none" viewBox="0 0 100 4">
        <path d="M0 2 H100" pathLength={1} fill="none" stroke="var(--accent-text)" strokeWidth="0.6" />
      </svg>
      <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => (
          <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 180}ms` } as React.CSSProperties} className="group relative">
            <span className="relative z-10 inline-flex size-16 items-center justify-center rounded-full border-2 border-accent-text bg-bg font-mono text-lg font-semibold text-accent-text transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-fg">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.meta && <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-subtle">{s.meta}</p>}
            <h3 className="mt-2 text-xl font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Open application                                                     */
/* ------------------------------------------------------------------ */

export function OpenApplication({ title, text, href, email }: { title: string; text: string; href: string; email: string }) {
  return (
    <div className="p-3 sm:p-4">
      <div data-reveal className="group relative isolate grid gap-8 overflow-hidden rounded-lg border border-border bg-surface p-8 sm:p-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div aria-hidden="true" className="company-spin absolute -right-24 -top-24 -z-10 size-72 rounded-full border-[36px] border-dashed border-accent-soft" style={{ "--dur": "40s" } as React.CSSProperties} />
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>
          <a href={`mailto:${email}`} className="link-underline mt-5 inline-flex items-center gap-2 font-mono text-sm text-accent-text">
            <Mail className="size-4" aria-hidden="true" /> {email}
          </a>
        </div>
        <ArrowLink href={href} className="justify-self-start py-2.5 pl-5 text-base">
          Send your CV
        </ArrowLink>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Role detail: hero snapshot card                                      */
/* ------------------------------------------------------------------ */

export function RoleSnapshot({ role }: { role: Role }) {
  return (
    <div className="relative mx-auto w-full max-w-[26rem]" aria-hidden="true">
      <div className="absolute inset-[5%] rounded-full bg-purple/25 blur-3xl" />
      <div data-tilt className="glass relative rounded-xl p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent-text">
            <Icon name={departmentIcon[role.department]} className="size-6" />
          </span>
          <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-400">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-400" /> Hiring
          </span>
        </div>
        <p className="mt-6 text-xl font-semibold text-fg">{role.title}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-subtle">
          {role.department} · {role.type}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {role.stack.map((t, i) => (
            <li key={t} className="company-pop rounded-sm border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg" style={{ animationDelay: `${300 + i * 120}ms` }}>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-border pt-4">
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
            <span>Match</span>
            <span className="text-accent-text">You?</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <span className="company-grow block h-full w-[86%] origin-left rounded-full bg-gradient-to-r from-purple to-yellow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoleSection({ title, items, marker = "check" }: { title: string; items: string[]; marker?: "check" | "plus" }) {
  return (
    <section data-reveal className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold text-fg">{title}</h2>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-muted">
            <span className={`mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${marker === "check" ? "bg-accent-soft text-accent-text" : "border border-border text-subtle"}`} aria-hidden="true">
              {marker === "check" ? "✓" : "+"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
