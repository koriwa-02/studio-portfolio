import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import { assetPath } from "@/lib/asset";

const socials = [
  { label: "Instagram", href: "https://instagram.com/koriwastudio" },
  { label: "LinkedIn", href: "https://linkedin.com/company/koriwa-studio" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 pt-16 text-paper md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 border-b border-paper/15 pb-12 md:flex-row">
          <div>
            <Image
              src={assetPath("/brand/koriwa-studio.png")}
              alt="Koriwa Studio"
              width={64}
              height={33}
              className="h-6 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm text-paper/60">
              A multi-discipline creative agency working across branding, web, content and film.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/40">
                Sitemap
              </p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold uppercase tracking-wide text-paper/80 transition-colors duration-200 ease-[var(--ease-out)] hover:text-red"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/40">
                Follow
              </p>
              <ul className="mt-4 space-y-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold uppercase tracking-wide text-paper/80 transition-colors duration-200 ease-[var(--ease-out)] hover:text-red"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/40">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm text-paper/80">
                <li>soufouh2004@gmail.com</li>
                <li>Casablanca, Morocco</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-paper/40 md:flex-row">
          <span>© {new Date().getFullYear()} Koriwa Studio. All rights reserved.</span>
          <Link
            href="#top"
            className="font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-[var(--ease-out)] hover:text-red"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
