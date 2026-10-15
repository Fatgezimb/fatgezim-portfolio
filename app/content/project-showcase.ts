// Presentation copy grounded in the October 15 live/source audit.
export const projectPresentations: Record<
  string,
  {
    short: string;
    category: string;
    intro: string;
    hint: string;
    scope: string;
    live?: string;
    full?: string;
  }
> = {
  "bela-behavior-data-lab": {
    short: "Behavior Data Lab",
    category: "Operations & analytics",
    intro: "An appointment export becomes an operational picture.",
    hint: "Change the range, inspect an action, or open a report.",
    scope: "Interactive sample · synthetic appointments",
    live: "https://neuropathlabs.com/demo",
    full: "https://neuropathlabs.com/",
  },
  "rbt-practice-hub": {
    short: "RBT Practice Hub",
    category: "Learning product",
    intro: "A clearer path from study to practice.",
    hint: "Choose a task, flip a card, and try a question.",
    scope: "Independent study sample · progress for this visit",
    live: "https://rbt-pro.vercel.app/",
    full: "https://rbt-pro.vercel.app/",
  },
  "caregiver-academy": {
    short: "Caregiver Academy",
    category: "Caregiver education",
    intro: "Practical learning, built around everyday moments.",
    hint: "Open a lesson and work through its knowledge check.",
    scope: "Educational sample · co-built with Meili Bela",
    live: "https://beladatalab.com/#preview",
    full: "https://beladatalab.com/",
  },
  stepspark: {
    short: "StepSpark",
    category: "Medical learning prototype",
    intro: "Look. Recall. Reveal. Make the connection.",
    hint: "Reveal an answer, record your confidence, and inspect its source.",
    scope: "Draft learning prototype · source and review status included",
    full: "https://fatgezimb.github.io/StepSpark/",
  },
  "neurostack-explorer": {
    short: "NeuroStack Explorer",
    category: "Scientific software",
    intro: "Neural recordings you can actually inspect.",
    hint: "Switch views, select a unit, and inspect the data provenance.",
    scope: "Public NWB derivative · 20-second artifact sample",
    live: "https://fatgezimb.github.io/neurostack-explorer/lab/",
    full: "https://fatgezimb.github.io/neurostack-explorer/",
  },
  "rethink-automations": {
    short: "Rethink Automations",
    category: "Local automation beta",
    intro: "Repetitive work, with a human in control.",
    hint: "Select a fictional queue item, confirm the page, and simulate Step 1.",
    scope: "Local beta simulation · fictional workflow items",
  },
  "neuropath-insight": {
    short: "NeuroPath Insight",
    category: "Data analysis prototype",
    intro: "Turn complex rate files into a reviewable comparison.",
    hint: "Filter the example rates and inspect a benchmark record.",
    scope: "Exploratory prototype · simulated reimbursement data",
  },
};
export const projectDisplayOrder = [
  "bela-behavior-data-lab",
  "rbt-practice-hub",
  "caregiver-academy",
  "stepspark",
  "neurostack-explorer",
  "rethink-automations",
  "neuropath-insight",
];
