# Homepage content audit

This page was checked against `2608.13112v1.pdf` (arXiv:2608.13112v1, 13 August 2026).
The audit covers visible homepage copy, figure captions, table values, result deltas, limitations,
author metadata, citation metadata, and the public descriptions of the companion viewers.

## Source map

| Homepage content | Paper source |
| --- | --- |
| Title, authors, affiliations, contribution summary | p. 1 |
| Motivation and generic-evaluator failure modes | pp. 1–4, Figure 1 |
| Five-step SP-CoT definition and fidelity rules | pp. 3–4; Table 1, p. 7; Methods, pp. 20–23 |
| Corpus construction and all dataset counts | pp. 6–8; Table 2, p. 8; Methods, p. 20 |
| Two-stage training and backbone-transfer claims | p. 8; Methods, pp. 22–24; Discussion, p. 15 |
| GenExam numbers | Table 3, p. 9 |
| VeriphyT2IBench protocol | pp. 9–11; Methods, pp. 23, 25–26 |
| Local and Global numbers and rankings | Table 4, p. 12 |
| Difficulty statement and optics exception | p. 11; Table 5, p. 13 |
| Strict-score statement | p. 11; Table 6, p. 14 |
| Per-step scores | Figure 3, p. 6; pp. 10–11 |
| Scope and limitations | p. 15 |
| Checklist examples and SP-CoT ablation | pp. 53–55, Figures 13–14 |

## Exact values used on the page

- Full structured corpus: 4,313,866 images.
- Expert-level subset: 115,037 image–annotation pairs.
- Expert train/test: 109,288 / 5,749.
- VeriphyT2IBench: 1,283 held-out diagrams.
- Princigram-BAGEL: 75.69 Local and 82.54 Global.
- Princigram-DiMOO: 72.05 Local and 77.25 Global.
- BAGEL: 46.38 Local and 62.15 Global.
- GenExam Relaxed: BAGEL 13.8, Princigram-DiMOO 50.4, Princigram-BAGEL 54.8.
- BAGEL-to-Princigram-BAGEL Local gain: 75.69 − 46.38 = 29.31 points.
- Lead over the best closed baseline in each overall metric: 5.71 Local and 13.98 Global.
- SP-CoT step scores: 79.5 Scenario, 74.8 Parameters, 69.2 Structure, 74.8 Laws,
  and 85.8 Synthesis.

## Companion-viewer policy

- The three-prompt SP-CoT ablation follows Section S3.3 and Figure 14.
- The 90-case qualitative gallery and 120-case checklist viewer are additional selected-case
  interfaces built from supplied evaluation material; their descriptions explicitly identify them as
  companion subsets rather than figures wholly reported in the paper.
- Published aggregate scores are always labelled Local or Global. Per-case image fractions in the
  checklist viewer now use Local checks only, matching the paper's Figure 13 convention.
- The supplied 30-case closed-model dashboard is not published by this site. It contains exploratory
  combined metrics and post-hoc claims that are not defined or reported in the paper, including some
  statements that conflict with the final tables. Its original remains in the source-material directory.

## Citation policy

The PDF does not provide an official BibTeX block. The homepage therefore labels its entry as a
suggested arXiv-preprint citation and uses `@misc`; it should be replaced when an official publication
citation becomes available.
