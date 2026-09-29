"use client";

import { useRef, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";

/**
 * Makes a case study screenshot clickable: opens the same screen, larger, in
 * a native modal dialog (Esc, backdrop click or the close button dismiss it).
 */
export function ShotZoom({ caption, children, large }: { caption: string; children: ReactNode; large: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label={`Enlarge screenshot: ${caption}`}
        className="group/zoom relative block w-full cursor-zoom-in rounded-[10px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {children}
        <span className="pointer-events-none absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100" aria-hidden="true">
          <Maximize2 className="size-4" />
        </span>
      </button>
      <dialog
        ref={ref}
        aria-label={caption}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[94dvh] w-[min(94vw,1180px)] max-w-none flex-col overflow-hidden bg-transparent p-0 open:flex backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 pb-3 text-white">
          <p className="text-sm leading-snug text-white/80">{caption}</p>
          <button type="button" onClick={close} aria-label="Close" className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/20">
            <X className="size-5" />
          </button>
        </div>
        {/* On narrow screens the shot keeps a readable width and pans sideways instead of shrinking. */}
        <div className="min-h-0 overflow-auto overscroll-contain rounded-[10px]">
          <div className="min-w-[760px]">{large}</div>
        </div>
        <p className="shrink-0 pt-3 text-center text-xs text-white/60 md:hidden">Swipe sideways to see the whole screen.</p>
      </dialog>
    </>
  );
}
