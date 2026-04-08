"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Image from "next/image";
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
  ChevronDown,
} from "lucide-react";
import BriefbogenBg from "@/components/BriefbogenBg";

/* ─── Navigation ─── */
const navAnchors = ["start", "agentur", "leistungen", "arbeiten", "kontakt"];
const navLabels = ["Start", "Agentur", "Leistungen", "Arbeiten", "Kontakt"];

/* ─── Data ─── */
const pillars = [
  { title: "Idee", text: "Am Anfang steht die zuendende Idee. Kreativ, quer und immer im Sinne Ihrer Zielgruppe." },
  { title: "Konzept", text: "Aus der Idee wird eine Strategie. Durchdacht, zielgerichtet und mit klarem Fahrplan." },
  { title: "Design", text: "Das Konzept bekommt ein Gesicht. Visuell ueberzeugend und unverwechselbar." },
];

const services = [
  { icon: Globe, title: "Webdesign", desc: "Moderne, responsive Seiten die begeistern.", tags: ["HTML", "CSS", "CMS"] },
  { icon: PenTool, title: "Logoentwicklung", desc: "Zeichen die im Kopf bleiben.", tags: ["Branding", "Vektor"] },
  { icon: Layers, title: "Corporate Design", desc: "Einheitlicher Markenauftritt.", tags: ["CI", "Styleguide"] },
  { icon: Printer, title: "Printwerbung", desc: "Druckprodukte die ueberzeugen.", tags: ["Offset", "Digital"] },
  { icon: Search, title: "SEO", desc: "Gefunden werden, wenn es zaehlt.", tags: ["OnPage", "Analytics"] },
  { icon: Camera, title: "Fotografie", desc: "Professionelle Bilder erzaehlen Geschichten.", tags: ["Produkt", "Portrait"] },
  { icon: Monitor, title: "Online Marketing", desc: "Strategisch mit messbaren Ergebnissen.", tags: ["Social", "Kampagnen"] },
  { icon: FileCode, title: "Markenentwicklung", desc: "Marken die Vertrauen schaffen.", tags: ["Strategie", "Positionierung"] },
];

const projects = [
  { title: "Markenrelaunch", category: "Corporate Design", image: "/images/portfolio-branding.png" },
  { title: "Responsive Webseite", category: "Webdesign", image: "/images/portfolio-webdesign.png" },
  { title: "Produktkatalog", category: "Printwerbung", image: "/images/portfolio-print.png" },
  { title: "Firmenbranding", category: "Markenentwicklung", image: "/images/portfolio-logo.png" },
  { title: "Event-Fotografie", category: "Fotografie", image: "/images/portfolio-event.png" },
  { title: "Online-Kampagne", category: "Online Marketing", image: "/images/portfolio-marketing.png" },
];

export default function FullPageSite() {
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const peelPageRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Show peel hint after initial load
  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const runPeel = useCallback(
    (originEl: HTMLElement, direction: string) => {
      if (isAnimating.current || !overlayRef.current || !peelPageRef.current) return;
      isAnimating.current = true;
      setHintVisible(false);

      // Clone the origin section into peel overlay
      const clone = originEl.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.inset = "0";
      clone.style.width = "100vw";
      clone.style.height = "100vh";
      clone.style.margin = "0";
      clone.style.zIndex = "1";

      peelPageRef.current.innerHTML = "";
      peelPageRef.current.appendChild(clone);
      overlayRef.current.style.display = "block";

      // Trigger animation
      const animClass = direction === "down" ? "peel-animate-down" : "peel-animate-up";
      peelPageRef.current.classList.remove("peel-animate-down", "peel-animate-up");
      // Force reflow
      void peelPageRef.current.offsetWidth;
      peelPageRef.current.classList.add(animClass);

      // Cleanup after animation
      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.display = "none";
        if (peelPageRef.current) {
          peelPageRef.current.classList.remove(animClass);
          peelPageRef.current.innerHTML = "";
        }
        isAnimating.current = false;
        setTimeout(() => setHintVisible(true), 300);
      }, 1250);
    },
    []
  );

  const onLeave = useCallback(
    (origin: { item: HTMLElement; index: number }, destination: { index: number }, direction: string) => {
      if (isAnimating.current) return false;
      setActiveSection(destination.index);
      runPeel(origin.item, direction);
      return true;
    },
    [runPeel]
  );

  return (
    <>
      {/* ─── Peel Hint (orange corner fold) ─── */}
      <div className={`peel-hint ${hintVisible ? "visible" : ""}`}>
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hintGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0A030" />
              <stop offset="100%" stopColor="#E8941A" />
            </linearGradient>
            <filter id="hintShadow">
              <feDropShadow dx="-2" dy="2" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <path d="M80,0 L80,80 L0,0 Z" fill="url(#hintGrad)" filter="url(#hintShadow)" />
        </svg>
      </div>

      {/* ─── Peel Overlay ─── */}
      <div ref={overlayRef} className="peel-overlay">
        <div ref={peelPageRef} className="peel-page" />
      </div>

      {/* ─── Fixed Navigation ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          activeSection > 0
            ? "bg-warm-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(232,148,26,0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <a href="#start" className="group">
            <Image
              src="/images/logo_mdgx_nav.png"
              alt="MediaGraphX"
              width={160}
              height={72}
              priority
              className="h-10 md:h-12 w-auto group-hover:opacity-80 transition-opacity"
            />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLabels.map((label, i) => (
              <a
                key={label}
                href={`#${navAnchors[i]}`}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  activeSection === i ? "text-orange" : "text-grey-dark hover:text-orange"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-grey-dark hover:text-orange transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <span className="text-2xl font-light">&times;</span>
            ) : (
              <span className="text-xl">&#9776;</span>
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 bg-warm-white/95 backdrop-blur-md ${
            menuOpen ? "max-h-80 border-b border-orange/10" : "max-h-0"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLabels.map((label, i) => (
              <a
                key={label}
                href={`#${navAnchors[i]}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-heading font-semibold text-grey-dark hover:text-orange transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Vertical sidebar label ─── */}
      <div className="fixed left-6 bottom-8 z-40 hidden lg:flex flex-col items-center gap-3">
        <span className="text-xs text-grey-medium/60 tracking-[0.2em] font-medium writing-vertical-lr rotate-180 select-none">
          www.<span className="text-orange font-bold">mdgx</span>.de
        </span>
        <div className="w-px h-12 bg-orange/30" />
      </div>

      {/* ─── fullPage ─── */}
      <ReactFullpage
        licenseKey=""
        credits={{ enabled: false }}
        scrollingSpeed={0}
        anchors={navAnchors}
        navigation
        navigationPosition="right"
        navigationTooltips={navLabels}
        onLeave={onLeave}
        css3
        fitToSection
        autoScrolling
        keyboardScrolling
        scrollOverflow
        responsiveWidth={768}
        render={() => (
          <ReactFullpage.Wrapper>
            {/* ═══ HERO ═══ */}
            <div className="section">
              <div className="relative w-full h-full flex flex-col items-center justify-center px-6 bg-warm-white overflow-hidden">
                <BriefbogenBg />

                <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
                  <div className="mb-8">
                    <Image
                      src="/images/logo_mdgx.png"
                      alt="MediaGraphX - Idee. Konzept. Design."
                      width={400}
                      height={250}
                      priority
                      className="w-[260px] md:w-[360px] lg:w-[420px] h-auto"
                    />
                  </div>

                  <p className="text-grey-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                    Ihr Partner fuer alles - Print und Digital.
                    <br className="hidden md:block" />
                    Werbeagentur aus Altenkirchen, seit 2002.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="#leistungen"
                      className="px-8 py-4 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow"
                    >
                      Unsere Leistungen
                    </a>
                    <a
                      href="#kontakt"
                      className="px-8 py-4 border-2 border-grey-light text-grey-dark font-heading font-semibold text-sm uppercase tracking-widest hover:border-orange hover:text-orange transition-all duration-300 rounded-sm"
                    >
                      Kontakt
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <span className="text-xs text-grey-medium/60 uppercase tracking-[0.3em]">Scroll</span>
                  <ChevronDown className="w-5 h-5 text-orange animate-bounce" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ AGENTUR ═══ */}
            <div className="section">
              <div className="relative w-full h-full flex items-center px-6 bg-warm-white overflow-hidden">
                <BriefbogenBg />

                <div className="max-w-7xl mx-auto w-full py-24 md:py-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
                    <div className="lg:col-span-5">
                      <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-3">
                        Ueber uns
                      </p>
                      <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1] mb-5 md:mb-8">
                        Ihr Partner <span className="text-orange">fuer alles.</span>
                      </h2>

                      <p className="text-grey-medium text-base md:text-lg leading-relaxed mb-6 max-w-xl lg:hidden">
                        MediaGraphX ist Ihre Werbeagentur im Westerwald. Von Print bis Digital,
                        von der ersten Idee bis zum fertigen Produkt: Alles aus einer Hand.
                      </p>

                      <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 md:gap-4">
                        {[
                          { value: "20+", label: "Jahre" },
                          { value: "2002", label: "Seit" },
                          { value: "Print", label: "& Digital" },
                          { value: "100%", label: "Persoenlich" },
                        ].map((s) => (
                          <div key={s.label} className="text-center p-2 md:p-4 bg-white/60 rounded-sm border border-grey-light/20">
                            <p className="font-heading font-extrabold text-lg md:text-2xl text-orange">{s.value}</p>
                            <p className="text-grey-medium text-[10px] md:text-xs">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <p className="text-grey-medium text-lg leading-relaxed mb-10 max-w-xl hidden lg:block">
                        MediaGraphX ist Ihre Werbeagentur im Westerwald. Von Print bis Digital,
                        von der ersten Idee bis zum fertigen Produkt: Alles aus einer Hand.
                      </p>

                      <div className="grid grid-cols-3 gap-2 md:gap-4">
                        {pillars.map((p) => (
                          <div key={p.title} className="group p-3 md:p-6 bg-white/70 rounded-sm border border-grey-light/30 hover:border-orange/30 transition-all duration-400">
                            <h3 className="font-heading font-bold text-sm md:text-xl text-grey-dark mb-1 md:mb-2 group-hover:text-orange transition-colors">
                              {p.title}
                            </h3>
                            <p className="text-grey-medium text-[10px] md:text-sm leading-relaxed">{p.text}</p>
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
              <div className="relative w-full h-full flex items-center px-6 bg-white overflow-hidden">
                <BriefbogenBg />

                <div className="max-w-7xl mx-auto w-full py-24 md:py-0">
                  <div className="mb-6 md:mb-10">
                    <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-3">
                      Leistungen
                    </p>
                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1]">
                      Alles aus <span className="text-orange">einer Hand.</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {services.map((s) => (
                      <div
                        key={s.title}
                        className="group relative p-3 md:p-5 bg-warm-white/80 rounded-sm border border-grey-light/30 hover:border-orange/40 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-glow/15 overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-0 h-[2px] bg-orange group-hover:w-full transition-all duration-500" />
                        <s.icon className="w-5 h-5 md:w-6 md:h-6 text-grey-medium group-hover:text-orange transition-colors mb-2 md:mb-3" strokeWidth={1.5} />
                        <h3 className="font-heading font-bold text-xs md:text-base text-grey-dark mb-0.5 md:mb-1">{s.title}</h3>
                        <p className="text-grey-medium text-[10px] md:text-xs leading-relaxed mb-2 md:mb-3 hidden md:block">{s.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {s.tags.map((t) => (
                            <span key={t} className="text-[9px] md:text-[10px] font-medium text-orange/60 bg-orange/5 px-1.5 md:px-2 py-0.5 rounded-sm">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ PORTFOLIO ═══ */}
            <div className="section">
              <div className="relative w-full h-full flex items-center px-6 bg-grey-subtle overflow-hidden">
                <BriefbogenBg />

                <div className="max-w-7xl mx-auto w-full py-24 md:py-0">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-10 gap-3">
                    <div>
                      <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-3">
                        Portfolio
                      </p>
                      <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1]">
                        Ausgewaehlte <span className="text-orange">Arbeiten.</span>
                      </h2>
                    </div>
                    <p className="text-grey-medium text-sm md:text-base max-w-sm leading-relaxed">
                      Jedes Projekt mit Herzblut und Praezision umgesetzt.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {projects.map((p, i) => (
                      <div
                        key={p.title}
                        className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                          i === 0 ? "md:col-span-2 md:row-span-2" : ""
                        }`}
                      >
                        <div className={`relative ${i === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square md:aspect-[4/3]"}`}>
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6 md:transform md:translate-y-4 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                            <p className="text-orange text-[8px] md:text-xs font-heading font-semibold uppercase tracking-[0.15em] mb-0.5">{p.category}</p>
                            <h3 className="font-heading font-bold text-[11px] md:text-lg text-white">{p.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 orange-bar" />
              </div>
            </div>

            {/* ═══ KONTAKT ═══ */}
            <div className="section fp-auto-height-responsive">
              <div className="relative w-full min-h-screen flex flex-col">
                <div className="relative flex-1 flex items-center px-6 bg-warm-white overflow-hidden">
                  <BriefbogenBg />

                  <div className="max-w-7xl mx-auto w-full py-24">
                    <div className="mb-12">
                      <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4">
                        Kontakt
                      </p>
                      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-grey-dark leading-[1.1]">
                        Lassen Sie uns
                        <br />
                        <span className="text-orange">sprechen.</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-grey-dark mb-4">Timo Suess</h3>
                        <p className="text-grey-medium mb-6 leading-relaxed">
                          Inhaber von MediaGraphX. Sprechen Sie mich an.
                        </p>
                        <div className="space-y-4">
                          {[
                            { Icon: MapPin, text: "Sehrtenbachstrasse 20, 57610 Altenkirchen", href: "https://maps.google.com/?q=Sehrtenbachstrasse+20+57610+Altenkirchen" },
                            { Icon: Phone, text: "02681.9825-15", href: "tel:+4926819825015" },
                            { Icon: Smartphone, text: "0170.5417934", href: "tel:+491705417934" },
                            { Icon: Mail, text: "timo.suess@mdgx.de", href: "mailto:timo.suess@mdgx.de" },
                          ].map((c) => (
                            <a key={c.text} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 group">
                              <div className="w-9 h-9 rounded-sm bg-grey-subtle group-hover:bg-orange/10 flex items-center justify-center shrink-0 transition-colors">
                                <c.Icon className="w-4 h-4 text-orange" />
                              </div>
                              <span className="text-grey-dark text-sm group-hover:text-orange transition-colors">{c.text}</span>
                            </a>
                          ))}
                        </div>

                        <div className="mt-6 flex items-start gap-3 p-4 bg-grey-subtle rounded-sm">
                          <Clock className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                          <div className="text-sm text-grey-medium">
                            <p className="font-medium text-grey-dark">Erreichbarkeit</p>
                            <p>Mo - Fr: 9:00 - 18:00 Uhr</p>
                          </div>
                        </div>
                      </div>

                      <ContactForm />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 orange-bar" />
                </div>

                <footer className="bg-grey-dark text-white">
                  <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/images/logo_mdgx_nav.png"
                          alt="MediaGraphX"
                          width={120}
                          height={54}
                          className="h-8 w-auto brightness-0 invert"
                        />
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
    <div className="bg-grey-subtle rounded-sm p-6 md:p-8">
      <h3 className="font-heading font-bold text-xl text-grey-dark mb-2">Projekt anfragen</h3>
      <p className="text-grey-medium text-sm mb-6">Wir melden uns zeitnah.</p>

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

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" required disabled={isPending} placeholder="Ihr Name *" className="w-full px-4 py-3 bg-white border border-grey-light/50 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange text-sm disabled:opacity-50" />
          <input type="email" name="email" required disabled={isPending} placeholder="E-Mail *" className="w-full px-4 py-3 bg-white border border-grey-light/50 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange text-sm disabled:opacity-50" />
        </div>
        <select name="subject" disabled={isPending} className="w-full px-4 py-3 bg-white border border-grey-light/50 rounded-sm text-grey-dark focus:outline-none focus:border-orange text-sm disabled:opacity-50">
          <option value="">Betreff waehlen...</option>
          <option value="webdesign">Webdesign</option>
          <option value="corporate">Corporate Design</option>
          <option value="logo">Logoentwicklung</option>
          <option value="print">Printwerbung</option>
          <option value="seo">SEO / Online Marketing</option>
          <option value="foto">Fotografie</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
        <textarea name="message" required disabled={isPending} rows={4} placeholder="Ihr Projekt..." className="w-full px-4 py-3 bg-white border border-grey-light/50 rounded-sm text-grey-dark placeholder:text-grey-medium/50 focus:outline-none focus:border-orange text-sm resize-none disabled:opacity-50" />
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 px-8 py-3 bg-orange text-white font-heading font-semibold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300 rounded-sm shadow-lg shadow-orange-glow disabled:opacity-50">
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Senden...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Senden
            </>
          )}
        </button>
      </form>
    </div>
  );
}
