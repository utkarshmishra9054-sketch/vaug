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
        className="m-auto w-[min(92vw,1180px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 pb-3 text-white">
          <p className="text-sm leading-snug text-white/80">{caption}</p>
          <button type="button" onClick={close} aria-label="Close" className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/20">
            <X className="size-5" />
          </button>
        </div>
        {large}
      </dialog>
    </>
  );
}
