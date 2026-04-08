import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ServicesAZ from "@/components/ServicesAZ";

export const metadata: Metadata = {
  title: "Leistungen A-Z | MediaGraphX Werbeagentur Altenkirchen",
  description:
    "Alle Leistungen von MediaGraphX auf einen Blick - von Anzeigen bis Zeitschriften. Full-Service Werbeagentur im Westerwald.",
};

export default function LeistungenPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <ServicesAZ />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
