/* Static Pages assets are pre-optimized and served without an image runtime. */
/* eslint-disable @next/next/no-img-element */
import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";
import { experience, publicLinks } from "@/app/content/resume";
import {
  gmuNeuronalReconstruction as research,
  researchAssets,
} from "@/app/content/research";
import { SafeLink } from "../SafeLink";
import { PortfolioContactForm } from "../PortfolioContactForm";
import { EditorialNav } from "./EditorialNav";
import { WorkGallery } from "./WorkGallery";
import styles from "./EditorialHome.module.css";

const roles = ["founder-practice", "create13-cto", "tmci-data-engineer"].map(
  (id) => experience.find((role) => role.id === id)!,
);
const capabilities = [
  {
    title: "Software engineering",
    detail: "From a workflow to a usable application.",
    items: ["TypeScript", "React", "Python", "APIs", "Testing"],
    href: sitePath("/work/"),
    link: "Explore the applications",
  },
  {
    title: "Data & scientific computing",
    detail: "From source data to something you can inspect.",
    items: ["SQL", "Data pipelines", "Visualization", "Statistical analysis"],
    href: "#research",
    link: "See the research",
  },
  {
    title: "Product & technical leadership",
    detail: "Connecting domain knowledge to product decisions.",
    items: [
      "System design",
      "Technical strategy",
      "Workflow design",
      "Product development",
    ],
    href: "#experience",
    link: "Read my experience",
  },
];

export function EditorialHome() {
  return (
    <div id="top" className={styles.page}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <EditorialNav home />
      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="intro-title">
          <div className={styles.portrait}>
            <img
              src={sitePath("/media/editorial/founder-portrait.webp")}
              width="1536"
              height="1024"
              fetchPriority="high"
              alt="Portrait of Fatgezim ‘Zim’ Bela at a desk."
            />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Founder & CTO · Software & data</p>
            <h1 id="intro-title">
              Zim Bela<span>.</span>
            </h1>
            <p className={styles.heroHeadline}>
              Turning complex
              <br className={styles.desktopBreak} /> questions into
              <br className={styles.desktopBreak} /> useful tools.
            </p>
            <p className={styles.heroSummary}>
              I build software, data systems, and scientific tools—bringing a
              background in neuroscience and healthcare to the way I solve
              problems.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={sitePath("/work/")}>
                View my work <span aria-hidden="true">→</span>
              </a>
              <a
                className={styles.secondaryButton}
                href={sitePath(publication.pdf)}
                download
              >
                Download résumé <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.heroFoot}>
              <span />
              Science. Software. Something useful.
            </p>
          </div>
        </section>
        <WorkGallery />
        <section
          className={styles.research}
          id="research"
          aria-labelledby="research-heading"
        >
          <div className={styles.researchCopy}>
            <p className={styles.eyebrow}>Research · George Mason University</p>
            <h2 id="research-heading">
              Before the software,
              <br />
              <em>the science.</em>
            </h2>
            <p>
              I studied neuroscience to understand how the brain works. In
              collaborative research at George Mason, that meant following the
              structure of a neuron—from fluorescent imagery to a digital
              reconstruction.
            </p>
            <p className={styles.method}>
              Fiji / ImageJ <span>→</span> Vaa3D <span>→</span> NeuTube
            </p>
            <SafeLink
              className={styles.textLink}
              href={`/research/${research.slug}`}
            >
              Explore the research <span aria-hidden="true">→</span>
            </SafeLink>
          </div>
          <div className={styles.researchEvidence}>
            <div className={styles.researchFigures}>
              <figure>
                <img
                  src={sitePath("/media/research-fluorescence-original.jpg")}
                  width="1418"
                  height="1424"
                  loading="lazy"
                  alt="Fluorescently labeled Class 4 neuron from the original collaborative research poster."
                />
                <figcaption>
                  <span>01</span> Fluorescent imagery
                </figcaption>
              </figure>
              <figure>
                <img
                  src={sitePath("/media/research-reconstruction-original.jpg")}
                  width="1262"
                  height="1192"
                  loading="lazy"
                  alt="Color-coded vectorized-tree reconstruction of the Class 4 neuron from the original research poster."
                />
                <figcaption>
                  <span>02</span> Digital reconstruction
                </figcaption>
              </figure>
            </div>
            <div className={styles.researchCredit}>
              <p>{research.title}</p>
              <p>
                {research.authors.join(", ")}
                <br />
                Co-author and contributor · {research.institutionalUnit}
              </p>
              <SafeLink href={researchAssets.posterPdf} newTab>
                Read the original poster ↗
              </SafeLink>
            </div>
          </div>
        </section>
        <div className={styles.backgroundGrid}>
          <section
            className={styles.about}
            id="about"
            aria-labelledby="about-heading"
          >
            <p className={styles.eyebrow}>A connected background</p>
            <h2 id="about-heading">
              I didn’t start
              <br />
              in software.
            </h2>
            <p>
              Neuroscience led me into research, education, and behavioral
              health. Along the way, I became increasingly interested in the
              tools people use to make sense of complex information—and what it
              takes to build better ones.
            </p>
            <p>
              Today, I lead technical direction and build the software myself:
              typed web applications, data workflows, learning platforms, and
              scientific tools.
            </p>
            <p className={styles.aboutNote}>
              The common thread: understanding the problem well enough to make
              the solution useful.
            </p>
            <SafeLink className={styles.textLink} href="/resume">
              Read my full résumé <span aria-hidden="true">→</span>
            </SafeLink>
          </section>
          <section
            className={styles.experience}
            id="experience"
            aria-labelledby="experience-heading"
          >
            <p className={styles.eyebrow}>Experience</p>
            <h2 id="experience-heading">Leading. Building. Doing.</h2>
            <ol className={styles.timeline}>
              {roles.map((role) => (
                <li key={role.id}>
                  <div className={styles.roleTop}>
                    <h3>{role.organization}</h3>
                    <span>{role.dates}</span>
                  </div>
                  <p className={styles.roleTitle}>{role.title}</p>
                  <p>{role.summary}</p>
                  {role.id === "tmci-data-engineer" && role.highlights.map((highlight) => (
                    <p key={highlight}>{highlight}</p>
                  ))}
                </li>
              ))}
            </ol>
          </section>
        </div>
        <section
          className={styles.skills}
          id="skills"
          aria-labelledby="skills-heading"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>What I work with</p>
            <h2 id="skills-heading">Across the whole problem.</h2>
          </div>
          <div className={styles.capabilities}>
            {capabilities.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.detail}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className={styles.textLink} href={group.href}>
                  {group.link} <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </section>
        <section
          className={styles.education}
          id="education"
          aria-labelledby="education-heading"
        >
          <h2 id="education-heading">Education</h2>
          <div>
            <h3>B.S. in Neuroscience</h3>
            <p>George Mason University · 2017</p>
          </div>
          <div>
            <h3>M.Ed. in Special Education</h3>
            <p>George Mason University · 2020</p>
          </div>
          <div>
            <h3>Doctor of Medicine Candidate</h3>
            <p>Ross University School of Medicine · Expected 2028</p>
          </div>
        </section>
        <section
          className={styles.founder}
          id="founder"
          aria-labelledby="founder-heading"
        >
          <div className={styles.founderBrand}>
            NeuroPath<span>Built by Zim & Meili Bela</span>
          </div>
          <div>
            <p className={styles.eyebrow}>Building together</p>
            <h2 id="founder-heading">
              From clinical questions
              <br />
              to practical products.
            </h2>
            <p>
              Meili and I are BCBAs building tools for behavioral health.
              NeuroPath brings together our products, practical guides, and the
              thinking behind the work.
            </p>
            <SafeLink
              className={styles.textLink}
              href="https://neuropath.blog/"
              newTab
            >
              Visit NeuroPath Blog <span aria-hidden="true">↗</span>
            </SafeLink>
          </div>
        </section>
        <section
          className={styles.contact}
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div>
            <p className={styles.eyebrow}>Let’s talk</p>
            <h2 id="contact-heading">
              Good ideas deserve
              <br />
              <em>good engineering.</em>
            </h2>
            <p>
              Hiring for software, data, or technical product work?
              <br />
              I’d like to hear what you’re building.
            </p>
            <div className={styles.contactLinks}>
              {publicLinks.map((link) => (
                <SafeLink key={link.href} href={link.href} newTab>
                  {link.label} <span aria-hidden="true">↗</span>
                </SafeLink>
              ))}
              <a href={sitePath(publication.pdf)} download>
                Résumé PDF ↓
              </a>
              <a href={sitePath(publication.docx)} download>
                Editable DOCX ↓
              </a>
            </div>
          </div>
          <details className={styles.contactForm}>
            <summary>
              Start a conversation <span aria-hidden="true">↗</span>
            </summary>
            <PortfolioContactForm showHeading={false} />
          </details>
        </section>
      </main>
      <footer className={styles.footer}>
        <a className={styles.wordmark} href="#top">
          <strong>ZIM</strong>
          <span>Fatgezim Bela</span>
        </a>
        <p>Software. Data. Science.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
