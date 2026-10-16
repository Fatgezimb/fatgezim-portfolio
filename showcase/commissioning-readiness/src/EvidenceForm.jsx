import React, { useState } from "react";
import { gateFor, status, reason } from "./domain.js";
export function EvidenceForm({ module, gateId, onAction }) {
  const gate = gateFor(gateId),
    blocked = gate.requires.some((id) => status(module, id) !== "accepted");
  const [result, setResult] = useState("pass"),
    [reference, setReference] = useState(""),
    [by, setBy] = useState("Demo reviewer"),
    [note, setNote] = useState(""),
    [error, setError] = useState("");
  function sample() {
    setReference(
      `${module.id}-${gateId.toUpperCase()}-R${module.revision}-REVIEW`,
    );
    setBy("Demo reviewer");
    setResult("pass");
    setNote(
      "Sample corrective evidence reviewed. The recorded discrepancy is resolved and the package revision matches.",
    );
    setError("");
  }
  function submit(e) {
    e.preventDefault();
    try {
      onAction({
        type: "record",
        moduleId: module.id,
        gateId,
        result,
        reference,
        by,
        note,
      });
      setReference("");
      setNote("");
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <form className="evidence-form" onSubmit={submit}>
      <div className="form-title">
        <h3>Record a review</h3>
        <button
          className="text-button"
          type="button"
          onClick={sample}
          disabled={blocked}
        >
          Fill sample retest ↗
        </button>
      </div>
      {blocked && <p className="notice">{reason(module, gateId)}</p>}
      <label>
        Evidence reference
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder={`${module.id}-${gateId.toUpperCase()}-R${module.revision}`}
          required
          maxLength={100}
          disabled={blocked}
        />
      </label>
      <div className="form-pair">
        <label>
          Review result
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            disabled={blocked}
          >
            <option value="pass">Accept evidence</option>
            <option value="fail">Record exception</option>
          </select>
        </label>
        <label>
          Reviewer label
          <input
            value={by}
            onChange={(e) => setBy(e.target.value)}
            required
            maxLength={60}
            disabled={blocked}
          />
        </label>
      </div>
      <label>
        Review note
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What was checked? What remains unresolved?"
          required
          minLength={8}
          maxLength={1000}
          rows={3}
          disabled={blocked}
        />
      </label>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <button className="primary" type="submit" disabled={blocked}>
        Save review <span>↗</span>
      </button>
      <p className="small muted">
        Records a local demonstration event. Reviewer labels are descriptive;
        identity is not authenticated.
      </p>
    </form>
  );
}
export function RevisionForm({ module, onAction, onClose }) {
  const [note, setNote] = useState(""),
    [error, setError] = useState("");
  return (
    <form
      className="revision-form"
      onSubmit={(e) => {
        e.preventDefault();
        try {
          onAction({
            type: "revise",
            moduleId: module.id,
            by: "Demo engineer",
            note,
          });
          onClose();
        } catch (e) {
          setError(e.message);
        }
      }}
    >
      <h3>Release revision {module.revision + 1}</h3>
      <p>
        Existing records reference revision {module.revision}. Releasing this
        revision marks them outdated and requires fresh reviews through the
        acceptance chain.
      </p>
      <label>
        Change description
        <textarea
          rows={2}
          minLength={8}
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={1000}
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <div className="button-row">
        <button className="primary">Release revision</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
