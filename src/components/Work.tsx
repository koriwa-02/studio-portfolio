"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/useGsap";
import { workItems } from "@/lib/content";
import { projectSlug } from "@/lib/projects";
import { assetPath } from "@/lib/asset";

const filters = ["All", ...Array.from(new Set(workItems.map((item) => item.category.split(" / ")[0])))];

function WorkVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-105"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function WorkCard({ item, index }: { item: (typeof workItems)[number]; index: number }) {
  return (
    <Link
      href={`/projects/${projectSlug(item)}/`}
      className="work-card work-carousel-card group relative aspect-[4/5] overflow-hidden text-left"
      style={{
        backgroundColor: item.color,
        "--card-index": index,
      } as CSSProperties}
    >
      {(item.video || item.image) && (
        <>
          {item.video ? (
            <WorkVideo
              src={assetPath(item.video)}
              poster={item.image ? assetPath(item.image) : undefined}
            />
          ) : (
            <img
              src={assetPath(item.image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        </>
      )}
      <div className="work-card-content absolute inset-0 flex flex-col justify-between p-6 text-paper">
        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          {item.year}
        </span>
        <div className="translate-y-2 opacity-90 transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover:translate-y-0">
          <h3 className="font-display text-2xl font-bold uppercase leading-tight">
            {item.title}
          </h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] opacity-70">
            {item.category}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-[250ms] ease-[var(--ease-out)] group-hover:bg-ink/10" />
    </Link>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [filter, setFilter] = useState("All");

  const filteredItems =
    filter === "All" ? workItems : workItems.filter((item) => item.category.startsWith(filter));

  useEffect(() => {
    const viewport = carouselRef.current;
    if (!viewport || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const speed = 0.45;
    const tick = () => {
      if (!pausedRef.current) {
        const loopWidth = viewport.scrollWidth / 2;
        viewport.scrollLeft += speed;
        if (loopWidth > 0 && viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [filter]);

  const pauseCarousel = () => {
    pausedRef.current = true;
  };

  const resumeCarousel = () => {
    pausedRef.current = false;
  };

  useGSAP(
    () => {
      gsap.set(".work-card", { clipPath: "inset(0% 100% 100% 0%)" });
      gsap.set(".work-card-content", { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      tl.to(".work-card", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12,
      }).to(
        ".work-card-content",
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.12 },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  // Re-run a quick reveal whenever the filter changes so new cards don't just pop in.
  useGSAP(
    () => {
      gsap.fromTo(
        ".work-card",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.06 },
      );
    },
    { scope: sectionRef, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <section id="work" ref={sectionRef} className="bg-paper-dim px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">Selected work</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
              Projects with a pulse.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/60">
            A snapshot of recent brand, web and content work. Click a project for details.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`btn-press rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-[var(--ease-out)] ${
                filter === f
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/60 hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          ref={carouselRef}
          className="work-carousel mt-10"
          aria-label="Selected projects carousel"
          onPointerEnter={pauseCarousel}
          onPointerLeave={resumeCarousel}
          onFocus={pauseCarousel}
          onBlur={resumeCarousel}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") pauseCarousel();
          }}
          onPointerUp={(event) => {
            if (event.pointerType === "touch") window.setTimeout(resumeCarousel, 1200);
          }}
        >
          <div className="work-carousel-track">
            {[...filteredItems, ...filteredItems].map((item, index) => (
              <WorkCard key={`${item.title}-${item.category}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
