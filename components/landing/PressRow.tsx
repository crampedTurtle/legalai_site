export default function PressRow() {
  const logos = [
    { src: "/logos/ilta.svg", alt: "ILTA" },
    { src: "/logos/aba.svg", alt: "American Bar Association" },
    { src: "/logos/law360.svg", alt: "Law360" },
    { src: "/logos/aws.svg", alt: "AWS Partner" },
    { src: "/logos/forbes.svg", alt: "Forbes" },
    { src: "/logos/techcrunch.svg", alt: "TechCrunch" },
  ];

  return (
    <section aria-labelledby="press-heading" className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 id="press-heading" className="text-center text-slate-300 text-sm tracking-wide">
          Featured by Leaders in Legal & Tech
        </h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center gap-6 opacity-90">
          {logos.map((l, i) => (
            <div key={i} className="flex items-center justify-center">
              {/* Use next/image in your codebase if configured */}
              <img
                src={l.src}
                alt={l.alt}
                className="h-8 w-auto opacity-80 grayscale hover:grayscale-0 transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
