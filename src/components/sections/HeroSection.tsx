"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-sub", { y: 30, opacity: 0, duration: 0.7, delay: 0.3 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 0.9 }, "-=0.4")
        .from(".hero-claim", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="start" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-grey-dark">
        <Image src="/images/portfolio-branding.png" alt="" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-grey-dark/80 via-grey-dark/60 to-grey-dark/90" />
      </div>

      {/* Corner fold */}
      <div className="absolute top-0 right-0 w-16 h-16 md:w-28 md:h-28 z-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="0,0 100,0 100,100" fill="#E8941A" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="hero-sub mb-6">
          <Image src="/images/logo_mdgx.png" alt="MediaGraphX" width={400} height={250}
            className="w-[200px] md:w-[300px] lg:w-[360px] h-auto mx-auto" />
        </div>
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl text-white leading-[1] tracking-tight mb-6" style={{ fontFamily: "var(--font-marker), cursive" }}>
          #kreatieffsinn
        </h1>
        <p className="hero-claim text-white/70 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-10">
          Idee. Konzept. Design. — Ihre Full-Service Werbeagentur im Westerwald seit 2002.
        </p>
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#leistungen" onClick={(e) => { e.preventDefault(); document.querySelector("#leistungen")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-10 py-4 bg-orange text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300">
            Leistungen entdecken
          </a>
          <a href="#arbeiten" onClick={(e) => { e.preventDefault(); document.querySelector("#arbeiten")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-10 py-4 border-2 border-white/30 text-white font-heading font-bold text-sm uppercase tracking-widest hover:border-orange hover:text-orange transition-all duration-300">
            Unsere Arbeiten
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 orange-bar" />
    </section>
  );
}
