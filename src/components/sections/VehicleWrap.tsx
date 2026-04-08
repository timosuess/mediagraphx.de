"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Schumann Moebelwerkstaette / Kiehl's",
    images: [
      { src: "/images/fahrzeug/IMG_0668.jpg", alt: "Schumann Sprinter - Heckansicht" },
      { src: "/images/fahrzeug/IMG_0673.jpg", alt: "Schumann Sprinter - Seitenansicht" },
    ],
  },
  {
    title: "Dajanas Pferdedecken-Waescherei",
    images: [
      { src: "/images/fahrzeug/IMG_0648.jpg", alt: "Pferdedecken-Waescherei - Folie auf Arbeitstisch" },
      { src: "/images/fahrzeug/IMG_0649.jpg", alt: "Pferdedecken-Waescherei - Beklebung Seitenwand" },
      { src: "/images/fahrzeug/IMG_0656.jpg", alt: "Pferdedecken-Waescherei - Heckansicht" },
      { src: "/images/fahrzeug/IMG_0658.jpg", alt: "Pferdedecken-Waescherei - fertig von hinten" },
      { src: "/images/fahrzeug/IMG_0660.jpg", alt: "Pferdedecken-Waescherei - Logo Detail" },
      { src: "/images/fahrzeug/IMG_0661.jpg", alt: "Pferdedecken-Waescherei - Farbauswahl Folie" },
      { src: "/images/fahrzeug/IMG_0663.jpg", alt: "Pferdedecken-Waescherei - fertig Seitenansicht rechts" },
      { src: "/images/fahrzeug/IMG_0671.jpg", alt: "Pferdedecken-Waescherei - fertig von vorne" },
    ],
  },
];

const allImages = projects.flatMap((p) => p.images);

export default function VehicleWrap() {
  const ref = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vw-heading", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".vw-img", {
        scrollTrigger: { trigger: ".vw-grid", start: "top 85%" },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const openLightbox = (globalIdx: number) => {
    setLightboxIdx(globalIdx);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigate = (dir: number) => {
    setLightboxIdx((prev) => (prev + dir + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  let globalIndex = 0;

  return (
    <>
      <section ref={ref} className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="vw-heading text-3xl md:text-4xl text-grey-dark uppercase tracking-wide mb-4" style={{ fontFamily: "var(--font-marker), cursive" }}>
              Fahrzeugbeschriftung & Beklebung
            </h2>
            <p className="vw-heading text-grey-medium leading-relaxed italic">
              Ihr Fahrzeug ist Ihre mobile Visitenkarte. Wir gestalten und realisieren
              professionelle Fahrzeugbeschriftungen - vom einzelnen Schriftzug bis zur
              aufmerksamkeitsstarken Komplett-Beklebung. Durchdacht konzipiert, praezise
              umgesetzt und garantiert ein Hingucker auf jeder Strasse.
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-16">
            {projects.map((project) => (
              <div key={project.title}>
                <h3 className="font-heading font-bold text-xl text-grey-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-[3px] bg-orange inline-block" />
                  {project.title}
                </h3>

                <div className="vw-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {project.images.map((img) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={img.src}
                        onClick={() => openLightbox(idx)}
                        className="vw-img group relative aspect-[4/3] overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/30 transition-all duration-500 flex items-center justify-center">
                          <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10">
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10">
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative w-[90vw] h-[80vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[lightboxIdx].src}
              alt={allImages[lightboxIdx].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 text-white/50 text-sm">
            {lightboxIdx + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
