"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");

    let current = 0;
    let target = 0;
    let raf: number;

    const updateTarget = () => {
      const fonts = (document as Document & { fonts?: { status?: string; ready?: Promise<unknown> } }).fonts;
      const fontReady = fonts?.status === "loaded" ? 1 : 0.5;
      target = Math.min(0.95, 0.25 + fontReady * 0.3);
    };

    updateTarget();

    const tick = () => {
      current += (target - current) * 0.06;
      const pct = Math.min(99, Math.round(current * 100));
      setProgress(pct);
      if (counterRef.current) counterRef.current.textContent = String(pct).padStart(2, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${current})`;
      raf = requestAnimationFrame(tick);
    };

    tick();

    const finish = () => {
      target = 1;
      setTimeout(() => {
        cancelAnimationFrame(raf);
        setProgress(100);
        if (counterRef.current) counterRef.current.textContent = "100";
        if (barRef.current) barRef.current.style.transform = "scaleX(1)";

        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("is-loading");
            setDone(true);
          },
        });
        tl.to(".preloader-counter, .preloader-brand", {
          y: -24,
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
        })
          .to(
            rootRef.current,
            {
              yPercent: -100,
              duration: 1.0,
              ease: "power4.inOut",
            },
            "-=0.1"
          );
      }, 400);
    };

    (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts?.ready?.then(updateTarget);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141210] text-[#f5ede1]"
      aria-hidden
    >
      <div className="preloader-brand text-xs uppercase tracking-[0.4em] opacity-60 mb-6">
        mediagraphx
      </div>
      <div className="preloader-counter font-display text-[clamp(80px,18vw,240px)] leading-none font-light italic">
        <span ref={counterRef}>00</span>
        <span className="text-[#d86c3f]">.</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5ede1]/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-[#d86c3f]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <span className="sr-only">Laden… {progress}%</span>
    </div>
  );
}
