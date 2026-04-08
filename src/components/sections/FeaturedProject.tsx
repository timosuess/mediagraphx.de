"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-img", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".feat-text", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        x: 60, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          <div className="feat-img relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <Image src="/images/portfolio/mediagraphx_produktfoto.jpg" alt="MediaGraphX Projekt" fill className="object-cover" sizes="50vw" />
          </div>

          <div className="feat-text bg-dark-card p-8 md:p-16 flex flex-col justify-center border border-dark-border border-l-0">
            <div className="flex gap-8 mb-10">
              <div>
                <span className="font-heading font-extrabold text-5xl md:text-6xl text-orange/30 leading-none">20+</span>
                <p className="text-text-muted text-xs uppercase tracking-wider mt-1">Jahre</p>
              </div>
              <div>
                <span className="font-heading font-extrabold text-5xl md:text-6xl text-orange/30 leading-none">100%</span>
                <p className="text-text-muted text-xs uppercase tracking-wider mt-1">Persoenlich</p>
              </div>
            </div>

            <h3 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-4">
              Ihr Werbepartner im Westerwald
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              MediaGraphX steht fuer kreative Konzepte und hochwertige Umsetzung seit 2002.
              Von der Visitenkarte bis zum kompletten Markenauftritt - persoenlich, zuverlaessig, kreativ.
            </p>
            <a href="#agentur" onClick={(e) => { e.preventDefault(); document.querySelector("#agentur")?.scrollIntoView({ behavior: "smooth" }); }}
              className="text-orange font-heading font-bold text-sm uppercase tracking-widest hover:text-orange-light transition-colors">
              Mehr ueber uns &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
