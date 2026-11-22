"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Accessibility, Activity, Baby, Brain, CalendarCheck, Car, ChevronRight, Eye, Footprints, HeartPulse, Languages, Lock, MapPin, Phone, Pill, Salad, Search, Smile, Stethoscope, Trash2, Video, Wallet } from "lucide-react";

import { brand, eventPlan, insurance, languages, locations, providers, services, sitePages, slidingFee, t, type Lang, type LanguageId, type Location, type ServiceId, type View } from "@/content/showcases/healthCentre";
import { searchSite, type SearchResult } from "@/lib/healthSearch";

/**
 * Interactive demo of a patient-first health-centre website, with a fictional
 * brand ("Sagebrook Health Centers") and invented data. Everything runs in the
 * browser: provider finder, location finder with an illustrated map, typo- and
 * Spanish-tolerant site search, English/Spanish switch, and a GTM preview pane
 * that shows the analytics events each action would send (nothing is sent).
 */

const C = { navy: "#1d3a5f", sage: "#3d6b53", sageSoft: "#eef4ef", sand: "#f7f3ea", coral: "#b3471f", coralSoft: "#fff4ed", ink: "#1f2933", muted: "#52606d", line: "#dfe3e8", alert: "#8a1c1c" };
const ICON: Record<ServiceId, typeof Stethoscope> = { family: Stethoscope, pediatrics: Baby, womens: HeartPulse, behavioral: Brain, dental: Smile, optometry: Eye, internal: Activity, pharmacy: Pill, podiatry: Footprints, nutrition: Salad };
const PAGE = 12;

type Ev = { name: string; params: Record<string, string | number | boolean>; at: number };

/** Wall-clock time for event timestamps (only ever read inside event handlers). */
const clock = () => Date.now();

const svcName = (id: ServiceId, lang: Lang) => services.find((s) => s.id === id)!.name[lang];
const locName = (id: string) => locations.find((l) => l.id === id)?.name ?? id;
const langName = (id: LanguageId, lang: Lang) => languages.find((l) => l.id === id)!.name[lang];
const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

function Btn({ children, onClick, tone = "solid", className = "", ...rest }: { children: ReactNode; onClick?: () => void; tone?: "solid" | "outline" | "coral" | "ghost"; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const style =
    tone === "solid" ? { background: C.navy, color: "#fff" } : tone === "coral" ? { background: C.coral, color: "#fff" } : tone === "outline" ? { color: C.navy, boxShadow: `inset 0 0 0 1.5px ${C.navy}`, background: "#fff" } : { color: C.navy };
  return (
    <button type="button" onClick={onClick} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d3a5f] ${className}`} style={style} {...rest}>
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm font-semibold" style={{ color: C.ink }}>
      {label}
      {children}
    </label>
  );
}

const selectCls = "min-h-10 w-full rounded-lg border bg-white px-3 text-sm font-normal focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1d3a5f]";

export function HealthSiteDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const [view, setView] = useState<View>("home");
  const [events, setEvents] = useState<Ev[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  // One always-mounted live region, so screen readers hear view changes and result counts.
  const [announce, setAnnounce] = useState("");
  // When the control that changed the view disappears with the old view (a search box,
  // a service tile), keyboard focus would fall to <body>; move it to the new view's heading.
  const viewHeading = useRef<HTMLHeadingElement>(null);
  const [viewChanges, setViewChanges] = useState(0);
  const started = useRef<number | null>(null);
  const tx = t[lang];

  // Provider finder state
  const [fService, setFService] = useState<ServiceId | "">("");
  const [fLang, setFLang] = useState<LanguageId | "">("");
  const [fLoc, setFLoc] = useState("");
  const [fAccepting, setFAccepting] = useState(false);
  const [fVideo, setFVideo] = useState(false);
  const [fName, setFName] = useState("");
  const [shown, setShown] = useState(PAGE);

  // Locations state
  const [locService, setLocService] = useState<ServiceId | "">("");
  const [selectedLoc, setSelectedLoc] = useState<string>("juniper");

  // Search state
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);

  const track = (name: string, params: Ev["params"] = {}) => {
    const now = clock();
    if (started.current === null) started.current = now;
    setEvents((e) => [{ name, params, at: now - (started.current ?? now) }, ...e].slice(0, 40));
  };

  const go = (v: View) => {
    setView(v);
    setNotice(null);
    setViewChanges((n) => n + 1);
    setAnnounce(tx.nav[v as keyof typeof tx.nav] ?? "");
    // Single-page views send a virtual page_view, as GA4 expects for app-like sites.
    track("page_view", { page_path: `/${lang === "es" ? "es/" : ""}${v === "home" ? "" : v}` });
  };

  useEffect(() => {
    if (!viewChanges) return;
    const active = document.activeElement;
    if (!active || active === document.body) viewHeading.current?.focus({ preventScroll: true });
  }, [viewChanges]);

  const filtered = useMemo(
    () =>
      providers.filter(
        (p) =>
          (!fService || p.service === fService) &&
          (!fLang || p.languages.includes(fLang)) &&
          (!fLoc || p.locations.includes(fLoc)) &&
          (!fAccepting || p.accepting) &&
          (!fVideo || p.telehealth) &&
          (!fName.trim() || p.name.toLowerCase().includes(fName.trim().toLowerCase())),
      ),
    [fService, fLang, fLoc, fAccepting, fVideo, fName],
  );

  const setFilter = <T,>(name: string, setter: (v: T) => void, value: T) => {
    setter(value);
    setShown(PAGE);
    track("provider_filter", { filter_name: name, filter_value: String(value || "any") });
  };

  const runSearch = (e?: FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    const r = searchSite(query);
    setResult(r);
    setView("search");
    setViewChanges((n) => n + 1);
    const q = query.trim();
    setAnnounce(
      lang === "en"
        ? `${r.total} ${r.total === 1 ? "result" : "results"} for “${q}”${r.correctedTo ? `, showing results for “${r.correctedTo}”` : ""}`
        : `${r.total} ${r.total === 1 ? "resultado" : "resultados"} para “${q}”${r.correctedTo ? `, mostrando resultados para “${r.correctedTo}”` : ""}`,
    );
    track("site_search", { search_term: query.trim(), results_count: r.total, corrected_to: r.correctedTo ?? "" });
  };

  const book = (placement: string, extra: Ev["params"] = {}) => {
    track("book_appointment_click", { placement, ...extra });
    setNotice(lang === "en" ? "In the live site this opens online scheduling. Demo only." : "En el sitio real esto abre la agenda en línea. Solo demostración.");
  };

  const openProviders = (service: ServiceId | "" = "", language: LanguageId | "" = "") => {
    setFService(service);
    setFLang(language);
    setFLoc("");
    setFAccepting(false);
    setFVideo(false);
    setFName("");
    setShown(PAGE);
    go("providers");
  };

  const locList = locations.filter((l) => !locService || l.services.includes(locService));
  const selected = locations.find((l) => l.id === selectedLoc) ?? locations[0];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_19rem]">
      {/* ---------------- the demo site ---------------- */}
      <div role="region" aria-label="Interactive demo: Sagebrook Health Centers website (fictional)" className="@container overflow-hidden rounded-xl border border-border bg-white text-left shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)]" style={{ color: C.ink, fontFamily: "var(--font-demo), system-ui, sans-serif" }} lang={lang}>
        {/* browser bar */}
        <div className="flex items-center gap-3 border-b px-3 py-2" style={{ background: "#eef0f2", borderColor: C.line }}>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-xs" style={{ color: C.muted }}>
            <Lock className="size-3 shrink-0" aria-hidden="true" />
            {brand.domain}/{lang === "es" ? "es/" : ""}
            {view === "home" ? "" : view}
          </span>
          <span className="hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline" style={{ background: C.coralSoft, color: "#9a3412" }}>
            {tx.demoNotice}
          </span>
        </div>

        {/* emergency strip */}
        <p className="px-4 py-1.5 text-center text-xs font-semibold text-white" style={{ background: C.alert }}>
          {tx.emergency}
        </p>

        {/* utility bar: phone, language, portal */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b px-4 py-1.5" style={{ background: C.sand, borderColor: C.line }}>
          <a
            href={`tel:${brand.phone.replace(/\D/g, "")}`}
            onClick={(e) => {
              e.preventDefault();
              track("click_to_call", { location: "main_line" });
            }}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d3a5f]"
            style={{ color: C.navy }}
          >
            <Phone className="size-4" aria-hidden="true" />
            {brand.phone}
          </a>
          <div className="flex items-center gap-2">
            <div role="group" aria-label="Language / Idioma" className="flex rounded-lg p-0.5" style={{ background: "#e6e0d3" }}>
              {(["en", "es"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  lang={l}
                  onClick={() => {
                    setLang(l);
                    track("language_switch", { language: l });
                  }}
                  className="min-h-8 min-w-11 rounded-md px-2 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-[#1d3a5f]"
                  style={lang === l ? { background: "#fff", color: C.navy, boxShadow: "0 1px 2px rgb(0 0 0 / 0.12)" } : { color: "#4a5560" }}
                >
                  {l === "en" ? "English" : "Español"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => track("patient_portal_click", { placement: "header" })}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-[13px] font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#1d3a5f]"
              style={{ color: C.navy }}
            >
              <Lock className="size-3.5" aria-hidden="true" />
              {tx.portal}
            </button>
          </div>
        </div>

        {/* site header: logo, nav, booking */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3 border-b px-4 py-3" style={{ borderColor: C.line }}>
          <button type="button" onClick={() => go("home")} className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d3a5f]" aria-label={`${brand.name}, ${tx.nav.home}`}>
            <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
              <circle cx="16" cy="16" r="16" fill={C.sage} />
              <path d="M16 7c5 4 6 10 0 18-6-8-5-14 0-18Z" fill="#fff" />
              <path d="M16 11v14" stroke={C.sage} strokeWidth="1.6" />
            </svg>
            <span className="text-left leading-tight">
              <span className="block text-[15px] font-bold" style={{ color: C.navy }}>
                Sagebrook
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.sage }}>
                Health Centers
              </span>
            </span>
          </button>
          <nav aria-label="Demo site" className="order-3 grid w-full grid-cols-2 gap-1 @xl:grid-cols-4 @4xl:order-none @4xl:flex @4xl:w-auto">
            {(["home", "providers", "locations", "costs"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => (v === "providers" ? openProviders() : go(v))}
                aria-current={view === v ? "page" : undefined}
                className="min-h-10 rounded-md px-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1d3a5f] @4xl:shrink-0"
                style={view === v ? { background: C.sageSoft, color: C.navy } : { color: C.muted }}
              >
                {tx.nav[v as keyof typeof tx.nav]}
              </button>
            ))}
          </nav>
          <Btn tone="coral" className="ml-auto" onClick={() => book("header")}>
            <CalendarCheck className="size-4" aria-hidden="true" />
            <span className="@md:hidden">{tx.bookShort}</span>
            <span className="hidden @md:inline">{tx.book}</span>
          </Btn>
        </div>

        <div role="status">
          {notice && (
            <p className="flex items-center gap-2 px-4 py-2 text-sm" style={{ background: C.sageSoft, color: C.navy }}>
              <CalendarCheck className="size-4 shrink-0" aria-hidden="true" />
              {notice}
            </p>
          )}
        </div>
        <p role="status" className="sr-only">
          {announce}
        </p>

        {/* views */}
        <div className="min-h-[34rem] p-4 sm:p-6">
          {view === "home" && (
            <div>
              <div className="rounded-2xl p-5 sm:p-8" style={{ background: C.sand }}>
                <h3 ref={viewHeading} tabIndex={-1} className="outline-none max-w-xl text-2xl font-bold leading-tight sm:text-3xl" style={{ color: C.navy }}>
                  {tx.heroTitle}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: C.muted }}>
                  {tx.heroText}
                </p>
                <form role="search" onSubmit={runSearch} className="mt-5 flex max-w-xl flex-col gap-2 sm:flex-row">
                  <label htmlFor="hc-search" className="sr-only">
                    {tx.searchLabel}
                  </label>
                  <input id="hc-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tx.searchPlaceholder} className="min-h-11 flex-1 rounded-lg border bg-white px-3 text-base placeholder:text-[#5f6b77] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1d3a5f]" style={{ borderColor: "#8a96a3" }} />
                  <Btn type="submit">
                    <Search className="size-4" aria-hidden="true" />
                    {tx.searchButton}
                  </Btn>
                </form>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { label: tx.quick.providers, Icon: Stethoscope, onClick: () => openProviders() },
                  { label: tx.quick.locations, Icon: MapPin, onClick: () => go("locations") },
                  { label: tx.quick.sameDay, Icon: Car, onClick: () => book("quick_same_day") },
                  { label: tx.quick.costs, Icon: Wallet, onClick: () => go("costs") },
                ].map(({ label, Icon, onClick }) => (
                  <button key={label} type="button" onClick={onClick} className="flex min-h-20 flex-col items-start justify-between gap-2 rounded-xl border p-3 text-left text-sm font-semibold transition-colors hover:bg-[#f7f3ea] focus-visible:outline-2 focus-visible:outline-[#1d3a5f]" style={{ borderColor: C.line, color: C.navy }}>
                    <Icon className="size-5" style={{ color: C.sage }} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
              <h3 className="mt-7 text-lg font-bold" style={{ color: C.navy }}>
                {tx.servicesTitle}
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => {
                  const Icon = ICON[s.id];
                  return (
                    <li key={s.id}>
                      <button type="button" onClick={() => openProviders(s.id)} className="flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-[#f7f3ea] focus-visible:outline-2 focus-visible:outline-[#1d3a5f]" style={{ borderColor: C.line }}>
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ background: C.sageSoft, color: C.sage }}>
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold" style={{ color: C.navy }}>
                            {s.name[lang]}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug" style={{ color: C.muted }}>
                            {s.blurb[lang]}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {view === "providers" && (
            <div>
              <h3 ref={viewHeading} tabIndex={-1} className="outline-none text-xl font-bold" style={{ color: C.navy }}>
                {tx.providerTitle}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border p-3 lg:grid-cols-4" style={{ borderColor: C.line, background: "#fbfbfa" }}>
                <Field label={tx.filters.service}>
                  <select className={selectCls} style={{ borderColor: "#8a96a3" }} value={fService} onChange={(e) => setFilter("service", setFService, e.target.value as ServiceId | "")}>
                    <option value="">{tx.filters.any}</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name[lang]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={tx.filters.language}>
                  <select className={selectCls} style={{ borderColor: "#8a96a3" }} value={fLang} onChange={(e) => setFilter("language", setFLang, e.target.value as LanguageId | "")}>
                    <option value="">{tx.filters.any}</option>
                    {languages.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name[lang]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={tx.filters.location}>
                  <select className={selectCls} style={{ borderColor: "#8a96a3" }} value={fLoc} onChange={(e) => setFilter("location", setFLoc, e.target.value)}>
                    <option value="">{tx.filters.any}</option>
                    {locations
                      .filter((l) => l.kind === "clinic")
                      .map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                  </select>
                </Field>
                <Field label={tx.filters.name}>
                  <input className={selectCls} style={{ borderColor: "#8a96a3" }} value={fName} onChange={(e) => setFilter("name", setFName, e.target.value)} />
                </Field>
                <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-1 lg:col-span-4">
                  {[
                    { label: tx.filters.accepting, on: fAccepting, set: () => setFilter("accepting_new", setFAccepting, !fAccepting) },
                    { label: tx.filters.telehealth, on: fVideo, set: () => setFilter("video_visits", setFVideo, !fVideo) },
                  ].map((c) => (
                    <label key={c.label} className="flex min-h-10 cursor-pointer items-center gap-2 text-sm font-semibold">
                      <input type="checkbox" checked={c.on} onChange={c.set} className="size-5 accent-[#1d3a5f]" />
                      {c.label}
                    </label>
                  ))}
                  <button type="button" onClick={() => openProviders()} className="ml-auto inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-sm font-semibold underline underline-offset-4" style={{ color: C.navy }}>
                    <Trash2 className="size-4" aria-hidden="true" />
                    {tx.filters.clear}
                  </button>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold" role="status" style={{ color: C.muted }}>
                {tx.results(filtered.length)}
              </p>
              <ul className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                {filtered.slice(0, shown).map((p) => (
                  <li key={p.id} className="flex gap-3 rounded-xl border p-3" style={{ borderColor: C.line }}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ background: p.gender === "f" ? "#e9eef7" : C.sageSoft, color: C.navy }} aria-hidden="true">
                      {initials(p.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold leading-snug" style={{ color: C.navy }}>
                        {p.name}, {p.credential}
                      </h4>
                      <p className="text-sm" style={{ color: C.muted }}>
                        {svcName(p.service, lang)} · {p.locations.map(locName).join(" · ")}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm" style={{ color: C.muted }}>
                        <Languages className="size-4 shrink-0" aria-hidden="true" />
                        {tx.speaks}: {p.languages.map((l) => langName(l, lang)).join(", ")}
                      </p>
                      <p className="mt-2 flex flex-wrap gap-1.5 text-xs font-semibold">
                        <span className="rounded-full px-2 py-1" style={p.accepting ? { background: C.sageSoft, color: C.sage } : { background: "#f1f2f4", color: C.muted }}>
                          {p.accepting ? tx.acceptingYes : tx.acceptingNo}
                        </span>
                        {p.telehealth && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ background: "#e9eef7", color: C.navy }}>
                            <Video className="size-3.5" aria-hidden="true" />
                            {tx.video}
                          </span>
                        )}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Btn tone="coral" className="min-h-9 px-3" onClick={() => book("provider_card", { provider_id: p.id, location: p.locations[0] })} disabled={!p.accepting} aria-label={`${tx.book}: ${p.name}`}>
                          {tx.book}
                        </Btn>
                        <Btn tone="outline" className="min-h-9 px-3" onClick={() => track("provider_profile_view", { provider_id: p.id, service: p.service, location: p.locations[0] })} aria-label={`${lang === "en" ? "View profile" : "Ver perfil"}: ${p.name}`}>
                          {lang === "en" ? "Profile" : "Perfil"}
                          <ChevronRight className="size-4" aria-hidden="true" />
                        </Btn>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {shown < filtered.length && (
                <div className="mt-4 flex justify-center">
                  <Btn tone="outline" onClick={() => setShown((s) => s + PAGE)}>
                    {tx.showMore} ({filtered.length - shown})
                  </Btn>
                </div>
              )}
            </div>
          )}

          {view === "locations" && (
            <div>
              <h3 ref={viewHeading} tabIndex={-1} className="outline-none text-xl font-bold" style={{ color: C.navy }}>
                {tx.locationsTitle}
              </h3>
              <div role="group" aria-label={tx.filters.service} className="mt-3 flex flex-wrap gap-2">
                {[{ id: "" as const, label: tx.allServices }, ...services.map((s) => ({ id: s.id, label: s.name[lang] }))].map((s) => (
                  <button
                    key={s.id || "all"}
                    type="button"
                    aria-pressed={locService === s.id}
                    onClick={() => {
                      setLocService(s.id);
                      track("location_filter", { service: s.id || "all" });
                    }}
                    className="min-h-9 rounded-full border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#1d3a5f]"
                    style={locService === s.id ? { background: C.navy, color: "#fff", borderColor: C.navy } : { borderColor: C.line, color: C.navy }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <ValleyMap lang={lang} locs={locList} selected={selectedLoc} onSelect={(id) => setSelectedLoc(id)} label={tx.mapLabel} />
                <LocationCard
                  loc={selected}
                  lang={lang}
                  onCall={() => track("click_to_call", { location: selected.id })}
                  onDirections={() => track("get_directions", { location: selected.id })}
                  onBook={() => book("location_card", { location: selected.id })}
                />
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {locList.map((l) => (
                  <li key={l.id}>
                    <button type="button" onClick={() => setSelectedLoc(l.id)} aria-pressed={selectedLoc === l.id} className="flex w-full items-start gap-2 rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-[#1d3a5f]" style={{ borderColor: selectedLoc === l.id ? C.navy : C.line, background: selectedLoc === l.id ? "#f4f7fb" : "#fff" }}>
                      <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: l.kind === "mobile" ? C.coral : C.sage }} aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold" style={{ color: C.navy }}>
                          {l.name}
                        </span>
                        <span className="block text-xs" style={{ color: C.muted }}>
                          {l.kind === "mobile" ? tx.mobileUnit : `${l.address}, ${l.town}`}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {view === "costs" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div>
                <h3 ref={viewHeading} tabIndex={-1} className="outline-none text-xl font-bold" style={{ color: C.navy }}>
                  {tx.costsTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.muted }}>
                  {tx.feeIntro}
                </p>
                <div role="region" aria-label={sitePages.find((p) => p.id === "sliding-fee")!.title[lang]} tabIndex={0} className="mt-4 overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d3a5f]" style={{ borderColor: C.line }}>
                  <table className="w-full min-w-[17rem] text-left text-sm">
                    <caption className="sr-only">{sitePages.find((p) => p.id === "sliding-fee")!.title[lang]}</caption>
                    <thead style={{ background: C.sand, color: C.navy }}>
                      <tr>
                        <th scope="col" className="px-3 py-2 font-bold">
                          {tx.feeHead.band}
                        </th>
                        <th scope="col" className="px-3 py-2 font-bold">
                          {tx.feeHead.medical}
                        </th>
                        <th scope="col" className="px-3 py-2 font-bold">
                          {tx.feeHead.dental}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {slidingFee.map((r) => (
                        <tr key={r.band} className="border-t" style={{ borderColor: C.line }}>
                          <th scope="row" className="px-3 py-2 font-semibold">
                            {r.band}
                          </th>
                          <td className="px-3 py-2">{r.medical === "Full fee" && lang === "es" ? "Tarifa completa" : r.medical}</td>
                          <td className="px-3 py-2">{r.dental === "Full fee" && lang === "es" ? "Tarifa completa" : r.dental}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: C.navy }}>
                  {tx.insuranceTitle}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {insurance.map((i) => (
                    <li key={i.en} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: C.line }}>
                      <span className="size-2 rounded-full" style={{ background: C.sage }} aria-hidden="true" />
                      {i[lang]}
                    </li>
                  ))}
                </ul>
                <Btn tone="coral" className="mt-4 w-full" onClick={() => book("costs_page")}>
                  {tx.book}
                </Btn>
              </div>
            </div>
          )}

          {view === "search" && result && (
            <div>
              <form role="search" onSubmit={runSearch} className="flex max-w-xl flex-col gap-2 sm:flex-row">
                <label htmlFor="hc-search-2" className="sr-only">
                  {tx.searchLabel}
                </label>
                <input id="hc-search-2" value={query} onChange={(e) => setQuery(e.target.value)} className="min-h-11 flex-1 rounded-lg border bg-white px-3 text-base focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1d3a5f]" style={{ borderColor: "#8a96a3" }} />
                <Btn type="submit">
                  <Search className="size-4" aria-hidden="true" />
                  {tx.searchButton}
                </Btn>
              </form>
              <h3 ref={viewHeading} tabIndex={-1} className="outline-none mt-5 text-xl font-bold" style={{ color: C.navy }}>
                {tx.searchResultsFor(result.query)}
              </h3>
              {result.correctedTo && (
                <p className="mt-1 text-sm" style={{ color: C.coral }}>
                  {tx.showingFor(result.correctedTo)}
                </p>
              )}
              {result.total === 0 ? (
                <p className="mt-4 text-sm" style={{ color: C.muted }}>
                  {tx.noResults} {brand.phone}
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {result.services.length + result.pages.length > 0 && (
                    <section aria-label={tx.groups.services}>
                      <h4 className="text-sm font-bold uppercase tracking-[0.08em]" style={{ color: C.sage }}>
                        {tx.groups.services} · {tx.groups.pages}
                      </h4>
                      <ul className="mt-2 flex flex-col gap-2">
                        {result.services.map((id) => (
                          <li key={id}>
                            <button type="button" onClick={() => openProviders(id)} className="flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold" style={{ borderColor: C.line, color: C.navy }}>
                              {svcName(id, lang)}
                              <ChevronRight className="size-4" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                        {result.pages.map((p) => (
                          <li key={p.id}>
                            <button type="button" onClick={() => go(p.view)} className="w-full rounded-lg border px-3 py-2 text-left text-sm" style={{ borderColor: C.line }}>
                              <span className="block font-semibold" style={{ color: C.navy }}>
                                {p.title[lang]}
                              </span>
                              <span style={{ color: C.muted }}>{p.summary[lang]}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {result.providers.length > 0 && (
                    <section aria-label={tx.groups.providers}>
                      <h4 className="text-sm font-bold uppercase tracking-[0.08em]" style={{ color: C.sage }}>
                        {tx.groups.providers} ({result.providers.length})
                      </h4>
                      <ul className="mt-2 flex flex-col gap-2">
                        {result.providers.slice(0, 5).map((p) => (
                          <li key={p.id} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: C.line }}>
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: C.sageSoft, color: C.navy }} aria-hidden="true">
                              {initials(p.name)}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold" style={{ color: C.navy }}>
                                {p.name}, {p.credential}
                              </span>
                              <span className="block text-xs" style={{ color: C.muted }}>
                                {svcName(p.service, lang)} · {p.languages.map((l) => langName(l, lang)).join(", ")}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      {result.providers.length > 5 && (
                        <button type="button" onClick={() => openProviders(result.services[0] ?? "", "")} className="mt-2 min-h-10 text-sm font-semibold underline underline-offset-4" style={{ color: C.navy }}>
                          {tx.showMore}
                        </button>
                      )}
                    </section>
                  )}
                  {result.locations.length > 0 && (
                    <section aria-label={tx.groups.locations}>
                      <h4 className="text-sm font-bold uppercase tracking-[0.08em]" style={{ color: C.sage }}>
                        {tx.groups.locations}
                      </h4>
                      <ul className="mt-2 flex flex-col gap-2">
                        {result.locations.map((l) => (
                          <li key={l.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedLoc(l.id);
                                go("locations");
                              }}
                              className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm"
                              style={{ borderColor: C.line }}
                            >
                              <MapPin className="size-4 shrink-0" style={{ color: C.sage }} aria-hidden="true" />
                              <span className="font-semibold" style={{ color: C.navy }}>
                                {l.name}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* site footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs" style={{ borderColor: C.line, color: C.muted, background: "#fbfbfa" }}>
          <span>
            © {brand.name} · <button type="button" className="underline underline-offset-2" onClick={() => track("click_to_call", { location: "main_line" })}>{brand.phone}</button>
          </span>
          <span className="flex items-center gap-1.5">
            <Accessibility className="size-4" aria-hidden="true" />
            {lang === "en" ? "Built to WCAG 2.2 AA" : "Construido según WCAG 2.2 AA"}
          </span>
        </div>
      </div>

      {/* ---------------- GTM preview pane ---------------- */}
      <aside aria-label="Analytics events from the demo" className="flex max-h-[44rem] flex-col overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-fg">GTM preview · dataLayer</p>
            <p className="text-xs text-muted">Events this demo would send to GA4</p>
          </div>
          <button type="button" onClick={() => setEvents([])} className="min-h-9 rounded-md border border-border px-2.5 text-xs text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Clear
          </button>
        </div>
        {/* Not a live region on purpose: announcing every event would drown out the demo itself. */}
        <ol tabIndex={0} aria-label="Event log, newest first" className="min-h-40 flex-1 overflow-y-auto px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent">
          {events.length === 0 ? (
            <li className="text-sm leading-relaxed text-muted">Use the demo: search, filter, switch language or press a button. Each action appears here as a GA4 event with its parameters.</li>
          ) : (
            events.map((e, i) => (
              <li key={`${e.at}-${i}`} className="border-b border-border py-2.5 last:border-b-0">
                <p className="flex items-center justify-between gap-2 font-mono text-[13px] text-fg">
                  <span className="font-semibold">{e.name}</span>
                  <span className="text-xs text-muted">+{(e.at / 1000).toFixed(1)}s</span>
                </p>
                <dl className="mt-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 font-mono text-xs">
                  {Object.entries(e.params).map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-muted">{k}</dt>
                      <dd className="truncate text-fg">{String(v) || "—"}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))
          )}
        </ol>
        <details className="border-t border-border px-4 py-3 text-sm">
          <summary className="cursor-pointer font-semibold text-fg">Full event plan ({eventPlan.length} events)</summary>
          <ul className="mt-2 flex flex-col gap-2">
            {eventPlan.map((e) => (
              <li key={e.event}>
                <span className="font-mono text-xs text-fg">{e.event}</span>
                <span className="block text-xs text-muted">
                  {e.when}: {e.params}
                </span>
              </li>
            ))}
          </ul>
        </details>
        <p className="border-t border-border px-4 py-2.5 text-xs text-muted">Nothing leaves this page. On a live site these go to GA4 through Google Tag Manager.</p>
      </aside>
    </div>
  );
}

/* ---------------- map ---------------- */

/**
 * Town labels sit beside their main clinic's pin, each on the side that stays clear of
 * the other pins at phone width (28 px pins on a ~320 px map). Fixed-size HTML text, so
 * labels stay readable at any map size.
 */
const TOWN_LABELS: { town: string; at: string; side: "above" | "aboveStart" | "right" | "below" }[] = [
  { town: "Coldwater", at: "coldwater", side: "above" },
  { town: "Pinecrest", at: "pinecrest", side: "right" },
  { town: "Juniper Falls", at: "juniper", side: "above" },
  { town: "Willow Springs", at: "willow", side: "aboveStart" },
  { town: "Alder Creek", at: "aldercreek", side: "below" },
  { town: "Red Mesa", at: "redmesa", side: "right" },
];
const LABEL_SHIFT = {
  above: "translate(-50%, calc(-100% - 31px))",
  aboveStart: "translate(-14px, calc(-100% - 31px))",
  right: "translate(18px, -21px)",
  below: "translate(-50%, 3px)",
};

function ValleyMap({ lang, locs, selected, onSelect, label }: { lang: Lang; locs: Location[]; selected: string; onSelect: (id: string) => void; label: string }) {
  return (
    <div className="relative aspect-[10/7] self-start overflow-hidden rounded-xl border" style={{ borderColor: C.line, background: "#f3efe4" }}>
      <svg viewBox="0 0 100 70" className="absolute inset-0 block h-full w-full" role="img" aria-label={label}>
        <rect width="100" height="70" fill="#f3efe4" />
        <path d="M0 52 C 18 46 28 58 44 50 S 70 34 100 40 L100 70 L0 70 Z" fill="#e6dfcd" />
        <path d="M-2 18 C 20 24 30 10 52 16 S 82 30 102 20" fill="none" stroke="#9cc3d5" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 66 L 30 40 L 48 31 L 70 20 L 92 8" fill="none" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M4 38 L 46 31 L 78 46 L 98 47" fill="none" stroke="#ffffff" strokeWidth="1.2" />
        <path d="M46 31 L 52 64" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      </svg>
      {TOWN_LABELS.map(({ town, at, side }) => {
        const l = locations.find((x) => x.id === at)!;
        return (
          <span
            key={town}
            aria-hidden="true"
            className="pointer-events-none absolute whitespace-nowrap text-[11px] font-semibold leading-[14px]"
            style={{ left: `${l.x}%`, top: `${l.y}%`, transform: LABEL_SHIFT[side], color: "#3e4a56", textShadow: "0 0 2px #f3efe4, 0 0 2px #f3efe4, 0 0 3px #f3efe4" }}
          >
            {town}
          </span>
        );
      })}
      {locs.map((l) => {
        const on = l.id === selected;
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => onSelect(l.id)}
            aria-label={`${l.name}${l.kind === "mobile" ? ` (${t[lang].mobileUnit})` : ""}`}
            aria-pressed={on}
            className="absolute flex size-7 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d3a5f]"
            style={{ left: `${l.x}%`, top: `${(l.y / 100) * 100}%`, background: on ? C.navy : l.kind === "mobile" ? C.coral : C.sage, color: "#fff", boxShadow: on ? "0 0 0 4px rgb(29 58 95 / 0.25)" : "0 2px 4px rgb(0 0 0 / 0.25)" }}
          >
            {l.kind === "mobile" ? <Car className="size-3.5" aria-hidden="true" /> : <MapPin className="size-3.5" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

function LocationCard({ loc, lang, onCall, onDirections, onBook }: { loc: Location; lang: Lang; onCall: () => void; onDirections: () => void; onBook: () => void }) {
  const tx = t[lang];
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: C.line }}>
      <p className="text-xs font-bold uppercase tracking-[0.08em]" style={{ color: loc.kind === "mobile" ? C.coral : C.sage }}>
        {loc.kind === "mobile" ? tx.mobileUnit : tx.clinic}
        {loc.walkIn ? ` · ${tx.walkIn}` : ""}
      </p>
      <h4 className="mt-1 text-lg font-bold" style={{ color: C.navy }}>
        {loc.name}
      </h4>
      <p className="text-sm" style={{ color: C.muted }}>
        {loc.kind === "mobile" ? loc.town : `${loc.address}, ${loc.town}`}
      </p>
      <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-sm">
        <dt className="font-semibold">{tx.hours}</dt>
        <dd>
          {loc.hours.map((h) => (
            <span key={h.days.en} className="block">
              {h.days[lang]} {h.time}
            </span>
          ))}
        </dd>
        <dt className="font-semibold">{lang === "en" ? "Services" : "Servicios"}</dt>
        <dd>{loc.services.map((s) => svcName(s, lang)).join(", ")}</dd>
      </dl>
      {loc.stops && (
        <div className="mt-3">
          <p className="text-sm font-semibold">{tx.thisWeek}</p>
          <ul className="mt-1 flex flex-col gap-1 text-sm" style={{ color: C.muted }}>
            {loc.stops.map((s) => (
              <li key={s.day.en + s.place}>
                <span className="font-semibold" style={{ color: C.ink }}>
                  {s.day[lang]}
                </span>{" "}
                {s.place}, {s.time}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn tone="outline" className="min-h-9 px-3" onClick={onCall} aria-label={`${tx.call} ${loc.name}: ${loc.phone}`}>
          <Phone className="size-4" aria-hidden="true" />
          {loc.phone}
        </Btn>
        {loc.kind === "clinic" && (
          <Btn tone="outline" className="min-h-9 px-3" onClick={onDirections}>
            <MapPin className="size-4" aria-hidden="true" />
            {tx.directions}
          </Btn>
        )}
        <Btn tone="coral" className="min-h-9 px-3" onClick={onBook}>
          {tx.book}
        </Btn>
      </div>
    </div>
  );
}
