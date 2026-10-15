# Resume document verification

Generated October 15, 2026 from `app/content/resume-document.ts` using `scripts/export-resume-data.mjs` and `scripts/generate-resume.py`.

## Result

- PDF: two Letter pages, 5,498 extractable text characters, embedded Arial regular/bold for body and headings, 10 pt body text, 9 pt page numbers.
- Editable DOCX: two Letter pages when rendered by the packaged `render_docx.py` with bundled LibreOffice. Body text is Arial 10 pt; substantive content remains paragraphs and live hyperlinks.
- Eight matching external hyperlink destinations in both formats: email, LinkedIn, GitHub profile, portfolio, NeuroStack source, Bela Behavior Data Lab, RBT Practice Hub, and StepSpark source.
- All four page images reviewed. Clear hierarchy, restrained teal/indigo accents, readable content, no clipping, overlap, missing glyphs, or split project entries.
- Current shared data includes both confirmed Founder and CTO roles, six selected projects, joint Bela Data Lab credit, the private/local assessment status, account-gated USMLE Sprint status, 2017 neuroscience degree, and expected 2028 medical education.
- The default Word template's blue title border was removed in the generator and the final render confirms its absence.
- The PDF and DOCX use the same exported source and semantic blocks. Contact and project link annotations match exactly.

## Reproduction

Use the bundled Python executable returned by `load_workspace_dependencies`:

```sh
/Users/fatgezimbela/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/generate-resume.py
```

The generator uses bundled Node 24 to read native TypeScript and resolve local content imports, with no package installation. Its JSON intermediate and validation record remain in `work/reconciliation/docs/`. It writes the requested PDF and DOCX to `resume/`.

The packaged render command completed successfully:

```sh
/Users/fatgezimbela/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 /Users/fatgezimbela/.codex/plugins/cache/openai-primary-runtime/documents/26.1013.11914/skills/documents/render_docx.py resume/Fatgezim_Zim_Bela_Technology_Resume.docx --output_dir work/reconciliation/docs/docx-render --emit_pdf --verbose
```

The renderer resolved `/Users/fatgezimbela/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/soffice`. Its font-cache warnings were nonfatal; two PNGs and the render PDF were produced. No desktop-installed LibreOffice was used.

The PDF was independently rendered with bundled Poppler, then checked using pypdf and pdfplumber for page count, text extraction, annotations, fonts, and page-boundary placement. Validation output is in `artifact-validation.json`; renderer diagnostics are in `docx-render.log`.

## Handoff

Matching user copies are saved under `/Users/fatgezimbela/Documents/Codex/2026-10-15/this-x20/outputs/`. Owner approved public downloads and subsequently requested the B.S. year correction to 2017. Corrected copies in `resume/`, `public/resume/`, and the user output directory match byte for byte. The approval manifest records the new digests.
