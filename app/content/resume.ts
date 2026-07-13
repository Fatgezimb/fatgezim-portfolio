export type PublicLink = {
  label: string;
  href: string;
  kind: "email" | "profile" | "site";
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
    "I work at the intersection of applied behavior analysis, medical education, data science, and software product development. My focus is building practical, privacy-aware tools that make complex behavioral-health and learning workflows easier to understand and use.",
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
      "Data analysis, workflow automation, and typed web products designed around real operational needs.",
  },
  {
    title: "Founder practice",
    description:
      "Founder and co-builder work across NeuroPath and jointly built Bela Data Lab products.",
  },
] as const;

export const publicLinks: PublicLink[] = [
  {
    label: "Email",
    href: "mailto:fatgezimbela1@gmail.com",
    kind: "email",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fatgezimzimbela/",
    kind: "profile",
  },
  {
    label: "GitHub",
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
      "Builds behavioral-health learning products and operational tools, with clear boundaries between public products, internal prototypes, and archived work.",
    highlights: [
      "Founder and product strategy for NeuroPath",
      "Co-founder and co-builder of jointly developed Bela Data Lab products",
      "Privacy-aware product design for behavioral-health contexts",
    ],
    statusLabel: "Current focus",
    evidence: ["Owner confirmation", "Current product repositories"],
    uncertaintyFlags: [],
  },
  {
    id: "data-product-practice",
    title: "Data Scientist and Software Product Builder",
    summary:
      "Applies data analysis, software engineering, and workflow design to learning, operations, and behavioral-health product problems.",
    highlights: [
      "Python and SQL analysis workflows",
      "Typed web application development and testing",
      "Local-first automation and synthetic-data demonstrations",
    ],
    statusLabel: "Selected practice",
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
      "Worked in a government-related data engineering role. Public copy excludes client, agency, clearance, and system details.",
    highlights: [
      "Data engineering in a government-related environment",
      "Scope intentionally bounded to verified, non-sensitive facts",
    ],
    statusLabel: "Provisional public wording",
    evidence: ["Owner confirmation", "Historical résumé"],
    uncertaintyFlags: [
      "Owner marked the title and dates as provisional for the Phase 1 draft.",
    ],
  },
  {
    id: "earlier-aba-practice",
    title: "ABA Technician",
    dates: "2017 - 2019",
    summary:
      "Earlier applied behavior analysis experience supporting skill development and behavior-change programs.",
    highlights: [
      "Direct implementation of behavior-analytic programming",
      "Earlier ABA experience also included work with Connex Family Services",
    ],
    statusLabel: "Provisional public wording",
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
    evidenceNote: "Supported by current clinical résumé and owner confirmation.",
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
    evidenceNote: "Supported by current résumé and active project evidence.",
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
      "Privacy-aware prototyping",
    ],
    evidenceNote: "Supported by current product repositories and public builds.",
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
      "Methods are limited to those supported by historical source material; no result or publication claim is made.",
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
      "Evidence and privacy boundaries",
    ],
    evidenceNote: "Supported by owner-confirmed roles and current product work.",
  },
];

export const education: EducationItem[] = [
  {
    id: "ross-md",
    credential: "Doctor of Medicine Candidate",
    institution: "Ross University School of Medicine",
    date: "Expected 2028",
    status: "Currently completing requirements leading into the clinical phase, including USMLE Step 1.",
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

export const publicationPolicy = {
  resumeDownloadLabel: "Verified résumé download coming soon",
  privacyStatement:
    "Public materials omit street addresses, phone numbers, credential identifiers, client information, PHI, and private operational data.",
} as const;
