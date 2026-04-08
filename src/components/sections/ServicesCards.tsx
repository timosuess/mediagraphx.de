"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, PenTool, Layers, Printer, Search, Camera, Monitor, FileCode } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe, title: "Webdesign", text: "Moderne, responsive Internetseiten die begeistern und verkaufen. Mit aktuellem CMS fuer Ihre Unabhaengigkeit." },
  { icon: PenTool, title: "Logoentwicklung", text: "Ein Logo ist die Essenz Ihrer Marke. Wir entwickeln Zeichen die im Kopf bleiben und Wiedererkennungswert schaffen." },
  { icon: Layers, title: "Corporate Design", text: "Vom Briefbogen bis zur Fahrzeugbeschriftung - wir gestalten Ihren einheitlichen, unverwechselbaren Markenauftritt." },
  { icon: Printer, title: "Printwerbung", text: "Flyer, Broschueren, Plakate und mehr. Hochwertige Druckprodukte die in der Hand ueberzeugen." },
  { icon: Search, title: "SEO", text: "Gefunden werden, wenn es zaehlt. Suchmaschinenoptimierung mit messbaren Ergebnissen." },
  { icon: Camera, title: "Fotografie", text: "Professionelle Bilder erzaehlen Ihre Geschichte. Produkt-, Team- und Eventfotografie." },
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
    <section ref={ref} id="leistungen" className="py-20 md:py-28 px-6 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-grey-dark uppercase tracking-wide mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-grey-medium leading-relaxed italic">
            Full-Service heisst bei uns: Wir denken mit, gestalten vor und setzen um.
            Von der ersten Idee bis zum fertigen Produkt - alles aus einer Hand.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="service-card group">
              <div className="relative overflow-hidden mb-6">
                <div className="w-full h-48 bg-grey-subtle flex items-center justify-center group-hover:bg-orange/10 transition-colors duration-500">
                  <s.icon className="w-12 h-12 text-grey-medium group-hover:text-orange transition-colors duration-500" strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/5 transition-all duration-500" />
              </div>
              <h3 className="font-heading font-bold text-lg text-grey-dark uppercase tracking-wide mb-3 group-hover:text-orange transition-colors">
                {s.title}
              </h3>
              <p className="text-grey-medium text-sm leading-relaxed mb-4">{s.text}</p>
              <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-orange text-sm font-semibold hover:text-orange-dark transition-colors flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-orange flex items-center justify-center text-[10px]">&rarr;</span>
                Mehr erfahren
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
