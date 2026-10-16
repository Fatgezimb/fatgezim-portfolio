import type { MetadataRoute } from "next";
import { publication } from "./content/publication";

const origin = publication.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: origin,
      lastModified: new Date(publication.updated),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${origin}/work/`,
      lastModified: new Date(publication.updated),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${origin}/resume`,
      lastModified: new Date(publication.updated),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${origin}/research`,
      lastModified: new Date(publication.updated),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${origin}/research/george-mason-neuronal-reconstruction`,
      lastModified: new Date(publication.updated),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
