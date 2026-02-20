# CAポートフォリオ 現状レポート

**作成日時**: 2026-02-20  
**対象ファイル**: `data/page-main.js` / `engine/renderer.js` / `data/site.js`  
**目的**: 現在のCAポートフォリオの「構造」と「文章」を正確に書き出す（ChatGPT共有用）  

---

## ① セクション構成（PAGE.sectionsの順番通り）

`data/page-main.js` の `PAGE.sections` 配列に定義された順序：

| 順番 | type | id | title |
|------|------|----|-------|
| 1 | `hero-simple` | （なし） | （なし） |
| 2 | `content` | `context` | `Context` |
| 3 | `workflow` | `workflow` | `Workflow` |
| 4 | `case-detailed` | `case01` | `就活コミュニティ` |
| 5 | `case-standard` | `case02` | `マウスメーカー` |
| 6 | `case-standard` | `case03` | `TOYOTA 北山区` |
| 7 | `other-works-categorized` | `other-works` | `Other Works` |
| 8 | `contact` | `contact` | （なし） |

---

## ② 各セクションの文章（表示されるテキストをそのまま抽出）

### セクション1: hero-simple

**tagline:**
```
少人数で、
縦型動画を量産する必要がありました。
```

**paragraphs[0]:**
```
時間も、クレジットも限られている。
それでも、スクロールに耐えられる質は落とせない。
```

**paragraphs[1]:**
```
その中で、
AIをどう使えば、再現性を持って制作を回せるのか。
その試行錯誤をまとめています。
```

---

### セクション2: content（id: context）

**title:** `Context`

**paragraphs（順番通り）:**
1. `現在、学生3人で縦型コンテンツの制作を行っています。`
2. `新しいアプリ内で公開される動画のため、高速スクロール環境に耐えるフックと、一定の制作本数が同時に求められます。`
3. `制作時間も限られています。クレジットも無限ではありません。`
4. `その制約の中で、AIを"生成ツール"としてではなく、制作工程の一部として扱えないかと考えました。`

---

### セクション3: workflow（id: workflow）

**title:** `Workflow`  
**lead:** `再現性を持たせるための制作フロー`  
**intro:** `AIを使えば映像は作れます。でも、それだけでは安定しません。`

**steps:**

| 順番 | label | text |
|------|-------|------|
| 1 | 仮説設計 | フック・訴求の整理 |
| 2 | 構図・動線 | 3Dで整理 |
| 3 | AI素材生成 | （空文字列） |
| 4 | 素材の分解・選定 | （空文字列） |
| 5 | AE再設計 | （空文字列） |
| 6 | 改善ログ | FAILMAP |

**note:** `ガチャ的な生成に頼らず、構造を持った制作を目指しています。`

---

### セクション4: case-detailed（id: case01）

**number:** `01`  
**title:** `就活コミュニティ`  
**description:**
```
28卒向け就活コミュニティの募集動画。

不安ではなく「得られるもの」にフォーカスし、ベネフィット型のフックを設計しました。
```

**final（最終動画）:**
- type: `video`
- src: `assets/cases/case01/CASE01_FINAL.mp4`
- label: `最終動画`

**hooks（フック比較）:**
- title: `フック比較（5バリエーション）`
- items:

| 順番 | src | type | intent |
|------|-----|------|--------|
| 1 | `assets/cases/case01/CASE01_HOOK_01.mp4` | FOMO型 | 「逃すと損」という不安を刺激 |
| 2 | `assets/cases/case01/CASE01_HOOK_02.mp4` | UGC型 | 実際の利用者の声を前面に |
| 3 | `assets/cases/case01/CASE01_HOOK_03.mp4` | ベネフィット型 | 得られる価値を明示 |
| 4 | `assets/cases/case01/CASE01_HOOK_04.mp4` | 権威型 | 信頼性を前面に |
| 5 | `assets/cases/case01/CASE01_HOOK_05.mp4` | 疑問型 | 問いかけで興味を引く |

- decision: `UGC型を採用`
- reason: `実際の利用者の声が最も信頼性が高く、スクロール環境でも止まりやすいと判断しました。`

**storyboard（俯瞰ストーリーボード）:**
- title: `俯瞰ストーリーボード`
- items:

| 順番 | src | label |
|------|-----|-------|
| 1 | `assets/cases/case01/CASE01_STORYBOARD_01.png` | STORYBOARD_01 |
| 2 | `assets/cases/case01/CASE01_STORYBOARD_02.png` | STORYBOARD_02 |
| 3 | `assets/cases/case01/CASE01_STORYBOARD_03.png` | STORYBOARD_03 |
| 4 | `assets/cases/case01/CASE01_STORYBOARD_04.png` | STORYBOARD_04 |
| 5 | `assets/cases/case01/CASE01_STORYBOARD_05.png` | STORYBOARD_05 |
| 6 | `assets/cases/case01/CASE01_STORYBOARD_06.png` | STORYBOARD_06 |

**blocking（ブロッキング/構図証明）:**
- title: `ブロッキング/構図証明`
- items:

| 順番 | src | label |
|------|-----|-------|
| 1 | `assets/cases/case01/CASE01_BLOCKING_01.png` | BLOCKING_01 |
| 2 | `assets/cases/case01/CASE01_BLOCKING_02.png` | BLOCKING_02 |
| 3 | `assets/cases/case01/CASE01_BLOCKING_03.png` | BLOCKING_03 |

**startframes（スタートフレーム定義）:**
- title: `スタートフレーム定義`
- items:

| 順番 | src | label |
|------|-----|-------|
| 1 | `assets/cases/case01/CASE01_STARTFRAME_01.png` | STARTFRAME_01 |
| 2 | `assets/cases/case01/CASE01_STARTFRAME_02.png` | STARTFRAME_02 |
| 3 | `assets/cases/case01/CASE01_STARTFRAME_03.png` | STARTFRAME_03 |

**charRef（キャラクター参考）:**
- title: `キャラクター参考`
- src: `assets/cases/case01/CASE01_CHAR_REF.png`
- label: `CHAR_REF`

**aeTimeline（AE仕上げ証明）:**
- title: `AE仕上げ証明`
- src: `assets/cases/case01/CASE01_AE_TIMELINE.png`
- label: `AE_TIMELINE`

**details（詳細ドロップダウン）:**
- title: `詳細プロセスノート`
- content:
```
フック設計では、5つのパターンを比較検証しました。FOMO型は不安を刺激しますが、ネガティブな印象を与える可能性があります。UGC型は実際の利用者の声を前面に出すことで、信頼性と親近感を両立できると判断しました。

構図設計では、3Dブロッキングで動線を事前に整理し、AI生成時の偶然性を減らしています。スタートフレームを明確に定義することで、生成結果の一貫性を高めました。

AE仕上げでは、AI素材をそのまま使うのではなく、タイミング調整、色補正、モーショングラフィックスの追加を行い、完成度を高めています。
```

---

### セクション5: case-standard（id: case02）

**number:** `02`  
**title:** `マウスメーカー`  
**description:**
```
プロダクト広告を想定した映像。

クロマキー背景で生成した動きをAfter Effects上で抜き、ダイナミックなモーションに再構築しています。
```

**media:**

| 順番 | type | src | label |
|------|------|-----|-------|
| 1 | video | `assets/cases/case02/CASE02_FINAL.mp4` | 最終動画 |
| 2 | video | `assets/cases/case02/CASE02_AI_ASSET_01.mp4` | AI素材 |
| 3 | image | `assets/cases/case02/CASE02_AE_TIMELINE.png` | AEタイムライン |

**details:**
- title: `制作ブレイクダウン`
- content:
```
AI生成時にクロマキー背景（グリーンバック）を指定し、動きのある素材を生成。After Effectsでクロマキー合成を行い、背景を抜き出しました。

抜き出した素材に対して、カメラワーク、パーティクル、グローエフェクトを追加し、ダイナミックなモーションに仕上げています。AI素材をそのまま使うのではなく、AEでの再設計が重要です。
```

---

### セクション6: case-standard（id: case03）

**number:** `03`  
**title:** `TOYOTA 北山区`  
**description:**
```
TOYOTAインターンで制作した、京都市北山区店舗のPR映像。

実際に公開されているアプリ内で使用されています。学生3人で、量と質を同時に求められる環境で制作を行いました。
```

**media:**

| 順番 | type | src | label |
|------|------|-----|-------|
| 1 | video | `assets/cases/case03/CASE03_FINAL.mp4` | 最終動画 |
| 2 | image | `assets/cases/case03/CASE03_APP_LINK.png` | アプリ/プロジェクトリンク |
| 3 | image | `assets/cases/case03/CASE03_REMOTION_UI.png` | Remotion UI |
| 4 | image | `assets/cases/case03/CASE03_AE_TEMPLATE.png` | AEテンプレート |
| 5 | image | `assets/cases/case03/CASE03_AUTO_CAPTION_EXAMPLE.png` | 自動字幕例 |

**details:**
- title: `自動化の必要性`
- content:
```
90本以上の動画を、学生3人で制作する必要がありました。手作業では到底間に合いません。

Remotion（React + TypeScript）を使用し、データ駆動型の動画生成システムを構築。AEテンプレートと組み合わせることで、データを入力するだけで動画が生成される仕組みを作りました。

自動字幕生成、タイミング調整、エクスポートまでを自動化し、制作時間を大幅に短縮しています。
```

---

### セクション7: other-works-categorized（id: other-works）

**title:** `Other Works`  
**intro:** `現在はAI広告制作にフォーカスしていますが、UI/UX、モーショングラフィックス、システム設計なども行っています。`

**categories:**

#### カテゴリ1: Video / Motion（id: video）

| 順番 | type | src | label |
|------|------|-----|-------|
| 1 | video | `assets/other/video/OTHER_VIDEO_01.mp4` | VIDEO_01 |
| 2 | video | `assets/other/video/OTHER_VIDEO_02.mp4` | VIDEO_02 |
| 3 | video | `assets/other/video/OTHER_VIDEO_03.mp4` | VIDEO_03 |
| 4 | video | `assets/other/video/OTHER_VIDEO_04.mp4` | VIDEO_04 |

#### カテゴリ2: UI / Graphic（id: ui）

| 順番 | type | src | label |
|------|------|-----|-------|
| 1 | image | `assets/other/ui/OTHER_UI_01.png` | UI_01 |
| 2 | image | `assets/other/ui/OTHER_UI_02.png` | UI_02 |
| 3 | image | `assets/other/ui/OTHER_UI_03.png` | UI_03 |
| 4 | image | `assets/other/ui/OTHER_UI_04.png` | UI_04 |

#### カテゴリ3: Apps / Systems（id: system）

| 順番 | type | src | label |
|------|------|-----|-------|
| 1 | image | `assets/other/system/OTHER_SYS_01.png` | SYS_01 |
| 2 | image | `assets/other/system/OTHER_SYS_02.png` | SYS_02 |
| 3 | image | `assets/other/system/OTHER_SYS_03.png` | SYS_03 |
| 4 | image | `assets/other/system/OTHER_SYS_04.png` | SYS_04 |

---

### セクション8: contact（id: contact）

- `page-main.js`にはtype: `contact`とid: `contact`のみ定義
- テキスト・タイトルは`page-main.js`には存在しない
- 表示内容は`renderer.js`のcontactレンダラーが`SITE.profile`から動的に生成（後述）

---

## ③ UI構造の説明

### ヘッダー（renderer.js renderHeader関数, L28-52）

`SITE.profile`から以下を表示：
- 固定テキスト: `PORTFOLIO`（h1）
- 固定テキスト: `AI Team向け`
- `SITE.profile.name` → 現在の値: `名前（仮）`
- `SITE.profile.affiliation` → 現在の値: `○○大学 ○○学部 ○年`
- `Mail: ${SITE.profile.email}` → 現在の値: `Mail: example@example.com`
- `Last Updated: ${new Date().toISOString().slice(0, 10)}` → アクセス日を自動表示

### ナビゲーション（renderer.js renderNav関数, L54-70）

- `PAGE.sections`のうち、`id`を持ち、かつ`type`が`hero-simple`と`contact`以外のセクションをナビリンクとして表示
- 現在のナビリンク: `Context` / `Workflow` / `Case01`（就活コミュニティ） / `Case02`（マウスメーカー） / `Case03`（TOYOTA 北山区） / `Other Works`
- IntersectionObserverによる現在地ハイライト（`.is-active`クラス切替）
- rootMarginに`--nav-height` CSS変数を使用（デフォルト: `44px`）

### 横スクロール（horizontal-scroll / hscroll）

以下の場所で使用：

1. **Case01 フック比較** — `.horizontal-scroll.hscroll`コンテナ内に`.hook-tile`を横並び
   - 各タイルは動画（`data-src`遅延読み込み）＋プレースホルダー＋type＋intent
2. **Case01 ストーリーボード** — `.horizontal-scroll.hscroll`コンテナ内に`.gallery-item`を横並び
   - 各アイテムは画像（`data-src`遅延読み込み）＋プレースホルダー

**ドラッグスクロール機能（L810-860）:**
- `.hscroll`クラスを持つコンテナすべてにpointerイベントでドラッグスクロールを実装
- スクロール速度倍率: `1.5`
- ドラッグ判定しきい値: `5px`
- リンク・ボタンのクリックは除外

### ギャラリー表示方式

| 表示形式 | CSSクラス | 使用箇所 |
|----------|-----------|----------|
| 横スクロール | `.horizontal-scroll.hscroll` | Case01 hooks, Case01 storyboard |
| グリッド | `.gallery-grid` | Case01 blocking, Case01 startframes |
| 単一画像 | `.single-media` | Case01 charRef, Case01 aeTimeline |
| ケースメディアグリッド | `.case-media-grid` | Case02, Case03 |
| Other Worksグリッド | `.other-works__grid` | Other Works各カテゴリ |

### 動画の表示方式

**1. `data-src` 遅延読み込み（renderer.js L668-703）:**
- すべての動画・画像は`src`ではなく`data-src`属性で定義される
- ロード時にテスト用videoまたはImageオブジェクトを使ってファイルの存在を確認
- 成功時: `item.src = src` → `item.style.display = 'block'` → プレースホルダーを非表示
- 失敗時: `item.style.display = 'none'`（プレースホルダーは表示されたまま）

**2. IntersectionObserver遅延読み込み（renderer.js L732-752）:**
- しきい値: `0.25`（25%表示時に読み込み）
- ビューポート外に出ると自動pause
- IO非対応ブラウザ: click-to-load

**3. エラーハンドリング（renderer.js L716-730）:**
- 動画読み込み失敗時、videoタグを`<a class="video-error">`に差し替え
- テキスト: `動画を開けませんでした（ファイル名）タップで直接開く →`

### プレースホルダーの挙動

- メディア（動画・画像）の直後に`<div class="media-placeholder">`が配置される
- プレースホルダーのテキスト内容:
  - hooks: フックのtype（例: `FOMO型`、`UGC型`）
  - storyboard / blocking / startframes: itemのlabel（例: `STORYBOARD_01`）
  - charRef / aeTimeline: itemのlabel（例: `CHAR_REF`、`AE_TIMELINE`）
  - Case02/03 video: labelまたは`VIDEO`
  - Case02/03 image: labelまたは`IMAGE`
  - Other Works video: labelまたは`VIDEO`（`media-placeholder--vertical`クラス付与）
  - Other Works image: labelまたは`IMAGE`
- メディアの読み込みが成功すると`placeholder.style.display = 'none'`で非表示
- 読み込み失敗時はプレースホルダーが表示され続ける

---

## ④ Case01の詳細構造

### レンダリング順序（renderer.js renderers["case-detailed"], L305-437）

Case01のHTMLは以下の順序で生成される：

1. **case-header** — `Case 01` + `就活コミュニティ`
2. **case-description** — descriptionテキスト（`nl2br(esc())`処理）
3. **finalHtml** — 最終動画（`renderMediaItem`関数でレンダリング、`data-src`方式）
4. **hooksHtml** — フック比較セクション
5. **storyboardHtml** — ストーリーボード
6. **blockingHtml** — ブロッキング
7. **startframesHtml** — スタートフレーム
8. **charRefHtml** — キャラクター参考
9. **aeTimelineHtml** — AE仕上げ
10. **detailsHtml** — 詳細ドロップダウン

### フックセクションの構造

- コンテナ: `.subsection.fade-in`
- タイトル: `h4.subsection__title` → `フック比較（5バリエーション）`
- スクロール: `.horizontal-scroll.hscroll` → 横スクロールコンテナ
- 各タイル: `.hook-tile`
  - `.hook-tile__media`: video（`data-src`）＋ `.media-placeholder.media-placeholder--vertical`（テキスト: type名）
  - `.hook-tile__info`: `.hook-tile__type`（type名）＋ `.hook-tile__intent`（intent文）
- 採用判定: `.hook-decision.fade-in`
  - `.hook-decision__label` → `UGC型を採用`
  - `.hook-decision__reason` → reasonテキスト

### storyboard / blocking / startframes の役割

| プロパティ | 役割 | 表示クラス | アイテム数 |
|-----------|------|-----------|-----------|
| storyboard | 俯瞰ストーリーボード — 動画の全体構成を俯瞰で確認する画像群 | `.horizontal-scroll.hscroll`（横スクロール） | 6枚 |
| blocking | ブロッキング/構図証明 — 3Dで構図・動線を事前に整理した画像群 | `.gallery-grid`（グリッド） | 3枚 |
| startframes | スタートフレーム定義 — 各シーンの開始フレームを定義した画像群 | `.gallery-grid`（グリッド） | 3枚 |

- すべて`data-src`＋プレースホルダー方式
- `img`タグに`loading="lazy"`属性あり

### AEタイムライン表示の扱い

- `.single-media`コンテナ内に単一画像として表示
- `data-src`方式（遅延読み込み）
- プレースホルダーテキスト: `AE_TIMELINE`
- src: `assets/cases/case01/CASE01_AE_TIMELINE.png`

### 詳細ドロップダウン

- `<details class="dropdown fade-in">`で実装
- `<summary class="dropdown__summary">` → `詳細プロセスノート`
- クリックで開閉するHTML標準のdetails要素
- contentは`nl2br(esc())`で改行処理

---

## ⑤ Contact / Footer

### Contact セクション（renderer.js L562-570）

- `page-main.js`にはtype/idのみ定義（テキストなし）
- renderer.jsが`SITE.profile`から動的に生成
- 表示内容:
  - タイトル: `Contact`（固定テキスト、renderer.js内にハードコード）
  - メール: `SITE.profile.email` → 現在の値: `example@example.com`
  - `mailto:`リンクとして表示

### Footer（renderer.js renderFooter関数, L72-106）

- `SITE.profile`と`SITE.footer`から動的に生成
- 表示内容:
  - 区切り線: `.footer__line`（空div）
  - 名前: `SITE.profile.name` → 現在の値: `名前（仮）`
  - メール: `SITE.profile.email`をmailtoリンクとして表示 → 現在の値: `example@example.com`
  - リンク: `SITE.footer.links`配列 → 現在の値: `[]`（空配列、リンクなし）
  - コピーライト: `SITE.footer.copyright` → 現在の値: `© 2026`
  - 差し替えガイド: `<details>`で折りたたみ表示（固定テキスト、renderer.js内にハードコード）
    - タイトル: `How to Update（差し替えガイド）`
    - 内容:
      - 🚀 最短手順:
        - ① `assets/videos/` にMP4を入れる
        - ② `data/page-main.js` の cases に追加
        - ③ git push → スマホで確認
      - セクション追加: `data/page-main.js` の sections 配列にオブジェクトを挿入するだけ。
      - 新ページ追加: `data/page-xxx.js` を作成 → HTMLをコピー → script src を変更 → `data/site.js` の pageNav に追加。

---

## ⑥ 注意事項：page-main.jsに存在しないが表示される要素

以下の要素は`page-main.js`には定義されておらず、`renderer.js`または`site.js`に依存して表示される：

### renderer.js依存（ハードコード）

| 要素 | 定義場所 | 内容 |
|------|----------|------|
| ヘッダーのタイトル `PORTFOLIO` | renderer.js L39 | 固定テキスト |
| ヘッダーのラベル `AI Team向け` | renderer.js L42 | 固定テキスト |
| `Last Updated:` ラベルと日付 | renderer.js L49 | アクセス日時を自動生成 |
| `Mail:` ラベル | renderer.js L48 | 固定テキスト |
| Contactの見出し `Contact` | renderer.js L566 | 固定テキスト |
| Footerの差し替えガイド全文 | renderer.js L90-103 | 固定テキスト |
| 動画エラー時のテキスト | renderer.js L727 | `動画を開けませんでした`等 |
| ビデオプレースホルダー `▶` `動画を配置` | renderer.js L162 | cardsレンダラー内（現在未使用） |
| ナビゲーションリンク | renderer.js L57-70 | sections配列から自動生成 |

### site.js依存

| 要素 | 定義場所 | 現在の値 |
|------|----------|----------|
| プロフィール名 | site.js L20 | `名前（仮）` |
| 所属 | site.js L21 | `○○大学 ○○学部 ○年` |
| メール | site.js L22 | `example@example.com` |
| ページタイトル（`<title>`） | site.js L12 | `PORTFOLIO — AI Team向け` |
| meta description | site.js L13 | `少人数で縦型動画を量産するための、AI活用と制作フローの試行錯誤をまとめています。` |
| OGP title | site.js L14 | `PORTFOLIO — AI Team向け` |
| OGP description | site.js L15 | `少人数で縦型動画を量産するための、AI活用と制作フローの試行錯誤。` |
| サイトバージョン | site.js L8 | `20260218-1` |
| コピーライト | site.js L31 | `© 2026` |
| フッターリンク | site.js L30 | `[]`（空） |
| ページナビ | site.js L26 | `[]`（空） |

### レンダラー内に存在するが、現在のpage-main.jsでは使用されていないtype

以下のrendererは`renderer.js`に定義されているが、現在の`page-main.js`のsections配列では使用されていない：

- `text-list`
- `cards`
- `steps`
- `ab-test`
- `flowchart`
- `checklist`
- `case`（旧版互換用）
- `other-works`（カテゴリ分けなし版）
- `closing`
- `image-gallery`
- `gallery`

---

## 補足: site.js SITE_VERSION

- キー: `SITE.SITE_VERSION`
- 現在の値: `20260218-1`
- 形式: `YYYYMMDD-連番`
- コメント: `デプロイ時にここだけ更新`
- ※ renderer.jsからは現在参照されていない（キャッシュバスティング用と推測されるが、使用箇所は`page-main.js`・`renderer.js`内に存在しない）
