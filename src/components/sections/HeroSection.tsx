"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const NoiseGrainShader = dynamic(() => import("@/components/webgl/NoiseGrainShader"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for preloader to finish
      const runIntro = () => {
        const h1Target = document.querySelector<HTMLElement>(".hero-h1");
        if (h1Target) {
          const split = new SplitType(h1Target, { types: "lines,chars", tagName: "span" });

          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8, delay: 0.15 })
            .from(
              split.chars,
              {
                yPercent: 120,
                rotate: 4,
                opacity: 0,
                stagger: 0.018,
                duration: 1.1,
              },
              "-=0.5"
            )
            .from(".hero-sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
            .from(".hero-cta > *", { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
            .from(".hero-scroll-hint", { opacity: 0, y: 10, duration: 0.8 }, "-=0.2");
        }
      };

      if (document.documentElement.classList.contains("is-loading")) {
        const obs = new MutationObserver(() => {
          if (!document.documentElement.classList.contains("is-loading")) {
            obs.disconnect();
            runIntro();
          }
        });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      } else {
        runIntro();
      }

      // Parallax: Shader-Layer bewegt sich langsamer
      gsap.to(".hero-bg-layer", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="start"
      className="relative min-h-screen w-full overflow-hidden bg-[#141210] text-[#f5ede1]"
    >
      {/* BG-Layer: Hero-Still (Fallback) + Video + Noise */}
      <div className="hero-bg-layer absolute inset-0 will-change-transform">
        <Image
          src="/generated/hero-still.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <video
          ref={videoRef}
          data-hero
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/generated/hero-still.png"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
          onCanPlay={(e) => {
            (e.currentTarget as HTMLVideoElement).classList.remove("opacity-0");
          }}
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Warm Overlay für Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/50 via-[#141210]/25 to-[#141210]/85" />
      </div>

      {/* Noise-Grain als Film-Overlay */}
      <NoiseGrainShader intensity={0.6} blendMode="overlay" />

      {/* Content */}
      <div className="hero-content relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-12 pt-[140px] md:pt-[180px] pb-[80px]">
        <div className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto w-full">
          <div className="hero-eyebrow flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.35em] text-[#f4c95d]">
            <span className="w-10 h-px bg-[#f4c95d]" />
            <span>Werbeagentur · Westerwald · seit 2002</span>
          </div>

          <h1
            className="hero-h1 font-display italic font-light leading-[0.92] tracking-[-0.02em] text-[clamp(72px,13vw,240px)] text-[#f5ede1]"
            style={{ fontFeatureSettings: "'ss01'" }}
          >
            Design, das knallt.
          </h1>

          <p className="hero-sub mt-10 max-w-xl text-lg md:text-xl text-[#f5ede1]/75 font-light">
            Idee · Konzept · Design. Von Timo Suess und Team – für Marken, die auffallen dürfen, müssen, sollen.
          </p>

          <div className="hero-cta mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              data-cursor="Jetzt anfragen"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="magnetic group inline-flex items-center gap-3 bg-[#d86c3f] hover:bg-[#e8845a] text-[#141210] font-medium px-8 py-4 text-sm uppercase tracking-[0.15em] transition-colors"
            >
              Projekt starten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#arbeiten"
              data-cursor="Arbeiten ansehen"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#arbeiten")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="magnetic inline-flex items-center gap-3 border border-[#f5ede1]/40 hover:border-[#f5ede1] text-[#f5ede1] px-8 py-4 text-sm uppercase tracking-[0.15em] transition-colors link-underline"
            >
              Arbeiten ansehen
            </a>
          </div>
        </div>

        {/* Bottom-Bar: Hashtag links, Scroll-Hint rechts */}
        <div className="relative flex items-end justify-between mt-10">
          <div className="font-script text-2xl md:text-4xl text-[#f4c95d] italic rotate-[-6deg]">
            #kreatiefsinn
          </div>
          <div className="hero-scroll-hint hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#f5ede1]/60">
            <span>Scroll</span>
            <span className="block w-12 h-px bg-[#f5ede1]/60 relative overflow-hidden">
              <span className="absolute inset-0 bg-[#d86c3f] animate-[slide_2.5s_ease-in-out_infinite]" />
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
