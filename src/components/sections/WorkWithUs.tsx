"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WorkWithUs() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(".wwu-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveals on scroll
      gsap.from(".wwu-text > *", {
        scrollTrigger: { trigger: ".wwu-text", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="wwu-bg absolute inset-[-20%] bg-grey-dark">
        <Image src="/images/portfolio-print.png" alt="" fill className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-grey-dark/70" />
      </div>

      <div className="wwu-text relative z-10 max-w-4xl mx-auto px-6 text-center md:text-left">
        <h3 className="font-heading font-bold text-orange text-sm uppercase tracking-[0.3em] mb-4">
          Zusammenarbeit
        </h3>
        <h2 className="text-3xl md:text-5xl text-white leading-tight mb-8" style={{ fontFamily: "var(--font-marker), cursive" }}>
          Seit ueber 20 Jahren gestalten wir erfolgreiche Markenauftritte im Westerwald
        </h2>
        <a href="#kontakt" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-block px-10 py-4 bg-orange text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300">
          Projekt anfragen
        </a>
      </div>
    </section>
  );
}
