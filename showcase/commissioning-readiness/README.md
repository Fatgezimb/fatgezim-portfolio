# Relay — Commissioning Readiness

An independent, working prototype for keeping modular power commissioning evidence consistent across revisions, tests and operations handover. All project records are fictional. Built by Fatgezim “Zim” Bela as a portfolio engineering example.

## Why this problem

M.C. Dean publicly describes [Level 3/4 offsite commissioning, Level 5 onsite integration and operations handover](https://www.mcdean.com/infrastructure-capital-projects/). Its [October 14, 2026 manufacturing expansion announcement](https://www.mcdean.com/governor-announces-m-c-dean-campus-expansion/) provides current context for delivery at scale.

**Proposed opportunity:** make it easy to trace an acceptance to the current equipment revision and prerequisite evidence. A revision or replacement record can make downstream approvals outdated even if they previously passed.

This is an inference from a documented delivery workflow. M.C. Dean already describes integrated project software; no internal process failure or unmet software requirement has been verified. The prototype is independent and unaffiliated.

## Five-minute walkthrough

1. Select **PM-101**, whose factory functional record has an exception.
2. Try Level 5: review is blocked by its prerequisite.
3. Return to Level 4, choose **Fill sample retest**, then **Save review**. Level 5 becomes available while turnover stays blocked.
4. Record Level 5 and turnover reviews. The package becomes ready.
5. **Export turnover**. Inspect its readiness, open gates, revision, evidence and event history.
6. Release a new revision with a change description. Every existing approval becomes outdated, and readiness recalculates.
7. Open Review history, reload the page, filter modules or assign a new accountable team. Reset restores the deterministic sample.

“Fill sample retest” fills fictional text for a demonstration; saving is an explicit separate action. The UI records reference IDs and review notes, rather than uploading or verifying actual engineering documents.

## Run, test and build

Node 22.13+:

```sh
npm ci
npm test
npm run dev
npm run build
npm run preview
```

A compiled `dist/` is included in the portable package:

```sh
python3 -m http.server 4204 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4204/`. On the portfolio, this app is served under `/showcase/commissioning-readiness/`. The Work link targets that parent portfolio. The downloaded archive itself is the source package linked by the integrated site.

## Architecture

- `src/domain.js`: deterministic fixture, dependency evaluation, pure state transitions, evidence lineage, turnover export and browser-state validation.
- `src/main.jsx`: asset register, scoped views, owner assignment, history, JSON export and local persistence.
- `src/EvidenceForm.jsx`: explicit review and revision actions with validation.
- `src/ProjectBrief.jsx`: primary-source context, hypothesis and production discovery.
- `tests/domain.test.mjs`: acceptance invariants and recovery behavior.

An evidence record contains the module revision and the exact event IDs of its prerequisites. Readiness requires every gate to have a current passing record and a valid prerequisite chain. Replacing upstream evidence invalidates downstream records even when the module revision remains unchanged. Releasing a revision invalidates all earlier revision records. No “ready” field is manually toggled.

The domain engine copies state on every action and appends an event. The UI and exports call the same readiness functions. Tests cover blocked acceptance, corrective retesting, complete chains, revision propagation, same-revision retesting, immutable transitions, export status, required review data, persistence corruption and owner reassignment.

## Boundaries and production roadmap

This is a browser-local workflow prototype, not equipment control or an electrical test procedure. Gate names are illustrative; actual commissioning requirements must be established by qualified teams for each system. Reviewer labels are not authenticated, and local history can be edited through browser storage.

A production pilot would first validate acceptance criteria and dependency rules with factory/site commissioning teams. Then add authenticated roles and authorization, server-side transition validation, durable event storage, document repository integration, offline conflict resolution and audit retention. Measure evidence retrieval time, overlooked dependency changes and turnover rework against an agreed baseline. No improvement metrics are claimed here.

## License

Original code: MIT. Third-party packages retain their licenses.
