export type NavigationItem = {
  href: `/#${string}`;
  id: string;
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
    privacyNote: string;
  };
  contentBoundaries: readonly string[];
};

export const navigationItems = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#education", id: "education", label: "Education" },
  { href: "/#projects", id: "projects", label: "Featured work" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#research", id: "research", label: "Research" },
  { href: "/#founder", id: "founder", label: "Leadership" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const satisfies readonly NavigationItem[];

export const siteMeta = {
  title: "Fatgezim “Zim” Bela | BCBA · Licensed in NC, VA & NY",
  description:
    "Meet Fatgezim “Zim” Bela, a BCBA licensed in North Carolina, Virginia, and New York. Clinical experience in language acquisition, FCT, RBT supervision, and hybrid care. CTO of Create 13 Group and founder of NeuroPath.",
  sectionOrder: [
    "about",
    "experience",
    "education",
    "projects",
    "skills",
    "research",
    "founder",
    "contact",
  ],
} as const;

export const siteContent = {
  hero: {
    eyebrow: "Board Certified Behavior Analyst · NC / VA / NY",
    displayName: "Fatgezim “Zim” Bela",
    shortName: "Zim Bela",
    headline:
      "I help people build skills for everyday life.",
    shortHeadline: "BCBA, Medical Student & Technology Founder",
    roleLine: "BCBA · Medical Student · CTO · Founder",
    summary:
      "I’m Zim, a BCBA focused on language acquisition, functional communication, and care across home, school, and telehealth. I also build technology that supports clinicians, caregivers, and learners.",
    roles: [
      "Board Certified Behavior Analyst",
      "Medical Student",
      "CTO, Create 13 Group",
      "Founder, NeuroPath LLC",
      "Co-founder and Co-builder, Bela Data Lab",
    ],
    primaryAction: { href: "/#experience", id: "experience", label: "Explore my experience" },
    contactAction: { href: "/#contact", id: "contact", label: "Let’s connect" },
  },
  about: {
    heading: "Clinical care, informed by a broader perspective.",
    paragraphs: [
      "I’m a Board Certified Behavior Analyst licensed in North Carolina, Virginia, and New York. At Achievements, I develop individualized programs, supervise RBTs, and partner with caregivers and interdisciplinary teams. My clinical focus is helping communication and play skills carry into everyday routines through culturally responsive, data-driven care.",
      "My background in neuroscience, data science, and medical education shapes how I understand clinical problems. I’m also CTO of Create 13 Group, founder of NeuroPath LLC, and co-founder and co-builder of Bela Data Lab with Meili Bela. Together, these roles let me connect hands-on clinical experience with useful learning tools and technology.",
    ],
    domains: [
      "Behavioral science and ABA",
      "Medical education",
      "Data science and engineering",
      "Software and workflow automation",
      "Technology and founder leadership",
    ],
  },
  featuredWork: {
    heading: "Featured work",
    introduction:
      "Learning tools, analytics, and workflow projects shaped by experience in behavioral health, data science, and medical education.",
  },
  founderContext: {
    heading: "Building beyond the clinic.",
    introduction:
      "My technology and founder work extends the same interest in practical problem-solving: making information, learning, and everyday workflows easier to use.",
    relationships: [
      {
        name: "Create 13 Group",
        relationship: "Technology leadership",
        role: "Chief Technology Officer",
      },
      {
        name: "NeuroPath",
        relationship: "Behavioral-health technology and learning tools",
        role: "Founder, NeuroPath LLC",
      },
      {
        name: "Bela Data Lab",
        relationship: "Learning and data products within NeuroPath",
        role: "Co-founder and Co-builder with Meili Bela",
      },
      {
        name: "Bela Data Lab Caregiver Academy",
        relationship: "Caregiver learning and education",
        role: "Co-founder, Product Builder, and BCBA Contributor",
      },
    ],
  },
  contact: {
    heading: "Let’s talk about your clinical team.",
    introduction:
      "I’m exploring BCBA roles where individualized care, thoughtful supervision, and caregiver collaboration matter. Connect with me about opportunities in North Carolina, Virginia, and New York, including hybrid and remote care.",
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
      "Behavioral science. Thoughtful care. Practical technology.",
  },
  contentBoundaries: [
    "Do not publish a phone number, street address, license number, provider identifier, or certificate identifier.",
    "Do not link an older résumé PDF containing unresolved facts or private contact information.",
    "Do not publish PHI, client information, therapy records, private exports, or authenticated clinical-platform screenshots.",
    "Do not claim awards, publications, research findings, product metrics, customers, revenue, or outcomes without supporting evidence.",
    "Clearly distinguish active public products, local tools, internal prototypes, archived work, and future concepts.",
  ],
} as const satisfies SiteContent;
