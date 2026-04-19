"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  lead: string;
  image: string;
  href?: string;
  accent?: "terracotta" | "butter";
  span?: "wide" | "normal";
};

const services: Service[] = [
  {
    title: "Corporate Design",
    lead: "Logo, Schrift, Farbwelt, Bildsprache. Dein Auftritt – konsequent gedacht.",
    image: "/images/portfolio-logo.png",
    accent: "terracotta",
    span: "wide",
  },
  {
    title: "Webdesign",
    lead: "Schnelle, schöne, klickbare Seiten. Desktop bis Handy, SEO inklusive.",
    image: "/images/portfolio-webdesign.png",
    accent: "butter",
  },
  {
    title: "Fahrzeug­beschriftung",
    lead: "Das rollende Plakat. Planung, Design, Umsetzung – aus einer Hand.",
    image: "/images/portfolio-branding.png",
    href: "/fahrzeugbeschriftung",
    accent: "terracotta",
  },
  {
    title: "Print & Druck",
    lead: "Flyer, Broschüren, Magazine, Großformat. Haptik, die wirkt.",
    image: "/images/portfolio-print.png",
    accent: "butter",
  },
  {
    title: "Marketing",
    lead: "Kampagnen mit Konzept. Von der Strategie bis zum Post.",
    image: "/images/portfolio-marketing.png",
    accent: "terracotta",
  },
  {
    title: "Events & Messe",
    lead: "Stand, Roll-Up, Give-Away. Damit du auffällst – auch live.",
    image: "/images/portfolio-event.png",
    accent: "butter",
    span: "wide",
  },
];

export default function ServicesGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = ref.current?.querySelector<HTMLElement>(".services-h2");
      if (h2) {
        const split = new SplitType(h2, { types: "lines,chars", tagName: "span" });
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 3,
          opacity: 0,
          stagger: 0.01,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: h2, start: "top 85%" },
        });
      }

      gsap.from(".service-tile", {
        y: 80,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="leistungen"
      className="relative bg-[#141210] text-[#f5ede1] py-[clamp(100px,14vw,200px)] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.35em] text-[#f4c95d]">
              <span className="w-10 h-px bg-[#f4c95d]" />
              <span>Leistungen</span>
            </div>
            <h2 className="services-h2 font-display font-light italic leading-[0.95] tracking-[-0.02em] text-[clamp(44px,6vw,100px)]">
              Alles aus <br />
              <span className="text-[#d86c3f]">einer Hand.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-[#f5ede1]/70">
            Sechs Disziplinen – ein Studio. Keine Übergaben, keine Wartezeiten, kein Flüsterpost-Briefing zwischen drei Agenturen.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {services.map((s, i) => {
            const span = s.span === "wide" ? "md:col-span-4" : "md:col-span-2";
            const Tag = s.href ? Link : "div";
            return (
              <Tag
                key={i}
                href={s.href ?? "#"}
                data-cursor={s.href ? "Zur Seite" : "Anfragen"}
                className={`service-tile group relative ${span} overflow-hidden bg-[#1f1a15] aspect-[4/3] md:aspect-auto md:min-h-[380px] block`}
                onClick={(e) => {
                  if (!s.href) {
                    e.preventDefault();
                    document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-[1.04] transition-all duration-[800ms] ease-out"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                {/* Warm tint overlay */}
                <div
                  className={`absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-80 transition-opacity duration-500 ${
                    s.accent === "butter" ? "bg-[#f4c95d]" : "bg-[#d86c3f]"
                  }`}
                />
                {/* Darkness bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/60 to-transparent" />

                <div className="relative h-full flex flex-col justify-between p-6 md:p-10 z-10">
                  <div className="text-xs uppercase tracking-widest text-[#f5ede1]/60 font-medium">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-display italic font-light leading-[0.95] text-[clamp(28px,3.5vw,56px)] text-[#f5ede1] group-hover:text-[#141210] transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#f5ede1]/70 group-hover:text-[#141210]/80 transition-colors duration-500">
                      {s.lead}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#f5ede1] group-hover:text-[#141210] transition-colors duration-500">
                      <span>{s.href ? "Details ansehen" : "Jetzt anfragen"}</span>
                      <span className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
