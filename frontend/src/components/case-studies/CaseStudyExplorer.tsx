"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { CaseStudyDetail } from "@/content/types";
import { audiences, regions, sectors, services } from "@/content/taxonomy";
import { CaseStudyCard } from "@/components/page/CaseStudyCards";

type Filters = { sector: string; service: string; client: string; region: string; q: string };
const empty: Filters = { sector: "", service: "", client: "", region: "", q: "" };
const keys = ["sector", "service", "client", "region", "q"] as const;

const groups = [
  { key: "sector", label: "Sector", options: sectors.map((s) => ({ value: s.slug, label: s.label })) },
  { key: "service", label: "Service", options: services.map((s) => ({ value: s.slug, label: s.label })) },
  { key: "client", label: "Client type", options: audiences.map((a) => ({ value: a.clientType, label: a.clientType === "HNI" ? "HNI / Family office" : a.clientType })) },
  { key: "region", label: "Region", options: regions.map((r) => ({ value: r, label: r })) },
] as const;

/**
 * Filterable case study grid. Filters live in the URL (?sector=healthcare…)
 * so sector and service pages can deep-link into a filtered view.
 */
export function CaseStudyExplorer({ studies }: { studies: CaseStudyDetail[] }) {
  const [filters, setFilters] = useState<Filters>(empty);
  const [open, setOpen] = useState(false);

  // Read filters from the URL once on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = { ...empty };
    for (const k of keys) next[k] = params.get(k) ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
    setFilters(next);
  }, []);

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const params = new URLSearchParams();
    for (const k of keys) if (next[k]) params.set(k, next[k]);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const list = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return studies.filter(
      (s) =>
        (!filters.sector || s.sector === filters.sector) &&
        (!filters.service || s.service === filters.service) &&
        (!filters.client || s.clientType === filters.client) &&
        (!filters.region || s.region === filters.region) &&
        (!q || [s.title, s.summary, s.client, s.city, s.industry, s.model, ...s.techStack].join(" ").toLowerCase().includes(q)),
    );
  }, [studies, filters]);

  const active = keys.filter((k) => k !== "q" && filters[k]).length + (filters.q ? 1 : 0);

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-16 z-30 border-y border-border bg-bg/85 backdrop-blur-xl lg:top-20">
        <div className="frame-pad flex flex-wrap items-center gap-3 py-4">
          <label className="relative min-w-0 flex-1 basis-60">
            <span className="sr-only">Search case studies</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
            <input
              type="search"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search by problem, tech or city…"
              className="w-full rounded-md border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-fg outline-none transition placeholder:text-subtle focus:border-accent-text"
            />
          </label>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-fg transition hover:border-border-strong lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" /> Filters {active > 0 && <span className="rounded-full bg-accent px-1.5 text-xs text-accent-fg">{active}</span>}
          </button>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted" aria-live="polite">
            Showing <span className="text-fg">{list.length}</span> of {studies.length}
          </p>
          {active > 0 && (
            <button type="button" onClick={() => update(empty)} className="inline-flex items-center gap-1.5 text-sm text-accent-text hover:underline">
              <X className="size-4" aria-hidden="true" /> Clear all
            </button>
          )}
        </div>
        <div className={`frame-pad grid gap-4 pb-5 sm:grid-cols-2 lg:grid lg:grid-cols-4 ${open ? "grid" : "hidden"}`}>
          {groups.map((g) => (
            <fieldset key={g.key}>
              <legend className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{g.label}</legend>
              <div className="flex flex-wrap gap-1.5">
                {g.options.map((o) => {
                  const on = filters[g.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => update({ [g.key]: on ? "" : o.value })}
                      className={`rounded-sm px-2.5 py-1.5 text-[13px] transition-all duration-200 ${
                        on ? "bg-accent text-accent-fg shadow-[0_6px_16px_-8px_var(--accent)]" : "bg-surface-2 text-fg hover:bg-surface hover:ring-1 hover:ring-border-strong"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Grid: re-keyed on the result set, not the raw filters, so typing doesn't replay the entrance on every keystroke. */}
      {list.length > 0 ? (
        <ul key={list.map((s) => s.slug).join()} className="grid sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <li key={s.slug} className="animate-[fade-up_0.5s_cubic-bezier(0.2,0.7,0.2,1)_both]" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
              <CaseStudyCard study={s} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="frame-pad flex flex-col items-center py-24 text-center">
          <p className="text-2xl font-semibold text-fg">No case studies match those filters.</p>
          <p className="mt-3 max-w-md text-muted">Try removing a filter, or tell us about your project: we have likely solved something close to it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => update(empty)} className="rounded-md border border-border px-4 py-2.5 text-sm text-fg hover:bg-surface-2">
              Clear filters
            </button>
            <a href="#contact" className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg">
              Talk to us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
