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
        <h3 id="beyond-work-title">A pressure moment, preserved in six seconds</h3>
        <p className={styles.lead}>
          A May 1, 2016 Mason Intramurals post captured Zim converting the winning
          penalty for Vicious and Delicious.
        </p>
        <p>
          It is a small archival moment, but it reflects something that carries into the
          work: prepare carefully, stay composed, and finish the task in front of you.
        </p>

        <dl className={styles.facts}>
          <div>
            <dt>Source</dt>
            <dd>Mason Intramurals</dd>
          </div>
          <div>
            <dt>Captured</dt>
            <dd>May 1, 2016</dd>
          </div>
          <div>
            <dt>Audio</dt>
            <dd>The supplied archival recording is silent</dd>
          </div>
        </dl>

        <details className={styles.transcript} id="soccer-video-transcript">
          <summary>Read the video description</summary>
          <p>
            The screen recording opens on a Mason Intramurals post. On an outdoor
            field, Zim approaches a penalty kick and strikes toward goal. The clip then
            follows players moving across the field after the deciding kick. The post
            identifies Zim, Vicious and Delicious, and the winning penalty. No audible
            speech, music, or field sound is present in the supplied recording.
          </p>
        </details>
      </div>

      <figure className={styles.media}>
        <div className={styles.videoFrame}>
          <DeferredSoccerVideo />
        </div>
        <figcaption>
          Archival screen recording of the original Mason Intramurals post.
        </figcaption>
      </figure>
    </article>
  );
}
