import { About } from "./About";
import { Contact } from "./Contact";
import { EducationCredentials } from "./EducationCredentials";
import { Experience } from "./Experience";
import { FeaturedProjects } from "./FeaturedProjects";
import { FounderContext } from "./FounderContext";
import { Hero } from "./Hero";
import { Research } from "./Research";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { Skills } from "./Skills";
import { DocumentRevealRegistry, InitialHashAlignment } from "./motion";

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
        <About />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <Research />
        <FounderContext />
        <EducationCredentials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
