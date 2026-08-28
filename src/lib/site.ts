export const SITE_URL = "https://koriwa-02.github.io/studio-portfolio";
export const SITE_NAME = "KORIWA Studio";

export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
