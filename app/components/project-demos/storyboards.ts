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

export type StoryboardFrame = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  state: StoryboardFrameState;
  details: readonly StoryboardDetail[];
};

export type ProjectStoryboard = {
  projectId: FeaturedProjectId;
  title: string;
  posterLabel: string;
  privacyLabel: string;
  frames: readonly StoryboardFrame[];
};

export const projectStoryboards = {
  "bela-behavior-data-lab": {
    projectId: "bela-behavior-data-lab",
    title: "Browser-local operations review",
    posterLabel: "Synthetic appointment-workbook workflow",
    privacyLabel: "Synthetic demo · source rows stay in the browser",
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
      },
      {
        id: "operations-view",
        eyebrow: "Workspace",
        title: "Operational views organize the session",
        body:
          "Verified product surfaces include hours, cancellations, action items, people views, and report preparation.",
        state: "processing",
        details: [
          { label: "Views", value: "Operations · People · Actions" },
          { label: "Data", value: "Synthetic session only" },
        ],
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
      },
    ],
  },
  "caregiver-academy": {
    projectId: "caregiver-academy",
    title: "Caregiver learning path",
    posterLabel: "Educational module and practical-tool workflow",
    privacyLabel: "Educational support · no child profile or individualized plan",
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
      },
    ],
  },
  "rbt-practice-hub": {
    projectId: "rbt-practice-hub",
    title: "Independent competency practice",
    posterLabel: "Task map, original practice, and local progress",
    privacyLabel: "Independent learning resource · no BACB affiliation",
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
      },
    ],
  },
  stepspark: {
    projectId: "stepspark",
    title: "Source-aware instant recall",
    posterLabel: "Visual prompt, reveal, review state, and provenance",
    privacyLabel: "Prototype content · requires medical review",
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
      },
      {
        id: "review-state",
        eyebrow: "Reflect",
        title: "Choose a local review state",
        body:
          "Confidence and fluency controls help organize another pass while keeping the result on the learner's device.",
        state: "review",
        details: [
          { label: "Signal", value: "Confidence or fluency" },
          { label: "Storage", value: "Local deck state" },
        ],
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
      },
    ],
  },
  "rethink-automations": {
    projectId: "rethink-automations",
    title: "Reviewable local automation",
    posterLabel: "Synthetic queue, confirmation, supported step, and log",
    privacyLabel: "Sanitized local replica · no authenticated screens",
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
      },
    ],
  },
  "neuropath-insight": {
    projectId: "neuropath-insight",
    title: "Synthetic reimbursement pipeline",
    posterLabel: "Public-data sample, normalization, benchmark, and limits",
    privacyLabel: "Private prototype · simulated portfolio values only",
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
      },
      {
        id: "normalize",
        eyebrow: "Transform",
        title: "Normalize records into local analytical outputs",
        body:
          "The ETL shape filters the intended state and ABA-code scope, then writes local DuckDB, CSV, and review JSON outputs.",
        state: "processing",
        details: [
          { label: "Pipeline", value: "Python · pandas · DuckDB" },
          { label: "Output", value: "Local review datasets" },
        ],
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
      },
    ],
  },
} as const satisfies Record<FeaturedProjectId, ProjectStoryboard>;

export function getProjectStoryboard(projectId: FeaturedProjectId): ProjectStoryboard {
  return projectStoryboards[projectId];
}
