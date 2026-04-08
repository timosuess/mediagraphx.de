"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "MediaGraphX hat unseren kompletten Markenauftritt ueberarbeitet - vom Logo bis zur Website. Das Ergebnis hat unsere Erwartungen uebertroffen. Kreativ, professionell und immer erreichbar.",
    author: "Zufriedener Kunde",
    role: "Unternehmer aus dem Westerwald",
  },
  {
    text: "Seit ueber 10 Jahren vertrauen wir auf MediaGraphX. Ob Flyer, Broschuere oder Online-Kampagne - die Qualitaet stimmt immer. Ein Partner auf den man sich verlassen kann.",
    author: "Langjaehriger Kunde",
    role: "Mittelstaendisches Unternehmen",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-grey-dark uppercase tracking-wide mb-4">
            Das sagen unsere Kunden
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <Quote className="w-12 h-12 text-orange/20 mx-auto mb-6" />

          <p className="text-grey-dark text-lg md:text-xl leading-relaxed italic mb-8 min-h-[120px]">
            &bdquo;{testimonials[active].text}&ldquo;
          </p>

          <div className="mb-8">
            <p className="font-heading font-bold text-grey-dark uppercase tracking-wide text-sm">
              {testimonials[active].author}
            </p>
            <p className="text-grey-medium text-sm">{testimonials[active].role}</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 border border-grey-light hover:border-orange flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4 text-grey-dark" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? "bg-orange" : "bg-grey-light"}`} />
              ))}
            </div>
            <button onClick={() => setActive((active + 1) % testimonials.length)}
              className="w-10 h-10 border border-grey-light hover:border-orange flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-grey-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
