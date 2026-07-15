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

export type NeuroStackExplorerDemoState = {
  kind: "neurostack-explorer";
  view: "provenance" | "rate" | "embedding" | "artifacts";
  datasetLabel: string;
  items: readonly string[];
};

export type ProjectDemoFrameData =
  | BehaviorDataLabDemoState
  | CaregiverAcademyDemoState
  | RbtPracticeDemoState
  | StepSparkDemoState
  | RethinkAutomationDemoState
  | NeuroPathInsightDemoState
  | NeuroStackExplorerDemoState;

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
  "neurostack-explorer": {
    projectId: "neurostack-explorer",
    title: "Scientific software explorer",
    posterLabel: "NWB → analysis → models → reproducible artifacts",
    privacyLabel: "Compact public-derived artifact; no private records or public kernel.",
    dataLabel: "Checksum-verified public NWB derivative",
    authorshipLabel: "Created and documented by Fatgezim “Zim” Bela.",
    theme: { label: "Neural cyan", accent: "#67e8f9", secondary: "#a78bfa", glow: "rgba(103, 232, 249, 0.24)" },
    evidenceLinks: [{ label: "Open-source repository", href: "https://github.com/Fatgezimb/neurostack-explorer" }],
    architecture: {
      summary: "A pinned public NWB asset becomes validated, compact, browser-readable scientific artifacts.",
      nodes: [
        { id: "nwb", kind: architectureKinds.input, label: "Public NWB derivative", description: "Checksum-matched compact data from an immutable DANDI asset.", technologies: ["NWB", "DANDI"] },
        { id: "analysis", kind: architectureKinds.process, label: "Analysis workspace", description: "Pynapple-linked views and bounded model artifacts expose the declared task.", technologies: ["Python", "Pynapple", "NeMoS"] },
        { id: "figures", kind: architectureKinds.output, label: "Figures and notebook", description: "Charts, tables, and executed notebook outputs remain inspectable.", technologies: ["Plotly", "TypeScript"] },
        { id: "boundary", kind: architectureKinds.boundary, label: "Privacy boundary", description: "No arbitrary uploads, private participant data, or public Python runtime.", technologies: [] },
      ],
      edges: [
        { from: "nwb", to: "analysis", label: "validate and transform" },
        { from: "analysis", to: "figures", label: "serialize artifacts" },
        { from: "figures", to: "boundary", label: "label scope" },
      ],
    },
    frames: [
      { id: "provenance", eyebrow: "Provenance", title: "Start with the source", body: "The explorer keeps the dataset identity, checksum, and synthetic fallback status visible before a chart appears.", state: "input", details: [{ label: "Source", value: "Immutable public DANDI asset" }, { label: "Data", value: "8 units · 600 s session" }], demo: { kind: "neurostack-explorer", view: "provenance", datasetLabel: "DANDI 000582 · verified derivative", items: ["Source checksum matched", "CC BY 4.0 attribution recorded", "Synthetic fallback labeled separately"] } },
      { id: "rate", eyebrow: "Linked view", title: "Trace a neural signal", body: "A compact rate trace and population readout make the analytical task legible without pretending to be a live research backend.", state: "processing", details: [{ label: "Window", value: "100 ms bins" }, { label: "View", value: "Selected unit + population" }], demo: { kind: "neurostack-explorer", view: "rate", datasetLabel: "t1c1 selected-unit trace", items: ["Selected unit", "Population rate", "Behavior interval"] } },
      { id: "embedding", eyebrow: "Visualization", title: "See the feature space", body: "The explorer connects feature summaries to a visual population view, with readable labels and an accessible table alternative.", state: "complete", details: [{ label: "Features", value: "Position · speed · count" }, { label: "Output", value: "Bounded visual summary" }], demo: { kind: "neurostack-explorer", view: "embedding", datasetLabel: "Population feature view", items: ["Rate", "ISI variability", "Median interval"] } },
      { id: "artifacts", eyebrow: "Reproducibility", title: "Leave an audit trail", body: "The complete repository includes schema-checked artifacts, an executed notebook, and the code that generated them.", state: "boundary", details: [{ label: "Artifacts", value: "JSON · PNG · notebook" }, { label: "Boundary", value: "No arbitrary code execution" }], demo: { kind: "neurostack-explorer", view: "artifacts", datasetLabel: "Checksummed release bundle", items: ["Model comparisons", "Executed notebook", "Validation report"] } },
    ],
  },
  "bela-behavior-data-lab": {
    projectId: "bela-behavior-data-lab",
    title: "Operations data workspace",
    posterLabel: "Sample workbook → review → dashboard → report",
    privacyLabel: "Sample data only; source files stay in the browser.",
    dataLabel: "Bundled appointment-shaped sample",
    authorshipLabel: "Co-founded and co-built by Fatgezim “Zim” Bela and Meili Bela.",
    theme: {
      label: "Operations mint",
      accent: "#5eead4",
      secondary: "#22d3ee",
      glow: "rgba(45, 212, 191, 0.24)",
    },
    evidenceLinks: [
      { label: "Visit project", href: "https://neuropathlabs.com/" },
    ],
    architecture: {
      summary:
        "This workflow turns an appointment-shaped sample into reviewable operations and report views in the browser.",
      nodes: [
        {
          id: "workbook",
          kind: architectureKinds.input,
          label: "Sample workbook",
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
          label: "Demo limit",
          description: "The demo does not include real exports, appointment rows, names, or clinical data.",
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
          label: "show sample output",
        },
      ],
    },
    frames: [
      {
        id: "sample-import",
        eyebrow: "Input",
        title: "Sample workbook selected",
        body:
          "A bundled sample represents an appointment export without using real client, staff, service, or billing records.",
        state: "input",
        details: [
          { label: "Source", value: "Bundled sample workbook" },
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
          { label: "Input", value: "Sample appointment rows" },
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
          "The product includes operations, people, money, action, and report views.",
        state: "processing",
        details: [
          { label: "Views", value: "Operations · People · Actions" },
          { label: "Data", value: "Sample session only" },
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
          "The workflow ends on a PDF-ready sample without using real operational data.",
        state: "boundary",
        details: [
          { label: "Output", value: "Sample report-ready view" },
          { label: "Limit", value: "No real exports or clinical data" },
        ],
        demo: {
          kind: "behavior-data-lab",
          view: "report",
          fileLabel: "Sample review report",
          items: ["Session summary", "Review notes", "Demo note"],
        },
      },
    ],
  },
  "caregiver-academy": {
    projectId: "caregiver-academy",
    title: "Caregiver learning path",
    posterLabel: "Routine → guided lesson → knowledge check → printable tool",
    privacyLabel: "General education, not an individualized care plan.",
    dataLabel: "Example learning scenario",
    authorshipLabel:
      "Zim: Co-founder, Product Builder, and BCBA Contributor; jointly built with Meili Bela.",
    theme: {
      label: "Care teal",
      accent: "#34d399",
      secondary: "#2dd4bf",
      glow: "rgba(52, 211, 153, 0.22)",
    },
    evidenceLinks: [
      { label: "Visit project", href: "https://beladatalab.com/" },
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
          label: "Educational limit",
          description: "The product is not individualized care, a behavior plan, crisis guidance, or a guaranteed outcome.",
          technologies: [],
        },
      ],
      edges: [
        { from: "routine-topic", to: "guided-learning", label: "open module" },
        { from: "guided-learning", to: "practical-tool", label: "complete check" },
        { from: "practical-tool", to: "care-boundary", label: "keep educational context" },
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
          "The workflow closes with a practical tool for general education, not individualized care or crisis guidance.",
        state: "boundary",
        details: [
          { label: "Output", value: "Printable caregiver tool" },
          { label: "Limit", value: "Not individualized care" },
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
    privacyLabel: "Independent study resource; not affiliated with the BACB.",
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
        label: "Visit project",
        href: "https://fatgezimb.github.io/rbt-practice-hub/",
      },
      {
        label: "View source code",
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
          label: "Independent resource",
          description: "The app is not an official BACB product, competency decision, credential, or endorsement.",
          technologies: [],
        },
      ],
      edges: [
        { from: "task-map", to: "original-practice", label: "select task" },
        { from: "original-practice", to: "local-history", label: "record review" },
        { from: "local-history", to: "independent-boundary", label: "show learning context" },
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
          "The final state keeps practice history in the browser and identifies the app as an independent study resource.",
        state: "boundary",
        details: [
          { label: "Storage", value: "Browser localStorage" },
          { label: "Limit", value: "Practice readiness only" },
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
    posterLabel: "Visual prompt → answer → review → source details",
    privacyLabel: "Independent prototype; not affiliated with the NBME.",
    dataLabel: "Original demonstration content and visual",
    authorshipLabel: "Created and built by Fatgezim “Zim” Bela.",
    theme: {
      label: "Recall violet",
      accent: "#a78bfa",
      secondary: "#22d3ee",
      glow: "rgba(167, 139, 250, 0.24)",
    },
    evidenceLinks: [
      { label: "View source code", href: "https://github.com/Fatgezimb/StepSpark" },
    ],
    architecture: {
      summary:
        "The recall-card flow keeps prompts, explanations, learner review, and source details together.",
      nodes: [
        {
          id: "visual-card",
          kind: architectureKinds.input,
          label: "Source-aware visual card",
          description: "An original visual and prompt begin the recall flow.",
          technologies: ["source and license metadata"],
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
          label: "Saved review state",
          description: "The learner saves a review choice on the current device.",
          technologies: ["local persistence"],
        },
        {
          id: "medical-boundary",
          kind: architectureKinds.boundary,
          label: "Medical review",
          description: "Content review is required before release; the prototype is not affiliated with the NBME.",
          technologies: ["source", "license", "review status"],
        },
      ],
      edges: [
        { from: "visual-card", to: "recall-engine", label: "open card" },
        { from: "recall-engine", to: "review-state", label: "record reflection" },
        { from: "review-state", to: "medical-boundary", label: "retain source details" },
      ],
    },
    frames: [
      {
        id: "visual-prompt",
        eyebrow: "Prompt",
        title: "Open a visual recall card",
        body:
          "An original visual and prompt establish the recall task before the explanation appears.",
        state: "input",
        details: [
          { label: "Surface", value: "Instant Recall Card" },
          { label: "Content", value: "Original demonstration content" },
        ],
        demo: {
          kind: "stepspark",
          view: "prompt",
          cardLabel: "Visual recall card",
          reviewState: "Not yet rated",
        },
      },
      {
        id: "answer-reveal",
        eyebrow: "Reveal",
        title: "Compare the prediction with the explanation",
        body:
          "Progressive disclosure moves from prompt to explanation at the learner’s pace.",
        state: "processing",
        details: [
          { label: "Flow", value: "Prompt · Prediction · Reveal" },
          { label: "Review", value: "Learner controlled" },
        ],
        demo: {
          kind: "stepspark",
          view: "reveal",
          cardLabel: "Visual recall card",
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
          { label: "Review", value: "Confidence or review state" },
          { label: "Storage", value: "Local deck state" },
        ],
        demo: {
          kind: "stepspark",
          view: "review",
          cardLabel: "Visual recall card",
          reviewState: "Local review state saved",
        },
      },
      {
        id: "provenance",
        eyebrow: "Sources",
        title: "Review source and content details",
        body:
          "Source, license, intended use, and review status stay attached to the learning card.",
        state: "boundary",
        details: [
          { label: "Record", value: "Source · License · Review status" },
          { label: "Limit", value: "Prototype content" },
        ],
        demo: {
          kind: "stepspark",
          view: "provenance",
          cardLabel: "Visual recall card",
          reviewState: "Local review state saved",
        },
      },
    ],
  },
  "rethink-automations": {
    projectId: "rethink-automations",
    title: "Reviewable workflow automation",
    posterLabel: "Example queue → page confirmation → automated Step 1 → run log",
    privacyLabel: "Demonstration uses fictional, non-clinical workflow items.",
    dataLabel: "Fictional workflow items",
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
        "The workflow moves queued work through page confirmation, Step 1 automation, and a clear run log.",
      nodes: [
        {
          id: "local-queue",
          kind: architectureKinds.input,
          label: "Example queue",
          description: "A fictional workflow item is selected for review.",
          technologies: ["local JSON state"],
        },
        {
          id: "confirmed-run",
          kind: architectureKinds.process,
          label: "Confirmed Step 1 run",
          description: "The user confirms the page before Step 1 automation begins.",
          technologies: ["Python", "Playwright", "Chrome CDP"],
        },
        {
          id: "diagnostic-log",
          kind: architectureKinds.output,
          label: "Readable diagnostics",
          description: "The timeline and run log show each completed action.",
          technologies: ["local web UI"],
        },
        {
          id: "automation-boundary",
          kind: architectureKinds.boundary,
          label: "Manual review",
          description: "Steps 2–6 and final submission remain manual.",
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
        title: "Select an example workflow item",
        body:
          "The demo uses fictional, non-clinical workflow data.",
        state: "input",
        details: [
          { label: "Item", value: "Practice workflow A" },
          { label: "Data", value: "Fictional and non-clinical" },
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
          "A two-step confirmation shows the target page and supported action before the automation can begin.",
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
        title: "Automate the supported Step 1 fields",
        body:
          "The preview automates Step 1 while leaving steps 2–6 and final review to the user.",
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
        title: "Review the run log",
        body:
          "The run log records preparation, confirmation, the supported step, and the remaining manual work.",
        state: "boundary",
        details: [
          { label: "Status", value: "Staged for human review" },
          { label: "Limit", value: "Final submission remains manual" },
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
    title: "Reimbursement data pipeline",
    posterLabel: "Simulated data → normalization → benchmark → model review",
    privacyLabel: "Simulated data and exploratory model outputs.",
    dataLabel: "Simulated reimbursement records",
    authorshipLabel: "Created as a product concept and prototype by Fatgezim “Zim” Bela.",
    theme: {
      label: "Insight violet",
      accent: "#c084fc",
      secondary: "#38bdf8",
      glow: "rgba(192, 132, 252, 0.22)",
    },
    evidenceLinks: [],
    architecture: {
      summary:
        "This prototype turns simulated Transparency in Coverage records into analysis datasets, benchmarks, and exploratory model views.",
      nodes: [
        {
          id: "synthetic-rates",
          kind: architectureKinds.input,
          label: "Simulated reimbursement records",
          description: "The example uses simulated fields instead of contract or provider-level source records.",
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
          description: "Tables and charts show simulated benchmarks and experimental model outputs.",
          technologies: ["React", "Recharts", "scikit-learn"],
        },
        {
          id: "model-boundary",
          kind: architectureKinds.boundary,
          label: "Model limits",
          description: "Model outputs are exploratory and require validation before decision-making.",
          technologies: ["regression", "clustering", "outlier detection"],
        },
      ],
      edges: [
        { from: "synthetic-rates", to: "local-pipeline", label: "filter and normalize" },
        { from: "local-pipeline", to: "review-views", label: "write review outputs" },
        { from: "review-views", to: "model-boundary", label: "show limitations" },
      ],
    },
    frames: [
      {
        id: "synthetic-tic-input",
        eyebrow: "Input",
        title: "Start with a simulated sample",
        body:
          "The example represents Transparency in Coverage fields with simulated values.",
        state: "input",
        details: [
          { label: "Source shape", value: "Simulated payer and rate rows" },
          { label: "Label", value: "Example data" },
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
        title: "Normalize records into analytical outputs",
        body:
          "The pipeline filters and normalizes records, then writes DuckDB, CSV, and JSON outputs.",
        state: "processing",
        details: [
          { label: "Pipeline", value: "Python · pandas · DuckDB" },
          { label: "Output", value: "Analysis datasets" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "normalize",
          datasetLabel: "simulated-rate-sample.csv",
          items: ["Filter records", "Normalize fields", "Write outputs"],
        },
      },
      {
        id: "benchmark",
        eyebrow: "Interpret",
        title: "Open a sample benchmark view",
        body:
          "Simulated rate, payer, state, and provider data become interactive charts and tables.",
        state: "review",
        details: [
          { label: "View", value: "Sample benchmark" },
          { label: "Purpose", value: "Exploratory analysis" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "benchmark",
          datasetLabel: "Sample benchmark",
          items: ["Payer view", "State view", "Provider view"],
        },
      },
      {
        id: "model-limits",
        eyebrow: "Limit",
        title: "Review experimental model outputs",
        body:
          "Regression, clustering, and outlier outputs are exploratory and require validation before use.",
        state: "boundary",
        details: [
          { label: "Methods", value: "Regression · Clustering · Outliers" },
          { label: "Limit", value: "Exploratory; validation required" },
        ],
        demo: {
          kind: "neuropath-insight",
          view: "limitations",
          datasetLabel: "Experimental model review",
          items: ["Regression output", "Cluster output", "Outlier output"],
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
