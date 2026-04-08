"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, PenTool, Layers, Printer, Search, Camera, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe, title: "Webdesign", text: "Moderne, responsive Internetseiten die begeistern und verkaufen. Mit aktuellem CMS fuer Ihre Unabhaengigkeit.", link: null, image: null },
  { icon: PenTool, title: "Logoentwicklung", text: "Ein Logo ist die Essenz Ihrer Marke. Wir entwickeln Zeichen die im Kopf bleiben.", link: null, image: null },
  { icon: Layers, title: "Corporate Design", text: "Vom Briefbogen bis zur Fahrzeugbeschriftung - einheitlich und unverwechselbar.", link: null, image: null },
  { icon: Truck, title: "Fahrzeugbeschriftung", text: "Ihr Fahrzeug als mobile Visitenkarte. Vom Schriftzug bis zur Komplett-Beklebung.", link: "/fahrzeugbeschriftung", image: "/images/fahrzeug/IMG_0663.jpg" },
  { icon: Printer, title: "Printwerbung", text: "Flyer, Broschueren, Plakate und mehr. Druckprodukte die ueberzeugen.", link: null, image: null },
  { icon: Search, title: "SEO", text: "Gefunden werden, wenn es zaehlt. Suchmaschinenoptimierung mit Ergebnis.", link: null, image: null },
  { icon: Camera, title: "Fotografie", text: "Professionelle Bilder erzaehlen Ihre Geschichte. Produkt bis Portrait.", link: null, image: null },
];

export default function ServicesCards() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="leistungen" className="py-24 md:py-32 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-20">
          <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">Leistungen</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary uppercase tracking-wide mb-6"
            style={{ fontFamily: "var(--font-marker), cursive" }}>
            Unsere Leistungen
          </h2>
          <div className="h-px w-16 bg-orange mb-6" />
          <p className="text-text-secondary leading-relaxed">
            Full-Service heisst bei uns: Wir denken mit, gestalten vor und setzen um.
            Von der ersten Idee bis zum fertigen Produkt.
          </p>
        </div>

        <div className="services-grid space-y-0">
          {services.map((s, i) => (
            <div key={s.title} className="service-card group border-t border-dark-border py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              {/* Number */}
              <span className="text-text-muted font-heading font-bold text-sm shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon or Image */}
              <div className="shrink-0">
                {s.image ? (
                  <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-sm">
                    <Image src={s.image} alt={s.title} fill sizes="80px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-dark-card border border-dark-border flex items-center justify-center group-hover:border-orange/40 transition-colors">
                    <s.icon className="w-7 h-7 text-text-muted group-hover:text-orange transition-colors" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-xl md:text-2xl text-text-primary group-hover:text-orange transition-colors flex-1">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm hidden lg:block">{s.text}</p>

              {/* Link */}
              <div className="shrink-0">
                {s.link ? (
                  <Link href={s.link} className="text-orange text-sm font-heading font-semibold uppercase tracking-wider hover:text-orange-light transition-colors">
                    Ansehen &rarr;
                  </Link>
                ) : (
                  <span className="text-text-muted text-sm">&rarr;</span>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-dark-border" />
        </div>
      </div>
    </section>
  );
}
