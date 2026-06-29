---
name: build
description: Build/publish The Cottage Garden Companion site by mirroring ./src into ./docs (the GitHub Pages publish directory). Use this whenever the user wants to build the site, (re)generate or refresh ./docs, publish or deploy the pages, prepare for GitHub Pages, or stage the HTML tools for release — even when they just say "build it", "rebuild docs", or "update the published site". It runs a zero-dependency Node script and is the single place any future build step (minification, asset processing, sitemap) gets added.
---

# Build

This repo is a suite of self-contained, single-file HTML tools. The **source of truth lives in `./src/`**; the **published site lives in `./docs/`** (GitHub Pages serves from `docs/` on the default branch). "Building" stages the source into `docs/` so what ships is a deliberate, reproducible artifact rather than the working tree.

Right now the build is a **verbatim mirror** — each tool is already a complete `.html` file, so there is nothing to compile. The value of having a build step anyway is twofold: `docs/` is always a clean, fully-regenerated copy (no stale files linger), and there is one obvious place to add real transforms later without touching anything else.

## Run the build

From the repo root:

```bash
node .claude/skills/build/scripts/build.mjs
```

The script finds the repo root itself (it walks up to the nearest `.git`), so it also works from any subdirectory. It will:

1. Verify `./src/` exists and is non-empty (fails loudly otherwise — a build that silently publishes nothing is worse than no build).
2. **Clean** `./docs/` completely, then recreate it — this is what guarantees no orphaned files survive a rename or delete in `src/`.
3. **Copy** everything under `./src/` into `./docs/` verbatim, preserving the directory layout.
4. Print a summary (file count + total bytes) so the result is auditable at a glance.

Optional flags: `--src <dir>`, `--out <dir>`, `--root <dir>` to override defaults, and `--quiet` to suppress the per-file log.

## After building

Verify the result before treating it as published:

- The summary should list the three tools (`index.html`, `fertilizer.html`, `companion-planter.html`) plus any new assets.
- The cross-tool nav and the companion→fertilizer deep-link use **relative** paths, so they keep working as long as the tools stay siblings inside `docs/` — which the mirror preserves. A quick open of `docs/index.html` confirms the nav still lands correctly.
- `docs/` is committed (GitHub Pages publishes from it); commit the regenerated output alongside the `src/` change that prompted the rebuild.

## Adding a real build step later

The script is intentionally a small **ordered pipeline** so growth is additive. Each step is a function `async (ctx) => {…}` receiving `ctx = { root, srcDir, outDir, log }`, and they run in order against the already-cleaned `docs/`.

To add a transform (e.g. minify HTML, fingerprint assets, inline fonts, emit a sitemap):

1. Write the step function near the other steps in `scripts/build.mjs`.
2. Add it to the `STEPS` array — typically **after** `copySource`, so it operates on files already staged in `docs/`.
3. If it needs a third-party tool, that's the moment to introduce a `package.json`; until then the build stays dependency-free, matching the project's no-build ethos. Note the new dependency in the repo docs when you do.

Keep steps pure and independent where possible — a step should read `ctx.outDir`, do its thing, and not assume another step ran first beyond the ordering you declare. That keeps the pipeline easy to reason about as it grows.
