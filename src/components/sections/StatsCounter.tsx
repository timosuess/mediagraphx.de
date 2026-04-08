"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: "+", label: "Jahre Erfahrung" },
  { value: 2002, suffix: "", label: "Gruendungsjahr" },
  { value: 100, suffix: "%", label: "Persoenlich" },
  { value: 1, suffix: "", label: "Ansprechpartner" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCounter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale in from small
      gsap.from(".stat-box", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-orange py-14 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="stat-box">
              <p className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-2">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
