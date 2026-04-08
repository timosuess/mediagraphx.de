"use client";

import { useEffect, useState } from "react";
import { Menu, X, Clock, Mail as MailIcon } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

const navLinks = [
  { href: "#start", label: "Start", anchor: true },
  { href: "#agentur", label: "Agentur", anchor: true },
  { href: "#leistungen", label: "Leistungen", anchor: true },
  { href: "/fahrzeugbeschriftung", label: "Fahrzeugbeschriftung", anchor: false },
  { href: "#arbeiten", label: "Arbeiten", anchor: true },
  { href: "#kontakt", label: "Kontakt", anchor: true },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-grey-dark text-white/70 text-xs font-medium hidden md:block">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-orange" />
              Mo - Fr: 9:00 - 18:00 Uhr
            </span>
            <span className="flex items-center gap-1.5">
              <MailIcon className="w-3 h-3 text-orange" />
              timo.suess@mdgx.de
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Tel: 02681.9825-15</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-white/95 backdrop-blur-md shadow-md"
          : "bg-warm-white"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
          <a href="#start" onClick={(e) => handleNavClick(e, "#start")} className="group">
            <Image src="/images/logo_mdgx_nav.png" alt="MediaGraphX" width={180} height={80} priority
              className="h-12 md:h-14 w-auto group-hover:opacity-80 transition-opacity" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.anchor ? (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-heading font-semibold text-grey-dark hover:text-orange transition-colors duration-300 uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-orange after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-opacity">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}
                  className="text-sm font-heading font-semibold text-grey-dark hover:text-orange transition-colors duration-300 uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-orange after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-opacity">
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button className="md:hidden text-grey-dark hover:text-orange transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 bg-warm-white ${
          mobileOpen ? "max-h-80 border-t border-grey-light/30" : "max-h-0"
        }`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) =>
              link.anchor ? (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-heading font-semibold text-grey-dark hover:text-orange transition-colors uppercase">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-lg font-heading font-semibold text-grey-dark hover:text-orange transition-colors uppercase">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
