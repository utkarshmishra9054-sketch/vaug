/** Marks placeholder content in development so it isn't shipped by accident. */
export function DemoBadge({ show, className = "" }: { show?: boolean; className?: string }) {
  if (!show || process.env.NODE_ENV === "production") return null;
  return (
    <span
      title="Placeholder content: replace before launch"
      className={`inline-flex items-center rounded-sm border border-dashed border-accent-text/60 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text ${className}`}
    >
      Demo
    </span>
  );
}
