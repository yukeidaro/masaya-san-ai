# MasayaさんAI

GitHub Copilot で動かしている「自作エージェント」の構成と仕事内容を、初心者向けにまとめたスライド（Marp 製）。

## 公開ページ（リンクで共有）

https://yukeidaro.github.io/masaya-san-ai/

## 中身

- `index.html` — そのままブラウザで開けるスライド（Marp で生成）
- `deck.md` — スライドの元原稿（Markdown）

## 編集のしかた

`deck.md` を編集し、以下で再生成して push するだけ:

```bash
npx @marp-team/marp-cli@latest deck.md --html -o index.html
git add -A && git commit -m "update deck" && git push
```
