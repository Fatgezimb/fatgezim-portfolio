export type NavigationItem = {
  href: `#${string}`;
  label: string;
};

export type PublicLink = {
  href: string;
  label: string;
  kind: "email" | "github" | "linkedin";
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
    resume: {
      status: "pending-review";
      label: string;
      href: null;
      note: string;
    };
  };
  about: {
    heading: string;
    paragraphs: readonly string[];
    domains: readonly string[];
  };
  featuredWork: {
    heading: string;
    introduction: string;
    demoPlaceholderLabel: string;
    demoPlaceholderNote: string;
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
    privacyNote: string;
  };
  contentBoundaries: readonly string[];
};

export const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Featured work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#research", label: "Research" },
  { href: "#founder", label: "Founder" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const satisfies readonly NavigationItem[];

export const siteMeta = {
  title: "Fatgezim “Zim” Bela | BCBA, Medical Student, Data Scientist, and Founder",
  description:
    "The verified portfolio of Fatgezim “Zim” Bela, connecting behavioral health, medical education, data science, software, and founder-built technology.",
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
      "I connect behavioral-health practice, medical education, data science, and software development to build practical, privacy-aware tools for professionals, learners, and families.",
    roles: [
      "Board Certified Behavior Analyst",
      "Medical Student",
      "Data Scientist",
      "Founder, NeuroPath LLC",
      "Co-founder and Co-builder, Bela Data Lab products",
    ],
    primaryAction: { href: "#projects", label: "View featured work" },
    contactAction: { href: "#contact", label: "Contact" },
    resume: {
      status: "pending-review",
      label: "Verified résumé download coming soon",
      href: null,
      note:
        "The downloadable résumé will be enabled only after the confirmed content is rendered without an address or phone number and manually reviewed.",
    },
  },
  about: {
    heading: "About",
    paragraphs: [
      "My work sits at the intersection of applied behavior analysis, medical education, data, and software. I approach products as both a clinician and a builder: define the real workflow, make its limits visible, and keep the result understandable to the people who use it.",
      "I founded NeuroPath LLC and co-build Bela Data Lab products with Meili Bela. Across public learning tools, browser-local analytics, and internal automation prototypes, the common focus is practical behavioral-health technology with clear educational and privacy boundaries.",
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
      "Selected products and prototypes show how behavioral-health knowledge can become learning systems, operational tools, local-first analytics, and carefully bounded automation.",
    demoPlaceholderLabel: "Future interactive preview",
    demoPlaceholderNote:
      "Phase 1 shows a static, sanitized workflow outline. Interactive project previews are deferred until the owner approves the content and layout.",
  },
  founderContext: {
    heading: "Founder and company context",
    introduction:
      "NeuroPath is the public-facing label for NeuroPath LLC. The company and its products bring behavioral science, healthcare, data, education, and human-centered software into one product ecosystem.",
    relationships: [
      {
        name: "NeuroPath",
        relationship: "Public-facing company label for NeuroPath LLC",
        role: "Founder, NeuroPath LLC",
      },
      {
        name: "Bela Data Lab",
        relationship: "Product brand operated within the NeuroPath ecosystem",
        role: "Co-founder and Co-builder with Meili Bela",
      },
      {
        name: "Bela Data Lab Caregiver Academy",
        relationship: "Current public caregiver-learning product",
        role: "Co-founder, Product Builder, and BCBA Contributor",
      },
    ],
  },
  contact: {
    heading: "Contact",
    introduction:
      "Connect about behavioral-health technology, clinical-product collaboration, medical learning, data systems, or software work.",
    links: [
      {
        href: "mailto:fatgezimbela1@gmail.com",
        label: "fatgezimbela1@gmail.com",
        kind: "email",
        external: false,
      },
      {
        href: "https://www.linkedin.com/in/fatgezimzimbela/",
        label: "LinkedIn",
        kind: "linkedin",
        external: true,
      },
      {
        href: "https://github.com/Fatgezimb",
        label: "GitHub",
        kind: "github",
        external: true,
      },
    ],
  },
  footer: {
    copyright: "© 2026 Fatgezim “Zim” Bela",
    privacyNote:
      "Portfolio examples use public, synthetic, or sanitized material and do not contain client information or PHI.",
  },
  contentBoundaries: [
    "Do not publish a phone number, street address, license number, provider identifier, or certificate identifier.",
    "Do not link an older résumé PDF containing unresolved facts or private contact information.",
    "Do not publish PHI, client information, therapy records, private exports, or authenticated clinical-platform screenshots.",
    "Do not claim awards, publications, research findings, product metrics, customers, revenue, or outcomes without supporting evidence.",
    "Clearly distinguish active public products, local tools, internal prototypes, archived work, and future concepts.",
  ],
} as const satisfies SiteContent;
