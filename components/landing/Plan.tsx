export default function Plan() {
  const steps = [
    {
      number: "01",
      title: "Onboard",
      description: "We migrate your cases and configure your practice packs."
    },
    {
      number: "02", 
      title: "Adopt",
      description: "Work from one platform with AI built in (document intelligence, EMR automation, discovery, billing)."
    },
    {
      number: "03",
      title: "Grow", 
      description: "Eliminate backlog, improve outcomes, and scale profitably."
    }
  ];

  return (
    <section className="bg-slate-800 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
            Your Path to Success
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Three simple steps to transform your practice
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10">
                  <span className="text-2xl font-bold text-sky-400">{step.number}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
