export default function Guide() {
  return (
    <section className="bg-slate-900 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
            We Understand Your Challenge
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            We've spent decades fixing the chaos of disconnected systems inside regulated organizations. 
            We understand the pressure to deliver results securely.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Empathy</h3>
              <p className="text-slate-300 leading-relaxed">
                We've spent decades fixing the chaos of disconnected systems inside regulated organizations. 
                We understand the pressure to deliver results securely, the frustration of context switching 
                between tools, and the risk of using public AI for sensitive client work.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Authority</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-sky-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>25+ years enterprise transformation & cloud architecture</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-sky-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Private AI by design (tenant isolation, encryption, audit trails)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-sky-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>12 practice-specific AI packs purpose-built for law firms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
