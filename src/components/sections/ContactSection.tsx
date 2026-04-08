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

  const [formState, formAction, isPending] = useActionState(sendContactForm, initialState);

  const formRef = useCallback((node: HTMLFormElement | null) => {
    if (node && formState.success) node.reset();
  }, [formState.success]);

  return (
    <section ref={sectionRef} id="kontakt" className="py-24 md:py-32 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-20 contact-anim">
          <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">Kontakt</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary uppercase tracking-wide mb-6"
            style={{ fontFamily: "var(--font-marker), cursive" }}>
            Sprechen wir.
          </h2>
          <div className="h-px w-16 bg-orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 contact-anim">
            <h3 className="font-heading font-bold text-xl text-text-primary mb-2">Timo Suess</h3>
            <p className="text-text-muted text-sm mb-8">Inhaber & Mediengestalter seit 2002</p>

            <div className="space-y-5">
              {[
                { Icon: MapPin, label: "Sehrtenbachstrasse 20", sub: "57610 Altenkirchen", href: "https://maps.google.com/?q=Sehrtenbachstrasse+20+57610+Altenkirchen" },
                { Icon: Phone, label: "02681.9825-15", sub: "Telefon", href: "tel:+4926819825015" },
                { Icon: Smartphone, label: "0170.5417934", sub: "Mobil", href: "tel:+491705417934" },
                { Icon: Mail, label: "timo.suess@mdgx.de", sub: "E-Mail", href: "mailto:timo.suess@mdgx.de" },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-dark-card border border-dark-border group-hover:border-orange/40 flex items-center justify-center transition-colors">
                    <c.Icon className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium group-hover:text-orange transition-colors">{c.label}</p>
                    <p className="text-text-muted text-xs">{c.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 p-5 bg-dark-card border border-dark-border">
              <Clock className="w-4 h-4 text-orange shrink-0 mt-0.5" />
              <div className="text-sm text-text-muted">
                <p className="font-medium text-text-secondary">Mo - Fr: 9:00 - 18:00 Uhr</p>
                <p>Termine nach Vereinbarung</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 contact-anim">
            <div className="bg-dark-card border border-dark-border p-8 md:p-12">
              <h3 className="font-heading font-bold text-xl text-text-primary mb-2">Projekt anfragen</h3>
              <p className="text-text-muted text-sm mb-8">Erzaehlen Sie uns von Ihrem Vorhaben.</p>

              {formState.success && (
                <div className="mb-6 p-4 bg-green-900/30 border border-green-800 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-green-300 text-sm">Vielen Dank! Wir melden uns zeitnah.</p>
                </div>
              )}
              {formState.error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{formState.error}</p>
                </div>
              )}

              <form ref={formRef} action={formAction} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" name="name" required disabled={isPending} placeholder="Ihr Name *"
                    className="w-full px-4 py-3.5 bg-dark-surface border border-dark-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange text-sm disabled:opacity-50 transition-colors" />
                  <input type="email" name="email" required disabled={isPending} placeholder="E-Mail *"
                    className="w-full px-4 py-3.5 bg-dark-surface border border-dark-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange text-sm disabled:opacity-50 transition-colors" />
                </div>
                <select name="subject" disabled={isPending}
                  className="w-full px-4 py-3.5 bg-dark-surface border border-dark-border text-text-primary focus:outline-none focus:border-orange text-sm disabled:opacity-50 transition-colors">
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
                  className="w-full px-4 py-3.5 bg-dark-surface border border-dark-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-orange text-sm resize-none disabled:opacity-50 transition-colors" />
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
