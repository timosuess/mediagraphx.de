"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-logo", { y: 30, opacity: 0, duration: 0.9, delay: 0.3 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 0.9 }, "-=0.4")
        .from(".hero-claim", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-line", { scaleX: 0, duration: 0.8, transformOrigin: "left" }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="start" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="hero-logo mb-8">
          <Image src="/images/logo_mdgx.png" alt="MediaGraphX" width={400} height={250}
            className="w-[180px] md:w-[280px] lg:w-[340px] h-auto mx-auto" priority />
        </div>

        <h1 className="hero-title text-6xl md:text-8xl lg:text-[10rem] text-text-primary leading-[0.9] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-marker), cursive" }}>
          #kreatieffsinn
        </h1>

        <div className="hero-line h-px w-24 bg-orange mx-auto mb-8" />

        <p className="hero-claim text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          Idee. Konzept. Design. — Full-Service Werbeagentur im Westerwald seit 2002.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#leistungen" onClick={(e) => { e.preventDefault(); document.querySelector("#leistungen")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-10 py-4 bg-orange text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300">
            Leistungen
          </a>
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-10 py-4 border border-dark-border text-text-secondary font-heading font-bold text-sm uppercase tracking-widest hover:border-orange hover:text-orange transition-all duration-300">
            Kontakt
          </a>
        </div>
      </div>
    </section>
  );
}
