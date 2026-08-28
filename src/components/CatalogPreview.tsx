"use client";

import { useState } from "react";
import { assetPath } from "@/lib/asset";

export default function CatalogPreview({ pdf }: { pdf: string }) {
  const [open, setOpen] = useState(false);
  const pdfUrl = assetPath(pdf);

  return (
    <div className="case-study-catalog-preview mt-14 border-t border-ink/15 pt-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="case-study-index">Interactive catalog</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
            Browse the finished catalog page by page, or open it in a new tab for the full viewer experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="btn-press inline-flex items-center bg-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-paper transition-transform duration-200 hover:scale-[1.03]"
          >
            {open ? "Close preview" : "Open e-catalog"} <span className="ml-3 text-sm leading-none">→</span>
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-press inline-flex items-center border border-ink/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-paper"
          >
            Open in new tab ↗
          </a>
        </div>
      </div>
      {open && (
        <div className="mt-8 overflow-hidden bg-ink p-2 sm:p-3">
          <iframe
            src={pdfUrl}
            title="Zidalum finished e-catalog interactive preview"
            className="h-[min(78svh,900px)] w-full bg-paper"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
