import { Montserrat } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Bell, Check, Flame, Gauge, Home, LayoutGrid, Moon, Sun, Thermometer, Zap } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { BarChart, Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Thermal Dawn · quote flow, homeowner app and fleet telemetry, from thermaldawn.com (read 23 Nov
 * 2026): Montserrat, near-black #14100d / #1c1514, sand #f3ece6, the yellow #fec800 to orange #ff9c00
 * to #ea5b13 gradient, brown #ad5700. Product facts (charging in a free window, from solar or off-peak;
 * running the evening with the compressor off; radiators or slab; learns home, solar, weather, tariff)
 * are from the site. TODO(content): illustrative. Homes (system IDs and suburbs only), readings,
 * requests and charts are invented; Thermal Dawn's own field figures are not used.
 */

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});
const FONT: CSSProperties = { fontFamily: mont.style.fontFamily };
const DARK = "#14100d";
const PANEL = "#1f1915";
const SAND = "#f3ece6";
const BROWN = "#ad5700";
const AMBER = "#ff9c00";
const GRAD = "linear-gradient(100deg, #fec800 0%, #ff9c00 52%, #ea5b13 100%)";
const LINE = "rgb(255 255 255 / 0.09)";
const MUTE = "rgb(255 255 255 / 0.6)";
const LOGO = {
  src: "/case-studies/home-thermal-storage-platform-australia/logo-white.webp",
  img: { w: 565, h: 75 },
};

function Ops({ path, title, sub, right, children }: { path: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`ops.thermaldawn.com/${path}`} dark>
      <div className="flex h-full flex-col" style={{ ...FONT, background: DARK, color: "#fff" }}>
        <div className="flex h-[34px] shrink-0 items-center gap-[10px] border-b px-[12px]" style={{ borderColor: LINE }}>
          <Photo {...LOGO} w={84} h={11} />
          <nav className="ml-[6px] flex gap-[10px] text-[8px] font-semibold" style={{ color: MUTE }}>
            {["Quotes", "Fleet", "Homes", "Alerts", "Website data"].map((t) => (
              <span key={t} style={t === path.split("/")[0].replace(/^\w/, (c) => c.toUpperCase()) ? { color: AMBER } : undefined}>
                {t}
              </span>
            ))}
          </nav>
          <Bell className="ml-auto size-[11px]" style={{ color: MUTE }} aria-hidden="true" />
        </div>
        <div className="flex h-[38px] shrink-0 items-center px-[12px]">
          <div className="leading-tight">
            <p className="text-[12.5px] font-extrabold">{title}</p>
            <p className="text-[7.5px]" style={{ color: MUTE }}>
              {sub}
            </p>
          </div>
          <div className="ml-auto flex gap-[6px]">{right}</div>
        </div>
        <div className="min-h-0 flex-1 px-[10px] pb-[10px]">{children}</div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span
    className="inline-flex h-[21px] items-center gap-[4px] rounded-[5px] px-[9px] text-[7.8px] font-bold"
    style={solid ? { background: GRAD, color: DARK } : { boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.25)" }}
  >
    {children}
  </span>
);
const Card = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] ${className}`} style={{ background: PANEL, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-bold" style={{ borderColor: LINE }}>
        {title}
        {right && (
          <span className="text-[7.4px] font-normal" style={{ color: MUTE }}>
            {right}
          </span>
        )}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);

/* 01 · Quote flow: home-fit check ----------------------------------- */

const QuoteFlow: Screen = () => (
  <div className="flex h-full w-full items-center justify-center" style={{ ...FONT, background: SAND }}>
    <Browser w={600} h={370} url="www.thermaldawn.com/request-quote/">
      <div className="flex h-full" style={{ ...FONT, background: SAND, color: DARK }}>
        <div className="w-[200px] shrink-0 p-[16px] text-white" style={{ background: DARK }}>
          <Photo {...LOGO} w={110} h={14} />
          <p className="mt-[18px] text-[17px] font-extrabold leading-[1.1]">
            Does Thermal Dawn <span style={{ color: AMBER }}>fit your home?</span>
          </p>
          <p className="mt-[8px] text-[7.6px] leading-[1.45]" style={{ color: MUTE }}>
            Two minutes. We confirm the fit, then quote your equipment. Nothing to pay until you approve it.
          </p>
          <div className="mt-[14px] space-y-[5px] text-[7.6px]">
            {["Your heating", "Your power", "Your home", "Your details"].map((s, i) => (
              <p key={s} className="flex items-center gap-[6px]" style={{ color: i < 2 ? "#fff" : MUTE }}>
                <span
                  className="flex size-[14px] items-center justify-center rounded-full text-[7px] font-bold"
                  style={
                    i < 2
                      ? { background: GRAD, color: DARK }
                      : {
                          boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.3)",
                        }
                  }
                >
                  {i < 1 ? <Check className="size-[8px]" aria-hidden="true" /> : i + 1}
                </span>
                {s}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-1 p-[16px]">
          <p className="text-[7px] font-bold uppercase tracking-[0.12em]" style={{ color: BROWN }}>
            Step 2 of 4 · Your power
          </p>
          <p className="mt-[3px] text-[13px] font-extrabold">How does your home get its power?</p>
          <div className="mt-[10px] space-y-[8px] text-[8px]">
            <div>
              <p className="font-bold">Rooftop solar</p>
              <div className="mt-[3px] grid grid-cols-4 gap-[4px]">
                {["None", "Under 5 kW", "5–10 kW", "Over 10 kW"].map((o, i) => (
                  <span
                    key={o}
                    className="rounded-[5px] py-[5px] text-center font-semibold"
                    style={
                      i === 2
                        ? { background: DARK, color: "#fff" }
                        : {
                            background: "#fff",
                            boxShadow: "inset 0 0 0 1px #e4ded8",
                          }
                    }
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold">Your tariff</p>
              <div className="mt-[3px] grid grid-cols-3 gap-[4px]">
                {["Flat rate", "Time of use", "Free window plan"].map((o, i) => (
                  <span
                    key={o}
                    className="rounded-[5px] py-[5px] text-center font-semibold"
                    style={
                      i === 1
                        ? { background: DARK, color: "#fff" }
                        : {
                            background: "#fff",
                            boxShadow: "inset 0 0 0 1px #e4ded8",
                          }
                    }
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold">Gas boiler size (from the label)</p>
              <span className="mt-[3px] flex h-[22px] w-[160px] items-center rounded-[5px] bg-white px-[7px] font-semibold" style={{ boxShadow: "inset 0 0 0 1px #e4ded8" }}>
                28 kW
              </span>
            </div>
          </div>
          <div className="mt-[12px] flex items-center gap-[8px]">
            <span className="rounded-[5px] px-[14px] py-[6px] text-[8px] font-extrabold" style={{ background: GRAD, color: DARK }}>
              Next: your home →
            </span>
            <span className="text-[7.2px]" style={{ color: BROWN }}>
              Just keeping an eye on it? Get email updates
            </span>
          </div>
        </div>
      </div>
    </Browser>
  </div>
);

/* 02 · Homeowner app -------------------------------------------------- */

function StoreGauge({ v }: { v: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" className="size-[108px]" aria-hidden="true">
      <defs>
        <linearGradient id="td-g" x1="0" x2="1">
          <stop offset="0" stopColor="#fec800" />
          <stop offset="0.5" stopColor="#ff9c00" />
          <stop offset="1" stopColor="#ea5b13" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="10" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="url(#td-g)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(c * v) / 100} ${c}`} transform="rotate(-90 60 60)" />
      <text x="60" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff">
        {v}%
      </text>
      <text x="60" y="74" textAnchor="middle" fontSize="8" fill="rgb(255 255 255 / 0.6)">
        store charged
      </text>
    </svg>
  );
}

const HomeApp: Screen = () => (
  <div
    className="flex h-full w-full items-center justify-center gap-[28px]"
    style={{
      ...FONT,
      background: `radial-gradient(circle at 70% 20%, #3a2a12, ${DARK} 65%)`,
    }}
  >
    <Phone w={172} h={354} bg={DARK} dark>
      <div className="flex flex-1 flex-col px-[10px] pt-[4px] text-white">
        <Photo {...LOGO} w={96} h={13} />
        <p className="mt-[6px] text-[7px]" style={{ color: MUTE }}>
          Home · Camberwell · 21.4°C inside
        </p>
        <div className="mt-[4px] flex justify-center">
          <StoreGauge v={86} />
        </div>
        <p className="text-center text-[8.4px] font-bold">Tonight: compressor off 5–9 pm</p>
        <p className="text-center text-[7px]" style={{ color: MUTE }}>
          Stored heat carries the house through the peak.
        </p>
        <div className="mt-[8px] rounded-[8px] p-[7px]" style={{ background: PANEL }}>
          <p className="text-[7px] font-bold uppercase tracking-[0.08em]" style={{ color: AMBER }}>
            Today&apos;s plan
          </p>
          {[
            [Sun, "11:00–14:00", "Charge from solar"],
            [Zap, "14:00–15:00", "Free window top-up"],
            [Moon, "17:00–21:00", "Run on stored heat"],
            [Moon, "00:30–05:00", "Off-peak, if needed"],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Sun;
            return (
              <p key={t as string} className="mt-[4px] flex items-center gap-[5px] text-[7.2px]">
                <Icon className="size-[9px] shrink-0" style={{ color: AMBER }} aria-hidden="true" />
                <b className="w-[54px] shrink-0">{t as string}</b>
                <span style={{ color: MUTE }}>{d as string}</span>
              </p>
            );
          })}
        </div>
      </div>
    </Phone>
    <Phone w={172} h={354} bg={DARK} dark>
      <div className="flex flex-1 flex-col px-[10px] pt-[4px] text-white">
        <p className="text-[11px] font-extrabold">Comfort</p>
        <p className="text-[7px]" style={{ color: MUTE }}>
          Radiators · 6 zones
        </p>
        {[
          ["Living", "21.5°", 72],
          ["Bedrooms", "19.0°", 48],
          ["Hot water", "55°", 88],
        ].map(([z, t, f]) => (
          <div key={z as string} className="mt-[7px] rounded-[8px] p-[7px]" style={{ background: PANEL }}>
            <p className="flex items-center justify-between text-[8px]">
              <span className="flex items-center gap-[4px]">
                <Thermometer className="size-[9px]" style={{ color: AMBER }} aria-hidden="true" />
                {z}
              </span>
              <b className="text-[11px]">{t}</b>
            </p>
            <span className="mt-[4px] block h-[4px] rounded-full bg-white/10">
              <span className="block h-full rounded-full" style={{ width: `${f}%`, background: GRAD }} />
            </span>
          </div>
        ))}
        <div className="mt-[7px] rounded-[8px] p-[7px] text-[7.2px] leading-[1.4]" style={{ background: PANEL }}>
          <b>Why charge at 11?</b> Your solar forecast is strong until 2 pm and tonight drops to 6°C, so the store fills from your panels first.
        </div>
      </div>
    </Phone>
  </div>
);

/* 03 · Fleet --------------------------------------------------------- */

const HOMES: [string, string, string, number, string, "green" | "amber" | "grey"][] = [
  ["TD-014", "Camberwell, VIC", "Radiators", 86, "Off 5–9 pm", "green"],
  ["TD-011", "Brunswick, VIC", "Slab", 91, "Off 5–9 pm", "green"],
  ["TD-019", "Ballarat, VIC", "Radiators", 64, "Off 5–8 pm", "amber"],
  ["TD-008", "Kew, VIC", "Slab", 88, "Off 5–9 pm", "green"],
  ["TD-022", "Geelong, VIC", "Radiators", 71, "Off 5–9 pm", "green"],
  ["TD-025", "Bendigo, VIC", "Radiators", 0, "Commissioning", "grey"],
];
const HC = "50px 92px 62px 1fr 70px";

const Fleet: Screen = () => (
  <Ops path="fleet" title="Fleet · installed homes" sub="Live from each system's telemetry · tonight's evening peak 5–9 pm" right={<Btn>Export</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Homes online", "5 / 6", "1 commissioning"],
          ["Avg store charge", "80%", "at 16:00"],
          ["Alerts", "1", "TD-019 low charge"],
          ["Installs booked", "4", "next: Mon 30 Nov"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-[8px] px-[9px] py-[7px]" style={i === 0 ? { background: GRAD, color: DARK } : { background: PANEL, boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.4px] font-semibold" style={{ opacity: 0.75 }}>
              {k}
            </p>
            <p className="mt-[3px] text-[16px] font-extrabold leading-none">{v}</p>
            <p className="mt-[4px] text-[7px]" style={{ opacity: 0.7 }}>
              {s}
            </p>
          </div>
        ))}
      </div>
      <Card title="Homes" right="System IDs only · no personal data" className="flex-1">
        {HOMES.map((h) => (
          <div key={h[0]} className="grid h-[26px] items-center gap-[6px] border-b text-[8px] last:border-b-0" style={{ gridTemplateColumns: HC, borderColor: LINE }}>
            <b className="font-mono">{h[0]}</b>
            <span>{h[1]}</span>
            <span style={{ color: MUTE }}>{h[2]}</span>
            <span className="flex items-center gap-[4px]">
              <span className="h-[5px] flex-1 rounded-full bg-white/10">
                <span className="block h-full rounded-full" style={{ width: `${h[3]}%`, background: GRAD }} />
              </span>
              <span className="w-[22px] text-right text-[7px] tabular-nums">{h[3] ? `${h[3]}%` : "—"}</span>
            </span>
            <span>
              <Pill tone={h[5]} size={6.8}>
                {h[4]}
              </Pill>
            </span>
          </div>
        ))}
      </Card>
    </div>
  </Ops>
);

/* 04 · One home's week ------------------------------------------------ */

const DarkLegend = ({ items }: { items: [string, string][] }) => (
  <span className="flex items-center gap-[8px]">
    {items.map(([l, c]) => (
      <span key={l} className="flex items-center gap-[3px]">
        <span className="size-[6px] rounded-[2px]" style={{ background: c }} />
        {l}
      </span>
    ))}
  </span>
);

const Week: Screen = () => (
  <Ops path="homes/TD-014" title="TD-014 · Camberwell · last 7 days" sub="When the store charged, and the evening peak with the compressor off" right={<Btn solid>Share with homeowner</Btn>}>
    <div className="grid h-full grid-cols-[1fr_160px] gap-[8px]">
      <Card
        title="Energy into the store, kWh"
        right={
          <DarkLegend
            items={[
              ["Solar", "#fec800"],
              ["Free window", "#ff9c00"],
              ["Off-peak", "#ea5b13"],
            ]}
          />
        }
      >
        <div className="[&_line]:stroke-white/10 [&_text]:fill-white/60">
          <BarChart
            w={426}
            h={226}
            max={40}
            bars={[
              [18, 8, 6],
              [21, 8, 4],
              [9, 8, 14],
              [16, 8, 7],
              [22, 8, 2],
              [12, 8, 11],
              [19, 8, 5],
            ]}
            colors={["#fec800", "#ff9c00", "#ea5b13"]}
            labels={["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]}
            yFormat={(n) => String(Math.round(n))}
          />
        </div>
      </Card>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Card title="Evening peak">
          <div className="space-y-[4px] text-[7.6px]">
            {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"].map((d, i) => (
              <p key={d} className="flex items-center justify-between">
                <span>{d}</span>
                <Pill tone={i === 2 ? "amber" : "green"} size={6.4}>
                  {i === 2 ? "Off 5–8 pm" : "Off 5–9 pm"}
                </Pill>
              </p>
            ))}
          </div>
        </Card>
        <Card title="Note" className="flex-1">
          <p className="text-[7.4px] leading-[1.45]" style={{ color: MUTE }}>
            Thursday was overcast, so the store topped up off-peak overnight and the compressor ran briefly after 8 pm.
          </p>
        </Card>
      </div>
    </div>
  </Ops>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div
    className="flex h-full w-full items-center justify-center gap-[22px]"
    style={{
      ...FONT,
      background: `radial-gradient(circle at 30% 20%, #4a2a0e, ${DARK} 70%)`,
    }}
  >
    <Laptop w={404} h={258} bg={DARK}>
      <div className="flex h-full flex-col px-[14px] py-[10px] text-white">
        <div className="flex items-center">
          <Photo {...LOGO} w={76} h={10} />
          <span className="ml-auto rounded-[4px] px-[7px] py-[2px] text-[6.6px] font-bold" style={{ background: GRAD, color: DARK }}>
            Request a Quote
          </span>
        </div>
        <p className="mt-[26px] text-[26px] font-extrabold leading-[1.02]">Heat by Day.</p>
        <p className="text-[26px] font-extrabold leading-[1.02]" style={{ color: AMBER }}>
          Warm All Night.
        </p>
        <p className="mt-[8px] max-w-[220px] text-[7.2px] leading-[1.45]" style={{ color: MUTE }}>
          Hydronic heat pump with thermal storage designed and built in Australia. Replaces your gas boiler.
        </p>
        <div className="mt-auto flex items-center gap-[8px] rounded-[6px] px-[8px] py-[5px] text-[7px]" style={{ background: PANEL }}>
          <span className="flex items-center gap-[3px]" style={{ color: "#4ade80" }}>
            <span className="size-[5px] rounded-full bg-[#4ade80]" /> LIVE
          </span>
          <span style={{ color: MUTE }}>Field data, live from the systems themselves</span>
          <Gauge className="ml-auto size-[9px]" style={{ color: AMBER }} aria-hidden="true" />
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg={DARK} dark>
      <div className="flex flex-1 flex-col px-[9px] pt-[10px] text-white">
        <p className="text-center text-[22px] font-semibold">16:45</p>
        <p className="text-center text-[7px]" style={{ color: MUTE }}>
          Monday 23 November
        </p>
        <div className="mt-[12px] rounded-[12px] p-[7px]" style={{ background: "rgb(255 255 255 / 0.1)" }}>
          <p className="flex items-center gap-[4px] text-[6.5px] font-semibold uppercase tracking-[0.05em]" style={{ color: MUTE }}>
            <Flame className="size-[8px]" style={{ color: AMBER }} aria-hidden="true" /> Thermal Dawn
            <span className="ml-auto normal-case">now</span>
          </p>
          <p className="mt-[3px] text-[7.6px] font-semibold">Store full · 86%</p>
          <p className="text-[7px] leading-[1.35] text-white/80">Tonight runs on stored heat 5–9 pm. No grid power at peak.</p>
        </div>
        <div className="mt-[6px] rounded-[12px] p-[7px]" style={{ background: "rgb(255 255 255 / 0.06)" }}>
          <p className="flex items-center gap-[4px] text-[7px]">
            <Home className="size-[8px]" style={{ color: AMBER }} aria-hidden="true" /> Living 21.5° · Bedrooms 19.0°
          </p>
        </div>
        <span className="mt-auto mb-[14px] flex items-center justify-center gap-[3px] text-[6.4px]" style={{ color: MUTE }}>
          <LayoutGrid className="size-[7px]" aria-hidden="true" /> Open the app
        </span>
      </div>
    </Phone>
  </div>
);

export const thermalDawnScreens: Screen[] = [QuoteFlow, HomeApp, Fleet, Week, LaptopPhone];
