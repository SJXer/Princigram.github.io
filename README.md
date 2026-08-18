# Princigram project page

Static project page for **Towards Physics-Faithful Generation of Scientific Diagrams**.

The site is intentionally dependency-free: GitHub Pages serves the HTML, CSS, JavaScript, figures,
paper PDF, and self-contained interactive dashboards directly.

## Local preview

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Do not open `index.html` directly with a `file://` URL. Running a local HTTP server matches the way
GitHub Pages resolves assets and embedded dashboard files.

## Repository layout

```text
.
├── index.html                 # Page content and semantic structure
├── styles.css                 # Theme and responsive layout
├── scripts.js                 # Navigation, demo switcher, lightbox, citation copy
└── assets
    ├── demos                  # Self-contained interactive result viewers
    ├── figures                # Web-ready PNG and SVG paper figures
    ├── paper                  # Downloadable paper PDF
    └── favicon.svg
```

## GitHub Pages

In the repository settings, open **Pages**, choose **Deploy from a branch**, then select the `main`
branch and `/ (root)`. The expected project URL is:

<https://sjxer.github.io/SP-CoT.github.io/>

## Notes for the next revision

- See `CONTENT_AUDIT.md` for the paper-page mapping used to verify the public copy and metrics.
- Replace the suggested arXiv BibTeX entry if the final paper provides an official citation.
- Add official Code, Model, and Dataset links after release.
- The qualitative and checklist dashboards are large self-contained files. They are loaded on demand;
  a later optimization can extract their embedded images and data for browser caching.
- Source materials use several earlier names (`SciT2I`, `PhyT2I`, `SP-CoT`). The main page follows the
  paper's final project name, **Princigram**, and final counts from Table 2.
