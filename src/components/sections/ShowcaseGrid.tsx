"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  client: string;
  year: string;
  tags: string[];
  image: string;
};

const projects: Project[] = [
  {
    title: "Markenauftritt DJK Marienstatt",
    client: "DJK Marienstatt",
    year: "2024",
    tags: ["Corporate Design", "Print"],
    image: "/mockups/MOCKUP_DJK-Marienstatt_Produktfoto.webp",
  },
  {
    title: "Dajanas Pferdedeckenwäscherei",
    client: "Dajana Wagner",
    year: "2024",
    tags: ["Logo", "Branding", "Webdesign"],
    image: "/mockups/MOCKUP_Dajanas-Pferdedeckenwaescherei_Produktfoto.webp",
  },
  {
    title: "Donnys Autoservice",
    client: "Donny Krummenauer",
    year: "2023",
    tags: ["Logo", "Fahrzeug"],
    image: "/mockups/MOCKUP_Donnys-Autoservice_Produktfoto.webp",
  },
  {
    title: "Familien-Wegweiser",
    client: "Kreisjugendamt",
    year: "2023",
    tags: ["Editorial", "Print"],
    image: "/mockups/MOCKUP_Familien-Wegweiser_Produktfoto.webp",
  },
  {
    title: "QMatix Branding",
    client: "QMatix GmbH",
    year: "2024",
    tags: ["Corporate", "Web"],
    image: "/mockups/MOCKUP_QMatix_Produktfoto.webp",
  },
  {
    title: "SEBU GmbH Relaunch",
    client: "SEBU",
    year: "2023",
    tags: ["Corporate", "Web", "Broschüre"],
    image: "/mockups/MOCKUP_SEBU-GmbH_Produktfoto.webp",
  },
  {
    title: "SSV Weyerbusch",
    client: "SSV Weyerbusch e.V.",
    year: "2024",
    tags: ["Sport", "Corporate"],
    image: "/mockups/MOCKUP_SSV-Weyerbusch_Produktfoto.webp",
  },
  {
    title: "Stadt Altenkirchen",
    client: "Stadt Altenkirchen",
    year: "2024",
    tags: ["Public", "Print", "Web"],
    image: "/mockups/MOCKUP_Stadt-Altenkirchen_Produktfoto.webp",
  },
  {
    title: "Vermessungsbüro Wassermann",
    client: "Wassermann",
    year: "2023",
    tags: ["Corporate", "Print"],
    image: "/mockups/MOCKUP_Vermessungsbuero-Wassermann_Produktfoto.webp",
  },
  {
    title: "netzGrip",
    client: "netzGrip GmbH",
    year: "2024",
    tags: ["Tech", "Web"],
    image: "/mockups/MOCKUP_netzGrip_Produktfoto.webp",
  },
];

export default function ShowcaseGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = ref.current?.querySelector<HTMLElement>(".showcase-h2");
      if (h2) {
        const split = new SplitType(h2, { types: "lines,chars", tagName: "span" });
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 3,
          opacity: 0,
          stagger: 0.012,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: h2, start: "top 85%" },
        });
      }

      // Parallax: alternierend schneller/langsamer
      ref.current?.querySelectorAll<HTMLElement>(".project-card").forEach((card, i) => {
        const speed = i % 2 === 0 ? -20 : -10;
        gsap.to(card.querySelector(".project-image"), {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="arbeiten"
      className="relative bg-[#f5ede1] text-[#141210] py-[clamp(100px,14vw,200px)] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.35em] text-[#d86c3f]">
              <span className="w-10 h-px bg-[#d86c3f]" />
              <span>Arbeiten · Auswahl</span>
            </div>
            <h2 className="showcase-h2 font-display font-light italic leading-[0.95] tracking-[-0.02em] text-[clamp(44px,6vw,100px)]">
              Marken, die <br />
              <span className="text-[#d86c3f]">wirken.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-[#2b2621]/80">
            Eine kleine Auswahl aus über 250 Projekten. Mehr gibt's im Gespräch – oder bei einem Kaffee im Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`project-card group ${i % 3 === 0 ? "md:col-span-2" : ""}`}
              data-cursor="Ansehen"
            >
              <div className={`relative overflow-hidden bg-[#ece2d0] ${i % 3 === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                <div className="project-image absolute inset-[-10%]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-[900ms] ease-out"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                {/* Terracotta wash on hover */}
                <div className="absolute inset-0 bg-[#d86c3f] mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="font-display italic font-light text-[clamp(22px,2.2vw,32px)] leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#6a625a] mt-1">
                    {p.client} · {p.year}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] uppercase tracking-widest text-[#d86c3f] border border-[#d86c3f]/40 rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
