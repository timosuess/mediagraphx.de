"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = ref.current?.querySelector<HTMLElement>(".contact-h2");
      if (h2) {
        const split = new SplitType(h2, { types: "lines,chars", tagName: "span" });
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 3,
          opacity: 0,
          stagger: 0.015,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: h2, start: "top 85%" },
        });
      }

      const mail = ref.current?.querySelector<HTMLElement>(".contact-mail");
      if (mail) {
        const split = new SplitType(mail, { types: "chars", tagName: "span" });
        gsap.from(split.chars, {
          y: 30,
          opacity: 0,
          stagger: 0.012,
          duration: 0.7,
          ease: "power4.out",
          scrollTrigger: { trigger: mail, start: "top 85%" },
        });
      }

      gsap.from(".contact-card", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-cards", start: "top 85%" },
      });

      gsap.from(".contact-cta", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-cta-row", start: "top 90%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="kontakt"
      className="relative bg-[#f5ede1] text-[#141210] py-[clamp(100px,14vw,200px)] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.35em] text-[#d86c3f]">
          <span className="w-10 h-px bg-[#d86c3f]" />
          <span>Kontakt</span>
        </div>

        {/* Mega-Headline */}
        <h2 className="contact-h2 font-display font-light italic leading-[0.9] tracking-[-0.02em] text-[clamp(52px,8vw,140px)] max-w-5xl">
          Reden wir <br />
          <span className="text-[#d86c3f]">über dein Projekt.</span>
        </h2>

        {/* Email zentral – groß, aber unterhalb der H2, nicht rechts daneben */}
        <div className="mt-20 md:mt-28 border-t border-[#141210]/10 pt-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6a625a] mb-6">
            Schreib uns direkt
          </p>
          <a
            href="mailto:timo.suess@mdgx.de"
            data-cursor="E-Mail schreiben"
            className="contact-mail group inline-flex flex-wrap items-center gap-x-4 gap-y-2 font-display italic font-light text-[clamp(36px,6vw,96px)] leading-[0.95] text-[#141210] hover:text-[#d86c3f] transition-colors duration-500 max-w-full break-all"
          >
            <span className="break-all">timo.suess@mdgx.de</span>
            <ArrowUpRight className="w-[0.6em] h-[0.6em] shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </a>
        </div>

        {/* Info-Cards: Phone | Allgemein | Studio */}
        <div className="contact-cards mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#141210]/10">
          <div className="contact-card bg-[#f5ede1] p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#6a625a] mb-4 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#d86c3f]" /> Telefon
            </div>
            <a
              href="tel:+492681982515"
              data-cursor="Anrufen"
              className="font-display italic font-light text-2xl md:text-3xl leading-tight hover:text-[#d86c3f] transition-colors"
            >
              02681<br />9825-15
            </a>
          </div>
          <div className="contact-card bg-[#f5ede1] p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#6a625a] mb-4 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#d86c3f]" /> Allgemein
            </div>
            <a
              href="mailto:info@mdgx.de"
              data-cursor="E-Mail"
              className="font-display italic font-light text-2xl md:text-3xl leading-tight hover:text-[#d86c3f] transition-colors break-all"
            >
              info@<br />mdgx.de
            </a>
          </div>
          <div className="contact-card bg-[#f5ede1] p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#6a625a] mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d86c3f]" /> Studio
            </div>
            <p className="font-display italic font-light text-2xl md:text-3xl leading-tight">
              Altenkirchen<br />Westerwald
            </p>
          </div>
        </div>

        {/* CTA-Row */}
        <div className="contact-cta-row mt-12 md:mt-16 flex flex-wrap items-center gap-4">
          <a
            href="mailto:timo.suess@mdgx.de"
            data-cursor="Projekt starten"
            className="contact-cta magnetic inline-flex items-center gap-3 bg-[#141210] hover:bg-[#d86c3f] text-[#f5ede1] px-8 py-4 text-sm uppercase tracking-[0.15em] transition-colors"
          >
            Projekt starten
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/491705417934"
            target="_blank"
            rel="noopener"
            data-cursor="WhatsApp"
            className="contact-cta magnetic inline-flex items-center gap-3 border border-[#141210]/30 hover:border-[#141210] text-[#141210] px-8 py-4 text-sm uppercase tracking-[0.15em] link-underline"
          >
            WhatsApp
          </a>
          <span className="contact-cta ml-auto text-xs uppercase tracking-[0.3em] text-[#6a625a] hidden md:inline">
            Antwortzeit · meist unter 24&thinsp;h
          </span>
        </div>
      </div>
    </section>
  );
}
