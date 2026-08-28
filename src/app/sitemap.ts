import type { MetadataRoute } from "next";
import { projects, projectRoute } from "@/lib/projects";
import { servicePages, serviceRoute } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: absoluteUrl("/"), priority: 1, changeFrequency: "monthly" }, { url: absoluteUrl("/projects/"), priority: 0.9, changeFrequency: "monthly" }, ...projects.map((project) => ({ url: absoluteUrl(projectRoute(project)), priority: 0.8, changeFrequency: "monthly" as const })), { url: absoluteUrl("/services/"), priority: 0.8, changeFrequency: "monthly" }, ...servicePages.map((service) => ({ url: absoluteUrl(serviceRoute(service.slug)), priority: 0.7, changeFrequency: "monthly" as const }))]; }
