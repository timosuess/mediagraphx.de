"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Briefing",
    lead: "Wir reden. Lange. Und ich höre zu. Ziele, Zielgruppe, Kanäle, Ton, Tabus, Mitbewerb. Hier entscheidet sich, was richtig gut wird.",
  },
  {
    n: "02",
    title: "Konzept",
    lead: "Ich skizziere Ideen – von Hand, am Rechner, im Kopf. Die besten drei landen bei dir. Eine davon zünden wir durch.",
  },
  {
    n: "03",
    title: "Design",
    lead: "Jetzt wird gesetzt, gebaut, gepixelt. Mit einer Feedback-Runde pro Woche, damit nichts aus dem Ruder läuft.",
  },
  {
    n: "04",
    title: "Launch",
    lead: "Druck, Online, Folie, Messestand – und du weiter. Ich bleibe erreichbar, versprochen.",
  },
];

export default function ProcessPin() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = ref.current?.querySelector<HTMLElement>(".process-h2");
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

      const cards = gsap.utils.toArray<HTMLElement>(".process-step");

      // Pin container and fade steps in/out
      ScrollTrigger.create({
        trigger: ".process-pin-wrap",
        start: "top top",
        end: () => "+=" + cards.length * 400,
        pin: ".process-pin-inner",
        scrub: 0.5,
      });

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".process-pin-wrap",
              start: `top+=${i * 400} top`,
              end: `top+=${(i + 1) * 400} top`,
              scrub: 0.5,
              toggleActions: "play reverse play reverse",
            },
          }
        );
        if (i < cards.length - 1) {
          gsap.to(card, {
            opacity: 0,
            y: -40,
            duration: 0.6,
            ease: "power3.in",
            scrollTrigger: {
              trigger: ".process-pin-wrap",
              start: `top+=${(i + 1) * 400 - 100} top`,
              end: `top+=${(i + 1) * 400 + 100} top`,
              scrub: 0.5,
            },
          });
        }
      });

      // Progress bar
      gsap.to(".process-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-pin-wrap",
          start: "top top",
          end: () => "+=" + cards.length * 400,
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="prozess"
      className="relative bg-[#141210] text-[#f5ede1]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-[clamp(100px,14vw,200px)] pb-16">
        <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.35em] text-[#f4c95d]">
          <span className="w-10 h-px bg-[#f4c95d]" />
          <span>So arbeiten wir</span>
        </div>
        <h2 className="process-h2 font-display font-light italic leading-[0.95] tracking-[-0.02em] text-[clamp(44px,6vw,100px)]">
          Vier Schritte, <br />
          <span className="text-[#d86c3f]">eine Richtung.</span>
        </h2>
      </div>

      <div className="process-pin-wrap relative">
        <div className="process-pin-inner relative h-screen flex items-center justify-center overflow-hidden">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f5ede1]/10">
            <div className="process-progress-bar h-full bg-[#d86c3f] origin-left scale-x-0" />
          </div>

          <div className="relative max-w-[1440px] mx-auto w-full px-6 md:px-12">
            <div className="relative h-[60vh] flex items-center">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="process-step absolute inset-0 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-20 opacity-0"
                >
                  <div className="font-display italic font-light text-[clamp(120px,22vw,360px)] leading-[0.8] text-[#d86c3f]/90">
                    {s.n}
                  </div>
                  <div className="max-w-xl">
                    <h3 className="font-display italic font-light text-[clamp(36px,5vw,80px)] leading-[0.95]">
                      {s.title}
                    </h3>
                    <p className="mt-6 text-lg md:text-xl text-[#f5ede1]/75 leading-relaxed">
                      {s.lead}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Step-Counter */}
            <div className="absolute bottom-10 right-6 md:right-12 text-xs uppercase tracking-[0.3em] text-[#f5ede1]/50">
              {steps.length} Schritte · scroll
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
