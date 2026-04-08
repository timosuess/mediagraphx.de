"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#start", label: "Start" },
  { href: "#agentur", label: "Agentur" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#arbeiten", label: "Arbeiten" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(232,148,26,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <a
          href="#start"
          onClick={(e) => handleNavClick(e, "#start")}
          className="group"
        >
          <Image
            src="/images/logo_mdgx_nav.png"
            alt="MediaGraphX"
            width={160}
            height={72}
            priority
            className="h-10 md:h-12 w-auto group-hover:opacity-80 transition-opacity duration-300"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-grey-dark hover:text-orange transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-grey-dark hover:text-orange transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-warm-white/95 backdrop-blur-md ${
          mobileOpen ? "max-h-80 border-b border-orange/10" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-heading font-semibold text-grey-dark hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
