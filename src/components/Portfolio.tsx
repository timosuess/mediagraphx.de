"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Markenrelaunch",
    category: "Corporate Design",
    image: "/images/portfolio-branding.png",
    aspect: "landscape",
  },
  {
    title: "Responsive Webseite",
    category: "Webdesign",
    image: "/images/portfolio-webdesign.png",
    aspect: "portrait",
  },
  {
    title: "Produktkatalog",
    category: "Printwerbung",
    image: "/images/portfolio-print.png",
    aspect: "landscape",
  },
  {
    title: "Firmenbranding",
    category: "Markenentwicklung",
    image: "/images/portfolio-logo.png",
    aspect: "portrait",
  },
  {
    title: "Event-Fotografie",
    category: "Fotografie",
    image: "/images/portfolio-event.png",
    aspect: "landscape",
  },
  {
    title: "Online-Kampagne",
    category: "Online Marketing",
    image: "/images/portfolio-marketing.png",
    aspect: "landscape",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-heading", {
        scrollTrigger: {
          trigger: ".portfolio-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".portfolio-item", {
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="arbeiten" className="py-28 md:py-40 px-6 bg-grey-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
              Portfolio
            </p>
            <h2 className="portfolio-heading font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1]">
              Ausgewaehlte
              <br />
              <span className="text-orange">Arbeiten.</span>
            </h2>
          </div>
          <p className="text-grey-medium text-lg max-w-md leading-relaxed">
            Ein Auszug aus unseren Projekten. Jedes einzelne mit Herzblut und Praezision umgesetzt.
          </p>
        </div>

        {/* Portfolio Grid - Masonry-style */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`portfolio-item group relative overflow-hidden rounded-sm cursor-pointer ${
                i === 0 || i === 5 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  project.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                } ${i === 0 || i === 5 ? "aspect-[16/9]" : ""}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-orange text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-2">
                    {project.category}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-6 h-6 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
