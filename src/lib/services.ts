import { services as serviceContent } from "@/lib/content";
import { projects, projectRoute } from "@/lib/projects";

const serviceDetails = {
  "Brand Identity": {
    slug: "branding",
    intro: "Brand identity systems that give ambitious businesses a clear, memorable presence across every touchpoint.",
    capabilities: ["Naming and positioning", "Logo and wordmark systems", "Visual identity and guidelines", "Brand applications"],
    approach: "We clarify what makes the business matter, then turn that point of view into a flexible identity people can recognize and remember.",
  },
  "Web Design & Dev": {
    slug: "web-design",
    intro: "Motion-aware websites and digital experiences designed to communicate clearly, build trust and move people to act.",
    capabilities: ["Responsive web design", "UI/UX design", "Website development", "Motion and interaction", "Performance and SEO foundations"],
    approach: "We combine strategy, editorial layout and thoughtful development to build a website that feels distinct while staying fast, accessible and easy to use.",
  },
  "Campaigns & Ads": {
    slug: "campaigns-ads",
    intro: "Campaign concepts and ad creative that make the message immediate, memorable and ready for the platforms where people discover brands.",
    capabilities: ["Campaign concepts", "Ad creative systems", "Social-first formats", "Testing and reporting"],
    approach: "We build the idea and the asset system together so every execution feels connected, clear and useful to the campaign objective.",
  },
  "Graphic Design": {
    slug: "graphic-design",
    intro: "Graphic design for print, packaging and brand touchpoints that makes the work impossible to overlook.",
    capabilities: ["Editorial and catalog design", "Packaging design", "Print collateral", "Art direction"],
    approach: "We use hierarchy, typography and production-aware layouts to make every piece feel considered from first glance to final detail.",
  },
  "Social Media Management": {
    slug: "social-media",
    intro: "A practical social media system that keeps your brand visible with consistent content, direction and platform-aware design.",
    capabilities: ["Content calendars", "Post and reel direction", "Community management", "Platform strategy"],
    approach: "We turn the brand into a repeatable content rhythm, balancing consistency with enough creative movement to keep people paying attention.",
  },
} as const;

export type ServicePage = (typeof serviceDetails)[keyof typeof serviceDetails] & { title: string; index: string; description: string; relatedProjects: typeof projects };

export const servicePages: ServicePage[] = serviceContent.map((service) => ({
  ...serviceDetails[service.title as keyof typeof serviceDetails],
  title: service.title,
  index: service.index,
  description: service.description,
  relatedProjects: projects.filter((project) => {
    const title = service.title.toLowerCase();
    const category = project.category.toLowerCase();
    return (title.includes("web") && category.includes("website")) ||
      (title.includes("graphic") && (category.includes("print") || category.includes("packaging"))) ||
      (title.includes("campaign") && category.includes("campaign")) ||
      (title.includes("social") && category.includes("social")) ||
      (title.includes("brand") && category.includes("brand"));
  }),
}));

export function serviceRoute(slug: string) { return `/services/${slug}/`; }
export function getService(slug: string) { return servicePages.find((service) => service.slug === slug) ?? null; }
export { projectRoute };
