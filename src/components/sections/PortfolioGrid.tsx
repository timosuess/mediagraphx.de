"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".port-item", {
        scrollTrigger: { trigger: ".port-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const open = (i: number) => {
    setLightboxIdx(i);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  };

  const nav = (dir: number) => {
    setLightboxIdx((prev) => (prev! + dir + projects.length) % projects.length);
  };

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx]);

  return (
    <>
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
            {projects.map((p, i) => (
              <button key={p.title} onClick={() => open(i)}
                className="port-item group relative overflow-hidden cursor-pointer text-left">
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={close}>
          <button onClick={close} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); nav(-1); }}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10">
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); nav(1); }}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10">
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative w-[90vw] h-[80vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={projects[lightboxIdx].image}
              alt={projects[lightboxIdx].title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-heading font-bold text-base mb-1">{projects[lightboxIdx].title}</p>
            <p className="text-white/50 text-xs uppercase tracking-wider">{projects[lightboxIdx].category} &middot; {lightboxIdx + 1} / {projects.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
