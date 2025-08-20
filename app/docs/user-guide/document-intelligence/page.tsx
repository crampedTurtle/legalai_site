import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Document Intelligence - Sapphire Legal AI Docs',
  description: 'Learn how to upload, process, and analyze legal documents effectively.',
}

export default function DocumentIntelligencePage() {
  return (
    <DocLayout currentSlug="/document-intelligence" currentTitle="Document Intelligence">
      <DocBreadcrumbs currentSlug="/document-intelligence" currentTitle="Document Intelligence" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Document Intelligence</h1>
        <p className="text-xl text-dark-300">
          Transform how you work with legal documents using AI-powered processing and analysis.
        </p>

        <h2>Overview</h2>
        <p>
          Document Intelligence automatically extracts, analyzes, and organizes information from your legal documents, 
          making them searchable, comparable, and actionable.
        </p>

        <h2>Core tasks</h2>
        <h3>Document processing pipeline</h3>
        <ol>
          <li><strong>Upload:</strong> Drag and drop or use the file picker</li>
          <li><strong>OCR:</strong> Extract text from scanned documents</li>
          <li><strong>Analysis:</strong> AI identifies key entities and structure</li>
          <li><strong>Indexing:</strong> Make content searchable across documents</li>
          <li><strong>Enrichment:</strong> Add metadata and tags automatically</li>
        </ol>

        <h3>Entity extraction</h3>
        <ul>
          <li><strong>Parties:</strong> Plaintiffs, defendants, attorneys, witnesses</li>
          <li><strong>Dates:</strong> Filing dates, deadlines, important events</li>
          <li><strong>Amounts:</strong> Damages, fees, settlements</li>
          <li><strong>Citations:</strong> Case law, statutes, regulations</li>
          <li><strong>Documents:</strong> Pleadings, discovery, correspondence</li>
        </ul>

        <h3>Document comparison</h3>
        <ul>
          <li>Side-by-side comparison of multiple versions</li>
          <li>Highlight differences and changes</li>
          <li>Track modifications across time</li>
          <li>Generate change summaries</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Optimizing document quality</h3>
        <ul>
          <li>Use high-resolution scans (300+ DPI)</li>
          <li>Ensure good contrast and lighting</li>
          <li>Clean up artifacts before upload</li>
          <li>Use consistent naming conventions</li>
        </ul>

        <h3>Organizing your library</h3>
        <ul>
          <li>Create logical folder hierarchies</li>
          <li>Use consistent tagging schemes</li>
          <li>Regularly review and clean up old documents</li>
          <li>Archive completed cases appropriately</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For Attorneys</h3>
        <ul>
          <li>Use entity extraction to quickly identify key facts</li>
          <li>Leverage document comparison for contract negotiations</li>
          <li>Search across case history for precedents</li>
          <li>Generate summaries for client communications</li>
        </ul>

        <h3>For Paralegals</h3>
        <ul>
          <li>Set up automated tagging workflows</li>
          <li>Use bulk processing for large document sets</li>
          <li>Create standardized naming conventions</li>
          <li>Monitor processing quality and accuracy</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common issues</h3>
        <ul>
          <li><strong>Poor OCR quality:</strong> Check scan resolution and document condition</li>
          <li><strong>Missing entities:</strong> Verify document format and content clarity</li>
          <li><strong>Slow processing:</strong> Check file size and system resources</li>
          <li><strong>Search not working:</strong> Ensure documents are fully indexed</li>
        </ul>

        <h3>Getting help</h3>
        <ul>
          <li>Check the processing logs for error details</li>
          <li>Verify document format compatibility</li>
          <li>Contact support with specific error messages</li>
          <li>Review system requirements and limits</li>
        </ul>

        <Callout type="warning">
          <strong>Important:</strong> Always review AI-extracted information for accuracy before using it in legal proceedings.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/user-guide/collaborative-drafting">Collaborative Drafting</a> - Work together on documents</li>
          <li><a href="/docs/user-guide/case-management">Case Management</a> - Organize your workflow</li>
          <li><a href="/docs/user-guide/ai-assistant">AI Assistant</a> - Get help with research and drafting</li>
        </ul>
      </div>

      <DocPager currentSlug="/document-intelligence" />
    </DocLayout>
  )
} 