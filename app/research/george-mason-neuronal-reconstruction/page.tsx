/* eslint-disable @next/next/no-html-link-for-pages -- This Vinext app uses ordinary anchors to avoid its current next/link hydration conflict. */
import type { Metadata } from "next";
import {
  gmuNeuronalReconstruction,
  proposedResearchDirections,
  reconstructionWorkflow,
  researchAssets,
} from "@/app/content/research";
import {
  EvidenceStatus,
  PosterViewer,
  ReconstructionWorkflow,
  ResearchPageShell,
} from "@/app/components/research-ui";
import { SafeLink } from "@/app/components/SafeLink";
import styles from "../ResearchPage.module.css";

export const metadata: Metadata = {
  title: "Computational Neuroscience and Neuronal Reconstruction",
  description:
    "A verified George Mason research poster documenting collaborative image processing, neuron tracing, and digital Class 4 neuronal reconstruction.",
  alternates: {
    canonical: "/research/george-mason-neuronal-reconstruction",
  },
  openGraph: {
    title:
      "Computational Neuroscience and Neuronal Reconstruction | Fatgezim “Zim” Bela",
    description:
      "Original poster, readable summary, and documented Fiji/ImageJ, Vaa3D, and NeuTube reconstruction workflow.",
    url: "/research/george-mason-neuronal-reconstruction",
    images: ["/og.png"],
  },
};

export default function GeorgeMasonNeuronalReconstructionPage() {
  return (
    <ResearchPageShell className={styles.page}>
      <section
        className={`section-shell ${styles.hero} ${styles.detailHero}`}
      >
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <a href="/">Portfolio</a>
          <span aria-hidden="true">/</span>
          <a href="/research">Research</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Neuronal reconstruction</span>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <EvidenceStatus>{gmuNeuronalReconstruction.verificationStatus}</EvidenceStatus>
            <h1>{gmuNeuronalReconstruction.title}</h1>
            <p className={styles.lede}>{gmuNeuronalReconstruction.summary}</p>
            <PosterViewer
              pdfHref={researchAssets.posterPdf}
              previewHref={researchAssets.posterPreview}
              title={gmuNeuronalReconstruction.title}
            />
          </div>

          <aside className={styles.heroPanel} aria-label="Project facts">
            <p>Project record</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{gmuNeuronalReconstruction.role}</dd>
              </div>
              <div>
                <dt>Co-authors</dt>
                <dd>{gmuNeuronalReconstruction.authors.join(" · ")}</dd>
              </div>
              <div>
                <dt>Institution</dt>
                <dd>{gmuNeuronalReconstruction.institution}</dd>
              </div>
              <div>
                <dt>Center</dt>
                <dd>{gmuNeuronalReconstruction.institutionalUnit}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <div className={`section-shell ${styles.detailSectionStack}`}>
        <section aria-labelledby="poster-summary-heading" className={styles.posterFeature}>
          <figure className={styles.posterFrame}>
            {/* Vinext serves committed public assets directly; next/image optimization is unavailable in this deployment path. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Preview of the original collaborative research poster, with microscopy imagery, processing stages, and a color-coded neuronal reconstruction."
              height="1200"
              src={researchAssets.posterPreview}
              width="1600"
            />
          </figure>

          <div className={styles.summaryContent}>
            <header>
              <p className={styles.sectionEyebrow}>Accessible poster summary</p>
              <h2 id="poster-summary-heading">What the poster documents</h2>
            </header>
            <p className={styles.supportingText}>
              The poster describes a collaborative workflow for turning overlapping,
              fluorescently labeled neuronal images into a continuous digital
              reconstruction. Zim is named as a co-author alongside Sumit Nanda and
              Giorgio A. Ascoli.
            </p>
            <dl className={styles.factGrid}>
              <div>
                <dt>Starting material</dt>
                <dd>Fluorescently labeled Drosophila larval Class 4 neuron imagery</dd>
              </div>
              <div>
                <dt>Image processing</dt>
                <dd>Channel splitting and signal combination in Fiji/ImageJ</dd>
              </div>
              <div>
                <dt>Volume preparation</dt>
                <dd>Raw-format preparation and image stitching in Vaa3D</dd>
              </div>
              <div>
                <dt>Reconstruction</dt>
                <dd>NeuTube tracing and a color-coded vectorized tree</dd>
              </div>
            </dl>
            <p className={styles.boundaryNote}>
              {gmuNeuronalReconstruction.evidenceBoundary}
            </p>
            <p className={styles.boundaryNote}>
              {gmuNeuronalReconstruction.archivalNote}
            </p>
          </div>
        </section>

        <ReconstructionWorkflow stages={reconstructionWorkflow} />

        <section aria-labelledby="documented-output-heading" className={styles.twoColumnGrid}>
          <article className={styles.outputCard}>
            <p className={styles.sectionEyebrow}>Documented output</p>
            <h2 id="documented-output-heading">Class 4 neuronal reconstruction</h2>
            <p>{gmuNeuronalReconstruction.documentedOutput}</p>
            <ul className={styles.plainList}>
              <li>Fluorescently labeled neuron shown before reconstruction</li>
              <li>Stitched and traced neuronal structure</li>
              <li>Completed color-coded vectorized-tree representation</li>
            </ul>
          </article>

          <article className={styles.summaryCard}>
            <p className={styles.sectionEyebrow}>Methods and software</p>
            <h2>Tools named in the poster</h2>
            <ul className={styles.methodList}>
              {gmuNeuronalReconstruction.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </article>
        </section>

        <section aria-labelledby="proposed-directions-heading">
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Proposed directions</p>
              <h2 id="proposed-directions-heading">
                Questions identified for later investigation
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              The original poster frames these as future research ideas. They are
              presented here as proposals rather than completed experiments.
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
      </div>

      <section className={`section-shell ${styles.closingSection}`}>
        <h2>Continue through the research record</h2>
        <p>
          Return to the research hub for the source ledger and carefully labeled
          medical-education research context.
        </p>
        <div className={styles.inlineActions}>
          <a className={styles.primaryLink} href="/research">
            Back to research
          </a>
          <SafeLink className={styles.secondaryLink} href="/#contact" newTab>
            Contact Zim
          </SafeLink>
        </div>
      </section>
    </ResearchPageShell>
  );
}
