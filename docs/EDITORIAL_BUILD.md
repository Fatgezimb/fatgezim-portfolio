# Editorial portfolio — October 15, 2026

The owner selected the ivory/burgundy founder composition and then explicitly requested implementation, a horizontal selected-work gallery, research, and NeuroPath Blog. This direction supersedes earlier composition plans. Phase 1 approval remains recorded in phase-state.json.

## Visual and content system

- Warm ivory #fbf8f3, burgundy #6b0f27, near-black #171b22, restrained stone borders.
- Bodoni Moda display typography; Geist body and product controls. The owner-selected reference portrait is served as a 96 KB WebP, with explicit intrinsic dimensions and high fetch priority.
- First screen: identity, Founder/CTO scope, software/data positioning, work and approved résumé actions.
- Native horizontal selected-work rail with visible adjacent-card continuation, previous/next controls, keyboard arrow support and touch scrolling. Native page scrolling remains intact.
- Research uses the original microscopy and vectorized reconstruction figures and full co-author attribution. The original PDF and existing detailed research routes remain available.
- Readable career, capabilities, education, co-founder context, contact and résumé downloads.

## Selection order and evidence

The owner questioned NeuroStack's lead position and their familiarity with it, and requested a fuller work collection. Technical complexity alone is not the ranking criterion. A flagship has not yet been chosen by the owner.

The homepage currently leads with Bela Behavior Data Lab, RBT Practice Hub, Caregiver Academy and StepSpark. This provisional order emphasizes relevant domain problems and demonstrable workflows. “View my work,” the navigation and “View all work” open `/work/`.

The full collection has nine entries:

- Products and founder work: Data Lab, RBT Practice Hub, Caregiver Academy and NeuroPath Blog.
- Automation and analytics: Rethink Automations and NeuroPath Insight, both with truthful local/synthetic sample scope.
- Research: the original George Mason neuronal-reconstruction poster, credited to Fatgezim Bela, Sumit Nanda and Giorgio A. Ascoli.
- Experiments and prototypes: StepSpark and NeuroStack Explorer. NeuroStack is labeled a recent exploratory build with a plain-language explanation of its public-data viewer and precomputed models.

Original product and research evidence is retained in `docs/PROJECT_INVENTORY.md` and `docs/portfolio/redesign-project-evidence.md`. The supplied research poster supports the Fiji/ImageJ → Vaa3D → NeuTube workflow and Class 4 neuronal reconstruction. No presentation date is inferred.

## Interaction and implementation

All seven app entries in the full collection open a native modal dialog with a usable local preview. Dialogs trap focus natively, support Escape, restore focus, and lock background scrolling. Full-app links remain server-rendered and open in separate tabs. Blog links open its verified public destination. The rail remains scrollable without client code; app links and résumé content are fully server-rendered.

NeuroStack's compact preview uses the first 20 seconds of the existing public-derived artifact. Unit selection, raster/rate view, interval start/end, reset and numeric tables are linked. One-second intervals render a visible rate point. It is connected to the existing complete 120-second scientific app and source repository. Other local previews reuse verified existing learning/operations workflows and clearly label synthetic/demo data.

Motion is limited to control feedback and user-initiated gallery scrolling. Reduced-motion users receive instant scrolling and no transitions. No new animation runtime is required. Product posters are source-grounded interface components; portrait is the owner's selected reference-based asset. Editable React/CSS and direct browser verification serve the design-tool and browser action markers. Independent visual QA follows the explicit Phase 2 subagent marker.

NeuroStack's standalone repository also has its stale RBT footer destination corrected and a direct portfolio return link added. Its scientific analysis implementation remains the existing functioning app.

## Verification

Recorded as checks complete in docs/EDITORIAL_QA.md. Approved PDF/DOCX bytes are covered by SHA-256 assertions in the route tests. No résumé files are changed by this implementation.
