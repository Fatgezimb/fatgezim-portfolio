import type { MetadataRoute } from "next";

const origin = "https://fatgezim-portfolio.fmbela2018.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
