import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { servicePages, serviceRoute } from "@/lib/services";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: `Services | ${SITE_NAME}`, description: "Web design, branding, graphic design, campaigns and social media services from KORIWA Studio in Morocco.", alternates: { canonical: absoluteUrl("/services/") } };
export default function ServicesIndex() { return <><Nav /><main className="case-study-page bg-paper text-ink"><header className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44"><p className="case-study-kicker">KORIWA / SERVICES</p><h1 className="case-study-title mt-5">What we do.</h1></header><section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36"><div className="border-t border-ink/15">{servicePages.map((service) => <Link key={service.slug} href={serviceRoute(service.slug)} className="group flex items-center justify-between gap-6 border-b border-ink/15 py-7"><span className="case-study-index">{service.index}</span><span className="flex-1 font-display text-3xl font-bold uppercase transition-colors group-hover:text-red md:text-6xl">{service.title}</span><span className="text-xl transition-transform group-hover:translate-x-2">→</span></Link>)}</div></section></main><Footer /></>; }
