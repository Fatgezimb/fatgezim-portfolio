import {
  credentials,
  education,
  experience,
  skillGroups,
} from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { sitePath } from "@/app/content/paths";
import {
  gmuNeuronalReconstruction as research,
  researchAssets,
} from "@/app/content/research";
import { SafeLink } from "../SafeLink";
import { DeferredSoccerVideo } from "../DeferredSoccerVideo";
import { PortfolioContactForm } from "../PortfolioContactForm";
import { ResumeDownloads } from "../ResumeDownloads";
import styles from "./Showcase.module.css";

function Heading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className={styles.sectionTitle}>
      <p className={styles.kicker}>{label}</p>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}
export function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <Heading label="Meet Zim" title="Curiosity tends to spill over." />
      <div className={styles.aboutGrid} data-reveal="up">
        <figure className={styles.portrait}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Fatgezim “Zim” Bela wearing a white coat"
            src={sitePath("/media/fatgezim-bela-headshot.jpg")}
            width="720"
            height="720"
            loading="lazy"
          />
          <figcaption>Fatgezim “Zim” Bela</figcaption>
        </figure>
        <div className={styles.aboutCopy}>
          <p>{siteContent.about.paragraphs[0]}</p>
          <p>{siteContent.about.paragraphs[1]}</p>
          <div className={styles.domainLinks}>
            <a href="#experience">The experience behind the work ↗</a>
            <a href="#education">Education &amp; credentials ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ResearchSection() {
  return (
    <section className={styles.section} id="research">
      <Heading
        label="Research & scientific work"
        title="From images to understanding."
      />
      <div className={styles.researchGrid} data-reveal="up">
        <SafeLink
          className={styles.posterLink}
          href={researchAssets.posterPdf}
          newTab
          aria-label="Open the full computational neuroscience research poster"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Complete Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva research poster"
            src={researchAssets.posterPreview}
            width="1600"
            height="1200"
            loading="lazy"
          />
          <span>
            Inspect the original research poster <b aria-hidden="true">↗</b>
          </span>
        </SafeLink>
        <div className={styles.researchCopy}>
          <p className={styles.kicker}>George Mason University</p>
          <h3>{research.title}</h3>
          <p>{research.summary}</p>
          <ol
            className={styles.methodFlow}
            aria-label="Documented research workflow"
          >
            <li>Process images</li>
            <li>Stitch volumes</li>
            <li>Trace neurons</li>
            <li>Reconstruct</li>
          </ol>
          <p>Fiji/ImageJ · Vaa3D · NeuTube</p>
          <SafeLink
            className={styles.secondaryAction}
            href={`/research/${research.slug}`}
            newTab
          >
            Explore the research <span aria-hidden="true">↗</span>
          </SafeLink>
          <p className={styles.authors}>
            Co-authors: {research.authors.join(", ")}
            <br />
            {research.institutionalUnit}
          </p>
        </div>
      </div>
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section className={styles.section} id="experience">
      <Heading
        label="Experience"
        title="The work behind the workspace."
        description="Technology leadership and the experience that informs how I build."
      />
      <ol className={styles.careerList}>
        {experience.map((item) => (
          <li className={styles.careerItem} key={item.id} data-reveal="up">
            <p className={styles.careerDate}>
              {item.dates ?? "Software & data"}
            </p>
            <div>
              <h3>{item.title}</h3>
              {item.organization && (
                <p className={styles.careerOrg}>{item.organization}</p>
              )}
              <p>{item.summary}</p>
              {item.highlights.length > 0 && (
                <details>
                  <summary>Selected contributions</summary>
                  <ul>
                    {item.highlights.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
const skillEvidence: Record<string, { href: string; label: string }> = {
  "software-product": {
    href: "#project-stepspark",
    label: "Explore StepSpark",
  },
  "data-engineering": {
    href: "#project-bela-behavior-data-lab",
    label: "Explore Bela Behavior Data Lab",
  },
  leadership: { href: "#founder", label: "See ventures and roles" },
  "research-methods": { href: "#research", label: "Inspect the research" },
  "behavioral-science": {
    href: "#project-caregiver-academy",
    label: "Explore Caregiver Academy",
  },
};
export function SkillsSection() {
  return (
    <section className={styles.section} id="skills">
      <Heading label="Capabilities" title="Tools I put to work." />
      <div className={styles.skillRows}>
        {skillGroups.map((group) => (
          <article className={styles.skillRow} key={group.id} data-reveal="up">
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <a href={skillEvidence[group.id].href}>
              {skillEvidence[group.id].label} ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FounderSection() {
  return (
    <section className={styles.section} id="founder">
      <Heading
        label="Founder & builder"
        title="Building with a longer view."
        description="The organizations and collaborations where the work takes shape."
      />
      <div className={styles.ventureGrid}>
        {siteContent.founderContext.relationships.map((item) => (
          <article className={styles.venture} key={item.name} data-reveal="up">
            <h3>{item.name}</h3>
            <p>{item.relationship}</p>
            <p className={styles.ventureRole}>{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function EducationSection() {
  return (
    <section className={styles.section} id="education">
      <Heading label="Education" title="A cross-disciplinary foundation." />
      <div className={styles.educationGrid}>
        <ol className={styles.educationList}>
          {education.map((item) => (
            <li key={item.id}>
              <div>
                <h3>{item.credential}</h3>
                <p>{item.institution}</p>
                {item.status && <p>{item.status}</p>}
              </div>
              <time>{item.date}</time>
            </li>
          ))}
        </ol>
        <aside className={styles.credentials}>
          <h3>Professional credentials</h3>
          <ul>
            {credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
      <article
        className={styles.personal}
        aria-labelledby="beyond-work-title"
        data-reveal="up"
      >
        <div>
          <p className={styles.kicker}>Beyond the work</p>
          <h3 id="beyond-work-title">A moment worth keeping.</h3>
          <p>
            The winning penalty for Vicious and Delicious, captured by Mason
            Intramurals on May 1, 2016.
          </p>
          <details id="soccer-video-transcript">
            <summary>Read the video description</summary>
            <p>
              Zim approaches a penalty kick and strikes toward goal. The clip
              follows players moving across the field after the deciding kick.
              The Mason Intramurals post identifies Zim, Vicious and Delicious,
              and the winning penalty. The clip has no audio.
            </p>
          </details>
        </div>
        <figure>
          <DeferredSoccerVideo />
          <figcaption>Mason Intramurals · May 2016</figcaption>
        </figure>
      </article>
    </section>
  );
}
export function ContactSection() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactGrid}>
        <div className={styles.contactIntro}>
          <p className={styles.kicker}>Contact</p>
          <h2>
            Something complex
            <br />
            in mind?
          </h2>
          <p>
            Let’s talk about software, data, scientific tools, or a product that
            needs thoughtful engineering.
          </p>
          <address className={styles.socialLinks}>
            {siteContent.contact.links.map((link) => (
              <SafeLink href={link.href} newTab key={link.href}>
                {link.kind === "github" ? "GitHub" : "LinkedIn"} ↗
              </SafeLink>
            ))}
          </address>
          <div className={styles.downloads}>
            <p>THE FULL BACKGROUND</p>
            <ResumeDownloads />
            <SafeLink className={styles.secondaryAction} href="/resume" newTab>
              View résumé ↗
            </SafeLink>
          </div>
        </div>
        <PortfolioContactForm />
      </div>
    </section>
  );
}
