# Technology resume

The PDF and editable DOCX in this directory are the reviewed application artifacts. Their public copies are served from `public/resume/`. The owner approved public downloads on October 15, 2026 and then expressly corrected the B.S. year to 2017 in both formats and the website.

`approval.json` records the approved release hashes. The automated route tests check public artifact bytes against this record. Keep all copies identical.

The generator consumes `app/content/resume-document.ts`, derived from the site’s structured identity, experience, project, education, and skill records. Regenerate with the bundled Python runtime using `scripts/generate-resume.py`. Render and inspect every PDF/DOCX page and validate links before publishing a revision.
