import { workItems, workSlug, type WorkItem } from "@/lib/content";

const slugOverrides: Record<string, string> = {
  "Zidalum Catalog|Print / Graphic Design": "zidalum-catalog-design",
  "Spectra|Website / Web Design": "spectra-website-design",
  "AMZ Singer|Social Media / Reel": "amz-singer-reel",
  "Global El Koukh|Website / Web Design": "global-el-koukh-website",
  "Asna Joyería|Social Media / Posts": "asna-joyeria-social-media",
  "Spectra Catalog|Print / Graphic Design": "spectra-catalog-design",
  "Asna Joyería|Campaigns & Ads": "asna-joyeria-campaigns",
  "Bimo|Campaigns & Ads": "bimo-campaign",
  "Atlas Lions|Photography / Brand Shoot": "atlas-lions-brand-shoot",
  "Al Barad|Packaging / Graphic Design": "al-barad-packaging",
};

export type ProjectCaseStudy = WorkItem & {
  slug: string;
  location: string;
  overview: string;
  strategy: string;
  designDirection: string;
  processTitle: string;
  processBody: string;
  mobileExperience: string;
  nextSlug: string;
};

export function projectSlug(project: Pick<WorkItem, "title" | "category">) {
  return slugOverrides[`${project.title}|${project.category}`] ?? workSlug(project.title, project.category);
}

function projectProcess(project: WorkItem) {
  const category = project.category.toLowerCase();
  if (category.includes("website")) {
    return {
      title: "Website development",
      body: "The responsive implementation was shaped around mobile-first thinking, clear UI/UX patterns, fast-loading media and accessible interactions. The result is a conversion-focused business website that stays confident across desktop and mobile.",
      mobile: "Layouts, type scale and navigation were reorganized for smaller screens instead of simply shrinking the desktop composition, keeping the browsing experience clear and usable on mobile.",
    };
  }
  if (category.includes("campaign")) {
    return {
      title: "Campaign execution",
      body: "Creative direction, messaging and asset production were structured as one campaign system so each placement could feel immediate while still belonging to the wider brand.",
      mobile: "Social-first compositions were tested against smaller screens, protecting the message hierarchy and making each asset legible at a glance.",
    };
  }
  if (category.includes("social")) {
    return {
      title: "Social media system",
      body: "The work combines content direction, visual consistency and platform-aware design to create a repeatable social system rather than a collection of disconnected posts.",
      mobile: "Every composition was designed for the way people actually encounter social content: vertically, quickly and on a small screen.",
    };
  }
  if (category.includes("packaging")) {
    return {
      title: "Packaging design",
      body: "The visual system was translated into production-ready packaging with a clear hierarchy, strong shelf presence and enough flexibility for future applications.",
      mobile: "Digital previews and presentation assets were kept clear at smaller sizes so the packaging direction could be reviewed and shared easily.",
    };
  }
  if (category.includes("photography")) {
    return {
      title: "Brand shoot direction",
      body: "Concept, art direction and image selection were developed together to create a coherent visual story with enough range for social, editorial and campaign use.",
      mobile: "The image system was selected with mobile crops in mind, ensuring the strongest moments remain recognizable in vertical placements.",
    };
  }
  return {
    title: "Catalog design",
    body: "A considered layout system, typography and image direction turned the project into a clear, consistent visual tool that works across print and digital presentation.",
    mobile: "The supporting digital layouts were kept responsive and easy to scan, preserving the same hierarchy at smaller sizes.",
  };
}

function buildProject(project: WorkItem, index: number): ProjectCaseStudy {
  const process = projectProcess(project);
  const slug = projectSlug(project);
  return {
    ...project,
    slug,
    location: "Morocco",
    overview: project.details,
    strategy: project.approach,
    designDirection: `The direction for ${project.title} is built around a focused visual hierarchy, deliberate spacing and a clear relationship between image, type and message.`,
    processTitle: process.title,
    processBody: process.body,
    mobileExperience: process.mobile,
    nextSlug: projectSlug(workItems[(index + 1) % workItems.length]),
  };
}

const baseProjects = workItems.map(buildProject);

export const projects: ProjectCaseStudy[] = baseProjects.map((project) =>
  project.slug === "spectra-website-design"
    ? {
        ...project,
        category: "Website Design & Development",
        overview:
          "Spectra needed a digital presence that reflected the precision, modernity and premium positioning of its architectural work. KORIWA Studio created a responsive digital experience focused on strong visual storytelling, clear hierarchy and an intuitive browsing experience.",
        challenge:
          "The website needed to present architectural work in a premium way without overwhelming visitors. The experience had to balance large imagery, typography, navigation and conversion while remaining responsive across desktop and mobile.",
        strategy:
          "The interface was structured around visual hierarchy, simplified navigation and generous spacing. Project imagery leads the experience while typography and interaction create a more editorial architectural character.",
        designDirection:
          "Large architectural visuals, restrained typography and clean interface elements reinforce Spectra's premium architectural positioning.",
        processTitle: "Website development",
        processBody:
          "The responsive implementation was designed to maintain the visual impact of the desktop experience while adapting naturally to smaller screens. Performance, clear UI/UX patterns and accessible interactions support a conversion-focused website without distracting from the work.",
        mobileExperience:
          "Layouts, spacing, typography and navigation were reorganized for smaller devices without simply shrinking the desktop design, keeping the experience calm and easy to browse.",
        results:
          "The finished experience gives Spectra a stronger digital presentation and a focused platform for communicating its architectural work across desktop and mobile.",
      }
    : project,
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function projectRoute(project: Pick<ProjectCaseStudy, "slug"> | string) {
  return `/projects/${typeof project === "string" ? project : project.slug}/`;
}

export function projectImageAlt(project: Pick<ProjectCaseStudy, "title" | "category">) {
  return `${project.title} ${project.category.toLowerCase()} project by KORIWA Studio`;
}
