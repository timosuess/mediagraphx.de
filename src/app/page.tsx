import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutTimo from "@/components/sections/AboutTimo";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ShowcaseGrid from "@/components/sections/ShowcaseGrid";
import ProcessPin from "@/components/sections/ProcessPin";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <HeroSection />
        <AboutTimo />
        <ServicesGrid />
        <ShowcaseGrid />
        <ProcessPin />
        <ContactSection />
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
