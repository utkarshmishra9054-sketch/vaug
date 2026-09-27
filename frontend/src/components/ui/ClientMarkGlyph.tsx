import type { ClientMark } from "@/content/types";

/** Simple original geometric marks for the demo client logos. */
const glyphs: Record<ClientMark, React.ReactNode> = {
  stack: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="14" height="4" rx="1" opacity=".7" />
      <rect x="3" y="16" width="10" height="4" rx="1" opacity=".45" />
    </>
  ),
  wave: <path d="M2 14c3-5 6-5 9 0s6 5 9 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
  quay: (
    <>
      <path d="M4 20V9l8-5 8 5v11z" />
      <rect x="10" y="13" width="4" height="7" fill="var(--bg, #fff)" />
    </>
  ),
  parcel: (
    <>
      <path d="M12 2l9 5v10l-9 5-9-5V7z" />
      <path d="M3 7l9 5 9-5M12 12v10" fill="none" stroke="var(--bg, #fff)" strokeWidth="1.6" />
    </>
  ),
  loom: (
    <>
      <circle cx="9" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="15" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(-25 12 12)" />
    </>
  ),
  clause: (
    <>
      <path d="M5 3h10l4 4v14H5z" />
      <path d="M8 11h8M8 15h5" stroke="var(--bg, #fff)" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  leaf: <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16zm0 0l9-9" fill="currentColor" stroke="var(--bg, #fff)" strokeWidth="1.4" />,
  sun: (
    <>
      <circle cx="12" cy="14" r="5" />
      <path d="M12 3v3M4 8l2 2M20 8l-2 2M2 19h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="var(--bg, #fff)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
};

export function ClientMarkGlyph({ mark, className = "size-6" }: { mark: ClientMark; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {glyphs[mark]}
    </svg>
  );
}
