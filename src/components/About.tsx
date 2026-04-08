"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Compass, Palette, Award, BookOpen, Monitor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Lightbulb,
    title: "Idee",
    text: "Am Anfang steht die zuendende Idee. Wir denken kreativ, quer und immer im Sinne Ihrer Zielgruppe.",
  },
  {
    icon: Compass,
    title: "Konzept",
    text: "Aus der Idee wird eine Strategie. Durchdacht, zielgerichtet und mit klarem Fahrplan fuer Ihren Erfolg.",
  },
  {
    icon: Palette,
    title: "Design",
    text: "Das Konzept bekommt ein Gesicht. Visuell ueberzeugend, technisch einwandfrei und unverwechselbar.",
  },
];

const vita = [
  {
    year: "2001",
    icon: BookOpen,
    title: "Mediengestalter",
    text: "Abschluss der Ausbildung zum Mediengestalter - das Fundament fuer alles Weitere.",
  },
  {
    year: "2002",
    icon: Award,
    title: "Selbststaendig",
    text: "Gruendung von MediaGraphX. Seitdem ueber 20 Jahre Erfahrung in Print und Digital.",
  },
  {
    year: "Weiter",
    icon: Monitor,
    title: "Medienfachwirt & Digital",
    text: "Medienfachwirt, digitale Bausteine, Ausbilderschein - stetige Weiterentwicklung.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".about-quote", {
        scrollTrigger: {
          trigger: ".about-quote",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".pillar-card", {
        scrollTrigger: {
          trigger: ".pillar-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".vita-item", {
        scrollTrigger: {
          trigger: ".vita-timeline",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-bar",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="agentur" className="py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header area - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-5">
            <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
              Ueber uns
            </p>
            <h2 className="about-heading font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1]">
              Ihr Partner
              <br />
              <span className="text-orange">fuer alles.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="about-text text-grey-medium text-lg md:text-xl leading-relaxed max-w-2xl">
              MediaGraphX ist Ihre Werbeagentur im Westerwald - seit 2002. Von Print bis Digital,
              von der ersten Idee bis zum fertigen Produkt: Alles aus einer Hand. Mit ueber 20 Jahren
              Erfahrung wissen wir, was funktioniert - und was Ihre Marke wirklich braucht.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { value: "20+", label: "Jahre Erfahrung" },
            { value: "2002", label: "Gruendungsjahr" },
            { value: "Print", label: "& Digital" },
            { value: "100%", label: "Persoenlich" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 bg-white rounded-sm border border-grey-light/30"
            >
              <p className="font-heading font-extrabold text-3xl md:text-4xl text-orange mb-1">
                {stat.value}
              </p>
              <p className="text-grey-medium text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-card group p-8 md:p-10 bg-white rounded-sm border border-grey-light/50 hover:border-orange/30 transition-all duration-500 hover:shadow-lg hover:shadow-orange-glow/30"
            >
              <div className="w-14 h-14 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center mb-6 transition-colors duration-300">
                <pillar.icon className="w-6 h-6 text-orange" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-bold text-2xl text-grey-dark mb-3">
                {pillar.title}
              </h3>
              <p className="text-grey-medium leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>

        {/* Vita Timeline */}
        <div className="vita-timeline mb-24">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-grey-dark mb-10">
            Der Weg von <span className="text-orange">Timo Suess</span>
          </h3>
          <div className="space-y-6">
            {vita.map((item) => (
              <div
                key={item.year}
                className="vita-item flex items-start gap-6 p-6 md:p-8 bg-white rounded-sm border border-grey-light/30 hover:border-orange/20 transition-all duration-300"
              >
                <div className="shrink-0 w-16 h-16 bg-orange/10 rounded-sm flex flex-col items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange mb-1" strokeWidth={1.5} />
                  <span className="text-[10px] font-heading font-bold text-orange uppercase">
                    {item.year}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-grey-dark mb-1">
                    {item.title}
                  </h4>
                  <p className="text-grey-medium leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Henry Ford Quote */}
        <div className="about-quote relative bg-grey-subtle rounded-sm p-10 md:p-16 overflow-hidden">
          <div className="absolute top-4 left-6 text-[120px] md:text-[180px] font-script text-orange/10 leading-none select-none">
            &ldquo;
          </div>
          <blockquote className="relative z-10">
            <p className="font-script text-2xl md:text-3xl lg:text-4xl text-grey-dark leading-snug max-w-4xl">
              &bdquo;Wer aufhoert zu werben um Geld zu sparen, kann ebenso gut seine Uhr anhalten
              um Zeit zu sparen.&ldquo;
            </p>
            <footer className="mt-6 text-orange font-heading font-semibold text-sm uppercase tracking-[0.2em]">
              Henry Ford
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
