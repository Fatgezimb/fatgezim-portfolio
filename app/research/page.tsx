/* eslint-disable @next/next/no-html-link-for-pages -- This Vinext app uses ordinary anchors to avoid its current next/link hydration conflict. */
import type { Metadata } from "next";
import { researchEvidence } from "@/app/content/evidence";
import {
  gmuNeuronalReconstruction,
  proposedResearchDirections,
  researchAssets,
  rossMedicalEducationResearch,
} from "@/app/content/research";
import { EvidenceStatus, ResearchPageShell } from "@/app/components/research-ui";
import { SafeLink } from "@/app/components/SafeLink";
import styles from "./ResearchPage.module.css";

export const metadata: Metadata = {
  title: "Research & Scientific Work",
  description:
    "Evidence-backed research by Fatgezim Zim Bela spanning computational neuroscience and owner-confirmed medical-education research proposals.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research & Scientific Work | Fatgezim “Zim” Bela",
    description:
      "Computational-neuroscience research artifacts, documented methods, and carefully labeled medical-education research experience.",
    url: "/research",
    images: ["/og.png"],
  },
};

export default function ResearchPage() {
  return (
    <ResearchPageShell className={styles.page}>
      <section className={`section-shell ${styles.hero}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <a href="/">Portfolio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Research</span>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <EvidenceStatus>Artifact-led research record</EvidenceStatus>
            <h1>Research &amp; scientific work</h1>
            <p className={styles.lede}>
              A source-backed view of Zim&apos;s collaborative computational-neuroscience
              work and owner-confirmed medical-education research experience.
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

          <aside className={styles.heroPanel} aria-label="Research scope">
            <p>Research scope</p>
            <dl>
              <div>
                <dt>Verified artifact</dt>
                <dd>George Mason neuronal-reconstruction poster</dd>
              </div>
              <div>
                <dt>Methods represented</dt>
                <dd>Image processing, stitching, tracing, and morphology</dd>
              </div>
              <div>
                <dt>Additional experience</dt>
                <dd>Medical-education research proposals</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className={`section-shell ${styles.section}`} id="featured-research">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Featured artifact</p>
            <h2>From microscopy images to a digital neuron</h2>
          </div>
          <p className={styles.sectionIntro}>
            The original poster verifies the project title, collaborative authorship,
            institutional center, documented workflow, and Class 4 neuronal
            reconstruction shown here.
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
            <EvidenceStatus>{gmuNeuronalReconstruction.verificationStatus}</EvidenceStatus>
            <div>
              <p className={styles.cardEyebrow}>Collaborative research poster</p>
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
            <p className={styles.boundaryNote}>
              {gmuNeuronalReconstruction.archivalNote}
            </p>
            <ul
              aria-label="Documented research methods"
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
                Explore the project
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

      <section className={`section-shell ${styles.section}`} id="research-record">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Research record</p>
            <h2>Verified work and clearly labeled context</h2>
          </div>
          <p className={styles.sectionIntro}>
            Artifact-backed work and owner-confirmed experience are presented with
            separate status labels so the source of each public statement stays clear.
          </p>
        </header>

        <div className={styles.cardGrid}>
          <article className={styles.researchCard}>
            <EvidenceStatus>{gmuNeuronalReconstruction.verificationStatus}</EvidenceStatus>
            <p className={styles.cardEyebrow}>George Mason University</p>
            <h3>{gmuNeuronalReconstruction.publicTitle}</h3>
            <p>{gmuNeuronalReconstruction.documentedOutput}</p>
            <p className={styles.boundaryNote}>
              Zim is credited as a co-author and contributor alongside Sumit Nanda and
              Giorgio A. Ascoli.
            </p>
          </article>

          <article className={styles.researchCard}>
            <EvidenceStatus pending>{rossMedicalEducationResearch.status}</EvidenceStatus>
            <p className={styles.cardEyebrow}>
              {rossMedicalEducationResearch.institution}
            </p>
            <h3>{rossMedicalEducationResearch.title}</h3>
            <p>{rossMedicalEducationResearch.summary}</p>
            <p className={styles.boundaryNote}>
              {rossMedicalEducationResearch.evidenceBoundary}
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

      <section className={`section-shell ${styles.section}`} id="evidence">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Evidence</p>
            <h2>How each research statement is supported</h2>
          </div>
          <p className={styles.sectionIntro}>
            Public wording follows the strongest available source and identifies when
            supporting documentation is still pending.
          </p>
        </header>

        <div className={styles.sourceList}>
          {researchEvidence.map((record) => (
            <article className={styles.sourceCard} key={record.id}>
              <EvidenceStatus pending={!record.sourceHref}>{record.status}</EvidenceStatus>
              <p className={styles.cardEyebrow}>{record.sourceType}</p>
              <h3>{record.title}</h3>
              <p>{record.publicNote}</p>
              <ul>
                {record.supports.map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
              {record.sourceHref ? (
                <SafeLink
                  className={styles.textLink}
                  href={record.sourceHref}
                  newTab
                >
                  View original source
                </SafeLink>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className={`section-shell ${styles.closingSection}`}>
        <h2>Explore the complete neuronal-reconstruction workflow</h2>
        <p>
          The project page pairs the original artifact with a readable summary, a
          stage-by-stage workflow, and clearly labeled proposed directions.
        </p>
        <div className={styles.inlineActions}>
          <SafeLink
            className={styles.primaryLink}
            href={`/research/${gmuNeuronalReconstruction.slug}`}
            newTab
          >
            Open project page
          </SafeLink>
          <SafeLink className={styles.secondaryLink} href="/#contact" newTab>
            Contact Zim
          </SafeLink>
        </div>
      </section>
    </ResearchPageShell>
  );
}
