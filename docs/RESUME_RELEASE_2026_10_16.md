# Approved engineering résumé release — October 16, 2026

The owner approved the exact updated engineering PDF and DOCX for public downloads and requested matching McVay website copy. Review files were copied byte-for-byte into both résumé directories under the established download filenames. `resume/approval.json` records the new hashes, two-page count and seven matching document hyperlinks.

McVay now describes the custom Dijkstra shortest-path adaptation, synthetic development/test datasets without operational-data access, and explicitly attributed team-reported processing and manual-review results. The homepage and full résumé route expose the complete entry. No new performance claim was inferred.

Verification: visually inspected both approved document pages; lint, TypeScript, 15 rendered-route tests, 7 export tests, root/Pages builds, five-route static export/resource validation and pack validation pass. Existing public filenames and buttons are preserved. Local browser inspection uses the static export; Vinext's preview server does not serve base-prefixed CSS directly.

Published commit `40d3aa1520260a94b98c9bae027cd3440ad6e6f3` passed Pages run [38899369864](https://github.com/Fatgezimb/fatgezim-portfolio/actions/runs/38899369864). Public homepage and résumé route return HTTP 200 with matching McVay content. Both downloads return HTTP 200 with correct MIME types and exact approved SHA-256 hashes. A browser reload confirms the published entry; mobile reflow has no horizontal overflow. Evidence: `work/engineering-resume-2026-10-16/public-verification.json`.
