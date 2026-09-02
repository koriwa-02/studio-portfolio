"use client";

import { assetPath } from "@/lib/asset";

export default function CatalogPreview({ pdf }: { pdf: string }) {
  const pdfUrl = assetPath(pdf);

  return (
    <div className="case-study-catalog-preview mt-14 border-t border-ink/15 pt-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="case-study-index">Interactive catalog</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">
            Open the finished catalog in a new tab for the full viewer experience.
          </p>
        </div>
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
  );
}
