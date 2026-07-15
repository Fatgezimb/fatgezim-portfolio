export type ProjectRecord = {
  id: string;
  verifiedPublicName: string | null;
  aliases: readonly string[];
  status: string;
  summary: string;
  problem: string | null;
  audience: readonly string[];
  role: string | null;
  methods: readonly string[];
  verifiedOutputs: readonly string[];
  evidenceLinks: readonly string[];
  publicScope: string;
  privacyNotes: readonly string[];
  demoStory: readonly string[];
  uncertaintyFlags: readonly string[];
};

export const featuredProjects = [
  {
    id: "neurostack-explorer",
    verifiedPublicName: "NeuroStack Explorer",
    aliases: ["NeuroStack"],
    status: "Open-source scientific portfolio",
    summary:
      "An open-source neuroscience software explorer that turns a checksum-verified NWB dataset into readable, interactive views across data, models, and reproducible artifacts.",
    problem:
      "Make a real scientific software workflow inspectable without exposing a public notebook runtime or private research data.",
    audience: ["scientific software teams", "neuroscience researchers", "technical hiring teams"],
    role: "Creator and Scientific Software Developer",
    methods: ["Python", "TypeScript", "Pynapple", "NeMoS", "Stan", "PyTorch", "Plotly"],
    verifiedOutputs: [
      "validated public NWB derivative and deterministic synthetic fallback",
      "neural-data lab with raster, rate, tuning, and interval views",
      "checksummed model, notebook, and visualization artifacts",
      "accessible table and provenance alternatives for interactive figures",
    ],
    evidenceLinks: ["https://github.com/Fatgezimb/neurostack-explorer"],
    publicScope:
      "The portfolio preview uses a compact, precomputed scientific artifact. The full explorer and reproducibility record live in the linked repository.",
    privacyNotes: [
      "The browser receives compact public-derived or synthetic artifacts, not private participant records.",
      "The site does not expose arbitrary notebook execution or source NWB uploads.",
    ],
    demoStory: [
      "Start with the verified NWB-derived dataset and provenance label.",
      "Compare a firing-rate trace with a population summary.",
      "Inspect a model or 3D embedding-style view with its data boundary.",
      "End at the open-source repository and reproducibility record.",
    ],
    uncertaintyFlags: [
      "One public session and one frozen modeling task; results are demonstrations, not population claims.",
      "The linked repository is the source for the complete scientific explorer.",
    ],
  },
  {
    id: "bela-behavior-data-lab",
    verifiedPublicName: "Bela Behavior Data Lab",
    aliases: ["Bela Data Lab"],
    status: "Live operations product",
    summary:
      "A browser-local operations workspace that turns Rethink appointment exports into reviewable dashboards, follow-up views, and report-ready outputs.",
    problem:
      "Help behavioral-health operators review appointment data locally in the browser.",
    audience: ["BCBAs", "clinical leaders", "ABA operations teams"],
    role: "Co-founder and Co-builder",
    methods: [
      "React",
      "TypeScript",
      "Vite",
      "Clerk",
      "Stripe",
      "Supabase",
      "SheetJS",
      "jsPDF",
      "browser-local data processing",
    ],
    verifiedOutputs: [
      "Rethink AppointmentList import for spreadsheet and CSV files",
      "sample-data lite and full-workspace demos",
      "operations, people, money, action, and report views",
      "staff and client drill-downs",
      "PDF-ready report outputs",
    ],
    evidenceLinks: ["https://neuropathlabs.com/"],
    publicScope:
      "This preview uses sample appointment data.",
    privacyNotes: [
      "Use only the bundled synthetic or anonymized demo data in portfolio materials.",
      "Never expose real appointment rows, exports, client or staff names, service dates, notes, or generated reports.",
      "Do not describe the product as HIPAA-compliant or BAA-ready.",
    ],
    demoStory: [
      "Select a bundled synthetic appointment export.",
      "Preview local validation and normalization states.",
      "Open an operations summary and a safe follow-up view.",
      "End on a report-ready output and browser-local privacy note.",
    ],
    uncertaintyFlags: [
      "Do not claim subscribers, revenue, paid adoption, or a completed operational-product billing launch.",
      "Credit Meili Bela and Fatgezim “Zim” Bela; do not imply sole authorship.",
    ],
  },
  {
    id: "caregiver-academy",
    verifiedPublicName: "Bela Data Lab Caregiver Academy",
    aliases: ["Caregiver Academy"],
    status: "Live learning platform",
    summary:
      "A caregiver-facing learning library that translates behavioral concepts into guided lessons, practical scenarios, knowledge checks, and printable tools.",
    problem:
      "Make behavioral-health education more approachable and usable in everyday family routines without presenting individualized clinical care.",
    audience: ["caregivers", "families seeking practical educational support"],
    role: "Co-founder, Product Builder, and BCBA Contributor",
    methods: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Clerk",
      "Stripe Checkout",
      "server-verified access",
    ],
    verifiedOutputs: [
      "public product and policy pages",
      "account-gated learning library",
      "guided modules and lessons",
      "scenario decisions and knowledge checks",
      "private check-ins and printable tools",
    ],
    evidenceLinks: ["https://beladatalab.com/"],
    publicScope:
      "Educational support only—not individualized clinical advice, a behavior plan, or crisis guidance.",
    privacyNotes: [
      "Educational support only; not individualized clinical advice, a behavior plan, crisis guidance, or a guaranteed outcome.",
      "Do not collect or display child profiles, diagnoses, provider details, medical history, or other PHI.",
      "Do not imply that Zim independently created all clinical or educational content.",
    ],
    demoStory: [
      "Choose a broad caregiver topic or routine.",
      "Open a guided module and preview one educational scenario.",
      "Show a knowledge-check state and a printable next-step tool.",
      "End with the educational-scope and no-PHI boundaries.",
    ],
    uncertaintyFlags: [
      "Do not claim customer counts, learning outcomes, or clinical efficacy.",
      "Do not present the archived team-training and certificate system as the current public product.",
    ],
  },
  {
    id: "rbt-practice-hub",
    verifiedPublicName: "RBT Practice Hub",
    aliases: [],
    status: "Live study resource",
    summary:
      "A static study application that organizes practice across the 19 RBT Initial Competency Assessment tasks with original review materials and local progress tracking.",
    problem:
      "Turn a complex competency checklist into a clear, self-directed practice path without claiming official competence or certification.",
    audience: ["RBT candidates", "behavior technicians", "supervised ABA learners"],
    role: "Founder and Product Builder",
    methods: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "localStorage",
      "GitHub Actions",
      "GitHub Pages",
    ],
    verifiedOutputs: [
      "19-task competency map",
      "original flashcard deck",
      "original practice-question bank",
      "HTML and downloadable study guides",
      "browser-local practice-readiness and review history",
    ],
    evidenceLinks: [
      "https://fatgezimb.github.io/rbt-practice-hub/",
      "https://github.com/Fatgezimb/rbt-practice-hub",
    ],
    publicScope:
      "An independent study resource, not an official BACB product or assessment. Practice progress stays in the learner's browser.",
    privacyNotes: [
      "Independent educational resource; not an official BACB product, credential, assessment decision, or endorsement.",
      "Do not use BACB logos, copied test-bank wording, client information, or real assessment records.",
      "Practice progress remains local to the learner's browser.",
    ],
    demoStory: [
      "Open the 19-task competency map.",
      "Select a task and preview one original flashcard.",
      "Show one original practice-question state.",
      "End on a local progress update and independent-resource disclaimer.",
    ],
    uncertaintyFlags: [],
  },
  {
    id: "stepspark",
    verifiedPublicName: "StepSpark",
    aliases: [],
    status: "Medical-learning prototype",
    summary:
      "A visual-learning prototype for rapid USMLE Step 1 recall, structured around source-aware cards, progressive disclosure, and learner-controlled review states.",
    problem:
      "Explore a visual prompt-to-explanation study flow with source details and learner-controlled review.",
    audience: ["medical students", "medical educators"],
    role: "Creator and Product Builder",
    methods: [
      "React",
      "TypeScript",
      "Vite",
      "Zod",
      "Storybook",
      "Vitest",
      "Playwright",
      "accessibility testing",
      "source and license metadata",
    ],
    verifiedOutputs: [
      "Instant Recall Card engine",
      "custom design system and application shell",
      "local deck and review-state persistence",
      "keyboard-driven study controls",
      "visual source, license, intended-use, and review records",
    ],
    evidenceLinks: ["https://github.com/Fatgezimb/StepSpark"],
    publicScope:
      "Prototype content requires medical review before production use and is not affiliated with the NBME.",
    privacyNotes: [
      "Prototype content is educational and requires medical review before production use.",
      "Do not imply NBME affiliation, medical accuracy review, exam prediction, or improved learning outcomes.",
      "Use only appropriately licensed, attributed, or original visual media.",
    ],
    demoStory: [
      "Open a source-aware visual recall card.",
      "Move from prompt and prediction to the answer reveal.",
      "Show a confidence or review-state choice stored locally.",
      "End on the card's source, license, provenance, and review status.",
    ],
    uncertaintyFlags: [
      "No public deployment URL has been verified.",
      "Question generation, production content review, authentication, and analytics are not current product capabilities.",
    ],
  },
  {
    id: "rethink-automations",
    verifiedPublicName: "Rethink Automations",
    aliases: [],
    status: "Workflow automation beta",
    summary:
      "A local beta dashboard that guides users through queued Rethink workflows with page confirmation, Step 1 browser automation, and clear run logs.",
    problem:
      "Reduce repetitive browser entry while keeping users in control of page confirmation and final review.",
    audience: ["behavioral-health operations teams"],
    role: "Creator and Developer",
    methods: [
      "Python",
      "http.server",
      "HTML",
      "CSS",
      "JavaScript",
      "Playwright",
      "Chrome CDP",
      "local JSON state",
    ],
    verifiedOutputs: [
      "local beta review interface",
      "searchable custom-program queue",
      "behavior queue and six-step state model",
      "Import and Export Centers",
      "AI-ready prompt builder",
      "prepare-run and page-confirmation flow",
      "timeline, diagnostics, and raw run log",
    ],
    evidenceLinks: [],
    publicScope:
      "This preview uses fictional, non-clinical examples and demonstrates Step 1; steps 2–6 and final review remain manual.",
    privacyNotes: [
      "Show only a sanitized beta-site walkthrough or synthetic local demo in the portfolio.",
      "Portfolio materials must use a sanitized local replica with invented, non-clinical records.",
      "Never expose real client information, authenticated Rethink screens, private state files, operational exports, or PHI.",
      "Do not imply that the tool bypasses authentication, review, or final human control.",
    ],
    demoStory: [
      "Select a synthetic queued program or behavior.",
      "Preview the Prepare Run and correct-page confirmation states.",
      "Show one supported staged automation step.",
      "End on a readable local run log and the manual-work boundary.",
    ],
    uncertaintyFlags: [
      "NeuroPath relationship is currently a placeholder: NeuroPath-adjacent local operations beta, not a deployed public NeuroPath product.",
      "Behavior automation currently supports Step 1 only; Steps 2–6 remain manual checklist state.",
      "Live selector behavior can change with the third-party Rethink interface.",
    ],
  },
  {
    id: "neuropath-insight",
    verifiedPublicName: "NeuroPath Insight",
    aliases: [],
    status: "Data analysis prototype",
    summary:
      "A reimbursement analysis prototype that combines Transparency in Coverage data processing, benchmark views, and exploratory machine-learning outputs.",
    problem:
      "Turn public reimbursement files into readable benchmarks for internal analysis.",
    audience: ["internal NeuroPath reviewers", "behavioral-health operations researchers"],
    role: "Creator and Prototype Developer",
    methods: [
      "Python",
      "pandas",
      "DuckDB",
      "scikit-learn",
      "React",
      "Recharts",
      "Transparency in Coverage data",
      "Random Forest regression",
      "KMeans clustering",
      "Isolation Forest outlier detection",
    ],
    verifiedOutputs: [
      "payer-file ingestion and normalization pipeline",
      "DuckDB, CSV, and JSON analysis outputs",
      "rate, payer, state, and provider benchmark views",
      "CSV and PDF exports",
      "experimental opportunity and outlier model outputs",
      "sample fallback dataset for analysis",
    ],
    evidenceLinks: [],
    publicScope:
      "This preview uses simulated data. Its model outputs are exploratory, not clinical guidance or financial recommendations.",
    privacyNotes: [
      "Use only synthetic data in portfolio representations and label every simulated value.",
      "Never publish private contract documents, provider-level source records, access details, or private generated datasets.",
      "Do not imply that analytical outputs are clinical guidance, customer results, or validated financial recommendations.",
    ],
    demoStory: [
      "Start with a clearly labeled synthetic public-data sample.",
      "Show filtering and normalization into a local analytical table.",
      "Preview one benchmark and one experimental model output.",
      "End on method limitations, synthetic-data labeling, and private-review status.",
    ],
    uncertaintyFlags: [
      "No public deployment or customer use is claimed.",
      "Model outputs are exploratory and are not documented as validated recommendations or outcomes.",
    ],
  },
] as const satisfies readonly ProjectRecord[];

export const projectSelectionNotes = {
  selectionRationale:
    "The featured set prioritizes current, evidence-rich work across behavioral-health operations, caregiver and professional learning, medical education, workflow automation, and data engineering.",
  reserveProject: {
    name: "Role Atlas",
    reason:
      "Use as the public-safe engineering substitute if a private internal analytics prototype is removed from the featured set.",
  },
  editorialBoundaries: [
    "NeuroPath is company and founder context rather than a separate featured-project workflow.",
    "NeuroPath PracticeOS remains a private case-study reserve because it is PHI-capable and local-only.",
    "Computational neuroscience research remains research experience, not a featured project, until supporting artifacts are supplied.",
    "Archived training and certificate systems must not be presented as current public products.",
    "All project previews use sanitized miniature replicas with visible evidence and privacy boundaries.",
  ],
} as const;
