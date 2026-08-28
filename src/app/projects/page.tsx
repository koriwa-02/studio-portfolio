import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/asset";
import { projectImageAlt, projectRoute, projects } from "@/lib/projects";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: `Selected Work | ${SITE_NAME}`, description: "Explore selected web design, branding, graphic design, campaign and content projects by KORIWA Studio.", alternates: { canonical: absoluteUrl("/projects/") }, openGraph: { title: `Selected Work | ${SITE_NAME}`, description: "Explore selected projects by KORIWA Studio.", url: absoluteUrl("/projects/"), type: "website" } };

export default function ProjectsIndex() {
  return <><Nav /><main className="case-study-page bg-paper text-ink"><header className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44"><p className="case-study-kicker">KORIWA / WORK</p><h1 className="case-study-title mt-5">Selected work.</h1><p className="case-study-copy mt-8 max-w-xl">A selection of websites, identities, campaigns and visual systems built for ambitious brands.</p></header><section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-24 sm:grid-cols-2 md:px-10 md:pb-36 lg:grid-cols-3" aria-label="Project archive">{projects.map((project) => <Link key={project.slug} href={projectRoute(project)} className="group"><div className="relative aspect-[4/5] overflow-hidden bg-ink"><Image src={assetPath(project.image ?? "")} alt={projectImageAlt(project)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105" /></div><div className="flex justify-between gap-4 py-4"><div><h2 className="font-display text-xl font-bold uppercase">{project.title}</h2><p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-ink/55">{project.category}</p></div><span className="text-xs text-ink/50">{project.year}</span></div></Link>)}</section></main><Footer /></>;
}
