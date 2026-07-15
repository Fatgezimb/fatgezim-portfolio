import type { Metadata } from "next";
import { PortfolioPage } from "./components/PortfolioPage";
import { siteMeta } from "./content/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fatgezim Bela",
  alternateName: "Zim Bela",
  url: "https://fatgezim-portfolio.fmbela2018.chatgpt.site",
  jobTitle: [
    "Board Certified Behavior Analyst",
    "Medical Student",
    "Data Scientist",
    "Founder",
  ],
  sameAs: [
    "https://github.com/Fatgezimb",
    "https://www.linkedin.com/in/fatgezimzimbela/",
  ],
  knowsAbout: [
    "Applied behavior analysis",
    "Medical education",
    "Data science",
    "Software development",
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
