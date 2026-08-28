import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/asset";
import { projectImageAlt, projectRoute, type ProjectCaseStudy } from "@/lib/projects";

type CaseStudyPageProps = {
  project: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
};

function ProjectMedia({ project, priority = false }: { project: ProjectCaseStudy; priority?: boolean }) {
  const video = project.video ?? project.demoVideo;
  if (video) {
    return (
      <video
        className="case-study-media h-full w-full object-cover"
        src={assetPath(video)}
        poster={project.image ? assetPath(project.image) : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "metadata" : "none"}
        aria-label={`${project.title} project preview`}
      />
    );
  }
  if (!project.image) return null;
  return (
    <Image
      src={assetPath(project.image)}
      alt={projectImageAlt(project)}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 90vw"
      className="case-study-media object-cover"
    />
  );
}

function Gallery({ project }: { project: ProjectCaseStudy }) {
  const gallery = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  if (!gallery.length && !project.beforeImage && !project.afterImage) return null;

  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {gallery.map((image, index) => (
        <figure key={image} className={`${index === 0 ? "md:col-span-2" : ""} case-study-image-frame`}>
          <Image
            src={assetPath(image)}
            alt={`${projectImageAlt(project)} — image ${index + 1}`}
            fill
            sizes={index === 0 ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 768px) 100vw, 45vw"}
            className="object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </figure>
      ))}
      {project.beforeImage && project.afterImage && (
        <>
          <figure className="case-study-image-frame">
            <Image src={assetPath(project.beforeImage)} alt={`${project.title} before the redesign`} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" loading="lazy" />
          </figure>
          <figure className="case-study-image-frame">
            <Image src={assetPath(project.afterImage)} alt={`${project.title} after the redesign by KORIWA Studio`} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" loading="lazy" />
          </figure>
        </>
      )}
    </div>
  );
}

export default function CaseStudyPage({ project, nextProject }: CaseStudyPageProps) {
  return (
    <>
      <Nav />
      <main className="case-study-page bg-paper text-ink">
        <article>
          <header className="case-study-hero mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
            <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
              <Link href="/#top">KORIWA</Link><span>/</span><Link href="/#work">WORK</Link><span>/</span><span>{project.title.toUpperCase()}</span>
            </nav>
            <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
              <div className="md:col-span-8">
                <p className="case-study-kicker">{project.category}</p>
                <h1 className="case-study-title">{project.title}</h1>
              </div>
              <dl className="case-study-meta md:col-span-4">
                <div><dt>Year</dt><dd>{project.year}</dd></div>
                <div><dt>Location</dt><dd>{project.location}</dd></div>
                <div><dt>Services</dt><dd>{project.services.join(" / ")}</dd></div>
              </dl>
            </div>
            <div className="case-study-hero-media relative mt-14 aspect-[16/10] overflow-hidden bg-ink md:mt-20 md:aspect-[16/8.5]">
              <ProjectMedia project={project} priority />
            </div>
          </header>

          <div className="case-study-content mx-auto max-w-7xl px-6 md:px-10">
            <section className="case-study-section grid gap-8 border-t border-ink/15 py-16 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby="overview-heading">
              <div className="md:col-span-4"><p className="case-study-index">01 — Overview</p></div>
              <div className="md:col-span-8"><h2 id="overview-heading" className="case-study-heading">A clearer presence for the work.</h2><p className="case-study-copy">{project.overview}</p></div>
            </section>
            <section className="case-study-section grid gap-8 border-t border-ink/15 py-16 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby="challenge-heading">
              <div className="md:col-span-4"><p className="case-study-index">02 — The challenge</p></div>
              <div className="md:col-span-8"><h2 id="challenge-heading" className="case-study-heading">Make the important parts impossible to miss.</h2><p className="case-study-copy">{project.challenge}</p></div>
            </section>
            <section className="case-study-section grid gap-8 border-t border-ink/15 py-16 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby="strategy-heading">
              <div className="md:col-span-4"><p className="case-study-index">03 — The strategy</p></div>
              <div className="md:col-span-8"><h2 id="strategy-heading" className="case-study-heading">Structure creates momentum.</h2><p className="case-study-copy">{project.strategy}</p></div>
            </section>

            <section className="case-study-section border-t border-ink/15 py-16 md:py-24" aria-labelledby="direction-heading">
              <div className="grid gap-8 md:grid-cols-12 md:gap-12"><div className="md:col-span-4"><p className="case-study-index">04 — Design direction</p></div><div className="md:col-span-8"><h2 id="direction-heading" className="case-study-heading">A visual language with room to breathe.</h2><p className="case-study-copy">{project.designDirection}</p></div></div>
              <Gallery project={project} />
            </section>

            <section className="case-study-section grid gap-8 border-t border-ink/15 py-16 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby="process-heading">
              <div className="md:col-span-4"><p className="case-study-index">05 — {project.processTitle}</p></div>
              <div className="md:col-span-8"><h2 id="process-heading" className="case-study-heading">Built around how people actually experience it.</h2><p className="case-study-copy">{project.processBody}</p></div>
            </section>
            <section className="case-study-section grid gap-8 border-t border-ink/15 py-16 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby="mobile-heading">
              <div className="md:col-span-4"><p className="case-study-index">06 — Mobile experience</p></div>
              <div className="md:col-span-8"><h2 id="mobile-heading" className="case-study-heading">The same point of view, anywhere.</h2><p className="case-study-copy">{project.mobileExperience}</p></div>
            </section>
            <section className="case-study-section grid gap-8 border-t border-ink/15 py-16 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby="result-heading">
              <div className="md:col-span-4"><p className="case-study-index">07 — Result</p></div>
              <div className="md:col-span-8"><h2 id="result-heading" className="case-study-heading">A platform that does its job.</h2><p className="case-study-copy">{project.results ?? project.overview}</p></div>
            </section>

            <section className="case-study-next border-t border-ink/15 py-16 md:py-24" aria-labelledby="next-heading">
              <p className="case-study-index">Next project →</p>
              <Link href={projectRoute(nextProject)} className="group mt-8 grid gap-8 md:grid-cols-2 md:items-end">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink"><Image src={assetPath(nextProject.image ?? "")} alt={projectImageAlt(nextProject)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105" /></div>
                <div><h2 id="next-heading" className="case-study-next-title">{nextProject.title}</h2><p className="case-study-kicker mt-4">{nextProject.category}</p></div>
              </Link>
            </section>
          </div>

          <section className="case-study-cta bg-red px-6 py-24 text-paper md:px-10 md:py-36" aria-labelledby="case-study-cta-heading">
            <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.3em] text-paper/80">Need a website like this?</p><h2 id="case-study-cta-heading" className="case-study-cta-title mt-6">Let&rsquo;s build your<br />online presence.</h2><Link href="/#contact" className="btn-press mt-12 inline-flex bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-transform duration-200 hover:scale-105">Start a project →</Link></div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
