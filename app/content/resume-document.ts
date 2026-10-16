import content from "./engineering-resume.json";
import { identity, publicLinks, education } from "./resume";
import { publication } from "./publication";
import { researchItems } from "./research";

// Canonical wording is shared with scripts/build-engineering-resume.py.
export const resumeDocument = {
  identity: {
    ...identity,
    name: content.name,
    headline: content.headline,
    summary: content.summary,
  },
  contact: [
    { label: identity.email, href: `mailto:${identity.email}` },
    ...publicLinks,
    { label: "Portfolio", href: publication.url },
  ],
  experience: content.experience.map((role) => ({
    id: role.organization,
    title: role.title,
    organization: role.organization,
    dates: role.dates,
    summary: role.bullets[0],
    highlights: role.bullets.slice(1),
  })),
  skills: content.skills.map(([title, text]) => ({
    id: title,
    title,
    skills: text.split(", "),
  })),
  projects: content.projects.map((project) => ({
    id: project.name,
    name: project.name,
    role: project.meta,
    summary: project.bullets.join(" "),
    stack: "",
    status: "",
    links: project.link
      ? [{ href: project.link, label: "Engineering case study" }]
      : [],
  })),
  education,
  credentials: content.credentials
    .split(". ")
    .map((sentence) => (sentence.endsWith(".") ? sentence : `${sentence}.`)),
  research: researchItems.map((item) => ({
    title: item.title,
    institution: item.institution,
    summary: item.summary,
    methods: item.methods,
  })),
} as const;
