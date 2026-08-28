import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | KORIWA Studio",
  robots: { index: false, follow: false },
};

export default function NotFound() { return <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-ink"><p className="text-xs font-bold uppercase tracking-[0.3em] text-red">404</p><h1 className="mt-6 font-display text-5xl font-bold uppercase md:text-8xl">This page left the studio.</h1><Link href="/#top" className="btn-press mt-10 bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-paper">Back to KORIWA →</Link></main>; }
