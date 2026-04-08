"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Markenrelaunch", category: "Corporate Design", image: "/images/portfolio-branding.png" },
  { title: "Responsive Webseite", category: "Webdesign", image: "/images/portfolio-webdesign.png" },
  { title: "Produktkatalog", category: "Printwerbung", image: "/images/portfolio-print.png" },
  { title: "Firmenbranding", category: "Markenentwicklung", image: "/images/portfolio-logo.png" },
  { title: "Event-Fotografie", category: "Fotografie", image: "/images/portfolio-event.png" },
  { title: "Online-Kampagne", category: "Online Marketing", image: "/images/portfolio-marketing.png" },
];

export default function PortfolioGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".port-item", {
        scrollTrigger: { trigger: ".port-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
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
            Jedes Projekt wird mit Herzblut und Praezision umgesetzt.
            Hier ein Auszug aus unseren Arbeiten.
          </p>
        </div>

        <div className="port-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="port-item group relative overflow-hidden cursor-pointer">
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/80 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-white/80 text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-2">{p.category}</p>
                    <h3 className="font-heading font-bold text-xl text-white">{p.title}</h3>
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
