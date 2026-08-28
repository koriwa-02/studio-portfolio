import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import IHelpYou from "@/components/IHelpYou";
import Work from "@/components/Work";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "KORIWA Studio — Web Design, Branding & Digital Experiences",
  description: "KORIWA Studio is a creative digital studio in Morocco specializing in web design, branding, graphic design and digital experiences for ambitious businesses and brands.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: "KORIWA Studio — Web Design, Branding & Digital Experiences", description: "Web design, branding and digital experiences by KORIWA Studio.", url: absoluteUrl("/"), siteName: "KORIWA Studio", type: "website", images: [{ url: absoluteUrl("/brand/koriwa-studio.png"), alt: "KORIWA Studio" }] },
  twitter: { card: "summary_large_image", title: "KORIWA Studio — Web Design, Branding & Digital Experiences", description: "Web design, branding and digital experiences by KORIWA Studio.", images: [absoluteUrl("/brand/koriwa-studio.png")] },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <IHelpYou />
        <Work />
        <HowItWorks />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
