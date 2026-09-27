/**
 * Small caption for mock dashboards, consoles and product visuals, so demo
 * figures are never mistaken for live client data.
 */
export function IllustrativeTag({
  label = "Illustrative example",
  className = "",
  tone = "auto",
}: {
  label?: string;
  className?: string;
  /** "light" for use over coloured or dark imagery. */
  tone?: "auto" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
        tone === "light" ? "bg-black/35 text-white/85 backdrop-blur-sm" : "bg-surface-2 text-subtle"
      } ${className}`}
    >
      <span className="size-1 rounded-full bg-current opacity-70" aria-hidden="true" />
      {label}
    </span>
  );
}
