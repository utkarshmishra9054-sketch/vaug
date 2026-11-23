import { Inter } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { CircleCheck, FileText, FolderOpen, Languages, LayoutDashboard, Receipt, Settings, Upload, Users } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { BarChart, Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Klartext AI · doclarity account portal, from doclarity.eu (read 23 Nov 2026): Inter, blue
 * #1c4fd6, ink #131922, slate #4a5768, on near-white. Settings (PDF/UA-1 or -2, contrast to WCAG A /
 * AA / AAA, alt-text language, page straightening, real form fields) and "check before you download"
 * are from the site. TODO(content): illustrative. "Gemeinde Musterstadt" (a placeholder town),
 * documents, people and numbers are invented; no doclarity prices are shown.
 */

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const FONT: CSSProperties = { fontFamily: inter.style.fontFamily };
const BLUE = "#1c4fd6";
const INK = "#131922";
const SLATE = "#4a5768";
const LINE = "#e3e8f0";
const WASH = "#eef2fd";
const LOGO = { src: "/logos/doclarity.webp", img: { w: 379, h: 106 } };

const NAV: [string, typeof Upload, number?][] = [
  ["Übersicht", LayoutDashboard],
  ["Dokumente", FolderOpen, 46],
  ["Hochladen", Upload],
  ["Regeln", Settings],
  ["Team", Users],
  ["Rechnungen", Receipt],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`app.doclarity.eu/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: INK, background: "#f7f9fc" }}>
        <aside className="flex w-[114px] shrink-0 flex-col border-r bg-white px-[8px] py-[10px]" style={{ borderColor: LINE }}>
          <Photo {...LOGO} w={72} h={20} />
          <nav className="mt-[12px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-[6px] px-[6px] text-[8.5px]" style={i === active ? { background: WASH, color: BLUE, fontWeight: 600 } : { color: SLATE }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto rounded-full bg-[#e8ecf5] px-[4px] text-[7px] font-bold">{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto space-y-[5px]">
            <div className="flex rounded-[5px] p-[2px] text-[7px] font-semibold" style={{ background: "#e8ecf5" }}>
              <span className="flex-1 rounded-[4px] bg-white py-[2px] text-center" style={{ color: BLUE }}>DE</span>
              <span className="flex-1 py-[2px] text-center" style={{ color: SLATE }}>EN</span>
            </div>
            <p className="text-[7.4px] font-semibold">Gemeinde Musterstadt</p>
            <p className="text-[6.8px]" style={{ color: SLATE }}>Jahresplan · 2.000 Seiten</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-bold tracking-[-0.01em]">{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: SLATE }}>{sub}</p>
            </div>
            <div className="ml-auto flex items-center gap-[6px]">{right}</div>
          </header>
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] rounded-[6px] px-[8px] text-[7.8px] font-semibold" style={solid ? { background: BLUE, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-semibold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal" style={{ color: SLATE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);
function Seg({ items, on }: { items: string[]; on: number }) {
  return (
    <span className="inline-flex rounded-[6px] p-[2px]" style={{ background: "#e8ecf5" }}>
      {items.map((t, i) => (
        <span key={t} className="rounded-[4px] px-[7px] py-[2px] text-[7.6px] font-semibold" style={i === on ? { background: "#fff", color: BLUE, boxShadow: "0 1px 2px rgb(0 0 0 / 0.1)" } : { color: SLATE }}>
          {t}
        </span>
      ))}
    </span>
  );
}

/* 01 · Documents ----------------------------------------------------- */

const DOCS: [string, number, string, "blue" | "amber" | "green" | "grey", string, "green" | "amber"][] = [
  ["Jahresbericht_2025.pdf", 48, "Bereit zur Prüfung", "blue", "Bestanden", "green"],
  ["Antrag_Wohnbeihilfe.docx", 6, "Wird bearbeitet · 64%", "amber", "—", "green"],
  ["Gemeinderat_Protokoll_Okt.pdf", 22, "Heruntergeladen", "green", "Bestanden", "green"],
  ["Leitfaden_Barrierefreiheit.pptx", 31, "Heruntergeladen", "green", "Bestanden", "green"],
  ["Budget_2026_Scan.pdf", 64, "Bereit zur Prüfung", "blue", "2 Hinweise", "amber"],
  ["Bebauungsplan_Nord.pdf", 12, "Heruntergeladen", "green", "Bestanden", "green"],
  ["Abfallkalender_2026.pdf", 4, "Heruntergeladen", "green", "Bestanden", "green"],
];
const DC = "1fr 34px 96px 64px";

const Documents: Screen = () => (
  <Portal path="dokumente" active={1} title="Dokumente" sub="November 2026 · 46 Dokumente · 1.284 Seiten" right={<Btn solid><Upload className="size-[9px]" aria-hidden="true" /> Hochladen</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Dokumente", "46", "diesen Monat"],
          ["Seiten", "1.284", "barrierefrei gemacht"],
          ["PDF/UA-Prüfung", "44 / 46", "maschinell bestanden"],
          ["Seiten übrig", "716", "von 2.000 im Plan"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-[8px] px-[9px] py-[7px]" style={i === 0 ? { background: BLUE, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.5px]" style={{ opacity: 0.75 }}>{k}</p>
            <p className="mt-[3px] text-[16px] font-bold leading-none">{v}</p>
            <p className="mt-[4px] text-[7px]" style={{ opacity: 0.7 }}>{s}</p>
          </div>
        ))}
      </div>
      <Box title="Zuletzt hochgeladen" right="PDF, Word, PowerPoint, LibreOffice" className="flex-1">
        <div className="grid h-[18px] items-center gap-[6px] text-[6.8px] font-semibold uppercase tracking-[0.08em]" style={{ gridTemplateColumns: DC, color: SLATE }}>
          <span>Datei</span>
          <span className="text-right">Seiten</span>
          <span>Status</span>
          <span>PDF/UA</span>
        </div>
        {DOCS.map((d, i) => (
          <div key={d[0]} className="grid h-[25px] items-center gap-[6px] border-t text-[8.2px]" style={{ gridTemplateColumns: DC, borderColor: LINE, background: i === 0 ? "#f5f8ff" : undefined }}>
            <span className="flex min-w-0 items-center gap-[4px]">
              <FileText className="size-[9px] shrink-0" style={{ color: BLUE }} aria-hidden="true" />
              <span className="truncate">{d[0]}</span>
            </span>
            <span className="text-right tabular-nums">{d[1]}</span>
            <span><Pill tone={d[3]} size={6.8}>{d[2]}</Pill></span>
            <span><Pill tone={d[5]} size={6.8}>{d[4]}</Pill></span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 02 · Rules set once ----------------------------------------------- */

const Rules: Screen = () => (
  <Portal path="regeln" active={3} title="Regeln für neue Dokumente" sub="Einmal festlegen, gilt für jede nächste Datei" right={<Btn solid>Speichern</Btn>}>
    <div className="grid h-full grid-cols-[1fr_170px] gap-[8px]">
      <Box title="Standard und Kontrast">
        <div className="space-y-[10px] text-[8.2px]">
          <div>
            <p className="font-semibold">PDF/UA-Version</p>
            <div className="mt-[3px]"><Seg items={["PDF/UA-1", "PDF/UA-2"]} on={0} /></div>
          </div>
          <div>
            <p className="font-semibold">Kontrast korrigieren nach WCAG</p>
            <div className="mt-[3px]"><Seg items={["A", "AA", "AAA"]} on={1} /></div>
            <p className="mt-[3px] text-[7.2px]" style={{ color: SLATE }}>Text und Grafiken unter 4,5 : 1 werden angepasst.</p>
          </div>
          <div>
            <p className="font-semibold">Sprache der Alternativtexte</p>
            <span className="mt-[3px] flex h-[20px] w-[150px] items-center gap-[4px] rounded-[5px] bg-white px-[6px] text-[7.8px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <Languages className="size-[9px]" style={{ color: BLUE }} aria-hidden="true" /> Deutsch (Österreich)
            </span>
          </div>
          <div className="space-y-[5px]">
            {[
              ["Seiten automatisch gerade ausrichten", true],
              ["Echte, ausfüllbare Formularfelder", true],
              ["Eigene Tagging-Regeln anwenden", false],
            ].map(([t, on]) => (
              <p key={t as string} className="flex items-center gap-[6px]">
                <span className="relative h-[11px] w-[20px] rounded-full" style={{ background: on ? BLUE : "#cbd3e1" }}>
                  <span className="absolute top-[1.5px] size-[8px] rounded-full bg-white" style={{ left: on ? 10.5 : 1.5 }} />
                </span>
                {t}
              </p>
            ))}
          </div>
        </div>
      </Box>
      <Box title="Hochladen">
        <div className="flex h-[110px] flex-col items-center justify-center rounded-[8px] text-center text-[7.6px]" style={{ border: `1.5px dashed ${BLUE}`, background: WASH, color: SLATE }}>
          <Upload className="size-[14px]" style={{ color: BLUE }} aria-hidden="true" />
          <p className="mt-[4px] font-semibold" style={{ color: INK }}>Datei hierher ziehen</p>
          <p>PDF, Word, PowerPoint, LibreOffice · auch gescannt</p>
        </div>
        <p className="mt-[8px] text-[7.2px] leading-[1.4]" style={{ color: SLATE }}>
          Gehostet in Europa. Sie prüfen jeden Vorschlag, bevor Sie herunterladen.
        </p>
      </Box>
    </div>
  </Portal>
);

/* 03 · Review before download --------------------------------------- */

const TAGS: [number, string, string][] = [
  [1, "H1", "Barrierefreie Services für alle"],
  [2, "P", "Seit Inkrafttreten des Barrierefreiheitsgesetzes…"],
  [3, "Figure", "Online erledigte Anträge, 2021–2025"],
  [4, "H2", "Anträge nach Kanal"],
  [5, "Table", "Kanal · 2024 · 2025"],
  [6, "List", "3 Punkte"],
  [7, "Formular", "Name, E-Mail, Großdruck"],
];

const Review: Screen = () => (
  <Portal path="dokumente/jahresbericht-2025/pruefen" active={1} title="Jahresbericht_2025.pdf · Seite 4 von 48" sub="Jeder Rahmen ist ein Element, die Zahl seine Lesereihenfolge · alles änderbar" right={<><Btn>Vorherige Seite</Btn><Btn solid>Herunterladen</Btn></>}>
    <div className="grid h-full grid-cols-[124px_1fr_138px] gap-[8px]">
      <Box title="Lesereihenfolge">
        <div className="space-y-[3px] text-[7.4px]">
          {TAGS.map(([n, t, d]) => (
            <p key={n} className="flex items-center gap-[4px] rounded-[4px] px-[3px] py-[2px]" style={n === 3 ? { background: WASH } : undefined}>
              <b className="w-[10px] text-right" style={{ color: BLUE }}>{n}</b>
              <span className="rounded-[3px] px-[3px] text-[6.6px] font-bold" style={{ background: "#e8ecf5" }}>{t}</span>
              <span className="truncate" style={{ color: SLATE }}>{d}</span>
            </p>
          ))}
        </div>
      </Box>
      <div className="relative overflow-hidden rounded-[6px] bg-white px-[14px] py-[10px]" style={{ boxShadow: `0 4px 14px -6px rgb(0 0 0 / 0.25), inset 0 0 0 1px ${LINE}` }}>
        <p className="text-[6px] tracking-[0.1em]" style={{ color: SLATE }}>GEMEINDE MUSTERSTADT · JAHRESBERICHT 2025</p>
        {[
          [1, <p key="h" className="text-[11px] font-bold leading-tight">Barrierefreie Services für alle</p>],
          [2, <p key="p" className="text-[6.6px] leading-[1.45]" style={{ color: SLATE }}>Seit Inkrafttreten des Barrierefreiheitsgesetzes erscheinen alle unsere Dokumente nach einem Standard.</p>],
          [
            3,
            <div key="f" className="flex h-[52px] items-end gap-[5px] px-[4px]">
              {[38, 49, 61, 72, 81].map((v) => (
                <span key={v} className="flex-1 rounded-t-[2px]" style={{ height: `${v * 0.6}px`, background: BLUE }} />
              ))}
            </div>,
          ],
          [4, <p key="h2" className="text-[8.6px] font-bold">Anträge nach Kanal</p>],
          [
            5,
            <div key="t" className="grid grid-cols-3 text-[6.4px]">
              {["Kanal", "2024", "2025", "Online", "72 %", "81 %", "Telefon", "18 %", "12 %"].map((c, i) => (
                <span key={i} className="border-b px-[2px] py-[1px]" style={{ borderColor: LINE, fontWeight: i < 3 ? 700 : 400 }}>{c}</span>
              ))}
            </div>,
          ],
        ].map(([n, el]) => (
          <div key={n as number} className="relative mt-[5px] rounded-[3px] p-[3px]" style={{ boxShadow: `inset 0 0 0 1px ${n === 3 ? BLUE : "#9db4f0"}`, background: n === 3 ? "rgb(28 79 214 / 0.06)" : undefined }}>
            <span className="absolute -left-[9px] -top-[5px] flex size-[12px] items-center justify-center rounded-full text-[6.5px] font-bold text-white" style={{ background: BLUE }}>{n as number}</span>
            {el as ReactNode}
          </div>
        ))}
      </div>
      <Box title="Element 3 · Figure">
        <p className="text-[7px] font-semibold uppercase tracking-[0.06em]" style={{ color: SLATE }}>Alternativtext (Vorschlag)</p>
        <p className="mt-[3px] rounded-[5px] p-[5px] text-[7.6px] leading-[1.4]" style={{ boxShadow: `inset 0 0 0 1px ${BLUE}` }}>
          Balkendiagramm: Anteil online erledigter Anträge stieg von 38 % (2021) auf 81 % (2025).
        </p>
        <p className="mt-[6px] text-[7px] font-semibold uppercase tracking-[0.06em]" style={{ color: SLATE }}>Sprache</p>
        <p className="text-[7.6px]">de-AT</p>
        <p className="mt-[6px] flex items-center gap-[3px] text-[7.2px] text-[#15803d]">
          <CircleCheck className="size-[8px]" aria-hidden="true" /> Kontrast 6,1 : 1 (AA)
        </p>
        <div className="mt-[8px] flex gap-[4px]">
          <Btn solid>Übernehmen</Btn>
          <Btn>Ändern</Btn>
        </div>
      </Box>
    </div>
  </Portal>
);

/* 04 · Team and usage ------------------------------------------------ */

const Team: Screen = () => (
  <Portal path="team" active={4} title="Team und Verbrauch" sub="Jahresplan · Seiten werden pro Dokument abgerechnet" right={<Btn solid><Users className="size-[9px]" aria-hidden="true" /> Einladen</Btn>}>
    <div className="grid h-full grid-cols-[1fr_190px] gap-[8px]">
      <Box title="Seiten pro Monat" right="2026">
        <BarChart
          w={250}
          h={170}
          max={400}
          bars={[[86], [120], [154], [140], [198], [176], [210], [164], [232], [260], [284], [0]]}
          colors={[BLUE]}
          labels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}
          yFormat={(n) => String(Math.round(n))}
          highlight={10}
        />
        <p className="mt-[4px] text-[7.2px]" style={{ color: SLATE }}>1.284 Seiten verbleiben bis 31. Dezember.</p>
      </Box>
      <Box title="Team (5)">
        <div className="space-y-[5px] text-[7.8px]">
          {[
            ["Sabine Huber", "Administratorin", "blue"],
            ["Markus Gruber", "Kommunikation", "grey"],
            ["Elif Yılmaz", "Bürgerservice", "grey"],
            ["Thomas Wagner", "Bauamt", "grey"],
            ["Anna Berger", "Nur Ansicht", "grey"],
          ].map(([n, r, t]) => (
            <p key={n} className="flex items-center gap-[6px]">
              <span className="flex size-[16px] items-center justify-center rounded-full text-[6.5px] font-bold text-white" style={{ background: t === "blue" ? BLUE : "#94a3b8" }}>
                {n.split(" ").map((x) => x[0]).join("")}
              </span>
              <span className="flex-1">{n}</span>
              <span className="text-[7px]" style={{ color: SLATE }}>{r}</span>
            </p>
          ))}
        </div>
      </Box>
    </div>
  </Portal>
);

/* 05 · Website (DE) on a laptop + portal on a phone ------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[20px]" style={{ ...FONT, color: INK, background: "linear-gradient(150deg, #f7f9fc, #dbe4fb)" }}>
    <Laptop w={410} h={262}>
      <div className="flex h-full flex-col bg-white px-[14px] py-[10px]">
        <div className="flex items-center">
          <Photo {...LOGO} w={58} h={16} />
          <span className="ml-auto flex items-center gap-[7px] text-[6.6px]" style={{ color: SLATE }}>
            <span>So funktioniert&apos;s</span>
            <span>Preise</span>
            <span>Studie</span>
            <span className="rounded-[3px] px-[4px] font-bold" style={{ background: WASH, color: BLUE }}>DE · EN</span>
          </span>
        </div>
        <p className="mt-[18px] text-[22px] font-bold leading-[1.05] tracking-[-0.02em]">Barrierefreie PDFs.</p>
        <p className="text-[22px] font-bold leading-[1.05] tracking-[-0.02em]" style={{ color: BLUE }}>Für alle lesbar.</p>
        <p className="mt-[8px] max-w-[260px] text-[7.4px] leading-[1.45]" style={{ color: SLATE }}>doclarity ergänzt Überschriften, Tabellen, Bildbeschreibungen und mehr. Sie prüfen, bevor Sie herunterladen.</p>
        <div className="mt-[8px] flex gap-[6px]">
          <span className="rounded-[5px] px-[8px] py-[3px] text-[7px] font-semibold text-white" style={{ background: BLUE }}>Kostenlos testen</span>
          <span className="rounded-[5px] px-[8px] py-[3px] text-[7px] font-semibold" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>PDF prüfen</span>
        </div>
      </div>
    </Laptop>
    <Phone w={142} h={290} bg="#f7f9fc">
      <div className="flex flex-1 flex-col px-[8px] pt-[4px]">
        <Photo {...LOGO} w={52} h={14} />
        <p className="mt-[8px] text-[10px] font-bold">Dokumente</p>
        {DOCS.slice(0, 4).map((d) => (
          <div key={d[0]} className="mt-[4px] rounded-[6px] bg-white p-[5px]" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="truncate text-[7px] font-semibold">{d[0]}</p>
            <span className="mt-[2px] inline-block"><Pill tone={d[3]} size={6}>{d[2]}</Pill></span>
          </div>
        ))}
      </div>
    </Phone>
  </div>
);

export const doclarityScreens: Screen[] = [Documents, Rules, Review, Team, LaptopPhone];
