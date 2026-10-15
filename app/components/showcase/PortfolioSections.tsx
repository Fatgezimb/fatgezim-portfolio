import { credentials, education, experience } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { sitePath } from "@/app/content/paths";
import { SafeLink } from "../SafeLink";
import { DeferredSoccerVideo } from "../DeferredSoccerVideo";
import { PortfolioContactForm } from "../PortfolioContactForm";
import { ResumeDownloads } from "../ResumeDownloads";
import { ResearchLightbox } from "../chapters/ResearchLightbox";
import { SkillsAtWork } from "../chapters/SkillsAtWork";
import styles from "../chapters/Chapters.module.css";

export function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutTop}>
        <p className={styles.kicker}>Meet the person at the desk</p>
        <span>Scientist’s curiosity. Builder’s instincts.</span>
      </div>
      <div className={styles.aboutGrid}>
        <div className={styles.portraitComposition} data-reveal="up">
          <span className={styles.marginNote}>Always another question.</span>
          <figure className={styles.portrait}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Fatgezim “Zim” Bela wearing a white coat"
              src={sitePath("/media/fatgezim-bela-headshot.jpg")}
              width="720"
              height="720"
              loading="lazy"
            />
            <figcaption>
              <strong>Fatgezim “Zim” Bela</strong>
              <span>Founder · engineer · lifelong student</span>
            </figcaption>
          </figure>
          <span className={styles.portraitMark} aria-hidden="true">
            ↗
          </span>
        </div>
        <div className={styles.aboutCopy} data-reveal="up">
          <h2>
            A question rarely
            <br />
            stays in <em>one field.</em>
          </h2>
          <p>
            I like the moment when a complicated problem starts to make sense.
            Sometimes that means tracing a neuron. Sometimes it means untangling
            an export or getting a stubborn interface to behave.
          </p>
          <p>
            My work moves between software, data and behavioral science. I’m a
            Founder and CTO, a BCBA and a medical student—and I’m most at home
            connecting what I learn to something I can build.
          </p>
          <nav className={styles.storyRoutes} aria-label="Follow the story">
            <a href="#research">
              <span>How I investigate</span>Follow the science{" "}
              <b aria-hidden="true">↓</b>
            </a>
            <a href="#projects">
              <span>What I build</span>Try the products{" "}
              <b aria-hidden="true">↓</b>
            </a>
            <a href="#design">
              <span>What I explore</span>Enter the studio{" "}
              <b aria-hidden="true">↓</b>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
export function ResearchSection() {
  return <ResearchLightbox />;
}
export function FounderSection() {
  return (
    <section className={styles.founder} id="founder">
      <header className={styles.professionalHeader}>
        <div>
          <p className={styles.kicker}>
            The work, and the responsibility behind it
          </p>
          <h2>Where I put it to work.</h2>
        </div>
        <p>
          I work directly on architecture, interfaces, data and automation.
          These are the organizations and collaborations where that work takes
          shape.
        </p>
      </header>
      <div className={styles.currentRoles}>
        {experience
          .filter((e) => ["create13-cto", "founder-practice"].includes(e.id))
          .map((item, i) => (
            <article
              key={item.id}
              className={styles.currentRole}
              data-reveal="up"
            >
              <div className={styles.roleTop}>
                <span className={styles.roleSymbol} aria-hidden="true">
                  {i === 0 ? "C13" : "N"}
                </span>
                <p>{item.dates}</p>
              </div>
              <h3>{item.organization}</h3>
              <p className={styles.roleTitle}>{item.title}</p>
              <p>{item.summary}</p>
              <details>
                <summary>
                  Inside the role <span aria-hidden="true">+</span>
                </summary>
                <ul>
                  {item.highlights.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
      </div>
      <div className={styles.collaboration}>
        <div>
          <p className={styles.kicker}>Built together</p>
          <h3>Bela Data Lab</h3>
          <p>Co-founder and Co-builder with Meili Bela</p>
        </div>
        <p>
          Data and learning products, including Caregiver Academy, where I
          contribute as co-founder, product builder and BCBA.
        </p>
        <div>
          <a href="#project-bela-behavior-data-lab">
            Explore the data workspace <span aria-hidden="true">↗</span>
          </a>
          <a href="#project-caregiver-academy">
            Open Caregiver Academy <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section className={styles.experience} id="experience">
      <div className={styles.minorHeading}>
        <h2>Experience in practice.</h2>
        <SafeLink href="/resume" newTab>
          Read the full résumé ↗
        </SafeLink>
      </div>
      <div className={styles.careerList}>
        {experience
          .filter((e) => !["create13-cto", "founder-practice"].includes(e.id))
          .map((item) => (
            <details className={styles.careerItem} key={item.id}>
              <summary>
                <span className={styles.careerDate}>
                  {item.dates ?? "Software & data"}
                </span>
                <span>
                  <strong>{item.title}</strong>
                  {item.organization && <small>{item.organization}</small>}
                </span>
                <b aria-hidden="true">+</b>
              </summary>
              <div className={styles.careerBody}>
                <p>{item.summary}</p>
                {item.highlights.length > 0 && (
                  <ul>
                    {item.highlights.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
      </div>
    </section>
  );
}
export function SkillsSection() {
  return <SkillsAtWork />;
}
export function EducationSection() {
  return (
    <section id="education" className={styles.education}>
      <div className={styles.educationHeading}>
        <p className={styles.kicker}>An ongoing education</p>
        <h2>Still learning.</h2>
        <p>
          My studies span neuroscience, behavioral science and medicine. Medical
          education keeps widening the questions.
        </p>
        <details className={styles.credentials}>
          <summary>
            Professional credentials <span aria-hidden="true">+</span>
          </summary>
          <ul>
            {credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </div>
      <div className={styles.notebook} data-reveal="up">
        <div className={styles.notebookTop}>
          <span>FIELD NOTES</span>
          <span>Learning / continuing</span>
        </div>
        <ol>
          {[...education].reverse().map((item, i) => (
            <li key={item.id}>
              <span className={styles.year}>{item.date}</span>
              <div>
                <h3>{item.credential}</h3>
                <p>{item.institution}</p>
                {item.status && <p>{item.status}</p>}
              </div>
              <span className={styles.studyMark} aria-hidden="true">
                {i === 3 ? "○" : "•"}
              </span>
            </li>
          ))}
        </ol>
        <div className={styles.notebookFoot}>More to learn. More to make.</div>
      </div>
      <article className={styles.personal} aria-labelledby="beyond-work-title">
        <div>
          <p className={styles.kicker}>Away from the desk</p>
          <h3 id="beyond-work-title">
            A different
            <br />
            kind of <em>focus.</em>
          </h3>
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
          <figcaption>
            <span>MASON INTRAMURALS</span>
            <span>01 MAY 2016</span>
          </figcaption>
        </figure>
      </article>
    </section>
  );
}
export function ContactSection() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactTop}>
        <p className={styles.kicker}>A place for the next idea</p>
        <a href="#workspace">
          Back to the desk <span aria-hidden="true">↑</span>
        </a>
      </div>
      <h2>
        What are you
        <br />
        <em>working on?</em>
        <span aria-hidden="true">↗</span>
      </h2>
      <div className={styles.contactGrid}>
        <div className={styles.contactIntro}>
          <p>
            Software, data, scientific tools, or a complicated workflow you’d
            like to make simpler. I’d like to hear about it.
          </p>
          <address className={styles.socialLinks}>
            {siteContent.contact.links.map((link) => (
              <SafeLink href={link.href} newTab key={link.href}>
                {link.kind === "github" ? "GitHub" : "LinkedIn"} ↗
              </SafeLink>
            ))}
          </address>
          <div className={styles.downloads}>
            <p>Take the full background with you.</p>
            <ResumeDownloads />
            <SafeLink href="/resume" newTab>
              View résumé ↗
            </SafeLink>
          </div>
        </div>
        <div className={styles.letter}>
          <span className={styles.letterMark} aria-hidden="true">
            ZB
          </span>
          <PortfolioContactForm />
        </div>
      </div>
    </section>
  );
}
