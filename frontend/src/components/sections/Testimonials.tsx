import type { Testimonial } from "@/content/types";
import { DemoBadge } from "@/components/ui/DemoBadge";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure data-glow className="rounded-md border border-border bg-surface p-8 text-center shadow-[0_8px_24px_-18px_rgb(0_0_0/0.3)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-border-strong">
      <blockquote className="text-lg leading-relaxed text-fg">{t.quote}</blockquote>
      <figcaption className="mt-8 flex items-center justify-center gap-3 text-left">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-fg">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <span>
          <span className="flex items-center gap-2 text-sm font-semibold text-fg">
            {t.name}, {t.role}
            <DemoBadge show={t.placeholder} />
          </span>
          <span className="block text-sm text-muted">{t.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Two columns of quotes drifting vertically in opposite directions. */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const cols = [testimonials.filter((_, i) => i % 2 === 0), testimonials.filter((_, i) => i % 2 === 1)];

  return (
    <>
      {/* Accessible, static list for screen readers */}
      <ul className="sr-only">
        {testimonials.map((t) => (
          <li key={t.name}>
            “{t.quote}” — {t.name}, {t.role}, {t.company}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mask-fade-y group mx-auto grid h-[40rem] max-w-5xl gap-6 overflow-hidden px-4 sm:px-8 md:grid-cols-2">
        {cols.map((col, c) => (
          <div key={c} className={c === 1 ? "hidden md:block" : undefined}>
            <div
              className="animate-marquee-y flex flex-col gap-6 group-hover:[animation-play-state:paused]"
              style={{ "--marquee-duration": c === 0 ? "26s" : "32s", animationDirection: c === 1 ? "reverse" : "normal" } as React.CSSProperties}
            >
              {[...col, ...col].map((t, i) => (
                <Card key={`${t.name}-${i}`} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
