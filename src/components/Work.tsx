"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
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

function WorkCard({
  item,
  index,
  activeIndex,
  angleStep,
  radius,
  onActivate,
}: {
  item: (typeof workItems)[number];
  index: number;
  activeIndex: number;
  angleStep: number;
  radius: number;
  onActivate: (index: number) => void;
}) {
  const relativeIndex = index - activeIndex;
  const active = relativeIndex === 0;
  return (
    <Link
      href={`/projects/${projectSlug(item)}/`}
      aria-current={active ? "true" : undefined}
      onClick={(event) => {
        if (!active) {
          event.preventDefault();
          onActivate(index);
        }
      }}
      className={`work-card work-carousel-card group absolute left-1/2 top-1/2 aspect-[4/5] overflow-hidden text-left ${active ? "is-active" : ""}`}
      style={{
        backgroundColor: item.color,
        "--card-angle": `${index * angleStep}deg`,
        "--card-radius": `${radius}px`,
        "--card-scale": active ? 1.05 : 1,
        zIndex: 100 - Math.abs(relativeIndex),
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
              alt={`${item.title} ${item.category.toLowerCase()} project by KORIWA Studio`}
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
  const cylinderRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const rotationRef = useRef(0);
  const dragStartRef = useRef({ x: 0, rotation: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(900);
  const [filter, setFilter] = useState("All");

  const filteredItems =
    filter === "All" ? workItems : workItems.filter((item) => item.category.startsWith(filter));

  const angleStep = 15;

  useEffect(() => {
    const viewport = carouselRef.current;
    if (!viewport) return;
    const updateRadius = () => setRadius(Math.max(560, Math.min(1100, viewport.clientWidth * 0.78)));
    updateRadius();
    const observer = new ResizeObserver(updateRadius);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (pausedRef.current || draggingRef.current) return;
      const next = activeIndex + 1 >= filteredItems.length ? 0 : activeIndex + 1;
      const nextRotation = next === 0 ? 0 : -next * angleStep;
      rotationRef.current = nextRotation;
      setActiveIndex(next);
      setRotation(nextRotation);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [activeIndex, angleStep, filteredItems.length]);

  const pauseCarousel = () => {
    pausedRef.current = true;
  };

  const resumeCarousel = () => {
    pausedRef.current = false;
  };

  const activate = (index: number) => {
    const nextRotation = index === 0 ? 0 : -index * angleStep;
    rotationRef.current = nextRotation;
    setActiveIndex(index);
    setRotation(nextRotation);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    didDragRef.current = false;
    pausedRef.current = true;
    dragStartRef.current = { x: event.clientX, rotation: rotationRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - dragStartRef.current.x;
    if (Math.abs(delta) > 6) didDragRef.current = true;
    const nextRotation = dragStartRef.current.rotation + delta * 0.12;
    rotationRef.current = nextRotation;
    setRotation(nextRotation);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const target = Math.max(0, Math.min(filteredItems.length - 1, Math.round(-rotationRef.current / angleStep)));
    activate(target);
    window.setTimeout(resumeCarousel, 1200);
  };

  useGSAP(
    () => {
      gsap.set(".work-card-content", { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      tl.to(
        ".work-card-content",
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.12 },
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
              onClick={() => {
                setFilter(f);
                setActiveIndex(0);
                rotationRef.current = 0;
                setRotation(0);
              }}
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
          tabIndex={0}
          onPointerEnter={pauseCarousel}
          onPointerLeave={resumeCarousel}
          onFocus={pauseCarousel}
          onBlur={resumeCarousel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              activate((activeIndex + 1) % filteredItems.length);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              activate((activeIndex - 1 + filteredItems.length) % filteredItems.length);
            }
          }}
        >
          <div
            ref={cylinderRef}
            className="work-carousel-track"
            style={{ "--work-rotation": `${rotation}deg` } as CSSProperties}
          >
            {filteredItems.map((item, index) => (
              <WorkCard
                key={`${item.title}-${item.category}`}
                item={item}
                index={index}
                activeIndex={activeIndex}
                angleStep={angleStep}
                radius={radius}
                onActivate={activate}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <button type="button" className="work-carousel-control" onClick={() => activate((activeIndex - 1 + filteredItems.length) % filteredItems.length)} aria-label="Previous project">←</button>
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em]" aria-live="polite">
            {filteredItems[activeIndex]?.title} <span className="text-red">·</span> {filteredItems[activeIndex]?.category} <span className="text-red">·</span> {filteredItems[activeIndex]?.year}
          </p>
          <button type="button" className="work-carousel-control" onClick={() => activate((activeIndex + 1) % filteredItems.length)} aria-label="Next project">→</button>
        </div>
      </div>

    </section>
  );
}
