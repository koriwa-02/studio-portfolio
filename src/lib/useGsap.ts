"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, TextPlugin, useGSAP);

  if (prefersReducedMotion) {
    // Speeding up one-shot reveal tweens is fine (they finish almost instantly),
    // but this must NOT apply to infinite/repeating tweens (e.g. the marquee) —
    // a sped-up infinite loop is more disorienting for motion-sensitive users,
    // not less. Those are opted out individually via `prefersReducedMotion`.
    gsap.globalTimeline.timeScale(50);
  }
}

export { gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, TextPlugin, useGSAP };

export function useSectionRef<T extends HTMLElement>() {
  return useRef<T>(null);
}
