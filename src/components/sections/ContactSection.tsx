"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActionState } from "react";
import { MapPin, Phone, Smartphone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactForm, type ContactFormState } from "@/app/actions/contact";

gsap.registerPlugin(ScrollTrigger);

const initialState: ContactFormState = { success: false, error: null };

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const formRef = useCallback((node: HTMLFormElement | null) => {
    if (node && formState.success) node.reset();
  }, []);

  const [formState, formAction, isPending] = useActionState(sendContactForm, initialState);

  return (
    <section ref={sectionRef} id="kontakt" className="py-20 md:py-28 px-6 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-grey-dark uppercase tracking-wide mb-4 contact-anim">
            Kontakt aufnehmen
          </h2>
          <p className="text-grey-medium leading-relaxed italic contact-anim">
            Sprechen Sie uns an - wir freuen uns auf Ihr Projekt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-4 contact-anim">
            <h3 className="font-heading font-bold text-xl text-grey-dark mb-2">Timo Suess</h3>
            <p className="text-grey-medium text-sm mb-8">Inhaber & Mediengestalter seit 2002</p>

            <div className="space-y-5">
              {[
                { Icon: MapPin, label: "Sehrtenbachstrasse 20", sub: "57610 Altenkirchen", href: "https://maps.google.com/?q=Sehrtenbachstrasse+20+57610+Altenkirchen" },
                { Icon: Phone, label: "02681.9825-15", sub: "Telefon", href: "tel:+4926819825015" },
                { Icon: Smartphone, label: "0170.5417934", sub: "Mobil", href: "tel:+491705417934" },
                { Icon: Mail, label: "timo.suess@mdgx.de", sub: "E-Mail", href: "mailto:timo.suess@mdgx.de" },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center transition-colors">
                    <c.Icon className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-grey-dark text-sm font-medium group-hover:text-orange transition-colors">{c.label}</p>
                    <p className="text-grey-medium text-xs">{c.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 p-5 bg-grey-subtle">
              <Clock className="w-4 h-4 text-orange shrink-0 mt-0.5" />
              <div className="text-sm text-grey-medium">
                <p className="font-medium text-grey-dark">Mo - Fr: 9:00 - 18:00 Uhr</p>
                <p>Termine nach Vereinbarung</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 contact-anim">
            <div className="bg-white p-8 md:p-12 shadow-sm border border-grey-light/20">
              <h3 className="font-heading font-bold text-xl text-grey-dark mb-2">Projekt anfragen</h3>
              <p className="text-grey-medium text-sm mb-8">Erzaehlen Sie uns von Ihrem Vorhaben.</p>

              {formState.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-green-700 text-sm">Vielen Dank! Wir melden uns zeitnah.</p>
                </div>
              )}
              {formState.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{formState.error}</p>
                </div>
              )}

              <form ref={formRef} action={formAction} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" name="name" required disabled={isPending} placeholder="Ihr Name *"
                    className="w-full px-4 py-3.5 bg-grey-subtle border-0 text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:ring-2 focus:ring-orange/20 text-sm disabled:opacity-50" />
                  <input type="email" name="email" required disabled={isPending} placeholder="E-Mail *"
                    className="w-full px-4 py-3.5 bg-grey-subtle border-0 text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:ring-2 focus:ring-orange/20 text-sm disabled:opacity-50" />
                </div>
                <select name="subject" disabled={isPending}
                  className="w-full px-4 py-3.5 bg-grey-subtle border-0 text-grey-dark focus:outline-none focus:ring-2 focus:ring-orange/20 text-sm disabled:opacity-50">
                  <option value="">Betreff waehlen...</option>
                  <option value="webdesign">Webdesign</option>
                  <option value="corporate">Corporate Design</option>
                  <option value="logo">Logoentwicklung</option>
                  <option value="print">Printwerbung</option>
                  <option value="seo">SEO / Online Marketing</option>
                  <option value="foto">Fotografie</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
                <textarea name="message" required disabled={isPending} rows={5} placeholder="Ihr Projekt..."
                  className="w-full px-4 py-3.5 bg-grey-subtle border-0 text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:ring-2 focus:ring-orange/20 text-sm resize-none disabled:opacity-50" />
                <button type="submit" disabled={isPending}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-orange text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 disabled:opacity-50">
                  {isPending ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Senden...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Nachricht senden</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
