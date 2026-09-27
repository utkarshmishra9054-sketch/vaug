import type { Moment } from "@/content/company";
import { DemoBadge } from "@/components/ui/DemoBadge";

const toneClass: Record<Moment["tone"], string> = {
  purple: "bg-purple text-white",
  yellow: "bg-yellow text-ink",
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
};

/* ------------------------------------------------------------------ */
/* Hero collage: sticky notes, a chat bubble and a cursor, drifting     */
/* ------------------------------------------------------------------ */

export function CultureCollage({ notes }: { notes: { text: string; tone: Moment["tone"] }[] }) {
  const spots = [
    "left-[2%] top-[6%] -rotate-6",
    "right-[0%] top-[18%] rotate-3",
    "left-[8%] bottom-[18%] rotate-2",
    "right-[6%] bottom-[4%] -rotate-3",
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
      {/* board */}
      <div className="absolute inset-[10%] rounded-2xl border border-border bg-surface/60 [background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:18px_18px]" />
      {/* centre: avatars in a call */}
      <div className="absolute inset-[30%] grid grid-cols-2 gap-2 rounded-xl border border-border bg-bg p-2 shadow-2xl">
        {[
          ["#7c3aed", "#b69cff"],
          ["#ffd23f", "#f97316"],
          ["#10b981", "#22d3ee"],
          ["#ec4899", "#7c3aed"],
        ].map(([a, b], i) => (
          <span key={a} className="relative flex items-center justify-center rounded-md bg-surface-2">
            <span className="size-7 rounded-full sm:size-9" style={{ backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }} />
            {i === 2 && <span className="company-talk absolute bottom-1.5 left-1.5 h-1 w-3 rounded-full bg-emerald-400" />}
          </span>
        ))}
      </div>
      {notes.map((n, i) => (
        <div
          key={n.text}
          className={`company-float absolute max-w-[46%] rounded-md px-3 py-2.5 text-xs font-semibold leading-snug shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] sm:text-sm ${toneClass[n.tone]} ${spots[i % spots.length]}`}
          style={{ animationDelay: `${i * -1.3}s` }}
        >
          {n.text}
        </div>
      ))}
      {/* emoji reactions rising */}
      <div className="absolute bottom-[30%] left-1/2 flex gap-2">
        {["🎉", "🚀", "👏"].map((e, i) => (
          <span key={e} className="company-rise text-lg" style={{ animationDelay: `${i * 0.9}s` }}>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Moments bento: styled tiles with motifs instead of photos            */
/* ------------------------------------------------------------------ */

const sizeClass: Record<Moment["size"], string> = {
  lg: "sm:col-span-2 sm:row-span-2 min-h-[22rem]",
  wide: "sm:col-span-2 min-h-[14rem]",
  tall: "sm:row-span-2 min-h-[22rem]",
  sm: "min-h-[14rem]",
};

function Motif({ motif }: { motif: Moment["motif"] }) {
  switch (motif) {
    case "rings":
      return (
        <div className="absolute -right-16 -top-16 size-72">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="company-ring absolute inset-0 rounded-full border-2 border-current opacity-20" style={{ animationDelay: `${i * 0.8}s` }} />
          ))}
        </div>
      );
    case "confetti":
      return (
        <div className="absolute inset-0">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="company-confetti absolute block h-2.5 w-1.5 rounded-[1px]"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 23) % 60}%`,
                background: ["#7c3aed", "#131116", "#ffffff", "#ec4899"][i % 4],
                animationDelay: `${(i % 7) * 0.4}s`,
                rotate: `${i * 29}deg`,
              }}
            />
          ))}
        </div>
      );
    case "bars":
      return (
        <div className="absolute inset-x-6 bottom-24 flex h-24 items-end gap-2 opacity-40">
          {[35, 55, 45, 70, 60, 85, 75, 95].map((h, i) => (
            <span key={i} className="company-bar flex-1 origin-bottom rounded-t-sm bg-current" style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      );
    case "waves":
      return (
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 top-6 h-24 w-full opacity-25">
          {[0, 1, 2].map((i) => (
            <path key={i} className="company-wave2" style={{ animationDelay: `${i * -2.6}s` }} d={`M0 ${40 + i * 22} Q 50 ${20 + i * 22} 100 ${40 + i * 22} T 200 ${40 + i * 22} T 300 ${40 + i * 22} T 400 ${40 + i * 22} T 500 ${40 + i * 22} T 600 ${40 + i * 22}`} fill="none" stroke="currentColor" strokeWidth="3" />
          ))}
        </svg>
      );
    case "grid":
      return <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />;
    case "dots":
      return <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(currentColor_2px,transparent_2px)] [background-size:16px_16px] [mask-image:radial-gradient(circle_at_80%_20%,black,transparent_70%)]" />;
  }
}

export function MomentsBento({ moments }: { moments: Moment[] }) {
  return (
    <ul className="grid grid-flow-row-dense grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-4">
      {moments.map((m, i) => (
        <li key={m.title} data-reveal style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties} className={sizeClass[m.size]}>
          <figure data-tilt className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-lg p-6 sm:p-7 ${toneClass[m.tone]}`}>
            <div aria-hidden="true" className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105">
              <Motif motif={m.motif} />
            </div>
            <span className="absolute left-6 top-6 rounded-sm border border-current/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-80 sm:left-7 sm:top-7">{m.when}</span>
            <DemoBadge show={m.placeholder} className="absolute right-6 top-6 sm:right-7 sm:top-7" />
            <figcaption>
              <span className={`block font-semibold leading-tight tracking-[-0.03em] ${m.size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>{m.title}</span>
              <span className="mt-2 block max-w-md text-sm leading-relaxed opacity-80 transition-all duration-500 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-80">
                {m.caption}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* How we treat each other                                              */
/* ------------------------------------------------------------------ */

export function CulturePrinciples({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="group border-b border-border p-8 sm:border-r lg:p-10">
          <span aria-hidden="true" className="block font-serif text-6xl leading-none text-accent-text transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
            &ldquo;
          </span>
          <h3 className="mt-4 text-xl font-semibold text-fg">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
