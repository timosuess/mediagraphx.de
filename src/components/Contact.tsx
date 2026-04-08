"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Smartphone, Mail, Globe, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".contact-form-area", {
        scrollTrigger: {
          trigger: ".contact-form-area",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="kontakt" className="py-28 md:py-40 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
            Kontakt
          </p>
          <h2 className="contact-heading font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1]">
            Lassen Sie uns
            <br />
            <span className="text-orange">sprechen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="contact-card">
              <h3 className="font-heading font-bold text-xl text-grey-dark mb-6">
                Timo Suess
              </h3>
              <p className="text-grey-medium mb-8 leading-relaxed">
                Inhaber von MediaGraphX. Sprechen Sie mich an - ich freue mich auf Ihr Projekt.
              </p>

              <div className="space-y-5">
                <a
                  href="https://maps.google.com/?q=Sehrtenbachstrasse+20+57610+Altenkirchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                    <MapPin className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-grey-dark font-medium">Sehrtenbachstrasse 20</p>
                    <p className="text-grey-medium text-sm">57610 Altenkirchen</p>
                  </div>
                </a>

                <a href="tel:+4926819825015" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-grey-dark font-medium group-hover:text-orange transition-colors">
                      02681.9825-15
                    </p>
                    <p className="text-grey-medium text-sm">Telefon</p>
                  </div>
                </a>

                <a href="tel:+491705417934" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                    <Smartphone className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-grey-dark font-medium group-hover:text-orange transition-colors">
                      0170.5417934
                    </p>
                    <p className="text-grey-medium text-sm">Mobil</p>
                  </div>
                </a>

                <a href="mailto:timo.suess@mdgx.de" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-grey-dark font-medium group-hover:text-orange transition-colors">
                      timo.suess@mdgx.de
                    </p>
                    <p className="text-grey-medium text-sm">E-Mail</p>
                  </div>
                </a>

                <a
                  href="https://www.mdgx.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                    <Globe className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-grey-dark font-medium group-hover:text-orange transition-colors">
                      www.mdgx.de
                    </p>
                    <p className="text-grey-medium text-sm">Web</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Opening hours hint */}
            <div className="contact-card flex items-start gap-4 p-6 bg-grey-subtle rounded-sm">
              <Clock className="w-5 h-5 text-orange shrink-0 mt-0.5" />
              <div>
                <p className="text-grey-dark font-medium text-sm">Erreichbarkeit</p>
                <p className="text-grey-medium text-sm mt-1">
                  Mo - Fr: 9:00 - 18:00 Uhr
                  <br />
                  Termine nach Vereinbarung
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="contact-form-area bg-grey-subtle rounded-sm p-8 md:p-12">
              <h3 className="font-heading font-bold text-2xl text-grey-dark mb-2">
                Projekt anfragen
              </h3>
              <p className="text-grey-medium mb-8">
                Erzaehlen Sie uns von Ihrem Vorhaben. Wir melden uns zeitnah.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-grey-dark mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white border border-grey-light/60 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/20 transition-all"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-grey-dark mb-2"
                    >
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-grey-light/60 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/20 transition-all"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-grey-dark mb-2"
                  >
                    Betreff
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-white border border-grey-light/60 rounded-sm text-grey-dark focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/20 transition-all"
                  >
                    <option value="">Bitte waehlen...</option>
                    <option value="webdesign">Webdesign</option>
                    <option value="corporate">Corporate Design</option>
                    <option value="logo">Logoentwicklung</option>
                    <option value="print">Printwerbung</option>
                    <option value="seo">SEO / Online Marketing</option>
                    <option value="foto">Fotografie</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-grey-dark mb-2"
                  >
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-grey-light/60 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/20 transition-all resize-none"
                    placeholder="Erzaehlen Sie uns von Ihrem Projekt..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-10 py-4 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow hover:shadow-xl hover:shadow-orange-glow hover:-translate-y-0.5"
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
