import Image from "next/image";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="orange-bar" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-6">
              <Image src="/images/logo_mdgx_nav.png" alt="MediaGraphX" width={140} height={63}
                className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Full-Service Werbeagentur aus Altenkirchen im Westerwald.
              Kreativ, zuverlaessig, persoenlich. Seit 2002.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-orange inline-block" />
              Kontakt
            </h4>
            <div className="space-y-3 text-sm text-white/40">
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

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-orange inline-block" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {["Start", "Agentur", "Leistungen", "Arbeiten", "Kontakt"].map((label) => (
                <li key={label}>
                  <a href={`#${label.toLowerCase()}`} className="text-white/40 hover:text-orange transition-colors text-sm">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1 h-3 bg-orange inline-block" />
              Leistungen
            </h4>
            <ul className="space-y-2.5">
              {["Webdesign", "Logoentwicklung", "Corporate Design", "Printwerbung", "SEO", "Fotografie"].map((s) => (
                <li key={s}>
                  <a href="#leistungen" className="text-white/40 hover:text-orange transition-colors text-sm">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 bg-orange p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-white text-lg">Neues Projekt?</p>
            <p className="text-white/70 text-sm">Kostenlos und unverbindlich beraten lassen.</p>
          </div>
          <a href="#kontakt" className="shrink-0 px-8 py-3 bg-dark text-orange font-heading font-bold text-sm uppercase tracking-widest hover:bg-dark-card transition-all duration-300">
            Kontakt
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} MediaGraphX. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-orange transition-colors">Impressum</a>
            <a href="#" className="hover:text-orange transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
