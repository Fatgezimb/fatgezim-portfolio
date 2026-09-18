import type { MetadataRoute } from "next";

const origin = "https://fatgezimb.github.io/fatgezim-portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: origin,
      lastModified: new Date("2026-09-18"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${origin}/resume`,
      lastModified: new Date("2026-09-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${origin}/research`,
      lastModified: new Date("2026-09-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${origin}/research/george-mason-neuronal-reconstruction`,
      lastModified: new Date("2026-09-18"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
