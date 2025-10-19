export default function PracticeAreas() {
  const practiceAreas = [
    {
      title: "Personal Injury",
      description: "EMR automation and faster claims resolution."
    },
    {
      title: "Corporate", 
      description: "Contract analysis, due diligence automation, and entity formation workflows."
    },
    {
      title: "Litigation",
      description: "Discovery request generation, gap analysis, and case intelligence."
    },
    {
      title: "Estate Planning",
      description: "Wills/trusts, probate filings, and asset management."
    },
    {
      title: "Family Law",
      description: "Divorce petitions, custody agreements, and client portal intelligence."
    },
    {
      title: "Real Estate",
      description: "Document intelligence and closing workflows."
    },
    {
      title: "Employment",
      description: "Employment agreements, policy analysis, and investigation workflows."
    },
    {
      title: "Immigration",
      description: "Petitions, RFE responses, and document checklists."
    },
    {
      title: "Bankruptcy",
      description: "Petitions, schedules, and claims analysis."
    },
    {
      title: "IP",
      description: "Trademark applications, IP analysis, and patent workflows."
    },
    {
      title: "Tax",
      description: "Memoranda, compliance workpapers, and ruling requests."
    },
    {
      title: "Compliance / Regulatory",
      description: "Regulatory analysis, compliance templates, and audit workflows."
    }
  ];

  return (
    <section className="bg-slate-900 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
            Tailored AI for Every Practice
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            12 practice-specific AI packs designed for your firm's unique needs
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {practiceAreas.map((area, index) => (
              <div key={index} className="rounded-xl bg-slate-800 p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{area.title}</h3>
                <p className="text-slate-300">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
