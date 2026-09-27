import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "solid" | "outline" | "light" | "dark";

/*
 * Rectangular button with a square arrow box on the right.
 *  solid   – follows the band tone (paper on dark bands, ink on light bands)
 *  light   – always paper (for coloured panels)
 *  dark    – always ink
 *  outline – transparent with a border
 */
const variants: Record<Variant, { root: string; box: string }> = {
  solid: { root: "bg-[var(--btn-bg)] text-[var(--btn-fg)]", box: "bg-[var(--btn-box)] text-[var(--btn-arrow)]" },
  light: { root: "bg-paper text-ink", box: "bg-ink text-purple-light" },
  dark: { root: "bg-ink text-paper", box: "bg-paper text-ink" },
  outline: { root: "border border-border-strong text-fg hover:bg-surface-2", box: "text-accent-text" },
};

export function arrowButtonClass(variant: Variant = "solid", className = "") {
  return `btn-sweep group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-md py-2 pl-4 pr-2 text-sm font-semibold transition-[box-shadow,background-color] duration-300 hover:shadow-[0_14px_34px_-14px_rgb(0_0_0/0.55)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${variants[variant].root} ${className}`;
}

export function ArrowBox({ variant = "solid" }: { variant?: Variant }) {
  return (
    <span className={`relative inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-[4px] transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${variants[variant].box}`}>
      {/* the arrow flies out to the right while a fresh one slides in from the left */}
      <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.6,0,0.2,1)] group-hover:translate-x-[180%]" aria-hidden="true" />
      <ArrowRight className="absolute size-4 -translate-x-[180%] transition-transform duration-500 ease-[cubic-bezier(0.6,0,0.2,1)] group-hover:translate-x-0" aria-hidden="true" />
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} data-magnetic className={arrowButtonClass(variant, className)}>
      <span className="relative">{children}</span>
      <ArrowBox variant={variant} />
    </Link>
  );
}
