"use client";

export default function WorkWithUs() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-dark-card border-y border-dark-border">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-orange font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-6">
          Zusammenarbeit
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-10"
          style={{ fontFamily: "var(--font-marker), cursive" }}>
          Seit ueber 20 Jahren gestalten wir erfolgreiche Markenauftritte
        </h2>
        <a href="#kontakt" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-block px-10 py-4 bg-orange text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-orange-dark transition-all duration-300">
          Projekt anfragen
        </a>
      </div>
    </section>
  );
}
