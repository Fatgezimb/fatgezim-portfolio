# Link and behavior audit

October 15, 2026. The new workspace is verified as an exported artifact under `/fatgezim-portfolio/`. Public verification of the new portfolio release is pending. Canonical destination: [Zim Bela's portfolio](https://fatgezimb.github.io/fatgezim-portfolio/).

## Evidence standard

HTTP checks establish reachable content; browser checks establish only the rendered controls and flows actually exercised. Private/account-gated functionality requires separate evidence. Export validation checks local HTML, hydration, scripts, CSS URLs, images, fonts, deferred media and route output. It complements real browser checks.

## Project destinations

| Destination | Verified behavior and scope |
| --- | --- |
| [Bela Behavior Data Lab](https://neuropathlabs.com/) · [synthetic demo](https://neuropathlabs.com/demo) | Product and public demo respond successfully. Actual demo dashboard/report navigation was audited; the new portfolio's frames navigate to Money at 390/1440px and return to the sample without errors. Only synthetic demo data is exercised. |
| [Caregiver Academy](https://beladatalab.com/) | Public landing/preview renders. From the new portfolio frame, “See the preview path” navigates to the product explanation at both widths. The account library is a separate gated surface. The former training subdomain redirects here. |
| [RBT Practice Hub](https://rbt-pro.vercel.app/) | Actual asset-path fault repaired and released. Dashboard/task selection, card flip/known, wrong/correct answer feedback, persisted progress, clean/slash routes and legacy hashes pass 48 live assertions at 320/1440px. New portfolio frames navigate to Flashcards at 390/1440px. Repair: `dpl_H2viM6A4icY33wTjHs5GnXTpCikH`. |
| [StepSpark](https://fatgezimb.github.io/StepSpark/) · [source](https://github.com/Fatgezimb/StepSpark) | Public prototype previously audited through Review, answer reveal, confidence/fluency, local save and Library navigation. Fresh HTTP checks pass; a touch activation from the new portfolio opens its actual full-site URL in a new tab. Draft learning/review status remains visible. |
| [NeuroStack target](https://fatgezimb.github.io/neurostack-explorer/) · [source](https://github.com/Fatgezimb/neurostack-explorer) | Repaired build released as `69a08f4` through successful Pages run `38792732141`. Scientific and web CI pass. Fresh live browsers verify hydration, fonts, public-derived artifact and unit persistence. A frame with the portfolio sandbox passes unit/population/aggregation/smoothing/model changes at 390/1440px; canonical and live-lab actions are now integrated. |
| Rethink Automations | The portfolio's fictional local workflow simulation passes its prepare/confirm/Step 1 interaction. This is the inspected public experience. |
| NeuroPath Insight | The portfolio's simulated rates, filters and benchmark-detail interactions pass. Prototype status and sample-data scope are visible. |

Older RBT Pages links render “Site not found”; active portfolio actions use the repaired canonical app. Source repositories are offered as source links. USMLE Sprint redirects to sign-in and has a recorded framing restriction; its résumé status is account-gated. GitHub profile HTTP/browser evidence identifies the public profile. LinkedIn HTTP resolves to the normalized profile path, while unauthenticated browser access may reach an authwall.

## New portfolio artifact

| Area | Current verification |
| --- | --- |
| Four public routes | Homepage, résumé, research index and neuronal-reconstruction detail render and reload at 390/1440px. Correct base paths/fonts/canonicals; no runtime errors or horizontal overflow. |
| Five-domain workspace | Direct canvas hit, keyboard and touch controls, tour, repeated selection, focus return, fallback and renderer recovery pass. Five static stories remain without JavaScript. |
| Project explorer | All seven samples pass mobile/desktop workflows; keyboard Home/End/arrows, deep fragments and same-fragment navigation pass. New-tab links include safe relationship attributes and accessible disclosure. |
| Navigation | Skip link, search/Escape focus return, menu/contact navigation and theme persistence pass. Touch checks confirm RBT card flip, StepSpark new-tab launch and direct NeuroStack sample selection. |
| Contact | Required-field validation and encoded email-draft handoff pass. The tested action prepares a draft for the visitor to send. |
| Live frames | Eight actual navigation checks pass across Data Lab, Caregiver, RBT and NeuroStack at 390/1440px. Each frame is user-activated, has a full-site escape and is removed on return to sample. |
| Rendered targets | 177 checked targets: 78 HTTP targets across 26 successful unique requests, 98 existing same-page targets and one email-draft destination; no failed destinations. |
| Media/metadata | Export resource validation passes; route canonicals, fonts and assets render correctly. Original 1200×630 social artwork was visually inspected. Final public-origin verification remains below. |
| Résumé | Existing two-page PDF/DOCX browser downloads match `resume/approval.json`. Refreshed candidates are separate and await final regeneration/manual publication review. Web résumé remains two-page print. |

Local evidence: `work/master/final-link-audit.json`, `work/master/integrated/{production,workflows,visual,live-embedded,static-touch}.json`, `work/master/workspace-qa/REPORT.md` and `work/master/rbt-verification.md`. The [workspace QA report](WORKSPACE_QA.md) consolidates the current build. Earlier project evidence is recorded in [the product audit](portfolio/redesign-project-evidence.md).

## Public release verification

- [x] Record NeuroStack's fixed canonical deployment and desktop/mobile workflows; test its optional portfolio frame before enabling it.
- [ ] Record final portfolio commit and successful Pages workflow.
- [ ] Repeat route reloads, five-domain exploration, project actions, touch/menu, keyboard and fallback checks on the public origin.
- [ ] Exercise retained live frames and canonical new-tab actions from the real public portfolio.
- [ ] Verify public fonts, image/media resources, canonical metadata, social image, favicon, robots and sitemap.
- [ ] Download the published résumé formats in the browser and compare exact approved hashes and MIME types.

Public release results will be appended after deployment. The local artifact passes above do not stand in for those checks.
