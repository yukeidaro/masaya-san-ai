#!/usr/bin/env node
// Generates materials.json (search index) from decks/<dir>/deck.md + materials.config.json.
// Usage: node scripts/build-materials.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function stripMarkdown(md) {
  let t = md;
  // remove YAML / Marp front matter and per-slide style blocks
  t = t.replace(/^---[\s\S]*?---/m, " ");
  t = t.replace(/```[\s\S]*?```/g, " ");      // code fences
  t = t.replace(/<!--[\s\S]*?-->/g, " ");     // html comments (marp directives)
  t = t.replace(/<[^>]+>/g, " ");             // html tags
  t = t.replace(/[#>*_`~|-]+/g, " ");         // md symbols
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

const config = JSON.parse(await readFile(join(root, "scripts", "materials.config.json"), "utf8"));

const out = [];
for (const item of config) {
  let text = "";
  try {
    const md = await readFile(join(root, "decks", item.dir, "deck.md"), "utf8");
    text = stripMarkdown(md);
  } catch (e) {
    console.warn(`! could not read deck for ${item.dir}: ${e.message}`);
  }
  out.push({
    date: item.date,
    title: item.title,
    tag: item.tag,
    summary: item.summary,
    url: item.url,
    text,
  });
}

// newest first
out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

await writeFile(join(root, "materials.json"), JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`materials.json written: ${out.length} entries`);
