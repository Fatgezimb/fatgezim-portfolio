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
  email: "fatgezimbela1@gmail.com",
  headline:
    "Founder and CTO · Software Engineering · Data and Scientific Systems",
  shortHeadline:
    "Founder, CTO, and Hands-on Software Builder",
  summary:
    "I lead technology and build software from workflow discovery through implementation and testing. My work spans typed web applications, Python and SQL data workflows, browser automation, and reproducible neuroscience software. A background in behavioral science and medical education helps me translate complex domain requirements into practical products.",
} as const;

export const currentFocus = [
  "Founder and CTO, Create 13 Group",
  "Founder and CTO, NeuroPath LLC",
  "Software, data, and workflow automation",
  "Scientific software and learning products",
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
    id: "create13-cto",
    title: "Founder and Chief Technology Officer",
    organization: "Create 13 Group",
    dates: "2018 - Present",
    summary: "Lead technology direction and hands-on software development, translating business requirements into product architecture and implementation priorities.",
    highlights: [
      "Own technical scoping, integration decisions, interface development, and release planning.",
      "Work directly in the codebase while coordinating product requirements and iterative delivery.",
    ],
    statusLabel: "Current leadership",
    evidence: ["Owner confirmation, October 15, 2026", "Supplied technical resume"],
    uncertaintyFlags: [],
  },
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
    title: "Founder and Chief Technology Officer",
    organization: "NeuroPath LLC",
    dates: "2026 - Present",
    summary:
      "Lead product architecture and engineering for behavioral-health learning and operational software; co-build Bela Data Lab products with Meili Bela.",
    highlights: [
      "Translate clinical and operational workflows into structured data, review states, and usable interfaces.",
      "Build browser-local analytics, education tools, and workflow automation with explicit data boundaries.",
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
].sort((a, b) => {
  const order = ["create13-cto", "founder-practice", "data-product-practice", "tmci-data-engineer", "bcba-practice", "earlier-aba-practice"];
  return order.indexOf(a.id) - order.indexOf(b.id);
});

export const skillGroups: SkillGroup[] = ([
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
      "JavaScript and Next.js",
      "Semantic HTML and CSS",
      "Git and GitHub Actions",
      "Vitest and Playwright",
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
] satisfies SkillGroup[]).sort((a, b) => {
  const order = ["software-product", "data-engineering", "leadership", "research-methods", "behavioral-science"];
  return order.indexOf(a.id) - order.indexOf(b.id);
});

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
    date: "2017",
  },
];

export const credentials = [
  "M.Ed.",
  "Board Certified Behavior Analyst (BCBA)",
  "Licensed Behavior Analyst - Virginia",
  "Licensed Behavior Analyst - North Carolina",
  "Licensed Behavior Analyst - New York",
] as const;
