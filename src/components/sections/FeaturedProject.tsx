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
    <section ref={ref} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* Image */}
          <div className="feat-img relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <Image src="/images/portfolio-branding.png" alt="Corporate Design Projekt" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
          </div>

          {/* Text */}
          <div className="feat-text bg-grey-subtle p-8 md:p-16 flex flex-col justify-center">
            <div className="flex gap-4 mb-8">
              <div>
                <span className="font-heading font-extrabold text-5xl md:text-6xl text-orange/20 leading-none">20+</span>
                <p className="text-grey-medium text-xs uppercase tracking-wider mt-1">Jahre</p>
              </div>
              <div>
                <span className="font-heading font-extrabold text-5xl md:text-6xl text-orange/20 leading-none">100%</span>
                <p className="text-grey-medium text-xs uppercase tracking-wider mt-1">Persoenlich</p>
              </div>
            </div>

            <h3 className="font-heading font-bold text-2xl md:text-3xl text-grey-dark mb-4">
              Ihr Werbepartner im Westerwald
            </h3>
            <p className="text-grey-medium leading-relaxed mb-6">
              MediaGraphX steht fuer kreative Konzepte und hochwertige Umsetzung seit 2002.
              Von der Visitenkarte bis zum kompletten Markenauftritt - wir begleiten Sie
              von der ersten Idee bis zum fertigen Produkt. Persoenlich, zuverlaessig, kreativ.
            </p>
            <a href="#agentur" onClick={(e) => { e.preventDefault(); document.querySelector("#agentur")?.scrollIntoView({ behavior: "smooth" }); }}
              className="text-orange font-heading font-bold text-sm uppercase tracking-widest hover:text-orange-dark transition-colors">
              Mehr ueber uns &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
