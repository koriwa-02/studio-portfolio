"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/useGsap";
import ContactFormModal from "./ContactFormModal";
import { assetPath } from "@/lib/asset";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(".hero-word-letter", {
          opacity: 0,
          yPercent: 100,
          duration: 0.45,
          ease: "power4.out",
          stagger: 0.08,
        })
      .from(
          ".hero-title-line",
          { opacity: 0, y: "100%", duration: 0.9, stagger: 0.08 },
          "-=0.3",
        )
        .from(".reference-hero-quote", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
      .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(".hero-buttons", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-services", { opacity: 0, y: 12, duration: 0.45 }, "-=0.25")
      .from(".reference-hero-portrait-wrap", { opacity: 0, y: 18, duration: 0.6 }, "-=0.25")
      .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      if (mobile) return;

      gsap.set(".hero-build-panel", { opacity: 0, yPercent: 8 });

      const scrollTransition = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
        },
      });

      scrollTransition
        .to(".reference-hero-image", { yPercent: -125, scale: 0.86, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".reference-hero-copy", { yPercent: -125, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".reference-hero-quote", { yPercent: -125, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".reference-hero-meta", { yPercent: -125, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".reference-hero-word", { yPercent: -115, opacity: 0, ease: "power2.inOut" }, 0)
        .to(".hero-build-panel", { opacity: 1, yPercent: 0, ease: "power2.inOut" }, 0.2)
        .fromTo(
          ".hero-build-line",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.08, ease: "power3.out" },
          0.24,
        );

    },
    { scope: rootRef },
  );

  return (
    <section
      id="top"
      ref={rootRef}
      className="reference-hero relative flex min-h-[calc(100dvh-96px)] flex-col overflow-visible bg-paper text-ink"
    >
      <div className="reference-hero-main">
        <div className="hero-eyebrow reference-hero-eyebrow">
          <span aria-hidden="true" />
          <p>Bold creative for brands<br />with something to say.</p>
        </div>

        <h1 className="reference-hero-word" aria-label="KORIWA">
          {[..."KORIWA"].map((letter, index) => (
            <span className="hero-word-letter" key={`${letter}-${index}`} aria-hidden="true">
              {letter}
            </span>
          ))}
        </h1>

        <div className="reference-hero-mobile-card">
          <div className="reference-hero-quote">
            <blockquote>
              <span className="reference-hero-quote-mark">“</span>
              <span>We don’t decorate brands. </span><span>We give them </span>
              <em>presence.</em>
              <span className="reference-hero-quote-mark">”</span>
            </blockquote>
          </div>

          <div className="reference-hero-copy">
            <p className="reference-hero-copy-label">Creative partner for brands</p>
            <p className="hero-sub">
              Brand identity, web, content and film for brands who refuse to blend in
            </p>
            <div className="hero-buttons">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="btn-press reference-hero-cta bg-red text-paper"
              >
                Start a Project <span className="hero-mobile-arrow" aria-hidden="true">→</span>
              </button>
              <a href="#work" className="btn-press reference-hero-link">
                View Our Work <span className="hero-mobile-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="reference-hero-portrait-wrap">
            <span className="reference-hero-shape reference-hero-shape-one" aria-hidden="true" />
            <span className="reference-hero-shape reference-hero-shape-two" aria-hidden="true" />
            <span className="reference-hero-outline" aria-hidden="true">KORIWA</span>
            <Image
              src={assetPath("/hero/koriwa-founder-hero-v2.jpg")}
              alt="Creative director working at a design studio desk"
              width={1023}
              height={1279}
              priority
              sizes="(max-width: 768px) 94vw, 26vw"
              className="reference-hero-image"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hero/koriwa-founder-mobile.png`}
              alt="Creative director working at a design studio desk"
              width={941}
              height={1672}
              priority
              sizes="100vw"
              className="reference-hero-image reference-hero-image-mobile"
            />
          </div>

          <div className="hero-services" aria-label="Services">
            <span>Brand identity</span><i aria-hidden="true">•</i><span>Web design</span><i aria-hidden="true">•</i><span>Content</span><i aria-hidden="true">•</i><span>Film &amp; motion</span>
          </div>
        </div>

        <div className="hero-build-panel">
          <p className="hero-build-eyebrow">—&nbsp; Let&apos;s build something great &nbsp;—</p>
          <h2 className="hero-build-title" aria-label="Let's build your online presence">
            <span className="hero-build-line">Let&apos;s build</span>
            <span className="hero-build-line">your <em>online</em></span>
            <span className="hero-build-line"><em>presence</em></span>
          </h2>
          <div className="hero-build-footer">
            <span>Web design&nbsp; • &nbsp;Branding&nbsp; • &nbsp;Digital strategy</span>
            <span>Ideas that connect.<br />Design that <b>impacts.</b></span>
          </div>
        </div>
      </div>

      <div className="reference-hero-meta hero-scroll">
        <div className="reference-hero-meta-stack">
          <span>Creative director</span>
          <span>Brand, web &amp; film</span>
        </div>
        <span>(01)</span>
      </div>

      <div className="reference-hero-scroll-cue hero-scroll">
        <span>Scroll to explore</span>
        <i aria-hidden="true" />
      </div>

      <div className="reference-hero-footer" aria-hidden="true">Koriwa Studio</div>

      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
