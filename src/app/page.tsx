import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import BannerCTA from "@/components/sections/BannerCTA";
import ServicesCards from "@/components/sections/ServicesCards";
import FeaturedProject from "@/components/sections/FeaturedProject";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import WorkWithUs from "@/components/sections/WorkWithUs";
import StatsCounter from "@/components/sections/StatsCounter";
import VehicleWrap from "@/components/sections/VehicleWrap";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Testimonials from "@/components/sections/Testimonials";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <HeroSection />
        <BannerCTA />
        <ServicesCards />
        <FeaturedProject />
        <WhyChooseUs />
        <WorkWithUs />
        <StatsCounter />
        <VehicleWrap />
        <PortfolioGrid />
        <Testimonials />
        <ContactSection />
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
