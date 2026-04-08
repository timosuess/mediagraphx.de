"use client";

export default function BannerCTA() {
  return (
    <section className="bg-orange py-5 md:py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="font-heading font-bold text-white text-base md:text-lg uppercase tracking-wide text-center md:text-left">
          Sie suchen einen zuverlaessigen Werbepartner im Westerwald?
        </h3>
        <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
          className="shrink-0 px-8 py-3 bg-dark text-orange font-heading font-bold text-sm uppercase tracking-widest hover:bg-dark-card transition-all duration-300">
          Jetzt anfragen
        </a>
      </div>
    </section>
  );
}
