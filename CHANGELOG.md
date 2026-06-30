# Changelog

All notable changes to **The Cottage Garden Companion** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Moved the tool sources into `src/` (`src/index.html`, `src/fertilizer.html`, `src/companion-planter.html`). The tools still open directly from disk and cross-link via relative paths.
- Extracted The Companion Bed's plant/companion data and its specimen art into partials under `src/_includes/` (`companion-planter.data.js`, `companion-planter.art.js`), referenced from the page with `<script src="_includes/…">` so `src/` still runs directly. The build inlines these into a single self-contained `docs/` file, so the published output stays HTML-only.

### Added

- Expanded The Companion Bed from 89 to **139 plants** — 50 more popular cottage-garden vegetables, herbs, flowers and fruit (e.g. broad bean, kohlrabi, globe artichoke, rose, peony, pansy, rudbeckia, lemon, peach, watermelon, pomegranate). Each comes with its own specimen art and ranked companion / keep-apart relationships (323 edges total).
- A `build` skill (`.claude/skills/build/`) that mirrors `src/` → `docs/`, the GitHub Pages publish directory. It is a zero-dependency Node script (`node .claude/skills/build/scripts/build.mjs`) that cleans and regenerates `docs/` on each run, structured as a step pipeline so future transforms can be added without reworking it.
- Per-plant specimen art in The Companion Bed: each plant now renders its own herbarium-style SVG emblem (a library of ~50 botanical form-builders mapped per plant) instead of one shared shape per category. Foliage and stems use theme tokens so the art re-themes in dark mode, while intrinsic colours (tomato red, aubergine purple, …) stay fixed.
- Build pipeline steps `inlineIncludes` and `pruneIncludes` that fold `src/_includes/*` partials into each page and then drop the `_includes` directory from `docs/`, keeping the publish output self-contained.

## [1.0.0] — 2026-06-28

### Added

- **The Cottage Garden Companion** (`index.html`) — landing/hub page linking the collection, with the specimen-plate tool grid.
- **The Fertilizer Plot** (`fertilizer.html`) — turns any N–P–K ratio into a generative hand-drawn plant, then calculates feed dose, timing and cost; six named feed presets.
- **The Companion Bed** (`companion-planter.html`) — 75+ plants with ranked companion and "keep apart" relationships, a reason taxonomy explaining why each pair works, search and category filters, and a "Feed this →" deep-link into the Fertilizer Plot.
- Shared cross-tool nav, light/dark ("evening garden") theme toggle persisted across all tools, and shareable state via the URL hash + `localStorage`.
- `DESIGN.md` design-system source of truth, and `AGENTS.md` + `.agents-docs/` guidance for AI coding agents.

[Unreleased]: https://github.com/jparkerweb/cottage-garden/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/jparkerweb/cottage-garden/releases/tag/v1.0.0
