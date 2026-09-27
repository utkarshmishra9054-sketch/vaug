import { ViewTransition } from "react";

/**
 * Templates remount on every navigation, so the page content fades and rises
 * in while the old page fades out (see `.vt-page-*` in globals.css).
 * Browsers without the View Transitions API simply swap pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="vt-page-in" exit="vt-page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
