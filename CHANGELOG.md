# Changelog

All notable changes to **The Cottage Garden Companion** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-06-30

### Added

- **The Cottage Garden Companion** (`index.html`) — landing/hub page linking the collection, with the specimen-plate tool grid and the painted cottage-garden banner as a framed, centered, dark-mode-tuned hero (plus `og:image` share tags for link previews).
- **The Companion Bed** (`companion-planter.html`) — **139 plants** of cottage-garden vegetables, herbs, flowers and fruit with ranked companion and "keep apart" relationships (323 edges), a reason taxonomy explaining why each pair works, search and category filters, growing notes with an in·ft / cm·m unit toggle, per-plant herbarium-style specimen art (a library of ~50 botanical form-builders that re-theme in dark mode while intrinsic colours like tomato red and aubergine purple stay fixed), a print stylesheet that emits a clean planting card, and a "Feed this →" deep-link into the Fertilizer Plot.
- **The Fertilizer Plot** (`fertilizer.html`) — turns any N–P–K ratio into a generative hand-drawn plant, then calculates feed dose, timing and cost; six named feed presets.
- Shared cross-tool nav (The Companion Bed first (01), The Fertilizer Plot second (02)), a shared eQuill Labs footer colophon, a light/dark ("evening garden") theme toggle that persists across all tools and defaults to light when no preference is saved, and shareable state via the URL hash + `localStorage`.
- `src/` source layout with The Companion Bed's plant/companion data and specimen art extracted into `src/_includes/` partials (`companion-planter.data.js`, `companion-planter.art.js`); the tools still open directly from disk and cross-link via relative paths.
- A `build` skill (`.claude/skills/build/`) that mirrors `src/` → `docs/` (the GitHub Pages publish directory) via a zero-dependency Node script (`node .claude/skills/build/scripts/build.mjs`), including `inlineIncludes` / `pruneIncludes` steps that fold the `_includes` partials into each page so the published output stays self-contained HTML.
- `DESIGN.md` design-system source of truth, and `AGENTS.md` + `.agents-docs/` guidance for AI coding agents.

[1.0.0]: https://github.com/jparkerweb/cottage-garden/releases/tag/v1.0.0
