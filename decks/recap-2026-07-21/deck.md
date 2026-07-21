---
marp: true
theme: default
paginate: true
size: 16:9
---

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
</script>

<style>
  .mermaid { display: flex; justify-content: center; }
  section.lead h1 { font-size: 1.9em; }
  table { font-size: 0.8em; }
</style>

<!-- _class: lead -->

# 2026/7/21 ミーティング要約

## AI 活用の環境・スキル・知識管理

Masaya Kokabu × Yu Asano

---

## 今日のテーマ（6 論点）

1. デスク環境・PC 構成の変化
2. AI ツールの使い分け（Codex / Claude / Kimi）
3. 複数アカウント連携の課題と自動化
4. **AI 活用スキルのロードマップ**（本日の中心テーマ）
5. 情報過多への対処（NotebookLM / ライブチャット）
6. Obsidian の構築と情報移行

---

## 1. デスク環境・PC 構成

- **Masaya**: 会社用 PC / Mac / 個人別案件用 PC の複数環境。モニターが 2 画面増え、デスクトップ環境が直近の大きな変化。
- **Yu**: 3 台の PC を運用。**Codex と Claude でプロジェクトを分離**して管理。個人案件は最近 Codex も併用。

<div class="mermaid">
graph LR
  subgraph Masaya
    A[会社用 PC] --- M1[モニター]
    B[Mac] --- M2[モニター]
    C[個人別案件 PC] --- M3[モニター]
  end
  subgraph Yu
    D[PC1: Claude]
    E[PC2: Claude]
    F[PC3: Codex]
  end
</div>

---

## 2. AI ツールの使い分け

| 観点 | Codex | Claude | Kimi |
|------|-------|--------|------|
| トークン上限 | 緩い（有利） | タイト（課金で緩和） | - |
| 向く用途 | プロンプト作成・実行 | 高品質な作業 | 差別化を実感できず |
| 導入ハードル | 低 | 低 | 高（API / Copilot 経由） |

- **Yu の結論**: 上限の緩さから Codex をプロンプト作成・実行に活用。Claude はコスト面が課題。
- **Kimi**: 以前試すも Claude との違いを実感できず、日々のタスクでは使用価値が低い。

---

## 3. 複数アカウント連携の課題

- **Masaya の悩み**: Google アカウントが用途別に分かれ（Tokika とそれ以外）、連携時に手間。
- 現状の共有: Slack 2 アカウント / ドキュメントベース / AirDrop / スクショ貼り付け。
- **具体的な壁**: TLDV が起動アカウントに紐づき、Meta 顧問・顧客との会話を別環境の Claude で整形できなかった。

---

## 3. 解決案：TLDV × Chrome × MCP 自動化

Yu の提案 — API 接続に頼らず、ブラウザ MCP で会議録を自動取り込み。

<div class="mermaid">
flowchart LR
  A[会議終了] --> B[TLDV に議事録生成]
  B --> C[Chrome を対象アカウントで<br/>ログイン維持]
  C --> D[MCP / Chrome DevTools が<br/>TLDV URL を開く]
  D --> E[議事録を自動コピー]
  E --> F[AI へ投入し整形・要約]
</div>

- TLDV はコピー可能な課金プラン。Chrome を該当アカウントでログインしておけば URL 経由で自動処理できる。

---

## 4. AI 活用スキルのロードマップ（本日の中心）

Masaya の要望：AI 活用スキルを **1〜10 のティア**で可視化したい。
「What（何ができるか）」だけでなく「思考の OS（人間側の前提スキル）」も知りたい。

<div class="mermaid">
flowchart TD
  T1["Tier 1-2<br/>単発利用<br/>チャットで質問・下書き"] --> T2["Tier 3<br/>ワークフロー化<br/>ゴール設定・セッション設計"]
  T2 --> T3["Tier 4-5<br/>ブレインの蓄積<br/>自分の知識・型を AI に学習"]
  T3 --> T4["Tier 6-7<br/>自律ドラフト<br/>メール/Teams を自動下書き<br/>人は送信判断のみ"]
  T4 --> T5["Tier 8-10<br/>クラウドエージェント<br/>PC を閉じても自律実行"]
</div>

*ティアは会話中の Yu / Masaya の発言をもとに整理した叩き台（要合意）。*

---

## 4. スキルの「2 軸」構造

<div class="mermaid">
graph TB
  subgraph WHAT["What / How（できること）"]
    W1[ツール操作]
    W2[エージェント運用]
    W3[知識の蓄積・参照]
  end
  subgraph OS["思考の OS（人間側の前提）"]
    O1[ゴール設定力]
    O2[タスク分割・集中]
    O3[マルチタスク管理]
  end
  OS --> WHAT
</div>

- **Yu の指摘**: 「What を知ればできる」ではない。**思考の OS を上げないと上位ティアは"継続的に"再現できない**。
- Masaya の実感: マルチタスク管理力が弱いとスイッチングで非生産的になり、Tier 2→5 に上がれない。

---

## 4. 現状のフェーズと落とし穴

- **Masaya**: Rectangle で画面 4 分割、Claude Code を同時並行。だが AI 活用スキルが追いつかず「生産性が上がっているようで上がっていない」。
  - 全部が中途半端 → 2 時間後に成果が不明。脳のスイッチングコストが 8 分割。
- **Yu のアドバイス**:
  - 能力が高いほどリサーチが深くなりアウトプットまで長期化 → **ゴール設定が最重要**。
  - セッション開始時に `/goal` で「今日はこれをやる」を音声入力で宣言。
  - 8 タスク同時は人間には不可能 → **手元の紙に「この画面で何をやっているか」を書く**。

---

## 4. Yu の到達フェーズ

- **Phase A（今 Masaya がいる所）**: 自分のスキル・型を AI に学ばせて蓄積する段階。
  - 「変な方向の部下」を作らないために**絶対にやるべき**。
- **Phase B（Yu の現状）**: エージェントが自律的に動く段階。
  - Teams・メールは Yu の"ブレイン"を参照し、**見ていなくてもドラフトが完成**している。
  - 人間は**送るか送らないかの判断だけ**を担う。

---

## 5. 情報過多への対処

- **Masaya の課題**: Obsidian の長文を読むのは疲れる。全体設計ドキュメントを前に「見ないと進まない」で **4 時間セッションを放置**した。
- リスク: 人間が情報取得に追いつかず、雑に AI へ OK を出して迷走 or 挫折。

---

## 5. 解決策：耳で処理する情報消費

<div class="mermaid">
flowchart LR
  A[MD ファイル] --> B["NotebookLM に投入<br/>(Chrome DevTools / MCP で自動化)"]
  B --> C[ポッドキャスト生成]
  C --> D[クラウドに保存]
  D --> E["スマホで散歩中に<br/>要約・Q&A で聴く"]
</div>

- **Yu**: セッション内で「Notebook」と言うとスキルが起動し、MD → ポッドキャスト化まで自動。量も調整可能。
- **Masaya**: GPT ライブチャットを移動中にループ利用。運転しながら会話でアジェンダを作る体験が非常に良かった。

---

## 6. Obsidian の構築と情報移行

- Masaya は Tokika（会社側）PC でも Obsidian を構築開始。
- **やりたいこと**: 個人用 Obsidian から他事業の情報を除き、必要部分だけ移行したい。
- **Yu**: Obsidian はローカルファイルを開いているだけ → **移行はファイル移動と同じで一瞬**。マスター側の情報を分離できれば早い。

---

## ネクストアクション（叩き台）

- [ ] セッション開始時に `/goal` で目的を宣言する習慣（Masaya）
- [ ] 「この画面で何をやるか」を紙に書く運用を試す（Masaya）
- [ ] TLDV × Chrome × MCP の会議録自動取り込みを検証（Yu 提案）
- [ ] MD → NotebookLM ポッドキャスト化を移動時間に活用
- [ ] AI 活用スキル ティア表を正式版として合意・肉付け
- [ ] Obsidian を事業ごとに分離して Tokika PC へ移行

---

<!-- _class: lead -->

# まとめ

**環境**は整った。次の伸びしろは **AI 活用スキル（What）× 思考の OS（人間側）** の両輪。

ゴール設定と知識の蓄積で **Phase A → Phase B（自律エージェント）** へ。
