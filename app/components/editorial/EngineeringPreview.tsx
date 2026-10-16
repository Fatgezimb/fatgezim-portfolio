"use client";
import { useState } from "react";
import { sitePath } from "@/app/content/paths";
import styles from "./EngineeringPreview.module.css";

export default function EngineeringPreview({ id }: { id: string }) {
  const [viewer, setViewer] = useState("owner");
  const [requested, setRequested] = useState(false);
  const [granted, setGranted] = useState(false);
  const [revision, setRevision] = useState(1);
  const [signedRevision, setSignedRevision] = useState<number | null>(null);
  if (id !== "clinical-assessment-portal")
    return (
      <div className={styles.embedded}>
        <p>
          This is the working{" "}
          {id === "grid-forecast"
            ? "historical forecast replay"
            : "commissioning prototype"}
          . Changes stay in this browser. Open the full app for more space.
        </p>
        <iframe
          title={
            id === "grid-forecast"
              ? "Grid Forecast Lab interactive application"
              : "Relay commissioning interactive application"
          }
          src={sitePath(`/showcase/${id}/`)}
          loading="lazy"
        />
      </div>
    );
  const canEdit = viewer === "owner" || granted;
  return (
    <div className={styles.clinical}>
      <div className={styles.sampleHeader}>
        <span>Clinical Assessment Portal</span>
        <strong>Synthetic workflow miniature</strong>
      </div>
      <p>
        A small replica of the implemented access and signature rules. No
        clinical assessment or patient information is included.
      </p>
      <div className={styles.controls}>
        <label>
          View as{" "}
          <select
            value={viewer}
            onChange={(event) => setViewer(event.target.value)}
          >
            <option value="owner">Record owner</option>
            <option value="colleague">Colleague</option>
          </select>
        </label>
        <button
          onClick={() => {
            setViewer("owner");
            setRequested(false);
            setGranted(false);
            setRevision(1);
            setSignedRevision(null);
          }}
        >
          Reset sample
        </button>
      </div>
      <div className={styles.record}>
        <div>
          <small>SYNTHETIC RECORD DEMO-001</small>
          <h3>Assessment review</h3>
          <p>Version {revision} · Owner-managed editing</p>
        </div>
        <dl>
          <div>
            <dt>Your access</dt>
            <dd>{canEdit ? "Can edit" : "Read only"}</dd>
          </div>
          <div>
            <dt>Signature</dt>
            <dd>
              {signedRevision === revision
                ? `Signed at version ${revision}`
                : "Clinical review required"}
            </dd>
          </div>
        </dl>
      </div>
      <div className={styles.controls}>
        {viewer === "colleague" && !granted && (
          <button disabled={requested} onClick={() => setRequested(true)}>
            {requested ? "Access requested" : "Request edit access"}
          </button>
        )}
        {viewer === "owner" && requested && !granted && (
          <button onClick={() => setGranted(true)}>
            Grant colleague edit access
          </button>
        )}
        {viewer === "owner" && granted && (
          <button onClick={() => setGranted(false)}>
            Revoke colleague edit access
          </button>
        )}
        <button
          disabled={!canEdit}
          onClick={() => {
            setRevision((value) => value + 1);
          }}
        >
          Save a clinical edit
        </button>
        <button
          disabled={!canEdit || signedRevision === revision}
          onClick={() => setSignedRevision(revision)}
        >
          Sign current version
        </button>
      </div>
      <p role="status" className={styles.status}>
        {!canEdit
          ? "Reading is permitted; editing needs an owner-issued grant."
          : signedRevision === revision
            ? "The signature matches the saved version. Edit the record to see why a fresh review is needed."
            : signedRevision !== null
              ? "The record changed after signing. The old signature no longer approves this version."
              : "Sign this version, then save an edit to inspect the review boundary."}
      </p>
      <p className={styles.note}>
        The full private implementation enforces these rules on the server, with
        authenticated practice membership and version checks. This miniature
        demonstrates the workflow only.
      </p>
    </div>
  );
}
