import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/CaseStudyPage";
import { getProject, projects } from "@/lib/projects";
import { workItems, workSlug } from "@/lib/content";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };
function getLegacyProject(slug: string) {
  const item = workItems.find((project) => workSlug(project.title, project.category) === slug);
  return item ? projects.find((project) => project.image === item.image) ?? null : null;
}
export function generateStaticParams() { return workItems.map((project) => ({ slug: workSlug(project.title, project.category) })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const project = getLegacyProject((await params).slug); if (!project) return { title: `Project not found | ${SITE_NAME}`, robots: { index: false, follow: false } }; return { title: `${project.title} ${project.category} Case Study | ${SITE_NAME}`, description: project.overview, alternates: { canonical: absoluteUrl(`/projects/${project.slug}/`) }, robots: { index: false, follow: true } }; }
export default async function LegacyProjectPage({ params }: PageProps) { const project = getLegacyProject((await params).slug); if (!project) notFound(); return <CaseStudyPage project={project} nextProject={getProject(project.nextSlug) ?? projects[0]} />; }
