# Phase 0 Project Ranking

Status: Complete

Audit date: July 12, 2026

Maximum weighted score: 150

## Scoring method

Each criterion is scored 0–5 using `project-briefs/PROJECT_SELECTION_MATRIX.md`.

Score order in the compact table:

`Evidence / Relevance / Contribution / Workflow / Depth / Outcome / Differentiation / Visual / Privacy / Currentness`

Weights:

`5 / 4 / 4 / 3 / 3 / 3 / 2 / 2 / 2 / 2`

## Ranked candidates

| Rank | Candidate | Scores | Total | Phase 1 recommendation |
|---:|---|---|---:|---|
| 1 | Bela Behavior Data Lab | 5/5/5/5/5/5/5/5/4/5 | **148** | Feature |
| 2 | Bela Data Lab Caregiver Academy | 5/5/4/5/4/5/4/5/5/5 | **141** | Feature |
| 3 | RBT Practice Hub | 5/5/4/5/4/5/4/4/5/5 | **139** | Feature |
| 4 | StepSpark | 5/5/4/5/4/4/4/5/5/5 | **138** | Feature |
| 5 | Rethink Automations | 5/5/4/5/4/4/5/4/3/5 | **134** | Feature with synthetic demo only |
| 6 | Role Atlas | 5/3/4/5/5/4/5/5/5/4 | **133** | Public-safe reserve |
| 7 | NeuroPath Insight | 5/5/3/4/5/4/5/5/4/4 | **132** | Feature if deeper data/ML narrative is preferred |
| 8 | Steward Control Room | 5/4/4/4/5/4/5/4/3/5 | **130** | Internal reserve |
| 9 | NeuroPath PracticeOS | 5/5/4/3/5/4/5/4/2/5 | **129** | Private case-study reserve only |
| 10 | NeuroPath LLC ecosystem | 4/5/4/2/3/5/4/4/5/5 | **122** | Founder section, not a project card |
| 11 | Behavior Reduction Clinic Training | 5/4/3/5/3/4/3/4/5/4 | **121** | Exclude due overlap and role uncertainty |
| 12 | ABA Teaching Strategies Training | 5/4/1/5/3/5/3/4/5/4 | **116** | Exclude from Zim-owned work |
| 13 | Computational neuroscience research | 1/5/3/2/4/1/5/5/4/1 | **88** | Hold pending artifacts |
| 14 | Spinal Fracture Detection | 1/5/3/1/4/1/4/5/3/0 | **79** | Exclude pending evidence |
| 15 | Project Cleo | 1/2/3/1/3/1/3/3/4/0 | **60** | Exclude pending evidence |

Weighted arithmetic was checked programmatically.

## Recommended featured set

Recommended six-project narrative:

1. **Bela Behavior Data Lab** — strongest evidence, current public product, operational/data depth, and synthetic demo support.
2. **Bela Data Lab Caregiver Academy** — current public caregiver-learning product with clear educational boundaries.
3. **RBT Practice Hub** — public, static, original learning workflow with strong disclaimer and progress model.
4. **StepSpark** — medical-learning and engineering depth; clearly labeled prototype, not reviewed medical content.
5. **Rethink Automations** — practical browser automation/operator workflow; sanitized local replica only.
6. **NeuroPath Insight** — deeper data/ML/reimbursement pipeline story using only synthetic data.

Use **Role Atlas** instead of NeuroPath Insight if the owner prefers an entirely public-safe engineering artifact over a private/internal analytics case study.

## Candidate evidence and editorial rationale

### 1. Bela Behavior Data Lab — 148

- Evidence: `/Users/fatgezimbela/Documents/bela-behavior-data-lab/README.md`; `docs/CURRENT_LAUNCH_STATUS.md`.
- Verified role: explicitly built by Meili Bela and Fatgezim “Zim” Bela.
- Stack/output: React, TypeScript, Vite, Clerk, Stripe, Supabase, XLSX, jsPDF; browser-local Rethink-export processing, dashboards, drill-downs, and reports.
- Status: public at `https://neuropathlabs.com/`; paid-upload/billing launch status must be described precisely.
- Privacy: use only the bundled anonymized workbook; never show real appointment rows or exports.

### 2. Bela Data Lab Caregiver Academy — 141

- Evidence: `/Users/fatgezimbela/Documents/New project/README.md`; `docs/CURRENT_LAUNCH_STATUS.md`.
- Stack/output: React, Vite, TypeScript, Clerk, Stripe, guided modules, scenarios, checks, and printable tools.
- Status: public at `https://beladatalab.com/`.
- Role: repository ownership/authorship is clear; exact personal product-role title is not.
- Boundary: educational, not individualized clinical advice; no child profiles or PHI.

### 3. RBT Practice Hub — 139

- Evidence: `/Users/fatgezimbela/Documents/Test/README.md` and current public repository.
- Stack/output: React, TypeScript, Vite, localStorage; 19-task map, 105 original flashcards, 190 original practice questions, guide, and progress.
- Status: public at `https://fatgezimb.github.io/rbt-practice-hub/`.
- Boundary: independent learning resource; no BACB branding, endorsement, or competence claim.

### 4. StepSpark — 138

- Evidence: `/Users/fatgezimbela/Documents/USMLE Step 1 - Q bank Prep/README.md`; `CHANGELOG.md`; `https://github.com/Fatgezimb/StepSpark`.
- Stack/output: React, TypeScript, Vite, Zod, Storybook, Vitest, Playwright; local Instant Recall Card prototype and media provenance.
- Status: current prototype; Pages workflow exists, but a public deployment was not verified.
- Boundary: not production medical content; do not imply NBME affiliation, medical review, or accuracy.

### 5. Rethink Automations / NeuroPath Rethink Automation Center — 134

- Evidence: `/Users/fatgezimbela/Documents/Rethink Automations - Zim /AGENTS.md`; `docs/PROJECT_CHARTER.md`; `docs/UI_UX_AUDIT.md`.
- Stack/output: Python local server, HTML/CSS/JS, Playwright, Chrome CDP, JSON state, queues, confirmation, imports/exports, and readable logs.
- Status: active local beta; no public deployment. NeuroPath relationship is a placeholder: NeuroPath-adjacent local operations beta, not a deployed public NeuroPath product.
- Boundary: Step 1 behavior automation is supported; later steps remain manual. Never show authenticated Rethink screens or local state.

### 6. Role Atlas — 133

- Evidence: `/Users/fatgezimbela/Documents/Job Scraping/README.md`.
- Stack/output: React/Vite/TypeScript, FastAPI, SQLite, Python workers/ML modules, scraping adapters, normalization, vector ranking, deduplication, and map-first UI.
- Status: local backend plus a seeded Pages-ready build; no live URL verified.
- Editorial note: excellent public-safe engineering proof, but less central to the health/neuroscience narrative.

### 7. NeuroPath Insight — 132

- Evidence: `/Users/fatgezimbela/Documents/New project/docs/NEUROPATH_INSIGHT_ARCHITECTURE.md`.
- Stack/output: React/Recharts, Python, pandas, DuckDB, scikit-learn, transparency-in-coverage ETL, reimbursement benchmarks, exports, Random Forest, KMeans, and Isolation Forest.
- Status: private/internal and intentionally not deployed.
- Boundary: only synthetic data and a reconstructed static workflow may appear. Do not publish private contract data.

### 8–12. Reserve/section candidates

- **Steward Control Room**: sophisticated internal orchestration system; private metadata limits a truthful public demo.
- **NeuroPath PracticeOS**: strong clinical/local-first engineering but highest privacy risk; only a wholly synthetic case-study shell is safe.
- **NeuroPath LLC ecosystem**: important company/founder context, but not one discrete project workflow.
- **Behavior Reduction Clinic Training**: complete public-safe workflow, but duplicates stronger training stories and exact ownership is unclear.
- **ABA Teaching Strategies Training**: README explicitly credits Meili Bela as creator; do not frame as Zim-owned work without contribution evidence.

### 13–15. Evidence-insufficient candidates

- **Computational neuroscience research**: high narrative value, but no named project repository, poster, paper, dataset, or complete citation was found.
- **Spinal Fracture Detection**: one stale resume line; no repository, dataset, model card, results, or current status.
- **Project Cleo**: one historical resume entry; no repository, live link, or team/contribution verification.

These can be reconsidered when supporting artifacts are supplied.

## Phase 1 static demo placeholders

The selected cards may reserve static space for these later workflows, without animation:

- Bela Behavior Data Lab: sample import -> validation -> operations view -> report.
- Caregiver Academy: choose topic -> module -> scenario/check -> printable next step.
- RBT Practice Hub: competency map -> original card -> question -> local progress.
- StepSpark: recall card -> reveal -> confidence/review state -> provenance note.
- Rethink Automations: queue -> prepare/confirm -> supported step -> run log.
- NeuroPath Insight: public/synthetic input -> ETL -> benchmark/model -> limitations.

No interactive or animated production demo may be implemented before Phase 1 approval.
