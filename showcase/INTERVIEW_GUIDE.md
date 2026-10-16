# Understand the projects before presenting them

## Appointment Operations

**The problem:** an operations team needs reliable attendance numbers and a way to investigate missed appointments without mistaking correlations for treatment effects.

**The short explanation:** “This project takes a public appointment dataset, validates it, aggregates it with SQL, and gives an analyst a usable interface for investigating attendance. Every rate is tied to a count and a denominator. The planning tool keeps hypothetical improvements separate from measured outcomes.”

**A three-minute demo**

1. Start with 110,521 accepted appointments and 22,314 missed visits.
2. Select a booking-delay group. Show that the cards, weekday chart, daily series and SMS table all change together.
3. Open Data & methods. Explain the six rejected records and why a same-day afternoon booking is valid.
4. Open Capacity planning. Change the assumed reduction from 10% to 20%. Explain that the resulting capacity is a calculation, not a demonstrated intervention effect.
5. Open the executed notebook and SQL, then show the reconciliation tests.

**Questions to be ready for**

- Why not average the group rates? Groups differ in size; sum the numerators and denominators.
- Does SMS improve attendance? This dataset cannot establish that because messaging was not randomized and assignment/timing information is incomplete.
- Why are some dates absent? The extract contains records only for certain days; missing dates are not filled with fake zero counts.
- What would production require? A real source contract, incremental ingestion, access controls, monitoring, refresh schedules and stakeholder validation. This delivered app is a reproducible historical-data project.

**Hands-on exercise:** change the SQL grouping, rerun the pipeline, and inspect how the output grain changes. Explain which UI calculations would need to change with it.

## Engine Prognostics

**The problem:** estimate how many operating cycles remain from a sequence of noisy sensor measurements, and show how uncertain that estimate is.

**The short explanation:** “I compared simple and nonlinear sensor models against an age-only baseline on two NASA simulation scenarios. I split by engine so the test set contains different trajectories, and made an app that lets you replay each prediction and inspect errors.”

Use that first-person explanation only after you can walk through the implementation, choices, and results yourself. This build was developed with AI assistance; the notebook, source and tests are available for inspection.

**A three-minute demo**

1. Scrub the longest engine trajectory. Explain that the prediction sees only data available up to that cycle.
2. Select another engine from the table, including one with a larger error.
3. Switch between FD001 and FD003. Explain the different fault modes.
4. Open Model evaluation. MAE is about 17.1 and 15.1 cycles, versus 31.1 and 38.4 for the age-only baseline.
5. Explain why 100% interval coverage can still be unhelpful: the intervals are wide. Show the notebook's interval-width plot.

**Questions to be ready for**

- Why split by engine? Adjacent cycles from one engine are correlated. Random row splits can leak an engine's trajectory into both training and testing.
- What is a trailing feature? A mean or change computed from the current and preceding cycles, never future measurements.
- How is the model selected? Two fixed candidates are compared on 20 validation engines; the winning family is refitted on 80 engines. Calibration and official test engines remain separate.
- Why cap at 125? It is a modeling assumption limiting early-life targets. It simplifies the task but creates a prediction ceiling, which is visible in the error plot.
- Is the interval guaranteed on the official test set? No. The usual conformal coverage argument depends on exchangeability, and censoring differs here. The project reports actual test coverage and width.
- Why not a neural network? A more complicated model needs evidence of value. These baselines are easier to inspect and already improve on age alone.

**Hands-on exercise:** inspect `test_rolling_features_cannot_see_future`, modify the rolling-window length in a new experiment, and explain how you would validate that change without repeatedly choosing parameters on the official test results.

## Hiring relevance

| Role family | Evidence to emphasize |
|---|---|
| Software / product engineering | Working interfaces, filter consistency, source inspection, accessibility, static delivery and reproducible builds |
| Data engineering / analytics | Contracts, checksum locks, SQL grain, quarantine rules, additive metrics and traceable artifacts |
| Data science / ML | Whole-entity splitting, explicit baseline, fixed model selection, error analysis, uncertainty and limitations |
| Healthcare technology | Appointment operations context, careful interpretation and understandable decisions |
| Technical leadership | Choosing scope, explaining tradeoffs, identifying what is proven and planning the next valid experiment |
