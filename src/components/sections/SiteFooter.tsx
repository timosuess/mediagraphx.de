import Image from "next/image";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-grey-dark text-white">
      {/* Orange bar */}
      <div className="orange-bar" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/images/logo_mdgx_nav.png" alt="MediaGraphX" width={140} height={63}
                className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Full-Service Werbeagentur aus Altenkirchen im Westerwald.
              Kreativ, zuverlaessig, persoenlich. Seit 2002.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-orange inline-block" />
              Kontakt
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <p>Sehrtenbachstrasse 20<br />57610 Altenkirchen</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a href="tel:+4926819825015" className="hover:text-orange transition-colors">02681.9825-15</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                <a href="mailto:timo.suess@mdgx.de" className="hover:text-orange transition-colors">timo.suess@mdgx.de</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange shrink-0" />
                <span>www.mdgx.de</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-orange inline-block" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "#start", label: "Start" },
                { href: "#agentur", label: "Agentur" },
                { href: "#leistungen", label: "Leistungen" },
                { href: "#arbeiten", label: "Arbeiten" },
                { href: "#kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="text-white/60 hover:text-orange transition-colors text-sm">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-orange inline-block" />
              Leistungen
            </h4>
            <ul className="space-y-2.5">
              {["Webdesign", "Logoentwicklung", "Corporate Design", "Printwerbung", "SEO", "Fotografie"].map((s) => (
                <li key={s}>
                  <a href="#leistungen" className="text-white/60 hover:text-orange transition-colors text-sm">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter / CTA Bar */}
        <div className="mt-14 bg-orange rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-white text-lg">Neues Projekt? Sprechen Sie uns an!</p>
            <p className="text-white/70 text-sm">Wir beraten Sie gerne - kostenlos und unverbindlich.</p>
          </div>
          <a href="#kontakt" className="shrink-0 px-8 py-3 bg-white text-orange font-heading font-bold text-sm uppercase tracking-widest hover:bg-grey-dark hover:text-white transition-all duration-300">
            Kontakt
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} MediaGraphX. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-orange transition-colors">Impressum</a>
            <a href="#" className="hover:text-orange transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
