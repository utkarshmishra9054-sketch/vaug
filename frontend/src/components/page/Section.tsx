import { Band, SectionTitle } from "@/components/ui/Band";

/**
 * A titled band. Children render edge to edge inside the frame, so grids can
 * draw their own borders; wrap text content in `frame-pad` yourself.
 */
export function Section({
  tone = "light",
  id,
  label,
  eyebrow,
  title,
  subtitle,
  align = "left",
  children,
  flush = false,
}: {
  tone?: "dark" | "light";
  id?: string;
  label?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  children?: React.ReactNode;
  /** No bottom padding under the children (for grids that end on a border). */
  flush?: boolean;
}) {
  return (
    <Band tone={tone} id={id} label={label ?? (typeof title === "string" ? title : undefined)}>
      {title && (
        <div className={`frame-pad pt-20 lg:pt-24 ${children ? "pb-12" : "pb-20 lg:pb-24"}`}>
          {eyebrow && <p className={`mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-text ${align === "center" ? "text-center" : ""}`}>{eyebrow}</p>}
          <SectionTitle title={title} subtitle={subtitle} align={align} />
        </div>
      )}
      {children && <div className={flush ? "" : "pb-20 lg:pb-24"}>{children}</div>}
    </Band>
  );
}
