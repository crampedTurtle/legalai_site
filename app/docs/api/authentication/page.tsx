import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Authentication - Sapphire Legal AI API Docs',
  description: 'Learn how to authenticate with the Sapphire Legal AI API.',
}

export default function AuthenticationPage() {
  return (
    <DocLayout currentSlug="/authentication" currentTitle="Authentication">
      <DocBreadcrumbs currentSlug="/authentication" currentTitle="Authentication" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Authentication</h1>
        <p className="text-xl text-dark-300">
          Secure your API requests with JWT tokens, API keys, and OAuth2 authentication.
        </p>

        <h2>Overview</h2>
        <p>
          The Sapphire Legal AI API supports multiple authentication methods to secure your requests 
          and control access to your data and resources.
        </p>

        <h2>Authentication methods</h2>
        <h3>JWT (JSON Web Tokens)</h3>
        <p>
          JWT tokens are the primary authentication method for user-based API access. 
          They provide secure, stateless authentication with built-in expiration.
        </p>
        
        <h4>Getting a JWT token</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}`}
        </pre>

        <h4>Using JWT tokens</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`GET /api/cases
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json`}
        </pre>

        <h3>API Keys</h3>
        <p>
          API keys provide long-term access for service-to-service communication and integrations. 
          They're ideal for automated systems and background processes.
        </p>

        <h4>Generating API keys</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`POST /api/admin/api-keys
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Integration API Key",
  "permissions": ["read:cases", "write:documents"],
  "expires_at": "2025-12-31T23:59:59Z"
}`}
        </pre>

        <h4>Using API keys</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`GET /api/cases
X-API-Key: sk_live_1234567890abcdef...
Content-Type: application/json`}
        </pre>

        <h3>OAuth2 (Enterprise)</h3>
        <p>
          OAuth2 provides enterprise-grade authentication for organizations using SSO systems 
          like Azure AD, Okta, or custom identity providers.
        </p>

        <h4>OAuth2 flow</h4>
        <ol>
          <li>Redirect users to authorization endpoint</li>
          <li>User authenticates with identity provider</li>
          <li>Receive authorization code</li>
          <li>Exchange code for access token</li>
          <li>Use access token for API requests</li>
        </ol>

        <h2>Security best practices</h2>
        <h3>Token management</h3>
        <ul>
          <li><strong>Store securely:</strong> Never hardcode tokens in source code</li>
          <li><strong>Rotate regularly:</strong> Update API keys and refresh JWT tokens</li>
          <li><strong>Monitor usage:</strong> Track token usage for security anomalies</li>
          <li><strong>Scope permissions:</strong> Use minimal required permissions</li>
          <li><strong>Expire tokens:</strong> Set appropriate expiration times</li>
        </ul>

        <h3>Request security</h3>
        <ul>
          <li><strong>Use HTTPS:</strong> Always make requests over secure connections</li>
          <li><strong>Validate responses:</strong> Verify response authenticity</li>
          <li><strong>Handle errors:</strong> Implement proper error handling</li>
          <li><strong>Rate limiting:</strong> Respect API rate limits</li>
          <li><strong>Logging:</strong> Log authentication events for audit</li>
        </ul>

        <h2>Error handling</h2>
        <h3>Common authentication errors</h3>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">Status Code</th>
              <th className="border border-dark-700 p-2 text-left">Error</th>
              <th className="border border-dark-700 p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2">401</td>
              <td className="border border-dark-700 p-2">Unauthorized</td>
              <td className="border border-dark-700 p-2">Invalid or missing authentication</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">403</td>
              <td className="border border-dark-700 p-2">Forbidden</td>
              <td className="border border-dark-700 p-2">Valid token but insufficient permissions</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">429</td>
              <td className="border border-dark-700 p-2">Too Many Requests</td>
              <td className="border border-dark-700 p-2">Rate limit exceeded</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">500</td>
              <td className="border border-dark-700 p-2">Internal Server Error</td>
              <td className="border border-dark-700 p-2">Server-side authentication error</td>
            </tr>
          </tbody>
        </table>

        <h3>Error response format</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "error": "unauthorized",
  "error_description": "Invalid or expired token",
  "error_code": "AUTH_001",
  "timestamp": "2025-01-20T10:30:00Z",
  "request_id": "req_1234567890abcdef"
}`}
        </pre>

        <h2>Code examples</h2>
        <h3>cURL examples</h3>
        <h4>JWT Authentication</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`# Login to get JWT token
curl -X POST https://api.sapphirelegal.ai/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "password123"}'

# Use JWT token for API request
curl -X GET https://api.sapphirelegal.ai/api/cases \\
  -H "Authorization: Bearer <your_jwt_token>" \\
  -H "Content-Type: application/json"`}
        </pre>

        <h4>API Key Authentication</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`# API request with API key
curl -X GET https://api.sapphirelegal.ai/api/cases \\
  -H "X-API-Key: <your_api_key>" \\
  -H "Content-Type: application/json"`}
        </pre>

        <h3>JavaScript examples</h3>
        <h4>Fetch API with JWT</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`// Login and get token
const loginResponse = await fetch('https://api.sapphirelegal.ai/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { token } = await loginResponse.json();

// Use token for API request
const casesResponse = await fetch('https://api.sapphirelegal.ai/api/cases', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const cases = await casesResponse.json();`}
        </pre>

        <h4>Fetch API with API Key</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`const response = await fetch('https://api.sapphirelegal.ai/api/cases', {
  headers: {
    'X-API-Key': 'your_api_key_here',
    'Content-Type': 'application/json'
  }
});

const cases = await response.json();`}
        </pre>

        <Callout type="warning">
          <strong>Security reminder:</strong> Never expose your API keys or JWT tokens in client-side code or public repositories.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/api/endpoints">API Endpoints</a> - Explore available API endpoints and methods</li>
          <li><a href="/docs/api/webhooks">Webhooks</a> - Set up event-driven notifications</li>
          <li><a href="/docs/api/sdks-and-libraries">SDKs & Libraries</a> - Use official client libraries</li>
        </ul>
      </div>

      <DocPager currentSlug="/authentication" />
    </DocLayout>
  )
} 