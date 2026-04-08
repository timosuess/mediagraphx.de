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
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-grey-dark">
            <Image src="/images/fahrzeug/IMG_0663.jpg" alt="" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-grey-dark/70" />
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 md:w-28 md:h-28 z-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="0,0 100,0 100,100" fill="#E8941A" />
            </svg>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.4em] mb-4">
              Leistung im Detail
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight mb-6">
              Fahrzeug&shy;beschriftung <span className="text-orange">&</span> Beklebung
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Ihr Fahrzeug ist Ihre mobile Visitenkarte - 24 Stunden am Tag, 365 Tage im Jahr.
              Wir machen daraus einen echten Hingucker.
            </p>
            <Link href="/#leistungen"
              className="text-orange text-sm font-heading font-semibold uppercase tracking-widest hover:text-orange-light transition-colors">
              &larr; Alle Leistungen
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 orange-bar" />
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 px-6 bg-warm-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: "Konzeption", text: "Wir entwickeln das Design passend zu Ihrem Corporate Design und Ihren Anforderungen." },
                { title: "Produktion", text: "Hochwertige Folien, praeziser Digitaldruck und sorgfaeltige Verarbeitung in unserer Werkstatt." },
                { title: "Montage", text: "Professionelle Verklebung - vom einzelnen Schriftzug bis zur aufwendigen Komplett-Beklebung." },
              ].map((s) => (
                <div key={s.title} className="text-center md:text-left">
                  <h3 className="font-heading font-bold text-lg text-grey-dark mb-2">{s.title}</h3>
                  <p className="text-grey-medium text-sm leading-relaxed">{s.text}</p>
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
              Sprechen Sie uns an - wir beraten Sie gerne zu den Moeglichkeiten
              und erstellen Ihnen ein individuelles Angebot.
            </p>
            <Link href="/#kontakt"
              className="inline-block px-10 py-4 bg-white text-orange font-heading font-bold text-sm uppercase tracking-widest hover:bg-grey-dark hover:text-white transition-all duration-300">
              Jetzt anfragen
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
