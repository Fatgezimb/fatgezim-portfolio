# Link audit

October 15, 2026. Baseline evidence was captured before implementation; post-fix checks use the actual generated static Pages artifact mounted beneath its deployment path.

## Coverage

The CSV inventories 141 rendered targets across the home, resume, research index and neuronal-reconstruction page, plus the removed source CTA. It includes navigation, section anchors, project cards and previews, social links, native email form action, media, document downloads, canonical/Open Graph/icon references, robots and sitemap. Twenty-two unique HTTP targets were checked automatically with redirect/final-destination inspection. Every same-document anchor was matched to an actual rendered ID. The exporter independently validates local HTML, inline and emitted CSS resources, srcset, deferred media, fonts, JavaScript bootstrap and file existence.

All checked targets resolve successfully. LinkedIn’s unauthenticated browser redirects to its authwall; its profile content remains unverified. The native email handoff is configured but no message was sent.

## Before and after

| Target | Baseline | Repair and verification |
| --- | --- | --- |
| RBT Practice Hub | Former Pages URL and hash variant return 404 | Current `https://rbt-pro.vercel.app/` verified through dashboard, flashcards, refresh, assets and mobile correct-answer feedback |
| RBT source action | Repository visibility restricts public access | Inaccessible action removed from both card and preview; live study action retained |
| Public metadata | Canonical destination referenced the separate restricted deployment | All four canonicals, social images, favicon and crawler URLs point to the public Pages site |
| Internal paths and fonts | HTML attribute rewriting did not cover hydration, dynamic imports, fonts or runtime navigation | Framework compiles the base path; shared resolver covers native links/media; emitted artifact audited and browser-tested |
| Resume files | No current approved public files | Owner reviewed both formats, approved public downloads, then requested the 2017 B.S. correction; all copies and actual browser downloads match approved hashes |
| Browser printing | Three pages, orphaned research entry, approximately 8 MB decorative texture | Two clean pages, approximately 160 kB; visual review confirms heading/content placement |
| Static 404 | Successful homepage used as a fallback | Dedicated noindex not-found page with working project-base navigation |

## Browser evidence

Root and static-export browser matrices, native navigation, responsive screenshots, reduced-motion/no-JS behavior and actual download events are summarized in `reports/qa-report.md`. CSV desktop/mobile columns distinguish sampled browser flows, target inspection, and restricted destinations; they do not assert that an automated HTTP response proves authenticated content or that every duplicated anchor was clicked independently.

## Candidate destinations

USMLE Sprint opens at sign-in. Its implemented workflows are described with account-gated status; the resume does not present that destination as an open demonstration. The assessment portal is private and locally tested. Public NeuroStack and StepSpark source repositories, Bela Behavior Data Lab, Caregiver Academy, GitHub profile and the RBT application were checked independently in a real browser.

## Reproduction and live release

Run `scripts/audit-links.py` against the root production preview or the Pages-mounted static preview. The CSV records original and intended destinations, HTTP status, redirect/final URL, route behavior, action taken and verification limits.

The independent NeuroStack application browser check exposed a root-relative dynamic-chunk failure. The portfolio and resume use its verified public source instead; the README now points to the same reproducibility record. No working live application is claimed for that destination.

Live verification is pending the release workflow. The report will record the deployed source and final artifact checks after publication.
