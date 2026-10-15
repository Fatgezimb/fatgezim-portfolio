"use client";
import { useState } from "react";
import { sitePath } from "@/app/content/paths";
import {
  gmuNeuronalReconstruction as research,
  researchAssets,
} from "@/app/content/research";
import { SafeLink } from "../SafeLink";
import styles from "./ResearchLightbox.module.css";
const views = [
  {
    name: "Observe",
    title: "Start with the signal.",
    file: "research-fluorescence-original.jpg",
    width: 1418,
    height: 1424,
    alt: "Original fluorescent image of a branching Class 4 neuron from the collaborative George Mason University research poster.",
    caption: "Fluorescently labeled Class 4 neuron before reconstruction.",
    body: "The starting point: fluorescently labeled images of a fruit-fly larval neuron. Making its branching structure readable begins with the image itself.",
    tool: "Microscopy imagery",
  },
  {
    name: "Follow",
    title: "Follow the branches.",
    file: "research-fluorescence-detail.png",
    width: 740,
    height: 700,
    alt: "Unaltered detail of the poster’s original fluorescent neuronal image, showing fine branching structures.",
    caption: "Fluorescence detail from the poster’s original image.",
    body: "Separate the channels, combine their signals, prepare raw files, stitch the images and trace the neuron. Each step carries the evidence into the next.",
    tool: "Fiji/ImageJ → Vaa3D → NeuTube",
  },
  {
    name: "Reconstruct",
    title: "Give the structure a form.",
    file: "research-reconstruction-original.jpg",
    width: 1262,
    height: 1192,
    alt: "Original color-coded vectorized-tree reconstruction of a Class 4 neuron from the research poster.",
    caption: "Color-coded vectorized-tree reconstruction of a Class 4 neuron.",
    body: "The completed vectorized tree makes the neuron’s morphology available for review and comparison. An image becomes a structure we can inspect.",
    tool: "Digital neuronal reconstruction",
  },
];
export function ResearchLightbox() {
  const [selected, setSelected] = useState(0);
  return (
    <section
      className={styles.section}
      id="research"
      aria-labelledby="research-title"
    >
      <div className={styles.inner}>
        <header className={styles.heading} data-reveal="up">
          <div>
            <p className={styles.kicker}>The science behind the curiosity</p>
            <h2 id="research-title">
              First,
              <br />
              <em>look closer.</em>
            </h2>
          </div>
          <p>
            My research work brought me close to the branching structures of
            neurons. The question carries into my software: how do you make
            something complex easier to understand?
          </p>
        </header>
        <div className={styles.lightbox}>
          <div className={styles.imageWell} data-reveal="fade">
            <div className={styles.frameLabel}>
              <span>GMU / COMPUTATIONAL NEUROSCIENCE</span>
              <span>CLASS 4 NEURON</span>
            </div>
            {views.map((view, i) => (
              <figure
                key={view.name}
                hidden={i !== selected}
                className={styles.figure}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sitePath(`/media/${view.file}`)}
                  alt={view.alt}
                  width={view.width}
                  height={view.height}
                  loading="lazy"
                />
                <figcaption>
                  <strong>{view.title}</strong>
                  <span>{view.caption}</span>
                </figcaption>
              </figure>
            ))}
            <div
              className={styles.viewButtons}
              role="group"
              aria-label="Explore the research figures"
            >
              {views.map((view, i) => (
                <button
                  key={view.name}
                  type="button"
                  aria-pressed={i === selected}
                  onClick={() => setSelected(i)}
                >
                  <span aria-hidden="true">0{i + 1}</span>
                  {view.name}
                  <span aria-hidden="true">{i === selected ? "↗" : "→"}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.notes}>
            <div aria-live="polite" aria-atomic="true">
              <p className={styles.stage}>Image → method → reconstruction</p>
              <h3>{views[selected].title}</h3>
              <p>{views[selected].body}</p>
              <span className={styles.tool}>{views[selected].tool}</span>
            </div>
            <div className={styles.source}>
              <p className={styles.kicker}>From the original research poster</p>
              <h4>{research.title}</h4>
              <p>Fatgezim Bela · Sumit Nanda · Giorgio A. Ascoli</p>
              <p>
                {research.institutionalUnit}
                <br />
                George Mason University
              </p>
              <SafeLink href={researchAssets.posterPdf} newTab>
                Inspect the full poster <span aria-hidden="true">↗</span>
              </SafeLink>
              <SafeLink href={`/research/${research.slug}`} newTab>
                Read the research story <span aria-hidden="true">↗</span>
              </SafeLink>
            </div>
          </div>
        </div>
        <div className={styles.bridge}>
          <p>The same instinct, in a different medium.</p>
          <a href="#projects">
            From scientific questions to working software{" "}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
