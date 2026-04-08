"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "next/image";
import { gsap } from "gsap";
import {
  Globe,
  PenTool,
  Printer,
  Search,
  Camera,
  Layers,
  Monitor,
  FileCode,
  MapPin,
  Phone,
  Smartphone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

/* ─── Data ─── */
const navAnchors = ["start", "agentur", "leistungen", "arbeiten", "kontakt"];
const navLabels = ["Start", "Agentur", "Leistungen", "Arbeiten", "Kontakt"];

const services = [
  { icon: Globe, title: "Webdesign", desc: "Moderne, responsive Internetseiten die begeistern und verkaufen." },
  { icon: PenTool, title: "Logoentwicklung", desc: "Ein Logo ist die Essenz Ihrer Marke. Wir entwickeln Zeichen die bleiben." },
  { icon: Layers, title: "Corporate Design", desc: "Vom Briefbogen bis zur Fahrzeugbeschriftung - einheitlich und unverwechselbar." },
  { icon: Printer, title: "Printwerbung", desc: "Flyer, Broschueren, Plakate. Druckprodukte die in der Hand ueberzeugen." },
  { icon: Search, title: "SEO", desc: "Gefunden werden, wenn es zaehlt. Suchmaschinenoptimierung mit Ergebnis." },
  { icon: Camera, title: "Fotografie", desc: "Professionelle Bilder erzaehlen Ihre Geschichte. Produkt bis Portrait." },
  { icon: Monitor, title: "Online Marketing", desc: "Strategische Praesenz mit messbaren Ergebnissen. Social Media und Kampagnen." },
  { icon: FileCode, title: "Markenentwicklung", desc: "Von der Namensfindung bis zur Markenstrategie - Vertrauen schaffen." },
];

const projects = [
  { title: "Markenrelaunch", category: "Corporate Design", image: "/images/portfolio-branding.png" },
  { title: "Responsive Webseite", category: "Webdesign", image: "/images/portfolio-webdesign.png" },
  { title: "Produktkatalog", category: "Printwerbung", image: "/images/portfolio-print.png" },
  { title: "Firmenbranding", category: "Markenentwicklung", image: "/images/portfolio-logo.png" },
  { title: "Event-Fotografie", category: "Fotografie", image: "/images/portfolio-event.png" },
  { title: "Online-Kampagne", category: "Online Marketing", image: "/images/portfolio-marketing.png" },
];

/* ─── Animate section on enter ─── */
function useSlideIn(sectionIndex: number, activeSection: number) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (activeSection !== sectionIndex || animated.current || !ref.current) return;
    animated.current = true;

    const el = ref.current;
    const heading = el.querySelector(".anim-heading");
    const sub = el.querySelector(".anim-sub");
    const items = el.querySelectorAll(".anim-item");
    const accent = el.querySelector(".anim-accent");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heading) {
      tl.from(heading, { y: 80, opacity: 0, duration: 0.9, delay: 0.1 });
    }
    if (sub) {
      tl.from(sub, { y: 40, opacity: 0, duration: 0.7 }, "-=0.5");
    }
    if (items.length) {
      tl.from(items, { y: 50, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.4");
    }
    if (accent) {
      tl.from(accent, { scaleX: 0, duration: 0.8, transformOrigin: "left" }, "-=0.6");
    }
  }, [activeSection, sectionIndex]);

  return ref;
}

/* ─── Corner Fold SVG ─── */
function CornerFold({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute top-0 right-0 z-20 pointer-events-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="0,0 100,0 100,100" fill="#E8941A" />
        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/* ─── Decorative curves ─── */
function Curves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full opacity-[0.06]" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
        <path d="M-200 650 C100 350 400 750 700 450 S1100 150 1600 550" stroke="#8C8C8C" strokeWidth="2" />
        <path d="M-100 750 C200 450 500 850 800 550 S1200 250 1700 650" stroke="#D4D4D4" strokeWidth="1.5" />
        <path d="M-300 550 C0 250 300 650 600 350 S1000 50 1500 450" stroke="#E8941A" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function FullPageSite() {
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useSlideIn(0, activeSection);
  const aboutRef = useSlideIn(1, activeSection);
  const servicesRef = useSlideIn(2, activeSection);
  const portfolioRef = useSlideIn(3, activeSection);
  const contactRef = useSlideIn(4, activeSection);

  const onLeave = useCallback(
    (_origin: unknown, destination: { index: number }) => {
      setActiveSection(destination.index);
    },
    []
  );

  return (
    <>
      {/* ─── Nav ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        activeSection > 0
          ? "bg-warm-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(232,148,26,0.15)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <a href="#start" className="group">
            <Image src="/images/logo_mdgx_nav.png" alt="MediaGraphX" width={160} height={72} priority
              className="h-10 md:h-12 w-auto group-hover:opacity-80 transition-opacity" />
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLabels.map((label, i) => (
              <a key={label} href={`#${navAnchors[i]}`}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  activeSection === i ? "text-orange" : "text-grey-dark hover:text-orange"
                }`}>{label}</a>
            ))}
          </div>
          <button className="md:hidden text-grey-dark hover:text-orange transition-colors"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <span className="text-2xl">&times;</span> : <span className="text-xl">&#9776;</span>}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-500 bg-warm-white/95 backdrop-blur-md ${
          menuOpen ? "max-h-80 border-b border-orange/10" : "max-h-0"
        }`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLabels.map((label, i) => (
              <a key={label} href={`#${navAnchors[i]}`} onClick={() => setMenuOpen(false)}
                className="text-lg font-heading font-semibold text-grey-dark hover:text-orange transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Sidebar ─── */}
      <div className="fixed left-6 bottom-8 z-40 hidden lg:flex flex-col items-center gap-3">
        <span className="text-xs text-grey-medium/60 tracking-[0.2em] font-medium writing-vertical-lr rotate-180 select-none">
          www.<span className="text-orange font-bold">mdgx</span>.de
        </span>
        <div className="w-px h-12 bg-orange/30" />
      </div>

      {/* ─── fullPage ─── */}
      <ReactFullpage
        licenseKey="" credits={{ enabled: false }}
        scrollingSpeed={900} anchors={navAnchors}
        navigationTooltips={navLabels} onLeave={onLeave}
        css3 easing="easeInOutCubic" fitToSection
        keyboardScrolling scrollOverflow responsiveWidth={768}
        render={() => (
          <ReactFullpage.Wrapper>

            {/* ═══ HERO ═══ */}
            <div className="section">
              <div ref={heroRef} className="relative w-full h-full flex items-center px-6 md:px-16 lg:px-24 bg-warm-white overflow-hidden">
                <Curves />
                <CornerFold className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40" />

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left: Text */}
                  <div>
                    <div className="anim-heading">
                      <Image src="/images/logo_mdgx.png" alt="MediaGraphX" width={400} height={250} priority
                        className="w-48 md:w-64 h-auto mb-8" />
                      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold text-grey-dark leading-[0.95] tracking-tight">
                        Wir
                        <br />
                        gestalten
                        <br />
                        <span className="text-orange">Marken.</span>
                      </h1>
                    </div>
                    <div className="anim-accent h-1 w-24 bg-orange mt-8 mb-8 rounded-full" />
                    <p className="anim-sub text-grey-medium text-lg md:text-xl max-w-md leading-relaxed">
                      Werbeagentur im Westerwald. Print & Digital. Seit 2002.
                    </p>
                    <div className="anim-item flex gap-4 mt-10">
                      <a href="#leistungen" className="px-8 py-4 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow hover:-translate-y-0.5">
                        Leistungen
                      </a>
                      <a href="#kontakt" className="px-8 py-4 border-2 border-grey-dark text-grey-dark font-heading font-semibold text-sm uppercase tracking-widest hover:border-orange hover:text-orange transition-all duration-300 rounded-sm">
                        Kontakt
                      </a>
                    </div>
                  </div>

                  {/* Right: Large statement */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="relative">
                      <span className="font-heading font-extrabold text-[12rem] xl:text-[16rem] text-grey-subtle/40 leading-none select-none">
                        X
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-script text-3xl text-orange">Idee.</p>
                          <p className="font-script text-3xl text-orange">Konzept.</p>
                          <p className="font-script text-3xl text-orange">Design.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ AGENTUR ═══ */}
            <div className="section">
              <div ref={aboutRef} className="relative w-full h-full flex items-center px-6 md:px-16 lg:px-24 bg-warm-white overflow-hidden">
                <Curves />
                <CornerFold className="w-16 h-16 md:w-24 md:h-24" />

                <div className="max-w-7xl mx-auto w-full py-24 md:py-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                    {/* Left col */}
                    <div className="lg:col-span-7">
                      <p className="anim-item text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
                        Die Agentur
                      </p>
                      <h2 className="anim-heading font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-grey-dark leading-[0.95] tracking-tight mb-8">
                        Ueber 20 Jahre
                        <br />
                        <span className="text-orange">Erfahrung.</span>
                      </h2>
                      <div className="anim-accent h-1 w-20 bg-orange mb-8 rounded-full" />
                      <p className="anim-sub text-grey-medium text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                        MediaGraphX ist Timo Suess. Mediengestalter, Medienfachwirt, Ausbilder.
                        Seit 2002 der Partner fuer Print und Digital im Westerwald.
                        Persoenlich, zuverlaessig, kreativ.
                      </p>

                      {/* Idee Konzept Design - horizontal */}
                      <div className="anim-item grid grid-cols-3 gap-3 md:gap-6">
                        {["Idee", "Konzept", "Design"].map((w, i) => (
                          <div key={w} className="relative group">
                            <span className="absolute -top-4 -left-1 font-heading font-extrabold text-5xl md:text-7xl text-grey-subtle/50 select-none leading-none">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="relative pt-8 md:pt-12">
                              <h3 className="font-heading font-bold text-xl md:text-2xl text-grey-dark group-hover:text-orange transition-colors">
                                {w}<span className="text-orange">.</span>
                              </h3>
                              <p className="text-grey-medium text-xs md:text-sm mt-2 leading-relaxed">
                                {i === 0 && "Kreativ denken, quer denken, Zielgruppe verstehen."}
                                {i === 1 && "Strategie entwickeln, Fahrplan erstellen, Ziele setzen."}
                                {i === 2 && "Visuell umsetzen, begeistern, liefern."}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right col - stats */}
                    <div className="lg:col-span-5">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: "2002", label: "Gruendung", size: "text-4xl md:text-5xl" },
                          { value: "20+", label: "Jahre Erfahrung", size: "text-4xl md:text-5xl" },
                          { value: "Print", label: "& Digital", size: "text-3xl md:text-4xl" },
                          { value: "100%", label: "Persoenlich", size: "text-3xl md:text-4xl" },
                        ].map((s) => (
                          <div key={s.label} className="anim-item p-6 md:p-8 bg-white rounded-sm border border-grey-light/20 hover:border-orange/30 transition-all duration-500 group">
                            <p className={`font-heading font-extrabold ${s.size} text-orange mb-2 group-hover:scale-105 transition-transform origin-left`}>
                              {s.value}
                            </p>
                            <p className="text-grey-medium text-xs md:text-sm uppercase tracking-wider">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ LEISTUNGEN ═══ */}
            <div className="section">
              <div ref={servicesRef} className="relative w-full h-full flex items-center px-6 md:px-16 lg:px-24 bg-white overflow-hidden">
                <Curves />
                <CornerFold className="w-16 h-16 md:w-24 md:h-24" />

                <div className="max-w-7xl mx-auto w-full py-24 md:py-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Left - Header */}
                    <div className="lg:col-span-4 lg:sticky lg:top-0">
                      <p className="anim-item text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
                        Leistungen
                      </p>
                      <h2 className="anim-heading font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-grey-dark leading-[0.95] tracking-tight mb-6">
                        Full
                        <br />
                        Service<span className="text-orange">.</span>
                      </h2>
                      <div className="anim-accent h-1 w-16 bg-orange mb-6 rounded-full" />
                      <p className="anim-sub text-grey-medium text-base leading-relaxed">
                        Von der Idee bis zum fertigen Produkt.
                        Kein Projekt zu gross, kein Detail zu klein.
                      </p>
                    </div>

                    {/* Right - Grid */}
                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                        {services.map((s, i) => (
                          <div key={s.title}
                            className="anim-item group relative p-4 md:p-6 bg-grey-subtle/50 rounded-sm border border-transparent hover:border-orange/30 hover:bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-glow/10 overflow-hidden">
                            <div className="absolute top-0 left-0 w-0 h-[3px] bg-orange group-hover:w-full transition-all duration-700" />
                            <div className="flex items-start gap-3 md:gap-4">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-white group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors duration-300 border border-grey-light/30">
                                <s.icon className="w-4 h-4 md:w-5 md:h-5 text-grey-medium group-hover:text-orange transition-colors duration-300" strokeWidth={1.5} />
                              </div>
                              <div>
                                <span className="absolute top-3 right-4 font-heading font-extrabold text-3xl md:text-4xl text-grey-subtle/40 select-none leading-none">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="font-heading font-bold text-sm md:text-base text-grey-dark group-hover:text-orange transition-colors mb-1">
                                  {s.title}
                                </h3>
                                <p className="text-grey-medium text-[11px] md:text-xs leading-relaxed">{s.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ PORTFOLIO ═══ */}
            <div className="section">
              <div ref={portfolioRef} className="relative w-full h-full flex items-center px-6 md:px-16 lg:px-24 bg-grey-dark overflow-hidden">
                {/* Dark curves */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
                    <path d="M-200 650 C100 350 400 750 700 450 S1100 150 1600 550" stroke="#fff" strokeWidth="2" />
                    <path d="M-300 550 C0 250 300 650 600 350 S1000 50 1500 450" stroke="#E8941A" strokeWidth="1" opacity="0.5" />
                  </svg>
                </div>
                <CornerFold className="w-16 h-16 md:w-24 md:h-24" />

                <div className="max-w-7xl mx-auto w-full py-24 md:py-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Header */}
                    <div className="lg:col-span-4">
                      <p className="anim-item text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
                        Portfolio
                      </p>
                      <h2 className="anim-heading font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[0.95] tracking-tight mb-6">
                        Arbeiten<span className="text-orange">.</span>
                      </h2>
                      <div className="anim-accent h-1 w-16 bg-orange mb-6 rounded-full" />
                      <p className="anim-sub text-white/50 text-base leading-relaxed">
                        Jedes Projekt mit Herzblut und Praezision umgesetzt. Ein Auszug.
                      </p>
                    </div>

                    {/* Grid */}
                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {projects.map((p) => (
                          <div key={p.title} className="anim-item group relative overflow-hidden rounded-sm cursor-pointer">
                            <div className="relative aspect-square">
                              <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 33vw, 25vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-3 text-center">
                                <p className="text-orange text-[9px] md:text-xs font-heading font-semibold uppercase tracking-[0.15em] mb-1">{p.category}</p>
                                <h3 className="font-heading font-bold text-xs md:text-base text-white">{p.title}</h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ KONTAKT ═══ */}
            <div className="section fp-auto-height-responsive">
              <div ref={contactRef} className="relative w-full min-h-screen flex flex-col">
                <div className="relative flex-1 flex items-center px-6 md:px-16 lg:px-24 bg-warm-white overflow-hidden">
                  <Curves />
                  <CornerFold className="w-16 h-16 md:w-24 md:h-24" />

                  <div className="max-w-7xl mx-auto w-full py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                      {/* Left */}
                      <div className="lg:col-span-5">
                        <p className="anim-item text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
                          Kontakt
                        </p>
                        <h2 className="anim-heading font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-grey-dark leading-[0.95] tracking-tight mb-6">
                          Sprechen
                          <br />
                          wir<span className="text-orange">.</span>
                        </h2>
                        <div className="anim-accent h-1 w-16 bg-orange mb-8 rounded-full" />

                        <div className="anim-item">
                          <h3 className="font-heading font-bold text-xl text-grey-dark mb-2">Timo Suess</h3>
                          <p className="text-grey-medium mb-6 text-sm">Inhaber & Mediengestalter. Seit 2002.</p>
                          <div className="space-y-4">
                            {[
                              { Icon: MapPin, text: "Sehrtenbachstrasse 20, 57610 Altenkirchen", href: "https://maps.google.com/?q=Sehrtenbachstrasse+20+57610+Altenkirchen" },
                              { Icon: Phone, text: "02681.9825-15", href: "tel:+4926819825015" },
                              { Icon: Smartphone, text: "0170.5417934", href: "tel:+491705417934" },
                              { Icon: Mail, text: "timo.suess@mdgx.de", href: "mailto:timo.suess@mdgx.de" },
                            ].map((c) => (
                              <a key={c.text} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                                  <c.Icon className="w-4 h-4 text-orange" />
                                </div>
                                <span className="text-grey-dark text-sm group-hover:text-orange transition-colors">{c.text}</span>
                              </a>
                            ))}
                          </div>
                          <div className="mt-6 flex items-start gap-3 p-4 bg-grey-subtle rounded-sm">
                            <Clock className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                            <div className="text-sm text-grey-medium">
                              <p className="font-medium text-grey-dark">Mo - Fr: 9:00 - 18:00 Uhr</p>
                              <p>Termine nach Vereinbarung</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right - Form */}
                      <div className="lg:col-span-7">
                        <ContactForm />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 orange-bar" />
                </div>

                {/* Footer */}
                <footer className="bg-grey-dark text-white">
                  <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <Image src="/images/logo_mdgx_nav.png" alt="MediaGraphX" width={120} height={54}
                          className="h-8 w-auto brightness-0 invert" />
                        <span className="font-script text-orange/80 text-lg">Idee. Konzept. Design.</span>
                      </div>
                      <div className="flex gap-6 text-xs text-white/40">
                        <a href="#" className="hover:text-orange transition-colors">Impressum</a>
                        <a href="#" className="hover:text-orange transition-colors">Datenschutz</a>
                        <span>&copy; {new Date().getFullYear()} MediaGraphX</span>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>

          </ReactFullpage.Wrapper>
        )}
      />
    </>
  );
}

/* ─── Contact Form ─── */
import { useActionState } from "react";
import { sendContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { success: false, error: null };

function ContactForm() {
  const formRef = useCallback((node: HTMLFormElement | null) => {
    if (node && formState.success) node.reset();
  }, []);
  const [formState, formAction, isPending] = useActionState(sendContactForm, initialState);

  return (
    <div className="anim-item bg-grey-subtle rounded-sm p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-orange" />
      <h3 className="font-heading font-bold text-xl md:text-2xl text-grey-dark mb-2">Projekt anfragen</h3>
      <p className="text-grey-medium text-sm mb-8">Erzaehlen Sie uns von Ihrem Vorhaben.</p>

      {formState.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <p className="text-green-700 text-sm">Vielen Dank! Wir melden uns zeitnah.</p>
        </div>
      )}
      {formState.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{formState.error}</p>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" required disabled={isPending} placeholder="Ihr Name *"
            className="w-full px-4 py-3.5 bg-white border border-grey-light/40 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 text-sm disabled:opacity-50 transition-all" />
          <input type="email" name="email" required disabled={isPending} placeholder="E-Mail *"
            className="w-full px-4 py-3.5 bg-white border border-grey-light/40 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 text-sm disabled:opacity-50 transition-all" />
        </div>
        <select name="subject" disabled={isPending}
          className="w-full px-4 py-3.5 bg-white border border-grey-light/40 rounded-sm text-grey-dark focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 text-sm disabled:opacity-50 transition-all">
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
          className="w-full px-4 py-3.5 bg-white border border-grey-light/40 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 text-sm resize-none disabled:opacity-50 transition-all" />
        <button type="submit" disabled={isPending}
          className="inline-flex items-center gap-2 px-10 py-4 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow hover:-translate-y-0.5 disabled:opacity-50">
          {isPending ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Senden...</>
          ) : (
            <><Send className="w-4 h-4" /> Nachricht senden</>
          )}
        </button>
      </form>
    </div>
  );
}
