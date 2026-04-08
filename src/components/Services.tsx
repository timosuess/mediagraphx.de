"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  PenTool,
  Printer,
  Search,
  Camera,
  Layers,
  Monitor,
  FileCode,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Webdesign",
    desc: "Moderne, responsive Internetseiten die begeistern und verkaufen. Mit aktuellem CMS fuer Ihre Unabhaengigkeit.",
    tags: ["HTML", "CSS", "PHP", "CMS"],
  },
  {
    icon: PenTool,
    title: "Logoentwicklung",
    desc: "Ein Logo ist mehr als ein Bild - es ist die Essenz Ihrer Marke. Wir entwickeln Zeichen die im Kopf bleiben.",
    tags: ["Branding", "Vektorgrafik"],
  },
  {
    icon: Layers,
    title: "Corporate Design",
    desc: "Vom Briefbogen bis zur Fahrzeugbeschriftung - wir gestalten Ihren einheitlichen Markenauftritt.",
    tags: ["Geschaeftsausstattung", "Styleguide"],
  },
  {
    icon: Printer,
    title: "Printwerbung",
    desc: "Flyer, Broschueren, Plakate und mehr. Hochwertige Druckprodukte die in der Hand ueberzeugen.",
    tags: ["Offset", "Digital"],
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Gefunden werden, wenn es zaehlt. Wir optimieren Ihre Online-Praesenz fuer Suchmaschinen.",
    tags: ["OnPage", "Analytics"],
  },
  {
    icon: Camera,
    title: "Fotografie",
    desc: "Professionelle Bilder erzaehlen Ihre Geschichte. Produkt-, Team- und Eventfotografie aus einer Hand.",
    tags: ["Produkt", "Portrait"],
  },
  {
    icon: Monitor,
    title: "Online Marketing",
    desc: "Strategische Online-Praesenz mit messbaren Ergebnissen. Social Media, Kampagnen und mehr.",
    tags: ["Social Media", "Kampagnen"],
  },
  {
    icon: FileCode,
    title: "Markenentwicklung",
    desc: "Von der Namensfindung bis zur Markenstrategie - wir bauen Marken die Vertrauen schaffen.",
    tags: ["Strategie", "Positionierung"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-heading", {
        scrollTrigger: {
          trigger: ".services-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="leistungen" className="py-28 md:py-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
            Leistungen
          </p>
          <h2 className="services-heading font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1] mb-6">
            Alles aus
            <br />
            <span className="text-orange">einer Hand.</span>
          </h2>
          <p className="text-grey-medium text-lg leading-relaxed">
            Full-Service heisst bei uns: Wir denken mit, gestalten vor und setzen um.
            Kein Projekt ist zu gross, kein Detail zu klein.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group relative p-8 bg-warm-white rounded-sm border border-grey-light/40 hover:border-orange/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-glow/20 overflow-hidden"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 w-0 h-[3px] bg-orange group-hover:w-full transition-all duration-500" />

              <service.icon
                className="w-8 h-8 text-grey-medium group-hover:text-orange transition-colors duration-300 mb-6"
                strokeWidth={1.5}
              />

              <h3 className="font-heading font-bold text-xl text-grey-dark mb-3">
                {service.title}
              </h3>

              <p className="text-grey-medium text-sm leading-relaxed mb-5">{service.desc}</p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-orange/70 bg-orange/5 px-2.5 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
