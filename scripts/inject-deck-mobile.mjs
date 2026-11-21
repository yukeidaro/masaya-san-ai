#!/usr/bin/env node
// Marp が生成した decks/<名前>/index.html に、スマホ用の読み物モード（assets/deck-mobile.js）を差し込む。
// 何度実行しても同じ結果になる（すでに入っていれば何もしない）。
//
// Usage:
//   node scripts/inject-deck-mobile.mjs                 # decks/*/index.html すべて
//   node scripts/inject-deck-mobile.mjs decks/x/index.html [...]
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, sep } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const asset = join(root, "assets", "deck-mobile.js");
const MARKER = "deck-mobile.js";

async function allDecks() {
  const dir = join(root, "decks");
  const out = [];
  for (const name of await readdir(dir)) {
    const file = join(dir, name, "index.html");
    try {
      if ((await stat(file)).isFile()) out.push(file);
    } catch {
      // index.html がまだ無いフォルダは飛ばす
    }
  }
  return out;
}

const targets = process.argv.length > 2 ? process.argv.slice(2).map((p) => join(process.cwd(), p)) : await allDecks();

let changed = 0;
for (const file of targets) {
  let html = await readFile(file, "utf8");
  const before = html;

  // Marp は lang を生成した環境のロケール（"en-US" "C" "POSIX" など）にする。
  // 日本語として扱わせないと、Android などで漢字が中国語の字形で表示されることがある。
  html = html.replace(/<html lang="[^"]*">/, '<html lang="ja">');

  if (!html.includes(MARKER)) {
    if (!html.includes("</head>")) {
      console.error(`! </head> が見つかりません: ${relative(root, file)}`);
      process.exitCode = 1;
      continue;
    }
    const src = relative(dirname(file), asset).split(sep).join("/");
    html = html.replace("</head>", `<script src="${src}"></script></head>`);
  }

  if (html !== before) {
    await writeFile(file, html);
    changed++;
    console.log(`+ ${relative(root, file)}`);
  }
}
console.log(`${changed} file(s) updated, ${targets.length - changed} already up to date.`);
