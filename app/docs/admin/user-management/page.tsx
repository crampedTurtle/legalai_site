import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'User Management - Sapphire Legal AI Docs',
  description: 'Add users, manage permissions, and control access to your system.',
}

export default function UserManagementPage() {
  return (
    <DocLayout currentSlug="/user-management" currentTitle="User Management">
      <DocBreadcrumbs currentSlug="/user-management" currentTitle="User Management" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>User Management</h1>
        <p className="text-xl text-dark-300">
          Control who has access to your system and what they can do with comprehensive user management tools.
        </p>

        <h2>Overview</h2>
        <p>
          User Management provides centralized control over user accounts, roles, permissions, and access levels 
          across your Sapphire Legal AI system.
        </p>

        <h2>Core tasks</h2>
        <h3>Adding new users</h3>
        <ol>
          <li>Navigate to <strong>Admin → Users → Invite</strong></li>
          <li>Enter user's email address and full name</li>
          <li>Select appropriate role and permissions</li>
          <li>Choose which cases/projects they can access</li>
          <li>Set account expiration if needed</li>
          <li>Send invitation email</li>
        </ol>

        <h3>User roles and permissions</h3>
        <ul>
          <li><strong>Super Admin:</strong> Full system access and configuration</li>
          <li><strong>Admin:</strong> User management and system settings</li>
          <li><strong>Attorney:</strong> Full case and document access</li>
          <li><strong>Paralegal:</strong> Case management and document editing</li>
          <li><strong>Associate:</strong> Limited case access with supervision</li>
          <li><strong>Read-Only:</strong> View-only access to assigned cases</li>
          <li><strong>Client:</strong> Limited access to their own cases</li>
        </ul>

        <h3>Access control</h3>
        <ul>
          <li><strong>Case-level permissions:</strong> Control access to specific cases</li>
          <li><strong>Document restrictions:</strong> Limit document viewing and editing</li>
          <li><strong>Feature access:</strong> Enable/disable specific functionality</li>
          <li><strong>Time-based access:</strong> Set account expiration dates</li>
          <li><strong>IP restrictions:</strong> Limit access to specific locations</li>
        </ul>

        <h3>User lifecycle management</h3>
        <ul>
          <li><strong>Account provisioning:</strong> Automated user setup workflows</li>
          <li><strong>Permission changes:</strong> Modify access as roles evolve</li>
          <li><strong>Account suspension:</strong> Temporarily disable access</li>
          <li><strong>Account termination:</strong> Remove access and archive data</li>
          <li><strong>Offboarding:</strong> Secure data transfer and cleanup</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Security best practices</h3>
        <ul>
          <li>Use the principle of least privilege</li>
          <li>Regularly review and audit user permissions</li>
          <li>Implement strong password policies</li>
          <li>Enable multi-factor authentication for all users</li>
          <li>Monitor and log all user activities</li>
        </ul>

        <h3>Role design</h3>
        <ul>
          <li>Create roles based on job functions, not individuals</li>
          <li>Document role responsibilities and permissions</li>
          <li>Regularly review and update role definitions</li>
          <li>Use role templates for consistency</li>
          <li>Test permissions before applying to production</li>
        </ul>

        <h3>Compliance considerations</h3>
        <ul>
          <li>Maintain audit trails for all access changes</li>
          <li>Implement segregation of duties</li>
          <li>Regular access reviews and certifications</li>
          <li>Document approval workflows for permission changes</li>
          <li>Ensure compliance with industry regulations</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For Super Admins</h3>
        <ul>
          <li>Manage system-wide user policies and settings</li>
          <li>Configure authentication and authorization systems</li>
          <li>Monitor system-wide security and access patterns</li>
          <li>Implement enterprise-wide security policies</li>
          <li>Coordinate with IT security teams</li>
        </ul>

        <h3>For Admins</h3>
        <ul>
          <li>Manage user accounts and permissions</li>
          <li>Configure role-based access controls</li>
          <li>Monitor user activity and access patterns</li>
          <li>Handle user onboarding and offboarding</li>
          <li>Respond to security incidents and access requests</li>
        </ul>

        <h3>For Practice Managers</h3>
        <ul>
          <li>Coordinate user access for case teams</li>
          <li>Ensure appropriate access for case assignments</li>
          <li>Monitor team productivity and access patterns</li>
          <li>Coordinate with administrative staff</li>
          <li>Maintain case-specific access controls</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common user issues</h3>
        <ul>
          <li><strong>Login failures:</strong> Check credentials and account status</li>
          <li><strong>Permission errors:</strong> Verify role assignments and case access</li>
          <li><strong>Access denied:</strong> Check IP restrictions and time limits</li>
          <li><strong>Feature not available:</strong> Verify feature permissions</li>
          <li><strong>Account locked:</strong> Check failed login attempts and policies</li>
        </ul>

        <h3>Administrative issues</h3>
        <ul>
          <li><strong>User not receiving invites:</strong> Check email settings and spam filters</li>
          <li><strong>Permission changes not taking effect:</strong> Verify role assignments and refresh</li>
          <li><strong>Bulk operations failing:</strong> Check file formats and validation rules</li>
          <li><strong>Audit logs incomplete:</strong> Verify logging configuration</li>
          <li><strong>Integration issues:</strong> Check SSO/SCIM configuration</li>
        </ul>

        <Callout type="note">
          <strong>Pro tip:</strong> Use role templates to ensure consistent permission sets across similar user types.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/admin/security-settings">Security Settings</a> - Configure authentication and security policies</li>
          <li><a href="/docs/admin/system-configuration">System Configuration</a> - Customize system-wide settings</li>
          <li><a href="/docs/api/authentication">Authentication</a> - Integrate with external identity systems</li>
        </ul>
      </div>

      <DocPager currentSlug="/user-management" />
    </DocLayout>
  )
} 