import { SCREENS } from "./screens";
import { ShotCanvas } from "./screens/kit";
import { ShotZoom } from "./ShotZoom";

/**
 * One product screen on a case study page. Studies with bespoke screens (see
 * `./screens`) render the real screen, click-to-enlarge. Otherwise a tinted
 * device frame with a skeleton UI stands in; the skeleton is picked from the
 * caption (chat, map, dashboard, table, board, detail, site, form) so every
 * screen in the gallery reads as a different view.
 */

type Kind = "chat" | "map" | "chart" | "table" | "board" | "site" | "detail" | "form";

function kindOf(caption: string): Kind {
  const c = caption.toLowerCase();
  if (/whatsapp|conversation/.test(c)) return "chat";
  if (/map|tracking|navigation|eta\b/.test(c)) return "map";
  if (/calendar|schedule|\bboard\b/.test(c)) return "board";
  if (/dashboard|analytics|kpi|report|scores|summary|gmv|revenue/.test(c)) return "chart";
  if (/queue|log|pipeline|console|library|orders/.test(c)) return "table";
  if (/detail|drawer|review|editing|rules|calculator|villa page/.test(c)) return "detail";
  if (/website|home page|storefront|listing/.test(c)) return "site";
  return "form";
}

const isPhone = (caption: string) => /mobile|\bapp\b|whatsapp|driver/i.test(caption);

const soft = "rgb(0 0 0 / 0.08)";
const faint = "rgb(0 0 0 / 0.05)";

function Body({ kind, tint, phone }: { kind: Kind; tint: string; phone: boolean }) {
  switch (kind) {
    case "chat":
      return (
        <div className="flex flex-col gap-1.5">
          {[
            { me: false, w: "70%" },
            { me: true, w: "55%" },
            { me: false, w: "80%" },
            { me: false, w: "45%" },
            { me: true, w: "60%" },
          ].map((b, i) => (
            <span
              key={i}
              className={`cs-shimmer block h-4 rounded-md ${b.me ? "self-end" : "self-start"}`}
              style={{ width: b.w, background: b.me ? `${tint}55` : "#ffffff", boxShadow: b.me ? undefined : `0 0 0 1px ${faint}`, animationDelay: `${i * 140}ms` }}
            />
          ))}
          <span className="mt-1 flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-3.5 flex-1 rounded-full border" style={{ borderColor: tint }} />
            ))}
          </span>
        </div>
      );
    case "map":
      return (
        <div className="relative h-28 overflow-hidden rounded-md" style={{ background: "#e9efe6" }}>
          <svg viewBox="0 0 200 110" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <path d="M0 70 C40 60 60 90 100 76 S160 40 200 50" stroke="#ffffff" strokeWidth="6" fill="none" />
            <path d="M60 0 C70 40 50 70 80 110" stroke="#ffffff" strokeWidth="4" fill="none" />
            <path d="M20 88 C60 70 90 40 130 46 S170 22 186 20" stroke={tint} strokeWidth="2.5" strokeDasharray="5 4" fill="none" />
          </svg>
          <span className="absolute left-[9%] top-[76%] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white" style={{ background: tint }} />
          <span className="absolute left-[93%] top-[18%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#131116]" />
          <span className="cs-float absolute left-[62%] top-[36%] rounded-sm bg-white px-1.5 py-0.5 text-[7px] font-bold text-[#131116] shadow">ETA</span>
          {!phone && <span className="absolute bottom-2 left-2 h-8 w-20 rounded bg-white/90 shadow" />}
        </div>
      );
    case "chart":
      return (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex h-8 flex-col justify-center gap-1 rounded bg-white px-1.5" style={{ boxShadow: `0 0 0 1px ${faint}` }}>
                <span className="h-1 w-2/3 rounded-full" style={{ background: soft }} />
                <span className="h-2 w-1/2 rounded-full" style={{ background: i === 0 ? tint : "rgb(0 0 0 / 0.2)" }} />
              </span>
            ))}
          </div>
          <div className="flex h-16 items-end gap-1 rounded bg-white p-1.5" style={{ boxShadow: `0 0 0 1px ${faint}` }}>
            {[40, 62, 48, 75, 58, 86, 70, 94].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 7 ? tint : `${tint}55` }} />
            ))}
          </div>
        </div>
      );
    case "table":
      return (
        <div className="flex flex-col overflow-hidden rounded bg-white" style={{ boxShadow: `0 0 0 1px ${faint}` }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="flex items-center gap-2 border-b px-2 py-1.5 last:border-b-0" style={{ borderColor: faint, background: i === 0 ? faint : undefined }}>
              <span className="size-2 shrink-0 rounded-full" style={{ background: i === 0 ? "transparent" : i % 3 === 1 ? tint : soft }} />
              <span className={`h-1.5 rounded-full ${i === 0 ? "" : "cs-shimmer"}`} style={{ width: `${[30, 48, 36, 54, 42][i]}%`, background: soft, animationDelay: `${i * 120}ms` }} />
              <span className="ml-auto h-3 w-8 rounded-full" style={{ background: i === 0 ? "transparent" : i % 2 ? `${tint}33` : faint }} />
            </span>
          ))}
        </div>
      );
    case "board":
      return (
        <div className="grid grid-cols-3 gap-1.5">
          {[3, 2, 4].map((n, col) => (
            <div key={col} className="flex flex-col gap-1 rounded p-1" style={{ background: faint }}>
              <span className="h-1.5 w-1/2 rounded-full" style={{ background: soft }} />
              {Array.from({ length: n }).map((_, i) => (
                <span key={i} className="h-5 rounded-sm bg-white" style={{ boxShadow: `inset 3px 0 0 ${(i + col) % 3 === 0 ? tint : "rgb(0 0 0 / 0.12)"}` }} />
              ))}
            </div>
          ))}
        </div>
      );
    case "site":
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex h-12 flex-col justify-end gap-1 rounded p-2" style={{ background: `linear-gradient(135deg, ${tint}, ${tint}99)` }}>
            <span className="h-1.5 w-1/2 rounded-full bg-white/80" />
            <span className="h-2.5 w-10 rounded-full bg-white" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex flex-col gap-1">
                <span className="cs-shimmer h-8 rounded-sm" style={{ background: faint, animationDelay: `${i * 150}ms` }} />
                <span className="h-1 w-3/4 rounded-full" style={{ background: soft }} />
              </span>
            ))}
          </div>
        </div>
      );
    case "detail":
      return (
        <div className={phone ? "flex flex-col gap-1.5" : "grid grid-cols-[1fr_4.5rem] gap-2"}>
          <div className="flex flex-col gap-1.5">
            <span className="h-2.5 w-2/3 rounded-full" style={{ background: "rgb(0 0 0 / 0.2)" }} />
            {[0.9, 0.75, 0.85, 0.5].map((w, i) => (
              <span key={i} className="cs-shimmer h-1.5 rounded-full" style={{ width: `${w * 100}%`, background: soft, animationDelay: `${i * 120}ms` }} />
            ))}
            <span className="mt-1 h-6 rounded" style={{ background: `${tint}22`, boxShadow: `inset 3px 0 0 ${tint}` }} />
          </div>
          <div className="flex flex-col gap-1.5 rounded bg-white p-1.5" style={{ boxShadow: `0 0 0 1px ${faint}` }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-3 rounded-sm" style={{ background: faint }} />
            ))}
            <span className="h-4 rounded-sm" style={{ background: tint }} />
          </div>
        </div>
      );
    case "form":
      return (
        <div className="flex flex-col gap-2">
          <span className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 flex-1 rounded-full" style={{ background: i < 2 ? tint : soft }} />
            ))}
          </span>
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex flex-col gap-1">
              <span className="h-1 w-1/3 rounded-full" style={{ background: soft }} />
              <span className="cs-shimmer h-5 rounded bg-white" style={{ boxShadow: `0 0 0 1px ${soft}`, animationDelay: `${i * 150}ms` }} />
            </span>
          ))}
          <span className="mt-1 h-6 rounded" style={{ background: tint }} />
        </div>
      );
  }
}

export function ScreenFrame({ slug, caption, tint, index }: { slug: string; caption: string; tint: string; index: number }) {
  const Screen = SCREENS[slug]?.[index];
  if (Screen) {
    return (
      <figure data-reveal style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties} className="group flex h-full flex-col border-b border-border bg-surface p-6 sm:border-r lg:p-8">
        <div className="relative overflow-hidden rounded-md p-4 sm:p-6" style={{ background: `linear-gradient(135deg, ${tint}, color-mix(in oklab, ${tint} 72%, #000))` }}>
          <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true" />
          <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
            <ShotZoom
              caption={caption}
              large={
                <div className="overflow-hidden rounded-[10px] shadow-2xl">
                  <ShotCanvas>
                    <Screen tint={tint} />
                  </ShotCanvas>
                </div>
              }
            >
              <div className="overflow-hidden rounded-[10px] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)]">
                <ShotCanvas>
                  <Screen tint={tint} />
                </ShotCanvas>
              </div>
            </ShotZoom>
          </div>
        </div>
        <figcaption className="mt-5 flex gap-3 text-sm leading-relaxed text-muted">
          <span className="font-mono text-xs text-accent-text">{String(index + 1).padStart(2, "0")}</span>
          {caption}
        </figcaption>
      </figure>
    );
  }

  const kind = kindOf(caption);
  const phone = isPhone(caption);
  return (
    <figure data-reveal data-tilt style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties} className="group flex h-full flex-col border-b border-border bg-surface p-6 sm:border-r lg:p-8">
      <div className="relative flex min-h-64 flex-1 items-center justify-center overflow-hidden rounded-md p-6" style={{ background: `linear-gradient(135deg, ${tint}, ${tint}cc)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true" />
        <div
          aria-hidden="true"
          className={`relative overflow-hidden bg-[#f7f6f2] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)] transition-transform duration-500 group-hover:-translate-y-1 ${
            phone ? "w-36 rounded-[1.4rem] border-[5px] border-ink" : "w-full max-w-sm rounded-lg"
          }`}
        >
          {phone ? (
            <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-ink/80" />
          ) : (
            <div className="flex items-center gap-1.5 bg-white px-3 py-2">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} className="size-2 rounded-full" style={{ background: c }} />
              ))}
              <span className="ml-3 h-2 flex-1 rounded-full bg-black/[0.06]" />
            </div>
          )}
          <div className={phone ? "p-2.5 pb-6" : "grid grid-cols-[2.5rem_1fr] gap-2.5 p-3"}>
            {!phone && (
              <div className="flex flex-col gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-2 rounded-full" style={{ background: i === index % 4 ? tint : soft }} />
                ))}
              </div>
            )}
            <Body kind={kind} tint={tint} phone={phone} />
          </div>
        </div>
      </div>
      <figcaption className="mt-5 flex gap-3 text-sm leading-relaxed text-muted">
        <span className="font-mono text-xs text-accent-text">{String(index + 1).padStart(2, "0")}</span>
        {caption}
      </figcaption>
    </figure>
  );
}
