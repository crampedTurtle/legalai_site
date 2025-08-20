import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Collaborative Drafting - Sapphire Legal AI Docs',
  description: 'Master real-time document editing and AI-assisted drafting.',
}

export default function CollaborativeDraftingPage() {
  return (
    <DocLayout currentSlug="/collaborative-drafting" currentTitle="Collaborative Drafting">
      <DocBreadcrumbs currentSlug="/collaborative-drafting" currentTitle="Collaborative Drafting" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Collaborative Drafting</h1>
        <p className="text-xl text-dark-300">
          Work together with your team in real-time, leveraging AI assistance to create better legal documents faster.
        </p>

        <h2>Overview</h2>
        <p>
          Collaborative Drafting enables multiple team members to work on the same document simultaneously, 
          with AI assistance for research, drafting, and review.
        </p>

        <h2>Core tasks</h2>
        <h3>Starting a collaborative session</h3>
        <ol>
          <li>Open the document you want to work on</li>
          <li>Click <strong>Start Collaboration</strong> in the toolbar</li>
          <li>Invite team members via email or username</li>
          <li>Set permission levels for each participant</li>
          <li>Begin editing with real-time updates</li>
        </ol>

        <h3>Real-time collaboration features</h3>
        <ul>
          <li><strong>Live cursors:</strong> See where others are working</li>
          <li><strong>Change tracking:</strong> Monitor modifications in real-time</li>
          <li><strong>Comments:</strong> Add inline feedback and suggestions</li>
          <li><strong>Version history:</strong> Track all changes and revert if needed</li>
          <li><strong>Conflict resolution:</strong> Handle simultaneous edits gracefully</li>
        </ul>

        <h3>AI-assisted drafting</h3>
        <ul>
          <li><strong>Smart suggestions:</strong> AI recommends improvements and alternatives</li>
          <li><strong>Research assistance:</strong> Find relevant case law and statutes</li>
          <li><strong>Language optimization:</strong> Improve clarity and legal precision</li>
          <li><strong>Citation checking:</strong> Verify and format legal references</li>
          <li><strong>Compliance review:</strong> Check against regulatory requirements</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Effective collaboration</h3>
        <ul>
          <li>Use comments for discussion rather than inline changes</li>
          <li>Set clear roles: who drafts, who reviews, who approves</li>
          <li>Use version naming conventions (e.g., "v1.0 - Initial Draft")</li>
          <li>Regularly save and create checkpoints</li>
          <li>Communicate changes in real-time chat</li>
        </ul>

        <h3>AI assistance best practices</h3>
        <ul>
          <li>Review all AI suggestions before accepting</li>
          <li>Use specific prompts for better results</li>
          <li>Train the AI on your firm's writing style</li>
          <li>Validate AI research against primary sources</li>
          <li>Maintain human oversight on critical documents</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For Attorneys</h3>
        <ul>
          <li>Lead the drafting process and set the overall structure</li>
          <li>Use AI for research and initial drafting</li>
          <li>Review and approve final versions</li>
          <li>Provide guidance to team members</li>
        </ul>

        <h3>For Paralegals</h3>
        <ul>
          <li>Handle initial research and fact-gathering</li>
          <li>Draft routine sections and boilerplate</li>
          <li>Manage document organization and versioning</li>
          <li>Coordinate with other team members</li>
        </ul>

        <h3>For Associates</h3>
        <ul>
          <li>Contribute to document drafting and research</li>
          <li>Use AI assistance for efficiency</li>
          <li>Learn from senior attorneys' feedback</li>
          <li>Build drafting skills through collaboration</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common collaboration issues</h3>
        <ul>
          <li><strong>Sync delays:</strong> Check internet connection and refresh</li>
          <li><strong>Permission errors:</strong> Verify user roles and access levels</li>
          <li><strong>Version conflicts:</strong> Use merge tools or manual resolution</li>
          <li><strong>AI not responding:</strong> Check system status and try again</li>
        </ul>

        <h3>Performance optimization</h3>
        <ul>
          <li>Limit concurrent editors on large documents</li>
          <li>Use document sections for better performance</li>
          <li>Regularly save and create checkpoints</li>
          <li>Close unused browser tabs</li>
        </ul>

        <Callout type="note">
          <strong>Pro tip:</strong> Use the "Track Changes" mode to see exactly what each team member contributed.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/user-guide/case-management">Case Management</a> - Organize your collaborative work</li>
          <li><a href="/docs/user-guide/ai-assistant">AI Assistant</a> - Master AI-powered drafting</li>
          <li><a href="/docs/admin/user-management">User Management</a> - Configure team access and permissions</li>
        </ul>
      </div>

      <DocPager currentSlug="/collaborative-drafting" />
    </DocLayout>
  )
} 