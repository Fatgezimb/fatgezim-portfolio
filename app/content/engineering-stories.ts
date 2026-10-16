export const mcvayStory = {
  title: "An algorithm built under access constraints.",
  role: "Data Engineer · The McVay Company, Inc. · October 2022 – January 2023",
  introduction:
    "A Department of Defense-related health-data analysis problem. I independently researched and adapted Dijkstra’s shortest-path algorithm, built the implementation, and designed synthetic datasets and initial validation without access to the restricted operational data.",
  steps: [
    {
      title: "Frame the problem",
      text: "Translate a specialized, large-scale analytical requirement into an approach that could be developed independently.",
    },
    {
      title: "Build and test",
      text: "Adapt the graph algorithm and create synthetic development and test datasets to validate the implementation.",
    },
    {
      title: "Hand off for evaluation",
      text: "Transfer the solution to colleagues with operational-data access. Their feedback is the source of the reported outcomes below.",
    },
  ],
  outcomes: [
    {
      value: "Millions → ~12",
      label: "Data points narrowed to records for manual review",
    },
    { value: "Seconds", label: "Reported processing time on operational data" },
  ],
  attribution:
    "Outcomes reported by colleagues after team evaluation on operational data. The exact timing protocol and statistical metric have not been recovered; these are historical reported results, not a reproduced benchmark.",
} as const;

export const engineeringStories = [
  {
    id: "relay",
    projectId: "commissioning-readiness",
    title: "Relay Commissioning Readiness",
    field: "Dependency modeling / Independent prototype",
    status: "Fictional commissioning records · Browser-local application",
    problem:
      "How do you know an equipment package is ready when its revision or prerequisite evidence changes after an approval?",
    approach:
      "Model acceptance as a chain of evidence, not a manually editable ready flag. Each review stores the asset revision and the exact IDs of the prerequisite events it relied on.",
    decisions: [
      [
        "Separate rules from screens",
        "Pure domain functions determine readiness. The interface and JSON export use those same functions.",
      ],
      [
        "Invalidate stale evidence",
        "A new asset revision makes earlier approvals outdated. Replacing upstream evidence also invalidates downstream approvals on the same revision.",
      ],
      [
        "Keep the prototype inspectable",
        "Deterministic fictional fixtures, append-only local events and JSON exports make each transition easy to inspect.",
      ],
    ],
    validation:
      "10 domain tests cover blocked acceptance, retesting, complete chains, revision propagation, immutable transitions, exports, required evidence, owner reassignment and persistence recovery.",
    contribution:
      "Independent engineering prototype developed with AI pair programming. I directed the workflow requirements, dependency rules, implementation and verification. The source package exposes the actual implementation.",
    boundary:
      "Motivated by M.C. Dean’s public commissioning descriptions. Independent and unaffiliated; no operational deployment is claimed. Production work would require authenticated roles, durable server events and acceptance criteria agreed with qualified commissioning teams.",
    technologies: [
      "React",
      "JavaScript",
      "Pure domain functions",
      "Node test runner",
      "JSON",
    ],
    links: [
      {
        label: "Open full application",
        href: "/showcase/commissioning-readiness/",
      },
      {
        label: "Download source package",
        href: "/showcase/commissioning-readiness/project.zip",
      },
    ],
    inspect:
      "Select PM-101, try a blocked Level 5 review, save a Level 4 retest, and then release a new revision. Watch downstream acceptance become outdated.",
  },
  {
    id: "grid",
    projectId: "grid-forecast",
    title: "Grid Forecast Lab",
    field: "Forecast validation / Independent data project",
    status: "Historical PJME demand · Saved forecast replay",
    problem:
      "Can a next-day demand forecast beat a simple seasonal baseline using only information available at the forecast cutoff?",
    approach:
      "Build causal lag features, select a model with expanding chronological validation, calibrate intervals on a separate year, and evaluate a fixed final model on 2017.",
    decisions: [
      [
        "Make information timing explicit",
        "Demand lags and shifted rolling features end before the next-day forecast begins. A future-data perturbation test checks this boundary.",
      ],
      [
        "Separate three different jobs",
        "2014/2015 validation selects the model; 2016 calibrates prediction intervals; 2017 is held out for final evaluation.",
      ],
      [
        "Show the comparison",
        "Model and prior-day errors use the same 8,732 eligible hours. Missing observations and duplicate timestamps have explicit handling rules.",
      ],
    ],
    validation:
      "Held-out MAE: 1,853.84 MW versus 2,165.59 MW for the prior-day baseline, a 14.4% reduction across 8,732 hours. The nominal 90% interval covers 89.18% of test observations; its radius is approximately 3,892 MW.",
    contribution:
      "Independent implementation developed with AI pair programming, extending Zim’s public fork of Rob Mulla’s Kaggle tutorial. The new pipeline, tests, executed notebook and interactive replay are included for inspection.",
    boundary:
      "Historical benchmark results. The app replays saved predictions; it does not forecast current grid conditions. A service would need current feeds, explicit timezone semantics, monitoring and rolling revalidation.",
    technologies: [
      "Python",
      "pandas",
      "scikit-learn",
      "React",
      "Chronological validation",
    ],
    links: [
      { label: "Open forecast replay", href: "/showcase/grid-forecast/" },
      {
        label: "Read executed analysis",
        href: "/showcase/grid-forecast/analysis.html",
      },
      {
        label: "Download source package",
        href: "/showcase/grid-forecast/project.zip",
      },
      {
        label: "Original Rob Mulla tutorial",
        href: "https://www.kaggle.com/code/robikscube/time-series-forecasting-with-machine-learning-yt",
      },
    ],
    inspect:
      "Choose a day, compare model and baseline, toggle prediction bounds, and inspect the split dates and source records under Method & source.",
  },
  {
    id: "clinical",
    projectId: "clinical-assessment-portal",
    title: "Clinical Assessment Portal",
    field: "Authorization / Full-stack workflow engineering",
    status: "Private implementation · Locally tested with synthetic records",
    problem:
      "How can clinicians collaborate while keeping record editing, clinical approval and administrative authority distinct?",
    approach:
      "Use authenticated practice membership, record ownership and explicit grants for editing. Keep version checks, signatures and final approval tied to the current clinical record.",
    decisions: [
      [
        "Enforce access on the server",
        "Practice scope and ownership are checked before record changes. Administrative authority and clinical signing remain separate.",
      ],
      [
        "Detect competing edits",
        "Optimistic version checks prevent silently replacing a newer saved record. Clinical changes invalidate the earlier signature.",
      ],
      [
        "Generate reports from reviewed records",
        "Server-generated PDF and DOCX reports follow structured assessment data and clinician review.",
      ],
    ],
    validation:
      "Repository tests cover collaboration permissions, record version conflicts, clinical signing and report workflows. The documented acceptance run used synthetic records; this portfolio includes a small synthetic workflow replica, not access to the private application.",
    contribution:
      "Product architecture, clinical workflow design and AI-assisted application development. Clinical domain knowledge informs the separation of reading, editing, review and approval.",
    boundary:
      "Locally staged private implementation. No production clinical deployment or compliance certification is claimed. The public miniature demonstrates selected rules without connecting to Firebase or clinical records.",
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "Firebase Auth",
      "Firestore",
      "Zod",
      "PDFKit",
      "Vitest",
    ],
    links: [],
    inspect:
      "Switch to Colleague, request access, switch to Record owner and grant it. Sign a version, save an edit, and inspect why the signature needs review again.",
  },
  {
    id: "neurostack",
    projectId: "neurostack-explorer",
    title: "NeuroStack Explorer",
    field: "Scientific software / Reproducible artifacts",
    status: "Exploratory project · One public neural recording",
    problem:
      "How can a visitor inspect a neural recording and model outputs while retaining a clear connection to the source data and its limitations?",
    approach:
      "Validate one pinned NWB recording offline, produce checksummed browser derivatives, and keep bounded browser interactions separate from precomputed model results.",
    decisions: [
      [
        "Pin provenance",
        "A versioned DANDI source, asset checksum, manifest and schemas identify the exact recording and transformations.",
      ],
      [
        "Separate computation from exploration",
        "Python creates the artifacts. The browser selects neurons and time intervals and replays saved results; it does not refit models.",
      ],
      [
        "Limit the scientific claim",
        "Model demonstrations cover one selected unit, recording and split. They do not establish population findings or a clinical model.",
      ],
    ],
    validation:
      "The repository contains source validation, artifact schemas, checksums and an executed scientific notebook. The public preview reads the same bounded recording derivative used by the app.",
    contribution:
      "Recent exploratory scientific-software build with AI-assisted development, combining existing open-source libraries through a reproducible artifact workflow.",
    boundary:
      "Data and library authors retain credit. Eight selected units from an existing 600-second rat recording are shown; this is separate from the original George Mason neuronal-reconstruction research.",
    technologies: [
      "Python",
      "TypeScript",
      "NWB",
      "PyNWB",
      "Versioned artifacts",
    ],
    links: [
      {
        label: "Open neural-data viewer",
        href: "https://fatgezimb.github.io/neurostack-explorer/lab/",
      },
      {
        label: "Public repository",
        href: "https://github.com/Fatgezimb/neurostack-explorer",
      },
    ],
    inspect:
      "Select a recorded neuron and a time window. Compare the spike raster with the source and method notes before interpreting a model result.",
  },
] as const;
