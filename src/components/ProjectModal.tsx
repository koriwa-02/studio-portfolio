"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { workItems } from "@/lib/content";

type Project = (typeof workItems)[number];

function BeforeAfter({ project }: { project: Project }) {
  const [position, setPosition] = useState(50);

  if (!project.beforeImage || !project.afterImage) return null;

  return (
    <div className="mt-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">
        Before &amp; After
      </p>
      <div className="before-after mt-3">
        <img src={project.beforeImage} alt={`${project.title} — before`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="before-after-after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <img src={project.afterImage} alt={`${project.title} — after`} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <span className="before-after-label before-after-label-before">Before</span>
        <span className="before-after-label before-after-label-after">After</span>
        <div className="before-after-divider" style={{ left: `${position}%` }} aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label="Compare before and after project images"
          onChange={(event) => setPosition(Number(event.target.value))}
          className="before-after-range"
        />
      </div>
    </div>
  );
}

export default function ProjectModal({
  project,
  open,
  originRect,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  originRect?: { left: number; top: number; width: number; height: number } | null;
  onClose: () => void;
}) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"image" | "video">("image");

  function openPreview(src: string | undefined, type: "image" | "video" = "image") {
    if (!src) return;
    setPreviewSrc(src);
    setPreviewType(type);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!open) setPreviewSrc(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (previewSrc) setPreviewSrc(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, previewSrc]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ease-[var(--ease-out)] md:p-8 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div
        className={`project-modal-panel relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto bg-paper text-ink transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${
          open ? "project-modal-panel-open opacity-100" : "project-modal-panel-closed opacity-0"
        }`}
        style={{
          "--modal-origin-x": originRect ? `${originRect.left + originRect.width / 2}px` : "50vw",
          "--modal-origin-y": originRect ? `${originRect.top + originRect.height / 2}px` : "50vh",
        } as React.CSSProperties}
      >
        {project && (
          <>
            <div
              className="relative flex aspect-video items-center justify-center overflow-hidden"
              style={{ backgroundColor: project.color }}
            >
              {project.video ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={project.video}
                  poster={project.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <>
                  <Image
                    src="/brand/logo-mark.svg"
                    alt=""
                    width={200}
                    height={103}
                    className="w-1/4 opacity-20"
                  />
                  <span className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.2em] text-paper/70">
                    Project image — placeholder
                  </span>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="btn-press absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-paper/40 bg-ink/30 text-paper backdrop-blur-sm transition-colors duration-200 ease-[var(--ease-out)] hover:bg-paper hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">
                  {project.category}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                  {project.year}
                </p>
              </div>
              <h3 className="font-display mt-3 text-3xl font-bold uppercase leading-none md:text-5xl">
                {project.title}
              </h3>

              {project.challenge ? (
                <div className="mt-6 flex flex-col gap-5">
                  {project.challenge && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red">
                        The Challenge
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.approach && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red">
                        The Approach
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
                        {project.approach}
                      </p>
                    </div>
                  )}
                  {project.results && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red">
                        The Results
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
                        {project.results}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
                  {project.details}
                </p>
              )}

              {project.beforeImage && project.afterImage ? (
                <BeforeAfter key={`${project.title}-comparison`} project={project} />
              ) : project.gallery ? (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {project.gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => openPreview(src, "image")}
                      className="group btn-press relative aspect-square overflow-hidden bg-ink/5 text-left"
                    >
                      <img
                        src={src}
                        alt={`${project.title} — image ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 ease-[var(--ease-out)] group-hover:bg-ink/20" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="relative flex aspect-square items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: i === 1 ? "#0a0a0a" : project.color,
                        opacity: i === 1 ? 1 : 0.85,
                      }}
                    >
                      <Image
                        src="/brand/logo-mark.svg"
                        alt=""
                        width={80}
                        height={41}
                        className="w-1/3 opacity-20"
                      />
                    </div>
                  ))}
                </div>
              )}

              {project.demoVideo && (
                <div className="mt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">
                    Live Site Walkthrough
                  </p>
                  <button
                    type="button"
                    onClick={() => openPreview(project.demoVideo, "video")}
                    className="group btn-press relative mt-3 aspect-video w-full overflow-hidden bg-ink/5 text-left"
                  >
                    <video
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-105"
                      src={project.demoVideo}
                      poster={project.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-200 ease-[var(--ease-out)] group-hover:bg-ink/20" />
                    <span className="absolute top-3 left-3 bg-red px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-paper">
                      Scroll Demo
                    </span>
                  </button>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="border border-ink/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink/70"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="btn-press mt-10 inline-block bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-200 ease-[var(--ease-out)] hover:bg-red"
              >
                Start a similar project
              </a>
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-200 ease-[var(--ease-out)] md:p-10 ${
          previewSrc ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setPreviewSrc(null)}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 bg-ink/95"
        />
        {previewSrc && previewType === "video" ? (
          <video
            src={previewSrc}
            className="relative z-10 max-h-full max-w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        ) : (
          previewSrc && (
            <img
              src={previewSrc}
              alt=""
              className="relative z-10 max-h-full max-w-full object-contain"
            />
          )
        )}
        <button
          type="button"
          onClick={() => setPreviewSrc(null)}
          aria-label="Close preview"
          className="btn-press absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-paper/40 bg-ink/30 text-paper backdrop-blur-sm transition-colors duration-200 ease-[var(--ease-out)] hover:bg-paper hover:text-ink"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
