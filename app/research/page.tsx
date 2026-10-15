import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";
import type { Metadata } from "next";
import {
  gmuNeuronalReconstruction,
  proposedResearchDirections,
  researchAssets,
} from "@/app/content/research";
import { ResearchPageShell } from "@/app/components/research-ui";
import { SafeLink } from "@/app/components/SafeLink";
import styles from "./ResearchPage.module.css";

export const metadata: Metadata = {
  title: "Research & Scientific Work",
  description:
    "Fatgezim Zim Bela's computational-neuroscience research in image processing, neuron tracing, and digital reconstruction.",
  alternates: { canonical: `${publication.url}research` },
  openGraph: {
    title: "Research & Scientific Work | Fatgezim “Zim” Bela",
    description:
      "A George Mason University research project in image processing, neuron tracing, and digital reconstruction.",
    url: `${publication.url}research`,
    images: [`${publication.url}og.png`],
  },
};

export default function ResearchPage() {
  return (
    <ResearchPageShell className={styles.page}>
      <section className={`section-shell ${styles.hero}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <a href={sitePath("/")} >Portfolio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Research</span>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.sectionEyebrow}>Research experience</p>
            <h1>Research &amp; scientific work</h1>
            <p className={styles.lede}>
              Explore Zim&apos;s collaborative computational-neuroscience work in image
              processing, neuron tracing, and digital reconstruction.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryLink} href="#featured-research">
                Explore featured research
              </a>
              <SafeLink
                className={styles.secondaryLink}
                href={researchAssets.posterPdf}
                newTab
              >
                Open research poster
              </SafeLink>
            </div>
          </div>

          <aside className={styles.heroPanel} aria-label="Project details">
            <p>Project details</p>
            <dl>
              <div>
                <dt>Research project</dt>
                <dd>George Mason neuronal reconstruction</dd>
              </div>
              <div>
                <dt>Methods</dt>
                <dd>Image processing, stitching, tracing, and morphology</dd>
              </div>
              <div>
                <dt>Result</dt>
                <dd>Color-coded vectorized-tree reconstruction</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className={`section-shell ${styles.section}`} id="featured-research">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Featured research</p>
            <h2>From microscopy images to a digital neuron</h2>
          </div>
          <p className={styles.sectionIntro}>
            This collaborative George Mason University project transformed overlapping
            microscopy images into a traced Class 4 neuronal reconstruction.
          </p>
        </header>

        <article className={styles.artifactCard}>
          <figure className={styles.posterPreview}>
            {/* Vinext serves committed public assets directly; next/image optimization is unavailable in this deployment path. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Preview of the Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva research poster."
              height="1200"
              loading="lazy"
              src={researchAssets.posterPreview}
              width="1600"
            />
          </figure>
          <div className={styles.artifactCopy}>
            <div>
              <p className={styles.cardEyebrow}>Research poster</p>
              <h3>{gmuNeuronalReconstruction.title}</h3>
              <p className={styles.authors}>
                <strong>Co-authors:</strong>{" "}
                {gmuNeuronalReconstruction.authors.join(", ")}
              </p>
              <p className={styles.institution}>
                <strong>{gmuNeuronalReconstruction.institutionalUnit}</strong>
                <br />
                {gmuNeuronalReconstruction.institution}
              </p>
            </div>
            <p>{gmuNeuronalReconstruction.summary}</p>
            <ul
              aria-label="Research methods"
              className={styles.methodList}
            >
              {gmuNeuronalReconstruction.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
            <div className={styles.inlineActions}>
              <SafeLink
                className={styles.primaryLink}
                href={`/research/${gmuNeuronalReconstruction.slug}`}
                newTab
              >
                Project details
              </SafeLink>
              <a
                className={styles.secondaryLink}
                download
                href={researchAssets.posterPdf}
              >
                Download poster
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className={`section-shell ${styles.section}`} id="research-experience">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Research experience</p>
            <h2>Collaborative computational neuroscience</h2>
          </div>
          <p className={styles.sectionIntro}>
            Zim contributed to the image-processing and reconstruction workflow and is
            credited as a co-author on the research poster.
          </p>
        </header>

        <div className={styles.cardGrid}>
          <article className={styles.researchCard}>
            <p className={styles.cardEyebrow}>George Mason University</p>
            <h3>{gmuNeuronalReconstruction.publicTitle}</h3>
            <p>{gmuNeuronalReconstruction.documentedOutput}</p>
            <p className={styles.boundaryNote}>
              Zim is credited as a co-author and contributor alongside Sumit Nanda and
              Giorgio A. Ascoli.
            </p>
          </article>
        </div>
      </section>

      <section className={`section-shell ${styles.section}`} id="future-directions">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Proposed directions</p>
            <h2>Questions identified for future research</h2>
          </div>
          <p className={styles.sectionIntro}>
            These ideas appear in the original poster as future directions. They are
            proposals for later investigation.
          </p>
        </header>

        <ul className={styles.futureList}>
          {proposedResearchDirections.map((direction) => (
            <li className={styles.futureCard} key={direction.id}>
              <p className={styles.cardEyebrow}>Proposed</p>
              <h3>{direction.title}</h3>
              <p>{direction.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`section-shell ${styles.closingSection}`}>
        <h2>View the complete neuronal-reconstruction workflow</h2>
        <p>
          See the poster overview, seven-stage workflow, methods, result, and proposed
          directions in one place.
        </p>
        <div className={styles.inlineActions}>
          <SafeLink
            className={styles.primaryLink}
            href={`/research/${gmuNeuronalReconstruction.slug}`}
            newTab
          >
            Project details
          </SafeLink>
          <SafeLink className={styles.secondaryLink} href={sitePath("/#contact")}  newTab>
            Get in touch
          </SafeLink>
        </div>
      </section>
    </ResearchPageShell>
  );
}
