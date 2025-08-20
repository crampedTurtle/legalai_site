import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Quick Start - Sapphire Legal AI Docs',
  description: 'Spin up Sapphire Legal AI and create your first workspace.',
}

export default function QuickStartPage() {
  return (
    <DocLayout currentSlug="/quick-start" currentTitle="Quick Start">
      <DocBreadcrumbs currentSlug="/quick-start" currentTitle="Quick Start" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Quick Start</h1>
        <p className="text-xl text-dark-300">
          Welcome! In ~15 minutes you'll have a workspace and your first AI-assisted draft.
        </p>

        <Callout type="note">
          If you haven't reviewed <strong>Prerequisites & Environment</strong>, do that first.
        </Callout>

        <h2>1) Create an organization</h2>
        <ul>
          <li>Go to <strong>Settings → Organizations → New</strong>.</li>
          <li>Name it and set a default region.</li>
          <li><strong>TODO:</strong> Replace with exact UI path if different.</li>
        </ul>

        <h2>2) Invite your team</h2>
        <ul>
          <li><strong>Admin → Users → Invite</strong> → choose roles.</li>
          <li>Roles: Admin, Attorney, Paralegal, Read-only.</li>
          <li><strong>TODO:</strong> Confirm role names.</li>
        </ul>

        <h2>3) Connect storage</h2>
        <ul>
          <li>Choose <strong>S3-compatible</strong> or <strong>Azure Blob</strong>.</li>
          <li>Enter bucket/container + credentials.</li>
          <li><strong>TODO:</strong> Insert precise field names.</li>
        </ul>

        <h2>4) Add a project</h2>
        <ul>
          <li><strong>Projects → New</strong> → pick a template (e.g., "Litigation").</li>
          <li>Set retention and permissions.</li>
        </ul>

        <h2>5) Upload a document</h2>
        <ul>
          <li>Drag and drop a PDF or DOCX.</li>
          <li>The system will extract, OCR, and index.</li>
        </ul>

        <h2>6) Generate your first draft</h2>
        <ul>
          <li>Open the uploaded doc → <strong>AI Assist → Draft</strong>.</li>
          <li>Choose a drafting prompt (e.g., "Demand Letter").</li>
          <li>Review, edit, and save as a new version.</li>
        </ul>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/getting-started/first-steps">First Steps</a></li>
          <li><a href="/docs/user-guide/document-intelligence">Document Intelligence</a></li>
        </ul>
      </div>

      <DocPager currentSlug="/quick-start" />
    </DocLayout>
  )
} 