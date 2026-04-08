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
    <section className="py-24 md:py-32 px-6 bg-dark border-y border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-12 h-12 text-orange/30 mx-auto mb-8" />

          <p className="text-text-primary text-xl md:text-2xl leading-relaxed italic mb-10 min-h-[120px]">
            &bdquo;{testimonials[active].text}&ldquo;
          </p>

          <div className="mb-8">
            <p className="font-heading font-bold text-orange uppercase tracking-wide text-sm">
              {testimonials[active].author}
            </p>
            <p className="text-text-muted text-sm">{testimonials[active].role}</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 border border-dark-border hover:border-orange flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4 text-text-secondary" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? "bg-orange" : "bg-dark-border"}`} />
              ))}
            </div>
            <button onClick={() => setActive((active + 1) % testimonials.length)}
              className="w-10 h-10 border border-dark-border hover:border-orange flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
