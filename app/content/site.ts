import { identity, publicLinks } from "./resume";

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
  title: "Fatgezim “Zim” Bela | Founder, CTO, Software and Data Systems",
  description:
    "Hands-on technology leadership, software engineering, workflow automation, and scientific data systems by Fatgezim “Zim” Bela.",
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
    eyebrow: "Software · data · automation · scientific computing",
    displayName: identity.name,
    shortName: identity.shortName,
    headline: identity.headline,
    shortHeadline: identity.shortHeadline,
    roleLine: "Founder and CTO · Software and Data Systems",
    summary: identity.summary,
    roles: [
      "Founder and CTO, Create 13 Group",
      "Founder and CTO, NeuroPath LLC",
      "Software and Data Systems Builder",
      "Co-founder and Co-builder, Bela Data Lab products",
    ],
    primaryAction: { href: "/#projects", id: "projects", label: "View featured work" },
    contactAction: { href: "/#contact", id: "contact", label: "Contact" },
  },
  about: {
    heading: "About",
    paragraphs: [
      "I’m a founder and CTO who works directly on product architecture, interfaces, data workflows, and automation. I start with the people and decisions a system needs to support, then turn those requirements into software that can be inspected, tested, and improved.",
      "I lead technology at Create 13 Group and NeuroPath LLC and co-build Bela Data Lab products with Meili Bela. My clinical background, medical education, and neuroscience research inform how I approach data, uncertainty, and complex workflows.",
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
      "Scientific software, browser-local analytics, learning platforms, and automation—each with an inspectable workflow, a clear technical role, and an explicit product status.",
  },
  founderContext: {
    heading: "Building NeuroPath",
    introduction:
      "As Founder and CTO of NeuroPath LLC, I bring behavioral science, healthcare, data, education, and software into practical products.",
    relationships: [
      {
        name: "Create 13 Group",
        relationship: "Technology leadership and product engineering",
        role: "Founder and CTO",
      },
      {
        name: "NeuroPath",
        relationship: "Behavioral-health technology company",
        role: "Founder and CTO, NeuroPath LLC",
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
      "Let’s discuss software engineering, data systems, scientific computing, technical leadership, or a product with a complex workflow to solve.",
    links: publicLinks.map((link) => ({ ...link, kind: link.href.includes("linkedin") ? "linkedin" as const : "github" as const, external: true })),
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
