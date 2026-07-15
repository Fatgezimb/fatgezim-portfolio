"use client";

import { useRef } from "react";
import { SafeLink } from "../SafeLink";
import styles from "./ResearchComponents.module.css";

type PosterViewerProps = {
  pdfHref: string;
  previewHref: string;
  title: string;
};

export function PosterViewer({ pdfHref, previewHref, title }: PosterViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openViewer = () => {
    dialogRef.current?.showModal();
  };

  const closeViewer = () => {
    dialogRef.current?.close();
  };

  const restoreTriggerFocus = () => {
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className={styles.posterActions}>
      <button
        aria-controls="research-poster-dialog"
        aria-haspopup="dialog"
        className={styles.primaryAction}
        onClick={openViewer}
        ref={triggerRef}
        type="button"
      >
        View research poster
      </button>
      <SafeLink href={pdfHref} newTab>
        Open original PDF
      </SafeLink>
      <a download href={pdfHref}>
        Download poster
      </a>

      <dialog
        aria-describedby="poster-viewer-description"
        aria-labelledby="poster-viewer-title"
        className={styles.posterDialog}
        id="research-poster-dialog"
        onClose={restoreTriggerFocus}
        ref={dialogRef}
      >
        <header className={styles.dialogHeader}>
          <div>
            <p>Original research artifact</p>
            <h2 id="poster-viewer-title">{title}</h2>
            <p id="poster-viewer-description">
              Scroll the preview to inspect the poster. A readable HTML summary follows
              the viewer on this page.
            </p>
          </div>
          <button
            aria-label="Close research poster viewer"
            className={styles.closeButton}
            onClick={closeViewer}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div
          aria-label="Scrollable research poster preview"
          className={styles.posterViewport}
          role="region"
          tabIndex={0}
        >
          {/* Vinext serves committed public assets directly; next/image optimization is unavailable in this deployment path. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Research poster titled Computational Neuroscience: Tracing Neurons from the Fruit Fly Larva, showing the collaborative processing and reconstruction workflow for a fluorescently labeled Class 4 neuron."
            className={styles.posterImage}
            height="1200"
            src={previewHref}
            width="1600"
          />
        </div>

        <footer className={styles.dialogFooter}>
          <SafeLink href={pdfHref} newTab>
            Open original PDF
          </SafeLink>
          <a download href={pdfHref}>
            Download poster
          </a>
          <button onClick={closeViewer} type="button">
            Close viewer
          </button>
        </footer>
      </dialog>
    </div>
  );
}
