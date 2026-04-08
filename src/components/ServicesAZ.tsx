"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { servicesAZ } from "@/data/services-az";

gsap.registerPlugin(ScrollTrigger);

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ServicesAZ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".az-hero-title", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".az-hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".az-nav-letter", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.02,
        delay: 0.7,
        ease: "back.out(1.7)",
      });

      // Animate each letter group on scroll
      allLetters.forEach((letter) => {
        const el = letterRefs.current[letter];
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const el = letterRefs.current[letter];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Track active letter on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const letter = entry.target.getAttribute("data-letter");
            if (letter) setActiveLetter(letter);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    Object.values(letterRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen">
      {/* Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-grey-subtle relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
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
          <h1 className="az-hero-title font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-grey-dark leading-[1.05] mb-6">
            Von A bis Z.
            <br />
            <span className="text-orange">Alles aus einer Hand.</span>
          </h1>
          <p className="az-hero-subtitle text-grey-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            Ueber 80 Leistungen - von Anzeigengestaltung bis Zeitschriftendruck.
            Was auch immer Ihr Projekt braucht, wir setzen es um.
          </p>
        </div>
      </div>

      {/* Sticky A-Z Navigation */}
      <div className="sticky top-20 z-40 bg-warm-white/95 backdrop-blur-md border-b border-grey-light/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-wrap justify-center gap-1 md:gap-1.5">
            {allLetters.map((letter) => {
              const hasServices = servicesAZ.some((g) => g.letter === letter);
              return (
                <button
                  key={letter}
                  onClick={() => hasServices && scrollToLetter(letter)}
                  disabled={!hasServices}
                  className={`az-nav-letter w-8 h-8 md:w-9 md:h-9 rounded-sm text-xs md:text-sm font-heading font-bold transition-all duration-200 ${
                    activeLetter === letter
                      ? "bg-orange text-white shadow-md shadow-orange-glow"
                      : hasServices
                        ? "bg-grey-subtle text-grey-dark hover:bg-orange/10 hover:text-orange"
                        : "bg-transparent text-grey-light cursor-default"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-16 md:space-y-24">
          {servicesAZ.map((group) => (
            <div
              key={group.letter}
              ref={(el) => { letterRefs.current[group.letter] = el; }}
              data-letter={group.letter}
              id={`letter-${group.letter}`}
              className="scroll-mt-36"
            >
              {/* Letter Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange rounded-sm flex items-center justify-center shrink-0 shadow-lg shadow-orange-glow/30">
                  <span className="text-white font-heading font-extrabold text-3xl md:text-4xl">
                    {group.letter}
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-orange/30 to-transparent" />
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {group.services.map((service) => (
                  <div
                    key={service.name}
                    className="group p-6 bg-white rounded-sm border border-grey-light/40 hover:border-orange/40 transition-all duration-400 hover:shadow-lg hover:shadow-orange-glow/15 hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    {/* Top accent line on hover */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-orange group-hover:w-full transition-all duration-500" />

                    <h3 className="font-heading font-bold text-lg text-grey-dark mb-2 group-hover:text-orange transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-grey-medium text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block p-10 md:p-16 bg-grey-subtle rounded-sm relative overflow-hidden">
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
    </section>
  );
}
