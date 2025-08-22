import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sapphire Implementation Framework - Print View',
  description: 'Print-friendly version of our Software + Enablement implementation framework',
}

export default function FrameworkPrintPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-4xl mx-auto">
      <div className="print-content">
        {/* Header */}
        <header className="text-center mb-12 border-b-2 border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sapphire Implementation Framework
          </h1>
          <p className="text-xl text-gray-600">
            Software + Enablement: We don't just hand you software—we ensure your practice adapts and thrives.
          </p>
        </header>

        {/* Value Proposition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h2>
          <p className="text-lg text-gray-700 mb-6">
            We combine private AI with proven implementation methods so your practice adapts and thrives.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Deliver</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Complete implementation framework</li>
                <li>• 3-month BPO & training phase</li>
                <li>• Ongoing optimization support</li>
                <li>• Fractional CTO opportunities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 4-week implementation timeline</li>
                <li>• Proven change management (OGSM, ADKAR)</li>
                <li>• Measurable outcomes and SLA improvements</li>
                <li>• Strategic technology leadership</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Sapphire Implementation Framework (4 Weeks to Value)</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our framework blends OGSM for focus and ADKAR for change adoption. In four weeks we implement Sapphire Legal AI, connect your data, and enable your team—then we operate alongside you for the next three months to lock in outcomes.
          </p>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1 — Discover (Days 1–3)</h3>
              <p className="text-gray-700 mb-2"><strong>Objectives:</strong> Align goals, define value, map current workflows.</p>
              <p className="text-gray-700 mb-2"><strong>Key Activities:</strong> Stakeholder interviews; system inventory (Clio, monday.com, DMS, email); success metrics & OGSM.</p>
              <p className="text-gray-700"><strong>Deliverables:</strong> Current-state map • Risk & dependency list • Draft success scorecard.</p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2 — Design (Days 4–7)</h3>
              <p className="text-gray-700 mb-2"><strong>Objectives:</strong> Define target workflows & governance.</p>
              <p className="text-gray-700 mb-2"><strong>Key Activities:</strong> Future-state blueprint; integration plan; access model; ADKAR plan; safeguard requirements.</p>
              <p className="text-gray-700"><strong>Deliverables:</strong> Solution design • Integration spec • Change plan • Security baseline.</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3 — Build (Weeks 2–3)</h3>
              <p className="text-gray-700 mb-2"><strong>Objectives:</strong> Configure, connect, and automate.</p>
              <p className="text-gray-700 mb-2"><strong>Key Activities:</strong> Sapphire Legal AI configuration; Clio/monday.com API connectors; prompt libraries & templates; dashboards.</p>
              <p className="text-gray-700"><strong>Deliverables:</strong> Connected environment • Automations & templates • Audit & logging.</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4 — Validate (Week 3)</h3>
              <p className="text-gray-700 mb-2"><strong>Objectives:</strong> Prove reliability and safety.</p>
              <p className="text-gray-700 mb-2"><strong>Key Activities:</strong> UAT scripts; exception paths; model guardrails; security checks; go-live checklist.</p>
              <p className="text-gray-700"><strong>Deliverables:</strong> UAT results • Guardrail config • Go-live readiness.</p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 5 — Launch (Week 4)</h3>
              <p className="text-gray-700 mb-2"><strong>Objectives:</strong> Ship and enable.</p>
              <p className="text-gray-700 mb-2"><strong>Key Activities:</strong> Enablement sessions; playbooks; SLA definitions; success metrics activated.</p>
              <p className="text-gray-700"><strong>Deliverables:</strong> Live environment • Playbooks • Adoption plan • Week-5 review.</p>
            </div>
          </div>
        </section>

        {/* BPO & Training Phase */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3-Month BPO & Training Phase</h2>
          <p className="text-lg text-gray-700 mb-6">We operate with you to cement adoption and outcomes.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Operate</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Queue triage & exception handling</li>
                <li>• Template/library upkeep</li>
                <li>• Weekly enablement</li>
                <li>• KPI tracking</li>
                <li>• Feedback loop to improve automations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What You Get</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Time-to-value</li>
                <li>• Adoption</li>
                <li>• Measurable SLA improvements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ongoing Optimization */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ongoing Optimization</h2>
          <p className="text-lg text-gray-700 mb-4">Continuous improvement is built into our partnership.</p>
          <ul className="space-y-2 text-gray-700">
            <li>• Quarterly workflow audits</li>
            <li>• New feature rollout</li>
            <li>• Data quality improvements</li>
            <li>• Compliance mapping (SOC 2, HIPAA, ISO 27001, GDPR/CCPA)</li>
          </ul>
        </section>

        {/* Fractional CTO */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CTO Opportunities</h2>
          <p className="text-lg text-gray-700 mb-4">Beyond implementation, we provide strategic technology leadership.</p>
          <ul className="space-y-2 text-gray-700">
            <li>• Strategic roadmap</li>
            <li>• Vendor evaluations</li>
            <li>• Data platform & integration strategy</li>
            <li>• Security & governance steering</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="border-t-2 border-gray-300 pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Contact us to schedule your implementation consult and begin your transformation journey.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p><strong>Email:</strong> info@sapphirelegal.ai</p>
              <p><strong>Website:</strong> sapphirelegal.ai</p>
            </div>
            <div>
              <p><strong>Implementation Timeline:</strong> 4 weeks</p>
              <p><strong>BPO & Training:</strong> 3 months included</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
