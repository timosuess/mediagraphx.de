import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import VehicleWrap from "@/components/sections/VehicleWrap";
import SiteFooter from "@/components/sections/SiteFooter";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrzeugbeschriftung | MediaGraphX · Westerwald",
  description:
    "Professionelle Fahrzeugbeschriftung und Komplett-Beklebung von MediaGraphX. Vom Schriftzug bis zur Vollverklebung – Ihre mobile Visitenkarte.",
};

export default function FahrzeugbeschriftungPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-end pt-[140px] pb-20 px-6 md:px-12 bg-[#141210] text-[#f5ede1] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/fahrzeug/IMG_0663.jpg"
              alt=""
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/60 via-[#141210]/40 to-[#141210]" />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto w-full">
            <Link
              href="/"
              data-cursor="Zurück"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#f5ede1]/70 hover:text-[#d86c3f] mb-10 transition-colors link-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Zurück zur Startseite
            </Link>
            <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.35em] text-[#f4c95d]">
              <span className="w-10 h-px bg-[#f4c95d]" />
              <span>Leistung im Detail</span>
            </div>
            <h1 className="font-display italic font-light leading-[0.92] tracking-[-0.02em] text-[clamp(56px,10vw,180px)] max-w-5xl">
              Fahrzeug­<br />
              <span className="text-[#d86c3f]">beschriftung.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-[#f5ede1]/75">
              Ihr Fahrzeug ist Ihre mobile Visitenkarte – 24 Stunden am Tag, 365 Tage im Jahr. Wir machen daraus einen echten Hingucker.
            </p>
          </div>
        </section>

        {/* Process-Trio */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f5ede1] text-[#141210]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { n: "01", title: "Konzeption", text: "Wir entwickeln das Design passend zu deinem Corporate Design und deinen Anforderungen." },
              { n: "02", title: "Produktion", text: "Hochwertige Folien, präziser Digitaldruck und sorgfältige Verarbeitung in der Werkstatt." },
              { n: "03", title: "Montage", text: "Professionelle Verklebung – vom einzelnen Schriftzug bis zur aufwendigen Komplett-Beklebung." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="font-display italic font-light text-[#d86c3f] text-6xl md:text-7xl mb-6">
                  {s.n}
                </div>
                <h3 className="font-display italic font-light text-3xl md:text-4xl mb-4">{s.title}</h3>
                <p className="text-[#2b2621]/80 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <VehicleWrap />

        {/* CTA */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#d86c3f] text-[#141210]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display italic font-light leading-[0.95] text-[clamp(40px,6vw,80px)] mb-8">
              Dein Fahrzeug soll <br />auffallen?
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto text-[#141210]/80">
              Sprich uns an – wir beraten dich gerne zu den Möglichkeiten und erstellen dir ein individuelles Angebot.
            </p>
            <Link
              href="/#kontakt"
              data-cursor="Anfragen"
              className="magnetic inline-flex items-center gap-3 bg-[#141210] hover:bg-[#f5ede1] hover:text-[#141210] text-[#f5ede1] px-10 py-5 text-sm uppercase tracking-[0.2em] transition-colors"
            >
              Jetzt anfragen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
