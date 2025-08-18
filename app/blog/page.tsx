import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlogPage, Headline, Subhead, BlogCard } from '@/components/blog/BlogPage'

export const metadata: Metadata = {
  title: 'Blog - Legal AI Insights & Practice Innovation | Sapphire Legal AI',
  description: 'Stay current with the latest trends, tips, and research on legal AI and practice innovation from the Sapphire Legal AI team.',
  openGraph: {
    title: 'Blog - Sapphire Legal AI',
    description: 'Insights on legal AI and practice innovation.',
  },
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <BlogPage>
          <Headline>Insights on Legal AI & Practice Innovation</Headline>
          <Subhead>Stay current with the latest trends, tips, and research from the Sapphire Legal AI team.</Subhead>
          
          <BlogCard
            title="What Private AI Really Means for Law Firms"
            excerpt="Discover how private AI differs from public tools and why it's crucial for maintaining client confidentiality in legal practice."
            author="Sapphire Legal AI Team"
            date="December 15, 2024"
            readTime="5 min read"
            category="Privacy & Security"
            image="/images/blog/private-ai-law-firms.jpg"
            slug="what-private-ai-really-means-for-law-firms"
          />
          
          <BlogCard
            title="5 Ways Legal AI Streamlines Case Workflows"
            excerpt="Learn practical strategies for integrating AI into your case management processes to save time and improve outcomes."
            author="Sapphire Legal AI Team"
            date="December 10, 2024"
            readTime="7 min read"
            category="Workflow Optimization"
            image="/images/blog/ai-case-workflows.jpg"
            slug="5-ways-legal-ai-streamlines-case-workflows"
          />
          
          <BlogCard
            title="AI Guardrails Every Law Firm Needs"
            excerpt="Essential safeguards and best practices for implementing AI responsibly in legal practice while maintaining ethical standards."
            author="Sapphire Legal AI Team"
            date="December 5, 2024"
            readTime="6 min read"
            category="Best Practices"
            image="/images/blog/ai-guardrails-law-firms.jpg"
            slug="ai-guardrails-every-law-firm-needs"
          />
        </BlogPage>
      </main>
      <Footer />
    </div>
  )
} 