import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Prerequisites & Environment - Sapphire Legal AI Docs',
  description: 'What you need in place before setup.',
}

export default function PrerequisitesPage() {
  return (
    <DocLayout currentSlug="/prerequisites" currentTitle="Prerequisites & Environment">
      <DocBreadcrumbs currentSlug="/prerequisites" currentTitle="Prerequisites & Environment" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Prerequisites & Environment</h1>
        <p className="text-xl text-dark-300">
          This page lists <strong>requirements</strong>. Installation is handled separately by the operator.
        </p>

        <h2>Accounts & access</h2>
        <ul>
          <li>Cloud account with object storage (S3-compatible or Azure Blob).</li>
          <li>Database: Postgres 14+ (managed or self-hosted).</li>
          <li>Email: AWS SES, Postmark, or SMTP relay.</li>
        </ul>

        <h2>Networking</h2>
        <ul>
          <li>HTTPS with a trusted certificate.</li>
          <li>Outbound egress to LLM providers if using hosted models.</li>
          <li>Optional: VPN/IP allowlist for admin endpoints.</li>
        </ul>

        <h2>Secrets & keys</h2>
        <ul>
          <li>Create: <code>APP_SECRET</code>, <code>JWT_SECRET</code>, DB credentials, storage keys.</li>
          <li><strong>TODO:</strong> Insert exact env var names used by the app.</li>
        </ul>

        <h2>Resource sizing (starter)</h2>
        <ul>
          <li>4 vCPU / 8–16GB RAM app node.</li>
          <li>50GB storage for indices/logs to start.</li>
          <li>Scale workers horizontally for ingestion load.</li>
        </ul>

        <h2>Compliance posture</h2>
        <ul>
          <li>Enable audit logging from day one.</li>
          <li>Configure retention + legal hold policies.</li>
        </ul>

        <Callout type="tip">
          <strong>Pro tip:</strong> Set up monitoring and alerting before going live. You'll thank yourself later.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/getting-started/quick-start">Quick Start</a></li>
          <li><a href="/docs/getting-started/first-steps">First Steps</a></li>
        </ul>
      </div>

      <DocPager currentSlug="/prerequisites" />
    </DocLayout>
  )
} 