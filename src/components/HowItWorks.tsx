"use client";

import { useRef } from "react";
import {
  Camera,
  Cursor,
  InstagramLogo,
  LinkedinLogo,
  Star,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/useGsap";
import { processSteps } from "@/lib/content";

// The flat-lay heading, set on cut scraps the way the reference cuts each word
// onto its own scrap. Rotations are small and deliberately uneven — a shared
// angle reads as a mistake, a varied one reads as placed by hand.
const TITLE_BLOCKS = [
  {
    text: "How",
    bg: "var(--scrap-a)",
    fg: "var(--scrap-a-fg)",
    noteFg: "var(--scrap-a-fg)",
    noteOpacity: 0.72,
    rot: -3.2,
    pos: "ml-0 mt-0",
    note: "the process we run",
  },
  {
    text: "it works",
    bg: "var(--scrap-b)",
    fg: "var(--scrap-b-fg)",
    // Ink rather than the block's own white: white at this size over the brand
    // red measures 3.7:1, under the 4.5:1 AA floor, and dropping it to 72%
    // makes it worse. Ink on red clears the floor at 5.3:1 — and the reference
    // sets its note in the dark hue on the colour block too.
    noteFg: "var(--color-ink)",
    noteOpacity: 1,
    rot: 2.4,
    // The red scrap laps over the paper one the way the reference overlaps its
    // cut blocks — but only from md up. At mobile widths the blocks are
    // proportionally far wider, and the same lap buries the first block's note.
    pos: "ml-[4%] mt-1 md:ml-[16%] md:-mt-6",
    note: "start to ship",
  },
];

// Objects scattered across the mat. Positions are percentages so the whole
// arrangement reflows with the section instead of needing a breakpoint per
// object, and every one is a real SVG icon rather than a photo cut-out.
const MAT_OBJECTS = [
  { Icon: Camera, weight: "duotone" as const, color: "var(--color-paper)", size: "clamp(44px,6vw,92px)", top: "6%", left: "4%", rot: -14 },
  { Icon: YoutubeLogo, weight: "fill" as const, color: "var(--color-red)", size: "clamp(56px,8vw,124px)", top: "7%", left: "56%", rot: 8 },
  { Icon: InstagramLogo, weight: "duotone" as const, color: "var(--color-paper)", size: "clamp(34px,4.2vw,64px)", top: "16%", left: "82%", rot: -7 },
  { Icon: XLogo, weight: "fill" as const, color: "var(--color-paper)", size: "clamp(26px,3.2vw,48px)", top: "30%", left: "92%", rot: 12 },
  { Icon: Cursor, weight: "fill" as const, color: "var(--color-red)", size: "clamp(38px,4.8vw,76px)", top: "44%", left: "74%", rot: 0 },
  { Icon: LinkedinLogo, weight: "duotone" as const, color: "var(--color-paper)", size: "clamp(30px,3.6vw,56px)", top: "52%", left: "88%", rot: -9 },
];

// Sticker stars, the small five-points dotted through the reference.
const STARS = [
  { top: "13%", left: "20%", size: 26, rot: 12 },
  { top: "27%", left: "49%", size: 18, rot: -8 },
  { top: "3%", left: "72%", size: 22, rot: 20 },
  { top: "48%", left: "6%", size: 20, rot: -14 },
  { top: "38%", left: "66%", size: 15, rot: 6 },
];

// Depth along Z, in px. The stage tilts with the pointer and the section's
// perspective turns these into genuine parallax — nearer things sweep further
// than distant ones with no per-layer maths. Ordering is what matters: board
// sits behind the plane, stickers ride furthest in front.
const DEPTH = {
  board: -90,
  card: 30,
  scrap: 65,
  object: 95,
  star: 120,
};

export default function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const q = gsap.utils.selector(root);
      const board = q(".mat-board") as HTMLElement[];
      const scraps = q(".scrap") as HTMLElement[];
      const cards = q(".step-card") as HTMLElement[];
      const objects = q(".mat-object") as HTMLElement[];
      const stars = q(".mat-star") as HTMLElement[];
      const floaters = [...objects, ...stars];

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const cleanups: Array<() => void> = [];

      // Resting depths.
      gsap.set(board, { z: DEPTH.board });
      gsap.set(cards, { z: DEPTH.card });
      gsap.set(scraps, { z: DEPTH.scrap });
      gsap.set(objects, { z: DEPTH.object });
      gsap.set(stars, { z: DEPTH.star });

      // Entrance start states. The board is parked a full height below so it
      // slides up into an empty frame — nothing on it is visible until it lands.
      gsap.set(board, { yPercent: 108 });
      gsap.set(scraps, { yPercent: 80, opacity: 0 });
      gsap.set(cards, { y: 50, opacity: 0 });
      gsap.set(floaters, { scale: 0.35, opacity: 0 });

      // Idle drift, started only once the entrance has landed so the two never
      // fight over the same transform. Randomised per object so they never
      // sync up into a single pulsing mass.
      const startFloat = () => {
        if (reduced) return;
        floaters.forEach((el, i) => {
          gsap.to(el, {
            yPercent: gsap.utils.random(-16, -7),
            rotation: "+=" + gsap.utils.random(-6, 6),
            duration: gsap.utils.random(2.2, 3.8),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.1,
          });
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
        onComplete: startFloat,
      });

      tl.to(board, { yPercent: 0, duration: 1.05, ease: "power4.out" })
        .to(scraps, { yPercent: 0, opacity: 1, duration: 0.72, stagger: 0.13, ease: "power3.out" }, "-=0.42")
        .to(cards, { y: 0, opacity: 1, duration: 0.62, stagger: 0.075, ease: "power3.out" }, "-=0.34")
        .to(
          floaters,
          { scale: 1, opacity: 1, duration: 0.55, stagger: { each: 0.045, from: "random" }, ease: "back.out(2)" },
          "-=0.52",
        );

      // Cards pop toward the viewer on hover. overwrite:"auto" so a fast
      // in-out-in never leaves two tweens fighting over Z.
      cards.forEach((card) => {
        const enter = () =>
          gsap.to(card, { z: DEPTH.card + 95, scale: 1.045, duration: 0.42, ease: "power3.out", overwrite: "auto" });
        const leave = () =>
          gsap.to(card, { z: DEPTH.card, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
        });
      });

      // Pointer parallax. quickTo compiles the setter once instead of spawning
      // a tween per mousemove, which is what keeps this at 60fps. Skipped
      // entirely for coarse pointers, where there is no hover to track.
      if (!reduced && finePointer) {
        const rotX = gsap.quickTo(stage, "rotationX", { duration: 0.7, ease: "power3" });
        const rotY = gsap.quickTo(stage, "rotationY", { duration: 0.7, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          rotY(((e.clientX - r.left) / r.width - 0.5) * 12);
          rotX(-((e.clientY - r.top) / r.height - 0.5) * 9);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
        };

        root.addEventListener("pointermove", onMove);
        root.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          root.removeEventListener("pointermove", onMove);
          root.removeEventListener("pointerleave", onLeave);
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="process"
      className="relative isolate overflow-hidden [perspective:1400px]"
    >
      <div
        ref={stageRef}
        className="relative px-6 py-28 [transform-style:preserve-3d] md:px-10 md:py-40"
      >
        {/* The board. Oversized well past the section bounds so tilting it
            never swings an edge into view; the section clips the excess. */}
        <div className="mat-board cutting-mat absolute -inset-[9%] z-0" aria-hidden="true">
          <div className="mat-grain absolute inset-0" />
          {/* Ticks are inset to land near the section's visible edge rather
              than the oversized board's, which sits off-screen. */}
          <div className="absolute inset-[7.5%]">
            <div className="mat-ticks-x absolute inset-x-0 top-0 h-3 opacity-70" />
            <div className="mat-ticks-x absolute inset-x-0 bottom-0 h-3 opacity-70" />
            <div className="mat-ticks-y absolute inset-y-0 left-0 w-3 opacity-70" />
            <div className="mat-ticks-y absolute inset-y-0 right-0 w-3 opacity-70" />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 60% at 46% 42%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 55%), radial-gradient(120% 110% at 50% 50%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.34) 100%)",
            }}
          />
        </div>

        {/* Scattered objects */}
        {MAT_OBJECTS.map(({ Icon, weight, color, size, top, left, rot }, i) => (
          <div
            key={i}
            className="mat-object pointer-events-none absolute z-10"
            aria-hidden="true"
            style={{
              top,
              left,
              transform: `rotate(${rot}deg)`,
              filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.42))",
            }}
          >
            <Icon weight={weight} color={color} style={{ width: size, height: size }} />
          </div>
        ))}

        {/* Sticker stars */}
        {STARS.map((s, i) => (
          <Star
            key={i}
            weight="fill"
            aria-hidden="true"
            className="mat-star pointer-events-none absolute z-10"
            color="var(--color-paper)"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              transform: `rotate(${s.rot}deg)`,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
            }}
          />
        ))}

        <div className="relative z-20 mx-auto w-full max-w-6xl [transform-style:preserve-3d]">
          {/* Handle tag, the small pinned label above the title in the reference */}
          <div
            className="scrap inline-block -rotate-2 px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.18em] shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
            style={{ background: "var(--color-red)", color: "var(--color-paper)" }}
          >
            @koriwastudio
          </div>

          {/* Title blocks */}
          <div className="mt-4 [transform-style:preserve-3d]">
            {TITLE_BLOCKS.map((b) => (
              <div key={b.text} className={`relative ${b.pos} [transform-style:preserve-3d]`}>
                <div
                  className="scrap relative inline-block px-5 pb-2 pt-2 shadow-[0_14px_28px_rgba(0,0,0,0.42)] md:px-8 md:pt-3"
                  style={{ background: b.bg, transform: `rotate(${b.rot}deg)` }}
                >
                  <span
                    className="block font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[9vw]"
                    style={{ color: b.fg }}
                  >
                    {b.text}
                  </span>
                  {/* The reference sets its small notes ON the cut scrap rather
                      than loose on the mat — which is also the only place they
                      hold contrast against a gridded ink surface. */}
                  <span
                    className="mt-0.5 block font-body text-[11px] italic md:text-sm"
                    style={{ color: b.noteFg, opacity: b.noteOpacity }}
                  >
                    {b.note}
                  </span>
                  {/* Dashed marquee, the design-tool selection box in the reference */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 border border-dashed border-white/55"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Step cards, pasted onto the mat like cut paper */}
          <div className="mt-20 grid grid-cols-1 gap-5 [transform-style:preserve-3d] sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {processSteps.map((step, i) => (
              <article
                key={step.index}
                className="step-card relative p-5 shadow-[0_16px_30px_rgba(0,0,0,0.40)] transition-shadow duration-300 hover:shadow-[0_44px_74px_rgba(0,0,0,0.58)]"
                style={{
                  background: "var(--color-paper)",
                  // Alternating tilt keeps the row from lining up like a grid.
                  transform: `rotate(${[-2.1, 1.6, -1.3, 2.3][i]}deg)`,
                }}
              >
                <span
                  className="font-display text-3xl font-bold leading-none"
                  style={{ color: "var(--color-red)" }}
                >
                  {step.index}
                </span>
                <h3
                  className="mt-2 font-display text-lg font-bold uppercase leading-tight"
                  style={{ color: "var(--color-ink)" }}
                >
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
