# MasayaさんAI勉強ノート

AI / Claude Code 学習の勉強ノート（静的サイト・GitHub Pages 無料）。
トップに Next Action とAI活用スキル・ロードマップ、その下に検索・日付で探せる資料一覧、最後に自由メモ欄。

## 公開ページ
https://yukeidaro.github.io/masaya-san-ai/

## 構成
```
index.html                       <- トップ（Next Action / ロードマップ / 資料一覧 / メモ）
roadmap.json                     <- AI活用Tier 1〜11と用語解説
prompts.json                     <- プロンプト集（コピー可能な本文）
skills/<名前>/SKILL.md           <- Claude Code 用スキル本体（プロンプト集にも掲載）
materials.json                   <- 資料の検索インデックス（自動生成・コミットする）
scripts/
  materials.config.json          <- 資料の一覧定義（日付・タイトル・要約・URL）
  build-materials.mjs            <- deck.md から materials.json を生成
decks/
  <名前>/ index.html / deck.md   <- 各資料（Marp 生成）
```
各 deck.md は Markdown なので GitHub 上でもそのまま閲覧できます。

## 新しい資料を追加する手順
1. `decks/<名前>/` を作り `deck.md` を置く
2. `npx @marp-team/marp-cli@latest deck.md --html -o index.html`
3. `scripts/materials.config.json` に1件追加（dir / date / title / tag / summary / url）。**date（作成日）は必須**
4. インデックス再生成：`node scripts/build-materials.mjs`
5. `git add -A; git commit -m "add <タイトル>"; git push`

## 週次レビューへのレコメンド（自動）
毎週木曜17時頃に届く「Claude Code週次レビュー」メールに対し、Yu からのレコメンドを下書きする仕組み。
- **Claude（定期タスク・木/金 18:30）**：Gmail からレビューを取得 → `_proposals/weekly-advice/<日付>/weekly-review.md` に保存 → 下のスクリプトを起動 → 結果を Gmail 下書きに（送信は Yu が手動）。
- **GitHub Copilot CLI**（`automation/weekly-advice/run.ps1`）：調査（Web検索で30日以内の時事）→ 執筆 → 批判エージェント → 修正 を最大3周。
- 判断基準は `automation/weekly-advice/prompts/`。リポジトリ直下に `principles.md` を置くと最優先の「基本的な考え方」として読まれる。
- `_proposals/` は gitignore 済み（レビューに事業情報が含まれるため公開しない）。
- 手動実行：`pwsh automation/weekly-advice/run.ps1 -Dir _proposals/weekly-advice/<日付>`

## 自由メモの中央保存（無料・任意）
- 既定ではメモは閲覧者の **ブラウザ内（localStorage）** に日時付きで保存されます。
- Yu も閲覧できる中央保存にするには、無料の **Web3Forms** アクセスキーを取得し、
  `index.html` の `WEB3FORMS_KEY` に設定してください（公開キーなので公開リポジトリでも安全）。
- キー設定後は、保存時にメモが Yu に届きます（有料要素なし）。
