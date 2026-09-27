/** Initials on a gradient disc: stands in for a portrait until real photos exist. */
export function Monogram({
  initials,
  gradient,
  className = "",
  ring = false,
}: {
  initials: string;
  gradient: [string, string];
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold tracking-[-0.04em] text-white ${ring ? "ring-4 ring-bg" : ""} ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.45),transparent_55%)]" />
      <span className="relative [text-shadow:0_1px_8px_rgb(0_0_0/0.25)]">{initials}</span>
    </span>
  );
}
