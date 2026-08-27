"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");

    const loader = loaderRef.current;
    const loaderLogo = logoRef.current;
    const navLogo = document.querySelector<HTMLElement>("[data-nav-logo]");
    let animation: gsap.core.Timeline | undefined;

    const animateLoader = () => {
      if (!loader || !loaderLogo || !navLogo) return;

      const loaderRect = loaderLogo.getBoundingClientRect();
      const navRect = navLogo.getBoundingClientRect();
      const curtainBottom = window.innerHeight - navRect.bottom;
      const timeline = gsap.timeline({ defaults: { duration: 1.15, ease: "power3.inOut" } });
      timeline
        .to(loaderLogo, {
          x: navRect.left + navRect.width / 2 - (loaderRect.left + loaderRect.width / 2),
          y: navRect.top + navRect.height / 2 - (loaderRect.top + loaderRect.height / 2),
          scale: navRect.width / loaderRect.width,
        })
        .to(loader, { clipPath: `inset(0px 0px ${curtainBottom}px 0px)` }, 0);
      animation = timeline;
    };

    if (loaderLogo?.complete && loaderLogo.naturalWidth > 0) {
      animateLoader();
    } else {
      loaderLogo?.addEventListener("load", animateLoader, { once: true });
    }

    const exitTimer = window.setTimeout(() => {
      document.documentElement.classList.add("curtain-complete");
      window.dispatchEvent(new Event("koriwa:curtain-complete"));
      document.documentElement.classList.remove("is-loading");
      setExiting(true);

      window.setTimeout(() => {
        setVisible(false);
      }, 500);
    }, 1150);

    return () => {
      animation?.kill();
      loaderLogo?.removeEventListener("load", animateLoader);
      window.clearTimeout(exitTimer);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader ${exiting ? "site-loader-exiting" : ""}`}
      role="status"
      aria-label="Loading Koriwa Studio"
      ref={loaderRef}
    >
      <div className="site-loader-inner">
        <img
          src="/brand/koriwa-studio.png"
          alt="Koriwa Studio"
          width={420}
          height={280}
          className="site-loader-logo"
          ref={logoRef}
          fetchPriority="high"
          decoding="sync"
        />
        <div className="site-loader-track" aria-hidden="true">
          <span className="site-loader-progress" />
        </div>
        <p>Loading</p>
      </div>
    </div>
  );
}
