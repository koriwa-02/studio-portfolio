"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const reduceMotion = useReducedMotion() ?? false;
  const [layout, setLayout] = useState({ desktop: false, distance: 0, range: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const trackTransform = useTransform(
    smoothProgress,
    [0, 1],
    ["translate3d(0px, 0px, 0px)", `translate3d(-${layout.distance}px, 0px, 0px)`],
  );
  const progressTransform = useTransform(smoothProgress, [0, 1], ["scaleX(0)", "scaleX(1)"]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateLayout = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches && !reduceMotion;
      if (!desktop) {
        setLayout({ desktop: false, distance: 0, range: 0 });
        return;
      }

      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const range = Math.max(window.innerHeight * 1.5, distance * 0.72);
      setLayout({ desktop: true, distance, range });
    };

    updateLayout();
    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateLayout);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [reduceMotion]);

  const sectionStyle = layout.desktop ? { height: `calc(100svh + ${layout.range}px)` } : undefined;

  return (
    <section ref={sectionRef} className="problem-story bg-paper text-ink" style={sectionStyle}>
      <div className="problem-story-shell">
        <div ref={viewportRef} className="problem-story-viewport" aria-label="Common brand problems and KORIWA solutions">
          <motion.div
            ref={trackRef}
            className="problem-story-track"
            style={layout.desktop ? { transform: trackTransform } : undefined}
          >
            <motion.div
              className="problem-story-intro px-6 md:px-10"
              initial={reduceMotion ? false : { opacity: 0, transform: "translate3d(0px, 22px, 0px)" }}
              whileInView={reduceMotion ? undefined : { opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">Why brands get stuck</p>
              <h2 className="problem-story-title mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.82] tracking-tight">
                Your business isn’t<br /> the problem.<br /><span className="text-red">The way it shows up</span><br /> might be.
              </h2>
            </motion.div>
            {panels.map((panel, index) => {
              return <ProblemPanel key={panel.number} panel={panel} index={index} progress={smoothProgress} scrollLinked={layout.desktop} reduceMotion={reduceMotion} />;
            })}
            <div className="problem-story-panel-group">
              <ClosingPanel index={panels.length} progress={smoothProgress} scrollLinked={layout.desktop} reduceMotion={reduceMotion} />
              <Link href="#contact" className="problem-story-story-cta btn-press mt-4 inline-flex bg-red px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-paper">Get a Free Audit <span className="ml-5">→</span></Link>
            </div>
          </motion.div>
        </div>

        <div className="problem-story-progress px-6 md:px-10" aria-hidden="true">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]"><span>01</span><span>05</span></div>
          <div className="mt-2 h-px w-full bg-ink/15"><motion.div className="h-full origin-left bg-red" style={{ transform: reduceMotion || !layout.desktop ? "scaleX(1)" : progressTransform }} /></div>
        </div>
      </div>
    </section>
  );
}

type Panel = (typeof panels)[number];

function ProblemPanel({
  panel,
  index,
  progress,
  scrollLinked,
  reduceMotion,
}: {
  panel: Panel;
  index: number;
  progress: MotionValue<number>;
  scrollLinked: boolean;
  reduceMotion: boolean;
}) {
  const revealAt = 0.2 + index * 0.16;
  const panelTransform = useTransform(
    progress,
    [Math.max(0, revealAt - 0.12), revealAt, Math.min(1, revealAt + 0.16)],
    ["translate3d(0px, 24px, 0px)", "translate3d(0px, 0px, 0px)", "translate3d(0px, -5px, 0px)"],
  );
  const panelOpacity = useTransform(progress, [Math.max(0, revealAt - 0.12), revealAt], [0.72, 1]);
  const panelStyle = scrollLinked && !reduceMotion ? { transform: panelTransform, opacity: panelOpacity } : undefined;

  return (
    <motion.article
      className="problem-story-panel"
      style={panelStyle}
    >
      <motion.div
        className="problem-story-panel-body"
        initial={reduceMotion ? false : { opacity: 0, transform: "translate3d(0px, 14px, 0px)" }}
        whileInView={reduceMotion ? undefined : { opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.48, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
      >
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
        </div>
      </motion.div>
    </motion.article>
  );
}

function ClosingPanel({
  index,
  progress,
  scrollLinked,
  reduceMotion,
}: {
  index: number;
  progress: MotionValue<number>;
  scrollLinked: boolean;
  reduceMotion: boolean;
}) {
  const revealAt = 0.2 + index * 0.16;
  const panelTransform = useTransform(
    progress,
    [Math.max(0, revealAt - 0.12), revealAt, Math.min(1, revealAt + 0.16)],
    ["translate3d(0px, 24px, 0px)", "translate3d(0px, 0px, 0px)", "translate3d(0px, -5px, 0px)"],
  );
  const panelOpacity = useTransform(progress, [Math.max(0, revealAt - 0.12), revealAt], [0.72, 1]);
  const panelStyle = scrollLinked && !reduceMotion ? { transform: panelTransform, opacity: panelOpacity } : undefined;

  return (
    <motion.article className="problem-story-panel problem-story-closing-panel" style={panelStyle}>
      <motion.div
        className="problem-story-panel-body"
        initial={reduceMotion ? false : { opacity: 0, transform: "translate3d(0px, 14px, 0px)" }}
        whileInView={reduceMotion ? undefined : { opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.48, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-start justify-between gap-6">
          <span className="problem-story-number font-display text-6xl font-bold leading-none text-red md:text-8xl">05</span>
          <span className="pt-2 text-xs font-bold uppercase tracking-[0.22em] text-ink/45">The outcome</span>
        </div>
        <p className="problem-story-closing-copy max-w-2xl font-display font-bold uppercase">You do the work.<br /><span className="text-red">We make sure people find you.</span></p>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-red">A digital partner that keeps you visible →</p>
      </motion.div>
    </motion.article>
  );
}
