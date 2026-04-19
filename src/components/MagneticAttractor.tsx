"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function MagneticAttractor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const handlers = new Map<HTMLElement, { enter: () => void; move: (e: Event) => void; leave: () => void }>();

    const scan = () => {
      const targets = document.querySelectorAll<HTMLElement>(".magnetic");
      targets.forEach((el) => {
        if (handlers.has(el)) return;

        const move = (e: Event) => {
          const evt = e as MouseEvent;
          const rect = el.getBoundingClientRect();
          const x = evt.clientX - rect.left - rect.width / 2;
          const y = evt.clientY - rect.top - rect.height / 2;
          gsap.to(el, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.5,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        };

        const enter = () => {
          gsap.to(el, { scale: 1.04, duration: 0.3, ease: "power3.out" });
        };

        const combinedLeave = () => {
          leave();
          gsap.to(el, { scale: 1, duration: 0.4, ease: "power3.out" });
        };

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", combinedLeave);

        handlers.set(el, { enter, move, leave: combinedLeave });
      });
    };

    scan();
    const obs = new MutationObserver(() => scan());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      handlers.forEach((h, el) => {
        el.removeEventListener("mouseenter", h.enter);
        el.removeEventListener("mousemove", h.move);
        el.removeEventListener("mouseleave", h.leave);
      });
      handlers.clear();
    };
  }, []);

  return null;
}
