export default function Trust() {
  const badges = [
    "SOC 2-ready controls",
    "HIPAA-aligned handling", 
    "ISO 27001 practices",
    "Encryption at rest & in transit",
    "Tenant isolation"
  ];

  const stats = [
    { value: "50%", label: "faster cycle time" },
    { value: "30%", label: "fewer manual touches" },
    { value: "99.9%", label: "uptime target" }
  ];

  return (
    <section className="bg-slate-800 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
            Trusted, Secure, Compliant
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Enterprise-grade security built for regulated environments
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Security & Compliance</h3>
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <span key={index} className="rounded-full bg-slate-700 px-4 py-2 text-sm text-slate-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Proven Results</h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-sky-400">{stat.value}</div>
                    <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
