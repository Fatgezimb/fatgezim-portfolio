import { publicationPolicy } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
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
          <address className={styles.contactLinks}>
            {contact.links.map((link, index) => (
              <a
                href={link.href}
                key={link.href}
                rel={link.external ? "noreferrer" : undefined}
                target={link.external ? "_blank" : undefined}
              >
                <span className={styles.linkIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  {link.external ? "↗" : "→"}
                </span>
              </a>
            ))}
          </address>
          <aside className={styles.contactBoundary}>
            <span className={styles.boundarySignal} aria-hidden="true" />
            <p className={styles.statusLabel}>Public contact boundary</p>
            <p>{publicationPolicy.privacyStatement}</p>
            {/* Vinext currently hydrates next/link with a duplicate React instance in dev. */}
            <a className={styles.resumeLink} href="/resume">
              Review print résumé
              <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
