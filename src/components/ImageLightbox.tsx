"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open full-size image: ${alt}`}
        className="group relative block h-full w-full cursor-zoom-in text-left"
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 72vw, 270px" className="object-contain transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.02]" />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Full-size project image"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-[92vh] w-[92vw]" onClick={(event) => event.stopPropagation()}>
            <Image src={src} alt={alt} fill sizes="92vw" className="object-contain" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close full-size image"
              className="btn-press absolute right-0 top-0 border border-paper/60 bg-ink/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-paper"
            >
              Close
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
