import Link from "next/link";

/**
 * VAUG wordmark: heavy, tight lettering followed by a dot that stretches into
 * an arrow shooting forward from the G ("progress"). The dot is purple on light
 * backgrounds and yellow on dark ones (see `--logo-dot` in globals.css).
 *
 * Motion: letters rise in and the dot drops and shoots once on load; the arrow
 * extends again on hover, angled upward (growth, not a flat line). The footer
 * has its own animated version (layout/FooterWordmark.tsx).
 */
export function Wordmark({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <span className={`vaug-logo ${animated ? "vaug-logo--intro" : ""} ${className}`} aria-hidden="true">
      <span className="vaug-logo__letters">
        {"VAUG".split("").map((ch, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
      <span className="vaug-logo__arrow">
        <span className="vaug-logo__shaft" />
        <svg className="vaug-logo__head" viewBox="0 0 10 12" fill="none">
          <path d="M2 1.5 L8 6 L2 10.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="VAUG home"
      className={`group inline-flex items-center text-fg ${size === "lg" ? "text-5xl" : "text-[1.7rem]"} ${className}`}
    >
      <Wordmark />
    </Link>
  );
}
