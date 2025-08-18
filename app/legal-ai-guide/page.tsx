import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LegalAIGuidePage, Headline, Subhead, GuideSection } from '@/components/legal-ai-guide/LegalAIGuidePage'

export const metadata: Metadata = {
  title: 'Legal AI Guide - The Practical Guide to Legal AI | Sapphire Legal AI',
  description: 'A comprehensive resource for attorneys, partners, and operations teams exploring AI adoption in legal practice. Learn about use cases, risks, and building your AI roadmap.',
  openGraph: {
    title: 'Legal AI Guide - Sapphire Legal AI',
    description: 'The practical guide to legal AI adoption.',
  },
}

export default function LegalAIGuide() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <LegalAIGuidePage>
          <Headline>The Practical Guide to Legal AI</Headline>
          <Subhead>A resource for attorneys, partners, and operations teams exploring AI adoption.</Subhead>
          
          <GuideSection
            title="What is Legal AI"
            description="Understanding the fundamentals of artificial intelligence in legal practice and how it differs from traditional legal technology."
            content={[
              {
                subtitle: "Definition & Scope",
                text: "Legal AI encompasses machine learning, natural language processing, and predictive analytics specifically designed for legal workflows. It goes beyond simple automation to provide intelligent insights and decision support."
              },
              {
                subtitle: "Types of Legal AI",
                text: "Document analysis, contract review, legal research, predictive analytics, and client communication tools. Each serves specific needs in the legal workflow."
              },
              {
                subtitle: "AI vs Traditional Tools",
                text: "Unlike traditional legal software, AI learns from data, improves over time, and can handle unstructured information like emails, contracts, and case files."
              }
            ]}
            icon="brain"
          />
          
          <GuideSection
            title="Use Cases by Practice Area"
            description="How different practice areas can leverage AI to improve efficiency, accuracy, and client service."
            content={[
              {
                subtitle: "Corporate & Transactional",
                text: "Contract analysis, due diligence automation, risk assessment, and deal structuring. AI can review thousands of documents in hours, not weeks."
              },
              {
                subtitle: "Litigation",
                text: "Document discovery, case law research, deposition preparation, and settlement prediction. AI helps build stronger cases faster."
              },
              {
                subtitle: "Real Estate",
                text: "Title searches, contract review, compliance checking, and market analysis. Streamline complex real estate transactions."
              },
              {
                subtitle: "Family Law",
                text: "Document preparation, financial analysis, custody evaluation support, and settlement calculations. Focus on clients, not paperwork."
              }
            ]}
            icon="briefcase"
          />
          
          <GuideSection
            title="Risks, Guardrails & Ethics"
            description="Essential considerations for implementing AI responsibly in legal practice while maintaining ethical standards and client trust."
            content={[
              {
                subtitle: "Data Privacy & Security",
                text: "Ensure client data remains confidential. Use private AI solutions that don't share data with third parties or use it for training."
              },
              {
                subtitle: "Ethical Considerations",
                text: "Maintain attorney-client privilege, avoid conflicts of interest, and ensure AI doesn't replace professional judgment."
              },
              {
                subtitle: "Bias & Fairness",
                text: "Be aware of potential biases in AI systems and ensure they don't perpetuate discrimination or unfair treatment."
              },
              {
                subtitle: "Professional Responsibility",
                text: "Attorneys remain responsible for AI-generated work. Use AI as a tool, not a replacement for legal expertise."
              }
            ]}
            icon="shield"
          />
          
          <GuideSection
            title="Building Your AI Roadmap"
            description="A step-by-step approach to implementing AI in your practice, from initial assessment to full deployment."
            content={[
              {
                subtitle: "Assessment Phase",
                text: "Evaluate current workflows, identify pain points, and determine where AI can provide the most value. Start with high-volume, repetitive tasks."
              },
              {
                subtitle: "Pilot Program",
                text: "Choose a specific use case and implement AI on a small scale. Measure results, gather feedback, and refine your approach."
              },
              {
                subtitle: "Team Training",
                text: "Educate your team on AI capabilities and limitations. Provide hands-on training and establish best practices."
              },
              {
                subtitle: "Full Implementation",
                text: "Scale successful pilots across your practice. Monitor performance, gather feedback, and continuously improve your AI strategy."
              }
            ]}
            icon="map"
          />
        </LegalAIGuidePage>
      </main>
      <Footer />
    </div>
  )
} 