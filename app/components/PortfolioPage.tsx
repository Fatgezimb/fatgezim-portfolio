import { FeaturedProjects } from "./FeaturedProjects";
import { Hero } from "./Hero";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { DocumentRevealRegistry, InitialHashAlignment } from "./motion";
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  FounderSection,
  ResearchSection,
  SkillsSection,
} from "./showcase/PortfolioSections";
export function PortfolioPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <DocumentRevealRegistry />
      <InitialHashAlignment />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <FeaturedProjects />
        <ResearchSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <FounderSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
