import { publicationPolicy } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const { contact } = siteContent;

  return (
    <section className="content-section section-shell contact-section" id="contact">
      <SectionHeading
        eyebrow="Connect / 08"
        title={contact.heading}
        description={contact.introduction}
      />
      <div className="contact-layout">
        <address className="contact-links">
          {contact.links.map((link) => (
            <a
              href={link.href}
              key={link.href}
              rel={link.external ? "noreferrer" : undefined}
              target={link.external ? "_blank" : undefined}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">{link.external ? "↗" : "→"}</span>
            </a>
          ))}
        </address>
        <div className="contact-boundary">
          <p className="status-label">Public contact boundary</p>
          <p>{publicationPolicy.privacyStatement}</p>
          {/* Vinext currently hydrates next/link with a duplicate React instance in dev. */}
          <a className="text-link" href="/resume">
            Review print résumé
          </a>
        </div>
      </div>
    </section>
  );
}
