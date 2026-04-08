"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-grey-dark text-white">
      {/* Orange bar at top */}
      <div className="orange-bar" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <Image
                src="/images/logo_mdgx_nav.png"
                alt="MediaGraphX"
                width={160}
                height={72}
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="font-script text-xl text-orange/80 mb-4">
              Idee. Konzept. Design.
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Full-Service Werbeagentur aus Altenkirchen im Westerwald.
              Kreativ, zuverlaessig, persoenlich.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] text-orange mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#start", label: "Start" },
                { href: "#agentur", label: "Agentur" },
                { href: "#leistungen", label: "Leistungen" },
                { href: "#arbeiten", label: "Arbeiten" },
                { href: "#kontakt", label: "Kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/60 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] text-orange mb-6">
              Kontakt
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>
                Timo Suess
                <br />
                Sehrtenbachstrasse 20
                <br />
                57610 Altenkirchen
              </p>
              <p>
                <a href="tel:+4926819825015" className="hover:text-orange transition-colors">
                  Telefon: 02681.9825-15
                </a>
              </p>
              <p>
                <a href="mailto:timo.suess@mdgx.de" className="hover:text-orange transition-colors">
                  timo.suess@mdgx.de
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {currentYear} MediaGraphX. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-orange transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-orange transition-colors">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
