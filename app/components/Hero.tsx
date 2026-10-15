import { sitePath } from "@/app/content/paths";
import { currentFocus } from "@/app/content/resume";
import { siteContent } from "@/app/content/site";
import { SafeLink } from "./SafeLink";
import { NeuralIdentityField } from "./spatial";
import { ResumeDownloads } from "./ResumeDownloads";

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
            {hero.eyebrow}
          </p>
          <h1 id="hero-title">{hero.displayName}</h1>
          <p className="hero__headline">{hero.headline}</p>
          <p className="hero__summary">{hero.summary}</p>

          <div className="hero__actions" aria-label="Primary actions">
            <a className="button button--primary" href={sitePath(hero.primaryAction.href)}>
              {hero.primaryAction.label}
            </a>
            <SafeLink className="button button--secondary" href={sitePath("/resume")}  newTab>
              View résumé
            </SafeLink>
            <ResumeDownloads />
            <a className="text-link" href={sitePath(hero.contactAction.href)}>
              {hero.contactAction.label}
            </a>
          </div>

        </div>

        <aside className="hero__profile hero__instrumentation" aria-label="Current profile summary">
          <div className="panel-label">
            <span>At a glance</span>
            <span>Current work</span>
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
                src={sitePath("/media/fatgezim-bela-headshot.jpg")}
                width="720"
              />
            </div>
            <figcaption>Founder and CTO · software and data systems</figcaption>
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
