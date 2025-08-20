import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Security Settings - Sapphire Legal AI Docs',
  description: 'Configure security policies, encryption, and compliance settings.',
}

export default function SecuritySettingsPage() {
  return (
    <DocLayout currentSlug="/security-settings" currentTitle="Security Settings">
      <DocBreadcrumbs currentSlug="/security-settings" currentTitle="Security Settings" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Security Settings</h1>
        <p className="text-xl text-dark-300">
          Configure system-wide security policies, authentication settings, and compliance controls.
        </p>

        <Callout type="note">
          <strong>Note:</strong> This page covers administrative security configurations. For comprehensive security information, 
          see the <a href="/security" className="text-sapphire-400 hover:underline">Security & Compliance</a> section.
        </Callout>

        <h2>Overview</h2>
        <p>
          Security Settings provides administrative control over authentication, authorization, encryption, 
          and compliance features within your Sapphire Legal AI system.
        </p>

        <h2>Core tasks</h2>
        <h3>Authentication configuration</h3>
        <ul>
          <li><strong>Password policies:</strong> Set complexity requirements and expiration rules</li>
          <li><strong>Multi-factor authentication:</strong> Enable 2FA/MFA for all users</li>
          <li><strong>Session management:</strong> Configure timeout and concurrent session limits</li>
          <li><strong>SSO integration:</strong> Connect with enterprise identity providers</li>
          <li><strong>API key management:</strong> Generate and manage API access keys</li>
        </ul>

        <h3>Access control policies</h3>
        <ul>
          <li><strong>IP allowlisting:</strong> Restrict access to specific network ranges</li>
          <li><strong>Geographic restrictions:</strong> Limit access by country/region</li>
          <li><strong>Time-based access:</strong> Set business hours and maintenance windows</li>
          <li><strong>Device restrictions:</strong> Control access by device type and security posture</li>
          <li><strong>Risk-based access:</strong> Implement adaptive authentication policies</li>
        </ul>

        <h3>Encryption and data protection</h3>
        <ul>
          <li><strong>Data encryption:</strong> Configure encryption at rest and in transit</li>
          <li><strong>Key management:</strong> Manage encryption keys and certificates</li>
          <li><strong>Data classification:</strong> Set sensitivity levels and handling rules</li>
          <li><strong>Retention policies:</strong> Configure data lifecycle and deletion rules</li>
          <li><strong>Backup encryption:</strong> Ensure backup data is properly secured</li>
        </ul>

        <h3>Compliance and auditing</h3>
        <ul>
          <li><strong>Audit logging:</strong> Configure comprehensive activity logging</li>
          <li><strong>Compliance frameworks:</strong> Enable SOC 2, HIPAA, GDPR compliance</li>
          <li><strong>Data residency:</strong> Control where data is stored and processed</li>
          <li><strong>Privacy controls:</strong> Implement data minimization and consent management</li>
          <li><strong>Incident response:</strong> Configure security alerting and response workflows</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Security configuration</h3>
        <ul>
          <li>Start with secure defaults and customize as needed</li>
          <li>Regularly review and update security policies</li>
          <li>Test security configurations in staging environments</li>
          <li>Document all security settings and changes</li>
          <li>Implement change management for security modifications</li>
        </ul>

        <h3>Compliance management</h3>
        <ul>
          <li>Map security controls to compliance requirements</li>
          <li>Regularly audit compliance status and gaps</li>
          <li>Maintain evidence for compliance assessments</li>
          <li>Coordinate with legal and compliance teams</li>
          <li>Plan for compliance updates and changes</li>
        </ul>

        <h3>Incident preparedness</h3>
        <ul>
          <li>Develop incident response playbooks</li>
          <li>Test security monitoring and alerting</li>
          <li>Establish communication protocols for security incidents</li>
          <li>Maintain contact lists for security teams and vendors</li>
          <li>Regularly review and update incident response procedures</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For Security Administrators</h3>
        <ul>
          <li>Configure and maintain security policies</li>
          <li>Monitor security events and incidents</li>
          <li>Manage encryption keys and certificates</li>
          <li>Coordinate with IT security teams</li>
          <li>Conduct security assessments and audits</li>
        </ul>

        <h3>For System Administrators</h3>
        <ul>
          <li>Implement security configurations</li>
          <li>Monitor system security status</li>
          <li>Manage user access and permissions</li>
          <li>Coordinate with security teams</li>
          <li>Maintain security documentation</li>
        </ul>

        <h3>For Compliance Officers</h3>
        <ul>
          <li>Review security policies for compliance</li>
          <li>Monitor compliance status and reporting</li>
          <li>Coordinate security assessments</li>
          <li>Manage compliance documentation</li>
          <li>Ensure regulatory requirements are met</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common security issues</h3>
        <ul>
          <li><strong>Authentication failures:</strong> Check MFA settings and user status</li>
          <li><strong>Access denied:</strong> Verify IP restrictions and time policies</li>
          <li><strong>Encryption errors:</strong> Check key configuration and certificates</li>
          <li><strong>Compliance gaps:</strong> Review policy settings and audit logs</li>
          <li><strong>Performance issues:</strong> Check security overhead and resource usage</li>
        </ul>

        <h3>Configuration problems</h3>
        <ul>
          <li><strong>Policy conflicts:</strong> Check for overlapping or contradictory rules</li>
          <li><strong>Integration issues:</strong> Verify SSO and API configurations</li>
          <li><strong>Logging problems:</strong> Check log levels and storage configuration</li>
          <li><strong>Alert failures:</strong> Verify notification settings and channels</li>
          <li><strong>Backup issues:</strong> Check encryption and storage settings</li>
        </ul>

        <Callout type="warning">
          <strong>Important:</strong> Always test security changes in a staging environment before applying to production.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/admin/system-configuration">System Configuration</a> - Customize other system settings</li>
          <li><a href="/docs/admin/backup-and-recovery">Backup & Recovery</a> - Ensure data protection and availability</li>
          <li><a href="/docs/api/authentication">Authentication</a> - Configure API security and access</li>
        </ul>
      </div>

      <DocPager currentSlug="/security-settings" />
    </DocLayout>
  )
} 