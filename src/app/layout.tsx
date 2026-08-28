import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import { assetPath } from "@/lib/asset";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: "KORIWA Studio — Web Design, Branding & Digital Experiences",
  description:
    "KORIWA Studio is a creative digital studio in Morocco specializing in web design, branding, graphic design and digital experiences for ambitious businesses and brands.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preload" href={assetPath("/brand/koriwa-studio.png")} as="image" />
      </head>
      <body className="font-body min-h-full flex flex-col bg-paper text-ink">
        <LoadingScreen />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: SITE_NAME, url: absoluteUrl("/"), logo: absoluteUrl("/brand/koriwa-studio.png"), areaServed: "Morocco", serviceType: ["Web design", "Brand identity", "Graphic design", "Digital experiences"] }) }} />
        {children}
      </body>
    </html>
  );
}
