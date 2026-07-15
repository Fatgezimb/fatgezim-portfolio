import { publicationPolicy } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { PortfolioContactForm } from "./PortfolioContactForm";
import { SafeLink } from "./SafeLink";
import { SectionHeading } from "./SectionHeading";
import styles from "./supporting/Contact.module.css";

export function Contact() {
  const { contact } = siteContent;

  return (
    <section
      className={`content-section section-shell ${styles.section}`}
      data-reveal="scale"
      id="contact"
    >
      <SectionHeading
        eyebrow="Connect / 08"
        title={contact.heading}
        description={contact.introduction}
      />
      <div className={styles.contactStage}>
        <svg
          aria-hidden="true"
          className={styles.convergenceField}
          preserveAspectRatio="none"
          viewBox="0 0 1200 520"
        >
          <path d="M0 72 C312 72 414 260 615 260" pathLength="1" />
          <path d="M0 260 C312 260 414 260 615 260" pathLength="1" />
          <path d="M0 448 C312 448 414 260 615 260" pathLength="1" />
          <path d="M615 260 C820 260 934 146 1200 146" pathLength="1" />
          <path d="M615 260 C820 260 934 376 1200 376" pathLength="1" />
          <circle cx="615" cy="260" r="7" />
        </svg>

        <div className={styles.contactLayout}>
          <PortfolioContactForm />
          <address className={styles.contactLinks}>
            {contact.links.map((link, index) => (
              <SafeLink
                href={link.href}
                key={link.href}
                newTab={link.external}
              >
                <span className={styles.linkIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  {link.external ? "↗" : "→"}
                </span>
              </SafeLink>
            ))}
          </address>
          <aside className={styles.contactBoundary}>
            <span className={styles.boundarySignal} aria-hidden="true" />
            <p className={styles.statusLabel}>Privacy</p>
            <p>{publicationPolicy.privacyStatement}</p>
            <SafeLink className={styles.resumeLink} href="/resume" newTab>
              View print résumé
              <span aria-hidden="true">↗</span>
            </SafeLink>
          </aside>
        </div>
      </div>
    </section>
  );
}
