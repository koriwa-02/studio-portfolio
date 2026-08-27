import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { workItems, workSlug } from "@/lib/content";
import { assetPath } from "@/lib/asset";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return workItems.find((project) => workSlug(project.title, project.category) === slug) ?? null;
}

export function generateStaticParams() {
  return workItems.map((project) => ({ slug: workSlug(project.title, project.category) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found — KORIWA STUDIO" };

  return {
    title: `${project.title} — ${project.category} | KORIWA STUDIO`,
    description: project.details,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="bg-paper text-ink">
        <article className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pb-36 md:pt-40">
          <Link href="/#work" className="mb-12 inline-flex text-xs font-bold uppercase tracking-[0.2em] text-ink/55 transition-colors hover:text-red">
            ← Back to work
          </Link>

          <header className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
            <div className="md:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red">{project.category}</p>
              <h1 className="mt-5 font-display text-[clamp(3.5rem,10vw,9rem)] font-bold uppercase leading-[0.82] tracking-tight">
                {project.title}
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/45">{project.year}</p>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/65">{project.details}</p>
            </div>
          </header>

          <div className="mt-14 overflow-hidden bg-ink md:mt-20">
            {project.video ? (
              <video className="block aspect-[16/9] h-auto w-full object-cover" src={assetPath(project.video)} poster={project.image ? assetPath(project.image) : undefined} autoPlay muted loop playsInline />
            ) : project.image ? (
              <Image src={assetPath(project.image)} alt={`${project.title} project artwork`} width={1600} height={1000} className="block h-auto w-full object-cover" priority />
            ) : null}
          </div>

          <div className="mt-16 grid gap-12 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red">Services</p>
              <ul className="mt-5 space-y-2 text-sm uppercase tracking-[0.08em] text-ink/70">
                {project.services.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
            <div className="space-y-10 md:col-span-8">
              {[
                ["The challenge", project.challenge],
                ["The approach", project.approach],
                ["The result", project.results],
              ].map(([label, copy]) => copy && (
                <section key={label}>
                  <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-red">{label}</h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/70">{copy}</p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
