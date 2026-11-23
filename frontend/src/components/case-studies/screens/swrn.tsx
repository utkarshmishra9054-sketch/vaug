import { Lexend_Zetta } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { Activity, CircuitBoard, Cpu, FileClock, Gauge, Plug, SlidersHorizontal, TriangleAlert, Upload } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, LineChart, Phone, type Screen } from "./kit";

/*
 * SWRN Systems · website and ground software for its flight controller, from swrnsystems.in (read 23 Nov
 * 2026): Lexend Zetta wordmark and headings, system sans and mono, black, white and yellow #ffcf32.
 * Product facts (indigenous hardware and software for defence flight control; a rugged, deployment-ready
 * flight-control platform; a 700 MHz microcontroller; a sensor suite with built-in redundancy) are from
 * the site. TODO(content): illustrative. The ground software, its readings, gains, logs and versions are
 * invented; the site's recognition, compliance claims and founder details are not used.
 */

const zetta = Lexend_Zetta({ subsets: ["latin"], weight: ["400", "600"], display: "swap", preload: false });
const BRAND: CSSProperties = { fontFamily: zetta.style.fontFamily };
const FONT: CSSProperties = { fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' };
const MONO: CSSProperties = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' };
const Y = "#ffcf32";
const BG = "#0b0b0b";
const PANEL = "#151515";
const EDGE = "rgb(255 255 255 / 0.09)";
const MUTE = "rgb(255 255 255 / 0.55)";
const OK = "#7ddc8f";
const BAD = "#ff6b57";

const Mark = ({ size = 8 }: { size?: number }) => (
  <span className="font-semibold tracking-[0.12em]" style={{ ...BRAND, fontSize: size }}>SWRN SYSTEMS</span>
);

const NAV: [string, typeof Cpu][] = [
  ["Setup", CircuitBoard],
  ["Sensors", Activity],
  ["Tuning", SlidersHorizontal],
  ["Logs", FileClock],
  ["Firmware", Upload],
];

function Ground({ active, title, sub, right, children }: { active: string; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`ground.swrnsystems.in/${active.toLowerCase()}`} dark>
      <div className="flex h-full" style={{ ...FONT, background: BG, color: "#fff" }}>
        <aside className="flex w-[108px] shrink-0 flex-col border-r px-[8px] py-[10px]" style={{ borderColor: EDGE }}>
          <Mark size={7.4} />
          <p className="mt-[3px] text-[6.4px] uppercase tracking-[0.14em]" style={{ ...MONO, color: Y }}>Ground</p>
          <nav className="mt-[12px] space-y-[1px] text-[8px]">
            {NAV.map(([t, Icon]) => (
              <p key={t} className="flex h-[21px] items-center gap-[6px] rounded-[4px] px-[6px]" style={t === active ? { background: Y, color: BG, fontWeight: 600 } : { color: MUTE }}>
                <Icon className="size-[9px]" aria-hidden="true" />
                {t}
              </p>
            ))}
          </nav>
          <div className="mt-auto space-y-[2px] rounded-[4px] p-[6px] text-[6.6px]" style={{ ...MONO, background: PANEL, color: MUTE }}>
            <p className="flex items-center gap-[4px]"><Plug className="size-[7px]" style={{ color: OK }} aria-hidden="true" /> USB · connected</p>
            <p>Board FC-01 · demo unit</p>
          </div>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[40px] shrink-0 items-center px-[12px]">
            <div className="leading-tight">
              <p className="text-[12.5px] font-semibold tracking-[-0.01em]">{title}</p>
              <p className="text-[7.4px]" style={{ color: MUTE }}>{sub}</p>
            </div>
            <div className="ml-auto flex gap-[5px]">{right}</div>
          </div>
          <div className="min-h-0 flex-1 px-[10px] pb-[10px]">{children}</div>
        </main>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span className="inline-flex h-[20px] items-center whitespace-nowrap rounded-[3px] px-[9px] text-[7.4px] font-semibold" style={solid ? { background: Y, color: BG } : { boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[5px] ${className}`} style={{ background: PANEL, boxShadow: `inset 0 0 0 1px ${EDGE}` }}>
    {title && (
      <div className="flex h-[22px] shrink-0 items-center justify-between border-b px-[8px] text-[6.8px] uppercase tracking-[0.14em]" style={{ ...MONO, borderColor: EDGE, color: MUTE }}>
        {title}
        {right && <span>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[8px]">{children}</div>
  </section>
);
const Dark = ({ children }: { children: ReactNode }) => <div className="[&_line]:stroke-white/10 [&_text]:fill-white/55">{children}</div>;

/* 01 · Setup: the board and its sensors ---------------------------------- */

const SENSORS: [string, string, string][] = [
  ["IMU 1", "x: 120  y: 70", "ok"],
  ["IMU 2", "x: 120  y: 110", "ok"],
  ["IMU 3", "x: 120  y: 150", "ok"],
  ["Baro 1", "x: 250  y: 70", "ok"],
  ["Baro 2", "x: 250  y: 110", "ok"],
  ["Mag 1", "x: 250  y: 150", "ok"],
];

const Setup: Screen = () => (
  <Ground active="Setup" title="Flight controller · setup" sub="The board, its redundant sensors and what each one reports" right={<><Btn>Calibrate</Btn><Btn solid>Save to board</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_170px] gap-[8px]">
      <Box title="Board" right="demo unit">
        <svg width={312} height={270} viewBox="0 0 312 270" className="block" aria-hidden="true">
          <rect x={20} y={20} width={272} height={220} rx={10} fill="none" stroke="rgb(255 255 255 / 0.5)" strokeWidth={1.2} />
          {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={34 + i * 27} cy={32} r={2.4} fill="none" stroke="rgb(255 255 255 / 0.35)" />)}
          <rect x={120} y={95} width={72} height={72} rx={4} fill="rgb(255 207 50 / 0.12)" stroke={Y} strokeWidth={1.4} />
          <text x={156} y={128} textAnchor="middle" fontSize="9" fill={Y} fontFamily="ui-monospace, monospace">MCU</text>
          <text x={156} y={142} textAnchor="middle" fontSize="7" fill="rgb(255 255 255 / 0.6)" fontFamily="ui-monospace, monospace">700 MHz</text>
          {[
            [44, 70, "IMU 1"],
            [44, 110, "IMU 2"],
            [44, 150, "IMU 3"],
            [222, 70, "BARO 1"],
            [222, 110, "BARO 2"],
            [222, 150, "MAG 1"],
          ].map(([x, y, t]) => (
            <g key={t as string}>
              <rect x={x as number} y={(y as number) - 12} width={48} height={24} rx={3} fill="rgb(125 220 143 / 0.1)" stroke={OK} strokeWidth={1} />
              <text x={(x as number) + 24} y={(y as number) + 3} textAnchor="middle" fontSize="7" fill="#fff" fontFamily="ui-monospace, monospace">{t as string}</text>
              <line x1={(x as number) < 100 ? 92 : 222} x2={(x as number) < 100 ? 120 : 192} y1={y as number} y2={131} stroke="rgb(255 255 255 / 0.25)" />
            </g>
          ))}
          {[60, 108, 156, 204].map((x) => <rect key={x} x={x} y={205} width={36} height={14} rx={2} fill="none" stroke="rgb(255 255 255 / 0.4)" />)}
          <text x={156} y={232} textAnchor="middle" fontSize="6.5" fill="rgb(255 255 255 / 0.5)" fontFamily="ui-monospace, monospace">PWM OUT · CAN · UART · TELEM</text>
        </svg>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Sensors" right="6 / 6 ok">
          {SENSORS.map(([n]) => (
            <p key={n} className="flex h-[18px] items-center justify-between border-b text-[7.6px] last:border-b-0" style={{ borderColor: EDGE }}>
              <span style={MONO}>{n}</span>
              <span className="flex items-center gap-[3px] text-[6.8px]" style={{ color: OK }}><span className="size-[5px] rounded-full" style={{ background: OK }} />healthy</span>
            </p>
          ))}
        </Box>
        <Box title="Board" className="flex-1">
          {[
            ["Firmware", "0.9.4 demo"],
            ["IMU voting", "3 of 3"],
            ["Frame", "Quad X"],
          ].map(([k, v]) => (
            <p key={k} className="flex h-[17px] items-center justify-between text-[7.2px]">
              <span style={{ color: MUTE }}>{k}</span>
              <span style={MONO}>{v}</span>
            </p>
          ))}
        </Box>
      </div>
    </div>
  </Ground>
);

/* 02 · Redundancy: a sensor voted out ------------------------------------ */

const Redundancy: Screen = () => (
  <Ground active="Sensors" title="Redundancy · one IMU voted out" sub="Three IMUs read the same motion; one that disagrees is dropped, and the flight carries on" right={<Btn>Export trace</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Box title="Roll rate, deg/s · test flight 14" right={<span className="flex gap-[8px] normal-case tracking-normal"><span style={{ color: Y }}>IMU 1</span><span style={{ color: "#7cc4ff" }}>IMU 2</span><span style={{ color: BAD }}>IMU 3</span></span>}>
        <Dark>
          <LineChart
            w={496}
            h={150}
            max={60}
            min={-60}
            grid={4}
            labels={["0 s", "2 s", "4 s", "6 s", "8 s", "10 s", "12 s", "14 s"]}
            yFormat={(n) => String(Math.round(n))}
            series={[
              { values: [0, 22, -18, 30, -12, 8, -24, 4], color: Y },
              { values: [1, 21, -17, 31, -11, 9, -23, 5], color: "#7cc4ff" },
              { values: [0, 23, -16, 44, 38, 51, 49, 55], color: BAD, dashed: true },
            ]}
          />
        </Dark>
      </Box>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_190px] gap-[8px]">
        <Box title="Events">
          {[
            ["00:05.8", "IMU 3 drifts from IMU 1 and 2", "warn"],
            ["00:06.1", "IMU 3 excluded from voting; 2 of 3 in use", "warn"],
            ["00:06.1", "Attitude estimate unchanged", "ok"],
            ["00:14.0", "Landed; IMU 3 flagged for bench check", "ok"],
          ].map(([t, e, k]) => (
            <p key={e} className="flex h-[18px] items-center gap-[6px] border-b text-[7.4px] last:border-b-0" style={{ borderColor: EDGE }}>
              <span style={{ ...MONO, color: MUTE }}>{t}</span>
              {k === "warn" ? <TriangleAlert className="size-[8px]" style={{ color: Y }} aria-hidden="true" /> : <Gauge className="size-[8px]" style={{ color: OK }} aria-hidden="true" />}
              {e}
            </p>
          ))}
        </Box>
        <Box title="Voting now">
          {[
            ["IMU 1", "in use", OK],
            ["IMU 2", "in use", OK],
            ["IMU 3", "excluded", BAD],
          ].map(([n, s, c]) => (
            <p key={n} className="flex h-[18px] items-center justify-between text-[7.4px]">
              <span style={MONO}>{n}</span>
              <span style={{ color: c }}>{s}</span>
            </p>
          ))}
        </Box>
      </div>
    </div>
  </Ground>
);

/* 03 · Tuning ------------------------------------------------------------ */

const Tuning: Screen = () => (
  <Ground active="Tuning" title="Tuning · pitch rate loop" sub="Step response before and after, from the bench rig" right={<><Btn>Revert</Btn><Btn solid>Write gains</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_168px] gap-[8px]">
      <Box title="Step response, normalised" right={<span className="flex gap-[8px] normal-case tracking-normal"><span>target</span><span style={{ color: "#9a9a9a" }}>before</span><span style={{ color: Y }}>after</span></span>}>
        <Dark>
          <LineChart
            w={318}
            h={250}
            max={1.4}
            min={0}
            grid={4}
            labels={["0 ms", "50", "100", "150", "200", "250", "300"]}
            yFormat={(n) => n.toFixed(1)}
            series={[
              { values: [0, 0.98, 1.0, 1.01, 1.0, 1.0, 1.0], color: Y, area: true },
              { values: [0, 1.32, 0.78, 1.18, 0.9, 1.06, 0.98], color: "#9a9a9a", dashed: true },
              { values: [0, 1, 1, 1, 1, 1, 1], color: "rgb(255 255 255 / 0.35)", dashed: true },
            ]}
          />
        </Dark>
      </Box>
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Gains">
          {[
            ["P", "0.042", "0.036"],
            ["I", "0.018", "0.021"],
            ["D", "0.0009", "0.0014"],
          ].map(([k, a, b]) => (
            <p key={k} className="grid h-[19px] grid-cols-[18px_1fr_1fr] items-center text-[7.4px]" style={MONO}>
              <b style={{ color: Y }}>{k}</b>
              <span style={{ color: MUTE }}>{a}</span>
              <span className="text-right">{b}</span>
            </p>
          ))}
        </Box>
        <Box title="Result" className="flex-1">
          {[
            ["Overshoot", "32% → 1%"],
            ["Settles in", "240 → 60 ms"],
          ].map(([k, v]) => (
            <p key={k} className="flex h-[18px] items-center justify-between text-[7.4px]">
              <span style={{ color: MUTE }}>{k}</span>
              <span style={MONO}>{v}</span>
            </p>
          ))}
          <p className="mt-[5px] text-[6.6px] leading-[1.4]" style={{ color: MUTE }}>Bench values on a demo rig, for illustration.</p>
        </Box>
      </div>
    </div>
  </Ground>
);

/* 04 · Flight log ------------------------------------------------------- */

const Logs: Screen = () => (
  <Ground active="Logs" title="Flight log · test flight 14" sub="Altitude and every event on one timeline, straight off the board" right={<Btn>Download log</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <Box title="Altitude, m" right="14 s">
        <Dark>
          <LineChart w={496} h={132} max={12} grid={3} labels={["0 s", "2 s", "4 s", "6 s", "8 s", "10 s", "12 s", "14 s"]} yFormat={(n) => String(Math.round(n))} series={[{ values: [0, 4, 8.5, 10, 10.1, 9.9, 6, 0], color: Y, area: true }]} />
        </Dark>
        <div className="relative mt-[2px] h-[14px]">
          {[
            [3, "ARM"],
            [12, "TAKEOFF"],
            [41, "IMU 3 OUT"],
            [80, "RTL"],
            [97, "LAND"],
          ].map(([x, t]) => (
            <span key={t as string} className="absolute top-0 -translate-x-1/2 rounded-[2px] px-[4px] text-[6px]" style={{ ...MONO, left: `${x}%`, background: t === "IMU 3 OUT" ? BAD : "rgb(255 255 255 / 0.12)", color: t === "IMU 3 OUT" ? "#fff" : MUTE }}>
              {t as string}
            </span>
          ))}
        </div>
      </Box>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-[8px]">
        {[
          ["Flight", [["Duration", "14.0 s"], ["Max altitude", "10.1 m"], ["Mode", "Stabilised"]]],
          ["Health", [["Sensors", "5 of 6"], ["Supply", "Nominal"], ["Warnings", "2"]]],
          ["Board", [["Firmware", "0.9.4 demo"], ["Log size", "2.4 MB"], ["Rate", "1 kHz"]]],
        ].map(([t, rows]) => (
          <Box key={t as string} title={t as string}>
            {(rows as string[][]).map(([k, v]) => (
              <p key={k} className="flex h-[17px] items-center justify-between text-[7.2px]">
                <span style={{ color: MUTE }}>{k}</span>
                <span style={MONO}>{v}</span>
              </p>
            ))}
          </Box>
        ))}
      </div>
    </div>
  </Ground>
);

/* 05 · Website on a laptop and a phone --------------------------------- */

const Site: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, background: Y }}>
    <Laptop w={404} h={258} bg={BG}>
      <div className="relative flex h-full flex-col overflow-hidden text-white">
        <div className="flex h-[20px] items-center px-[12px] text-[6px] tracking-[0.18em]" style={BRAND}>
          <span>SWRN SYSTEMS</span>
          <span className="ml-auto flex gap-[10px] text-white/70"><span>OUR PRODUCT</span><span>CONTACT US</span></span>
        </div>
        <div className="flex h-[120px] items-center justify-center" style={{ background: "linear-gradient(180deg, #6c8dab, #a5835e)" }}>
          <p className="text-center text-[24px] font-semibold leading-[1.05] tracking-[0.14em] text-black" style={BRAND}>SWRN<br />SYSTEMS</p>
        </div>
        <div className="flex-1 px-[14px] pt-[10px]" style={{ background: Y, color: BG, clipPath: "polygon(0 12%, 100% 0, 100% 100%, 0 100%)" }}>
          <p className="mt-[10px] text-[6px]" style={MONO}>01</p>
          <p className="text-[12px] font-semibold tracking-[0.1em]" style={BRAND}>Who We Are</p>
          <p className="mt-[3px] text-[6.4px] tracking-[0.06em]">Indigenous Hardware &amp; Software</p>
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg={BG} dark>
      <div className="flex flex-1 flex-col px-[10px] pt-[8px] text-white">
        <p className="text-[6px]" style={{ ...MONO, color: MUTE }}>06</p>
        <p className="text-[11px] font-semibold tracking-[0.08em]" style={BRAND}>Contact Us</p>
        <p className="mt-[5px] text-[6.8px] leading-[1.45]" style={{ color: MUTE }}>We&apos;re looking to work with people and organisations pushing the boundaries of Indian aerospace and defence technology.</p>
        {["Name", "Organisation", "Email", "What are you building?"].map((f) => (
          <span key={f} className="mt-[6px] flex h-[20px] items-center border-b text-[6.8px]" style={{ borderColor: "rgb(255 255 255 / 0.25)", color: MUTE }}>{f}</span>
        ))}
        <span className="mt-[10px] flex h-[22px] items-center justify-center text-[6.8px] font-semibold tracking-[0.14em]" style={{ ...BRAND, background: Y, color: BG }}>GET IN TOUCH →</span>
      </div>
    </Phone>
  </div>
);

export const swrnScreens: Screen[] = [Setup, Redundancy, Tuning, Logs, Site];
