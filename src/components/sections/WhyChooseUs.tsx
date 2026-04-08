"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { title: "Ueber 20 Jahre Erfahrung", text: "Seit 2002 gestalten wir erfolgreich Markenauftritte im Westerwald und darueber hinaus." },
  { title: "Alles aus einer Hand", text: "Von der Idee ueber das Konzept bis zum fertigen Produkt - ein Ansprechpartner." },
  { title: "Print & Digital", text: "Ob Broschuere oder Website - wir beherrschen beide Welten und verbinden sie nahtlos." },
  { title: "Persoenlich & Zuverlaessig", text: "Kein Call-Center. Bei uns sprechen Sie direkt mit dem Gestalter." },
  { title: "Qualitaet als Grundsatz", text: "Jedes Projekt bekommt die Aufmerksamkeit die es verdient." },
  { title: "Fair & Transparent", text: "Klare Kommunikation, faire Preise, keine versteckten Kosten." },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-item", {
        scrollTrigger: { trigger: ".why-grid", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="agentur" className="py-24 md:py-32 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-20">
          <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">Die Agentur</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary uppercase tracking-wide mb-6"
            style={{ fontFamily: "var(--font-marker), cursive" }}>
            Warum wir?
          </h2>
          <div className="h-px w-16 bg-orange mb-6" />
          <p className="text-text-secondary leading-relaxed">
            Wir sind nicht die groesste Agentur. Aber die persoenlichste.
          </p>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {reasons.map((r, i) => (
            <div key={r.title} className="why-item border-t border-dark-border p-8 hover:bg-dark-card transition-colors duration-300 group">
              <span className="text-orange font-heading font-bold text-sm mb-4 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-heading font-bold text-lg text-text-primary mb-3 group-hover:text-orange transition-colors">
                {r.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
