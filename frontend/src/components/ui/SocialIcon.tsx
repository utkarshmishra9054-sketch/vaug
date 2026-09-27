import type { SiteConfig } from "@/content/types";

type SocialName = SiteConfig["socials"][number]["icon"];

// Simple generic glyphs; swap for official brand assets if you prefer.
const paths: Record<SocialName, React.ReactNode> = {
  linkedin: (
    <>
      <rect x="3" y="9" width="4" height="12" rx="1" />
      <circle cx="5" cy="4.5" r="2" />
      <path d="M10 9h3.8v1.8c.6-1.1 2-2.1 4-2.1 3.3 0 4.2 2.1 4.2 5V21h-4v-6.4c0-1.5-.3-2.8-1.9-2.8s-2.1 1.2-2.1 2.8V21h-4z" />
    </>
  ),
  x: <path d="M4 3h4.6l4.1 5.8L17.6 3H20l-6.2 7.3L21 21h-4.6l-4.5-6.3L6.4 21H4l6.8-7.9z" />,
  instagram: (
    <path
      fillRule="evenodd"
      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
    />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
  ),
  youtube: (
    <path
      fillRule="evenodd"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"
    />
  ),
};

export function SocialIcon({ name, className = "size-4" }: { name: SocialName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
