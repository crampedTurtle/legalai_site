export default function PracticeAreas() {
  const practiceAreas = [
    {
      title: "Personal Injury",
      description: "EMR automation and faster claims resolution."
    },
    {
      title: "Corporate", 
      description: "Contract intelligence and compliance automation."
    },
    {
      title: "Litigation",
      description: "Discovery acceleration and knowledge retrieval."
    },
    {
      title: "Estate Planning",
      description: "Wills/trusts, probate filings, and asset management."
    },
    {
      title: "Family Law",
      description: "Intake, forms, and secure client communications."
    },
    {
      title: "Real Estate",
      description: "Document intelligence and closing workflows."
    },
    {
      title: "Employment",
      description: "Policies, investigations, and separation agreements."
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
      description: "Office actions, prior-art search, and docketing support."
    },
    {
      title: "Tax",
      description: "Memoranda, compliance workpapers, and ruling requests."
    },
    {
      title: "Compliance / Regulatory",
      description: "Audits, policy management, and reporting."
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
