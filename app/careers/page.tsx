import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CareersPage, Headline, Subhead, CurrentOpenings, WhyWorkHere, CTA } from '@/components/careers/CareersPage'

export const metadata: Metadata = {
  title: 'Careers - Join the Future of Legal AI | Sapphire Legal AI',
  description: 'Be part of a team shaping the next generation of legal technology. Join Sapphire Legal AI and help build the future of private AI for law firms.',
  openGraph: {
    title: 'Careers - Sapphire Legal AI',
    description: 'Join the future of legal AI.',
  },
}

export default function Careers() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <CareersPage>
          <Headline>Join the Future of Legal AI</Headline>
          <Subhead>Be part of a team shaping the next generation of legal technology.</Subhead>
          
          <CurrentOpenings
            positions={[
              {
                title: "Business Development Lead",
                department: "Sales & Marketing",
                location: "Remote",
                type: "Full-time",
                description: "Drive growth and build relationships with law firms across the country. Lead our go-to-market strategy and help shape the future of legal AI adoption.",
                requirements: [
                  "5+ years in B2B sales, preferably in legal tech",
                  "Experience with enterprise software sales cycles",
                  "Strong understanding of law firm operations",
                  "Excellent communication and presentation skills"
                ]
              },
              {
                title: "AI Engineer",
                department: "Engineering",
                location: "Remote",
                type: "Full-time",
                description: "Build and optimize private AI models for legal applications. Work on cutting-edge technology that keeps client data secure while delivering powerful insights.",
                requirements: [
                  "3+ years experience with machine learning and AI",
                  "Proficiency in Python, TensorFlow, or PyTorch",
                  "Experience with privacy-preserving AI techniques",
                  "Background in NLP or legal domain knowledge a plus"
                ]
              }
            ]}
          />
          
          <WhyWorkHere
            benefits={[
              {
                title: "Remote-First Culture",
                description: "Work from anywhere in the world with flexible hours and a supportive remote environment.",
                icon: "globe"
              },
              {
                title: "Startup Culture",
                description: "Fast-paced environment where your ideas matter and you can make a real impact from day one.",
                icon: "zap"
              },
              {
                title: "Mission-Driven",
                description: "Help democratize AI for law firms while maintaining the highest standards of privacy and security.",
                icon: "target"
              }
            ]}
          />
          
          <CTA>No role for you yet? Send us your resume anyway.</CTA>
        </CareersPage>
      </main>
      <Footer />
    </div>
  )
} 