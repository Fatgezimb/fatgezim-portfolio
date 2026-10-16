# Engineering resume

The owner approved these exact two-page PDF and editable DOCX files for public downloads on October 16, 2026. They were reviewed as `Fatgezim_Zim_Bela_Engineering_Resume` and retain the existing `Technology_Resume` public filenames for link compatibility. The files in `resume/` and `public/resume/` must remain byte-identical; `approval.json` records the approved SHA-256 hashes.

This release was authored in the chat workspace with `work/engineering-resume-2026-10-16/build_resume.py`, rendered from DOCX to PDF, and visually reviewed on both pages. The older `scripts/generate-resume.py` and its structured content produce a different document selection; running it does not reproduce these approved artifacts. Future revisions require rendering, verification and owner review before replacing public bytes or updating the approval record.

The website’s McVay experience matches the approved document: a custom Dijkstra-based algorithm, synthetic-data development under access constraints, and explicitly attributed team-reported operational results.

## Current engineering authoring workflow

`app/content/engineering-resume.json` is the canonical revised copy shared with the web résumé. Build a DOCX review candidate with the bundled Python runtime and `scripts/build-engineering-resume.py --output-dir <review-directory>`. Use the document skill renderer to produce the matching PDF and inspect both pages. The legacy `scripts/generate-resume.py` uses the older layout and is not the publication generator. Current approved artifacts stay unchanged until the newly rendered files receive exact-file owner approval.
