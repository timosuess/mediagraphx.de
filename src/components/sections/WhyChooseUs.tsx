"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { title: "Ueber 20 Jahre Erfahrung", text: "Seit 2002 gestalten wir erfolgreich Markenauftritte im Westerwald und darueber hinaus." },
  { title: "Alles aus einer Hand", text: "Von der Idee ueber das Konzept bis zum fertigen Produkt - Sie haben einen Ansprechpartner." },
  { title: "Print & Digital", text: "Ob Broschuere oder Website - wir beherrschen beide Welten und verbinden sie nahtlos." },
  { title: "Persoenlich & Zuverlaessig", text: "Kein Call-Center, kein Ticket-System. Bei uns sprechen Sie direkt mit dem Gestalter." },
  { title: "Qualitaet als Grundsatz", text: "Hochwertige Ergebnisse sind unser Anspruch. Jedes Projekt bekommt die Aufmerksamkeit die es verdient." },
  { title: "Fair & Transparent", text: "Klare Kommunikation, faire Preise, keine versteckten Kosten. Versprochen." },
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
    <section ref={ref} id="agentur" className="py-20 md:py-28 px-6 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-grey-dark uppercase tracking-wide mb-4">
            Warum MediaGraphX?
          </h2>
          <p className="text-grey-medium leading-relaxed italic">
            Wir sind nicht die groesste Agentur. Aber die persoenlichste.
            Und darauf sind wir stolz.
          </p>
        </div>

        <div className="text-center mb-12">
          <div className="inline-block relative w-full max-w-3xl aspect-[16/7] bg-grey-subtle overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading font-extrabold text-[8rem] md:text-[12rem] text-grey-subtle select-none leading-none">X</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-script text-2xl md:text-4xl text-orange">Idee. Konzept. Design.</p>
                <p className="text-grey-medium text-sm mt-2">Timo Suess — Inhaber & Mediengestalter</p>
              </div>
            </div>
          </div>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="why-item flex gap-4 p-6 hover:bg-white hover:shadow-md transition-all duration-300">
              <CheckCircle className="w-5 h-5 text-orange shrink-0 mt-1" strokeWidth={2} />
              <div>
                <h4 className="font-heading font-bold text-sm text-grey-dark uppercase tracking-wide mb-2">{r.title}</h4>
                <p className="text-grey-medium text-sm leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
