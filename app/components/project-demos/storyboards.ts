import type { featuredProjects } from "@/app/content/projects";

export type FeaturedProjectId = (typeof featuredProjects)[number]["id"];

export type StoryboardFrameState =
  | "input"
  | "review"
  | "processing"
  | "complete"
  | "boundary";

export type StoryboardDetail = {
  label: string;
  value: string;
};

export type ProjectTheme = {
  /** Descriptive interface theme, not a claim about an external brand system. */
  label: string;
  accent: string;
  secondary: string;
  glow: string;
};

export type ArchitectureNodeKind =
  | "input"
  | "process"
  | "output"
  | "boundary";

export type ArchitectureNode = {
  id: string;
  kind: ArchitectureNodeKind;
  label: string;
  description: string;
  technologies: readonly string[];
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label: string;
};

export type ProjectArchitecture = {
  summary: string;
  nodes: readonly ArchitectureNode[];
  edges: readonly ArchitectureEdge[];
};

export type ProjectEvidenceLink = {
  label: string;
  href: string;
};

export type BehaviorDataLabDemoState = {
  kind: "behavior-data-lab";
  view: "workbook" | "validation" | "dashboard" | "report";
  fileLabel: string;
  items: readonly string[];
};

export type CaregiverAcademyDemoState = {
  kind: "caregiver-academy";
  view: "routine" | "lesson" | "check" | "tool";
  topic: string;
  items: readonly string[];
};

export type RbtPracticeDemoState = {
  kind: "rbt-practice";
  view: "map" | "flashcard" | "question" | "progress";
  activeTask: number;
  assessmentType: "With Client" | "Role-Play" | "Interview";
};

export type StepSparkDemoState = {
  kind: "stepspark";
  view: "prompt" | "reveal" | "review" | "provenance";
  cardLabel: string;
  reviewState: "Not yet rated" | "Local review state saved";
};

export type RethinkAutomationDemoState = {
  kind: "rethink-automation";
  view: "queue" | "confirmation" | "step-one" | "log";
  queueItem: string;
  log: readonly string[];
};

export type NeuroPathInsightDemoState = {
  kind: "neuropath-insight";
  view: "dataset" | "normalize" | "benchmark" | "limitations";
  datasetLabel: string;
  items: readonly string[];
};

export type ProjectDemoFrameData =
  | BehaviorDataLabDemoState
  | CaregiverAcademyDemoState
  | RbtPracticeDemoState
  | StepSparkDemoState
  | RethinkAutomationDemoState
  | NeuroPathInsightDemoState;

export type StoryboardFrame<TDemo extends ProjectDemoFrameData = ProjectDemoFrameData> = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  state: StoryboardFrameState;
  details: readonly StoryboardDetail[];
  demo: TDemo;
};

export type ProjectStoryboard<
  TDemo extends ProjectDemoFrameData = ProjectDemoFrameData,
> = {
  projectId: FeaturedProjectId;
  title: string;
  posterLabel: string;
  privacyLabel: string;
  statusLabel: string;
  dataLabel: string;
  authorshipLabel: string;
  theme: ProjectTheme;
  evidenceLinks: readonly ProjectEvidenceLink[];
  architecture: ProjectArchitecture;
  frames: readonly StoryboardFrame<TDemo>[];
};

const architectureKinds = {
  input: "input",
  process: "process",
  output: "output",
  boundary: "boundary",
} as const;

export const projectStoryboards = {
  "bela-behavior-data-lab": {
    projectId: "bela-behavior-data-lab",
    title: "Browser-local operations review",
    posterLabel: "Synthetic workbook → review → dashboard → report",
    privacyLabel: "Synthetic demo · source rows stay in the browser",
    statusLabel: "Active public product · paid operations subscription is not connected",
    dataLabel: "Bundled synthetic appointment-shaped data only",
    authorshipLabel: "Co-founded and co-built by Fatgezim “Zim” Bela and Meili Bela.",
    theme: {
      label: "Operations mint",
      accent: "#5eead4",
      secondary: "#22d3ee",
      glow: "rgba(45, 212, 191, 0.24)",
    },
    evidenceLinks: [
      { label: "NeuroPath", href: "https://neuropathlabs.com/" },
    ],
    architecture: {
      summary:
        "A sanitized view of the verified browser-local path from appointment-shaped input to reviewable operations and report surfaces.",
      nodes: [
        {
          id: "workbook",
          kind: architectureKinds.input,
          label: "Synthetic workbook",
          description: "Bundled spreadsheet or CSV-shaped sample selected by the visitor.",
          technologies: ["SheetJS"],
        },
        {
          id: "local-review",
          kind: architectureKinds.process,
          label: "Browser-local review",
          description: "Validation and normalization produce review categories without a source-file upload.",
          technologies: ["React", "TypeScript", "browser-local processing"],
        },
        {
          id: "operations-output",
          kind: architectureKinds.output,
          label: "Operations and report views",
          description: "People, action, operations, and PDF-ready surfaces organize the session.",
          technologies: ["jsPDF"],
        },
        {
          id: "privacy-boundary",
          kind: architectureKinds.boundary,
          label: "Portfolio boundary",
          description: "No real exports, appointment rows, client names, staff names, or PHI appear here.",
          technologies: [],
        },
      ],
      edges: [
        { from: "workbook", to: "local-review", label: "read locally" },
        {
          from: "local-review",
          to: "operations-output",
          label: "organize review state",
        },
        {
          from: "operations-output",
          to: "privacy-boundary",
          label: "stop at sanitized output",
        },
      ],
    },
    frames: [
      {
        id: "sample-import",
        eyebrow: "Input",
        title: "Synthetic workbook selected",
        body:
          "A bundled sample represents an appointment export without using real client, staff, service, or billing records.",
        state: "input",
        details: [
          { label: "Source", value: "Bundled synthetic workbook" },
          { label: "Processing", value: "Browser-local" },
        ],
        demo: {
          kind: "behavior-data-lab",
          view: "workbook",
          fileLabel: "synthetic-appointments.xlsx",
          items: ["Sample row A", "Sample row B", "Sample row C"],
        },
      },
      {
        id: "validation-review",
        eyebrow: "Review",
        title: "Import checks become review categories",
        body:
          "The preview groups validation and follow-up states before the operator opens a dashboard or report view.",
        state: "review",
        details: [
          { label: "Input", value: "Synthetic appointment rows" },
          { label: "Output", value: "Reviewable issue categories" },
        ],
        demo: {
          kind: "behavior-data-lab",
          view: "validation",
          fileLabel: "synthetic-appointments.xlsx",
          items: ["Import shape", "Required fields", "Follow-up categories"],
        },
      },
      {
        id: "operations-view",
        eyebrow: "Workspace",
        title: "Operational views organize the session",
        body:
          "Verified product surfaces include operations, people, money, action, and report views.",
        state: "processing",
        details: [
          { label: "Views", value: "Operations · People · Actions" },
          { label: "Data", value: "Synthetic session only" },
        ],
        demo: {
          kind: "behavior-data-lab",
          view: "dashboard",
          fileLabel: "Local review session",
          items: ["Operations", "People", "Actions", "Reports"],
        },
      },
      {
        id: "report-boundary",
        eyebrow: "Output",
        title: "Report-ready, without uploading the source",
        body:
          "The workflow ends on a PDF-ready output and a reminder that the portfolio preview contains no real operational data.",
        state: "boundary",
        details: [
          { label: "Output", value: "Sanitized report-ready view" },
          { label: "Boundary", value: "No real exports or PHI" },
        ],
        demo: {
          kind: "behavior-data-lab",
          view: "report",
          fileLabel: "Sanitized review report",
          items: ["Session summary", "Review notes", "Data boundary"],
        },
      },
    ],
  },
  "caregiver-academy": {
    projectId: "caregiver-academy",
    title: "Caregiver learning path",
    posterLabel: "Routine → guided lesson → knowledge check → printable tool",
    privacyLabel: "Educational support · no child profile or individualized plan",
    statusLabel: "Active public educational product",
    dataLabel: "Generic learning scenario · no family or child data",
    authorshipLabel:
      "Zim: Co-founder, Product Builder, and BCBA Contributor; jointly built with Meili Bela.",
    theme: {
      label: "Care teal",
      accent: "#34d399",
      secondary: "#2dd4bf",
      glow: "rgba(52, 211, 153, 0.22)",
    },
    evidenceLinks: [
      { label: "Bela Data Lab", href: "https://beladatalab.com/" },
    ],
    architecture: {
      summary:
        "A generic educational path showing how a broad caregiver topic can lead to a lesson, check, and practical printable tool.",
      nodes: [
        {
          id: "routine-topic",
          kind: architectureKinds.input,
          label: "Routine or topic",
          description: "The learner starts with a broad educational topic rather than a child record.",
          technologies: ["React", "TypeScript"],
        },
        {
          id: "guided-learning",
          kind: architectureKinds.process,
          label: "Guided learning",
          description: "Lessons, scenarios, and knowledge checks organize general educational support.",
          technologies: ["account-gated library", "server-verified access"],
        },
        {
          id: "practical-tool",
          kind: architectureKinds.output,
          label: "Practical tool",
          description: "A printable next-step tool makes the lesson easier to use outside the screen.",
          technologies: ["printable tools"],
        },
        {
          id: "care-boundary",
          kind: architectureKinds.boundary,
          label: "Educational boundary",
          description: "The product is not individualized care, a behavior plan, crisis guidance, or a guaranteed outcome.",
          technologies: [],
        },
      ],
      edges: [
        { from: "routine-topic", to: "guided-learning", label: "open module" },
        { from: "guided-learning", to: "practical-tool", label: "complete check" },
        { from: "practical-tool", to: "care-boundary", label: "retain scope" },
      ],
    },
    frames: [
      {
        id: "topic-choice",
        eyebrow: "Choose",
        title: "Start with an everyday routine",
        body:
          "The preview begins with a broad caregiver-learning topic rather than a child record, diagnosis, or treatment plan.",
        state: "input",
        details: [
          { label: "Topic", value: "Everyday routines" },
          { label: "Scope", value: "General education" },
        ],
        demo: {
          kind: "caregiver-academy",
          view: "routine",
          topic: "Everyday routines",
          items: ["Morning routine", "Transitions", "Communication"],
        },
      },
      {
        id: "guided-lesson",
        eyebrow: "Learn",
        title: "Open a guided lesson",
        body:
          "A short explanation and scenario turn a behavioral concept into plain-language learning without presenting individualized advice.",
        state: "processing",
        details: [
          { label: "Format", value: "Guided lesson and scenario" },
          { label: "Tone", value: "Practical and nonjudgmental" },
        ],
        demo: {
          kind: "caregiver-academy",
          view: "lesson",
          topic: "Everyday routines",
          items: ["Plain-language concept", "Generic scenario", "Practical reflection"],
        },
      },
      {
        id: "knowledge-check",
        eyebrow: "Check",
        title: "Review an educational decision",
        body:
          "The learner chooses a response and receives an explanation framed as education, not a clinical recommendation.",
        state: "review",
        details: [
          { label: "Interaction", value: "Scenario decision" },
          { label: "Feedback", value: "Educational explanation" },
        ],
        demo: {
          kind: "caregiver-academy",
          view: "check",
          topic: "Everyday routines",
          items: ["Read scenario", "Choose a response", "Open explanation"],
        },
      },
      {
        id: "printable-tool",
        eyebrow: "Use",
        title: "Leave with a printable next step",
        body:
          "The workflow closes with a practical tool and explicit boundaries around crisis guidance, treatment, and guaranteed outcomes.",
        state: "boundary",
        details: [
          { label: "Output", value: "Printable caregiver tool" },
          { label: "Boundary", value: "Not individualized care" },
        ],
        demo: {
          kind: "caregiver-academy",
          view: "tool",
          topic: "Everyday routines",
          items: ["Routine", "Observable next step", "Reflection note"],
        },
      },
    ],
  },
  "rbt-practice-hub": {
    projectId: "rbt-practice-hub",
    title: "Independent competency practice",
    posterLabel: "19-task map → flashcard → original question → local progress",
    privacyLabel: "Independent learning resource · no BACB affiliation",
    statusLabel: "Active public resource · deployed on GitHub Pages",
    dataLabel: "Original practice sample · local progress only",
    authorshipLabel: "Founded and built by Fatgezim “Zim” Bela.",
    theme: {
      label: "Practice amber",
      accent: "#fbbf24",
      secondary: "#fb7185",
      glow: "rgba(251, 191, 36, 0.2)",
    },
    evidenceLinks: [
      {
        label: "Open RBT Practice Hub",
        href: "https://fatgezimb.github.io/rbt-practice-hub/",
      },
      {
        label: "View source",
        href: "https://github.com/Fatgezimb/rbt-practice-hub",
      },
    ],
    architecture: {
      summary:
        "A static, browser-local study loop based on an original practice layer around the public 19-task competency structure.",
      nodes: [
        {
          id: "task-map",
          kind: architectureKinds.input,
          label: "19-task map",
          description: "The learner selects a task and assessment type to review.",
          technologies: ["React Router"],
        },
        {
          id: "original-practice",
          kind: architectureKinds.process,
          label: "Original practice",
          description: "Flashcards and questions provide independent review without copied test-bank content.",
          technologies: ["React", "TypeScript"],
        },
        {
          id: "local-history",
          kind: architectureKinds.output,
          label: "Local review history",
          description: "Practice readiness and review state remain in the learner's browser.",
          technologies: ["localStorage"],
        },
        {
          id: "independent-boundary",
          kind: architectureKinds.boundary,
          label: "Independent-resource boundary",
          description: "The app is not an official BACB product, competency decision, credential, or endorsement.",
          technologies: [],
        },
      ],
      edges: [
        { from: "task-map", to: "original-practice", label: "select task" },
        { from: "original-practice", to: "local-history", label: "record review" },
        { from: "local-history", to: "independent-boundary", label: "show disclaimer" },
      ],
    },
    frames: [
      {
        id: "competency-map",
        eyebrow: "Map",
        title: "Browse all 19 practice tasks",
        body:
          "The competency map organizes the public assessment structure into a navigable, self-directed study path.",
        state: "input",
        details: [
          { label: "Coverage", value: "19-task practice map" },
          { label: "Decision", value: "Choose a task to review" },
        ],
        demo: {
          kind: "rbt-practice",
          view: "map",
          activeTask: 1,
          assessmentType: "With Client",
        },
      },
      {
        id: "original-card",
        eyebrow: "Recall",
        title: "Review an original flashcard",
        body:
          "A learner opens an original study card tied to the selected task without copying a proprietary test bank.",
        state: "processing",
        details: [
          { label: "Material", value: "Original practice card" },
          { label: "Action", value: "Reveal and self-check" },
        ],
        demo: {
          kind: "rbt-practice",
          view: "flashcard",
          activeTask: 1,
          assessmentType: "With Client",
        },
      },
      {
        id: "practice-question",
        eyebrow: "Apply",
        title: "Answer an original practice question",
        body:
          "The response state records a local practice attempt and explanation, not an official competency decision.",
        state: "review",
        details: [
          { label: "Question", value: "Original educational scenario" },
          { label: "Result", value: "Local review state" },
        ],
        demo: {
          kind: "rbt-practice",
          view: "question",
          activeTask: 1,
          assessmentType: "Role-Play",
        },
      },
      {
        id: "local-progress",
        eyebrow: "Progress",
        title: "Keep practice history in this browser",
        body:
          "The final state shows browser-local review progress alongside the independent-resource and no-endorsement disclaimer.",
        state: "boundary",
        details: [
          { label: "Storage", value: "Browser localStorage" },
          { label: "Boundary", value: "Practice readiness only" },
        ],
        demo: {
          kind: "rbt-practice",
          view: "progress",
          activeTask: 1,
          assessmentType: "Interview",
        },
      },
    ],
  },
  stepspark: {
    projectId: "stepspark",
    title: "Source-aware instant recall",
    posterLabel: "Visual prompt → answer reveal → review state → provenance",
    privacyLabel: "Prototype content · medical review required before production use",
    statusLabel: "Active frontend-local medical-learning prototype",
    dataLabel: "Original placeholder visual · draft educational content",
    authorshipLabel: "Created and built by Fatgezim “Zim” Bela.",
    theme: {
      label: "Recall violet",
      accent: "#a78bfa",
      secondary: "#22d3ee",
      glow: "rgba(167, 139, 250, 0.24)",
    },
    evidenceLinks: [
      { label: "View source", href: "https://github.com/Fatgezimb/StepSpark" },
    ],
    architecture: {
      summary:
        "A frontend-local recall-card loop that keeps progressive disclosure, learner review state, and media provenance together.",
      nodes: [
        {
          id: "visual-card",
          kind: architectureKinds.input,
          label: "Source-aware visual card",
          description: "A draft learning object starts with an original or appropriately licensed visual and prompt.",
          technologies: ["provenance metadata"],
        },
        {
          id: "recall-engine",
          kind: architectureKinds.process,
          label: "Recall-card engine",
          description: "Prompt, prediction, answer, and rationale are disclosed under learner control.",
          technologies: ["React", "TypeScript", "Zod"],
        },
        {
          id: "review-state",
          kind: architectureKinds.output,
          label: "Local review state",
          description: "The learner records a review signal on the current device.",
          technologies: ["local persistence"],
        },
        {
          id: "medical-boundary",
          kind: architectureKinds.boundary,
          label: "Medical-content boundary",
          description: "Prototype material requires medical review and does not imply NBME affiliation or exam prediction.",
          technologies: ["source", "license", "review status"],
        },
      ],
      edges: [
        { from: "visual-card", to: "recall-engine", label: "open card" },
        { from: "recall-engine", to: "review-state", label: "record reflection" },
        { from: "review-state", to: "medical-boundary", label: "retain provenance" },
      ],
    },
    frames: [
      {
        id: "visual-prompt",
        eyebrow: "Prompt",
        title: "Open a source-aware recall card",
        body:
          "A draft visual and learner-facing prompt establish the cognitive task before the answer is revealed.",
        state: "input",
        details: [
          { label: "Surface", value: "Instant Recall Card" },
          { label: "Content", value: "Draft educational material" },
        ],
        demo: {
          kind: "stepspark",
          view: "prompt",
          cardLabel: "Draft visual recall card",
          reviewState: "Not yet rated",
        },
      },
      {
        id: "answer-reveal",
        eyebrow: "Reveal",
        title: "Compare the prediction with the explanation",
        body:
          "Progressive disclosure moves from prompt to answer and supporting rationale without claiming a production-reviewed question system.",
        state: "processing",
        details: [
          { label: "Flow", value: "Prompt · Prediction · Reveal" },
          { label: "Review", value: "Learner controlled" },
        ],
        demo: {
          kind: "stepspark",
          view: "reveal",
          cardLabel: "Draft visual recall card",
          reviewState: "Not yet rated",
        },
      },
      {
        id: "review-state",
        eyebrow: "Reflect",
        title: "Choose a local review state",
        body:
          "A confidence or review-state choice helps organize another pass while keeping the result on the learner's device.",
        state: "review",
        details: [
          { label: "Signal", value: "Confidence or review state" },
          { label: "Storage", value: "Local deck state" },
        ],
        demo: {
          kind: "stepspark",
          view: "review",
          cardLabel: "Draft visual recall card",
          reviewState: "Local review state saved",
        },
      },
      {
        id: "provenance",
        eyebrow: "Trust",
        title: "End on provenance and review status",
        body:
          "Source, license, provenance, use case, and medical-review requirements remain attached to the visual learning object.",
        state: "boundary",
        details: [
          { label: "Record", value: "Source · License · Provenance" },
          { label: "Boundary", value: "Not production medical content" },
        ],
        demo: {
          kind: "stepspark",
          view: "provenance",
          cardLabel: "Draft visual recall card",
          reviewState: "Local review state saved",
        },
      },
    ],
  },
  "rethink-automations": {
    projectId: "rethink-automations",
    title: "Reviewable local automation",
    posterLabel: "Synthetic queue → confirmation → supported Step 1 → readable log",
    privacyLabel: "Sanitized local replica · no authenticated screens or client data",
    statusLabel: "Local beta · NeuroPath-adjacent, not a deployed public product",
    dataLabel: "Invented non-clinical queue items only",
    authorshipLabel: "Created and developed by Fatgezim “Zim” Bela.",
    theme: {
      label: "Automation cyan",
      accent: "#22d3ee",
      secondary: "#60a5fa",
      glow: "rgba(34, 211, 238, 0.22)",
    },
    evidenceLinks: [],
    architecture: {
      summary:
        "A sanitized representation of the local operator path from queued work through confirmation, one supported automation step, and diagnostics.",
      nodes: [
        {
          id: "local-queue",
          kind: architectureKinds.input,
          label: "Local synthetic queue",
          description: "An invented program or behavior item is selected for review.",
          technologies: ["local JSON state"],
        },
        {
          id: "confirmed-run",
          kind: architectureKinds.process,
          label: "Confirmed Step 1 run",
          description: "Prepare Run and correct-page confirmation gate the supported browser action.",
          technologies: ["Python", "Playwright", "Chrome CDP"],
        },
        {
          id: "diagnostic-log",
          kind: architectureKinds.output,
          label: "Readable diagnostics",
          description: "Timeline and raw-log surfaces preserve operator visibility into the staged run.",
          technologies: ["local web UI"],
        },
        {
          id: "automation-boundary",
          kind: architectureKinds.boundary,
          label: "Human-review boundary",
          description: "Steps 2–6 remain manual; the replica does not authenticate, submit, or expose private state.",
          technologies: [],
        },
      ],
      edges: [
        { from: "local-queue", to: "confirmed-run", label: "prepare and confirm" },
        { from: "confirmed-run", to: "diagnostic-log", label: "write local status" },
        { from: "diagnostic-log", to: "automation-boundary", label: "return to operator" },
      ],
    },
    frames: [
      {
        id: "synthetic-queue",
        eyebrow: "Queue",
        title: "Select an invented workflow item",
        body:
          "The portfolio replica uses a generic practice item rather than a client, behavior record, or private operational payload.",
        state: "input",
        details: [
          { label: "Item", value: "Practice workflow A" },
          { label: "Data", value: "Invented and non-clinical" },
        ],
        demo: {
          kind: "rethink-automation",
          view: "queue",
          queueItem: "Practice workflow A",
          log: ["Awaiting operator selection"],
        },
      },
      {
        id: "prepare-run",
        eyebrow: "Confirm",
        title: "Prepare the run before automation",
        body:
          "A two-step confirmation makes the target page and supported scope visible before a local browser action can begin.",
        state: "review",
        details: [
          { label: "Control", value: "Prepare Run" },
          { label: "Check", value: "Correct-page confirmation" },
        ],
        demo: {
          kind: "rethink-automation",
          view: "confirmation",
          queueItem: "Practice workflow A",
          log: ["Prepared locally", "Awaiting page confirmation"],
        },
      },
      {
        id: "supported-step",
        eyebrow: "Stage",
        title: "Show only the supported Step 1 workflow",
        body:
          "The preview represents a bounded Step 1 operation and does not suggest that later manual steps are automated.",
        state: "processing",
        details: [
          { label: "Automated", value: "Supported Step 1 fields" },
          { label: "Manual", value: "Steps 2–6 and final review" },
        ],
        demo: {
          kind: "rethink-automation",
          view: "step-one",
          queueItem: "Practice workflow A",
          log: ["Page confirmed", "Supported Step 1 staged", "Human review required"],
        },
      },
      {
        id: "readable-log",
        eyebrow: "Log",
        title: "Finish with a readable local status",
        body:
          "The sanitized run log records preparation, confirmation, the bounded step, and the remaining manual work.",
        state: "boundary",
        details: [
          { label: "Status", value: "Staged for human review" },
          { label: "Boundary", value: "No hidden final submission" },
        ],
        demo: {
          kind: "rethink-automation",
          view: "log",
          queueItem: "Practice workflow A",
          log: [
            "Prepared locally",
            "Page confirmed",
            "Supported Step 1 staged",
            "Steps 2–6 remain manual",
          ],
        },
      },
    ],
  },
  "neuropath-insight": {
    projectId: "neuropath-insight",
    title: "Synthetic reimbursement pipeline",
    posterLabel: "Synthetic dataset → normalization → benchmark → model limits",
    privacyLabel: "Private prototype · simulated portfolio values only",
    statusLabel: "Private internal prototype · no public deployment or customer-use claim",
    dataLabel: "Synthetic payer and rate-shaped records only",
    authorshipLabel: "Shown as Zim's private product concept and internal prototype.",
    theme: {
      label: "Insight violet",
      accent: "#c084fc",
      secondary: "#38bdf8",
      glow: "rgba(192, 132, 252, 0.22)",
    },
    evidenceLinks: [],
    architecture: {
      summary:
        "A portfolio-safe representation of a private pipeline that normalizes Transparency in Coverage-shaped records for internal analytical review.",
      nodes: [
        {
          id: "synthetic-rates",
          kind: architectureKinds.input,
          label: "Synthetic rate-shaped rows",
          description: "The preview uses simulated fields instead of private contract or provider-level source records.",
          technologies: ["Transparency in Coverage data shape"],
        },
        {
          id: "local-pipeline",
          kind: architectureKinds.process,
          label: "Local analytical pipeline",
          description: "Filtering and normalization create local analytical outputs for review.",
          technologies: ["Python", "pandas", "DuckDB"],
        },
        {
          id: "review-views",
          kind: architectureKinds.output,
          label: "Benchmark and model views",
          description: "Tables and charts expose synthetic benchmark and experimental model signals.",
          technologies: ["React", "Recharts", "scikit-learn"],
        },
        {
          id: "model-boundary",
          kind: architectureKinds.boundary,
          label: "Exploratory-model boundary",
          description: "Outputs are not customer results, clinical guidance, or validated financial recommendations.",
          technologies: ["regression", "clustering", "outlier detection"],
        },
      ],
      edges: [
        { from: "synthetic-rates", to: "local-pipeline", label: "filter and normalize" },
        { from: "local-pipeline", to: "review-views", label: "write review outputs" },
        { from: "review-views", to: "model-boundary", label: "label limitations" },
      ],
    },
    frames: [
      {
        id: "synthetic-tic-input",
        eyebrow: "Input",
        title: "Begin with a labeled synthetic sample",
        body:
          "The portfolio storyboard represents Transparency in Coverage fields without exposing private contract documents or generated internal datasets.",
        state: "input",
        details: [
          { label: "Source shape", value: "Synthetic payer and rate rows" },
          { label: "Label", value: "Simulated portfolio data" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "dataset",
          datasetLabel: "simulated-rate-sample.csv",
          items: ["Payer label", "State field", "Code field", "Simulated rate field"],
        },
      },
      {
        id: "normalize",
        eyebrow: "Transform",
        title: "Normalize records into local analytical outputs",
        body:
          "The ETL shape filters and normalizes records, then writes local DuckDB, CSV, and review JSON outputs.",
        state: "processing",
        details: [
          { label: "Pipeline", value: "Python · pandas · DuckDB" },
          { label: "Output", value: "Local review datasets" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "normalize",
          datasetLabel: "simulated-rate-sample.csv",
          items: ["Filter review records", "Normalize fields", "Write local outputs"],
        },
      },
      {
        id: "benchmark",
        eyebrow: "Interpret",
        title: "Open a synthetic benchmark view",
        body:
          "Rate, payer, state, and provider dimensions become reviewable charts and tables without presenting a real recommendation.",
        state: "review",
        details: [
          { label: "View", value: "Synthetic benchmark" },
          { label: "Purpose", value: "Internal exploration" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "benchmark",
          datasetLabel: "Synthetic benchmark",
          items: ["Payer view", "State view", "Provider view"],
        },
      },
      {
        id: "model-limits",
        eyebrow: "Limit",
        title: "Keep experimental model limits visible",
        body:
          "Exploratory regression, clustering, and outlier outputs are labeled as prototype signals—not customer results or validated financial guidance.",
        state: "boundary",
        details: [
          { label: "Methods", value: "Regression · Clustering · Outliers" },
          { label: "Boundary", value: "Exploratory, not validated advice" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "limitations",
          datasetLabel: "Experimental model review",
          items: ["Regression signal", "Cluster signal", "Outlier signal"],
        },
      },
    ],
  },
} as const satisfies Record<FeaturedProjectId, ProjectStoryboard>;

export function getProjectStoryboard(
  projectId: FeaturedProjectId,
): ProjectStoryboard {
  return projectStoryboards[projectId];
}
