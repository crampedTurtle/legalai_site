import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About Us | Sapphire Legal AI',
  description:
    'Sapphire Legal AI empowers law firms with private, secure, and practical AI—streamlining operations without sacrificing client confidentiality.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className='mx-auto max-w-5xl px-6 pt-32 pb-16'>
      <header className='mb-12'>
        <h1 className='text-4xl font-bold mb-3'>About Us</h1>
        <p className='text-lg text-slate-300 max-w-3xl'>
          <b>Sapphire Legal AI</b> empowers law firms with private, secure, and practical AI.
          We help firms streamline operations, reduce risk, and gain a competitive edge—
          all without sacrificing client confidentiality.
        </p>
      </header>

      <section className='grid md:grid-cols-2 gap-10'>
        <div>
          <h2 className='text-2xl font-semibold mb-2'>Why We Exist</h2>
          <p className='text-slate-300'>
            Public AI tools risk exposing sensitive client data and undermining compliance.
            Sapphire Legal AI was built to give law firms the benefits of AI—efficiency,
            automation, and insight—without compromising privacy, ethics, or security.
            We believe law firms deserve AI that strengthens trust, not erodes it.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-2'>What We Do</h2>
          <p className='text-slate-300'>
            We deliver a private AI workspace designed for legal professionals.
            Our platform combines:
          </p>
          <ul className='mt-3 list-disc pl-5 space-y-2 text-slate-300'>
            <li><b>Secure Document Automation</b> — draft, review, and generate legal documents with precision.</li>
            <li><b>AI‑Powered Case Research</b> — find precedents, analyze filings, and surface insights in seconds.</li>
            <li><b>Compliance‑Ready Workflows</b> — built with SOC 2, GDPR, and CCPA alignment in mind.</li>
          </ul>
          <p className='mt-4 text-slate-300'>
            All under your firm's control, with no data shared or trained outside your environment.
          </p>
        </div>
      </section>

      <section className='grid md:grid-cols-2 gap-10 mt-12'>
        <div>
          <h2 className='text-2xl font-semibold mb-2'>Our Mission</h2>
          <p className='text-slate-300'>
            Our mission is to empower law firms with secure, private, and practical AI that
            enhances productivity, safeguards confidentiality, and ensures compliance.
            We bridge innovation with responsibility so legal teams can focus on serving
            clients—not managing technology risks.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-2'>Who We Serve</h2>
          <ul className='list-disc pl-5 space-y-2 text-slate-300'>
            <li>Mid‑sized firms looking to modernize operations</li>
            <li>Private equity–backed practices scaling quickly</li>
            <li>Forward‑thinking legal teams seeking a competitive edge</li>
          </ul>
          <p className='mt-4 text-slate-300'>
            From boutique specialists to multi‑practice firms, Sapphire Legal AI scales with you.
          </p>
        </div>
      </section>

      <section className='mt-12'>
        <h2 className='text-2xl font-semibold mb-4'>Our Core Values</h2>
        <ul className='grid md:grid-cols-3 gap-6'>
          <li className='rounded-xl border border-white/10 p-5'>
            <h3 className='font-semibold mb-1'>Confidentiality First</h3>
            <p className='text-slate-300'>Your client data never leaves your control.</p>
          </li>
          <li className='rounded-xl border border-white/10 p-5'>
            <h3 className='font-semibold mb-1'>Practical Innovation</h3>
            <p className='text-slate-300'>AI that works the way legal teams work.</p>
          </li>
          <li className='rounded-xl border border-white/10 p-5'>
            <h3 className='font-semibold mb-1'>Compliance by Design</h3>
            <p className='text-slate-300'>Built to meet regulatory requirements from day one.</p>
          </li>
        </ul>
      </section>

      <section className='mt-12'>
        <blockquote className='border-l-4 border-blue-500 pl-4 text-lg italic text-slate-300'>
          "We envision a legal industry where firms harness AI confidently — maximizing efficiency
          while safeguarding the integrity of client relationships."
        </blockquote>
      </section>

      <section className='mt-12'>
        <a href='/features' className='inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500'>
          Explore Features
        </a>
      </section>
      </main>
      <Footer />
    </>
  )
} 