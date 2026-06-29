# Changelog

All notable changes to **The Cottage Garden Companion** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Moved the tool sources into `src/` (`src/index.html`, `src/fertilizer.html`, `src/companion-planter.html`). The tools still open directly from disk and cross-link via relative paths.

### Added

- A `build` skill (`.claude/skills/build/`) that mirrors `src/` → `docs/`, the GitHub Pages publish directory. It is a zero-dependency Node script (`node .claude/skills/build/scripts/build.mjs`) that cleans and regenerates `docs/` on each run, structured as a step pipeline so future transforms can be added without reworking it.

## [1.0.0] — 2026-06-28

### Added

- **The Cottage Garden Companion** (`index.html`) — landing/hub page linking the collection, with the specimen-plate tool grid.
- **The Fertilizer Plot** (`fertilizer.html`) — turns any N–P–K ratio into a generative hand-drawn plant, then calculates feed dose, timing and cost; six named feed presets.
- **The Companion Bed** (`companion-planter.html`) — 75+ plants with ranked companion and "keep apart" relationships, a reason taxonomy explaining why each pair works, search and category filters, and a "Feed this →" deep-link into the Fertilizer Plot.
- Shared cross-tool nav, light/dark ("evening garden") theme toggle persisted across all tools, and shareable state via the URL hash + `localStorage`.
- `DESIGN.md` design-system source of truth, and `AGENTS.md` + `.agents-docs/` guidance for AI coding agents.

[Unreleased]: https://github.com/jparkerweb/cottage-garden/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/jparkerweb/cottage-garden/releases/tag/v1.0.0
