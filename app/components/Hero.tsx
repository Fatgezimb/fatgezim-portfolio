import { currentFocus, publicationPolicy } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { SafeLink } from "./SafeLink";
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
            <SafeLink className="button button--secondary" href="/resume" newTab>
              View print résumé
            </SafeLink>
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
          <figure className="hero__portrait">
            <div className="hero__portrait-frame">
              {/* The optimized static derivative is intentionally served directly by Vinext. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Fatgezim “Zim” Bela wearing a white coat"
                decoding="async"
                fetchPriority="high"
                height="720"
                src="/media/fatgezim-bela-headshot.jpg"
                width="720"
              />
            </div>
            <figcaption>BCBA · medical student · product builder</figcaption>
          </figure>
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
