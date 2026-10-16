import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  GATES,
  STATUSES,
  seed,
  restore,
  applyEvent,
  status,
  readiness,
  reason,
  turnover,
} from "./domain.js";
import { EvidenceForm, RevisionForm } from "./EvidenceForm.jsx";
import { ProjectBrief } from "./ProjectBrief.jsx";
import "./style.css";
const KEY = "zim-relay-demo-v1";
function initial() {
  try {
    return restore(localStorage.getItem(KEY)).state;
  } catch {
    return seed();
  }
}
function Badge({ value }) {
  return (
    <span className={`badge ${value}`}>
      <i aria-hidden="true" />
      {STATUSES[value] ?? value}
    </span>
  );
}
function App() {
  const [state, setState] = useState(initial),
    [selected, setSelected] = useState("PM-101"),
    [gateId, setGateId] = useState("l4"),
    [tab, setTab] = useState("readiness"),
    [search, setSearch] = useState(""),
    [scope, setScope] = useState("all"),
    [revision, setRevision] = useState(false),
    [message, setMessage] = useState(""),
    [resetOpen, setResetOpen] = useState(false),
    [storage, setStorage] = useState(""),
    [owner, setOwner] = useState("");
  const asset = state.modules.find((m) => m.id === selected),
    gate = GATES.find((g) => g.id === gateId),
    current = asset.evidence[gateId],
    check = readiness(asset),
    report = turnover(state, selected);
  const modules = state.modules.filter(
    (m) =>
      `${m.id} ${m.name} ${m.zone} ${m.owner}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (scope === "all" ||
        (scope === "ready" ? readiness(m).ready : !readiness(m).ready)),
  );
  const ready = state.modules.filter((m) => readiness(m).ready).length,
    exceptions = state.modules.filter((m) =>
      GATES.some((g) => status(m, g.id) === "failed"),
    ).length,
    outdated = state.modules.filter((m) =>
      GATES.some((g) => status(m, g.id) === "stale"),
    ).length;
  function save(next) {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setStorage("");
    } catch {
      setStorage(
        "Browser storage is unavailable. Changes remain in this tab until it closes.",
      );
    }
  }
  function act(action) {
    const next = applyEvent(state, action);
    save(next);
    setMessage(
      `${action.type === "record" ? "Review saved" : action.type === "revise" ? "Revision released" : "Owner updated"} for ${action.moduleId}. Readiness recalculated.`,
    );
  }
  function select(id) {
    const m = state.modules.find((m) => m.id === id);
    setSelected(id);
    setGateId(readiness(m).first ?? "handover");
    setRevision(false);
    setOwner("");
    setMessage("");
  }
  function exportReport() {
    const blob = new Blob(
        [
          JSON.stringify(
            { ...report, exportedAt: new Date().toISOString() },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `${selected}-revision-${asset.revision}-turnover.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(
      `Exported ${selected} with status ${report.ready ? "ready" : "blocked"} and ${report.blockers.length} open gates.`,
    );
  }
  function reset() {
    save(seed());
    setSelected("PM-101");
    setGateId("l4");
    setRevision(false);
    setOwner("");
    setSearch("");
    setScope("all");
    setResetOpen(false);
    setMessage("Original demonstration restored.");
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to workspace
      </a>
      <header className="app-header">
        <a className="brand" href="#main" aria-label="Relay workspace">
          <span className="brand-mark" aria-hidden="true">
            ↗
          </span>
          <b>
            relay<span> / commissioning</span>
          </b>
        </a>
        <div className="header-right">
          <span className="demo-label">Interactive prototype</span>
          <a href="../../work/">Zim Bela / Work ↗</a>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <div className="workspace-heading">
          <div>
            <div className="eyebrow">
              MERIDIAN / FICTIONAL DEMONSTRATION CAMPUS
            </div>
            <h1>
              Commissioning readiness<span>.</span>
            </h1>
            <p>Trace every module from released design to accepted handover.</p>
          </div>
          <div className="heading-actions">
            <button
              onClick={() => {
                select("PM-101");
                setGateId("l4");
                setTab("readiness");
                setMessage(
                  "Open the functional acceptance record, fill a sample retest, then save the review.",
                );
              }}
            >
              Try a corrective retest ↗
            </button>
            <button
              className="icon-button"
              onClick={() => setResetOpen(true)}
              aria-label="Reset demonstration"
            >
              ↺
            </button>
          </div>
        </div>
        {resetOpen && (
          <section className="reset-confirm" aria-label="Restore the original demonstration">
            <div>
              <h2>Restore the original sample?</h2>
              <p>This replaces local reviews and revisions with the six starting modules. Export any turnover records you want to keep first.</p>
            </div>
            <div className="button-row">
              <button className="primary" onClick={reset}>Restore sample</button>
              <button onClick={() => setResetOpen(false)}>Keep my changes</button>
            </div>
          </section>
        )}
        <div className="summary-band">
          <div>
            <strong>
              {String(ready).padStart(2, "0")}
              <small> / 06</small>
            </strong>
            <span>packages ready</span>
          </div>
          <div>
            <strong>{String(exceptions).padStart(2, "0")}</strong>
            <span>modules with exceptions</span>
          </div>
          <div>
            <strong>{String(outdated).padStart(2, "0")}</strong>
            <span>modules with outdated evidence</span>
          </div>
          <div className="summary-caption">
            <span className="live-dot" />
            Computed from current records
            <span className="small">
              Fictional data · Saved in this browser
            </span>
          </div>
        </div>
        <nav className="view-nav" aria-label="Workspace views">
          {[
            ["readiness", "Module workspace"],
            ["history", "Review history"],
            ["brief", "Project rationale"],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-current={tab === id ? "page" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
              {id === "history" && <span>{state.events.length}</span>}
            </button>
          ))}
        </nav>
        {storage && (
          <p className="notice" role="alert">
            {storage}
          </p>
        )}
        <div className="live-message" role="status" aria-live="polite">
          {message}
        </div>
        {tab === "brief" ? (
          <ProjectBrief />
        ) : (
          <div className="workbench">
            <aside className="register" aria-label="Module register">
              <div className="register-title">
                <h2>Module register</h2>
                <span>{modules.length}</span>
              </div>
              <label className="search-label">
                <span className="sr-only">Search modules</span>
                <input
                  type="search"
                  placeholder="Find a module or owner…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <label className="scope-label">
                Show
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                >
                  <option value="all">All modules</option>
                  <option value="attention">Needs attention</option>
                  <option value="ready">Ready for handover</option>
                </select>
              </label>
              <div className="module-list">
                {modules.map((m) => {
                  const r = readiness(m),
                    s = r.ready ? "accepted" : status(m, r.first);
                  return (
                    <button
                      key={m.id}
                      className={`module-option ${m.id === selected ? "selected" : ""}`}
                      aria-pressed={m.id === selected}
                      onClick={() => select(m.id)}
                    >
                      <span className="module-top">
                        <b>{m.id}</b>
                        <small>R{m.revision}</small>
                      </span>
                      <span>{m.name}</span>
                      <span className="module-location">
                        {m.zone} · {m.location}
                      </span>
                      <span
                        className="mini-progress"
                        aria-label={`${r.accepted} of 5 gates accepted`}
                      >
                        {GATES.map((g) => (
                          <i key={g.id} className={status(m, g.id)} />
                        ))}
                      </span>
                      <span className="module-foot">
                        <Badge value={r.ready ? "accepted" : s} />
                        <small>{r.accepted}/5</small>
                      </span>
                    </button>
                  );
                })}
                {!modules.length && (
                  <p className="empty">
                    No modules match. Change the search or filter.
                  </p>
                )}
              </div>
            </aside>
            <section
              className="module-workspace"
              aria-label={`${asset.id} workspace`}
            >
              <div className="module-heading">
                <div>
                  <span className="eyebrow">
                    {asset.zone} / {asset.location}
                  </span>
                  <h2>
                    {asset.id}
                    <span>{asset.name}</span>
                  </h2>
                </div>
                <div className="button-row">
                  <button onClick={() => setRevision(!revision)}>
                    Revision {asset.revision} <span>↗</span>
                  </button>
                  <button onClick={exportReport}>Export turnover ↓</button>
                </div>
              </div>
              {revision && (
                <RevisionForm
                  module={asset}
                  onAction={act}
                  onClose={() => setRevision(false)}
                />
              )}
              {tab === "history" ? (
                <>
                  <div className="section-heading">
                    <div>
                      <h3>Review history</h3>
                      <p>
                        Recorded events for {selected}. New reviews preserve
                        earlier entries.
                      </p>
                    </div>
                    <span className="count">
                      {report.history.length} events
                    </span>
                  </div>
                  <ol className="history">
                    {[...report.history].reverse().map((e) => (
                      <li key={e.id}>
                        <span className="history-marker" />
                        <div>
                          <div className="history-top">
                            <b>
                              {e.type === "record"
                                ? `${GATES.find((g) => g.id === e.gateId).short} · ${e.result === "pass" ? "accepted" : "exception"}`
                                : e.type === "revise"
                                  ? `Revision ${e.revision} released`
                                  : "Owner reassigned"}
                            </b>
                            <code>{e.id}</code>
                          </div>
                          <p>{e.note}</p>
                          <span>
                            {e.by} ·{" "}
                            {new Date(e.at).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                              timeZone: "UTC",
                            })}{" "}
                            UTC
                          </span>
                          {e.reference && (
                            <code className="history-ref">{e.reference}</code>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="small muted">
                    This browser-local demonstration log is not a
                    tamper-resistant audit system.
                  </p>
                </>
              ) : (
                <>
                  <div className="acceptance-heading">
                    <h3>Acceptance path</h3>
                    <span>{check.accepted} of 5 current approvals</span>
                  </div>
                  <ol className="gate-path" aria-label="Acceptance gates">
                    {GATES.map((g, index) => (
                      <li key={g.id}>
                        <button
                          onClick={() => setGateId(g.id)}
                          aria-pressed={gateId === g.id}
                          className={gateId === g.id ? "active" : ""}
                        >
                          <span
                            className={`gate-symbol ${status(asset, g.id)}`}
                          >
                            {status(asset, g.id) === "accepted"
                              ? "✓"
                              : String(index + 1).padStart(2, "0")}
                          </span>
                          <b>{g.short}</b>
                          <small>{g.location}</small>
                          <span
                            className={`gate-status ${status(asset, g.id)}`}
                          >
                            {STATUSES[status(asset, g.id)]}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                  <div className="inspection-grid">
                    <section className="record-detail">
                      <div className="record-head">
                        <span className="eyebrow">
                          {gate.level} / {gate.location}
                        </span>
                        <Badge value={status(asset, gateId)} />
                      </div>
                      <h3>{gate.name}</h3>
                      <p>{gate.description}</p>
                      <div className={`record-reason ${status(asset, gateId)}`}>
                        <span aria-hidden="true">
                          {status(asset, gateId) === "accepted" ? "✓" : "!"}
                        </span>
                        <p>{reason(asset, gateId)}</p>
                      </div>
                      <div className="evidence-document">
                        <div className="document-icon" aria-hidden="true">
                          ≡
                        </div>
                        <div>
                          <span className="eyebrow">
                            {current ? "LATEST RECORD" : "REQUIRED DELIVERABLE"}
                          </span>
                          <h4>{gate.deliverable}</h4>
                          <code>
                            {current?.reference ?? "Awaiting record reference"}
                          </code>
                        </div>
                      </div>
                      {current && (
                        <dl className="record-meta">
                          <div>
                            <dt>Package revision</dt>
                            <dd>
                              {current.revision} / current {asset.revision}
                            </dd>
                          </div>
                          <div>
                            <dt>Reviewer label</dt>
                            <dd>{current.by}</dd>
                          </div>
                          <div>
                            <dt>Review event</dt>
                            <dd>
                              <code>{current.id}</code>
                            </dd>
                          </div>
                          <div>
                            <dt>Prerequisite records</dt>
                            <dd>
                              {Object.values(current.dependencies).join(", ") ||
                                "Design entry point"}
                            </dd>
                          </div>
                        </dl>
                      )}
                      <div className="owner-panel">
                        <span className="eyebrow">ACCOUNTABLE TEAM</span>
                        <b>{asset.owner}</b>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!owner.trim()) {
                              setMessage(
                                "Enter an accountable team name before assigning.",
                              );
                              return;
                            }
                            act({
                              type: "assign",
                              moduleId: selected,
                              owner,
                              by: "Demo coordinator",
                              note: `Assigned package review to ${owner}.`,
                            });
                            setOwner("");
                          }}
                        >
                          <label className="sr-only" htmlFor="owner">
                            New owner label
                          </label>
                          <input
                            id="owner"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder="Assign another team"
                            required
                            maxLength={60}
                          />
                          <button aria-label="Assign module owner">↗</button>
                        </form>
                      </div>
                    </section>
                    <EvidenceForm
                      key={`${selected}-${gateId}-${asset.revision}`}
                      module={asset}
                      gateId={gateId}
                      onAction={act}
                    />
                  </div>
                  <div
                    className={`handover-strip ${check.ready ? "ready" : ""}`}
                  >
                    <span className="handover-icon" aria-hidden="true">
                      {check.ready ? "✓" : "⌁"}
                    </span>
                    <div>
                      <h3>
                        {check.ready
                          ? "Ready for operations handover"
                          : "Handover is waiting on current evidence"}
                      </h3>
                      <p>
                        {check.ready
                          ? "All five gates have accepted evidence for this revision."
                          : `${5 - check.accepted} gates need attention. The export includes the open dependencies and current records.`}
                      </p>
                    </div>
                    <button onClick={() => setTab("history")}>
                      Review history →
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <span>RELAY / A workflow prototype by Zim Bela</span>
        <span>Fictional assets · Independent project</span>
        <a href="./project.zip" download>
          Source & tests ↓
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
