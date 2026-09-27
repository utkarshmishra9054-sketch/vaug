"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";

import { roleHref, type Department, type Role } from "@/content/careers";
import { DemoBadge } from "@/components/ui/DemoBadge";

type RoleSummary = Pick<Role, "slug" | "title" | "department" | "location" | "locationGroup" | "type" | "experience" | "summary" | "placeholder">;

function Chip({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      disabled={count === 0}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "border-transparent bg-fg text-bg" : "border-border text-muted hover:border-border-strong hover:text-fg"
      }`}
    >
      {children}
      <span className={`font-mono text-[11px] ${active ? "text-bg/70" : "text-subtle"}`}>{count}</span>
    </button>
  );
}

/** Filterable open-roles list. Each row links to the role's own page. */
export function RolesBoard({ roles, departments, locations }: { roles: RoleSummary[]; departments: Department[]; locations: Role["locationGroup"][] }) {
  const [dept, setDept] = useState<Department | "All">("All");
  const [loc, setLoc] = useState<Role["locationGroup"] | "All">("All");

  const shown = useMemo(() => roles.filter((r) => (dept === "All" || r.department === dept) && (loc === "All" || r.locationGroup === loc)), [roles, dept, loc]);

  const deptCount = (d: Department | "All") => roles.filter((r) => (d === "All" || r.department === d) && (loc === "All" || r.locationGroup === loc)).length;
  const locCount = (l: Role["locationGroup"] | "All") => roles.filter((r) => (l === "All" || r.locationGroup === l) && (dept === "All" || r.department === dept)).length;

  return (
    <div>
      <div className="frame-pad flex flex-col gap-5 border-t border-border py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <p className="w-24 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-subtle" id="dept-label">
            Team
          </p>
          <div role="group" aria-labelledby="dept-label" className="flex flex-wrap gap-2">
            {(["All", ...departments] as const).map((d) => (
              <Chip key={d} active={dept === d} onClick={() => setDept(d)} count={deptCount(d)}>
                {d}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <p className="w-24 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-subtle" id="loc-label">
            Location
          </p>
          <div role="group" aria-labelledby="loc-label" className="flex flex-wrap gap-2">
            {(["All", ...locations] as const).map((l) => (
              <Chip key={l} active={loc === l} onClick={() => setLoc(l)} count={locCount(l)}>
                {l}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "role" : "roles"} shown
      </p>

      <ul className="border-t border-border">
        {shown.map((r, i) => (
          <li key={r.slug} className="company-row border-b border-border" style={{ animationDelay: `${i * 50}ms` }}>
            <Link href={roleHref(r.slug)} data-cursor="View role" className="group relative grid gap-4 overflow-hidden py-7 transition-colors hover:bg-surface lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-8">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
              <div className="frame-pad min-w-0 lg:pr-0">
                <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">
                  {r.department}
                  <DemoBadge show={r.placeholder} />
                </p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.02em] text-fg transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">{r.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">{r.summary}</p>
              </div>
              <ul className="frame-pad flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted lg:px-0">
                <li className="flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden="true" /> {r.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" /> {r.type}
                </li>
                <li className="flex items-center gap-1.5">
                  <Briefcase className="size-4" aria-hidden="true" /> {r.experience}
                </li>
              </ul>
              <span className="frame-pad flex items-center gap-2 text-sm font-semibold text-fg lg:pl-0">
                View role
                <span className="inline-flex size-9 items-center justify-center rounded-md border border-border transition-all duration-300 group-hover:rotate-[-8deg] group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-fg">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <div className="frame-pad border-b border-border py-14 text-center">
          <p className="text-lg text-muted">No open roles match those filters right now.</p>
          <button
            type="button"
            onClick={() => {
              setDept("All");
              setLoc("All");
            }}
            className="link-underline mt-3 text-sm font-semibold text-accent-text"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
