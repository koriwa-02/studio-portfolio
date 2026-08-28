import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { getProject, projectRoute, projects } from "@/lib/projects";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Project not found | ${SITE_NAME}` };
  const description = `${project.title} ${project.category.toLowerCase()} case study by KORIWA Studio, a creative digital studio in Morocco.`;
  return {
    title: `${project.title} ${project.category} Case Study | KORIWA Studio`,
    description,
    alternates: { canonical: absoluteUrl(projectRoute(project)) },
    openGraph: { title: `${project.title} — ${project.category} | KORIWA Studio`, description, url: absoluteUrl(projectRoute(project)), type: "article", images: project.image ? [{ url: absoluteUrl(project.image), alt: `${project.title} project by KORIWA Studio` }] : undefined },
    twitter: { card: "summary_large_image", title: `${project.title} — ${project.category} | KORIWA Studio`, description, images: project.image ? [absoluteUrl(project.image)] : undefined },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getProject(project.nextSlug) ?? projects[0];
  const jsonLd = { "@context": "https://schema.org", "@type": "CreativeWork", name: `${project.title} ${project.category} case study`, description: project.overview, url: absoluteUrl(projectRoute(project)), image: project.image ? absoluteUrl(project.image) : undefined, creator: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") }, locationCreated: { "@type": "Place", name: project.location } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><CaseStudyPage project={project} nextProject={nextProject} /></>;
}
