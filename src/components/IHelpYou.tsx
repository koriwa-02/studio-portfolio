"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/useGsap";
import { helpPoints } from "@/lib/content";
import { assetPath } from "@/lib/asset";

export default function IHelpYou() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      gsap.from(".help-title", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      const points = gsap.utils.toArray<HTMLElement>(".help-point");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) {
        points.forEach((point) => {
          gsap.fromTo(
            point,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: point,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      const video = videoRef.current;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (!video || !finePointer || reduced) return;

      const moveX = gsap.quickTo(video, "xPercent", { duration: 0.9, ease: "power3.out" });
      const moveY = gsap.quickTo(video, "yPercent", { duration: 0.9, ease: "power3.out" });
      const root = sectionRef.current;
      if (!root) return;
      const onMove = (event: PointerEvent) => {
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * -5);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * -4);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="help-story relative min-h-[620px] overflow-hidden bg-ink text-paper md:min-h-[720px]">
      <div className="help-stage relative min-h-[620px] overflow-hidden md:min-h-[720px]">
        <video
          ref={videoRef}
          className="help-video absolute inset-0 h-full w-full scale-[1.08] object-cover"
          src={assetPath("/videos/i-help-you-bg.mp4")}
          poster={assetPath("/videos/i-help-you-bg-poster.webp")}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-ink/70" />

        <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 content-center gap-12 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-24">
        <div className="md:col-span-4 md:self-start">
          <h2 className="help-title max-w-xs font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-shadow-lg md:text-6xl">
          <span className="text-red">&ldquo;</span> How I Can Help You{" "}
          <span className="text-red">&rdquo;</span>
          </h2>
          <span className="mt-8 block h-16 w-px bg-red" aria-hidden="true" />
        </div>

        <div className="help-list md:col-span-8">
          {helpPoints.map((point, i) => (
            <div
              key={point}
              className="help-point group flex items-start gap-4 border-t border-paper/25 py-5 transition-[border-color,transform] duration-300 ease-[var(--ease-out)] last:border-b hover:translate-x-2 hover:border-red md:gap-6 md:py-5"
            >
              <span className="font-display pt-1 text-xs font-bold tracking-[0.18em] text-red md:text-sm">
                0{i + 1}
              </span>
              <p className="max-w-2xl font-display text-base font-medium uppercase leading-[1.05] tracking-[0.01em] text-paper/80 drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.7)] transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-paper md:text-2xl">
                {point}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
