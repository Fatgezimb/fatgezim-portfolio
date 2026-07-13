export type ResearchItem = {
  id: string;
  title: string;
  institution: string;
  status: string;
  summary: string;
  methods: string[];
  evidenceBoundary: string;
  uncertaintyFlags: string[];
};

export const researchItems: ResearchItem[] = [
  {
    id: "gmu-computational-neuroscience",
    title: "Computational neuroscience and neuroimaging research",
    institution: "George Mason University",
    status: "Research experience",
    summary:
      "Contributed to image-based neuroscience work involving neuron tracing, reconstruction, and interpretation of three-dimensional biological structures.",
    methods: [
      "Image analysis",
      "Image slicing",
      "ImageJ",
      "NeuTube",
      "Vaa3D",
      "Three-dimensional reconstruction",
    ],
    evidenceBoundary:
      "Presented as research experience only. No project result, performance metric, award, publication, formal presentation, dataset, or laboratory affiliation is claimed.",
    uncertaintyFlags: [
      "Exact project title, lab affiliation, dates, poster, and outputs require a supporting artifact before publication.",
    ],
  },
];

export const researchNote =
  "This section intentionally distinguishes supported research methods from unverified outputs. Additional work will be added only when a repository, poster, abstract, program, or institutional source is available.";
