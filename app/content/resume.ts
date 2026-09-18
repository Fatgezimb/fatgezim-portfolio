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
    "Board Certified Behavior Analyst | Licensed in North Carolina, Virginia & New York",
  shortHeadline:
    "BCBA, Medical Student & Technology Founder",
  summary:
    "I’m a BCBA focused on language acquisition, functional communication training, and culturally responsive care across home, school, and telehealth settings. I combine individualized programming, RBT supervision, and caregiver collaboration with a background in data science and medical education. I also serve as CTO of Create 13 Group, founded NeuroPath LLC, and co-build Bela Data Lab with Meili Bela.",
} as const;

export const currentFocus = [
  "BCBA · Licensed in NC, VA & NY",
  "Home, school & telehealth care",
  "CTO, Create 13 Group",
  "Founder, NeuroPath LLC",
] as const;

export const profileDomains = [
  {
    title: "Clinical practice",
    description:
      "Functional communication, language acquisition, individualized behavior support, and RBT supervision.",
  },
  {
    title: "Medicine and research",
    description:
      "Medical education at Ross University, with a foundation in neuroscience and neuroimaging research.",
  },
  {
    title: "Data and software",
    description:
      "Data analysis, workflow automation, and typed web products designed around real operational needs.",
  },
  {
    title: "Technology leadership",
    description:
      "CTO of Create 13 Group, founder of NeuroPath LLC, and co-founder and co-builder of Bela Data Lab with Meili Bela.",
  },
] as const;

export const publicLinks: PublicLink[] = [
  {
    label: "fatgezimbela1@gmail.com",
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
    organization: "Achievements",
    dates: "April 2025 – Present",
    summary:
      "Hybrid and remote BCBA practice in North Carolina, with a focus on communication, language acquisition, and care that fits family life.",
    highlights: [
      "Conduct comprehensive FBAs and develop individualized, data-driven BIPs emphasizing functional communication training (FCT) and language acquisition across home, school, and telehealth settings.",
      "Deliver hybrid supervision for RBTs, modeling evidence-based ABA strategies including DTT, NET, and naturalistic FCT procedures to increase spontaneous manding and carrier phrase use.",
      "Collaborate with caregivers and interdisciplinary teams to promote generalization of communication and play skills, adapting programming to family routines and cultural context.",
      "Analyze session data to guide ongoing treatment modifications, ensuring interventions produce meaningful, socially valid behavior change and measurable language growth.",
    ],
    statusLabel: "Clinical practice · Hybrid / remote",
    evidence: ["Fatgezim_Bela_Resume_2026.pdf"],
    uncertaintyFlags: [],
  },
  {
    id: "create-13-cto",
    title: "Chief Technology Officer",
    organization: "Create 13 Group",
    summary: "Technology leadership at Create 13 Group.",
    highlights: [],
    statusLabel: "Technology leadership",
    evidence: ["Owner confirmation, September 2026"],
    uncertaintyFlags: [],
  },
  {
    id: "founder-practice",
    title: "Founder",
    organization: "NeuroPath LLC",
    summary:
      "Builds behavioral-health learning products and practical tools for clinicians, caregivers, and learners.",
    highlights: [
      "Founder and product strategy for NeuroPath",
      "Co-founder and co-builder of Bela Data Lab with Meili Bela",
      "Clinical perspective on learning tools, analytics, and workflow design",
    ],
    statusLabel: "Current focus",
    evidence: ["Owner confirmation", "Current product repositories"],
    uncertaintyFlags: [],
  },
  {
    id: "data-product-practice",
    title: "Data Scientist",
    organization: "1331 Recordz",
    dates: "January 2022 – Present",
    summary:
      "Data analysis, predictive modeling, and visual reporting to support business decisions.",
    highlights: [
      "Collected, cleaned, and analyzed large datasets using Python, SQL, and statistical methods to uncover actionable insights and support data-driven decision making.",
      "Developed predictive models and machine learning algorithms (e.g., regression, classification, clustering) to solve business problems and improve performance metrics.",
      "Communicated complex data findings through visualizations (e.g., Tableau, Matplotlib, Seaborn) and clear reporting to both technical and non-technical stakeholders.",
    ],
    statusLabel: "Data science",
    evidence: ["Fatgezim_Bela_Resume_2026.pdf"],
    uncertaintyFlags: [],
  },
  {
    id: "tmci-data-engineer",
    title: "Data Engineer",
    organization: "The McVay Company, Inc.",
    dates: "October 2022 – January 2023",
    summary:
      "Data engineering experience in a government-related environment.",
    highlights: [],
    statusLabel: "Data engineering",
    evidence: ["Owner confirmation", "Historical résumé"],
    uncertaintyFlags: [],
  },
  {
    id: "connex-aba-technician",
    title: "ABA Technician",
    organization: "Connex Family Services",
    dates: "August 2019 – January 2021",
    summary:
      "Direct ABA services delivered remotely and in Manassas, Virginia.",
    highlights: [
      "Conducted behavioral assessments and functional analyses under the supervision of a BCBA to identify the function of problem behaviors and inform intervention planning.",
      "Designed and implemented skill acquisition programs targeting communication, daily living, and social skills, aligned with individualized treatment goals.",
      "Collected, graphed, and analyzed data using ABA software to monitor client progress and guide clinical decision-making during supervision meetings.",
    ],
    statusLabel: "Clinical experience",
    evidence: ["Fatgezim_Bela_Resume_2026.pdf"],
    uncertaintyFlags: [],
  },
  {
    id: "abc-aba-technician",
    title: "ABA Technician",
    organization: "ABC Behavior – Hi-Five ABA Therapy",
    dates: "May 2017 – August 2019",
    summary:
      "Direct ABA services for clients ages 2–18 in Manassas, Virginia.",
    highlights: [
      "Implemented individualized behavior intervention plans using evidence-based ABA techniques (e.g., DTT, NET) to support clients with developmental and behavioral needs aged 2–18.",
      "Collected and recorded accurate data on target behaviors and skill acquisition goals to inform treatment decisions and monitor progress.",
      "Collaborated with BCBAs, caregivers, and interdisciplinary teams to ensure consistent implementation of strategies and promote generalization of skills across settings.",
    ],
    statusLabel: "Clinical experience",
    evidence: ["Fatgezim_Bela_Resume_2026.pdf"],
    uncertaintyFlags: [],
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
      "Language acquisition",
      "Discrete-trial and natural-environment teaching",
      "Skill-acquisition programming",
      "Caregiver collaboration",
      "RBT supervision",
      "Hybrid and telehealth service delivery",
      "Culturally responsive programming",
    ],
    evidenceNote: "Applied across home, school, and telehealth settings.",
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
      "Tableau, Matplotlib, and Seaborn",
      "Workflow automation",
      "Operational reporting",
    ],
    evidenceNote: "Analysis, modeling, and reporting at 1331 Recordz.",
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
    evidenceNote: "Applied through NeuroPath and Bela Data Lab products.",
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
      "Research experience at George Mason University.",
  },
  {
    id: "leadership",
    title: "Leadership and entrepreneurship",
    level: "Applied",
    skills: [
      "Founder-led product development",
      "Technology leadership",
      "Cross-domain problem framing",
      "Clinical and technical collaboration",
      "Product scoping",
      "Interdisciplinary collaboration",
    ],
    evidenceNote: "Create 13 Group, NeuroPath, and Bela Data Lab.",
  },
];

export const education: EducationItem[] = [
  {
    id: "ross-md",
    credential: "Doctor of Medicine Candidate",
    institution: "Ross University School of Medicine",
    date: "Expected May 2028",
    status: "Current medical student",
  },
  {
    id: "gmu-med",
    credential: "M.Ed. in Special Education",
    institution: "George Mason University",
    date: "December 2020",
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
    date: "May 2017",
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
  resumeDownloadLabel: "Print-ready résumé available",
  privacyStatement:
    "Open to BCBA opportunities in North Carolina, Virginia, and New York, including hybrid and remote care.",
} as const;
