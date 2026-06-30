# 🌿 The Cottage Garden Companion

<img src="https://raw.githubusercontent.com/jparkerweb/cottage-garden/refs/heads/main/cottage-garden.jpg" alt="banner" style="max-height:400px">

A small, growing toolbox of plain-spoken helpers for the home gardener — *feed your beds, pair your plants, and tend a cottage border with a little more confidence.*

Every tool is a **self-contained, single-file HTML page** dressed as a pressed-herbarium specimen sheet: warm recycled-paper surfaces, deep botanical ink, and an old-press serif over a clean grotesque. There is **no build system, no dependencies, and no backend** — each tool is one `.html` file that opens directly from disk.

---

## The collection

| Tool | File | What it does |
|---|---|---|
| **The Cottage Garden Companion** | [`src/index.html`](src/index.html) | Landing/hub page linking the collection. |
| **The Fertilizer Plot** | [`src/fertilizer.html`](src/fertilizer.html) | Turns any **N–P–K** ratio into a generative, hand-drawn plant, then works out feed dose, timing and cost. |
| **The Companion Bed** | [`src/companion-planter.html`](src/companion-planter.html) | **130+ plants** with ranked companion + "keep apart" relationships, and why each pair works — deep-links a recommended feed straight into the Fertilizer Plot. |

More tools are *taking root* (a sowing calendar, a watering guide, and more to come).

---

## Getting started

There is nothing to install. Pick whichever suits you:

- **Open directly** — double-click `src/index.html`, or open `file:///…/src/index.html` in any modern browser. The pages are designed to work fully from `file://`.
- **Serve the folder** (only if a browser blocks something over `file://`) — any static server works:

  ```bash
  npx serve src
  # or
  npx serve docs   # the built/published copy
  ```

  Then visit the page in your browser.

The **only** network request is the Google Fonts `<link>` (Fraunces + Hanken Grotesk); everything else — logic, data, and SVG artwork — is inline. Offline, the pages still work with fallback fonts.

---

## How it's built

Each tool is one `.html` file holding its markup, `<style>`, a vanilla-JS IIFE, and its own embedded dataset. Inside the IIFE, every tool follows the same data-driven shape:

> **Data → Derive (pure) → Render → State / Wiring**, with a single top-level `render()` per state change.

- **No framework, no reactive store** — just plain functions and one `state` object.
- **ES5-friendly vanilla JS** — `"use strict"`, `var`, classic `function` declarations.
- **Plain CSS** with custom properties and `clamp()` for fluid sizing; no preprocessor, no utility framework.
- **Inline SVG** for all graphics (no image assets).
- **State is shareable** — selections round-trip through the URL hash + `localStorage`, so a copied link restores the same view. Dark mode chosen in any tool carries across all of them.

There is no shared stylesheet or script: the design tokens, the cross-tool nav, and the theme logic are **duplicated verbatim** in each file by design. When you change shared chrome, change it in **every** file.

The tool sources live in [`src/`](src). There is still no compile step — the "build" simply mirrors `src/` into [`docs/`](docs), the folder GitHub Pages publishes:

```bash
node .claude/skills/build/scripts/build.mjs
```

This regenerates `docs/` from scratch each time, so it never holds stale files. (The pipeline is structured so a real transform — minification, asset processing — can be slotted in later without reworking it.)

See [`AGENTS.md`](AGENTS.md) and the [`.agents-docs/`](.agents-docs) folder for the full architecture, conventions, and coupling contracts.

---

## Design

The aesthetic is **flat and paper-first**, keyed to the three garden nutrients the tools teach:

- **Nitrogen** — leaf green
- **Phosphorus** — bloom pink
- **Potassium** — vigour gold

…the only saturated colour in an otherwise muted palette. Type is set in **Fraunces** (italic display serif) over **Hanken Grotesk** (UI), with a full light/dark ("evening garden") token set.

[`DESIGN.md`](DESIGN.md) is the canonical design-system source of truth.

---

## Verifying changes

There's no automated test step — verification is a manual smoke-check. After any change, confirm:

- **No console errors** on load or interaction.
- **Light + dark parity** — toggle the theme; both must read correctly.
- **Responsive** — exercise desktop, tablet, and the narrow mobile breakpoints (grids collapse around 860 / 620 / 430px).
- **Keyboard operable** — visible focus rings, list/option keyboard nav, no focus traps.
- **Reduced motion respected** — `prefers-reduced-motion` disables transforms/animation.
- **State round-trips** — change selections, copy the link, reload; the state restores (a stale/invalid id falls back to the default).
- **Cross-tool links** — the shared nav and the *"Feed this →"* deep-link land on the right page with the right preset preloaded.

---

## A friendly note

Gardening lore varies by soil, season and source, so treat each tool as a good starting point, not a rule.

— *from soil to bloom* 🌱

---

## License

Licensed under the [Apache License 2.0](LICENSE).
