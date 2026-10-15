import { sitePath } from "@/app/content/paths";
import { SafeLink } from "./SafeLink";
import { SignalSculpture } from "./showcase/SignalSculpture";
import styles from "./showcase/Showcase.module.css";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="top">
      <div className={styles.heroIdentity}>
        <h1 id="hero-title">
          Fatgezim <span>“Zim”</span> Bela
        </h1>
        <p>
          Founder &amp; CTO <span aria-hidden="true">/</span> Engineer &amp;
          builder
        </p>
      </div>
      <div className={styles.heroMain}>
        <div className={styles.heroCopy}>
          <p className={styles.heroThesis}>
            Complex problems.
            <br />
            Thoughtful systems.
            <br />
            <em>Working software.</em>
          </p>
          <p className={styles.heroIntro}>
            I build at the intersection of software, data, and human behavior.
            From scientific tools to the products people use every day.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={sitePath("/#projects")}>
              Explore my work <span aria-hidden="true">↘</span>
            </a>
            <SafeLink className={styles.secondaryAction} href="/resume" newTab>
              Résumé <span aria-hidden="true">↗</span>
            </SafeLink>
          </div>
        </div>
        <SignalSculpture />
      </div>
      <div className={styles.heroFoot}>
        <p>
          Currently building at <strong>Create 13 Group</strong> &amp;{" "}
          <strong>NeuroPath LLC</strong>
        </p>
        <a href={sitePath("/#projects")}>
          Selected work below <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
