export type PublicLink = {
  label: string;
  href: string;
  kind: "profile" | "site";
};

export type ExperienceItem = {
  id: string;
  title: string;
  organization?: string;
  dates?: string;
  summary: string;
  highlights: string[];
  statusLabel: string;
  evidence: string[];
  uncertaintyFlags: string[];
};

export type SkillGroup = {
  id: string;
  title: string;
  level: "Core" | "Applied" | "Research experience";
  skills: string[];
  evidenceNote: string;
};

export type EducationItem = {
  id: string;
  credential: string;
  institution: string;
  date: string;
  status?: string;
};

export const identity = {
  name: 'Fatgezim “Zim” Bela',
  shortName: "Zim Bela",
  headline:
    "BCBA, Medical Student, Data Scientist, and Founder Building Technology for Behavioral Health",
  shortHeadline:
    "Behavioral Health Clinician, Medical Student, and Technology Founder",
  summary:
    "I build practical tools at the intersection of applied behavior analysis, medical education, data science, and software product development.",
} as const;

export const currentFocus = [
  "Board Certified Behavior Analyst since 2025",
  "Doctor of Medicine Candidate, expected 2028",
  "Founder, NeuroPath LLC",
  "Data scientist and product builder",
] as const;

export const profileDomains = [
  {
    title: "Behavioral health",
    description:
      "Applied behavior analysis, caregiver collaboration, skill acquisition, and clinical workflow design.",
  },
  {
    title: "Medicine and research",
    description:
      "Current medical education grounded in earlier computational neuroscience and neuroimaging research experience.",
  },
  {
    title: "Data and software",
    description:
      "Data analysis, workflow automation, and web applications designed around real operational needs.",
  },
  {
    title: "Founder and product leadership",
    description:
      "Building NeuroPath and co-developing Bela Data Lab products with Meili Bela.",
  },
] as const;

export const publicLinks: PublicLink[] = [
  {
    label: "linkedin.com/in/fatgezimzimbela",
    href: "https://www.linkedin.com/in/fatgezimzimbela/",
    kind: "profile",
  },
  {
    label: "github.com/Fatgezimb",
    href: "https://github.com/Fatgezimb",
    kind: "profile",
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "bcba-practice",
    title: "Board Certified Behavior Analyst",
    dates: "Since 2025",
    summary:
      "Behavior-analytic practice centered on assessment, individualized programming, skill development, caregiver collaboration, and team support.",
    highlights: [
      "Functional behavior assessment and behavior intervention planning",
      "Skill-acquisition programming using evidence-based teaching approaches",
      "Caregiver collaboration and RBT supervision",
    ],
    statusLabel: "Current practice",
    evidence: ["Owner confirmation", "Current résumé"],
    uncertaintyFlags: [
      "Current employer, city, and exact start month intentionally omitted pending final public wording.",
    ],
  },
  {
    id: "founder-practice",
    title: "Founder",
    organization: "NeuroPath LLC",
    summary:
      "Builds behavioral-health learning products and operational tools through NeuroPath.",
    highlights: [
      "Founder and product strategy for NeuroPath",
      "Co-founder and co-builder of Bela Data Lab products with Meili Bela",
      "Responsible product design for behavioral-health contexts",
    ],
    statusLabel: "Current focus",
    evidence: ["Owner confirmation", "Current product repositories"],
    uncertaintyFlags: [],
  },
  {
    id: "data-product-practice",
    title: "Data Scientist and Software Product Builder",
    summary:
      "Applies data analysis, software engineering, and workflow design to learning, operations, and behavioral-health products.",
    highlights: [
      "Python and SQL analysis workflows",
      "Typed web application development and testing",
      "Browser automation and local-first data workflows",
    ],
    statusLabel: "Current work",
    evidence: ["Current project repositories", "Owner confirmation"],
    uncertaintyFlags: [
      "Unverified employer names and employment dates are intentionally omitted.",
    ],
  },
  {
    id: "tmci-data-engineer",
    title: "Data Engineer",
    organization: "The McVay Company, Inc.",
    dates: "October 2022 - January 2023",
    summary:
      "Contributed to data-engineering workflows at The McVay Company, Inc.",
    highlights: [],
    statusLabel: "Previous role",
    evidence: ["Owner confirmation", "Historical résumé"],
    uncertaintyFlags: [
      "Owner marked the title and dates as provisional for the public portfolio.",
    ],
  },
  {
    id: "earlier-aba-practice",
    title: "ABA Technician",
    dates: "2017 - 2019",
    summary:
      "Applied behavior analysis experience supporting skill development and behavior-change programs.",
    highlights: [
      "Direct implementation of behavior-analytic programming",
      "ABA experience with Connex Family Services",
    ],
    statusLabel: "Previous role",
    evidence: ["Owner confirmation", "Historical résumés"],
    uncertaintyFlags: [
      "Official employer naming, organization relationships, and precise end date remain omitted pending verification.",
      "The exact Connex title and dates remain omitted pending verification.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "behavioral-science",
    title: "Behavioral science and ABA",
    level: "Core",
    skills: [
      "Functional behavior assessment",
      "Behavior intervention planning",
      "Functional communication training",
      "Discrete-trial and natural-environment teaching",
      "Skill-acquisition programming",
      "Caregiver collaboration",
      "RBT supervision",
    ],
    evidenceNote: "Used in current clinical practice and earlier ABA work.",
  },
  {
    id: "data-engineering",
    title: "Data science and engineering",
    level: "Core",
    skills: [
      "Python",
      "SQL",
      "Statistical analysis",
      "Regression, classification, and clustering",
      "Data visualization",
      "Workflow automation",
      "Operational reporting",
    ],
    evidenceNote: "Applied across data projects and active products.",
  },
  {
    id: "software-product",
    title: "Software and product building",
    level: "Applied",
    skills: [
      "TypeScript and React",
      "Accessible interface design",
      "Testing and static deployment",
      "Local-first data handling",
      "Browser automation",
      "Product workflow design",
      "Responsible product prototyping",
    ],
    evidenceNote: "Applied across current product repositories and public applications.",
  },
  {
    id: "research-methods",
    title: "Neuroscience and research methods",
    level: "Research experience",
    skills: [
      "Computational neuroscience",
      "Neuroimaging",
      "Image analysis",
      "ImageJ",
      "NeuTube",
      "Vaa3D",
      "Three-dimensional neuron reconstruction",
    ],
    evidenceNote:
      "Experience from computational neuroscience and neuroimaging work at George Mason University.",
  },
  {
    id: "leadership",
    title: "Leadership and entrepreneurship",
    level: "Applied",
    skills: [
      "Founder-led product development",
      "Cross-domain problem framing",
      "Clinical and technical collaboration",
      "Product scoping",
      "Responsible product development",
    ],
    evidenceNote: "Applied through NeuroPath and Bela Data Lab product development.",
  },
];

export const education: EducationItem[] = [
  {
    id: "ross-md",
    credential: "Doctor of Medicine Candidate",
    institution: "Ross University School of Medicine",
    date: "Expected 2028",
  },
  {
    id: "gmu-med",
    credential: "M.Ed. in Special Education",
    institution: "George Mason University",
    date: "2020",
  },
  {
    id: "gmu-aba-certificate",
    credential: "Graduate Certificate in Applied Behavior Analysis",
    institution: "George Mason University",
    date: "2020",
  },
  {
    id: "gmu-neuroscience",
    credential: "B.S. in Neuroscience",
    institution: "George Mason University",
    date: "2018",
  },
];

export const credentials = [
  "M.Ed.",
  "Board Certified Behavior Analyst (BCBA)",
  "Licensed Behavior Analyst - Virginia",
  "Licensed Behavior Analyst - North Carolina",
  "Licensed Behavior Analyst - New York",
] as const;
