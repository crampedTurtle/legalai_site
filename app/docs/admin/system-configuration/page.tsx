import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'System Configuration - Sapphire Legal AI Docs',
  description: 'Customize system settings, integrations, and deployment options.',
}

export default function SystemConfigurationPage() {
  return (
    <DocLayout currentSlug="/system-configuration" currentTitle="System Configuration">
      <DocBreadcrumbs currentSlug="/system-configuration" currentTitle="System Configuration" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>System Configuration</h1>
        <p className="text-xl text-dark-300">
          Customize your Sapphire Legal AI system to match your organization's needs and integrate with existing tools.
        </p>

        <h2>Overview</h2>
        <p>
          System Configuration provides centralized control over system behavior, integrations, performance, 
          and operational settings.
        </p>

        <h2>Core tasks</h2>
        <h3>Email configuration</h3>
        <ul>
          <li><strong>SMTP settings:</strong> Configure email server connection</li>
          <li><strong>Email templates:</strong> Customize notification and invitation emails</li>
          <li><strong>Delivery options:</strong> Set retry policies and delivery confirmations</li>
          <li><strong>Sender verification:</strong> Configure SPF, DKIM, and DMARC</li>
          <li><strong>Bounce handling:</strong> Manage undeliverable email processing</li>
        </ul>

        <h3>Storage configuration</h3>
        <ul>
          <li><strong>Primary storage:</strong> Configure S3-compatible or Azure Blob storage</li>
          <li><strong>Backup storage:</strong> Set up secondary storage for redundancy</li>
          <li><strong>Storage policies:</strong> Configure lifecycle management and retention</li>
          <li><strong>Performance tuning:</strong> Optimize storage for your workload</li>
          <li><strong>Cost optimization:</strong> Configure storage tiers and compression</li>
        </ul>

        <h3>Database configuration</h3>
        <ul>
          <li><strong>Connection settings:</strong> Configure database connection parameters</li>
          <li><strong>Performance tuning:</strong> Optimize query performance and indexing</li>
          <li><strong>Backup configuration:</strong> Set up automated backup schedules</li>
          <li><strong>Monitoring:</strong> Configure database health monitoring</li>
          <li><strong>Maintenance windows:</strong> Schedule routine maintenance tasks</li>
        </ul>

        <h3>LLM provider configuration</h3>
        <ul>
          <li><strong>Provider selection:</strong> Choose from OpenAI, Anthropic, or self-hosted models</li>
          <li><strong>API configuration:</strong> Set API keys and endpoint URLs</li>
          <li><strong>Model selection:</strong> Choose appropriate models for different tasks</li>
          <li><strong>Rate limiting:</strong> Configure API usage limits and quotas</li>
          <li><strong>Fallback options:</strong> Set up backup providers for reliability</li>
        </ul>

        <h3>Webhook configuration</h3>
        <ul>
          <li><strong>Event subscriptions:</strong> Configure which events trigger webhooks</li>
          <li><strong>Endpoint configuration:</strong> Set webhook URLs and authentication</li>
          <li><strong>Retry policies:</strong> Configure webhook delivery retry logic</li>
          <li><strong>Security settings:</strong> Set up webhook signatures and validation</li>
          <li><strong>Monitoring:</strong> Track webhook delivery success and failures</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Configuration management</h3>
        <ul>
          <li>Use configuration management tools for consistency</li>
          <li>Document all configuration changes and reasons</li>
          <li>Test configurations in staging environments</li>
          <li>Implement change management for production changes</li>
          <li>Regularly review and update configurations</li>
        </ul>

        <h3>Integration planning</h3>
        <ul>
          <li>Map out all required integrations before configuration</li>
          <li>Test integrations thoroughly in development</li>
          <li>Plan for integration failures and fallbacks</li>
          <li>Document integration requirements and dependencies</li>
          <li>Coordinate with external system administrators</li>
        </ul>

        <h3>Performance optimization</h3>
        <ul>
          <li>Monitor system performance metrics regularly</li>
          <li>Identify and resolve performance bottlenecks</li>
          <li>Optimize configurations based on usage patterns</li>
          <li>Plan for capacity scaling and growth</li>
          <li>Test performance under expected load conditions</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For System Administrators</h3>
        <ul>
          <li>Configure and maintain system settings</li>
          <li>Monitor system performance and health</li>
          <li>Manage integrations and external connections</li>
          <li>Coordinate with infrastructure teams</li>
          <li>Maintain system documentation</li>
        </ul>

        <h3>For DevOps Engineers</h3>
        <ul>
          <li>Automate configuration deployment</li>
          <li>Implement infrastructure as code</li>
          <li>Manage configuration versioning</li>
          <li>Set up monitoring and alerting</li>
          <li>Coordinate with development teams</li>
        </ul>

        <h3>For IT Managers</h3>
        <ul>
          <li>Plan system architecture and requirements</li>
          <li>Coordinate with business stakeholders</li>
          <li>Manage vendor relationships and contracts</li>
          <li>Ensure compliance with IT policies</li>
          <li>Plan for system growth and evolution</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common configuration issues</h3>
        <ul>
          <li><strong>Email delivery failures:</strong> Check SMTP settings and authentication</li>
          <li><strong>Storage connection errors:</strong> Verify credentials and network access</li>
          <li><strong>Database connection issues:</strong> Check connection parameters and network</li>
          <li><strong>LLM API failures:</strong> Verify API keys and rate limits</li>
          <li><strong>Webhook delivery problems:</strong> Check endpoint URLs and authentication</li>
        </ul>

        <h3>Performance issues</h3>
        <ul>
          <li><strong>Slow response times:</strong> Check database performance and indexing</li>
          <li><strong>High resource usage:</strong> Monitor CPU, memory, and storage usage</li>
          <li><strong>Integration timeouts:</strong> Check external service performance</li>
          <li><strong>Storage bottlenecks:</strong> Verify storage performance and capacity</li>
          <li><strong>Network latency:</strong> Check network configuration and routing</li>
        </ul>

        <Callout type="tip">
          <strong>Pro tip:</strong> Use configuration templates to ensure consistency across multiple environments.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/admin/backup-and-recovery">Backup & Recovery</a> - Ensure data protection and availability</li>
          <li><a href="/docs/api/webhooks">Webhooks</a> - Configure event-driven integrations</li>
          <li><a href="/docs/api/endpoints">API Endpoints</a> - Customize API behavior and limits</li>
        </ul>
      </div>

      <DocPager currentSlug="/system-configuration" />
    </DocLayout>
  )
} 