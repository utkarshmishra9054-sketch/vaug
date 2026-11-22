import type { ReactNode } from "react";
import { ArrowRight, Building2, ChevronDown, FileText, Gauge, Image as ImageIcon, LayoutDashboard, Link2, MapPin, Search, Settings, Stethoscope, Users } from "lucide-react";

import { Bar, Btn, Check, Donut, Panel, Pill, Segments, Tag, Th, Toggle, Tr, type Screen } from "@/components/case-studies/screens/kit";
import { locations, providers, services } from "@/content/showcases/healthCentre";

/*
 * WordPress admin for the fictional Sagebrook Health Centers site: custom post
 * types (Providers, Locations, Services) with structured fields, and the
 * migration and redirect tools. Drawn on the 640 x 400 case-study canvas.
 * Illustrative screens with invented data.
 */

const SLATE = "#1f2a37";
const SAGE = "#3d6b53";
const NAVY = "#1d3a5f";
const LINE = "rgb(0 0 0 / 0.08)";

const MENU: { label: string; Icon: typeof Users; badge?: string }[] = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Pages", Icon: FileText },
  { label: "Providers", Icon: Stethoscope, badge: "100" },
  { label: "Locations", Icon: MapPin, badge: "9" },
  { label: "Services", Icon: Building2 },
  { label: "Media", Icon: ImageIcon },
  { label: "Redirects", Icon: Link2 },
  { label: "Users", Icon: Users },
  { label: "Settings", Icon: Settings },
];

function Admin({ active, title, action, children }: { active: number; title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#f1f3f5] text-[#1f2933]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div className="flex h-[22px] shrink-0 items-center gap-[8px] px-[8px] text-[8px] text-white/80" style={{ background: "#121820" }}>
        <span className="font-bold text-white">Sagebrook Health</span>
        <span>+ New</span>
        <span className="flex items-center gap-[3px] rounded-[3px] bg-white/10 px-[5px] py-[1px]">EN | ES</span>
        <span className="ml-auto">Howdy, Web editor</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="w-[96px] shrink-0 py-[6px] text-white" style={{ background: SLATE }}>
          {MENU.map((m, i) => (
            <span key={m.label} className={`flex h-[23px] items-center gap-[6px] px-[8px] text-[8.5px] ${i === active ? "font-bold" : "text-white/75"}`} style={i === active ? { background: SAGE } : undefined}>
              <m.Icon className="size-[10px] shrink-0" aria-hidden="true" />
              {m.label}
              {m.badge && <span className="ml-auto rounded-full bg-white/20 px-[4px] text-[7px] leading-[12px]">{m.badge}</span>}
            </span>
          ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col px-[12px] pt-[9px]">
          <div className="flex shrink-0 items-center gap-[8px]">
            <p className="text-[13px] font-bold tracking-[-0.01em]" style={{ color: NAVY }}>
              {title}
            </p>
            {action}
          </div>
          <div className="mt-[7px] min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

const svcName = (id: string) => services.find((s) => s.id === id)?.name.en ?? id;
const LANG: Record<string, string> = { en: "EN", es: "ES", tl: "TL", vi: "VI", ar: "AR", asl: "ASL", am: "AM", zh: "ZH" };
const LANG_NAME: Record<string, string> = { en: "English", es: "Spanish", tl: "Tagalog", vi: "Vietnamese", ar: "Arabic", asl: "ASL", am: "Amharic", zh: "Mandarin" };

/* 01 · Providers list ------------------------------------------------ */

const LIST_COLS = "14px minmax(0,1.3fr) minmax(0,0.9fr) minmax(0,1.1fr) 52px 58px 50px";

export const ProvidersList: Screen = () => (
  <Admin
    active={2}
    title="Providers"
    action={
      <Btn tint={SAGE} size="sm">
        Add provider
      </Btn>
    }
  >
    <div className="flex items-center gap-[6px] text-[8px]">
      <span className="font-semibold" style={{ color: NAVY }}>
        All (100)
      </span>
      <span className="text-black/55">| Accepting (70) | Video (34) | Drafts (2)</span>
      <span className="ml-auto flex h-[18px] w-[110px] items-center gap-[4px] rounded-[4px] bg-white px-[5px] text-black/45 ring-1 ring-black/10">
        <Search className="size-[8px]" aria-hidden="true" /> Search providers
      </span>
    </div>
    <div className="mt-[5px] flex items-center gap-[5px] text-[7.5px]">
      {["Bulk actions", "All services", "All locations", "All languages"].map((f) => (
        <span key={f} className="flex h-[17px] items-center gap-[3px] rounded-[4px] bg-white px-[5px] ring-1 ring-black/10">
          {f}
          <ChevronDown className="size-[7px] text-black/40" aria-hidden="true" />
        </span>
      ))}
      <span className="rounded-[4px] bg-white px-[5px] py-[3px] ring-1 ring-black/15">Filter</span>
      <span className="ml-auto text-black/55">100 items · 1 of 9</span>
    </div>
    <div className="mt-[5px] overflow-hidden rounded-[6px] bg-white ring-1 ring-black/[0.08]">
      <Th cols={LIST_COLS}>
        <Check tint={SAGE} />
        <span>Name</span>
        <span>Service</span>
        <span>Locations</span>
        <span>Speaks</span>
        <span>New pts</span>
        <span>Updated</span>
      </Th>
      {providers.slice(0, 9).map((p, i) => (
        <Tr key={p.id} cols={LIST_COLS} h={27} highlight={i === 2 ? "#f4f8f5" : undefined}>
          <Check tint={SAGE} on={i === 2} />
          <span className="truncate leading-tight">
            <span className="block truncate font-semibold" style={{ color: NAVY }}>
              {p.name}, {p.credential}
            </span>
            <span className="block text-[7px] text-black/50">{i === 2 ? "Edit · Quick edit · View" : "Published"}</span>
          </span>
          <span className="truncate">{svcName(p.service)}</span>
          <span className="truncate text-black/60">{p.locations.map((l) => { const loc = locations.find((x) => x.id === l); return loc?.kind === "mobile" ? "Mobile unit" : loc?.town; }).join(", ")}</span>
          <span className="truncate text-black/60">{p.languages.map((l) => LANG[l]).join(" ")}</span>
          <span>
            <Pill tone={p.accepting ? "green" : "grey"} size={6.5}>
              {p.accepting ? "Yes" : "No"}
            </Pill>
          </span>
          <span className="text-[7.5px] text-black/55">{["2 days", "1 wk", "today", "3 wks", "5 days", "1 mo", "2 wks", "today", "4 days"][i]}</span>
        </Tr>
      ))}
    </div>
  </Admin>
);

/* 02 · Edit provider ------------------------------------------------- */

function FieldRow({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-start gap-[8px] border-b py-[5px] text-[8px] last:border-b-0" style={{ borderColor: LINE }}>
      <span className="pt-[2px] font-semibold">
        {label}
        {hint && <span className="block text-[6.5px] font-normal text-black/45">{hint}</span>}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export const EditProvider: Screen = () => {
  const p = providers[2];
  return (
    <Admin active={2} title="Edit provider" action={<Tag color={SAGE} size={7}>Custom post type · structured fields</Tag>}>
      <div className="grid h-full grid-cols-[minmax(0,1fr)_150px] gap-[8px]">
        <div className="min-h-0 overflow-hidden">
          <div className="rounded-[6px] bg-white px-[8px] py-[6px] text-[12px] font-bold ring-1 ring-black/[0.08]" style={{ color: NAVY }}>
            {p.name}
          </div>
          <Panel title="Provider details" className="mt-[6px]" pad={false}>
            <div className="px-[8px]">
              <FieldRow label="Credentials">
                <span className="inline-flex h-[17px] items-center rounded-[4px] px-[6px] ring-1 ring-black/15">{p.credential}</span>
              </FieldRow>
              <FieldRow label="Service" hint="drives filters + search">
                <span className="inline-flex h-[17px] w-[140px] items-center justify-between rounded-[4px] px-[6px] ring-1 ring-black/15">
                  {svcName(p.service)}
                  <ChevronDown className="size-[7px]" aria-hidden="true" />
                </span>
              </FieldRow>
              <FieldRow label="Locations">
                <span className="flex flex-wrap gap-x-[9px] gap-y-[3px]">
                  {locations
                    .filter((l) => l.kind === "clinic")
                    .slice(0, 5)
                    .map((l) => (
                      <span key={l.id} className="flex items-center gap-[3px]">
                        <Check tint={SAGE} on={p.locations.includes(l.id)} />
                        {l.town}
                      </span>
                    ))}
                </span>
              </FieldRow>
              <FieldRow label="Languages">
                <span className="flex flex-wrap gap-[3px]">
                  {[...p.languages.map((l) => [LANG_NAME[l], true] as const), ["Add language", false] as const].map(([l, on]) => (
                    <Tag key={l} color={on ? SAGE : "#94a3b8"} size={7}>
                      {l} {on ? "✓" : "+"}
                    </Tag>
                  ))}
                </span>
              </FieldRow>
              <FieldRow label="Accepting new patients">
                <span className="flex items-center gap-[5px]">
                  <Toggle on tint={SAGE} /> Shown on profile and in the “accepting” filter
                </span>
              </FieldRow>
              <FieldRow label="Video visits">
                <span className="flex items-center gap-[5px]">
                  <Toggle on={p.telehealth} tint={SAGE} /> Telehealth badge
                </span>
              </FieldRow>
              <FieldRow label="Biography">
                <Segments items={["English", "Español"]} active={0} tint={SAGE} />
                <p className="mt-[4px] rounded-[4px] p-[5px] leading-[1.4] text-black/70 ring-1 ring-black/10">
                  {p.name.split(" ")[0]} cares for adults and children in {svcName(p.service).toLowerCase()}, with a focus on diabetes and preventive care.
                </p>
              </FieldRow>
            </div>
          </Panel>
        </div>
        <div className="flex min-h-0 flex-col gap-[6px]">
          <Panel title="Publish">
            <div className="space-y-[3px] text-[7.5px] text-black/65">
              <p>Status: Published</p>
              <p>Spanish version: complete</p>
              <p>Last edited: today 09:42</p>
            </div>
            <Btn tint={SAGE} size="sm" style={{ marginTop: 6, width: "100%" }}>
              Update
            </Btn>
          </Panel>
          <Panel title="Photo">
            <div className="flex h-[44px] items-center justify-center rounded-[5px] text-[16px] font-bold text-white" style={{ background: NAVY }}>
              {p.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>
            <p className="mt-[4px] text-[7px] text-black/55">Alt text: required before publish</p>
          </Panel>
          <Panel title="Search & schema">
            <p className="text-[7px] leading-[1.4] text-black/60">Physician schema (JSON-LD) generated from these fields. Profile URL /providers/{p.name.toLowerCase().replace(/\s+/g, "-")}</p>
          </Panel>
        </div>
      </div>
    </Admin>
  );
};

/* 03 · Edit location ------------------------------------------------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const EditLocation: Screen = () => {
  const l = locations[0];
  return (
    <Admin active={3} title="Edit location" action={<Tag color={SAGE} size={7}>Hours, services and map pin</Tag>}>
      <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-[8px]">
        <div className="flex min-h-0 flex-col gap-[6px]">
          <div className="rounded-[6px] bg-white px-[8px] py-[6px] text-[12px] font-bold ring-1 ring-black/[0.08]" style={{ color: NAVY }}>
            {l.name}
          </div>
          <Panel title="Opening hours" action={<span>Shown as “Open now” on the site</span>} pad={false}>
            {DAYS.map((d, i) => (
              <div key={d} className="flex h-[19px] items-center gap-[6px] border-b px-[8px] text-[8px] last:border-b-0" style={{ borderColor: LINE }}>
                <span className="w-[24px] font-semibold">{d}</span>
                <Toggle on={i < 6} tint={SAGE} />
                <span className="text-black/65">{i < 5 ? "07:30 – 19:00" : i === 5 ? "08:00 – 13:00" : "Closed"}</span>
                {i < 5 && <span className="ml-auto text-[7px] text-black/45">Walk-ins until 17:00</span>}
              </div>
            ))}
          </Panel>
          <Panel title="Services at this location">
            <div className="flex flex-wrap gap-x-[9px] gap-y-[4px] text-[8px]">
              {services.map((s) => (
                <span key={s.id} className="flex items-center gap-[3px]">
                  <Check tint={SAGE} on={l.services.includes(s.id)} />
                  {s.name.en}
                </span>
              ))}
            </div>
          </Panel>
        </div>
        <div className="flex min-h-0 flex-col gap-[6px]">
          <Panel title="Address and map pin">
            <p className="text-[8px]">
              {l.address}, {l.town}
            </p>
            <div className="relative mt-[5px] h-[86px] overflow-hidden rounded-[5px]" style={{ background: "#f3efe4" }}>
              <svg viewBox="0 0 100 60" className="absolute inset-0 size-full" aria-hidden="true">
                <path d="M-2 14 C 20 20 30 6 52 12 S 82 26 102 16" fill="none" stroke="#9cc3d5" strokeWidth="3" />
                <path d="M0 50 L 40 28 L 100 34" fill="none" stroke="#fff" strokeWidth="2.4" />
                <path d="M40 28 L 48 60" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>
              <span className="absolute left-[44%] top-[34%] flex size-[16px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white" style={{ background: SAGE }}>
                <MapPin className="size-[9px]" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-[4px] text-[7px] text-black/50">Pin placed from the address; drag to adjust</p>
          </Panel>
          <Panel title="Contact">
            <div className="space-y-[3px] text-[8px]">
              <p>Phone: {l.phone}</p>
              <p className="flex items-center gap-[4px]">
                <Toggle on tint={SAGE} /> Walk-ins welcome
              </p>
              <p className="flex items-center gap-[4px]">
                <Toggle on tint={SAGE} /> Pharmacy on site
              </p>
            </div>
          </Panel>
          <Panel title="Translations">
            <div className="space-y-[3px] text-[7.5px]">
              <p className="flex justify-between">
                <span>English</span>
                <Pill tone="green" size={6.5}>
                  Published
                </Pill>
              </p>
              <p className="flex justify-between">
                <span>Español</span>
                <Pill tone="green" size={6.5}>
                  Published
                </Pill>
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </Admin>
  );
};

/* 04 · Migration and redirects --------------------------------------- */

const REDIRECTS: [string, string, string][] = [
  ["/services/dental-care.html", "/services/dental/", "1,284"],
  ["/doctors/?id=118", "/providers/maria-garcia/", "642"],
  ["/locations/juniper.php", "/locations/juniper-falls/", "511"],
  ["/espanol/servicios.html", "/es/servicios/", "380"],
  ["/pay-my-bill", "/costs/#billing", "207"],
  ["/news/2019/flu-clinic", "/vaccines/", "96"],
];
const RCOLS = "minmax(0,1.25fr) 12px minmax(0,1.2fr) 30px 40px";

export const MigrationRedirects: Screen = () => (
  <Admin active={6} title="Migration and redirects" action={<Tag color={SAGE} size={7}>312 items mapped</Tag>}>
    <div className="grid h-full grid-cols-[150px_minmax(0,1fr)] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[6px]">
        <Panel title="Content inventory">
          <div className="flex items-center gap-[8px]">
            <Donut size={58} stroke={9} segments={[{ value: 60, color: SAGE }, { value: 31, color: NAVY }, { value: 9, color: "#b3471f" }]}>
              <span className="text-[11px] font-bold">312</span>
              <span className="text-[7px] text-black/55">items</span>
            </Donut>
            <div className="space-y-[3px] text-[7.5px]">
              {[
                ["Keep", 188, SAGE],
                ["Rewrite", 96, NAVY],
                ["Retire", 28, "#b3471f"],
              ].map(([k, v, c]) => (
                <p key={k as string} className="flex items-center gap-[4px]">
                  <span className="size-[6px] rounded-[2px]" style={{ background: c as string }} />
                  {k} <b>{v}</b>
                </p>
              ))}
            </div>
          </div>
        </Panel>
        <Panel title="Launch checks">
          <div className="space-y-[4px] text-[7.5px]">
            {[
              ["URLs with a 301 or a match", "312 / 312"],
              ["Redirect chains", "0"],
              ["Broken internal links", "0"],
              ["Pages missing a title", "0"],
            ].map(([k, v]) => (
              <p key={k} className="flex items-center justify-between gap-[4px]">
                <span className="text-black/65">{k}</span>
                <b style={{ color: SAGE }}>{v}</b>
              </p>
            ))}
          </div>
        </Panel>
        <Panel title="Search traffic guardrail">
          <p className="text-[15px] font-bold leading-none" style={{ color: NAVY }}>
            ≥ 95%
          </p>
          <p className="mt-[2px] text-[7px] text-black/50">of organic clicks kept at day 30, tracked daily after launch</p>
          <div className="mt-[4px]">
            <Bar pct={95} color={SAGE} h={4} />
          </div>
        </Panel>
      </div>
      <Panel title="Redirect map" action={<span className="flex items-center gap-[3px]"><Gauge className="size-[8px]" aria-hidden="true" /> hits last 30 days</span>} pad={false}>
        <Th cols={RCOLS}>
          <span>Old URL</span>
          <span />
          <span>New URL</span>
          <span>Code</span>
          <span>Hits</span>
        </Th>
        {REDIRECTS.map(([a, b, h]) => (
          <Tr key={a} cols={RCOLS} h={26}>
            <span className="truncate font-mono text-[7.5px] text-black/65">{a}</span>
            <ArrowRight className="size-[8px] text-black/35" aria-hidden="true" />
            <span className="truncate font-mono text-[7.5px]" style={{ color: NAVY }}>
              {b}
            </span>
            <Pill tone="green" size={6.5}>
              301
            </Pill>
            <span className="text-right tabular-nums text-black/60">{h}</span>
          </Tr>
        ))}
        <p className="px-[10px] py-[6px] text-[7px] leading-[1.4] text-black/50">Every old URL from the crawl is mapped before launch. Retired pages redirect to the closest live page, never to the home page.</p>
      </Panel>
    </div>
  </Admin>
);

export const adminScreens: Screen[] = [ProvidersList, EditProvider, EditLocation, MigrationRedirects];
export const adminCaptions = [
  "WordPress admin: the Providers custom post type, with filters for service, location and language",
  "Editing a provider: structured fields drive the finder, the filters, search and schema markup",
  "Editing a location: opening hours, services, walk-in flag and map pin, in English and Spanish",
  "Migration: 312 items inventoried (keep, rewrite, retire) and every old URL mapped to a 301",
];
