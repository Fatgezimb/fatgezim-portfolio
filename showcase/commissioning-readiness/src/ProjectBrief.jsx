import React from "react";
export function ProjectBrief() {
  return (
    <div className="brief-page">
      <div className="brief-lead">
        <span className="eyebrow">Independent engineering prototype</span>
        <h2>Every acceptance should point to current evidence.</h2>
        <p>
          Relay explores a small but consequential question: when a power module
          changes, can a commissioning team immediately see which approvals need
          another look?
        </p>
      </div>
      <div className="brief-grid">
        <section>
          <span className="index">01 / Public context</span>
          <h3>Factory → site → operations</h3>
          <p>
            M.C. Dean describes Level 3 and 4 offsite commissioning, Level 5
            onsite integration, and performance/configuration information passed
            to operations. Its October 14, 2026 manufacturing expansion
            announcement makes delivery at scale a timely context.
          </p>
          <a
            href="https://www.mcdean.com/infrastructure-capital-projects/"
            target="_blank"
            rel="noreferrer"
          >
            Delivery process ↗
          </a>
          <a
            href="https://www.mcdean.com/governor-announces-m-c-dean-campus-expansion/"
            target="_blank"
            rel="noreferrer"
          >
            Expansion announcement ↗
          </a>
        </section>
        <section>
          <span className="index">02 / Proposed need</span>
          <h3>Keep the evidence chain coherent</h3>
          <p>
            A module revision, a failed test or a replacement prerequisite
            record can invalidate later approvals. This prototype makes those
            dependencies explicit and derives readiness from the whole chain.
          </p>
          <p>
            M.C. Dean already describes integrated delivery software. The
            opportunity here is an independent workflow hypothesis; its internal
            tools and unmet requirements have not been assessed.
          </p>
        </section>
        <section>
          <span className="index">03 / What works here</span>
          <h3>Rules before the dashboard</h3>
          <p>
            Review evidence, record exceptions, release revisions, assign owners
            and export a turnover package. A pure domain engine enforces
            prerequisites and tracks evidence IDs. Browser storage preserves the
            demonstration between visits.
          </p>
          <p>
            All six modules, test records and people labels are fictional. Gate
            descriptions illustrate a review process; they are not electrical
            test procedures.
          </p>
        </section>
        <section>
          <span className="index">04 / Production discovery</span>
          <h3>Validate with the people doing the work</h3>
          <p>
            A pilot would establish actual acceptance criteria, system
            boundaries, change-control rules, reviewer permissions and
            document-system integration. Measure time to locate current
            evidence, missed dependency changes and turnover rework against an
            agreed baseline.
          </p>
          <p>
            Production would require authenticated authorization, server-side
            event validation, durable document storage and controlled audit
            retention. The local event history is editable browser data.
          </p>
        </section>
      </div>
      <div className="brief-footer">
        <div>
          <h3>Built to be explained.</h3>
          <p>
            Inspect the state transitions, fixture generator, invariant tests
            and evidence exports.
          </p>
        </div>
        <a className="primary" href="./project.zip" download>
          Download source ↓
        </a>
        <a href="./README.md">Project guide ↗</a>
      </div>
    </div>
  );
}
