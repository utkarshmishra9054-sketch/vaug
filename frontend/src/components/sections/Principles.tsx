import type { Principle } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

/**
 * 2×2 grid of principles, read as a sequence: numbered steps whose accent line
 * draws in, one after another, as the grid scrolls into view.
 */
export function Principles({ items }: { items: Principle[] }) {
  return (
    <ul className="relative grid border-t border-border sm:grid-cols-2">
      <span aria-hidden="true" className="grid-dot left-1/2 top-0 hidden sm:block" />
      <span aria-hidden="true" className="grid-dot left-1/2 top-1/2 hidden sm:block" />
      {items.map((p, i) => (
        <li
          key={p.title}
          data-reveal
          data-glow
          style={{ "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
          className={`group relative border-border p-8 transition-colors duration-300 hover:bg-surface sm:p-12 ${i % 2 === 0 ? "sm:border-r" : ""} ${
            i < items.length - 2 ? "border-b" : "max-sm:border-b max-sm:last:border-b-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="prin-line absolute inset-x-0 top-0 h-[2px] origin-left bg-accent-text"
            style={{ transitionDelay: `${150 + i * 180}ms` }}
          />
          <span className="flex items-center justify-between">
            <span className="inline-flex size-11 items-center justify-center rounded-sm bg-surface-2 text-fg transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
              <Icon name={p.icon} className="size-5" />
            </span>
            <span className="font-mono text-sm text-subtle transition-colors duration-300 group-hover:text-accent-text">
              {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </span>
          <h3 className="mt-10 text-xl font-semibold text-fg sm:text-2xl">{p.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}
