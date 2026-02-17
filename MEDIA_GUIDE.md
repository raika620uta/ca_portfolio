# 画像・動画の差し替え手順

## 📁 フォルダ構成

```
assets/
├── cases/
│   ├── case01/
│   │   ├── CASE01_FINAL.mp4
│   │   ├── CASE01_HOOK_01.mp4
│   │   ├── CASE01_HOOK_02.mp4
│   │   ├── CASE01_HOOK_03.mp4
│   │   ├── CASE01_HOOK_04.mp4
│   │   ├── CASE01_HOOK_05.mp4
│   │   ├── CASE01_STORYBOARD_01.png
│   │   ├── CASE01_STORYBOARD_02.png
│   │   ├── CASE01_STORYBOARD_03.png
│   │   ├── CASE01_STORYBOARD_04.png
│   │   ├── CASE01_STORYBOARD_05.png
│   │   ├── CASE01_STORYBOARD_06.png
│   │   ├── CASE01_BLOCKING_01.png
│   │   ├── CASE01_BLOCKING_02.png
│   │   ├── CASE01_BLOCKING_03.png
│   │   ├── CASE01_STARTFRAME_01.png
│   │   ├── CASE01_STARTFRAME_02.png
│   │   ├── CASE01_STARTFRAME_03.png
│   │   ├── CASE01_CHAR_REF.png
│   │   └── CASE01_AE_TIMELINE.png
│   ├── case02/
│   │   ├── CASE02_FINAL.mp4
│   │   ├── CASE02_AI_ASSET_01.mp4
│   │   └── CASE02_AE_TIMELINE.png
│   └── case03/
│       ├── CASE03_FINAL.mp4
│       ├── CASE03_APP_LINK.png
│       ├── CASE03_REMOTION_UI.png
│       ├── CASE03_AE_TEMPLATE.png
│       └── CASE03_AUTO_CAPTION_EXAMPLE.png
└── other/
    ├── video/
    │   ├── OTHER_VIDEO_01.mp4
    │   ├── OTHER_VIDEO_02.mp4
    │   ├── OTHER_VIDEO_03.mp4
    │   └── OTHER_VIDEO_04.mp4
    ├── ui/
    │   ├── OTHER_UI_01.png
    │   ├── OTHER_UI_02.png
    │   ├── OTHER_UI_03.png
    │   └── OTHER_UI_04.png
    └── system/
        ├── OTHER_SYS_01.png
        ├── OTHER_SYS_02.png
        ├── OTHER_SYS_03.png
        └── OTHER_SYS_04.png
```

---

## 🖼️ 差し替え方法

### 1. ファイルを用意

- **ファイル名**: 上記のフォルダ構成を参照
- **対応拡張子**: `png`, `jpg`, `jpeg`, `webp`, `mp4`
- **推奨サイズ**:
  - 画像: 横幅1280px以上
  - 動画: 縦型（9:16）または横型（16:9）

### 2. フォルダに配置

例: Case 01の最終動画を差し替える場合

```
assets/cases/case01/CASE01_FINAL.mp4
```

### 3. 確認

- ブラウザをリロード（Ctrl+R）
- プレースホルダーが消えて画像・動画が表示される

### 4. デプロイ

```powershell
npm run deploy
```

---

## 📋 ファイル一覧

### Case 01 - 就活コミュニティ（メインケース）

| ファイル名 | 種類 | 説明 |
|-----------|------|------|
| `CASE01_FINAL.mp4` | 動画 | 最終動画 |
| `CASE01_HOOK_01.mp4` | 動画 | フック比較: FOMO型 |
| `CASE01_HOOK_02.mp4` | 動画 | フック比較: UGC型（採用） |
| `CASE01_HOOK_03.mp4` | 動画 | フック比較: ベネフィット型 |
| `CASE01_HOOK_04.mp4` | 動画 | フック比較: 権威型 |
| `CASE01_HOOK_05.mp4` | 動画 | フック比較: 疑問型 |
| `CASE01_STORYBOARD_01.png` | 画像 | 俯瞰ストーリーボード 1 |
| `CASE01_STORYBOARD_02.png` | 画像 | 俯瞰ストーリーボード 2 |
| `CASE01_STORYBOARD_03.png` | 画像 | 俯瞰ストーリーボード 3 |
| `CASE01_STORYBOARD_04.png` | 画像 | 俯瞰ストーリーボード 4 |
| `CASE01_STORYBOARD_05.png` | 画像 | 俯瞰ストーリーボード 5 |
| `CASE01_STORYBOARD_06.png` | 画像 | 俯瞰ストーリーボード 6 |
| `CASE01_BLOCKING_01.png` | 画像 | ブロッキング/構図証明 1 |
| `CASE01_BLOCKING_02.png` | 画像 | ブロッキング/構図証明 2 |
| `CASE01_BLOCKING_03.png` | 画像 | ブロッキング/構図証明 3 |
| `CASE01_STARTFRAME_01.png` | 画像 | スタートフレーム定義 1 |
| `CASE01_STARTFRAME_02.png` | 画像 | スタートフレーム定義 2 |
| `CASE01_STARTFRAME_03.png` | 画像 | スタートフレーム定義 3 |
| `CASE01_CHAR_REF.png` | 画像 | キャラクター参考 |
| `CASE01_AE_TIMELINE.png` | 画像 | AE仕上げ証明 |

### Case 02 - マウスメーカー（AE仕上げ）

| ファイル名 | 種類 | 説明 |
|-----------|------|------|
| `CASE02_FINAL.mp4` | 動画 | 最終動画 |
| `CASE02_AI_ASSET_01.mp4` | 動画 | AI素材 |
| `CASE02_AE_TIMELINE.png` | 画像 | AEタイムライン |

### Case 03 - TOYOTA 北山区（実案件＋自動化）

| ファイル名 | 種類 | 説明 |
|-----------|------|------|
| `CASE03_FINAL.mp4` | 動画 | 最終動画 |
| `CASE03_APP_LINK.png` | 画像 | アプリ/プロジェクトリンク |
| `CASE03_REMOTION_UI.png` | 画像 | Remotion UI |
| `CASE03_AE_TEMPLATE.png` | 画像 | AEテンプレート |
| `CASE03_AUTO_CAPTION_EXAMPLE.png` | 画像 | 自動字幕例 |

### Other Works

#### Video / Motion（4スロット）

| ファイル名 | 種類 | 説明 |
|-----------|------|------|
| `OTHER_VIDEO_01.mp4` | 動画 | Video/Motion作品 1 |
| `OTHER_VIDEO_02.mp4` | 動画 | Video/Motion作品 2 |
| `OTHER_VIDEO_03.mp4` | 動画 | Video/Motion作品 3 |
| `OTHER_VIDEO_04.mp4` | 動画 | Video/Motion作品 4 |

#### UI / Graphic（4スロット）

| ファイル名 | 種類 | 説明 |
|-----------|------|------|
| `OTHER_UI_01.png` | 画像 | UI/Graphic作品 1 |
| `OTHER_UI_02.png` | 画像 | UI/Graphic作品 2 |
| `OTHER_UI_03.png` | 画像 | UI/Graphic作品 3 |
| `OTHER_UI_04.png` | 画像 | UI/Graphic作品 4 |

#### Apps / Systems（4スロット）

| ファイル名 | 種類 | 説明 |
|-----------|------|------|
| `OTHER_SYS_01.png` | 画像 | Apps/Systems作品 1 |
| `OTHER_SYS_02.png` | 画像 | Apps/Systems作品 2 |
| `OTHER_SYS_03.png` | 画像 | Apps/Systems作品 3 |
| `OTHER_SYS_04.png` | 画像 | Apps/Systems作品 4 |

---

## 💡 運用のコツ

### プレースホルダー表示

ファイルが存在しない場合は、以下のように表示されます：

- 薄い枠線と背景
- 中央にファイル名（例: `CASE01_FINAL`）

### 複数の拡張子に対応

画像ファイルは以下の順番で自動的に探します：
1. `.png`
2. `.jpg`
3. `.jpeg`
4. `.webp`

最初に見つかったものを使用します。

---

## 🚨 トラブルシューティング

### 画像・動画が表示されない

**確認項目**:
1. ファイル名が正しいか（大文字・アンダースコア区切り）
2. フォルダが正しいか（`assets/cases/case01/`など）
3. 拡張子が対応しているか（png, jpg, jpeg, webp, mp4）
4. ブラウザをリロードしたか（Ctrl+R）

### プレースホルダーが消えない

**原因**: ファイルが見つからない

**解決策**:
1. ファイル名を確認
2. 拡張子を確認
3. ブラウザのコンソールでエラーを確認

---

## 📝 まとめ

- **ファイルを置くだけ**: 指定されたフォルダに画像・動画を配置
- **即座に反映**: ブラウザをリロードで確認
- **簡単デプロイ**: `npm run deploy`で公開
- **プレースホルダー**: ファイルがなくても見栄えが良い

---

## 🎯 スロット総数

- **Case 01**: 19スロット
- **Case 02**: 3スロット
- **Case 03**: 5スロット
- **Other Works**: 12スロット
- **合計**: 39スロット
