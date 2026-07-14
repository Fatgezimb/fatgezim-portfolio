import { currentFocus, publicationPolicy } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { NeuralIdentityField } from "./spatial";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section
      aria-labelledby="hero-title"
      className="hero"
      data-reveal="fade"
      data-reveal-exit="recede"
      id="top"
    >
      <div className="hero__content section-shell">
        <div className="hero__copy">
          <p className="eyebrow">
            <span aria-hidden="true">Signal identity / </span>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title">{hero.displayName}</h1>
          <p className="hero__headline">{hero.headline}</p>
          <p className="hero__summary">{hero.summary}</p>

          <div className="hero__actions" aria-label="Primary actions">
            <a className="button button--primary" href={hero.primaryAction.href}>
              {hero.primaryAction.label}
            </a>
            {/* Vinext currently hydrates next/link with a duplicate React instance in dev. */}
            <a className="button button--secondary" href="/resume">
              View print résumé
            </a>
            <a className="text-link" href={hero.contactAction.href}>
              {hero.contactAction.label}
            </a>
          </div>

          <p className="resume-status" role="status">
            <span aria-hidden="true">●</span> {publicationPolicy.resumeDownloadLabel}
          </p>
        </div>

        <aside className="hero__profile hero__instrumentation" aria-label="Current profile summary">
          <div className="panel-label">
            <span>Identity telemetry</span>
            <span>Verified focus</span>
          </div>
          <ul className="profile-facts">
            {currentFocus.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <NeuralIdentityField className="hero__field" />
    </section>
  );
}
