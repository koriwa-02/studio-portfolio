"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset";
import { useRef } from "react";
import { Cursor } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/useGsap";
import { stats } from "@/lib/content";

const HEADLINE = "Founded on obsession with the details.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const panel = q(".poster-panel");
      const photo = q(".poster-photo");
      const title = q(".poster-title");
      const typed = q(".poster-typed")[0] as HTMLElement | undefined;
      const caret = q(".poster-caret");
      const body = q(".poster-body");
      const meta = q(".poster-meta");
      const counters = q(".poster-count") as HTMLElement[];

      // Explicit set + to rather than .from(): these elements carry inline
      // rotations, and a from() tween on a rotated element is the easiest way
      // to end up fighting GSAP over the same transform.
      gsap.set(panel, { yPercent: 8, opacity: 0 });
      gsap.set(photo, { xPercent: -4, opacity: 0 });
      gsap.set(title, { opacity: 0 });
      gsap.set(body, { y: 26, opacity: 0 });
      gsap.set(meta, { y: 16, opacity: 0 });
      gsap.set(caret, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });

      tl.to(panel, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .to(photo, { xPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.46")
        .to(title, { opacity: 1, duration: 0.01 }, "-=0.3");

      // Typewriter. The full headline is rendered server-side and only cleared
      // here, so it survives a JS failure; the h1 also carries an aria-label so
      // assistive tech reads the finished sentence rather than a stream of
      // half-typed fragments.
      if (typed) {
        tl.set(caret, { opacity: 1 }, "<")
          .set(typed, { text: "" }, "<")
          .to(
            typed,
            {
              duration: 1.5,
              text: { value: HEADLINE, delimiter: "" },
              ease: "none",
            },
            "<",
          )
          // Caret blinks while typing, then rests.
          .to(caret, { opacity: 0, duration: 0.45, ease: "power2.out" }, ">+0.5");
      }

      tl.to(body, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.9")
        .to(meta, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" }, "-=0.35");

      // Counters run up from zero. The numeric head and the suffix are split
      // apart so "12M+" counts 0→12 and keeps its "M+", rather than being
      // parsed as a plain number and losing it.
      counters.forEach((el) => {
        const raw = el.dataset.value ?? "";
        const match = raw.match(/^([\d.]+)(.*)$/);
        if (!match) return;
        const target = parseFloat(match[1]);
        const suffix = match[2];
        const decimals = (match[1].split(".")[1] ?? "").length;
        const counter = { v: 0 };

        tl.to(
          counter,
          {
            v: target,
            duration: 1.3,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = counter.v.toFixed(decimals) + suffix;
            },
          },
          "-=1.15",
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-hidden bg-ink px-6 py-24 text-paper md:px-10 md:py-32"
    >
      {/* Portrait poster on mobile, wide landscape card on desktop: the photo
          moves from stacked-on-top to a column beside the copy, so the panel
          reads as a broad rectangle rather than a tall one. */}
      <div className="relative mx-auto w-full max-w-[660px] md:max-w-[1060px]">
        <div
          className="poster-panel relative px-6 pb-10 pt-6 shadow-[0_40px_90px_rgba(0,0,0,0.55)] md:px-10 md:py-10"
          style={{ background: "var(--color-red)", transform: "rotate(-1.2deg)" }}
        >
          <div className="md:grid md:grid-cols-[minmax(0,40%)_1fr] md:items-center md:gap-10">
            {/* Photo card, counter-rotated and pushed left so it breaks the
                panel's edge the way the reference lets it hang off.
                Both aspects are NARROWER than the source (0.926), so cover
                only ever trims the sides — the full height of the frame, and
                therefore the whole head, always survives the crop. */}
            <div
              className="poster-photo relative -ml-10 aspect-[9/10] overflow-hidden bg-ink shadow-[0_18px_40px_rgba(0,0,0,0.5)] md:-ml-16 md:aspect-[4/5]"
              style={{ transform: "rotate(1deg)" }}
            >
              <Image
                src={assetPath("/about/founder.jpg")}
                alt="Sofiane Ouhemmou, founder of Koriwa Studio"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center"
                priority={false}
              />
              {/* Gradient floor, as in the reference where the subject
                  dissolves into the dark at the bottom of the frame. Kept low
                  and late so it never reaches the face. */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 58%, rgba(10,10,10,0.55) 82%, rgba(10,10,10,0.88) 100%)",
                }}
              />

              <div className="absolute left-5 top-5">
                <Image
                  src={assetPath("/brand/koriwa-studio.png")}
                  alt="Koriwa Studio"
                  width={1536}
                  height={1024}
                  className="w-24 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] md:w-28"
                />
              </div>
              <p className="absolute right-5 top-5 text-right font-display text-sm font-bold leading-tight text-paper drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                Sofiane
                <br />
                Ouhemmou
              </p>

              {/* Classic OS cursor — a dark arrow with a light edge — drawn as
                  two stacked icons, the lower one scaled up to read as the
                  outline, so it holds up over light and dark parts of the photo
                  alike. */}
              <span
                aria-hidden="true"
                className="absolute bottom-8 right-6 block h-10 w-10 rotate-[-8deg]"
                style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.55))" }}
              >
                <Cursor
                  weight="fill"
                  className="absolute inset-0 h-full w-full scale-[1.28]"
                  color="var(--color-paper)"
                />
                <Cursor
                  weight="fill"
                  className="absolute inset-0 h-full w-full"
                  color="var(--color-ink)"
                />
              </span>
            </div>

            <div className="mt-8 md:mt-0">
              <h2
                aria-label={HEADLINE}
                className="poster-title font-display text-[10vw] font-bold uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl"
                style={{ color: "var(--color-ink)" }}
              >
                <span className="poster-typed" aria-hidden="true">
                  {HEADLINE}
                </span>
                <span
                  aria-hidden="true"
                  className="poster-caret ml-1 inline-block h-[0.78em] w-[0.06em] translate-y-[0.06em] animate-pulse align-baseline"
                  style={{ background: "var(--color-ink)" }}
                />
              </h2>

              <p
                className="poster-body mt-5 max-w-md font-body text-sm leading-relaxed md:text-base"
                style={{ color: "var(--color-ink)" }}
              >
                A multi-discipline creative agency for brands that refuse to blend in. Identity,
                web, content and film — one team, first sketch to final frame.
              </p>

              {/* Meta row: small lowercase label over an italic value, the
                  sana / vaqt / filial strip from the reference. */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 md:mt-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="poster-meta">
                    <p
                      className="font-body text-[11px] lowercase tracking-wide"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {stat.label}:
                    </p>
                    <p
                      className="mt-0.5 font-body text-xl italic leading-none"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {/* The visible number is animated and hidden from
                          assistive tech, which would otherwise announce every
                          intermediate value; the real figure sits beside it. */}
                      <span className="poster-count" data-value={stat.value} aria-hidden="true">
                        {stat.value}
                      </span>
                      <span className="sr-only">{stat.value}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
