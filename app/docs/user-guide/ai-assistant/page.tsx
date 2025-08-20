import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/DocLayout'
import { DocBreadcrumbs } from '@/components/docs/DocBreadcrumbs'
import { DocPager } from '@/components/docs/DocPager'
import { Callout } from '@/components/docs/Callout'

export const metadata: Metadata = {
  title: 'AI Assistant - Sapphire Legal AI Docs',
  description: 'Get the most from your AI assistant for research and document generation.',
}

export default function AIAssistantPage() {
  return (
    <DocLayout currentSlug="/ai-assistant" currentTitle="AI Assistant">
      <DocBreadcrumbs currentSlug="/ai-assistant" currentTitle="AI Assistant" />
      
      <div className="prose prose-invert prose-sapphire max-w-none">
        <h1>AI Assistant</h1>
        <p className="text-xl text-dark-300">
          Leverage artificial intelligence to accelerate research, improve drafting, and enhance your legal practice.
        </p>

        <h2>Overview</h2>
        <p>
          The AI Assistant is your intelligent partner for legal research, document analysis, and drafting assistance. 
          It learns from your practice and provides contextually relevant suggestions.
        </p>

        <h2>Core tasks</h2>
        <h3>Legal research assistance</h3>
        <ul>
          <li><strong>Case law search:</strong> Find relevant precedents and decisions</li>
          <li><strong>Statute analysis:</strong> Interpret and explain legal requirements</li>
          <li><strong>Regulatory guidance:</strong> Navigate complex compliance frameworks</li>
          <li><strong>Fact pattern analysis:</strong> Identify key legal issues and arguments</li>
          <li><strong>Citation verification:</strong> Check and format legal references</li>
        </ul>

        <h3>Document drafting support</h3>
        <ul>
          <li><strong>Initial drafts:</strong> Generate document structures and content</li>
          <li><strong>Language optimization:</strong> Improve clarity and legal precision</li>
          <li><strong>Style consistency:</strong> Maintain firm-specific writing standards</li>
          <li><strong>Compliance checking:</strong> Verify regulatory requirements</li>
          <li><strong>Revision suggestions:</strong> Improve existing content</li>
        </ul>

        <h3>Analysis and insights</h3>
        <ul>
          <li><strong>Document review:</strong> Identify potential issues and improvements</li>
          <li><strong>Risk assessment:</strong> Highlight potential legal risks</li>
          <li><strong>Strategy development:</strong> Suggest legal approaches and arguments</li>
          <li><strong>Opposing counsel analysis:</strong> Research and analyze opposing positions</li>
          <li><strong>Client communication:</strong> Draft clear explanations for clients</li>
        </ul>

        <h2>Tips & best practices</h2>
        <h3>Effective prompting</h3>
        <ul>
          <li><strong>Be specific:</strong> Provide clear context and requirements</li>
          <li><strong>Use examples:</strong> Reference similar cases or documents</li>
          <li><strong>Set boundaries:</strong> Specify what you want and don't want</li>
          <li><strong>Iterate:</strong> Refine prompts based on results</li>
          <li><strong>Validate output:</strong> Always review AI-generated content</li>
        </ul>

        <h3>Quality assurance</h3>
        <ul>
          <li>Cross-reference AI research with primary sources</li>
          <li>Verify citations and legal authority</li>
          <li>Check for accuracy and completeness</li>
          <li>Ensure compliance with local rules and procedures</li>
          <li>Maintain human oversight on critical matters</li>
        </ul>

        <h3>Training and customization</h3>
        <ul>
          <li>Provide feedback on AI suggestions</li>
          <li>Use firm-specific examples and templates</li>
          <li>Train the AI on your writing style and preferences</li>
          <li>Share successful prompts with your team</li>
          <li>Regularly update training data and preferences</li>
        </ul>

        <h2>Role-based notes</h2>
        <h3>For Attorneys</h3>
        <ul>
          <li>Use AI for initial research and fact-gathering</li>
          <li>Leverage AI insights for case strategy development</li>
          <li>Use AI to draft routine correspondence and pleadings</li>
          <li>Validate AI research against primary sources</li>
          <li>Train the AI on your specific practice areas</li>
        </ul>

        <h3>For Paralegals</h3>
        <ul>
          <li>Use AI for document organization and categorization</li>
          <li>Leverage AI for initial document review</li>
          <li>Use AI to generate routine reports and summaries</li>
          <li>Train the AI on firm-specific procedures</li>
          <li>Monitor AI performance and accuracy</li>
        </ul>

        <h3>For Associates</h3>
        <ul>
          <li>Use AI to accelerate research and drafting</li>
          <li>Learn from AI suggestions and explanations</li>
          <li>Validate AI output against senior attorney guidance</li>
          <li>Develop effective prompting skills</li>
          <li>Contribute to AI training and improvement</li>
        </ul>

        <h2>Troubleshooting</h2>
        <h3>Common AI issues</h3>
        <ul>
          <li><strong>Inaccurate responses:</strong> Check prompt clarity and provide more context</li>
          <li><strong>Slow responses:</strong> Verify system status and try simpler prompts</li>
          <li><strong>Irrelevant suggestions:</strong> Refine your prompt and add examples</li>
          <li><strong>Style inconsistencies:</strong> Provide more firm-specific examples</li>
          <li><strong>Missing information:</strong> Check if the AI has access to required data</li>
        </ul>

        <h3>Performance optimization</h3>
        <ul>
          <li>Use clear, concise prompts</li>
          <li>Break complex requests into smaller parts</li>
          <li>Provide relevant context and examples</li>
          <li>Use consistent terminology and formatting</li>
          <li>Regularly update and refine your prompts</li>
        </ul>

        <Callout type="warning">
          <strong>Important:</strong> AI-generated content should always be reviewed by qualified legal professionals before use in legal proceedings.
        </Callout>

        <h2>What's next</h2>
        <ul>
          <li><a href="/docs/admin/system-configuration">System Configuration</a> - Customize AI settings and preferences</li>
          <li><a href="/docs/admin/security-settings">Security Settings</a> - Configure AI access and data handling</li>
          <li><a href="/docs/api/endpoints">API Endpoints</a> - Integrate AI capabilities into your workflows</li>
        </ul>
      </div>

      <DocPager currentSlug="/ai-assistant" />
    </DocLayout>
  )
} 