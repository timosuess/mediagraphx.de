"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { servicesAZ } from "@/data/services-az";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesAZ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".az-intro-title", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".az-intro-sub", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.6,
        ease: "power3.out",
      });

      // Calculate total scroll width
      const panels = gsap.utils.toArray<HTMLElement>(".az-panel");
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll via vertical scrolling
      const scrollTween = gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          end: () => `+=${totalWidth}`,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              Math.floor(progress * panels.length),
              panels.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Animate each panel's content as it enters view
      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll(".az-service-card"), {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(panel.querySelector(".az-big-letter"), {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Intro */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-grey-subtle relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[40vw] font-heading font-extrabold text-grey-dark select-none leading-none">
              A-Z
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-grey-medium hover:text-orange transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurueck zur Startseite
          </Link>

          <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
            Leistungen
          </p>
          <h1 className="az-intro-title font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-grey-dark leading-[1.05] mb-6">
            Von A bis Z.
            <br />
            <span className="text-orange">Alles aus einer Hand.</span>
          </h1>
          <p className="az-intro-sub text-grey-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-4">
            Ueber 80 Leistungen. Scrollen Sie durch unser komplettes Angebot.
          </p>
          <p className="az-intro-sub text-grey-medium/60 text-sm flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-orange" />
            Einfach weiterscrollen zum Swipen
          </p>
        </div>
      </div>

      {/* Letter progress bar */}
      <div className="sticky top-20 z-40 bg-warm-white/95 backdrop-blur-md border-b border-grey-light/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {servicesAZ.map((group, i) => (
              <div
                key={group.letter}
                className={`shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-sm text-xs md:text-sm font-heading font-bold flex items-center justify-center transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-orange text-white shadow-md shadow-orange-glow scale-110"
                    : i < activeIndex
                      ? "bg-orange/15 text-orange"
                      : "bg-grey-subtle text-grey-medium"
                }`}
              >
                {group.letter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-screen"
          style={{ width: `${servicesAZ.length * 100}vw` }}
        >
          {servicesAZ.map((group) => (
            <div
              key={group.letter}
              className="az-panel relative flex-shrink-0 w-screen h-screen flex items-center px-8 md:px-16 lg:px-24"
            >
              {/* Giant background letter */}
              <div className="az-big-letter absolute right-8 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <span className="text-[30vh] md:text-[45vh] font-heading font-extrabold text-grey-subtle/60 leading-none">
                  {group.letter}
                </span>
              </div>

              {/* Panel content */}
              <div className="relative z-10 w-full max-w-5xl">
                {/* Letter badge */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 md:w-18 md:h-18 bg-orange rounded-sm flex items-center justify-center shadow-lg shadow-orange-glow/30">
                    <span className="text-white font-heading font-extrabold text-2xl md:text-3xl">
                      {group.letter}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-orange/40 to-transparent max-w-xs" />
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                  {group.services.map((service) => (
                    <div
                      key={service.name}
                      className="az-service-card group p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-sm border border-grey-light/40 hover:border-orange/40 transition-all duration-400 hover:shadow-lg hover:shadow-orange-glow/15 hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-0 h-[2px] bg-orange group-hover:w-full transition-all duration-500" />
                      <h3 className="font-heading font-bold text-base md:text-lg text-grey-dark mb-1.5 group-hover:text-orange transition-colors duration-300">
                        {service.name}
                      </h3>
                      <p className="text-grey-medium text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-24 px-6 bg-grey-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 md:p-16 bg-white rounded-sm relative overflow-hidden border border-grey-light/30">
            <div className="absolute top-4 left-6 text-[100px] md:text-[140px] font-script text-orange/10 leading-none select-none">
              ?
            </div>
            <div className="relative z-10">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-grey-dark mb-4">
                Nicht gefunden was Sie suchen?
              </h3>
              <p className="text-grey-medium mb-8 max-w-md mx-auto">
                Kein Problem - sprechen Sie uns einfach an. Wir finden fuer jedes Projekt die passende Loesung.
              </p>
              <Link
                href="/#kontakt"
                className="inline-block px-8 py-4 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow hover:shadow-xl hover:shadow-orange-glow hover:-translate-y-0.5"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
