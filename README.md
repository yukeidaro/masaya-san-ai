# MasayaさんAI

GitHub Copilot / Claude Code を使った AI エージェント活用の **学習ハブ**（Anthropic Learn 風デザイン）。
トップに「前回の振り返り」「Next Action」「資料一覧」をまとめ、リンクで共有できます。

## 公開ページ

https://yukeidaro.github.io/masaya-san-ai/

## 構成

```
index.html                      <- トップ（学習ハブ：振り返り / Next Action / 資料）
decks/
  kickoff-recap/                <- キックオフ振り返りデック（2026-06-16）
    index.html / deck.md
  copilot-agents/               <- AIエージェント構成デック
    index.html / deck.md
```

## 新しい資料（デック）の追加

1. `decks/<名前>/` を作り `deck.md` を置く
2. `npx @marp-team/marp-cli@latest deck.md --html -o index.html`
3. トップ `index.html` の gallery にカードを1枚追加
4. `git add -A; git commit -m "add ..."; git push`
