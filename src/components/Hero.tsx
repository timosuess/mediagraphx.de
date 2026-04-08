"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-logo", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      })
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            y: -10,
            duration: 0.5,
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="start"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-curves overflow-hidden"
    >
      {/* Decorative elements - inspired by the CI curved lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-[0.06]"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-200 600 C100 300 400 700 700 400 S1100 100 1600 500"
            stroke="#8C8C8C"
            strokeWidth="2"
          />
          <path
            d="M-100 700 C200 400 500 800 800 500 S1200 200 1700 600"
            stroke="#D4D4D4"
            strokeWidth="1.5"
          />
          <path
            d="M-300 500 C0 200 300 600 600 300 S1000 0 1500 400"
            stroke="#E8941A"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Corner fold - like the letterhead */}
      <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-orange to-orange-light transform origin-top-right" />
        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-orange-dark/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Full Logo Image */}
        <div className="hero-logo mb-8">
          <Image
            src="/images/logo_mdgx.png"
            alt="MediaGraphX - Idee. Konzept. Design."
            width={400}
            height={250}
            priority
            className="w-[280px] md:w-[380px] lg:w-[440px] h-auto"
          />
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-grey-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Ihr Partner fuer alles - Print und Digital.
          <br className="hidden md:block" />
          Werbeagentur aus Altenkirchen, seit 2002. Ueber 20 Jahre Erfahrung.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#leistungen"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#leistungen")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow hover:shadow-xl hover:shadow-orange-glow hover:-translate-y-0.5"
          >
            Unsere Leistungen
          </a>
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 border-2 border-grey-light text-grey-dark font-heading font-semibold text-sm uppercase tracking-widest hover:border-orange hover:text-orange transition-all duration-300 rounded-sm"
          >
            Kontakt
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-grey-medium uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-orange animate-bounce" />
      </div>

      {/* Orange bar at bottom - like the CI */}
      <div className="absolute bottom-0 left-0 right-0 orange-bar" />
    </section>
  );
}
