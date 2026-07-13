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

export function PortfolioPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
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
