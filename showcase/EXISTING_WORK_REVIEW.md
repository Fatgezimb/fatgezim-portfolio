# Existing work: evidence and next steps

Reviewed October 15, 2026. Public Kaggle pages were inspected in the browser. Existing portfolio projects were assessed against the repository's recorded source/product audits.

| Work | What is verified | Recommendation |
|---|---|---|
| [Time Series Forecasting with Machine Learning](https://www.kaggle.com/code/fatgezimbela/time-series-forecasting-with-machine-learning-yt) | Public executed notebook, credited fork of Rob Mulla's tutorial. Calendar features and XGBoost on PJME hourly energy data. The displayed run uses its test set for early stopping and then reports error on that same set. | Worth rebuilding as an energy forecasting case study with rolling-origin evaluation, a seasonal baseline, separate tuning/test windows, and explicit forecast horizon. Keep the original as credited learning work. |
| [Monkey Pox EDA/Image Classification](https://www.kaggle.com/code/fatgezimbela/monkey-pox-eda-image-classification-zim) | Saved run reports zero loaded images and stops with FileNotFoundError. Its input dataset is listed as unavailable. The visible notebook does not establish a trained or evaluated classifier. | A substantial rebuild is needed. Start with a documented dataset and patient/source-separated splits, deduplication and external validation before presenting classification results. |
| Cervical-spine work supplied by the owner | Owner reports previous work; the supplied public notebook URL currently returns a missing-page screen. The owner has no replacement link and requested a description of the idea. | Keep it as an owner-reported area of prior exploration. The concept below is a proposed new implementation, not a reconstruction of verified notebook code or results. |
| GMU neuronal reconstruction | Original poster and figures, coauthor attribution, image processing/stitching/tracing and reconstruction evidence. | Strong current research evidence. Feature the actual scientific workflow and original artifacts. Preserve Sumit Nanda and Giorgio A. Ascoli's credit. |
| Bela Behavior Data Lab | Existing source/product audit, working synthetic demonstration, operations context, co-builder credit to Meili Bela. | Best existing product story to deepen with a specific source-to-report workflow, engineering decisions and observed checks. |
| RBT Practice Hub | Existing source-backed study flows and working public application. | Strong product-engineering example when explained through learning flow, persistence, accessibility and content structure. |

## Proposed cervical-spine rebuild

**Working concept: Cervical CT Review Lab.** A research interface for exploring a CT series, navigating cervical vertebral levels, comparing fracture labels with model outputs, and inspecting failure cases.

The likely reference task is [RSNA 2022 Cervical Spine Fracture Detection](https://www.kaggle.com/competitions/rsna-2022-cervical-spine-fracture-detection/overview). Dataset access, competition terms and permitted redistribution would need to be established before implementation.

A strong version would include:

1. A DICOM ingestion contract: series ordering, pixel spacing, orientation, rescale slope/intercept and HU windowing verified against source metadata.
2. A responsive CT viewer with explicit plane/orientation labels and vertebral-level navigation grounded in actual annotations.
3. A transparent baseline with patient/study-separated validation. No adjacent slices from one study crossing train/test partitions.
4. An evaluation view showing sensitivity, specificity, calibration and false-positive/false-negative examples at the study and vertebral levels, where the source labels support them.
5. A reproducible experiment record and clear attribution of data, borrowed methods and original implementation.

The hiring story would be medical-imaging engineering: turning complex volumetric data into an inspectable, reproducible research workflow. It would require more data preparation, compute and verification than the two completed tabular/time-series showcases. No prior score, architecture or clinical performance is claimed here.
