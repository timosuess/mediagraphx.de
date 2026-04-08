import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import VehicleWrap from "@/components/sections/VehicleWrap";
import SiteFooter from "@/components/sections/SiteFooter";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fahrzeugbeschriftung & Beklebung | MediaGraphX Werbeagentur",
  description:
    "Professionelle Fahrzeugbeschriftung und Komplett-Beklebung von MediaGraphX. Vom Schriftzug bis zur Vollverklebung - Ihre mobile Visitenkarte.",
};

export default function FahrzeugbeschriftungPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-dark">
          <div className="absolute inset-0">
            <Image src="/images/fahrzeug/IMG_0663.jpg" alt="" fill className="object-cover opacity-15" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.4em] mb-4">
              Leistung im Detail
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-text-primary leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-marker), cursive" }}>
              Fahrzeug&shy;beschriftung & Beklebung
            </h1>
            <div className="h-px w-16 bg-orange mx-auto mb-6" />
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Ihr Fahrzeug ist Ihre mobile Visitenkarte - 24 Stunden am Tag, 365 Tage im Jahr.
            </p>
            <Link href="/#leistungen"
              className="text-orange text-sm font-heading font-semibold uppercase tracking-widest hover:text-orange-light transition-colors">
              &larr; Alle Leistungen
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 orange-bar" />
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 px-6 bg-dark-surface border-b border-dark-border">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "Konzeption", text: "Wir entwickeln das Design passend zu Ihrem Corporate Design und Ihren Anforderungen." },
                { num: "02", title: "Produktion", text: "Hochwertige Folien, praeziser Digitaldruck und sorgfaeltige Verarbeitung in unserer Werkstatt." },
                { num: "03", title: "Montage", text: "Professionelle Verklebung - vom einzelnen Schriftzug bis zur aufwendigen Komplett-Beklebung." },
              ].map((s) => (
                <div key={s.title}>
                  <span className="text-orange font-heading font-bold text-sm mb-3 block">{s.num}</span>
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-2">{s.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <VehicleWrap />

        {/* CTA */}
        <section className="py-16 md:py-20 px-6 bg-orange">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
              Ihr Fahrzeug soll auffallen?
            </h2>
            <p className="text-white/70 mb-8">
              Wir beraten Sie gerne und erstellen ein individuelles Angebot.
            </p>
            <Link href="/#kontakt"
              className="inline-block px-10 py-4 bg-dark text-orange font-heading font-bold text-sm uppercase tracking-widest hover:bg-dark-card transition-all duration-300">
              Jetzt anfragen
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
