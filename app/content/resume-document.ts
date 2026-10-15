import { credentials, education, experience, identity, publicLinks, skillGroups } from "./resume";
import { featuredProjects } from "./projects";
import { publication } from "./publication";
import { researchItems } from "./research";

const ids = ["neurostack-explorer", "bela-behavior-data-lab", "rbt-practice-hub", "stepspark"];

// Compact document selection. Facts and active destinations come from the same records as the site.
export const resumeDocument = {
  identity,
  contact: [
    { label: identity.email, href: `mailto:${identity.email}` },
    ...publicLinks,
    { label: "Portfolio", href: publication.url },
  ],
  experience: experience.filter((item) => ["create13-cto", "founder-practice", "tmci-data-engineer", "bcba-practice"].includes(item.id)),
  skills: skillGroups,
  projects: [
    ...ids.map((id) => {
      const project = featuredProjects.find((item) => item.id === id)!;
      return {
        id: project.id,
        name: project.verifiedPublicName,
        role: project.role,
        summary: project.summary,
        stack: project.methods.join(", "),
        status: project.status,
        links: project.evidenceLinks.map((href) => ({ href, label: href.includes("github.com") ? "Public source" : "Live application" })),
      };
    }),
    {
      id: "clinical-assessment-portal",
      name: "Clinical Assessment Portal",
      role: "Product Builder and Developer",
      summary: "Implemented practice-scoped assessment workflows with ownership and edit permissions, version checks, clinician review and signatures, and server-generated PDF/DOCX reports.",
      stack: "React, TypeScript, Express, Firebase Auth, Firestore, Zod, PDFKit, docx, Vitest",
      status: "Private implementation; locally tested with synthetic records",
      links: [],
    },
    {
      id: "usmle-sprint",
      name: "USMLE Sprint",
      role: "Product Builder and Developer",
      summary: "Built a study workspace with progress dashboards, daily planning, question-session controls, review history, and import/export workflows using JavaScript and browser persistence.",
      stack: "HTML, CSS, JavaScript, localStorage, progress API integration",
      status: "Account-gated learning application; local implementation inspected",
      links: [],
    },
  ],
  education,
  credentials,
  research: researchItems.map((item) => ({ title: item.title, institution: item.institution, summary: item.summary, methods: item.methods })),
} as const;
