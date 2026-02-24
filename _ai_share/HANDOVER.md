# プロジェクト引継ぎ資料（HANDOVER）
**最終更新: 2026-02-24**

このドキュメントは、本ポートフォリオ制作プロジェクトの現状・思想・構造を、ChatGPT等の外部AIが**即座に実務に着手できる**レベルで共有するためのものです。

---

## ① プロジェクト概要

| 項目 | 内容 |
|---|---|
| 目的 | サイバーエージェント（CA）内定獲得用ポートフォリオ |
| ターゲット | CA採用担当・AI広告チーム |
| 公開先 | GitHub Pages（mainブランチ自動デプロイ） |
| リポジトリ | raika620uta/ca_portfolio |

---

## ② コアコンセプト（最重要）

- **AIガチャからの脱却**: AIを運任せの生成ツールとして使わず、制御可能な「素材生成器」として定義する
- **フローとしてのAI**: 個別のAI生成物ではなく、AIを組み込んだ「制作パイプライン（仕組み）」そのものを提示する
- **AI×AEの住み分け**:
  - AI → 構成・シナリオ・生素材（映像・静止画）の生成
  - After Effects → 最終レイアウト・文字デザイン・リズムの担保
- **再現性・量産前提**: 1本が偶然できるのではなく、100本を同じ質で作れる構造であることを示す

---

## ③ 現在のセクション構成（Top to Bottom）

```
1. profile-intro    id="intro"        自己紹介（プロフ画像・名前・できること一覧）
2. philosophy-bridge id="bridge"      クッション思想セクション（AIガチャへの導線）
3. hero-simple      id="hero"         メインキャッチコピー（AIガチャからの脱却。）
4. content-bridge   id="workflow"     WORK-FLOW 見出し
5. wide-image       id="process-diagram" 制作フロー図
6. content-bridge   id="tools"        TOOLS 見出し
7. wide-image       id="tools-diagram"   ツール概要図
8. content-bridge   id="cases"        CASES 見出し
9. case-detailed    id="case01"       TikTok縦型動画（就活コミュニティ）
10. case-detailed   id="case03"       TOYOTA北山区（Remotion自動化）
11. other-works-categorized id="other-works" その他制作物（映像/UI/グラフィック/システム）
12. contact         id="contact"      コンタクト
```

---

## ④ ナビゲーション（固定8項目）

| 表示ラベル | リンク先ID |
|---|---|
| イントロ | #intro |
| スタンス | #hero |
| ワークフロー | #workflow |
| プロセス | #process-diagram |
| 事例 | #cases |
| 縦型動画制作 | #case01 |
| 自動化事例 | #case03 |
| これまでの制作 | #other-works |

---

## ⑤ アーキテクチャ

### ファイル構成
```
ca-portfolio/
├── index.html          HTMLシェル（中身はすべてJSで生成）
├── data/
│   └── page-main.js    コンテンツの唯一の管理元（ここだけ編集すれば更新できる）
├── engine/
│   ├── renderer.js     データを読んでDOMを生成するエンジン
│   └── style.css       全スタイル定義
└── assets/
    ├── common/         プロフィール画像
    ├── cases/          案件ごとの動画・画像
    └── other/          その他制作物
```

### 動作原理
1. `index.html` が `data/page-main.js` と `engine/renderer.js` を読み込む
2. `renderer.js` が `SITE.sections` 配列を走査し、各 `type` に対応する `renderers["..."]` 関数でHTMLを生成
3. 生成されたHTMLを `<main id="site-main">` に挿入

### 新セクション追加の最短手順
```js
// data/page-main.js の sections 配列に追加するだけ
{ type: "セクションタイプ", id: "ユニークid", ... }
```

---

## ⑥ 実装済みUI機能

| 機能 | 実装状況 |
|---|---|
| ナビバー（固定8項目・スムーズスクロール） | ✅ 実装済 |
| ナビのアクティブハイライト（IntersectionObserver） | ✅ 実装済 |
| 縦型動画（9:16）自動再生・スクロール連動 | ✅ 実装済 |
| フェードインアニメーション（.js-reveal） | ✅ 実装済 |
| ヒーロー上の補助導線テキスト | ✅ 実装済 |
| レスポンシブ対応 | ✅ 実装済 |

---

## ⑦ デザインルール（絶対に守ること）

- `.container` の `max-width`（900px）と `padding` は変更しない
- `Hero` の `font-size: clamp(48px, 8vw, 88px)` など `clamp()` 値は手動ピクセル指定で上書きしない
- 装飾（影・グラデーション・過剰アニメーション）は追加しない
- `data/page-main.js` のテキストは指定通りに入れる（言い換えない）
- `nl2br(esc(text))` を使うと改行が `<br>` に変換される（bodyテキストに使用）

---

## ⑧ 禁止事項

- `.container` のグローバル再設計
- `hero-simple` のレイアウト構造変更
- jQuery等の外部ライブラリ追加
- 「良かれと思った」フォント・色・行間の勝手な変更
- セクション順序の無断変更

---

## ⑨ 現在の優先課題

1. **Other Works のアセット差し替え**: プレースホルダー画像を実作品に置き換える
2. **case01 の詳細コンテンツ充実**: AEタイムライン画像・制作フロー説明文の精度向上
3. **デザインの微調整**: ユーザーからフィードバックがあれば随時対応

---

## ⑩ 最新コミット

```
feat: bridge セクション刷新（シアンバー・中央寄せ・確定テキスト）+ Hero コピー更新
feat: ナビ固定マップ換装・Hero上の導線テキスト追加・アクティブハイライト実装
feat: philosophy-bridge セクション追加（動線クッション + js-reveal）
```

---

以上。次のAIへ：**`_ai_share/` フォルダ内のファイルが最新版です。必ず `page-main.js` → `renderer.js` → `style.css` の順に読んでから作業を開始してください。**