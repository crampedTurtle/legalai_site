import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'First Steps - Sapphire Legal AI Docs',
  description: 'Learn the basics of using Sapphire Legal AI for your first case.',
}

export default function FirstStepsPage() {
  return (
    <DocLayout currentSlug="/first-steps" currentTitle="First Steps">
      <DocBreadcrumbs currentSlug="/first-steps" currentTitle="First Steps" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>First Steps</h1>
        <p className="text-xl text-dark-300">
          Now that you're set up, let's explore the interface and create your first project.
        </p>

        <h2>Tour of the UI</h2>
        <p>
          The main interface is organized into several key areas:
        </p>
        <ul>
          <li><strong>Top Navigation:</strong> Quick access to projects, documents, and settings</li>
          <li><strong>Left Sidebar:</strong> Project tree and document organization</li>
          <li><strong>Main Content:</strong> Document viewer and editor</li>
          <li><strong>Right Panel:</strong> AI assistant and metadata</li>
        </ul>

        <h2>Creating projects and folders</h2>
        <h3>New Project</h3>
        <ul>
          <li>Click <strong>+ New Project</strong> in the sidebar</li>
          <li>Choose a template: Litigation, Corporate, Real Estate, etc.</li>
          <li>Set project name, description, and retention policy</li>
          <li><strong>TODO:</strong> Add specific template options</li>
        </ul>

        <h3>Organizing with folders</h3>
        <ul>
          <li>Right-click on a project → <strong>New Folder</strong></li>
          <li>Create logical groupings: "Pleadings", "Discovery", "Correspondence"</li>
          <li>Use consistent naming conventions</li>
        </ul>

        <h2>Upload and tagging</h2>
        <h3>Document upload</h3>
        <ul>
          <li>Drag and drop files directly into folders</li>
          <li>Supported formats: PDF, DOCX, TXT, RTF</li>
          <li>Bulk upload multiple documents at once</li>
        </ul>

        <h3>Smart tagging</h3>
        <ul>
          <li>AI automatically suggests tags based on content</li>
          <li>Add custom tags for your workflow</li>
          <li>Use tags to filter and search documents</li>
          <li><strong>TODO:</strong> List available tag categories</li>
        </ul>

        <h2>Drafting and version control</h2>
        <h3>Starting a draft</h3>
        <ul>
          <li>Select a document → <strong>Create Draft</strong></li>
          <li>Choose drafting mode: "New Document" or "Edit Existing"</li>
          <li>Select AI prompt or start with a blank slate</li>
        </ul>

        <h3>Version management</h3>
        <ul>
          <li>Every save creates a new version</li>
          <li>Compare versions side-by-side</li>
          <li>Revert to previous versions if needed</li>
          <li>Add version notes for team context</li>
        </ul>

        <h2>Sharing and permissions</h2>
        <h3>Team collaboration</h3>
        <ul>
          <li>Share documents with specific team members</li>
          <li>Set permission levels: View, Comment, Edit</li>
          <li>Track who made what changes</li>
          <li><strong>TODO:</strong> Detail permission matrix</li>
        </ul>

        <h3>External sharing</h3>
        <ul>
          <li>Generate secure links for external parties</li>
          <li>Set expiration dates on shared links</li>
          <li>Require authentication for sensitive documents</li>
        </ul>

        <Callout type="tip">
          <strong>Pro tip:</strong> Start with a small pilot project to get comfortable with the workflow before scaling up.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/user-guide/document-intelligence">Document Intelligence</a> - Learn advanced document processing</li>
          <li><a href="/docs/user-guide/collaborative-drafting">Collaborative Drafting</a> - Master team workflows</li>
          <li><a href="/docs/user-guide/case-management">Case Management</a> - Organize your practice</li>
        </ul>
      </div>

      <DocPager currentSlug="/first-steps" />
    </DocLayout>
  )
} 