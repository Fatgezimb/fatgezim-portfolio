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
  privacyNotes: readonly string[];
  demoStory: readonly string[];
  uncertaintyFlags: readonly string[];
};

export const featuredProjects = [
  {
    id: "bela-behavior-data-lab",
    verifiedPublicName: "Bela Behavior Data Lab",
    aliases: ["Bela Data Lab"],
    status:
      "Active public operational product with synthetic demos; its paid operational subscription is not connected.",
    summary:
      "A browser-local operations workspace that turns Rethink appointment exports into reviewable dashboards, follow-up views, and report-ready outputs.",
    problem:
      "Help behavioral-health operators examine appointment data without sending protected source files to an application backend.",
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
      "synthetic lite and full-workspace demos",
      "operations, people, money, action, and report views",
      "staff and client drill-downs",
      "PDF-ready report outputs",
    ],
    evidenceLinks: ["https://neuropathlabs.com/"],
    privacyNotes: [
      "Use only the bundled synthetic or anonymized demo data in portfolio materials.",
      "Never expose real appointment rows, exports, client or staff names, service dates, notes, or generated reports.",
      "Do not describe the product as HIPAA-compliant or BAA-ready.",
    ],
    demoStory: [
      "Static placeholder: select a synthetic appointment export.",
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
    status:
      "Active public educational product with a public sales site and account-gated learning library.",
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
      "private no-PHI check-ins and printable tools",
    ],
    evidenceLinks: ["https://beladatalab.com/"],
    privacyNotes: [
      "Educational support only; not individualized clinical advice, a behavior plan, crisis guidance, or a guaranteed outcome.",
      "Do not collect or display child profiles, diagnoses, provider details, medical history, or other PHI.",
      "Do not imply that Zim independently created all clinical or educational content.",
    ],
    demoStory: [
      "Static placeholder: choose a caregiver topic or routine.",
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
    status: "Active public independent learning resource deployed on GitHub Pages.",
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
    privacyNotes: [
      "Independent educational resource; not an official BACB product, credential, assessment decision, or endorsement.",
      "Do not use BACB logos, copied test-bank wording, client information, or real assessment records.",
      "Practice progress remains local to the learner's browser.",
    ],
    demoStory: [
      "Static placeholder: open the 19-task competency map.",
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
    status:
      "Active frontend-local medical-learning prototype; its content is not production medical content.",
    summary:
      "A visual-learning prototype for rapid USMLE Step 1 recall, structured around source-aware cards, progressive disclosure, and learner-controlled review states.",
    problem:
      "Explore how medical learners can move from a visual prompt to explanation and review while keeping content provenance and review requirements visible.",
    audience: ["medical students", "medical educators", "future content reviewers"],
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
      "media provenance metadata",
    ],
    verifiedOutputs: [
      "Instant Recall Card engine",
      "source-owned design system and application shell",
      "local deck and review-state persistence",
      "keyboard-driven study controls",
      "visual source, license, provenance, and use-case records",
    ],
    evidenceLinks: ["https://github.com/Fatgezimb/StepSpark"],
    privacyNotes: [
      "Prototype content is educational and requires medical review before production use.",
      "Do not imply NBME affiliation, medical accuracy review, exam prediction, or improved learning outcomes.",
      "Use only appropriately licensed, attributed, or original visual media.",
    ],
    demoStory: [
      "Static placeholder: open a source-aware visual recall card.",
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
    status: "Active local workflow-automation project; no public deployment.",
    summary:
      "A local operator dashboard that makes selected Rethink workflows reviewable through queued work, explicit confirmation, bounded browser automation, and readable diagnostics.",
    problem:
      "Reduce repetitive browser-entry work while preserving human review, page confirmation, and accurate limits on what the automation supports.",
    audience: ["internal workflow operators", "behavioral-health operations teams"],
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
      "searchable custom-program queue",
      "behavior queue and six-step state model",
      "Import and Export Centers",
      "AI-ready prompt builder",
      "prepare-run and page-confirmation flow",
      "timeline, diagnostics, and raw run log",
    ],
    evidenceLinks: [],
    privacyNotes: [
      "Portfolio materials must use a sanitized local replica with invented, non-clinical records.",
      "Never expose real client information, authenticated Rethink screens, private state files, operational exports, or PHI.",
      "Do not imply that the tool bypasses authentication, review, or final human control.",
    ],
    demoStory: [
      "Static placeholder: select a synthetic queued program or behavior.",
      "Preview the Prepare Run and correct-page confirmation states.",
      "Show one supported staged automation step.",
      "End on a readable local run log and the manual-work boundary.",
    ],
    uncertaintyFlags: [
      "Behavior automation currently supports Step 1 only; Steps 2–6 remain manual checklist state.",
      "Live selector behavior can change with the third-party Rethink interface.",
    ],
  },
  {
    id: "neuropath-insight",
    verifiedPublicName: "NeuroPath Insight",
    aliases: [],
    status: "Private internal prototype; intentionally not deployed as a public product.",
    summary:
      "A private reimbursement-intelligence prototype that combines Transparency in Coverage data processing, benchmarking views, and exploratory machine-learning outputs.",
    problem:
      "Explore how public reimbursement files can be normalized into interpretable benchmarks and reviewable analytical signals for internal decision support.",
    audience: ["internal NeuroPath reviewers", "behavioral-health operations researchers"],
    role: "Private product concept and internal prototype",
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
      "DuckDB, CSV, and private-review JSON outputs",
      "rate, payer, state, and provider benchmark views",
      "CSV and PDF exports",
      "experimental opportunity and outlier model outputs",
      "synthetic fallback dataset for private review",
    ],
    evidenceLinks: [],
    privacyNotes: [
      "Use only synthetic data in portfolio representations and label every simulated value.",
      "Never publish private contract documents, provider-level source records, access details, or private generated datasets.",
      "Do not imply that analytical outputs are clinical guidance, customer results, or validated financial recommendations.",
    ],
    demoStory: [
      "Static placeholder: start with a clearly labeled synthetic public-data sample.",
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
    "All project preview areas remain static placeholders until the owner approves Phase 1.",
  ],
} as const;
