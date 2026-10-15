// Source audit: docs/portfolio/redesign-project-evidence.md.
// Preview records are independent of production accounts and never mutate product data.
// Appointment, queue, and rate rows are explicitly invented demonstration records.
// Lessons are source-backed educational examples from Caregiver Academy's Big Feelings course.
// Public product references: https://neuropathlabs.com/demo and https://beladatalab.com/#preview
export const appointments = [
  { id: "DEMO-01", team: "Team A", hours: 3, state: "Ready", recent: false },
  {
    id: "DEMO-02",
    team: "Team B",
    hours: 2.5,
    state: "Missing note",
    recent: false,
  },
  {
    id: "DEMO-03",
    team: "Team A",
    hours: 1.5,
    state: "Needs verification",
    recent: true,
  },
  { id: "DEMO-04", team: "Team C", hours: 0, state: "Cancelled", recent: true },
  { id: "DEMO-05", team: "Team B", hours: 2, state: "Ready", recent: true },
] as const;

export const lessons = [
  {
    title: "Start with scope and safety",
    stage: "Before",
    intro:
      "A learning library can help caregivers prepare routines and questions. Immediate danger needs qualified local help.",
    prompt: "What comes first when someone is in immediate danger?",
    choices: [
      "Continue the lesson",
      "Stop and seek emergency or qualified local help",
      "Enter a detailed personal account",
    ],
    correct: 1,
    feedback:
      "Safety comes first. An educational course cannot assess an emergency or replace local professional support.",
  },
  {
    title: "When capacity changes",
    stage: "During",
    intro:
      "Language and flexibility can be harder to access under stress. The course explores simpler adult responses and saving nonessential teaching for a calmer moment.",
    prompt: "Which response matches a temporary drop in capacity?",
    choices: [
      "Add a longer explanation",
      "Require the same performance as yesterday",
      "Simplify the next step and delay nonessential teaching",
    ],
    correct: 2,
    feedback:
      "A simpler next step and fewer words can match the moment. Child-specific decisions belong with a qualified professional.",
  },
  {
    title: "Reflect and return",
    stage: "After",
    intro:
      "The course includes recovery, respectful repair, and private reflection. A useful practice note stays neutral and free of identifying details.",
    prompt: "Which is suitable for a general practice note?",
    choices: [
      "A person's medical history",
      "A neutral routine name such as bedtime",
      "Private school records",
    ],
    correct: 1,
    feedback:
      "A neutral routine label is enough for this educational reflection. The sample never asks for personal or clinical records.",
  },
] as const;

export const sampleQueue = [
  "Practice workflow A",
  "Practice workflow B",
  "Practice workflow C",
] as const;

export const sampleRates = [
  {
    id: "S-01",
    state: "Virginia",
    code: "97153",
    payer: "Sample payer A",
    rate: 42,
  },
  {
    id: "S-02",
    state: "Virginia",
    code: "97153",
    payer: "Sample payer B",
    rate: 49,
  },
  {
    id: "S-03",
    state: "North Carolina",
    code: "97153",
    payer: "Sample payer A",
    rate: 45,
  },
  {
    id: "S-04",
    state: "North Carolina",
    code: "97155",
    payer: "Sample payer B",
    rate: 68,
  },
  {
    id: "S-05",
    state: "Virginia",
    code: "97155",
    payer: "Sample payer A",
    rate: 72,
  },
] as const;
