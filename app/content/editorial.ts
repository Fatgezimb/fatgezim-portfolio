import { sitePath } from "@/app/content/paths";

export type SelectedWork = {
  id: string;
  title: string;
  field: string;
  description: string;
  contribution: string;
  tags: readonly string[];
  href?: string;
  action?: string;
  scope?: string;
  source?: string;
  preview: boolean;
  newTab?: boolean;
  caseStudy?: string;
};

// Product collection retained alongside the engineering-focused homepage selection.
const productWork: readonly SelectedWork[] = [
  {
    id: "bela-behavior-data-lab",
    title: "Bela Behavior Data Lab",
    field: "Data engineering · Operations",
    description:
      "Appointment exports become a working picture of operations: readable dashboards, follow-up queues, and reports.",
    contribution: "Co-founder & co-builder with Meili Bela",
    tags: ["React", "TypeScript", "Local data processing"],
    href: "https://neuropathlabs.com/demo",
    preview: true,
  },
  {
    id: "rbt-practice-hub",
    title: "RBT Practice Hub",
    field: "Product engineering · Learning",
    description:
      "A competency map, original flashcards, and practice questions that turn a study checklist into an active learning path.",
    contribution: "Founder & product builder",
    tags: ["React", "TypeScript", "Local progress"],
    href: "https://rbt-pro.vercel.app/",
    preview: true,
  },
  {
    id: "caregiver-academy",
    title: "Caregiver Academy",
    field: "Healthcare education · Product",
    description:
      "Behavioral concepts translated into guided lessons, everyday scenarios, knowledge checks, and printable tools.",
    contribution: "Co-founder & co-builder with Meili Bela",
    tags: ["React", "TypeScript", "Learning design"],
    href: "https://beladatalab.com/",
    preview: true,
  },
  {
    id: "stepspark",
    title: "StepSpark",
    field: "Medical learning · Prototype",
    description:
      "A visual recall prototype that connects prompts, explanations, and sources in a learner-controlled review flow.",
    contribution: "Creator & product builder",
    tags: ["TypeScript", "React", "Accessible UI"],
    href: "https://fatgezimb.github.io/StepSpark/",
    preview: true,
  },
];

const founderWork: SelectedWork = {
  id: "neuropath-blog",
  title: "NeuroPath",
  field: "Founder-led products · Behavioral health",
  description:
    "Tools, practical guides, and the story behind the behavioral-health products Meili and I are building together.",
  contribution: "Co-founder with Meili Bela · Product & technology",
  tags: ["Product direction", "Behavioral health"],
  href: "https://neuropath.blog/",
  action: "Visit NeuroPath",
  preview: false,
};

export const workGroups: readonly {
  id: string;
  title: string;
  description: string;
  projects: readonly SelectedWork[];
}[] = [
  {
    id: "engineering-prototypes",
    title: "Engineering systems",
    description:
      "Working prototypes built around concrete operational problems, with explicit rules, inspectable evidence, and tested behavior.",
    projects: [
      {
        id: "commissioning-readiness",
        caseStudy: "/engineering/#relay",
        title: "Relay · Commissioning Readiness",
        field: "Workflow engineering · Mission-critical infrastructure",
        description:
          "Trace modular power packages from factory testing to operations handover. Resolve exceptions, release revisions, and see exactly which approvals need fresh evidence.",
        contribution:
          "Independent prototype · AI pair programming · Fictional records",
        tags: ["React", "Dependency modeling", "State transitions", "Testing"],
        href: sitePath("/showcase/commissioning-readiness/"),
        action: "Try the workflow",
        source: sitePath("/showcase/commissioning-readiness/project.zip"),
        scope:
          "Inspired by M.C. Dean’s publicly documented delivery process · Independent and unaffiliated",
        preview: true,
        newTab: true,
      },
      {
        id: "clinical-assessment-portal",
        title: "Clinical Assessment Portal",
        field: "Full-stack engineering · Clinical workflows",
        description: "Keep record ownership, edit permissions, version checks and clinician approval aligned across an assessment workflow.",
        contribution: "Product architecture & development · AI-assisted implementation",
        tags: ["TypeScript", "Express", "Firebase", "Authorization"],
        scope: "Private implementation · Locally tested with synthetic records",
        caseStudy: "/engineering/#clinical",
        preview: true,
      },
    ],
  },
  {
    id: "data-projects",
    title: "Data projects",
    description:
      "Complete, reproducible projects: public datasets, tested analysis pipelines, interactive applications, and notebooks you can inspect.",
    projects: [
      {
        id: "grid-forecast",
        caseStudy: "/engineering/#grid",
        title: "Grid Forecast Lab",
        field: "Forecasting · Time-series engineering",
        description:
          "Predict tomorrow’s hourly demand using information available today. Inspect chronological validation, seasonal baselines, prediction bounds, and 8,732 held-out hours.",
        contribution:
          "AI pair programming · Extends a credited Rob Mulla Kaggle exercise",
        tags: ["Python", "Scikit-learn", "React", "Forecast evaluation"],
        href: sitePath("/showcase/grid-forecast/"),
        action: "Explore the forecasts",
        source: sitePath("/showcase/grid-forecast/project.zip"),
        scope: "Historical PJME demand · Source credit: PJM and Rob Mulla",
        preview: true,
        newTab: true,
      },
      {
        id: "engine-prognostics",
        title: "Engine Prognostics",
        field: "Machine learning · Time-series engineering",
        description:
          "Replay engine sensor histories and inspect remaining-life forecasts. Compare two fault scenarios, baseline errors, and calibrated uncertainty across 200 test engines.",
        contribution: "Portfolio project · NASA C-MAPSS benchmark",
        tags: ["Python", "Scikit-learn", "React", "Model evaluation"],
        href: sitePath("/showcase/engine-prognostics/"),
        action: "Explore the app",
        source: sitePath("/showcase/engine-prognostics/project.zip"),
        scope:
          "Simulated engine degradation · Whole-engine validation and test splits",
        preview: false,
        newTab: true,
      },
      {
        id: "video-signal",
        title: "Video Signal Lab",
        field: "Machine learning · Model auditing",
        description:
          "Audit what a model can know before a video is published. Compare feature timing, calibrated probabilities, threshold tradeoffs, and a deliberate leakage example.",
        contribution: "Portfolio modeling study · 12,000 synthetic videos",
        tags: ["Python", "Classification", "Calibration", "Data provenance"],
        href: sitePath("/showcase/video-signal/"),
        action: "Explore the model audit",
        source: sitePath("/showcase/video-signal/project.zip"),
        scope: "Synthetic educational benchmark · Source: Vedauv on Kaggle",
        preview: false,
        newTab: true,
      },
      {
        id: "appointment-operations",
        title: "Appointment Operations",
        field: "Data engineering · Healthcare operations",
        description:
          "Trace 110,521 validated appointments from source records to attendance patterns. Filter booking windows, inspect SMS comparisons, and test capacity assumptions.",
        contribution: "Portfolio project · Public historical data",
        tags: ["Python", "SQL", "React", "Data quality"],
        href: sitePath("/showcase/appointment-operations/"),
        action: "Explore the app",
        source: sitePath("/showcase/appointment-operations/project.zip"),
        scope:
          "Brazil, 2016 · Descriptive analysis and explicit planning scenarios",
        preview: false,
        newTab: true,
      },
    ],
  },
  {
    id: "products",
    title: "Products & founder work",
    description:
      "Tools for the people doing the work: operations teams, behavior analysts, learners, and caregivers.",
    projects: [
      ...productWork.filter((project) => project.id !== "stepspark"),
      founderWork,
    ],
  },
  {
    id: "automation",
    title: "Automation & analytics",
    description:
      "Making repetitive workflows and complex files easier to review.",
    projects: [
      {
        id: "rethink-automations",
        title: "Rethink Automations",
        field: "Workflow automation · Local beta",
        description:
          "A queue, page-confirmation step, and run log for repetitive browser entry. The supported first step keeps review in the user's hands.",
        contribution: "Creator & developer",
        tags: ["Python", "Playwright", "Workflow design"],
        scope:
          "Local beta · Preview uses fictional workflow items. Later steps and final review remain manual.",
        preview: true,
      },
      {
        id: "neuropath-insight",
        title: "NeuroPath Insight",
        field: "Data engineering · Analysis prototype",
        description:
          "A pipeline and review interface for reimbursement files, with filters, benchmark comparisons, and exploratory analysis.",
        contribution: "Creator & prototype developer",
        tags: ["Python", "DuckDB", "React"],
        scope:
          "Internal prototype · Portfolio preview uses simulated rates and demonstrates exploratory analysis.",
        preview: true,
      },
    ],
  },
  {
    id: "research-work",
    title: "Research",
    description:
      "Original collaborative work at George Mason University, with the source poster and credited contributors.",
    projects: [
      {
        id: "neuronal-reconstruction",
        title: "Tracing neurons from the fruit fly larva",
        field: "Computational neuroscience · George Mason University",
        description:
          "From fluorescent imagery to a digital reconstruction of a Class 4 neuron, using image processing, tracing, and structural analysis.",
        contribution: "Co-author with Sumit Nanda and Giorgio A. Ascoli",
        tags: ["Fiji / ImageJ", "Vaa3D", "NeuTube"],
        href: "/research/george-mason-neuronal-reconstruction",
        action: "Explore the research",
        preview: false,
      },
    ],
  },
  {
    id: "experiments",
    title: "Experiments & prototypes",
    description:
      "Ideas being explored through small, inspectable applications.",
    projects: [
      productWork.find((project) => project.id === "stepspark")!,
      {
        id: "neurostack-explorer",
        caseStudy: "/engineering/#neurostack",
        title: "NeuroStack Explorer",
        field: "Neuroscience data · Exploratory project",
        description:
          "A viewer for an existing public neural recording. Choose a recorded neuron and a time window to see when it fired and how often.",
        contribution: "Recent exploratory build",
        tags: ["Python", "TypeScript", "Data visualization"],
        scope:
          "Uses an existing public dataset. The full app displays model results computed in advance.",
        href: "https://fatgezimb.github.io/neurostack-explorer/lab/",
        source: "https://github.com/Fatgezimb/neurostack-explorer",
        preview: true,
      },
    ],
  },
];

// Owner-selected priority for engineering reviewers.
export const selectedWork: readonly SelectedWork[] = [
  "commissioning-readiness", "grid-forecast", "clinical-assessment-portal", "neurostack-explorer",
].map((id) => workGroups.flatMap((group) => group.projects).find((project) => project.id === id)!);
