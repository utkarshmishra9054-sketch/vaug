/**
 * A full-width section band with a tone, containing the railed centre frame.
 * `dots` adds small markers where the band's bottom edge meets the rails.
 * `backdrop` renders edge to edge behind the frame (e.g. a hero gradient), and
 * `rails={false}` drops the frame's side lines so the band reads as one open canvas.
 */
export function Band({
  tone,
  id,
  children,
  className = "",
  frameClassName = "",
  dots = true,
  label,
  backdrop,
  rails = true,
}: {
  tone: "dark" | "light";
  id?: string;
  children: React.ReactNode;
  className?: string;
  frameClassName?: string;
  dots?: boolean;
  label?: string;
  backdrop?: React.ReactNode;
  rails?: boolean;
}) {
  return (
    <section id={id} data-tone={tone} aria-label={label} className={`band relative ${backdrop ? "overflow-hidden" : ""} ${className}`}>
      {backdrop && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {backdrop}
        </div>
      )}
      <div className={`frame ${rails ? "" : "frame-open"} ${frameClassName}`}>
        {children}
        {dots && rails && (
          <>
            <span aria-hidden="true" className="grid-dot top-full left-0 hidden xl:block" />
            <span aria-hidden="true" className="grid-dot top-full left-full hidden xl:block" />
          </>
        )}
      </div>
    </section>
  );
}

/** Light lead + bold ending, the site's signature headline style. */
export function SplitHeading({
  light,
  bold,
  as: Tag = "h2",
  className = "",
}: {
  light: string;
  bold: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag className={className}>
      <span className="font-light">{light}</span> <span className="font-semibold">{bold}</span>
    </Tag>
  );
}

/** Wraps each word in a mask so it can slide up when its [data-reveal] parent appears. */
export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word">
          <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
          {"\u00a0"}
        </span>
      ))}
    </>
  );
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div data-reveal className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""} ${className}`}>
      <h2 className="max-w-4xl text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl lg:text-[2.9rem]">
        {typeof title === "string" ? <Words text={title} /> : title}
      </h2>
      {subtitle && <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}
