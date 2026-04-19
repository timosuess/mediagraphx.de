"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const signoff = ref.current?.querySelector<HTMLElement>(".footer-signoff");
      if (signoff) {
        const split = new SplitType(signoff, { types: "chars", tagName: "span" });
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.01,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: signoff,
            start: "top 90%",
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative bg-[#141210] text-[#f5ede1] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-[#f5ede1]/10">
          <div className="col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-[#f5ede1]/50 mb-4">MediaGraphX</div>
            <p className="text-lg max-w-sm text-[#f5ede1]/70 leading-relaxed">
              Werbeagentur im Westerwald. Inhaber Timo Suess. <br />
              Idee · Konzept · Design · seit 2002.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#f5ede1]/50 mb-4">Seiten</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#start" data-cursor="Start" className="link-underline hover:text-[#d86c3f] transition-colors">Start</a></li>
              <li><a href="#agentur" data-cursor="Über" className="link-underline hover:text-[#d86c3f] transition-colors">Agentur</a></li>
              <li><a href="#leistungen" data-cursor="Leistungen" className="link-underline hover:text-[#d86c3f] transition-colors">Leistungen</a></li>
              <li><a href="#arbeiten" data-cursor="Arbeiten" className="link-underline hover:text-[#d86c3f] transition-colors">Arbeiten</a></li>
              <li><a href="#kontakt" data-cursor="Kontakt" className="link-underline hover:text-[#d86c3f] transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#f5ede1]/50 mb-4">Rechtlich</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/impressum" data-cursor="Impressum" className="link-underline hover:text-[#d86c3f] transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" data-cursor="Datenschutz" className="link-underline hover:text-[#d86c3f] transition-colors">Datenschutz</Link></li>
              <li><Link href="/fahrzeugbeschriftung" data-cursor="Fahrzeuge" className="link-underline hover:text-[#d86c3f] transition-colors">Fahrzeugbeschriftung</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-16 md:py-24">
          <div className="footer-signoff font-display italic font-light leading-[0.85] tracking-[-0.03em] text-[clamp(80px,18vw,320px)] text-[#f5ede1]">
            mediagraphx
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-[#f5ede1]/60">
          <div>© {new Date().getFullYear()} MediaGraphX · Timo Suess · Altenkirchen</div>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-[#d86c3f]">♥</span>
            <span>by</span>
            <a
              href="https://superbrand.marketing"
              target="_blank"
              rel="noopener"
              data-cursor="SUPERBRAND"
              className="link-underline hover:text-[#6cbe45] transition-colors"
            >
              SUPERBRAND.marketing
            </a>
            <span className="hidden md:inline">– Dein Superheld für deine Werbung.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
