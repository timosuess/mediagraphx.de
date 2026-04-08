"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { servicesAZ } from "@/data/services-az";

export default function ServicesAZ() {
  const [activeLetter, setActiveLetter] = useState("A");
  const gridRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const activeGroup = servicesAZ.find((g) => g.letter === activeLetter);

  const animateIn = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".az-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        onComplete: () => {
          isAnimating.current = false;
        },
      }
    );
  }, []);

  const switchLetter = useCallback(
    (letter: string) => {
      if (letter === activeLetter || isAnimating.current) return;
      isAnimating.current = true;

      if (!gridRef.current) {
        setActiveLetter(letter);
        return;
      }

      const cards = gridRef.current.querySelectorAll(".az-card");
      gsap.to(cards, {
        y: -30,
        opacity: 0,
        scale: 0.92,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          setActiveLetter(letter);
        },
      });
    },
    [activeLetter]
  );

  // Animate in when active letter changes
  useEffect(() => {
    // Small delay to let React render the new cards
    const timer = setTimeout(() => animateIn(), 50);
    return () => clearTimeout(timer);
  }, [activeLetter, animateIn]);

  // Initial entrance
  useEffect(() => {
    gsap.from(".az-hero-title", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.2,
    });
    gsap.from(".az-hero-sub", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.from(".az-letter-btn", {
      scale: 0,
      opacity: 0,
      duration: 0.35,
      stagger: 0.018,
      delay: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const currentIdx = servicesAZ.findIndex(
        (g) => g.letter === activeLetter
      );
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = servicesAZ[currentIdx + 1];
        if (next) switchLetter(next.letter);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = servicesAZ[currentIdx - 1];
        if (prev) switchLetter(prev.letter);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeLetter, switchLetter]);

  return (
    <>
      {/* Hero */}
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
          <h1 className="az-hero-title font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-grey-dark leading-[1.05] mb-6">
            Von A bis Z.
            <br />
            <span className="text-orange">Alles aus einer Hand.</span>
          </h1>
          <p className="az-hero-sub text-grey-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            Ueber 80 Leistungen - waehlen Sie einen Buchstaben und entdecken Sie unser Angebot.
          </p>
        </div>
      </div>

      {/* Letter Navigation */}
      <div className="sticky top-20 z-40 bg-warm-white/95 backdrop-blur-md border-b border-grey-light/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            {servicesAZ.map((group) => (
              <button
                key={group.letter}
                onClick={() => switchLetter(group.letter)}
                className={`az-letter-btn w-9 h-9 md:w-11 md:h-11 rounded-sm text-sm md:text-base font-heading font-bold transition-all duration-300 ${
                  activeLetter === group.letter
                    ? "bg-orange text-white shadow-lg shadow-orange-glow scale-110"
                    : "bg-grey-subtle text-grey-dark hover:bg-orange/10 hover:text-orange hover:scale-105"
                }`}
              >
                {group.letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Letter Display */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Letter header with counter */}
        <div className="flex items-center gap-6 mb-10">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-orange rounded-sm flex items-center justify-center shadow-xl shadow-orange-glow/30">
              <span className="text-white font-heading font-extrabold text-4xl md:text-5xl">
                {activeLetter}
              </span>
            </div>
          </div>
          <div>
            <div className="h-px w-24 md:w-40 bg-gradient-to-r from-orange/40 to-transparent mb-3" />
            <p className="text-grey-medium text-sm">
              {activeGroup?.services.length}{" "}
              {activeGroup?.services.length === 1 ? "Leistung" : "Leistungen"}
            </p>
          </div>

          {/* Giant background letter */}
          <div className="hidden lg:block ml-auto pointer-events-none select-none">
            <span className="text-[20vh] font-heading font-extrabold text-grey-subtle/50 leading-none">
              {activeLetter}
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[200px]"
        >
          {activeGroup?.services.map((service) => (
            <div
              key={service.name}
              className="az-card group p-6 md:p-7 bg-white rounded-sm border border-grey-light/40 hover:border-orange/40 transition-all duration-400 hover:shadow-xl hover:shadow-orange-glow/15 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-0 h-[3px] bg-orange group-hover:w-full transition-all duration-500" />

              {/* Letter watermark */}
              <div className="absolute -right-2 -bottom-4 pointer-events-none select-none">
                <span className="text-8xl font-heading font-extrabold text-grey-subtle/30 leading-none">
                  {activeLetter}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-heading font-bold text-lg md:text-xl text-grey-dark mb-2 group-hover:text-orange transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-grey-medium text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation hints */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-grey-light/30">
          {(() => {
            const currentIdx = servicesAZ.findIndex(
              (g) => g.letter === activeLetter
            );
            const prev = servicesAZ[currentIdx - 1];
            const next = servicesAZ[currentIdx + 1];
            return (
              <>
                <button
                  onClick={() => prev && switchLetter(prev.letter)}
                  disabled={!prev}
                  className="flex items-center gap-2 text-sm text-grey-medium hover:text-orange transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  <span className="text-lg">&larr;</span>
                  {prev ? (
                    <span>
                      <span className="font-heading font-bold">{prev.letter}</span>{" "}
                      - {prev.services[0]?.name}
                    </span>
                  ) : (
                    <span>Anfang</span>
                  )}
                </button>
                <span className="text-xs text-grey-light hidden md:block">
                  Pfeiltasten zum Navigieren
                </span>
                <button
                  onClick={() => next && switchLetter(next.letter)}
                  disabled={!next}
                  className="flex items-center gap-2 text-sm text-grey-medium hover:text-orange transition-colors disabled:opacity-30 disabled:cursor-default"
                >
                  {next ? (
                    <span>
                      {next.services[0]?.name} -{" "}
                      <span className="font-heading font-bold">{next.letter}</span>
                    </span>
                  ) : (
                    <span>Ende</span>
                  )}
                  <span className="text-lg">&rarr;</span>
                </button>
              </>
            );
          })()}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 px-6 bg-grey-subtle">
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
