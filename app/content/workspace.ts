export type DomainId =
  | "neuroscience"
  | "software"
  | "data"
  | "medicine"
  | "design";
export const workspaceDomains = [
  {
    id: "neuroscience",
    name: "Neuroscience",
    object: "The branching neuron",
    color: "#9eddc7",
    headline: "It starts with a question.",
    story:
      "How does something complex become understandable? My neuroscience work took that question from microscopy images to three-dimensional neuron reconstructions. It still shapes how I approach a new problem.",
    skills: [
      "Computational neuroscience",
      "Image analysis",
      "Scientific computing",
    ],
    links: [
      {
        label: "Inspect neural recordings",
        href: "#project-neurostack-explorer",
      },
      {
        label: "Explore the reconstruction research",
        href: "/research/george-mason-neuronal-reconstruction",
      },
    ],
  },
  {
    id: "software",
    name: "Software",
    object: "The small workstation",
    color: "#ac9af0",
    headline: "Then I build something you can use.",
    story:
      "I work across the interface, application logic and data underneath. As a founder and CTO, I stay close to the details: how a feature behaves, what happens when an input is wrong, and whether the whole workflow makes sense.",
    skills: [
      "TypeScript / React",
      "Application architecture",
      "Testing and delivery",
    ],
    links: [
      { label: "Try RBT Practice Hub", href: "#project-rbt-practice-hub" },
      {
        label: "Explore a review-first automation",
        href: "#project-rethink-automations",
      },
    ],
  },
  {
    id: "data",
    name: "Data",
    object: "The data sculpture",
    color: "#dfb65b",
    headline: "Make the important parts visible.",
    story:
      "An export is only a starting point. I build tools that connect messy records to filters, comparisons and decisions people can inspect. The useful question is often simple: what needs attention, and what evidence is behind it?",
    skills: ["Python / SQL", "Data engineering", "Interactive analytics"],
    links: [
      {
        label: "Use Behavior Data Lab",
        href: "#project-bela-behavior-data-lab",
      },
      {
        label: "Inspect the analysis prototype",
        href: "#project-neuropath-insight",
      },
    ],
  },
  {
    id: "medicine",
    name: "Medicine",
    object: "The open field notebook",
    color: "#e79b8a",
    headline: "Keep the person in the picture.",
    story:
      "Medical education and behavioral science bring a different set of questions to technology: what does this person need to understand, what is uncertain, and where should a tool stop? That perspective informs the learning products I build.",
    skills: [
      "Medical education",
      "Behavioral science",
      "Learning product design",
    ],
    links: [
      {
        label: "Explore visual recall in StepSpark",
        href: "#project-stepspark",
      },
      {
        label: "Try a caregiver learning path",
        href: "#project-caregiver-academy",
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    object: "The folded form",
    color: "#8ea7de",
    headline: "Leave room to experiment.",
    story:
      "I’m developing my Blender and 3D modeling skills alongside interface and product work. Working with shape, light and motion gives me another way to explore an idea—and another reason to keep making things.",
    skills: ["Interface design", "Blender exploration", "3D / motion studies"],
    links: [
      { label: "See how I approach a build", href: "#process" },
      { label: "Explore selected projects", href: "#projects" },
    ],
  },
] as const;
export function domainById(id: DomainId) {
  return workspaceDomains.find((domain) => domain.id === id)!;
}
