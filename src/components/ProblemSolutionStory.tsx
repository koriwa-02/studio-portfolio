"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/useGsap";

const panels = [
  {
    number: "01",
    problem: "Your brand feels inconsistent.",
    copy: "Your website, social media and visual materials all look different, making the brand harder to recognize and trust.",
    solution: "One clear brand system",
    solutionCopy: "KORIWA creates a cohesive visual direction so every touchpoint feels like part of the same brand.",
  },
  {
    number: "02",
    problem: "Your online presence doesn’t match the quality of your work.",
    copy: "You may provide a strong service, but if your website and digital presence look weak, people can underestimate the business before they ever speak to you.",
    solution: "Stronger digital positioning",
    solutionCopy: "We build a sharper website, visual identity and digital experience that communicates your value immediately.",
  },
  {
    number: "03",
    problem: "You’re posting, but not building recognition.",
    copy: "Content gets published without a clear system, visual direction or strategy, so the brand stays forgettable.",
    solution: "Content system + art direction",
    solutionCopy: "KORIWA creates a consistent content direction designed to build recognition and make your brand easier to remember.",
  },
  {
    number: "04",
    problem: "You’re too busy to manage your online presence.",
    copy: "You’re focused on delivering your service, handling clients and running the business. Marketing, content, website updates and lead generation keep getting pushed aside.",
    solution: "KORIWA becomes your digital partner",
    solutionCopy: "We handle your online presence, positioning, content, website and digital growth so you can focus on delivering the work while your business keeps attracting new opportunities.",
  },
];

export default function ProblemSolutionStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !viewport || !track || !progress) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || mobile) return;

    const horizontalDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const verticalDistance = () => Math.max(window.innerHeight * 1.5, horizontalDistance() * 0.72);
    const animation = gsap.to(track, {
      x: () => -horizontalDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${verticalDistance()}`,
        scrub: true,
        pin: section,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
      },
    });

    return () => animation.kill();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="problem-story bg-paper text-ink">
      <div className="problem-story-shell">
        <div ref={viewportRef} className="problem-story-viewport" aria-label="Common brand problems and KORIWA solutions">
          <div ref={trackRef} className="problem-story-track">
            <div className="problem-story-intro px-6 md:px-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">Why brands get stuck</p>
              <h2 className="problem-story-title mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.82] tracking-tight">
                Your business isn’t<br /> the problem.<br /><span className="text-red">The way it shows up</span><br /> might be.
              </h2>
            </div>
            {panels.map((panel, index) => {
              const isLast = index === panels.length - 1;
              const panelContent = (
                <article key={panel.number} className={`problem-story-panel ${isLast ? "problem-story-panel-dark" : ""}`}>
                <div className="flex items-start justify-between gap-6">
                  <span className="problem-story-number font-display text-6xl font-bold leading-none text-red md:text-8xl">{panel.number}</span>
                  <span className="pt-2 text-xs font-bold uppercase tracking-[0.22em] text-ink/45">Problem / Solution</span>
                </div>
                <div className="problem-story-main">
                  <h3 className="font-display text-[clamp(2.4rem,5vw,5.5rem)] font-bold uppercase leading-[0.86] tracking-tight">{panel.problem}</h3>
                  <p className="problem-story-copy">{panel.copy}</p>
                </div>
                <div className="problem-story-solution">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-red">→ {panel.solution}</p>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg">{panel.solutionCopy}</p>
                  {isLast && (
                    <>
                      <p className="problem-story-promise mt-8 max-w-2xl font-display text-3xl font-bold uppercase leading-[0.9] md:text-5xl">You do the work.<br /><span className="text-red">We make sure people find you.</span></p>
                    </>
                  )}
                </div>
                </article>
              );

              if (!isLast) return panelContent;

              return (
                <div key={panel.number} className="problem-story-panel-group">
                  {panelContent}
                  <Link href="#contact" className="problem-story-story-cta btn-press mt-4 inline-flex bg-red px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-paper">Get a Free Audit <span className="ml-5">→</span></Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="problem-story-progress px-6 md:px-10" aria-hidden="true">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]"><span>01</span><span>04</span></div>
          <div className="mt-2 h-px w-full bg-ink/15"><div ref={progressRef} className="h-full origin-left scale-x-0 bg-red" /></div>
        </div>
      </div>
    </section>
  );
}
