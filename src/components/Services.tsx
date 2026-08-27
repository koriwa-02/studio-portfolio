"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/useGsap";
import { services } from "@/lib/content";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const copyMasks = gsap.utils.toArray<HTMLElement>(".services-copy-mask");
      const cards = gsap.utils.toArray<HTMLElement>(".service-stack-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(copyMasks, { scaleX: 1, transformOrigin: "right center" });
      gsap.to(copyMasks, {
        scaleX: 0,
        duration: reduced ? 0.01 : 0.7,
        ease: "power3.out",
        stagger: reduced ? 0 : 0.1,
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });

      gsap.to(".services-topo-bg", {
        opacity: 1,
        duration: reduced ? 0.01 : 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", end: "top 28%", scrub: reduced ? false : 0.8 },
      });

      if (reduced || cards.length < 2) return;

      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 112,
          rotation: index === 0 ? -2 : index % 2 ? 4 : -4,
          scale: index === 0 ? 1 : 0.94,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-story",
          start: "top top",
          end: `+=${Math.max(services.length * 72, 300)}%`,
          scrub: 0.8,
          pin: ".services-pin",
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        timeline
          .to(cards[index - 1], {
            yPercent: -112,
            rotation: index % 2 ? -7 : 7,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut",
          }, index - 1)
          .to(card, {
            yPercent: 0,
            rotation: index % 2 ? -2 : 2,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          }, index - 1);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="services" ref={sectionRef} className="services-section relative bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="services-topo-bg pointer-events-none absolute inset-0 z-0 opacity-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">What I do</p>
          <h2 className="services-copy mt-5 font-display text-[clamp(3rem,8.5vw,8rem)] font-bold uppercase leading-[0.82] tracking-tight">
            <span className="services-copy-line relative block overflow-hidden">
              <span className="relative z-0">Services built</span>
              <span className="services-copy-mask pointer-events-none absolute -inset-x-2 -inset-y-[0.08em] z-10 block bg-red" />
            </span>
            <span className="services-copy-line relative block overflow-hidden">
              <span className="relative z-0">for <span className="text-red">brands</span> that</span>
              <span className="services-copy-mask pointer-events-none absolute -inset-x-2 -inset-y-[0.08em] z-10 block bg-red" />
            </span>
            <span className="services-copy-line relative block overflow-hidden">
              <span className="relative z-0">move fast.</span>
              <span className="services-copy-mask pointer-events-none absolute -inset-x-2 -inset-y-[0.08em] z-10 block bg-red" />
            </span>
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-relaxed text-ink/55">
            Brand, web, content and campaigns built to make your next move impossible to ignore.
          </p>
        </div>

        <div className="services-story relative mt-16 min-h-[300vh] md:mt-24">
          <div className="services-pin relative flex min-h-[100svh] items-center py-10">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <div className="relative z-20 md:col-span-3">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/45">Capabilities</p>
                <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-ink/55">
                  Scroll through the work we can put behind your next idea.
                </p>
                <span className="mt-8 hidden h-16 w-px bg-red md:block" />
              </div>

              <div className="service-stack relative z-10 h-[min(72vh,680px)] min-h-[500px] md:col-span-9">
                {services.map((service, index) => (
                  <article
                    key={service.index}
                    className={`service-stack-card absolute inset-0 overflow-hidden p-6 text-paper shadow-[0_24px_70px_rgba(10,10,10,0.2)] md:p-10 ${
                      index % 3 === 1 ? "bg-red" : index % 3 === 2 ? "bg-ink" : "bg-[#303629]"
                    }`}
                    style={{ zIndex: services.length - index }}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-6">
                        <span className="font-display text-5xl font-bold leading-none text-paper/35 md:text-7xl">
                          {service.index}
                        </span>
                        <span className="border border-paper/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-paper/70">
                          Koriwa Studio
                        </span>
                      </div>

                      <div className="max-w-3xl">
                        <h3 className="font-display text-4xl font-bold uppercase leading-[0.9] md:text-7xl">
                          {service.title}
                        </h3>
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/70 md:text-base">
                          {service.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 border-t border-paper/20 pt-5 md:gap-6 md:pt-6">
                        {service.packages.map((pkg) => (
                          <div key={pkg.name}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/50">{pkg.name}</p>
                            <p className="mt-1 font-display text-lg font-bold md:text-2xl">{pkg.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
