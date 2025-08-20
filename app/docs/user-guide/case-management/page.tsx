import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Case Management - Sapphire Legal AI Docs',
  description: 'Organize cases, track progress, and manage workflows efficiently.',
}

export default function CaseManagementPage() {
  return (
    <DocLayout currentSlug="/case-management" currentTitle="Case Management">
      <DocBreadcrumbs currentSlug="/case-management" currentTitle="Case Management" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Case Management</h1>
        <p className="text-xl text-dark-300">
          Streamline your practice with intelligent case organization, workflow automation, and progress tracking.
        </p>

        <h2>Overview</h2>
        <p>
          Case Management provides a centralized hub for organizing all aspects of your legal cases, 
          from initial intake through final resolution.
        </p>

        <h2>Core tasks</h2>
        <h3>Case creation and setup</h3>
        <ol>
          <li>Click <strong>New Case</strong> from the dashboard</li>
          <li>Select case type and jurisdiction</li>
          <li>Enter client information and case details</li>
          <li>Set important dates and deadlines</li>
          <li>Assign team members and roles</li>
          <li>Configure case-specific workflows</li>
        </ol>

        <h3>Document organization</h3>
        <ul>
          <li><strong>Automatic categorization:</strong> AI sorts documents by type and relevance</li>
          <li><strong>Custom folders:</strong> Create organization structures that match your workflow</li>
          <li><strong>Document linking:</strong> Connect related documents and evidence</li>
          <li><strong>Version control:</strong> Track all document iterations and changes</li>
          <li><strong>Search and retrieval:</strong> Find documents quickly across all cases</li>
        </ul>

        <h3>Workflow management</h3>
        <ul>
          <li><strong>Task templates:</strong> Pre-defined workflows for common case types</li>
          <li><strong>Deadline tracking:</strong> Automated reminders for important dates</li>
          <li><strong>Progress monitoring:</strong> Visual dashboards showing case status</li>
          <li><strong>Bottleneck identification:</strong> AI highlights workflow inefficiencies</li>
          <li><strong>Automation rules:</strong> Trigger actions based on case events</li>
        </ul>

        <h3>Team collaboration</h3>
        <ul>
          <li><strong>Role-based access:</strong> Control who sees and edits what</li>
          <li><strong>Activity feeds:</strong> Track all case-related activities</li>
          <li><strong>Communication tools:</strong> Built-in messaging and commenting</li>
          <li><strong>Meeting management:</strong> Schedule and document case meetings</li>
          <li><strong>Knowledge sharing:</strong> Share insights and best practices</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Case organization</h3>
        <ul>
          <li>Use consistent naming conventions across all cases</li>
          <li>Create standard folder structures for each case type</li>
          <li>Regularly review and archive completed cases</li>
          <li>Use tags and labels for quick identification</li>
          <li>Maintain a master case calendar for deadline management</li>
        </ul>

        <h3>Workflow optimization</h3>
        <ul>
          <li>Start with simple workflows and add complexity gradually</li>
          <li>Document your current processes before automating</li>
          <li>Use AI insights to identify improvement opportunities</li>
          <li>Regularly review and update workflow templates</li>
          <li>Train team members on new workflows before implementation</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For Attorneys</h3>
        <ul>
          <li>Use case dashboards for quick status overviews</li>
          <li>Set up automated deadline reminders for court dates</li>
          <li>Leverage AI insights for case strategy development</li>
          <li>Use workflow templates to standardize case handling</li>
          <li>Monitor team productivity and case progress</li>
        </ul>

        <h3>For Paralegals</h3>
        <ul>
          <li>Manage daily case administration and organization</li>
          <li>Set up and maintain case workflows</li>
          <li>Track document production and discovery</li>
          <li>Coordinate with clients and opposing counsel</li>
          <li>Prepare case summaries and status reports</li>
        </ul>

        <h3>For Case Managers</h3>
        <ul>
          <li>Oversee case portfolio and resource allocation</li>
          <li>Analyze case performance and efficiency metrics</li>
          <li>Identify and resolve workflow bottlenecks</li>
          <li>Ensure compliance with firm policies and procedures</li>
          <li>Train team members on case management best practices</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common issues</h3>
        <ul>
          <li><strong>Case not loading:</strong> Check permissions and refresh the page</li>
          <li><strong>Documents not syncing:</strong> Verify file upload status and permissions</li>
          <li><strong>Workflow stuck:</strong> Check for pending approvals or blocked tasks</li>
          <li><strong>Team access issues:</strong> Verify user roles and case assignments</li>
          <li><strong>Performance slow:</strong> Check case size and document count</li>
        </ul>

        <h3>Getting help</h3>
        <ul>
          <li>Check the case activity log for error details</li>
          <li>Verify user permissions and case access</li>
          <li>Contact support with specific error messages</li>
          <li>Review case settings and configuration</li>
          <li>Check system status and maintenance windows</li>
        </ul>

        <Callout type="tip">
          <strong>Pro tip:</strong> Use the case analytics dashboard to identify patterns and optimize your practice management.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/user-guide/ai-assistant">AI Assistant</a> - Leverage AI for case strategy and research</li>
          <li><a href="/docs/admin/user-management">User Management</a> - Configure team access and permissions</li>
          <li><a href="/docs/admin/system-configuration">System Configuration</a> - Customize workflows and automation</li>
        </ul>
      </div>

      <DocPager currentSlug="/case-management" />
    </DocLayout>
  )
} 