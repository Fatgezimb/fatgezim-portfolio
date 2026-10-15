export type NavigationItem = {
  href: `/#${string}`;
  id: string;
  label: string;
};

export type PublicLink = {
  href: string;
  label: string;
  kind: "github" | "linkedin";
  external: boolean;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    displayName: string;
    shortName: string;
    headline: string;
    shortHeadline: string;
    roleLine: string;
    summary: string;
    roles: readonly string[];
    primaryAction: NavigationItem;
    contactAction: NavigationItem;
  };
  about: {
    heading: string;
    paragraphs: readonly string[];
    domains: readonly string[];
  };
  featuredWork: {
    heading: string;
    introduction: string;
  };
  founderContext: {
    heading: string;
    introduction: string;
    relationships: readonly {
      name: string;
      relationship: string;
      role: string;
    }[];
  };
  contact: {
    heading: string;
    introduction: string;
    links: readonly PublicLink[];
  };
  footer: {
    copyright: string;
  };
  contentBoundaries: readonly string[];
};

export const navigationItems = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#projects", id: "projects", label: "Featured work" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#research", id: "research", label: "Research" },
  { href: "/#founder", id: "founder", label: "Founder" },
  { href: "/#education", id: "education", label: "Education" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const satisfies readonly NavigationItem[];

export const siteMeta = {
  title: "Fatgezim “Zim” Bela | BCBA, Medical Student, Data Scientist, and Founder",
  description:
    "Portfolio of Fatgezim “Zim” Bela, connecting behavioral health, medicine, data science, software, and product development.",
  sectionOrder: [
    "about",
    "projects",
    "experience",
    "skills",
    "research",
    "founder",
    "education",
    "contact",
  ],
} as const;

export const siteContent = {
  hero: {
    eyebrow: "Behavioral health · medicine · data · product",
    displayName: "Fatgezim “Zim” Bela",
    shortName: "Zim Bela",
    headline:
      "BCBA, Medical Student, Data Scientist, and Founder Building Technology for Behavioral Health",
    shortHeadline: "Behavioral Health Clinician, Medical Student, and Technology Founder",
    roleLine: "BCBA · Medical Student · Data Scientist · Founder",
    summary:
      "I connect behavioral-health practice, medical education, data science, and software development to build practical tools for professionals, learners, and families.",
    roles: [
      "Board Certified Behavior Analyst",
      "Medical Student",
      "Data Scientist",
      "Founder, NeuroPath LLC",
      "Co-founder and Co-builder, Bela Data Lab products",
    ],
    primaryAction: { href: "/#projects", id: "projects", label: "View featured work" },
    contactAction: { href: "/#contact", id: "contact", label: "Contact" },
  },
  about: {
    heading: "About",
    paragraphs: [
      "My work sits at the intersection of applied behavior analysis, medical education, data, and software. I approach products as both a clinician and a builder: understand the workflow, design for the people using it, and make complex systems easier to navigate.",
      "I founded NeuroPath LLC and co-build Bela Data Lab products with Meili Bela. Together, that work spans learning tools, browser-local analytics, and workflow automation for behavioral health.",
    ],
    domains: [
      "Behavioral science and ABA",
      "Medical education",
      "Data science and engineering",
      "Software and workflow automation",
      "Founder and product leadership",
    ],
  },
  featuredWork: {
    heading: "Featured work",
    introduction:
      "Selected products and prototypes show how behavioral-health knowledge can become learning tools, operational software, local-first analytics, and workflow automation.",
  },
  founderContext: {
    heading: "Building NeuroPath",
    introduction:
      "I founded NeuroPath LLC to bring behavioral science, healthcare, data, education, and software into practical products.",
    relationships: [
      {
        name: "NeuroPath",
        relationship: "Behavioral-health technology company",
        role: "Founder, NeuroPath LLC",
      },
      {
        name: "Bela Data Lab",
        relationship: "Data and learning products co-built with Meili Bela",
        role: "Co-founder and Co-builder with Meili Bela",
      },
      {
        name: "Bela Data Lab Caregiver Academy",
        relationship: "Caregiver education platform",
        role: "Co-founder, Product Builder, and BCBA Contributor",
      },
    ],
  },
  contact: {
    heading: "Contact",
    introduction:
      "I’m open to conversations about behavioral-health technology, clinical product development, medical education, data systems, and software engineering.",
    links: [
      {
        href: "https://www.linkedin.com/in/fatgezimzimbela/",
        label: "linkedin.com/in/fatgezimzimbela",
        kind: "linkedin",
        external: true,
      },
      {
        href: "https://github.com/Fatgezimb",
        label: "github.com/Fatgezimb",
        kind: "github",
        external: true,
      },
    ],
  },
  footer: {
    copyright: "© 2026 Fatgezim “Zim” Bela",
  },
  contentBoundaries: [
    "Do not publish a phone number, street address, license number, provider identifier, or certificate identifier.",
    "Do not link an older résumé PDF containing unresolved facts or private contact information.",
    "Do not publish PHI, client information, therapy records, private exports, or authenticated clinical-platform screenshots.",
    "Do not claim awards, publications, research findings, product metrics, customers, revenue, or outcomes without supporting evidence.",
    "Clearly distinguish active public products, local tools, internal prototypes, archived work, and future concepts.",
  ],
} as const satisfies SiteContent;
