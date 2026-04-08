"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "MediaGraphX", category: "Webdesign", image: "/images/portfolio/mediagraphx_produktfoto.jpg" },
  { title: "SEBU GmbH", category: "Broschuere", image: "/images/portfolio/sebu-gmbh_produktfoto.jpg" },
  { title: "QMatix", category: "Werbeartikel", image: "/images/portfolio/qmatix_produktfoto.jpg" },
  { title: "netzGrip", category: "Printwerbung", image: "/images/portfolio/netzgrip_produktfoto.jpg" },
  { title: "Stadt Altenkirchen", category: "Broschuere", image: "/images/portfolio/stadt-altenkirchen_produktfoto.jpg" },
  { title: "DJK Marienstatt", category: "Corporate Design", image: "/images/portfolio/djk-marienstatt_produktfoto.jpg" },
  { title: "Dajanas Pferdedeckenwaescherei", category: "Fahrzeugbeschriftung", image: "/images/portfolio/dajanas-pferdedeckenwaescherei_produktfoto.jpg" },
  { title: "Donnys Autoservice", category: "Corporate Design", image: "/images/portfolio/donnys-autoservice_produktfoto.jpg" },
  { title: "SSV Weyerbusch", category: "Vereinsdesign", image: "/images/portfolio/ssv-weyerbusch_produktfoto.jpg" },
  { title: "Familien-Wegweiser", category: "Broschuere", image: "/images/portfolio/familien-wegweiser_produktfoto.jpg" },
  { title: "Vermessungsbuero Wassermann", category: "Corporate Design", image: "/images/portfolio/vermessungsbuero-wassermann_produktfoto.jpg" },
  { title: "Tassen & Diverses", category: "Werbeartikel", image: "/images/portfolio/tassen-diverses_produktfoto.jpg" },
];

export default function PortfolioGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".port-item", {
        scrollTrigger: { trigger: ".port-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="arbeiten" className="py-20 md:py-28 px-6 bg-grey-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl text-grey-dark uppercase tracking-wide mb-4" style={{ fontFamily: "var(--font-marker), cursive" }}>
            Ausgewaehlte Arbeiten
          </h2>
          <p className="text-grey-medium leading-relaxed italic">
            Echte Projekte, echte Kunden. Hier ein Auszug aus unseren Arbeiten.
          </p>
        </div>

        <div className="port-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((p) => (
            <div key={p.title} className="port-item group relative overflow-hidden cursor-pointer">
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/80 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 px-3">
                    <p className="text-white/80 text-[10px] md:text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-1">{p.category}</p>
                    <h3 className="font-heading font-bold text-sm md:text-base text-white">{p.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
