import { currentFocus, publicationPolicy } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">{hero.eyebrow}</p>
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

      <aside className="hero__profile" aria-label="Current profile summary">
        <div className="panel-label">
          <span>Profile map</span>
          <span>Static Phase 1 view</span>
        </div>
        <div className="profile-core">
          <span className="profile-core__initials" aria-hidden="true">
            ZB
          </span>
          <div>
            <p>Current intersection</p>
            <strong>Clinical practice × technical product building</strong>
          </div>
        </div>
        <ul className="profile-facts">
          {currentFocus.map((item, index) => (
            <li key={item}>
              <span aria-hidden="true">0{index + 1}</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="placeholder-note">
          Future spatial visual reserved for Phase 2. The information remains fully
          readable without it.
        </p>
      </aside>
    </section>
  );
}
