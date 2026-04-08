"use client";

import { useEffect, useState } from "react";
import { Menu, X, Clock, Mail as MailIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#start", label: "Start", anchor: true },
  { href: "#agentur", label: "Agentur", anchor: true },
  {
    href: "#leistungen",
    label: "Leistungen",
    anchor: true,
    children: [
      { href: "/fahrzeugbeschriftung", label: "Fahrzeugbeschriftung" },
    ],
  },
  { href: "#arbeiten", label: "Arbeiten", anchor: true },
  { href: "#kontakt", label: "Kontakt", anchor: true },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setDropdownOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass = "text-sm font-heading font-semibold text-text-secondary hover:text-orange transition-colors duration-300 uppercase tracking-wider";

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#0a0a0a] text-text-muted text-xs font-medium hidden md:block border-b border-dark-border">
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
      <nav className={`sticky top-0 z-50 transition-all duration-500 border-b border-dark-border ${
        scrolled ? "bg-dark/95 backdrop-blur-md" : "bg-dark"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
          <a href="#start" onClick={(e) => handleNavClick(e, "#start")} className="group">
            <Image src="/images/logo_mdgx_nav.png" alt="MediaGraphX" width={180} height={80} priority
              className="h-12 md:h-14 w-auto group-hover:opacity-80 transition-opacity brightness-0 invert" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}>
                  <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                    className={`${linkClass} flex items-center gap-1`}>
                    {link.label}
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </a>

                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                    dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}>
                    <div className="bg-dark-card border border-dark-border min-w-[220px]">
                      <a href={link.href} onClick={(e) => { handleNavClick(e, link.href); setDropdownOpen(false); }}
                        className="block px-5 py-3 text-sm font-heading font-semibold text-text-secondary hover:text-orange hover:bg-dark-surface transition-colors uppercase tracking-wider border-b border-dark-border">
                        Alle Leistungen
                      </a>
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-5 py-3 text-sm font-heading font-semibold text-text-secondary hover:text-orange hover:bg-dark-surface transition-colors uppercase tracking-wider">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className={linkClass}>
                  {link.label}
                </a>
              )
            )}
          </div>

          <button className="md:hidden text-text-secondary hover:text-orange transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 bg-dark-card ${
          mobileOpen ? "max-h-[400px] border-t border-dark-border" : "max-h-0"
        }`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <div key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-heading font-semibold text-text-secondary hover:text-orange transition-colors uppercase">
                  {link.label}
                </a>
                {link.children && (
                  <div className="ml-4 mt-3 flex flex-col gap-3 border-l-2 border-orange/30 pl-4">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                        className="text-base font-heading font-medium text-text-muted hover:text-orange transition-colors uppercase">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
