"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const ringPos = { x: pos.x, y: pos.y };

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    let raf: number;
    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      gsap.set(dot, { x: mouse.x, y: mouse.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const addHoverState = (labelText: string) => {
      gsap.to(ring, { scale: 2.6, borderColor: "rgba(216,108,63,0)", backgroundColor: "#d86c3f", duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.3 });
      if (labelText) {
        label.textContent = labelText;
        gsap.to(label, { opacity: 1, duration: 0.3 });
      }
    };

    const removeHoverState = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(20,18,16,0.85)", backgroundColor: "rgba(0,0,0,0)", duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (!t) return;
      const txt = (t as HTMLElement).dataset.cursor || "";
      addHoverState(txt);
    };

    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (!t) return;
      removeHoverState();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[90] w-10 h-10 rounded-full border border-[#141210]/85 pointer-events-none hidden md:block"
        style={{ mixBlendMode: "difference" }}
      >
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-[#f5ede1] font-medium opacity-0 whitespace-nowrap"
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[91] w-[6px] h-[6px] rounded-full bg-[#141210] pointer-events-none hidden md:block"
      />
    </>
  );
}
