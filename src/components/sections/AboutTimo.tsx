"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTimo() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = ref.current?.querySelector<HTMLElement>(".about-h2");
      if (h2) {
        const split = new SplitType(h2, { types: "lines,chars", tagName: "span" });
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 3,
          opacity: 0,
          stagger: 0.012,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: h2,
            start: "top 85%",
          },
        });
      }

      gsap.from(".about-fact", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-facts",
          start: "top 85%",
        },
      });

      // Portrait-Parallax
      gsap.to(".about-portrait", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="agentur"
      className="relative bg-[#f5ede1] text-[#141210] py-[clamp(100px,14vw,200px)] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.35em] text-[#d86c3f]">
          <span className="w-10 h-px bg-[#d86c3f]" />
          <span>Über die Agentur</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h2 className="about-h2 font-display font-light italic leading-[0.95] tracking-[-0.02em] text-[clamp(44px,6vw,100px)]">
              Seit 2002 <br />
              macht Timo <br />
              Marken sichtbar.
            </h2>

            <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-[#2b2621]">
              <p>
                MediaGraphX ist keine Agentur-Fabrik. Hier bekommst du <span className="font-display italic text-[#d86c3f]">einen</span> Ansprechpartner, der dein Projekt von der ersten Skizze bis zum fertigen Druck, dem neuen Fahrzeug oder der Website persönlich begleitet.
              </p>
              <p>
                Timo Suess gründete MediaGraphX mit dem Anspruch: Gutes Design muss sich anfühlen wie ein maßgeschneiderter Anzug – nicht wie Fließband-Ware. Das Studio sitzt im Westerwald, die Arbeiten reisen längst weiter.
              </p>
            </div>

            <div className="about-facts mt-14 grid grid-cols-3 gap-6 max-w-xl">
              <div className="about-fact">
                <div className="font-display font-light italic text-5xl md:text-6xl text-[#d86c3f]">22+</div>
                <div className="text-xs uppercase tracking-widest text-[#6a625a] mt-2">Jahre Erfahrung</div>
              </div>
              <div className="about-fact">
                <div className="font-display font-light italic text-5xl md:text-6xl text-[#d86c3f]">250+</div>
                <div className="text-xs uppercase tracking-widest text-[#6a625a] mt-2">Projekte</div>
              </div>
              <div className="about-fact">
                <div className="font-display font-light italic text-5xl md:text-6xl text-[#d86c3f]">1</div>
                <div className="text-xs uppercase tracking-widest text-[#6a625a] mt-2">Ansprechpartner</div>
              </div>
            </div>
          </div>

          {/* Studio-Desk (statt falschem Portrait – ehrlicher) */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="about-portrait relative aspect-[4/5] w-full max-w-[480px] ml-auto overflow-hidden bg-[#ece2d0]">
              <Image
                src="/generated/studio-desk.png"
                alt="Das Studio von MediaGraphX – Hände am Schreibtisch, Skizzen, warme Werkzeuge"
                fill
                className="object-cover"
                data-cursor="Im Studio"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
              {/* Warm light sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#141210]/10 via-transparent to-[#d86c3f]/10 pointer-events-none" />
            </div>
            <div className="font-script text-3xl italic text-[#d86c3f] mt-4 text-right">
              – Aus dem Studio, Westerwald
            </div>
          </div>
        </div>
      </div>

      {/* Deko-Linie */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#141210]/10" />
    </section>
  );
}
