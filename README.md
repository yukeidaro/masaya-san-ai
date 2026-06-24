# MasayaさんAI

GitHub Copilot を使った AI エージェント活用の **解説資料・デックのキュレーションサイト**。
トップページから各資料へリンクで飛べます。資料はここに追加していきます。

## 公開ページ（リンクで共有）

https://yukeidaro.github.io/masaya-san-ai/

## 構成

```
index.html                        <- トップ（キュレーション一覧ページ）
decks/
  copilot-agents/
    index.html                    <- デック本体（Marp で生成）
    deck.md                       <- デックの元原稿（Markdown）
```

## 新しい資料（デック）の追加手順

1. `decks/<新しい名前>/` フォルダを作る
2. その中に `deck.md` を置き、HTML を生成する:
   `npx @marp-team/marp-cli@latest deck.md --html -o index.html`
3. トップの `index.html` に、カードを1つ追加してリンクを張る
4. push する:
   `git add -A; git commit -m "add ..."; git push`

数十秒～数分で公開ページに反映されます。
