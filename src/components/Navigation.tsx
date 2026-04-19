"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#agentur", label: "Agentur" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#arbeiten", label: "Arbeiten" },
  { href: "#prozess", label: "Prozess" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [invert, setInvert] = useState(true); // true = auf dunklem Hero, helle Schrift

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Invert switch – Hero + ProcessPin sind dunkel, Rest hell
      // Einfache Heuristik: nach 80vh dunkel → cream, also invert=false (dunkle Schrift)
      setInvert(y < window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const textColor = invert ? "text-[#f5ede1]" : "text-[#141210]";
  const bgClass = scrolled
    ? invert
      ? "bg-[#141210]/70 backdrop-blur-md"
      : "bg-[#f5ede1]/80 backdrop-blur-md"
    : "bg-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${bgClass}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px] md:h-[88px]">
        {/* Brand */}
        <a
          href="#start"
          data-cursor="Nach oben"
          onClick={(e) => handleNavClick(e, "#start")}
          className={`font-display italic text-2xl md:text-3xl font-light tracking-tight ${textColor} transition-colors`}
        >
          mediagraphx<span className="text-[#d86c3f]">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor={l.label}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`text-xs uppercase tracking-[0.3em] ${textColor} opacity-80 hover:opacity-100 hover:text-[#d86c3f] transition-all link-underline`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            data-cursor="Projekt starten"
            onClick={(e) => handleNavClick(e, "#kontakt")}
            className="magnetic inline-flex items-center gap-2 bg-[#d86c3f] hover:bg-[#b8562e] text-[#141210] text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-colors"
          >
            Anfragen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          invert ? "bg-[#141210]/95" : "bg-[#f5ede1]/95"
        } backdrop-blur-md ${mobileOpen ? "max-h-[440px]" : "max-h-0"}`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`font-display italic text-3xl font-light ${textColor} hover:text-[#d86c3f] transition-colors`}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/fahrzeugbeschriftung"
            onClick={() => setMobileOpen(false)}
            className={`font-display italic text-lg font-light ${textColor} opacity-60`}
          >
            Fahrzeugbeschriftung →
          </Link>
        </div>
      </div>
    </nav>
  );
}
