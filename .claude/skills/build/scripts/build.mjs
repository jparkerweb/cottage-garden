#!/usr/bin/env node
// Build script for The Cottage Garden Companion.
//
// Stages the site source (src/) into the publish directory (docs/, which
// GitHub Pages serves) and produces self-contained .html artifacts.
//
// Source pages may split large blocks (plant data, per-plant SVG art, …) into
// partials under src/_includes/, referenced with real `<script src="_includes/
// …"></script>` tags so the page also runs straight from src/ in dev. The
// `inlineIncludes` step replaces each such tag with the file's contents, and
// `pruneIncludes` then removes _includes from docs/ — so the published output
// is HTML only (plus passthrough files like CNAME), with nothing left to fetch.
//
// The work is an ordered list of STEPS, so a future transform (minify,
// fingerprint assets, inline fonts, emit a sitemap, …) is just another function
// pushed onto the pipeline.
//
// Zero dependencies — Node stdlib only — to honor the repo's no-build ethos.
//
// Usage:  node .claude/skills/build/scripts/build.mjs [--src DIR] [--out DIR]
//                                                     [--root DIR] [--quiet]

import { existsSync, rmSync, mkdirSync, cpSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

// ---------- arg parsing ----------
function parseArgs(argv) {
  const opts = { src: 'src', out: 'docs', root: null, quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--quiet') opts.quiet = true;
    else if (a === '--src') opts.src = argv[++i];
    else if (a === '--out') opts.out = argv[++i];
    else if (a === '--root') opts.root = argv[++i];
    else throw new Error(`unknown argument: ${a}`);
  }
  return opts;
}

// Find the repo root by walking up to the nearest .git, so the build works
// from any working directory — not just the repo root.
function findRepoRoot(start) {
  let dir = resolve(start);
  for (;;) {
    if (existsSync(join(dir, '.git'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null; // hit the filesystem root
    dir = parent;
  }
}

// Recursively list files under a dir, as paths relative to it.
function listFiles(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, base));
    else out.push(relative(base, full));
  }
  return out;
}

// ---------- build steps ----------
// Each step is async (ctx) => void, run in order. ctx = { root, srcDir, outDir, log }.

function cleanOutput({ outDir, log }) {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  log(`clean   ${outDir}`);
}

function copySource({ srcDir, outDir, log }) {
  cpSync(srcDir, outDir, { recursive: true });
  log(`copy    ${srcDir} -> ${outDir}`);
}

// The directory (under src/, mirrored into docs/) holding inline-only partials.
const INCLUDES_DIR = '_includes';

// Inline every `<script src="_includes/…"></script>` in each staged .html with
// the partial's contents, so the page becomes a single self-contained file.
// Indentation of the tag is preserved on the wrapper; the original tag must sit
// alone on its line. Fails loud on a missing partial or an unsafe payload.
function inlineIncludes({ outDir, log }) {
  const tag = /^([ \t]*)<script src="_includes\/([^"]+)"><\/script>[ \t]*$/gm;
  for (const rel of listFiles(outDir)) {
    if (!rel.endsWith('.html')) continue;
    const file = join(outDir, rel);
    let html = readFileSync(file, 'utf8');
    let count = 0;
    html = html.replace(tag, (_m, indent, name) => {
      const partial = join(outDir, INCLUDES_DIR, name);
      if (!existsSync(partial)) throw new Error(`include not found: ${INCLUDES_DIR}/${name} (referenced by ${rel})`);
      const body = readFileSync(partial, 'utf8').replace(/\r?\n$/, '');
      // A literal </script> in the payload would close the wrapper early.
      if (/<\/script>/i.test(body)) throw new Error(`include ${name} contains </script>; cannot inline safely`);
      count++;
      return `${indent}<script>\n${body}\n${indent}</script>`;
    });
    if (count) {
      writeFileSync(file, html);
      log(`inline  ${rel.replace(/\\/g, '/')} (${count} include${count === 1 ? '' : 's'})`);
    }
  }
}

// Remove the now-inlined partials so docs/ ships HTML only (no loose .js to fetch).
function pruneIncludes({ outDir, log }) {
  const dir = join(outDir, INCLUDES_DIR);
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
    log(`prune   ${INCLUDES_DIR}/`);
  }
}

// --- Add future build steps below. Each is `(ctx) => {…}` (sync or async) and
// --- should read/write ctx.outDir (files are already staged there by copySource).
// --- Example:
// async function minifyHtml({ outDir, log }) { … }

const STEPS = [
  cleanOutput,
  copySource,
  inlineIncludes,
  pruneIncludes,
  // minifyHtml,
  // generateSitemap,
];

// ---------- runner ----------
async function main() {
  const opts = parseArgs(process.argv.slice(2));

  const root = resolve(opts.root || findRepoRoot(SCRIPT_DIR) || process.cwd());
  const srcDir = resolve(root, opts.src);
  const outDir = resolve(root, opts.out);

  // A build that silently publishes nothing is worse than no build — fail loud.
  if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) {
    throw new Error(`source directory not found: ${srcDir}`);
  }
  if (listFiles(srcDir).length === 0) {
    throw new Error(`source directory is empty: ${srcDir}`);
  }

  const log = (msg) => { if (!opts.quiet) console.log(`  ${msg}`); };

  console.log(`Building site: ${relative(root, srcDir) || srcDir} -> ${relative(root, outDir) || outDir}`);
  const ctx = { root, srcDir, outDir, log };
  for (const step of STEPS) {
    await step(ctx);
  }

  // Summary — auditable at a glance.
  const files = listFiles(outDir);
  const bytes = files.reduce((n, f) => n + statSync(join(outDir, f)).size, 0);
  console.log(`Done: ${files.length} file${files.length === 1 ? '' : 's'}, ${bytes.toLocaleString()} bytes`);
  for (const f of files.sort()) {
    console.log(`  + ${f.replace(/\\/g, '/')}`);
  }
}

main().catch((err) => {
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
});
