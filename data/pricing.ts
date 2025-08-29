export type PricingTierId = "core" | "practice" | "firm" | "enterprise";

export type FeatureKey =
  | "private_workspace"
  | "guardrails_redaction"
  | "policy_controls"
  | "basic_workflows"
  | "email_support"
  | "audit_logs"
  | "advanced_workflow_builder"
  | "model_routing"
  | "dms_connectors"
  | "priority_support"
  | "usage_analytics"
  | "wos"                // Workflow Optimization Service
  | "dis_lite"           // Document Intelligence (lite)
  | "sso_saml"
  | "granular_policy_controls"
  | "sandbox_envs"
  | "admin_insights"
  | "scheduled_exports"
  | "dis_full"           // Document Intelligence (full)
  | "cvs"                // Citation Validation Service
  | "cis"                // Contract Intelligence Service
  | "cli"                // Client Intelligence Service
  | "crs"                // Enhanced Client Retention Service
  | "vpc_onprem"
  | "custom_slas"
  | "baahipaa"
  | "adv_governance"
  | "dedicated_success"
  | "fractional_cto";

export const featureTooltips: Record<FeatureKey, string> = {
  private_workspace: "Isolated, tenant-scoped workspace for data & models.",
  guardrails_redaction: "PII/PHI redaction and prompt/content guardrails.",
  policy_controls: "Admin-enforced usage policies & model access.",
  basic_workflows: "Core automations for intake, docs, and billing.",
  email_support: "Business-hours email support.",
  audit_logs: "Standard audit logs for user and system actions.",
  advanced_workflow_builder: "Drag-and-drop, conditional logic, multi-step approvals.",
  model_routing: "Route by task: local (Ollama), vendor, or custom models.",
  dms_connectors: "Connect NetDocuments/iManage (on roadmap).",
  priority_support: "Priority ticket routing and faster SLAs.",
  usage_analytics: "Feature adoption & usage dashboards.",
  wos: "AI-driven bottleneck detection, performance scoring, and optimization steps.",
  dis_lite: "Structural/grammar checks and basic doc quality hints.",
  sso_saml: "Single Sign-On with SAML/SSO providers.",
  granular_policy_controls: "Per-role/per-feature policy & permission controls.",
  sandbox_envs: "Dedicated test environment for safe experimentation.",
  admin_insights: "Admin-only dashboards for usage & risk.",
  scheduled_exports: "Automated exports to your DMS/data lake.",
  dis_full: "Anomaly detection, risk/compliance checks, quality scoring.",
  cvs: "Real-time citation verification, overruling detection, and suggestions.",
  cis: "Contract risk detection, compliance validation, benchmarking, and scoring.",
  cli: "Client risk profiling, churn prediction, and opportunity identification.",
  crs: "Churn timeline, ROI modeling, and segment-based retention strategies.",
  vpc_onprem: "Private VPC or on-prem deployment.",
  custom_slas: "Contracted support SLAs tailored to your firm.",
  baahipaa: "HIPAA/BAA compliance support & controls.",
  adv_governance: "Advanced governance with audit & retention policies.",
  dedicated_success: "Named success manager & guided rollout.",
  fractional_cto: "Optional CTO advisory for strategy & architecture."
};

export interface PricingTier {
  id: PricingTierId;
  name: string;
  monthlyPrice: number | "custom";
  perUser: string | null; // "$39/user/mo", etc.
  userCap?: string;       // "Up to 10 users", etc.
  badge?: "Most Popular" | null;
  blurb: string;
  paragraph: string;
  bestFor: string;
  ctaLabel: string;       // "Schedule a Meeting"
  features: string[];
  featureKeys?: FeatureKey[]; // Optional mapping for tooltips
}

export const pricingTiers: PricingTier[] = [
  {
    id: "core",
    name: "Core",
    userCap: "Up to 10 users",
    monthlyPrice: 1500,
    perUser: "$39/user/mo",
    badge: null,
    blurb: "The safest way to start with Private AI.",
    paragraph: "Get started with a safe, private AI workspace designed for smaller firms. Core gives you guardrails, policy controls, and simple workflows so you can explore AI without risk.",
    bestFor: "Solo attorneys & small firms ready to explore AI safely.",
    ctaLabel: "Schedule a Meeting",
    features: [
      "Private workspace",
      "Guardrails & redaction",
      "Policy controls",
      "Basic workflows",
      "Email support",
      "Standard audit logs"
    ],
    featureKeys: [
      "private_workspace",
      "guardrails_redaction",
      "policy_controls",
      "basic_workflows",
      "email_support",
      "audit_logs"
    ]
  },
  {
    id: "practice",
    name: "Practice",
    userCap: "Up to 25 users",
    monthlyPrice: 3500,
    perUser: "$35/user/mo",
    badge: "Most Popular",
    blurb: "Add power and automation for growing practices.",
    paragraph: "Scale your practice with advanced automation and AI optimization. Connect your DMS, streamline workflows, and capture more billable hours as your firm grows.",
    bestFor: "Firms scaling up automation & collaboration.",
    ctaLabel: "Schedule a Meeting",
    features: [
      "Everything in Core",
      "Advanced workflow builder",
      "Model routing",
      "DMS connectors*",
      "Priority support",
      "Usage analytics",
      "⚡ Workflow Optimization Service (bottlenecks, performance scoring, recommendations)",
      "Document Intelligence (lite): structure & grammar checks"
    ],
    featureKeys: [
      "advanced_workflow_builder",
      "model_routing",
      "dms_connectors",
      "priority_support",
      "usage_analytics",
      "wos",
      "dis_lite"
    ]
  },
  {
    id: "firm",
    name: "Firm",
    userCap: "Up to 50 users",
    monthlyPrice: 6000,
    perUser: "$32/user/mo",
    badge: null,
    blurb: "Enterprise-grade security and control.",
    paragraph: "Built for mid-sized firms that need enterprise-grade compliance and control. Firm adds SSO, granular policies, and sandbox environments to keep teams secure and efficient.",
    bestFor: "Mid-size firms with compliance & IT requirements.",
    ctaLabel: "Schedule a Meeting",
    features: [
      "Everything in Practice",
      "SSO/SAML",
      "Granular policy controls",
      "Sandbox environments",
      "Admin insights",
      "Scheduled exports",
      "🧠 Document Intelligence (full): anomaly detection, risk & compliance assessment, formatting consistency",
      "📚 Citation Validation Service: real-time verification, overruling detection, related suggestions, batch validation"
    ],
    featureKeys: [
      "sso_saml",
      "granular_policy_controls",
      "sandbox_envs",
      "admin_insights",
      "scheduled_exports",
      "dis_full",
      "cvs"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    userCap: "Contact us",
    monthlyPrice: "custom",
    perUser: null,
    badge: null,
    blurb: "Tailored deployments for the largest firms.",
    paragraph: "Tailored for the largest firms, in-house legal, and regulated industries. Enterprise unlocks the full Legal Intelligence Suite plus custom deployments, governance, and dedicated success support.",
    bestFor: "AmLaw 200, in-house legal, or regulated industries.",
    ctaLabel: "Schedule a Meeting",
    features: [
      "Unlimited org size",
      "Private VPC/on-prem",
      "Custom SLAs",
      "BAA/HIPAA",
      "Advanced governance",
      "Dedicated success",
      "Optional: Fractional CTO advisory",
      "📋 Contract Intelligence Service: risk detection, compliance validation (GDPR/HIPAA/SOX/CCPA), industry benchmarking, optimization recommendations, risk scoring",
      "👥 Client Intelligence Service: risk profiling, churn prediction, segmentation, payment risk, opportunity identification, comms analysis",
      "💙 Enhanced Client Retention Service: predictive churn with timeline, ROI calculation, segment-based strategies"
    ],
    featureKeys: [
      "cis",
      "cli",
      "crs",
      "vpc_onprem",
      "custom_slas",
      "baahipaa",
      "adv_governance",
      "dedicated_success",
      "fractional_cto"
    ]
  }
];

// Footnote text used on the page
export const pricingFootnote = "*NetDocuments / iManage connectors on the roadmap. Contact us for timeline.";

// Comparison matrix for the plans table
export const planMatrix: Array<{
  key: FeatureKey;
  label: string;
  tiers: { core: boolean; practice: boolean; firm: boolean; enterprise: boolean };
}> = [
  { key: "private_workspace", label: "Private workspace", tiers: { core: true, practice: true, firm: true, enterprise: true } },
  { key: "guardrails_redaction", label: "Guardrails & redaction", tiers: { core: true, practice: true, firm: true, enterprise: true } },
  { key: "policy_controls", label: "Policy controls", tiers: { core: true, practice: true, firm: true, enterprise: true } },
  { key: "basic_workflows", label: "Basic workflows", tiers: { core: true, practice: true, firm: true, enterprise: true } },
  { key: "advanced_workflow_builder", label: "Advanced workflow builder", tiers: { core: false, practice: true, firm: true, enterprise: true } },
  { key: "model_routing", label: "Model routing", tiers: { core: false, practice: true, firm: true, enterprise: true } },
  { key: "dms_connectors", label: "DMS connectors", tiers: { core: false, practice: true, firm: true, enterprise: true } },
  { key: "usage_analytics", label: "Usage analytics", tiers: { core: false, practice: true, firm: true, enterprise: true } },
  { key: "wos", label: "Workflow Optimization Service", tiers: { core: false, practice: true, firm: true, enterprise: true } },
  { key: "dis_lite", label: "Document Intelligence (lite)", tiers: { core: false, practice: true, firm: true, enterprise: true } },
  { key: "sso_saml", label: "SSO/SAML", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "granular_policy_controls", label: "Granular policy controls", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "sandbox_envs", label: "Sandbox environments", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "admin_insights", label: "Admin insights", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "scheduled_exports", label: "Scheduled exports", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "dis_full", label: "Document Intelligence (full)", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "cvs", label: "Citation Validation Service", tiers: { core: false, practice: false, firm: true, enterprise: true } },
  { key: "cis", label: "Contract Intelligence Service", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "cli", label: "Client Intelligence Service", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "crs", label: "Enhanced Client Retention Service", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "vpc_onprem", label: "Private VPC/on-prem", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "custom_slas", label: "Custom SLAs", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "baahipaa", label: "BAA/HIPAA", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "adv_governance", label: "Advanced governance", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "dedicated_success", label: "Dedicated success", tiers: { core: false, practice: false, firm: false, enterprise: true } },
  { key: "fractional_cto", label: "Fractional CTO advisory (optional)", tiers: { core: false, practice: false, firm: false, enterprise: true } }
];
