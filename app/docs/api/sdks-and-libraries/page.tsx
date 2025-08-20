import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'SDKs & Libraries - Sapphire Legal AI API Docs',
  description: 'Official SDKs and client libraries for popular programming languages.',
}

export default function SDKsAndLibrariesPage() {
  return (
    <DocLayout currentSlug="/sdks-and-libraries" currentTitle="SDKs & Libraries">
      <DocBreadcrumbs currentSlug="/sdks-and-libraries" currentTitle="SDKs & Libraries" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>SDKs & Libraries</h1>
        <p className="text-xl text-dark-300">
          Use official client libraries to integrate Sapphire Legal AI into your applications quickly and securely.
        </p>

        <h2>Overview</h2>
        <p>
          Official SDKs provide pre-built functionality for common API operations, handle authentication, 
          manage rate limiting, and provide type safety for your preferred programming language.
        </p>

        <h2>Available SDKs</h2>
        <h3>JavaScript/TypeScript</h3>
        <p>
          Our flagship SDK with full TypeScript support and comprehensive feature coverage.
        </p>
        
        <h4>Installation</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`# Using npm
npm install @sapphirelegal/ai-sdk

# Using yarn
yarn add @sapphirelegal/ai-sdk

# Using pnpm
pnpm add @sapphirelegal/ai-sdk`}
        </pre>

        <h4>Basic usage</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`import { SapphireClient } from '@sapphirelegal/ai-sdk';

const client = new SapphireClient({
  apiKey: 'your_api_key_here',
  // or use JWT token
  // token: 'your_jwt_token_here'
});

// Create a new case
const case = await client.cases.create({
  title: 'Smith v. Johnson',
  case_number: 'CV-2025-001',
  case_type: 'litigation',
  jurisdiction: 'federal'
});

// Upload a document
const document = await client.documents.upload(case.id, {
  file: fileBuffer,
  title: 'Complaint',
  document_type: 'pleading'
});

// Search cases
const cases = await client.cases.search({
  query: 'contract dispute',
  status: 'active',
  limit: 20
});`}
        </pre>

        <h4>Advanced features</h4>
        <ul>
          <li><strong>TypeScript support:</strong> Full type definitions for all API operations</li>
          <li><strong>Error handling:</strong> Comprehensive error classes and handling</li>
          <li><strong>Rate limiting:</strong> Automatic rate limit management and retry logic</li>
          <li><strong>Webhook handling:</strong> Built-in webhook signature verification</li>
          <li><strong>Streaming:</strong> Support for streaming responses and real-time updates</li>
        </ul>

        <h3>Python</h3>
        <p>
          Python SDK with async support and comprehensive documentation.
        </p>

        <h4>Installation</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`# Using pip
pip install sapphire-legal-ai

# Using poetry
poetry add sapphire-legal-ai

# Using conda
conda install -c conda-forge sapphire-legal-ai`}
        </pre>

        <h4>Basic usage</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`from sapphire_legal_ai import SapphireClient

# Initialize client
client = SapphireClient(api_key="your_api_key_here")

# Create a case
case = client.cases.create(
    title="Smith v. Johnson",
    case_number="CV-2025-001",
    case_type="litigation",
    jurisdiction="federal"
)

# Upload document
with open("complaint.pdf", "rb") as f:
    document = client.documents.upload(
        case_id=case.id,
        file=f,
        title="Complaint",
        document_type="pleading"
    )

# Search cases
cases = client.cases.search(
    query="contract dispute",
    status="active",
    limit=20
)`}
        </pre>

        <h3>Java</h3>
        <p>
          Enterprise-grade Java SDK with Spring Boot integration support.
        </p>

        <h4>Installation (Maven)</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`<dependency>
    <groupId>ai.sapphirelegal</groupId>
    <artifactId>sapphire-ai-sdk</artifactId>
    <version>1.0.0</version>
</dependency>`}
        </pre>

        <h4>Installation (Gradle)</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`implementation 'ai.sapphirelegal:sapphire-ai-sdk:1.0.0'`}
        </pre>

        <h4>Basic usage</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`import ai.sapphirelegal.SapphireClient;
import ai.sapphirelegal.models.Case;
import ai.sapphirelegal.models.Document;

// Initialize client
SapphireClient client = new SapphireClient.Builder()
    .apiKey("your_api_key_here")
    .build();

// Create a case
Case case = client.cases().create(Case.builder()
    .title("Smith v. Johnson")
    .caseNumber("CV-2025-001")
    .caseType("litigation")
    .jurisdiction("federal")
    .build());

// Upload document
Document document = client.documents().upload(case.getId(), 
    Document.builder()
        .file(fileBytes)
        .title("Complaint")
        .documentType("pleading")
        .build());`}
        </pre>

        <h3>Go</h3>
        <p>
          High-performance Go SDK with context support and idiomatic Go patterns.
        </p>

        <h4>Installation</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`go get github.com/sapphirelegal/ai-sdk-go`}
        </pre>

        <h4>Basic usage</h4>
        <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto">
{`package main

import (
    "context"
    "log"
    
    "github.com/sapphirelegal/ai-sdk-go"
)

func main() {
    ctx := context.Background()
    
    // Initialize client
    client := sapphire.NewClient("your_api_key_here")
    
    // Create a case
    case, err := client.Cases.Create(ctx, &sapphire.CaseRequest{
        Title:        "Smith v. Johnson",
        CaseNumber:   "CV-2025-001",
        CaseType:     "litigation",
        Jurisdiction: "federal",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    // Upload document
    document, err := client.Documents.Upload(ctx, case.ID, &sapphire.DocumentRequest{
        File:         fileBytes,
        Title:        "Complaint",
        DocumentType: "pleading",
    })
    if err != nil {
        log.Fatal(err)
    }
}`}
        </pre>

        <h2>Version support matrix</h2>
        <table className="w-full border-collapse border border-dark-700">
          <thead>
            <tr className="bg-dark-800">
              <th className="border border-dark-700 p-2 text-left">SDK</th>
              <th className="border border-dark-700 p-2 text-left">Current Version</th>
              <th className="border border-dark-700 p-2 text-left">API Version</th>
              <th className="border border-dark-700 p-2 text-left">Status</th>
              <th className="border border-dark-700 p-2 text-left">EOL Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-dark-700 p-2">JavaScript/TypeScript</td>
              <td className="border border-dark-700 p-2">1.5.0</td>
              <td className="border border-dark-700 p-2">v1</td>
              <td className="border border-dark-700 p-2">Active</td>
              <td className="border border-dark-700 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">Python</td>
              <td className="border border-dark-700 p-2">1.3.0</td>
              <td className="border border-dark-700 p-2">v1</td>
              <td className="border border-dark-700 p-2">Active</td>
              <td className="border border-dark-700 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">Java</td>
              <td className="border border-dark-700 p-2">1.2.0</td>
              <td className="border border-dark-700 p-2">v1</td>
              <td className="border border-dark-700 p-2">Active</td>
              <td className="border border-dark-700 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-dark-700 p-2">Go</td>
              <td className="border border-dark-700 p-2">1.1.0</td>
              <td className="border border-dark-700 p-2">v1</td>
              <td className="border border-dark-700 p-2">Active</td>
              <td className="border border-dark-700 p-2">-</td>
            </tr>
          </tbody>
        </table>

        <h2>SDK features</h2>
        <h3>Common capabilities</h3>
        <ul>
          <li><strong>Authentication:</strong> Automatic token management and refresh</li>
          <li><strong>Rate limiting:</strong> Built-in rate limit handling and backoff</li>
          <li><strong>Error handling:</strong> Consistent error types and retry logic</li>
          <li><strong>Logging:</strong> Configurable logging and debugging</li>
          <li><strong>Testing:</strong> Mock clients and testing utilities</li>
        </ul>

        <h3>Advanced features</h3>
        <ul>
          <li><strong>Webhook handling:</strong> Built-in webhook signature verification</li>
          <li><strong>Streaming:</strong> Support for real-time data streams</li>
          <li><strong>Batching:</strong> Efficient batch operations for multiple items</li>
          <li><strong>Caching:</strong> Intelligent caching for frequently accessed data</li>
          <li><strong>Metrics:</strong> Built-in performance monitoring and metrics</li>
        </ul>

        <h2>Getting started</h2>
        <h3>Quick start guide</h3>
        <ol>
          <li>Choose your preferred programming language</li>
          <li>Install the SDK using your package manager</li>
          <li>Get your API key from the Sapphire Legal AI dashboard</li>
          <li>Initialize the client with your credentials</li>
          <li>Start making API calls using the SDK methods</li>
        </ol>

        <h3>Authentication setup</h3>
        <p>
          All SDKs support both API key and JWT token authentication:
        </p>
        <ul>
          <li><strong>API Key:</strong> Long-term access for service-to-service communication</li>
          <li><strong>JWT Token:</strong> User-based authentication with automatic refresh</li>
          <li><strong>OAuth2:</strong> Enterprise SSO integration (JavaScript SDK only)</li>
        </ul>

        <h2>Examples and tutorials</h2>
        <h3>Common use cases</h3>
        <ul>
          <li><strong>Case management:</strong> Create, update, and search cases</li>
          <li><strong>Document handling:</strong> Upload, process, and manage documents</li>
          <li><strong>User management:</strong> Manage users and permissions</li>
          <li><strong>Webhook integration:</strong> Set up event-driven workflows</li>
          <li><strong>Bulk operations:</strong> Process multiple items efficiently</li>
        </ul>

        <h3>Integration patterns</h3>
        <ul>
          <li><strong>Web applications:</strong> Frontend integration with JavaScript SDK</li>
          <li><strong>Backend services:</strong> Server-side integration with Python/Java/Go</li>
          <li><strong>Mobile apps:</strong> Cross-platform mobile integration</li>
          <li><strong>Automation scripts:</strong> CLI tools and scheduled tasks</li>
          <li><strong>Data pipelines:</strong> ETL and analytics integration</li>
        </ul>

        <h2>Support and resources</h2>
        <h3>Documentation</h3>
        <ul>
          <li><strong>API Reference:</strong> Complete endpoint documentation</li>
          <li><strong>SDK Guides:</strong> Language-specific tutorials and examples</li>
          <li><strong>Code Samples:</strong> Ready-to-use code examples</li>
          <li><strong>Best Practices:</strong> Integration patterns and recommendations</li>
        </ul>

        <h3>Community and support</h3>
        <ul>
          <li><strong>GitHub:</strong> Open source SDK repositories</li>
          <li><strong>Discord:</strong> Community discussions and support</li>
          <li><strong>Stack Overflow:</strong> Q&A and troubleshooting</li>
          <li><strong>Support tickets:</strong> Enterprise support and assistance</li>
        </ul>

        <Callout type="tip">
          <strong>Pro tip:</strong> Start with the JavaScript/TypeScript SDK for the most comprehensive feature coverage and active development.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/api/authentication">Authentication</a> - Learn about authentication methods</li>
          <li><a href="/docs/api/endpoints">API Endpoints</a> - Explore available API operations</li>
          <li><a href="/docs/api/webhooks">Webhooks</a> - Set up event-driven integrations</li>
        </ul>
      </div>

      <DocPager currentSlug="/sdks-and-libraries" />
    </DocLayout>
  )
} 