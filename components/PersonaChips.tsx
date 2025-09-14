'use client'

const personas = [
  { id: "partner", label: "Managing Partner" },
  { id: "coo", label: "COO / Operations" },
  { id: "cfo", label: "CFO / Finance" },
  { id: "cio", label: "CIO / IT" },
  { id: "chair", label: "Practice Chair" },
  { id: "paralegal", label: "Paralegal / Staff" },
];

export default function PersonaChips() {
  return (
    <section className="border-t border-neutral-800 bg-neutral-900/40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-2">
        {personas.map((p) => (
          <a 
            key={p.id} 
            href={`#persona-${p.id}`} 
            className="px-3 py-1 rounded-full border border-neutral-700 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            {p.label}
          </a>
        ))}
      </div>
    </section>
  );
}

