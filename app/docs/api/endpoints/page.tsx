import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'API Endpoints - Sapphire Legal AI API Docs',
  description: 'Complete API endpoint reference with examples and parameters.',
}

export default function EndpointsPage() {
  return (
    <DocLayout currentSlug="/endpoints" currentTitle="API Endpoints">
      <DocBreadcrumbs currentSlug="/endpoints" currentTitle="API Endpoints" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>API Endpoints</h1>
        <p className="text-xl text-dark-300">
          Complete reference for all available API endpoints, parameters, and response formats.
        </p>

        <h2>Overview</h2>
        <p>
          The Sapphire Legal AI API provides RESTful endpoints for managing cases, documents, users, 
          and system configurations. All endpoints return JSON responses and use standard HTTP status codes.
        </p>

        <h2>Base URL</h2>
        <p>
          All API requests should be made to:
        </p>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`https://api.sapphirelegal.ai/api/v1`}
        </pre>

        <h2>Rate limits</h2>
        <p>
          API requests are subject to rate limiting to ensure fair usage and system stability:
        </p>
        <ul>
          <li><strong>Authenticated users:</strong> 1000 requests per hour</li>
          <li><strong>API keys:</strong> 5000 requests per hour</li>
          <li><strong>Admin endpoints:</strong> 100 requests per hour</li>
        </ul>

        <h2>Core endpoints</h2>
        <h3>Authentication</h3>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">Method</th>
              <th className="border border-dark-700 p-2 text-left">Endpoint</th>
              <th className="border border-dark-700 p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2">POST</td>
              <td className="border border-dark-700 p-2"><code>/auth/login</code></td>
              <td className="border border-dark-700 p-2">User login and JWT token generation</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">POST</td>
              <td className="border border-dark-700 p-2"><code>/auth/refresh</code></td>
              <td className="border border-dark-700 p-2">Refresh expired JWT token</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">POST</td>
              <td className="border border-dark-700 p-2"><code>/auth/logout</code></td>
              <td className="border border-dark-700 p-2">Invalidate JWT token</td>
            </tr>
          </tbody>
        </table>

        <h3>Cases</h3>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">Method</th>
              <th className="border border-dark-700 p-2 text-left">Endpoint</th>
              <th className="border border-dark-700 p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2">GET</td>
              <td className="border border-dark-700 p-2"><code>/cases</code></td>
              <td className="border border-dark-700 p-2">List all cases (with pagination)</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">POST</td>
              <td className="border border-dark-700 p-2"><code>/cases</code></td>
              <td className="border border-dark-700 p-2">Create a new case</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">GET</td>
              <td className="border border-dark-700 p-2"><code>/cases/{'{id}'}</code></td>
              <td className="border border-dark-700 p-2">Get case details by ID</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">PUT</td>
              <td className="border border-dark-700 p-2"><code>/cases/{'{id}'}</code></td>
              <td className="border border-dark-700 p-2">Update case information</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">DELETE</td>
              <td className="border border-dark-700 p-2"><code>/cases/{'{id}'}</code></td>
              <td className="border border-dark-700 p-2">Delete a case</td>
            </tr>
          </tbody>
        </table>

        <h3>Documents</h3>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">Method</th>
              <th className="border border-dark-700 p-2 text-left">Endpoint</th>
              <th className="border border-dark-700 p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2">GET</td>
              <td className="border border-dark-700 p-2"><code>/cases/{'{case_id}'}/documents</code></td>
              <td className="border border-dark-700 p-2">List documents in a case</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">POST</td>
              <td className="border border-dark-700 p-2"><code>/cases/{'{case_id}'}/documents</code></td>
              <td className="border border-dark-700 p-2">Upload a new document</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">GET</td>
              <td className="border border-dark-700 p-2"><code>/documents/{'{id}'}</code></td>
              <td className="border border-dark-700 p-2">Get document metadata</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">GET</td>
              <td className="border border-dark-700 p-2"><code>/documents/{'{id}'}/content</code></td>
              <td className="border border-dark-700 p-2">Download document content</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">DELETE</td>
              <td className="border border-dark-700 p-2"><code>/documents/{'{id}'}</code></td>
              <td className="border border-dark-700 p-2">Delete a document</td>
            </tr>
          </tbody>
        </table>

        <h2>Request examples</h2>
        <h3>Creating a new case</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`POST /api/v1/cases
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Smith v. Johnson",
  "case_number": "CV-2025-001",
  "case_type": "litigation",
  "jurisdiction": "federal",
  "client_name": "John Smith",
  "description": "Contract dispute regarding software licensing agreement",
  "status": "active",
  "priority": "high"
}`}
        </pre>

        <h3>Uploading a document</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`POST /api/v1/cases/123/documents
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

{
  "file": <file_data>,
  "title": "Complaint",
  "document_type": "pleading",
  "tags": ["complaint", "initial_filing"],
  "description": "Initial complaint filed with the court"
}`}
        </pre>

        <h3>Searching cases</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`GET /api/v1/cases?search=contract&status=active&case_type=litigation&page=1&limit=20
Authorization: Bearer <your_jwt_token>
Content-Type: application/json`}
        </pre>

        <h2>Response formats</h2>
        <h3>Successful response</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "case_1234567890abcdef",
    "title": "Smith v. Johnson",
    "case_number": "CV-2025-001",
    "case_type": "litigation",
    "jurisdiction": "federal",
    "client_name": "John Smith",
    "description": "Contract dispute regarding software licensing agreement",
    "status": "active",
    "priority": "high",
    "created_at": "2025-01-20T10:30:00Z",
    "updated_at": "2025-01-20T10:30:00Z"
  },
  "meta": {
    "request_id": "req_1234567890abcdef",
    "timestamp": "2025-01-20T10:30:00Z"
  }
}`}
        </pre>

        <h3>Error response</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      },
      {
        "field": "case_number",
        "message": "Case number must be unique"
      }
    ]
  },
  "meta": {
    "request_id": "req_1234567890abcdef",
    "timestamp": "2025-01-20T10:30:00Z"
  }
}`}
        </pre>

        <h3>Paginated response</h3>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`{
  "success": true,
  "data": [
    // Array of case objects
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    },
    "request_id": "req_1234567890abcdef",
    "timestamp": "2025-01-20T10:30:00Z"
  }
}`}
        </pre>

        <h2>Query parameters</h2>
        <h3>Common parameters</h3>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">Parameter</th>
              <th className="border border-dark-700 p-2 text-left">Type</th>
              <th className="border border-dark-700 p-2 text-left">Description</th>
              <th className="border border-dark-700 p-2 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2"><code>page</code></td>
              <td className="border border-dark-700 p-2">integer</td>
              <td className="border border-dark-700 p-2">Page number for pagination</td>
              <td className="border border-dark-700 p-2">1</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>limit</code></td>
              <td className="border border-dark-700 p-2">integer</td>
              <td className="border border-dark-700 p-2">Number of items per page</td>
              <td className="border border-dark-700 p-2">20</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>search</code></td>
              <td className="border border-dark-700 p-2">string</td>
              <td className="border border-dark-700 p-2">Search query for text fields</td>
              <td className="border border-dark-700 p-2">contract</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>sort</code></td>
              <td className="border border-dark-700 p-2">string</td>
              <td className="border border-dark-700 p-2">Sort field</td>
              <td className="border border-dark-700 p-2">created_at</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2"><code>order</code></td>
              <td className="border border-dark-700 p-2">string</td>
              <td className="border border-dark-700 p-2">Sort order (asc/desc)</td>
              <td className="border border-dark-700 p-2">desc</td>
            </tr>
          </tbody>
        </table>

        <Callout type="tip">
          <strong>Pro tip:</strong> Use the <code>fields</code> parameter to request only the data you need, improving performance and reducing bandwidth.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/api/webhooks">Webhooks</a> - Set up event-driven notifications</li>
          <li><a href="/docs/api/sdks-and-libraries">SDKs & Libraries</a> - Use official client libraries</li>
          <li><a href="/docs/admin/system-configuration">System Configuration</a> - Customize API behavior</li>
        </ul>
      </div>

      <DocPager currentSlug="/endpoints" />
    </DocLayout>
  )
} 