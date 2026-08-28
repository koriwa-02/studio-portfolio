"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { navLinks } from "@/lib/content";
import { assetPath } from "@/lib/asset";

const leftNavLinks = [
  { label: "Koriwa", href: "#top" },
  { label: "Studio", href: "#about" },
];
const rightNavLinks = navLinks.filter((link) => link.href === "#work" || link.href === "#contact");

function FlipLabel({ label }: { label: string }) {
  return (
    <span className="nav-flip" aria-hidden="true">
      {Array.from(label).map((character, index) => (
        <span className="nav-flip-letter" style={{ "--i": index } as CSSProperties} key={`${character}-${index}`}>
          <span className="nav-flip-face">{character === " " ? "\u00a0" : character}</span>
          <span className="nav-flip-face" aria-hidden="true">{character === " " ? "\u00a0" : character}</span>
        </span>
      ))}
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const sectionHref = (href: string) => pathname === "/" ? href : `/${href}`;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const sections = ["top", ...navLinks.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="reference-nav absolute top-0 right-0 left-0 z-50 border-0 bg-transparent">
      <div className="relative mx-auto flex min-h-[84px] max-w-7xl items-center justify-between px-6 py-5 md:min-h-[96px] md:px-10 md:py-6">
        <Link
          href={sectionHref("#top")}
          className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center"
        >
          <Image
            src={assetPath("/brand/koriwa-studio.png")}
            alt="Koriwa Studio"
            width={120}
            height={80}
            className="site-nav-logo reference-nav-logo h-14 w-auto md:h-16"
            data-nav-logo
            priority
          />
        </Link>

        <nav
          className="nav-left-links hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {leftNavLinks.map((link) => (
            <Link
              key={link.href}
              href={sectionHref(link.href)}
              aria-current={activeHref === link.href ? "page" : undefined}
              aria-label={link.label}
              className={`nav-flip-link py-1 font-display text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 ease-[var(--ease-out)] hover:text-red ${
                activeHref === link.href ? "text-ink" : "text-ink/80"
              }`}
            >
              <FlipLabel label={link.label} />
            </Link>
          ))}
        </nav>

        <nav
          className="nav-right-links hidden items-center gap-8 md:flex"
          aria-label="Secondary navigation"
        >
          {rightNavLinks.map((link) => (
            <Link
              key={link.href}
              href={sectionHref(link.href)}
              aria-current={activeHref === link.href ? "page" : undefined}
              aria-label={link.label}
              className={`nav-flip-link py-1 font-display text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 ease-[var(--ease-out)] hover:text-red ${
                activeHref === link.href ? "text-ink" : "text-ink/80"
              }`}
            >
              <FlipLabel label={link.label} />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className={`reference-nav-menu-button btn-press flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition-transform duration-150 ease-[var(--ease-out)] ${open ? "is-open" : ""}`}
        >
          <span
            className={`h-[2px] w-6 bg-ink transition-transform duration-200 ease-[var(--ease-out)] ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-ink transition-transform duration-200 ease-[var(--ease-out)] ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`reference-mobile-menu fixed inset-0 top-0 z-40 flex flex-col text-paper transition-transform duration-[450ms] ease-[var(--ease-drawer)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="reference-mobile-menu-top flex items-center justify-between px-8 pt-8">
          <span>Menu / 04</span>
        </div>
        <nav className="reference-mobile-menu-links flex flex-1 flex-col justify-center px-8" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={sectionHref(link.href)}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={`reference-mobile-menu-link group flex items-baseline gap-4 font-display transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="reference-mobile-menu-index">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="reference-mobile-menu-bottom flex items-end justify-between px-8 pb-8">
          <span>Bold creative for brands with something to say.</span>
          <span>Scroll / Explore</span>
        </div>
      </div>
    </header>
  );
}
