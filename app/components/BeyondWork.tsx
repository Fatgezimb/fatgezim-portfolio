import styles from "./BeyondWork.module.css";
import { DeferredSoccerVideo } from "./DeferredSoccerVideo";

export function BeyondWork() {
  return (
    <article
      aria-labelledby="beyond-work-title"
      className={styles.feature}
      data-reveal="up"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Beyond the work</p>
        <h3 id="beyond-work-title">The winning penalty</h3>
        <p className={styles.lead}>
          A Mason Intramurals post from May 1, 2016, captured me converting the
          winning penalty for Vicious and Delicious.
        </p>
        <p>
          That moment reflects how I approach difficult work: prepare carefully, stay
          composed, and finish.
        </p>

        <dl className={styles.facts}>
          <div>
            <dt>Source</dt>
            <dd>Mason Intramurals</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>May 1, 2016</dd>
          </div>
        </dl>

        <details className={styles.transcript} id="soccer-video-transcript">
          <summary>Read the video description</summary>
          <p>
            The screen recording opens on a Mason Intramurals post. On an outdoor
            field, Zim approaches a penalty kick and strikes toward goal. The clip then
            follows players moving across the field after the deciding kick. The post
            identifies Zim, Vicious and Delicious, and the winning penalty. No audible
            speech, music, or field sound is present in the clip.
          </p>
        </details>
      </div>

      <figure className={styles.media}>
        <div className={styles.videoFrame}>
          <DeferredSoccerVideo />
        </div>
        <figcaption>
          Winning penalty captured by Mason Intramurals, May 2016.
        </figcaption>
      </figure>
    </article>
  );
}
