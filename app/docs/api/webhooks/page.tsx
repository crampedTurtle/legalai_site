import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'Webhooks - Sapphire Legal AI API Docs',
  description: 'Set up webhooks to receive real-time notifications from the system.',
}

export default function WebhooksPage() {
  return (
    <DocLayout currentSlug="/webhooks" currentTitle="Webhooks">
      <DocBreadcrumbs currentSlug="/webhooks" currentTitle="Webhooks" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>Webhooks</h1>
        <p className="text-xl text-dark-300">
          Receive real-time notifications about system events and integrate with your existing workflows.
        </p>

        <h2>Overview</h2>
        <p>
          Webhooks provide a way for your applications to receive real-time notifications when specific events 
          occur in Sapphire Legal AI. This enables seamless integration with external systems and automated workflows.
        </p>

        <h2>Core concepts</h2>
        <h3>How webhooks work</h3>
        <ol>
          <li>You register a webhook endpoint URL with Sapphire Legal AI</li>
          <li>When an event occurs, we send an HTTP POST request to your endpoint</li>
          <li>Your endpoint processes the webhook payload and takes appropriate action</li>
          <li>You return a 2xx status code to acknowledge receipt</li>
        </ol>

        <h3>Event types</h3>
        <p>
          Webhooks are triggered by various system events:
        </p>
        <ul>
          <li><strong>Case events:</strong> Case created, updated, status changed, assigned</li>
          <li><strong>Document events:</strong> Document uploaded, processed, updated, deleted</li>
          <li><strong>User events:</strong> User login, logout, permission changes</li>
          <li><strong>System events:</strong> Backup completed, maintenance scheduled, errors</li>
          <li><strong>AI events:</strong> AI processing started, completed, failed</li>
        </ul>

        <h2>Webhook configuration</h2>
        <h3>Creating a webhook</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`POST /api/v1/admin/webhooks
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Case Notifications",
  "url": "https://your-app.com/webhooks/sapphire",
  "events": ["case.created", "case.updated", "case.status_changed"],
  "secret": "your_webhook_secret",
  "active": true,
  "retry_policy": {
    "max_attempts": 5,
    "backoff_multiplier": 2,
    "initial_delay": 60
  }
}`}
        </pre>

        <h3>Webhook settings</h3>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">Setting</th>
              <th className="border border-dark-700 p-2 text-left">Type</th>
              <th className="border border-dark-700 p-2 text-left">Description</th>
              <th className="border border-dark-700 p-2 text-left">Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2"><code>name</code></td>
              <td className="border border-dark-700 p-2">string</td>
              <td className="border border-dark-700 p-2">Human-readable name for the webhook</td>
              <td className="border border-dark-700 p-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>url</code></td>
              <td className="border border-dark-700 p-2">string</td>
              <td className="border border-dark-700 p-2">HTTPS endpoint to receive webhooks</td>
              <td className="border border-dark-700 p-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>events</code></td>
              <td className="border border-dark-700 p-2">array</td>
              <td className="border border-dark-700 p-2">List of events to subscribe to</td>
              <td className="border border-dark-700 p-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>secret</code></td>
              <td className="border border-dark-700 p-2">string</td>
              <td className="border border-dark-700 p-2">Secret for signature verification</td>
              <td className="border border-dark-700 p-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>active</code></td>
              <td className="border border-dark-700 p-2">boolean</td>
              <td className="border border-dark-700 p-2">Whether webhook is active</td>
              <td className="border border-dark-700 p-2">No</td>
            </tr>
          </tbody>
        </table>

        <h2>Webhook payloads</h2>
        <h3>Standard payload format</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "id": "webhook_1234567890abcdef",
  "event": "case.created",
  "timestamp": "2025-01-20T10:30:00Z",
  "data": {
    "case_id": "case_1234567890abcdef",
    "title": "Smith v. Johnson",
    "case_number": "CV-2025-001",
    "status": "active",
    "created_by": "user_1234567890abcdef"
  },
  "metadata": {
    "webhook_id": "webhook_1234567890abcdef",
    "attempt": 1,
    "delivery_id": "delivery_1234567890abcdef"
  }
}`}
        </pre>

        <h3>Case created event</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "id": "webhook_1234567890abcdef",
  "event": "case.created",
  "timestamp": "2025-01-20T10:30:00Z",
  "data": {
    "case_id": "case_1234567890abcdef",
    "title": "Smith v. Johnson",
    "case_number": "CV-2025-001",
    "case_type": "litigation",
    "jurisdiction": "federal",
    "client_name": "John Smith",
    "status": "active",
    "priority": "high",
    "created_by": "user_1234567890abcdef",
    "created_at": "2025-01-20T10:30:00Z"
  }
}`}
        </pre>

        <h3>Document uploaded event</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "id": "webhook_1234567890abcdef",
  "event": "document.uploaded",
  "timestamp": "2025-01-20T10:30:00Z",
  "data": {
    "document_id": "doc_1234567890abcdef",
    "case_id": "case_1234567890abcdef",
    "title": "Complaint",
    "document_type": "pleading",
    "file_size": 1048576,
    "file_type": "application/pdf",
    "uploaded_by": "user_1234567890abcdef",
    "uploaded_at": "2025-01-20T10:30:00Z"
  }
}`}
        </pre>

        <h2>Security and verification</h2>
        <h3>Signature verification</h3>
        <p>
          Each webhook includes a signature header that you can use to verify the request authenticity:
        </p>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`X-Sapphire-Signature: t=1234567890,v1=abc123def456...
X-Sapphire-Timestamp: 1234567890`}
        </pre>

        <h4>Verification process</h4>
        <ol>
          <li>Extract the timestamp and signature from headers</li>
          <li>Concatenate the timestamp and request body</li>
          <li>Create HMAC SHA256 using your webhook secret</li>
          <li>Compare the computed signature with the received signature</li>
        </ol>

        <h4>Example verification (Node.js)</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, timestamp, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(timestamp + '.' + payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}
        </pre>

        <h2>Retry policy</h2>
        <h3>Automatic retries</h3>
        <p>
          If your webhook endpoint fails to respond or returns an error, we automatically retry delivery:
        </p>
        <ul>
          <li><strong>Retry attempts:</strong> Up to 5 attempts by default</li>
          <li><strong>Backoff strategy:</strong> Exponential backoff with jitter</li>
          <li><strong>Initial delay:</strong> 60 seconds</li>
          <li><strong>Maximum delay:</strong> 1 hour</li>
          <li><strong>Total timeout:</strong> 24 hours</li>
        </ul>

        <h3>Retry conditions</h3>
        <p>
          Webhooks are retried when your endpoint:
        </p>
        <ul>
          <li>Returns a 4xx or 5xx HTTP status code</li>
          <li>Doesn't respond within 30 seconds</li>
          <li>Returns a malformed response</li>
          <li>Is unreachable (network errors)</li>
        </ul>

        <h3>Dead letter queue</h3>
        <p>
          After all retry attempts are exhausted, failed webhooks are moved to a dead letter queue 
          for manual investigation and processing.
        </p>

        <h2>Best practices</h2>
        <h3>Webhook endpoint design</h3>
        <ul>
          <li><strong>Idempotency:</strong> Handle duplicate webhooks gracefully</li>
          <li><strong>Quick response:</strong> Return 2xx status immediately, process asynchronously</li>
          <li><strong>Error handling:</strong> Log errors and return appropriate status codes</li>
          <li><strong>Security:</strong> Always verify webhook signatures</li>
          <li><strong>Monitoring:</strong> Track webhook delivery success and failures</li>
        </ul>

        <h3>Performance considerations</h3>
        <ul>
          <li>Process webhooks asynchronously when possible</li>
          <li>Use connection pooling for database operations</li>
          <li>Implement proper timeout handling</li>
          <li>Monitor endpoint response times</li>
          <li>Scale your webhook endpoint as needed</li>
        </ul>

        <h2>Testing webhooks</h2>
        <h3>Test endpoint</h3>
        <p>
          Use our test endpoint to verify your webhook configuration:
        </p>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`POST /api/v1/admin/webhooks/{webhook_id}/test
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "event_type": "case.created",
  "test_data": {
    "case_id": "test_case_123",
    "title": "Test Case"
  }
}`}
        </pre>

        <h3>Local testing</h3>
        <p>
          For local development, use tools like ngrok to expose your local endpoint:
        </p>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`# Install ngrok
npm install -g ngrok

# Expose local endpoint
ngrok http 3000

# Use the ngrok URL as your webhook endpoint
https://abc123.ngrok.io/webhooks/sapphire`}
        </pre>

        <Callout type="tip">
          <strong>Pro tip:</strong> Use webhook signatures to ensure you're only processing legitimate requests from Sapphire Legal AI.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/api/sdks-and-libraries">SDKs & Libraries</a> - Use official client libraries</li>
          <li><a href="/docs/admin/system-configuration">System Configuration</a> - Configure webhook settings</li>
          <li><a href="/docs/api/endpoints">API Endpoints</a> - Explore other API capabilities</li>
        </ul>
      </div>

      <DocPager currentSlug="/webhooks" />
    </DocLayout>
  )
} 