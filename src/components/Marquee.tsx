"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/useGsap";
import { marqueeItems } from "@/lib/content";

export default function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current || !paintRef.current) return;

      // A sped-up infinite loop is more disorienting for motion-sensitive users,
      // not less — so the continuous scroll is skipped entirely, not fast-forwarded.
      let marqueeTween: gsap.core.Tween | undefined;
      const revealMarquee = () => {
        gsap.to(paintRef.current, {
          clipPath: "inset(0 0% 0 0)",
          rotateY: 0,
          duration: 1.1,
          ease: "power4.out",
        });
        gsap.to(".marquee-word", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.025,
          ease: "power3.out",
        });
        marqueeTween?.play(0);
      };

      if (!prefersReducedMotion) {
        const width = trackRef.current.scrollWidth / 2;
        const curtainComplete = document.documentElement.classList.contains("curtain-complete");
        marqueeTween = gsap.to(trackRef.current, {
          x: -width,
          duration: 22,
          ease: "none",
          repeat: -1,
          paused: !curtainComplete,
        });
      }

      gsap.set(paintRef.current, {
        clipPath: "inset(0 100% 0 0)",
        rotateY: -55,
        transformOrigin: "left center",
      });
      gsap.set(".marquee-word", { opacity: 0, y: 14 });

      const curtainComplete = document.documentElement.classList.contains("curtain-complete");
      if (curtainComplete) revealMarquee();
      else window.addEventListener("koriwa:curtain-complete", revealMarquee);

      return () => {
        window.removeEventListener("koriwa:curtain-complete", revealMarquee);
        marqueeTween?.kill();
      };
    },
    { scope: wrapRef },
  );

  // Looping content only makes sense once the track actually scrolls — with
  // reduced motion the strip is static, so show the words once instead of
  // frozen, redundant copies.
  const allItems = prefersReducedMotion
    ? marqueeItems
    : [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      ref={wrapRef}
      className="hero-marquee relative overflow-hidden border-y border-ink"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={paintRef}
        className="absolute inset-0 bg-red"
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      />
      <div className="relative py-4">
        <div ref={trackRef} className="flex w-max items-center whitespace-nowrap">
          {allItems.map((item, i) => (
            <span
              key={i}
              className="marquee-word font-display mx-6 flex items-center gap-6 text-2xl font-bold uppercase tracking-tight text-paper md:text-4xl"
            >
              {item}
              <span className="text-3xl text-ink">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
