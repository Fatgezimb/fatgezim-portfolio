import type { Metadata } from "next";
import { PortfolioPage } from "./components/PortfolioPage";
import { siteMeta } from "./content/site";
import { identity, publicLinks } from "./content/resume";
import { publication } from "./content/publication";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  alternateName: identity.shortName,
  url: publication.url,
  jobTitle: [
    "Founder and Chief Technology Officer",
    "Software and Data Systems Builder",
  ],
  sameAs: publicLinks.map((link) => link.href),
  knowsAbout: [
    "Applied behavior analysis",
    "Medical education",
    "Data science",
    "Software development",
    "Workflow automation",
    "Scientific computing",
    "Behavioral health technology",
  ],
};

export const metadata: Metadata = {
  title: { absolute: siteMeta.title },
  description: siteMeta.description,
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <PortfolioPage />
    </>
  );
}
