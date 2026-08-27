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
