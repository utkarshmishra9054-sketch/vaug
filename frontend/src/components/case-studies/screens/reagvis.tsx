import type { CSSProperties, ReactNode } from "react";
import { AudioLines, FileImage, FileVideo, IdCard, KeyRound, LayoutDashboard, ScanFace, Settings, ShieldCheck } from "lucide-react";

import { Laptop } from "@/components/sections/mocks/kit";

import { Browser, Phone, Pill, type Screen } from "./kit";
import { Photo } from "./tools";

/*
 * Reagvis Labs · detection portal, from reagvis.com (read 23 Nov 2026): system UI font, orange
 * #f97015, brown #392313, cream #fffaf5, and the orange-to-blue-to-indigo gradient. The four products
 * (image, video, audio, KYC Guard) and their behaviour (localising manipulated segments, synthetic
 * voice checks, deepfake screening of selfies) are from the site.
 * TODO(content): illustrative. Files, scores, verdicts and people are invented.
 */

const FONT: CSSProperties = { fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' };
const OR = "#f97015";
const BROWN = "#392313";
const MUTE = "#8a6a52";
const CREAM = "#fffaf5";
const LINE = "#f1e4d8";
const GRAD = "linear-gradient(90deg, #f97015, #3b82f6, #4f46e5)";
const LOGO = { src: "/logos/reagvis.webp", img: { w: 531, h: 160 } };

const NAV: [string, typeof ShieldCheck, number?][] = [
  ["Dashboard", LayoutDashboard],
  ["Image", FileImage],
  ["Video", FileVideo, 3],
  ["Audio", AudioLines],
  ["KYC Guard", IdCard, 148],
  ["API keys", KeyRound],
  ["Settings", Settings],
];

function Portal({ path, active, title, sub, right, children }: { path: string; active: number; title: string; sub: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Browser w={640} h={400} url={`app.reagvis.com/${path}`}>
      <div className="flex h-full" style={{ ...FONT, color: BROWN, background: CREAM }}>
        <aside className="flex w-[116px] shrink-0 flex-col border-r bg-white px-[8px] py-[10px]" style={{ borderColor: LINE }}>
          <Photo {...LOGO} w={76} h={23} />
          <nav className="mt-[12px] space-y-[2px]">
            {NAV.map(([l, I, b], i) => (
              <span key={l} className="flex h-[22px] items-center gap-[6px] rounded-[6px] px-[6px] text-[8.5px]" style={i === active ? { background: "rgb(249 112 21 / 0.12)", color: OR, fontWeight: 700 } : { color: MUTE }}>
                <I className="size-[10px]" aria-hidden="true" />
                {l}
                {b !== undefined && <span className="ml-auto rounded-full px-[4px] text-[7px] font-bold" style={{ background: i === active ? OR : "#f6ece3", color: i === active ? "#fff" : BROWN }}>{b}</span>}
              </span>
            ))}
          </nav>
          <div className="mt-auto rounded-[6px] p-[6px]" style={{ background: "#fbf3ec" }}>
            <p className="text-[7.8px] font-semibold">Trust & Safety team</p>
            <p className="text-[6.8px]" style={{ color: MUTE }}>Plan: Business · 3 seats</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[40px] shrink-0 items-center gap-[8px] border-b bg-white px-[12px]" style={{ borderColor: LINE }}>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-extrabold">{title}</p>
              <p className="truncate text-[7.5px]" style={{ color: MUTE }}>{sub}</p>
            </div>
            <div className="ml-auto flex items-center gap-[6px]">{right}</div>
          </header>
          <div className="h-[2px] shrink-0" style={{ background: GRAD }} />
          <div className="min-h-0 flex-1 p-[10px]">{children}</div>
        </div>
      </div>
    </Browser>
  );
}

const Btn = ({ children, solid = false }: { children: ReactNode; solid?: boolean }) => (
  <span className="inline-flex h-[21px] items-center gap-[4px] rounded-[6px] px-[8px] text-[7.8px] font-bold" style={solid ? { background: OR, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {children}
  </span>
);
const Box = ({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={`flex min-h-0 flex-col rounded-[8px] bg-white ${className}`} style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
    {title && (
      <div className="flex h-[24px] shrink-0 items-center justify-between border-b px-[9px] text-[8.5px] font-bold" style={{ borderColor: LINE }}>
        {title}
        {right && <span className="text-[7.4px] font-normal" style={{ color: MUTE }}>{right}</span>}
      </div>
    )}
    <div className="min-h-0 flex-1 p-[9px]">{children}</div>
  </section>
);

/** A simple head-and-shoulders silhouette for frames and selfies. */
function Face({ box = false, tint = "#c9a58a" }: { box?: boolean; tint?: string }) {
  return (
    <svg viewBox="0 0 120 90" className="block h-full w-full" aria-hidden="true">
      <rect width="120" height="90" fill="#2a211b" />
      <ellipse cx="60" cy="38" rx="17" ry="21" fill={tint} />
      <path d="M26 90 C 30 64 46 58 60 58 C 74 58 90 64 94 90 Z" fill="#4b5a74" />
      {box && <rect x="38" y="14" width="44" height="50" fill="none" stroke={OR} strokeWidth="1.6" />}
    </svg>
  );
}

/* 01 · Dashboard ----------------------------------------------------- */

const RECENT: [typeof FileImage, string, string, "red" | "green" | "amber" | "violet", string, string][] = [
  [FileVideo, "press_statement_clip.mp4", "Manipulated · face swap", "red", "0.94", "12:41"],
  [IdCard, "KYC · applicant 88213", "Approved · live person", "green", "0.03", "12:39"],
  [AudioLines, "cfo_voicemail.m4a", "Synthetic voice likely", "red", "0.88", "12:32"],
  [FileImage, "flood_photo_viral.jpg", "Authentic", "green", "0.07", "12:27"],
  [IdCard, "KYC · applicant 88209", "Review needed", "amber", "0.51", "12:20"],
  [FileImage, "product_listing_04.png", "AI-generated", "violet", "0.97", "12:11"],
  [FileVideo, "interview_raw.mov", "Authentic", "green", "0.05", "11:58"],
];
const RC = "1fr 112px 36px 34px";

const Dashboard: Screen = () => (
  <Portal path="dashboard" active={0} title="Today" sub="Mon 23 Nov 2026 · image, video, audio and KYC in one place" right={<Btn solid>Analyse a file</Btn>}>
    <div className="flex h-full flex-col gap-[8px]">
      <div className="grid grid-cols-4 gap-[8px]">
        {[
          ["Files analysed", "312", "+18% vs Friday"],
          ["Flagged", "27", "8.7% of files"],
          ["KYC checks", "148", "3 need review"],
          ["Median time", "8.4 s", "video: 41 s"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-[8px] px-[9px] py-[7px]" style={i === 1 ? { background: OR, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
            <p className="text-[7.5px] font-semibold" style={{ opacity: 0.75 }}>{k}</p>
            <p className="mt-[3px] text-[16px] font-extrabold leading-none">{v}</p>
            <p className="mt-[4px] text-[7px]" style={{ opacity: 0.7 }}>{s}</p>
          </div>
        ))}
      </div>
      <Box title="Recent results" right="Score: likelihood of manipulation" className="flex-1">
        {RECENT.map(([I, f, v, t, sc, tm], i) => (
          <div key={f} className="grid h-[26px] items-center gap-[6px] border-b text-[8.2px] last:border-b-0" style={{ gridTemplateColumns: RC, borderColor: LINE, background: i === 0 ? "#fff6ef" : undefined }}>
            <span className="flex min-w-0 items-center gap-[5px]">
              <I className="size-[10px] shrink-0" style={{ color: OR }} aria-hidden="true" />
              <span className="truncate font-medium">{f}</span>
            </span>
            <span><Pill tone={t} size={6.8}>{v}</Pill></span>
            <b className="text-right tabular-nums">{sc}</b>
            <span className="text-right text-[7.4px]" style={{ color: MUTE }}>{tm}</span>
          </div>
        ))}
      </Box>
    </div>
  </Portal>
);

/* 02 · Video analysis ------------------------------------------------ */

const Video: Screen = () => (
  <Portal path="video/press_statement_clip" active={2} title="press_statement_clip.mp4" sub="1 min 04 s · 1080p · 25 fps · analysed in 38 s" right={<><Btn>Export report</Btn><Btn solid>Mark reviewed</Btn></>}>
    <div className="grid h-full grid-cols-[1fr_164px] gap-[8px]">
      <div className="flex min-h-0 flex-col gap-[8px]">
        <Box title="Frame 00:14.20" right="face region flagged">
          <div className="h-[138px] overflow-hidden rounded-[6px]">
            <Face box tint="#d4ad90" />
          </div>
        </Box>
        <Box title="Timeline" right="Red: manipulated · confidence per segment" className="flex-1">
          <div className="relative h-[16px] overflow-hidden rounded-[4px] bg-[#e9f6ee]">
            {[
              [17, 12, 0.94],
              [61, 7, 0.71],
            ].map(([l, w]) => (
              <span key={l} className="absolute inset-y-0" style={{ left: `${l}%`, width: `${w}%`, background: "#e11d48" }} />
            ))}
            <span className="absolute inset-y-0 w-[2px] bg-[#392313]" style={{ left: "22%" }} />
          </div>
          <p className="mt-[3px] flex justify-between text-[6.8px]" style={{ color: MUTE }}>
            <span>0:00</span>
            <span>0:16</span>
            <span>0:32</span>
            <span>0:48</span>
            <span>1:04</span>
          </p>
          <div className="mt-[5px] flex gap-[3px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-[30px] flex-1 overflow-hidden rounded-[3px]" style={{ boxShadow: i === 1 || i === 2 || i === 5 ? "0 0 0 1.5px #e11d48" : undefined }}>
                <Face tint={i === 1 || i === 2 ? "#d9a98a" : "#c9a58a"} />
              </span>
            ))}
          </div>
        </Box>
      </div>
      <Box title="Verdict">
        <p className="rounded-[6px] px-[7px] py-[5px] text-[8.4px] font-extrabold text-white" style={{ background: "#e11d48" }}>Manipulated</p>
        <div className="mt-[6px] space-y-[5px] text-[7.6px] leading-[1.4]">
          <p><b>0:11–0:18 · 0.94</b><br />Face swap: blending seam at the jaw, lighting mismatch on the left cheek.</p>
          <p><b>0:39–0:43 · 0.71</b><br />Lip-sync drift against the audio track.</p>
          <p><b>Audio · 0.12</b><br />Voice consistent with the rest of the clip.</p>
        </div>
      </Box>
    </div>
  </Portal>
);

/* 03 · Image and audio evidence ------------------------------------- */

const Evidence: Screen = () => (
  <Portal path="image/product_listing_04" active={1} title="Evidence" sub="Image: product_listing_04.png · Audio: cfo_voicemail.m4a" right={<Btn>Compare</Btn>}>
    <div className="grid h-full grid-cols-2 gap-[8px]">
      <Box title="Image · AI-generated, 0.97" right="heatmap of generated regions">
        <div className="relative h-[180px] overflow-hidden rounded-[6px]" style={{ background: "linear-gradient(160deg,#efe7dd,#d8cbbb)" }}>
          <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect x="60" y="40" width="80" height="70" rx="10" fill="#8e6e57" />
            <rect x="72" y="52" width="56" height="20" rx="4" fill="#b99a7f" />
            <defs>
              <radialGradient id="rv-h">
                <stop offset="0" stopColor="#e11d48" stopOpacity="0.75" />
                <stop offset="1" stopColor="#f97015" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="75" r="60" fill="url(#rv-h)" />
            <circle cx="160" cy="30" r="26" fill="url(#rv-h)" />
          </svg>
        </div>
        <p className="mt-[6px] text-[7.6px] leading-[1.4]">Texture repetition in the background and an impossible shadow under the product; no camera metadata.</p>
      </Box>
      <Box title="Audio · synthetic voice likely, 0.88" right="spectrogram, 0–8 kHz">
        <div className="h-[180px] overflow-hidden rounded-[6px] bg-[#1b1220]">
          <svg viewBox="0 0 200 150" className="block h-full w-full" aria-hidden="true">
            {Array.from({ length: 50 }).map((_, x) =>
              Array.from({ length: 14 }).map((__, y) => {
                const v = ((x * 7 + y * 13) % 17) / 17;
                return <rect key={`${x}-${y}`} x={x * 4} y={150 - (y + 1) * 10.7} width="4" height="10.7" fill={y < 5 ? "#f97015" : y < 9 ? "#a855f7" : "#3b82f6"} opacity={0.15 + v * 0.7 * (1 - y / 18)} />;
              }),
            )}
            {[44, 112].map((x) => (
              <rect key={x} x={x} y="4" width="26" height="142" fill="none" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="3 2" />
            ))}
          </svg>
        </div>
        <p className="mt-[6px] text-[7.6px] leading-[1.4]">Flat prosody and missing breath noise in two spans (yellow); timbre close to, but not matching, the reference recording.</p>
      </Box>
    </div>
  </Portal>
);

/* 04 · KYC Guard ----------------------------------------------------- */

const Kyc: Screen = () => (
  <Portal path="kyc/88213" active={4} title="KYC Guard · applicant 88213" sub="Selfie video and ID document · checked while the customer waited, 6.2 s" right={<Btn solid>Approve</Btn>}>
    <div className="grid h-full grid-cols-[1fr_1fr_170px] gap-[8px]">
      <Box title="Selfie video" right="5 s">
        <div className="h-[150px] overflow-hidden rounded-[6px]">
          <Face box />
        </div>
        <p className="mt-[5px] text-[7.4px]" style={{ color: MUTE }}>Head turn left and right · blink detected</p>
      </Box>
      <Box title="ID document">
        <div className="flex h-[96px] gap-[6px] rounded-[6px] p-[6px]" style={{ background: "linear-gradient(135deg,#e8eef9,#d5def0)" }}>
          <span className="w-[44px] overflow-hidden rounded-[4px]">
            <Face />
          </span>
          <span className="flex-1 space-y-[4px] pt-[4px]">
            {[70, 52, 84, 40].map((w, i) => (
              <span key={i} className="block h-[5px] rounded-full bg-[#9fb0cf]" style={{ width: `${w}%` }} />
            ))}
          </span>
        </div>
        <p className="mt-[5px] text-[7.4px]" style={{ color: MUTE }}>Template and fonts match · no edits found</p>
      </Box>
      <Box title="Checks">
        <div className="space-y-[5px] text-[7.8px]">
          {[
            ["Liveness", "Live person", "green"],
            ["Deepfake screen", "0.03", "green"],
            ["Face match to ID", "0.97", "green"],
            ["Document tampering", "None found", "green"],
            ["Replay / screen capture", "Not detected", "green"],
          ].map(([k, v, t]) => (
            <p key={k} className="flex items-center justify-between gap-[4px]">
              <span>{k}</span>
              <Pill tone={t as "green"} size={6.6}>{v}</Pill>
            </p>
          ))}
        </div>
        <p className="mt-[8px] rounded-[6px] px-[6px] py-[4px] text-[7.4px] font-bold" style={{ background: "#dcfce7", color: "#166534" }}>Decision: approve</p>
      </Box>
    </div>
  </Portal>
);

/* 05 · Laptop + phone ------------------------------------------------ */

const LaptopPhone: Screen = () => (
  <div className="flex h-full w-full items-center justify-center gap-[22px]" style={{ ...FONT, color: BROWN, background: "linear-gradient(140deg, #fffaf5, #fde3cc 60%, #dbe4ff)" }}>
    <Laptop w={404} h={258}>
      <div className="flex h-full flex-col p-[9px]" style={{ background: CREAM }}>
        <Photo {...LOGO} w={62} h={19} />
        <div className="mt-[6px] h-[2px]" style={{ background: GRAD }} />
        <div className="mt-[6px] grid grid-cols-3 gap-[5px]">
          {[
            ["Files", "312"],
            ["Flagged", "27"],
            ["KYC", "148"],
          ].map(([k, v], i) => (
            <div key={k} className="rounded-[5px] px-[6px] py-[4px]" style={i === 1 ? { background: OR, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1px ${LINE}` }}>
              <p className="text-[6.5px] opacity-75">{k}</p>
              <p className="text-[12px] font-extrabold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-[6px] flex-1 overflow-hidden rounded-[5px] bg-white" style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}>
          {RECENT.slice(0, 5).map(([I, f, v, t]) => (
            <div key={f} className="flex h-[22px] items-center gap-[5px] border-b px-[6px] text-[6.8px]" style={{ borderColor: LINE }}>
              <I className="size-[8px]" style={{ color: OR }} aria-hidden="true" />
              <span className="flex-1 truncate">{f}</span>
              <Pill tone={t} size={5.8}>{v}</Pill>
            </div>
          ))}
        </div>
      </div>
    </Laptop>
    <Phone w={146} h={296} bg="#14100d" dark>
      <div className="flex flex-1 flex-col items-center px-[10px] pt-[8px] text-white">
        <p className="text-[9px] font-bold">Verify it&apos;s you</p>
        <p className="text-[6.8px] text-white/60">Turn your head slowly to the left</p>
        <div className="relative mt-[10px] size-[110px] overflow-hidden rounded-full" style={{ boxShadow: `0 0 0 3px ${OR}` }}>
          <Face />
        </div>
        <div className="mt-[10px] h-[4px] w-full overflow-hidden rounded-full bg-white/15">
          <span className="block h-full w-[64%] rounded-full" style={{ background: GRAD }} />
        </div>
        <p className="mt-[6px] flex items-center gap-[3px] text-[6.8px] text-white/70">
          <ScanFace className="size-[8px]" aria-hidden="true" /> Liveness check 2 of 3
        </p>
        <p className="mt-auto mb-[14px] text-[6.2px] text-white/45">Protected by Reagvis KYC Guard</p>
      </div>
    </Phone>
  </div>
);

export const reagvisScreens: Screen[] = [Dashboard, Video, Evidence, Kyc, LaptopPhone];
