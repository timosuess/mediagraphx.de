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
      // Image reveal with clip-path
      gsap.from(".feat-img-inner", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", end: "center center", scrub: 1 },
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(".feat-img-inner", { clipPath: "inset(0 0% 0 0)" });

      // Image parallax
      gsap.to(".feat-img-pic", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text slide in
      gsap.from(".feat-text-content > *", {
        scrollTrigger: { trigger: ".feat-text-content", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          <div className="feat-img-inner relative aspect-[4/3] lg:aspect-auto overflow-hidden">
            <Image src="/images/portfolio-branding.png" alt="Corporate Design Projekt" fill
              className="feat-img-pic object-cover scale-110" sizes="50vw" />
            <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
          </div>

          <div className="bg-grey-subtle p-8 md:p-16 flex flex-col justify-center">
            <div className="feat-text-content">
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
      </div>
    </section>
  );
}
