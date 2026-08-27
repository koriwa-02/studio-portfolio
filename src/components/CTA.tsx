"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/useGsap";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-reveal", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-red px-6 py-24 text-paper md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="cta-reveal text-xs font-bold uppercase tracking-[0.3em] text-paper/80">
          Got a project in mind?
        </p>
        <h2 className="font-display cta-reveal mt-6 text-5xl font-bold uppercase leading-[0.9] md:text-8xl">
          Let&rsquo;s build
          <br /> something loud.
        </h2>

        <div className="cta-reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:soufouh2004@gmail.com"
            className="btn-press rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-transform duration-200 ease-[var(--ease-out)] hover:scale-105"
          >
            soufouh2004@gmail.com
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=212760199147"
            target="_blank"
            rel="noreferrer"
            className="btn-press rounded-full border border-paper px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-[background-color,color,transform] duration-200 ease-[var(--ease-out)] hover:bg-paper hover:text-red"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
