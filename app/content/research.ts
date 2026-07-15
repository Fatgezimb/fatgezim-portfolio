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

export type ReconstructionStage = {
  id: string;
  title: string;
  description: string;
  tool?: string;
};

export type ProposedResearchDirection = {
  id: string;
  title: string;
  description: string;
};

export const researchAssets = {
  posterPdf: "/media/fatgezim-bela-computational-neuroscience-poster.pdf",
  posterPreview:
    "/media/fatgezim-bela-computational-neuroscience-poster-preview.jpg",
} as const;

export const gmuNeuronalReconstruction = {
  id: "gmu-computational-neuroscience",
  slug: "george-mason-neuronal-reconstruction",
  title: "Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva",
  publicTitle: "Computational neuroscience and neuronal reconstruction",
  institution: "George Mason University",
  institutionalUnit: "Centers for Neural Informatics, Structures & Plasticity",
  status: "Verified research poster",
  verificationStatus: "Verified artifact",
  authors: ["Fatgezim Bela", "Sumit Nanda", "Giorgio A. Ascoli"],
  role: "Co-author and contributor",
  summary:
    "A collaborative computational-neuroscience project documenting the processing, stitching, tracing, and digital reconstruction of fluorescently labeled neuronal imagery.",
  methods: [
    "Fiji/ImageJ",
    "Image-channel splitting",
    "Signal combination",
    "Vaa3D raw preparation",
    "Vaa3D image stitching",
    "NeuTube tracing",
    "Vectorized-tree reconstruction",
  ],
  documentedOutput:
    "The poster pairs fluorescently labeled Class 4 neuronal imagery with a completed color-coded vectorized-tree reconstruction.",
  evidenceBoundary:
    "Verified from the supplied original poster and presented as collaborative research-poster work.",
  archivalNote:
    "The email address printed on the original poster is archival. Use fatgezimbela1@gmail.com for current contact.",
} as const;

export const reconstructionWorkflow: readonly ReconstructionStage[] = [
  {
    id: "microscopy-images",
    title: "Microscopy image stack",
    description:
      "Begin with overlapping, fluorescently labeled images of a Drosophila larval Class 4 neuron.",
  },
  {
    id: "channel-processing",
    title: "Channel processing",
    description:
      "Process the two-channel images and separate their channels for the next stage.",
    tool: "Fiji/ImageJ",
  },
  {
    id: "signal-combination",
    title: "Signal combination",
    description:
      "Combine the separated signal information to create the artificial membrane representation described in the poster.",
    tool: "Fiji/ImageJ",
  },
  {
    id: "raw-preparation",
    title: "Raw-format preparation",
    description:
      "Save the processed image data in a raw format compatible with the stitching workflow.",
    tool: "Vaa3D",
  },
  {
    id: "image-stitching",
    title: "Image stitching",
    description:
      "Stitch the overlapping neuronal image sections into a continuous three-dimensional volume.",
    tool: "Vaa3D",
  },
  {
    id: "neuron-tracing",
    title: "Neuron tracing",
    description:
      "Trace the stitched neuronal structure using the semi-automated tracing workflow.",
    tool: "NeuTube",
  },
  {
    id: "digital-reconstruction",
    title: "Digital reconstruction",
    description:
      "Represent the traced Class 4 neuron as a color-coded, vectorized tree for morphology review and comparison.",
  },
];

export const proposedResearchDirections: readonly ProposedResearchDirection[] = [
  {
    id: "growth-patterns",
    title: "Neuronal growth patterns",
    description:
      "Explore morphology-based comparisons of fruit-fly neuronal growth patterns.",
  },
  {
    id: "sodium-chlorate",
    title: "Sodium chlorate and axonal growth",
    description:
      "Investigate sodium chlorate effects on E17 mouse spinal-cord axons.",
  },
  {
    id: "cspg-regeneration",
    title: "CSPGs and axonal regeneration",
    description:
      "Study CSPG-associated inhibition and barriers to axonal regeneration.",
  },
];

export const rossMedicalEducationResearch = {
  id: "ross-medical-education",
  title: "Medical education and visual attention research",
  institution: "Ross University School of Medicine",
  status: "Owner-confirmed; documentation pending",
  summary:
    "Developed and presented medical-education research proposals examining visual attention, diagnostic focus, and inattentional blindness among medical learners.",
  evidenceBoundary:
    "This experience is owner-confirmed. Supporting presentation documentation has not yet been supplied for the portfolio.",
} as const;

export const researchItems: ResearchItem[] = [
  {
    id: gmuNeuronalReconstruction.id,
    title: gmuNeuronalReconstruction.title,
    institution: `${gmuNeuronalReconstruction.institutionalUnit}, ${gmuNeuronalReconstruction.institution}`,
    status: gmuNeuronalReconstruction.status,
    summary: gmuNeuronalReconstruction.summary,
    methods: [...gmuNeuronalReconstruction.methods],
    evidenceBoundary: gmuNeuronalReconstruction.evidenceBoundary,
    uncertaintyFlags: [
      "The supplied poster does not identify a presentation date or event.",
    ],
  },
];

export const researchNote =
  "An original George Mason research poster verifies collaborative work in microscopy-image processing, neuron tracing, and digital neuronal reconstruction.";
